# touchdesigner-mcp

MCP server that lets Claude control [TouchDesigner](https://derivative.ca/) via [touchdesigner-cli](https://github.com/michaelslain/touchdesigner-cli)

## Install

```bash
git clone https://github.com/michaelslain/touchdesigner-mcp.git
cd touchdesigner-mcp
bun install
claude mcp add touchdesigner-mcp bun /path/to/touchdesigner-mcp/src/index.ts
```

On first use, the server automatically downloads and caches [touchdesigner-cli](https://github.com/michaelslain/touchdesigner-cli) into `~/.touchdesigner-mcp/cli/`.

## Requirements

- [Bun](https://bun.sh/)
- [Claude Code](https://claude.ai/download) installed and authenticated
- [TouchDesigner](https://derivative.ca/) running with the CLI server loaded

## Getting started

1. Ask Claude to run the `td_setup` tool — this installs the TCP server script and patches the default TD template
2. Open or create a TouchDesigner project — the server starts automatically on port 9005
3. Use any of the tools below from Claude

## Tools

| Tool | Description |
|------|-------------|
| `td_setup` | Install the TD server script and patch the default template |
| `td_info` | Get TouchDesigner version, build, and OS info |
| `td_node_list` | List child nodes under a path |
| `td_node_create` | Create a node (e.g. `textTOP`, `noiseCHOP`, `sphereSOP`) |
| `td_node_delete` | Delete a node |
| `td_node_connect` | Connect source output to target input |
| `td_node_disconnect` | Disconnect nodes |
| `td_node_errors` | Get errors on a node |
| `td_param_get` | Get node parameters (all or specific) |
| `td_param_set` | Set a node parameter value |
| `td_exec` | Execute Python code inside TouchDesigner |

## How it works

Each MCP tool call shells out to `touchdesigner-cli`, which communicates with TouchDesigner over TCP (NDJSON protocol on port 9005). The CLI is auto-downloaded on first run and cached in `~/.touchdesigner-mcp/settings.json`.

## Node families

TouchDesigner organizes operators into families:

- **TOP** �� textures/images (e.g. `noiseTOP`, `textTOP`, `compositeTOP`)
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
