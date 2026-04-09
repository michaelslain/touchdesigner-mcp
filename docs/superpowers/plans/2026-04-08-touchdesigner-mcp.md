# TouchDesigner MCP Server Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an MCP server that wraps the `touchdesigner-cli` tool, auto-downloads it on first run, and exposes all TD control operations as MCP tools with rich descriptions.

**Architecture:** A Node + TypeScript stdio MCP server using `@modelcontextprotocol/server`. On first run it clones `touchdesigner-cli` from GitHub into `~/.touchdesigner-mcp/cli/` and caches the path in `~/.touchdesigner-mcp/settings.json`. Each MCP tool call shells out to `bun run <cli>/src/index.ts <args>` and returns the CLI output.

**Tech Stack:** Node.js, TypeScript, `@modelcontextprotocol/server`, `zod` (v4), `child_process.execFile`

---

## File Structure

```
touchdesigner-mcp/
├── src/
│   ├── index.ts          # Entry point: create MCP server, connect stdio
│   ├── cli.ts            # Download/cache touchdesigner-cli, run CLI commands
│   └── tools.ts          # Register all MCP tools with schemas + handlers
├── package.json
├── tsconfig.json
└── docs/                 # Reserved for future TD docs
```

- **`src/index.ts`** — Shebang entry point. Creates `McpServer`, imports tool registration from `tools.ts`, connects `StdioServerTransport`.
- **`src/cli.ts`** — `ensureCli()` checks settings for cached path, clones repo if missing. `runCli(...args)` shells out to `bun run <path>/src/index.ts` with given args, returns stdout/stderr.
- **`src/tools.ts`** — Registers 11 MCP tools on the server. Each tool validates input via Zod, builds CLI args, calls `runCli()`, returns result.

---

### Task 1: Project Scaffolding

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`

- [ ] **Step 1: Initialize package.json**

```json
{
  "name": "touchdesigner-mcp",
  "version": "0.1.0",
  "type": "module",
  "bin": {
    "touchdesigner-mcp": "./build/index.js"
  },
  "scripts": {
    "build": "tsc",
    "start": "node build/index.js"
  },
  "dependencies": {
    "@modelcontextprotocol/server": "^1.12.1",
    "zod": "^3.25.20"
  },
  "devDependencies": {
    "@types/node": "^22.0.0",
    "typescript": "^5.8.0"
  }
}
```

- [ ] **Step 2: Create tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "Node16",
    "moduleResolution": "Node16",
    "outDir": "./build",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 3: Install dependencies**

Run: `npm install`
Expected: `node_modules/` created, lock file generated.

- [ ] **Step 4: Commit**

```bash
git add package.json tsconfig.json package-lock.json
git commit -m "chore: scaffold touchdesigner-mcp project"
```

---

### Task 2: CLI Manager (`src/cli.ts`)

**Files:**
- Create: `src/cli.ts`

This module handles downloading `touchdesigner-cli` from GitHub on first run, caching the install path in `~/.touchdesigner-mcp/settings.json`, and executing CLI commands.

- [ ] **Step 1: Create `src/cli.ts`**

```typescript
#!/usr/bin/env node

import { execFile } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { homedir } from "node:os";

const MCP_DIR = join(homedir(), ".touchdesigner-mcp");
const SETTINGS_PATH = join(MCP_DIR, "settings.json");
const CLI_DIR = join(MCP_DIR, "cli");
const REPO_URL = "https://github.com/michaelslain/touchdesigner-cli.git";

interface Settings {
  cliPath?: string;
}

function readSettings(): Settings {
  if (!existsSync(SETTINGS_PATH)) return {};
  try {
    return JSON.parse(readFileSync(SETTINGS_PATH, "utf-8"));
  } catch {
    return {};
  }
}

function writeSettings(settings: Settings): void {
  mkdirSync(MCP_DIR, { recursive: true });
  writeFileSync(SETTINGS_PATH, JSON.stringify(settings, null, 2));
}

export async function ensureCli(): Promise<string> {
  const settings = readSettings();

  if (settings.cliPath && existsSync(join(settings.cliPath, "src", "index.ts"))) {
    return settings.cliPath;
  }

  // Clone the repo
  mkdirSync(MCP_DIR, { recursive: true });

  if (existsSync(CLI_DIR)) {
    // Pull latest
    await exec("git", ["-C", CLI_DIR, "pull"]);
  } else {
    await exec("git", ["clone", REPO_URL, CLI_DIR]);
  }

  // Install bun dependencies
  await exec("bun", ["install"], { cwd: CLI_DIR });

  // Save path
  writeSettings({ ...readSettings(), cliPath: CLI_DIR });
  return CLI_DIR;
}

