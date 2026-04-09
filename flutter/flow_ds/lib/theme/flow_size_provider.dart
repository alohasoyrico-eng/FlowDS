/// FLOW Design System — Size Provider
///
/// InheritedWidget that provides the current component size (sm/md/lg/xl)
/// to the subtree. Mirrors the React FlowSizeProvider from providers.tsx.
///
/// Wrap a section to set the default size:
/// ```dart
/// FlowSizeProvider(size: FlowComponentSize.lg, child: ...)
/// ```

import 'package:flutter/material.dart';

import '../tokens/density.dart';

/// Provides a default [FlowComponentSize] to all Flow components in the subtree.
class FlowSizeProvider extends InheritedWidget {
  final FlowComponentSize size;

  const FlowSizeProvider({
    super.key,
    required this.size,
    required super.child,
  });

  /// Retrieves the nearest [FlowComponentSize] from the widget tree.
  /// Defaults to [FlowComponentSize.md] if no provider is found.
  static FlowComponentSize of(BuildContext context) {
    final provider =
        context.dependOnInheritedWidgetOfExactType<FlowSizeProvider>();
    return provider?.size ?? FlowComponentSize.md;
  }

  @override
  bool updateShouldNotify(FlowSizeProvider oldWidget) => size != oldWidget.size;
}
