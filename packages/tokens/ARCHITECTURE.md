# Flow Token Architecture

This document captures the architectural decisions and migration history for Flow design tokens.

## Architecture: ref → sys → comp

- **ref** = Raw, unaliased values. Only place absolute values exist.
- **sys** = Semantic aliases. Themes remap sys tokens to different ref tokens.
- **comp** = Component-scoped bindings aliasing sys tokens.

## Rules

- Raw values (hex, px, ms) exist ONLY in ref.
- sys tokens reference ref tokens only.
- comp tokens reference sys tokens only.
- No rgba() outside ref. sys borders/overlays use ref.state.opacity.

## Migration Log

MIGRATION LOG:
2026-02-28  Phase 3 — Button/Chip/TextInput single-value tokens
• Added comp.button.{height,font} and comp.chip.{height,font} as CSS-var
references (resolved per [data-size] in flow.css centralized blocks).
• Migrated Tooltip, Snackbar, EmptyState, ProgressBar, Skeleton, Switch
CSS base classes to consume var(--comp-*) instead of direct ref overrides.
• Removed all per-component [data-size] blocks from flow.css (now O(S)).
• Removed inline JS maps (btnHeightMap, btnFontMap, chipHeightMap,
chipFontMap, inputHeightMap) from React components.
• Button, Chip, TextInput now emit data-size; CSS cascade resolves.
2026-02-28  Phase 3b — Chip CSS-class migration
• Created .flow-chip CSS class with structural + variant rules
(.flow-chip[data-variant="*"]) eliminating all inline styles.
• Created .flow-chip-remove CSS class for remove button.
• Removed chipVarStyles JS map from React component.
• Chip now uses className="flow-chip" + data-variant + data-size + data-selected.
2026-03-01  Consistency audit — 8 fixes
• Fix 1: Unified radius — sys-frame-radius-control bumped 8→12px, TextInput
routed through sys (was bypassing to ref-frame-radius-3 directly).
• Fix 2: Per-size radius scaling in [data-size] blocks — sm=8, md=12, lg=12, xl=16.
• Fix 3: Density ×1.2 ratio corrected — comfortable heights
(sm 56→58, md 70→72, lg 84→86, xl 100→106); compact xl 72→74.
• Fix 4: Button padding-x scales per size (sm=8, md=12, lg=16, xl=20).
• Fix 5: Density blocks override --sys-size-label-font and table fonts.
• Fix 7: Demo — added FlowSelect/FlowButton XL variants.
• Fix 8: Stale "TextField" comment updated to "TextInput".
2026-03-01  Post-audit refinements — 3 enhancements
• Fix 9: Comfortable xl geometry tuning — label-offset-y-lg 9→11px,
input-bottom-lg 11→12px, input-bottom-xl 17→15px. Progression now
smooth: offset-y (9,10,11,13), bottom (7,9,12,15 Δ+2,+3,+3).
• Fix 10: Compound selectors [data-density][data-size] — 8 blocks
(2 densities × 4 sizes) at specificity 0,2,0 resolve cascade conflict
where [data-size] was silently overriding density typography shifts.
Covers --sys-size-label-font, --sys-size-table-font,
--sys-size-table-header-font with correct ±1 step per density tier.
• Fix 11: FlowChip padding-x now scales per size (sm=8, md=12, lg=16,
xl=20), matching Button's per-size pattern. Density overrides still
apply at the [data-density] level.
2026-03-06  sys.frame.radius.surface — viewport-responsive surface radius
• Added sys.frame.radius.surface — 16px (radius-4) default, one step above
container (12px). Density: compact 12px (r3), comfortable 20px (r5).
×1.2 ratio maintained, snapped to ref.frame.radius scale.
• Viewport-responsive: phone (<576px) steps UP +1 for container & surface
to compensate full-width layout. Phone: container 16px (r4←r3),
surface 20px (r5←r4). Cross-products: phone+compact 12/16px,
phone+comfortable 20/24px.
• Added "surface" to SemanticRadius type and semanticRadiusMap in
primitives.tsx → var(--sys-frame-radius-surface).
• Migrated DemoSection (demo-helpers.tsx, demos.tsx) from radius="xl"
(ref bypass) to radius="surface" (sys semantic, viewport-responsive).
• Migrated page-level Surface (component-detail, philosophy, tokens,
foundation-detail) from default radius="container" to radius="surface".
• Phone viewport now also steps UP --sys-frame-radius-control (+1).
• Added phone×size compound selectors in flow.css — [data-size] on
buttons/controls overrides inherited :root phone value (direct decl
beats inheritance). Compounds restore +1 viewport step for all four
sizes (sm/md/lg/xl) on both control and container radius.
2026-03-01  Sys-layer gap & radius extensions
• Added sys.frame.gap.componentLg — 28px (space-7) default, sits between
component (20px) and subsection (36px). Density: compact 24px (space-6),
comfortable 32px (space-8). ×1.2 ratio maintained.
• Added sys.frame.radius — { control, container } sub-object as canonical
source for density-responsive radius. Default both 12px (radius-3).
• Added sys.frame.density.{compact,comfortable}.radius — compact 8px (r2),
comfortable 16px (r4). ×1.2 ratio, snapped to ref.frame.radius scale.
• Added compound density×size selectors in flow.css for radius-control and
radius-container, resolving cascade conflict where [data-size] was
silently overriding density radius shifts.
2026-03-01  L3 comp→sys migration — second bypass fix
• Created sys.frame.border (thin/control/medium/indicator) — structural
border widths consumed by Button, IconButton, TextInput, Radio, Checkbox.
• Created sys.frame.radius.sm (4px) and sys.frame.radius.full (9999px) —
checkbox corners and pill shapes (Chip, Tag, Switch).
• Created sys.frame.content.dialog, sys.frame.sidebar.expanded/collapsed,
sys.frame.space.micro, sys.icon.size.{sm,md,lg,xl} — structural tokens
consumed by Dialog, Sidebar, TextInput, IconButton respectively.
• Created sys.energy.control.{borderInactive, borderInactivePressed,
borderDisabled, fillPressed, fillDisabled, dot, stateLayerInactive} —
shared indicator state colors for Radio, Checkbox, Switch. Dark-remapped.
• Created sys.energy.switch.{trackOff, trackOffHover, trackDisabled,
thumbOff, thumbOn, thumbDisabled, thumbIconDisabled} — switch-specific
state colors. Dark-remapped.
• Migrated ALL comp tokens (compLight + compDark) to reference sys instead
of ref for: radius, border-width, height, icon-size, content-width,
sidebar-width, micro-spacing, control colors, switch colors, elevation.
• Registered "component-lg" in SemanticGap type and semanticGapMap in
primitives.tsx (28px default, density-responsive via flow.css).
• Added missing compound selectors: comfortable×lg and comfortable×xl
for radius-control and radius-container in flow.css.
• Remaining ref references in comp: per-size font curves (button/chip/tag
font-sm..xl, textInput label/value/hint/float sizes) and per-size
padding curves — managed by [data-density] and [data-size] CSS blocks.
These are per-step values without meaningful semantic sys intermediary;
density blocks override them with the correct ±1 step shifts
(changed from ±2 after geometric voice migration).
2026-03-02  Geometric voice scale — H:F ratio fix
• Root cause: voice (body/label/caption) grew arithmetically (+1-2px/tier)
while every other family (height, icon, indicator) grew geometrically (~×1.2).
This caused H:F ratio to diverge 32% from sm(3.69) to xl(4.89), and
Icon:Font/Indicator:Font to diverge 45-50%.
• Fix: Re-mapped sys.size.voice body/label/caption to geometric ~×1.2 per tier.
sm(anchor): body=13,label=12,caption=10 — unchanged.
md: body 14→16, label 13→14, caption 11→12.
lg: body 16→20, label 14→18, caption 12→14.
xl: body 18→24, label 16→20, caption 13→18.
Headline unchanged (not H:F-constrained).
• H:F ratio now stable: 3.69/3.75/3.60/3.67 (±4%, was ±32%).
Icon:Font body: 1.23/1.25/1.20/1.33 (±11%, was ±45%).
• Cascading changes:
— flow.css: :root, [data-size], [data-density], compound [density×size]
voice tokens all updated. ±1 step density shift preserved.
— Button/Chip density fonts: changed from ±2 to ±1 step (geometric scale
makes ±2 too aggressive at upper tiers).
— TextInput geometry: label-scale and label-offset-y recalculated for all
3 densities × 4 sizes (24 values). input-bottom unchanged (visual tuning).
— Composite typography (sys-voice-paragraph-*, sys-voice-label-*) NOT changed
— these are content styles, not control-sizing tokens.
2026-03-02  V4 RESOLUTION — Dual typographic scale unified
• Problem: sys.voice.{paragraph|label|caption} (composite styles) vs
sys.frame.size.voice.{body|label|caption} (control sizing) were independent.
Risk: divergent text sizing in content vs controls as system scales.
• Solution: DEPRECATED sys.voice.{paragraph|label|caption} in favor of
sys.frame.size.voice.{body|label|caption} as canonical typographic scale.
• Rationale:
— sys.frame.size.voice.* is density-responsive (compact/comfortable modes).
— Integrates with [data-size] tier system (sm/md/lg/xl).
— Guarantees hierarchy: headline > body > label > caption at every tier.
— Grows geometrically (~×1.2/tier) matching height/icon/indicator.
• Migration:
— Replace sys.voice.paragraph.* → sys.frame.size.voice.body
— Replace sys.voice.label.* → sys.frame.size.voice.label
— Replace sys.voice.caption → sys.frame.size.voice.caption
• sys.voice.{display|heading|overline} remain valid:
— display/heading: density-INVARIANT for hero/section headers.
— overline: ALL-CAPS utility role for eyebrows/metadata labels.
• Result: Single typographic scale. No divergence risk. V4 RESOLVED.
2026-03-02  Phase 6 — PullToRefresh, SwipeActions, Sidebar, Topbar, Autocomplete
• Added comp tokens (light + dark) for 5 new components:
PullToRefresh (mobile gesture), SwipeActions (mobile swipe-to-reveal),
Sidebar (desktop collapsible nav), Topbar (desktop top bar),
Autocomplete (core search-with-suggestions).
• All comp tokens reference sys tokens exclusively. Dark variants remap
via sysDark. Structural tokens reference sys.frame.height, sys.frame.radius,
sys.icon.size.
• CSS custom properties emitted in flow.css :root block. CSS component
classes added for all 5 components with structural + variant + state rules.
• React components in flow-components-p6.tsx. WAI-ARIA compliant.
• Inventory updated to ~47 implemented (1 complete, ~46 partial) of ~67.
• SwipeActions added to inventory (new component, not previously listed).
