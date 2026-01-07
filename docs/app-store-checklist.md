# Tacit — App Store Checklist (iOS + Capacitor)

## One-time setup

- Confirm Node is `22+`: `node --version`
- Build + sync iOS assets: `npm run cap:sync:ios`
- Open Xcode: `npm run cap:open:ios`
- In Xcode (required):
  - Select the `App` target → **Signing & Capabilities**
  - Set your **Team**
  - Ensure **Bundle Identifier** matches `capacitor.config.json` (`com.danielkurganov.tacit` today)

## Before first TestFlight upload

- App icons:
  - `ios/App/App/Assets.xcassets/AppIcon.appiconset/AppIcon-512@2x.png` must be a 1024×1024 image
- Launch screen: verify it looks acceptable on device (Xcode → run on simulator/device)
- Device support:
  - Decide whether you want iPad support; if you keep iPad support, App Store Connect will require iPad screenshots.

## Build & upload (TestFlight)

### Option A (recommended): Xcode Organizer

1. Open Xcode (`npm run cap:open:ios`)
2. **Product → Archive**
3. Organizer: **Distribute App → App Store Connect → Upload**

### Option B: CLI archive + IPA (Transporter)

```bash
# Create an .xcarchive
TEAM_ID=FMRG7B8SG9 scripts/ios-archive.sh

# Create a signed .ipa (script includes a macOS 26 workaround for `xcodebuild -exportArchive`)
scripts/ios-export-ipa.sh
```

Then upload `build/export/Tacit.ipa` using Apple’s Transporter app.

## App Store Connect (first submission)

- **App Information**
  - Name: `Tacit` (App Store name must be unique)
  - Category: Music / Education (choose the one that fits your positioning)
  - Age rating: likely low (no user content)
- **App Privacy**
  - With no login/analytics/payments and no backend calls: usually “Data Not Collected”
- **Export compliance**
  - If you don’t add custom encryption, you typically answer “No” for non-exempt encryption
- **URLs**
  - Provide a Support URL and Privacy Policy URL (can be a simple static page)

## Review notes (recommended)

- “No account required, no data collected, works fully offline.”

## Important (content/IP)

If the prompt list contains third‑party copyrighted text, App Review or a rights holder can reject/take down the app. For the smoothest approval, use original prompt content you own (or content with clear redistribution rights).
