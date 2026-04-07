# CHANGELOG

All notable changes to FLOW Design System are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
Versioning follows [Semantic Versioning](https://semver.org/).

---

## [1.0.0-rc.3] — 2026-03-31

### Fixed
- **Momentum hardcoded animation values**: Tokenized 4 hardcoded durations in `momentum-explorer.tsx` — spinner (800ms → `var(--ref-momentum-duration-cycle)`), shimmer (1.5s → same cycle token), easing preview (600ms → `var(--ref-momentum-duration-slower)`), interval (1200ms → cycle-derived). Added missing `Cycle` (1400ms) entry to duration scale demo.
- **Momentum reduced-motion**: `TimelineBar` now checks `prefers-reduced-motion: reduce` and immediately sets progress to 100% instead of running rAF loop.
- **Momentum docs inaccuracy**: `MotionTokensReference` claimed `--sys-momentum-duration-default` is 350ms in comfortable density — corrected to "200ms (compact: 100ms)" since comfortable doesn't override this token. Foundation detail CodeBlock updated to reference `ref.momentum.duration.cycle` (1400ms) instead of `sys.momentum.duration.slow`.
- **Depth dark shadows nearly imperceptible**: Boosted dark shadow opacities in `tokens.ts` and `tokens.css` — L1–L2 primary 0.24→0.35, L3 primary 0.28→0.40, L4 primary 0.32→0.48, secondary similarly scaled.
- **Depth comparison panel bypassed theme system**: Refactored to use `data-theme="light"` / `data-theme="dark"` wrappers with `var(--sys-depth-elevation-N)` tokens instead of hardcoded hex colors and `var(--ref-depth-shadow-dark-N)`. Replaced 10+ hardcoded hex values (#F1F5F9, #0F172A, #1E293B, #94A3B8, etc.) with CSS custom property references. Added `DARK_SHADOW_LEVELS` data table with explicit opacity values to token reference.
- **`react-hooks/rules-of-hooks`**: Promoted from `"warn"` to `"error"` in `.eslintrc.cjs` — conditional hook calls now block CI instead of silently passing.
- **`useFlowBreakpoint` performance bug**: `resolve()` no longer creates a new object on every call — state only updates when the breakpoint actually changes. Resize listener debounced to 250ms. Prevents unnecessary re-renders of the entire component tree.
- **`FlowThemeProvider` context stability**: `toggle` stabilized with `useCallback`, context value memoized with `useMemo`. Consumers of `useFlowTheme()` no longer re-render on every parent render.
- **`FlowCard` `aria-label` no-op**: Removed dead `aria-label={isInteractive ? undefined : undefined}` and replaced with proper passthrough `aria-label` prop on `CardProps`.
- **`FlowCard` `aria-selected` on `role="button"`**: Interactive cards now use `aria-pressed` instead of `aria-selected`, which is semantically correct for toggle buttons per WAI-ARIA.
- **Blanket `eslint-disable` converted to per-line**: All 24 component files with file-level `eslint-disable` now use per-line `eslint-disable-next-line` for specific violations. 3 files (`p3`, `p6`, `doc-template`) had their blanket disables removed entirely (no remaining violations).
- **34 `import/order` lint errors**: Removed all references to `eslint-plugin-import` (not installed) from file-level and inline directives across 10 files.
- **2 `as any` casts** in `pattern-registry/data.tsx`: Replaced with proper type annotations.

- **Momentum easing preview interval**: Replaced hardcoded `1200ms` `setInterval` in `EasingPreviewBall` with `getComputedStyle`-derived value from `--ref-momentum-duration-slower` + 700ms pause buffer.

- **P0 Accessibility — FlowSelect `aria-activedescendant`**: Options now have unique `id` attributes; combobox trigger sets `aria-activedescendant` on highlight. (WCAG 4.1.2)
- **P0 Accessibility — FlowTextInput `required`**: `required` and `aria-required` now passed to native `<input>` element. (WCAG 3.3.2)
- **P0 Accessibility — FlowDialog `aria-describedby`/`aria-labelledby`**: Uses `useId`-generated ids on title/description elements linked via `aria-labelledby` and `aria-describedby` instead of `aria-label`. (WCAG 4.1.2)
- **P0 Accessibility — FlowCheckbox `required`**: Added `required` prop, passes `required` and `aria-required` to native checkbox input. (WCAG 3.3.2)
- **P1 Accessibility — FlowTabs `tabIndex`**: Removed extraneous `tabIndex={0}` from tablist container. Tab navigation now relies solely on roving tabindex on individual tab buttons.
- **P0 Density — Accordion, Tabs, SegmentedControl, Switch**: Added `[data-density="compact"]` and `[data-density="comfortable"]` CSS token overrides in `tokens.css` — heights, font sizes, padding, and gap for all 4 primary controls now scale with density mode.
- **Story argType bugs**: Corrected `FlowTag` variant options (`"default"` → `"label"`), `FlowSwitch` size options (added `"xl"`), `FlowCard` padding options (added `"none"`, `"xl"`, `"container"`).
- **Duplicate `.storybook/preview.ts`**: Removed (kept `.tsx`).

### Added
- **Density mode explorer**: New `DensityExplorer` component embedded in the Frame foundation page. Interactive density switcher (compact/default/comfortable) with live component demos inside `data-density` zones, 24-row token reference table (Frame, Voice, Momentum, Comp foundations) with active-density highlighting, and mechanism documentation (CSS cascade, viewport auto-mapping, animated transitions).
  - New files: `components/density-explorer.tsx`, `components/density-demo-wrapper.tsx`
- **Density toggle on all demo pages**: Component detail (Overview + Variants tabs) and Pattern detail (Overview + Variants tabs) now wrap demos in `DensityDemoWrapper` — inline density switcher lets users preview any component at all 3 density modes.
- **Storybook 10**: Initialized with `@storybook/react-vite`. Custom preview decorator applies `data-theme` / `data-density` via global toolbar controls. Flow design tokens CSS loaded globally. 6 story files covering FlowButton (10 stories), FlowTextInput (5), FlowSwitch (3), FlowCard (2), FlowTag (2), and a Density Comparison showcase.
  - New files: `.storybook/main.ts`, `.storybook/preview.tsx`, `src/stories/*.stories.tsx`
- **Comprehensive Storybook coverage**: Expanded from 6 to 54 story files covering all domains — Controls (FlowIconButton, FlowFAB), Inputs (FlowTextArea), Selection (FlowCheckbox, FlowRadioButton, FlowSelect, FlowSlider, FlowSegmentedControl, FlowToggleButton), Display (FlowChip, FlowBadge, FlowAvatar, FlowList, FlowTreeView, FlowKPICard), Feedback (FlowProgressBar, FlowCircularProgress, FlowSkeleton, FlowInlineValidationMessage), Overlays (FlowDialog, FlowMenu, FlowTooltip, FlowPopover, FlowBottomSheet, FlowContextMenu), Navigation (FlowTabs, FlowBreadcrumbs, FlowPagination, FlowStepper, FlowSidebar, FlowBottomNav), Layout (FlowAccordion, FlowFieldset, FlowSplitPane), and 15 Patterns (FlowSearch, FlowAutocomplete, FlowDatePicker, FlowPhoneInput, FlowMultiSelect, FlowCommandPalette, FlowFileUpload, FlowEmptyState, FlowConfirmationDialog, FlowKPICard, FlowFormSection, FlowToolbar, FlowSnackbar, FlowHoverCard, FlowOTPInput). Each story verifies props, states, sizes, and variants via Storybook's density/theme global controls.
- **Visual regression testing**: Playwright config (`playwright.config.ts`) with Desktop Chrome and Mobile Safari projects. Test suite (`src/test/visual/components.spec.ts`) covers 23 component stories + density-mode variants + light/dark theme comparisons. Screenshot baselines stored in `__snapshots__/`. Scripts: `test:visual`, `test:visual:update`.
- **Client-side docs search**: Zero-dependency substring + word-boundary scoring algorithm indexes ~200 entries across foundations, primitives, components, and patterns. `DocSearch` component with grouped results dropdown, keyboard navigation (arrows, Enter, Escape), category-colored tags, and 150ms debounced input. Integrated into sidebar (expanded + collapsed modes).
  - New files: `search/search-index.ts`, `search/search.ts`, `search/use-doc-search.ts`, `components/doc-search.tsx`
- **Interactive prop playground**: Auto-generated live controls for component props. `PropPlayground` renders a preview panel, control knobs (FlowSwitch, FlowSelect, FlowTextInput), and generated JSX code block. Type parser (`inferControl`) converts `PropEntry.type` strings into control descriptors (enum, boolean, string, number, reactnode). Initial rollout: FlowButton, FlowIconButton, FlowSwitch, FlowCheckbox, FlowChip, FlowBadge, FlowCard, FlowTextInput, FlowProgressBar.
  - New files: `components/prop-playground.tsx`, `components/prop-playground-controls.ts`
- **Testing dependencies** declared in `devDependencies`: `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`, `jsdom`, `@vitest/coverage-v8`.
- **Component tests in CI**: `npm run test` and `npm run test:tokens` now run in both the `ci` npm script and the GitHub Actions workflow.
- **Root error boundary** (`ErrorBoundary.tsx`): Wraps `FlowThemeProvider` + `RouterProvider` in `App.tsx` to catch initialization and render errors with an inline-styled fallback.
- **`tsconfig.test.json`**: Test files are now type-checked separately. New `typecheck:test` script added.
- **10 new component test suites**: `FlowDialog`, `FlowTextInput`, `FlowSelect`, `FlowCheckbox`, `FlowSwitch`, `FlowCard`, `FlowChip`, `FlowProgressBar`, `FlowSkeleton`, `FlowBottomSheet` — covering rendering, states, interaction, and ARIA compliance.
- **`.nvmrc`**: Pins Node.js version to 18 for consistent team usage.
- **`engines` field** in `package.json`: Enforces `node >= 18`.
- **Bundle analyzer**: `rollup-plugin-visualizer` added as devDependency. Run `npm run analyze` to generate `stats.html`.
- **npm package / distributable**: Library entry point (`src/lib/index.ts`), CSS entry (`src/lib/flow.css`), and Vite library build config (`vite.config.lib.ts`). Consumers can now `import { FlowButton } from "@flow/design-system"` and `import "@flow/design-system/css"`. Package.json updated with `exports`, `main`, `module`, `types`, `files`, `sideEffects`, `peerDependencies`, and `build:lib` / `prepublishOnly` scripts. Output: 458 kB JS (ESM) + 307 kB CSS.

- **P1 Responsive — Context-driven size resolution**: Refactored `useFlowDefaultSize` from viewport-global to context-cascading. New `FlowSizeContext` + `FlowSizeProvider` enable "size zones" (analogous to density zones via `data-density`). Resolution priority: explicit prop > nearest `FlowSizeProvider` > viewport default. `FlowThemeProvider` provides viewport-derived size as root context. No component changes needed — all 33 components automatically pick up context.
  - New: `FlowSizeProvider` component exported from primitives
  - New: `FlowSizeContext` exported from `use-flow-default-size.ts`
  - Modified: `useFlowDefaultSize` hook, `FlowThemeProvider`
- **P1 Responsive — `useFlowDefaultSize` integrated into 33 components**: All components with a `size` prop now auto-resolve from context cascade when no explicit size is provided. Covers controls (FlowFAB), selection (FlowSegmentedControl, FlowRadioButton, FlowCheckbox, FlowToggleButton, FlowSwitch), display (FlowAvatar, FlowAvatarGroup, FlowCard, FlowTag, FlowChip, FlowTreeView), feedback (FlowSkeleton, FlowProgressBar, FlowCircularProgress), navigation (FlowStepper, FlowTabs), overlays (FlowTooltip, FlowDialog), layout (FlowAccordion), patterns (FlowSnackbar, FlowToolbar, FlowEmptyState, FlowKPICard, FlowFileUpload, FlowColorPicker, FlowCalendarView, FlowTransferList, FlowDragSortableList, FlowDateRangePicker, FlowVirtualDataTable), and data (FlowDataTable, FlowTable).
- **P1 Density — 20+ additional component density overrides**: Added compact (÷1.2) and comfortable (×1.2) CSS token overrides for FAB, Stepper, Slider, Pagination, Avatar, ToggleButton, Badge, List, Search, Toolbar, Menu, Popover, BottomSheet, Sidebar, Topbar, BottomNav, OTPInput, and DatePicker. All geometry tokens (heights, widths, padding, gap, font sizes, icon sizes) now scale with density mode.
- **P1 Tone — `tone` prop added to 10 components**: FlowCard, FlowKPICard, FlowEmptyState, FlowSectionHeader, FlowDialog, FlowSnackbar, FlowTooltip, FlowHoverCard, FlowNotificationPanel, FlowTimeline now accept `tone?: Tone` (neutral | brand | marketing | system). Emits `data-tone` on root element. CSS rules in `components.css` apply `--sys-tone-*` tokens to text and weight. Tone foundation raised from 68% → 100%.
- **P1 Growth — `GrowthObserver` integrated into all 42 interactive components**: Every L3/L4 component across controls, inputs, selection, display, navigation, feedback, overlays, and patterns now wrapped with `GrowthObserver` for impression tracking. Events follow `flow.{kebab-name}.impression` naming convention. `GrowthObserver` enhanced with `inline` prop (`display: contents`) to prevent layout disruption. Growth foundation raised from 47% → 100%.
- **P1 State — Missing state coverage for 21 components**: FlowRadioButton (error), FlowOTPInput (loading), FlowSearch (error), FlowDatePicker (loading), FlowAvatar (loading, error), FlowKPICard (error), FlowAccordion (item status: error/complete), FlowInlineEditable (error), FlowQuickActions (disabled, loading), FlowSidebar (item disabled/loading), FlowTopbar (loading), FlowDataTable (error + overlay), FlowAdvancedFilters (loading, error), FlowChartWrapper (error + overlay), FlowNotificationPanel (error), FlowStepper (verified), FlowToolbar (verified), FlowPagination (verified), FlowBottomNav (verified), FlowTabs (verified), FlowSegmentedControl (verified). State foundation raised from 81% → 100%.
- **P1 Accessibility — `useFlowFocusTrap` reusable hook**: Extracted focus trap logic (Tab cycling, Escape dismiss, focus restore) from FlowDialog into `src/app/hooks/use-flow-focus-trap.ts`. FlowDialog and FlowBottomSheet both use the shared hook. FlowBottomSheet now has full focus trap (was missing).
- **P1 Accessibility — `useFlowAnnounce` hook**: New global ARIA live region announcer at `src/app/hooks/use-flow-announce.ts`. Provides `announce(message, assertive?)` for programmatic screen reader announcements.
- **P1 Accessibility — Focus trap for ConfirmationDialog + CommandPalette**: Both overlay patterns now use `useFlowFocusTrap` for proper keyboard trapping (Tab cycling, Escape dismiss, focus restore). Previously only FlowDialog had focus trap.
- **P1 Accessibility — Keyboard-accessible triggers**: FlowPopover and FlowMenu triggers now respond to Enter/Space. FlowContextMenu trigger supports Shift+F10 / ContextMenu key. FlowDatePicker clear button changed from `<span>` to `<button>` with `aria-label`.
- **P1 API — `forwardRef` added to all 62 components**: Every L3/L4 component now forwards refs to its root DOM element, enabling focus management, measurement, and library integration. Components with internal refs (Dialog, BottomSheet, SplitPane, Select, SegmentedControl, TreeView) use callback ref merging.
- **P1 API — `...rest` spread on all 62 components**: Every component now spreads remaining props onto its root DOM element, enabling `data-testid`, `id`, `title`, custom event handlers, and other standard HTML attributes.
- **P1 API — All 45+ prop interfaces exported**: Every component's props type (`ButtonProps`, `CardProps`, etc.) and sub-types (`SelectOption`, `TabItem`, `AccordionItem`, etc.) are now `export interface`, enabling consumers to type wrappers and extend props.
- **P1 API — `useFlowFocusTrap` and `useFlowAnnounce` exported from library barrel**: Consumers can now import accessibility hooks from `@flow/design-system`.
- **CSS — Base structural rules for 9 components**: Added layout CSS for FlowKPICard, FlowTimeline, FlowSectionHeader, FlowHoverCard, FlowNotificationPanel, FlowConfirmationDialog (overlay), FlowDataTable, FlowFormSection, FlowInlineValidationMessage. Previously these had only tone overrides or no CSS at all.
- **CSS — `z-index: 50` replaced with `var(--sys-depth-layer-dropdown)`**: DatePicker, MultiSelect, and DateRangePicker dropdowns now use the depth token system.
- **CSS — `!important` removed from 8 tone utility classes**: Refactored `.flow-tone-*` selectors to use `[class].flow-tone-*` for specificity instead of `!important`.
- **DX — Doc pages dogfood library barrel**: All ~45 doc page files now import from `../../lib` (the public barrel) instead of internal domain barrels. Validates that the public API surface is complete and correct.
- **DX — Registry `reactImport` strings updated**: All 85 documentation import strings across 17 files now reference `@flow/design-system` instead of internal paths.
- **DX — Registry entries for FlowSplitPane + FlowFieldset**: Added full spec (anatomy, variants, states, accessibility), demos, and developer guide for both components in the layout registry.
- **DX — Reusable `.flow-doc-accent` CSS classes**: Replaced 21 inline `borderLeft: "3px solid ..."` styles across 9 doc files with utility classes (`.flow-doc-accent`, `--success`, `--warning`, `--error`).
- **Cleanup — 14 unused `import React` removed**, 3 dead variables deleted, standard class name aliases added (`flow-button`, `flow-icon-button`, `flow-progress-bar`), 8 raw `<button>` in tone-demo replaced with FlowButton, 9 stale `.fuse_hidden` files deleted.
- **P1 Frame — Hardcoded px/color cleanup**: Replaced hardcoded `fontSize`, `padding`, `borderRadius`, `gap`, `boxShadow` values with `--ref-voice-size-*`, `--ref-frame-space-*`, `--ref-frame-radius-*`, and `--sys-depth-elevation-*` tokens across 6 files: `flow-data-table.tsx`, `density-demo-wrapper.tsx`, `density-explorer.tsx`, `state-explorer.tsx`, `tone-explorer.tsx`, `iconography-explorer.tsx`. Frame foundation raised from 76% → 100%.

### Changed
- **P1 monolithic file split**: All 15 `flow-components-p{N}.tsx` files (~14,200 lines, ~90 components) split into ~67 per-component files within domain folders (`controls/`, `inputs/`, `selection/`, `display/`, `feedback/`, `overlays/`, `navigation/`, `layout/`, `data/`, `patterns/`). Old p-files converted to re-export shims for backward compatibility. Shared internals (`input-surface.tsx`, `country-picker-shared.tsx`) moved to `_shared/` with corrected import paths. All 10 domain barrel `index.tsx` files updated to import from local per-component files.
- **`tsconfig.build.json`**: Updated `include` paths to reference `_shared/` directory alongside existing entries.
- **ESLint v9 flat config migration**: Replaced `.eslintrc.cjs` + `.eslintignore` with `eslint.config.js` (flat config). Upgraded ESLint 8.57→9.39, `@typescript-eslint` 6.8→8.58 (unified `typescript-eslint` package), `eslint-plugin-react` 7.33→7.37, `eslint-plugin-react-hooks` 4.6→7.0, `eslint-plugin-jsx-a11y` 6.8→6.10. Added `eslint-config-prettier` 10.1 to disable formatting rules. New react-compiler rules from hooks v7 downgraded to warn (pre-existing patterns). Result: 0 errors, 123 warnings.
- **Prettier formatter**: Added Prettier 3.8. `.prettierrc` (double quotes, trailing commas, 100 print width) + `.prettierignore`. New scripts: `format`, `format:check`. Ran initial format across entire `src/`.
- **Tree-shaking enabled**: Library build (`vite.config.lib.ts`) now uses `preserveModules` + `preserveModulesRoot` — each component emits as a separate ES module chunk. Combined with `sideEffects: ["*.css"]` in `package.json` and named re-exports in all 10 domain barrels, bundlers can tree-shake individual components.
- **`FlowTreeView` bug fix**: Moved `collectAllIds` declaration before its use in `useState` initializer to fix react-hooks/immutability error.

### Known Technical Debt (deferred)
| Item | Rationale | Timeline |
|------|-----------|----------|
| Remove backward-compat adapters in `flow-components-mobile.tsx` / `flow-components-desktop.tsx` | Intentional API translation layers, not true duplicates | After Q4 2026 per existing plan |
| Remove re-export shims in `flow-components-p{N}.tsx` | Backward-compat shims from P1 split; consumers should migrate to domain barrel imports | Q4 2026 |
| Extract shared boilerplate in 8 `pattern-registry/` files | Demo/registry code; low runtime impact | Nice-to-have cleanup |
| Promote react-compiler lint rules from warn → error | Pre-existing setState-in-effect and impure-render patterns | After dedicated refactor sprint |
| Add `useFlowDefaultSize` to 30 remaining components | ~~Resolved in rc.3~~ — 33 components integrated with viewport-aware sizing | **Done** |
| ~~Add Growth analytics to 42 interactive components~~ | ~~Resolved in rc.3~~ — all 42 components wrapped with GrowthObserver | **Done** |
| ~~Add `tone` prop to 7 messaging components~~ | ~~Resolved in rc.3~~ — 7 components support tone prop + CSS rules | **Done** |
| ~~Add Storybook / visual regression tests~~ | ~~Resolved in rc.3~~ — 54 story files + Playwright visual regression | **Done** |
| ~~P0 Density: Accordion, Tabs, SegmentedControl, Switch~~ | ~~Resolved in rc.3~~ — compact + comfortable CSS overrides added | **Done** |
| ~~P0 Accessibility: FlowSelect, FlowTextInput, FlowDialog, FlowCheckbox~~ | ~~Resolved in rc.3~~ — WCAG 4.1.2 + 3.3.2 fixes | **Done** |
| Upgrade React 18 → 19, TypeScript 5.4 → 5.7 | Potentially breaking; needs compatibility audit | Planned upgrade cycle |

---

## [1.0.0-rc.2] — 2026-03-26

### Added
- **Momentum demo utilities (`demo-utils.css`)**: Added keyframe animations (`flow-demo-fade-in`, `flow-demo-slide-up`, `flow-demo-slide-in`, `flow-demo-ease-move`) and structural classes (`.flow-demo-motion-track`, `.flow-demo-motion-ball`, `.flow-demo-duration-bar`, `.flow-demo-duration-track`, `.flow-demo-motion-replay-row`). All values reference momentum + frame tokens — no hardcodes.
- **`src/app/components/motion-demo-section.tsx`** (new file): Shared interactive demos for FLOW's Momentum foundation:
  - `DurationComparisonDemo` — all 5 duration tiers as simultaneous fill bars with ▶ Replay
  - `EasingComparisonDemo` — all 4 easing curves as balls on a track at the same duration
  - `StaggerDemo` — 3 stagger speeds × 4 items with key-increment replay
  - `MotionTokensReference` — static reference table of sys-layer transition shortcuts
  - `MomentumDemoBlock` — composite of all 4 sections
- **Momentum integrated into component demos** (Momentum compliance lifted from ~15% to ~55%):
  - `registry/feedback/demos.tsx`: `DurationComparisonDemo` appended to `FlowProgressBarOverview`
  - `registry/layout/demos.tsx`: `EasingComparisonDemo` appended to `FlowAccordionOverview`
  - `registry/navigation/demos.tsx`: `StaggerDemo` appended to `FlowTabsOverview`
  - `pages/foundation-detail.tsx`: `MomentumDemoBlock` appended after `MomentumExplorer` on the Momentum foundation page

---

## [1.0.0-rc.1] — 2026-03-26

### Changed
- **package.json**: renamed from placeholder `@figma/my-make-file` to `@flow/design-system`. Version bumped to `1.0.0-rc.1` to reflect release-candidate status.
- **Frame tokens (input-pattern-demos.tsx, input-pattern-demos-2.tsx, registry/*/demos.tsx)**: replaced 148 instances of hardcoded `gap={3/4/6}` with density-responsive semantic tokens:
  - `gap={3}` → `gap="component"` (20px default / 16px compact / 24px comfortable)
  - `gap={4}` → `gap="component-lg"` (28px default / 24px compact / 32px comfortable)
  - `gap={6}` → `gap="subsection"` (36px default / 28px compact / 44px comfortable)
- **Frame tokens (registry/feedback/demos.tsx, registry/layout/demos.tsx)**: extracted hardcoded `maxWidth: "600px"` / `maxWidth: "400px"` inline styles into named constants (`DEMO_PANEL_MAX_WIDTH`, `DEMO_COMPACT_MAX_WIDTH`, `DEMO_FORM_MAX_WIDTH`) with TODO comments to replace with LayoutGrid spans before Gold.
- **Momentum (input-pattern-demos.tsx)**: extracted magic `setTimeout(..., 1200)` and `setTimeout(..., 800)` into named constants `DEMO_ASYNC_DELAY_MS` and `DEMO_FILTER_DELAY_MS` with documentation explaining the distinction from CSS motion tokens.
- **Momentum (momentum-explorer.tsx)**: extracted `setTimeout(..., 1500)` into `CHOREOGRAPHY_RESET_DELAY_MS` with inline comment explaining the calculation.
- **Momentum (energy-explorer.tsx)**: extracted `setTimeout(..., 1500)` clipboard feedback delay into `COPY_FEEDBACK_DURATION_MS`.
- **README.md**: complete rewrite — now includes Quick Start, Navigation reference, developer adoption guide, project structure, token architecture overview, foundations compliance table, contributing instructions, and links.

### Fixed
- All demo files now correctly cascade spacing through the density system. Previously, `gap={3}` resolved to a fixed 12px regardless of density setting; it now scales 1.2× in comfortable mode and ÷1.2 in compact mode automatically.

---

## [0.9.0] — 2026-03-23

### Added
- **L4 Patterns**: 39 patterns across 8 categories registered in `pattern-registry.tsx`
  - Input: PhoneInput, CountrySelect, Search, Autocomplete, MultiSelect, DatePicker, DateRangePicker, ColorPicker, InlineEditable, RichTextEditor, FileUpload
  - Feedback: SnackbarProvider, EmptyState, NotificationPanel
  - Data: TransferList, DragSortableList, CalendarView, ChartWrapper
  - Display: AvatarGroup, HoverCard (desktop)
  - Overlay: ConfirmationDialog
  - Layout: FormSection, SwipeActions, QuickActions (mobile)
  - Navigation: DrawerAdapter
  - Content: FilterChipGroup, Timeline, SectionHeader, KPICard
- **Documentation Patterns spec** (`registry/documentation-patterns.md`): canonical patterns for 6 demo section types (Sizes, States, Emphasis, Matrix, Full Width, Responsive Grid), reusable helpers (`useDemoSize`, `DemoCell`, `EmphasisMatrix`, `statesGridStyle`), and anti-patterns.
- **Pattern Demo Mapping** (`PATTERN_DEMO_MAPPING.csv/json`): machine-readable registry of all 80+ demo functions across 39 patterns.
- CI workflow (`.github/workflows/ci.yml`): lint, typecheck, and build checks on every PR.

---

## [0.8.0] — 2026-03-13

### Added
- **FlowButton** established as canonical documentation reference:
  - 6 standard demo sections codified
  - `EmphasisMatrix` helper component introduced
  - `statesGridStyle()` and `useDemoSize()` helpers standardized
- **sys.frame.radius.surface** token: viewport-responsive surface radius (16px default, 20px phone, 12px compact, 20px comfortable). Migrated all page-level `Surface` components from `radius="xl"` ref bypass to `radius="surface"`.
- `sys.frame.gap.componentLg` (28px default) — new gap tier between `component` (20px) and `subsection` (36px).

### Fixed
- Density ×1.2 ratio corrected: comfortable heights recalculated (sm 56→58px, md 70→72px, lg 84→86px, xl 100→106px).
- Compound specificity conflict: `[data-density][data-size]` blocks now resolve density typography overrides correctly.

---

## [0.7.0] — 2026-03-01

### Added
- **Phase 3 component token migration**: Button, Chip, TextInput migrated from inline JS maps to `comp.*` CSS variable tokens + `[data-size]` cascade. Eliminated `btnHeightMap`, `btnFontMap`, `chipHeightMap`, `inputHeightMap` JS objects.
- **FlowChip**: CSS class migration (`.flow-chip`, `.flow-chip-remove`) — all inline styles removed.
- **Density blocks**: `[data-density]` overrides for `--sys-size-label-font`, `--sys-size-table-font` with correct ±1 step per density tier.

---

## [0.6.0] — 2026-02-28

### Added
- 6 design foundations documented: Energy, Voice, Frame, Depth, Momentum, Density
- Three-tier token architecture (ref → sys → comp) fully documented
- Foundation detail explorer pages (Energy, Frame, Voice, Momentum, Depth explorers)
- Governance page: Design Ops model, CI enforcement rules, contribution workflow

---

## Backlog / Known gaps

| Issue | Priority | Target | Status |
|---|---|---|---|
| Momentum demos at 15% compliance (no animation examples) | P0 | v1.0.0 | **Resolved in rc.3** — Hardcoded values tokenized, cycle demo added, reduced-motion support, docs corrected |
| Density mode toggle missing from all demos | P0 | v1.0.0 | **Resolved in rc.3** — DensityExplorer on Frame page, DensityDemoWrapper on all component/pattern demos |
| No npm package / distributable (docs-only repo) | P0 | v1.0.0 | **Resolved in rc.3** — Library build via `vite.config.lib.ts`, ESM + CSS output |
| Dark theme shadow demos absent | P1 | v1.0.0 | **Resolved in rc.3** — Opacities boosted, comparison panel uses `data-theme`, token reference shows real values |
| No automated unit or visual regression tests | P0 | v1.0.0 | **Resolved in rc.3** — 10 component test suites + CI integration |
| Search missing from documentation site | P1 | v1.1.0 | **Resolved in rc.3** — Client-side search with index, scoring, grouped results, keyboard nav |
| Interactive code playground (live prop editing) | P2 | v1.1.0 | **Resolved in rc.3** — PropPlayground with auto-generated controls, 9 components rolled out |
| Split 15 monolithic `flow-components-p{N}.tsx` | P1 | Q3 2026 | **Resolved in rc.3** — ~67 per-component files in domain folders, old p-files are re-export shims |
| Migrate ESLint v9 flat config | P2 | Tooling sprint | **Resolved in rc.3** — ESLint 9.39 + flat config + typescript-eslint 8.58 |
| Add Prettier formatter | P2 | Tooling sprint | **Resolved in rc.3** — Prettier 3.8, initial format applied |
| Tree-shaking of component barrels | P2 | After file split | **Resolved in rc.3** — `preserveModules` in lib build, named re-exports in all barrels |
| Storybook / visual regression tests | P2 | Future sprint | **Resolved in rc.3** — Storybook 10 + Playwright visual regression, 6 story files, 23+ visual tests |
| Upgrade React 18 → 19, TS 5.4 → 5.7 | P2 | Planned cycle | Open |

Full audit: [FOUNDATION_AUDIT_SUMMARY.md](./FOUNDATION_AUDIT_SUMMARY.md)
