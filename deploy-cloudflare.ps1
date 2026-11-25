$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

Write-Host "==> Checking Cloudflare Wrangler authentication..." -ForegroundColor Cyan
npx wrangler whoami 2>$null
if ($LASTEXITCODE -ne 0) {
  Write-Host "==> Opening Cloudflare OAuth login in your browser..." -ForegroundColor Yellow
  npx wrangler login
  if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
}

Write-Host "==> Building client, SSR prerender (13 routes + 404.html)..." -ForegroundColor Cyan
npm run build
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Write-Host "==> Deploying to Cloudflare Workers & binding lehoanganh.id.vn + www.lehoanganh.id.vn..." -ForegroundColor Green
npx wrangler deploy
