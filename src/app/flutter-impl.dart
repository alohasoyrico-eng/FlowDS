/**
 * FLOW Design System — Flutter Implementation
 * ─────────────────────────────────────────────
 * This file contains the complete Dart/Flutter source code
 * that would live in lib/flow/ in a Flutter project.
 * 
 * It demonstrates:
 *  1. Token classes (ref → sys → comp) as ThemeExtension
 *  2. Primitive widgets (FlowSurface, FlowText, FlowStack, etc.)
 *  3. Core component widgets (FlowButton, FlowTextInput, FlowCard, etc.)
 *  4. Theme provider with light/dark switching
 *
 * Architecture mirrors React implementation 1:1.
 */

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FILE 1: lib/flow/tokens/ref_tokens.dart
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━��━━━━━━━━━━━━━
export const refTokensDart = `
import 'package:flutter/material.dart';

/// FLOW ref tokens — raw scales. The only place absolute values exist.
/// Generated from canonical source: tokens.ts
class FlowRefEnergy {
  // Neutral scale — Figma Edenred Slate palette
  static const neutral0 = Color(0xFFFFFFFF);
  static const neutralColdWhite = Color(0xFFF1F7FF);
  static const neutral50 = Color(0xFFF8FAFC);
  static const neutral100 = Color(0xFFF1F5F9);
  static const neutral150 = Color(0xFFE9EEF5);
  static const neutral200 = Color(0xFFE2E8F0);
  static const neutral300 = Color(0xFFCBD5E1);
  static const neutral400 = Color(0xFF94A3B8);
  static const neutral500 = Color(0xFF64748B);
  static const neutral600 = Color(0xFF475569);
  static const neutral700 = Color(0xFF334155);
  static const neutral800 = Color(0xFF1E293B);
  static const neutral900 = Color(0xFF0F172A);
  static const neutral950 = Color(0xFF080E1B);

  // Blue scale — Figma Edenred
  static const blue50 = Color(0xFFE0EEFF);
  static const blue100 = Color(0xFFC7DFFF);
  static const blue200 = Color(0xFF8ABCFF);
  static const blue300 = Color(0xFF529CFF);
  static const blue400 = Color(0xFF1A7CFF);
  static const blue500 = Color(0xFF0060DF);
  static const blue600 = Color(0xFF004DB3);
  static const blue700 = Color(0xFF003985);
  static const blue800 = Color(0xFF002557);
  static const blue900 = Color(0xFF00142E);

  // Red scale — Figma Edenred (10 steps)
  static const red50 = Color(0xFFFFE3E0);
  static const red100 = Color(0xFFFFC6C2);
  static const red200 = Color(0xFFFF8D85);
  static const red300 = Color(0xFFFF5447);
  static const red400 = Color(0xFFFF1B0A);
  static const red500 = Color(0xFFCA0E00);
  static const red600 = Color(0xFFA30B00);
  static const red700 = Color(0xFF7A0800);
  static const red800 = Color(0xFF520600);
  static const red900 = Color(0xFF290300);

  // Green scale — Figma Edenred (10 steps)
  static const green50 = Color(0xFFE1F4EB);
  static const green100 = Color(0xFFC3EFDA);
  static const green200 = Color(0xFF79E6B4);
  static const green300 = Color(0xFF2EE590);
  static const green400 = Color(0xFF0DBA69);
  static const green500 = Color(0xFF007840);
  static const green600 = Color(0xFF065B33);
  static const green700 = Color(0xFF084026);
  static const green800 = Color(0xFF072718);
  static const green900 = Color(0xFF05140D);

  // Orange scale — Figma Edenred (renamed from amber, 10 steps)
  static const orange50 = Color(0xFFFDEAE3);
  static const orange100 = Color(0xFFFBD5C6);
  static const orange200 = Color(0xFFF6AB8E);
  static const orange300 = Color(0xFFF28155);
  static const orange400 = Color(0xFFED571C);
  static const orange500 = Color(0xFFBF410F);
  static const orange600 = Color(0xFF97330C);
  static const orange700 = Color(0xFF712709);
  static const orange800 = Color(0xFF4C1A06);
  static const orange900 = Color(0xFF260D03);

  // Extended palette — purple
  static const purple50 = Color(0xFFF3EEFB);
  static const purple100 = Color(0xFFDDD2F3);
  static const purple500 = Color(0xFF6B4DC7);
  static const purple700 = Color(0xFF503A99);

  // Extended palette — teal
  static const teal50 = Color(0xFFE8F7F7);
  static const teal100 = Color(0xFFC0EBEB);
  static const teal500 = Color(0xFF0A7A7A);
  static const teal700 = Color(0xFF075C5C);

  // Extended palette — olive
  static const olive50 = Color(0xFFF5F3EC);
  static const olive100 = Color(0xFFE5DFC0);
  static const olive500 = Color(0xFF8A5A2A);
  static const olive700 = Color(0xFF68431F);

  // Border base colors (matches React ref.state.border)
  // light: rgb(10, 10, 15) — NOT neutral800 (#1E293B)
  // dark: rgb(255, 255, 255) — white
  static const borderBaseLight = Color.fromARGB(255, 10, 10, 15);
  static const borderBaseDark = Color(0xFFFFFFFF);
}

class FlowRefFrame {
  // Space scale
  static const space0 = 0.0;
  static const space1 = 4.0;
  static const space2 = 8.0;
  static const space3 = 12.0;
  static const space4 = 16.0;
  static const space5 = 20.0;
  static const space6 = 24.0;
  static const space8 = 32.0;
  static const space10 = 40.0;
  static const space12 = 48.0;
  static const space16 = 64.0;
  static const space20 = 80.0;

  // Radius scale — synced from React ref.frame.radius.*
  static const radius0 = 0.0;
  static const radius1 = 4.0;
  static const radius2 = 8.0;
  static const radius3 = 12.0;
  static const radius4 = 16.0;
  static const radius5 = 20.0;
  static const radiusFull = 9999.0;

  // Control heights (density-default) — synced from React ref.frame.height.*
  static const heightControlSm = 48.0;
  static const heightControlMd = 60.0;
  static const heightControlLg = 72.0;
  static const heightControlXl = 88.0;

  // Control heights — compact density (÷1.2 from default, height-only)
  static const heightControlSmCompact = 40.0;
  static const heightControlMdCompact = 50.0;
  static const heightControlLgCompact = 60.0;
  static const heightControlXlCompact = 73.0;

  // Control heights — comfortable density (×1.2 from default)
  static const heightControlSmComfortable = 58.0;
  static const heightControlMdComfortable = 72.0;
  static const heightControlLgComfortable = 86.0;
  static const heightControlXlComfortable = 106.0;

  // Sidebar structural widths
  static const sidebarExpanded = 280.0;
  static const sidebarCollapsed = 56.0;

  // Responsive breakpoints (min-width thresholds)
  static const breakpointSm = 576.0;  // mobile → tablet
  static const breakpointMd = 992.0;  // tablet → desktop

  // Layout grid specification per viewport tier
  // Derived from Edenred design spec — values traceable to space scale
  static const gridLgColumns = 12;
  static const gridLgGutter = space8;    // 32px — synced from React
  static const gridLgMargin = space12;   // 48px
  static const gridLgMaxWidth = 1440.0;
  static const gridMdColumns = 6;
  static const gridMdGutter = space6;    // 24px
  static const gridMdMargin = space6;    // 24px
  static const gridSmColumns = 1;
  static const gridSmGutter = space0;    // 0px
  static const gridSmMargin = space4;    // 16px

  // Density grid overrides — compact (×1.2 ratio, snapped to space scale)
  static const gridCompactGutterLg = space6;   // 24px
  static const gridCompactMarginLg = space10;  // 40px
  static const gridCompactGutterMd = space5;   // 20px
  static const gridCompactMarginMd = space5;   // 20px
  static const gridCompactMarginSm = space3;   // 12px

  // Density grid overrides — comfortable (×1.2 ratio, snapped to space scale)
  static const gridComfortableGutterLg = space10;  // 40px
  static const gridComfortableMarginLg = space16;  // 64px
  static const gridComfortableGutterMd = 28.0;     // 28px (between space7 and space8)
  static const gridComfortableMarginMd = 28.0;     // 28px
  static const gridComfortableMarginSm = space5;   // 20px
}

class FlowRefVoice {
  static const familySans = 'Inter';
  static const familyMono = 'JetBrains Mono';

  static const weightRegular = FontWeight.w400;
  static const weightMedium = FontWeight.w500;
  static const weightSemibold = FontWeight.w600;
  static const weightBold = FontWeight.w700;

  // Size scale — 14-step indexed scale, synced from React ref.voice.size
  static const size1 = 10.0;   // density: compact caption
  static const size2 = 11.0;   // density: compact label
  static const size3 = 12.0;   // density: compact body-sm
  static const size4 = 13.0;   // density: compact body
  static const size5 = 14.0;   // Figma: Label XS, Paragraph S
  static const size6 = 16.0;   // Figma: Label S, Paragraph M
  static const size7 = 18.0;   // Figma: Label M, Paragraph L
  static const size8 = 20.0;   // Figma: Heading M, Label L
  static const size9 = 24.0;   // Figma: Heading L, Label XL
  static const size10 = 32.0;  // Figma: Display XS
  static const size11 = 40.0;  // Figma: Display S
  static const size12 = 48.0;  // Figma: Display M
  static const size13 = 54.0;  // Figma: Display L
  static const size14 = 62.0;  // Figma: Display XL

  // Named aliases — map to indexed scale for readability.
  // These resolve V1 (naming drift): every named alias is traceable to a step.
  static const sizeXs = size3;    // 12px — caption, overline
  static const sizeSm = size3;    // 12px — small label
  static const sizeBase = size5;  // 14px — default body
  static const sizeMd = size6;    // 16px — medium body
  static const sizeLg = size8;    // 20px — large body / heading
  static const sizeXl = size9;    // 24px — xl heading

  // Line-height scale (unitless multipliers)
  static const leading1 = 1.0;
  static const leadingTight = 1.2;
  static const leadingSnug = 1.4;
  static const leadingNormal = 1.5;
  static const leadingRelaxed = 1.6;
  static const leadingLoose = 1.7;
}

class FlowRefMomentum {
  static const durationInstant = Duration.zero;
  static const durationFast = Duration(milliseconds: 100);
  static const durationNormal = Duration(milliseconds: 200);
  static const durationSlow = Duration(milliseconds: 350);
  static const durationSlower = Duration(milliseconds: 500);

  /// Matches CSS: cubic-bezier(0.2, 0, 0, 1)
  static const easingStandard = Cubic(0.2, 0, 0, 1);
  /// Matches CSS: cubic-bezier(0, 0, 0, 1)
  static const easingEnter = Cubic(0, 0, 0, 1);
  /// Matches CSS: cubic-bezier(0.2, 0, 1, 1)
  static const easingExit = Cubic(0.2, 0, 1, 1);
}

class FlowRefState {
  static const opacityDisabled = 0.42;
  static const opacityHover = 0.06;
  static const opacityPressed = 0.12;
  static const opacitySelected = 0.10;

  // Focus ring
  static const focusRingWidth = 2.0;
  static const focusRingOffset = 2.0;
}
`;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FILE 2: lib/flow/tokens/sys_tokens.dart
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const sysTokensDart = `
import 'dart:ui';
import 'package:flutter/material.dart';
import 'ref_tokens.dart';

/// FLOW sys tokens — semantic roles. Themes remap these to different ref tokens.
/// This is a ThemeExtension so it participates in Flutter's theming system.
@immutable
class FlowSysTokens extends ThemeExtension<FlowSysTokens> {
  // Surface
  final Color surfacePrimary;
  final Color surfaceSecondary;
  final Color surfaceTertiary;
  final Color surfaceSunken;
  final Color surfaceInverse;

  // Text
  final Color textPrimary;
  final Color textSecondary;
  final Color textTertiary;
  final Color textInverse;
  final Color textAccent;
  final Color textDanger;
  final Color textSuccess;
  final Color textWarning;

  // Border
  final Color borderDefault;
  final Color borderStrong;
  final Color borderFocus;

  // Action
  final Color actionPrimary;
  final Color actionPrimaryHover;
  final Color actionDestructive;

  // Status
  final Color statusSuccess;
  final Color statusSuccessSubtle;
  final Color statusWarning;
  final Color statusWarningSubtle;
  final Color statusError;
  final Color statusErrorSubtle;
  final Color statusInfo;
  final Color statusInfoSubtle;

  // State overlays
  final Color stateHoverOverlay;
  final Color statePressedOverlay;
  final Color stateSelectedOverlay;
  final double stateDisabledOpacity;

  // Elevation
  final List<BoxShadow> elevation0;
  final List<BoxShadow> elevation1;
  final List<BoxShadow> elevation2;
  final List<BoxShadow> elevation3;
  final List<BoxShadow> elevation4;

  const FlowSysTokens({
    required this.surfacePrimary,
    required this.surfaceSecondary,
    required this.surfaceTertiary,
    required this.surfaceSunken,
    required this.surfaceInverse,
    required this.textPrimary,
    required this.textSecondary,
    required this.textTertiary,
    required this.textInverse,
    required this.textAccent,
    required this.textDanger,
    required this.textSuccess,
    required this.textWarning,
    required this.borderDefault,
    required this.borderStrong,
    required this.borderFocus,
    required this.actionPrimary,
    required this.actionPrimaryHover,
    required this.actionDestructive,
    required this.statusSuccess,
    required this.statusSuccessSubtle,
    required this.statusWarning,
    required this.statusWarningSubtle,
    required this.statusError,
    required this.statusErrorSubtle,
    required this.statusInfo,
    required this.statusInfoSubtle,
    required this.stateHoverOverlay,
    required this.statePressedOverlay,
    required this.stateSelectedOverlay,
    required this.stateDisabledOpacity,
    required this.elevation0,
    required this.elevation1,
    required this.elevation2,
    required this.elevation3,
    required this.elevation4,
  });

  /// Light theme (default)
  static final light = FlowSysTokens(
    surfacePrimary: FlowRefEnergy.neutral0,
    surfaceSecondary: FlowRefEnergy.neutral50,
    surfaceTertiary: FlowRefEnergy.neutral100,
    surfaceSunken: FlowRefEnergy.neutral150,
    surfaceInverse: FlowRefEnergy.neutral900,
    textPrimary: FlowRefEnergy.neutral800,
    textSecondary: FlowRefEnergy.neutral500,
    textTertiary: FlowRefEnergy.neutral400,
    textInverse: FlowRefEnergy.neutral0,
    textAccent: FlowRefEnergy.blue500,
    textDanger: FlowRefEnergy.red500,
    textSuccess: FlowRefEnergy.green500,
    textWarning: FlowRefEnergy.orange500,
    borderDefault: FlowRefEnergy.borderBaseLight.withOpacity(0.08),
    borderStrong: FlowRefEnergy.borderBaseLight.withOpacity(0.15),
    borderFocus: FlowRefEnergy.blue500,
    actionPrimary: FlowRefEnergy.blue500,
    actionPrimaryHover: FlowRefEnergy.blue700,
    actionDestructive: FlowRefEnergy.red500,
    statusSuccess: FlowRefEnergy.green500,
    statusSuccessSubtle: FlowRefEnergy.green50,
    statusWarning: FlowRefEnergy.orange500,
    statusWarningSubtle: FlowRefEnergy.orange50,
    statusError: FlowRefEnergy.red500,
    statusErrorSubtle: FlowRefEnergy.red50,
    statusInfo: FlowRefEnergy.blue500,
    statusInfoSubtle: FlowRefEnergy.blue50,
    stateHoverOverlay: FlowRefEnergy.borderBaseLight.withOpacity(0.06),
    statePressedOverlay: FlowRefEnergy.borderBaseLight.withOpacity(0.12),
    stateSelectedOverlay: FlowRefEnergy.blue500.withOpacity(0.10),
    stateDisabledOpacity: FlowRefState.opacityDisabled,
    elevation0: [],
    elevation1: [BoxShadow(offset: Offset(0, 1), blurRadius: 3, color: Colors.black.withOpacity(0.06))],
    elevation2: [BoxShadow(offset: Offset(0, 4), blurRadius: 8, color: Colors.black.withOpacity(0.06))],
    elevation3: [BoxShadow(offset: Offset(0, 8), blurRadius: 24, color: Colors.black.withOpacity(0.08))],
    elevation4: [BoxShadow(offset: Offset(0, 16), blurRadius: 48, color: Colors.black.withOpacity(0.12))],
  );

  /// Dark theme
  static final dark = FlowSysTokens(
    surfacePrimary: FlowRefEnergy.neutral950,
    surfaceSecondary: FlowRefEnergy.neutral900,
    surfaceTertiary: FlowRefEnergy.neutral800,
    surfaceSunken: FlowRefEnergy.neutral700,
    surfaceInverse: FlowRefEnergy.neutral100,
    textPrimary: FlowRefEnergy.neutral100,
    textSecondary: FlowRefEnergy.neutral400,
    textTertiary: FlowRefEnergy.neutral500,
    textInverse: FlowRefEnergy.neutral900,
    textAccent: FlowRefEnergy.blue200,
    textDanger: FlowRefEnergy.red200,
    textSuccess: FlowRefEnergy.green200,
    textWarning: FlowRefEnergy.orange200,
    borderDefault: FlowRefEnergy.borderBaseDark.withOpacity(0.08),
    borderStrong: FlowRefEnergy.borderBaseDark.withOpacity(0.15),
    borderFocus: FlowRefEnergy.blue200,
    actionPrimary: FlowRefEnergy.blue200,
    actionPrimaryHover: FlowRefEnergy.blue100,
    actionDestructive: FlowRefEnergy.red200,
    statusSuccess: FlowRefEnergy.green200,
    statusSuccessSubtle: FlowRefEnergy.green900,
    statusWarning: FlowRefEnergy.orange200,
    statusWarningSubtle: FlowRefEnergy.orange900,
    statusError: FlowRefEnergy.red200,
    statusErrorSubtle: FlowRefEnergy.red900,
    statusInfo: FlowRefEnergy.blue100,
    statusInfoSubtle: FlowRefEnergy.blue900,
    stateHoverOverlay: FlowRefEnergy.borderBaseDark.withOpacity(0.06),
    statePressedOverlay: FlowRefEnergy.borderBaseDark.withOpacity(0.12),
    stateSelectedOverlay: FlowRefEnergy.blue200.withOpacity(0.10),
    stateDisabledOpacity: FlowRefState.opacityDisabled,
    elevation0: [],
    elevation1: [BoxShadow(offset: Offset(0, 1), blurRadius: 3, color: Colors.black.withOpacity(0.20))],
    elevation2: [BoxShadow(offset: Offset(0, 4), blurRadius: 8, color: Colors.black.withOpacity(0.20))],
    elevation3: [BoxShadow(offset: Offset(0, 8), blurRadius: 24, color: Colors.black.withOpacity(0.25))],
    elevation4: [BoxShadow(offset: Offset(0, 16), blurRadius: 48, color: Colors.black.withOpacity(0.30))],
  );

  @override
  FlowSysTokens copyWith({
    Color? surfacePrimary,
    Color? surfaceSecondary,
    Color? surfaceTertiary,
    Color? surfaceSunken,
    Color? surfaceInverse,
    Color? textPrimary,
    Color? textSecondary,
    Color? textTertiary,
    Color? textInverse,
    Color? textAccent,
    Color? textDanger,
    Color? textSuccess,
    Color? textWarning,
    Color? borderDefault,
    Color? borderStrong,
    Color? borderFocus,
    Color? actionPrimary,
    Color? actionPrimaryHover,
    Color? actionDestructive,
    Color? statusSuccess,
    Color? statusSuccessSubtle,
    Color? statusWarning,
    Color? statusWarningSubtle,
    Color? statusError,
    Color? statusErrorSubtle,
    Color? statusInfo,
    Color? statusInfoSubtle,
    Color? stateHoverOverlay,
    Color? statePressedOverlay,
    Color? stateSelectedOverlay,
    double? stateDisabledOpacity,
    List<BoxShadow>? elevation0,
    List<BoxShadow>? elevation1,
    List<BoxShadow>? elevation2,
    List<BoxShadow>? elevation3,
    List<BoxShadow>? elevation4,
  }) {
    return FlowSysTokens(
      surfacePrimary: surfacePrimary ?? this.surfacePrimary,
      surfaceSecondary: surfaceSecondary ?? this.surfaceSecondary,
      surfaceTertiary: surfaceTertiary ?? this.surfaceTertiary,
      surfaceSunken: surfaceSunken ?? this.surfaceSunken,
      surfaceInverse: surfaceInverse ?? this.surfaceInverse,
      textPrimary: textPrimary ?? this.textPrimary,
      textSecondary: textSecondary ?? this.textSecondary,
      textTertiary: textTertiary ?? this.textTertiary,
      textInverse: textInverse ?? this.textInverse,
      textAccent: textAccent ?? this.textAccent,
      textDanger: textDanger ?? this.textDanger,
      textSuccess: textSuccess ?? this.textSuccess,
      textWarning: textWarning ?? this.textWarning,
      borderDefault: borderDefault ?? this.borderDefault,
      borderStrong: borderStrong ?? this.borderStrong,
      borderFocus: borderFocus ?? this.borderFocus,
      actionPrimary: actionPrimary ?? this.actionPrimary,
      actionPrimaryHover: actionPrimaryHover ?? this.actionPrimaryHover,
      actionDestructive: actionDestructive ?? this.actionDestructive,
      statusSuccess: statusSuccess ?? this.statusSuccess,
      statusSuccessSubtle: statusSuccessSubtle ?? this.statusSuccessSubtle,
      statusWarning: statusWarning ?? this.statusWarning,
      statusWarningSubtle: statusWarningSubtle ?? this.statusWarningSubtle,
      statusError: statusError ?? this.statusError,
      statusErrorSubtle: statusErrorSubtle ?? this.statusErrorSubtle,
      statusInfo: statusInfo ?? this.statusInfo,
      statusInfoSubtle: statusInfoSubtle ?? this.statusInfoSubtle,
      stateHoverOverlay: stateHoverOverlay ?? this.stateHoverOverlay,
      statePressedOverlay: statePressedOverlay ?? this.statePressedOverlay,
      stateSelectedOverlay: stateSelectedOverlay ?? this.stateSelectedOverlay,
      stateDisabledOpacity: stateDisabledOpacity ?? this.stateDisabledOpacity,
      elevation0: elevation0 ?? this.elevation0,
      elevation1: elevation1 ?? this.elevation1,
      elevation2: elevation2 ?? this.elevation2,
      elevation3: elevation3 ?? this.elevation3,
      elevation4: elevation4 ?? this.elevation4,
    );
  }

  @override
  FlowSysTokens lerp(FlowSysTokens? other, double t) {
    if (other == null) return this;
    return FlowSysTokens(
      surfacePrimary: Color.lerp(surfacePrimary, other.surfacePrimary, t)!,
      surfaceSecondary: Color.lerp(surfaceSecondary, other.surfaceSecondary, t)!,
      surfaceTertiary: Color.lerp(surfaceTertiary, other.surfaceTertiary, t)!,
      surfaceSunken: Color.lerp(surfaceSunken, other.surfaceSunken, t)!,
      surfaceInverse: Color.lerp(surfaceInverse, other.surfaceInverse, t)!,
      textPrimary: Color.lerp(textPrimary, other.textPrimary, t)!,
      textSecondary: Color.lerp(textSecondary, other.textSecondary, t)!,
      textTertiary: Color.lerp(textTertiary, other.textTertiary, t)!,
      textInverse: Color.lerp(textInverse, other.textInverse, t)!,
      textAccent: Color.lerp(textAccent, other.textAccent, t)!,
      textDanger: Color.lerp(textDanger, other.textDanger, t)!,
      textSuccess: Color.lerp(textSuccess, other.textSuccess, t)!,
      textWarning: Color.lerp(textWarning, other.textWarning, t)!,
      borderDefault: Color.lerp(borderDefault, other.borderDefault, t)!,
      borderStrong: Color.lerp(borderStrong, other.borderStrong, t)!,
      borderFocus: Color.lerp(borderFocus, other.borderFocus, t)!,
      actionPrimary: Color.lerp(actionPrimary, other.actionPrimary, t)!,
      actionPrimaryHover: Color.lerp(actionPrimaryHover, other.actionPrimaryHover, t)!,
      actionDestructive: Color.lerp(actionDestructive, other.actionDestructive, t)!,
      statusSuccess: Color.lerp(statusSuccess, other.statusSuccess, t)!,
      statusSuccessSubtle: Color.lerp(statusSuccessSubtle, other.statusSuccessSubtle, t)!,
      statusWarning: Color.lerp(statusWarning, other.statusWarning, t)!,
      statusWarningSubtle: Color.lerp(statusWarningSubtle, other.statusWarningSubtle, t)!,
      statusError: Color.lerp(statusError, other.statusError, t)!,
      statusErrorSubtle: Color.lerp(statusErrorSubtle, other.statusErrorSubtle, t)!,
      statusInfo: Color.lerp(statusInfo, other.statusInfo, t)!,
      statusInfoSubtle: Color.lerp(statusInfoSubtle, other.statusInfoSubtle, t)!,
      stateHoverOverlay: Color.lerp(stateHoverOverlay, other.stateHoverOverlay, t)!,
      statePressedOverlay: Color.lerp(statePressedOverlay, other.statePressedOverlay, t)!,
      stateSelectedOverlay: Color.lerp(stateSelectedOverlay, other.stateSelectedOverlay, t)!,
      stateDisabledOpacity: lerpDouble(stateDisabledOpacity, other.stateDisabledOpacity, t)!,
      elevation0: t < 0.5 ? elevation0 : other.elevation0,
      elevation1: t < 0.5 ? elevation1 : other.elevation1,
      elevation2: t < 0.5 ? elevation2 : other.elevation2,
      elevation3: t < 0.5 ? elevation3 : other.elevation3,
      elevation4: t < 0.5 ? elevation4 : other.elevation4,
    );
  }
}

/// Extension to access FlowSysTokens from BuildContext
extension FlowTokensX on BuildContext {
  FlowSysTokens get flowTokens =>
      Theme.of(this).extension<FlowSysTokens>() ?? FlowSysTokens.light;
}
`;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FILE 3: lib/flow/primitives/flow_surface.dart
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const flowSurfaceDart = `
import 'package:flutter/material.dart';
import '../tokens/sys_tokens.dart';
import '../tokens/ref_tokens.dart';

enum FlowElevation { e0, e1, e2, e3, e4 }
enum FlowSurfaceVariant { primary, secondary, tertiary, sunken, inverse }

/// FlowSurface — the base container primitive.
/// Consumes sys.energy.surface and sys.depth.elevation tokens.
class FlowSurface extends StatelessWidget {
  final FlowElevation elevation;
  final FlowSurfaceVariant variant;
  final double radius;
  final bool border;
  final EdgeInsets padding;
  final Widget child;

  const FlowSurface({
    super.key,
    this.elevation = FlowElevation.e0,
    this.variant = FlowSurfaceVariant.primary,
    this.radius = FlowRefFrame.radius4,
    this.border = true,
    this.padding = const EdgeInsets.all(FlowRefFrame.space6),
    required this.child,
  });

  Color _surfaceColor(FlowSysTokens tokens) {
    switch (variant) {
      case FlowSurfaceVariant.primary: return tokens.surfacePrimary;
      case FlowSurfaceVariant.secondary: return tokens.surfaceSecondary;
      case FlowSurfaceVariant.tertiary: return tokens.surfaceTertiary;
      case FlowSurfaceVariant.sunken: return tokens.surfaceSunken;
      case FlowSurfaceVariant.inverse: return tokens.surfaceInverse;
    }
  }

  List<BoxShadow> _shadow(FlowSysTokens tokens) {
    switch (elevation) {
      case FlowElevation.e0: return tokens.elevation0;
      case FlowElevation.e1: return tokens.elevation1;
      case FlowElevation.e2: return tokens.elevation2;
      case FlowElevation.e3: return tokens.elevation3;
      case FlowElevation.e4: return tokens.elevation4;
    }
  }

  @override
  Widget build(BuildContext context) {
    final tokens = context.flowTokens;
    return Container(
      padding: padding,
      decoration: BoxDecoration(
        color: _surfaceColor(tokens),
        borderRadius: BorderRadius.circular(radius),
        border: border ? Border.all(color: tokens.borderDefault) : null,
        boxShadow: _shadow(tokens),
      ),
      child: child,
    );
  }
}
`;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FILE 4: lib/flow/primitives/flow_text.dart
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const flowTextDart = `
import 'package:flutter/material.dart';
import '../tokens/sys_tokens.dart';
import '../tokens/ref_tokens.dart';

enum FlowTextRole { display, h1, h2, h3, h4, body, bodySm, label, caption, overline }
enum FlowTextColor { primary, secondary, tertiary, inverse, accent, danger, success, warning }

/// FlowText — the typography primitive.
/// Consumes ref.voice tokens for size/weight, sys.energy tokens for color.
class FlowText extends StatelessWidget {
  final String text;
  final FlowTextRole role;
  final FlowTextColor? color;
  final int? maxLines;
  final TextOverflow? overflow;

  const FlowText(
    this.text, {
    super.key,
    this.role = FlowTextRole.body,
    this.color,
    this.maxLines,
    this.overflow,
  });

  TextStyle _style(FlowSysTokens tokens) {
    final baseColor = _resolveColor(tokens);
    switch (role) {
      case FlowTextRole.display:
        return TextStyle(fontSize: FlowRefVoice.size3xl, fontWeight: FlowRefVoice.weightSemibold, letterSpacing: -0.02 * FlowRefVoice.size3xl, color: baseColor);
      case FlowTextRole.h1:
        return TextStyle(fontSize: FlowRefVoice.size3xl, fontWeight: FlowRefVoice.weightSemibold, letterSpacing: -0.02 * FlowRefVoice.size3xl, color: baseColor);
      case FlowTextRole.h2:
        return TextStyle(fontSize: FlowRefVoice.sizeXl, fontWeight: FlowRefVoice.weightSemibold, letterSpacing: -0.01 * FlowRefVoice.sizeXl, color: baseColor);
      case FlowTextRole.h3:
        return TextStyle(fontSize: FlowRefVoice.sizeLg, fontWeight: FlowRefVoice.weightSemibold, color: baseColor);
      case FlowTextRole.h4:
        return TextStyle(fontSize: FlowRefVoice.sizeBase, fontWeight: FlowRefVoice.weightSemibold, color: baseColor);
      case FlowTextRole.body:
        return TextStyle(fontSize: FlowRefVoice.sizeMd, fontWeight: FlowRefVoice.weightRegular, height: 1.7, color: baseColor);
      case FlowTextRole.bodySm:
        return TextStyle(fontSize: FlowRefVoice.sizeBase, fontWeight: FlowRefVoice.weightRegular, height: 1.6, color: baseColor);
      case FlowTextRole.label:
        return TextStyle(fontSize: FlowRefVoice.sizeBase, fontWeight: FlowRefVoice.weightMedium, color: baseColor);
      case FlowTextRole.caption:
        return TextStyle(fontSize: FlowRefVoice.sizeSm, fontWeight: FlowRefVoice.weightMedium, color: baseColor);
      case FlowTextRole.overline:
        return TextStyle(fontSize: FlowRefVoice.sizeXs, fontWeight: FlowRefVoice.weightBold, letterSpacing: 0.08 * FlowRefVoice.sizeXs, color: baseColor);
    }
  }

  Color _resolveColor(FlowSysTokens tokens) {
    final c = color ?? (role == FlowTextRole.body || role == FlowTextRole.bodySm ? FlowTextColor.secondary : FlowTextColor.primary);
    switch (c) {
      case FlowTextColor.primary: return tokens.textPrimary;
      case FlowTextColor.secondary: return tokens.textSecondary;
      case FlowTextColor.tertiary: return tokens.textTertiary;
      case FlowTextColor.inverse: return tokens.textInverse;
      case FlowTextColor.accent: return tokens.textAccent;
      case FlowTextColor.danger: return tokens.textDanger;
      case FlowTextColor.success: return tokens.textSuccess;
      case FlowTextColor.warning: return tokens.textWarning;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Text(
      text,
      style: _style(context.flowTokens),
      maxLines: maxLines,
      overflow: overflow,
    );
  }
}
`;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FILE 5: lib/flow/primitives/flow_stack.dart
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const flowStackDart = `
import 'package:flutter/material.dart';
import '../tokens/ref_tokens.dart';

/// FlowStack — vertical layout primitive. Equivalent to Column with token-driven gap.
class FlowStack extends StatelessWidget {
  final double gap;
  final CrossAxisAlignment align;
  final List<Widget> children;

  const FlowStack({
    super.key,
    this.gap = FlowRefFrame.space3,
    this.align = CrossAxisAlignment.stretch,
    required this.children,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: align,
      mainAxisSize: MainAxisSize.min,
      children: [
        for (int i = 0; i < children.length; i++) ...[
          children[i],
          if (i < children.length - 1) SizedBox(height: gap),
        ],
      ],
    );
  }
}

/// FlowInline — horizontal layout primitive. Equivalent to Row with token-driven gap.
class FlowInline extends StatelessWidget {
  final double gap;
  final CrossAxisAlignment align;
  final MainAxisAlignment justify;
  final bool wrap;
  final List<Widget> children;

  const FlowInline({
    super.key,
    this.gap = FlowRefFrame.space3,
    this.align = CrossAxisAlignment.center,
    this.justify = MainAxisAlignment.start,
    this.wrap = false,
    required this.children,
  });

  @override
  Widget build(BuildContext context) {
    if (wrap) {
      return Wrap(
        spacing: gap,
        runSpacing: gap,
        crossAxisAlignment: WrapCrossAlignment.center,
        children: children,
      );
    }
    return Row(
      crossAxisAlignment: align,
      mainAxisAlignment: justify,
      mainAxisSize: MainAxisSize.min,
      children: [
        for (int i = 0; i < children.length; i++) ...[
          children[i],
          if (i < children.length - 1) SizedBox(width: gap),
        ],
      ],
    );
  }
}
`;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FILE 6: lib/flow/components/flow_button.dart
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const flowButtonDart = `
import 'package:flutter/material.dart';
import '../tokens/sys_tokens.dart';
import '../tokens/ref_tokens.dart';
import '../flow_density.dart';

enum FlowButtonEmphasis { high, medium, low, outline, danger, warning, ghost }
enum FlowButtonSize { sm, md, lg }

/// FlowButton — Layer 3 component.
/// Built from token-driven styles. No hardcoded values.
/// Density-aware: reads FlowDensityProvider for height resolution.
/// V-008 RESOLVED: emphasis prop aligned 1:1 with React (high/medium/low/outline/danger/warning/ghost).
class FlowButton extends StatelessWidget {
  final String label;
  final FlowButtonEmphasis emphasis;
  final FlowButtonSize size;
  final VoidCallback? onPressed;
  final bool loading;
  final bool disabled;
  final bool fullWidth;
  final Widget? leadingIcon;

  const FlowButton({
    super.key,
    required this.label,
    this.emphasis = FlowButtonEmphasis.high,
    this.size = FlowButtonSize.md,
    this.onPressed,
    this.loading = false,
    this.disabled = false,
    this.fullWidth = false,
    this.leadingIcon,
  });

  FlowSize get _flowSize {
    switch (size) {
      case FlowButtonSize.sm: return FlowSize.sm;
      case FlowButtonSize.md: return FlowSize.md;
      case FlowButtonSize.lg: return FlowSize.lg;
    }
  }

  @override
  Widget build(BuildContext context) {
    final tokens = context.flowTokens;
    final density = FlowDensityProvider.of(context);
    final _height = density.controlHeight(_flowSize);
    final _fontSize = density.fontSize(_flowSize);
    final isDisabled = disabled || loading;

    Color bg, fg;
    Border? border;
    switch (emphasis) {
      case FlowButtonEmphasis.high:
        bg = tokens.actionPrimary; fg = tokens.textInverse; break;
      case FlowButtonEmphasis.medium:
        bg = tokens.surfaceTertiary; fg = tokens.textPrimary;
        border = Border.all(color: tokens.borderDefault); break;
      case FlowButtonEmphasis.low:
        bg = Colors.transparent; fg = tokens.textSecondary; break;
      case FlowButtonEmphasis.danger:
        bg = tokens.statusError; fg = tokens.textInverse; break;
      case FlowButtonEmphasis.outline:
        bg = Colors.transparent; fg = tokens.textAccent;
        border = Border.all(color: tokens.borderStrong); break;
      case FlowButtonEmphasis.warning:
        bg = tokens.statusWarning.withOpacity(0.12); fg = tokens.statusWarning; break;
      case FlowButtonEmphasis.ghost:
        bg = Colors.transparent; fg = tokens.textSecondary; break;
    }

    return Opacity(
      opacity: isDisabled ? tokens.stateDisabledOpacity : 1.0,
      child: GestureDetector(
        onTap: isDisabled ? null : onPressed,
        child: AnimatedContainer(
          duration: FlowRefMomentum.durationFast,
          curve: FlowRefMomentum.easingStandard,
          height: _height,
          constraints: fullWidth ? const BoxConstraints(minWidth: double.infinity) : null,
          padding: EdgeInsets.symmetric(horizontal: FlowRefFrame.space4),
          decoration: BoxDecoration(
            color: bg,
            borderRadius: BorderRadius.circular(FlowRefFrame.radius2),
            border: border,
          ),
          child: Row(
            mainAxisSize: fullWidth ? MainAxisSize.max : MainAxisSize.min,
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              if (loading) ...[
                SizedBox(
                  width: _fontSize,
                  height: _fontSize,
                  child: CircularProgressIndicator(
                    strokeWidth: 2,
                    color: fg,
                  ),
                ),
                SizedBox(width: FlowRefFrame.space2),
              ] else if (leadingIcon != null) ...[
                leadingIcon!,
                SizedBox(width: FlowRefFrame.space2),
              ],
              Text(
                label,
                style: TextStyle(
                  fontSize: _fontSize,
                  fontWeight: FlowRefVoice.weightSemibold,
                  color: fg,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
`;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FILE 6.5: lib/flow/flow_density.dart (density + size system)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const flowDensityDart = `
import 'package:flutter/material.dart';
import 'tokens/ref_tokens.dart';

/// Density mode — controls component HEIGHT only.
/// Key principle: compact reduces height, NOT horizontal padding.
/// Ratio: ×1.2 between tiers (matches React data-density).
enum FlowDensity { compact, defaultDensity, comfortable }

/// Size tier — controls component scale (sm/md/lg/xl).
/// Mirrors React data-size attribute cascade.
enum FlowSize { sm, md, lg, xl }

/// InheritedWidget that provides density and size context.
/// Mirrors React's data-density and data-size attribute cascade.
///
/// Usage:
///   FlowDensityProvider(
///     density: FlowDensity.compact,
///     size: FlowSize.md,
///     child: MyForm(),
///   )
///
///   // In components:
///   final density = FlowDensityProvider.of(context);
///   final height = density.controlHeight(FlowSize.md);
class FlowDensityProvider extends InheritedWidget {
  final FlowDensity density;
  final FlowSize size;

  const FlowDensityProvider({
    super.key,
    this.density = FlowDensity.defaultDensity,
    this.size = FlowSize.md,
    required super.child,
  });

  static FlowDensityProvider of(BuildContext context) {
    return context.dependOnInheritedWidgetOfExactType<FlowDensityProvider>()
        ?? const FlowDensityProvider(child: SizedBox.shrink());
  }

  /// Resolve control height based on density × size.
  /// compact: reduces height only (not padding).
  /// comfortable: increases height.
  double controlHeight([FlowSize? overrideSize]) {
    final s = overrideSize ?? size;
    switch (density) {
      case FlowDensity.compact:
        switch (s) {
          case FlowSize.sm: return FlowRefFrame.heightControlSmCompact;
          case FlowSize.md: return FlowRefFrame.heightControlMdCompact;
          case FlowSize.lg: return FlowRefFrame.heightControlLgCompact;
          case FlowSize.xl: return FlowRefFrame.heightControlXlCompact;
        }
      case FlowDensity.defaultDensity:
        switch (s) {
          case FlowSize.sm: return FlowRefFrame.heightControlSm;
          case FlowSize.md: return FlowRefFrame.heightControlMd;
          case FlowSize.lg: return FlowRefFrame.heightControlLg;
          case FlowSize.xl: return FlowRefFrame.heightControlXl;
        }
      case FlowDensity.comfortable:
        switch (s) {
          case FlowSize.sm: return FlowRefFrame.heightControlSmComfortable;
          case FlowSize.md: return FlowRefFrame.heightControlMdComfortable;
          case FlowSize.lg: return FlowRefFrame.heightControlLgComfortable;
          case FlowSize.xl: return FlowRefFrame.heightControlXlComfortable;
        }
    }
  }

  /// Resolve font size for controls based on size tier.
  /// Mirrors the React sys-size-voice-body scale.
  double fontSize([FlowSize? overrideSize]) {
    final s = overrideSize ?? size;
    switch (s) {
      case FlowSize.sm: return FlowRefVoice.sizeBase;  // 14px
      case FlowSize.md: return FlowRefVoice.sizeMd;    // 16px
      case FlowSize.lg: return FlowRefVoice.sizeLg;    // 20px
      case FlowSize.xl: return FlowRefVoice.sizeXl;    // 24px
    }
  }

  /// Resolve label font size for controls.
  double labelFontSize([FlowSize? overrideSize]) {
    final s = overrideSize ?? size;
    switch (s) {
      case FlowSize.sm: return FlowRefVoice.sizeSm;    // 12px
      case FlowSize.md: return FlowRefVoice.sizeBase;  // 14px
      case FlowSize.lg: return FlowRefVoice.sizeMd;    // 16px
      case FlowSize.xl: return FlowRefVoice.sizeLg;    // 20px
    }
  }

  @override
  bool updateShouldNotify(FlowDensityProvider oldWidget) =>
      density != oldWidget.density || size != oldWidget.size;
}

/// Extension for convenient access in BuildContext.
extension FlowDensityX on BuildContext {
  FlowDensityProvider get flowDensity => FlowDensityProvider.of(this);
  double flowControlHeight([FlowSize? size]) => flowDensity.controlHeight(size);
  double flowFontSize([FlowSize? size]) => flowDensity.fontSize(size);
  double flowLabelFontSize([FlowSize? size]) => flowDensity.labelFontSize(size);
}
`;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FILE 7: lib/flow/flow_theme.dart (provider)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const flowThemeDart = `
import 'package:flutter/material.dart';
import 'tokens/ref_tokens.dart';
import 'tokens/sys_tokens.dart';
import 'tokens/comp_tokens.dart';

/// Provides Flow-themed ThemeData for light and dark modes.
/// Usage:
///   MaterialApp(
///     theme: FlowTheme.light,
///     darkTheme: FlowTheme.dark,
///     themeMode: ThemeMode.system,
///   )
class FlowTheme {
  static ThemeData get light => ThemeData(
    brightness: Brightness.light,
    fontFamily: FlowRefVoice.familySans,
    colorScheme: ColorScheme.light(
      primary: FlowRefEnergy.blue500,
      secondary: FlowRefEnergy.blue300,
      surface: FlowRefEnergy.neutral0,
      error: FlowRefEnergy.red500,
    ),
    extensions: [FlowSysTokens.light, FlowCompTokens.light],
  );

  static ThemeData get dark => ThemeData(
    brightness: Brightness.dark,
    fontFamily: FlowRefVoice.familySans,
    colorScheme: ColorScheme.dark(
      primary: FlowRefEnergy.blue200,
      secondary: FlowRefEnergy.blue300,
      surface: FlowRefEnergy.neutral950,
      error: FlowRefEnergy.red100,
    ),
    extensions: [FlowSysTokens.dark, FlowCompTokens.dark],
  );
}
`;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FILE 8: lib/flow/primitives/flow_divider.dart
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const flowDividerDart = `
import 'package:flutter/material.dart';
import '../tokens/ref_tokens.dart';
import '../tokens/sys_tokens.dart';

/// FlowDivider — visual separator primitive.
/// Consumes sys.energy.border tokens for color, ref.frame tokens for spacing.
class FlowDivider extends StatelessWidget {
  final double spacing;
  final bool vertical;
  final double thickness;

  const FlowDivider({
    super.key,
    this.spacing = FlowRefFrame.space10,
    this.vertical = false,
    this.thickness = 1.0,
  });

  @override
  Widget build(BuildContext context) {
    final tokens = context.flowTokens;
    if (vertical) {
      return Container(
        width: thickness,
        margin: EdgeInsets.symmetric(horizontal: spacing),
        color: tokens.borderDefault,
      );
    }
    return Container(
      height: thickness,
      margin: EdgeInsets.symmetric(vertical: spacing),
      color: tokens.borderDefault,
    );
  }
}
`;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FILE 9: lib/flow/primitives/flow_action_surface.dart
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const flowActionSurfaceDart = `
import 'package:flutter/material.dart';
import '../tokens/ref_tokens.dart';
import '../tokens/sys_tokens.dart';

/// FlowActionSurface — interactive surface primitive with StateLayer.
/// Wraps any child with tap handling, hover/press overlays, focus ring,
/// and disabled/loading state management. All visual feedback is token-driven.
class FlowActionSurface extends StatefulWidget {
  final VoidCallback? onPressed;
  final bool disabled;
  final bool loading;
  final bool selected;
  final String? semanticLabel;
  final Widget child;

  const FlowActionSurface({
    super.key,
    this.onPressed,
    this.disabled = false,
    this.loading = false,
    this.selected = false,
    this.semanticLabel,
    required this.child,
  });

  @override
  State<FlowActionSurface> createState() => _FlowActionSurfaceState();
}

class _FlowActionSurfaceState extends State<FlowActionSurface> {
  bool _isHovered = false;
  bool _isPressed = false;

  bool get _isInert => widget.disabled || widget.loading;

  @override
  Widget build(BuildContext context) {
    final tokens = context.flowTokens;

    Color overlay = Colors.transparent;
    if (_isInert) {
      // No overlay when disabled/loading
    } else if (_isPressed) {
      overlay = tokens.statePressedOverlay;
    } else if (_isHovered) {
      overlay = tokens.stateHoverOverlay;
    } else if (widget.selected) {
      overlay = tokens.stateSelectedOverlay;
    }

    return Semantics(
      label: widget.semanticLabel,
      button: true,
      enabled: !_isInert,
      child: MouseRegion(
        cursor: _isInert ? SystemMouseCursors.forbidden : SystemMouseCursors.click,
        onEnter: (_) => setState(() => _isHovered = true),
        onExit: (_) => setState(() => _isHovered = false),
        child: GestureDetector(
          onTapDown: _isInert ? null : (_) => setState(() => _isPressed = true),
          onTapUp: _isInert ? null : (_) {
            setState(() => _isPressed = false);
            widget.onPressed?.call();
          },
          onTapCancel: _isInert ? null : () => setState(() => _isPressed = false),
          child: Opacity(
            opacity: _isInert ? tokens.stateDisabledOpacity : 1.0,
            child: AnimatedContainer(
              duration: FlowRefMomentum.durationFast,
              curve: FlowRefMomentum.easingStandard,
              decoration: BoxDecoration(
                color: overlay,
              ),
              child: widget.child,
            ),
          ),
        ),
      ),
    );
  }
}
`;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FILE 10: lib/flow/components/flow_text_input.dart
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const flowTextInputDart = `
import 'package:flutter/material.dart';
import '../tokens/ref_tokens.dart';
import '../tokens/sys_tokens.dart';

/// FlowTextInput — Layer 3 text input component.
/// Supports label, helper text, error state, success state, and adornments.
/// Built exclusively from Flow tokens.
class FlowTextInput extends StatelessWidget {
  final String? label;
  final String? placeholder;
  final String? helperText;
  final String? errorText;
  final bool success;
  final bool disabled;
  final bool readOnly;
  final bool required;
  final bool obscureText;
  final TextEditingController? controller;
  final ValueChanged<String>? onChanged;
  final TextInputType? keyboardType;
  final Widget? leadingIcon;
  final Widget? trailingIcon;
  final int maxLines;

  const FlowTextInput({
    super.key,
    this.label,
    this.placeholder,
    this.helperText,
    this.errorText,
    this.success = false,
    this.disabled = false,
    this.readOnly = false,
    this.required = false,
    this.obscureText = false,
    this.controller,
    this.onChanged,
    this.keyboardType,
    this.leadingIcon,
    this.trailingIcon,
    this.maxLines = 1,
  });

  @override
  Widget build(BuildContext context) {
    final tokens = context.flowTokens;
    final density = FlowDensityProvider.of(context);
    final hasError = errorText != null && errorText!.isNotEmpty;

    final borderColor = hasError
        ? tokens.statusError
        : success
            ? tokens.statusSuccess
            : tokens.borderDefault;

    final focusBorderColor = hasError
        ? tokens.statusError
        : success
            ? tokens.statusSuccess
            : tokens.borderFocus;

    return Opacity(
      opacity: disabled ? tokens.stateDisabledOpacity : 1.0,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisSize: MainAxisSize.min,
        children: [
          if (label != null) ...[
            Row(
              children: [
                Text(
                  label!,
                  style: TextStyle(
                    fontSize: density.labelFontSize(FlowSize.md),
                    fontWeight: FlowRefVoice.weightSemibold,
                    color: tokens.textPrimary,
                  ),
                ),
                if (required)
                  Text(
                    ' *',
                    style: TextStyle(
                      color: tokens.statusError,
                      fontSize: density.labelFontSize(FlowSize.md),
                    ),
                  ),
              ],
            ),
            SizedBox(height: FlowRefFrame.space1),
          ],
          TextField(
            controller: controller,
            onChanged: disabled ? null : onChanged,
            readOnly: readOnly || disabled,
            obscureText: obscureText,
            keyboardType: keyboardType,
            maxLines: maxLines,
            style: TextStyle(
              fontSize: density.fontSize(FlowSize.md),
              fontWeight: FlowRefVoice.weightRegular,
              color: tokens.textPrimary,
              fontFamily: FlowRefVoice.familySans,
            ),
            decoration: InputDecoration(
              hintText: placeholder,
              hintStyle: TextStyle(
                color: tokens.textTertiary,
                fontSize: density.fontSize(FlowSize.md),
              ),
              prefixIcon: leadingIcon,
              suffixIcon: trailingIcon,
              contentPadding: EdgeInsets.symmetric(
                horizontal: FlowRefFrame.space4,
                vertical: FlowRefFrame.space3,
              ),
              filled: true,
              fillColor: tokens.surfacePrimary,
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(FlowRefFrame.radius2),
                borderSide: BorderSide(color: borderColor),
              ),
              enabledBorder: OutlineInputBorder(
                borderRadius: BorderRadius.circular(FlowRefFrame.radius2),
                borderSide: BorderSide(color: borderColor),
              ),
              focusedBorder: OutlineInputBorder(
                borderRadius: BorderRadius.circular(FlowRefFrame.radius2),
                borderSide: BorderSide(color: focusBorderColor, width: 2),
              ),
              errorBorder: OutlineInputBorder(
                borderRadius: BorderRadius.circular(FlowRefFrame.radius2),
                borderSide: BorderSide(color: tokens.statusError),
              ),
            ),
          ),
          if (hasError || helperText != null) ...[
            SizedBox(height: FlowRefFrame.space1),
            Text(
              hasError ? errorText! : helperText!,
              style: TextStyle(
                fontSize: FlowRefVoice.sizeSm,
                fontWeight: FlowRefVoice.weightMedium,
                color: hasError
                    ? tokens.statusError
                    : success
                        ? tokens.statusSuccess
                        : tokens.textTertiary,
              ),
            ),
          ],
        ],
      ),
    );
  }
}
`;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FILE 11: lib/flow/components/flow_card.dart
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const flowCardDart = `
import 'package:flutter/material.dart';
import '../tokens/ref_tokens.dart';
import '../tokens/sys_tokens.dart';
import '../primitives/flow_action_surface.dart';

enum FlowCardVariant { elevated, outlined, filled }

/// FlowCard — Layer 3 card component.
/// Groups related content with optional interactivity.
/// Consumes elevation, energy, and frame tokens.
class FlowCard extends StatelessWidget {
  final FlowCardVariant variant;
  final bool interactive;
  final bool selected;
  final bool disabled;
  final VoidCallback? onPressed;
  final EdgeInsets padding;
  final Widget child;

  const FlowCard({
    super.key,
    this.variant = FlowCardVariant.elevated,
    this.interactive = false,
    this.selected = false,
    this.disabled = false,
    this.onPressed,
    this.padding = const EdgeInsets.all(FlowRefFrame.space6),
    required this.child,
  });

  @override
  Widget build(BuildContext context) {
    final tokens = context.flowTokens;

    Color bg;
    List<BoxShadow> shadow;
    Border? border;

    switch (variant) {
      case FlowCardVariant.elevated:
        bg = tokens.surfacePrimary;
        shadow = tokens.elevation1;
        border = null;
        break;
      case FlowCardVariant.outlined:
        bg = tokens.surfacePrimary;
        shadow = tokens.elevation0;
        border = Border.all(
          color: selected ? tokens.borderFocus : tokens.borderDefault,
        );
        break;
      case FlowCardVariant.filled:
        bg = tokens.surfaceSecondary;
        shadow = tokens.elevation0;
        border = null;
        break;
    }

    final cardContent = AnimatedContainer(
      duration: FlowRefMomentum.durationFast,
      curve: FlowRefMomentum.easingStandard,
      padding: padding,
      decoration: BoxDecoration(
        color: bg,
        borderRadius: BorderRadius.circular(FlowRefFrame.radius3),
        border: border,
        boxShadow: shadow,
      ),
      child: child,
    );

    if (interactive) {
      return FlowActionSurface(
        onPressed: onPressed,
        disabled: disabled,
        selected: selected,
        semanticLabel: 'Card',
        child: cardContent,
      );
    }

    return Opacity(
      opacity: disabled ? tokens.stateDisabledOpacity : 1.0,
      child: cardContent,
    );
  }
}
`;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FILE 12: lib/flow/components/flow_chip.dart
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const flowChipDart = `
import 'package:flutter/material.dart';
import '../tokens/ref_tokens.dart';
import '../tokens/sys_tokens.dart';

enum FlowChipVariant { base, filter, status, input }
enum FlowChipStatus { neutral, success, warning, error, info }

/// FlowChip — Layer 3 compact selection/filter/status component.
/// 4 variants with 5 status colors.
/// All visual properties consume Flow tokens exclusively.
///
/// CROSS-PLATFORM MAPPING (V-008 sub-item — Chip uses functional taxonomy):
///   Flutter base     ↔ React "default" or "outlined"
///   Flutter filter   ↔ React "tonal" + selected prop
///   Flutter status   ↔ React "success"/"warning"/"danger" (flat visual variants)
///   Flutter input    ↔ React "outlined" + removable prop
/// Note: React uses a flat visual variant enum; Flutter separates functional type
/// from status color. Full alignment deferred to avoid breaking change.
class FlowChip extends StatelessWidget {
  final String label;
  final FlowChipVariant variant;
  final FlowChipStatus status;
  final bool selected;
  final bool disabled;
  final bool removable;
  final VoidCallback? onPressed;
  final VoidCallback? onRemove;
  final Widget? leadingIcon;

  const FlowChip({
    super.key,
    required this.label,
    this.variant = FlowChipVariant.base,
    this.status = FlowChipStatus.neutral,
    this.selected = false,
    this.disabled = false,
    this.removable = false,
    this.onPressed,
    this.onRemove,
    this.leadingIcon,
  });

  Color _statusBg(FlowSysTokens tokens) {
    switch (status) {
      case FlowChipStatus.neutral: return tokens.surfaceTertiary;
      case FlowChipStatus.success: return tokens.statusSuccessSubtle;
      case FlowChipStatus.warning: return tokens.statusWarningSubtle;
      case FlowChipStatus.error: return tokens.statusErrorSubtle;
      case FlowChipStatus.info: return tokens.statusInfoSubtle;
    }
  }

  Color _statusFg(FlowSysTokens tokens) {
    switch (status) {
      case FlowChipStatus.neutral: return tokens.textPrimary;
      case FlowChipStatus.success: return tokens.statusSuccess;
      case FlowChipStatus.warning: return tokens.statusWarning;
      case FlowChipStatus.error: return tokens.statusError;
      case FlowChipStatus.info: return tokens.statusInfo;
    }
  }

  @override
  Widget build(BuildContext context) {
    final tokens = context.flowTokens;
    final density = FlowDensityProvider.of(context);
    final isInteractive = variant == FlowChipVariant.filter ||
                          variant == FlowChipVariant.input;
    final bg = variant == FlowChipVariant.status
        ? _statusBg(tokens)
        : selected ? tokens.stateSelectedOverlay : tokens.surfaceTertiary;
    final fg = variant == FlowChipVariant.status
        ? _statusFg(tokens)
        : selected ? tokens.textAccent : tokens.textPrimary;

    final chipContent = AnimatedContainer(
      duration: FlowRefMomentum.durationFast,
      curve: FlowRefMomentum.easingStandard,
      height: density.controlHeight(FlowSize.sm),
      padding: EdgeInsets.symmetric(horizontal: FlowRefFrame.space3),
      decoration: BoxDecoration(
        color: bg,
        borderRadius: BorderRadius.circular(FlowRefFrame.radiusFull),
        border: selected ? Border.all(color: tokens.borderFocus) : null,
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          if (leadingIcon != null) ...[
            leadingIcon!,
            SizedBox(width: FlowRefFrame.space1),
          ],
          Text(
            label,
            style: TextStyle(
              fontSize: density.labelFontSize(FlowSize.sm),
              fontWeight: FlowRefVoice.weightMedium,
              color: fg,
            ),
          ),
          if (removable) ...[
            SizedBox(width: FlowRefFrame.space1),
            GestureDetector(
              onTap: disabled ? null : onRemove,
              child: Icon(Icons.close, size: 14, color: fg),
            ),
          ],
        ],
      ),
    );

    if (isInteractive && !disabled) {
      return GestureDetector(
        onTap: onPressed,
        child: chipContent,
      );
    }

    return Opacity(
      opacity: disabled ? tokens.stateDisabledOpacity : 1.0,
      child: chipContent,
    );
  }
}
`;

