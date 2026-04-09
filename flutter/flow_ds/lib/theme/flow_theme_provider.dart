/// FLOW Design System — Theme Provider
///
/// Root widget that provides Flow theming (light/dark) with a toggle.
/// Mirrors the React FlowThemeProvider from providers.tsx.
///
/// Wrap your app in this widget:
/// ```dart
/// FlowThemeProvider(child: MyApp())
/// ```

import 'package:flutter/material.dart';

import '../tokens/sys_tokens.dart';
import 'flow_theme.dart';

/// Root widget that provides Flow theming (light/dark) with a toggle.
class FlowThemeProvider extends StatefulWidget {
  final Widget child;
  final ThemeMode initialMode;

  const FlowThemeProvider({
    super.key,
    required this.child,
    this.initialMode = ThemeMode.light,
  });

  @override
  State<FlowThemeProvider> createState() => _FlowThemeProviderState();

  /// Access the provider from any descendant.
  static FlowThemeProviderState of(BuildContext context) {
    final state = context.findAncestorStateOfType<_FlowThemeProviderState>();
    assert(state != null, 'No FlowThemeProvider found in widget tree');
    return state!;
  }
}

/// Public interface for theme control.
abstract class FlowThemeProviderState {
  ThemeMode get mode;
  bool get isDark;
  void toggle();
  void setMode(ThemeMode mode);
}

class _FlowThemeProviderState extends State<FlowThemeProvider>
    implements FlowThemeProviderState {
  late ThemeMode _mode;

  @override
  void initState() {
    super.initState();
    _mode = widget.initialMode;
  }

  @override
  ThemeMode get mode => _mode;

  @override
  bool get isDark => _mode == ThemeMode.dark;

  @override
  void toggle() {
    setState(() {
      _mode = _mode == ThemeMode.light ? ThemeMode.dark : ThemeMode.light;
    });
  }

  @override
  void setMode(ThemeMode mode) {
    if (_mode != mode) setState(() => _mode = mode);
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: FlowTheme.light(),
      darkTheme: FlowTheme.dark(),
      themeMode: _mode,
      home: widget.child,
    );
  }
}

/// Extension for quick theme access from any BuildContext.
extension FlowThemeAccess on BuildContext {
  /// Access the current [FlowSysTokens] from the nearest [Theme].
  FlowSysTokens get flowSys => Theme.of(this).extension<FlowSysTokens>()!;

  /// Whether the current theme brightness is dark.
  bool get flowIsDark => Theme.of(this).brightness == Brightness.dark;
}
