/// FLOW Design System — FlowCalendarView (L4 Pattern)
/// ──────────────────────────────────────────────────
/// Month calendar grid with event markers and date selection.
/// Composes FlowButton, FlowIconButton, FlowText, FlowStack, FlowInline.
/// Maps to React's `<FlowCalendarView>`.
import 'package:flutter/material.dart';

import '../components/controls/flow_button.dart';
import '../components/controls/flow_icon_button.dart';
import '../primitives/inline.dart';
import '../primitives/stack.dart';
import '../primitives/text.dart';
import '../theme/flow_size_provider.dart';
import '../tokens/density.dart';
import '../tokens/sys_tokens.dart';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Types
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/// A calendar event.
class CalendarEvent {
  const CalendarEvent({
    required this.id,
    required this.title,
    required this.date,
    this.color,
    this.time,
  });

  final String id;
  final String title;

  /// ISO date string (YYYY-MM-DD).
  final String date;

  /// Event dot/badge color.
  final Color? color;

  /// Optional time label.
  final String? time;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowCalendarView
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FlowCalendarView extends StatefulWidget {
  const FlowCalendarView({
    super.key,
    this.events = const [],
    this.selectedDate,
    this.onSelectDate,
    this.onEventClick,
    this.defaultMonth,
    this.size,
  });

  final List<CalendarEvent> events;
  final String? selectedDate;
  final ValueChanged<String>? onSelectDate;
  final ValueChanged<CalendarEvent>? onEventClick;

  /// Initial month (YYYY-MM).
  final String? defaultMonth;

  final FlowComponentSize? size;

  @override
  State<FlowCalendarView> createState() => _FlowCalendarViewState();
}

const _dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const _monthLabels = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

class _FlowCalendarViewState extends State<FlowCalendarView> {
  late int _viewYear;
  late int _viewMonth; // 0-indexed

  @override
  void initState() {
    super.initState();
    final now = DateTime.now();
    if (widget.defaultMonth != null) {
      final parts = widget.defaultMonth!.split('-');
      _viewYear = int.parse(parts[0]);
      _viewMonth = int.parse(parts[1]) - 1;
    } else {
      _viewYear = now.year;
      _viewMonth = now.month - 1;
    }
  }

  void _goPrev() {
    setState(() {
      if (_viewMonth == 0) {
        _viewMonth = 11;
        _viewYear--;
      } else {
        _viewMonth--;
      }
    });
  }

  void _goNext() {
    setState(() {
      if (_viewMonth == 11) {
        _viewMonth = 0;
        _viewYear++;
      } else {
        _viewMonth++;
      }
    });
  }

  void _goToday() {
    final now = DateTime.now();
    setState(() {
      _viewYear = now.year;
      _viewMonth = now.month - 1;
    });
  }

  String _toIso(int year, int month, int day) {
    return '$year-${(month + 1).toString().padLeft(2, '0')}-${day.toString().padLeft(2, '0')}';
  }

