/// FLOW Design System — Theme Builder
///
/// Convenience builder that wires [FlowSysTokens] + [FlowCompTokens]
/// into a standard Flutter [ThemeData] for light and dark modes.
///
/// Both token extensions are registered so descendants can access them via:
///   Theme.of(context).extension<FlowSysTokens>()
///   Theme.of(context).extension<FlowCompTokens>()

import 'package:flutter/material.dart';

import '../tokens/comp_tokens.dart';
import '../tokens/sys_tokens.dart';

abstract final class FlowTheme {
  /// Light theme with both token extensions registered.
  static ThemeData light() {
    final sys = FlowSysTokens.light();
    final comp = FlowCompTokens.light(sys);
    return ThemeData(
      brightness: Brightness.light,
      colorScheme: ColorScheme.light(
        primary: sys.actionPrimary,
        onPrimary: sys.textInverse,
        secondary: sys.actionSecondary,
        surface: sys.surfacePrimary,
        onSurface: sys.textPrimary,
        error: sys.statusError,
        onError: sys.textOnAction,
      ),
      scaffoldBackgroundColor: sys.surfacePrimary,
      extensions: [sys, comp],
    );
  }

  /// Dark theme with both token extensions registered.
  static ThemeData dark() {
    final sys = FlowSysTokens.dark();
    final comp = FlowCompTokens.dark(sys);
    return ThemeData(
      brightness: Brightness.dark,
      colorScheme: ColorScheme.dark(
        primary: sys.actionPrimary,
        onPrimary: sys.textInverse,
        secondary: sys.actionSecondary,
        surface: sys.surfacePrimary,
        onSurface: sys.textPrimary,
        error: sys.statusError,
        onError: sys.textOnAction,
      ),
      scaffoldBackgroundColor: sys.surfacePrimary,
      extensions: [sys, comp],
    );
  }
}