export async function runCli(...args: string[]): Promise<string> {
  const cliPath = await ensureCli();
  const entryPoint = join(cliPath, "src", "index.ts");
  const result = await exec("bun", ["run", entryPoint, ...args]);
  return result;
}

function exec(
  cmd: string,
  args: string[],
  opts?: { cwd?: string }
): Promise<string> {
  return new Promise((resolve, reject) => {
    execFile(cmd, args, { cwd: opts?.cwd, timeout: 15000 }, (err, stdout, stderr) => {
      if (err) {
        reject(new Error(stderr || err.message));
      } else {
        resolve(stdout.trim());
      }
    });
  });
}
```

- [ ] **Step 2: Build and verify it compiles**

Run: `npx tsc --noEmit`
Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/cli.ts
git commit -m "feat: add CLI manager for downloading and running touchdesigner-cli"
```

---

### Task 3: MCP Tool Registration (`src/tools.ts`)

**Files:**
- Create: `src/tools.ts`

Registers all 11 MCP tools on the server. Each tool has a rich description explaining what it does in TouchDesigner context, a Zod input schema, and a handler that builds CLI args and calls `runCli()`.

- [ ] **Step 1: Create `src/tools.ts`**

```typescript
import { McpServer } from "@modelcontextprotocol/server";
import { z } from "zod/v4";
import { runCli } from "./cli.js";

export function registerTools(server: McpServer): void {
  // ── td setup ──────────────────────────────────────────────
  server.registerTool(
    "td_setup",
    {
      title: "Setup TouchDesigner CLI Server",
      description:
        "Installs the TouchDesigner TCP server script (~/.td-cli/td-server.py) " +
        "and patches the default TD template so every new project auto-starts " +
        "the server. Run this once before using any other tools. " +
        "Use --uninstall to remove the server and restore the original template.",
      inputSchema: z.object({
        port: z
          .number()
          .min(1)
          .max(65535)
          .optional()
          .describe("TCP port for the TD server (default: 9005)"),
        uninstall: z
          .boolean()
          .optional()
          .describe("Set true to remove the server and restore the original TD template"),
      }),
    },
    async ({ port, uninstall }) => {
      const args = ["setup"];
      if (uninstall) args.push("--uninstall");
      if (port !== undefined) args.push("--port", String(port));
      const output = await runCli(...args);
      return { content: [{ type: "text", text: output }] };
    }
  );

  // ── td info ───────────────────────────────────────────────
  server.registerTool(
    "td_info",
    {
      title: "Get TouchDesigner Info",
      description:
        "Returns the running TouchDesigner instance's version, build number, " +
        "and operating system. Use this to verify the connection to TD is working.",
      inputSchema: z.object({}),
    },
    async () => {
      const output = await runCli("info");
      return { content: [{ type: "text", text: output }] };
    }
  );

  // ── td node list ──────────────────────────────────────────
  server.registerTool(
    "td_node_list",
    {
      title: "List Child Nodes",
      description:
        "Lists all child nodes under a given path in TouchDesigner. " +
        "Returns each node's name, type, and full path. " +
        "Use '/' for the root, '/project1' for the default project container. " +
        "Node families in TD: TOP (textures/images), CHOP (channels/motion), " +
        "SOP (3D geometry), DAT (data/text/tables), COMP (containers/UI), MAT (materials).",
      inputSchema: z.object({
        path: z.string().describe("Parent node path, e.g. '/' or '/project1'"),
      }),
    },
    async ({ path }) => {
      const output = await runCli("node", "list", path);
      return { content: [{ type: "text", text: output }] };
    }
  );

  // ── td node create ────────────────────────────────────────
  server.registerTool(
    "td_node_create",
    {
      title: "Create Node",
      description:
        "Creates a new node in TouchDesigner. The type must be a valid TD operator type " +
        "such as: textTOP, noiseTOP, compositeTOP, moviefileinTOP, " +
        "audiofileinCHOP, noiseCHOP, mathCHOP, filterCHOP, " +
        "sphereSOP, gridSOP, transformSOP, mergeSOP, " +
        "textDAT, tableDAT, executeDAT, " +
        "baseCOMP, containerCOMP, geometryCOMP, cameraCOMP, lightCOMP, " +
        "phongMAT, pbrMAT, wireframeMAT. " +
        "Node types follow the pattern: <name><FAMILY> (e.g. noiseTOP, sphereSOP).",
      inputSchema: z.object({
        type: z.string().describe("Node type, e.g. 'textTOP', 'noiseCHOP', 'sphereSOP'"),
        parent: z.string().describe("Parent path where node is created, e.g. '/project1'"),
        name: z.string().optional().describe("Optional custom name for the node"),
      }),
    },
    async ({ type, parent, name }) => {
      const args = ["node", "create", type, "--parent", parent];
      if (name) args.push("--name", name);
      const output = await runCli(...args);
      return { content: [{ type: "text", text: output }] };
    }
  );

  // ── td node delete ────────────────────────────────────────
  server.registerTool(
    "td_node_delete",
    {
      title: "Delete Node",
      description:
        "Deletes a node at the specified path in TouchDesigner. " +
        "This is irreversible. The node and all its children will be removed.",
      inputSchema: z.object({
        path: z.string().describe("Full path of the node to delete, e.g. '/project1/noise1'"),
      }),
    },
    async ({ path }) => {
      const output = await runCli("node", "delete", path);
      return { content: [{ type: "text", text: output }] };
    }
  );

  // ── td node connect ───────────────────────────────────────
  server.registerTool(
    "td_node_connect",
    {
      title: "Connect Nodes",
      description:
        "Connects the output of a source node to the input of a target node. " +
        "In TouchDesigner, data flows through node connections: " +
        "TOPs pass textures, CHOPs pass channel data, SOPs pass geometry, " +
        "DATs pass tables/text. Nodes can only connect within the same family " +
        "(e.g. TOP->TOP, CHOP->CHOP). Order matters for multi-input operators.",
      inputSchema: z.object({
        source: z.string().describe("Source node path (output), e.g. '/project1/noise1'"),
        target: z.string().describe("Target node path (input), e.g. '/project1/composite1'"),
      }),
    },
    async ({ source, target }) => {
      const output = await runCli("node", "connect", source, target);
      return { content: [{ type: "text", text: output }] };
    }
  );

  // ── td node disconnect ────────────────────────────────────
  server.registerTool(
    "td_node_disconnect",
    {
      title: "Disconnect Nodes",
      description:
        "Disconnects the connection between a source node's output and a target node's input.",
      inputSchema: z.object({
        source: z.string().describe("Source node path, e.g. '/project1/noise1'"),
        target: z.string().describe("Target node path, e.g. '/project1/composite1'"),
      }),
    },
    async ({ source, target }) => {
      const output = await runCli("node", "disconnect", source, target);
      return { content: [{ type: "text", text: output }] };
    }
  );

  // ── td node errors ────────────────────────────────────────
  server.registerTool(
    "td_node_errors",
    {
      title: "Get Node Errors",
      description:
        "Returns any errors on a node. Use this to debug nodes that aren't " +
        "working as expected. Common errors include missing inputs, " +
        "invalid parameters, or file-not-found for file-based operators.",
      inputSchema: z.object({
        path: z.string().describe("Node path to check, e.g. '/project1/moviefilein1'"),
      }),
    },
    async ({ path }) => {
      const output = await runCli("node", "errors", path);
      return { content: [{ type: "text", text: output }] };
    }
  );

  // ── td param get ──────────────────────────────────────────
  server.registerTool(
    "td_param_get",
    {
      title: "Get Node Parameters",
      description:
        "Gets parameter values for a node. If no param name is given, returns " +
        "all parameters with their current and default values. Parameters " +
        "control every aspect of a node's behavior — resolution, color, " +
        "position, file paths, expressions, etc. Modified params are marked.",
      inputSchema: z.object({
        path: z.string().describe("Node path, e.g. '/project1/text1'"),
        param: z
          .string()
          .optional()
          .describe("Specific parameter name, e.g. 'text', 'resolutionw'. Omit for all params."),
      }),
    },
    async ({ path, param }) => {
      const args = ["param", "get", path];
      if (param) args.push(param);
      const output = await runCli(...args);
      return { content: [{ type: "text", text: output }] };
    }
  );

  // ── td param set ──────────────────────────────────────────
  server.registerTool(
    "td_param_set",
    {
      title: "Set Node Parameter",
      description:
        "Sets a parameter value on a node. Values are auto-parsed: " +
        "numbers become numeric, 'true'/'false' become boolean, " +
        "everything else stays as a string. Common params: " +
        "'text' (textTOP), 'file' (moviefileinTOP), 'resolutionw'/'resolutionh' (TOPs), " +
        "'tx'/'ty'/'tz' (transforms), 'rx'/'ry'/'rz' (rotations).",
      inputSchema: z.object({
        path: z.string().describe("Node path, e.g. '/project1/text1'"),
        param: z.string().describe("Parameter name, e.g. 'text'"),
        value: z.string().describe("Value to set. Numbers and booleans are auto-parsed."),
      }),
    },
    async ({ path, param, value }) => {
      const output = await runCli("param", "set", path, param, value);
      return { content: [{ type: "text", text: output }] };
    }
  );

  // ── td exec ───────────────────────────────────────────────
  server.registerTool(
    "td_exec",
    {
      title: "Execute Python in TouchDesigner",
      description:
        "Executes arbitrary Python code inside the running TouchDesigner instance. " +
        "TD uses Python 3 with its own API: op() to reference nodes, " +
        "me for the current node, parent() for parent, " +
        "mod.* for imported modules. " +
        "Examples: " +
        "'print(op(\"/project1\").children)' — list children. " +
        "'op(\"/project1/text1\").par.text = \"hello\"' — set param. " +
        "'print(app.version)' — get version. " +
        "Use this for advanced operations not covered by other tools.",
      inputSchema: z.object({
        script: z.string().describe("Python code to execute in TouchDesigner"),
      }),
    },
    async ({ script }) => {
      const output = await runCli("exec", script);
      return { content: [{ type: "text", text: output }] };
    }
  );
}
```

