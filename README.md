# touchdesigner-mcp

MCP server that lets Claude control [TouchDesigner](https://derivative.ca/) via [touchdesigner-cli](https://github.com/michaelslain/touchdesigner-cli)

## Install

```bash
git clone https://github.com/michaelslain/touchdesigner-mcp.git
cd touchdesigner-mcp
bun install
claude mcp add touchdesigner-mcp bun /path/to/touchdesigner-mcp/src/index.ts
```

On first use, the server automatically installs [touchdesigner-cli](https://github.com/michaelslain/touchdesigner-cli) globally via `bun install -g`.

## Requirements

- [Bun](https://bun.sh/)
- [Claude Code](https://claude.ai/download) installed and authenticated
- [TouchDesigner](https://derivative.ca/) installed

## Getting started

1. Ask Claude to create a new project — `td_project_create` handles everything automatically
2. The CLI server is injected into the project and starts on port 9005
3. Use any of the tools below from Claude

If TD is already running, any tool will auto-setup on first connection failure.

## Tools

| Tool | Description |
|------|-------------|
| `td_open` | Open TouchDesigner, optionally with a .toe project file |
| `td_project_create` | Create a new .toe project with the server pre-configured |
| `td_setup` | Install the TD server script and patch the default template |
| `td_info` | Get TouchDesigner version, build, and OS info |
| `td_node_list` | List child nodes under a path |
| `td_node_create` | Create a node with auto-placement and auto-display |
| `td_node_delete` | Delete a node |
| `td_node_connect` | Connect source output to target input |
| `td_node_disconnect` | Disconnect nodes |
| `td_node_errors` | Get errors on a node |
| `td_param_get` | Get node parameters (all or specific) |
| `td_param_set` | Set a node parameter value |
| `td_exec` | Execute Python code inside TouchDesigner |
| `td_screenshot` | Take a screenshot of a TOP node's output |
| `td_logs` | Get all errors and warnings from the project |
| `td_doc_search` | Search operator documentation by keyword |
| `td_doc_read` | Read full documentation for a specific operator |

## How it works

Each MCP tool call shells out to `touchdesigner-cli` (the global `td` command), which communicates with TouchDesigner over TCP (NDJSON protocol on port 9005). The CLI is auto-installed globally on first run.

Nodes are automatically positioned to avoid overlap, and output nodes (render TOPs, geometry COMPs, etc.) have their display activated automatically.

## Node families

TouchDesigner organizes operators into families:

- **TOP** — textures/images (e.g. `noiseTOP`, `textTOP`, `compositeTOP`)
- **CHOP** — channels/motion (e.g. `noiseCHOP`, `mathCHOP`, `audioinCHOP`)
- **SOP** — 3D geometry (e.g. `sphereSOP`, `gridSOP`, `transformSOP`)
- **DAT** — data/text/tables (e.g. `textDAT`, `tableDAT`, `executeDAT`)
- **COMP** — containers/UI (e.g. `baseCOMP`, `containerCOMP`, `geometryCOMP`)
- **MAT** — materials (e.g. `phongMAT`, `pbrMAT`, `wireframeMAT`)

## Development

```bash
git clone https://github.com/michaelslain/touchdesigner-mcp.git
cd touchdesigner-mcp
bun install
```

Test locally:

```bash
claude mcp add touchdesigner-mcp bun ./src/index.ts
```

## License

MIT
