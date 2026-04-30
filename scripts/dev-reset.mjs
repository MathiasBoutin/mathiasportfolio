import { execFileSync, spawn } from "node:child_process";
import { rmSync } from "node:fs";

const PROCESS_PATTERNS = ["next dev", "next-server"];
const NEXT_DIR = ".next";
const NODE_BIN = `${process.env.HOME}/.nvm/versions/node/v22.22.2/bin`;
const nextEnv = {
  ...process.env,
  PATH: `${NODE_BIN}:${process.env.PATH ?? ""}`,
};

function getMatchingPids(pattern) {
  try {
    return execFileSync("pgrep", ["-f", pattern], { encoding: "utf8" })
      .split(/\s+/)
      .filter(Boolean)
      .map((pid) => Number.parseInt(pid, 10))
      .filter((pid) => Number.isInteger(pid) && pid !== process.pid);
  } catch {
    return [];
  }
}

function signalPid(pid, signal) {
  try {
    process.kill(pid, signal);
  } catch {
    // Process already exited.
  }
}

async function sleep(ms) {
  await new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function waitForExit(pids, timeoutMs) {
  const deadline = Date.now() + timeoutMs;

  while (Date.now() < deadline) {
    const running = pids.filter((pid) => {
      try {
        process.kill(pid, 0);
        return true;
      } catch {
        return false;
      }
    });

    if (running.length === 0) {
      return [];
    }

    await sleep(100);
  }

  return pids.filter((pid) => {
    try {
      process.kill(pid, 0);
      return true;
    } catch {
      return false;
    }
  });
}

const pids = [...new Set(PROCESS_PATTERNS.flatMap(getMatchingPids))];

for (const pid of pids) {
  signalPid(pid, "SIGTERM");
}

const remaining = await waitForExit(pids, 5_000);

for (const pid of remaining) {
  signalPid(pid, "SIGKILL");
}

await waitForExit(remaining, 1_000);

rmSync(NEXT_DIR, {
  recursive: true,
  force: true,
  maxRetries: 10,
  retryDelay: 100,
});

const next = spawn(
  "next",
  ["dev", "--turbopack", "--hostname", "127.0.0.1", "--port", "3000"],
  {
    env: nextEnv,
    stdio: "inherit",
    shell: true,
  },
);

next.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 0);
});
