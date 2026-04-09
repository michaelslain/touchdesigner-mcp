import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { runCli, injectServer } from "./cli.js";
import { existsSync, readdirSync, readFileSync, copyFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { homedir } from "node:os";

function textResult(output: string) {
  return { content: [{ type: "text" as const, text: output }] };
}

async function withAutoSetup(fn: () => Promise<string>): Promise<string> {
  try {
    return await fn();
  } catch (err) {
    const msg = (err as Error).message;
    if (!msg.includes("Cannot connect") && !msg.includes("timed out") && !msg.includes("ECONNREFUSED")) {
      throw err;
    }
    // Connection failed — try auto-setup
    await runCli("setup");
    await injectServer();
    // Retry with backoff — TD may need time to load
    for (let i = 0; i < 5; i++) {
      await new Promise(r => setTimeout(r, 2000 * (i + 1)));
      try {
        return await fn();
      } catch {
        // keep retrying
      }
    }
    throw new Error(
      "Cannot connect to TouchDesigner after setup. Make sure TD is running with a project that has the CLI server loaded."
    );
  }
}

export function registerTools(server: McpServer): void {
  server.registerTool(
    "td_open",
    {
      title: "Open TouchDesigner",
      description: "Opens TouchDesigner application. Optionally opens a specific .toe project file.",
      inputSchema: {
        project: z.string().optional().describe("Path to a .toe project file to open"),
      },
    },
    async ({ project }) => {
      const { execFile } = await import("node:child_process");
      const args = ["-a", "TouchDesigner"];
      if (project) args.push(project);
      await new Promise<void>((resolve, reject) => {
        execFile("open", args, { timeout: 10000 }, (err) => {
          if (err) reject(new Error(err.message));
          else resolve();
        });
      });
      return textResult(project ? `Opened TouchDesigner with ${project}` : "Opened TouchDesigner");
    }
  );

  server.registerTool(
    "td_project_create",
    {
      title: "Create TouchDesigner Project",
      description:
        "Creates a new TouchDesigner .toe project file at the specified path and opens it. " +
        "The project is pre-configured with the CLI server script so tools work immediately. " +
        "Run td_setup first if you haven't already.",
      inputSchema: {
        path: z.string().describe("Full path for the new .toe file, e.g. '/Users/me/Desktop/myproject.toe'"),
      },
    },
    async ({ path: projectPath }) => {
      // Ensure setup has been run
      await runCli("setup");

      // Find the patched template
      const templateDir = "/Applications/TouchDesigner.app/Contents/Resources/tfs/Samples/Setup/Base";
      const templatePath = join(templateDir, "NewProject.toe");
      if (!existsSync(templatePath)) {
        return textResult("Could not find TD template. Is TouchDesigner installed?");
      }

      // Ensure .toe extension
      const dest = projectPath.endsWith(".toe") ? projectPath : projectPath + ".toe";

      if (existsSync(dest)) {
        return textResult(`Project already exists at ${dest}. Use td_open to open it.`);
      }

      // Copy patched template to new location
      copyFileSync(templatePath, dest);

      // Open it in TD
      const { execFile } = await import("node:child_process");
      await new Promise<void>((resolve, reject) => {
        execFile("open", ["-a", "TouchDesigner", dest], { timeout: 10000 }, (err) => {
          if (err) reject(new Error(err.message));
          else resolve();
        });
      });

      // Wait for the server to come online
      const { connect } = await import("node:net");
      for (let i = 0; i < 10; i++) {
        await new Promise(r => setTimeout(r, 2000));
        const up = await new Promise<boolean>((resolve) => {
          const sock = connect({ host: "127.0.0.1", port: 9005 }, () => {
            sock.end();
            resolve(true);
          });
          sock.on("error", () => resolve(false));
          sock.setTimeout(1000, () => { sock.destroy(); resolve(false); });
        });
        if (up) return textResult(`Created and opened project: ${dest}\nServer connected on port 9005.`);
      }

      return textResult(`Created and opened project: ${dest}\nWarning: server did not come online within 20s.`);
    }
  );

  server.registerTool(
    "td_setup",
    {
      title: "Setup TouchDesigner CLI Server",
      description:
        "Installs the TouchDesigner TCP server script (~/.td-cli/td-server.py) " +
        "and patches the default TD template so every new project auto-starts " +
        "the server. Run this once before using any other tools. " +
        "Use uninstall to remove the server and restore the original template.",
      inputSchema: {
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
      },
    },
    async ({ port, uninstall }) => {
      const args = ["setup"];
      if (uninstall) args.push("--uninstall");
      if (port !== undefined) args.push("--port", String(port));
      const output = await runCli(...args);

      if (!uninstall) {
        const injectResult = await injectServer(port ?? 9005);
        return textResult(output + "\n\n" + injectResult);
      }

      return textResult(output);
    }
  );

  server.registerTool(
    "td_info",
    {
      title: "Get TouchDesigner Info",
      description:
        "Returns the running TouchDesigner instance's version, build number, " +
        "and operating system. Use this to verify the connection to TD is working.",
    },
    async () => {
      const output = await withAutoSetup(() => runCli("info"));
      return textResult(output);
    }
  );

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
      inputSchema: {
        path: z.string().describe("Parent node path, e.g. '/' or '/project1'"),
      },
    },
    async ({ path }) => {
      const output = await withAutoSetup(() => runCli("node", "list", path));
      return textResult(output);
    }
  );

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
      inputSchema: {
        type: z.string().describe("Node type, e.g. 'textTOP', 'noiseCHOP', 'sphereSOP'"),
        parent: z.string().describe("Parent path where node is created, e.g. '/project1'"),
        name: z.string().optional().describe("Optional custom name for the node"),
      },
    },
    async ({ type, parent, name }) => {
      const args = ["node", "create", type, "--parent", parent];
      if (name) args.push("--name", name);
      const output = await withAutoSetup(() => runCli(...args));
      return textResult(output);
    }
  );

  server.registerTool(
    "td_node_delete",
    {
      title: "Delete Node",
      description:
        "Deletes a node at the specified path in TouchDesigner. " +
        "This is irreversible. The node and all its children will be removed.",
      inputSchema: {
        path: z.string().describe("Full path of the node to delete, e.g. '/project1/noise1'"),
      },
    },
    async ({ path }) => {
      const output = await withAutoSetup(() => runCli("node", "delete", path));
      return textResult(output);
    }
  );

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
      inputSchema: {
        source: z.string().describe("Source node path (output), e.g. '/project1/noise1'"),
        target: z.string().describe("Target node path (input), e.g. '/project1/composite1'"),
      },
    },
    async ({ source, target }) => {
      const output = await withAutoSetup(() => runCli("node", "connect", source, target));
      return textResult(output);
    }
  );

  server.registerTool(
    "td_node_disconnect",
    {
      title: "Disconnect Nodes",
      description:
        "Disconnects the connection between a source node's output and a target node's input.",
      inputSchema: {
        source: z.string().describe("Source node path, e.g. '/project1/noise1'"),
        target: z.string().describe("Target node path, e.g. '/project1/composite1'"),
      },
    },
    async ({ source, target }) => {
      const output = await withAutoSetup(() => runCli("node", "disconnect", source, target));
      return textResult(output);
    }
  );

  server.registerTool(
    "td_node_errors",
    {
      title: "Get Node Errors",
      description:
        "Returns any errors on a node. Use this to debug nodes that aren't " +
        "working as expected. Common errors include missing inputs, " +
        "invalid parameters, or file-not-found for file-based operators.",
      inputSchema: {
        path: z.string().describe("Node path to check, e.g. '/project1/moviefilein1'"),
      },
    },
    async ({ path }) => {
      const output = await withAutoSetup(() => runCli("node", "errors", path));
      return textResult(output);
    }
  );

  server.registerTool(
    "td_param_get",
    {
      title: "Get Node Parameters",
      description:
        "Gets parameter values for a node. If no param name is given, returns " +
        "all parameters with their current and default values. Parameters " +
        "control every aspect of a node's behavior — resolution, color, " +
        "position, file paths, expressions, etc. Modified params are marked.",
      inputSchema: {
        path: z.string().describe("Node path, e.g. '/project1/text1'"),
        param: z
          .string()
          .optional()
          .describe("Specific parameter name, e.g. 'text', 'resolutionw'. Omit for all params."),
      },
    },
    async ({ path, param }) => {
      const args = ["param", "get", path];
      if (param) args.push(param);
      const output = await withAutoSetup(() => runCli(...args));
      return textResult(output);
    }
  );

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
      inputSchema: {
        path: z.string().describe("Node path, e.g. '/project1/text1'"),
        param: z.string().describe("Parameter name, e.g. 'text'"),
        value: z.string().describe("Value to set. Numbers and booleans are auto-parsed."),
      },
    },
    async ({ path, param, value }) => {
      const output = await withAutoSetup(() => runCli("param", "set", path, param, value));
      return textResult(output);
    }
  );

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
      inputSchema: {
        script: z.string().describe("Python code to execute in TouchDesigner"),
      },
    },
    async ({ script }) => {
      const output = await withAutoSetup(() => runCli("exec", script));
      return textResult(output);
    }
  );

  const DOCS_DIR = join(dirname(import.meta.dirname!), "docs");
  const DOC_FAMILIES = ["TOP", "CHOP", "SOP", "DAT", "COMP", "MAT"] as const;
  const NO_DOCS_MSG =
    "No operator docs found. The docs/ folder with operator markdown files " +
    "(docs/TOP/*.md, docs/CHOP/*.md, etc.) has not been set up yet.";

  interface DocEntry {
    name: string;
    normalized: string;
    family: string;
    path: string;
    content: string;
  }

  let cachedDocs: DocEntry[] | null = null;

  function normalize(s: string): string {
    return s.toLowerCase().replace(/_/g, "");
  }

  function getDocs(): DocEntry[] {
    if (cachedDocs) return cachedDocs;
    if (!existsSync(DOCS_DIR)) { cachedDocs = []; return cachedDocs; }
    const results: DocEntry[] = [];
    for (const family of DOC_FAMILIES) {
      const familyDir = join(DOCS_DIR, family);
      if (!existsSync(familyDir)) continue;
      for (const file of readdirSync(familyDir)) {
        if (!file.endsWith(".md")) continue;
        const filePath = join(familyDir, file);
        const name = file.replace(/\.md$/, "");
        results.push({
          name,
          normalized: normalize(name),
          family,
          path: filePath,
          content: readFileSync(filePath, "utf-8"),
        });
      }
    }
    cachedDocs = results;
    return cachedDocs;
  }

  server.registerTool(
    "td_doc_search",
    {
      title: "Search Operator Documentation",
      description:
        "Searches TouchDesigner operator documentation by keyword. " +
        "Searches both filenames and file contents (case-insensitive). " +
        "Returns matching operator names with their family (TOP, CHOP, SOP, DAT, COMP, MAT). " +
        "Use this to discover which operators exist and what they do.",
      inputSchema: {
        query: z.string().describe("Search keyword, e.g. 'noise', 'composite', 'audio'"),
      },
    },
    async ({ query }) => {
      const docs = getDocs();
      if (docs.length === 0) return textResult(NO_DOCS_MSG);

      const q = query.toLowerCase();
      const matches: { name: string; family: string; matchType: string }[] = [];

      for (const doc of docs) {
        const nameMatch = doc.normalized.includes(q);
        const contentMatch = !nameMatch && doc.content.toLowerCase().includes(q);
        if (nameMatch || contentMatch) {
          matches.push({
            name: doc.name,
            family: doc.family,
            matchType: nameMatch ? "filename" : "content",
          });
        }
      }

      if (matches.length === 0) {
        return textResult(`No docs matched query "${query}".`);
      }

      const lines = matches.map(
        (m) => `${m.name} [${m.family}] (matched in ${m.matchType})`
      );
      return textResult(
        `Found ${matches.length} result(s) for "${query}":\n\n${lines.join("\n")}`
      );
    }
  );

  server.registerTool(
    "td_doc_read",
    {
      title: "Read Operator Documentation",
      description:
        "Reads the full markdown documentation for a specific TouchDesigner operator. " +
        "Accepts flexible naming: 'Noise_TOP', 'noiseTOP', 'noise_top' all work. " +
        "The doc includes operator summary, parameters with internal codes, inputs, and info channels.",
      inputSchema: {
        operator: z
          .string()
          .describe("Operator name, e.g. 'Noise_TOP', 'noiseTOP', 'noise_top', 'textDAT'"),
      },
    },
    async ({ operator }) => {
      const docs = getDocs();
      if (docs.length === 0) return textResult(NO_DOCS_MSG);

      const needle = normalize(operator);
      const match = docs.find((d) => d.normalized === needle);
      if (match) return textResult(match.content);

      const partial = docs.filter((d) => d.normalized.includes(needle));
      if (partial.length === 1) return textResult(partial[0].content);
      if (partial.length > 1) {
        const names = partial.map((d) => `${d.name} [${d.family}]`).join("\n");
        return textResult(
          `Multiple operators match "${operator}". Be more specific:\n\n${names}`
        );
      }
      return textResult(
        `No doc found for "${operator}". Use td_doc_search to find available operators.`
      );
    }
  );
}
