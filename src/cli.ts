import { execFile } from "node:child_process";

let cliPromise: Promise<string> | null = null;

export function ensureCli(): Promise<string> {
  if (!cliPromise) cliPromise = resolveCliPath();
  return cliPromise;
}

async function resolveCliPath(): Promise<string> {
  try {
    return await exec("which", ["td"]);
  } catch {
    await exec("bun", ["install", "-g", "github:michaelslain/touchdesigner-cli"], { timeout: 120000 });
    return await exec("which", ["td"]);
  }
}

export async function runCli(...args: string[]): Promise<string> {
  await ensureCli();
  return await exec("td", args);
}

function exec(
  cmd: string,
  args: string[],
  opts?: { cwd?: string; timeout?: number }
): Promise<string> {
  return new Promise((resolve, reject) => {
    execFile(cmd, args, { cwd: opts?.cwd, timeout: opts?.timeout ?? 15000 }, (err, stdout, stderr) => {
      if (err) {
        reject(new Error(stderr.trim() || err.message));
      } else {
        resolve(stdout.trim());
      }
    });
  });
}

/**
 * Injects the TD server script into a running TouchDesigner instance
 * via osascript + textport. Used when TD is open with an un-patched project.
 * Returns a status message (never throws).
 */
export async function injectServer(port: number = 9005): Promise<string> {
  // Check if TD is running
  try {
    await exec("pgrep", ["-x", "TouchDesigner"], { timeout: 5000 });
  } catch {
    return "TouchDesigner is not running. Open TD and run setup again to inject the server.";
  }

  // Check if server is already listening
  const { connect } = await import("node:net");
  const alreadyRunning = await new Promise<boolean>((resolve) => {
    const socket = connect({ host: "127.0.0.1", port }, () => {
      socket.end();
      resolve(true);
    });
    socket.on("error", () => resolve(false));
    socket.setTimeout(2000, () => {
      socket.destroy();
      resolve(false);
    });
  });

  if (alreadyRunning) {
    return `Server already running on port ${port}.`;
  }

  // Inject via osascript: open textport (Option+T), type command, execute, close
  const pythonCmd =
    "exec(open(__import__('os').path.expanduser('~/.td-cli/td-server.py')).read())";
  const appleScript = [
    'tell application "TouchDesigner" to activate',
    "delay 0.5",
    'tell application "System Events"',
    '  tell process "TouchDesigner"',
    '    keystroke "t" using {option down}',
    "    delay 0.8",
    `    keystroke "${pythonCmd}"`,
    "    delay 0.3",
    "    keystroke return",
    "    delay 0.5",
    '    keystroke "t" using {option down}',
    "  end tell",
    "end tell",
  ].join("\n");

  try {
    await exec("osascript", ["-e", appleScript], { timeout: 15000 });
    return "Server script injected into running TouchDesigner via textport.";
  } catch (err) {
    const msg = (err as Error).message;
    if (msg.includes("not allowed assistive access")) {
      return (
        "Could not inject: Terminal needs Accessibility permission. " +
        "Go to System Settings > Privacy & Security > Accessibility and enable your terminal app."
      );
    }
    return `Could not auto-inject into running TD: ${msg}. You can manually open TD's textport (Option+T) and run: ${pythonCmd}`;
  }
}
