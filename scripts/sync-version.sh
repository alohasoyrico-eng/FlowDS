#!/usr/bin/env bash
set -euo pipefail

# sync-version.sh — Sync version from package.json to pubspec.yaml.
# Usage: npm run version:sync

PACKAGE_JSON="package.json"
PUBSPEC="flutter/flow_ds/pubspec.yaml"

VERSION=$(node -p "require('./$PACKAGE_JSON').version")

if [ -z "$VERSION" ]; then
  echo "Error: Could not read version from $PACKAGE_JSON"
  exit 1
fi

if [[ "$OSTYPE" == "darwin"* ]]; then
  sed -i '' "s/^version: .*/version: $VERSION/" "$PUBSPEC"
else
  sed -i "s/^version: .*/version: $VERSION/" "$PUBSPEC"
fi

echo "Synced version to $VERSION in both package.json and pubspec.yaml"
