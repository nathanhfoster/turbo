# PWA Icons

## Icon Requirements

Your PWA needs icons in multiple sizes for different platforms. The manifest.json is already configured with paths to these icons.

## Required Sizes

### Android

- 48x48, 72x72, 96x96, 144x144, 192x192, 512x512

### iOS

- 16x16, 57x57, 60x60, 72x72, 76x76, 114x114, 120x120, 144x144, 152x152, 167x167, 180x180, 192x192, 256x256, 512x512, 1024x1024

### Windows11

- Various tile sizes and splash screens

## How to Generate Icons

### Option 1: PWA Asset Generator (Recommended)

```bash
npx pwa-asset-generator [source-logo.png] public/icons \
  --background "#FFE500" \
  --favicon \
  --type png \
  --padding "10%"
```

### Option 2: RealFaviconGenerator

Visit https://realfavicongenerator.net/ and upload your logo. It will generate all required sizes and provide a ZIP download.

### Option 3: Manual Creation

Use design tools like Figma, Photoshop, or GIMP to manually create each size.

## Current Status

⚠️ **TODO**: Generate icons using your logo/brand

The manifest.json references icon paths that need to be created:

- `/icons/android/android-launchericon-*.png`
- `/icons/ios/*.png`
- `/icons/windows11/*.png`

## Tips

- Use a square source image (1024x1024 or larger)
- Make sure your logo works well on both light and dark backgrounds
- Test on different devices after generation
- The primary brand color (#FFE500) should be used for the background where appropriate
