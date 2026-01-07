#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

if ! command -v xcodebuild >/dev/null 2>&1; then
  echo "xcodebuild not found (install Xcode)." >&2
  exit 1
fi

echo "Building web + syncing iOS..."
npm run cap:sync:ios

ARCHIVE_DIR="$ROOT_DIR/build"
ARCHIVE_PATH="$ARCHIVE_DIR/Tacit.xcarchive"
mkdir -p "$ARCHIVE_DIR"

echo "Archiving (requires Xcode Team selection or TEAM_ID env var)..."
if [[ -n "${TEAM_ID:-}" ]]; then
  xcodebuild \
    -workspace ios/App/App.xcworkspace \
    -scheme App \
    -configuration Release \
    -destination 'generic/platform=iOS' \
    -archivePath "$ARCHIVE_PATH" \
    -allowProvisioningUpdates \
    DEVELOPMENT_TEAM="$TEAM_ID" \
    archive
else
  xcodebuild \
    -workspace ios/App/App.xcworkspace \
    -scheme App \
    -configuration Release \
    -destination 'generic/platform=iOS' \
    -archivePath "$ARCHIVE_PATH" \
    -allowProvisioningUpdates \
    archive
fi

echo "Archive created at: $ARCHIVE_PATH"

