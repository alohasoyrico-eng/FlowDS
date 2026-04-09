/// FLOW Design System — FlowSegmentedControl (L3 Component)
///
/// Mutually exclusive segmented option picker with animated indicator.
/// Mirrors React's FlowSegmentedControl.
import 'package:flutter/material.dart';

import '../../tokens/comp_tokens.dart';
import '../../tokens/density.dart';
import '../../primitives/icon.dart';
import '../../theme/flow_size_provider.dart';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowSegmentOption
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowSegmentOption {
  const FlowSegmentOption({
    required this.value,
    required this.label,
    this.icon,
    this.disabled = false,
  });

  final String value;
  final String label;
  final IconData? icon;
  final bool disabled;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowSegmentedControl
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowSegmentedControl extends StatefulWidget {
  const FlowSegmentedControl({
    super.key,
    required this.options,
    required this.value,
    required this.onChanged,
    this.size,
    this.fullWidth = false,
    this.semanticLabel = 'Options',
  });

  final List<FlowSegmentOption> options;
  final String value;
  final ValueChanged<String> onChanged;
  final FlowComponentSize? size;
  final bool fullWidth;
  final String semanticLabel;

  @override
  State<FlowSegmentedControl> createState() => _FlowSegmentedControlState();
}

class _FlowSegmentedControlState extends State<FlowSegmentedControl> {
  int? _hoveredIndex;

  double _heightForSize(FlowCompSegmentedControl t, FlowComponentSize s) {
    switch (s) {
      case FlowComponentSize.sm:
        return t.heightSm;
      case FlowComponentSize.md:
        return t.heightMd;
      case FlowComponentSize.lg:
        return t.heightLg;
      case FlowComponentSize.xl:
        return t.heightXl;
    }
  }

  double _fontForSize(FlowCompSegmentedControl t, FlowComponentSize s) {
    switch (s) {
      case FlowComponentSize.sm:
        return t.fontSm;
      case FlowComponentSize.md:
        return t.fontMd;
      case FlowComponentSize.lg:
        return t.fontLg;
      case FlowComponentSize.xl:
        return t.fontXl;
    }
  }

  @override
  Widget build(BuildContext context) {
    final comp = Theme.of(context).extension<FlowCompTokens>()!;
    final t = comp.segmentedControl;
    final resolvedSize = widget.size ?? FlowSizeProvider.of(context);
    final height = _heightForSize(t, resolvedSize);
    final fontSize = _fontForSize(t, resolvedSize);

    return Semantics(
      label: widget.semanticLabel,
      container: true,
      child: Container(
        height: height,
        padding: EdgeInsets.all(t.padding),
        decoration: BoxDecoration(
          color: t.bg,
          borderRadius: BorderRadius.circular(t.radius),
          border: Border.all(color: t.border, width: 1),
        ),
        child: Row(
          mainAxisSize: widget.fullWidth ? MainAxisSize.max : MainAxisSize.min,
          children: List.generate(widget.options.length, (i) {
            final opt = widget.options[i];
            final isActive = opt.value == widget.value;
            final isHovered = _hoveredIndex == i;

            return Flexible(
              flex: widget.fullWidth ? 1 : 0,
              fit: widget.fullWidth ? FlexFit.tight : FlexFit.loose,
              child: Padding(
                padding: EdgeInsets.symmetric(horizontal: t.gap / 2),
                child: MouseRegion(
                  onEnter: (_) => setState(() => _hoveredIndex = i),
                  onExit: (_) => setState(() => _hoveredIndex = null),
                  child: Semantics(
                    selected: isActive,
                    enabled: !opt.disabled,
                    child: GestureDetector(
                      onTap: opt.disabled
                          ? null
                          : () => widget.onChanged(opt.value),
                      child: AnimatedContainer(
                        duration: const Duration(milliseconds: 200),
                        curve: Curves.easeInOut,
                        padding: EdgeInsets.symmetric(
                          horizontal: t.segmentPaddingX,
                        ),
                        decoration: BoxDecoration(
                          color: isActive
                              ? t.bgActive
                              : isHovered
                                  ? t.bgHover
                                  : Colors.transparent,
                          borderRadius: BorderRadius.circular(
                            t.radius - t.padding,
                          ),
                          boxShadow: isActive ? t.shadow : null,
                        ),
                        alignment: Alignment.center,
                        child: Row(
                          mainAxisSize: MainAxisSize.min,
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            if (opt.icon != null) ...[
                              FlowIcon(opt.icon!, size: FlowIconSize.sm),
                              SizedBox(width: t.gap),
                            ],
                            Text(
                              opt.label,
                              style: TextStyle(
                                fontSize: fontSize,
                                color: isActive ? t.textActive : t.text,
                                fontWeight: isActive
                                    ? FontWeight.w600
                                    : FontWeight.w400,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),
                ),
              ),
            );
          }),
        ),
      ),
    );
  }
}
