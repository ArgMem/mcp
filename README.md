# argmem-mcp

Official MCP server launcher for **ArgMem** — agent memory with receipts.

ArgMem is argumentation memory for LLM agents: observations (grounded facts
with provenance) support claims; objections contest them; sustaining
arguments answer objections; presumptions carry a TTL and quietly lapse
unless re-confirmed. Belief states (HELD / CONTESTED / LAPSED / RETRACTED)
are computed from the argument graph on every write — never asserted — and
the whole store is an append-only JSONL audit log that replays to a
byte-identical state on restart.

## Install

```bash
npm install -g argmem-mcp
```

## Use with Claude Code

```bash
claude mcp add argmem -- argmem-mcp
```

or with any MCP client that runs a stdio command.

## The engine ships separately

This package is the open launcher. The ArgMem engine is proprietary and is
**not** distributed through npm:

1. Get access at <https://argmem.com> (free tier available).
2. Save the engine zipapp to `~/.argmem/engine.pyz`
   (or point `ARGMEM_ENGINE` at it).
3. Run `argmem-mcp`.

The launcher finds a local Python 3 (`python3` or `python`), starts the
engine in MCP stdio mode, and gets out of the way.

## License

MIT for this launcher (see LICENSE). The ArgMem engine is licensed
separately under Argmem's terms — <https://argmem.com>.

© 2026 Argmem · U.S. Provisional Patent Application No. 64/177,143
