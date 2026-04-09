/// FLOW Design System — FlowSnackbar (L4 Pattern)
/// ────────────────────────────────────────────────
/// Stackable notification system with global provider + imperative API.
/// Composes FlowButton, FlowIconButton, FlowIcon (L3/L2).
///
/// Maps to React's `<FlowSnackbarProvider>` from FlowSnackbar.tsx.
import 'dart:async';
import 'dart:math';

import 'package:flutter/material.dart';

import '../components/controls/flow_button.dart';
import '../components/controls/flow_icon_button.dart';
import '../primitives/icon.dart';
import '../primitives/text.dart';
import '../tokens/density.dart';
import '../tokens/sys_tokens.dart';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Enums & data
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/// Severity variant for the snackbar.
enum FlowSnackbarVariant { info, success, warning, error }

/// A single snackbar item in the queue.
class FlowSnackbarItem {
  FlowSnackbarItem({
    required this.message,
    this.variant = FlowSnackbarVariant.info,
    this.action,
    this.duration = const Duration(milliseconds: 4000),
  }) : id = 'snack-${DateTime.now().millisecondsSinceEpoch}-'
            '${Random().nextInt(9999)}';

  final String id;
  final String message;
  final FlowSnackbarVariant variant;
  final FlowSnackbarAction? action;
  final Duration duration;
}

/// Optional action button on a snackbar.
class FlowSnackbarAction {
  const FlowSnackbarAction({required this.label, required this.onPressed});
  final String label;
  final VoidCallback onPressed;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Controller (imperative API)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/// Imperative controller exposed via [FlowSnackbarProvider.of].
class FlowSnackbarController extends ChangeNotifier {
  final List<FlowSnackbarItem> _items = [];
  List<FlowSnackbarItem> get items => List.unmodifiable(_items);

  void show({
    required String message,
    FlowSnackbarVariant variant = FlowSnackbarVariant.info,
    FlowSnackbarAction? action,
    Duration duration = const Duration(milliseconds: 4000),
  }) {
    _items.add(FlowSnackbarItem(
      message: message,
      variant: variant,
      action: action,
      duration: duration,
    ));
    notifyListeners();
  }

  void dismiss(String id) {
    _items.removeWhere((i) => i.id == id);
    notifyListeners();
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Provider
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/// Wrap your app to enable snackbars.
/// Access via `FlowSnackbarProvider.of(context).show(...)`.
class FlowSnackbarProvider extends StatefulWidget {
  const FlowSnackbarProvider({super.key, required this.child});
  final Widget child;

  static FlowSnackbarController of(BuildContext context) {
    final state = context.findAncestorStateOfType<_FlowSnackbarProviderState>();
    assert(state != null, 'No FlowSnackbarProvider found in widget tree');
    return state!._controller;
  }

  @override
  State<FlowSnackbarProvider> createState() => _FlowSnackbarProviderState();
}

class _FlowSnackbarProviderState extends State<FlowSnackbarProvider> {
  final _controller = FlowSnackbarController();

  @override
  void initState() {
    super.initState();
    _controller.addListener(_rebuild);
  }

  @override
  void dispose() {
    _controller.removeListener(_rebuild);
    _controller.dispose();
    super.dispose();
  }

  void _rebuild() => setState(() {});

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        widget.child,
        // Toast container — bottom center
        Positioned(
          left: 0,
          right: 0,
          bottom: 0,
          child: SafeArea(
            child: Semantics(
              liveRegion: true,
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: _controller.items
                      .map((item) => _FlowSnackbarTile(
                            item: item,
                            onDismiss: _controller.dismiss,
                          ))
                      .toList(),
                ),
              ),
            ),
          ),
        ),
      ],
    );
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Single snackbar tile
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const _iconMap = <FlowSnackbarVariant, IconData>{
  FlowSnackbarVariant.info: Icons.info_outline,
  FlowSnackbarVariant.success: Icons.check_circle_outline,
  FlowSnackbarVariant.warning: Icons.warning_amber_rounded,
  FlowSnackbarVariant.error: Icons.warning_amber_rounded,
};

class _FlowSnackbarTile extends StatefulWidget {
  const _FlowSnackbarTile({required this.item, required this.onDismiss});
  final FlowSnackbarItem item;
  final void Function(String id) onDismiss;

  @override
  State<_FlowSnackbarTile> createState() => _FlowSnackbarTileState();
}

class _FlowSnackbarTileState extends State<_FlowSnackbarTile> {
  Timer? _timer;
  bool _exiting = false;

  @override
  void initState() {
    super.initState();
    _timer = Timer(widget.item.duration, _startExit);
  }

  void _startExit() {
    if (!mounted) return;
    setState(() => _exiting = true);
    Future.delayed(const Duration(milliseconds: 200), () {
      if (mounted) widget.onDismiss(widget.item.id);
    });
  }

  @override
  void dispose() {
    _timer?.cancel();
    super.dispose();
  }

  Color _variantColor(FlowSysTokens sys) {
    switch (widget.item.variant) {
      case FlowSnackbarVariant.info:
        return sys.statusInfo;
      case FlowSnackbarVariant.success:
        return sys.statusSuccess;
      case FlowSnackbarVariant.warning:
        return sys.statusWarning;
      case FlowSnackbarVariant.error:
        return sys.statusError;
    }
  }

  @override
  Widget build(BuildContext context) {
    final sys = Theme.of(context).extension<FlowSysTokens>()!;
    final accent = _variantColor(sys);

    return AnimatedOpacity(
      opacity: _exiting ? 0.0 : 1.0,
      duration: const Duration(milliseconds: 200),
      child: Padding(
        padding: EdgeInsets.only(bottom: sys.gapTight),
        child: Semantics(
          label: widget.item.message,
          child: DecoratedBox(
            decoration: BoxDecoration(
              color: sys.surfaceSecondary,
              borderRadius: BorderRadius.circular(sys.radiusControl),
              border: Border.fromBorderSide(
                BorderSide(color: sys.borderDefault, width: sys.borderThin),
              ),
              boxShadow: sys.depthElevationMedium,
            ),
            child: Padding(
              padding: EdgeInsets.symmetric(
                horizontal: sys.paddingControl,
                vertical: sys.gapTight,
              ),
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  FlowIcon(_iconMap[widget.item.variant]!,
                      size: FlowIconSize.sm, iconColor: accent),
                  SizedBox(width: sys.gapTight),
                  Flexible(
                    child: FlowText(widget.item.message,
                        role: FlowTextRole.paragraphS),
                  ),
                  if (widget.item.action != null) ...[
                    SizedBox(width: sys.gapTight),
                    FlowButton(
                      variant: FlowButtonVariant.ghost,
                      size: FlowComponentSize.sm,
                      onPressed: () {
                        widget.item.action!.onPressed();
                        _startExit();
                      },
                      child: Text(widget.item.action!.label),
                    ),
                  ],
                  SizedBox(width: sys.gapTight),
                  FlowIconButton(
                    icon: Icons.close,
                    size: FlowComponentSize.sm,
                    variant: FlowIconButtonVariant.ghost,
                    onPressed: _startExit,
                    semanticLabel: 'Dismiss',
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