// ━━━━━━━━━━━━━━━━━━━━��━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FILE 13: lib/flow/components/flow_dialog.dart
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const flowDialogDart = `
import 'package:flutter/material.dart';
import '../tokens/ref_tokens.dart';
import '../tokens/sys_tokens.dart';
import 'flow_button.dart';

enum FlowDialogVariant { alert, confirmation, form }

/// FlowDialog — Layer 3 modal dialog component.
/// Supports alert, confirmation, and form variants.
/// Uses Overlay + focus trap + Momentum-driven transitions.
///
/// Usage:
///   showFlowDialog(context: context, builder: (ctx) => FlowDialog(...));
class FlowDialog extends StatelessWidget {
  final FlowDialogVariant variant;
  final String title;
  final String? description;
  final Widget? content;
  final String confirmLabel;
  final String cancelLabel;
  final VoidCallback? onConfirm;
  final VoidCallback? onCancel;
  final bool destructive;

  const FlowDialog({
    super.key,
    this.variant = FlowDialogVariant.alert,
    required this.title,
    this.description,
    this.content,
    this.confirmLabel = 'Confirm',
    this.cancelLabel = 'Cancel',
    this.onConfirm,
    this.onCancel,
    this.destructive = false,
  });

  @override
  Widget build(BuildContext context) {
    final tokens = context.flowTokens;
    final density = FlowDensityProvider.of(context);

    return Dialog(
      backgroundColor: tokens.surfacePrimary,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(FlowRefFrame.radius4),
      ),
      elevation: 0,
      child: Container(
        constraints: const BoxConstraints(maxWidth: 480),
        padding: EdgeInsets.all(FlowRefFrame.space6),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(FlowRefFrame.radius4),
          boxShadow: tokens.elevation3,
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Title
            Text(
              title,
              style: TextStyle(
                fontSize: density.fontSize(FlowSize.lg),
                fontWeight: FlowRefVoice.weightSemibold,
                color: tokens.textPrimary,
              ),
            ),
            if (description != null) ...[
              SizedBox(height: FlowRefFrame.space2),
              Text(
                description!,
                style: TextStyle(
                  fontSize: density.fontSize(FlowSize.md),
                  fontWeight: FlowRefVoice.weightRegular,
                  color: tokens.textSecondary,
                  height: 1.6,
                ),
              ),
            ],
            if (content != null) ...[
              SizedBox(height: FlowRefFrame.space4),
              content!,
            ],
            // Actions
            SizedBox(height: FlowRefFrame.space6),
            Row(
              mainAxisAlignment: MainAxisAlignment.end,
              children: [
                if (variant != FlowDialogVariant.alert) ...[
                  FlowButton(
                    label: cancelLabel,
                    emphasis: FlowButtonEmphasis.low,
                    onPressed: onCancel ?? () => Navigator.of(context).pop(),
                  ),
                  SizedBox(width: FlowRefFrame.space2),
                ],
                FlowButton(
                  label: confirmLabel,
                  emphasis: destructive
                      ? FlowButtonEmphasis.danger
                      : FlowButtonEmphasis.high,
                  onPressed: onConfirm ?? () => Navigator.of(context).pop(true),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}

/// Convenience function to show a FlowDialog with proper transition.
Future<T?> showFlowDialog<T>({
  required BuildContext context,
  required WidgetBuilder builder,
  bool barrierDismissible = true,
}) {
  return showGeneralDialog<T>(
    context: context,
    barrierDismissible: barrierDismissible,
    barrierLabel: 'Dismiss dialog',
    barrierColor: Colors.black.withOpacity(0.45),
    transitionDuration: FlowRefMomentum.durationNormal,
    transitionBuilder: (ctx, anim, secondAnim, child) {
      return FadeTransition(
        opacity: CurvedAnimation(
          parent: anim,
          curve: FlowRefMomentum.easingEnter,
          reverseCurve: FlowRefMomentum.easingExit,
        ),
        child: ScaleTransition(
          scale: Tween<double>(begin: 0.95, end: 1.0).animate(
            CurvedAnimation(
              parent: anim,
              curve: FlowRefMomentum.easingEnter,
            ),
          ),
          child: child,
        ),
      );
    },
    pageBuilder: (ctx, anim, secondAnim) => builder(ctx),
  );
}
`;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FILE 14: lib/flow/primitives/flow_grid.dart
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const flowGridDart = `
import 'package:flutter/material.dart';
import '../tokens/ref_tokens.dart';

/// FlowGrid — grid layout primitive.
/// Uses LayoutBuilder + Wrap to simulate CSS Grid columns with token-driven gap.
/// Consumes ref.frame.space tokens for gap.
class FlowGrid extends StatelessWidget {
  final int columns;
  final double gap;
  final List<Widget> children;

  const FlowGrid({
    super.key,
    this.columns = 2,
    this.gap = FlowRefFrame.space4,
    required this.children,
  });

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final totalGap = gap * (columns - 1);
        final itemWidth = (constraints.maxWidth - totalGap) / columns;
        return Wrap(
          spacing: gap,
          runSpacing: gap,
          children: children.map((child) {
            return SizedBox(
              width: itemWidth,
              child: child,
            );
          }).toList(),
        );
      },
    );
  }
}
`;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FILE 15: lib/flow/tokens/comp_tokens.dart
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const compTokensDart = `
import 'dart:ui';
import 'package:flutter/material.dart';
import 'sys_tokens.dart';
import 'ref_tokens.dart';

/// FLOW comp tokens — component-scoped bindings.
/// Each component declares which sys tokens it consumes.
/// This closes the ref → sys → comp chain in Flutter.
/// Usage: context.flowCompTokens.buttonBgHigh
@immutable
class FlowCompTokens extends ThemeExtension<FlowCompTokens> {
  // ── Button (emphasis model: high/medium/low/outline/danger/warning/ghost — V-008 aligned 1:1 with React) ──
  final Color buttonBgHigh;
  final Color buttonBgMedium;
  final Color buttonBgLow;
  final Color buttonBgOutline;
  final Color buttonBgDanger;
  final Color buttonTextHigh;
  final Color buttonTextMedium;
  final Color buttonTextLow;
  final Color buttonTextOutline;
  final Color buttonTextDanger;
  final Color buttonBorderOutline;
  final double buttonRadius;
  final double buttonPaddingX;
  final double buttonGap;
  final double buttonHeightSm;
  final double buttonHeightMd;
  final double buttonHeightLg;

  // ── TextField ──
  final Color textFieldBg;
  final Color textFieldBorder;
  final Color textFieldBorderFocus;
  final Color textFieldBorderError;
  final Color textFieldBorderSuccess;
  final Color textFieldText;
  final Color textFieldPlaceholder;
  final double textFieldRadius;
  final double textFieldPaddingX;
  final double textFieldPaddingY;
  final double textFieldHeight;

  // ── Card ──
  final Color cardBgElevated;
  final Color cardBgOutlined;
  final Color cardBgFilled;
  final Color cardBorder;
  final double cardRadius;
  final double cardPadding;

  // ── Chip ──
  final Color chipBg;
  final Color chipBgSelected;
  final Color chipText;
  final Color chipTextSelected;
  final double chipRadius;
  final double chipHeight;
  final double chipPaddingX;

  // ── Dialog ──
  final Color dialogBg;
  final double dialogRadius;
  final double dialogPadding;
  final double dialogMaxWidth;
  final List<BoxShadow> dialogElevation;

  // ── Sidebar ──
  final Color sidebarBg;
  final Color sidebarBorder;
  final Color sidebarItemBg;
  final Color sidebarItemBgActive;
  final Color sidebarItemText;
  final Color sidebarItemTextActive;
  final double sidebarWidth;
  final double sidebarWidthCollapsed;

  const FlowCompTokens({
    required this.buttonBgHigh, required this.buttonBgMedium,
    required this.buttonBgLow, required this.buttonBgOutline,
    required this.buttonBgDanger,
    required this.buttonTextHigh, required this.buttonTextMedium,
    required this.buttonTextLow, required this.buttonTextOutline,
    required this.buttonTextDanger, required this.buttonBorderOutline,
    required this.buttonRadius, required this.buttonPaddingX,
    required this.buttonGap, required this.buttonHeightSm,
    required this.buttonHeightMd, required this.buttonHeightLg,
    required this.textFieldBg, required this.textFieldBorder,
    required this.textFieldBorderFocus, required this.textFieldBorderError,
    required this.textFieldBorderSuccess, required this.textFieldText,
    required this.textFieldPlaceholder, required this.textFieldRadius,
    required this.textFieldPaddingX, required this.textFieldPaddingY,
    required this.textFieldHeight,
    required this.cardBgElevated, required this.cardBgOutlined,
    required this.cardBgFilled, required this.cardBorder,
    required this.cardRadius, required this.cardPadding,
    required this.chipBg, required this.chipBgSelected,
    required this.chipText, required this.chipTextSelected,
    required this.chipRadius, required this.chipHeight,
    required this.chipPaddingX,
    required this.dialogBg, required this.dialogRadius,
    required this.dialogPadding, required this.dialogMaxWidth,
    required this.dialogElevation,
    required this.sidebarBg, required this.sidebarBorder,
    required this.sidebarItemBg, required this.sidebarItemBgActive,
    required this.sidebarItemText, required this.sidebarItemTextActive,
    required this.sidebarWidth, required this.sidebarWidthCollapsed,
  });

  /// Factory: derive comp tokens from sys tokens.
  /// This is the key closure: comp tokens alias sys, sys aliases ref.
  static FlowCompTokens fromSys(FlowSysTokens sys) {
    return FlowCompTokens(
      buttonBgHigh: sys.actionPrimary,
      buttonBgMedium: sys.surfaceTertiary,
      buttonBgLow: Colors.transparent,
      buttonBgOutline: Colors.transparent,
      buttonBgDanger: sys.statusError,
      buttonTextHigh: sys.textInverse,
      buttonTextMedium: sys.textPrimary,
      buttonTextLow: sys.textSecondary,
      buttonTextOutline: sys.textAccent,
      buttonTextDanger: sys.textInverse,
      buttonBorderOutline: sys.borderStrong,
      buttonRadius: FlowRefFrame.radius2,
      buttonPaddingX: FlowRefFrame.space4,
      buttonGap: FlowRefFrame.space2,
      buttonHeightSm: FlowRefFrame.heightControlSm,
      buttonHeightMd: FlowRefFrame.heightControlMd,
      buttonHeightLg: FlowRefFrame.heightControlLg,
      textFieldBg: sys.surfacePrimary,
      textFieldBorder: sys.borderDefault,
      textFieldBorderFocus: sys.borderFocus,
      textFieldBorderError: sys.statusError,
      textFieldBorderSuccess: sys.statusSuccess,
      textFieldText: sys.textPrimary,
      textFieldPlaceholder: sys.textTertiary,
      textFieldRadius: FlowRefFrame.radius2,
      textFieldPaddingX: FlowRefFrame.space4,
      textFieldPaddingY: FlowRefFrame.space3,
      textFieldHeight: FlowRefFrame.heightControlMd,
      cardBgElevated: sys.surfacePrimary,
      cardBgOutlined: sys.surfacePrimary,
      cardBgFilled: sys.surfaceSecondary,
      cardBorder: sys.borderDefault,
      cardRadius: FlowRefFrame.radius3,
      cardPadding: FlowRefFrame.space6,
      chipBg: sys.surfaceTertiary,
      chipBgSelected: sys.stateSelectedOverlay,
      chipText: sys.textPrimary,
      chipTextSelected: sys.textAccent,
      chipRadius: FlowRefFrame.radiusFull,
      chipHeight: FlowRefFrame.heightControlSm,
      chipPaddingX: FlowRefFrame.space3,
      dialogBg: sys.surfacePrimary,
      dialogRadius: FlowRefFrame.radius4,
      dialogPadding: FlowRefFrame.space6,
      dialogMaxWidth: 480,
      dialogElevation: sys.elevation3,
      sidebarBg: sys.surfaceSecondary,
      sidebarBorder: sys.borderDefault,
      sidebarItemBg: Colors.transparent,
      sidebarItemBgActive: sys.stateSelectedOverlay,
      sidebarItemText: sys.textSecondary,
      sidebarItemTextActive: sys.textAccent,
      sidebarWidth: FlowRefFrame.sidebarExpanded,
      sidebarWidthCollapsed: FlowRefFrame.sidebarCollapsed,
    );
  }

  static final light = FlowCompTokens.fromSys(FlowSysTokens.light);
  static final dark = FlowCompTokens.fromSys(FlowSysTokens.dark);

  @override
  FlowCompTokens copyWith({
    Color? buttonBgHigh, Color? buttonBgMedium,
    Color? buttonBgLow, Color? buttonBgOutline,
    Color? buttonBgDanger,
    Color? buttonTextHigh, Color? buttonTextMedium,
    Color? buttonTextLow, Color? buttonTextOutline,
    Color? buttonTextDanger, Color? buttonBorderOutline,
    double? buttonRadius, double? buttonPaddingX, double? buttonGap,
    double? buttonHeightSm, double? buttonHeightMd, double? buttonHeightLg,
    Color? textFieldBg, Color? textFieldBorder,
    Color? textFieldBorderFocus, Color? textFieldBorderError,
    Color? textFieldBorderSuccess, Color? textFieldText,
    Color? textFieldPlaceholder, double? textFieldRadius,
    double? textFieldPaddingX, double? textFieldPaddingY, double? textFieldHeight,
    Color? cardBgElevated, Color? cardBgOutlined, Color? cardBgFilled,
    Color? cardBorder, double? cardRadius, double? cardPadding,
    Color? chipBg, Color? chipBgSelected, Color? chipText,
    Color? chipTextSelected, double? chipRadius, double? chipHeight,
    double? chipPaddingX,
    Color? dialogBg, double? dialogRadius, double? dialogPadding,
    double? dialogMaxWidth, List<BoxShadow>? dialogElevation,
    Color? sidebarBg, Color? sidebarBorder,
    Color? sidebarItemBg, Color? sidebarItemBgActive,
    Color? sidebarItemText, Color? sidebarItemTextActive,
    double? sidebarWidth, double? sidebarWidthCollapsed,
  }) {
    return FlowCompTokens(
      buttonBgHigh: buttonBgHigh ?? this.buttonBgHigh,
      buttonBgMedium: buttonBgMedium ?? this.buttonBgMedium,
      buttonBgLow: buttonBgLow ?? this.buttonBgLow,
      buttonBgOutline: buttonBgOutline ?? this.buttonBgOutline,
      buttonBgDanger: buttonBgDanger ?? this.buttonBgDanger,
      buttonTextHigh: buttonTextHigh ?? this.buttonTextHigh,
      buttonTextMedium: buttonTextMedium ?? this.buttonTextMedium,
      buttonTextLow: buttonTextLow ?? this.buttonTextLow,
      buttonTextOutline: buttonTextOutline ?? this.buttonTextOutline,
      buttonTextDanger: buttonTextDanger ?? this.buttonTextDanger,
      buttonBorderOutline: buttonBorderOutline ?? this.buttonBorderOutline,
      buttonRadius: buttonRadius ?? this.buttonRadius,
      buttonPaddingX: buttonPaddingX ?? this.buttonPaddingX,
      buttonGap: buttonGap ?? this.buttonGap,
      buttonHeightSm: buttonHeightSm ?? this.buttonHeightSm,
      buttonHeightMd: buttonHeightMd ?? this.buttonHeightMd,
      buttonHeightLg: buttonHeightLg ?? this.buttonHeightLg,
      textFieldBg: textFieldBg ?? this.textFieldBg,
      textFieldBorder: textFieldBorder ?? this.textFieldBorder,
      textFieldBorderFocus: textFieldBorderFocus ?? this.textFieldBorderFocus,
      textFieldBorderError: textFieldBorderError ?? this.textFieldBorderError,
      textFieldBorderSuccess: textFieldBorderSuccess ?? this.textFieldBorderSuccess,
      textFieldText: textFieldText ?? this.textFieldText,
      textFieldPlaceholder: textFieldPlaceholder ?? this.textFieldPlaceholder,
      textFieldRadius: textFieldRadius ?? this.textFieldRadius,
      textFieldPaddingX: textFieldPaddingX ?? this.textFieldPaddingX,
      textFieldPaddingY: textFieldPaddingY ?? this.textFieldPaddingY,
      textFieldHeight: textFieldHeight ?? this.textFieldHeight,
      cardBgElevated: cardBgElevated ?? this.cardBgElevated,
      cardBgOutlined: cardBgOutlined ?? this.cardBgOutlined,
      cardBgFilled: cardBgFilled ?? this.cardBgFilled,
      cardBorder: cardBorder ?? this.cardBorder,
      cardRadius: cardRadius ?? this.cardRadius,
      cardPadding: cardPadding ?? this.cardPadding,
      chipBg: chipBg ?? this.chipBg,
      chipBgSelected: chipBgSelected ?? this.chipBgSelected,
      chipText: chipText ?? this.chipText,
      chipTextSelected: chipTextSelected ?? this.chipTextSelected,
      chipRadius: chipRadius ?? this.chipRadius,
      chipHeight: chipHeight ?? this.chipHeight,
      chipPaddingX: chipPaddingX ?? this.chipPaddingX,
      dialogBg: dialogBg ?? this.dialogBg,
      dialogRadius: dialogRadius ?? this.dialogRadius,
      dialogPadding: dialogPadding ?? this.dialogPadding,
      dialogMaxWidth: dialogMaxWidth ?? this.dialogMaxWidth,
      dialogElevation: dialogElevation ?? this.dialogElevation,
      sidebarBg: sidebarBg ?? this.sidebarBg,
      sidebarBorder: sidebarBorder ?? this.sidebarBorder,
      sidebarItemBg: sidebarItemBg ?? this.sidebarItemBg,
      sidebarItemBgActive: sidebarItemBgActive ?? this.sidebarItemBgActive,
      sidebarItemText: sidebarItemText ?? this.sidebarItemText,
      sidebarItemTextActive: sidebarItemTextActive ?? this.sidebarItemTextActive,
      sidebarWidth: sidebarWidth ?? this.sidebarWidth,
      sidebarWidthCollapsed: sidebarWidthCollapsed ?? this.sidebarWidthCollapsed,
    );
  }

  @override
  FlowCompTokens lerp(FlowCompTokens? other, double t) {
    if (other == null) return this;
    return FlowCompTokens(
      buttonBgHigh: Color.lerp(buttonBgHigh, other.buttonBgHigh, t)!,
      buttonBgMedium: Color.lerp(buttonBgMedium, other.buttonBgMedium, t)!,
      buttonBgLow: Color.lerp(buttonBgLow, other.buttonBgLow, t)!,
      buttonBgOutline: Color.lerp(buttonBgOutline, other.buttonBgOutline, t)!,
      buttonBgDanger: Color.lerp(buttonBgDanger, other.buttonBgDanger, t)!,
      buttonTextHigh: Color.lerp(buttonTextHigh, other.buttonTextHigh, t)!,
      buttonTextMedium: Color.lerp(buttonTextMedium, other.buttonTextMedium, t)!,
      buttonTextLow: Color.lerp(buttonTextLow, other.buttonTextLow, t)!,
      buttonTextOutline: Color.lerp(buttonTextOutline, other.buttonTextOutline, t)!,
      buttonTextDanger: Color.lerp(buttonTextDanger, other.buttonTextDanger, t)!,
      buttonBorderOutline: Color.lerp(buttonBorderOutline, other.buttonBorderOutline, t)!,
      buttonRadius: lerpDouble(buttonRadius, other.buttonRadius, t)!,
      buttonPaddingX: lerpDouble(buttonPaddingX, other.buttonPaddingX, t)!,
      buttonGap: lerpDouble(buttonGap, other.buttonGap, t)!,
      buttonHeightSm: lerpDouble(buttonHeightSm, other.buttonHeightSm, t)!,
      buttonHeightMd: lerpDouble(buttonHeightMd, other.buttonHeightMd, t)!,
      buttonHeightLg: lerpDouble(buttonHeightLg, other.buttonHeightLg, t)!,
      textFieldBg: Color.lerp(textFieldBg, other.textFieldBg, t)!,
      textFieldBorder: Color.lerp(textFieldBorder, other.textFieldBorder, t)!,
      textFieldBorderFocus: Color.lerp(textFieldBorderFocus, other.textFieldBorderFocus, t)!,
      textFieldBorderError: Color.lerp(textFieldBorderError, other.textFieldBorderError, t)!,
      textFieldBorderSuccess: Color.lerp(textFieldBorderSuccess, other.textFieldBorderSuccess, t)!,
      textFieldText: Color.lerp(textFieldText, other.textFieldText, t)!,
      textFieldPlaceholder: Color.lerp(textFieldPlaceholder, other.textFieldPlaceholder, t)!,
      textFieldRadius: lerpDouble(textFieldRadius, other.textFieldRadius, t)!,
      textFieldPaddingX: lerpDouble(textFieldPaddingX, other.textFieldPaddingX, t)!,
      textFieldPaddingY: lerpDouble(textFieldPaddingY, other.textFieldPaddingY, t)!,
      textFieldHeight: lerpDouble(textFieldHeight, other.textFieldHeight, t)!,
      cardBgElevated: Color.lerp(cardBgElevated, other.cardBgElevated, t)!,
      cardBgOutlined: Color.lerp(cardBgOutlined, other.cardBgOutlined, t)!,
      cardBgFilled: Color.lerp(cardBgFilled, other.cardBgFilled, t)!,
      cardBorder: Color.lerp(cardBorder, other.cardBorder, t)!,
      cardRadius: lerpDouble(cardRadius, other.cardRadius, t)!,
      cardPadding: lerpDouble(cardPadding, other.cardPadding, t)!,
      chipBg: Color.lerp(chipBg, other.chipBg, t)!,
      chipBgSelected: Color.lerp(chipBgSelected, other.chipBgSelected, t)!,
      chipText: Color.lerp(chipText, other.chipText, t)!,
      chipTextSelected: Color.lerp(chipTextSelected, other.chipTextSelected, t)!,
      chipRadius: lerpDouble(chipRadius, other.chipRadius, t)!,
      chipHeight: lerpDouble(chipHeight, other.chipHeight, t)!,
      chipPaddingX: lerpDouble(chipPaddingX, other.chipPaddingX, t)!,
      dialogBg: Color.lerp(dialogBg, other.dialogBg, t)!,
      dialogRadius: lerpDouble(dialogRadius, other.dialogRadius, t)!,
      dialogPadding: lerpDouble(dialogPadding, other.dialogPadding, t)!,
      dialogMaxWidth: lerpDouble(dialogMaxWidth, other.dialogMaxWidth, t)!,
      dialogElevation: t < 0.5 ? dialogElevation : other.dialogElevation,
      sidebarBg: Color.lerp(sidebarBg, other.sidebarBg, t)!,
      sidebarBorder: Color.lerp(sidebarBorder, other.sidebarBorder, t)!,
      sidebarItemBg: Color.lerp(sidebarItemBg, other.sidebarItemBg, t)!,
      sidebarItemBgActive: Color.lerp(sidebarItemBgActive, other.sidebarItemBgActive, t)!,
      sidebarItemText: Color.lerp(sidebarItemText, other.sidebarItemText, t)!,
      sidebarItemTextActive: Color.lerp(sidebarItemTextActive, other.sidebarItemTextActive, t)!,
      sidebarWidth: lerpDouble(sidebarWidth, other.sidebarWidth, t)!,
      sidebarWidthCollapsed: lerpDouble(sidebarWidthCollapsed, other.sidebarWidthCollapsed, t)!,
    );
  }
}

/// Extension to access FlowCompTokens from BuildContext
extension FlowCompTokensX on BuildContext {
  FlowCompTokens get flowCompTokens =>
      Theme.of(this).extension<FlowCompTokens>() ?? FlowCompTokens.light;
}
`;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FILE 16: lib/flow/primitives/flow_overlay.dart
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const flowOverlayDart = `
import 'package:flutter/material.dart';
import '../tokens/ref_tokens.dart';
import '../tokens/sys_tokens.dart';

/// FlowOverlay — modal dimming primitive.
/// Renders a semi-transparent backdrop with blur behind elevated content.
/// Consumes sys.depth.overlay token for color, ref.momentum for animation.
class FlowOverlay extends StatelessWidget {
  final bool visible;
  final VoidCallback? onDismiss;
  final bool dismissible;
  final Widget? child;

  const FlowOverlay({
    super.key,
    required this.visible,
    this.onDismiss,
    this.dismissible = true,
    this.child,
  });

  @override
  Widget build(BuildContext context) {
    if (!visible) return const SizedBox.shrink();

    return GestureDetector(
      onTap: dismissible ? onDismiss : null,
      child: AnimatedOpacity(
        opacity: visible ? 1.0 : 0.0,
        duration: FlowRefMomentum.durationFast,
        curve: FlowRefMomentum.easingEnter,
        child: Container(
          color: Colors.black.withOpacity(0.45),
          child: child,
        ),
      ),
    );
  }
}
`;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FILE 17: lib/flow/primitives/flow_form_field.dart
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const flowFormFieldDart = `
import 'package:flutter/material.dart';
import '../tokens/ref_tokens.dart';
import '../tokens/sys_tokens.dart';

/// FlowFormField — form layout primitive.
/// Wraps any input with label, helper text, error message, and required indicator.
/// Consumes Voice tokens for text styling, Energy tokens for status colors.
/// Mirrors React FormField 1:1.
class FlowFormField extends StatelessWidget {
  final String? label;
  final String? helperText;
  final String? error;
  final bool success;
  final bool required;
  final bool fullWidth;
  final Widget child;

  const FlowFormField({
    super.key,
    this.label,
    this.helperText,
    this.error,
    this.success = false,
    this.required = false,
    this.fullWidth = true,
    required this.child,
  });

  @override
  Widget build(BuildContext context) {
    final tokens = context.flowTokens;
    final hasError = error != null && error!.isNotEmpty;
    final hasMessage = hasError || (helperText != null && helperText!.isNotEmpty);

    final messageColor = hasError
        ? tokens.statusError
        : success
            ? tokens.statusSuccess
            : tokens.textTertiary;

    return SizedBox(
      width: fullWidth ? double.infinity : null,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisSize: MainAxisSize.min,
        children: [
          if (label != null) ...[
            Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                Text(
                  label!,
                  style: TextStyle(
                    fontSize: FlowRefVoice.sizeBase,
                    fontWeight: FlowRefVoice.weightSemibold,
                    color: tokens.textPrimary,
                  ),
                ),
                if (required)
                  Text(
                    ' *',
                    style: TextStyle(
                      color: tokens.statusError,
                      fontSize: FlowRefVoice.sizeBase,
                    ),
                  ),
              ],
            ),
            SizedBox(height: FlowRefFrame.space1),
          ],
          child,
          if (hasMessage) ...[
            SizedBox(height: FlowRefFrame.space1),
            Text(
              hasError ? error! : helperText!,
              style: TextStyle(
                fontSize: FlowRefVoice.sizeSm,
                fontWeight: FlowRefVoice.weightMedium,
                color: messageColor,
              ),
            ),
          ],
        ],
      ),
    );
  }
}
`;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FILE 18: lib/flow/primitives/flow_motion_container.dart
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const flowMotionContainerDart = `
import 'package:flutter/material.dart';
import '../tokens/ref_tokens.dart';

/// FlowMotionContainer — enter/exit animation primitive.
/// Wraps content with fade + size animation driven by Momentum tokens.
/// Respects MediaQuery.disableAnimations for reduced motion.
/// Mirrors React MotionContainer 1:1.
class FlowMotionContainer extends StatefulWidget {
  final bool visible;
  final Widget child;
  final Duration duration;
  final Curve enterCurve;
  final Curve exitCurve;

  const FlowMotionContainer({
    super.key,
    required this.visible,
    required this.child,
    this.duration = FlowRefMomentum.durationSlow,
    this.enterCurve = FlowRefMomentum.easingEnter,
    this.exitCurve = FlowRefMomentum.easingExit,
  });

  @override
  State<FlowMotionContainer> createState() => _FlowMotionContainerState();
}

class _FlowMotionContainerState extends State<FlowMotionContainer>
    with SingleTickerProviderStateMixin {
  late final AnimationController _controller;
  late final Animation<double> _fadeAnimation;
  late final Animation<double> _sizeAnimation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: widget.duration,
      value: widget.visible ? 1.0 : 0.0,
    );
    _fadeAnimation = CurvedAnimation(
      parent: _controller,
      curve: widget.enterCurve,
      reverseCurve: widget.exitCurve,
    );
    _sizeAnimation = CurvedAnimation(
      parent: _controller,
      curve: widget.enterCurve,
      reverseCurve: widget.exitCurve,
    );
  }

  @override
  void didUpdateWidget(FlowMotionContainer oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.visible != oldWidget.visible) {
      widget.visible ? _controller.forward() : _controller.reverse();
    }
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final reduceMotion = MediaQuery.of(context).disableAnimations;
    if (reduceMotion) {
      return widget.visible ? widget.child : const SizedBox.shrink();
    }
    return SizeTransition(
      sizeFactor: _sizeAnimation,
      axisAlignment: -1.0,
      child: FadeTransition(
        opacity: _fadeAnimation,
        child: widget.child,
      ),
    );
  }
}
`;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FILE 19: lib/flow/primitives/flow_growth_observer.dart
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const flowGrowthObserverDart = `
import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';

/// FlowGrowthObserver — instrumentation primitive.
/// Emits structured analytics events when the widget becomes visible
/// in the viewport (impression tracking). Mirrors React GrowthObserver 1:1.
///
/// In production, connect via FlowAnalytics.track().
/// In debug mode, prints to console via assert().
class FlowGrowthObserver extends StatefulWidget {
  final String event;
  final Map<String, dynamic>? properties;
  final VoidCallback? onVisible;
  final double visibilityThreshold;
  final Widget child;

  const FlowGrowthObserver({
    super.key,
    required this.event,
    this.properties,
    this.onVisible,
    this.visibilityThreshold = 0.5,
    required this.child,
  });

  @override
  State<FlowGrowthObserver> createState() => _FlowGrowthObserverState();
}

class _FlowGrowthObserverState extends State<FlowGrowthObserver> {
  final _key = GlobalKey();
  bool _emitted = false;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) => _checkVisibility());
  }

  void _checkVisibility() {
    if (_emitted) return;
    final renderObject = _key.currentContext?.findRenderObject();
    if (renderObject == null || renderObject is! RenderBox) return;
    if (!renderObject.attached) return;

    final viewport = RenderAbstractViewport.of(renderObject);
    if (viewport == null) return;

    final revealedOffset = viewport.getOffsetToReveal(renderObject, 0.5);
    final viewportBox = viewport as RenderBox;

    final isVisible = revealedOffset.offset >= 0 &&
        revealedOffset.offset <= viewportBox.size.height;

    if (isVisible) {
      _emitted = true;
      widget.onVisible?.call();
      assert(() {
        debugPrint('[Flow.Growth] \${widget.event} \${widget.properties}');
        return true;
      }());
    }
  }

  @override
  Widget build(BuildContext context) {
    return NotificationListener<ScrollNotification>(
      onNotification: (_) {
        _checkVisibility();
        return false;
      },
      child: KeyedSubtree(
        key: _key,
        child: widget.child,
      ),
    );
  }
}
`;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FILE 20: lib/flow/primitives/flow_icon.dart
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const flowIconDart = `
import 'package:flutter/material.dart';
import '../tokens/ref_tokens.dart';
import '../tokens/sys_tokens.dart';

/// Icon size tokens — mirrors React FlowIcon sizes.
enum FlowIconSize { xs, sm, md, lg, xl }

/// FlowIcon — iconography primitive.
/// Renders named icons from the Flow icon registry at token-defined sizes.
/// Consumes ref.icon.size tokens for dimensions.
/// Mirrors React FlowIcon 1:1.
///
/// Usage:
///   FlowIcon(icon: Icons.search, size: FlowIconSize.md)
///   FlowIcon(icon: FlowIcons.chevronDown, color: tokens.textAccent)
class FlowIcon extends StatelessWidget {
  final IconData icon;
  final FlowIconSize size;
  final Color? color;

  const FlowIcon({
    super.key,
    required this.icon,
    this.size = FlowIconSize.md,
    this.color,
  });

  double get _dimension {
    switch (size) {
      case FlowIconSize.xs: return 12.0;  // ref.icon.size.xs
      case FlowIconSize.sm: return 16.0;  // ref.icon.size.sm
      case FlowIconSize.md: return 20.0;  // ref.icon.size.md
      case FlowIconSize.lg: return 24.0;  // ref.icon.size.lg
      case FlowIconSize.xl: return 32.0;  // ref.icon.size.xl
    }
  }

  @override
  Widget build(BuildContext context) {
    final tokens = context.flowTokens;
    return Icon(
      icon,
      size: _dimension,
      color: color ?? tokens.textPrimary,
    );
  }
}

/// Named icon registry — semantic names mapping to platform IconData.
/// In production, replace with custom icon font or SVG package.
class FlowIcons {
  FlowIcons._();
  // Navigation
  static const chevronDown = Icons.keyboard_arrow_down;
  static const chevronRight = Icons.chevron_right;
  static const chevronLeft = Icons.chevron_left;
  static const arrowLeft = Icons.arrow_back;
  static const menu = Icons.menu;
  static const close = Icons.close;
  // Action
  static const add = Icons.add;
  static const edit = Icons.edit_outlined;
  static const delete = Icons.delete_outline;
  static const search = Icons.search;
  static const filter = Icons.filter_list;
  static const copy = Icons.content_copy;
  static const share = Icons.share;
  // Status
  static const checkCircle = Icons.check_circle_outline;
  static const warning = Icons.warning_amber;
  static const error = Icons.error_outline;
  static const info = Icons.info_outline;
  static const spinner = Icons.autorenew;
  // Object
  static const settings = Icons.settings_outlined;
  static const user = Icons.person_outline;
  static const home = Icons.home_outlined;
  static const document = Icons.description_outlined;
  // Toggle
  static const sun = Icons.light_mode_outlined;
  static const moon = Icons.dark_mode_outlined;
}
`;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FILE 21: lib/flow/primitives/flow_theme_toggle.dart
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const flowThemeToggleDart = `
import 'package:flutter/material.dart';
import '../tokens/ref_tokens.dart';
import '../tokens/sys_tokens.dart';
import 'flow_icon.dart';

/// FlowThemeToggle — utility widget for switching light/dark themes.
/// Mirrors React ThemeToggle 1:1.
///
/// Usage:
///   FlowThemeToggle(
///     isDark: themeMode == ThemeMode.dark,
///     onToggle: () => setState(() { ... }),
///   )
class FlowThemeToggle extends StatelessWidget {
  final bool isDark;
  final VoidCallback onToggle;

  const FlowThemeToggle({
    super.key,
    required this.isDark,
    required this.onToggle,
  });

  @override
  Widget build(BuildContext context) {
    final tokens = context.flowTokens;
    final density = FlowDensityProvider.of(context);
    final _ctrlSm = density.controlHeight(FlowSize.sm);
    return Semantics(
      label: 'Switch to \${isDark ? "light" : "dark"} theme',
      button: true,
      child: GestureDetector(
        onTap: onToggle,
        child: AnimatedContainer(
          duration: FlowRefMomentum.durationFast,
          curve: FlowRefMomentum.easingStandard,
          width: _ctrlSm,
          height: _ctrlSm,
          alignment: Alignment.center,
          decoration: BoxDecoration(
            color: tokens.surfaceTertiary,
            borderRadius: BorderRadius.circular(FlowRefFrame.radius2),
            border: Border.all(color: tokens.borderDefault),
          ),
          child: FlowIcon(
            icon: isDark ? FlowIcons.sun : FlowIcons.moon,
            size: FlowIconSize.sm,
            color: tokens.textSecondary,
          ),
        ),
      ),
    );
  }
}
`;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FILE 22: lib/flow/primitives/flow_layout_grid.dart
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const flowLayoutGridDart = `
import 'package:flutter/material.dart';
import '../tokens/ref_tokens.dart';

/// Density mode for [FlowLayoutGrid].
/// Controls gutter and margin spacing via sys.frame.grid density overrides.
enum FlowGridDensity { compact, defaultDensity, comfortable }

/// Grid tier specification — columns, gutter, margin for a viewport range.
class _GridTierSpec {
  final int columns;
  final double gutter;
  final double margin;
  const _GridTierSpec({required this.columns, required this.gutter, required this.margin});
}

/// FlowLayoutGrid — Responsive Column System (L4 Pattern).
///
/// Mirrors the React LayoutGrid 1:1. Implements the Edenred grid spec:
///   Desktop (>= 992px): 12 columns, 24px gutter, 48px margin, max 1440px
///   Tablet  (>= 576px):  6 columns, 24px gutter, 24px margin
///   Mobile  (<  576px):   1 column,   0px gutter, 16px margin
///
/// Token chain: ref.frame.grid → sys.frame.grid → comp.layoutGrid
/// Density modes adjust gutter/margin without changing column counts.
///
/// Usage:
///   FlowLayoutGrid(
///     children: [
///       FlowLayoutGridItem(span: 6, child: leftContent),
///       FlowLayoutGridItem(span: 6, child: rightContent),
///     ],
///   )
class FlowLayoutGrid extends StatelessWidget {
  final FlowGridDensity density;
  final bool fullBleed;
  final List<Widget> children;

  const FlowLayoutGrid({
    super.key,
    this.density = FlowGridDensity.defaultDensity,
    this.fullBleed = false,
    required this.children,
  });

  /// Resolve grid tier spec based on viewport width and density.
  _GridTierSpec _resolveTier(double width) {
    if (width >= FlowRefFrame.breakpointMd) {
      // Desktop tier
      switch (density) {
        case FlowGridDensity.compact:
          return _GridTierSpec(
            columns: FlowRefFrame.gridLgColumns,
            gutter: FlowRefFrame.gridCompactGutterLg,
            margin: fullBleed ? 0 : FlowRefFrame.gridCompactMarginLg,
          );
        case FlowGridDensity.comfortable:
          return _GridTierSpec(
            columns: FlowRefFrame.gridLgColumns,
            gutter: FlowRefFrame.gridComfortableGutterLg,
            margin: fullBleed ? 0 : FlowRefFrame.gridComfortableMarginLg,
          );
        case FlowGridDensity.defaultDensity:
          return _GridTierSpec(
            columns: FlowRefFrame.gridLgColumns,
            gutter: FlowRefFrame.gridLgGutter,
            margin: fullBleed ? 0 : FlowRefFrame.gridLgMargin,
          );
      }
    } else if (width >= FlowRefFrame.breakpointSm) {
      // Tablet tier
      switch (density) {
        case FlowGridDensity.compact:
          return _GridTierSpec(
            columns: FlowRefFrame.gridMdColumns,
            gutter: FlowRefFrame.gridCompactGutterMd,
            margin: fullBleed ? 0 : FlowRefFrame.gridCompactMarginMd,
          );
        case FlowGridDensity.comfortable:
          return _GridTierSpec(
            columns: FlowRefFrame.gridMdColumns,
            gutter: FlowRefFrame.gridComfortableGutterMd,
            margin: fullBleed ? 0 : FlowRefFrame.gridComfortableMarginMd,
          );
        case FlowGridDensity.defaultDensity:
          return _GridTierSpec(
            columns: FlowRefFrame.gridMdColumns,
            gutter: FlowRefFrame.gridMdGutter,
            margin: fullBleed ? 0 : FlowRefFrame.gridMdMargin,
          );
      }
    } else {
      // Mobile tier — always 1 column, gutter = 0
      final m = density == FlowGridDensity.compact
          ? FlowRefFrame.gridCompactMarginSm
          : density == FlowGridDensity.comfortable
              ? FlowRefFrame.gridComfortableMarginSm
              : FlowRefFrame.gridSmMargin;
      return _GridTierSpec(
        columns: FlowRefFrame.gridSmColumns,
        gutter: FlowRefFrame.gridSmGutter,
        margin: fullBleed ? 0 : m,
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final tier = _resolveTier(constraints.maxWidth);
        final maxWidth = fullBleed ? double.infinity : FlowRefFrame.gridLgMaxWidth;
        final effectiveWidth = constraints.maxWidth.clamp(0.0, maxWidth);

        // Calculate column width: (available - margins - gutters) / columns
        final availableForColumns = effectiveWidth - (tier.margin * 2) - (tier.gutter * (tier.columns - 1).clamp(0, 999));
        final columnWidth = tier.columns > 0 ? availableForColumns / tier.columns : availableForColumns;

        return Center(
          child: ConstrainedBox(
            constraints: BoxConstraints(maxWidth: maxWidth),
            child: Padding(
              padding: EdgeInsets.symmetric(horizontal: tier.margin),
              child: Wrap(
                spacing: tier.gutter,
                runSpacing: tier.gutter,
                children: children.map((child) {
                  if (child is FlowLayoutGridItem) {
                    final span = child.span == -1
                        ? tier.columns // "full" span
                        : child.span.clamp(1, tier.columns);
                    final itemWidth = (columnWidth * span) + (tier.gutter * (span - 1).clamp(0, 999));
                    return SizedBox(
                      width: tier.columns == 1 ? double.infinity : itemWidth,
                      child: child,
                    );
                  }
                  return child;
                }).toList(),
              ),
            ),
          ),
        );
      },
    );
  }
}

/// FlowLayoutGridItem — child of [FlowLayoutGrid].
///
/// [span] determines how many columns this item occupies (1-12).
/// Use span = -1 for "full" (spans all columns, equivalent to 1 / -1 in CSS).
class FlowLayoutGridItem extends StatelessWidget {
  final int span;
  final Widget child;

  const FlowLayoutGridItem({
    super.key,
    this.span = 12,
    required this.child,
  });

  @override
  Widget build(BuildContext context) => child;
}
`;

