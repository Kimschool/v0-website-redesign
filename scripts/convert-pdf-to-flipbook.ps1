param(
  [Parameter(Mandatory = $true)]
  [string]$PdfPath,

  [Parameter(Mandatory = $true)]
  [string]$OutDir,

  [int]$Dpi = 260,

  [ValidateSet("webp","jpg","png")]
  [string]$Format = "webp",

  [int]$StartAt = 1
)

$ErrorActionPreference = "Stop"

function Assert-Command([string]$cmd) {
  if (-not (Get-Command $cmd -ErrorAction SilentlyContinue)) {
    throw "Required command not found: $cmd. Install Poppler and ensure '$cmd' is on PATH."
  }
}

Assert-Command "pdftoppm"

if (-not (Test-Path $PdfPath)) {
  throw "PDF not found: $PdfPath"
}

New-Item -ItemType Directory -Force -Path $OutDir | Out-Null

$tmp = Join-Path $OutDir "_tmp"
if (Test-Path $tmp) { Remove-Item -Recurse -Force $tmp }
New-Item -ItemType Directory -Force -Path $tmp | Out-Null

$prefix = Join-Path $tmp "page"

Write-Host "Converting PDF -> images..."
Write-Host "  pdf: $PdfPath"
Write-Host "  out: $OutDir"
Write-Host "  dpi: $Dpi"
Write-Host "  fmt: $Format"

$args = @()
switch ($Format) {
  "webp" { $args += "-webp" }
  "jpg"  { $args += "-jpeg" }
  "png"  { $args += "-png" }
}
$args += @("-r", "$Dpi", $PdfPath, $prefix)

& pdftoppm @args | Out-Null

$generated = Get-ChildItem -Path $tmp -File | Sort-Object Name
if ($generated.Count -eq 0) {
  throw "No images were generated. Check pdftoppm output and PDF validity."
}

Write-Host ("Generated {0} pages" -f $generated.Count)

Write-Host "Renaming to 4-digit sequence and writing manifest.json..."
$pages = @()
$i = $StartAt
foreach ($f in $generated) {
  $name = "{0:D4}.{1}" -f $i, $Format
  $dest = Join-Path $OutDir $name
  Move-Item -Force -Path $f.FullName -Destination $dest
  $pages += $name
  $i++
}

$manifest = [ordered]@{
  pages = $pages
}

$manifestPath = Join-Path $OutDir "manifest.json"
$manifest | ConvertTo-Json -Depth 4 | Set-Content -Encoding UTF8 $manifestPath

Remove-Item -Recurse -Force $tmp

Write-Host "Done."
Write-Host "Upload the entire folder to your server, keeping manifest.json next to the images."
Write-Host "Example URL: https://weavus-group.com/kcp/flipbooks/pamphlet/ja/manifest.json"

