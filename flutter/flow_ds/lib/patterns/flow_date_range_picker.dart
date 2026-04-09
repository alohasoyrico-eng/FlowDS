/// FLOW Design System — FlowDateRangePicker (L4 Pattern)
/// Two-month calendar for selecting a start and end date range with presets.
/// Composes FlowTextInput, FlowButton, FlowIconButton, FlowIcon (L3).
/// Source: FlowDateRangePicker.tsx
import 'package:flutter/material.dart';

import '../components/controls/flow_button.dart';
import '../components/controls/flow_icon_button.dart';
import '../components/inputs/flow_text_input.dart';
import '../primitives/icon.dart';
import '../primitives/text.dart';
import '../theme/flow_size_provider.dart';
import '../tokens/density.dart';
import '../tokens/ref_tokens.dart';
import '../tokens/sys_tokens.dart';

/// A date range with start and end ISO strings (YYYY-MM-DD).
class FlowDateRange {
  const FlowDateRange({required this.start, required this.end});
  final String start;
  final String end;
}

/// A preset quick-select range.
class FlowDateRangePreset {
  const FlowDateRangePreset({required this.label, required this.getRange});
  final String label;
  final FlowDateRange Function() getRange;
}

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
const _monthsShort = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
];
const _dayHeaders = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

/// Two-month date range picker with presets.
class FlowDateRangePicker extends StatefulWidget {
  const FlowDateRangePicker({
    super.key,
    this.value,
    this.initialValue,
    this.onChanged,
    this.label,
    this.placeholderStart = 'Start date',
    this.placeholderEnd = 'End date',
    this.min,
    this.max,
    this.disabledDates = const [],
    this.presets,
    this.size,
    this.error = false,
    this.errorMessage,
    this.disabled = false,
    this.semanticLabel,
  });

  final FlowDateRange? value;
  final FlowDateRange? initialValue;
  final ValueChanged<FlowDateRange?>? onChanged;
  final String? label;
  final String placeholderStart;
  final String placeholderEnd;
  final String? min;
  final String? max;
  final List<String> disabledDates;
  final List<FlowDateRangePreset>? presets;
  final FlowComponentSize? size;
  final bool error;
  final String? errorMessage;
  final bool disabled;
  final String? semanticLabel;

  @override
  State<FlowDateRangePicker> createState() => _FlowDateRangePickerState();
}

class _FlowDateRangePickerState extends State<FlowDateRangePicker> {
  final LayerLink _layerLink = LayerLink();
  OverlayEntry? _overlay;
  FlowDateRange? _internal;
  bool _open = false;
  late int _leftYear;
  late int _leftMonth;
  DateTime? _pickingStart;
  DateTime? _hoverDate;

  bool get _isControlled => widget.value != null;
  FlowDateRange? get _range => _isControlled ? widget.value : _internal;

  @override
  void initState() {
    super.initState();
    _internal = widget.initialValue;
    final sd = _range != null ? _parseISO(_range!.start) : null;
    final now = DateTime.now();
    _leftYear = sd?.year ?? now.year;
    _leftMonth = sd?.month ?? now.month;
  }

  @override
  void dispose() {
    _removeOverlay();
    super.dispose();
  }

  DateTime? _parseISO(String s) {
    if (s.isEmpty) return null;
    final p = s.split('-');
    if (p.length != 3) return null;
    return DateTime(int.parse(p[0]), int.parse(p[1]), int.parse(p[2]));
  }

  String _toISO(DateTime d) =>
      '${d.year}-${d.month.toString().padLeft(2, '0')}-${d.day.toString().padLeft(2, '0')}';

  bool _isSameDay(DateTime a, DateTime b) =>
      a.year == b.year && a.month == b.month && a.day == b.day;

  bool _isDateDisabled(DateTime d) {
    if (widget.min != null) {
      final m = _parseISO(widget.min!);
      if (m != null && d.isBefore(m)) return true;
    }
    if (widget.max != null) {
      final m = _parseISO(widget.max!);
      if (m != null && d.isAfter(m)) return true;
    }
    return widget.disabledDates.contains(_toISO(d));
  }

  String _formatShort(String iso) {
    final d = _parseISO(iso);
    if (d == null) return '';
    return '${_monthsShort[d.month - 1]} ${d.day}, ${d.year}';
  }

  void _applyRange(FlowDateRange? range) {
    if (!_isControlled) setState(() => _internal = range);
    widget.onChanged?.call(range);
  }

  void _handleDayClick(DateTime day) {
    if (_isDateDisabled(day)) return;
    if (_pickingStart == null) {
      setState(() {
        _pickingStart = day;
        _hoverDate = null;
      });
      _overlay?.markNeedsBuild();
    } else {
      var s = _pickingStart!, e = day;
      if (e.isBefore(s)) {
        final t = s;
        s = e;
        e = t;
      }
      _applyRange(FlowDateRange(start: _toISO(s), end: _toISO(e)));
      setState(() {
        _pickingStart = null;
        _hoverDate = null;
      });
      _close();
    }
  }