/**
 * Complete Flutter file manifest:
 * 
 * lib/flow/
 * ├── tokens/
 * │   ├── ref_tokens.dart          ← Raw ref scales
 * │   ├── sys_tokens.dart          ← ThemeExtension with light/dark
 * │   └── comp_tokens.dart         ← Component-scoped ThemeExtension (closes ref→sys→comp)
 * ├── primitives/
 * │   ├── flow_surface.dart        ← Container primitive
 * │   ├── flow_text.dart           ← Typography primitive
 * │   ├── flow_stack.dart          ← Stack + Inline layout primitives
 * │   ├── flow_grid.dart           ← Grid layout primitive
 * │   ├── flow_divider.dart        ← Divider primitive
 * │   ├── flow_action_surface.dart ← Interactive surface with StateLayer
 * │   ├── flow_overlay.dart        ← Modal dimming primitive
 * │   ├── flow_form_field.dart     ← Form layout primitive
 * │   ├── flow_motion_container.dart ← Enter/exit animation primitive
 * │   ├── flow_growth_observer.dart  ← Instrumentation primitive
 * │   ├── flow_icon.dart           ← Iconography primitive + FlowIcons registry
 * │   ├── flow_theme_toggle.dart   ← Theme switching utility widget
 * │   └── flow_layout_grid.dart   ← Responsive 12/6/1 column grid (density-aware)
 * ├── components/
 * │   ├── flow_button.dart         ← Button component (5 variants, 3 sizes)
 * │   ├── flow_text_input.dart     ← TextInput component (floating label, error, success, clearable)
 * │   ├── flow_card.dart           ← Card component (3 variants, interactive)
 * │   ├── flow_chip.dart           ← Chip component (4 variants, 5 statuses)
 * │   └── flow_dialog.dart         ← Dialog component (alert, confirmation, form)
 * └── flow_theme.dart              ← Theme provider (registers sys + comp extensions)
 */
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FILE 23: lib/flow/components/flow_icon_button.dart
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const flowIconButtonDart = `
import 'package:flutter/material.dart';
import '../tokens/ref_tokens.dart';
import '../tokens/sys_tokens.dart';
import '../primitives/flow_action_surface.dart';
import '../primitives/flow_icon.dart';

enum FlowIconButtonEmphasis { high, medium, low, outline, danger, warning, ghost }
enum FlowIconButtonSize { sm, md, lg, xl }

/// FlowIconButton — square icon-only action trigger.
/// Mirrors React FlowIconButton 1:1.
class FlowIconButton extends StatelessWidget {
  final IconData icon;
  final FlowIconButtonEmphasis emphasis;
  final FlowIconButtonSize size;
  final VoidCallback? onPressed;
  final bool disabled;
  final bool loading;
  final bool selected;
  final String? tooltip;
  final String semanticLabel;

  const FlowIconButton({
    super.key,
    required this.icon,
    this.emphasis = FlowIconButtonEmphasis.low,
    this.size = FlowIconButtonSize.md,
    this.onPressed,
    this.disabled = false,
    this.loading = false,
    this.selected = false,
    this.tooltip,
    required this.semanticLabel,
  });

  FlowSize get _flowSize {
    switch (size) {
      case FlowIconButtonSize.sm: return FlowSize.sm;
      case FlowIconButtonSize.md: return FlowSize.md;
      case FlowIconButtonSize.lg: return FlowSize.lg;
      case FlowIconButtonSize.xl: return FlowSize.xl;
    }
  }

  FlowIconSize get _iconSize {
    switch (size) {
      case FlowIconButtonSize.sm: return FlowIconSize.sm;
      case FlowIconButtonSize.md: return FlowIconSize.md;
      case FlowIconButtonSize.lg: return FlowIconSize.lg;
      case FlowIconButtonSize.xl: return FlowIconSize.xl;
    }
  }

  @override
  Widget build(BuildContext context) {
    final tokens = context.flowTokens;
    final density = FlowDensityProvider.of(context);
    final _dimension = density.controlHeight(_flowSize);
    final isDisabled = disabled || loading;

    Color bg, fg;
    switch (emphasis) {
      case FlowIconButtonEmphasis.high:
        bg = tokens.actionPrimary; fg = tokens.textInverse; break;
      case FlowIconButtonEmphasis.medium:
        bg = tokens.surfaceTertiary; fg = tokens.textPrimary; break;
      case FlowIconButtonEmphasis.low:
        bg = Colors.transparent; fg = tokens.textSecondary; break;
      case FlowIconButtonEmphasis.danger:
        bg = tokens.statusError; fg = tokens.textInverse; break;
      case FlowIconButtonEmphasis.outline:
        bg = Colors.transparent; fg = tokens.textAccent; break;
      case FlowIconButtonEmphasis.warning:
        bg = tokens.statusWarning.withOpacity(0.12); fg = tokens.statusWarning; break;
      case FlowIconButtonEmphasis.ghost:
        bg = Colors.transparent; fg = tokens.textSecondary; break;
    }

    if (selected) {
      bg = tokens.stateSelectedOverlay;
      fg = tokens.textAccent;
    }

    final child = Container(
      width: _dimension,
      height: _dimension,
      alignment: Alignment.center,
      decoration: BoxDecoration(
        color: bg,
        borderRadius: BorderRadius.circular(FlowRefFrame.radius2),
      ),
      child: loading
          ? SizedBox(width: 16, height: 16, child: CircularProgressIndicator(strokeWidth: 2, color: fg))
          : FlowIcon(icon: icon, size: _iconSize, color: fg),
    );

    return FlowActionSurface(
      onPressed: onPressed,
      disabled: isDisabled,
      selected: selected,
      semanticLabel: semanticLabel,
      child: child,
    );
  }
}
`;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FILE 24: lib/flow/components/flow_text_area.dart
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const flowTextAreaDart = `
import 'package:flutter/material.dart';
import '../tokens/ref_tokens.dart';
import '../tokens/sys_tokens.dart';
import '../primitives/flow_form_field.dart';

/// FlowTextArea — multi-line text input.
/// Mirrors React FlowTextArea 1:1.
class FlowTextArea extends StatelessWidget {
  final String? label;
  final String? helperText;
  final String? errorText;
  final bool success;
  final bool disabled;
  final bool readOnly;
  final bool loading;
  final TextEditingController? controller;
  final ValueChanged<String>? onChanged;
  final int maxLines;
  final int? maxLength;
  final String? placeholder;

  const FlowTextArea({
    super.key,
    this.label,
    this.helperText,
    this.errorText,
    this.success = false,
    this.disabled = false,
    this.readOnly = false,
    this.loading = false,
    this.controller,
    this.onChanged,
    this.maxLines = 4,
    this.maxLength,
    this.placeholder,
  });

  @override
  Widget build(BuildContext context) {
    final tokens = context.flowTokens;
    final density = FlowDensityProvider.of(context);
    final hasError = errorText != null && errorText!.isNotEmpty;
    final borderColor = hasError ? tokens.statusError
        : success ? tokens.statusSuccess : tokens.borderDefault;

    return FlowFormField(
      label: label,
      helperText: hasError ? errorText : helperText,
      error: hasError ? errorText : null,
      success: success,
      child: Opacity(
        opacity: disabled ? tokens.stateDisabledOpacity : 1.0,
        child: Stack(
          alignment: Alignment.topRight,
          children: [
            TextField(
              controller: controller,
              onChanged: disabled ? null : onChanged,
              readOnly: readOnly || disabled,
              maxLines: maxLines,
              maxLength: maxLength,
              style: TextStyle(
                fontSize: density.fontSize(FlowSize.md),
                color: tokens.textPrimary,
                fontFamily: FlowRefVoice.familySans,
              ),
              decoration: InputDecoration(
                hintText: placeholder,
                hintStyle: TextStyle(color: tokens.textTertiary),
                contentPadding: EdgeInsets.all(FlowRefFrame.space4),
                filled: true,
                fillColor: tokens.surfacePrimary,
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(FlowRefFrame.radius2),
                  borderSide: BorderSide(color: borderColor),
                ),
                enabledBorder: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(FlowRefFrame.radius2),
                  borderSide: BorderSide(color: borderColor),
                ),
                focusedBorder: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(FlowRefFrame.radius2),
                  borderSide: BorderSide(color: hasError ? tokens.statusError : tokens.borderFocus, width: 2),
                ),
              ),
            ),
            if (loading)
              Padding(
                padding: EdgeInsets.all(FlowRefFrame.space3),
                child: SizedBox(width: 16, height: 16, child: CircularProgressIndicator(strokeWidth: 2, color: tokens.textTertiary)),
              ),
          ],
        ),
      ),
    );
  }
}
`;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FILE 25: lib/flow/components/flow_checkbox.dart
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const flowCheckboxDart = `
import 'package:flutter/material.dart';
import '../tokens/ref_tokens.dart';
import '../tokens/sys_tokens.dart';

/// FlowCheckbox — selection control with check/indeterminate states.
/// Mirrors React FlowCheckbox 1:1.
class FlowCheckbox extends StatelessWidget {
  final bool checked;
  final bool indeterminate;
  final ValueChanged<bool>? onChanged;
  final String? label;
  final bool disabled;

  const FlowCheckbox({
    super.key,
    this.checked = false,
    this.indeterminate = false,
    this.onChanged,
    this.label,
    this.disabled = false,
  });

  @override
  Widget build(BuildContext context) {
    final tokens = context.flowTokens;
    final density = FlowDensityProvider.of(context);
    final isActive = checked || indeterminate;

    final control = GestureDetector(
      onTap: disabled ? null : () => onChanged?.call(!checked),
      child: Opacity(
        opacity: disabled ? tokens.stateDisabledOpacity : 1.0,
        child: AnimatedContainer(
          duration: FlowRefMomentum.durationFast,
          width: 20, height: 20,
          decoration: BoxDecoration(
            color: isActive ? tokens.actionPrimary : Colors.transparent,
            borderRadius: BorderRadius.circular(FlowRefFrame.radius1),
            border: Border.all(
              color: isActive ? tokens.actionPrimary : tokens.borderDefault,
              width: isActive ? 0 : 2,
            ),
          ),
          child: isActive
              ? Icon(
                  indeterminate ? Icons.remove : Icons.check,
                  size: 14,
                  color: tokens.textInverse,
                )
              : null,
        ),
      ),
    );

    if (label != null) {
      return GestureDetector(
        onTap: disabled ? null : () => onChanged?.call(!checked),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            control,
            SizedBox(width: FlowRefFrame.space2),
            Text(label!, style: TextStyle(
              fontSize: density.fontSize(FlowSize.md),
              color: disabled ? tokens.textTertiary : tokens.textPrimary,
            )),
          ],
        ),
      );
    }
    return control;
  }
}
`;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FILE 26: lib/flow/components/flow_radio.dart
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const flowRadioDart = `
import 'package:flutter/material.dart';
import '../tokens/ref_tokens.dart';
import '../tokens/sys_tokens.dart';

/// FlowRadio — single selection control.
/// FlowRadioGroup manages exclusive selection.
class FlowRadio extends StatelessWidget {
  final String value;
  final bool checked;
  final ValueChanged<String>? onChanged;
  final String? label;
  final bool disabled;

  const FlowRadio({
    super.key,
    required this.value,
    this.checked = false,
    this.onChanged,
    this.label,
    this.disabled = false,
  });

  @override
  Widget build(BuildContext context) {
    final tokens = context.flowTokens;
    final density = FlowDensityProvider.of(context);

    final control = GestureDetector(
      onTap: disabled ? null : () => onChanged?.call(value),
      child: Opacity(
        opacity: disabled ? tokens.stateDisabledOpacity : 1.0,
        child: AnimatedContainer(
          duration: FlowRefMomentum.durationFast,
          width: 20, height: 20,
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            border: Border.all(
              color: checked ? tokens.actionPrimary : tokens.borderDefault,
              width: 2,
            ),
          ),
          child: checked
              ? Center(child: Container(
                  width: 10, height: 10,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    color: tokens.actionPrimary,
                  ),
                ))
              : null,
        ),
      ),
    );

    if (label != null) {
      return GestureDetector(
        onTap: disabled ? null : () => onChanged?.call(value),
        child: Row(mainAxisSize: MainAxisSize.min, children: [
          control,
          SizedBox(width: FlowRefFrame.space2),
          Text(label!, style: TextStyle(
            fontSize: density.fontSize(FlowSize.md),
            color: disabled ? tokens.textTertiary : tokens.textPrimary,
          )),
        ]),
      );
    }
    return control;
  }
}

class FlowRadioGroup extends StatelessWidget {
  final String? value;
  final ValueChanged<String>? onChanged;
  final Axis direction;
  final List<FlowRadio> children;
  final bool disabled;

  const FlowRadioGroup({
    super.key,
    this.value,
    this.onChanged,
    this.direction = Axis.vertical,
    required this.children,
    this.disabled = false,
  });

  @override
  Widget build(BuildContext context) {
    final items = children.map((child) => FlowRadio(
      value: child.value,
      checked: value == child.value,
      onChanged: disabled ? null : onChanged ?? child.onChanged,
      label: child.label,
      disabled: disabled || child.disabled,
    )).toList();

    if (direction == Axis.horizontal) {
      return Row(mainAxisSize: MainAxisSize.min, children: [
        for (int i = 0; i < items.length; i++) ...[
          items[i],
          if (i < items.length - 1) SizedBox(width: FlowRefFrame.space4),
        ],
      ]);
    }
    return Column(crossAxisAlignment: CrossAxisAlignment.start, mainAxisSize: MainAxisSize.min, children: [
      for (int i = 0; i < items.length; i++) ...[
        items[i],
        if (i < items.length - 1) SizedBox(height: FlowRefFrame.space2),
      ],
    ]);
  }
}
`;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FILE 27: lib/flow/components/flow_switch.dart
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const flowSwitchDart = `
import 'package:flutter/material.dart';
import '../tokens/ref_tokens.dart';
import '../tokens/sys_tokens.dart';

/// FlowSwitch — toggle switch control.
class FlowSwitch extends StatelessWidget {
  final bool checked;
  final ValueChanged<bool>? onChanged;
  final String? label;
  final bool disabled;

  const FlowSwitch({
    super.key,
    this.checked = false,
    this.onChanged,
    this.label,
    this.disabled = false,
  });

  @override
  Widget build(BuildContext context) {
    final tokens = context.flowTokens;
    final density = FlowDensityProvider.of(context);

    final track = GestureDetector(
      onTap: disabled ? null : () => onChanged?.call(!checked),
      child: Opacity(
        opacity: disabled ? tokens.stateDisabledOpacity : 1.0,
        child: AnimatedContainer(
          duration: FlowRefMomentum.durationFast,
          width: 44, height: 24,
          padding: const EdgeInsets.all(2),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(12),
            color: checked ? tokens.actionPrimary : tokens.borderDefault,
          ),
          alignment: checked ? Alignment.centerRight : Alignment.centerLeft,
          child: Container(
            width: 20, height: 20,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              color: tokens.surfacePrimary,
            ),
          ),
        ),
      ),
    );

    if (label != null) {
      return GestureDetector(
        onTap: disabled ? null : () => onChanged?.call(!checked),
        child: Row(mainAxisSize: MainAxisSize.min, children: [
          track,
          SizedBox(width: FlowRefFrame.space2),
          Text(label!, style: TextStyle(
            fontSize: density.fontSize(FlowSize.md),
            color: disabled ? tokens.textTertiary : tokens.textPrimary,
          )),
        ]),
      );
    }
    return track;
  }
}
`;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FILE 28: lib/flow/components/flow_slider.dart
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const flowSliderDart = `
import 'package:flutter/material.dart';
import '../tokens/ref_tokens.dart';
import '../tokens/sys_tokens.dart';

/// FlowSlider — single-value range slider.
class FlowSlider extends StatelessWidget {
  final double value;
  final double min;
  final double max;
  final int? divisions;
  final ValueChanged<double>? onChanged;
  final String? label;
  final bool disabled;
  final String Function(double)? formatValue;

  const FlowSlider({
    super.key,
    required this.value,
    this.min = 0,
    this.max = 100,
    this.divisions,
    this.onChanged,
    this.label,
    this.disabled = false,
    this.formatValue,
  });

  @override
  Widget build(BuildContext context) {
    final tokens = context.flowTokens;
    final density = FlowDensityProvider.of(context);

    return Opacity(
      opacity: disabled ? tokens.stateDisabledOpacity : 1.0,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisSize: MainAxisSize.min,
        children: [
          if (label != null)
            Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
              Text(label!, style: TextStyle(fontSize: density.labelFontSize(FlowSize.md), fontWeight: FlowRefVoice.weightSemibold, color: tokens.textPrimary)),
              Text(formatValue?.call(value) ?? value.toStringAsFixed(0), style: TextStyle(fontSize: density.labelFontSize(FlowSize.md), color: tokens.textSecondary)),
            ]),
          if (label != null) SizedBox(height: FlowRefFrame.space1),
          SliderTheme(
            data: SliderThemeData(
              activeTrackColor: tokens.actionPrimary,
              inactiveTrackColor: tokens.borderDefault,
              thumbColor: tokens.actionPrimary,
              overlayColor: tokens.stateHoverOverlay,
              trackHeight: 4,
            ),
            child: Slider(
              value: value,
              min: min,
              max: max,
              divisions: divisions,
              onChanged: disabled ? null : onChanged,
            ),
          ),
        ],
      ),
    );
  }
}
`;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FILE 29: lib/flow/components/flow_select.dart
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const flowSelectDart = `
import 'package:flutter/material.dart';
import '../tokens/ref_tokens.dart';
import '../tokens/sys_tokens.dart';
import '../primitives/flow_form_field.dart';

/// FlowSelect — dropdown select component.
class FlowSelect<T> extends StatelessWidget {
  final String? label;
  final String? helperText;
  final String? errorText;
  final bool success;
  final bool disabled;
  final bool loading;
  final T? value;
  final List<FlowSelectOption<T>> options;
  final ValueChanged<T?>? onChanged;
  final String? placeholder;

  const FlowSelect({
    super.key,
    this.label,
    this.helperText,
    this.errorText,
    this.success = false,
    this.disabled = false,
    this.loading = false,
    this.value,
    required this.options,
    this.onChanged,
    this.placeholder,
  });

  @override
  Widget build(BuildContext context) {
    final tokens = context.flowTokens;
    final density = FlowDensityProvider.of(context);
    final hasError = errorText != null && errorText!.isNotEmpty;
    final borderColor = hasError ? tokens.statusError : success ? tokens.statusSuccess : tokens.borderDefault;

    return FlowFormField(
      label: label,
      helperText: hasError ? errorText : helperText,
      error: hasError ? errorText : null,
      success: success,
      child: Opacity(
        opacity: disabled ? tokens.stateDisabledOpacity : 1.0,
        child: Container(
          height: density.controlHeight(FlowSize.md),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(FlowRefFrame.radius2),
            border: Border.all(color: borderColor),
            color: tokens.surfacePrimary,
          ),
          padding: EdgeInsets.symmetric(horizontal: FlowRefFrame.space4),
          child: DropdownButtonHideUnderline(
            child: DropdownButton<T>(
              value: value,
              isExpanded: true,
              hint: placeholder != null ? Text(placeholder!, style: TextStyle(color: tokens.textTertiary)) : null,
              icon: loading
                  ? SizedBox(width: 16, height: 16, child: CircularProgressIndicator(strokeWidth: 2, color: tokens.textTertiary))
                  : Icon(Icons.keyboard_arrow_down, color: tokens.textSecondary),
              style: TextStyle(fontSize: density.fontSize(FlowSize.md), color: tokens.textPrimary, fontFamily: FlowRefVoice.familySans),
              dropdownColor: tokens.surfacePrimary,
              onChanged: disabled || loading ? null : onChanged,
              items: options.map((o) => DropdownMenuItem<T>(
                value: o.value,
                enabled: !o.disabled,
                child: Text(o.label, style: TextStyle(color: o.disabled ? tokens.textTertiary : tokens.textPrimary)),
              )).toList(),
            ),
          ),
        ),
      ),
    );
  }
}

class FlowSelectOption<T> {
  final T value;
  final String label;
  final bool disabled;
  const FlowSelectOption({required this.value, required this.label, this.disabled = false});
}
`;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FILE 30: lib/flow/components/flow_tooltip.dart
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const flowTooltipDart = `
import 'package:flutter/material.dart';
import '../tokens/ref_tokens.dart';
import '../tokens/sys_tokens.dart';

/// FlowTooltip — hover/focus informational overlay.
class FlowTooltip extends StatelessWidget {
  final String message;
  final Widget child;
  final Duration delay;

  const FlowTooltip({
    super.key,
    required this.message,
    required this.child,
    this.delay = const Duration(milliseconds: 300),
  });

  @override
  Widget build(BuildContext context) {
    final tokens = context.flowTokens;
    final density = FlowDensityProvider.of(context);
    return Tooltip(
      message: message,
      waitDuration: delay,
      decoration: BoxDecoration(
        color: tokens.textPrimary,
        borderRadius: BorderRadius.circular(FlowRefFrame.radius1),
      ),
      textStyle: TextStyle(
        fontSize: density.labelFontSize(FlowSize.sm),
        color: tokens.textInverse,
        fontFamily: FlowRefVoice.familySans,
      ),
      child: child,
    );
  }
}
`;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FILE 31: lib/flow/components/flow_snackbar.dart
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const flowSnackbarDart = `
import 'package:flutter/material.dart';
import '../tokens/ref_tokens.dart';
import '../tokens/sys_tokens.dart';
import '../primitives/flow_icon.dart';

enum FlowSnackbarVariant { info, success, warning, error }

/// Show a Flow-styled snackbar.
void showFlowSnackbar({
  required BuildContext context,
  required String message,
  FlowSnackbarVariant variant = FlowSnackbarVariant.info,
  String? actionLabel,
  VoidCallback? onAction,
  Duration duration = const Duration(seconds: 4),
}) {
  final tokens = context.flowTokens;
  Color bg, fg;
  IconData icon;
  switch (variant) {
    case FlowSnackbarVariant.info:
      bg = tokens.textPrimary; fg = tokens.textInverse; icon = Icons.info_outline; break;
    case FlowSnackbarVariant.success:
      bg = tokens.statusSuccess; fg = tokens.textInverse; icon = Icons.check_circle_outline; break;
    case FlowSnackbarVariant.warning:
      bg = tokens.statusWarning; fg = tokens.textPrimary; icon = Icons.warning_amber; break;
    case FlowSnackbarVariant.error:
      bg = tokens.statusError; fg = tokens.textInverse; icon = Icons.error_outline; break;
  }

  ScaffoldMessenger.of(context).showSnackBar(SnackBar(
    backgroundColor: bg,
    duration: duration,
    behavior: SnackBarBehavior.floating,
    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(FlowRefFrame.radius2)),
    content: Row(children: [
      Icon(icon, color: fg, size: 20),
      SizedBox(width: FlowRefFrame.space2),
      Expanded(child: Text(message, style: TextStyle(color: fg, fontSize: FlowDensityProvider.of(context).fontSize(FlowSize.md)))),
    ]),
    action: actionLabel != null ? SnackBarAction(
      label: actionLabel,
      textColor: fg,
      onPressed: onAction ?? () {},
    ) : null,
  ));
}
`;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FILE 32: lib/flow/components/flow_progress_bar.dart
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const flowProgressBarDart = `
import 'package:flutter/material.dart';
import '../tokens/ref_tokens.dart';
import '../tokens/sys_tokens.dart';

enum FlowProgressVariant { default_, success, warning, error }

/// FlowProgressBar — determinate/indeterminate linear progress.
class FlowProgressBar extends StatelessWidget {
  final double? value; // null = indeterminate
  final FlowProgressVariant variant;
  final String? label;
  final double height;

  const FlowProgressBar({
    super.key,
    this.value,
    this.variant = FlowProgressVariant.default_,
    this.label,
    this.height = 6,
  });

  @override
  Widget build(BuildContext context) {
    final tokens = context.flowTokens;
    final density = FlowDensityProvider.of(context);
    Color color;
    switch (variant) {
      case FlowProgressVariant.default_: color = tokens.actionPrimary; break;
      case FlowProgressVariant.success: color = tokens.statusSuccess; break;
      case FlowProgressVariant.warning: color = tokens.statusWarning; break;
      case FlowProgressVariant.error: color = tokens.statusError; break;
    }

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: [
        if (label != null) ...[
          Text(label!, style: TextStyle(fontSize: density.labelFontSize(FlowSize.sm), color: tokens.textSecondary)),
          SizedBox(height: FlowRefFrame.space1),
        ],
        ClipRRect(
          borderRadius: BorderRadius.circular(height / 2),
          child: SizedBox(
            height: height,
            child: value != null
                ? LinearProgressIndicator(value: value!, backgroundColor: tokens.borderDefault, color: color)
                : LinearProgressIndicator(backgroundColor: tokens.borderDefault, color: color),
          ),
        ),
      ],
    );
  }
}
`;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FILE 33: lib/flow/components/flow_circular_progress.dart
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const flowCircularProgressDart = `
import 'package:flutter/material.dart';
import '../tokens/ref_tokens.dart';
import '../tokens/sys_tokens.dart';

/// FlowCircularProgress — determinate/indeterminate circular progress.
class FlowCircularProgress extends StatelessWidget {
  final double? value;
  final double size;
  final double strokeWidth;
  final String? label;
  final Color? color;

  const FlowCircularProgress({
    super.key,
    this.value,
    this.size = 40,
    this.strokeWidth = 4,
    this.label,
    this.color,
  });

  @override
  Widget build(BuildContext context) {
    final tokens = context.flowTokens;
    final density = FlowDensityProvider.of(context);
    final c = color ?? tokens.actionPrimary;

    return Column(mainAxisSize: MainAxisSize.min, children: [
      SizedBox(
        width: size, height: size,
        child: CircularProgressIndicator(
          value: value,
          strokeWidth: strokeWidth,
          color: c,
          backgroundColor: tokens.borderDefault,
        ),
      ),
      if (label != null) ...[
        SizedBox(height: FlowRefFrame.space2),
        Text(label!, style: TextStyle(fontSize: density.labelFontSize(FlowSize.sm), color: tokens.textSecondary)),
      ],
    ]);
  }
}
`;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FILE 34: lib/flow/components/flow_skeleton.dart
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const flowSkeletonDart = `
import 'package:flutter/material.dart';
import '../tokens/ref_tokens.dart';
import '../tokens/sys_tokens.dart';

enum FlowSkeletonVariant { text, circle, rect, card }

/// FlowSkeleton — placeholder loading shimmer.
class FlowSkeleton extends StatefulWidget {
  final FlowSkeletonVariant variant;
  final double? width;
  final double? height;
  final double? radius;

  const FlowSkeleton({
    super.key,
    this.variant = FlowSkeletonVariant.text,
    this.width,
    this.height,
    this.radius,
  });

  @override
  State<FlowSkeleton> createState() => _FlowSkeletonState();
}

class _FlowSkeletonState extends State<FlowSkeleton> with SingleTickerProviderStateMixin {
  late AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(vsync: this, duration: const Duration(milliseconds: 1500))..repeat();
  }

  @override
  void dispose() { _controller.dispose(); super.dispose(); }

  @override
  Widget build(BuildContext context) {
    final tokens = context.flowTokens;
    double w, h; BorderRadius br;

    switch (widget.variant) {
      case FlowSkeletonVariant.text:
        w = widget.width ?? double.infinity; h = widget.height ?? 16;
        br = BorderRadius.circular(widget.radius ?? FlowRefFrame.radius1); break;
      case FlowSkeletonVariant.circle:
        w = widget.width ?? 40; h = widget.height ?? 40;
        br = BorderRadius.circular(1000); break;
      case FlowSkeletonVariant.rect:
        w = widget.width ?? double.infinity; h = widget.height ?? 100;
        br = BorderRadius.circular(widget.radius ?? FlowRefFrame.radius2); break;
      case FlowSkeletonVariant.card:
        w = widget.width ?? double.infinity; h = widget.height ?? 120;
        br = BorderRadius.circular(widget.radius ?? FlowRefFrame.radius3); break;
    }

    return AnimatedBuilder(
      animation: _controller,
      builder: (_, __) {
        final t = _controller.value;
        final opacity = 0.3 + 0.3 * (0.5 + 0.5 * (1 - (2 * t - 1).abs()));
        return Container(
          width: w, height: h,
          decoration: BoxDecoration(
            color: tokens.surfaceTertiary.withOpacity(opacity),
            borderRadius: br,
          ),
        );
      },
    );
  }
}
`;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FILE 35: lib/flow/components/flow_empty_state.dart
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const flowEmptyStateDart = `
import 'package:flutter/material.dart';
import '../tokens/ref_tokens.dart';
import '../tokens/sys_tokens.dart';
import '../primitives/flow_icon.dart';
import 'flow_button.dart';

/// FlowEmptyState — placeholder for empty content areas.
class FlowEmptyState extends StatelessWidget {
  final IconData? icon;
  final String title;
  final String? description;
  final String? actionLabel;
  final VoidCallback? onAction;

  const FlowEmptyState({
    super.key,
    this.icon,
    required this.title,
    this.description,
    this.actionLabel,
    this.onAction,
  });

  @override
  Widget build(BuildContext context) {
    final tokens = context.flowTokens;
    final density = FlowDensityProvider.of(context);
    return Center(
      child: Padding(
        padding: EdgeInsets.all(FlowRefFrame.space10),
        child: Column(mainAxisSize: MainAxisSize.min, children: [
          if (icon != null) ...[
            FlowIcon(icon: icon!, size: FlowIconSize.xl, color: tokens.textTertiary),
            SizedBox(height: FlowRefFrame.space4),
          ],
          Text(title, style: TextStyle(
            fontSize: density.fontSize(FlowSize.lg), fontWeight: FlowRefVoice.weightSemibold, color: tokens.textPrimary,
          ), textAlign: TextAlign.center),
          if (description != null) ...[
            SizedBox(height: FlowRefFrame.space2),
            Text(description!, style: TextStyle(
              fontSize: density.fontSize(FlowSize.md), color: tokens.textSecondary, height: 1.5,
            ), textAlign: TextAlign.center),
          ],
          if (actionLabel != null) ...[
            SizedBox(height: FlowRefFrame.space6),
            FlowButton(label: actionLabel!, onPressed: onAction),
          ],
        ]),
      ),
    );
  }
}
`;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FILE 36: lib/flow/components/flow_avatar.dart
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const flowAvatarDart = `
import 'package:flutter/material.dart';
import '../tokens/ref_tokens.dart';
import '../tokens/sys_tokens.dart';
import '../primitives/flow_icon.dart';

enum FlowAvatarSize { sm, md, lg, xl }
enum FlowAvatarStatus { online, offline, busy, away }

/// FlowAvatar — profile image / initials / icon display.
class FlowAvatar extends StatelessWidget {
  final String? imageUrl;
  final String? initials;
  final IconData? icon;
  final FlowAvatarSize size;
  final bool circle;
  final FlowAvatarStatus? status;

  const FlowAvatar({
    super.key,
    this.imageUrl,
    this.initials,
    this.icon,
    this.size = FlowAvatarSize.md,
    this.circle = true,
    this.status,
  });

  double get _dim {
    switch (size) {
      case FlowAvatarSize.sm: return 32;
      case FlowAvatarSize.md: return 40;
      case FlowAvatarSize.lg: return 48;
      case FlowAvatarSize.xl: return 64;
    }
  }

  double get _fontSize {
    switch (size) {
      case FlowAvatarSize.sm: return FlowRefVoice.sizeSm;
      case FlowAvatarSize.md: return FlowRefVoice.sizeMd;
      case FlowAvatarSize.lg: return FlowRefVoice.sizeLg;
      case FlowAvatarSize.xl: return FlowRefVoice.sizeXl;
    }
  }

  @override
  Widget build(BuildContext context) {
    final tokens = context.flowTokens;
    final dimension = _dim;

    Widget content;
    if (imageUrl != null) {
      content = ClipRRect(
        borderRadius: BorderRadius.circular(circle ? dimension : FlowRefFrame.radius2),
        child: Image.network(imageUrl!, width: dimension, height: dimension, fit: BoxFit.cover,
          errorBuilder: (_, __, ___) => _fallback(tokens, dimension)),
      );
    } else {
      content = _fallback(tokens, dimension);
    }

    return Stack(clipBehavior: Clip.none, children: [
      content,
      if (status != null) Positioned(
        right: -2, bottom: -2,
        child: Container(
          width: dimension * 0.3, height: dimension * 0.3,
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            color: _statusColor(tokens),
            border: Border.all(color: tokens.surfacePrimary, width: 2),
          ),
        ),
      ),
    ]);
  }

  Widget _fallback(FlowSysTokens tokens, double dim) {
    return Container(
      width: dim, height: dim,
      alignment: Alignment.center,
      decoration: BoxDecoration(
        color: tokens.surfaceTertiary,
        borderRadius: BorderRadius.circular(circle ? dim : FlowRefFrame.radius2),
        border: Border.all(color: tokens.borderDefault),
      ),
      child: initials != null
          ? Text(initials!, style: TextStyle(fontSize: _fontSize, fontWeight: FlowRefVoice.weightSemibold, color: tokens.textPrimary))
          : FlowIcon(icon: icon ?? Icons.person_outline, size: FlowIconSize.md, color: tokens.textSecondary),
    );
  }

  Color _statusColor(FlowSysTokens tokens) {
    switch (status!) {
      case FlowAvatarStatus.online: return tokens.statusSuccess;
      case FlowAvatarStatus.offline: return tokens.textTertiary;
      case FlowAvatarStatus.busy: return tokens.statusError;
      case FlowAvatarStatus.away: return tokens.statusWarning;
    }
  }
}
`;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FILE 37: lib/flow/components/flow_badge.dart
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const flowBadgeDart = `
import 'package:flutter/material.dart';
import '../tokens/ref_tokens.dart';
import '../tokens/sys_tokens.dart';

enum FlowBadgeVariant { dot, count, label }
enum FlowBadgeColor { default_, accent, success, warning }

/// FlowBadge — notification dot/count overlay.
class FlowBadge extends StatelessWidget {
  final FlowBadgeVariant variant;
  final FlowBadgeColor color;
  final int? count;
  final int max;
  final String? label;
  final Widget? child;

  const FlowBadge({
    super.key,
    this.variant = FlowBadgeVariant.dot,
    this.color = FlowBadgeColor.default_,
    this.count,
    this.max = 99,
    this.label,
    this.child,
  });

  Color _bg(FlowSysTokens tokens) {
    switch (color) {
      case FlowBadgeColor.default_: return tokens.statusError;
      case FlowBadgeColor.accent: return tokens.actionPrimary;
      case FlowBadgeColor.success: return tokens.statusSuccess;
      case FlowBadgeColor.warning: return tokens.statusWarning;
    }
  }

  @override
  Widget build(BuildContext context) {
    final tokens = context.flowTokens;
    final bg = _bg(tokens);

    Widget badge;
    if (variant == FlowBadgeVariant.dot) {
      badge = Container(width: 8, height: 8, decoration: BoxDecoration(shape: BoxShape.circle, color: bg, border: Border.all(color: tokens.surfacePrimary, width: 1.5)));
    } else {
      final text = variant == FlowBadgeVariant.label ? (label ?? '') : (count != null && count! > max ? '\$max+' : '\${count ?? 0}');
      badge = Container(
        height: 18,
        constraints: const BoxConstraints(minWidth: 18),
        padding: EdgeInsets.symmetric(horizontal: FlowRefFrame.space1),
        alignment: Alignment.center,
        decoration: BoxDecoration(borderRadius: BorderRadius.circular(9), color: bg, border: Border.all(color: tokens.surfacePrimary, width: 1.5)),
        child: Text(text, style: TextStyle(fontSize: 11, fontWeight: FlowRefVoice.weightBold, color: tokens.textInverse)),
      );
    }

    if (child == null) return badge;
    return Stack(clipBehavior: Clip.none, children: [
      child!,
      Positioned(top: -4, right: -4, child: badge),
    ]);
  }
}
`;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FILE 38: lib/flow/components/flow_list.dart
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const flowListDart = `
import 'package:flutter/material.dart';
import '../tokens/ref_tokens.dart';
import '../tokens/sys_tokens.dart';
import '../primitives/flow_action_surface.dart';

/// FlowList — container for FlowListItem widgets.
class FlowList extends StatelessWidget {
  final List<Widget> children;
  final bool dividers;

  const FlowList({super.key, required this.children, this.dividers = true});

  @override
  Widget build(BuildContext context) {
    final tokens = context.flowTokens;
    if (!dividers) return Column(mainAxisSize: MainAxisSize.min, children: children);
    return Column(mainAxisSize: MainAxisSize.min, children: [
      for (int i = 0; i < children.length; i++) ...[
        children[i],
        if (dividers && i < children.length - 1)
          Container(height: 1, color: tokens.borderDefault),
      ],
    ]);
  }
}

/// FlowListItem — single list item with leading/trailing slots.
class FlowListItem extends StatelessWidget {
  final String title;
  final String? subtitle;
  final String? description;
  final Widget? leading;
  final Widget? trailing;
  final VoidCallback? onTap;
  final bool selected;
  final bool disabled;

  const FlowListItem({
    super.key,
    required this.title,
    this.subtitle,
    this.description,
    this.leading,
    this.trailing,
    this.onTap,
    this.selected = false,
    this.disabled = false,
  });

  @override
  Widget build(BuildContext context) {
    final tokens = context.flowTokens;
    final density = FlowDensityProvider.of(context);

    final content = Opacity(
      opacity: disabled ? tokens.stateDisabledOpacity : 1.0,
      child: Container(
        padding: EdgeInsets.symmetric(horizontal: FlowRefFrame.space4, vertical: FlowRefFrame.space3),
        color: selected ? tokens.stateSelectedOverlay : null,
        child: Row(children: [
          if (leading != null) ...[leading!, SizedBox(width: FlowRefFrame.space3)],
          Expanded(child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisSize: MainAxisSize.min,
            children: [
              Text(title, style: TextStyle(fontSize: density.fontSize(FlowSize.md), fontWeight: FlowRefVoice.weightMedium, color: tokens.textPrimary)),
              if (subtitle != null) Text(subtitle!, style: TextStyle(fontSize: density.labelFontSize(FlowSize.md), color: tokens.textSecondary)),
              if (description != null) Text(description!, style: TextStyle(fontSize: density.labelFontSize(FlowSize.sm), color: tokens.textTertiary)),
            ],
          )),
          if (trailing != null) ...[SizedBox(width: FlowRefFrame.space3), trailing!],
        ]),
      ),
    );

    if (onTap != null && !disabled) {
      return FlowActionSurface(onPressed: onTap, disabled: disabled, selected: selected, child: content);
    }
    return content;
  }
}
`;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FILE 39: lib/flow/components/flow_tabs.dart
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const flowTabsDart = `
import 'package:flutter/material.dart';
import '../tokens/ref_tokens.dart';
import '../tokens/sys_tokens.dart';

/// FlowTabs — tabbed navigation.
class FlowTabs extends StatelessWidget {
  final int selectedIndex;
  final ValueChanged<int> onChanged;
  final List<FlowTab> tabs;

  const FlowTabs({
    super.key,
    required this.selectedIndex,
    required this.onChanged,
    required this.tabs,
  });

  @override
  Widget build(BuildContext context) {
    final tokens = context.flowTokens;
    final density = FlowDensityProvider.of(context);
    return Container(
      decoration: BoxDecoration(border: Border(bottom: BorderSide(color: tokens.borderDefault))),
      child: Row(children: [
        for (int i = 0; i < tabs.length; i++)
          GestureDetector(
            onTap: tabs[i].disabled ? null : () => onChanged(i),
            child: Opacity(
              opacity: tabs[i].disabled ? tokens.stateDisabledOpacity : 1.0,
              child: Container(
                padding: EdgeInsets.symmetric(horizontal: FlowRefFrame.space4, vertical: FlowRefFrame.space3),
                decoration: BoxDecoration(
                  border: Border(bottom: BorderSide(
                    color: i == selectedIndex ? tokens.actionPrimary : Colors.transparent,
                    width: 2,
                  )),
                ),
                child: Row(mainAxisSize: MainAxisSize.min, children: [
                  if (tabs[i].icon != null) ...[
                    Icon(tabs[i].icon!, size: 16, color: i == selectedIndex ? tokens.textAccent : tokens.textSecondary),
                    SizedBox(width: FlowRefFrame.space1),
                  ],
                  Text(tabs[i].label, style: TextStyle(
                    fontSize: density.fontSize(FlowSize.md),
                    fontWeight: i == selectedIndex ? FlowRefVoice.weightSemibold : FlowRefVoice.weightMedium,
                    color: i == selectedIndex ? tokens.textAccent : tokens.textSecondary,
                  )),
                ]),
              ),
            ),
          ),
      ]),
    );
  }
}

class FlowTab {
  final String label;
  final IconData? icon;
  final bool disabled;
  const FlowTab({required this.label, this.icon, this.disabled = false});
}
`;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FILE 40: lib/flow/components/flow_accordion.dart
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const flowAccordionDart = `
import 'package:flutter/material.dart';
import '../tokens/ref_tokens.dart';
import '../tokens/sys_tokens.dart';

/// FlowAccordion — expandable/collapsible content sections.
class FlowAccordion extends StatefulWidget {
  final List<FlowAccordionItem> items;
  final bool multiple;
  final List<String>? expandedKeys;
  final ValueChanged<List<String>>? onChange;

  const FlowAccordion({
    super.key,
    required this.items,
    this.multiple = false,
    this.expandedKeys,
    this.onChange,
  });

  @override
  State<FlowAccordion> createState() => _FlowAccordionState();
}

class _FlowAccordionState extends State<FlowAccordion> {
  late List<String> _expanded;

  @override
  void initState() {
    super.initState();
    _expanded = widget.expandedKeys ?? [];
  }

  void _toggle(String key) {
    setState(() {
      if (_expanded.contains(key)) {
        _expanded = _expanded.where((k) => k != key).toList();
      } else {
        _expanded = widget.multiple ? [..._expanded, key] : [key];
      }
    });
    widget.onChange?.call(_expanded);
  }

  @override
  Widget build(BuildContext context) {
    final tokens = context.flowTokens;
    final density = FlowDensityProvider.of(context);
    return Column(mainAxisSize: MainAxisSize.min, children: [
      for (final item in widget.items) ...[
        GestureDetector(
          onTap: item.disabled ? null : () => _toggle(item.key),
          child: Opacity(
            opacity: item.disabled ? tokens.stateDisabledOpacity : 1.0,
            child: Container(
              padding: EdgeInsets.symmetric(horizontal: FlowRefFrame.space4, vertical: FlowRefFrame.space3),
              decoration: BoxDecoration(border: Border(bottom: BorderSide(color: tokens.borderDefault))),
              child: Row(children: [
                Expanded(child: Text(item.label, style: TextStyle(
                  fontSize: density.fontSize(FlowSize.md), fontWeight: FlowRefVoice.weightSemibold, color: tokens.textPrimary,
                ))),
                AnimatedRotation(
                  turns: _expanded.contains(item.key) ? 0.5 : 0,
                  duration: FlowRefMomentum.durationFast,
                  child: Icon(Icons.keyboard_arrow_down, color: tokens.textSecondary),
                ),
              ]),
            ),
          ),
        ),
        AnimatedCrossFade(
          firstChild: const SizedBox.shrink(),
          secondChild: Padding(
            padding: EdgeInsets.all(FlowRefFrame.space4),
            child: item.content,
          ),
          crossFadeState: _expanded.contains(item.key) ? CrossFadeState.showSecond : CrossFadeState.showFirst,
          duration: FlowRefMomentum.durationFast,
        ),
      ],
    ]);
  }
}

class FlowAccordionItem {
  final String key;
  final String label;
  final Widget content;
  final bool disabled;
  const FlowAccordionItem({required this.key, required this.label, required this.content, this.disabled = false});
}
`;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━���━━━━━━
// FILE 41: lib/flow/components/flow_segmented_control.dart
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const flowSegmentedControlDart = `
import 'package:flutter/material.dart';
import '../tokens/ref_tokens.dart';
import '../tokens/sys_tokens.dart';

/// FlowSegmentedControl — exclusive option selector.
class FlowSegmentedControl extends StatelessWidget {
  final int selectedIndex;
  final ValueChanged<int> onChanged;
  final List<String> options;
  final bool disabled;
  final bool fullWidth;

  const FlowSegmentedControl({
    super.key,
    required this.selectedIndex,
    required this.onChanged,
    required this.options,
    this.disabled = false,
    this.fullWidth = false,
  });

  @override
  Widget build(BuildContext context) {
    final tokens = context.flowTokens;
    final density = FlowDensityProvider.of(context);

    return Opacity(
      opacity: disabled ? tokens.stateDisabledOpacity : 1.0,
      child: Container(
        height: density.controlHeight(FlowSize.md),
        decoration: BoxDecoration(
          color: tokens.surfaceTertiary,
          borderRadius: BorderRadius.circular(FlowRefFrame.radius2),
        ),
        padding: const EdgeInsets.all(3),
        child: Row(
          mainAxisSize: fullWidth ? MainAxisSize.max : MainAxisSize.min,
          children: [
            for (int i = 0; i < options.length; i++)
              Expanded(
                flex: fullWidth ? 1 : 0,
                child: GestureDetector(
                  onTap: disabled ? null : () => onChanged(i),
                  child: AnimatedContainer(
                    duration: FlowRefMomentum.durationFast,
                    alignment: Alignment.center,
                    padding: EdgeInsets.symmetric(horizontal: FlowRefFrame.space4),
                    decoration: BoxDecoration(
                      color: i == selectedIndex ? tokens.surfacePrimary : Colors.transparent,
                      borderRadius: BorderRadius.circular(FlowRefFrame.radius1),
                      boxShadow: i == selectedIndex ? tokens.elevation1 : null,
                    ),
                    child: Text(options[i], style: TextStyle(
                      fontSize: density.fontSize(FlowSize.md),
                      fontWeight: i == selectedIndex ? FlowRefVoice.weightSemibold : FlowRefVoice.weightMedium,
                      color: i == selectedIndex ? tokens.textPrimary : tokens.textSecondary,
                    )),
                  ),
                ),
              ),
          ],
        ),
      ),
    );
  }
}
`;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FILE 42: lib/flow/components/flow_breadcrumbs.dart
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const flowBreadcrumbsDart = `
import 'package:flutter/material.dart';
import '../tokens/ref_tokens.dart';
import '../tokens/sys_tokens.dart';

/// FlowBreadcrumbs — hierarchical navigation trail.
class FlowBreadcrumbs extends StatelessWidget {
  final List<FlowBreadcrumbItem> items;
  final Widget? separator;

  const FlowBreadcrumbs({super.key, required this.items, this.separator});

  @override
  Widget build(BuildContext context) {
    final tokens = context.flowTokens;
    final density = FlowDensityProvider.of(context);
    final sep = separator ?? Icon(Icons.chevron_right, size: 16, color: tokens.textTertiary);

    return Row(mainAxisSize: MainAxisSize.min, children: [
      for (int i = 0; i < items.length; i++) ...[
        if (i > 0) Padding(padding: EdgeInsets.symmetric(horizontal: FlowRefFrame.space1), child: sep),
        GestureDetector(
          onTap: i < items.length - 1 ? items[i].onTap : null,
          child: Text(items[i].label, style: TextStyle(
            fontSize: density.fontSize(FlowSize.md),
            color: i < items.length - 1 ? tokens.textAccent : tokens.textPrimary,
            fontWeight: i < items.length - 1 ? FlowRefVoice.weightMedium : FlowRefVoice.weightSemibold,
          )),
        ),
      ],
    ]);
  }
}

class FlowBreadcrumbItem {
  final String label;
  final VoidCallback? onTap;
  const FlowBreadcrumbItem({required this.label, this.onTap});
}
`;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FILE 43: lib/flow/components/flow_pagination.dart
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const flowPaginationDart = `
import 'package:flutter/material.dart';
import '../tokens/ref_tokens.dart';
import '../tokens/sys_tokens.dart';

/// FlowPagination — page navigation control.
class FlowPagination extends StatelessWidget {
  final int currentPage;
  final int totalPages;
  final ValueChanged<int> onPageChange;
  final int siblingCount;
  final bool disabled;

  const FlowPagination({
    super.key,
    required this.currentPage,
    required this.totalPages,
    required this.onPageChange,
    this.siblingCount = 1,
    this.disabled = false,
  });

  @override
  Widget build(BuildContext context) {
    final tokens = context.flowTokens;
    final density = FlowDensityProvider.of(context);
    final pages = _getPages();

    return Opacity(
      opacity: disabled ? tokens.stateDisabledOpacity : 1.0,
      child: Row(mainAxisSize: MainAxisSize.min, children: [
        _btn(context, tokens, Icons.chevron_left, currentPage > 1 ? () => onPageChange(currentPage - 1) : null),
        SizedBox(width: FlowRefFrame.space1),
        for (final p in pages) ...[
          if (p == -1)
            Padding(padding: EdgeInsets.symmetric(horizontal: FlowRefFrame.space1), child: Text('...', style: TextStyle(color: tokens.textTertiary)))
          else
            _pageBtn(context, tokens, p),
          SizedBox(width: FlowRefFrame.space1),
        ],
        _btn(context, tokens, Icons.chevron_right, currentPage < totalPages ? () => onPageChange(currentPage + 1) : null),
      ]),
    );
  }

  Widget _btn(BuildContext ctx, FlowSysTokens tokens, IconData icon, VoidCallback? onTap) {
    return GestureDetector(
      onTap: disabled ? null : onTap,
      child: Container(
        width: 36, height: 36, alignment: Alignment.center,
        decoration: BoxDecoration(borderRadius: BorderRadius.circular(FlowRefFrame.radius2), border: Border.all(color: tokens.borderDefault)),
        child: Icon(icon, size: 20, color: onTap != null ? tokens.textPrimary : tokens.textTertiary),
      ),
    );
  }

  Widget _pageBtn(BuildContext ctx, FlowSysTokens tokens, int page) {
    final isActive = page == currentPage;
    return GestureDetector(
      onTap: disabled || isActive ? null : () => onPageChange(page),
      child: Container(
        width: 36, height: 36, alignment: Alignment.center,
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(FlowRefFrame.radius2),
          color: isActive ? tokens.actionPrimary : null,
          border: isActive ? null : Border.all(color: tokens.borderDefault),
        ),
        child: Text('\$page', style: TextStyle(
          fontSize: density.fontSize(FlowSize.md),
          fontWeight: isActive ? FlowRefVoice.weightSemibold : FlowRefVoice.weightMedium,
          color: isActive ? tokens.textInverse : tokens.textPrimary,
        )),
      ),
    );
  }

  List<int> _getPages() {
    if (totalPages <= 7) return List.generate(totalPages, (i) => i + 1);
    final pages = <int>[];
    pages.add(1);
    final start = (currentPage - siblingCount).clamp(2, totalPages - 1);
    final end = (currentPage + siblingCount).clamp(2, totalPages - 1);
    if (start > 2) pages.add(-1);
    for (int i = start; i <= end; i++) pages.add(i);
    if (end < totalPages - 1) pages.add(-1);
    pages.add(totalPages);
    return pages;
  }
}
`;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FILE 44: lib/flow/components/flow_stepper.dart
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const flowStepperDart = `
import 'package:flutter/material.dart';
import '../tokens/ref_tokens.dart';
import '../tokens/sys_tokens.dart';

enum FlowStepStatus { complete, current, upcoming, error }

/// FlowStepper — multi-step wizard navigation.
class FlowStepper extends StatelessWidget {
  final List<FlowStepperStep> steps;
  final int activeStep;
  final ValueChanged<int>? onStepTap;
  final bool vertical;

  const FlowStepper({
    super.key,
    required this.steps,
    required this.activeStep,
    this.onStepTap,
    this.vertical = false,
  });

  FlowStepStatus _status(int i) {
    if (steps[i].error) return FlowStepStatus.error;
    if (i < activeStep) return FlowStepStatus.complete;
    if (i == activeStep) return FlowStepStatus.current;
    return FlowStepStatus.upcoming;
  }

  @override
  Widget build(BuildContext context) {
    final tokens = context.flowTokens;
    final density = FlowDensityProvider.of(context);

    Widget buildStep(int i) {
      final status = _status(i);
      Color bg, fg;
      switch (status) {
        case FlowStepStatus.complete: bg = tokens.actionPrimary; fg = tokens.textInverse; break;
        case FlowStepStatus.current: bg = tokens.actionPrimary; fg = tokens.textInverse; break;
        case FlowStepStatus.upcoming: bg = tokens.surfaceTertiary; fg = tokens.textTertiary; break;
        case FlowStepStatus.error: bg = tokens.statusError; fg = tokens.textInverse; break;
      }

      return GestureDetector(
        onTap: status == FlowStepStatus.complete && onStepTap != null ? () => onStepTap!(i) : null,
        child: Row(mainAxisSize: MainAxisSize.min, children: [
          Container(
            width: 32, height: 32, alignment: Alignment.center,
            decoration: BoxDecoration(shape: BoxShape.circle, color: bg),
            child: status == FlowStepStatus.complete
                ? Icon(Icons.check, size: 16, color: fg)
                : status == FlowStepStatus.error
                    ? Icon(Icons.close, size: 16, color: fg)
                    : Text('\${i + 1}', style: TextStyle(fontSize: density.fontSize(FlowSize.md), fontWeight: FlowRefVoice.weightSemibold, color: fg)),
          ),
          SizedBox(width: FlowRefFrame.space2),
          Column(crossAxisAlignment: CrossAxisAlignment.start, mainAxisSize: MainAxisSize.min, children: [
            Text(steps[i].label, style: TextStyle(
              fontSize: density.fontSize(FlowSize.md),
              fontWeight: status == FlowStepStatus.current ? FlowRefVoice.weightSemibold : FlowRefVoice.weightMedium,
              color: status == FlowStepStatus.upcoming ? tokens.textTertiary : tokens.textPrimary,
            )),
            if (steps[i].description != null)
              Text(steps[i].description!, style: TextStyle(fontSize: density.labelFontSize(FlowSize.sm), color: tokens.textSecondary)),
          ]),
        ]),
      );
    }

    Widget buildConnector(int i) {
      final isComplete = i < activeStep;
      if (vertical) {
        return Container(width: 2, height: 24, margin: EdgeInsets.only(left: 15), color: isComplete ? tokens.actionPrimary : tokens.borderDefault);
      }
      return Expanded(child: Container(height: 2, color: isComplete ? tokens.actionPrimary : tokens.borderDefault, margin: EdgeInsets.symmetric(horizontal: FlowRefFrame.space2)));
    }

    if (vertical) {
      return Column(crossAxisAlignment: CrossAxisAlignment.start, mainAxisSize: MainAxisSize.min, children: [
        for (int i = 0; i < steps.length; i++) ...[
          buildStep(i),
          if (i < steps.length - 1) buildConnector(i),
        ],
      ]);
    }
    return Row(children: [
      for (int i = 0; i < steps.length; i++) ...[
        buildStep(i),
        if (i < steps.length - 1) buildConnector(i),
      ],
    ]);
  }
}

class FlowStepperStep {
  final String label;
  final String? description;
  final bool error;
  const FlowStepperStep({required this.label, this.description, this.error = false});
}
`;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FILE 45: lib/flow/components/flow_bottom_nav.dart
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const flowBottomNavDart = `
import 'package:flutter/material.dart';
import '../tokens/ref_tokens.dart';
import '../tokens/sys_tokens.dart';
import '../primitives/flow_icon.dart';

/// FlowBottomNav — mobile bottom navigation bar.
class FlowBottomNav extends StatelessWidget {
  final int activeIndex;
  final ValueChanged<int> onChanged;
  final List<FlowBottomNavItem> items;
  final bool showLabels;

  const FlowBottomNav({
    super.key,
    required this.activeIndex,
    required this.onChanged,
    required this.items,
    this.showLabels = true,
  });

  @override
  Widget build(BuildContext context) {
    final tokens = context.flowTokens;
    final density = FlowDensityProvider.of(context);
    return Container(
      height: density.controlHeight(FlowSize.xl),
      decoration: BoxDecoration(
        color: tokens.surfacePrimary,
        border: Border(top: BorderSide(color: tokens.borderDefault)),
      ),
      child: Row(children: [
        for (int i = 0; i < items.length; i++)
          Expanded(child: GestureDetector(
            onTap: () => onChanged(i),
            behavior: HitTestBehavior.opaque,
            child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
              FlowIcon(icon: items[i].icon, size: FlowIconSize.md,
                color: i == activeIndex ? tokens.textAccent : tokens.textSecondary),
              if (showLabels) ...[
                SizedBox(height: FlowRefFrame.space1),
                Text(items[i].label, style: TextStyle(
                  fontSize: density.labelFontSize(FlowSize.sm),
                  fontWeight: i == activeIndex ? FlowRefVoice.weightSemibold : FlowRefVoice.weightMedium,
                  color: i == activeIndex ? tokens.textAccent : tokens.textSecondary,
                )),
              ],
            ]),
          )),
      ]),
    );
  }
}

class FlowBottomNavItem {
  final IconData icon;
  final String label;
  final int? badgeCount;
  const FlowBottomNavItem({required this.icon, required this.label, this.badgeCount});
}
`;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FILE 46: lib/flow/components/flow_bottom_sheet.dart
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const flowBottomSheetDart = `
import 'package:flutter/material.dart';
import '../tokens/ref_tokens.dart';
import '../tokens/sys_tokens.dart';

/// Show a Flow-styled bottom sheet.
Future<T?> showFlowBottomSheet<T>({
  required BuildContext context,
  required WidgetBuilder builder,
  bool showHandle = true,
  String? title,
  bool isDismissible = true,
}) {
  return showModalBottomSheet<T>(
    context: context,
    isScrollControlled: true,
    isDismissible: isDismissible,
    backgroundColor: Colors.transparent,
    builder: (ctx) {
      final tokens = ctx.flowTokens;
      final density = FlowDensityProvider.of(ctx);
      return Container(
        constraints: BoxConstraints(maxHeight: MediaQuery.of(ctx).size.height * 0.9),
        decoration: BoxDecoration(
          color: tokens.surfacePrimary,
          borderRadius: BorderRadius.vertical(top: Radius.circular(FlowRefFrame.radius4)),
        ),
        child: Column(mainAxisSize: MainAxisSize.min, children: [
          if (showHandle) ...[
            SizedBox(height: FlowRefFrame.space3),
            Container(width: 36, height: 4, decoration: BoxDecoration(
              color: tokens.borderDefault, borderRadius: BorderRadius.circular(2),
            )),
          ],
          if (title != null)
            Padding(
              padding: EdgeInsets.fromLTRB(FlowRefFrame.space4, FlowRefFrame.space4, FlowRefFrame.space4, 0),
              child: Row(children: [
                Expanded(child: Text(title, style: TextStyle(
                  fontSize: density.fontSize(FlowSize.lg), fontWeight: FlowRefVoice.weightSemibold, color: tokens.textPrimary,
                ))),
                GestureDetector(onTap: () => Navigator.pop(ctx), child: Icon(Icons.close, color: tokens.textSecondary)),
              ]),
            ),
          Flexible(child: Padding(
            padding: EdgeInsets.all(FlowRefFrame.space4),
            child: builder(ctx),
          )),
        ]),
      );
    },
  );
}
`;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FILE 47: lib/flow/components/flow_fab.dart
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const flowFabDart = `
import 'package:flutter/material.dart';
import '../tokens/ref_tokens.dart';
import '../tokens/sys_tokens.dart';
import '../primitives/flow_icon.dart';

enum FlowFabSize { sm, md, lg }

/// FlowFAB — floating action button.
class FlowFAB extends StatelessWidget {
  final IconData icon;
  final VoidCallback? onPressed;
  final String? label;
  final FlowFabSize size;
  final bool disabled;
  final String semanticLabel;

  const FlowFAB({
    super.key,
    required this.icon,
    this.onPressed,
    this.label,
    this.size = FlowFabSize.md,
    this.disabled = false,
    required this.semanticLabel,
  });

  double get _dim {
    switch (size) {
      case FlowFabSize.sm: return 40;
      case FlowFabSize.md: return 56;
      case FlowFabSize.lg: return 64;
    }
  }

  @override
  Widget build(BuildContext context) {
    final tokens = context.flowTokens;
    final density = FlowDensityProvider.of(context);
    final isExtended = label != null;

    return Semantics(
      label: semanticLabel,
      button: true,
      child: GestureDetector(
        onTap: disabled ? null : onPressed,
        child: Opacity(
          opacity: disabled ? tokens.stateDisabledOpacity : 1.0,
          child: AnimatedContainer(
            duration: FlowRefMomentum.durationFast,
            height: _dim,
            constraints: isExtended ? null : BoxConstraints(minWidth: _dim),
            padding: isExtended ? EdgeInsets.symmetric(horizontal: FlowRefFrame.space4) : null,
            decoration: BoxDecoration(
              color: tokens.actionPrimary,
              borderRadius: BorderRadius.circular(isExtended ? FlowRefFrame.radius3 : _dim / 2),
              boxShadow: tokens.elevation2,
            ),
            alignment: Alignment.center,
            child: Row(mainAxisSize: MainAxisSize.min, children: [
              FlowIcon(icon: icon, size: FlowIconSize.md, color: tokens.textInverse),
              if (isExtended) ...[
                SizedBox(width: FlowRefFrame.space2),
                Text(label!, style: TextStyle(
                  fontSize: density.fontSize(FlowSize.md), fontWeight: FlowRefVoice.weightSemibold, color: tokens.textInverse,
                )),
              ],
            ]),
          ),
        ),
      ),
    );
  }
}
`;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FILE 48: lib/flow/components/flow_sidebar.dart
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const flowSidebarDart = `
import 'package:flutter/material.dart';
import '../tokens/ref_tokens.dart';
import '../tokens/sys_tokens.dart';
import '../primitives/flow_icon.dart';

/// FlowSidebar — desktop collapsible navigation.
class FlowSidebar extends StatelessWidget {
  final bool collapsed;
  final VoidCallback? onToggle;
  final Widget? header;
  final List<FlowSidebarItem> items;
  final Widget? footer;

  const FlowSidebar({
    super.key,
    this.collapsed = false,
    this.onToggle,
    this.header,
    required this.items,
    this.footer,
  });

  @override
  Widget build(BuildContext context) {
    final tokens = context.flowTokens;
    final density = FlowDensityProvider.of(context);
    final width = collapsed ? FlowRefFrame.sidebarCollapsed : FlowRefFrame.sidebarExpanded;

    return AnimatedContainer(
      duration: FlowRefMomentum.durationNormal,
      width: width,
      decoration: BoxDecoration(
        color: tokens.surfacePrimary,
        border: Border(right: BorderSide(color: tokens.borderDefault)),
      ),
      child: Column(children: [
        if (header != null) Container(height: 56, alignment: Alignment.center, child: header),
        Expanded(child: ListView(padding: EdgeInsets.all(FlowRefFrame.space3), children: [
          for (final item in items)
            _buildItem(tokens, item, density),
        ])),
        if (onToggle != null)
          GestureDetector(
            onTap: onToggle,
            child: Container(
              height: 48,
              alignment: Alignment.center,
              child: Icon(collapsed ? Icons.chevron_right : Icons.chevron_left, color: tokens.textSecondary),
            ),
          ),
        if (footer != null) footer!,
      ]),
    );
  }

  Widget _buildItem(FlowSysTokens tokens, FlowSidebarItem item, [FlowDensityProvider? density]) {
    return GestureDetector(
      onTap: item.onTap,
      child: Container(
        height: density?.controlHeight(FlowSize.md) ?? 40,
        margin: EdgeInsets.only(bottom: FlowRefFrame.space1),
        padding: EdgeInsets.symmetric(horizontal: FlowRefFrame.space3),
        decoration: BoxDecoration(
          color: item.active ? tokens.surfaceTertiary : Colors.transparent,
          borderRadius: BorderRadius.circular(FlowRefFrame.radius2),
        ),
        child: Row(children: [
          FlowIcon(icon: item.icon, size: FlowIconSize.sm,
            color: item.active ? tokens.textPrimary : tokens.textSecondary),
          if (!collapsed) ...[
            SizedBox(width: FlowRefFrame.space3),
            Expanded(child: Text(item.label, style: TextStyle(
              fontSize: density?.fontSize(FlowSize.md) ?? FlowRefVoice.sizeMd,
              fontWeight: item.active ? FlowRefVoice.weightSemibold : FlowRefVoice.weightMedium,
              color: item.active ? tokens.textPrimary : tokens.textSecondary,
            ), overflow: TextOverflow.ellipsis)),
          ],
        ]),
      ),
    );
  }
}

class FlowSidebarItem {
  final IconData icon;
  final String label;
  final bool active;
  final VoidCallback? onTap;
  const FlowSidebarItem({required this.icon, required this.label, this.active = false, this.onTap});
}
`;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FILE 49: lib/flow/components/flow_topbar.dart
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const flowTopbarDart = `
import 'package:flutter/material.dart';
import '../tokens/ref_tokens.dart';
import '../tokens/sys_tokens.dart';

/// FlowTopbar — desktop application top bar.
class FlowTopbar extends StatelessWidget {
  final String? title;
  final Widget? leading;
  final List<Widget>? actions;
  final bool sticky;

  const FlowTopbar({super.key, this.title, this.leading, this.actions, this.sticky = false});

  @override
  Widget build(BuildContext context) {
    final tokens = context.flowTokens;
    final density = FlowDensityProvider.of(context);
    return Container(
      height: density.controlHeight(FlowSize.xl),
      padding: EdgeInsets.symmetric(horizontal: FlowRefFrame.space4),
      decoration: BoxDecoration(
        color: tokens.surfacePrimary,
        border: Border(bottom: BorderSide(color: tokens.borderDefault)),
      ),
      child: Row(children: [
        if (leading != null) ...[leading!, SizedBox(width: FlowRefFrame.space3)],
        if (title != null) Expanded(child: Text(title!, style: TextStyle(
          fontSize: density.fontSize(FlowSize.lg), fontWeight: FlowRefVoice.weightSemibold, color: tokens.textPrimary,
        ))),
        if (actions != null) Row(mainAxisSize: MainAxisSize.min, children: [
          for (int i = 0; i < actions!.length; i++) ...[
            actions![i],
            if (i < actions!.length - 1) SizedBox(width: FlowRefFrame.space2),
          ],
        ]),
      ]),
    );
  }
}
`;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FILE 50: lib/flow/components/flow_search.dart
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const flowSearchDart = `
import 'package:flutter/material.dart';
import '../tokens/ref_tokens.dart';
import '../tokens/sys_tokens.dart';

/// FlowSearch — search input with pill shape.
class FlowSearch extends StatelessWidget {
  final TextEditingController? controller;
  final ValueChanged<String>? onChanged;
  final ValueChanged<String>? onSubmitted;
  final String placeholder;
  final bool autofocus;
  final bool disabled;

  const FlowSearch({
    super.key,
    this.controller,
    this.onChanged,
    this.onSubmitted,
    this.placeholder = 'Search...',
    this.autofocus = false,
    this.disabled = false,
  });

  @override
  Widget build(BuildContext context) {
    final tokens = context.flowTokens;
    final density = FlowDensityProvider.of(context);
    return Opacity(
      opacity: disabled ? tokens.stateDisabledOpacity : 1.0,
      child: Container(
        height: density.controlHeight(FlowSize.md),
        decoration: BoxDecoration(
          color: tokens.surfaceSecondary,
          borderRadius: BorderRadius.circular(FlowRefFrame.radiusFull),
          border: Border.all(color: tokens.borderDefault),
        ),
        child: TextField(
          controller: controller,
          onChanged: disabled ? null : onChanged,
          onSubmitted: disabled ? null : onSubmitted,
          autofocus: autofocus,
          enabled: !disabled,
          style: TextStyle(fontSize: density.fontSize(FlowSize.md), color: tokens.textPrimary),
          decoration: InputDecoration(
            hintText: placeholder,
            hintStyle: TextStyle(color: tokens.textTertiary),
            prefixIcon: Icon(Icons.search, color: tokens.textSecondary, size: 20),
            contentPadding: EdgeInsets.symmetric(horizontal: FlowRefFrame.space4),
            border: InputBorder.none,
          ),
        ),
      ),
    );
  }
}
`;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FILE 51: lib/flow/components/flow_menu.dart
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const flowMenuDart = `
import 'package:flutter/material.dart';
import '../tokens/ref_tokens.dart';
import '../tokens/sys_tokens.dart';
import '../primitives/flow_icon.dart';

/// FlowMenu — dropdown menu / context menu.
/// Use with showFlowMenu for positioning.
class FlowMenuItem {
  final String label;
  final IconData? icon;
  final String? shortcut;
  final bool danger;
  final bool disabled;
  final bool checked;
  final VoidCallback? onTap;
  final bool isSeparator;

  const FlowMenuItem({
    this.label = '',
    this.icon,
    this.shortcut,
    this.danger = false,
    this.disabled = false,
    this.checked = false,
    this.onTap,
    this.isSeparator = false,
  });

  const FlowMenuItem.separator() : label = '', icon = null, shortcut = null, danger = false, disabled = false, checked = false, onTap = null, isSeparator = true;
}

/// Show a Flow-styled popup menu.
Future<void> showFlowMenu({
  required BuildContext context,
  required RelativeRect position,
  required List<FlowMenuItem> items,
}) async {
  final tokens = context.flowTokens;
  final density = FlowDensityProvider.of(context);
  await showMenu(
    context: context,
    position: position,
    color: tokens.surfacePrimary,
    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(FlowRefFrame.radius2)),
    elevation: 8,
    items: items.map((item) {
      if (item.isSeparator) {
        return PopupMenuItem(enabled: false, height: 9, padding: EdgeInsets.zero,
          child: Container(height: 1, color: tokens.borderDefault, margin: EdgeInsets.symmetric(vertical: 4)));
      }
      return PopupMenuItem(
        enabled: !item.disabled,
        onTap: item.onTap,
        child: Opacity(
          opacity: item.disabled ? tokens.stateDisabledOpacity : 1.0,
          child: Row(children: [
            if (item.checked) ...[Icon(Icons.check, size: 16, color: tokens.textAccent), SizedBox(width: FlowRefFrame.space2)]
            else if (item.icon != null) ...[Icon(item.icon!, size: 16, color: item.danger ? tokens.statusError : tokens.textSecondary), SizedBox(width: FlowRefFrame.space2)],
            Expanded(child: Text(item.label, style: TextStyle(
              fontSize: density.fontSize(FlowSize.md), color: item.danger ? tokens.statusError : tokens.textPrimary,
            ))),
            if (item.shortcut != null)
              Text(item.shortcut!, style: TextStyle(fontSize: density.labelFontSize(FlowSize.sm), color: tokens.textTertiary)),
          ]),
        ),
      );
    }).toList(),
  );
}
`;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FILE 52: lib/flow/components/flow_toggle_button.dart
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const flowToggleButtonDart = `
import 'package:flutter/material.dart';
import '../tokens/ref_tokens.dart';
import '../tokens/sys_tokens.dart';
import '../primitives/flow_icon.dart';

/// FlowToggleButton — pressable toggle with on/off state.
class FlowToggleButton extends StatelessWidget {
  final bool pressed;
  final VoidCallback? onPressed;
  final String? label;
  final IconData? icon;
  final bool disabled;

  const FlowToggleButton({
    super.key,
    this.pressed = false,
    this.onPressed,
    this.label,
    this.icon,
    this.disabled = false,
  });

  @override
  Widget build(BuildContext context) {
    final tokens = context.flowTokens;
    final density = FlowDensityProvider.of(context);

    return GestureDetector(
      onTap: disabled ? null : onPressed,
      child: Opacity(
        opacity: disabled ? tokens.stateDisabledOpacity : 1.0,
        child: AnimatedContainer(
          duration: FlowRefMomentum.durationFast,
          height: density.controlHeight(FlowSize.md),
          padding: EdgeInsets.symmetric(horizontal: FlowRefFrame.space3),
          decoration: BoxDecoration(
            color: pressed ? tokens.stateSelectedOverlay : tokens.surfacePrimary,
            borderRadius: BorderRadius.circular(FlowRefFrame.radius2),
            border: Border.all(color: pressed ? tokens.actionPrimary : tokens.borderDefault),
          ),
          child: Row(mainAxisSize: MainAxisSize.min, mainAxisAlignment: MainAxisAlignment.center, children: [
            if (icon != null) ...[
              FlowIcon(icon: icon!, size: FlowIconSize.sm, color: pressed ? tokens.textAccent : tokens.textSecondary),
              if (label != null) SizedBox(width: FlowRefFrame.space2),
            ],
            if (label != null)
              Text(label!, style: TextStyle(
                fontSize: density.fontSize(FlowSize.md),
                fontWeight: pressed ? FlowRefVoice.weightSemibold : FlowRefVoice.weightMedium,
                color: pressed ? tokens.textAccent : tokens.textPrimary,
              )),
          ]),
        ),
      ),
    );
  }
}

/// FlowToggleButtonGroup — exclusive or multi-select toggle group.
class FlowToggleButtonGroup extends StatelessWidget {
  final List<FlowToggleButton> children;
  final bool exclusive;

  const FlowToggleButtonGroup({super.key, required this.children, this.exclusive = true});

  @override
  Widget build(BuildContext context) {
    return Row(mainAxisSize: MainAxisSize.min, children: [
      for (int i = 0; i < children.length; i++) ...[
        children[i],
        if (i < children.length - 1) SizedBox(width: FlowRefFrame.space1),
      ],
    ]);
  }
}
`;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FILE 53: lib/flow/components/flow_toolbar.dart
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const flowToolbarDart = `
import 'package:flutter/material.dart';
import '../tokens/ref_tokens.dart';
import '../tokens/sys_tokens.dart';

/// FlowToolbar — horizontal action bar.
class FlowToolbar extends StatelessWidget {
  final List<Widget> children;
  final bool bordered;

  const FlowToolbar({super.key, required this.children, this.bordered = true});

  @override
  Widget build(BuildContext context) {
    final tokens = context.flowTokens;
    final density = FlowDensityProvider.of(context);
    return Container(
      height: density.controlHeight(FlowSize.lg),
      padding: EdgeInsets.symmetric(horizontal: FlowRefFrame.space3),
      decoration: BoxDecoration(
        color: tokens.surfacePrimary,
        border: bordered ? Border.all(color: tokens.borderDefault) : null,
        borderRadius: BorderRadius.circular(FlowRefFrame.radius2),
      ),
      child: Row(children: children),
    );
  }
}

class FlowToolbarDivider extends StatelessWidget {
  const FlowToolbarDivider({super.key});
  @override
  Widget build(BuildContext context) {
    final tokens = context.flowTokens;
    return Container(width: 1, height: 20, margin: EdgeInsets.symmetric(horizontal: FlowRefFrame.space2), color: tokens.borderDefault);
  }
}

class FlowToolbarSpacer extends StatelessWidget {
  const FlowToolbarSpacer({super.key});
  @override
  Widget build(BuildContext context) => const Spacer();
}
`;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FILE 54: lib/flow/components/flow_popover.dart
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const flowPopoverDart = `
import 'package:flutter/material.dart';
import '../tokens/ref_tokens.dart';
import '../tokens/sys_tokens.dart';

/// FlowPopover — floating content panel anchored to a trigger.
/// Uses OverlayEntry for positioning.
class FlowPopover extends StatefulWidget {
  final Widget trigger;
  final Widget content;
  final bool closeOnTapOutside;

  const FlowPopover({
    super.key,
    required this.trigger,
    required this.content,
    this.closeOnTapOutside = true,
  });

  @override
  State<FlowPopover> createState() => _FlowPopoverState();
}

class _FlowPopoverState extends State<FlowPopover> {
  final _layerLink = LayerLink();
  OverlayEntry? _entry;
  bool _open = false;

  void _toggle() {
    if (_open) { _close(); } else { _openPopover(); }
  }

  void _openPopover() {
    _entry = OverlayEntry(builder: (ctx) {
      final tokens = ctx.flowTokens;
      return Stack(children: [
        if (widget.closeOnTapOutside) Positioned.fill(child: GestureDetector(onTap: _close, behavior: HitTestBehavior.translucent)),
        CompositedTransformFollower(
          link: _layerLink,
          offset: Offset(0, FlowRefFrame.space1),
          targetAnchor: Alignment.bottomLeft,
          followerAnchor: Alignment.topLeft,
          child: Material(
            color: tokens.surfacePrimary,
            borderRadius: BorderRadius.circular(FlowRefFrame.radius2),
            elevation: 8,
            child: Container(
              padding: EdgeInsets.all(FlowRefFrame.space4),
              constraints: const BoxConstraints(maxWidth: 360),
              child: widget.content,
            ),
          ),
        ),
      ]);
    });
    Overlay.of(context).insert(_entry!);
    setState(() => _open = true);
  }

  void _close() {
    _entry?.remove();
    _entry = null;
    setState(() => _open = false);
  }

  @override
  void dispose() { _close(); super.dispose(); }

  @override
  Widget build(BuildContext context) {
    return CompositedTransformTarget(
      link: _layerLink,
      child: GestureDetector(onTap: _toggle, child: widget.trigger),
    );
  }
}
`;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FILE 55: lib/flow/components/flow_pull_to_refresh.dart
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const flowPullToRefreshDart = `
import 'package:flutter/material.dart';
import '../tokens/ref_tokens.dart';
import '../tokens/sys_tokens.dart';

/// FlowPullToRefresh — pull-to-refresh wrapper.
/// Uses RefreshIndicator on Android, custom on iOS.
class FlowPullToRefresh extends StatelessWidget {
  final Future<void> Function() onRefresh;
  final Widget child;
  final double displacement;

  const FlowPullToRefresh({
    super.key,
    required this.onRefresh,
    required this.child,
    this.displacement = 64,
  });

  @override
  Widget build(BuildContext context) {
    final tokens = context.flowTokens;
    return RefreshIndicator(
      onRefresh: onRefresh,
      displacement: displacement,
      color: tokens.actionPrimary,
      backgroundColor: tokens.surfacePrimary,
      child: child,
    );
  }
}
`;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FILE 56: lib/flow/components/flow_swipe_actions.dart
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const flowSwipeActionsDart = `
import 'package:flutter/material.dart';
import '../tokens/ref_tokens.dart';
import '../tokens/sys_tokens.dart';

enum FlowSwipeActionVariant { danger, success, warning, default_ }

/// FlowSwipeActions — swipeable list item with action panels.
/// Uses Dismissible for swipe gesture.
class FlowSwipeActions extends StatelessWidget {
  final Widget child;
  final List<FlowSwipeAction>? leading;
  final List<FlowSwipeAction>? trailing;

  const FlowSwipeActions({
    super.key,
    required this.child,
    this.leading,
    this.trailing,
  });

  @override
  Widget build(BuildContext context) {
    final tokens = context.flowTokens;
    // Simplified: uses Dismissible for primary action
    if (trailing != null && trailing!.isNotEmpty) {
      final primary = trailing!.first;
      return Dismissible(
        key: UniqueKey(),
        direction: DismissDirection.endToStart,
        onDismissed: (_) => primary.onTap?.call(),
        background: Container(
          color: _actionColor(tokens, primary.variant),
          alignment: Alignment.centerRight,
          padding: EdgeInsets.only(right: FlowRefFrame.space4),
          child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
            if (primary.icon != null) Icon(primary.icon!, color: _actionTextColor(tokens, primary.variant), size: 20),
            Text(primary.label, style: TextStyle(color: _actionTextColor(tokens, primary.variant), fontSize: FlowRefVoice.sizeSm)),
          ]),
        ),
        child: child,
      );
    }
    return child;
  }

  Color _actionColor(FlowSysTokens tokens, FlowSwipeActionVariant v) {
    switch (v) {
      case FlowSwipeActionVariant.danger: return tokens.statusError;
      case FlowSwipeActionVariant.success: return tokens.statusSuccess;
      case FlowSwipeActionVariant.warning: return tokens.statusWarning;
      case FlowSwipeActionVariant.default_: return tokens.surfaceTertiary;
    }
  }

  Color _actionTextColor(FlowSysTokens tokens, FlowSwipeActionVariant v) {
    switch (v) {
      case FlowSwipeActionVariant.warning: return tokens.textPrimary;
      default: return tokens.textInverse;
    }
  }
}

class FlowSwipeAction {
  final String label;
  final IconData? icon;
  final FlowSwipeActionVariant variant;
  final VoidCallback? onTap;
  const FlowSwipeAction({required this.label, this.icon, this.variant = FlowSwipeActionVariant.default_, this.onTap});
}
`;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FILE 57: lib/flow/components/flow_autocomplete.dart
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const flowAutocompleteDart = `
import 'package:flutter/material.dart';
import '../tokens/ref_tokens.dart';
import '../tokens/sys_tokens.dart';

/// FlowAutocomplete — searchable input with dropdown suggestions.
class FlowAutocomplete extends StatelessWidget {
  final String? label;
  final String? errorText;
  final List<String> options;
  final ValueChanged<String>? onSelected;
  final String? placeholder;
  final bool disabled;

  const FlowAutocomplete({
    super.key,
    this.label,
    this.errorText,
    required this.options,
    this.onSelected,
    this.placeholder,
    this.disabled = false,
  });

  @override
  Widget build(BuildContext context) {
    final tokens = context.flowTokens;
    final density = FlowDensityProvider.of(context);
    final hasError = errorText != null && errorText!.isNotEmpty;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: [
        if (label != null) ...[
          Text(label!, style: TextStyle(fontSize: density.labelFontSize(FlowSize.md), fontWeight: FlowRefVoice.weightSemibold, color: tokens.textPrimary)),
          SizedBox(height: FlowRefFrame.space1),
        ],
        Autocomplete<String>(
          optionsBuilder: (textEditingValue) {
            if (textEditingValue.text.isEmpty) return const Iterable<String>.empty();
            return options.where((o) => o.toLowerCase().contains(textEditingValue.text.toLowerCase()));
          },
          onSelected: onSelected,
          fieldViewBuilder: (ctx, controller, focusNode, onFieldSubmitted) {
            return Container(
              height: density.controlHeight(FlowSize.md),
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(FlowRefFrame.radius2),
                border: Border.all(color: hasError ? tokens.statusError : tokens.borderDefault),
                color: tokens.surfacePrimary,
              ),
              child: TextField(
                controller: controller,
                focusNode: focusNode,
                enabled: !disabled,
                style: TextStyle(fontSize: density.fontSize(FlowSize.md), color: tokens.textPrimary),
                decoration: InputDecoration(
                  hintText: placeholder,
                  hintStyle: TextStyle(color: tokens.textTertiary),
                  prefixIcon: Icon(Icons.search, color: tokens.textSecondary, size: 20),
                  contentPadding: EdgeInsets.symmetric(horizontal: FlowRefFrame.space4),
                  border: InputBorder.none,
                ),
              ),
            );
          },
          optionsViewBuilder: (ctx, onSelected, options) {
            return Align(
              alignment: Alignment.topLeft,
              child: Material(
                elevation: 8,
                borderRadius: BorderRadius.circular(FlowRefFrame.radius2),
                color: tokens.surfacePrimary,
                child: ConstrainedBox(
                  constraints: const BoxConstraints(maxHeight: 240, maxWidth: 400),
                  child: ListView.builder(
                    shrinkWrap: true,
                    itemCount: options.length,
                    itemBuilder: (_, i) {
                      final option = options.elementAt(i);
                      return ListTile(
                        title: Text(option, style: TextStyle(fontSize: density.fontSize(FlowSize.md), color: tokens.textPrimary)),
                        onTap: () => onSelected(option),
                        hoverColor: tokens.stateHoverOverlay,
                      );
                    },
                  ),
                ),
              ),
            );
          },
        ),
        if (hasError) ...[
          SizedBox(height: FlowRefFrame.space1),
          Text(errorText!, style: TextStyle(fontSize: FlowRefVoice.sizeSm, color: tokens.statusError)),
        ],
      ],
    );
  }
}
`;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FILE 58: lib/flow/components/flow_context_menu.dart
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const flowContextMenuDart = `
import 'package:flutter/material.dart';
import '../tokens/ref_tokens.dart';
import '../tokens/sys_tokens.dart';
import 'flow_menu.dart';

/// FlowContextMenu — right-click context menu wrapper.
/// On long-press (mobile) or right-click (desktop), shows a FlowMenu.
class FlowContextMenu extends StatelessWidget {
  final Widget child;
  final List<FlowMenuItem> items;

  const FlowContextMenu({
    super.key,
    required this.child,
    required this.items,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onSecondaryTapUp: (details) {
        showFlowMenu(
          context: context,
          position: RelativeRect.fromLTRB(
            details.globalPosition.dx,
            details.globalPosition.dy,
            details.globalPosition.dx,
            details.globalPosition.dy,
          ),
          items: items,
        );
      },
      onLongPressStart: (details) {
        showFlowMenu(
          context: context,
          position: RelativeRect.fromLTRB(
            details.globalPosition.dx,
            details.globalPosition.dy,
            details.globalPosition.dx,
            details.globalPosition.dy,
          ),
          items: items,
        );
      },
      child: child,
    );
  }
}
`;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FILE 58: lib/flow/components/flow_data_table.dart
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const flowDataTableDart = `
import 'package:flutter/material.dart';
import '../tokens/ref_tokens.dart';
import '../tokens/sys_tokens.dart';

/// Column definition for FlowDataTable.
class FlowDataColumn<T> {
  final String key;
  final String header;
  final double? width;
  final bool sortable;
  final int Function(T a, T b)? sortFn;
  final Widget Function(T row, int index)? render;
  final TextAlign align;

  const FlowDataColumn({
    required this.key,
    required this.header,
    this.width,
    this.sortable = false,
    this.sortFn,
    this.render,
    this.align = TextAlign.left,
  });
}

enum _SortDir { asc, desc }

/// FlowDataTable — advanced table with sort, filter, pagination, selection.
/// Mirrors React FlowDataTable 1:1.
class FlowDataTable<T> extends StatefulWidget {
  final List<FlowDataColumn<T>> columns;
  final List<T> data;
  final String Function(T row, int index) rowKey;
  final bool selectable;
  final Set<String>? selectedKeys;
  final ValueChanged<Set<String>>? onSelectionChange;
  final int pageSize;
  final bool searchable;
  final String searchPlaceholder;
  final bool loading;
  final String emptyMessage;
  final String Function(T row, String key)? cellValue;

  const FlowDataTable({
    super.key,
    required this.columns,
    required this.data,
    required this.rowKey,
    this.selectable = false,
    this.selectedKeys,
    this.onSelectionChange,
    this.pageSize = 10,
    this.searchable = false,
    this.searchPlaceholder = 'Filter...',
    this.loading = false,
    this.emptyMessage = 'No data',
    this.cellValue,
  });

  @override
  State<FlowDataTable<T>> createState() => _FlowDataTableState<T>();
}

class _FlowDataTableState<T> extends State<FlowDataTable<T>> {
  String _searchText = '';
  String? _sortKey;
  _SortDir? _sortDir;
  int _page = 1;
  late Set<String> _selected;

  @override
  void initState() {
    super.initState();
    _selected = widget.selectedKeys ?? {};
  }

  @override
  void didUpdateWidget(FlowDataTable<T> old) {
    super.didUpdateWidget(old);
    if (widget.selectedKeys != null) _selected = widget.selectedKeys!;
  }

  Set<String> get selected => widget.selectedKeys ?? _selected;

  void _setSelected(Set<String> keys) {
    if (widget.onSelectionChange != null) {
      widget.onSelectionChange!(keys);
    } else {
      setState(() => _selected = keys);
    }
  }

  List<T> get _filtered {
    if (_searchText.isEmpty) return widget.data;
    final q = _searchText.toLowerCase();
    return widget.data.where((row) {
      return widget.columns.any((col) {
        final val = widget.cellValue?.call(row, col.key) ?? '';
        return val.toLowerCase().contains(q);
      });
    }).toList();
  }

  List<T> get _sorted {
    final data = _filtered;
    if (_sortKey == null || _sortDir == null) return data;
    final col = widget.columns.firstWhere((c) => c.key == _sortKey, orElse: () => widget.columns.first);
    final dir = _sortDir == _SortDir.asc ? 1 : -1;
    return List<T>.from(data)..sort((a, b) {
      if (col.sortFn != null) return col.sortFn!(a, b) * dir;
      final aVal = widget.cellValue?.call(a, col.key) ?? '';
      final bVal = widget.cellValue?.call(b, col.key) ?? '';
      return aVal.compareTo(bVal) * dir;
    });
  }

  int get _totalPages => widget.pageSize > 0
      ? (_sorted.length / widget.pageSize).ceil().clamp(1, 9999)
      : 1;

  int get _safePage => _page.clamp(1, _totalPages);

  List<T> get _paginated {
    if (widget.pageSize <= 0) return _sorted;
    final start = (_safePage - 1) * widget.pageSize;
    return _sorted.skip(start).take(widget.pageSize).toList();
  }

  void _toggleSort(String key) {
    setState(() {
      if (_sortKey != key) { _sortKey = key; _sortDir = _SortDir.asc; }
      else if (_sortDir == _SortDir.asc) _sortDir = _SortDir.desc;
      else { _sortKey = null; _sortDir = null; }
    });
  }

  @override
  Widget build(BuildContext context) {
    final tokens = context.flowTokens;
    final rows = _paginated;

    return Container(
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(FlowRefFrame.radius3),
        border: Border.all(color: tokens.borderDefault),
      ),
      clipBehavior: Clip.antiAlias,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          if (widget.searchable) _buildToolbar(tokens),
          if (widget.loading)
            LinearProgressIndicator(
              backgroundColor: tokens.borderDefault,
              color: tokens.textAccent,
            ),
          SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            child: DataTable(
              columns: [
                if (widget.selectable) DataColumn(label: Checkbox(
                  value: rows.isNotEmpty && rows.every((r) => selected.contains(widget.rowKey(r, 0))),
                  onChanged: (_) => _toggleSelectAll(rows),
                )),
                ...widget.columns.map((col) => DataColumn(
                  label: InkWell(
                    onTap: col.sortable ? () => _toggleSort(col.key) : null,
                    child: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Text(col.header, style: TextStyle(fontWeight: FlowRefVoice.weightSemibold)),
                        if (col.sortable) Icon(
                          _sortKey == col.key
                            ? (_sortDir == _SortDir.asc ? Icons.arrow_upward : Icons.arrow_downward)
                            : Icons.unfold_more,
                          size: 16, color: _sortKey == col.key ? tokens.textPrimary : tokens.textTertiary,
                        ),
                      ],
                    ),
                  ),
                )),
              ],
              rows: rows.isEmpty
                ? [DataRow(cells: [
                    if (widget.selectable) DataCell(SizedBox.shrink()),
                    ...widget.columns.map((_) => DataCell(SizedBox.shrink())),
                  ])]
                : rows.asMap().entries.map((entry) {
                    final idx = entry.key;
                    final row = entry.value;
                    final key = widget.rowKey(row, idx);
                    return DataRow(
                      selected: selected.contains(key),
                      onSelectChanged: widget.selectable ? (_) => _toggleSelectRow(key) : null,
                      cells: [
                        if (widget.selectable) DataCell(Checkbox(
                          value: selected.contains(key),
                          onChanged: (_) => _toggleSelectRow(key),
                        )),
                        ...widget.columns.map((col) => DataCell(
                          col.render?.call(row, idx) ?? Text(widget.cellValue?.call(row, col.key) ?? ''),
                        )),
                      ],
                    );
                  }).toList(),
              headingRowColor: WidgetStateProperty.all(tokens.surfaceSecondary),
            ),
          ),
          if (widget.pageSize > 0 && _sorted.isNotEmpty) _buildPagination(tokens),
        ],
      ),
    );
  }

  Widget _buildToolbar(FlowSysTokens tokens) {
    return Container(
      padding: EdgeInsets.symmetric(horizontal: FlowRefFrame.space4, vertical: FlowRefFrame.space3),
      decoration: BoxDecoration(border: Border(bottom: BorderSide(color: tokens.borderDefault))),
      child: TextField(
        onChanged: (v) => setState(() { _searchText = v; _page = 1; }),
        decoration: InputDecoration(
          hintText: widget.searchPlaceholder,
          prefixIcon: Icon(Icons.search, size: 20),
          border: OutlineInputBorder(borderRadius: BorderRadius.circular(FlowRefFrame.radiusFull)),
          isDense: true,
          contentPadding: EdgeInsets.symmetric(horizontal: FlowRefFrame.space3, vertical: FlowRefFrame.space2),
        ),
      ),
    );
  }

  Widget _buildPagination(FlowSysTokens tokens) {
    return Container(
      padding: EdgeInsets.symmetric(horizontal: FlowRefFrame.space4, vertical: FlowRefFrame.space3),
      decoration: BoxDecoration(border: Border(top: BorderSide(color: tokens.borderDefault))),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            'Showing \${(_safePage - 1) * widget.pageSize + 1}–\${((_safePage) * widget.pageSize).clamp(0, _sorted.length)} of \${_sorted.length}',
            style: TextStyle(fontSize: FlowRefVoice.sizeSm, color: tokens.textSecondary),
          ),
          Row(children: [
            IconButton(icon: Icon(Icons.first_page), onPressed: _safePage > 1 ? () => setState(() => _page = 1) : null, iconSize: 20),
            IconButton(icon: Icon(Icons.chevron_left), onPressed: _safePage > 1 ? () => setState(() => _page--) : null, iconSize: 20),
            Padding(padding: EdgeInsets.symmetric(horizontal: FlowRefFrame.space2),
              child: Text('Page \$_safePage of \$_totalPages', style: TextStyle(fontSize: FlowRefVoice.sizeSm)),
            ),
            IconButton(icon: Icon(Icons.chevron_right), onPressed: _safePage < _totalPages ? () => setState(() => _page++) : null, iconSize: 20),
            IconButton(icon: Icon(Icons.last_page), onPressed: _safePage < _totalPages ? () => setState(() => _page = _totalPages) : null, iconSize: 20),
          ]),
        ],
      ),
    );
  }

  void _toggleSelectAll(List<T> rows) {
    final keys = rows.asMap().entries.map((e) => widget.rowKey(e.value, e.key)).toSet();
    if (keys.every((k) => selected.contains(k))) {
      _setSelected(Set<String>.from(selected)..removeAll(keys));
    } else {
      _setSelected(Set<String>.from(selected)..addAll(keys));
    }
  }

  void _toggleSelectRow(String key) {
    final next = Set<String>.from(selected);
    if (next.contains(key)) next.remove(key); else next.add(key);
    _setSelected(next);
  }
}
`;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FILE 59: lib/flow/components/flow_drawer_adapter.dart
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const flowDrawerAdapterDart = `
import 'package:flutter/material.dart';
import '../tokens/ref_tokens.dart';
import '../tokens/sys_tokens.dart';

/// FlowDrawerAdapter — responsive navigation.
/// Desktop: inline sidebar. Mobile: overlay drawer.
/// Mirrors React FlowDrawerAdapter 1:1.
class FlowDrawerAdapter extends StatelessWidget {
  final bool open;
  final VoidCallback onClose;
  final double breakpoint;
  final bool leftSide;
  final double width;
  final Widget? title;
  final Widget child;

  const FlowDrawerAdapter({
    super.key,
    required this.open,
    required this.onClose,
    this.breakpoint = 768,
    this.leftSide = true,
    this.width = FlowRefFrame.sidebarExpanded,
    this.title,
    required this.child,
  });

  @override
  Widget build(BuildContext context) {
    final tokens = context.flowTokens;
    final screenWidth = MediaQuery.of(context).size.width;
    final isMobile = screenWidth < breakpoint;

    if (!isMobile) {
      // Desktop: inline panel
      return AnimatedContainer(
        duration: FlowRefMomentum.durationNormal,
        width: open ? width : 0,
        clipBehavior: Clip.hardEdge,
        decoration: BoxDecoration(
          color: tokens.surfacePrimary,
          border: Border(
            right: leftSide ? BorderSide(color: tokens.borderDefault) : BorderSide.none,
            left: !leftSide ? BorderSide(color: tokens.borderDefault) : BorderSide.none,
          ),
        ),
        child: SizedBox(
          width: width,
          child: Column(children: [
            if (title != null) _header(tokens),
            Expanded(child: Padding(
              padding: EdgeInsets.all(FlowRefFrame.space4),
              child: child,
            )),
          ]),
        ),
      );
    }

    // Mobile: overlay drawer
    if (!open) return const SizedBox.shrink();
    return Stack(children: [
      // Scrim
      GestureDetector(
        onTap: onClose,
        child: Container(color: Colors.black.withOpacity(0.45)),
      ),
      // Panel
      Positioned(
        top: 0, bottom: 0,
        left: leftSide ? 0 : null,
        right: !leftSide ? 0 : null,
        child: Material(
          color: tokens.surfacePrimary,
          elevation: 16,
          child: SizedBox(
            width: screenWidth * 0.85 > 360 ? 360 : screenWidth * 0.85,
            child: Column(children: [
              if (title != null) _header(tokens),
              Expanded(child: Padding(
                padding: EdgeInsets.all(FlowRefFrame.space4),
                child: child,
              )),
            ]),
          ),
        ),
      ),
    ]);
  }

  Widget _header(FlowSysTokens tokens) {
    return Container(
      height: 56,
      padding: EdgeInsets.symmetric(horizontal: FlowRefFrame.space4),
      decoration: BoxDecoration(
        border: Border(bottom: BorderSide(color: tokens.borderDefault)),
      ),
      child: Row(children: [
        if (title != null) Expanded(child: DefaultTextStyle(
          style: TextStyle(fontSize: FlowRefVoice.sizeLg, fontWeight: FlowRefVoice.weightSemibold, color: tokens.textPrimary),
          child: title!,
        )),
        GestureDetector(
          onTap: onClose,
          child: Icon(Icons.close, color: tokens.textSecondary),
        ),
      ]),
    );
  }
}
`;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FILE 60: lib/flow/components/flow_fullscreen_sheet.dart
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const flowFullscreenSheetDart = `
import 'package:flutter/material.dart';
import '../tokens/ref_tokens.dart';
import '../tokens/sys_tokens.dart';

/// FlowFullscreenSheet — full-page mobile modal overlay.
/// Slides up from bottom, covers entire screen.
/// Mirrors React FlowFullscreenSheet 1:1.
///
/// Usage: Navigator.push(context, FlowFullscreenSheet.route(builder: ...))
class FlowFullscreenSheet extends StatelessWidget {
  final String? title;
  final bool showBack;
  final VoidCallback? onBack;
  final VoidCallback onClose;
  final List<Widget>? headerActions;
  final Widget child;

  const FlowFullscreenSheet({
    super.key,
    this.title,
    this.showBack = false,
    this.onBack,
    required this.onClose,
    this.headerActions,
    required this.child,
  });

  /// Create a page route with slide-up transition.
  static Route<T> route<T>({
    required Widget Function(BuildContext) builder,
  }) {
    return PageRouteBuilder<T>(
      opaque: true,
      pageBuilder: (ctx, anim, secondAnim) => builder(ctx),
      transitionsBuilder: (ctx, anim, secondAnim, child) {
        return SlideTransition(
          position: Tween<Offset>(
            begin: const Offset(0, 1),
            end: Offset.zero,
          ).animate(CurvedAnimation(
            parent: anim,
            curve: FlowRefMomentum.easingEnter,
            reverseCurve: FlowRefMomentum.easingExit,
          )),
          child: child,
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    final tokens = context.flowTokens;

    return Scaffold(
      backgroundColor: tokens.surfacePrimary,
      appBar: PreferredSize(
        preferredSize: const Size.fromHeight(56),
        child: Container(
          height: 56 + MediaQuery.of(context).padding.top,
          padding: EdgeInsets.only(top: MediaQuery.of(context).padding.top),
          decoration: BoxDecoration(
            color: tokens.surfacePrimary,
            border: Border(bottom: BorderSide(color: tokens.borderDefault)),
          ),
          child: Row(children: [
            SizedBox(width: FlowRefFrame.space3),
            GestureDetector(
              onTap: showBack ? (onBack ?? onClose) : onClose,
              child: Icon(
                showBack ? Icons.arrow_back : Icons.close,
                color: tokens.textSecondary,
              ),
            ),
            SizedBox(width: FlowRefFrame.space3),
            if (title != null) Expanded(child: Text(title!,
              style: TextStyle(fontSize: FlowRefVoice.sizeLg, fontWeight: FlowRefVoice.weightSemibold, color: tokens.textPrimary),
              overflow: TextOverflow.ellipsis,
            )),
            if (headerActions != null) ...headerActions!,
            SizedBox(width: FlowRefFrame.space3),
          ]),
        ),
      ),
      body: child,
    );
  }
}
`;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FILE 64: lib/flow/components/flow_quick_actions.dart
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const flowQuickActionsDart = `
import 'package:flutter/material.dart';
import '../tokens/ref_tokens.dart';
import '../tokens/sys_tokens.dart';

/// FlowQuickAction — single action item data.
class FlowQuickAction {
  final String id;
  final String label;
  final IconData? icon;
  final bool danger;
  final bool disabled;
  const FlowQuickAction({required this.id, required this.label, this.icon, this.danger = false, this.disabled = false});
}

/// FlowQuickActions — iOS-style bottom action sheet.
/// Usage: showFlowQuickActions(context, actions: [...], onAction: (id) {});
Future<String?> showFlowQuickActions(
  BuildContext context, {
  required List<FlowQuickAction> actions,
  String? title,
  String cancelLabel = 'Cancel',
}) {
  return showModalBottomSheet<String>(
    context: context,
    backgroundColor: Colors.transparent,
    builder: (ctx) {
      final tokens = ctx.flowTokens;
      return SafeArea(
        child: Padding(
          padding: EdgeInsets.all(FlowRefFrame.space4),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Container(
                decoration: BoxDecoration(
                  color: tokens.surfacePrimary,
                  borderRadius: BorderRadius.circular(FlowRefFrame.radius3),
                ),
                clipBehavior: Clip.antiAlias,
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    if (title != null) Container(
                      padding: EdgeInsets.symmetric(vertical: FlowRefFrame.space3),
                      decoration: BoxDecoration(border: Border(bottom: BorderSide(color: tokens.borderDefault))),
                      child: Center(child: Text(title!, style: TextStyle(fontSize: FlowRefVoice.sizeSm, color: tokens.textSecondary))),
                    ),
                    ...actions.map((a) => InkWell(
                      onTap: a.disabled ? null : () => Navigator.pop(ctx, a.id),
                      child: Container(
                        width: double.infinity,
                        padding: EdgeInsets.all(FlowRefFrame.space4),
                        decoration: BoxDecoration(border: Border(bottom: BorderSide(color: tokens.borderDefault, width: 0.5))),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            if (a.icon != null) ...[Icon(a.icon, size: 20, color: a.danger ? tokens.statusError : tokens.textAccent), SizedBox(width: FlowRefFrame.space2)],
                            Text(a.label, style: TextStyle(
                              fontSize: FlowRefVoice.sizeMd,
                              color: a.disabled ? tokens.textTertiary : a.danger ? tokens.statusError : tokens.textAccent,
                            )),
                          ],
                        ),
                      ),
                    )),
                  ],
                ),
              ),
              SizedBox(height: FlowRefFrame.space2),
              SizedBox(
                width: double.infinity,
                child: ElevatedButton(
                  onPressed: () => Navigator.pop(ctx),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: tokens.surfacePrimary,
                    foregroundColor: tokens.textAccent,
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(FlowRefFrame.radius3)),
                    padding: EdgeInsets.all(FlowRefFrame.space4),
                  ),
                  child: Text(cancelLabel, style: TextStyle(fontWeight: FlowRefVoice.weightSemibold)),
                ),
              ),
            ],
          ),
        ),
      );
    },
  );
}
`;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FILE 65: lib/flow/components/flow_advanced_filters.dart
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const flowAdvancedFiltersDart = `
import 'package:flutter/material.dart';
import '../tokens/ref_tokens.dart';
import '../tokens/sys_tokens.dart';

/// Filter field definition.
class FlowFilterField {
  final String key;
  final String label;
  final String type; // text, number, select, date
  final List<MapEntry<String, String>>? options;
  const FlowFilterField({required this.key, required this.label, this.type = 'text', this.options});
}

/// Active filter row.
class FlowFilterRow {
  final String id;
  String field;
  String operator;
  String value;
  FlowFilterRow({required this.id, required this.field, required this.operator, this.value = ''});
  FlowFilterRow copyWith({String? field, String? operator, String? value}) =>
    FlowFilterRow(id: id, field: field ?? this.field, operator: operator ?? this.operator, value: value ?? this.value);
}

/// FlowAdvancedFilters — multi-criteria filter panel for desktop.
class FlowAdvancedFilters extends StatelessWidget {
  final List<FlowFilterField> fields;
  final List<FlowFilterRow> filters;
  final ValueChanged<List<FlowFilterRow>> onFiltersChanged;
  final VoidCallback? onApply;
  final int maxFilters;

  const FlowAdvancedFilters({
    super.key,
    required this.fields,
    required this.filters,
    required this.onFiltersChanged,
    this.onApply,
    this.maxFilters = 10,
  });

  @override
  Widget build(BuildContext context) {
    final tokens = context.flowTokens;
    return Container(
      decoration: BoxDecoration(
        color: tokens.surfacePrimary,
        borderRadius: BorderRadius.circular(FlowRefFrame.radius3),
        border: Border.all(color: tokens.borderDefault),
      ),
      padding: EdgeInsets.all(FlowRefFrame.space4),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Row(children: [
                Icon(Icons.filter_list, size: 18, color: tokens.textSecondary),
                SizedBox(width: FlowRefFrame.space2),
                Text('Filters\${filters.isNotEmpty ? \" (\${filters.length})\" : \"\"}',
                  style: TextStyle(fontWeight: FlowRefVoice.weightSemibold, fontSize: FlowRefVoice.sizeBase)),
              ]),
              Row(children: [
                if (filters.isNotEmpty) TextButton(
                  onPressed: () => onFiltersChanged([]),
                  child: Text('Clear all', style: TextStyle(fontSize: FlowRefVoice.sizeSm)),
                ),
                TextButton.icon(
                  onPressed: filters.length >= maxFilters ? null : () {
                    final f = fields.first;
                    onFiltersChanged([...filters, FlowFilterRow(
                      id: 'f\${DateTime.now().millisecondsSinceEpoch}',
                      field: f.key, operator: 'contains',
                    )]);
                  },
                  icon: Icon(Icons.add, size: 16),
                  label: Text('Add filter', style: TextStyle(fontSize: FlowRefVoice.sizeSm)),
                ),
              ]),
            ],
          ),
          ...filters.asMap().entries.map((entry) {
            final i = entry.key;
            final filter = entry.value;
            return Padding(
              padding: EdgeInsets.only(top: FlowRefFrame.space2),
              child: Row(children: [
                SizedBox(width: 48, child: Text(i == 0 ? 'Where' : 'And',
                  textAlign: TextAlign.right,
                  style: TextStyle(fontSize: FlowRefVoice.sizeSm, color: tokens.textTertiary))),
                SizedBox(width: FlowRefFrame.space2),
                Expanded(child: DropdownButtonFormField<String>(
                  value: filter.field,
                  items: fields.map((f) => DropdownMenuItem(value: f.key, child: Text(f.label))).toList(),
                  onChanged: (v) {
                    final updated = List<FlowFilterRow>.from(filters);
                    updated[i] = filter.copyWith(field: v);
                    onFiltersChanged(updated);
                  },
                  decoration: InputDecoration(isDense: true, border: OutlineInputBorder()),
                )),
                SizedBox(width: FlowRefFrame.space2),
                Expanded(child: TextFormField(
                  initialValue: filter.value,
                  onChanged: (v) {
                    final updated = List<FlowFilterRow>.from(filters);
                    updated[i] = filter.copyWith(value: v);
                    onFiltersChanged(updated);
                  },
                  decoration: InputDecoration(isDense: true, hintText: 'Value...', border: OutlineInputBorder()),
                )),
                IconButton(icon: Icon(Icons.close, size: 18), onPressed: () {
                  onFiltersChanged(filters.where((f) => f.id != filter.id).toList());
                }),
              ]),
            );
          }),
          if (filters.isNotEmpty && onApply != null) Padding(
            padding: EdgeInsets.only(top: FlowRefFrame.space3),
            child: Align(alignment: Alignment.centerRight,
              child: ElevatedButton(onPressed: onApply, child: Text('Apply Filters'))),
          ),
        ],
      ),
    );
  }
}
`;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FILE 61: lib/flow/components/flow_date_picker.dart
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const flowDatePickerDart = `
import 'package:flutter/material.dart';
import '../tokens/ref_tokens.dart';
import '../tokens/sys_tokens.dart';
import '../flow_density.dart';

/// FlowDatePicker — calendar-based date selector.
/// Shows a trigger button that opens a calendar dialog.
/// Density-aware via FlowDensityProvider.
class FlowDatePicker extends StatefulWidget {
  final DateTime? value;
  final ValueChanged<DateTime>? onChanged;
  final String? label;
  final String placeholder;
  final DateTime? firstDate;
  final DateTime? lastDate;
  final bool error;
  final String? errorMessage;
  final FlowSize size;
  final bool disabled;

  const FlowDatePicker({
    super.key,
    this.value,
    this.onChanged,
    this.label,
    this.placeholder = 'Select date',
    this.firstDate,
    this.lastDate,
    this.error = false,
    this.errorMessage,
    this.size = FlowSize.md,
    this.disabled = false,
  });

  @override
  State<FlowDatePicker> createState() => _FlowDatePickerState();
}

class _FlowDatePickerState extends State<FlowDatePicker> {
  late DateTime _displayDate;

  @override
  void initState() {
    super.initState();
    _displayDate = widget.value ?? DateTime.now();
  }

  @override
  void didUpdateWidget(FlowDatePicker old) {
    super.didUpdateWidget(old);
    if (widget.value != null) _displayDate = widget.value!;
  }

  Future<void> _openPicker() async {
    final tokens = context.flowTokens;
    final result = await showDatePicker(
      context: context,
      initialDate: widget.value ?? DateTime.now(),
      firstDate: widget.firstDate ?? DateTime(2000),
      lastDate: widget.lastDate ?? DateTime(2100),
      builder: (ctx, child) => Theme(
        data: Theme.of(ctx).copyWith(
          colorScheme: ColorScheme.light(
            primary: tokens.actionPrimary,
            onPrimary: tokens.textInverse,
            surface: tokens.surfacePrimary,
            onSurface: tokens.textPrimary,
          ),
        ),
        child: child!,
      ),
    );
    if (result != null) {
      setState(() => _displayDate = result);
      widget.onChanged?.call(result);
    }
  }

  @override
  Widget build(BuildContext context) {
    final tokens = context.flowTokens;
    final density = FlowDensityProvider.of(context);
    final height = density.controlHeight(widget.size);
    final borderColor = widget.error ? tokens.statusError : tokens.borderDefault;
    final hasValue = widget.value != null;
    final displayText = hasValue
      ? '\${_displayDate.day}/\${_displayDate.month}/\${_displayDate.year}'
      : widget.placeholder;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: [
        if (widget.label != null) Padding(
          padding: EdgeInsets.only(bottom: FlowRefFrame.space1),
          child: Text(widget.label!, style: TextStyle(
            fontSize: density.labelFontSize(widget.size),
            color: widget.error ? tokens.statusError : tokens.textSecondary,
          )),
        ),
        GestureDetector(
          onTap: widget.disabled ? null : _openPicker,
          child: Container(
            height: height,
            padding: EdgeInsets.symmetric(horizontal: FlowRefFrame.space4),
            decoration: BoxDecoration(
              color: tokens.surfacePrimary,
              borderRadius: BorderRadius.circular(FlowRefFrame.radius2),
              border: Border.all(color: borderColor),
            ),
            child: Row(children: [
              Icon(Icons.calendar_today, size: 18, color: tokens.textSecondary),
              SizedBox(width: FlowRefFrame.space2),
              Expanded(child: Text(displayText, style: TextStyle(
                fontSize: density.fontSize(widget.size),
                color: hasValue ? tokens.textPrimary : tokens.textTertiary,
              ))),
              if (hasValue && !widget.disabled) GestureDetector(
                onTap: () {
                  widget.onChanged?.call(DateTime(1970));
                  setState(() {});
                },
                child: Icon(Icons.close, size: 18, color: tokens.textTertiary),
              ),
            ]),
          ),
        ),
        if (widget.error && widget.errorMessage != null) Padding(
          padding: EdgeInsets.only(top: FlowRefFrame.space1),
          child: Text(widget.errorMessage!, style: TextStyle(
            fontSize: FlowRefVoice.sizeSm, color: tokens.statusError,
          )),
        ),
      ],
    );
  }
}
`;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FILE 62: lib/flow/components/flow_otp_input.dart
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const flowOTPInputDart = `
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../tokens/ref_tokens.dart';
import '../tokens/sys_tokens.dart';

/// FlowOTPInput — multi-digit one-time-password entry.
/// Renders N single-character input cells with auto-advance.
class FlowOTPInput extends StatefulWidget {
  final int length;
  final String? value;
  final ValueChanged<String>? onChanged;
  final ValueChanged<String>? onCompleted;
  final bool numeric;
  final bool error;
  final String? errorMessage;
  final String? label;
  final bool disabled;
  final bool autoFocus;

  const FlowOTPInput({
    super.key,
    this.length = 6,
    this.value,
    this.onChanged,
    this.onCompleted,
    this.numeric = true,
    this.error = false,
    this.errorMessage,
    this.label,
    this.disabled = false,
    this.autoFocus = false,
  });

  @override
  State<FlowOTPInput> createState() => _FlowOTPInputState();
}

class _FlowOTPInputState extends State<FlowOTPInput> {
  late List<TextEditingController> _controllers;
  late List<FocusNode> _focusNodes;

  @override
  void initState() {
    super.initState();
    _controllers = List.generate(widget.length, (i) =>
      TextEditingController(text: (widget.value ?? '').length > i ? (widget.value ?? '')[i] : ''));
    _focusNodes = List.generate(widget.length, (_) => FocusNode());
    if (widget.autoFocus && _focusNodes.isNotEmpty) {
      WidgetsBinding.instance.addPostFrameCallback((_) => _focusNodes[0].requestFocus());
    }
  }

  @override
  void dispose() {
    for (final c in _controllers) c.dispose();
    for (final f in _focusNodes) f.dispose();
    super.dispose();
  }

  String get _currentValue => _controllers.map((c) => c.text).join();

  void _onChanged(int idx, String val) {
    if (val.length > 1) {
      // Paste handling
      final chars = val.split('').where((c) => widget.numeric ? RegExp(r'\\d').hasMatch(c) : RegExp(r'[a-zA-Z0-9]').hasMatch(c)).toList();
      for (int i = 0; i < chars.length && idx + i < widget.length; i++) {
        _controllers[idx + i].text = chars[i];
      }
      final next = (idx + chars.length).clamp(0, widget.length - 1);
      _focusNodes[next].requestFocus();
    } else if (val.isNotEmpty) {
      if (idx < widget.length - 1) _focusNodes[idx + 1].requestFocus();
    }
    final v = _currentValue;
    widget.onChanged?.call(v);
    if (v.replaceAll(' ', '').length == widget.length) {
      widget.onCompleted?.call(v);
    }
  }

  void _onKeyDown(int idx, KeyEvent event) {
    if (event is KeyDownEvent && event.logicalKey == LogicalKeyboardKey.backspace) {
      if (_controllers[idx].text.isEmpty && idx > 0) {
        _controllers[idx - 1].clear();
        _focusNodes[idx - 1].requestFocus();
        widget.onChanged?.call(_currentValue);
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final tokens = context.flowTokens;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: [
        if (widget.label != null) Padding(
          padding: EdgeInsets.only(bottom: FlowRefFrame.space1),
          child: Text(widget.label!, style: TextStyle(
            fontSize: FlowRefVoice.sizeBase,
            color: widget.error ? tokens.statusError : tokens.textSecondary,
          )),
        ),
        Row(
          mainAxisSize: MainAxisSize.min,
          children: List.generate(widget.length, (i) => Padding(
            padding: EdgeInsets.only(right: i < widget.length - 1 ? FlowRefFrame.space2 : 0),
            child: SizedBox(
              width: 48, height: 48,
              child: KeyboardListener(
                focusNode: FocusNode(),
                onKeyEvent: (e) => _onKeyDown(i, e),
                child: TextField(
                  controller: _controllers[i],
                  focusNode: _focusNodes[i],
                  enabled: !widget.disabled,
                  textAlign: TextAlign.center,
                  maxLength: widget.length,
                  keyboardType: widget.numeric ? TextInputType.number : TextInputType.text,
                  inputFormatters: widget.numeric ? [FilteringTextInputFormatter.digitsOnly] : [],
                  onChanged: (v) => _onChanged(i, v),
                  style: TextStyle(
                    fontFamily: FlowRefVoice.familyMono,
                    fontSize: FlowRefVoice.sizeLg,
                    fontWeight: FlowRefVoice.weightSemibold,
                    color: tokens.textPrimary,
                  ),
                  decoration: InputDecoration(
                    counterText: '',
                    contentPadding: EdgeInsets.zero,
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(FlowRefFrame.radius2),
                      borderSide: BorderSide(color: widget.error ? tokens.statusError : tokens.borderDefault),
                    ),
                    focusedBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(FlowRefFrame.radius2),
                      borderSide: BorderSide(color: widget.error ? tokens.statusError : tokens.actionPrimary, width: 2),
                    ),
                  ),
                ),
              ),
            ),
          )),
        ),
        if (widget.error && widget.errorMessage != null) Padding(
          padding: EdgeInsets.only(top: FlowRefFrame.space1),
          child: Text(widget.errorMessage!, style: TextStyle(
            fontSize: FlowRefVoice.sizeSm, color: tokens.statusError,
          )),
        ),
      ],
    );
  }
}
`;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FILE 63: lib/flow/components/flow_kpi_card.dart
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const flowKPICardDart = `
import 'package:flutter/material.dart';
import '../tokens/ref_tokens.dart';
import '../tokens/sys_tokens.dart';

enum FlowKPITrend { up, down, neutral }
enum FlowKPISize { sm, md, lg }

/// FlowKPICard — Key Performance Indicator display card.
/// Shows metric value + label + trend indicator.
class FlowKPICard extends StatelessWidget {
  final String value;
  final String label;
  final String? description;
  final FlowKPITrend? trend;
  final String? trendValue;
  final bool upIsGood;
  final IconData? icon;
  final FlowKPISize size;
  final bool loading;
  final VoidCallback? onTap;

  const FlowKPICard({
    super.key,
    required this.value,
    required this.label,
    this.description,
    this.trend,
    this.trendValue,
    this.upIsGood = true,
    this.icon,
    this.size = FlowKPISize.md,
    this.loading = false,
    this.onTap,
  });

  EdgeInsets get _padding {
    switch (size) {
      case FlowKPISize.sm: return EdgeInsets.all(FlowRefFrame.space4);
      case FlowKPISize.md: return EdgeInsets.all(FlowRefFrame.space6);
      case FlowKPISize.lg: return EdgeInsets.all(FlowRefFrame.space8);
    }
  }

  double get _valueFontSize {
    switch (size) {
      case FlowKPISize.sm: return FlowRefVoice.size8;
      case FlowKPISize.md: return FlowRefVoice.size10;
      case FlowKPISize.lg: return FlowRefVoice.size11;
    }
  }

  @override
  Widget build(BuildContext context) {
    final tokens = context.flowTokens;

    if (loading) {
      return Container(
        padding: _padding,
        decoration: BoxDecoration(
          color: tokens.surfacePrimary,
          borderRadius: BorderRadius.circular(FlowRefFrame.radius3),
          border: Border.all(color: tokens.borderDefault),
        ),
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Container(width: 80, height: 12, decoration: BoxDecoration(color: tokens.surfaceTertiary, borderRadius: BorderRadius.circular(4))),
          SizedBox(height: FlowRefFrame.space3),
          Container(width: 60, height: _valueFontSize, decoration: BoxDecoration(color: tokens.surfaceTertiary, borderRadius: BorderRadius.circular(4))),
          SizedBox(height: FlowRefFrame.space3),
          Container(width: 40, height: 10, decoration: BoxDecoration(color: tokens.surfaceTertiary, borderRadius: BorderRadius.circular(4))),
        ]),
      );
    }

    final isPositive = trend == FlowKPITrend.up ? upIsGood : trend == FlowKPITrend.down ? !upIsGood : true;
    final trendColor = (trend == null || trend == FlowKPITrend.neutral)
        ? tokens.textSecondary
        : isPositive ? tokens.statusSuccess : tokens.statusError;
    final trendIcon = trend == FlowKPITrend.up ? Icons.trending_up
        : trend == FlowKPITrend.down ? Icons.trending_down : Icons.remove;

    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: _padding,
        decoration: BoxDecoration(
          color: tokens.surfacePrimary,
          borderRadius: BorderRadius.circular(FlowRefFrame.radius3),
          border: Border.all(color: tokens.borderDefault),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Header: icon + label
            Row(children: [
              if (icon != null) ...[
                Icon(icon, size: 16, color: tokens.textAccent),
                SizedBox(width: FlowRefFrame.space2),
              ],
              Text(label.toUpperCase(), style: TextStyle(
                fontSize: FlowRefVoice.sizeSm,
                fontWeight: FlowRefVoice.weightMedium,
                color: tokens.textSecondary,
                letterSpacing: 0.05 * FlowRefVoice.sizeSm,
              )),
            ]),
            SizedBox(height: FlowRefFrame.space2),
            // Value
            Text(value, style: TextStyle(
              fontSize: _valueFontSize,
              fontWeight: FlowRefVoice.weightBold,
              color: tokens.textPrimary,
              height: 1.1,
              letterSpacing: -0.02 * _valueFontSize,
            )),
            SizedBox(height: FlowRefFrame.space2),
            // Trend + description
            Row(children: [
              if (trend != null) ...[
                Icon(trendIcon, size: 14, color: trendColor),
                if (trendValue != null) Padding(
                  padding: EdgeInsets.only(left: 4),
                  child: Text(trendValue!, style: TextStyle(
                    fontSize: FlowRefVoice.sizeSm,
                    fontWeight: FlowRefVoice.weightMedium,
                    color: trendColor,
                  )),
                ),
                SizedBox(width: FlowRefFrame.space2),
              ],
              if (description != null) Text(description!, style: TextStyle(
                fontSize: FlowRefVoice.sizeSm, color: tokens.textSecondary,
              )),
            ]),
          ],
        ),
      ),
    );
  }
}
`;

