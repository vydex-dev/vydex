# Build upload-ready ZIPs for every sample project → samples/dist/<name>.zip
# Contents sit at the archive ROOT (like `git archive`), which is what the
# Vydex upload pipeline expects for a clean file tree.
$ErrorActionPreference = 'Stop'
$root = $PSScriptRoot
$dist = Join-Path $root 'dist'
New-Item -ItemType Directory -Force $dist | Out-Null

Get-ChildItem $root -Directory | Where-Object { $_.Name -ne 'dist' } | ForEach-Object {
  $zip = Join-Path $dist ($_.Name + '.zip')
  if (Test-Path $zip) { Remove-Item $zip -Force }
  Compress-Archive -Path (Join-Path $_.FullName '*') -DestinationPath $zip
  $kb = [math]::Round((Get-Item $zip).Length / 1KB, 1)
  Write-Host ("{0,-28} {1,8} KB" -f $_.Name, $kb)
}
Write-Host "`nDone -> $dist"