- [ ] **Step 2: Build and verify it compiles**

Run: `npx tsc --noEmit`
Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/tools.ts
git commit -m "feat: register all 11 MCP tools with schemas and TD-aware descriptions"
```

---

### Task 4: Entry Point (`src/index.ts`)

**Files:**
- Create: `src/index.ts`

- [ ] **Step 1: Create `src/index.ts`**

```typescript
#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/server";
import { StdioServerTransport } from "@modelcontextprotocol/server";
import { registerTools } from "./tools.js";

const server = new McpServer({
  name: "touchdesigner-mcp",
  version: "0.1.0",
});

registerTools(server);

const transport = new StdioServerTransport();
await server.connect(transport);
```

- [ ] **Step 2: Build the project**

Run: `npm run build`
Expected: `build/` directory created with compiled JS files. No errors.

- [ ] **Step 3: Test the server starts**

Run: `echo '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2024-11-05","capabilities":{},"clientInfo":{"name":"test","version":"0.1.0"}}}' | node build/index.js`
Expected: JSON response with server info and tool capabilities.

- [ ] **Step 4: Commit**

```bash
git add src/index.ts
git commit -m "feat: add MCP server entry point with stdio transport"
```

---

### Task 5: Build, Test End-to-End, Add to Claude Code

**Files:**
- Modify: `package.json` (add bin shebang handling if needed)

- [ ] **Step 1: Full build**

Run: `npm run build`
Expected: Clean build, `build/index.js` exists.

- [ ] **Step 2: Verify the build output has shebang**

Run: `head -1 build/index.js`
Expected: `#!/usr/bin/env node`

If missing, prepend it:
```bash
echo '#!/usr/bin/env node' | cat - build/index.js > tmp && mv tmp build/index.js
chmod 755 build/index.js
```

Update `package.json` build script if needed:
```json
"build": "tsc && echo '#!/usr/bin/env node' | cat - build/index.js > tmp && mv tmp build/index.js && chmod 755 build/index.js"
```

- [ ] **Step 3: Add to Claude Code for testing**

Run: `claude mcp add touchdesigner-mcp node /Users/michaelslain/Documents/dev/touchdesigner-mcp/build/index.js`

- [ ] **Step 4: Verify tools are visible**

Run: `claude mcp list`
Expected: `touchdesigner-mcp` appears with status connected.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: complete touchdesigner-mcp server v0.1.0"
```