/**
 * Complete Flutter file manifest (updated):
 *
 * lib/flow/
 * ├── tokens/
 * │   ├── ref_tokens.dart          ← Raw ref scales
 * │   ├── sys_tokens.dart          ← ThemeExtension with light/dark
 * │   └── comp_tokens.dart         ← Component-scoped ThemeExtension
 * ├── primitives/
 * │   ├── flow_surface.dart        ← Container primitive
 * │   ├── flow_text.dart           ← Typography primitive
 * │   ├── flow_stack.dart          ← Stack + Inline layout primitives
 * │   ├── flow_grid.dart           ← Grid layout primitive
 * │   ├── flow_divider.dart        ← Divider primitive
 * │   ├── flow_action_surface.dart ← Interactive surface with StateLayer
 * │   ├── flow_overlay.dart        ← Modal dimming primitive
 * │   ├── flow_form_field.dart     ← Form layout primitive
 * │   ├── flow_motion_container.dart ← Enter/exit animation primitive
 * │   ├── flow_growth_observer.dart  ← Instrumentation primitive
 * │   ├── flow_icon.dart           ← Iconography primitive + FlowIcons registry
 * │   ├── flow_theme_toggle.dart   ← Theme switching utility widget
 * │   └── flow_layout_grid.dart   ← Responsive 12/6/1 column grid
 * ├── components/
 * │   ├── flow_button.dart         ← Button (7v, 3s, loading)
 * │   ├── flow_icon_button.dart    ← IconButton (7 emphasis, 4 sizes, selected)
 * │   ├── flow_text_input.dart     ← TextInput (floating label, error, success)
 * │   ├── flow_text_area.dart      ← TextArea (multi-line, counter, resize)
 * │   ├── flow_card.dart           ← Card (3 variants, interactive)
 * │   ├── flow_chip.dart           ← Chip (4 variants, 5 statuses)
 * │   ├── flow_dialog.dart         ← Dialog (alert, confirm, form)
 * │   ├── flow_checkbox.dart       ← Checkbox (check, indeterminate, label)
 * │   ├── flow_radio.dart          ← Radio + RadioGroup (exclusive selection)
 * │   ├── flow_switch.dart         ← Switch (toggle, label)
 * │   ├── flow_slider.dart         ← Slider (single value, label, marks)
 * │   ├── flow_select.dart         ← Select (dropdown, label, error)
 * │   ├── flow_autocomplete.dart   ← Autocomplete (search, suggestions)
 * │   ├── flow_tooltip.dart        ← Tooltip (hover/focus info)
 * │   ├── flow_snackbar.dart       ← Snackbar (4 variants, action)
 * │   ├── flow_progress_bar.dart   ← ProgressBar (determinate/indeterminate)
 * │   ├── flow_circular_progress.dart ← CircularProgress (determinate/indeterminate)
 * │   ├── flow_skeleton.dart       ← Skeleton (text, circle, rect, card)
 * │   ├── flow_empty_state.dart    ← EmptyState (icon, title, desc, action)
 * │   ├── flow_avatar.dart         ← Avatar (image, initials, status)
 * │   ├── flow_badge.dart          ← Badge (dot, count, label)
 * │   ├── flow_list.dart           ← List + ListItem (leading/trailing slots)
 * │   ├── flow_tabs.dart           ← Tabs (line, icon, disabled)
 * │   ├── flow_accordion.dart      ← Accordion (single/multi expand)
 * │   ├── flow_segmented_control.dart ← SegmentedControl (exclusive select)
 * │   ├── flow_breadcrumbs.dart    ← Breadcrumbs (nav trail)
 * │   ├── flow_pagination.dart     ← Pagination (page nav)
 * │   ├── flow_stepper.dart        ← Stepper (multi-step wizard)
 * │   ├── flow_bottom_nav.dart     ← BottomNav (mobile nav bar)
 * │   ├── flow_bottom_sheet.dart   ← BottomSheet (modal from bottom)
 * │   ├── flow_fab.dart            ← FAB (floating action button)
 * │   ├── flow_sidebar.dart        ← Sidebar (desktop collapsible nav)
 * │   ├── flow_topbar.dart         ← Topbar (desktop app bar)
 * │   ├── flow_search.dart         ← Search (pill-shaped input)
 * │   ├── flow_menu.dart           ← Menu + ContextMenu items
 * │   ├── flow_context_menu.dart   ← ContextMenu (right-click wrapper)
 * │   ├── flow_toggle_button.dart  ← ToggleButton + ToggleButtonGroup
 * │   ├── flow_toolbar.dart        ← Toolbar + Divider + Spacer
 * │   ├── flow_popover.dart        ← Popover (floating panel)
 * │   ├── flow_pull_to_refresh.dart ← PullToRefresh (gesture wrapper)
 * │   ├── flow_swipe_actions.dart  ← SwipeActions (swipeable list item)
 * │   ├── flow_autocomplete.dart   ← Autocomplete (search + suggestions)
 * │   ├── flow_data_table.dart     ← DataTable (sort + filter + paginate + select)
 * │   ├── flow_drawer_adapter.dart ← DrawerAdapter (responsive: sidebar ↔ overlay)
 * │   ├── flow_fullscreen_sheet.dart ← FullscreenSheet (full-page mobile modal)
 * │   ├── flow_quick_actions.dart  ← QuickActions (iOS-style action sheet)
 * │   ├── flow_advanced_filters.dart ← AdvancedFilters (multi-criteria filter)
 * │   ├── flow_date_picker.dart   ← DatePicker (calendar trigger + dialog)
 * │   ├── flow_otp_input.dart     ← OTPInput (multi-digit code entry)
 * │   └── flow_kpi_card.dart      ← KPICard (metric + trend indicator)
 * ├── flow_density.dart             ← Density + Size provider (InheritedWidget)
 * └── flow_theme.dart               ← Theme provider
 */
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FILE 65: lib/flow/components/flow_fieldset.dart
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const flowFieldsetDart = `
import 'package:flutter/material.dart';
import '../tokens/ref_tokens.dart';
import '../tokens/sys_tokens.dart';
import '../flow_density.dart';

/// FlowFieldset — grouped form controls with legend.
class FlowFieldset extends StatelessWidget {
  final String legend;
  final String? description;
  final List<Widget> children;
  final bool disabled;
  final bool error;

  const FlowFieldset({
    super.key,
    required this.legend,
    this.description,
    required this.children,
    this.disabled = false,
    this.error = false,
  });

  @override
  Widget build(BuildContext context) {
    final tokens = context.flowTokens;
    final density = FlowDensityProvider.of(context);

    return Opacity(
      opacity: disabled ? tokens.stateDisabledOpacity : 1.0,
      child: Container(
        decoration: BoxDecoration(
          border: Border.all(
            color: error ? tokens.statusError : tokens.borderDefault,
            width: 1,
          ),
          borderRadius: BorderRadius.circular(FlowRefFrame.radius3),
        ),
        padding: EdgeInsets.all(FlowRefFrame.space5),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisSize: MainAxisSize.min,
          children: [
            // Legend (simulates <legend> float)
            Container(
              transform: Matrix4.translationValues(-FlowRefFrame.space2, -(FlowRefFrame.space5 + 8), 0),
              padding: EdgeInsets.symmetric(horizontal: FlowRefFrame.space2),
              color: tokens.surfacePrimary,
              child: Text(legend, style: TextStyle(
                fontSize: density.labelFontSize(FlowSize.md),
                fontWeight: FlowRefVoice.weightSemibold,
                fontFamily: FlowRefVoice.familySans,
                color: error ? tokens.statusError : tokens.textPrimary,
              )),
            ),
            if (description != null) ...[
              Text(description!, style: TextStyle(
                fontSize: density.labelFontSize(FlowSize.sm),
                color: tokens.textSecondary,
                fontFamily: FlowRefVoice.familySans,
              )),
              SizedBox(height: FlowRefFrame.space3),
            ],
            ...List.generate(children.length * 2 - 1, (i) {
              if (i.isOdd) return SizedBox(height: FlowRefFrame.space3);
              return children[i ~/ 2];
            }),
          ],
        ),
      ),
    );
  }
}
`;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FILE 66: lib/flow/components/flow_form_section.dart
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const flowFormSectionDart = `
import 'package:flutter/material.dart';
import '../tokens/ref_tokens.dart';
import '../tokens/sys_tokens.dart';
import '../flow_density.dart';

/// FlowFormSection — collapsible section header + grouped fields.
class FlowFormSection extends StatefulWidget {
  final String title;
  final String? description;
  final List<Widget> children;
  final bool collapsible;
  final bool defaultOpen;

  const FlowFormSection({
    super.key,
    required this.title,
    this.description,
    required this.children,
    this.collapsible = false,
    this.defaultOpen = true,
  });

  @override
  State<FlowFormSection> createState() => _FlowFormSectionState();
}

class _FlowFormSectionState extends State<FlowFormSection> {
  late bool _open;

  @override
  void initState() {
    super.initState();
    _open = widget.defaultOpen;
  }

  @override
  Widget build(BuildContext context) {
    final tokens = context.flowTokens;
    final density = FlowDensityProvider.of(context);

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: [
        GestureDetector(
          onTap: widget.collapsible ? () => setState(() => _open = !_open) : null,
          child: Row(children: [
            Expanded(child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(widget.title, style: TextStyle(
                  fontSize: density.fontSize(FlowSize.lg),
                  fontWeight: FlowRefVoice.weightSemibold,
                  color: tokens.textPrimary,
                )),
                if (widget.description != null) ...[
                  SizedBox(height: FlowRefFrame.space1),
                  Text(widget.description!, style: TextStyle(
                    fontSize: density.labelFontSize(FlowSize.sm),
                    color: tokens.textSecondary,
                  )),
                ],
              ],
            )),
            if (widget.collapsible)
              Icon(_open ? Icons.keyboard_arrow_up : Icons.keyboard_arrow_down,
                color: tokens.textTertiary, size: 20),
          ]),
        ),
        if (_open || !widget.collapsible) ...[
          SizedBox(height: FlowRefFrame.space4),
          ...List.generate(widget.children.length * 2 - 1, (i) {
            if (i.isOdd) return SizedBox(height: FlowRefFrame.space3);
            return widget.children[i ~/ 2];
          }),
        ],
      ],
    );
  }
}
`;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FILE 67: lib/flow/components/flow_inline_editable.dart
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const flowInlineEditableDart = `
import 'package:flutter/material.dart';
import '../tokens/ref_tokens.dart';
import '../tokens/sys_tokens.dart';
import '../flow_density.dart';

/// FlowInlineEditable — tap-to-edit inline text.
class FlowInlineEditable extends StatefulWidget {
  final String value;
  final ValueChanged<String> onChanged;
  final String placeholder;
  final bool disabled;
  final TextStyle? textStyle;

  const FlowInlineEditable({
    super.key,
    required this.value,
    required this.onChanged,
    this.placeholder = 'Tap to edit...',
    this.disabled = false,
    this.textStyle,
  });

  @override
  State<FlowInlineEditable> createState() => _FlowInlineEditableState();
}

class _FlowInlineEditableState extends State<FlowInlineEditable> {
  bool _editing = false;
  late TextEditingController _controller;

  @override
  void initState() {
    super.initState();
    _controller = TextEditingController(text: widget.value);
  }

  @override
  void didUpdateWidget(FlowInlineEditable old) {
    super.didUpdateWidget(old);
    if (!_editing && old.value != widget.value) _controller.text = widget.value;
  }

  void _commit() {
    setState(() => _editing = false);
    widget.onChanged(_controller.text);
  }

  @override
  Widget build(BuildContext context) {
    final tokens = context.flowTokens;
    final density = FlowDensityProvider.of(context);
    final baseStyle = widget.textStyle ?? TextStyle(
      fontSize: density.fontSize(FlowSize.md),
      fontFamily: FlowRefVoice.familySans,
      color: tokens.textPrimary,
    );

    if (_editing) {
      return TextField(
        controller: _controller,
        autofocus: true,
        style: baseStyle,
        onSubmitted: (_) => _commit(),
        decoration: InputDecoration(
          isDense: true, contentPadding: EdgeInsets.zero,
          border: UnderlineInputBorder(borderSide: BorderSide(color: tokens.borderFocus, width: 2)),
          enabledBorder: UnderlineInputBorder(borderSide: BorderSide(color: tokens.borderFocus, width: 2)),
          focusedBorder: UnderlineInputBorder(borderSide: BorderSide(color: tokens.borderFocus, width: 2)),
        ),
      );
    }

    final isEmpty = widget.value.isEmpty;
    return GestureDetector(
      onTap: widget.disabled ? null : () {
        _controller.text = widget.value;
        setState(() => _editing = true);
      },
      child: Container(
        decoration: BoxDecoration(
          border: widget.disabled ? null : Border(
            bottom: BorderSide(color: tokens.borderDefault, width: 1),
          ),
        ),
        child: Text(
          isEmpty ? widget.placeholder : widget.value,
          style: baseStyle.copyWith(color: isEmpty ? tokens.textTertiary : baseStyle.color),
        ),
      ),
    );
  }

  @override
  void dispose() { _controller.dispose(); super.dispose(); }
}
`;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FILE 68: lib/flow/components/flow_inline_validation.dart
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const flowInlineValidationDart = `
import 'package:flutter/material.dart';
import '../tokens/ref_tokens.dart';
import '../tokens/sys_tokens.dart';
import '../flow_density.dart';

enum FlowValidationVariant { error, success, warning, info }

/// FlowInlineValidationMessage — error/success/info helper text.
class FlowInlineValidationMessage extends StatelessWidget {
  final String message;
  final FlowValidationVariant variant;
  final bool showIcon;

  const FlowInlineValidationMessage({
    super.key, required this.message,
    this.variant = FlowValidationVariant.error, this.showIcon = true,
  });

  IconData get _icon {
    switch (variant) {
      case FlowValidationVariant.error: return Icons.error_outline;
      case FlowValidationVariant.success: return Icons.check_circle_outline;
      case FlowValidationVariant.warning: return Icons.warning_amber;
      case FlowValidationVariant.info: return Icons.info_outline;
    }
  }

  Color _color(FlowSysTokens tokens) {
    switch (variant) {
      case FlowValidationVariant.error: return tokens.statusError;
      case FlowValidationVariant.success: return tokens.statusSuccess;
      case FlowValidationVariant.warning: return tokens.statusWarning;
      case FlowValidationVariant.info: return tokens.statusInfo;
    }
  }

  @override
  Widget build(BuildContext context) {
    final tokens = context.flowTokens;
    final density = FlowDensityProvider.of(context);
    final color = _color(tokens);

    return Row(mainAxisSize: MainAxisSize.min, children: [
      if (showIcon) ...[
        Icon(_icon, size: 14, color: color),
        SizedBox(width: FlowRefFrame.space1),
      ],
      Flexible(child: Text(message, style: TextStyle(
        fontSize: density.labelFontSize(FlowSize.sm),
        fontFamily: FlowRefVoice.familySans, color: color,
      ))),
    ]);
  }
}
`;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FILE 69: lib/flow/components/flow_hover_card.dart
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const flowHoverCardDart = `
import 'package:flutter/material.dart';
import '../tokens/ref_tokens.dart';
import '../tokens/sys_tokens.dart';

/// FlowHoverCard — rich content tooltip. Hover on desktop, long-press on mobile.
class FlowHoverCard extends StatefulWidget {
  final Widget trigger;
  final Widget content;
  final double maxWidth;

  const FlowHoverCard({
    super.key, required this.trigger, required this.content, this.maxWidth = 320,
  });

  @override
  State<FlowHoverCard> createState() => _FlowHoverCardState();
}

class _FlowHoverCardState extends State<FlowHoverCard> {
  OverlayEntry? _entry;
  final _key = GlobalKey();

  void _show() {
    final box = _key.currentContext?.findRenderObject() as RenderBox?;
    if (box == null) return;
    final offset = box.localToGlobal(Offset(box.size.width / 2, box.size.height));
    final tokens = context.flowTokens;

    _entry = OverlayEntry(builder: (_) => Positioned(
      left: (offset.dx - widget.maxWidth / 2).clamp(8.0, MediaQuery.of(context).size.width - widget.maxWidth - 8),
      top: offset.dy + FlowRefFrame.space2,
      child: Material(
        color: Colors.transparent,
        child: Container(
          constraints: BoxConstraints(maxWidth: widget.maxWidth, minWidth: 200),
          padding: EdgeInsets.all(FlowRefFrame.space4),
          decoration: BoxDecoration(
            color: tokens.surfacePrimary,
            border: Border.all(color: tokens.borderDefault),
            borderRadius: BorderRadius.circular(FlowRefFrame.radius3),
            boxShadow: tokens.elevation2,
          ),
          child: widget.content,
        ),
      ),
    ));
    Overlay.of(context).insert(_entry!);
  }

  void _hide() { _entry?.remove(); _entry = null; }

  @override
  void dispose() { _hide(); super.dispose(); }

  @override
  Widget build(BuildContext context) {
    return MouseRegion(
      onEnter: (_) => _show(),
      onExit: (_) => _hide(),
      child: GestureDetector(
        key: _key,
        onLongPress: _show,
        onLongPressUp: _hide,
        child: widget.trigger,
      ),
    );
  }
}
`;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FILE 70: lib/flow/components/flow_timeline.dart
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const flowTimelineDart = `
import 'package:flutter/material.dart';
import '../tokens/ref_tokens.dart';
import '../tokens/sys_tokens.dart';
import '../flow_density.dart';

enum FlowTimelineVariant { default_, success, warning, error, info }

class FlowTimelineItem {
  final String id;
  final String title;
  final String? description;
  final String? timestamp;
  final FlowTimelineVariant variant;
  const FlowTimelineItem({
    required this.id, required this.title,
    this.description, this.timestamp,
    this.variant = FlowTimelineVariant.default_,
  });
}

/// FlowTimeline — vertical event timeline.
class FlowTimeline extends StatelessWidget {
  final List<FlowTimelineItem> items;
  const FlowTimeline({super.key, required this.items});

  Color _dotColor(FlowSysTokens tokens, FlowTimelineVariant v) {
    switch (v) {
      case FlowTimelineVariant.default_: return tokens.textTertiary;
      case FlowTimelineVariant.success: return tokens.statusSuccess;
      case FlowTimelineVariant.warning: return tokens.statusWarning;
      case FlowTimelineVariant.error: return tokens.statusError;
      case FlowTimelineVariant.info: return tokens.statusInfo;
    }
  }

  @override
  Widget build(BuildContext context) {
    final tokens = context.flowTokens;
    final density = FlowDensityProvider.of(context);

    return Column(mainAxisSize: MainAxisSize.min, children: List.generate(items.length, (i) {
      final item = items[i];
      final isLast = i == items.length - 1;
      final color = _dotColor(tokens, item.variant);

      return IntrinsicHeight(child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          SizedBox(width: 24, child: Column(children: [
            SizedBox(height: 4),
            Container(width: 10, height: 10, decoration: BoxDecoration(shape: BoxShape.circle, color: color)),
            if (!isLast) Expanded(child: Container(
              width: 2, color: tokens.borderDefault,
              margin: EdgeInsets.only(top: FlowRefFrame.space1),
            )),
          ])),
          SizedBox(width: FlowRefFrame.space3),
          Expanded(child: Padding(
            padding: EdgeInsets.only(bottom: isLast ? 0 : FlowRefFrame.space5, top: 1),
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              Text(item.title, style: TextStyle(
                fontSize: density.fontSize(FlowSize.sm),
                fontWeight: FlowRefVoice.weightMedium, color: tokens.textPrimary,
              )),
              if (item.description != null) ...[
                SizedBox(height: FlowRefFrame.space1),
                Text(item.description!, style: TextStyle(
                  fontSize: density.labelFontSize(FlowSize.sm), color: tokens.textSecondary,
                )),
              ],
              if (item.timestamp != null) ...[
                SizedBox(height: FlowRefFrame.space1),
                Text(item.timestamp!, style: TextStyle(
                  fontSize: density.labelFontSize(FlowSize.sm),
                  fontFamily: FlowRefVoice.familyMono, color: tokens.textSecondary,
                )),
              ],
            ]),
          )),
        ],
      ));
    }));
  }
}
`;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FILE 71: lib/flow/components/flow_section_header.dart
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const flowSectionHeaderDart = `
import 'package:flutter/material.dart';
import '../tokens/ref_tokens.dart';
import '../tokens/sys_tokens.dart';
import '../flow_density.dart';

/// FlowSectionHeader — generic section header with action slot.
class FlowSectionHeader extends StatelessWidget {
  final String title;
  final String? subtitle;
  final Widget? action;
  final bool divider;

  const FlowSectionHeader({
    super.key, required this.title, this.subtitle, this.action, this.divider = true,
  });

  @override
  Widget build(BuildContext context) {
    final tokens = context.flowTokens;
    final density = FlowDensityProvider.of(context);

    return Column(crossAxisAlignment: CrossAxisAlignment.start, mainAxisSize: MainAxisSize.min, children: [
      Row(crossAxisAlignment: CrossAxisAlignment.end, children: [
        Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Text(title, style: TextStyle(
            fontSize: density.fontSize(FlowSize.lg),
            fontWeight: FlowRefVoice.weightSemibold, color: tokens.textPrimary,
          )),
          if (subtitle != null) ...[
            SizedBox(height: FlowRefFrame.space1),
            Text(subtitle!, style: TextStyle(
              fontSize: density.labelFontSize(FlowSize.sm), color: tokens.textSecondary,
            )),
          ],
        ])),
        if (action != null) action!,
      ]),
      if (divider) ...[
        SizedBox(height: FlowRefFrame.space2),
        Container(height: 1, color: tokens.borderDefault),
      ],
    ]);
  }
}
`;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FILE 72: lib/flow/components/flow_filter_chip_group.dart
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const flowFilterChipGroupDart = `
import 'package:flutter/material.dart';
import '../tokens/ref_tokens.dart';
import '../tokens/sys_tokens.dart';
import '../flow_density.dart';

class FlowFilterChip {
  final String id;
  final String label;
  final int? count;
  const FlowFilterChip({required this.id, required this.label, this.count});
}

/// FlowFilterChipGroup — toggleable filter chips.
class FlowFilterChipGroup extends StatelessWidget {
  final List<FlowFilterChip> chips;
  final Set<String> selected;
  final ValueChanged<Set<String>> onSelectionChanged;
  final bool exclusive;

  const FlowFilterChipGroup({
    super.key, required this.chips, required this.selected,
    required this.onSelectionChanged, this.exclusive = false,
  });

  void _toggle(String id) {
    if (exclusive) {
      onSelectionChanged(selected.contains(id) ? {} : {id});
    } else {
      final next = Set<String>.from(selected);
      if (next.contains(id)) next.remove(id); else next.add(id);
      onSelectionChanged(next);
    }
  }

  @override
  Widget build(BuildContext context) {
    final tokens = context.flowTokens;
    final density = FlowDensityProvider.of(context);

    return Wrap(spacing: FlowRefFrame.space2, runSpacing: FlowRefFrame.space2,
      children: chips.map((chip) {
        final isSel = selected.contains(chip.id);
        return GestureDetector(
          onTap: () => _toggle(chip.id),
          child: AnimatedContainer(
            duration: FlowRefMomentum.durationFast,
            height: density.controlHeight(FlowSize.sm),
            padding: EdgeInsets.symmetric(horizontal: FlowRefFrame.space3),
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(FlowRefFrame.radiusFull),
              border: Border.all(color: isSel ? tokens.borderFocus : tokens.borderDefault),
              color: isSel ? tokens.surfaceInteractive : Colors.transparent,
            ),
            child: Row(mainAxisSize: MainAxisSize.min, children: [
              if (isSel) ...[Icon(Icons.check, size: 12, color: tokens.textAccent), SizedBox(width: FlowRefFrame.space1)],
              Text(chip.label, style: TextStyle(
                fontSize: density.labelFontSize(FlowSize.sm),
                fontWeight: isSel ? FlowRefVoice.weightMedium : FlowRefVoice.weightRegular,
                fontFamily: FlowRefVoice.familySans,
                color: isSel ? tokens.textAccent : tokens.textPrimary,
              )),
              if (chip.count != null) ...[
                SizedBox(width: FlowRefFrame.space1),
                Text('\${chip.count}', style: TextStyle(
                  fontSize: density.labelFontSize(FlowSize.xs), color: tokens.textTertiary,
                )),
              ],
            ]),
          ),
        );
      }).toList(),
    );
  }
}
`;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FILE 73: lib/flow/components/flow_sort_control.dart
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const flowSortControlDart = `
import 'package:flutter/material.dart';
import '../tokens/ref_tokens.dart';
import '../tokens/sys_tokens.dart';
import '../flow_density.dart';

class FlowSortOption {
  final String key;
  final String label;
  const FlowSortOption({required this.key, required this.label});
}

enum FlowSortDirection { asc, desc }

/// FlowSortControl — column sort toggle.
class FlowSortControl extends StatelessWidget {
  final List<FlowSortOption> options;
  final String? sortKey;
  final FlowSortDirection? sortDirection;
  final void Function(String key, FlowSortDirection? direction) onSortChanged;

  const FlowSortControl({
    super.key, required this.options, this.sortKey, this.sortDirection,
    required this.onSortChanged,
  });

  void _cycle(String key) {
    if (sortKey != key) onSortChanged(key, FlowSortDirection.asc);
    else if (sortDirection == FlowSortDirection.asc) onSortChanged(key, FlowSortDirection.desc);
    else onSortChanged(key, null);
  }

  @override
  Widget build(BuildContext context) {
    final tokens = context.flowTokens;
    final density = FlowDensityProvider.of(context);

    return Row(mainAxisSize: MainAxisSize.min, children: [
      Text('Sort by:', style: TextStyle(
        fontSize: density.labelFontSize(FlowSize.sm), color: tokens.textSecondary,
      )),
      SizedBox(width: FlowRefFrame.space1),
      ...options.map((opt) {
        final isActive = sortKey == opt.key;
        return Padding(
          padding: EdgeInsets.only(right: FlowRefFrame.space1),
          child: GestureDetector(
            onTap: () => _cycle(opt.key),
            child: Container(
              padding: EdgeInsets.symmetric(horizontal: FlowRefFrame.space2, vertical: FlowRefFrame.space1),
              decoration: BoxDecoration(
                color: isActive ? tokens.surfaceInteractive : Colors.transparent,
                borderRadius: BorderRadius.circular(FlowRefFrame.radius1),
              ),
              child: Row(mainAxisSize: MainAxisSize.min, children: [
                Text(opt.label, style: TextStyle(
                  fontSize: density.labelFontSize(FlowSize.sm),
                  fontWeight: isActive ? FlowRefVoice.weightMedium : FlowRefVoice.weightRegular,
                  fontFamily: FlowRefVoice.familySans,
                  color: isActive ? tokens.textAccent : tokens.textSecondary,
                )),
                if (isActive && sortDirection != null) ...[
                  SizedBox(width: 2),
                  Icon(sortDirection == FlowSortDirection.asc ? Icons.arrow_upward : Icons.arrow_downward,
                    size: 12, color: tokens.textAccent),
                ],
              ]),
            ),
          ),
        );
      }),
    ]);
  }
}
`;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FILE 74: lib/flow/components/flow_column_configurator.dart
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const flowColumnConfiguratorDart = `
import 'package:flutter/material.dart';
import '../tokens/ref_tokens.dart';
import '../tokens/sys_tokens.dart';
import '../flow_density.dart';

class FlowColumnConfig {
  final String key;
  final String label;
  final bool visible;
  const FlowColumnConfig({required this.key, required this.label, required this.visible});
  FlowColumnConfig copyWith({bool? visible}) =>
    FlowColumnConfig(key: key, label: label, visible: visible ?? this.visible);
}

/// FlowColumnConfigurator — show/hide/reorder table columns via bottom sheet.
class FlowColumnConfigurator extends StatelessWidget {
  final List<FlowColumnConfig> columns;
  final ValueChanged<List<FlowColumnConfig>> onColumnsChanged;

  const FlowColumnConfigurator({
    super.key, required this.columns, required this.onColumnsChanged,
  });

  void _toggle(int idx) {
    final next = List<FlowColumnConfig>.from(columns);
    next[idx] = next[idx].copyWith(visible: !next[idx].visible);
    onColumnsChanged(next);
  }

  void _moveUp(int idx) {
    if (idx <= 0) return;
    final next = List<FlowColumnConfig>.from(columns);
    final t = next[idx - 1]; next[idx - 1] = next[idx]; next[idx] = t;
    onColumnsChanged(next);
  }

  void _moveDown(int idx) {
    if (idx >= columns.length - 1) return;
    final next = List<FlowColumnConfig>.from(columns);
    final t = next[idx]; next[idx] = next[idx + 1]; next[idx + 1] = t;
    onColumnsChanged(next);
  }

  void _showPanel(BuildContext context) {
    final tokens = context.flowTokens;
    final density = FlowDensityProvider.of(context);

    showModalBottomSheet(
      context: context,
      backgroundColor: tokens.surfacePrimary,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(FlowRefFrame.radius3)),
      ),
      builder: (ctx) => StatefulBuilder(builder: (ctx, setSheetState) {
        return Padding(
          padding: EdgeInsets.all(FlowRefFrame.space4),
          child: Column(mainAxisSize: MainAxisSize.min, crossAxisAlignment: CrossAxisAlignment.start, children: [
            Text('Configure Columns', style: TextStyle(
              fontSize: density.fontSize(FlowSize.md),
              fontWeight: FlowRefVoice.weightSemibold, color: tokens.textPrimary,
            )),
            SizedBox(height: FlowRefFrame.space3),
            ...List.generate(columns.length, (i) {
              final col = columns[i];
              return Padding(
                padding: EdgeInsets.only(bottom: FlowRefFrame.space2),
                child: Row(children: [
                  SizedBox(width: 24, height: 24, child: Checkbox(
                    value: col.visible,
                    onChanged: (_) { _toggle(i); setSheetState(() {}); },
                    activeColor: tokens.actionPrimary,
                  )),
                  SizedBox(width: FlowRefFrame.space2),
                  Expanded(child: Text(col.label, style: TextStyle(
                    fontSize: density.fontSize(FlowSize.md),
                    color: col.visible ? tokens.textPrimary : tokens.textTertiary,
                  ))),
                  IconButton(
                    onPressed: i > 0 ? () { _moveUp(i); setSheetState(() {}); } : null,
                    icon: Icon(Icons.keyboard_arrow_up, size: 16),
                    iconSize: 16, splashRadius: 16, color: tokens.textTertiary,
                  ),
                  IconButton(
                    onPressed: i < columns.length - 1 ? () { _moveDown(i); setSheetState(() {}); } : null,
                    icon: Icon(Icons.keyboard_arrow_down, size: 16),
                    iconSize: 16, splashRadius: 16, color: tokens.textTertiary,
                  ),
                ]),
              );
            }),
          ]),
        );
      }),
    );
  }

  @override
  Widget build(BuildContext context) {
    final tokens = context.flowTokens;
    final density = FlowDensityProvider.of(context);

    return GestureDetector(
      onTap: () => _showPanel(context),
      child: Container(
        padding: EdgeInsets.symmetric(horizontal: FlowRefFrame.space3, vertical: FlowRefFrame.space1),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(FlowRefFrame.radius2),
          border: Border.all(color: tokens.borderDefault),
        ),
        child: Row(mainAxisSize: MainAxisSize.min, children: [
          Icon(Icons.view_column, size: 14, color: tokens.textSecondary),
          SizedBox(width: FlowRefFrame.space1),
          Text('Columns', style: TextStyle(
            fontSize: density.labelFontSize(FlowSize.sm),
            fontFamily: FlowRefVoice.familySans, color: tokens.textSecondary,
          )),
        ]),
      ),
    );
  }
}
`;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FILE 75: lib/flow/components/flow_confirmation_dialog.dart
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const flowConfirmationDialogDart = `
import 'package:flutter/material.dart';
import '../tokens/ref_tokens.dart';
import '../tokens/sys_tokens.dart';
import '../flow_density.dart';

enum FlowConfirmVariant { default_, danger }

/// FlowConfirmationDialog — purpose-built confirm/cancel dialog.
class FlowConfirmationDialog extends StatelessWidget {
  final String title;
  final String message;
  final String confirmLabel;
  final String cancelLabel;
  final FlowConfirmVariant variant;
  final bool loading;
  final VoidCallback onConfirm;
  final VoidCallback onCancel;

  const FlowConfirmationDialog({
    super.key, required this.title, required this.message,
    this.confirmLabel = 'Confirm', this.cancelLabel = 'Cancel',
    this.variant = FlowConfirmVariant.default_, this.loading = false,
    required this.onConfirm, required this.onCancel,
  });

  static Future<bool?> show(BuildContext context, {
    required String title, required String message,
    String confirmLabel = 'Confirm', String cancelLabel = 'Cancel',
    FlowConfirmVariant variant = FlowConfirmVariant.default_,
  }) {
    return showDialog<bool>(
      context: context, barrierColor: Colors.black54,
      builder: (_) => FlowConfirmationDialog(
        title: title, message: message,
        confirmLabel: confirmLabel, cancelLabel: cancelLabel, variant: variant,
        onConfirm: () => Navigator.pop(context, true),
        onCancel: () => Navigator.pop(context, false),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final tokens = context.flowTokens;
    final density = FlowDensityProvider.of(context);
    final confirmBg = variant == FlowConfirmVariant.danger ? tokens.statusError : tokens.actionPrimary;

    return Dialog(
      backgroundColor: tokens.surfacePrimary,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(FlowRefFrame.radius4)),
      elevation: 0,
      child: Container(
        constraints: BoxConstraints(maxWidth: 400),
        padding: EdgeInsets.all(FlowRefFrame.space6),
        child: Column(mainAxisSize: MainAxisSize.min, crossAxisAlignment: CrossAxisAlignment.start, children: [
          Text(title, style: TextStyle(
            fontSize: density.fontSize(FlowSize.lg),
            fontWeight: FlowRefVoice.weightSemibold, color: tokens.textPrimary,
          )),
          SizedBox(height: FlowRefFrame.space2),
          Text(message, style: TextStyle(
            fontSize: density.fontSize(FlowSize.md), color: tokens.textSecondary, height: 1.5,
          )),
          SizedBox(height: FlowRefFrame.space6),
          Row(mainAxisAlignment: MainAxisAlignment.end, children: [
            GestureDetector(
              onTap: onCancel,
              child: Container(
                height: density.controlHeight(FlowSize.md),
                padding: EdgeInsets.symmetric(horizontal: FlowRefFrame.space5),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(FlowRefFrame.radius2),
                  border: Border.all(color: tokens.borderDefault),
                ),
                alignment: Alignment.center,
                child: Text(cancelLabel, style: TextStyle(
                  fontSize: density.fontSize(FlowSize.md), color: tokens.textPrimary,
                  fontFamily: FlowRefVoice.familySans,
                )),
              ),
            ),
            SizedBox(width: FlowRefFrame.space2),
            GestureDetector(
              onTap: loading ? null : onConfirm,
              child: Opacity(
                opacity: loading ? 0.6 : 1.0,
                child: Container(
                  height: density.controlHeight(FlowSize.md),
                  padding: EdgeInsets.symmetric(horizontal: FlowRefFrame.space5),
                  decoration: BoxDecoration(
                    color: confirmBg,
                    borderRadius: BorderRadius.circular(FlowRefFrame.radius2),
                  ),
                  alignment: Alignment.center,
                  child: Text(loading ? '...' : confirmLabel, style: TextStyle(
                    fontSize: density.fontSize(FlowSize.md),
                    fontWeight: FlowRefVoice.weightMedium,
                    color: tokens.textInverse, fontFamily: FlowRefVoice.familySans,
                  )),
                ),
              ),
            ),
          ]),
        ]),
      ),
    );
  }
}
`;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FILE 76: lib/flow/components/flow_kpi_trend_indicator.dart
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const flowKPITrendIndicatorDart = `
import 'package:flutter/material.dart';
import '../tokens/ref_tokens.dart';
import '../tokens/sys_tokens.dart';
import '../flow_density.dart';

enum FlowTrendDirection { up, down, neutral }

/// FlowKPITrendIndicator — inline trend arrow + value.
class FlowKPITrendIndicator extends StatelessWidget {
  final String value;
  final FlowTrendDirection direction;
  final bool upIsGood;
  final String? label;

  const FlowKPITrendIndicator({
    super.key, required this.value,
    this.direction = FlowTrendDirection.neutral, this.upIsGood = true, this.label,
  });

  @override
  Widget build(BuildContext context) {
    final tokens = context.flowTokens;
    final density = FlowDensityProvider.of(context);
    final isPositive = direction == FlowTrendDirection.up ? upIsGood
        : direction == FlowTrendDirection.down ? !upIsGood : true;
    final color = direction == FlowTrendDirection.neutral
        ? tokens.textSecondary
        : isPositive ? tokens.statusSuccess : tokens.statusError;
    final icon = direction == FlowTrendDirection.up ? Icons.trending_up
        : direction == FlowTrendDirection.down ? Icons.trending_down : Icons.remove;

    return Row(mainAxisSize: MainAxisSize.min, children: [
      Icon(icon, size: 14, color: color),
      SizedBox(width: FlowRefFrame.space1),
      Text(value, style: TextStyle(
        fontSize: density.labelFontSize(FlowSize.sm),
        fontWeight: FlowRefVoice.weightMedium,
        fontFamily: FlowRefVoice.familySans, color: color,
      )),
      if (label != null) ...[
        SizedBox(width: FlowRefFrame.space1),
        Text(label!, style: TextStyle(
          fontSize: density.labelFontSize(FlowSize.sm), color: tokens.textTertiary,
        )),
      ],
    ]);
  }
}
`;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FILE 77: lib/flow/components/flow_chart_wrapper.dart
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const flowChartWrapperDart = `
import 'package:flutter/material.dart';
import '../tokens/ref_tokens.dart';
import '../tokens/sys_tokens.dart';
import '../flow_density.dart';

/// FlowChartWrapper — container for chart content with title, subtitle,
/// legend slot, loading/empty states.
class FlowChartWrapper extends StatelessWidget {
  final String? title;
  final String? subtitle;
  final Widget? legend;
  final Widget? actions;
  final Widget child;
  final double height;
  final bool loading;
  final bool empty;
  final String emptyMessage;

  const FlowChartWrapper({
    super.key, this.title, this.subtitle, this.legend, this.actions,
    required this.child, this.height = 300,
    this.loading = false, this.empty = false, this.emptyMessage = 'No data available',
  });

  @override
  Widget build(BuildContext context) {
    final tokens = context.flowTokens;
    final density = FlowDensityProvider.of(context);

    return Container(
      padding: EdgeInsets.all(FlowRefFrame.space5),
      decoration: BoxDecoration(
        color: tokens.surfacePrimary,
        border: Border.all(color: tokens.borderDefault),
        borderRadius: BorderRadius.circular(FlowRefFrame.radius3),
      ),
      child: Column(crossAxisAlignment: CrossAxisAlignment.start, mainAxisSize: MainAxisSize.min, children: [
        if (title != null || actions != null) ...[
          Row(children: [
            if (title != null) Expanded(child: Column(
              crossAxisAlignment: CrossAxisAlignment.start, children: [
                Text(title!, style: TextStyle(
                  fontSize: density.fontSize(FlowSize.md),
                  fontWeight: FlowRefVoice.weightSemibold, color: tokens.textPrimary,
                )),
                if (subtitle != null) ...[
                  SizedBox(height: FlowRefFrame.space1),
                  Text(subtitle!, style: TextStyle(
                    fontSize: density.labelFontSize(FlowSize.sm), color: tokens.textSecondary,
                  )),
                ],
              ],
            )),
            if (actions != null) actions!,
          ]),
          SizedBox(height: FlowRefFrame.space3),
        ],
        SizedBox(
          height: height,
          child: loading
            ? Center(child: CircularProgressIndicator(color: tokens.actionPrimary, strokeWidth: 2))
            : empty
              ? Center(child: Column(mainAxisSize: MainAxisSize.min, children: [
                  Icon(Icons.bar_chart, size: 32, color: tokens.textTertiary),
                  SizedBox(height: FlowRefFrame.space2),
                  Text(emptyMessage, style: TextStyle(
                    fontSize: density.fontSize(FlowSize.md), color: tokens.textSecondary,
                  )),
                ]))
              : child,
        ),
        if (legend != null) ...[SizedBox(height: FlowRefFrame.space3), legend!],
      ]),
    );
  }
}
`;

