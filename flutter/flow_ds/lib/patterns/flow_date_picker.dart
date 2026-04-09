/// FLOW Design System — FlowDatePicker (L4 Pattern)
/// Calendar-based single date selection with dropdown and min/max constraints.
/// Composes FlowTextInput, FlowButton, FlowIconButton (L3).
/// Source: FlowDatePicker.tsx
import 'package:flutter/material.dart';

import '../components/controls/flow_button.dart';
import '../components/controls/flow_icon_button.dart';
import '../components/inputs/flow_text_input.dart';
import '../primitives/text.dart';
import '../theme/flow_size_provider.dart';
import '../tokens/density.dart';
import '../tokens/ref_tokens.dart';
import '../tokens/sys_tokens.dart';

const _days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const _months = [
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

/// Calendar-based single date picker with dropdown.
class FlowDatePicker extends StatefulWidget {
  const FlowDatePicker({
    super.key,
    this.value,
    this.initialValue,
    this.onChanged,
    this.label,
    this.placeholder = 'Select date',
    this.min,
    this.max,
    this.disabledDates = const [],
    this.size,
    this.error = false,
    this.errorMessage,
    this.loading = false,
    this.disabled = false,
    this.semanticLabel,
  });

  /// Controlled value (ISO YYYY-MM-DD).
  final String? value;
  final String? initialValue;
  final ValueChanged<String>? onChanged;
  final String? label;
  final String placeholder;

  /// Min selectable date (ISO).
  final String? min;

  /// Max selectable date (ISO).
  final String? max;
  final List<String> disabledDates;
  final FlowComponentSize? size;
  final bool error;
  final String? errorMessage;
  final bool loading;
  final bool disabled;
  final String? semanticLabel;

  @override
  State<FlowDatePicker> createState() => _FlowDatePickerState();
}

class _FlowDatePickerState extends State<FlowDatePicker> {
  final LayerLink _layerLink = LayerLink();
  OverlayEntry? _overlay;
  String _internal = '';
  bool _open = false;
  late int _viewYear;
  late int _viewMonth;

  bool get _isControlled => widget.value != null;
  String get _val => _isControlled ? widget.value! : _internal;

  @override
  void initState() {
    super.initState();
    _internal = widget.initialValue ?? '';
    final sel = _parseISO(_val);
    final now = DateTime.now();
    _viewYear = sel?.year ?? now.year;
    _viewMonth = sel?.month ?? now.month;
  }

  @override
  void dispose() {
    _removeOverlay();
    super.dispose();
  }

  DateTime? _parseISO(String s) {
    if (s.isEmpty) return null;
    final parts = s.split('-');
    if (parts.length != 3) return null;
    return DateTime(
        int.parse(parts[0]), int.parse(parts[1]), int.parse(parts[2]));
  }

  String _toISO(DateTime d) =>
      '${d.year}-${d.month.toString().padLeft(2, '0')}-${d.day.toString().padLeft(2, '0')}';

  bool _isSameDay(DateTime a, DateTime b) =>
      a.year == b.year && a.month == b.month && a.day == b.day;

  bool _isDateDisabled(DateTime d) {
    if (widget.min != null) {
      final min = _parseISO(widget.min!);
      if (min != null && d.isBefore(min)) return true;
    }
    if (widget.max != null) {
      final max = _parseISO(widget.max!);
      if (max != null && d.isAfter(max)) return true;
    }
    return widget.disabledDates.contains(_toISO(d));
  }

  void _selectDate(DateTime d) {
    final iso = _toISO(d);
    if (!_isControlled) setState(() => _internal = iso);
    widget.onChanged?.call(iso);
    _close();
  }

  void _clear() {
    if (!_isControlled) setState(() => _internal = '');
    widget.onChanged?.call('');
  }

  String get _displayValue {
    final d = _parseISO(_val);
    if (d == null) return '';
    return '${_months[d.month - 1]} ${d.day}, ${d.year}';
  }

  void _toggleOpen() {
    if (widget.disabled || widget.loading) return;
    _open ? _close() : _openCal();
  }

  void _openCal() {
    setState(() => _open = true);
    _removeOverlay();
    _overlay = OverlayEntry(builder: (_) => _buildCalendar());
    Overlay.of(context).insert(_overlay!);
  }

  void _close() {
    _removeOverlay();
    setState(() => _open = false);
  }

  void _removeOverlay() {
    _overlay?.remove();
    _overlay = null;
  }

  void _prevMonth() {
    if (_viewMonth == 1) {
      _viewMonth = 12;
      _viewYear--;
    } else {
      _viewMonth--;
    }
    _overlay?.markNeedsBuild();
  }

  void _nextMonth() {
    if (_viewMonth == 12) {
      _viewMonth = 1;
      _viewYear++;
    } else {
      _viewMonth++;
    }
    _overlay?.markNeedsBuild();
  }

  List<List<DateTime?>> _calendarGrid(int year, int month) {
    final first = DateTime(year, month, 1);
    final daysInMonth = DateTime(year, month + 1, 0).day;
    final startWeekday = first.weekday % 7;
    final weeks = <List<DateTime?>>[];
    var week = <DateTime?>[];
    for (var i = 0; i < startWeekday; i++) week.add(null);
    for (var d = 1; d <= daysInMonth; d++) {
      week.add(DateTime(year, month, d));
      if (week.length == 7) {
        weeks.add(week);
        week = [];
      }
    }
    if (week.isNotEmpty) {
      while (week.length < 7) week.add(null);
      weeks.add(week);
    }
    return weeks;
  }

  Widget _buildCalendar() {
    final sys = Theme.of(context).extension<FlowSysTokens>()!;
    final selected = _parseISO(_val);
    final today = DateTime.now();
    final weeks = _calendarGrid(_viewYear, _viewMonth);

    return Positioned(
      width: 300,
      child: CompositedTransformFollower(
        link: _layerLink,
        showWhenUnlinked: false,
        offset: Offset(0, (context.size?.height ?? 56) + FlowRefFrame.space1),
        child: TapRegion(
          onTapOutside: (_) => _close(),
          child: Material(
            elevation: 4,
            borderRadius: BorderRadius.circular(FlowRefFrame.radius3),
            color: sys.surfacePrimary,
            child: Padding(
              padding: const EdgeInsets.all(FlowRefFrame.space4),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      FlowIconButton(
                        icon: Icons.chevron_left,
                        size: FlowComponentSize.sm,
                        variant: FlowIconButtonVariant.ghost,
                        onPressed: _prevMonth,
                        semanticLabel: 'Previous month',
                      ),
                      FlowText(
                        '${_months[_viewMonth - 1]} $_viewYear',
                        role: FlowTextRole.labelS,
                      ),
                      FlowIconButton(
                        icon: Icons.chevron_right,
                        size: FlowComponentSize.sm,
                        variant: FlowIconButtonVariant.ghost,
                        onPressed: _nextMonth,
                        semanticLabel: 'Next month',
                      ),
                    ],
                  ),
                  SizedBox(height: FlowRefFrame.space2),
                  Row(
                    children: _days
                        .map((d) => Expanded(
                              child: Center(
                                child: FlowText(d,
                                    role: FlowTextRole.caption,
                                    color: FlowTextColor.tertiary),
                              ),
                            ))
                        .toList(),
                  ),
                  SizedBox(height: FlowRefFrame.space1),
                  ...weeks.map((week) => Row(
                        children: week.map((day) {
                          if (day == null)
                            return const Expanded(child: SizedBox(height: 36));
                          final isSel =
                              selected != null && _isSameDay(day, selected);
                          final isToday = _isSameDay(day, today);
                          final isDis = _isDateDisabled(day);
                          return Expanded(
                            child: Semantics(
                              label:
                                  '${_months[day.month - 1]} ${day.day}, ${day.year}',
                              selected: isSel,
                              enabled: !isDis,
                              child: GestureDetector(
                                onTap: isDis ? null : () => _selectDate(day),
                                child: Container(
                                  height: 36,
                                  decoration: BoxDecoration(
                                    color: isSel ? sys.actionPrimary : null,
                                    borderRadius: BorderRadius.circular(
                                        FlowRefFrame.radius2),
                                    border: isToday && !isSel
                                        ? Border.all(color: sys.borderAccent)
                                        : null,
                                  ),
                                  alignment: Alignment.center,
                                  child: Text(
                                    '${day.day}',
                                    style: TextStyle(
                                      fontSize: sys.captionFontSize,
                                      color: isDis
                                          ? sys.textDisabled
                                          : isSel
                                              ? sys.textOnAction
                                              : sys.textPrimary,
                                    ),
                                  ),
                                ),
                              ),
                            ),
                          );
                        }).toList(),
                      )),
                  SizedBox(height: FlowRefFrame.space2),
                  FlowButton(
                    variant: FlowButtonVariant.ghost,
                    size: FlowComponentSize.sm,
                    onPressed: () {
                      final t = DateTime.now();
                      _viewYear = t.year;
                      _viewMonth = t.month;
                      _selectDate(t);
                    },
                    child: const Text('Today'),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final sz = widget.size ?? FlowSizeProvider.of(context);

    return CompositedTransformTarget(
      link: _layerLink,
      child: Semantics(
        label: widget.semanticLabel ?? widget.label ?? 'Date picker',
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          mainAxisSize: MainAxisSize.min,
          children: [
            if (widget.label != null)
              Padding(
                padding: const EdgeInsets.only(bottom: FlowRefFrame.space1),
                child: FlowText(widget.label!,
                    role: FlowTextRole.labelS, color: FlowTextColor.secondary),
              ),
            GestureDetector(
              onTap: _toggleOpen,
              child: AbsorbPointer(
                child: FlowTextInput(
                  initialValue: _displayValue,
                  readOnly: true,
                  placeholder: widget.placeholder,
                  leadingIcon: Icons.calendar_today,
                  clearable: _val.isNotEmpty && !widget.disabled,
                  onClear: _clear,
                  size: sz,
                  enabled: !widget.disabled && !widget.loading,
                  loading: widget.loading,
                  error: widget.error ? (widget.errorMessage ?? ' ') : null,
                ),
              ),
            ),
            if (widget.error && widget.errorMessage != null)
              Padding(
                padding: const EdgeInsets.only(top: FlowRefFrame.space1),
                child: FlowText(
                  widget.errorMessage!,
                  role: FlowTextRole.caption,
                  color: FlowTextColor.danger,
                ),
              ),
          ],
        ),
      ),
    );
  }
}
