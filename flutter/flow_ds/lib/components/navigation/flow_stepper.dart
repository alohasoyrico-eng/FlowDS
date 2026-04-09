/// FLOW Design System — FlowStepper (Navigation)
/// ─────────────────────────────────────────────
/// Multi-step wizard in horizontal or vertical orientation.
/// Uses comp.stepper tokens.
import 'package:flutter/material.dart';

import '../../primitives/icon.dart';
import '../../tokens/comp_tokens.dart';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Enums & models
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

enum FlowStepperOrientation { horizontal, vertical }

enum FlowStepperSize { sm, md, lg, xl }

enum FlowStepStatus { upcoming, current, complete, error }

class FlowStepItem {
  const FlowStepItem({
    required this.label,
    this.description,
    this.status = FlowStepStatus.upcoming,
  });

  final String label;
  final String? description;
  final FlowStepStatus status;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowStepper
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowStepper extends StatelessWidget {
  const FlowStepper({
    super.key,
    required this.steps,
    this.orientation = FlowStepperOrientation.horizontal,
    this.size = FlowStepperSize.md,
    this.semanticLabel,
  });

  final List<FlowStepItem> steps;
  final FlowStepperOrientation orientation;
  final FlowStepperSize size;
  final String? semanticLabel;

  @override
  Widget build(BuildContext context) {
    final comp = Theme.of(context).extension<FlowCompTokens>()!;
    final t = comp.stepper;

    final indicatorSize = _resolveIndicatorSize(t);
    final fontSize = _resolveFontSize(t);
    final labelFontSize = _resolveLabelFontSize(t);
    final descFontSize = _resolveDescFontSize(t);

    Widget content;

    if (orientation == FlowStepperOrientation.horizontal) {
      content = Row(
        children: _buildHorizontalSteps(
          t,
          indicatorSize,
          fontSize,
          labelFontSize,
          descFontSize,
        ),
      );
    } else {
      content = Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisSize: MainAxisSize.min,
        children: _buildVerticalSteps(
          t,
          indicatorSize,
          fontSize,
          labelFontSize,
          descFontSize,
        ),
      );
    }

    if (semanticLabel != null) {
      content =
          Semantics(label: semanticLabel, container: true, child: content);
    }

    return content;
  }