/**
 * Complete Flutter file manifest (updated):
 *
 * lib/flow/
 * ├── tokens/
 * │   ├── ref_tokens.dart          ← Raw ref scales
 * │   ├── sys_tokens.dart          ← ThemeExtension with light/dark
 * │   └── comp_tokens.dart         ← Component-scoped ThemeExtension
 * ├── primitives/
 * │   ├── flow_surface.dart        ← Container primitive
 * │   ├── flow_text.dart           ← Typography primitive
 * │   ├── flow_stack.dart          ← Stack + Inline layout primitives
 * │   ├── flow_grid.dart           ← Grid layout primitive
 * │   ├── flow_divider.dart        ← Divider primitive
 * │   ├── flow_action_surface.dart ← Interactive surface with StateLayer
 * │   ├── flow_overlay.dart        ← Modal dimming primitive
 * │   ├── flow_form_field.dart     ← Form layout primitive
 * │   ├── flow_motion_container.dart ← Enter/exit animation primitive
 * │   ├── flow_growth_observer.dart  ← Instrumentation primitive
 * │   ├── flow_icon.dart           ← Iconography primitive + FlowIcons registry
 * │   ├── flow_theme_toggle.dart   ← Theme switching utility widget
 * │   └── flow_layout_grid.dart   ← Responsive 12/6/1 column grid
 * ├── components/
 * │   ├── flow_button.dart         ← Button (7v, 3s, loading)
 * │   ├── flow_icon_button.dart    ← IconButton (7 emphasis, 4 sizes, selected)
 * │   ├── flow_text_input.dart     ← TextInput (floating label, error, success)
 * │   ├── flow_text_area.dart      ← TextArea (multi-line, counter, resize)
 * │   ├── flow_card.dart           ← Card (3 variants, interactive)
 * │   ├── flow_chip.dart           ← Chip (4 variants, 5 statuses)
 * │   ├── flow_dialog.dart         ← Dialog (alert, confirm, form)
 * │   ├── flow_checkbox.dart       ← Checkbox (check, indeterminate, label)
 * │   ├── flow_radio.dart          ← Radio + RadioGroup (exclusive selection)
 * │   ├── flow_switch.dart         ← Switch (toggle, label)
 * │   ├── flow_slider.dart         ← Slider (single value, label, marks)
 * │   ├── flow_select.dart         ← Select (dropdown, label, error)
 * │   ├── flow_autocomplete.dart   ← Autocomplete (search, suggestions)
 * │   ├── flow_tooltip.dart        ← Tooltip (hover/focus info)
 * │   ├── flow_snackbar.dart       ← Snackbar (4 variants, action)
 * │   ├── flow_progress_bar.dart   ← ProgressBar (determinate/indeterminate)
 * │   ├── flow_circular_progress.dart ← CircularProgress (determinate/indeterminate)
 * │   ├── flow_skeleton.dart       ← Skeleton (text, circle, rect, card)
 * │   ├── flow_empty_state.dart    ← EmptyState (icon, title, desc, action)
 * │   ├── flow_avatar.dart         ← Avatar (image, initials, status)
 * │   ├── flow_badge.dart          ← Badge (dot, count, label)
 * │   ├── flow_list.dart           ← List + ListItem (leading/trailing slots)
 * │   ├── flow_tabs.dart           ← Tabs (line, icon, disabled)
 * │   ├── flow_accordion.dart      ← Accordion (single/multi expand)
 * │   ├── flow_segmented_control.dart ← SegmentedControl (exclusive select)
 * │   ├── flow_breadcrumbs.dart    ← Breadcrumbs (nav trail)
 * │   ├── flow_pagination.dart     ← Pagination (page nav)
 * │   ├── flow_stepper.dart        ← Stepper (multi-step wizard)
 * │   ├── flow_bottom_nav.dart     ← BottomNav (mobile nav bar)
 * │   ├── flow_bottom_sheet.dart   ← BottomSheet (modal from bottom)
 * │   ├── flow_fab.dart            ← FAB (floating action button)
 * │   ├── flow_sidebar.dart        ← Sidebar (desktop collapsible nav)
 * │   ├── flow_topbar.dart         ← Topbar (desktop app bar)
 * │   ├── flow_search.dart         ← Search (pill-shaped input)
 * │   ├── flow_menu.dart           ← Menu + ContextMenu items
 * │   ├── flow_context_menu.dart   ← ContextMenu (right-click wrapper)
 * │   ├── flow_toggle_button.dart  ← ToggleButton + ToggleButtonGroup
 * │   ├── flow_toolbar.dart        ← Toolbar + Divider + Spacer
 * │   ├── flow_popover.dart        ← Popover (floating panel)
 * │   ├── flow_pull_to_refresh.dart ← PullToRefresh (gesture wrapper)
 * │   ├── flow_swipe_actions.dart  ← SwipeActions (swipeable list item)
 * │   ├── flow_data_table.dart     ← DataTable (sort + filter + paginate + select)
 * │   ├── flow_drawer_adapter.dart ← DrawerAdapter (responsive: sidebar ↔ overlay)
 * │   ├── flow_fullscreen_sheet.dart ← FullscreenSheet (full-page mobile modal)
 * │   ├── flow_quick_actions.dart  ← QuickActions (iOS-style action sheet)
 * │   ├── flow_advanced_filters.dart ← AdvancedFilters (multi-criteria filter)
 * │   ├── flow_date_picker.dart   ← DatePicker (calendar trigger + dialog)
 * │   ├── flow_otp_input.dart     ← OTPInput (multi-digit code entry)
 * │   ├── flow_kpi_card.dart      ← KPICard (metric + trend indicator)
 * │   ├── flow_fieldset.dart      ← Fieldset (grouped form controls with legend)
 * │   ├── flow_form_section.dart  ← FormSection (collapsible section + fields)
 * │   ├── flow_inline_editable.dart ← InlineEditable (tap-to-edit text)
 * │   ├── flow_inline_validation.dart ← InlineValidationMessage (error/success/info)
 * │   ├── flow_hover_card.dart    ← HoverCard (rich content tooltip)
 * │   ├── flow_timeline.dart      ← Timeline (vertical event timeline)
 * │   ├── flow_section_header.dart ← SectionHeader (title + action + divider)
 * │   ├── flow_filter_chip_group.dart ← FilterChipGroup (toggleable filters)
 * │   ├── flow_sort_control.dart  ← SortControl (column sort toggle)
 * │   ├── flow_column_configurator.dart ← ColumnConfigurator (show/hide/reorder)
 * │   ├── flow_confirmation_dialog.dart ← ConfirmationDialog (confirm/cancel)
 * │   ├── flow_kpi_trend_indicator.dart ← KPITrendIndicator (trend arrow + value)
 * │   └── flow_chart_wrapper.dart ← ChartWrapper (chart container + states)
 * ├── flow_density.dart             ← Density + Size provider (InheritedWidget)
 * └── flow_theme.dart               ← Theme provider
 */
