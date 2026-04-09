#!/usr/bin/env bash
# sync-version.sh — Reads version from package.json and updates pubspec.yaml
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PKG="$ROOT/package.json"
PUBSPEC="$ROOT/flutter/flow_ds/pubspec.yaml"

VERSION=$(node -p "require('$PKG').version")

if [ -z "$VERSION" ]; then
  echo "Error: Could not read version from package.json"
  exit 1
fi

# Update pubspec.yaml version line
sed -i'' -e "s/^version: .*/version: $VERSION/" "$PUBSPEC"

echo "Synced version to $VERSION in pubspec.yaml"
