/// FLOW Design System — FlowFileUpload (L4 Pattern)
/// Drag-and-drop file upload zone with size validation and progress tracking.
/// Composes FlowButton, FlowIconButton, FlowProgressBar, FlowIcon, FlowText (L3).
/// Source: FlowFileUpload.tsx
import 'dart:math' as math;

import 'package:flutter/material.dart';

import '../components/controls/flow_button.dart';
import '../components/controls/flow_icon_button.dart';
import '../components/feedback/flow_progress_bar.dart';
import '../primitives/icon.dart';
import '../primitives/text.dart';
import '../tokens/density.dart';
import '../tokens/ref_tokens.dart';
import '../tokens/sys_tokens.dart';

/// Status of an uploaded file.
enum FlowUploadStatus { pending, uploading, success, error }

/// Represents a file in the upload queue.
class FlowUploadedFile {
  FlowUploadedFile({
    required this.name,
    required this.sizeBytes,
    required this.id,
    this.progress = 0,
    this.status = FlowUploadStatus.pending,
    this.error,
  });

  final String name;
  final int sizeBytes;
  final String id;
  double progress;
  FlowUploadStatus status;
  String? error;
}

/// Drag-and-drop file upload zone with progress tracking.
///
/// NOTE: Flutter on mobile does not support native drag-and-drop from OS.
/// This widget provides a tap-to-browse experience; on Flutter Web/Desktop
/// you can wrap it with a DropTarget for drag support.
class FlowFileUpload extends StatefulWidget {
  const FlowFileUpload({
    super.key,
    this.accept,
    this.multiple = true,
    this.maxSizeMB = 10,
    this.maxFiles = 10,
    this.onFilesSelected,
    this.label = 'Upload Files',
    this.description,
    this.hint,
    this.disabled = false,
    this.size,
    this.semanticLabel,
  });

  /// Accepted file types hint text (e.g. "image/*,.pdf").
  final String? accept;

  /// Whether multiple files can be uploaded.
  final bool multiple;

  /// Maximum file size in megabytes.
  final double maxSizeMB;

  /// Maximum number of files allowed.
  final int maxFiles;

  /// Callback fired with selected file metadata.
  /// In a real app, this would receive platform File objects.
  final ValueChanged<List<FlowUploadedFile>>? onFilesSelected;

  /// Label text for the upload zone.
  final String label;

  /// Helper text shown in the upload zone.
  final String? description;

  /// Alias for description.
  final String? hint;

  /// Whether the upload zone is disabled.
  final bool disabled;

  /// Upload zone size variant.
  final FlowComponentSize? size;

  /// Accessible label.
  final String? semanticLabel;

  @override
  State<FlowFileUpload> createState() => _FlowFileUploadState();
}

class _FlowFileUploadState extends State<FlowFileUpload> {
  final List<FlowUploadedFile> _files = [];
  int _counter = 0;
  bool _dragOver = false;

  String get _desc => widget.description ?? widget.hint ?? '';

  void _browse() {
    if (widget.disabled) return;
    // Simulate file selection (in production, use file_picker package)
    _addDemoFile('document.pdf', 2400000);
  }

  void _addDemoFile(String name, int sizeBytes) {
    if (_files.length >= widget.maxFiles) return;
    _counter++;
    final id = 'file-$_counter';
    final file = FlowUploadedFile(
      name: name,
      sizeBytes: sizeBytes,
      id: id,
    );

    if (sizeBytes > widget.maxSizeMB * 1024 * 1024) {
      file.status = FlowUploadStatus.error;
      file.error = 'Exceeds ${widget.maxSizeMB.toInt()}MB limit';
    }

    setState(() => _files.add(file));
    widget.onFilesSelected?.call([file]);

    if (file.status != FlowUploadStatus.error) {
      _simulateUpload(id);
    }
  }

  void _simulateUpload(String fileId) {
    setState(() {
      final f = _files.firstWhere((f) => f.id == fileId);
      f.status = FlowUploadStatus.uploading;
    });
    _tick(fileId, 0);
  }

  void _tick(String fileId, double progress) {
    Future.delayed(const Duration(milliseconds: 300), () {
      if (!mounted) return;
      final idx = _files.indexWhere((f) => f.id == fileId);
      if (idx == -1) return;
      final next = progress + (math.Random().nextDouble() * 25 + 5);
      setState(() {
        if (next >= 100) {
          _files[idx].progress = 100;
          _files[idx].status = FlowUploadStatus.success;
        } else {
          _files[idx].progress = math.min(next, 99);
          _tick(fileId, next);
        }
      });
    });
  }

  void _removeFile(String id) {
    setState(() => _files.removeWhere((f) => f.id == id));
  }

  String _formatSize(int bytes) {
    if (bytes < 1024) return '$bytes B';
    return '${(bytes / 1024).toStringAsFixed(0)} KB';
  }

