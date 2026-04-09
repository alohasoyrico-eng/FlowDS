/// FLOW Design System — Density System
///
/// Density controls the spatial compactness of the UI. Three modes:
///   - compact:     default / 1.2  (tighter, data-dense UIs)
///   - normal:      baseline       (default density)
///   - comfortable: default * 1.2  (spacious, touch-friendly UIs)
///
/// Each mode shifts control heights, input heights, spacing (padding/gap),
/// radius, and grid metrics by a x1.2 ratio, snapped to the ref space scale.
///
/// Source of truth: tokens.css [data-density] blocks + tokens.ts ref.frame heights.

import 'ref_tokens.dart';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  1. Enums
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/// The three density modes, matching CSS `[data-density]` values.
enum FlowDensity {
  compact,
  normal,
  comfortable,
}

/// The four component size tiers, matching `[data-size]` values.
enum FlowComponentSize {
  sm,
  md,
  lg,
  xl,
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  2. Height Lookup Tables
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/// Control heights (buttons, chips, segmented controls, tabs, etc.)
/// per density x size. Values from `--ref-frame-height-control-*` in tokens.css.
///
/// Layout:
///   compact:     44, 50, 60, 74
///   normal:      48, 60, 72, 88
///   comfortable: 58, 72, 86, 106
const Map<FlowDensity, Map<FlowComponentSize, double>> _controlHeights = {
  FlowDensity.compact: {
    FlowComponentSize.sm: FlowRefFrame.heightControlSmCompact, //  44
    FlowComponentSize.md: FlowRefFrame.heightControlMdCompact, //  50
    FlowComponentSize.lg: FlowRefFrame.heightControlLgCompact, //  60
    FlowComponentSize.xl: FlowRefFrame.heightControlXlCompact, //  74
  },
  FlowDensity.normal: {
    FlowComponentSize.sm: FlowRefFrame.heightControlSm, //  48
    FlowComponentSize.md: FlowRefFrame.heightControlMd, //  60
    FlowComponentSize.lg: FlowRefFrame.heightControlLg, //  72
    FlowComponentSize.xl: FlowRefFrame.heightControlXl, //  88
  },
  FlowDensity.comfortable: {
    FlowComponentSize.sm: FlowRefFrame.heightControlSmComfortable, //  58
    FlowComponentSize.md: FlowRefFrame.heightControlMdComfortable, //  72
    FlowComponentSize.lg: FlowRefFrame.heightControlLgComfortable, //  86
    FlowComponentSize.xl: FlowRefFrame.heightControlXlComfortable, // 106
  },
};

/// Input heights (floating-label dual-text layout: text-fields, selects, etc.)
/// per density x size. Values from `--ref-frame-height-input-*` in tokens.css.
///
/// Layout:
///   compact:     48, 60, 72, 88
///   normal:      56, 72, 88, 104
///   comfortable: 68, 88, 104, 124
const Map<FlowDensity, Map<FlowComponentSize, double>> _inputHeights = {
  FlowDensity.compact: {
    FlowComponentSize.sm: FlowRefFrame.heightInputSmCompact, //  48
    FlowComponentSize.md: FlowRefFrame.heightInputMdCompact, //  60
    FlowComponentSize.lg: FlowRefFrame.heightInputLgCompact, //  72
    FlowComponentSize.xl: FlowRefFrame.heightInputXlCompact, //  88
  },
  FlowDensity.normal: {
    FlowComponentSize.sm: FlowRefFrame.heightInputSm, //  56
    FlowComponentSize.md: FlowRefFrame.heightInputMd, //  72
    FlowComponentSize.lg: FlowRefFrame.heightInputLg, //  88
    FlowComponentSize.xl: FlowRefFrame.heightInputXl, // 104
  },
  FlowDensity.comfortable: {
    FlowComponentSize.sm: FlowRefFrame.heightInputSmComfortable, //  68
    FlowComponentSize.md: FlowRefFrame.heightInputMdComfortable, //  88
    FlowComponentSize.lg: FlowRefFrame.heightInputLgComfortable, // 104
    FlowComponentSize.xl: FlowRefFrame.heightInputXlComfortable, // 124
  },
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  3. Height Accessors
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/// Returns the control height for the given [size] and [density].
double controlHeight(FlowComponentSize size, FlowDensity density) {
  return _controlHeights[density]![size]!;
}

/// Returns the input height for the given [size] and [density].
double inputHeight(FlowComponentSize size, FlowDensity density) {
  return _inputHeights[density]![size]!;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  4. Spacing Density — Padding
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/// Structural padding values per density mode.
/// From `sys.frame.density.{compact,comfortable}.padding` in tokens.ts and
/// `[data-density]` blocks in tokens.css.
class FlowDensityPadding {
  const FlowDensityPadding._({
    required this.control,
    required this.container,
    required this.surface,
  });

  /// Padding for inline controls (buttons, chips, inputs).
  final double control;

  /// Padding for container surfaces (cards, dialogs, panels).
  final double container;

  /// Padding for page-level surfaces.
  final double surface;
}

/// Compact:  16, 20, 40  (default / 1.2, snapped)
const _paddingCompact = FlowDensityPadding._(
  control: FlowRefFrame.space4, //  16
  container: FlowRefFrame.space5, //  20
  surface: FlowRefFrame.space10, //  40
);

/// Normal (default):  20, 24, 48
const _paddingNormal = FlowDensityPadding._(
  control: FlowRefFrame.space5, //  20
  container: FlowRefFrame.space6, //  24
  surface: FlowRefFrame.space12, //  48
);

/// Comfortable:  24, 28, 64  (default * 1.2, snapped)
const _paddingComfortable = FlowDensityPadding._(
  control: FlowRefFrame.space6, //  24
  container: FlowRefFrame.space7, //  28
  surface: FlowRefFrame.space16, //  64
);

/// Returns the [FlowDensityPadding] for the given [density].
FlowDensityPadding densityPadding(FlowDensity density) {
  switch (density) {
    case FlowDensity.compact:
      return _paddingCompact;
    case FlowDensity.normal:
      return _paddingNormal;
    case FlowDensity.comfortable:
      return _paddingComfortable;
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  5. Spacing Density — Gaps
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/// Structural gap values per density mode.
/// From `sys.frame.density.{compact,comfortable}.gap` in tokens.ts and
/// `[data-density]` blocks in tokens.css.
class FlowDensityGap {
  const FlowDensityGap._({
    required this.component,
    required this.componentLg,
    required this.subsection,
    required this.section,
    required this.page,
  });

  /// Gap between sibling components.
  final double component;

  /// Larger gap between component and subsection.
  final double componentLg;

  /// Gap between subsections.
  final double subsection;

  /// Gap between major sections.
  final double section;

  /// Gap between page-level regions.
  final double page;
}

/// Compact:  16, 24, 28, 48, 64
const _gapCompact = FlowDensityGap._(
  component: FlowRefFrame.space4, //  16
  componentLg: FlowRefFrame.space6, //  24
  subsection: FlowRefFrame.space7, //  28
  section: FlowRefFrame.space12, //  48
  page: FlowRefFrame.space16, //  64
);

/// Normal (default):  20, 28, 36, 64, 80
const _gapNormal = FlowDensityGap._(
  component: FlowRefFrame.space5, //  20
  componentLg: FlowRefFrame.space7, //  28
  subsection: FlowRefFrame.space9, //  36
  section: FlowRefFrame.space16, //  64
  page: FlowRefFrame.space20, //  80
);

/// Comfortable:  24, 32, 44, 80, 96
const _gapComfortable = FlowDensityGap._(
  component: FlowRefFrame.space6, //  24
  componentLg: FlowRefFrame.space8, //  32
  subsection: FlowRefFrame.space11, //  44
  section: FlowRefFrame.space20, //  80
  page: FlowRefFrame.space24, //  96
);

/// Returns the [FlowDensityGap] for the given [density].
FlowDensityGap densityGap(FlowDensity density) {
  switch (density) {
    case FlowDensity.compact:
      return _gapCompact;
    case FlowDensity.normal:
      return _gapNormal;
    case FlowDensity.comfortable:
      return _gapComfortable;
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  6. Radius Density
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/// Shape radius values per density mode.
/// From `sys.frame.radius-{control,container,surface}` in tokens.css density blocks.
class FlowDensityRadius {
  const FlowDensityRadius._({
    required this.control,
    required this.container,
    required this.surface,
  });

  /// Radius for inline controls (buttons, chips, inputs).
  final double control;

  /// Radius for container surfaces (cards, dialogs, panels).
  final double container;

  /// Radius for page-level surfaces.
  final double surface;
}

/// Compact:  8, 8, 12  (default / 1.2, snapped to radius scale)
const _radiusCompact = FlowDensityRadius._(
  control: FlowRefFrame.radius2, //   8
  container: FlowRefFrame.radius2, //   8
  surface: FlowRefFrame.radius3, //  12
);

/// Normal (default):  12, 12, 16
const _radiusNormal = FlowDensityRadius._(
  control: FlowRefFrame.radius3, //  12
  container: FlowRefFrame.radius3, //  12
  surface: FlowRefFrame.radius4, //  16
);

/// Comfortable:  16, 16, 20  (default * 1.2, snapped to radius scale)
const _radiusComfortable = FlowDensityRadius._(
  control: FlowRefFrame.radius4, //  16
  container: FlowRefFrame.radius4, //  16
  surface: FlowRefFrame.radius5, //  20
);

/// Returns the [FlowDensityRadius] for the given [density].
FlowDensityRadius densityRadius(FlowDensity density) {
  switch (density) {
    case FlowDensity.compact:
      return _radiusCompact;
    case FlowDensity.normal:
      return _radiusNormal;
    case FlowDensity.comfortable:
      return _radiusComfortable;
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  7. Grid Density
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/// Grid layout metrics per density mode.
/// From `sys.frame.grid` density overrides in tokens.css.
class FlowDensityGrid {
  const FlowDensityGrid._({
    required this.lgGutter,
    required this.lgMargin,
    required this.mdGutter,
    required this.mdMargin,
    required this.smMargin,
  });

  /// Large (desktop) grid gutter.
  final double lgGutter;

  /// Large (desktop) grid margin.
  final double lgMargin;

  /// Medium (tablet) grid gutter.
  final double mdGutter;

  /// Medium (tablet) grid margin.
  final double mdMargin;

  /// Small (mobile) grid margin.
  final double smMargin;
}

/// Compact:  lg 24/40, md 20/20, sm 12
const _gridCompact = FlowDensityGrid._(
  lgGutter: FlowRefFrame.space6, //  24
  lgMargin: FlowRefFrame.space10, //  40
  mdGutter: FlowRefFrame.space5, //  20
  mdMargin: FlowRefFrame.space5, //  20
  smMargin: FlowRefFrame.space3, //  12
);

/// Normal (default):  lg 32/48, md 24/24, sm 16
const _gridNormal = FlowDensityGrid._(
  lgGutter: FlowRefFrame.space8, //  32
  lgMargin: FlowRefFrame.space12, //  48
  mdGutter: FlowRefFrame.space6, //  24
  mdMargin: FlowRefFrame.space6, //  24
  smMargin: FlowRefFrame.space4, //  16
);

/// Comfortable:  lg 40/64, md 28/28, sm 20
const _gridComfortable = FlowDensityGrid._(
  lgGutter: FlowRefFrame.space10, //  40
  lgMargin: FlowRefFrame.space16, //  64
  mdGutter: FlowRefFrame.space7, //  28
  mdMargin: FlowRefFrame.space7, //  28
  smMargin: FlowRefFrame.space5, //  20
);

/// Returns the [FlowDensityGrid] for the given [density].
FlowDensityGrid densityGrid(FlowDensity density) {
  switch (density) {
    case FlowDensity.compact:
      return _gridCompact;
    case FlowDensity.normal:
      return _gridNormal;
    case FlowDensity.comfortable:
      return _gridComfortable;
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  8. Aggregate — FlowDensityData
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/// All density-derived spatial values bundled for convenient propagation
/// through the widget tree (e.g. via InheritedWidget or Provider).
class FlowDensityData {
  const FlowDensityData._({
    required this.density,
    required this.padding,
    required this.gap,
    required this.radius,
    required this.grid,
  });

  /// Which density mode this data represents.
  final FlowDensity density;

  /// Structural padding values.
  final FlowDensityPadding padding;

  /// Structural gap values.
  final FlowDensityGap gap;

  /// Shape radius values.
  final FlowDensityRadius radius;

  /// Grid layout metrics.
  final FlowDensityGrid grid;

  /// Returns the control height for the given [size] at this density.
  double controlHeight(FlowComponentSize size) =>
      _controlHeights[density]![size]!;

  /// Returns the input height for the given [size] at this density.
  double inputHeight(FlowComponentSize size) => _inputHeights[density]![size]!;

  /// Pre-built instances for each density mode. Avoids repeated allocation.
  static const compact = FlowDensityData._(
    density: FlowDensity.compact,
    padding: _paddingCompact,
    gap: _gapCompact,
    radius: _radiusCompact,
    grid: _gridCompact,
  );

  static const normal = FlowDensityData._(
    density: FlowDensity.normal,
    padding: _paddingNormal,
    gap: _gapNormal,
    radius: _radiusNormal,
    grid: _gridNormal,
  );

  static const comfortable = FlowDensityData._(
    density: FlowDensity.comfortable,
    padding: _paddingComfortable,
    gap: _gapComfortable,
    radius: _radiusComfortable,
    grid: _gridComfortable,
  );

  /// Resolve a [FlowDensity] enum to its pre-built [FlowDensityData].
  static FlowDensityData of(FlowDensity density) {
    switch (density) {
      case FlowDensity.compact:
        return compact;
      case FlowDensity.normal:
        return normal;
      case FlowDensity.comfortable:
        return comfortable;
    }
  }
}
