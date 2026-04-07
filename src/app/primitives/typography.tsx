/**
 * FLOW Design System — Typography Primitive
 * ──────────────────────────────────────────
 * Text component with role-based styling.
 */
import React, { type CSSProperties, type ElementType, type ReactNode } from "react";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Text (Typography primitive)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

type TextRole =
  | "display-xl"
  | "display-l"
  | "display-m"
  | "display-s"
  | "heading-xl"
  | "heading-l"
  | "heading-m"
  | "heading-s"
  | "label-xl"
  | "label-l"
  | "label-m"
  | "label-s"
  | "paragraph-xl"
  | "paragraph-l"
  | "paragraph-m"
  | "paragraph-s"
  | "caption"
  | "overline"
  | "code"
  // HTML heading aliases
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  // Legacy aliases (deprecated — use paragraph-* instead)
  | "body-m"
  | "body-s";
type TextColor =
  | "primary"
  | "secondary"
  | "tertiary"
  | "inverse"
  | "accent"
  | "danger"
  | "success"
  | "warning"
  | "link"
  | "onAction"
  | "inherit";
export type Tone = "neutral" | "brand" | "marketing" | "system";

/* colorMap and toneMap moved to CSS: .flow-text[data-color] and .flow-text[data-tone] in flow.css */

const textRoleToClass: Partial<Record<TextRole, string>> & Record<string, string> = {
  // PHASE A: 4×4 grid — Display (brand font, 4 levels)
  "display-xl": "flow-display-xl",
  "display-l": "flow-display-l",
  "display-m": "flow-display-m",
  "display-s": "flow-display-s",
  // PHASE A: 4×4 grid — Heading (brand font, 4 levels)
  "heading-xl": "flow-heading-xl",
  "heading-l": "flow-heading-l",
  "heading-m": "flow-heading-m",
  "heading-s": "flow-heading-s",
  // PHASE A: 4×4 grid — Label (sans font, 4 levels)
  "label-xl": "flow-label-xl",
  "label-l": "flow-label-l",
  "label-m": "flow-label-m",
  "label-s": "flow-label-s",
  // PHASE A: 4×4 grid — Paragraph (sans font, 4 levels)
  "paragraph-xl": "flow-paragraph-xl",
  "paragraph-l": "flow-paragraph-l",
  "paragraph-m": "flow-paragraph-m",
  "paragraph-s": "flow-paragraph-s",
  // Utility roles (density-responsive)
  caption: "flow-caption",
  overline: "flow-section-label",
  code: "flow-inline-code",
  // HTML heading aliases → map to heading equivalents
  h1: "flow-display-xl",
  h2: "flow-heading-xl",
  h3: "flow-heading-l",
  h4: "flow-heading-m",
  h5: "flow-heading-s",
  h6: "flow-heading-s",
  // Legacy aliases → map to paragraph equivalents
  "body-m": "flow-paragraph-m",
  "body-s": "flow-paragraph-s",
};

const textRoleToTag: Partial<Record<TextRole, string>> & Record<string, string> = {
  "display-xl": "h1",
  "display-l": "h1",
  "display-m": "h1",
  "display-s": "h1",
  "heading-xl": "h2",
  "heading-l": "h3",
  "heading-m": "h4",
  "heading-s": "h5",
  "label-xl": "span",
  "label-l": "span",
  "label-m": "span",
  "label-s": "span",
  "paragraph-xl": "p",
  "paragraph-l": "p",
  "paragraph-m": "p",
  "paragraph-s": "p",
  caption: "span",
  overline: "span",
  code: "code",
  // HTML heading aliases → use the tag directly
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  // Legacy aliases
  "body-m": "p",
  "body-s": "p",
};

interface TextProps {
  role?: TextRole;
  color?: TextColor;
  tone?: Tone;
  as?: ElementType;
  truncate?: boolean | number;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  id?: string;
  htmlFor?: string;
  onClick?: React.MouseEventHandler;
  "aria-label"?: string;
}

export function Text({
  role = "paragraph-m",
  color,
  tone,
  as,
  truncate,
  children,
  className = "",
  style,
  id,
  htmlFor,
  onClick,
  "aria-label": ariaLabel,
}: TextProps) {
  const Tag = (as || textRoleToTag[role] || "span") as ElementType;
  const cls = textRoleToClass[role] || "flow-paragraph-m";

  const lineCount = typeof truncate === "number" ? truncate : 1;
  const truncateStyle: CSSProperties = truncate
    ? {
        overflow: "hidden",
        textOverflow: "ellipsis",
        ...(truncate === true || truncate === 1
          ? { whiteSpace: "nowrap" as const }
          : {
              display: "-webkit-box",
              WebkitLineClamp: lineCount,
              WebkitBoxOrient: "vertical" as const,
              // Firefox fallback: approximate max-height from line-height
              maxHeight: `${lineCount * 1.5}em`,
            }),
      }
    : {};

  return (
    <Tag
      id={id}
      htmlFor={htmlFor}
      onClick={onClick}
      aria-label={ariaLabel}
      className={`${cls} flow-text ${className}`.trim()}
      data-color={!tone && color ? color : undefined}
      data-tone={tone || undefined}
      style={{
        ...truncateStyle,
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}
