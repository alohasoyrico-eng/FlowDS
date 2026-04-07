# Changesets

This project uses [changesets](https://github.com/changesets/changesets) for versioning.

## Adding a changeset

```bash
npx changeset
```

Follow the prompts to describe your change. This creates a markdown file in `.changeset/` that will be consumed during release.

## Releasing

```bash
npx changeset version  # updates package.json + CHANGELOG.md
npm publish            # publishes to npm
```