export const flutterManifest = {
  totalFiles: 81,
  tokens: 3,
  primitives: 13,
  components: 62,
  densityProvider: 1,
  theme: 1,
  parityWithReact: {
    refTokens: "1:1 — identical values, Dart syntax. FlowRefFrame includes grid/breakpoint/density constants.",
    sysTokens: "1:1 — ThemeExtension replaces CSS :root",
    compTokens: "1:1 — FlowCompTokens ThemeExtension closes ref→sys→comp chain, canonical source in tokens.ts",
    primitives: "1:1 — all 13 React primitives have Widget equivalents",
    components: "1:1 — 62 component widgets matching React: Button, IconButton, TextInput, TextArea, Card, Chip, Dialog, Checkbox, Radio/RadioGroup, Switch, Slider, Select, Autocomplete, Tooltip, Snackbar, ProgressBar, CircularProgress, Skeleton, EmptyState, Avatar, Badge, List/ListItem, Tabs, Accordion, SegmentedControl, Breadcrumbs, Pagination, Stepper, BottomNav, BottomSheet, FAB, Sidebar, Topbar, Search, Menu, ContextMenu, Popover, ToggleButton/Group, Toolbar, PullToRefresh, SwipeActions, DrawerAdapter, FullscreenSheet, DataTable, DatePicker, OTPInput, KPICard, QuickActions, AdvancedFilters, Fieldset, FormSection, InlineEditable, InlineValidationMessage, HoverCard, Timeline, SectionHeader, FilterChipGroup, SortControl, ColumnConfigurator, ConfirmationDialog, KPITrendIndicator, ChartWrapper",
    theming: "1:1 — FlowTheme.light/dark with FlowSysTokens + FlowCompTokens extensions",
  },
};