/// FLOW Design System — Reference Tokens (Layer 1)
///
/// Raw, unaliased values. The ONLY place absolute values exist.
/// Generated from tokens.css :root block.
///
/// Architecture: ref → sys → comp
import 'dart:ui';

import 'package:flutter/animation.dart';
import 'package:flutter/painting.dart';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  1. FlowRefEnergy — Color palettes
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

abstract final class FlowRefEnergy {
  // ── neutral — Figma Edenred Slate palette ──
  static const Color neutral0 = Color(0xFFFFFFFF);
  static const Color neutralColdWhite = Color(0xFFF1F7FF);
  static const Color neutral50 = Color(0xFFF8FAFC);
  static const Color neutral100 = Color(0xFFF1F5F9);
  static const Color neutral150 = Color(0xFFE9EEF5);
  static const Color neutral200 = Color(0xFFE2E8F0);
  static const Color neutral300 = Color(0xFFCBD5E1);
  static const Color neutral400 = Color(0xFF94A3B8);
  static const Color neutral450 = Color(0xFF7B8DA0);
  static const Color neutral500 = Color(0xFF64748B);
  static const Color neutral550 = Color(0xFF56657A);
  static const Color neutral600 = Color(0xFF475569);
  static const Color neutral700 = Color(0xFF334155);
  static const Color neutral800 = Color(0xFF1E293B);
  static const Color neutral900 = Color(0xFF0F172A);
  static const Color neutral950 = Color(0xFF080E1B);

  // ── blue — Figma Edenred ──
  static const Color blue50 = Color(0xFFE0EEFF);
  static const Color blue100 = Color(0xFFC7DFFF);
  static const Color blue200 = Color(0xFF8ABCFF);
  static const Color blue300 = Color(0xFF529CFF);
  static const Color blue400 = Color(0xFF1A7CFF);
  static const Color blue500 = Color(0xFF0060DF);
  static const Color blue600 = Color(0xFF004DB3);
  static const Color blue700 = Color(0xFF003985);
  static const Color blue800 = Color(0xFF002557);
  static const Color blue900 = Color(0xFF00142E);

  // ── red — Figma Edenred ──
  static const Color red50 = Color(0xFFFFE3E0);
  static const Color redSubtleTint = Color(0xFFFFEEED);
  static const Color red100 = Color(0xFFFFC6C2);
  static const Color red200 = Color(0xFFFF8D85);
  static const Color red300 = Color(0xFFFF5447);
  static const Color red400 = Color(0xFFFF1B0A);
  static const Color red500 = Color(0xFFCA0E00);
  static const Color red600 = Color(0xFFA30B00);
  static const Color red700 = Color(0xFF7A0800);
  static const Color red800 = Color(0xFF520600);
  static const Color red900 = Color(0xFF290300);

  // ── green — Figma Edenred ──
  static const Color green50 = Color(0xFFE1F4EB);
  static const Color green100 = Color(0xFFC3EFDA);
  static const Color green200 = Color(0xFF79E6B4);
  static const Color green300 = Color(0xFF2EE590);
  static const Color green400 = Color(0xFF0DBA69);
  static const Color green500 = Color(0xFF007840);
  static const Color green600 = Color(0xFF065B33);
  static const Color green700 = Color(0xFF084026);
  static const Color green800 = Color(0xFF072718);
  static const Color green900 = Color(0xFF05140D);

  // ── orange — Figma Edenred ──
  static const Color orange50 = Color(0xFFFDEAE3);
  static const Color orange100 = Color(0xFFFBD5C6);
  static const Color orange200 = Color(0xFFF6AB8E);
  static const Color orange300 = Color(0xFFF28155);
  static const Color orange400 = Color(0xFFED571C);
  static const Color orange500 = Color(0xFFBF410F);
  static const Color orange600 = Color(0xFF97330C);
  static const Color orange700 = Color(0xFF712709);
  static const Color orange800 = Color(0xFF4C1A06);
  static const Color orange900 = Color(0xFF260D03);

  // ── purple ──
  static const Color purple50 = Color(0xFFF3EEFB);
  static const Color purple100 = Color(0xFFDDD2F3);
  static const Color purple200 = Color(0xFFC4B5E8);
  static const Color purple300 = Color(0xFFA88FDB);
  static const Color purple400 = Color(0xFF8D6DD1);
  static const Color purple500 = Color(0xFF6B4DC7);
  static const Color purple600 = Color(0xFF5A43A8);
  static const Color purple700 = Color(0xFF503A99);
  static const Color purple800 = Color(0xFF3A2B6E);
  static const Color purple900 = Color(0xFF241A42);

