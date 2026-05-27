import { spawn } from "node:child_process";

const PORT = 3000;
const NODE_BIN = `${process.env.HOME}/.nvm/versions/node/v22.22.2/bin`;
const env = {
  ...process.env,
  PATH: `${NODE_BIN}:${process.env.PATH ?? ""}`,
};

console.log(
  `\nOpening a public tunnel to http://127.0.0.1:${PORT} (keep \`npm run dev:lan\` running)…\n`,
);

const cloudflared = spawn(
  "npx",
  ["-y", "cloudflared", "tunnel", "--url", `http://127.0.0.1:${PORT}`],
  {
    env,
    stdio: ["ignore", "pipe", "pipe"],
    shell: true,
  },
);

function handleLine(line) {
  const trimmed = line.trim();
  if (!trimmed) return;

  process.stdout.write(`${trimmed}\n`);

  const match = trimmed.match(
    /https:\/\/[a-z0-9-]+\.trycloudflare\.com/i,
  );

  if (match) {
    console.log(`\n✅ Open on your phone: ${match[0]}\n`);
  }
}

let stdoutBuffer = "";
let stderrBuffer = "";

cloudflared.stdout.on("data", (chunk) => {
  stdoutBuffer += chunk.toString();
  const lines = stdoutBuffer.split("\n");
  stdoutBuffer = lines.pop() ?? "";

  for (const line of lines) {
    handleLine(line);
  }
});

cloudflared.stderr.on("data", (chunk) => {
  stderrBuffer += chunk.toString();
  const lines = stderrBuffer.split("\n");
  stderrBuffer = lines.pop() ?? "";

  for (const line of lines) {
    handleLine(line);
  }
});

cloudflared.on("exit", (code) => {
  process.exit(code ?? 0);
});
