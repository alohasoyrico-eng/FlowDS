# FLOW Design System

[![Version](https://img.shields.io/badge/version-1.0.0--rc.3-blue)](https://github.com/AXI-Flow/flow/releases) [![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)

FLOW is a multi-platform design system (React + Flutter) built for consistency, density-awareness, and semantic token architecture. It covers **42 components** across **9 domains**, **40+ L4 patterns**, and **6 design foundations** (Energy, Voice, Frame, Depth, Momentum, Density).

This repository contains the **living documentation site** — an interactive reference built with React + Vite that demonstrates every component, pattern, and token in context.

---

## Quick start

### React (web)

**Requirements:** Node.js ≥ 18, npm ≥ 9

```sh
# Install as dependency
npm install @flow/design-system

# Or clone and run the docs site
git clone https://github.com/AXI-Flow/flow.git
cd flow && npm install && npm run dev
```

### Flutter (mobile)

See [flutter/flow_ds/README.md](./flutter/flow_ds/README.md) for full documentation.

```yaml
# pubspec.yaml
dependencies:
  flow_ds:
    path: flutter/flow_ds
```

---

## Navigation

| Route | What's there |
|---|---|
| `/` | Philosophy & system overview |
| `/foundations/:id` | Energy, Voice, Frame, Depth, Momentum, Density |
| `/tokens` | Three-tier token architecture (ref → sys → comp) |
| `/primitives` | Stack, Inline, Grid, Surface, Text — layout primitives |
| `/components/:domain` | All 42 components organized by domain |
| `/components/:domain/:component` | Component detail: spec, demos, props, guidelines |
| `/patterns` | 40+ L4 patterns (input, feedback, layout, data…) |
| `/patterns/:category/:pattern` | Pattern detail: overview, use cases, developer docs |
| `/governance` | Contribution rules, CI enforcement, Design Ops model |
| `/templates` | Page templates (L5) |

---

## For developers adopting FLOW

### Step 1 — Import the component you need

```tsx
// React (web)
import { FlowButton, FlowTextInput, FlowCard } from "@flow/design-system";
import "@flow/design-system/styles";
```

```dart
// Flutter (mobile)
import 'package:flow_ds/flow_ds.dart';
```

### Step 2 — Use semantic tokens, never hardcoded values

```tsx
// ❌ Don't
<Stack gap={3} style={{ maxWidth: "600px" }}>

// ✅ Do
<Stack gap="component">
```

FLOW tokens are density-responsive. `gap="component"` resolves to 20px at default density, 16px at compact, 24px at comfortable — automatically.

### Step 3 — Let the theme cascade

Wrap your app in `FlowThemeProvider` and add `data-theme="light"` (or `"dark"`) to your root element. All tokens resolve through CSS custom properties — no JS needed at render time.

---

## Scripts

| Script | Description |
|---|---|
| `npm run dev` | Development server with HMR |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run typecheck` | TypeScript type-check (no emit) |
| `npm run lint` | ESLint across all `src/**/*.{ts,tsx}` |

---

## Project structure

```
├── src/                       # React implementation
│   ├── app/components/        # All 42 FLOW components + 37 patterns
│   ├── app/primitives/        # Stack, Inline, Grid, Surface, Text
│   ├── app/tokens.ts          # Canonical token source (ref → sys → comp)
│   ├── styles/                # CSS modules with token variables
│   └── lib/index.ts           # Library entry point
├── flutter/flow_ds/           # Flutter implementation
│   ├── lib/tokens/            # ref, sys, comp, density tokens
│   ├── lib/primitives/        # 13 primitive widgets
│   ├── lib/components/        # 47 L3 components
│   └── lib/patterns/          # 35 L4 patterns
├── src/stories/               # 78 Storybook stories
└── src/test/                  # 83 test files (vitest + axe a11y)
```

---

## Token architecture

FLOW uses a strict **three-tier token chain**: `ref → sys → comp`

- **ref** tokens hold raw values (hex colors, px sizes, ms durations). The only place absolute values exist.
- **sys** tokens assign semantic meaning and are theme- and density-aware.
- **comp** tokens bind sys values to specific component properties.

Never use ref tokens directly in components — consume sys or comp tokens only.

---

## Design foundations

| Foundation | Purpose |
|---|---|
| **Energy** | Color, surface, state, status |
| **Voice** | Typography scale, roles, families |
| **Frame** | Spacing, radius, layout grid |
| **Depth** | Elevation, shadows, z-index |
| **Momentum** | Duration, easing, stagger |
| **Density** | Compact / Default / Comfortable scaling |

---

## Contributing

Before submitting a PR, please review the [Governance page](/governance) in the docs for CI enforcement rules. Key rules:

- No hardcoded hex values, pixel sizes, or z-index values outside ref tokens
- No raw `gap={N}` numbers in component or demo code — use semantic tokens
- Every new product feature must use ≥90% FLOW components by visual surface area
- Accessibility: WCAG AA minimum, audited with axe-core

Run `npm run lint && npm run typecheck` before opening a PR. CI will block merges that fail either check.

---

## Releases

Download SDK packages from [GitHub Releases](https://github.com/AXI-Flow/flow/releases). Each release includes:

- **flow-react-sdk-vX.Y.Z.zip** — Compiled React library (JS + CSS + types)
- **flow-flutter-sdk-vX.Y.Z.zip** — Flutter package source (lib/ + pubspec.yaml)

---

## Links

- Figma source: [Crear sistema de diseño](https://www.figma.com/design/0pycOOtXpQHWgaJRt6yzTU/Crear-sistema-de-dise%C3%B1o)
- Flutter docs: [flutter/flow_ds/README.md](./flutter/flow_ds/README.md)
- API docs: Run `npm run docs:api` to generate TypeDoc output
