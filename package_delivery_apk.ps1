Write-Host "Starting StitchBee Delivery Partner APK Packaging pipeline..." -ForegroundColor Cyan

# Set Android SDK and Java Home paths correctly
$env:ANDROID_HOME = "$env:LOCALAPPDATA\Android\Sdk"
$env:JAVA_HOME = "C:\Program Files\Android\Android Studio\jbr"
Write-Host "Using Android SDK at: $env:ANDROID_HOME" -ForegroundColor Yellow
Write-Host "Using JAVA_HOME at: $env:JAVA_HOME" -ForegroundColor Yellow

# Change directory to delivery-portal
cd delivery-portal

# Install dependencies (Capacitor 4.8.2 is compatible with Node 14)
Write-Host "Installing Capacitor 4 packages inside delivery-portal..." -ForegroundColor Yellow
npm install @capacitor/core@4.8.2 @capacitor/cli@4.8.2 @capacitor/android@4.8.2 --save-dev

# Compile production bundle
Write-Host "Building delivery-portal web bundle..." -ForegroundColor Yellow
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
Write-Host "Compiling Delivery Partner APK via Gradle Wrapper..." -ForegroundColor Yellow
cd android
.\gradlew.bat assembleDebug
cd ..

# Copy final APK to root folder
$apkSource = ".\android\app\build\outputs\apk\debug\app-debug.apk"
if (Test-Path $apkSource) {
    Copy-Item $apkSource -Destination "..\StitchBeeDelivery.apk" -Force
    Write-Host "`n[SUCCESS] StitchBeeDelivery.apk successfully compiled and saved in project root!" -ForegroundColor Green
    Write-Host "File saved to: c:\Users\axxonet\Desktop\StichBee\StitchBeeDelivery.apk" -ForegroundColor Green
} else {
    Write-Error "Build failed: app-debug.apk was not generated."
}

cd ..
