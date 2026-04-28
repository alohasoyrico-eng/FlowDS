/** FLOW — FlowFileUpload (L4 Pattern) */
import "../css/FileUpload.css";
import React, { type CSSProperties, forwardRef, useId, useRef, useState } from "react";

import { FlowIcon, GrowthObserver, stateAttrs, Text, useFlowDefaultSize } from "@flow/primitives";
import { FlowButton, FlowIconButton, FlowProgressBar } from "@flow/components";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FILE UPLOAD — Drag & drop upload zone
//    Supports click-to-browse, multiple files, size limits, accept filter
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export interface UploadedFile {
  /** The native File object */
  file: File;
  /** Unique identifier for tracking */
  id: string;
  /** Upload progress percentage (0-100) */
  progress: number;
  /** Current upload status */
  status: "pending" | "uploading" | "success" | "error";
  /** Error message if upload failed */
  error?: string;
}

/** Props for FlowFileUpload — drag-and-drop file upload zone with size validation and progress tracking. */
export interface FileUploadProps {
  /** Accepted file types (e.g. "image/*,.pdf") */
  accept?: string;
  /** Whether multiple files can be uploaded */
  multiple?: boolean;
  /** Maximum file size in megabytes */
  maxSizeMB?: number;
  /** Maximum number of files allowed */
  maxFiles?: number;
  /** Callback fired with selected files */
  onFiles?: (files: File[]) => void;
  /** Label text for the upload zone */
  label?: string;
  /** Helper text shown in the upload zone */
  description?: string;
  /** Alias for description */
  hint?: string;
  /** Whether the upload zone is disabled */
  disabled?: boolean;
  /** Upload zone size variant */
  size?: "sm" | "md" | "lg";
  /** Additional CSS class names */
  className?: string;
  /** Custom inline styles */
  style?: CSSProperties;
}

export const FlowFileUpload = forwardRef<HTMLDivElement, FileUploadProps>(function FlowFileUpload(
  {
    accept,
    multiple = true,
    maxSizeMB: maxSizeMBProp,
    maxFiles = 10,
    onFiles,
    label = "Upload Files",
    description: descriptionProp,
    hint,
    disabled = false,
    size = "md",
    className = "",
    style,
    ...rest
  },
  ref,
) {
  const resolvedSize = useFlowDefaultSize(size);
  const maxSizeMB = maxSizeMBProp ?? 10;
  const description = descriptionProp ?? hint;
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileCounter = useRef(0);
  const uid = useId();

  const processFiles = (incoming: FileList | File[]) => {
    const arr = Array.from(incoming);
    const newFiles: UploadedFile[] = [];
    for (const f of arr) {
      if (files.length + newFiles.length >= maxFiles) break;
      fileCounter.current += 1;
      const id = `${uid}-${fileCounter.current}`;
      if (f.size > maxSizeMB * 1024 * 1024) {
        newFiles.push({
          file: f,
          id,
          progress: 0,
          status: "error",
          error: `Exceeds ${maxSizeMB}MB limit`,
        });
      } else {
        newFiles.push({ file: f, id, progress: 0, status: "pending" });
      }
    }
    setFiles((prev) => [...prev, ...newFiles]);
    onFiles?.(newFiles.filter((f) => f.status !== "error").map((f) => f.file));

    // Simulate upload progress
    for (const nf of newFiles) {
      if (nf.status === "error") continue;
      simulateUpload(nf.id);
    }
  };

  const simulateUpload = (fileId: string) => {
    let progress = 0;
    setFiles((prev) =>
      prev.map((f) => (f.id === fileId ? { ...f, status: "uploading" as const } : f)),
    );
    const interval = setInterval(() => {
      progress += Math.random() * 25 + 5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setFiles((prev) =>
          prev.map((f) =>
            f.id === fileId ? { ...f, progress: 100, status: "success" as const } : f,
          ),
        );
      } else {
        setFiles((prev) =>
          prev.map((f) => (f.id === fileId ? { ...f, progress: Math.min(progress, 99) } : f)),
        );
      }
    }, 300);
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (disabled) return;
    processFiles(e.dataTransfer.files);
  };

  const _zoneH = resolvedSize === "sm" ? 100 : resolvedSize === "lg" ? 180 : 140;

  return (
    <GrowthObserver event="flow.file-upload.impression">
      <div
        ref={ref}
        {...rest}
        className={`flow-file-upload ${className}`}
        data-size={resolvedSize}
        {...stateAttrs({ disabled })}
        style={style}
      >
        {/* Drop zone */}
        <div
          className="flow-file-upload-zone flow-focusable"
          onDragOver={(e) => {
            e.preventDefault();
            if (!disabled) setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
          onClick={() => {
            if (!disabled) inputRef.current?.click();
          }}
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-label={label}
          onKeyDown={(e) => {
            if (!disabled && (e.key === "Enter" || e.key === " ")) {
              e.preventDefault();
              inputRef.current?.click();
            }
          }}
          data-drag-over={dragOver || undefined}
        >
          <FlowIcon
            name="download"
            size="md"
            color={dragOver ? "var(--sys-energy-status-info)" : "var(--sys-energy-text-tertiary)"}
          />
          <Text variant="paragraph-s" color="secondary">
            {dragOver ? "Drop files here" : "Drag files here or click to browse"}
          </Text>
          {description && (
            <Text variant="caption" color="secondary">
              {description}
            </Text>
          )}
          <Text variant="caption" color="secondary">
            Max {maxSizeMB}MB per file{multiple ? `, up to ${maxFiles} files` : ""}
          </Text>
        </div>

        <FlowButton
          variant="tertiary"
          size="sm"
          leadingIcon="upload"
          disabled={disabled}
          onClick={() => {
            if (!disabled) inputRef.current?.click();
          }}
        >
          Browse
        </FlowButton>

        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={(e) => {
            if (e.target.files) processFiles(e.target.files);
            e.target.value = "";
          }}
          style={{ display: "none" }}
          aria-hidden="true"
        />

        {/* File list */}
        {files.length > 0 && (
          <div className="flow-file-upload-list">
            {files.map((f) => (
              <div key={f.id} className="flow-file-upload-item" data-status={f.status}>
                <FlowIcon
                  name={
                    f.status === "error"
                      ? "alert-circle"
                      : f.status === "success"
                        ? "check"
                        : "file"
                  }
                  size="sm"
                  color={
                    f.status === "error"
                      ? "var(--sys-energy-status-error)"
                      : f.status === "success"
                        ? "var(--sys-energy-status-success)"
                        : "var(--sys-energy-text-tertiary)"
                  }
                />
                <div className="flow-file-upload-item-info">
                  <div className="flow-file-upload-item-name">{f.file.name}</div>
                  {f.status === "uploading" && (
                    <FlowProgressBar
                      value={f.progress}
                      size="sm"
                      aria-label={`Uploading ${f.file.name}`}
                    />
                  )}
                  {f.error && (
                    <Text variant="caption" color="danger">
                      {f.error}
                    </Text>
                  )}
                </div>
                <span className="flow-file-upload-item-size">
                  {(f.file.size / 1024).toFixed(0)} KB
                </span>
                <FlowIconButton
                  icon="x"
                  size="sm"
                  variant="ghost"
                  className="flow-file-upload-item-remove"
                  onClick={() => removeFile(f.id)}
                  aria-label={`Remove ${f.file.name}`}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </GrowthObserver>
  );
});
FlowFileUpload.displayName = "FlowFileUpload";
