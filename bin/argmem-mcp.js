#!/usr/bin/env node
// argmem-mcp — launcher for the ArgMem MCP server.
//
// The ArgMem engine is proprietary and never ships inside this npm
// package. This launcher finds a local engine install and runs the MCP
// server against it. If no engine is installed, it prints how to get one
// (argmem.com early access) and exits non-zero.
'use strict';

const { spawn } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const CANDIDATE_PY = ['python3', 'python'];

function findEngine() {
  const env = process.env.ARGMEM_ENGINE;
  if (env && fs.existsSync(env)) return env;
  const home = path.join(os.homedir(), '.argmem', 'engine.pyz');
  if (fs.existsSync(home)) return home;
  return null;
}

function noEngine() {
  process.stderr.write(
    'argmem-mcp: no ArgMem engine found.\n\n' +
    'The MCP server is open; the memory engine ships separately.\n' +
    '  1. Get access at https://argmem.com (free tier available).\n' +
    '  2. Save the engine to ~/.argmem/engine.pyz (or set ARGMEM_ENGINE).\n' +
    '  3. Run argmem-mcp again.\n'
  );
  process.exit(1);
}

const engine = findEngine() || noEngine();

// Try python3 then python; spawn the engine zipapp in MCP stdio mode.
function tryPy(i) {
  if (i >= CANDIDATE_PY.length) {
    process.stderr.write('argmem-mcp: no python3 interpreter found on PATH.\n');
    process.exit(1);
  }
  const child = spawn(CANDIDATE_PY[i], [engine, 'serve', '--stdio'], {
    stdio: ['inherit', 'inherit', 'inherit'],
    env: process.env,
  });
  child.on('error', () => tryPy(i + 1));
  child.on('exit', (code) => process.exit(code === null ? 1 : code));
}
tryPy(0);
