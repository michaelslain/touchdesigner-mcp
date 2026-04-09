# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

An MCP server that wraps [touchdesigner-cli](https://github.com/michaelslain/touchdesigner-cli), exposing TouchDesigner control as MCP tools for Claude Code. On first use, it auto-downloads the CLI from GitHub and caches it in `~/.touchdesigner-mcp/`.

## Commands

```bash
bun install          # install dependencies
bun src/index.ts     # run the MCP server (stdio)
```

There is no build step. Bun runs TypeScript directly.

## Architecture

Three files, single responsibility each:

- **`src/index.ts`** — Entry point. Creates `McpServer`, registers tools, connects `StdioServerTransport`.
- **`src/cli.ts`** — CLI lifecycle. `ensureCli()` clones/caches the CLI repo; `runCli()` shells out to `bun run <cli>/src/index.ts <args>`. Uses in-memory cache after first resolution to avoid disk reads on every tool call.
- **`src/tools.ts`** — Registers 13 MCP tools. 11 tools build CLI args from validated Zod input and call `runCli()`. 2 doc tools (`td_doc_search`, `td_doc_read`) read operator markdown files directly from the `docs/` folder without using the CLI. The `textResult()` helper wraps output into MCP response format.

## Key Design Decisions

- Shells out to `touchdesigner-cli` rather than importing it — keeps the projects decoupled and lets the CLI evolve independently.
- Settings stored in `~/.touchdesigner-mcp/settings.json` with `cliPath` pointing to the cached CLI clone.
- Git clone/bun install get 120s timeout; regular CLI calls get 15s.
- No build step — Bun runs `.ts` directly, matching the CLI's approach.
- Operator docs live in `docs/<FAMILY>/*.md` (e.g. `docs/TOP/Noise_TOP.md`). The doc tools scan these directly via `node:fs` — no CLI dependency. If the docs folder is missing or empty, the tools return a helpful message instead of crashing.