  // ── teal ──
  static const Color teal50 = Color(0xFFE8F7F7);
  static const Color teal100 = Color(0xFFC0EBEB);
  static const Color teal200 = Color(0xFF8BD9D9);
  static const Color teal300 = Color(0xFF52C4C4);
  static const Color teal400 = Color(0xFF1AAFAF);
  static const Color teal500 = Color(0xFF0A7A7A);
  static const Color teal600 = Color(0xFF096B6B);
  static const Color teal700 = Color(0xFF075C5C);
  static const Color teal800 = Color(0xFF053E3E);
  static const Color teal900 = Color(0xFF032121);

  // ── olive ──
  static const Color olive50 = Color(0xFFF5F3EC);
  static const Color olive100 = Color(0xFFE5DFC0);
  static const Color olive500 = Color(0xFF8A5A2A);
  static const Color olive700 = Color(0xFF68431F);

  // ── yellow ──
  static const Color yellow50 = Color(0xFFFFFBEB);
  static const Color yellow100 = Color(0xFFFEF3C7);
  static const Color yellow200 = Color(0xFFFDE68A);
  static const Color yellow300 = Color(0xFFFCD34D);
  static const Color yellow400 = Color(0xFFFBBF24);
  static const Color yellow500 = Color(0xFFF59E0B);
  static const Color yellow600 = Color(0xFFD97706);
  static const Color yellow700 = Color(0xFFB45309);
  static const Color yellow800 = Color(0xFF92400E);
  static const Color yellow900 = Color(0xFF78350F);

  // ── pink ──
  static const Color pink50 = Color(0xFFFDF2F8);
  static const Color pink100 = Color(0xFFFCE7F3);
  static const Color pink200 = Color(0xFFFBCFE8);
  static const Color pink300 = Color(0xFFF9A8D4);
  static const Color pink400 = Color(0xFFF472B6);
  static const Color pink500 = Color(0xFFEC4899);
  static const Color pink600 = Color(0xFFDB2777);
  static const Color pink700 = Color(0xFFBE185D);
  static const Color pink800 = Color(0xFF9D174D);
  static const Color pink900 = Color(0xFF831843);

  // ── brand accent ──
  static const Color brandAccent = Color(0xFFF72717);

  // ── transparent ──
  static const Color transparent = Color(0x00000000);
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  2. FlowRefFrame — Spatial primitives
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

abstract final class FlowRefFrame {
  // ── space ──
  static const double space0 = 0.0;
  static const double space1 = 4.0;
  static const double space2 = 8.0;
  static const double space3 = 12.0;
  static const double space4 = 16.0;
  static const double space5 = 20.0;
  static const double space6 = 24.0;
  static const double space7 = 28.0;
  static const double space8 = 32.0;
  static const double space9 = 36.0;
  static const double space10 = 40.0;
  static const double space11 = 44.0;
  static const double space12 = 48.0;
  static const double space13 = 52.0;
  static const double space14 = 56.0;
  static const double space15 = 60.0;
  static const double space16 = 64.0;
  static const double space20 = 80.0;
  static const double space24 = 96.0;
  static const double space32 = 128.0;
  static const double space40 = 160.0;
  static const double spaceMicro = 2.0;

  // ── radius ──
  static const double radius0 = 0.0;
  static const double radius1 = 4.0;
  static const double radius2 = 8.0;
  static const double radius3 = 12.0;
  static const double radius4 = 16.0;
  static const double radius5 = 20.0;
  static const double radius6 = 24.0;
  static const double radius7 = 28.0;
  static const double radius8 = 32.0;
  static const double radius9 = 36.0;
  static const double radius10 = 40.0;
  static const double radius11 = 44.0;
  static const double radius12 = 48.0;
  static const double radiusFull = 9999.0;

  // ── height: control sizing (density-switchable) ──
  static const double heightControlSm = 48.0;
  static const double heightControlMd = 60.0;
  static const double heightControlLg = 72.0;
  static const double heightControlXl = 88.0;

  // ── height: control density — compact ──
  static const double heightControlSmCompact = 44.0;
  static const double heightControlMdCompact = 50.0;
  static const double heightControlLgCompact = 60.0;
  static const double heightControlXlCompact = 74.0;

