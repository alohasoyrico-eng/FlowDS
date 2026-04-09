/// FLOW Design System — Density Provider
///
/// InheritedWidget that provides density context (compact/normal/comfortable)
/// to the subtree. Mirrors the React FlowDensityProvider from providers.tsx.
///
/// Wrap a section to set the density:
/// ```dart
/// FlowDensityProvider(density: FlowDensity.compact, child: ...)
/// ```

import 'package:flutter/material.dart';

import '../tokens/density.dart';

/// Provides a [FlowDensity] to all Flow components in the subtree.
class FlowDensityProvider extends InheritedWidget {
  final FlowDensity density;

  const FlowDensityProvider({
    super.key,
    required this.density,
    required super.child,
  });

  /// Retrieves the nearest [FlowDensity] from the widget tree.
  /// Defaults to [FlowDensity.normal] if no provider is found.
  static FlowDensity of(BuildContext context) {
    final provider =
        context.dependOnInheritedWidgetOfExactType<FlowDensityProvider>();
    return provider?.density ?? FlowDensity.normal;
  }

  @override
  bool updateShouldNotify(FlowDensityProvider oldWidget) =>
      density != oldWidget.density;
}
