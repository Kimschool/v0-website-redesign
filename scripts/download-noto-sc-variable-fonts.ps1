$ErrorActionPreference = "Stop"

function Download-File($Uri, $OutFile) {
  Write-Host "Downloading: $Uri"
  $dir = Split-Path -Parent $OutFile
  if (!(Test-Path $dir)) { New-Item -ItemType Directory -Path $dir | Out-Null }
  Invoke-WebRequest -Uri $Uri -OutFile $OutFile -UseBasicParsing
  Write-Host "Saved: $OutFile"
}

function Download-TtfByWeight($Css, $FontPrefix, $Weights) {
  $map = @{}
  if ([string]::IsNullOrWhiteSpace($Css)) {
    throw "Empty CSS content for $FontPrefix"
  }
  if ($Css -notmatch "@font-face") {
    Write-Host "DEBUG: CSS does not contain @font-face for $FontPrefix. First 200 chars:"
    Write-Host ($Css.Substring(0, [Math]::Min(200, $Css.Length)))
  }
  $blocks = $Css -split "@font-face" | Where-Object { $_ -match "font-weight" }
  foreach ($b in $blocks) {
    $wm = [regex]::Match($b, "font-weight:\\s*(\\d+)\\s*;")
    $um = [regex]::Match($b, "src:\\s*url\\((https:\\/\\/[^\\)]+\\.ttf)\\)")
    if ($wm.Success -and $um.Success) {
      $map[[int]$wm.Groups[1].Value] = $um.Groups[1].Value
    }
  }

  foreach ($w in $Weights) {
    if (!$map.ContainsKey([int]$w)) {
      $keys = ($map.Keys | Sort-Object) -join ","
      throw "Could not find TTF URL for ${FontPrefix} weight=${w}. Available weights: $keys"
    }
    $url = $map[[int]$w]
    Download-File -Uri $url -OutFile (Join-Path $outDir \"${FontPrefix}-${w}.ttf\")
  }
}

$root = Resolve-Path (Join-Path $PSScriptRoot "..")
$outDir = Join-Path $root "public\\fonts"

# NOTE: 이 환경에서는 Google Fonts CSS 응답에 woff2가 아닌 ttf만 내려옵니다.
# 따라서 필요한 굵기만 지정해 ttf를 weight별로 다운로드합니다.
$sansWeights = @(300, 400, 500, 600, 700)
$serifWeights = @(400, 500, 600, 700)

$sansCssUrl  = "https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300%3B400%3B500%3B600%3B700&display=swap"
$serifCssUrl = "https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400%3B500%3B600%3B700&display=swap"

Write-Host "Fetching Google Fonts CSS..."
$sansCss  = (curl.exe -s $sansCssUrl) -join "`n"
$serifCss = (curl.exe -s $serifCssUrl) -join "`n"

Download-TtfByWeight -Css $sansCss -FontPrefix "NotoSansSC" -Weights $sansWeights
Download-TtfByWeight -Css $serifCss -FontPrefix "NotoSerifSC" -Weights $serifWeights

Write-Host ""
Write-Host "Done."
Write-Host "Downloaded files:"
Write-Host " - public/fonts/NotoSansSC-{300,400,500,600,700}.ttf"
Write-Host " - public/fonts/NotoSerifSC-{400,500,600,700}.ttf"