  // ── height: control density — comfortable ──
  static const double heightControlSmComfortable = 58.0;
  static const double heightControlMdComfortable = 72.0;
  static const double heightControlLgComfortable = 86.0;
  static const double heightControlXlComfortable = 106.0;

  // ── height: input (floating-label dual-text layout) ──
  static const double heightInputSm = 56.0;
  static const double heightInputMd = 72.0;
  static const double heightInputLg = 88.0;
  static const double heightInputXl = 104.0;

  // ── height: input density — compact ──
  static const double heightInputSmCompact = 48.0;
  static const double heightInputMdCompact = 60.0;
  static const double heightInputLgCompact = 72.0;
  static const double heightInputXlCompact = 88.0;

  // ── height: input density — comfortable ──
  static const double heightInputSmComfortable = 68.0;
  static const double heightInputMdComfortable = 88.0;
  static const double heightInputLgComfortable = 104.0;
  static const double heightInputXlComfortable = 124.0;

  // ── sidebar structural widths ──
  static const double sidebarExpanded = 280.0;
  static const double sidebarCollapsed = 56.0;

  // ── content width constraints ──
  static const double contentProse = 680.0;
  static const double contentProseWide = 960.0;
  static const double contentNarrow = 640.0;
  static const double contentMax = 1440.0;
  static const double contentDialog = 480.0;
  static const double contentForm = 400.0;
  static const double contentCompact = 320.0;
  static const double contentSidebarDemo = 400.0;

  // ── border widths ──
  static const double borderThin = 1.0;
  static const double borderControl = 1.5;
  static const double borderMedium = 2.0;
  static const double borderIndicator = 3.0;

  // ── doc layout (documentation-specific dimensions) ──
  static const double docColNum = 28.0;
  static const double docColValueSm = 50.0;
  static const double docColBar = 120.0;
  static const double docColToken = 200.0;
  static const double docColTokenLg = 220.0;
  static const double docColPreview = 240.0;
  static const double docDemoRadius = 56.0;
  static const double docBadgeSm = 36.0;

  // ── breakpoints (min-width thresholds) ──
  static const double breakpointSm = 576.0;
  static const double breakpointMd = 992.0;

  // ── grid: large (desktop) ──
  static const int gridLgColumns = 12;
  static const double gridLgGutter = 24.0;
  static const double gridLgMargin = 48.0;
  static const double gridLgMaxWidth = 1440.0;

  // ── grid: medium (tablet) ──
  static const int gridMdColumns = 6;
  static const double gridMdGutter = 24.0;
  static const double gridMdMargin = 24.0;

  // ── grid: small (mobile) ──
  static const int gridSmColumns = 1;
  static const double gridSmGutter = 0.0;
  static const double gridSmMargin = 16.0;

  // ── container query breakpoints ──
  static const double containerSm = 320.0;
  static const double containerMd = 480.0;
  static const double containerLg = 640.0;
  static const double containerXl = 960.0;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  3. FlowRefVoice — Typography
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

abstract final class FlowRefVoice {
  // ── family ──
  static const String familyBrand = 'Edenred';
  static const String familySans = 'Ubuntu';
  static const String familyMono = 'Ubuntu Mono';

  // Full CSS-equivalent fallback stacks (for TextStyle.fontFamilyFallback)
  static const List<String> familyBrandFallback = [
    'Ubuntu',
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'sans-serif',
  ];
  static const List<String> familySansFallback = [
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'sans-serif',
  ];
  static const List<String> familyMonoFallback = [
    'SF Mono',
    'Fira Code',
    'monospace',
  ];

  // ── weight ──
  static const FontWeight weightRegular = FontWeight.w400;
  static const FontWeight weightMedium = FontWeight.w500;
  static const FontWeight weightSemibold = FontWeight.w600;
  static const FontWeight weightBold = FontWeight.w700;

  // ── size (15-step indexed scale, all integers, aligned 1:1 with Figma Edenred) ──
  static const double size1 = 10.0;
  static const double size2 = 11.0;
  static const double size3 = 12.0;
  static const double size4 = 13.0;
  static const double size5 = 14.0;
  static const double size6 = 16.0;
  static const double size7 = 18.0;
  static const double size8 = 20.0;
  static const double size9 = 24.0;
  static const double size10 = 32.0;
  static const double size11 = 40.0;
  static const double size12 = 48.0;
  static const double size13 = 56.0;
  static const double size14 = 64.0;
  static const double size15 = 72.0;

