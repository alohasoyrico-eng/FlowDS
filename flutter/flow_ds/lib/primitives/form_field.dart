/// FLOW Design System — FlowFormField Primitive
/// ─────────────────────────────────────────────
/// Form field wrapper with label, hint, error.
/// Maps to React's `<FormField>`.
import 'package:flutter/material.dart';

import '../tokens/sys_tokens.dart';
import 'text.dart';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowFormField
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowFormField extends StatelessWidget {
  const FlowFormField({
    super.key,
    this.label,
    this.hint,
    this.error,
    this.required = false,
    this.disabled = false,
    required this.child,
  });

  final String? label;
  final String? hint;
  final String? error;
  final bool required;
  final bool disabled;
  final Widget child;

  @override
  Widget build(BuildContext context) {
    final sys = Theme.of(context).extension<FlowSysTokens>()!;
    final hasError = error != null && error!.isNotEmpty;
    final hasHint = hint != null && hint!.isNotEmpty;

    return Semantics(
      textField: true,
      enabled: !disabled,
      child: Opacity(
        opacity: disabled ? sys.stateDisabledOpacity : 1.0,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisSize: MainAxisSize.min,
          children: [
            // ── Label row ──
            if (label != null) ...[
              Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  FlowText(
                    label!,
                    role: FlowTextRole.labelL,
                    color: disabled
                        ? FlowTextColor.disabled
                        : FlowTextColor.primary,
                  ),
                  if (required)
                    FlowText(
                      ' *',
                      role: FlowTextRole.labelL,
                      color: FlowTextColor.danger,
                      semanticLabel: 'required',
                    ),
                ],
              ),
              SizedBox(height: sys.gapTight),
            ],

            // ── Input child ──
            child,

            // ── Helper / error message ──
            if (hasError || hasHint) ...[
              SizedBox(height: sys.gapTight),
              Semantics(
                liveRegion: hasError,
                child: FlowText(
                  hasError ? error! : hint!,
                  role: FlowTextRole.caption,
                  color:
                      hasError ? FlowTextColor.danger : FlowTextColor.secondary,
                ),
              ),
            ],
          ],
        ),
      ),
    );
  }
}
