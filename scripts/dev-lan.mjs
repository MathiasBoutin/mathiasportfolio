import { execFileSync, spawn } from "node:child_process";
import { networkInterfaces } from "node:os";

const PORT = 3000;
const NODE_BIN = `${process.env.HOME}/.nvm/versions/node/v22.22.2/bin`;
const nextEnv = {
  ...process.env,
  PATH: `${NODE_BIN}:${process.env.PATH ?? ""}`,
};

function getLanAddresses() {
  const addresses = [];

  for (const entries of Object.values(networkInterfaces())) {
    if (!entries) continue;

    for (const entry of entries) {
      if (entry.family !== "IPv4" || entry.internal) continue;
      addresses.push(entry.address);
    }
  }

  return [...new Set(addresses)];
}

function getBonjourHost() {
  try {
    const localHostName = execFileSync("scutil", ["--get", "LocalHostName"], {
      encoding: "utf8",
    }).trim();

    return localHostName ? `${localHostName}.local` : null;
  } catch {
    return null;
  }
}

const lanAddresses = getLanAddresses();
const bonjourHost = getBonjourHost();

console.log("\n📱 Phone testing URLs (same Wi‑Fi, use http:// not https://):\n");

for (const address of lanAddresses) {
  console.log(`   http://${address}:${PORT}`);
}

if (bonjourHost) {
  console.log(`   http://${bonjourHost}:${PORT}`);
}

console.log(
  "\nIf those fail on your phone, run `npm run dev:tunnel` in another terminal.\n",
);

const next = spawn(
  "next",
  ["dev", "--turbopack", "--hostname", "0.0.0.0", "--port", String(PORT)],
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
