// ignore_for_file: prefer_const_constructors_in_immutables
/// FLOW Design System — System Tokens (Dart / Flutter)
/// ────────────────────────────────────────────────────
/// Generated from tokens.ts sysLight / sysDark + tokens.css sys vars.
/// All values reference FlowRef* constants from ref_tokens.dart.
///
/// Architecture: ref -> sys -> comp
///   sys = Semantic aliases. Themes remap sys tokens to different ref tokens.
///
/// This file defines [FlowSysTokens], a [ThemeExtension] that carries every
/// semantic token the design system surfaces: energy (color), frame (spacing,
/// radius, height, border), voice (typography), depth (elevation), icon,
/// tone, momentum, and state.

import 'dart:ui';

import 'package:flutter/material.dart';

import 'ref_tokens.dart';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowSysTokens — ThemeExtension
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowSysTokens extends ThemeExtension<FlowSysTokens> {
  // ── energy.surface ──
  final Color surfacePrimary;
  final Color surfaceSecondary;
  final Color surfaceTertiary;
  final Color surfaceSunken;
  final Color surfaceInverse;
  final Color surfaceColdWhite;
  final Color surfaceAccent;
  final Color surfaceDanger;
  final Color surfaceSuccess;
  final Color surfaceWarning;

  // ── energy.text ──
  final Color textPrimary;
  final Color textSecondary;
  final Color textTertiary;
  final Color textInverse;
  final Color textOnAction;
  final Color textLink;
  final Color textAccent;
  final Color textDanger;
  final Color textSuccess;
  final Color textWarning;
  final Color textDisabled;

  // ── energy.border ──
  final Color borderDefault;
  final Color borderStrong;
  final Color borderSubtle;
  final Color borderFocus;
  final Color borderAccent;
  final Color borderDanger;
  final Color borderSuccess;
  final Color borderWarning;
  final Color borderControl;
  final Color borderControlError;
  final Color borderControlDisabled;

  // ── energy.action ──
  final Color actionPrimary;
  final Color actionPrimaryHover;
  final Color actionPrimaryActive;
  final Color actionSecondary;
  final Color actionSecondaryHover;
  final Color actionGhost;
  final Color actionGhostHover;
  final Color actionHigh;
  final Color actionHighHover;
  final Color actionHighActive;
  final Color actionMediumBorder;
  final Color actionMediumActive;
  final Color actionLowActive;
  final Color actionDestructive;
  final Color actionDestructiveHover;
  final Color actionDestructiveSubtle;
  final Color actionDestructiveActive;

  // ── energy.state ──
  final Color stateDisabledBg;
  final Color stateDisabledText;
  final Color stateDisabledBorder;

  // ── energy.status ──
  final Color statusSuccess;
  final Color statusSuccessSubtle;
  final Color statusSuccessMuted;
  final Color statusWarning;
  final Color statusWarningSubtle;
  final Color statusWarningMuted;
  final Color statusError;
  final Color statusErrorSubtle;
  final Color statusErrorMuted;
  final Color statusInfo;
  final Color statusInfoSubtle;
  final Color statusInfoMuted;

  // ── energy.status extended (purple, teal, yellow, pink) ──
  final Color surfacePurple;
  final Color textPurple;
  final Color borderPurple;
  final Color statusPurple;
  final Color statusPurpleSubtle;
  final Color statusPurpleMuted;
  final Color surfaceTeal;
  final Color textTeal;
  final Color borderTeal;
  final Color statusTeal;
  final Color statusTealSubtle;
  final Color statusTealMuted;
  final Color surfaceYellow;
  final Color textYellow;
  final Color borderYellow;
  final Color statusYellow;
  final Color statusYellowSubtle;
  final Color statusYellowMuted;
  final Color surfacePink;
  final Color textPink;
  final Color borderPink;
  final Color statusPink;
  final Color statusPinkSubtle;
  final Color statusPinkMuted;

  // ── energy.icon ──
  final Color iconDefault;
  final Color iconSecondary;
  final Color iconTertiary;
  final Color iconAction;
  final Color iconInverse;
  final Color iconOnAction;
  final Color iconDisabled;
  final Color iconSuccess;
  final Color iconWarning;
  final Color iconError;
  final Color iconInfo;

  // ── energy.control ──
  final Color controlBorderInactive;
  final Color controlBorderInactivePressed;
  final Color controlBorderDisabled;
  final Color controlFillPressed;
  final Color controlFillDisabled;
  final Color controlDot;
  final Color controlStateLayerInactive;

  // ── energy.switch ──
  final Color switchTrackOff;
  final Color switchTrackOffHover;
  final Color switchTrackDisabled;
  final Color switchThumbOff;
  final Color switchThumbOn;
  final Color switchThumbDisabled;
  final Color switchThumbIconDisabled;

  // ── depth ──
  final Color depthOverlay;
  final List<BoxShadow> depthElevationLight;
  final List<BoxShadow> depthElevationMedium;
  final List<BoxShadow> depthElevationHigh;

  // ── frame.height ──
  final double heightControlSm;
  final double heightControlMd;
  final double heightControlLg;
  final double heightControlXl;

  // ── frame.padding ──
  final double paddingControl;
  final double paddingContainer;
  final double paddingSurface;

  // ── frame.gap ──
  final double gapTight; // space.micro alias
  final double gapComponent;
  final double gapComponentLg;
  final double gapSubsection;
  final double gapSection;
  final double gapPage;

  // ── frame.radius ──
  final double radiusSm;
  final double radiusControl;
  final double radiusContainer;
  final double radiusSurface;
  final double radiusFull;

  // ── frame.border ──
  final double borderThin;
  final double borderControlWidth;
  final double borderMedium;
  final double borderIndicator;

  // ── frame.content ──
  final double contentDialog;

  // ── frame.sidebar ──
  final double sidebarExpanded;
  final double sidebarCollapsed;

  // ── frame.space ──
  final double spaceMicro;

  // ── voice.display ──
  final double displayXlFontSize;
  final FontWeight displayXlFontWeight;
  final double displayXlLineHeight;
  final double displayXlLetterSpacing;
  final String displayXlFontFamily;
  final double displayLFontSize;
  final FontWeight displayLFontWeight;
  final double displayLLineHeight;
  final double displayLLetterSpacing;
  final String displayLFontFamily;
  final double displayMFontSize;
  final FontWeight displayMFontWeight;
  final double displayMLineHeight;
  final double displayMLetterSpacing;
  final String displayMFontFamily;
  final double displaySFontSize;
  final FontWeight displaySFontWeight;
  final double displaySLineHeight;
  final double displaySLetterSpacing;
  final String displaySFontFamily;
  final double displayXsFontSize;
  final FontWeight displayXsFontWeight;
  final double displayXsLineHeight;
  final double displayXsLetterSpacing;
  final String displayXsFontFamily;

  // ── voice.heading ──
  final double headingLFontSize;
  final FontWeight headingLFontWeight;
  final double headingLLineHeight;
  final double headingLLetterSpacing;
  final String headingLFontFamily;
  final double headingMFontSize;
  final FontWeight headingMFontWeight;
  final double headingMLineHeight;
  final double headingMLetterSpacing;
  final String headingMFontFamily;

  // ── voice.label (deprecated but kept for compat) ──
  final double labelXlFontSize;
  final double labelLFontSize;
  final double labelMFontSize;
  final double labelSFontSize;
  final double labelXsFontSize;

  // ── voice.paragraph (deprecated but kept for compat) ──
  final double paragraphLFontSize;
  final double paragraphMFontSize;
  final double paragraphSFontSize;

  // ── voice.caption ──
  final double captionFontSize;
  final FontWeight captionFontWeight;
  final double captionLineHeight;
  final double captionLetterSpacing;
  final String captionFontFamily;

  // ── voice.overline ──
  final double overlineFontSize;
  final FontWeight overlineFontWeight;
  final double overlineLineHeight;
  final double overlineLetterSpacing;
  final String overlineFontFamily;

  // ── voice.control ──
  final String controlFontFamily;
  final FontWeight controlFontWeight;
  final double controlLineHeight;

  // ── icon.size ──
  final double iconSizeXs;
  final double iconSizeSm;
  final double iconSizeMd;
  final double iconSizeLg;
  final double iconSizeXl;

  // ── tone ──
  final Color toneNeutralText;
  final Color toneNeutralTextSubtle;
  final FontWeight toneNeutralWeight;
  final Color toneBrandText;
  final Color toneBrandTextSubtle;
  final FontWeight toneBrandWeight;
  final Color toneMarketingText;
  final Color toneMarketingTextSubtle;
  final FontWeight toneMarketingWeight;
  final Color toneSystemText;
  final Color toneSystemTextSubtle;
  final FontWeight toneSystemWeight;

  // ── momentum ──
  final Duration momentumDurationFast;
  final Duration momentumDurationDefault;
  final Duration momentumDurationSlow;
  final Curve momentumEasingStandard;
  final Curve momentumEasingEnter;
  final Curve momentumEasingExit;

  // ── state ──
  final double stateHoverOpacity;
  final double statePressedOpacity;
  final double stateSelectedOpacity;
  final double stateDisabledOpacity;
  final double stateDimmedOpacity;
  final double stateFaintOpacity;
  final double stateSubtleOpacity;

  // ── button padding per size (sys.frame.button) ──
  final double buttonPaddingXSm;
  final double buttonPaddingXMd;
  final double buttonPaddingXLg;
  final double buttonPaddingXXl;

  const FlowSysTokens({
    // energy.surface
    required this.surfacePrimary,
    required this.surfaceSecondary,
    required this.surfaceTertiary,
    required this.surfaceSunken,
    required this.surfaceInverse,
    required this.surfaceColdWhite,
    required this.surfaceAccent,
    required this.surfaceDanger,
    required this.surfaceSuccess,
    required this.surfaceWarning,
    // energy.text
    required this.textPrimary,
    required this.textSecondary,
    required this.textTertiary,
    required this.textInverse,
    required this.textOnAction,
    required this.textLink,
    required this.textAccent,
    required this.textDanger,
    required this.textSuccess,
    required this.textWarning,
    required this.textDisabled,
    // energy.border
    required this.borderDefault,
    required this.borderStrong,
    required this.borderSubtle,
    required this.borderFocus,
    required this.borderAccent,
    required this.borderDanger,
    required this.borderSuccess,
    required this.borderWarning,
    required this.borderControl,
    required this.borderControlError,
    required this.borderControlDisabled,
    // energy.action
    required this.actionPrimary,
    required this.actionPrimaryHover,
    required this.actionPrimaryActive,
    required this.actionSecondary,
    required this.actionSecondaryHover,
    required this.actionGhost,
    required this.actionGhostHover,
    required this.actionHigh,
    required this.actionHighHover,
    required this.actionHighActive,
    required this.actionMediumBorder,
    required this.actionMediumActive,
    required this.actionLowActive,
    required this.actionDestructive,
    required this.actionDestructiveHover,
    required this.actionDestructiveSubtle,
    required this.actionDestructiveActive,
    // energy.state
    required this.stateDisabledBg,
    required this.stateDisabledText,
    required this.stateDisabledBorder,
    // energy.status
    required this.statusSuccess,
    required this.statusSuccessSubtle,
    required this.statusSuccessMuted,
    required this.statusWarning,
    required this.statusWarningSubtle,
    required this.statusWarningMuted,
    required this.statusError,
    required this.statusErrorSubtle,
    required this.statusErrorMuted,
    required this.statusInfo,
    required this.statusInfoSubtle,
    required this.statusInfoMuted,
    // extended palettes
    required this.surfacePurple,
    required this.textPurple,
    required this.borderPurple,
    required this.statusPurple,
    required this.statusPurpleSubtle,
    required this.statusPurpleMuted,
    required this.surfaceTeal,
    required this.textTeal,
    required this.borderTeal,
    required this.statusTeal,
    required this.statusTealSubtle,
    required this.statusTealMuted,
    required this.surfaceYellow,
    required this.textYellow,
    required this.borderYellow,
    required this.statusYellow,
    required this.statusYellowSubtle,
    required this.statusYellowMuted,
    required this.surfacePink,
    required this.textPink,
    required this.borderPink,
    required this.statusPink,
    required this.statusPinkSubtle,
    required this.statusPinkMuted,
    // energy.icon
    required this.iconDefault,
    required this.iconSecondary,
    required this.iconTertiary,
    required this.iconAction,
    required this.iconInverse,
    required this.iconOnAction,
    required this.iconDisabled,
    required this.iconSuccess,
    required this.iconWarning,
    required this.iconError,
    required this.iconInfo,
    // energy.control
    required this.controlBorderInactive,
    required this.controlBorderInactivePressed,
    required this.controlBorderDisabled,
    required this.controlFillPressed,
    required this.controlFillDisabled,
    required this.controlDot,
    required this.controlStateLayerInactive,
    // energy.switch
    required this.switchTrackOff,
    required this.switchTrackOffHover,
    required this.switchTrackDisabled,
    required this.switchThumbOff,
    required this.switchThumbOn,
    required this.switchThumbDisabled,
    required this.switchThumbIconDisabled,
    // depth
    required this.depthOverlay,
    required this.depthElevationLight,
    required this.depthElevationMedium,
    required this.depthElevationHigh,
    // frame.height
    required this.heightControlSm,
    required this.heightControlMd,
    required this.heightControlLg,
    required this.heightControlXl,
    // frame.padding
    required this.paddingControl,
    required this.paddingContainer,
    required this.paddingSurface,
    // frame.gap
    required this.gapTight,
    required this.gapComponent,
    required this.gapComponentLg,
    required this.gapSubsection,
    required this.gapSection,
    required this.gapPage,
    // frame.radius
    required this.radiusSm,
    required this.radiusControl,
    required this.radiusContainer,
    required this.radiusSurface,
    required this.radiusFull,
    // frame.border
    required this.borderThin,
    required this.borderControlWidth,
    required this.borderMedium,
    required this.borderIndicator,
    // frame.content
    required this.contentDialog,
    // frame.sidebar
    required this.sidebarExpanded,
    required this.sidebarCollapsed,
    // frame.space
    required this.spaceMicro,
    // voice.display
    required this.displayXlFontSize,
    required this.displayXlFontWeight,
    required this.displayXlLineHeight,
    required this.displayXlLetterSpacing,
    required this.displayXlFontFamily,
    required this.displayLFontSize,
    required this.displayLFontWeight,
    required this.displayLLineHeight,
    required this.displayLLetterSpacing,
    required this.displayLFontFamily,
    required this.displayMFontSize,
    required this.displayMFontWeight,
    required this.displayMLineHeight,
    required this.displayMLetterSpacing,
    required this.displayMFontFamily,
    required this.displaySFontSize,
    required this.displaySFontWeight,
    required this.displaySLineHeight,
    required this.displaySLetterSpacing,
    required this.displaySFontFamily,
    required this.displayXsFontSize,
    required this.displayXsFontWeight,
    required this.displayXsLineHeight,
    required this.displayXsLetterSpacing,
    required this.displayXsFontFamily,
    // voice.heading
    required this.headingLFontSize,
    required this.headingLFontWeight,
    required this.headingLLineHeight,
    required this.headingLLetterSpacing,
    required this.headingLFontFamily,
    required this.headingMFontSize,
    required this.headingMFontWeight,
    required this.headingMLineHeight,
    required this.headingMLetterSpacing,
    required this.headingMFontFamily,
    // voice.label
    required this.labelXlFontSize,
    required this.labelLFontSize,
    required this.labelMFontSize,
    required this.labelSFontSize,
    required this.labelXsFontSize,
    // voice.paragraph
    required this.paragraphLFontSize,
    required this.paragraphMFontSize,
    required this.paragraphSFontSize,
    // voice.caption
    required this.captionFontSize,
    required this.captionFontWeight,
    required this.captionLineHeight,
    required this.captionLetterSpacing,
    required this.captionFontFamily,
    // voice.overline
    required this.overlineFontSize,
    required this.overlineFontWeight,
    required this.overlineLineHeight,
    required this.overlineLetterSpacing,
    required this.overlineFontFamily,
    // voice.control
    required this.controlFontFamily,
    required this.controlFontWeight,
    required this.controlLineHeight,
    // icon.size
    required this.iconSizeXs,
    required this.iconSizeSm,
    required this.iconSizeMd,
    required this.iconSizeLg,
    required this.iconSizeXl,
    // tone
    required this.toneNeutralText,
    required this.toneNeutralTextSubtle,
    required this.toneNeutralWeight,
    required this.toneBrandText,
    required this.toneBrandTextSubtle,
    required this.toneBrandWeight,
    required this.toneMarketingText,
    required this.toneMarketingTextSubtle,
    required this.toneMarketingWeight,
    required this.toneSystemText,
    required this.toneSystemTextSubtle,
    required this.toneSystemWeight,
    // momentum
    required this.momentumDurationFast,
    required this.momentumDurationDefault,
    required this.momentumDurationSlow,
    required this.momentumEasingStandard,
    required this.momentumEasingEnter,
    required this.momentumEasingExit,
    // state
    required this.stateHoverOpacity,
    required this.statePressedOpacity,
    required this.stateSelectedOpacity,
    required this.stateDisabledOpacity,
    required this.stateDimmedOpacity,
    required this.stateFaintOpacity,
    required this.stateSubtleOpacity,
    // button padding
    required this.buttonPaddingXSm,
    required this.buttonPaddingXMd,
    required this.buttonPaddingXLg,
    required this.buttonPaddingXXl,
  });

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // Factory: Light theme
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  factory FlowSysTokens.light() => FlowSysTokens(
        // ── energy.surface ──
        surfacePrimary: FlowRefEnergy.neutral0,
        surfaceSecondary: FlowRefEnergy.neutral50,
        surfaceTertiary: FlowRefEnergy.neutral100,
        surfaceSunken: FlowRefEnergy.neutral150,
        surfaceInverse: FlowRefEnergy.neutral900,
        surfaceColdWhite: FlowRefEnergy.neutralColdWhite,
        surfaceAccent: FlowRefEnergy.blue50,
        surfaceDanger: FlowRefEnergy.red50,
        surfaceSuccess: FlowRefEnergy.green50,
        surfaceWarning: FlowRefEnergy.orange50,
        // ── energy.text ──
        textPrimary: FlowRefEnergy.neutral800,
        textSecondary: FlowRefEnergy.neutral500,
        textTertiary: FlowRefEnergy.neutral400,
        textInverse: FlowRefEnergy.neutral0,
        textOnAction: FlowRefEnergy.neutral0,
        textLink: FlowRefEnergy.blue600,
        textAccent: FlowRefEnergy.blue500,
        textDanger: FlowRefEnergy.red500,
        textSuccess: FlowRefEnergy.green500,
        textWarning: FlowRefEnergy.orange600,
        textDisabled: FlowRefEnergy.neutral300,
        // ── energy.border ──
        borderDefault: Color.fromRGBO(
            FlowRefState.borderLightBaseR,
            FlowRefState.borderLightBaseG,
            FlowRefState.borderLightBaseB,
            FlowRefState.borderDefaultAlpha),
        borderStrong: Color.fromRGBO(
            FlowRefState.borderLightBaseR,
            FlowRefState.borderLightBaseG,
            FlowRefState.borderLightBaseB,
            FlowRefState.borderStrongAlpha),
        borderSubtle: Color.fromRGBO(FlowRefState.borderLightBaseR,
            FlowRefState.borderLightBaseG, FlowRefState.borderLightBaseB, 0.05),
        borderFocus: FlowRefEnergy.blue500,
        borderAccent: FlowRefEnergy.blue200,
        borderDanger: FlowRefEnergy.red200,
        borderSuccess: FlowRefEnergy.green200,
        borderWarning: FlowRefEnergy.orange200,
        borderControl: FlowRefEnergy.neutral600,
        borderControlError: FlowRefEnergy.red600,
        borderControlDisabled: FlowRefEnergy.neutral300,
        // ── energy.action ──
        actionPrimary: FlowRefEnergy.blue500,
        actionPrimaryHover: FlowRefEnergy.blue700,
        actionPrimaryActive: FlowRefEnergy.blue600,
        actionSecondary: FlowRefEnergy.neutral100,
        actionSecondaryHover: FlowRefEnergy.neutral200,
        actionGhost: FlowRefEnergy.transparent,
        actionGhostHover: FlowRefEnergy.neutral100,
        actionHigh: FlowRefEnergy.neutral900,
        actionHighHover: FlowRefEnergy.neutral700,
        actionHighActive: FlowRefEnergy.neutral800,
        actionMediumBorder: FlowRefEnergy.neutral900,
        actionMediumActive: FlowRefEnergy.neutral300,
        actionLowActive: FlowRefEnergy.blue600,
        actionDestructive: FlowRefEnergy.red500,
        actionDestructiveHover: FlowRefEnergy.red700,
        actionDestructiveSubtle: FlowRefEnergy.redSubtleTint,
        actionDestructiveActive: FlowRefEnergy.red600,
        // ── energy.state ──
        stateDisabledBg: FlowRefEnergy.neutral300,
        stateDisabledText: FlowRefEnergy.neutral500,
        stateDisabledBorder: FlowRefEnergy.neutral300,
        // ── energy.status ──
        statusSuccess: FlowRefEnergy.green500,
        statusSuccessSubtle: FlowRefEnergy.green50,
        statusSuccessMuted: FlowRefEnergy.green100,
        statusWarning: FlowRefEnergy.orange500,
        statusWarningSubtle: FlowRefEnergy.orange50,
        statusWarningMuted: FlowRefEnergy.orange100,
        statusError: FlowRefEnergy.red500,
        statusErrorSubtle: FlowRefEnergy.red50,
        statusErrorMuted: FlowRefEnergy.red100,
        statusInfo: FlowRefEnergy.blue500,
        statusInfoSubtle: FlowRefEnergy.blue50,
        statusInfoMuted: FlowRefEnergy.blue100,
        // ── extended palettes ──
        surfacePurple: FlowRefEnergy.purple50,
        textPurple: FlowRefEnergy.purple500,
        borderPurple: FlowRefEnergy.purple100,
        statusPurple: FlowRefEnergy.purple500,
        statusPurpleSubtle: FlowRefEnergy.purple50,
        statusPurpleMuted: FlowRefEnergy.purple100,
        surfaceTeal: FlowRefEnergy.teal50,
        textTeal: FlowRefEnergy.teal500,
        borderTeal: FlowRefEnergy.teal100,
        statusTeal: FlowRefEnergy.teal500,
        statusTealSubtle: FlowRefEnergy.teal50,
        statusTealMuted: FlowRefEnergy.teal100,
        surfaceYellow: FlowRefEnergy.orange50,
        textYellow: FlowRefEnergy.orange600,
        borderYellow: FlowRefEnergy.orange200,
        statusYellow: FlowRefEnergy.orange500,
        statusYellowSubtle: FlowRefEnergy.orange50,
        statusYellowMuted: FlowRefEnergy.orange100,
        surfacePink: FlowRefEnergy.red50,
        textPink: FlowRefEnergy.red500,
        borderPink: FlowRefEnergy.red200,
        statusPink: FlowRefEnergy.red500,
        statusPinkSubtle: FlowRefEnergy.red50,
        statusPinkMuted: FlowRefEnergy.red100,
        // ── energy.icon ──
        iconDefault: FlowRefEnergy.neutral900,
        iconSecondary: FlowRefEnergy.neutral500,
        iconTertiary: FlowRefEnergy.neutral400,
        iconAction: FlowRefEnergy.blue500,
        iconInverse: FlowRefEnergy.neutral50,
        iconOnAction: FlowRefEnergy.neutral0,
        iconDisabled: FlowRefEnergy.neutral300,
        iconSuccess: FlowRefEnergy.green500,
        iconWarning: FlowRefEnergy.orange500,
        iconError: FlowRefEnergy.red500,
        iconInfo: FlowRefEnergy.blue500,
        // ── energy.control ──
        controlBorderInactive: FlowRefEnergy.neutral500,
        controlBorderInactivePressed: FlowRefEnergy.neutral600,
        controlBorderDisabled: FlowRefEnergy.neutral300,
        controlFillPressed: FlowRefEnergy.blue600,
        controlFillDisabled: FlowRefEnergy.neutral300,
        controlDot: FlowRefEnergy.neutral0,
        controlStateLayerInactive: FlowRefEnergy.neutral500,
        // ── energy.switch ──
        switchTrackOff: FlowRefEnergy.neutral300,
        switchTrackOffHover: FlowRefEnergy.neutral400,
        switchTrackDisabled: FlowRefEnergy.neutral200,
        switchThumbOff: FlowRefEnergy.neutral0,
        switchThumbOn: FlowRefEnergy.neutral0,
        switchThumbDisabled: FlowRefEnergy.neutral100,
        switchThumbIconDisabled: FlowRefEnergy.neutral300,
        // ── depth ──
        depthOverlay: FlowRefDepth.overlayLight,
        depthElevationLight: FlowRefDepth.shadow1,
        depthElevationMedium: FlowRefDepth.shadow2,
        depthElevationHigh: FlowRefDepth.shadow3,
        // ── frame.height ──
        heightControlSm: FlowRefFrame.heightControlSm,
        heightControlMd: FlowRefFrame.heightControlMd,
        heightControlLg: FlowRefFrame.heightControlLg,
        heightControlXl: FlowRefFrame.heightControlXl,
        // ── frame.padding ──
        paddingControl: FlowRefFrame.space5,
        paddingContainer: FlowRefFrame.space6,
        paddingSurface: FlowRefFrame.space12,
        // ── frame.gap ──
        gapTight: FlowRefFrame.spaceMicro,
        gapComponent: FlowRefFrame.space5,
        gapComponentLg: FlowRefFrame.space7,
        gapSubsection: FlowRefFrame.space9,
        gapSection: FlowRefFrame.space16,
        gapPage: FlowRefFrame.space20,
        // ── frame.radius ──
        radiusSm: FlowRefFrame.radius1,
        radiusControl: FlowRefFrame.radius3,
        radiusContainer: FlowRefFrame.radius3,
        radiusSurface: FlowRefFrame.radius4,
        radiusFull: FlowRefFrame.radiusFull,
        // ── frame.border ──
        borderThin: FlowRefFrame.borderThin,
        borderControlWidth: FlowRefFrame.borderControl,
        borderMedium: FlowRefFrame.borderMedium,
        borderIndicator: FlowRefFrame.borderIndicator,
        // ── frame.content ──
        contentDialog: FlowRefFrame.contentDialog,
        // ── frame.sidebar ──
        sidebarExpanded: FlowRefFrame.sidebarExpanded,
        sidebarCollapsed: FlowRefFrame.sidebarCollapsed,
        // ── frame.space ──
        spaceMicro: FlowRefFrame.spaceMicro,
        // ── voice.display ──
        displayXlFontSize: FlowRefVoice.size14,
        displayXlFontWeight: FlowRefVoice.weightBold,
        displayXlLineHeight: FlowRefVoice.lineHeightDisplay,
        displayXlLetterSpacing: FlowRefVoice.letterSpacingTight,
        displayXlFontFamily: FlowRefVoice.familyBrand,
        displayLFontSize: FlowRefVoice.size13,
        displayLFontWeight: FlowRefVoice.weightBold,
        displayLLineHeight: FlowRefVoice.lineHeightDisplay,
        displayLLetterSpacing: FlowRefVoice.letterSpacingTight,
        displayLFontFamily: FlowRefVoice.familyBrand,
        displayMFontSize: FlowRefVoice.size12,
        displayMFontWeight: FlowRefVoice.weightBold,
        displayMLineHeight: FlowRefVoice.lineHeightNormal,
        displayMLetterSpacing: FlowRefVoice.letterSpacingSnug,
        displayMFontFamily: FlowRefVoice.familyBrand,
        displaySFontSize: FlowRefVoice.size11,
        displaySFontWeight: FlowRefVoice.weightBold,
        displaySLineHeight: FlowRefVoice.lineHeightSnug,
        displaySLetterSpacing: FlowRefVoice.letterSpacingSnug,
        displaySFontFamily: FlowRefVoice.familyBrand,
        displayXsFontSize: FlowRefVoice.size10,
        displayXsFontWeight: FlowRefVoice.weightBold,
        displayXsLineHeight: FlowRefVoice.lineHeightNormal,
        displayXsLetterSpacing: FlowRefVoice.letterSpacingNormal,
        displayXsFontFamily: FlowRefVoice.familyBrand,
        // ── voice.heading ──
        headingLFontSize: FlowRefVoice.size9,
        headingLFontWeight: FlowRefVoice.weightBold,
        headingLLineHeight: FlowRefVoice.lineHeightNormal,
        headingLLetterSpacing: FlowRefVoice.letterSpacingNormal,
        headingLFontFamily: FlowRefVoice.familyBrand,
        headingMFontSize: FlowRefVoice.size8,
        headingMFontWeight: FlowRefVoice.weightBold,
        headingMLineHeight: FlowRefVoice.lineHeightLoose,
        headingMLetterSpacing: FlowRefVoice.letterSpacingNormal,
        headingMFontFamily: FlowRefVoice.familyBrand,
        // ── voice.label ──
        labelXlFontSize: FlowRefVoice.size9,
        labelLFontSize: FlowRefVoice.size8,
        labelMFontSize: FlowRefVoice.size7,
        labelSFontSize: FlowRefVoice.size6,
        labelXsFontSize: FlowRefVoice.size5,
        // ── voice.paragraph ──
        paragraphLFontSize: FlowRefVoice.size7,
        paragraphMFontSize: FlowRefVoice.size6,
        paragraphSFontSize: FlowRefVoice.size5,
        // ── voice.caption ──
        captionFontSize: FlowRefVoice.size4,
        captionFontWeight: FlowRefVoice.weightMedium,
        captionLineHeight: FlowRefVoice.lineHeightRelaxed,
        captionLetterSpacing: FlowRefVoice.letterSpacingWide,
        captionFontFamily: FlowRefVoice.familySans,
        // ── voice.overline ──
        overlineFontSize: FlowRefVoice.size1,
        overlineFontWeight: FlowRefVoice.weightBold,
        overlineLineHeight: FlowRefVoice.lineHeightNormal,
        overlineLetterSpacing: FlowRefVoice.letterSpacingCaps,
        overlineFontFamily: FlowRefVoice.familySans,
        // ── voice.control ──
        controlFontFamily: FlowRefVoice.familySans,
        controlFontWeight: FlowRefVoice.weightSemibold,
        controlLineHeight: FlowRefVoice.lineHeightNone,
        // ── icon.size ──
        iconSizeXs: FlowRefIcon.sizeXs,
        iconSizeSm: FlowRefIcon.sizeSm,
        iconSizeMd: FlowRefIcon.sizeMd,
        iconSizeLg: FlowRefIcon.sizeLg,
        iconSizeXl: FlowRefIcon.sizeXl,
        // ── tone ──
        toneNeutralText: FlowRefEnergy.neutral800,
        toneNeutralTextSubtle: FlowRefEnergy.neutral500,
        toneNeutralWeight: FlowRefVoice.weightRegular,
        toneBrandText: FlowRefEnergy.blue700,
        toneBrandTextSubtle: FlowRefEnergy.blue500,
        toneBrandWeight: FlowRefVoice.weightMedium,
        toneMarketingText: FlowRefEnergy.orange700,
        toneMarketingTextSubtle: FlowRefEnergy.orange500,
        toneMarketingWeight: FlowRefVoice.weightMedium,
        toneSystemText: FlowRefEnergy.neutral600,
        toneSystemTextSubtle: FlowRefEnergy.neutral400,
        toneSystemWeight: FlowRefVoice.weightRegular,
        // ── momentum ──
        momentumDurationFast: FlowRefMomentum.durationFast,
        momentumDurationDefault: FlowRefMomentum.durationNormal,
        momentumDurationSlow: FlowRefMomentum.durationSlow,
        momentumEasingStandard: FlowRefMomentum.easingStandard,
        momentumEasingEnter: FlowRefMomentum.easingEnter,
        momentumEasingExit: FlowRefMomentum.easingExit,
        // ── state ──
        stateHoverOpacity: FlowRefState.opacityHover,
        statePressedOpacity: FlowRefState.opacityPressed,
        stateSelectedOpacity: FlowRefState.opacitySelected,
        stateDisabledOpacity: FlowRefState.opacityDisabled,
        stateDimmedOpacity: FlowRefState.opacityDimmed,
        stateFaintOpacity: FlowRefState.opacityMuted,
        stateSubtleOpacity: FlowRefState.opacitySubtle,
        // ── button padding ──
        buttonPaddingXSm: FlowRefFrame.space4,
        buttonPaddingXMd: FlowRefFrame.space5,
        buttonPaddingXLg: FlowRefFrame.space6,
        buttonPaddingXXl: FlowRefFrame.space7,
      );

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // Factory: Dark theme
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  factory FlowSysTokens.dark() => FlowSysTokens(
        // ── energy.surface ──
        surfacePrimary: FlowRefEnergy.neutral950,
        surfaceSecondary: FlowRefEnergy.neutral900,
        surfaceTertiary: FlowRefEnergy.neutral800,
        surfaceSunken: FlowRefEnergy.neutral700,
        surfaceInverse: FlowRefEnergy.neutral100,
        surfaceColdWhite: FlowRefEnergy.neutral900,
        surfaceAccent: FlowRefEnergy.blue900,
        surfaceDanger: FlowRefEnergy.red900,
        surfaceSuccess: FlowRefEnergy.green900,
        surfaceWarning: FlowRefEnergy.orange900,
        // ── energy.text ──
        textPrimary: FlowRefEnergy.neutral100,
        textSecondary: FlowRefEnergy.neutral400,
        textTertiary: FlowRefEnergy.neutral500,
        textInverse: FlowRefEnergy.neutral900,
        textOnAction: FlowRefEnergy.neutral900,
        textLink: FlowRefEnergy.blue200,
        textAccent: FlowRefEnergy.blue200,
        textDanger: FlowRefEnergy.red200,
        textSuccess: FlowRefEnergy.green200,
        textWarning: FlowRefEnergy.orange200,
        textDisabled: FlowRefEnergy.neutral600,
        // ── energy.border ──
        borderDefault: Color.fromRGBO(
            FlowRefState.borderDarkBaseR,
            FlowRefState.borderDarkBaseG,
            FlowRefState.borderDarkBaseB,
            FlowRefState.borderDefaultAlpha),
        borderStrong: Color.fromRGBO(
            FlowRefState.borderDarkBaseR,
            FlowRefState.borderDarkBaseG,
            FlowRefState.borderDarkBaseB,
            FlowRefState.borderStrongAlpha),
        borderSubtle: Color.fromRGBO(FlowRefState.borderDarkBaseR,
            FlowRefState.borderDarkBaseG, FlowRefState.borderDarkBaseB, 0.05),
        borderFocus: FlowRefEnergy.blue200,
        borderAccent: FlowRefEnergy.blue700,
        borderDanger: FlowRefEnergy.red700,
        borderSuccess: FlowRefEnergy.green700,
        borderWarning: FlowRefEnergy.orange700,
        borderControl: FlowRefEnergy.neutral400,
        borderControlError: FlowRefEnergy.red300,
        borderControlDisabled: FlowRefEnergy.neutral700,
        // ── energy.action ──
        actionPrimary: FlowRefEnergy.blue200,
        actionPrimaryHover: FlowRefEnergy.blue100,
        actionPrimaryActive: FlowRefEnergy.blue300,
        actionSecondary: FlowRefEnergy.neutral800,
        actionSecondaryHover: FlowRefEnergy.neutral700,
        actionGhost: FlowRefEnergy.transparent,
        actionGhostHover: FlowRefEnergy.neutral800,
        actionHigh: FlowRefEnergy.neutral100,
        actionHighHover: FlowRefEnergy.neutral300,
        actionHighActive: FlowRefEnergy.neutral200,
        actionMediumBorder: FlowRefEnergy.neutral100,
        actionMediumActive: FlowRefEnergy.neutral600,
        actionLowActive: FlowRefEnergy.blue300,
        actionDestructive: FlowRefEnergy.red200,
        actionDestructiveHover: FlowRefEnergy.red100,
        actionDestructiveSubtle: FlowRefEnergy.red900,
        actionDestructiveActive: FlowRefEnergy.red300,
        // ── energy.state ──
        stateDisabledBg: FlowRefEnergy.neutral600,
        stateDisabledText: FlowRefEnergy.neutral400,
        stateDisabledBorder: FlowRefEnergy.neutral600,
        // ── energy.status ──
        statusSuccess: FlowRefEnergy.green200,
        statusSuccessSubtle: FlowRefEnergy.green900,
        statusSuccessMuted: FlowRefEnergy.green800,
        statusWarning: FlowRefEnergy.orange200,
        statusWarningSubtle: FlowRefEnergy.orange900,
        statusWarningMuted: FlowRefEnergy.orange800,
        statusError: FlowRefEnergy.red200,
        statusErrorSubtle: FlowRefEnergy.red900,
        statusErrorMuted: FlowRefEnergy.red800,
        statusInfo: FlowRefEnergy.blue200,
        statusInfoSubtle: FlowRefEnergy.blue900,
        statusInfoMuted: FlowRefEnergy.blue800,
        // ── extended palettes (dark) ──
        surfacePurple: FlowRefEnergy.purple700,
        textPurple: FlowRefEnergy.purple100,
        borderPurple: FlowRefEnergy.purple500,
        statusPurple: FlowRefEnergy.purple100,
        statusPurpleSubtle: FlowRefEnergy.purple700,
        statusPurpleMuted: FlowRefEnergy.purple500,
        surfaceTeal: FlowRefEnergy.teal700,
        textTeal: FlowRefEnergy.teal100,
        borderTeal: FlowRefEnergy.teal500,
        statusTeal: FlowRefEnergy.teal100,
        statusTealSubtle: FlowRefEnergy.teal700,
        statusTealMuted: FlowRefEnergy.teal500,
        surfaceYellow: FlowRefEnergy.orange900,
        textYellow: FlowRefEnergy.orange200,
        borderYellow: FlowRefEnergy.orange700,
        statusYellow: FlowRefEnergy.orange200,
        statusYellowSubtle: FlowRefEnergy.orange900,
        statusYellowMuted: FlowRefEnergy.orange800,
        surfacePink: FlowRefEnergy.red900,
        textPink: FlowRefEnergy.red200,
        borderPink: FlowRefEnergy.red700,
        statusPink: FlowRefEnergy.red200,
        statusPinkSubtle: FlowRefEnergy.red900,
        statusPinkMuted: FlowRefEnergy.red800,
        // ── energy.icon ──
        iconDefault: FlowRefEnergy.neutral100,
        iconSecondary: FlowRefEnergy.neutral400,
        iconTertiary: FlowRefEnergy.neutral500,
        iconAction: FlowRefEnergy.blue200,
        iconInverse: FlowRefEnergy.neutral900,
        iconOnAction: FlowRefEnergy.neutral900,
        iconDisabled: FlowRefEnergy.neutral600,
        iconSuccess: FlowRefEnergy.green200,
        iconWarning: FlowRefEnergy.orange200,
        iconError: FlowRefEnergy.red200,
        iconInfo: FlowRefEnergy.blue200,
        // ── energy.control ──
        controlBorderInactive: FlowRefEnergy.neutral400,
        controlBorderInactivePressed: FlowRefEnergy.neutral300,
        controlBorderDisabled: FlowRefEnergy.neutral700,
        controlFillPressed: FlowRefEnergy.blue300,
        controlFillDisabled: FlowRefEnergy.neutral600,
        controlDot: FlowRefEnergy.neutral900,
        controlStateLayerInactive: FlowRefEnergy.neutral400,
        // ── energy.switch ──
        switchTrackOff: FlowRefEnergy.neutral600,
        switchTrackOffHover: FlowRefEnergy.neutral500,
        switchTrackDisabled: FlowRefEnergy.neutral800,
        switchThumbOff: FlowRefEnergy.neutral200,
        switchThumbOn: FlowRefEnergy.neutral900,
        switchThumbDisabled: FlowRefEnergy.neutral700,
        switchThumbIconDisabled: FlowRefEnergy.neutral600,
        // ── depth ──
        depthOverlay: FlowRefDepth.overlayDark,
        depthElevationLight: FlowRefDepth.shadowDark1,
        depthElevationMedium: FlowRefDepth.shadowDark2,
        depthElevationHigh: FlowRefDepth.shadowDark3,
        // ── frame.height (same as light) ──
        heightControlSm: FlowRefFrame.heightControlSm,
        heightControlMd: FlowRefFrame.heightControlMd,
        heightControlLg: FlowRefFrame.heightControlLg,
        heightControlXl: FlowRefFrame.heightControlXl,
        // ── frame.padding (same as light) ──
        paddingControl: FlowRefFrame.space5,
        paddingContainer: FlowRefFrame.space6,
        paddingSurface: FlowRefFrame.space12,
        // ── frame.gap (same as light) ──
        gapTight: FlowRefFrame.spaceMicro,
        gapComponent: FlowRefFrame.space5,
        gapComponentLg: FlowRefFrame.space7,
        gapSubsection: FlowRefFrame.space9,
        gapSection: FlowRefFrame.space16,
        gapPage: FlowRefFrame.space20,
        // ── frame.radius (same as light) ──
        radiusSm: FlowRefFrame.radius1,
        radiusControl: FlowRefFrame.radius3,
        radiusContainer: FlowRefFrame.radius3,
        radiusSurface: FlowRefFrame.radius4,
        radiusFull: FlowRefFrame.radiusFull,
        // ── frame.border (same as light) ──
        borderThin: FlowRefFrame.borderThin,
        borderControlWidth: FlowRefFrame.borderControl,
        borderMedium: FlowRefFrame.borderMedium,
        borderIndicator: FlowRefFrame.borderIndicator,
        // ── frame.content (same as light) ──
        contentDialog: FlowRefFrame.contentDialog,
        // ── frame.sidebar (same as light) ──
        sidebarExpanded: FlowRefFrame.sidebarExpanded,
        sidebarCollapsed: FlowRefFrame.sidebarCollapsed,
        // ── frame.space (same as light) ──
        spaceMicro: FlowRefFrame.spaceMicro,
        // ── voice (same as light — typography is not theme-dependent) ──
        displayXlFontSize: FlowRefVoice.size14,
        displayXlFontWeight: FlowRefVoice.weightBold,
        displayXlLineHeight: FlowRefVoice.lineHeightDisplay,
        displayXlLetterSpacing: FlowRefVoice.letterSpacingTight,
        displayXlFontFamily: FlowRefVoice.familyBrand,
        displayLFontSize: FlowRefVoice.size13,
        displayLFontWeight: FlowRefVoice.weightBold,
        displayLLineHeight: FlowRefVoice.lineHeightDisplay,
        displayLLetterSpacing: FlowRefVoice.letterSpacingTight,
        displayLFontFamily: FlowRefVoice.familyBrand,
        displayMFontSize: FlowRefVoice.size12,
        displayMFontWeight: FlowRefVoice.weightBold,
        displayMLineHeight: FlowRefVoice.lineHeightNormal,
        displayMLetterSpacing: FlowRefVoice.letterSpacingSnug,
        displayMFontFamily: FlowRefVoice.familyBrand,
        displaySFontSize: FlowRefVoice.size11,
        displaySFontWeight: FlowRefVoice.weightBold,
        displaySLineHeight: FlowRefVoice.lineHeightSnug,
        displaySLetterSpacing: FlowRefVoice.letterSpacingSnug,
        displaySFontFamily: FlowRefVoice.familyBrand,
        displayXsFontSize: FlowRefVoice.size10,
        displayXsFontWeight: FlowRefVoice.weightBold,
        displayXsLineHeight: FlowRefVoice.lineHeightNormal,
        displayXsLetterSpacing: FlowRefVoice.letterSpacingNormal,
        displayXsFontFamily: FlowRefVoice.familyBrand,
        headingLFontSize: FlowRefVoice.size9,
        headingLFontWeight: FlowRefVoice.weightBold,
        headingLLineHeight: FlowRefVoice.lineHeightNormal,
        headingLLetterSpacing: FlowRefVoice.letterSpacingNormal,
        headingLFontFamily: FlowRefVoice.familyBrand,
        headingMFontSize: FlowRefVoice.size8,
        headingMFontWeight: FlowRefVoice.weightBold,
        headingMLineHeight: FlowRefVoice.lineHeightLoose,
        headingMLetterSpacing: FlowRefVoice.letterSpacingNormal,
        headingMFontFamily: FlowRefVoice.familyBrand,
        labelXlFontSize: FlowRefVoice.size9,
        labelLFontSize: FlowRefVoice.size8,
        labelMFontSize: FlowRefVoice.size7,
        labelSFontSize: FlowRefVoice.size6,
        labelXsFontSize: FlowRefVoice.size5,
        paragraphLFontSize: FlowRefVoice.size7,
        paragraphMFontSize: FlowRefVoice.size6,
        paragraphSFontSize: FlowRefVoice.size5,
        captionFontSize: FlowRefVoice.size4,
        captionFontWeight: FlowRefVoice.weightMedium,
        captionLineHeight: FlowRefVoice.lineHeightRelaxed,
        captionLetterSpacing: FlowRefVoice.letterSpacingWide,
        captionFontFamily: FlowRefVoice.familySans,
        overlineFontSize: FlowRefVoice.size1,
        overlineFontWeight: FlowRefVoice.weightBold,
        overlineLineHeight: FlowRefVoice.lineHeightNormal,
        overlineLetterSpacing: FlowRefVoice.letterSpacingCaps,
        overlineFontFamily: FlowRefVoice.familySans,
        controlFontFamily: FlowRefVoice.familySans,
        controlFontWeight: FlowRefVoice.weightSemibold,
        controlLineHeight: FlowRefVoice.lineHeightNone,
        // ── icon.size (same as light) ──
        iconSizeXs: FlowRefIcon.sizeXs,
        iconSizeSm: FlowRefIcon.sizeSm,
        iconSizeMd: FlowRefIcon.sizeMd,
        iconSizeLg: FlowRefIcon.sizeLg,
        iconSizeXl: FlowRefIcon.sizeXl,
        // ── tone (dark remapping) ──
        toneNeutralText: FlowRefEnergy.neutral50,
        toneNeutralTextSubtle: FlowRefEnergy.neutral400,
        toneNeutralWeight: FlowRefVoice.weightRegular,
        toneBrandText: FlowRefEnergy.blue300,
        toneBrandTextSubtle: FlowRefEnergy.blue400,
        toneBrandWeight: FlowRefVoice.weightMedium,
        toneMarketingText: FlowRefEnergy.orange300,
        toneMarketingTextSubtle: FlowRefEnergy.orange400,
        toneMarketingWeight: FlowRefVoice.weightMedium,
        toneSystemText: FlowRefEnergy.neutral300,
        toneSystemTextSubtle: FlowRefEnergy.neutral500,
        toneSystemWeight: FlowRefVoice.weightRegular,
        // ── momentum (same as light) ──
        momentumDurationFast: FlowRefMomentum.durationFast,
        momentumDurationDefault: FlowRefMomentum.durationNormal,
        momentumDurationSlow: FlowRefMomentum.durationSlow,
        momentumEasingStandard: FlowRefMomentum.easingStandard,
        momentumEasingEnter: FlowRefMomentum.easingEnter,
        momentumEasingExit: FlowRefMomentum.easingExit,
        // ── state (same as light) ──
        stateHoverOpacity: FlowRefState.opacityHover,
        statePressedOpacity: FlowRefState.opacityPressed,
        stateSelectedOpacity: FlowRefState.opacitySelected,
        stateDisabledOpacity: FlowRefState.opacityDisabled,
        stateDimmedOpacity: FlowRefState.opacityDimmed,
        stateFaintOpacity: FlowRefState.opacityMuted,
        stateSubtleOpacity: FlowRefState.opacitySubtle,
        // ── button padding (same as light) ──
        buttonPaddingXSm: FlowRefFrame.space4,
        buttonPaddingXMd: FlowRefFrame.space5,
        buttonPaddingXLg: FlowRefFrame.space6,
        buttonPaddingXXl: FlowRefFrame.space7,
      );

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // copyWith
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  @override
  FlowSysTokens copyWith({
    Color? surfacePrimary,
    Color? surfaceSecondary,
    Color? surfaceTertiary,
    Color? surfaceSunken,
    Color? surfaceInverse,
    Color? surfaceColdWhite,
    Color? surfaceAccent,
    Color? surfaceDanger,
    Color? surfaceSuccess,
    Color? surfaceWarning,
    Color? textPrimary,
    Color? textSecondary,
    Color? textTertiary,
    Color? textInverse,
    Color? textOnAction,
    Color? textLink,
    Color? textAccent,
    Color? textDanger,
    Color? textSuccess,
    Color? textWarning,
    Color? textDisabled,
    Color? borderDefault,
    Color? borderStrong,
    Color? borderSubtle,
    Color? borderFocus,
    Color? borderAccent,
    Color? borderDanger,
    Color? borderSuccess,
    Color? borderWarning,
    Color? borderControl,
    Color? borderControlError,
    Color? borderControlDisabled,
    Color? actionPrimary,
    Color? actionPrimaryHover,
    Color? actionPrimaryActive,
    Color? actionSecondary,
    Color? actionSecondaryHover,
    Color? actionGhost,
    Color? actionGhostHover,
    Color? actionHigh,
    Color? actionHighHover,
    Color? actionHighActive,
    Color? actionMediumBorder,
    Color? actionMediumActive,
    Color? actionLowActive,
    Color? actionDestructive,
    Color? actionDestructiveHover,
    Color? actionDestructiveSubtle,
    Color? actionDestructiveActive,
    Color? stateDisabledBg,
    Color? stateDisabledText,
    Color? stateDisabledBorder,
    Color? statusSuccess,
    Color? statusSuccessSubtle,
    Color? statusSuccessMuted,
    Color? statusWarning,
    Color? statusWarningSubtle,
    Color? statusWarningMuted,
    Color? statusError,
    Color? statusErrorSubtle,
    Color? statusErrorMuted,
    Color? statusInfo,
    Color? statusInfoSubtle,
    Color? statusInfoMuted,
    Color? surfacePurple,
    Color? textPurple,
    Color? borderPurple,
    Color? statusPurple,
    Color? statusPurpleSubtle,
    Color? statusPurpleMuted,
    Color? surfaceTeal,
    Color? textTeal,
    Color? borderTeal,
    Color? statusTeal,
    Color? statusTealSubtle,
    Color? statusTealMuted,
    Color? surfaceYellow,
    Color? textYellow,
    Color? borderYellow,
    Color? statusYellow,
    Color? statusYellowSubtle,
    Color? statusYellowMuted,
    Color? surfacePink,
    Color? textPink,
    Color? borderPink,
    Color? statusPink,
    Color? statusPinkSubtle,
    Color? statusPinkMuted,
    Color? iconDefault,
    Color? iconSecondary,
    Color? iconTertiary,
    Color? iconAction,
    Color? iconInverse,
    Color? iconOnAction,
    Color? iconDisabled,
    Color? iconSuccess,
    Color? iconWarning,
    Color? iconError,
    Color? iconInfo,
    Color? controlBorderInactive,
    Color? controlBorderInactivePressed,
    Color? controlBorderDisabled,
    Color? controlFillPressed,
    Color? controlFillDisabled,
    Color? controlDot,
    Color? controlStateLayerInactive,
    Color? switchTrackOff,
    Color? switchTrackOffHover,
    Color? switchTrackDisabled,
    Color? switchThumbOff,
    Color? switchThumbOn,
    Color? switchThumbDisabled,
    Color? switchThumbIconDisabled,
    Color? depthOverlay,
    List<BoxShadow>? depthElevationLight,
    List<BoxShadow>? depthElevationMedium,
    List<BoxShadow>? depthElevationHigh,
    double? heightControlSm,
    double? heightControlMd,
    double? heightControlLg,
    double? heightControlXl,
    double? paddingControl,
    double? paddingContainer,
    double? paddingSurface,
    double? gapTight,
    double? gapComponent,
    double? gapComponentLg,
    double? gapSubsection,
    double? gapSection,
    double? gapPage,
    double? radiusSm,
    double? radiusControl,
    double? radiusContainer,
    double? radiusSurface,
    double? radiusFull,
    double? borderThin,
    double? borderControlWidth,
    double? borderMedium,
    double? borderIndicator,
    double? contentDialog,
    double? sidebarExpanded,
    double? sidebarCollapsed,
    double? spaceMicro,
    double? displayXlFontSize,
    FontWeight? displayXlFontWeight,
    double? displayXlLineHeight,
    double? displayXlLetterSpacing,
    String? displayXlFontFamily,
    double? displayLFontSize,
    FontWeight? displayLFontWeight,
    double? displayLLineHeight,
    double? displayLLetterSpacing,
    String? displayLFontFamily,
    double? displayMFontSize,
    FontWeight? displayMFontWeight,
    double? displayMLineHeight,
    double? displayMLetterSpacing,
    String? displayMFontFamily,
    double? displaySFontSize,
    FontWeight? displaySFontWeight,
    double? displaySLineHeight,
    double? displaySLetterSpacing,
    String? displaySFontFamily,
    double? displayXsFontSize,
    FontWeight? displayXsFontWeight,
    double? displayXsLineHeight,
    double? displayXsLetterSpacing,
    String? displayXsFontFamily,
    double? headingLFontSize,
    FontWeight? headingLFontWeight,
    double? headingLLineHeight,
    double? headingLLetterSpacing,
    String? headingLFontFamily,
    double? headingMFontSize,
    FontWeight? headingMFontWeight,
    double? headingMLineHeight,
    double? headingMLetterSpacing,
    String? headingMFontFamily,
    double? labelXlFontSize,
    double? labelLFontSize,
    double? labelMFontSize,
    double? labelSFontSize,
    double? labelXsFontSize,
    double? paragraphLFontSize,
    double? paragraphMFontSize,
    double? paragraphSFontSize,
    double? captionFontSize,
    FontWeight? captionFontWeight,
    double? captionLineHeight,
    double? captionLetterSpacing,
    String? captionFontFamily,
    double? overlineFontSize,
    FontWeight? overlineFontWeight,
    double? overlineLineHeight,
    double? overlineLetterSpacing,
    String? overlineFontFamily,
    String? controlFontFamily,
    FontWeight? controlFontWeight,
    double? controlLineHeight,
    double? iconSizeXs,
    double? iconSizeSm,
    double? iconSizeMd,
    double? iconSizeLg,
    double? iconSizeXl,
    Color? toneNeutralText,
    Color? toneNeutralTextSubtle,
    FontWeight? toneNeutralWeight,
    Color? toneBrandText,
    Color? toneBrandTextSubtle,
    FontWeight? toneBrandWeight,
    Color? toneMarketingText,
    Color? toneMarketingTextSubtle,
    FontWeight? toneMarketingWeight,
    Color? toneSystemText,
    Color? toneSystemTextSubtle,
    FontWeight? toneSystemWeight,
    Duration? momentumDurationFast,
    Duration? momentumDurationDefault,
    Duration? momentumDurationSlow,
    Curve? momentumEasingStandard,
    Curve? momentumEasingEnter,
    Curve? momentumEasingExit,
    double? stateHoverOpacity,
    double? statePressedOpacity,
    double? stateSelectedOpacity,
    double? stateDisabledOpacity,
    double? stateDimmedOpacity,
    double? stateFaintOpacity,
    double? stateSubtleOpacity,
    double? buttonPaddingXSm,
    double? buttonPaddingXMd,
    double? buttonPaddingXLg,
    double? buttonPaddingXXl,
  }) {
    return FlowSysTokens(
      surfacePrimary: surfacePrimary ?? this.surfacePrimary,
      surfaceSecondary: surfaceSecondary ?? this.surfaceSecondary,
      surfaceTertiary: surfaceTertiary ?? this.surfaceTertiary,
      surfaceSunken: surfaceSunken ?? this.surfaceSunken,
      surfaceInverse: surfaceInverse ?? this.surfaceInverse,
      surfaceColdWhite: surfaceColdWhite ?? this.surfaceColdWhite,
      surfaceAccent: surfaceAccent ?? this.surfaceAccent,
      surfaceDanger: surfaceDanger ?? this.surfaceDanger,
      surfaceSuccess: surfaceSuccess ?? this.surfaceSuccess,
      surfaceWarning: surfaceWarning ?? this.surfaceWarning,
      textPrimary: textPrimary ?? this.textPrimary,
      textSecondary: textSecondary ?? this.textSecondary,
      textTertiary: textTertiary ?? this.textTertiary,
      textInverse: textInverse ?? this.textInverse,
      textOnAction: textOnAction ?? this.textOnAction,
      textLink: textLink ?? this.textLink,
      textAccent: textAccent ?? this.textAccent,
      textDanger: textDanger ?? this.textDanger,
      textSuccess: textSuccess ?? this.textSuccess,
      textWarning: textWarning ?? this.textWarning,
      textDisabled: textDisabled ?? this.textDisabled,
      borderDefault: borderDefault ?? this.borderDefault,
      borderStrong: borderStrong ?? this.borderStrong,
      borderSubtle: borderSubtle ?? this.borderSubtle,
      borderFocus: borderFocus ?? this.borderFocus,
      borderAccent: borderAccent ?? this.borderAccent,
      borderDanger: borderDanger ?? this.borderDanger,
      borderSuccess: borderSuccess ?? this.borderSuccess,
      borderWarning: borderWarning ?? this.borderWarning,
      borderControl: borderControl ?? this.borderControl,
      borderControlError: borderControlError ?? this.borderControlError,
      borderControlDisabled:
          borderControlDisabled ?? this.borderControlDisabled,
      actionPrimary: actionPrimary ?? this.actionPrimary,
      actionPrimaryHover: actionPrimaryHover ?? this.actionPrimaryHover,
      actionPrimaryActive: actionPrimaryActive ?? this.actionPrimaryActive,
      actionSecondary: actionSecondary ?? this.actionSecondary,
      actionSecondaryHover: actionSecondaryHover ?? this.actionSecondaryHover,
      actionGhost: actionGhost ?? this.actionGhost,
      actionGhostHover: actionGhostHover ?? this.actionGhostHover,
      actionHigh: actionHigh ?? this.actionHigh,
      actionHighHover: actionHighHover ?? this.actionHighHover,
      actionHighActive: actionHighActive ?? this.actionHighActive,
      actionMediumBorder: actionMediumBorder ?? this.actionMediumBorder,
      actionMediumActive: actionMediumActive ?? this.actionMediumActive,
      actionLowActive: actionLowActive ?? this.actionLowActive,
      actionDestructive: actionDestructive ?? this.actionDestructive,
      actionDestructiveHover:
          actionDestructiveHover ?? this.actionDestructiveHover,
      actionDestructiveSubtle:
          actionDestructiveSubtle ?? this.actionDestructiveSubtle,
      actionDestructiveActive:
          actionDestructiveActive ?? this.actionDestructiveActive,
      stateDisabledBg: stateDisabledBg ?? this.stateDisabledBg,
      stateDisabledText: stateDisabledText ?? this.stateDisabledText,
      stateDisabledBorder: stateDisabledBorder ?? this.stateDisabledBorder,
      statusSuccess: statusSuccess ?? this.statusSuccess,
      statusSuccessSubtle: statusSuccessSubtle ?? this.statusSuccessSubtle,
      statusSuccessMuted: statusSuccessMuted ?? this.statusSuccessMuted,
      statusWarning: statusWarning ?? this.statusWarning,
      statusWarningSubtle: statusWarningSubtle ?? this.statusWarningSubtle,
      statusWarningMuted: statusWarningMuted ?? this.statusWarningMuted,
      statusError: statusError ?? this.statusError,
      statusErrorSubtle: statusErrorSubtle ?? this.statusErrorSubtle,
      statusErrorMuted: statusErrorMuted ?? this.statusErrorMuted,
      statusInfo: statusInfo ?? this.statusInfo,
      statusInfoSubtle: statusInfoSubtle ?? this.statusInfoSubtle,
      statusInfoMuted: statusInfoMuted ?? this.statusInfoMuted,
      surfacePurple: surfacePurple ?? this.surfacePurple,
      textPurple: textPurple ?? this.textPurple,
      borderPurple: borderPurple ?? this.borderPurple,
      statusPurple: statusPurple ?? this.statusPurple,
      statusPurpleSubtle: statusPurpleSubtle ?? this.statusPurpleSubtle,
      statusPurpleMuted: statusPurpleMuted ?? this.statusPurpleMuted,
      surfaceTeal: surfaceTeal ?? this.surfaceTeal,
      textTeal: textTeal ?? this.textTeal,
      borderTeal: borderTeal ?? this.borderTeal,
      statusTeal: statusTeal ?? this.statusTeal,
      statusTealSubtle: statusTealSubtle ?? this.statusTealSubtle,
      statusTealMuted: statusTealMuted ?? this.statusTealMuted,
      surfaceYellow: surfaceYellow ?? this.surfaceYellow,
      textYellow: textYellow ?? this.textYellow,
      borderYellow: borderYellow ?? this.borderYellow,
      statusYellow: statusYellow ?? this.statusYellow,
      statusYellowSubtle: statusYellowSubtle ?? this.statusYellowSubtle,
      statusYellowMuted: statusYellowMuted ?? this.statusYellowMuted,
      surfacePink: surfacePink ?? this.surfacePink,
      textPink: textPink ?? this.textPink,
      borderPink: borderPink ?? this.borderPink,
      statusPink: statusPink ?? this.statusPink,
      statusPinkSubtle: statusPinkSubtle ?? this.statusPinkSubtle,
      statusPinkMuted: statusPinkMuted ?? this.statusPinkMuted,
      iconDefault: iconDefault ?? this.iconDefault,
      iconSecondary: iconSecondary ?? this.iconSecondary,
      iconTertiary: iconTertiary ?? this.iconTertiary,
      iconAction: iconAction ?? this.iconAction,
      iconInverse: iconInverse ?? this.iconInverse,
      iconOnAction: iconOnAction ?? this.iconOnAction,
      iconDisabled: iconDisabled ?? this.iconDisabled,
      iconSuccess: iconSuccess ?? this.iconSuccess,
      iconWarning: iconWarning ?? this.iconWarning,
      iconError: iconError ?? this.iconError,
      iconInfo: iconInfo ?? this.iconInfo,
      controlBorderInactive:
          controlBorderInactive ?? this.controlBorderInactive,
      controlBorderInactivePressed:
          controlBorderInactivePressed ?? this.controlBorderInactivePressed,
      controlBorderDisabled:
          controlBorderDisabled ?? this.controlBorderDisabled,
      controlFillPressed: controlFillPressed ?? this.controlFillPressed,
      controlFillDisabled: controlFillDisabled ?? this.controlFillDisabled,
      controlDot: controlDot ?? this.controlDot,
      controlStateLayerInactive:
          controlStateLayerInactive ?? this.controlStateLayerInactive,
      switchTrackOff: switchTrackOff ?? this.switchTrackOff,
      switchTrackOffHover: switchTrackOffHover ?? this.switchTrackOffHover,
      switchTrackDisabled: switchTrackDisabled ?? this.switchTrackDisabled,
      switchThumbOff: switchThumbOff ?? this.switchThumbOff,
      switchThumbOn: switchThumbOn ?? this.switchThumbOn,
      switchThumbDisabled: switchThumbDisabled ?? this.switchThumbDisabled,
      switchThumbIconDisabled:
          switchThumbIconDisabled ?? this.switchThumbIconDisabled,
      depthOverlay: depthOverlay ?? this.depthOverlay,
      depthElevationLight: depthElevationLight ?? this.depthElevationLight,
      depthElevationMedium: depthElevationMedium ?? this.depthElevationMedium,
      depthElevationHigh: depthElevationHigh ?? this.depthElevationHigh,
      heightControlSm: heightControlSm ?? this.heightControlSm,
      heightControlMd: heightControlMd ?? this.heightControlMd,
      heightControlLg: heightControlLg ?? this.heightControlLg,
      heightControlXl: heightControlXl ?? this.heightControlXl,
      paddingControl: paddingControl ?? this.paddingControl,
      paddingContainer: paddingContainer ?? this.paddingContainer,
      paddingSurface: paddingSurface ?? this.paddingSurface,
      gapTight: gapTight ?? this.gapTight,
      gapComponent: gapComponent ?? this.gapComponent,
      gapComponentLg: gapComponentLg ?? this.gapComponentLg,
      gapSubsection: gapSubsection ?? this.gapSubsection,
      gapSection: gapSection ?? this.gapSection,
      gapPage: gapPage ?? this.gapPage,
      radiusSm: radiusSm ?? this.radiusSm,
      radiusControl: radiusControl ?? this.radiusControl,
      radiusContainer: radiusContainer ?? this.radiusContainer,
      radiusSurface: radiusSurface ?? this.radiusSurface,
      radiusFull: radiusFull ?? this.radiusFull,
      borderThin: borderThin ?? this.borderThin,
      borderControlWidth: borderControlWidth ?? this.borderControlWidth,
      borderMedium: borderMedium ?? this.borderMedium,
      borderIndicator: borderIndicator ?? this.borderIndicator,
      contentDialog: contentDialog ?? this.contentDialog,
      sidebarExpanded: sidebarExpanded ?? this.sidebarExpanded,
      sidebarCollapsed: sidebarCollapsed ?? this.sidebarCollapsed,
      spaceMicro: spaceMicro ?? this.spaceMicro,
      displayXlFontSize: displayXlFontSize ?? this.displayXlFontSize,
      displayXlFontWeight: displayXlFontWeight ?? this.displayXlFontWeight,
      displayXlLineHeight: displayXlLineHeight ?? this.displayXlLineHeight,
      displayXlLetterSpacing:
          displayXlLetterSpacing ?? this.displayXlLetterSpacing,
      displayXlFontFamily: displayXlFontFamily ?? this.displayXlFontFamily,
      displayLFontSize: displayLFontSize ?? this.displayLFontSize,
      displayLFontWeight: displayLFontWeight ?? this.displayLFontWeight,
      displayLLineHeight: displayLLineHeight ?? this.displayLLineHeight,
      displayLLetterSpacing:
          displayLLetterSpacing ?? this.displayLLetterSpacing,
      displayLFontFamily: displayLFontFamily ?? this.displayLFontFamily,
      displayMFontSize: displayMFontSize ?? this.displayMFontSize,
      displayMFontWeight: displayMFontWeight ?? this.displayMFontWeight,
      displayMLineHeight: displayMLineHeight ?? this.displayMLineHeight,
      displayMLetterSpacing:
          displayMLetterSpacing ?? this.displayMLetterSpacing,
      displayMFontFamily: displayMFontFamily ?? this.displayMFontFamily,
      displaySFontSize: displaySFontSize ?? this.displaySFontSize,
      displaySFontWeight: displaySFontWeight ?? this.displaySFontWeight,
      displaySLineHeight: displaySLineHeight ?? this.displaySLineHeight,
      displaySLetterSpacing:
          displaySLetterSpacing ?? this.displaySLetterSpacing,
      displaySFontFamily: displaySFontFamily ?? this.displaySFontFamily,
      displayXsFontSize: displayXsFontSize ?? this.displayXsFontSize,
      displayXsFontWeight: displayXsFontWeight ?? this.displayXsFontWeight,
      displayXsLineHeight: displayXsLineHeight ?? this.displayXsLineHeight,
      displayXsLetterSpacing:
          displayXsLetterSpacing ?? this.displayXsLetterSpacing,
      displayXsFontFamily: displayXsFontFamily ?? this.displayXsFontFamily,
      headingLFontSize: headingLFontSize ?? this.headingLFontSize,
      headingLFontWeight: headingLFontWeight ?? this.headingLFontWeight,
      headingLLineHeight: headingLLineHeight ?? this.headingLLineHeight,
      headingLLetterSpacing:
          headingLLetterSpacing ?? this.headingLLetterSpacing,
      headingLFontFamily: headingLFontFamily ?? this.headingLFontFamily,
      headingMFontSize: headingMFontSize ?? this.headingMFontSize,
      headingMFontWeight: headingMFontWeight ?? this.headingMFontWeight,
      headingMLineHeight: headingMLineHeight ?? this.headingMLineHeight,
      headingMLetterSpacing:
          headingMLetterSpacing ?? this.headingMLetterSpacing,
      headingMFontFamily: headingMFontFamily ?? this.headingMFontFamily,
      labelXlFontSize: labelXlFontSize ?? this.labelXlFontSize,
      labelLFontSize: labelLFontSize ?? this.labelLFontSize,
      labelMFontSize: labelMFontSize ?? this.labelMFontSize,
      labelSFontSize: labelSFontSize ?? this.labelSFontSize,
      labelXsFontSize: labelXsFontSize ?? this.labelXsFontSize,
      paragraphLFontSize: paragraphLFontSize ?? this.paragraphLFontSize,
      paragraphMFontSize: paragraphMFontSize ?? this.paragraphMFontSize,
      paragraphSFontSize: paragraphSFontSize ?? this.paragraphSFontSize,
      captionFontSize: captionFontSize ?? this.captionFontSize,
      captionFontWeight: captionFontWeight ?? this.captionFontWeight,
      captionLineHeight: captionLineHeight ?? this.captionLineHeight,
      captionLetterSpacing: captionLetterSpacing ?? this.captionLetterSpacing,
      captionFontFamily: captionFontFamily ?? this.captionFontFamily,
      overlineFontSize: overlineFontSize ?? this.overlineFontSize,
      overlineFontWeight: overlineFontWeight ?? this.overlineFontWeight,
      overlineLineHeight: overlineLineHeight ?? this.overlineLineHeight,
      overlineLetterSpacing:
          overlineLetterSpacing ?? this.overlineLetterSpacing,
      overlineFontFamily: overlineFontFamily ?? this.overlineFontFamily,
      controlFontFamily: controlFontFamily ?? this.controlFontFamily,
      controlFontWeight: controlFontWeight ?? this.controlFontWeight,
      controlLineHeight: controlLineHeight ?? this.controlLineHeight,
      iconSizeXs: iconSizeXs ?? this.iconSizeXs,
      iconSizeSm: iconSizeSm ?? this.iconSizeSm,
      iconSizeMd: iconSizeMd ?? this.iconSizeMd,
      iconSizeLg: iconSizeLg ?? this.iconSizeLg,
      iconSizeXl: iconSizeXl ?? this.iconSizeXl,
      toneNeutralText: toneNeutralText ?? this.toneNeutralText,
      toneNeutralTextSubtle:
          toneNeutralTextSubtle ?? this.toneNeutralTextSubtle,
      toneNeutralWeight: toneNeutralWeight ?? this.toneNeutralWeight,
      toneBrandText: toneBrandText ?? this.toneBrandText,
      toneBrandTextSubtle: toneBrandTextSubtle ?? this.toneBrandTextSubtle,
      toneBrandWeight: toneBrandWeight ?? this.toneBrandWeight,
      toneMarketingText: toneMarketingText ?? this.toneMarketingText,
      toneMarketingTextSubtle:
          toneMarketingTextSubtle ?? this.toneMarketingTextSubtle,
      toneMarketingWeight: toneMarketingWeight ?? this.toneMarketingWeight,
      toneSystemText: toneSystemText ?? this.toneSystemText,
      toneSystemTextSubtle: toneSystemTextSubtle ?? this.toneSystemTextSubtle,
      toneSystemWeight: toneSystemWeight ?? this.toneSystemWeight,
      momentumDurationFast: momentumDurationFast ?? this.momentumDurationFast,
      momentumDurationDefault:
          momentumDurationDefault ?? this.momentumDurationDefault,
      momentumDurationSlow: momentumDurationSlow ?? this.momentumDurationSlow,
      momentumEasingStandard:
          momentumEasingStandard ?? this.momentumEasingStandard,
      momentumEasingEnter: momentumEasingEnter ?? this.momentumEasingEnter,
      momentumEasingExit: momentumEasingExit ?? this.momentumEasingExit,
      stateHoverOpacity: stateHoverOpacity ?? this.stateHoverOpacity,
      statePressedOpacity: statePressedOpacity ?? this.statePressedOpacity,
      stateSelectedOpacity: stateSelectedOpacity ?? this.stateSelectedOpacity,
      stateDisabledOpacity: stateDisabledOpacity ?? this.stateDisabledOpacity,
      stateDimmedOpacity: stateDimmedOpacity ?? this.stateDimmedOpacity,
      stateFaintOpacity: stateFaintOpacity ?? this.stateFaintOpacity,
      stateSubtleOpacity: stateSubtleOpacity ?? this.stateSubtleOpacity,
      buttonPaddingXSm: buttonPaddingXSm ?? this.buttonPaddingXSm,
      buttonPaddingXMd: buttonPaddingXMd ?? this.buttonPaddingXMd,
      buttonPaddingXLg: buttonPaddingXLg ?? this.buttonPaddingXLg,
      buttonPaddingXXl: buttonPaddingXXl ?? this.buttonPaddingXXl,
    );
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // lerp
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  @override
  FlowSysTokens lerp(covariant FlowSysTokens? other, double t) {
    if (other is! FlowSysTokens) return this;
    return FlowSysTokens(
      // energy.surface
      surfacePrimary: Color.lerp(surfacePrimary, other.surfacePrimary, t)!,
      surfaceSecondary:
          Color.lerp(surfaceSecondary, other.surfaceSecondary, t)!,
      surfaceTertiary: Color.lerp(surfaceTertiary, other.surfaceTertiary, t)!,
      surfaceSunken: Color.lerp(surfaceSunken, other.surfaceSunken, t)!,
      surfaceInverse: Color.lerp(surfaceInverse, other.surfaceInverse, t)!,
      surfaceColdWhite:
          Color.lerp(surfaceColdWhite, other.surfaceColdWhite, t)!,
      surfaceAccent: Color.lerp(surfaceAccent, other.surfaceAccent, t)!,
      surfaceDanger: Color.lerp(surfaceDanger, other.surfaceDanger, t)!,
      surfaceSuccess: Color.lerp(surfaceSuccess, other.surfaceSuccess, t)!,
      surfaceWarning: Color.lerp(surfaceWarning, other.surfaceWarning, t)!,
      // energy.text
      textPrimary: Color.lerp(textPrimary, other.textPrimary, t)!,
      textSecondary: Color.lerp(textSecondary, other.textSecondary, t)!,
      textTertiary: Color.lerp(textTertiary, other.textTertiary, t)!,
      textInverse: Color.lerp(textInverse, other.textInverse, t)!,
      textOnAction: Color.lerp(textOnAction, other.textOnAction, t)!,
      textLink: Color.lerp(textLink, other.textLink, t)!,
      textAccent: Color.lerp(textAccent, other.textAccent, t)!,
      textDanger: Color.lerp(textDanger, other.textDanger, t)!,
      textSuccess: Color.lerp(textSuccess, other.textSuccess, t)!,
      textWarning: Color.lerp(textWarning, other.textWarning, t)!,
      textDisabled: Color.lerp(textDisabled, other.textDisabled, t)!,
      // energy.border
      borderDefault: Color.lerp(borderDefault, other.borderDefault, t)!,
      borderStrong: Color.lerp(borderStrong, other.borderStrong, t)!,
      borderSubtle: Color.lerp(borderSubtle, other.borderSubtle, t)!,
      borderFocus: Color.lerp(borderFocus, other.borderFocus, t)!,
      borderAccent: Color.lerp(borderAccent, other.borderAccent, t)!,
      borderDanger: Color.lerp(borderDanger, other.borderDanger, t)!,
      borderSuccess: Color.lerp(borderSuccess, other.borderSuccess, t)!,
      borderWarning: Color.lerp(borderWarning, other.borderWarning, t)!,
      borderControl: Color.lerp(borderControl, other.borderControl, t)!,
      borderControlError:
          Color.lerp(borderControlError, other.borderControlError, t)!,
      borderControlDisabled:
          Color.lerp(borderControlDisabled, other.borderControlDisabled, t)!,
      // energy.action
      actionPrimary: Color.lerp(actionPrimary, other.actionPrimary, t)!,
      actionPrimaryHover:
          Color.lerp(actionPrimaryHover, other.actionPrimaryHover, t)!,
      actionPrimaryActive:
          Color.lerp(actionPrimaryActive, other.actionPrimaryActive, t)!,
      actionSecondary: Color.lerp(actionSecondary, other.actionSecondary, t)!,
      actionSecondaryHover:
          Color.lerp(actionSecondaryHover, other.actionSecondaryHover, t)!,
      actionGhost: Color.lerp(actionGhost, other.actionGhost, t)!,
      actionGhostHover:
          Color.lerp(actionGhostHover, other.actionGhostHover, t)!,
      actionHigh: Color.lerp(actionHigh, other.actionHigh, t)!,
      actionHighHover: Color.lerp(actionHighHover, other.actionHighHover, t)!,
      actionHighActive:
          Color.lerp(actionHighActive, other.actionHighActive, t)!,
      actionMediumBorder:
          Color.lerp(actionMediumBorder, other.actionMediumBorder, t)!,
      actionMediumActive:
          Color.lerp(actionMediumActive, other.actionMediumActive, t)!,
      actionLowActive: Color.lerp(actionLowActive, other.actionLowActive, t)!,
      actionDestructive:
          Color.lerp(actionDestructive, other.actionDestructive, t)!,
      actionDestructiveHover:
          Color.lerp(actionDestructiveHover, other.actionDestructiveHover, t)!,
      actionDestructiveSubtle: Color.lerp(
          actionDestructiveSubtle, other.actionDestructiveSubtle, t)!,
      actionDestructiveActive: Color.lerp(
          actionDestructiveActive, other.actionDestructiveActive, t)!,
      // energy.state
      stateDisabledBg: Color.lerp(stateDisabledBg, other.stateDisabledBg, t)!,
      stateDisabledText:
          Color.lerp(stateDisabledText, other.stateDisabledText, t)!,
      stateDisabledBorder:
          Color.lerp(stateDisabledBorder, other.stateDisabledBorder, t)!,
      // energy.status
      statusSuccess: Color.lerp(statusSuccess, other.statusSuccess, t)!,
      statusSuccessSubtle:
          Color.lerp(statusSuccessSubtle, other.statusSuccessSubtle, t)!,
      statusSuccessMuted:
          Color.lerp(statusSuccessMuted, other.statusSuccessMuted, t)!,
      statusWarning: Color.lerp(statusWarning, other.statusWarning, t)!,
      statusWarningSubtle:
          Color.lerp(statusWarningSubtle, other.statusWarningSubtle, t)!,
      statusWarningMuted:
          Color.lerp(statusWarningMuted, other.statusWarningMuted, t)!,
      statusError: Color.lerp(statusError, other.statusError, t)!,
      statusErrorSubtle:
          Color.lerp(statusErrorSubtle, other.statusErrorSubtle, t)!,
      statusErrorMuted:
          Color.lerp(statusErrorMuted, other.statusErrorMuted, t)!,
      statusInfo: Color.lerp(statusInfo, other.statusInfo, t)!,
      statusInfoSubtle:
          Color.lerp(statusInfoSubtle, other.statusInfoSubtle, t)!,
      statusInfoMuted: Color.lerp(statusInfoMuted, other.statusInfoMuted, t)!,
      // extended palettes
      surfacePurple: Color.lerp(surfacePurple, other.surfacePurple, t)!,
      textPurple: Color.lerp(textPurple, other.textPurple, t)!,
      borderPurple: Color.lerp(borderPurple, other.borderPurple, t)!,
      statusPurple: Color.lerp(statusPurple, other.statusPurple, t)!,
      statusPurpleSubtle:
          Color.lerp(statusPurpleSubtle, other.statusPurpleSubtle, t)!,
      statusPurpleMuted:
          Color.lerp(statusPurpleMuted, other.statusPurpleMuted, t)!,
      surfaceTeal: Color.lerp(surfaceTeal, other.surfaceTeal, t)!,
      textTeal: Color.lerp(textTeal, other.textTeal, t)!,
      borderTeal: Color.lerp(borderTeal, other.borderTeal, t)!,
      statusTeal: Color.lerp(statusTeal, other.statusTeal, t)!,
      statusTealSubtle:
          Color.lerp(statusTealSubtle, other.statusTealSubtle, t)!,
      statusTealMuted: Color.lerp(statusTealMuted, other.statusTealMuted, t)!,
      surfaceYellow: Color.lerp(surfaceYellow, other.surfaceYellow, t)!,
      textYellow: Color.lerp(textYellow, other.textYellow, t)!,
      borderYellow: Color.lerp(borderYellow, other.borderYellow, t)!,
      statusYellow: Color.lerp(statusYellow, other.statusYellow, t)!,
      statusYellowSubtle:
          Color.lerp(statusYellowSubtle, other.statusYellowSubtle, t)!,
      statusYellowMuted:
          Color.lerp(statusYellowMuted, other.statusYellowMuted, t)!,
      surfacePink: Color.lerp(surfacePink, other.surfacePink, t)!,
      textPink: Color.lerp(textPink, other.textPink, t)!,
      borderPink: Color.lerp(borderPink, other.borderPink, t)!,
      statusPink: Color.lerp(statusPink, other.statusPink, t)!,
      statusPinkSubtle:
          Color.lerp(statusPinkSubtle, other.statusPinkSubtle, t)!,
      statusPinkMuted: Color.lerp(statusPinkMuted, other.statusPinkMuted, t)!,
      // energy.icon
      iconDefault: Color.lerp(iconDefault, other.iconDefault, t)!,
      iconSecondary: Color.lerp(iconSecondary, other.iconSecondary, t)!,
      iconTertiary: Color.lerp(iconTertiary, other.iconTertiary, t)!,
      iconAction: Color.lerp(iconAction, other.iconAction, t)!,
      iconInverse: Color.lerp(iconInverse, other.iconInverse, t)!,
      iconOnAction: Color.lerp(iconOnAction, other.iconOnAction, t)!,
      iconDisabled: Color.lerp(iconDisabled, other.iconDisabled, t)!,
      iconSuccess: Color.lerp(iconSuccess, other.iconSuccess, t)!,
      iconWarning: Color.lerp(iconWarning, other.iconWarning, t)!,
      iconError: Color.lerp(iconError, other.iconError, t)!,
      iconInfo: Color.lerp(iconInfo, other.iconInfo, t)!,
      // energy.control
      controlBorderInactive:
          Color.lerp(controlBorderInactive, other.controlBorderInactive, t)!,
      controlBorderInactivePressed: Color.lerp(
          controlBorderInactivePressed, other.controlBorderInactivePressed, t)!,
      controlBorderDisabled:
          Color.lerp(controlBorderDisabled, other.controlBorderDisabled, t)!,
      controlFillPressed:
          Color.lerp(controlFillPressed, other.controlFillPressed, t)!,
      controlFillDisabled:
          Color.lerp(controlFillDisabled, other.controlFillDisabled, t)!,
      controlDot: Color.lerp(controlDot, other.controlDot, t)!,
      controlStateLayerInactive: Color.lerp(
          controlStateLayerInactive, other.controlStateLayerInactive, t)!,
      // energy.switch
      switchTrackOff: Color.lerp(switchTrackOff, other.switchTrackOff, t)!,
      switchTrackOffHover:
          Color.lerp(switchTrackOffHover, other.switchTrackOffHover, t)!,
      switchTrackDisabled:
          Color.lerp(switchTrackDisabled, other.switchTrackDisabled, t)!,
      switchThumbOff: Color.lerp(switchThumbOff, other.switchThumbOff, t)!,
      switchThumbOn: Color.lerp(switchThumbOn, other.switchThumbOn, t)!,
      switchThumbDisabled:
          Color.lerp(switchThumbDisabled, other.switchThumbDisabled, t)!,
      switchThumbIconDisabled: Color.lerp(
          switchThumbIconDisabled, other.switchThumbIconDisabled, t)!,
      // depth
      depthOverlay: Color.lerp(depthOverlay, other.depthOverlay, t)!,
      depthElevationLight: BoxShadow.lerpList(
              depthElevationLight, other.depthElevationLight, t) ??
          [],
      depthElevationMedium: BoxShadow.lerpList(
              depthElevationMedium, other.depthElevationMedium, t) ??
          [],
      depthElevationHigh:
          BoxShadow.lerpList(depthElevationHigh, other.depthElevationHigh, t) ??
              [],
      // frame — lerp doubles
      heightControlSm: lerpDouble(heightControlSm, other.heightControlSm, t)!,
      heightControlMd: lerpDouble(heightControlMd, other.heightControlMd, t)!,
      heightControlLg: lerpDouble(heightControlLg, other.heightControlLg, t)!,
      heightControlXl: lerpDouble(heightControlXl, other.heightControlXl, t)!,
      paddingControl: lerpDouble(paddingControl, other.paddingControl, t)!,
      paddingContainer:
          lerpDouble(paddingContainer, other.paddingContainer, t)!,
      paddingSurface: lerpDouble(paddingSurface, other.paddingSurface, t)!,
      gapTight: lerpDouble(gapTight, other.gapTight, t)!,
      gapComponent: lerpDouble(gapComponent, other.gapComponent, t)!,
      gapComponentLg: lerpDouble(gapComponentLg, other.gapComponentLg, t)!,
      gapSubsection: lerpDouble(gapSubsection, other.gapSubsection, t)!,
      gapSection: lerpDouble(gapSection, other.gapSection, t)!,
      gapPage: lerpDouble(gapPage, other.gapPage, t)!,
      radiusSm: lerpDouble(radiusSm, other.radiusSm, t)!,
      radiusControl: lerpDouble(radiusControl, other.radiusControl, t)!,
      radiusContainer: lerpDouble(radiusContainer, other.radiusContainer, t)!,
      radiusSurface: lerpDouble(radiusSurface, other.radiusSurface, t)!,
      radiusFull: lerpDouble(radiusFull, other.radiusFull, t)!,
      borderThin: lerpDouble(borderThin, other.borderThin, t)!,
      borderControlWidth:
          lerpDouble(borderControlWidth, other.borderControlWidth, t)!,
      borderMedium: lerpDouble(borderMedium, other.borderMedium, t)!,
      borderIndicator: lerpDouble(borderIndicator, other.borderIndicator, t)!,
      contentDialog: lerpDouble(contentDialog, other.contentDialog, t)!,
      sidebarExpanded: lerpDouble(sidebarExpanded, other.sidebarExpanded, t)!,
      sidebarCollapsed:
          lerpDouble(sidebarCollapsed, other.sidebarCollapsed, t)!,
      spaceMicro: lerpDouble(spaceMicro, other.spaceMicro, t)!,
      // voice — lerp font sizes
      displayXlFontSize:
          lerpDouble(displayXlFontSize, other.displayXlFontSize, t)!,
      displayXlFontWeight:
          t < 0.5 ? displayXlFontWeight : other.displayXlFontWeight,
      displayXlLineHeight:
          lerpDouble(displayXlLineHeight, other.displayXlLineHeight, t)!,
      displayXlLetterSpacing:
          lerpDouble(displayXlLetterSpacing, other.displayXlLetterSpacing, t)!,
      displayXlFontFamily:
          t < 0.5 ? displayXlFontFamily : other.displayXlFontFamily,
      displayLFontSize:
          lerpDouble(displayLFontSize, other.displayLFontSize, t)!,
      displayLFontWeight:
          t < 0.5 ? displayLFontWeight : other.displayLFontWeight,
      displayLLineHeight:
          lerpDouble(displayLLineHeight, other.displayLLineHeight, t)!,
      displayLLetterSpacing:
          lerpDouble(displayLLetterSpacing, other.displayLLetterSpacing, t)!,
      displayLFontFamily:
          t < 0.5 ? displayLFontFamily : other.displayLFontFamily,
      displayMFontSize:
          lerpDouble(displayMFontSize, other.displayMFontSize, t)!,
      displayMFontWeight:
          t < 0.5 ? displayMFontWeight : other.displayMFontWeight,
      displayMLineHeight:
          lerpDouble(displayMLineHeight, other.displayMLineHeight, t)!,
      displayMLetterSpacing:
          lerpDouble(displayMLetterSpacing, other.displayMLetterSpacing, t)!,
      displayMFontFamily:
          t < 0.5 ? displayMFontFamily : other.displayMFontFamily,
      displaySFontSize:
          lerpDouble(displaySFontSize, other.displaySFontSize, t)!,
      displaySFontWeight:
          t < 0.5 ? displaySFontWeight : other.displaySFontWeight,
      displaySLineHeight:
          lerpDouble(displaySLineHeight, other.displaySLineHeight, t)!,
      displaySLetterSpacing:
          lerpDouble(displaySLetterSpacing, other.displaySLetterSpacing, t)!,
      displaySFontFamily:
          t < 0.5 ? displaySFontFamily : other.displaySFontFamily,
      displayXsFontSize:
          lerpDouble(displayXsFontSize, other.displayXsFontSize, t)!,
      displayXsFontWeight:
          t < 0.5 ? displayXsFontWeight : other.displayXsFontWeight,
      displayXsLineHeight:
          lerpDouble(displayXsLineHeight, other.displayXsLineHeight, t)!,
      displayXsLetterSpacing:
          lerpDouble(displayXsLetterSpacing, other.displayXsLetterSpacing, t)!,
      displayXsFontFamily:
          t < 0.5 ? displayXsFontFamily : other.displayXsFontFamily,
      headingLFontSize:
          lerpDouble(headingLFontSize, other.headingLFontSize, t)!,
      headingLFontWeight:
          t < 0.5 ? headingLFontWeight : other.headingLFontWeight,
      headingLLineHeight:
          lerpDouble(headingLLineHeight, other.headingLLineHeight, t)!,
      headingLLetterSpacing:
          lerpDouble(headingLLetterSpacing, other.headingLLetterSpacing, t)!,
      headingLFontFamily:
          t < 0.5 ? headingLFontFamily : other.headingLFontFamily,
      headingMFontSize:
          lerpDouble(headingMFontSize, other.headingMFontSize, t)!,
      headingMFontWeight:
          t < 0.5 ? headingMFontWeight : other.headingMFontWeight,
      headingMLineHeight:
          lerpDouble(headingMLineHeight, other.headingMLineHeight, t)!,
      headingMLetterSpacing:
          lerpDouble(headingMLetterSpacing, other.headingMLetterSpacing, t)!,
      headingMFontFamily:
          t < 0.5 ? headingMFontFamily : other.headingMFontFamily,
      labelXlFontSize: lerpDouble(labelXlFontSize, other.labelXlFontSize, t)!,
      labelLFontSize: lerpDouble(labelLFontSize, other.labelLFontSize, t)!,
      labelMFontSize: lerpDouble(labelMFontSize, other.labelMFontSize, t)!,
      labelSFontSize: lerpDouble(labelSFontSize, other.labelSFontSize, t)!,
      labelXsFontSize: lerpDouble(labelXsFontSize, other.labelXsFontSize, t)!,
      paragraphLFontSize:
          lerpDouble(paragraphLFontSize, other.paragraphLFontSize, t)!,
      paragraphMFontSize:
          lerpDouble(paragraphMFontSize, other.paragraphMFontSize, t)!,
      paragraphSFontSize:
          lerpDouble(paragraphSFontSize, other.paragraphSFontSize, t)!,
      captionFontSize: lerpDouble(captionFontSize, other.captionFontSize, t)!,
      captionFontWeight: t < 0.5 ? captionFontWeight : other.captionFontWeight,
      captionLineHeight:
          lerpDouble(captionLineHeight, other.captionLineHeight, t)!,
      captionLetterSpacing:
          lerpDouble(captionLetterSpacing, other.captionLetterSpacing, t)!,
      captionFontFamily: t < 0.5 ? captionFontFamily : other.captionFontFamily,
      overlineFontSize:
          lerpDouble(overlineFontSize, other.overlineFontSize, t)!,
      overlineFontWeight:
          t < 0.5 ? overlineFontWeight : other.overlineFontWeight,
      overlineLineHeight:
          lerpDouble(overlineLineHeight, other.overlineLineHeight, t)!,
      overlineLetterSpacing:
          lerpDouble(overlineLetterSpacing, other.overlineLetterSpacing, t)!,
      overlineFontFamily:
          t < 0.5 ? overlineFontFamily : other.overlineFontFamily,
      controlFontFamily: t < 0.5 ? controlFontFamily : other.controlFontFamily,
      controlFontWeight: t < 0.5 ? controlFontWeight : other.controlFontWeight,
      controlLineHeight:
          lerpDouble(controlLineHeight, other.controlLineHeight, t)!,
      // icon.size
      iconSizeXs: lerpDouble(iconSizeXs, other.iconSizeXs, t)!,
      iconSizeSm: lerpDouble(iconSizeSm, other.iconSizeSm, t)!,
      iconSizeMd: lerpDouble(iconSizeMd, other.iconSizeMd, t)!,
      iconSizeLg: lerpDouble(iconSizeLg, other.iconSizeLg, t)!,
      iconSizeXl: lerpDouble(iconSizeXl, other.iconSizeXl, t)!,
      // tone
      toneNeutralText: Color.lerp(toneNeutralText, other.toneNeutralText, t)!,
      toneNeutralTextSubtle:
          Color.lerp(toneNeutralTextSubtle, other.toneNeutralTextSubtle, t)!,
      toneNeutralWeight: t < 0.5 ? toneNeutralWeight : other.toneNeutralWeight,
      toneBrandText: Color.lerp(toneBrandText, other.toneBrandText, t)!,
      toneBrandTextSubtle:
          Color.lerp(toneBrandTextSubtle, other.toneBrandTextSubtle, t)!,
      toneBrandWeight: t < 0.5 ? toneBrandWeight : other.toneBrandWeight,
      toneMarketingText:
          Color.lerp(toneMarketingText, other.toneMarketingText, t)!,
      toneMarketingTextSubtle: Color.lerp(
          toneMarketingTextSubtle, other.toneMarketingTextSubtle, t)!,
      toneMarketingWeight:
          t < 0.5 ? toneMarketingWeight : other.toneMarketingWeight,
      toneSystemText: Color.lerp(toneSystemText, other.toneSystemText, t)!,
      toneSystemTextSubtle:
          Color.lerp(toneSystemTextSubtle, other.toneSystemTextSubtle, t)!,
      toneSystemWeight: t < 0.5 ? toneSystemWeight : other.toneSystemWeight,
      // momentum — discrete snap
      momentumDurationFast:
          t < 0.5 ? momentumDurationFast : other.momentumDurationFast,
      momentumDurationDefault:
          t < 0.5 ? momentumDurationDefault : other.momentumDurationDefault,
      momentumDurationSlow:
          t < 0.5 ? momentumDurationSlow : other.momentumDurationSlow,
      momentumEasingStandard:
          t < 0.5 ? momentumEasingStandard : other.momentumEasingStandard,
      momentumEasingEnter:
          t < 0.5 ? momentumEasingEnter : other.momentumEasingEnter,
      momentumEasingExit:
          t < 0.5 ? momentumEasingExit : other.momentumEasingExit,
      // state
      stateHoverOpacity:
          lerpDouble(stateHoverOpacity, other.stateHoverOpacity, t)!,
      statePressedOpacity:
          lerpDouble(statePressedOpacity, other.statePressedOpacity, t)!,
      stateSelectedOpacity:
          lerpDouble(stateSelectedOpacity, other.stateSelectedOpacity, t)!,
      stateDisabledOpacity:
          lerpDouble(stateDisabledOpacity, other.stateDisabledOpacity, t)!,
      stateDimmedOpacity:
          lerpDouble(stateDimmedOpacity, other.stateDimmedOpacity, t)!,
      stateFaintOpacity:
          lerpDouble(stateFaintOpacity, other.stateFaintOpacity, t)!,
      stateSubtleOpacity:
          lerpDouble(stateSubtleOpacity, other.stateSubtleOpacity, t)!,
      // button padding
      buttonPaddingXSm:
          lerpDouble(buttonPaddingXSm, other.buttonPaddingXSm, t)!,
      buttonPaddingXMd:
          lerpDouble(buttonPaddingXMd, other.buttonPaddingXMd, t)!,
      buttonPaddingXLg:
          lerpDouble(buttonPaddingXLg, other.buttonPaddingXLg, t)!,
      buttonPaddingXXl:
          lerpDouble(buttonPaddingXXl, other.buttonPaddingXXl, t)!,
    );
  }
}