  // ── letterSpacing (em-relative → multiply by fontSize at usage site) ──
  static const double letterSpacingTighter = -0.02;
  static const double letterSpacingTight = -0.01;
  static const double letterSpacingSnug = -0.005;
  static const double letterSpacingNormal = 0.0;
  static const double letterSpacingWide = 0.02;
  static const double letterSpacingExpanded = 0.05;
  static const double letterSpacingWider = 0.06;
  static const double letterSpacingWidest = 0.08;
  static const double letterSpacingCaps = 0.12;

  // ── lineHeight (unitless ratios — multiply by fontSize at usage site) ──
  static const double lineHeightNone = 1.0;
  static const double lineHeightTight = 1.2;
  static const double lineHeightDense = 1.333;
  static const double lineHeightSnug = 1.35;
  static const double lineHeightDisplay = 1.484;
  static const double lineHeightNormal = 1.5;
  static const double lineHeightRelaxed = 1.556;
  static const double lineHeightLoose = 1.6;
  static const double lineHeightBody = 1.7;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  4. FlowRefDepth — Elevation & layering
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

abstract final class FlowRefDepth {
  // ── shadow: light scale (navy branded: #101A77 = rgb(16, 26, 119)) ──
  static const List<BoxShadow> shadow0 = [];

  static const List<BoxShadow> shadow1 = [
    BoxShadow(
      offset: Offset(0, 1),
      blurRadius: 3,
      spreadRadius: 0,
      color: Color.fromRGBO(16, 26, 119, 0.06),
    ),
    BoxShadow(
      offset: Offset(0, 1),
      blurRadius: 2,
      spreadRadius: 0,
      color: Color.fromRGBO(16, 26, 119, 0.04),
    ),
  ];

  static const List<BoxShadow> shadow2 = [
    BoxShadow(
      offset: Offset(0, 4),
      blurRadius: 12,
      spreadRadius: 4,
      color: Color.fromRGBO(16, 26, 119, 0.08),
    ),
    BoxShadow(
      offset: Offset(0, 2),
      blurRadius: 4,
      spreadRadius: 0,
      color: Color.fromRGBO(16, 26, 119, 0.04),
    ),
  ];

  static const List<BoxShadow> shadow3 = [
    BoxShadow(
      offset: Offset(0, 10),
      blurRadius: 32,
      spreadRadius: 6,
      color: Color.fromRGBO(16, 26, 119, 0.12),
    ),
    BoxShadow(
      offset: Offset(0, 4),
      blurRadius: 12,
      spreadRadius: 0,
      color: Color.fromRGBO(16, 26, 119, 0.06),
    ),
  ];

  static const List<BoxShadow> shadow4 = [
    BoxShadow(
      offset: Offset(0, 20),
      blurRadius: 56,
      spreadRadius: 8,
      color: Color.fromRGBO(16, 26, 119, 0.16),
    ),
    BoxShadow(
      offset: Offset(0, 8),
      blurRadius: 20,
      spreadRadius: 2,
      color: Color.fromRGBO(16, 26, 119, 0.08),
    ),
  ];

  // ── shadow: dark scale (pure black, opacity boosted for dark surfaces) ──
  static const List<BoxShadow> shadowDark1 = [
    BoxShadow(
      offset: Offset(0, 1),
      blurRadius: 3,
      spreadRadius: 0,
      color: Color.fromRGBO(0, 0, 0, 0.35),
    ),
    BoxShadow(
      offset: Offset(0, 1),
      blurRadius: 2,
      spreadRadius: 0,
      color: Color.fromRGBO(0, 0, 0, 0.24),
    ),
  ];

  static const List<BoxShadow> shadowDark2 = [
    BoxShadow(
      offset: Offset(0, 4),
      blurRadius: 12,
      spreadRadius: 4,
      color: Color.fromRGBO(0, 0, 0, 0.35),
    ),
    BoxShadow(
      offset: Offset(0, 2),
      blurRadius: 4,
      spreadRadius: 0,
      color: Color.fromRGBO(0, 0, 0, 0.24),
    ),
  ];

  static const List<BoxShadow> shadowDark3 = [
    BoxShadow(
      offset: Offset(0, 10),
      blurRadius: 32,
      spreadRadius: 6,
      color: Color.fromRGBO(0, 0, 0, 0.40),
    ),
    BoxShadow(
      offset: Offset(0, 4),
      blurRadius: 12,
      spreadRadius: 0,
      color: Color.fromRGBO(0, 0, 0, 0.24),
    ),
  ];

