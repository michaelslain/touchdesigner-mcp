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
    "td_save",
    {
      title: "Save TouchDesigner Project",
      description: "Saves the current TouchDesigner project to its existing path.",
    },
    async () => {
      const output = await withAutoSetup(() => runCli("exec", `
project.save()
result["output"] = "Saved " + project.name
`));
      return textResult(output);
    }
  );

  server.registerTool(
    "td_close",
    {
      title: "Close TouchDesigner",
      description:
        "Gracefully closes TouchDesigner. By default saves before closing. " +
        "Set discard to true to close without saving.",
      inputSchema: {
        discard: z.boolean().optional().describe("Set true to close without saving (default: false, saves first)"),
      },
    },
    async ({ discard }) => {
      try {
        await withAutoSetup(() => runCli("exec", `
${discard ? '' : 'project.save()'}
project.quit()
result["output"] = "closing"
`));
      } catch {
        // Expected — TD quits mid-response
      }
      return textResult(discard ? "TouchDesigner closed without saving." : "TouchDesigner saved and closed.");
    }
  );

  server.registerTool(
    "td_force_quit",
    {
      title: "Force Quit TouchDesigner",
      description:
        "Force-kills the TouchDesigner process. Use this when TD is frozen or unresponsive. " +
        "Any unsaved changes will be lost.",
    },
    async () => {
      const { execFile } = await import("node:child_process");
      await new Promise<void>((resolve) => {
        execFile("pkill", ["-9", "TouchDesigner"], { timeout: 5000 }, () => resolve());
      });
      return textResult("Force-quit TouchDesigner.");
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
    "td_project_info",
    {
      title: "Get Project Info",
      description:
        "Returns current project name, file path, frame rate, timeline position, and playback state.",
    },
    async () => {
      const output = await withAutoSetup(() => runCli("exec", `
tl = op('/project1')
info = []
info.append(f"Project: {project.name}")
info.append(f"Path: {project.folder}")
info.append(f"Cook Rate: {project.cookRate} FPS")
info.append(f"Frame: {tl.time.frame}")
info.append(f"Seconds: {tl.time.seconds:.2f}")
info.append(f"Timeline: {tl.time.start} - {tl.time.end}")
info.append(f"Play: {tl.time.play}")
info.append(f"Loop: {tl.time.loop}")
result["output"] = chr(10).join(info)
`));
      return textResult(output);
    }
  );

  server.registerTool(
    "td_import_tox",
    {
      title: "Import .tox Component",
      description:
        "Imports a .tox component file into a specified parent path. " +
        ".tox files are reusable TouchDesigner components that can contain " +
        "entire node networks. The imported component becomes a child of the parent.",
      inputSchema: {
        file: z.string().describe("Path to the .tox file, e.g. '/Users/me/components/myEffect.tox'"),
        parent: z.string().describe("Parent path to import into, e.g. '/project1'"),
        name: z.string().optional().describe("Optional name for the imported component"),
      },
    },
    async ({ file, parent, name }) => {
      const output = await withAutoSetup(() => runCli("exec", `
p = op('${parent}')
if p is None:
    raise ValueError('Parent not found: ${parent}')
n = p.loadTox('${file}')
${name ? `n.name = '${name}'` : ''}
result["output"] = f"Imported {n.path} ({n.type})"
`));
      return textResult(output);
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

      // Extract created node path from output (format: "Created: /path (type)")
      const pathMatch = output.match(/Created:\s+(\S+)/);
      if (pathMatch) {
        const nodePath = pathMatch[1];

        // Auto-place: position to the right of siblings
        try {
          await runCli("exec", `
n = op('${nodePath}')
parent = n.parent()
siblings = [c for c in parent.children if c.name != n.name]
if siblings:
    max_x = max(c.nodeX for c in siblings)
    max_y = min(c.nodeY for c in siblings if c.nodeX == max_x)
    n.nodeX = max_x + 200
    n.nodeY = max_y
else:
    n.nodeX = 0
    n.nodeY = 0
result["output"] = "placed"
`);
        } catch {}

        // Auto-display: activate viewer for output-type nodes
        const displayTypes = ["renderTOP", "compositeTOP", "outTOP", "nullTOP", "geometryCOMP"];
        if (displayTypes.some(t => type.toLowerCase() === t.toLowerCase())) {
          try {
            await runCli("exec", `
n = op('${nodePath}')
n.display = True
n.viewer = True
result["output"] = "display on"
`);
          } catch {}
        }
      }

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
    "td_node_wire",
    {
      title: "Wire Nodes to Specific Input",
      description:
        "Connects the output of a source node to a specific input index on the target node. " +
        "Use this when you need to control which input slot a connection goes to — " +
        "e.g. connecting to input 1 vs input 0 on a Composite TOP. " +
        "Input indices are 0-based.",
      inputSchema: {
        source: z.string().describe("Source node path (output), e.g. '/project1/noise1'"),
        target: z.string().describe("Target node path (input), e.g. '/project1/composite1'"),
        inputIndex: z.number().min(0).describe("Target input index (0-based)"),
      },
    },
    async ({ source, target, inputIndex }) => {
      const output = await withAutoSetup(() => runCli("exec", `
src = op('${source}')
tgt = op('${target}')
if src is None:
    raise ValueError('Source not found: ${source}')
if tgt is None:
    raise ValueError('Target not found: ${target}')
tgt.inputConnectors[${inputIndex}].connect(src)
result["output"] = f"Wired {src.path} -> {tgt.path} input ${inputIndex}"
`));
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
    "td_param_set_expr",
    {
      title: "Set Parameter Expression",
      description:
        "Sets a parameter to a Python expression that gets evaluated every frame. " +
        "Use this for animations and dynamic values. " +
        "Examples: 'absTime.seconds' (time-based), 'math.sin(absTime.seconds)*0.5' (oscillation), " +
        "'op(\"noise1\").par.roughness' (reference another param), " +
        "'me.time.frame / 100' (frame-based).",
      inputSchema: {
        path: z.string().describe("Node path, e.g. '/project1/noise1'"),
        param: z.string().describe("Parameter name, e.g. 'tx', 'roughness'"),
        expr: z.string().describe("Python expression, e.g. 'absTime.seconds * 2'"),
      },
    },
    async ({ path, param, expr }) => {
      const output = await withAutoSetup(() => runCli("exec", `
n = op('${path}')
if n is None:
    raise ValueError('Node not found: ${path}')
n.par.${param}.expr = '${expr.replace(/'/g, "\\'")}'
result["output"] = f"Set {n.path}.par.${param}.expr = '${expr}'"
`));
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

  server.registerTool(
    "td_screenshot",
    {
      title: "Screenshot TOP Output",
      description:
        "Takes a screenshot of a TOP node's rendered output and returns it as an image. " +
        "Use this to see what a render, composite, or any TOP is producing. " +
        "Only works on TOP-family nodes (textures/images).",
      inputSchema: {
        path: z.string().describe("Path to a TOP node, e.g. '/project1/render1'"),
      },
    },
    async ({ path }) => {
      const tmpFile = `/tmp/td_screenshot_${Date.now()}.png`;
      await withAutoSetup(() => runCli("exec", `
import os
top = op('${path}')
if top is None:
    raise ValueError('Node not found: ${path}')
if top.family != 'TOP':
    raise ValueError('Not a TOP node: ${path} (family: ' + top.family + ')')
top.save('${tmpFile}')
result["output"] = "saved"
`));

      try {
        const data = readFileSync(tmpFile);
        const { unlinkSync } = await import("node:fs");
        unlinkSync(tmpFile);
        return {
          content: [{
            type: "image" as const,
            data: data.toString("base64"),
            mimeType: "image/png",
          }],
        };
      } catch {
        return textResult(`Screenshot saved but could not read file. Check if ${path} is a valid TOP with output.`);
      }
    }
  );

  server.registerTool(
    "td_video_preview",
    {
      title: "Preview TOP Video Output",
      description:
        "Captures multiple frames from a TOP node over time and returns them as images. " +
        "Use this to see what an animated or time-varying TOP is producing — " +
        "noise animations, video playback, generative effects, etc. " +
        "Only works on TOP-family nodes.",
      inputSchema: {
        path: z.string().describe("Path to a TOP node, e.g. '/project1/render1'"),
        frames: z.number().min(2).max(16).optional().describe("Number of frames to capture (default: 5, max: 16)"),
        frameStep: z.number().min(1).optional().describe("Frames to advance between captures (default: 10)"),
      },
    },
    async ({ path, frames = 5, frameStep = 10 }) => {
      const prefix = `/tmp/td_vidpreview_${Date.now()}`;

      await withAutoSetup(() => runCli("exec", `
import time
top = op('${path}')
if top is None:
    raise ValueError('Node not found: ${path}')
if top.family != 'TOP':
    raise ValueError('Not a TOP node: ${path} (family: ' + top.family + ')')

tl = op('/project1')
original_frame = tl.time.frame
frames_to_capture = ${frames}
step = ${frameStep}

for i in range(frames_to_capture):
    tl.time.frame = original_frame + (i * step)
    top.cook(force=True)
    top.save('${prefix}_' + str(i) + '.png')

tl.time.frame = original_frame
result["output"] = str(frames_to_capture)
`));

      const { unlinkSync } = await import("node:fs");
      const content: { type: "image"; data: string; mimeType: "image/png" }[] = [];

      for (let i = 0; i < frames; i++) {
        const file = `${prefix}_${i}.png`;
        try {
          const data = readFileSync(file);
          unlinkSync(file);
          content.push({
            type: "image" as const,
            data: data.toString("base64"),
            mimeType: "image/png",
          });
        } catch {
          // frame didn't save, skip
        }
      }

      if (content.length === 0) {
        return textResult(`No frames captured. Check if ${path} is a valid TOP with output.`);
      }

      return {
        content: [
          { type: "text" as const, text: `Captured ${content.length} frames from ${path} (every ${frameStep} frames):` },
          ...content,
        ],
      };
    }
  );

  server.registerTool(
    "td_logs",
    {
      title: "Get TouchDesigner Logs",
      description:
        "Returns errors and warnings from all nodes in the current project. " +
        "Use this to debug issues instead of asking the user for screenshots of error dialogs.",
    },
    async () => {
      const output = await withAutoSetup(() => runCli("exec", `
errors = []
for node in op('/project1').findChildren(depth=10):
    node_errors = node.errors()
    node_warnings = node.warnings()
    if node_errors:
        for e in node_errors:
            errors.append(f"ERROR {node.path}: {e}")
    if node_warnings:
        for w in node_warnings:
            errors.append(f"WARN  {node.path}: {w}")
if errors:
    result["output"] = chr(10).join(errors)
else:
    result["output"] = "No errors or warnings."
`));
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
