# Flow Design System — Flutter

Flutter implementation of the Flow Design System. Cross-platform widget library with a 4-layer token architecture (Foundations → Primitives → Components → Patterns).

**Version:** 1.0.0-rc.3 · **License:** MIT · [Main repo](https://github.com/ER-Mobility-MX/flow)

---

## Installation

Add to your `pubspec.yaml`:

```yaml
dependencies:
  flow_ds:
    path: ../flutter/flow_ds  # local reference
```

Or, once published:

```yaml
dependencies:
  flow_ds: ^1.0.0
```

Then run:

```sh
flutter pub get
```

---

## Quick start

```dart
import 'package:flutter/material.dart';
import 'package:flow_ds/flow_ds.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return FlowThemeProvider(
      child: MaterialApp(
        theme: FlowTheme.light(),
        darkTheme: FlowTheme.dark(),
        home: const HomeScreen(),
      ),
    );
  }
}

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: FlowStack(
        gap: FlowGap.component,
        padding: FlowPadding.container,
        children: [
          FlowText('Welcome to Flow', role: FlowTextRole.headingL),
          FlowButton(
            label: 'Get started',
            onPressed: () {},
          ),
        ],
      ),
    );
  }
}
```

---

## Architecture

### 4 Layers

| Layer | What | Count |
|-------|------|-------|
| **L1 Foundations** | Design tokens (ref → sys → comp) | 4 token files + density |
| **L2 Primitives** | `FlowSurface`, `FlowText`, `FlowStack`, `FlowInline`, `FlowGrid`, etc. | 13 widgets |
| **L3 Components** | Reusable UI components organized by domain | 47 widgets |
| **L4 Patterns** | Composed workflows built from L3 components | 35 widgets |

### Token hierarchy

```
ref (raw values) → sys (semantic, theme-aware) → comp (component-specific)
```

- **ref**: `FlowRefEnergy`, `FlowRefFrame`, `FlowRefVoice`, `FlowRefDepth`, `FlowRefMomentum`
- **sys**: `FlowSysTokens` (ThemeExtension, light/dark)
- **comp**: `FlowCompTokens` (ThemeExtension, 40 component groups)

Access tokens in any widget:

```dart
final sys = Theme.of(context).extension<FlowSysTokens>()!;
final comp = Theme.of(context).extension<FlowCompTokens>()!;
```

Or with the convenience extension:

```dart
final comp = context.comp;
```

---

## Component inventory

### Controls
`FlowButton` · `FlowIconButton` · `FlowFAB`

### Inputs
`FlowTextInput` · `FlowTextArea` · `FlowOTPInput` · `FlowPhoneInput`

### Selection
`FlowCheckbox` · `FlowRadio` · `FlowSwitch` · `FlowSelect` · `FlowSegmentedControl` · `FlowSlider` · `FlowToggleButton` · `FlowCountrySelect`

### Display
`FlowAvatar` · `FlowAvatarGroup` · `FlowBadge` · `FlowCard` · `FlowChip` · `FlowTag` · `FlowList` · `FlowTable` · `FlowTreeView` · `FlowKPITrendIndicator`

### Feedback
`FlowSkeleton` · `FlowProgressBar` · `FlowCircularProgress` · `FlowInlineValidation`

### Navigation
`FlowTabs` · `FlowBottomNav` · `FlowBreadcrumbs` · `FlowPagination` · `FlowSidebar` · `FlowStepper`

### Layout
`FlowAccordion` · `FlowFieldset` · `FlowShortcutGrid` · `FlowSplitPane`

### Overlays
`FlowDialog` · `FlowBottomSheet` · `FlowTooltip` · `FlowPopover` · `FlowMenu` · `FlowContextMenu`

### Data
`FlowChartLegendItem` · `FlowSortControl`

### Patterns (L4)
`FlowSearch` · `FlowAutocomplete` · `FlowMultiSelect` · `FlowDatePicker` · `FlowDateRangePicker` · `FlowColorPicker` · `FlowInlineEditable` · `FlowRichTextEditor` · `FlowFileUpload` · `FlowSnackbar` · `FlowEmptyState` · `FlowNotificationPanel` · `FlowPullToRefresh` · `FlowFilterChipGroup` · `FlowTimeline` · `FlowSectionHeader` · `FlowKPICard` · `FlowHoverCard` · `FlowConfirmationDialog` · `FlowCommandPalette` · `FlowQuickActions` · `FlowFullscreenSheet` · `FlowFormSection` · `FlowToolbar` · `FlowSwipeActions` · `FlowTopbar` · `FlowDrawerAdapter` · `FlowDataTable` · `FlowVirtualDataTable` · `FlowTransferList` · `FlowDragSortableList` · `FlowAdvancedFilters` · `FlowColumnConfigurator` · `FlowCalendarView` · `FlowChartWrapper`

---

## Density & sizing

Flow is density-aware. Wrap with providers to control sizing:

```dart
FlowDensityProvider(
  density: FlowDensity.compact,
  child: FlowSizeProvider(
    size: FlowComponentSize.md,
    child: YourContent(),
  ),
);
```

Available densities: `compact` · `normal` · `comfortable`
Available sizes: `sm` · `md` · `lg` · `xl`

---

## Links

- [Main repository](https://github.com/ER-Mobility-MX/flow)
- [React documentation](https://github.com/ER-Mobility-MX/flow#readme)
- [Contributing guide](https://github.com/ER-Mobility-MX/flow/blob/main/CONTRIBUTING.md)
