# ==========================================
# 🚀 سكريبت النشر والتحقق - Balsam Website
# ==========================================

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "🚀 Balsam Website Deployment & Verification" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# ✅ الخطوة 1: التحقق من الملفات المطلوبة
Write-Host "📋 Step 1: Verifying Required Files..." -ForegroundColor Yellow
Write-Host ""

$assetlinksPath = "public\.well-known\assetlinks.json"
$appleAppSitePath = "public\.well-known\apple-app-site-association"

if (-not (Test-Path $assetlinksPath)) {
    Write-Host "❌ ERROR: $assetlinksPath not found!" -ForegroundColor Red
    exit 1
}
Write-Host "✅ $assetlinksPath exists" -ForegroundColor Green

if (-not (Test-Path $appleAppSitePath)) {
    Write-Host "❌ ERROR: $appleAppSitePath not found!" -ForegroundColor Red
    exit 1
}
Write-Host "✅ $appleAppSitePath exists" -ForegroundColor Green

# ✅ التحقق من محتوى assetlinks.json
$assetlinks = Get-Content $assetlinksPath -Raw | ConvertFrom-Json
if ($assetlinks[0].target.package_name -ne "xyz.create.CreateExpoEnvironment") {
    Write-Host "❌ ERROR: Package name mismatch in assetlinks.json!" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Package name correct in assetlinks.json" -ForegroundColor Green

if ($assetlinks[0].target.sha256_cert_fingerprints.Count -eq 0) {
    Write-Host "❌ ERROR: No SHA-256 fingerprints in assetlinks.json!" -ForegroundColor Red
    exit 1
}
Write-Host "✅ SHA-256 fingerprints found: $($assetlinks[0].target.sha256_cert_fingerprints.Count)" -ForegroundColor Green

Write-Host ""
Write-Host "✅ All files verified!" -ForegroundColor Green
Write-Host ""

# ✅ الخطوة 2: بناء المشروع
Write-Host "🔨 Step 2: Building Project..." -ForegroundColor Yellow
Write-Host ""

if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ ERROR: npm install failed!" -ForegroundColor Red
        exit 1
    }
}

Write-Host "🏗️ Building project..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ ERROR: Build failed!" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Build successful!" -ForegroundColor Green
Write-Host ""

# ✅ الخطوة 3: النشر على Vercel
Write-Host "🚀 Step 3: Deploying to Vercel..." -ForegroundColor Yellow
Write-Host ""

# التحقق من وجود Vercel CLI
$vercelInstalled = Get-Command vercel -ErrorAction SilentlyContinue
if (-not $vercelInstalled) {
    Write-Host "⚠️ Vercel CLI not found. Installing..." -ForegroundColor Yellow
    npm install -g vercel
}

Write-Host "📤 Deploying to production..." -ForegroundColor Yellow
vercel --prod
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ ERROR: Deployment failed!" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Deployment successful!" -ForegroundColor Green
Write-Host ""

# ✅ الخطوة 4: التحقق من النشر
Write-Host "🔍 Step 4: Verifying Deployment..." -ForegroundColor Yellow
Write-Host ""

Start-Sleep -Seconds 5  # انتظار حتى يتم نشر الملفات

$domains = @(
    "https://www.balsamapp.com",
    "https://balsamapp.com"
)

foreach ($domain in $domains) {
    Write-Host "Checking $domain..." -ForegroundColor Cyan
    
    # ✅ التحقق من Asset Links
    $assetlinksUrl = "$domain/.well-known/assetlinks.json"
    try {
        $response = Invoke-WebRequest -Uri $assetlinksUrl -Method Get -UseBasicParsing -ErrorAction Stop
        
        if ($response.StatusCode -eq 200) {
            Write-Host "  ✅ Asset Links: HTTP $($response.StatusCode)" -ForegroundColor Green
            
            $contentType = $response.Headers["Content-Type"]
            if ($contentType -like "*application/json*") {
                Write-Host "  ✅ Content-Type: $contentType" -ForegroundColor Green
            } else {
                Write-Host "  ⚠️ Content-Type: $contentType (expected application/json)" -ForegroundColor Yellow
            }
            
            # التحقق من المحتوى
            $content = $response.Content | ConvertFrom-Json
            if ($content[0].target.package_name -eq "xyz.create.CreateExpoEnvironment") {
                Write-Host "  ✅ Package name correct" -ForegroundColor Green
            } else {
                Write-Host "  ❌ Package name mismatch!" -ForegroundColor Red
            }
        } else {
            Write-Host "  ❌ Asset Links: HTTP $($response.StatusCode)" -ForegroundColor Red
        }
    } catch {
        Write-Host "  ❌ Asset Links: Failed to fetch - $($_.Exception.Message)" -ForegroundColor Red
    }
    
    # ✅ التحقق من Apple App Site Association
    $appleAppSiteUrl = "$domain/.well-known/apple-app-site-association"
    try {
        $response = Invoke-WebRequest -Uri $appleAppSiteUrl -Method Get -UseBasicParsing -ErrorAction Stop
        
        if ($response.StatusCode -eq 200) {
            Write-Host "  ✅ Apple App Site Association: HTTP $($response.StatusCode)" -ForegroundColor Green
            
            $contentType = $response.Headers["Content-Type"]
            if ($contentType -like "*application/json*" -or $contentType -like "*text/plain*") {
                Write-Host "  ✅ Content-Type: $contentType" -ForegroundColor Green
            } else {
                Write-Host "  ⚠️ Content-Type: $contentType" -ForegroundColor Yellow
            }
        } else {
            Write-Host "  ❌ Apple App Site Association: HTTP $($response.StatusCode)" -ForegroundColor Red
        }
    } catch {
        Write-Host "  ❌ Apple App Site Association: Failed to fetch - $($_.Exception.Message)" -ForegroundColor Red
    }
    
    Write-Host ""
}

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "✅ Deployment & Verification Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "📝 Next Steps:" -ForegroundColor Yellow
Write-Host "1. Test App Links on Android device" -ForegroundColor White
Write-Host "2. Test Universal Links on iOS device" -ForegroundColor White
Write-Host "3. Verify with: adb shell pm get-app-links xyz.create.CreateExpoEnvironment" -ForegroundColor White
Write-Host ""
