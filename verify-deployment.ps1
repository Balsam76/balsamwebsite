# ==========================================
# 🔍 سكريبت التحقق من النشر - Balsam Website
# ==========================================

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "🔍 Balsam Website Verification" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$domains = @(
    "https://www.balsamapp.com",
    "https://balsamapp.com"
)

$allPassed = $true

foreach ($domain in $domains) {
    Write-Host "🌐 Checking: $domain" -ForegroundColor Cyan
    Write-Host "----------------------------------------" -ForegroundColor Gray
    
    # ✅ 1. Asset Links
    Write-Host "📄 Asset Links (.well-known/assetlinks.json):" -ForegroundColor Yellow
    $assetlinksUrl = "$domain/.well-known/assetlinks.json"
    try {
        $response = Invoke-WebRequest -Uri $assetlinksUrl -Method Get -UseBasicParsing -ErrorAction Stop
        
        Write-Host "  Status Code: $($response.StatusCode)" -ForegroundColor $(if ($response.StatusCode -eq 200) { "Green" } else { "Red" })
        
        $contentType = $response.Headers["Content-Type"]
        Write-Host "  Content-Type: $contentType" -ForegroundColor $(if ($contentType -like "*application/json*") { "Green" } else { "Yellow" })
        
        # التحقق من المحتوى
        try {
            $content = $response.Content | ConvertFrom-Json
            Write-Host "  Package Name: $($content[0].target.package_name)" -ForegroundColor $(if ($content[0].target.package_name -eq "xyz.create.CreateExpoEnvironment") { "Green" } else { "Red" })
            Write-Host "  SHA-256 Fingerprints: $($content[0].target.sha256_cert_fingerprints.Count)" -ForegroundColor Green
            foreach ($fp in $content[0].target.sha256_cert_fingerprints) {
                Write-Host "    - $fp" -ForegroundColor Gray
            }
            
            if ($content[0].target.package_name -ne "xyz.create.CreateExpoEnvironment") {
                $allPassed = $false
            }
        } catch {
            Write-Host "  ❌ Invalid JSON content!" -ForegroundColor Red
            $allPassed = $false
        }
        
    } catch {
        Write-Host "  ❌ Failed: $($_.Exception.Message)" -ForegroundColor Red
        $allPassed = $false
    }
    
    Write-Host ""
    
    # ✅ 2. Apple App Site Association
    Write-Host "🍎 Apple App Site Association:" -ForegroundColor Yellow
    $appleAppSiteUrl = "$domain/.well-known/apple-app-site-association"
    try {
        $response = Invoke-WebRequest -Uri $appleAppSiteUrl -Method Get -UseBasicParsing -ErrorAction Stop
        
        Write-Host "  Status Code: $($response.StatusCode)" -ForegroundColor $(if ($response.StatusCode -eq 200) { "Green" } else { "Red" })
        
        $contentType = $response.Headers["Content-Type"]
        Write-Host "  Content-Type: $contentType" -ForegroundColor $(if ($contentType -like "*application/json*" -or $contentType -like "*text/plain*") { "Green" } else { "Yellow" })
        
        # التحقق من المحتوى
        try {
            $content = $response.Content | ConvertFrom-Json
            Write-Host "  App IDs: $($content.applinks.details[0].appIDs.Count)" -ForegroundColor Green
            Write-Host "  Paths: $($content.applinks.details[0].paths -join ', ')" -ForegroundColor Green
        } catch {
            Write-Host "  ⚠️ Could not parse JSON (may be valid)" -ForegroundColor Yellow
        }
        
    } catch {
        Write-Host "  ❌ Failed: $($_.Exception.Message)" -ForegroundColor Red
        $allPassed = $false
    }
    
    Write-Host ""
    Write-Host "----------------------------------------" -ForegroundColor Gray
    Write-Host ""
}

# ✅ 3. اختبار رابط صوتي
Write-Host "🎤 Testing Voice Session Link:" -ForegroundColor Yellow
$testSessionId = "7b0ea195-1d9d-49d1-ac39-e412f0a01554"
$testToken = "test-token-123"
$testUrl = "https://www.balsamapp.com/j/$testSessionId?token=$testToken"

Write-Host "  URL: $testUrl" -ForegroundColor Cyan
try {
    $response = Invoke-WebRequest -Uri $testUrl -Method Get -UseBasicParsing -ErrorAction Stop
    Write-Host "  Status Code: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "  ✅ Link is accessible" -ForegroundColor Green
} catch {
    Write-Host "  ⚠️ Link test: $($_.Exception.Message)" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan

if ($allPassed) {
    Write-Host "✅ All Checks Passed!" -ForegroundColor Green
} else {
    Write-Host "❌ Some Checks Failed!" -ForegroundColor Red
}

Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