  static const List<BoxShadow> shadowDark4 = [
    BoxShadow(
      offset: Offset(0, 20),
      blurRadius: 56,
      spreadRadius: 8,
      color: Color.fromRGBO(0, 0, 0, 0.48),
    ),
    BoxShadow(
      offset: Offset(0, 8),
      blurRadius: 20,
      spreadRadius: 2,
      color: Color.fromRGBO(0, 0, 0, 0.30),
    ),
  ];

  // ── overlay ──
  static const Color overlayLight = Color.fromRGBO(10, 10, 15, 0.5);
  static const Color overlayDark = Color.fromRGBO(0, 0, 0, 0.65);

  // ── blur (backdrop blur scale) ──
  static const double blurSm = 4.0;
  static const double blurMd = 8.0;
  static const double blurLg = 16.0;

  // ── zIndex (stacking context scale) ──
  static const int zIndexBase = 0;
  static const int zIndexContent = 1;
  static const int zIndexDropdown = 100;
  static const int zIndexSticky = 200;
  static const int zIndexOverlay = 1000;
  static const int zIndexModal = 1001;
  static const int zIndexTooltip = 1050;
  static const int zIndexToast = 1100;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  5. FlowRefMomentum — Motion & timing
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

abstract final class FlowRefMomentum {
  // ── duration ──
  static const Duration durationInstant = Duration.zero;
  static const Duration durationFast = Duration(milliseconds: 100);
  static const Duration durationNormal = Duration(milliseconds: 200);
  static const Duration durationSlide = Duration(milliseconds: 250);
  static const Duration durationSlow = Duration(milliseconds: 350);
  static const Duration durationSlower = Duration(milliseconds: 500);
  static const Duration durationSpin = Duration(milliseconds: 800);
  static const Duration durationBounce = Duration(milliseconds: 1200);
  static const Duration durationCycle = Duration(milliseconds: 1400);
  static const Duration durationProgress = Duration(milliseconds: 1500);
  static const Duration durationSkeleton = Duration(milliseconds: 1800);

  // ── easing ──
  static const Cubic easingStandard = Cubic(0.2, 0, 0, 1);
  static const Cubic easingEnter = Cubic(0, 0, 0, 1);
  static const Cubic easingExit = Cubic(0.2, 0, 1, 1);
  static const Cubic easingLinear = Cubic(0, 0, 1, 1);

  // ── stagger (choreographed sequence delays) ──
  static const Duration staggerFast = Duration(milliseconds: 30);
  static const Duration staggerNormal = Duration(milliseconds: 50);
  static const Duration staggerSlow = Duration(milliseconds: 80);
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  6. FlowRefIcon — Icon sizing
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

abstract final class FlowRefIcon {
  static const double sizeXs = 12.0;
  static const double sizeSm = 16.0;
  static const double sizeMd = 20.0;
  static const double sizeLg = 24.0;
  static const double sizeXl = 32.0;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  7. FlowRefState — Interactive state tokens
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

abstract final class FlowRefState {
  // ── opacity: interaction states ──
  static const double opacityDisabled = 0.42;
  static const double opacityHover = 0.06;
  static const double opacityPressed = 0.12;
  static const double opacitySelected = 0.1;

  // ── opacity: decorative/hierarchy ──
  static const double opacityFaint = 0.3;
  static const double opacityDimmed = 0.5;
  static const double opacitySubtle = 0.6;
  static const double opacityMuted = 0.7;
  static const double opacitySoft = 0.85;

  // ── border base colors (RGB components for compositing) ──
  static const int borderLightBaseR = 10;
  static const int borderLightBaseG = 10;
  static const int borderLightBaseB = 15;

  static const int borderDarkBaseR = 255;
  static const int borderDarkBaseG = 255;
  static const int borderDarkBaseB = 255;

  static const double borderDefaultAlpha = 0.08;
  static const double borderStrongAlpha = 0.15;

  /// Convenience: pre-composed light border base color at default alpha.
  static const Color borderLightBase = Color.fromRGBO(10, 10, 15, 1);

  /// Convenience: pre-composed dark border base color at default alpha.
  static const Color borderDarkBase = Color.fromRGBO(255, 255, 255, 1);

  // ── focus ring ──
  static const double focusRingWidth = 2.0;
  static const double focusRingOffset = 2.0;
}
