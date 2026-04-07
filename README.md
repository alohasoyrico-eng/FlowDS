# FLOW Design System

FLOW is a multi-platform design system (React + Flutter) built for consistency, density-awareness, and semantic token architecture. It covers **42 components** across **9 domains**, **40+ L4 patterns**, and **6 design foundations** (Energy, Voice, Frame, Depth, Momentum, Density).

This repository contains the **living documentation site** — an interactive reference built with React + Vite that demonstrates every component, pattern, and token in context.

---

## Quick start

**Requirements:** Node.js ≥ 18, npm ≥ 9

```sh
# 1. Install dependencies
npm install

# 2. Run the dev server (opens at http://localhost:5173)
npm run dev
```

That's it. The documentation site runs locally — no backend required.

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
import { FlowButton } from "../components/controls";
import { FlowTextInput } from "../components/inputs";
import { FlowCard } from "../components/display";

// Flutter
import 'package:flow_ds/controls.dart';
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
src/
├── app/
│   ├── components/       # All 42 FLOW components (controls, inputs, display…)
│   ├── pages/            # Documentation pages and demo registries
│   │   └── registry/     # Per-domain component registries (spec + demos)
│   ├── styles/           # Global CSS, token CSS variables, flow.css
│   ├── primitives.tsx    # Stack, Inline, Grid, Surface, Text, FlowIcon
│   ├── tokens.ts         # Canonical token source (ref → sys → comp)
│   ├── routes.tsx        # React Router route tree
│   └── App.tsx           # App entry point
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

> Foundation compliance is now actively tracked and remediated. See [FULL_SYSTEM_AUDIT.md](./FULL_SYSTEM_AUDIT.md) for current coverage scores, findings, and remediation status across all six foundations.

---

## Contributing

Before submitting a PR, please review the [Governance page](/governance) in the docs for CI enforcement rules. Key rules:

- No hardcoded hex values, pixel sizes, or z-index values outside ref tokens
- No raw `gap={N}` numbers in component or demo code — use semantic tokens
- Every new product feature must use ≥90% FLOW components by visual surface area
- Accessibility: WCAG AA minimum, audited with axe-core

Run `npm run lint && npm run typecheck` before opening a PR. CI will block merges that fail either check.

---

## Links

- Figma source: [Crear sistema de diseño](https://www.figma.com/design/0pycOOtXpQHWgaJRt6yzTU/Crear-sistema-de-dise%C3%B1o)
- Foundation audit report: [FOUNDATION_AUDIT_REPORT.md](./FOUNDATION_AUDIT_REPORT.md)
- Pattern demo mapping: [PATTERN_DEMO_MAPPING.csv](./PATTERN_DEMO_MAPPING.csv)
