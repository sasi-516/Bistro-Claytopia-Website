/**
 * Frees a TCP port before starting the dev server.
 * Prevents "Port 3000 is already in use" when a previous Vite instance is still running.
 */
import { execSync } from "node:child_process";

const port = Number(process.argv[2] ?? 3000);

function freePortOnWindows(targetPort) {
  try {
    const output = execSync(`netstat -ano | findstr :${targetPort}`, {
      encoding: "utf8",
      stdio: ["pipe", "pipe", "ignore"],
    });

    const pids = new Set();
    for (const line of output.split(/\r?\n/)) {
      if (!line.includes("LISTENING")) continue;
      const parts = line.trim().split(/\s+/);
      const pid = parts[parts.length - 1];
      if (pid && /^\d+$/.test(pid)) pids.add(pid);
    }

    for (const pid of pids) {
      try {
        execSync(`taskkill /PID ${pid} /F`, { stdio: "ignore" });
        console.log(`Freed port ${targetPort} (stopped PID ${pid})`);
      } catch {
        // Process may have already exited
      }
    }
  } catch {
    // Port not in use — nothing to do
  }
}

function freePortOnUnix(targetPort) {
  try {
    const output = execSync(`lsof -ti :${targetPort}`, {
      encoding: "utf8",
      stdio: ["pipe", "pipe", "ignore"],
    });
    for (const pid of output.split(/\r?\n/).filter(Boolean)) {
      try {
        execSync(`kill -9 ${pid}`, { stdio: "ignore" });
        console.log(`Freed port ${targetPort} (stopped PID ${pid})`);
      } catch {
        // ignore
      }
    }
  } catch {
    // Port not in use
  }
}

if (process.platform === "win32") {
  freePortOnWindows(port);
} else {
  freePortOnUnix(port);
}
