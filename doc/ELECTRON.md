# Electron Desktop Application

This document describes the Electron wrapper for the Gecian Hub PWA, which allows users to install the app as a native desktop application.

## Overview

The Electron app wraps the production PWA URL and provides:
- Native desktop installers (.exe for Windows, .dmg for macOS, .deb and .AppImage for Linux)
- Standard desktop application experience (no browser UI)
- Automatic handling of external links (opens in default browser)
- Native window management and system integration

## Architecture

- **Main Process** (`electron/main.js`): Controls application lifecycle and creates windows
- **Preload Script** (`electron/preload.js`): Provides secure bridge between web content and Electron APIs
- **Production URL**: Loads the deployed PWA from the configured URL

## Configuration

### Setting the Production URL

The Electron app loads the PWA from the URL specified in the `PWA_URL` environment variable. If not set, it defaults to `https://gecian-hub.netlify.app/`.

**Option 1: Environment Variable**
```bash
# Windows (PowerShell)
$env:PWA_URL="hhttps://gecian-hub.netlify.app/"
npm run electron

# Windows (CMD)
set PWA_URL=https://gecian-hub.netlify.app/
npm run electron

# macOS/Linux
PWA_URL=https://gecian-hub.netlify.app/ npm run electron
```

**Option 2: Edit `electron/main.js`**
```javascript
const PRODUCTION_URL = process.env.PWA_URL || 'https://gecian-hub.netlify.app/';
```

## Development

### Running the Electron App Locally

1. **Install dependencies** (if not already done):
   ```bash
   npm install
   ```

2. **Run Electron in development mode**:
   ```bash
   npm run electron:dev
   ```

   Or with a custom URL:
   ```bash
   PWA_URL=https://gecian-hub.netlify.app/ npm run electron:dev
   ```

3. **Run Electron in production mode**:
   ```bash
   npm run electron
   ```

### Development Features

- DevTools are automatically opened in development mode (`NODE_ENV=development`)
- Console logs are available for debugging
- Hot reload is not available (Electron loads the remote URL)

## Building Installers

### Prerequisites

- **Windows**: Requires Windows 10+ and appropriate build tools
- **macOS**: Requires macOS 10.13+ and Xcode Command Line Tools
- **Linux**: Requires standard build tools (build-essential, etc.)

### Build Commands

**Build for current platform:**
```bash
npm run electron:build
```

**Build for specific platforms:**
```bash
# Windows only
npm run electron:build:win

# macOS only
npm run electron:build:mac

# Linux only
npm run electron:build:linux
```

### Build Output

Installers are generated in the `dist/` directory:

- **Windows**: `Gecian Hub Setup X.X.X.exe` (NSIS installer)
- **macOS**: `Gecian Hub-X.X.X.dmg` (Disk image)
- **Linux**: 
  - `Gecian Hub-X.X.X.AppImage` (Portable AppImage)
  - `gecian-hub_X.X.X_amd64.deb` (Debian package)

### Build Configuration

The build configuration is in `electron-builder.yml`. Key settings:

- **App ID**: `com.gecian.hub`
- **Product Name**: `Gecian Hub`
- **Icons**: Uses icons from `public/icons/icon-512.png`
- **Windows**: Creates NSIS installer with desktop shortcut
- **macOS**: Creates DMG with application link
- **Linux**: Creates both AppImage and .deb packages

## Distribution

### Code Signing (Optional but Recommended)

For production releases, you should sign your applications:

**Windows:**
- Obtain a code signing certificate
- Configure in `electron-builder.yml`:
  ```yaml
  win:
    certificateFile: path/to/certificate.pfx
    certificatePassword: your-password
  ```

**macOS:**
- Requires Apple Developer account
- Configure in `electron-builder.yml`:
  ```yaml
  mac:
    identity: "Developer ID Application: Your Name"
  ```

**Linux:**
- Notarization not required, but GPG signing recommended for .deb packages

### Auto-Updates (Optional)

To enable auto-updates, configure a publish provider in `electron-builder.yml`:

```yaml
publish:
  provider: github
  owner: your-username
  repo: gecian_hub
```

Then use `electron-updater` in the main process.

## Security Considerations

1. **Context Isolation**: Enabled by default - web content cannot access Node.js APIs directly
2. **Node Integration**: Disabled - prevents security vulnerabilities
3. **External Links**: All external links open in the default browser, not in the Electron window
4. **Navigation**: Only allows navigation within the same domain as the production URL

## Troubleshooting

### App won't start
- Check that the `PWA_URL` is accessible
- Verify Electron is installed: `npm list electron`
- Check console for errors: Run with `npm run electron:dev`

### Build fails
- Ensure all dependencies are installed: `npm install`
- Check that icons exist in `public/icons/`
- Verify you have build tools for your platform

### External links don't open
- This is expected behavior - external links open in the default browser
- Check that your default browser is configured correctly

### Window appears blank
- Verify the production URL is correct and accessible
- Check network connectivity
- Look for CORS or SSL certificate issues

## File Structure

```
.
├── electron/
│   ├── main.js          # Main Electron process
│   └── preload.js       # Preload script (security bridge)
├── electron-builder.yml # Build configuration
├── public/
│   └── icons/           # Application icons
└── dist/                 # Build output (generated)
```

## Additional Resources

- [Electron Documentation](https://www.electronjs.org/docs)
- [electron-builder Documentation](https://www.electron.build/)
- [Electron Security Best Practices](https://www.electronjs.org/docs/tutorial/security)

