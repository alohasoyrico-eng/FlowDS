/** FLOW — FlowRichTextEditor (L4 Pattern) */
import { type CSSProperties, forwardRef, useMemo, useRef, useState } from "react";

import { stateAttrs, Text } from "../../primitives";
import { FlowIconButton } from "../controls/FlowIconButton";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// RICH TEXT EDITOR — Basic formatting toolbar + contentEditable
//    Toolbar buttons: bold, italic, underline, lists, headings
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/** Props for FlowRichTextEditor — basic rich text editor with a formatting toolbar and contentEditable area. */
export interface RichTextEditorProps {
  /** Default HTML content (uncontrolled) */
  defaultValue?: string;
  /** Callback fired when the content changes */
  onChange?: (html: string) => void;
  /** Placeholder text shown when empty */
  placeholder?: string;
  /** Minimum editor height in px */
  minHeight?: number;
  /** Maximum editor height in px */
  maxHeight?: number;
  /** Whether the editor is disabled */
  disabled?: boolean;
  /** Label text above the editor */
  label?: string;
  /** Additional CSS class names */
  className?: string;
  /** Custom inline styles */
  style?: CSSProperties;
}

type FormatCmd = "bold" | "italic" | "underline" | "insertUnorderedList" | "insertOrderedList";

const TOOLBAR_BUTTONS: { cmd: FormatCmd; icon: string; label: string }[] = [
  { cmd: "bold", icon: "bold", label: "Bold" },
  { cmd: "italic", icon: "italic", label: "Italic" },
  { cmd: "underline", icon: "underline", label: "Underline" },
  { cmd: "insertUnorderedList", icon: "list", label: "Bullet list" },
  { cmd: "insertOrderedList", icon: "list-ordered", label: "Numbered list" },
];

/** Strip dangerous tags/attributes from HTML to mitigate XSS */
function sanitizeHTML(html: string): string {
  const doc = new DOMParser().parseFromString(html, "text/html");
  doc
    .querySelectorAll("script,style,iframe,object,embed,link,meta,form")
    .forEach((el) => el.remove());
  doc.querySelectorAll("*").forEach((el) => {
    for (const attr of Array.from(el.attributes)) {
      if (attr.name.startsWith("on") || attr.name === "srcdoc") el.removeAttribute(attr.name);
      if (attr.name === "href" && attr.value.trim().toLowerCase().startsWith("javascript:"))
        el.removeAttribute(attr.name);
    }
  });
  return doc.body.innerHTML;
}

export const FlowRichTextEditor = forwardRef<HTMLDivElement, RichTextEditorProps>(
  function FlowRichTextEditor({
  defaultValue = "",
  onChange,
  placeholder = "Start typing...",
  minHeight = 160,
  maxHeight = 400,
  disabled = false,
  label,
  className = "",
  style,
  ...rest
}, ref) {
  const editorRef = useRef<HTMLDivElement>(null);
  const safeDefault = useMemo(() => sanitizeHTML(defaultValue), [defaultValue]);
  const [_isEmpty, setIsEmpty] = useState(!defaultValue);

  const exec = (cmd: FormatCmd) => {
    document.execCommand(cmd, false);
    editorRef.current?.focus();
  };

  const onInput = () => {
    const html = editorRef.current?.innerHTML ?? "";
    const text = editorRef.current?.textContent ?? "";
    setIsEmpty(!text.trim());
    onChange?.(html);
  };

  return (
    <div
      ref={ref}
      {...rest}
      className={`flow-rich-text-editor ${className}`}
      style={style}
      {...stateAttrs({ disabled })}
    >
      {label && (
        <Text
          role="paragraph-s"
          color="secondary"
          style={{ marginBottom: "var(--ref-frame-space-1)" }}
        >
          {label}
        </Text>
      )}

      <div className="flow-rich-text-editor-container">
        {/* Toolbar — onMouseDown prevents focus loss from contentEditable */}
        <div role="toolbar" aria-label="Formatting" className="flow-rich-text-editor-toolbar" onMouseDown={(e) => e.preventDefault()}>
          {TOOLBAR_BUTTONS.map((btn) => (
            <FlowIconButton
              key={btn.cmd}
              icon={btn.icon}
              aria-label={btn.label}
              tooltip={btn.label}
              onClick={() => exec(btn.cmd)}
              variant="ghost"
              size="sm"
              className="flow-rich-text-editor-toolbar-btn"
            />
          ))}

          <div className="flow-rich-text-editor-toolbar-divider" />

          {/* Heading buttons */}
          {(["H1", "H2", "H3"] as const).map((tag) => (
            <FlowIconButton
              key={tag}
              icon={`heading-${tag.slice(1)}`}
              aria-label={`Heading ${tag.slice(1)}`}
              tooltip={`Heading ${tag.slice(1)}`}
              onClick={() => {
                document.execCommand("formatBlock", false, tag);
                editorRef.current?.focus();
              }}
              variant="ghost"
              size="sm"
              className="flow-rich-text-editor-toolbar-btn"
            />
          ))}
        </div>

        {/* Editable area */}
        <div style={{ position: "relative" }}>
          <div
            ref={editorRef}
            contentEditable={!disabled}
            role="textbox"
            aria-multiline="true"
            aria-label={label ?? "Rich text editor"}
            onInput={onInput}
            dangerouslySetInnerHTML={{ __html: safeDefault }}
            className="flow-rich-text-editor-content"
            data-placeholder={placeholder}
            style={{ minHeight, maxHeight }}
          />
        </div>
      </div>
    </div>
  );
});
FlowRichTextEditor.displayName = "FlowRichTextEditor";
