# Run this script in PowerShell AS ADMINISTRATOR if your phone cannot open the dev site.
# Right-click PowerShell -> Run as administrator, then:
#   cd path\to\Cross-Platform-Design\artifacts\bistro-claytopia
#   .\scripts\allow-vite-firewall.ps1

$ruleName = "Bistro Claytopia Vite 3000"

$existing = netsh advfirewall firewall show rule name="$ruleName" 2>$null
if ($LASTEXITCODE -eq 0) {
  Write-Host "Firewall rule '$ruleName' already exists."
} else {
  netsh advfirewall firewall add rule name="$ruleName" dir=in action=allow protocol=TCP localport=3000 profile=private
  Write-Host "Added firewall rule for TCP port 3000 (Private network)."
}

Write-Host ""
Write-Host "Start the app: npm run dev"
Write-Host "Then on your phone (same WiFi), open the Network URL shown in the terminal."
Write-Host "Use 192.168.1.x — NOT 192.168.56.x (that is usually a virtual adapter)."
