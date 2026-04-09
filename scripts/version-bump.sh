#!/usr/bin/env bash
set -euo pipefail

# version-bump.sh — Detects component changes and suggests a changeset.
# Usage: npm run version:bump

CHANGED_FILES=$(git diff --name-only HEAD~1 HEAD 2>/dev/null || git diff --name-only HEAD)

HAS_COMPONENT_CHANGE=false
HAS_NEW_COMPONENT=false

for file in $CHANGED_FILES; do
  case "$file" in
    src/app/components/*/Flow*.tsx|flutter/flow_ds/lib/components/*)
      HAS_COMPONENT_CHANGE=true
      if git diff --diff-filter=A --name-only HEAD~1 HEAD 2>/dev/null | grep -q "$file"; then
        HAS_NEW_COMPONENT=true
      fi
      ;;
    src/app/primitives/*|flutter/flow_ds/lib/primitives/*)
      HAS_COMPONENT_CHANGE=true
      ;;
    src/app/tokens.ts|src/styles/modules/tokens.css|flutter/flow_ds/lib/tokens/*)
      HAS_COMPONENT_CHANGE=true
      ;;
  esac
done

if [ "$HAS_COMPONENT_CHANGE" = false ]; then
  echo "No component changes detected. No changeset needed."
  exit 0
fi

if [ "$HAS_NEW_COMPONENT" = true ]; then
  BUMP="minor"
else
  BUMP="patch"
fi

echo "Detected component changes. Suggested bump: $BUMP"
echo ""
echo "Run: npx changeset"
echo "Then: npx changeset version"
echo "Then: npm run version:sync"