  @override
  Widget build(BuildContext context) {
    final sys = Theme.of(context).extension<FlowSysTokens>()!;
    return Semantics(
      label: widget.semanticLabel ?? widget.label,
      child: Opacity(
        opacity: widget.disabled ? 0.5 : 1.0,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          mainAxisSize: MainAxisSize.min,
          children: [
            // Drop zone
            Semantics(
              button: true,
              label: widget.label,
              child: GestureDetector(
                onTap: _browse,
                child: Container(
                  padding: const EdgeInsets.symmetric(
                    horizontal: FlowRefFrame.space6,
                    vertical: FlowRefFrame.space8,
                  ),
                  decoration: BoxDecoration(
                    color: _dragOver
                        ? sys.surfaceAccent.withValues(alpha: 0.08)
                        : sys.surfaceSecondary,
                    borderRadius: BorderRadius.circular(FlowRefFrame.radius3),
                    border: Border.all(
                      color: _dragOver ? sys.borderAccent : sys.borderSubtle,
                      width: 1.5,
                    ),
                  ),
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      FlowIcon(
                        Icons.cloud_download_outlined,
                        size: FlowIconSize.lg,
                        iconColor:
                            _dragOver ? sys.statusInfo : sys.textTertiary,
                      ),
                      SizedBox(height: FlowRefFrame.space2),
                      FlowText(
                        _dragOver
                            ? 'Drop files here'
                            : 'Drag files here or click to browse',
                        role: FlowTextRole.paragraphS,
                        color: FlowTextColor.secondary,
                      ),
                      if (_desc.isNotEmpty) ...[
                        SizedBox(height: FlowRefFrame.space1),
                        FlowText(_desc,
                            role: FlowTextRole.caption,
                            color: FlowTextColor.secondary),
                      ],
                      SizedBox(height: FlowRefFrame.space1),
                      FlowText(
                        'Max ${widget.maxSizeMB.toInt()}MB per file${widget.multiple ? ', up to ${widget.maxFiles} files' : ''}',
                        role: FlowTextRole.caption,
                        color: FlowTextColor.secondary,
                      ),
                      SizedBox(height: FlowRefFrame.space3),
                      FlowButton(
                        variant: FlowButtonVariant.low,
                        size: FlowComponentSize.sm,
                        leadingIcon: Icons.upload,
                        onPressed: widget.disabled ? null : _browse,
                        child: const Text('Browse'),
                      ),
                    ],
                  ),
                ),
              ),
            ),
            // File list
            if (_files.isNotEmpty) ...[
              SizedBox(height: FlowRefFrame.space3),
              ..._files.map((f) => Padding(
                    padding: const EdgeInsets.only(bottom: FlowRefFrame.space2),
                    child: Container(
                      padding: const EdgeInsets.symmetric(
                        horizontal: FlowRefFrame.space3,
                        vertical: FlowRefFrame.space2,
                      ),
                      decoration: BoxDecoration(
                        color: sys.surfacePrimary,
                        borderRadius:
                            BorderRadius.circular(FlowRefFrame.radius2),
                        border: Border.all(color: sys.borderSubtle),
                      ),
                      child: Row(
                        children: [
                          FlowIcon(
                            f.status == FlowUploadStatus.error
                                ? Icons.error_outline
                                : f.status == FlowUploadStatus.success
                                    ? Icons.check_circle_outline
                                    : Icons.insert_drive_file_outlined,
                            size: FlowIconSize.sm,
                            iconColor: f.status == FlowUploadStatus.error
                                ? sys.statusError
                                : f.status == FlowUploadStatus.success
                                    ? sys.statusSuccess
                                    : sys.textTertiary,
                          ),
                          SizedBox(width: FlowRefFrame.space2),
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              mainAxisSize: MainAxisSize.min,
                              children: [
                                FlowText(f.name, role: FlowTextRole.paragraphS),
                                if (f.status == FlowUploadStatus.uploading)
                                  Padding(
                                    padding: const EdgeInsets.only(
                                        top: FlowRefFrame.space1),
                                    child: FlowProgressBar(
                                      value: f.progress,
                                      semanticLabel: 'Uploading ${f.name}',
                                    ),
                                  ),
                                if (f.error != null)
                                  FlowText(f.error!,
                                      role: FlowTextRole.caption,
                                      color: FlowTextColor.danger),
                              ],
                            ),
                          ),
                          SizedBox(width: FlowRefFrame.space2),
                          FlowText(
                            _formatSize(f.sizeBytes),
                            role: FlowTextRole.caption,
                            color: FlowTextColor.secondary,
                          ),
                          SizedBox(width: FlowRefFrame.space1),
                          FlowIconButton(
                            icon: Icons.close,
                            size: FlowComponentSize.sm,
                            variant: FlowIconButtonVariant.ghost,
                            onPressed: () => _removeFile(f.id),
                            semanticLabel: 'Remove ${f.name}',
                          ),
                        ],
                      ),
                    ),
                  )),
            ],
          ],
        ),
      ),
    );
  }
}
