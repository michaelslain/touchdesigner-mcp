# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

An MCP server that wraps [touchdesigner-cli](https://github.com/michaelslain/touchdesigner-cli), exposing TouchDesigner control as MCP tools for Claude Code. On first use, it auto-installs the CLI globally via `bun install -g touchdesigner-cli`.

## Commands

```bash
bun install          # install dependencies
bun src/index.ts     # run the MCP server (stdio)
```

There is no build step. Bun runs TypeScript directly.

## Architecture

Three files, single responsibility each:

- **`src/index.ts`** — Entry point. Creates `McpServer`, registers tools, connects `StdioServerTransport`.
- **`src/cli.ts`** — CLI lifecycle. `ensureCli()` checks for the global `td` command, auto-installs if missing; `runCli()` shells out to `td <args>`. Uses in-memory promise cache to prevent concurrent installs.
- **`src/tools.ts`** — Registers 14 MCP tools. `td_open` opens TouchDesigner. 11 tools build CLI args from validated Zod input and call `runCli()` wrapped in `withAutoSetup()` for automatic setup on connection failure. 2 doc tools (`td_doc_search`, `td_doc_read`) read operator markdown files directly from the `docs/` folder without using the CLI.

## Key Design Decisions

- Shells out to `touchdesigner-cli` rather than importing it — keeps the projects decoupled and lets the CLI evolve independently.
- CLI is installed globally (`td` command) rather than cloned — simpler, no settings files needed.
- `withAutoSetup()` wrapper catches connection errors, runs `td setup` + `injectServer()`, and retries — users never need to manually set up.
- Regular CLI calls get 15s timeout; install gets 120s.
- No build step — Bun runs `.ts` directly, matching the CLI's approach.
- Operator docs live in `docs/<FAMILY>/*.md` (e.g. `docs/TOP/Noise_TOP.md`). The doc tools scan these directly via `node:fs` — no CLI dependency. If the docs folder is missing or empty, the tools return a helpful message instead of crashing.
