#!/usr/bin/env bash
# version-bump.sh — Detects component changes and runs changeset version + sync
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

# Check for pending changesets
PENDING=$(ls .changeset/*.md 2>/dev/null | grep -v README.md | wc -l | tr -d ' ')

if [ "$PENDING" = "0" ]; then
  echo "No pending changesets found."
  echo ""
  echo "To create one, run:"
  echo "  npx changeset"
  echo ""
  echo "Bump rules:"
  echo "  patch  — bug fix, a11y fix, token fix in existing component"
  echo "  minor  — new component, new prop, new pattern"
  echo "  major  — breaking API change (rename/remove prop, remove component)"
  exit 0
fi

echo "Found $PENDING pending changeset(s). Running version bump..."

# Apply changesets → updates package.json version + CHANGELOG.md
npx changeset version

# Sync Flutter version with React version
bash "$ROOT/scripts/sync-version.sh"

echo ""
echo "Done. Review changes, then commit and tag:"
echo "  git add -A && git commit -m 'chore: version bump'"
echo "  git tag v\$(node -p \"require('./package.json').version\")"
echo "  git push --follow-tags"
