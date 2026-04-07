/**
 * FLOW Design System — Demo Helpers
 * Shared layout primitives for demo sections.
 */
import { type CSSProperties, type ReactNode } from "react";

import { Surface, Text } from "../../../lib";

export type Density = "compact" | "default" | "comfortable";

// Responsive grid helpers — using Grid's minItemWidth for auto-fit responsive columns
export const GRID_2_MIN = "280px";
export const GRID_3_MIN = "240px";

/** Density-responsive group inside DemoSection. Replaces <Stack gap={2}> for subsection wrappers. */
export function DemoGroup({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--sys-frame-gap-component)",
        minWidth: 0,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function DemoSection({
  title,
  description,
  children,
  surfaceProps,
  noSurface = false,
}: {
  title: string;
  description?: ReactNode;
  children: ReactNode;
  /** Extra props for the Surface wrapper (e.g. style overrides) */
  surfaceProps?: { style?: CSSProperties; className?: string };
  /** Render children without a Surface (for demos that ARE surfaces, like FlowCard) */
  noSurface?: boolean;
}) {
  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--sys-frame-gap-subsection)",
        minWidth: 0,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--sys-frame-gap-component)",
        }}
      >
        <Text role="heading-l">{title}</Text>
        {description && (
          <Text style={{ maxWidth: "var(--sys-frame-content-prose)" }}>{description}</Text>
        )}
      </div>

      {noSurface ? (
        children
      ) : (
        <Surface
          padding={0}
          radius="surface"
          border
          style={{
            padding: "var(--sys-frame-padding-surface)",
            overflow: "clip",
            ...surfaceProps?.style,
          }}
          className={surfaceProps?.className}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--sys-frame-gap-subsection)",
            }}
          >
            {children}
          </div>
        </Surface>
      )}
    </section>
  );
}
