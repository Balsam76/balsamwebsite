# Simple Verification Script
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Balsam Website Verification" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$domains = @("https://www.balsamapp.com", "https://balsamapp.com")
$allPassed = $true

foreach ($domain in $domains) {
    Write-Host "Checking: $domain" -ForegroundColor Cyan
    Write-Host "----------------------------------------" -ForegroundColor Gray
    
    # Asset Links
    Write-Host "Asset Links:" -ForegroundColor Yellow
    $assetlinksUrl = "$domain/.well-known/assetlinks.json"
    try {
        $response = Invoke-WebRequest -Uri $assetlinksUrl -Method Get -UseBasicParsing -ErrorAction Stop
        Write-Host "  Status: $($response.StatusCode)" -ForegroundColor Green
        Write-Host "  Content-Type: $($response.Headers['Content-Type'])" -ForegroundColor Green
        
        $content = $response.Content | ConvertFrom-Json
        Write-Host "  Package: $($content[0].target.package_name)" -ForegroundColor Green
        Write-Host "  SHA-256 Count: $($content[0].target.sha256_cert_fingerprints.Count)" -ForegroundColor Green
    } catch {
        Write-Host "  Failed: $($_.Exception.Message)" -ForegroundColor Red
        $allPassed = $false
    }
    
    Write-Host ""
    
    # Apple App Site Association
    Write-Host "Apple App Site Association:" -ForegroundColor Yellow
    $appleUrl = "$domain/.well-known/apple-app-site-association"
    try {
        $response = Invoke-WebRequest -Uri $appleUrl -Method Get -UseBasicParsing -ErrorAction Stop
        Write-Host "  Status: $($response.StatusCode)" -ForegroundColor Green
        Write-Host "  Content-Type: $($response.Headers['Content-Type'])" -ForegroundColor Green
    } catch {
        Write-Host "  Failed: $($_.Exception.Message)" -ForegroundColor Red
        $allPassed = $false
    }
    
    Write-Host ""
}

Write-Host "========================================" -ForegroundColor Cyan
if ($allPassed) {
    Write-Host "All Checks Passed!" -ForegroundColor Green
} else {
    Write-Host "Some Checks Failed!" -ForegroundColor Red
}
Write-Host "========================================" -ForegroundColor Cyan
