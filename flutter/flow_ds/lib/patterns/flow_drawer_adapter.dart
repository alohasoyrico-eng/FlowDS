/// FLOW Design System — FlowDrawerAdapter (L4 Pattern)
/// ────────────────────────────────────────────────────
/// Responsive navigation drawer: inline sidebar on desktop, overlay on mobile.
/// Composes FlowIconButton, FlowText, FlowInline, FlowSurface.
/// Maps to React's `<FlowDrawerAdapter>`.
import 'package:flutter/material.dart';

import '../components/controls/flow_icon_button.dart';
import '../primitives/inline.dart';
import '../tokens/sys_tokens.dart';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowDrawerAdapter
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowDrawerAdapter extends StatelessWidget {
  const FlowDrawerAdapter({
    super.key,
    required this.open,
    required this.onClose,
    this.breakpoint = 768.0,
    this.side = FlowDrawerSide.left,
    this.width = 280.0,
    required this.child,
    this.title,
    this.showClose = true,
    this.closeOnOverlay = true,
    this.semanticLabel,
  });

  /// Whether the drawer is open.
  final bool open;

  /// Close handler.
  final VoidCallback onClose;

  /// Breakpoint at which to switch from overlay to inline.
  final double breakpoint;

  /// Side of the screen the drawer appears on.
  final FlowDrawerSide side;

  /// Width of the drawer (desktop inline mode).
  final double width;

  /// Drawer content.
  final Widget child;

  /// Optional title.
  final Widget? title;

  /// Whether to show a close button.
  final bool showClose;

  /// Whether tapping the overlay closes the drawer (mobile only).
  final bool closeOnOverlay;

  /// Accessible label.
  final String? semanticLabel;

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final isMobile = constraints.maxWidth < breakpoint;
        if (isMobile) {
          return _MobileDrawer(
            open: open,
            onClose: onClose,
            side: side,
            width: width,
            title: title,
            showClose: showClose,
            closeOnOverlay: closeOnOverlay,
            semanticLabel: semanticLabel,
            child: child,
          );
        }
        return _InlineDrawer(
          open: open,
          onClose: onClose,
          side: side,
          width: width,
          title: title,
          showClose: showClose,
          semanticLabel: semanticLabel,
          child: child,
        );
      },
    );
  }
}

/// Side of the screen for the drawer.
enum FlowDrawerSide { left, right }

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Desktop inline drawer
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class _InlineDrawer extends StatelessWidget {
  const _InlineDrawer({
    required this.open,
    required this.onClose,
    required this.side,
    required this.width,
    required this.child,
    this.title,
    this.showClose = true,
    this.semanticLabel,
  });

  final bool open;
  final VoidCallback onClose;
  final FlowDrawerSide side;
  final double width;
  final Widget child;
  final Widget? title;
  final bool showClose;
  final String? semanticLabel;

  @override
  Widget build(BuildContext context) {
    final sys = Theme.of(context).extension<FlowSysTokens>()!;

    return Semantics(
      label: semanticLabel ?? 'Navigation drawer',
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 250),
        curve: Curves.easeInOut,
        width: open ? width : 0,
        clipBehavior: Clip.hardEdge,
        decoration: BoxDecoration(
          color: sys.surfacePrimary,
          border: Border(
            right: side == FlowDrawerSide.left
                ? BorderSide(color: sys.borderDefault, width: sys.borderThin)
                : BorderSide.none,
            left: side == FlowDrawerSide.right
                ? BorderSide(color: sys.borderDefault, width: sys.borderThin)
                : BorderSide.none,
          ),
        ),
        child: SizedBox(
          width: width,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              if (title != null)
                _DrawerHeader(
                    title: title!, showClose: showClose, onClose: onClose),
              Expanded(
                child: Padding(
                  padding: EdgeInsets.all(sys.paddingControl),
                  child: child,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Mobile overlay drawer
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class _MobileDrawer extends StatelessWidget {
  const _MobileDrawer({
    required this.open,
    required this.onClose,
    required this.side,
    required this.width,
    required this.child,
    this.title,
    this.showClose = true,
    this.closeOnOverlay = true,
    this.semanticLabel,
  });

  final bool open;
  final VoidCallback onClose;
  final FlowDrawerSide side;
  final double width;
  final Widget child;
  final Widget? title;
  final bool showClose;
  final bool closeOnOverlay;
  final String? semanticLabel;

  @override
  Widget build(BuildContext context) {
    if (!open) return const SizedBox.shrink();

    final sys = Theme.of(context).extension<FlowSysTokens>()!;
    final screenWidth = MediaQuery.of(context).size.width;
    final drawerWidth = (screenWidth * 0.85).clamp(0.0, width);

    return Semantics(
      label: semanticLabel ?? 'Navigation drawer',
      scopesRoute: true,
      child: Stack(
        children: [
          // Scrim overlay
          Semantics(
            label: 'Close drawer',
            child: GestureDetector(
              onTap: closeOnOverlay ? onClose : null,
              child: AnimatedOpacity(
                duration: const Duration(milliseconds: 150),
                opacity: open ? 1.0 : 0.0,
                child: Container(color: sys.depthOverlay),
              ),
            ),
          ),
          // Drawer panel
          Positioned(
            top: 0,
            bottom: 0,
            left: side == FlowDrawerSide.left ? 0 : null,
            right: side == FlowDrawerSide.right ? 0 : null,
            width: drawerWidth,
            child: Material(
              elevation: 0,
              color: sys.surfacePrimary,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  if (title != null)
                    _DrawerHeader(
                      title: title!,
                      showClose: showClose,
                      onClose: onClose,
                    ),
                  Expanded(
                    child: Padding(
                      padding: EdgeInsets.all(sys.paddingControl),
                      child: child,
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Shared drawer header
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class _DrawerHeader extends StatelessWidget {
  const _DrawerHeader({
    required this.title,
    required this.showClose,
    required this.onClose,
  });

  final Widget title;
  final bool showClose;
  final VoidCallback onClose;

  @override
  Widget build(BuildContext context) {
    final sys = Theme.of(context).extension<FlowSysTokens>()!;

    return Container(
      padding: EdgeInsets.all(sys.paddingControl),
      decoration: BoxDecoration(
        border: Border(
          bottom: BorderSide(
            color: sys.borderDefault,
            width: sys.borderThin,
          ),
        ),
      ),
      child: FlowInline(
        mainAlign: MainAxisAlignment.spaceBetween,
        children: [
          title,
          if (showClose)
            FlowIconButton(
              icon: Icons.close,
              variant: FlowIconButtonVariant.ghost,
              onPressed: onClose,
              semanticLabel: 'Close drawer',
            ),
        ],
      ),
    );
  }
}
