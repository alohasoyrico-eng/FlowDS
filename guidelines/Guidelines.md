# FLOW Design System Guidelines

## Token Architecture
- **Three-tier model:** `ref` → `sys` → `comp`
- Raw values (hex, px, ms) exist ONLY in `ref` tokens
- `sys` tokens are semantic aliases that reference `ref` tokens
- `comp` tokens are component-specific bindings that reference `sys` tokens
- NEVER use hardcoded hex colors, pixel values, font sizes, z-index, or animation durations outside tokens.css

## Composition Rules
- **L2 Primitives** (Surface, Text, Stack, Inline, Grid, ActionSurface): Foundation building blocks
- **L3 Components**: MUST compose L2 primitives. Use Surface instead of raw `<div>` for containers, Text instead of raw `<span>` for text, Stack/Inline instead of raw `<div>` for layout
- **L4 Patterns**: Compose L3 components + L2 primitives. Should import at least one L3 component

## Naming Conventions
- CSS classes: `flow-{component}` (e.g., `flow-btn-v2`, `flow-card`)
- Tokens: `--{layer}-{foundation}-{name}` (e.g., `--sys-energy-surface-primary`)
- Component tokens: `--comp-{component}-{property}` (e.g., `--comp-button-height`)
- Data attributes: `data-{property}` for variants (e.g., `data-emphasis="high"`, `data-size="md"`)

## Foundations (6)
- **Energy** (color): Surface, text, border, action, status tokens
- **Voice** (typography): Font family, weight, size, line-height, letter-spacing
- **Frame** (spacing/layout): Space scale, gaps, padding, radius, heights, grid
- **Depth** (elevation): Shadows, z-index layers, overlays, blur
- **Momentum** (motion): Durations, easing, transitions, stagger
- **Density** (scaling): Compact/default/comfortable via 1.2x ratio

## Accessibility
- WCAG AA minimum contrast
- All interactive elements must have aria labels
- Focus management via useFlowFocusTrap for modals
- Keyboard navigation support required
