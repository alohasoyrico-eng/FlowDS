# Contributing to Flow Design System

Thank you for contributing! This guide helps you get started.

## Setup

```bash
npm install
npm run storybook   # development server
npm run ci          # full validation
```

## Architecture

Flow follows a 4-layer architecture:
- **L1 Foundations**: Design tokens (Energy, Voice, Frame, Depth, Momentum, Density)
- **L2 Primitives**: `Surface`, `Text`, `Stack`, `Inline`, `Grid`, `ActionSurface`
- **L3 Components**: 42 reusable UI components (`src/app/components/`)
- **L4 Patterns**: 37 composed patterns (`src/app/components/patterns/`)

## Token Hierarchy

Tokens follow a 3-tier system: `ref` → `sys` → `comp`
- **ref** (reference): Raw values — never used in component CSS
- **sys** (system): Semantic aliases — the default for component styles
- **comp** (component): Component-specific overrides

## Adding a Component

1. Create `src/app/components/<category>/Flow<Name>.tsx`
2. Export props interface with JSDoc
3. Use primitives (`Surface`, `Text`, `ActionSurface`) for structure
4. Use `stateAttrs()` for disabled/error/loading states
5. Wrap with `GrowthObserver` for analytics
6. Add story in `src/stories/Flow<Name>.stories.tsx`
7. Add test in `src/test/Flow<Name>.test.tsx`
8. Export from category `index.tsx` and `src/lib/index.ts`

## CSS Guidelines

- Use CSS custom properties via the token hierarchy (never hardcode values)
- Use CSS logical properties for RTL support
- Component CSS goes in `src/styles/modules/components.css`

## Testing

```bash
npm run test:components          # unit tests (vitest + jsdom)
npm run test:components:coverage # with coverage report
npm run lint                     # ESLint
npm run lint:css                 # Stylelint
npm run typecheck                # TypeScript
```

## Pull Requests

- Branch from `main`
- Include tests for new components
- Run `npm run ci` before submitting
- Keep PRs focused on a single change
