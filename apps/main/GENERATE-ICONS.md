# PWA Icon Generation Guide

## Using RealFaviconGenerator.net

### Step 1: Visit the Website

Go to: **https://realfavicongenerator.net/**

### Step 2: Upload Your Logo

1. Click "Select your Favicon image"
2. Upload your logo file (PNG, SVG, or JPG)
3. Minimum size: 260x260px (recommended: 512x512px or higher)

### Step 3: Configure Platform-Specific Settings

#### **iOS Web App Settings**

- **Background color**: `#FFE500` (your brand yellow)
- **Margin**: 10% (recommended for breathing room)
- **Dedicated picture**: Use the same logo or create iOS-specific version

#### **Android Chrome Settings**

- **Theme color**: `#FFE500`
- **App name**: `AgentNate`
- **Manifest name**: `AgentNate - Portfolio & Consultancy`
- **Picture for Chrome**: Use the generated picture
- **Margin**: 10%

#### **Windows Metro Settings** (Optional)

- **Background color**: `#FFE500`
- **Tile color**: Match your theme

#### **macOS Safari Settings** (Optional)

- **Theme color**: `#FFE500`
- **Pinned tab color**: `#000000` (black) or `#2d3748` (dark gray)

### Step 4: Generate and Download

1. Scroll to the bottom
2. Click **"Generate your Favicons and HTML code"**
3. Wait for generation to complete
4. Click **"Download your package"** button

### Step 5: Extract Files

1. Unzip the downloaded file
2. You'll see many PNG files and some HTML code

### Step 6: Organize Files in Your Project

Copy files to the correct locations:

```bash
# From your download folder, assuming files are extracted:

# Copy Android icons
cp android-chrome-192x192.png apps/main/public/icons/android/android-launchericon-192-192.png
cp android-chrome-512x512.png apps/main/public/icons/android/android-launchericon-512-512.png

# Copy Apple icons
cp apple-touch-icon.png apps/main/public/icons/ios/180.png
cp apple-touch-icon-120x120.png apps/main/public/icons/ios/120.png
cp apple-touch-icon-152x152.png apps/main/public/icons/ios/152.png
cp apple-touch-icon-180x180.png apps/main/public/icons/ios/180.png

# Copy other sizes to both android and ios folders
# Adjust sizes as needed based on what was generated
```

### Step 7: Update manifest.ts

Once you have all the icons in place, replace the content of `apps/main/app/manifest.ts` with the content from `apps/main/app/manifest-full.ts.template`.

```bash
# From your project root
cp apps/main/app/manifest-full.ts.template apps/main/app/manifest.ts
```

### Step 8: Verify

Build and test:

```bash
cd apps/main
pnpm build
```

Check that the manifest is generated correctly by looking at:
`.next/server/app/manifest.webmanifest.body`

### Optional: Screenshots

If you want to add PWA screenshots (shown in app stores):

1. Take screenshots of your app at these sizes:
   - **Desktop**: 1280x720 (wide)
   - **Mobile**: 750x1334 (narrow)

2. Save them as:
   - `public/screenshots/home.png` (desktop screenshot)
   - `public/screenshots/blog.png` (mobile screenshot)

## Alternative: Quick Icon Copy

If you already have generated icons in a different format, create this mapping:

| Generated File                 | Copy To                                           |
| ------------------------------ | ------------------------------------------------- |
| `android-chrome-48x48.png`     | `/icons/android/android-launchericon-48-48.png`   |
| `android-chrome-72x72.png`     | `/icons/android/android-launchericon-72-72.png`   |
| `android-chrome-96x96.png`     | `/icons/android/android-launchericon-96-96.png`   |
| `android-chrome-144x144.png`   | `/icons/android/android-launchericon-144-144.png` |
| `android-chrome-192x192.png`   | `/icons/android/android-launchericon-192-192.png` |
| `android-chrome-512x512.png`   | `/icons/android/android-launchericon-512-512.png` |
| `apple-touch-icon-57x57.png`   | `/icons/ios/57.png`                               |
| `apple-touch-icon-60x60.png`   | `/icons/ios/60.png`                               |
| `apple-touch-icon-72x72.png`   | `/icons/ios/72.png`                               |
| `apple-touch-icon-76x76.png`   | `/icons/ios/76.png`                               |
| `apple-touch-icon-114x114.png` | `/icons/ios/114.png`                              |
| `apple-touch-icon-120x120.png` | `/icons/ios/120.png`                              |
| `apple-touch-icon-144x144.png` | `/icons/ios/144.png`                              |
| `apple-touch-icon-152x152.png` | `/icons/ios/152.png`                              |
| `apple-touch-icon-180x180.png` | `/icons/ios/180.png`                              |

## Brand Colors Reference

- **Primary Theme**: `#FFE500` (Yellow)
- **Background**: `#ffffff` (White)
- **Text**: `#2d3748` (Dark Gray)

## Testing Your Icons

After setup:

1. Build your app: `pnpm build`
2. Run dev server: `pnpm dev`
3. Open Chrome DevTools
4. Go to Application tab → Manifest
5. Verify all icons show correctly
6. Test PWA installation

## Need Help?

- Can't find a specific icon size? Use an online image resizer
- Icons look blurry? Make sure source image is high resolution
- Manifest errors? Check the console in DevTools
