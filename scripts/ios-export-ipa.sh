#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

ARCHIVE_PATH="${1:-$ROOT_DIR/build/Tacit.xcarchive}"
EXPORT_DIR="${2:-$ROOT_DIR/build/export}"
EXPORT_OPTIONS_PLIST="$ROOT_DIR/scripts/exportOptions-appstore.plist"

if [[ ! -d "$ARCHIVE_PATH" ]]; then
  echo "Archive not found at: $ARCHIVE_PATH" >&2
  echo "Create one first: TEAM_ID=FMRG7B8SG9 scripts/ios-archive.sh" >&2
  exit 1
fi

mkdir -p "$EXPORT_DIR"
EXPORT_DIR_ABS="$(cd "$EXPORT_DIR" && pwd)"

echo "Exporting IPA to: $EXPORT_DIR"
LOG_FILE="$(mktemp -t tacit-export-ipa.XXXXXX.log)"
set +e
xcodebuild \
  -exportArchive \
  -archivePath "$ARCHIVE_PATH" \
  -exportOptionsPlist "$EXPORT_OPTIONS_PLIST" \
  -exportPath "$EXPORT_DIR" \
  -allowProvisioningUpdates 2>&1 | tee "$LOG_FILE"
XCODEBUILD_EXIT="${PIPESTATUS[0]}"
set -e

if [[ "$XCODEBUILD_EXIT" -eq 0 ]]; then
  echo "Done. Output files:"
  ls -la "$EXPORT_DIR"
  exit 0
fi

# Workaround: macOS 26 ships `/usr/bin/rsync` as openrsync (rsync 2.6.9 compatible),
# which breaks Xcode's `-exportArchive` pipeline when it invokes `/usr/bin/rsync -E`.
if /usr/bin/rsync --version 2>/dev/null | head -n 1 | rg -q 'openrsync' && rg -q 'Copy failed' "$LOG_FILE"; then
  PIPE_DIR="$(ls -td /var/folders/*/*/*/XcodeDistPipeline.~~~* 2>/dev/null | head -n 1 || true)"
  if [[ -z "$PIPE_DIR" || ! -d "$PIPE_DIR/Root/Payload" ]]; then
    echo "xcodebuild export failed and no XcodeDistPipeline directory was found to recover an IPA." >&2
    exit "$XCODEBUILD_EXIT"
  fi

  APP_PATH="$(ls -d "$PIPE_DIR/Root/Payload"/*.app 2>/dev/null | head -n 1 || true)"
  if [[ -z "$APP_PATH" ]]; then
    echo "xcodebuild export failed and no .app was found in $PIPE_DIR/Root/Payload." >&2
    exit "$XCODEBUILD_EXIT"
  fi

  echo "xcodebuild export failed due to openrsync; creating IPA from distribution pipeline output..."
  echo "Pipeline: $PIPE_DIR"
  echo "App: $APP_PATH"

  IPA_PATH="$EXPORT_DIR_ABS/Tacit.ipa"
  rm -f "$IPA_PATH"
  (cd "$PIPE_DIR/Root" && ditto -c -k --sequesterRsrc --keepParent Payload "$IPA_PATH")
  echo "Done. IPA created at: $IPA_PATH"
  ls -la "$IPA_PATH"
  exit 0
fi

echo "xcodebuild export failed; see log: $LOG_FILE" >&2
exit "$XCODEBUILD_EXIT"