  @override
  Widget build(BuildContext context) {
    final sys = Theme.of(context).extension<FlowSysTokens>()!;
    final resolvedSize = widget.size ?? FlowSizeProvider.of(context);
    final cellSize = resolvedSize == FlowComponentSize.sm
        ? 32.0
        : resolvedSize == FlowComponentSize.lg
            ? 56.0
            : 44.0;

    final now = DateTime.now();
    final todayIso = _toIso(now.year, now.month - 1, now.day);

    // Build event lookup
    final eventsByDate = <String, List<CalendarEvent>>{};
    for (final ev in widget.events) {
      eventsByDate.putIfAbsent(ev.date, () => []).add(ev);
    }

    // Build calendar cells
    final firstDay = DateTime(_viewYear, _viewMonth + 1, 1);
    final startDow = firstDay.weekday % 7; // Sunday = 0
    final daysInMonth = DateTime(_viewYear, _viewMonth + 2, 0).day;
    final prevMonthDays = DateTime(_viewYear, _viewMonth + 1, 0).day;

    final cells = <_CalendarCell>[];

    // Previous month overflow
    for (var i = startDow - 1; i >= 0; i--) {
      final d = prevMonthDays - i;
      final m = _viewMonth == 0 ? 11 : _viewMonth - 1;
      final y = _viewMonth == 0 ? _viewYear - 1 : _viewYear;
      cells
          .add(_CalendarCell(day: d, month: m, year: y, isCurrentMonth: false));
    }
    // Current month
    for (var d = 1; d <= daysInMonth; d++) {
      cells.add(_CalendarCell(
          day: d, month: _viewMonth, year: _viewYear, isCurrentMonth: true));
    }
    // Next month overflow
    final remaining = 42 - cells.length;
    for (var d = 1; d <= remaining; d++) {
      final m = _viewMonth == 11 ? 0 : _viewMonth + 1;
      final y = _viewMonth == 11 ? _viewYear + 1 : _viewYear;
      cells
          .add(_CalendarCell(day: d, month: m, year: y, isCurrentMonth: false));
    }

    return Semantics(
      label: 'Calendar: ${_monthLabels[_viewMonth]} $_viewYear',
      child: FlowStack(
        gap: sys.gapTight,
        children: [
          // Navigation header
          FlowInline(
            mainAlign: MainAxisAlignment.spaceBetween,
            children: [
              FlowInline(
                gap: sys.gapTight,
                children: [
                  FlowIconButton(
                    icon: Icons.chevron_left,
                    size: FlowComponentSize.sm,
                    variant: FlowIconButtonVariant.ghost,
                    onPressed: _goPrev,
                    semanticLabel: 'Previous month',
                  ),
                  FlowText(
                    '${_monthLabels[_viewMonth]} $_viewYear',
                    role: FlowTextRole.paragraphS,
                  ),
                  FlowIconButton(
                    icon: Icons.chevron_right,
                    size: FlowComponentSize.sm,
                    variant: FlowIconButtonVariant.ghost,
                    onPressed: _goNext,
                    semanticLabel: 'Next month',
                  ),
                ],
              ),
              FlowButton(
                variant: FlowButtonVariant.ghost,
                size: FlowComponentSize.sm,
                onPressed: _goToday,
                child: const FlowText('Today', role: FlowTextRole.labelS),
              ),
            ],
          ),
          // Day headers
          GridView.count(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            crossAxisCount: 7,
            childAspectRatio: 2.5,
            children: _dayLabels
                .map((d) => Center(
                      child: FlowText(d,
                          role: FlowTextRole.caption,
                          color: FlowTextColor.tertiary),
                    ))
                .toList(),
          ),
          // Calendar grid
          Container(
            decoration: BoxDecoration(
              border:
                  Border.all(color: sys.borderSubtle, width: sys.borderThin),
              borderRadius: BorderRadius.circular(sys.radiusSm),
            ),
            clipBehavior: Clip.hardEdge,
            child: GridView.builder(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 7,
                mainAxisExtent: cellSize,
              ),
              itemCount: cells.length,
              itemBuilder: (context, idx) {
                final cell = cells[idx];
                final iso = _toIso(cell.year, cell.month, cell.day);
                final isToday = iso == todayIso;
                final isSelected = iso == widget.selectedDate;
                final dayEvents = eventsByDate[iso] ?? [];

                return Semantics(
                  button: true,
                  label: '${cell.day}, ${isToday ? "Today" : ""}',
                  selected: isSelected,
                  child: GestureDetector(
                    onTap: () => widget.onSelectDate?.call(iso),
                    child: Container(
                      decoration: BoxDecoration(
                        color: isSelected
                            ? sys.surfaceAccent.withValues(alpha: 0.12)
                            : null,
                        border: Border(
                          right: (idx + 1) % 7 != 0
                              ? BorderSide(
                                  color: sys.borderSubtle,
                                  width: sys.borderThin)
                              : BorderSide.none,
                          bottom: idx < 35
                              ? BorderSide(
                                  color: sys.borderSubtle,
                                  width: sys.borderThin)
                              : BorderSide.none,
                        ),
                      ),
                      padding: EdgeInsets.all(sys.gapTight * 0.5),
                      child: Column(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          // Day number
                          Container(
                            width: sys.heightControlSm * 0.5,
                            height: sys.heightControlSm * 0.5,
                            alignment: Alignment.center,
                            decoration: isToday
                                ? BoxDecoration(
                                    color: sys.statusInfo,
                                    shape: BoxShape.circle,
                                  )
                                : null,
                            child: FlowText(
                              '${cell.day}',
                              role: FlowTextRole.caption,
                              color: isToday
                                  ? FlowTextColor.inverse
                                  : !cell.isCurrentMonth
                                      ? FlowTextColor.disabled
                                      : FlowTextColor.primary,
                            ),
                          ),
                          // Event dots
                          if (dayEvents.isNotEmpty)
                            Row(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: dayEvents.take(3).map((ev) {
                                return Container(
                                  width: sys.gapTight * 0.5,
                                  height: sys.gapTight * 0.5,
                                  margin: EdgeInsets.symmetric(
                                      horizontal: sys.borderThin),
                                  decoration: BoxDecoration(
                                    color: ev.color ?? sys.statusInfo,
                                    shape: BoxShape.circle,
                                  ),
                                );
                              }).toList(),
                            ),
                        ],
                      ),
                    ),
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}

class _CalendarCell {
  const _CalendarCell({
    required this.day,
    required this.month,
    required this.year,
    required this.isCurrentMonth,
  });

  final int day;
  final int month; // 0-indexed
  final int year;
  final bool isCurrentMonth;
}