  List<Widget> _buildHorizontalSteps(
    FlowCompStepper t,
    double indicatorSize,
    double fontSize,
    double labelFontSize,
    double descFontSize,
  ) {
    final widgets = <Widget>[];

    for (var i = 0; i < steps.length; i++) {
      final step = steps[i];

      widgets.add(
        Expanded(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Row(
                children: [
                  if (i > 0)
                    Expanded(
                      child: Container(
                        height: t.connectorHeight,
                        color: steps[i - 1].status == FlowStepStatus.complete
                            ? t.connectorComplete
                            : t.connectorDefault,
                      ),
                    )
                  else
                    const Spacer(),
                  _StepIndicator(
                    step: step,
                    index: i,
                    tokens: t,
                    size: indicatorSize,
                    fontSize: fontSize,
                  ),
                  if (i < steps.length - 1)
                    Expanded(
                      child: Container(
                        height: t.connectorHeight,
                        color: step.status == FlowStepStatus.complete
                            ? t.connectorComplete
                            : t.connectorDefault,
                      ),
                    )
                  else
                    const Spacer(),
                ],
              ),
              SizedBox(height: t.gap),
              Text(
                step.label,
                textAlign: TextAlign.center,
                style: TextStyle(
                  fontSize: labelFontSize,
                  color: _labelColor(t, step.status),
                ),
                maxLines: 2,
                overflow: TextOverflow.ellipsis,
              ),
              if (step.description != null)
                Text(
                  step.description!,
                  textAlign: TextAlign.center,
                  style: TextStyle(
                    fontSize: descFontSize,
                    color: t.labelTextSecondary,
                  ),
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                ),
            ],
          ),
        ),
      );
    }

    return widgets;
  }

  List<Widget> _buildVerticalSteps(
    FlowCompStepper t,
    double indicatorSize,
    double fontSize,
    double labelFontSize,
    double descFontSize,
  ) {
    final widgets = <Widget>[];

    for (var i = 0; i < steps.length; i++) {
      final step = steps[i];

      widgets.add(
        IntrinsicHeight(
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Indicator column with connector
              Column(
                children: [
                  _StepIndicator(
                    step: step,
                    index: i,
                    tokens: t,
                    size: indicatorSize,
                    fontSize: fontSize,
                  ),
                  if (i < steps.length - 1)
                    Expanded(
                      child: Container(
                        width: t.connectorHeight,
                        color: step.status == FlowStepStatus.complete
                            ? t.connectorComplete
                            : t.connectorDefault,
                      ),
                    ),
                ],
              ),
              SizedBox(width: t.gap),
              // Labels
              Expanded(
                child: Padding(
                  padding: EdgeInsets.only(bottom: t.gap * 2),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Text(
                        step.label,
                        style: TextStyle(
                          fontSize: labelFontSize,
                          color: _labelColor(t, step.status),
                        ),
                      ),
                      if (step.description != null)
                        Padding(
                          padding: EdgeInsets.only(top: t.gap / 2),
                          child: Text(
                            step.description!,
                            style: TextStyle(
                              fontSize: descFontSize,
                              color: t.labelTextSecondary,
                            ),
                          ),
                        ),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ),
      );
    }

    return widgets;
  }

  Color _labelColor(FlowCompStepper t, FlowStepStatus status) {
    switch (status) {
      case FlowStepStatus.upcoming:
        return t.labelTextUpcoming;
      case FlowStepStatus.current:
        return t.labelText;
      case FlowStepStatus.complete:
        return t.labelText;
      case FlowStepStatus.error:
        return t.indicatorTextError;
    }
  }

  double _resolveIndicatorSize(FlowCompStepper t) {
    switch (size) {
      case FlowStepperSize.sm:
        return t.indicatorSizeSm;
      case FlowStepperSize.md:
        return t.indicatorSizeMd;
      case FlowStepperSize.lg:
        return t.indicatorSizeLg;
      case FlowStepperSize.xl:
        return t.indicatorSizeXl;
    }
  }

  double _resolveFontSize(FlowCompStepper t) {
    switch (size) {
      case FlowStepperSize.sm:
        return t.fontSm;
      case FlowStepperSize.md:
        return t.fontMd;
      case FlowStepperSize.lg:
        return t.fontLg;
      case FlowStepperSize.xl:
        return t.fontXl;
    }
  }

  double _resolveLabelFontSize(FlowCompStepper t) {
    switch (size) {
      case FlowStepperSize.sm:
        return t.labelFontSm;
      case FlowStepperSize.md:
        return t.labelFontMd;
      case FlowStepperSize.lg:
        return t.labelFontLg;
      case FlowStepperSize.xl:
        return t.labelFontXl;
    }
  }

  double _resolveDescFontSize(FlowCompStepper t) {
    switch (size) {
      case FlowStepperSize.sm:
        return t.descFontSm;
      case FlowStepperSize.md:
        return t.descFontMd;
      case FlowStepperSize.lg:
        return t.descFontLg;
      case FlowStepperSize.xl:
        return t.descFontXl;
    }
  }
}

class _StepIndicator extends StatelessWidget {
  const _StepIndicator({
    required this.step,
    required this.index,
    required this.tokens,
    required this.size,
    required this.fontSize,
  });

  final FlowStepItem step;
  final int index;
  final FlowCompStepper tokens;
  final double size;
  final double fontSize;

  @override
  Widget build(BuildContext context) {
    final bg = _resolveIndicatorBg();
    final textColor = _resolveIndicatorTextColor();

    Widget child;
    if (step.status == FlowStepStatus.complete) {
      child =
          FlowIcon(Icons.check, size: FlowIconSize.sm, iconColor: textColor);
    } else if (step.status == FlowStepStatus.error) {
      child =
          FlowIcon(Icons.close, size: FlowIconSize.sm, iconColor: textColor);
    } else {
      child = Text(
        (index + 1).toString(),
        style: TextStyle(
          color: textColor,
          fontSize: fontSize,
          fontWeight: FontWeight.w600,
        ),
      );
    }

    return Semantics(
      label: 'Step ${index + 1}: ${step.label}, ${step.status.name}',
      child: Container(
        width: size,
        height: size,
        decoration: BoxDecoration(
          color: bg,
          shape: BoxShape.circle,
        ),
        alignment: Alignment.center,
        child: child,
      ),
    );
  }

  Color _resolveIndicatorBg() {
    switch (step.status) {
      case FlowStepStatus.upcoming:
        return tokens.indicatorBgUpcoming;
      case FlowStepStatus.current:
        return tokens.indicatorBgCurrent;
      case FlowStepStatus.complete:
        return tokens.indicatorBgComplete;
      case FlowStepStatus.error:
        return tokens.indicatorBgError;
    }
  }

  Color _resolveIndicatorTextColor() {
    switch (step.status) {
      case FlowStepStatus.upcoming:
        return tokens.indicatorText;
      case FlowStepStatus.current:
        return tokens.indicatorTextActive;
      case FlowStepStatus.complete:
        return tokens.indicatorTextActive;
      case FlowStepStatus.error:
        return tokens.indicatorTextError;
    }
  }
}
