Write-Host "Starting StitchBee APK Packaging pipeline..." -ForegroundColor Cyan

# Set Android SDK and Java Home paths correctly
$env:ANDROID_HOME = "$env:LOCALAPPDATA\Android\Sdk"
$env:JAVA_HOME = "C:\Program Files\Android\Android Studio\jbr"
Write-Host "Using Android SDK at: $env:ANDROID_HOME" -ForegroundColor Yellow
Write-Host "Using JAVA_HOME at: $env:JAVA_HOME" -ForegroundColor Yellow

# Install dependencies (Capacitor 4.8.2 is compatible with Node 14)
Write-Host "Installing Capacitor 4 packages (for Node 14 compatibility)..." -ForegroundColor Yellow
npm install @capacitor/core@4.8.2 @capacitor/cli@4.8.2 @capacitor/android@4.8.2 --save-dev

# Compile production bundle
Write-Host "Building web bundle..." -ForegroundColor Yellow
npm run build

# Add or sync android folder
if (-not (Test-Path .\android)) {
    Write-Host "Initializing Capacitor android folder..." -ForegroundColor Yellow
    npx cap add android
} else {
    Write-Host "Syncing assets to android folder..." -ForegroundColor Yellow
    npx cap sync
}

# Compile APK using local Gradle Wrapper
Write-Host "Compiling APK via Gradle Wrapper..." -ForegroundColor Yellow
cd android
.\gradlew.bat assembleDebug
cd ..

# Copy final APK
$apkSource = ".\android\app\build\outputs\apk\debug\app-debug.apk"
if (Test-Path $apkSource) {
    Copy-Item $apkSource -Destination ".\StitchBee.apk" -Force
    Write-Host "`n[SUCCESS] StitchBee.apk successfully compiled and saved in project root!" -ForegroundColor Green
    Write-Host "File saved to: c:\Users\axxonet\Desktop\StichBee\StitchBee.apk" -ForegroundColor Green
} else {
    Write-Error "Build failed: app-debug.apk was not generated."
}