  void _handlePreset(FlowDateRangePreset preset) {
    final range = preset.getRange();
    _applyRange(range);
    setState(() {
      _pickingStart = null;
      _hoverDate = null;
    });
    final sd = _parseISO(range.start);
    if (sd != null) {
      _leftYear = sd.year;
      _leftMonth = sd.month;
    }
    _close();
  }

  List<FlowDateRangePreset> get _actualPresets =>
      widget.presets ?? _defaultPresets();

  List<FlowDateRangePreset> _defaultPresets() => [
        FlowDateRangePreset(
            label: 'Today',
            getRange: () {
              final t = _toISO(DateTime.now());
              return FlowDateRange(start: t, end: t);
            }),
        FlowDateRangePreset(
            label: 'Last 7 days',
            getRange: () {
              final e = DateTime.now();
              final s = e.subtract(const Duration(days: 6));
              return FlowDateRange(start: _toISO(s), end: _toISO(e));
            }),
        FlowDateRangePreset(
            label: 'Last 30 days',
            getRange: () {
              final e = DateTime.now();
              final s = e.subtract(const Duration(days: 29));
              return FlowDateRange(start: _toISO(s), end: _toISO(e));
            }),
        FlowDateRangePreset(
            label: 'This month',
            getRange: () {
              final now = DateTime.now();
              return FlowDateRange(
                  start: _toISO(DateTime(now.year, now.month, 1)),
                  end: _toISO(DateTime(now.year, now.month + 1, 0)));
            }),
      ];

  void _toggleOpen() {
    if (widget.disabled) return;
    _open ? _close() : _openCal();
  }

  void _openCal() {
    setState(() => _open = true);
    _removeOverlay();
    _overlay = OverlayEntry(builder: (_) => _buildDropdown());
    Overlay.of(context).insert(_overlay!);
  }

  void _close() {
    _removeOverlay();
    setState(() {
      _open = false;
      _pickingStart = null;
    });
  }

  void _removeOverlay() {
    _overlay?.remove();
    _overlay = null;
  }

  void _prevMonth() {
    if (_leftMonth == 1) {
      _leftMonth = 12;
      _leftYear--;
    } else {
      _leftMonth--;
    }
    _overlay?.markNeedsBuild();
  }

  void _nextMonth() {
    if (_leftMonth == 12) {
      _leftMonth = 1;
      _leftYear++;
    } else {
      _leftMonth++;
    }
    _overlay?.markNeedsBuild();
  }

  int get _rightYear => _leftMonth == 12 ? _leftYear + 1 : _leftYear;
  int get _rightMonth => _leftMonth == 12 ? 1 : _leftMonth + 1;

  bool _isInRange(DateTime day) {
    if (_pickingStart != null && _hoverDate != null) {
      final a =
          _pickingStart!.isBefore(_hoverDate!) ? _pickingStart! : _hoverDate!;
      final b =
          _pickingStart!.isBefore(_hoverDate!) ? _hoverDate! : _pickingStart!;
      return !day.isBefore(a) && !day.isAfter(b);
    }
    if (_range != null) {
      final s = _parseISO(_range!.start);
      final e = _parseISO(_range!.end);
      if (s != null && e != null) return !day.isBefore(s) && !day.isAfter(e);
    }
    return false;
  }

  bool _isRangeEndpoint(DateTime day) {
    if (_pickingStart != null && _hoverDate == null)
      return _isSameDay(day, _pickingStart!);
    if (_pickingStart != null && _hoverDate != null) {
      final a =
          _pickingStart!.isBefore(_hoverDate!) ? _pickingStart! : _hoverDate!;
      final b =
          _pickingStart!.isBefore(_hoverDate!) ? _hoverDate! : _pickingStart!;
      return _isSameDay(day, a) || _isSameDay(day, b);
    }
    if (_range != null) {
      final s = _parseISO(_range!.start);
      final e = _parseISO(_range!.end);
      return (s != null && _isSameDay(day, s)) ||
          (e != null && _isSameDay(day, e));
    }
    return false;
  }

