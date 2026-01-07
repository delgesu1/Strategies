# Tacit

A minimalist practice idea generator for musicians (especially classical musicians).

## Features

- 100+ prompts
- Fast, distraction-free interface
- Fully local (no login, no backend)

## Getting Started

### Prerequisites

- Node.js 22+ (required for Capacitor 8)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## iOS (Capacitor)

This repo includes a Capacitor iOS wrapper (generated in `ios/`).

```bash
# Sync the latest web build into the iOS project
npm run cap:sync:ios

# Open Xcode
npm run cap:open:ios
```

See `docs/app-store-checklist.md` for the end-to-end TestFlight/App Store steps.

## Usage

Click "new strategy" to receive a new practice idea. The app pauses briefly to encourage reflection before revealing the next one.
