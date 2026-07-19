import os from "node:os";
import type { Plugin } from "vite";

function getLanAddresses(): string[] {
  const nets = os.networkInterfaces();
  const addresses: string[] = [];

  for (const iface of Object.values(nets)) {
    if (!iface) continue;
    for (const cfg of iface) {
      if (cfg.family !== "IPv4" || cfg.internal) continue;
      if (cfg.address.startsWith("169.254.")) continue;
      addresses.push(cfg.address);
    }
  }

  return addresses.sort((a, b) => scoreAddress(b) - scoreAddress(a));
}

function scoreAddress(ip: string): number {
  if (ip.startsWith("192.168.1.")) return 100;
  if (ip.startsWith("192.168.")) return 80;
  if (ip.startsWith("10.")) return 60;
  if (ip.startsWith("172.")) return 40;
  if (ip.startsWith("192.168.56.")) return 10;
  return 20;
}

export function lanUrlPlugin(port: number): Plugin {
  return {
    name: "lan-url",
    configureServer(server) {
      server.httpServer?.once("listening", () => {
        const addresses = getLanAddresses();
        const primary = addresses[0];

        console.log("\n  ➜  Local:   http://localhost:" + port + "/");
        if (primary) {
          console.log("  ➜  Network: http://" + primary + ":" + port + "/");
          console.log("\n  📱 Open on your phone (same WiFi): http://" + primary + ":" + port + "/");
        }
        if (addresses.length > 1) {
          console.log("  Other LAN IPs: " + addresses.slice(1).map((ip) => `http://${ip}:${port}/`).join(", "));
        }
        console.log(
          "\n  If your phone cannot connect, allow Node.js through Windows Firewall (Private network).\n"
        );
      });
    },
  };
}