  List<List<DateTime?>> _grid(int year, int month) {
    final first = DateTime(year, month, 1);
    final dim = DateTime(year, month + 1, 0).day;
    final sw = first.weekday % 7;
    final weeks = <List<DateTime?>>[];
    var week = <DateTime?>[];
    for (var i = 0; i < sw; i++) week.add(null);
    for (var d = 1; d <= dim; d++) {
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

  Widget _buildMonth(int year, int month, FlowSysTokens sys) {
    final weeks = _grid(year, month);
    final today = DateTime.now();
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        FlowText('${_months[month - 1]} $year', role: FlowTextRole.labelM),
        SizedBox(height: FlowRefFrame.space2),
        Row(
            children: _dayHeaders
                .map((d) => Expanded(
                    child: Center(
                        child: FlowText(d,
                            role: FlowTextRole.caption,
                            color: FlowTextColor.tertiary))))
                .toList()),
        SizedBox(height: FlowRefFrame.space1),
        ...weeks.map((week) => Row(
                children: week.map((day) {
              if (day == null)
                return const Expanded(child: SizedBox(height: 32));
              final isDis = _isDateDisabled(day);
              final inRange = _isInRange(day);
              final isEndpoint = _isRangeEndpoint(day);
              final isToday = _isSameDay(day, today);
              return Expanded(
                child: Semantics(
                  label: '${_months[day.month - 1]} ${day.day}, ${day.year}',
                  selected: isEndpoint,
                  child: MouseRegion(
                    onEnter: (_) {
                      if (_pickingStart != null && !isDis)
                        setState(() {
                          _hoverDate = day;
                        });
                      _overlay?.markNeedsBuild();
                    },
                    child: GestureDetector(
                      onTap: isDis ? null : () => _handleDayClick(day),
                      child: Container(
                        height: 32,
                        decoration: BoxDecoration(
                          color: isEndpoint
                              ? sys.actionPrimary
                              : inRange
                                  ? sys.surfaceAccent.withValues(alpha: 0.15)
                                  : null,
                          borderRadius:
                              BorderRadius.circular(FlowRefFrame.radius1),
                          border: isToday && !isEndpoint
                              ? Border.all(color: sys.borderAccent)
                              : null,
                        ),
                        alignment: Alignment.center,
                        child: Text('${day.day}',
                            style: TextStyle(
                                fontSize: sys.captionFontSize,
                                color: isDis
                                    ? sys.textDisabled
                                    : isEndpoint
                                        ? sys.textOnAction
                                        : sys.textPrimary)),
                      ),
                    ),
                  ),
                ),
              );
            }).toList())),
      ],
    );
  }

  Widget _buildDropdown() {
    final sys = Theme.of(context).extension<FlowSysTokens>()!;
    final presets = _actualPresets;

    return Positioned(
      width: 560,
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
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  if (presets.isNotEmpty)
                    SizedBox(
                      width: 120,
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.stretch,
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          FlowText('Quick select',
                              role: FlowTextRole.labelS,
                              color: FlowTextColor.tertiary),
                          SizedBox(height: FlowRefFrame.space2),
                          ...presets.map((p) => FlowButton(
                                variant: FlowButtonVariant.ghost,
                                size: FlowComponentSize.sm,
                                onPressed: () => _handlePreset(p),
                                child: Text(p.label),
                              )),
                        ],
                      ),
                    ),
                  if (presets.isNotEmpty) SizedBox(width: FlowRefFrame.space4),
                  Expanded(
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
                                semanticLabel: 'Previous month'),
                            FlowIconButton(
                                icon: Icons.chevron_right,
                                size: FlowComponentSize.sm,
                                variant: FlowIconButtonVariant.ghost,
                                onPressed: _nextMonth,
                                semanticLabel: 'Next month'),
                          ],
                        ),
                        SizedBox(height: FlowRefFrame.space2),
                        Row(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Expanded(
                                child: _buildMonth(_leftYear, _leftMonth, sys)),
                            SizedBox(width: FlowRefFrame.space4),
                            Expanded(
                                child:
                                    _buildMonth(_rightYear, _rightMonth, sys)),
                          ],
                        ),
                        if (_pickingStart != null) ...[
                          SizedBox(height: FlowRefFrame.space2),
                          FlowText('Now select the end date',
                              role: FlowTextRole.caption,
                              color: FlowTextColor.accent),
                        ],
                      ],
                    ),
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
    final sys = Theme.of(context).extension<FlowSysTokens>()!;
    final sz = widget.size ?? FlowSizeProvider.of(context);
    final displayStart = _range != null ? _formatShort(_range!.start) : '';
    final displayEnd = _range != null ? _formatShort(_range!.end) : '';

    return CompositedTransformTarget(
      link: _layerLink,
      child: Semantics(
        label: widget.semanticLabel ?? widget.label ?? 'Date range picker',
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
                child: Row(children: [
                  Expanded(
                      child: FlowTextInput(
                          initialValue: displayStart,
                          readOnly: true,
                          placeholder: widget.placeholderStart,
                          leadingIcon: Icons.calendar_today,
                          size: sz,
                          enabled: !widget.disabled)),
                  Padding(
                      padding: const EdgeInsets.symmetric(
                          horizontal: FlowRefFrame.space2),
                      child: FlowIcon(Icons.arrow_forward,
                          size: FlowIconSize.sm, iconColor: sys.textTertiary)),
                  Expanded(
                      child: FlowTextInput(
                          initialValue: displayEnd,
                          readOnly: true,
                          placeholder: widget.placeholderEnd,
                          clearable: _range != null && !widget.disabled,
                          onClear: () => _applyRange(null),
                          size: sz,
                          enabled: !widget.disabled)),
                ]),
              ),
            ),
            if (widget.error && widget.errorMessage != null)
              Padding(
                padding: const EdgeInsets.only(top: FlowRefFrame.space1),
                child: FlowText(widget.errorMessage!,
                    role: FlowTextRole.caption, color: FlowTextColor.danger),
              ),
          ],
        ),
      ),
    );
  }
}
