/**
 * FLOW — Shared Demo Helpers
 * Reusable DemoSection and DemoGroup wrappers for live demos.
 * Used across /demos, /components/:domain, and /patterns/:category.
 *
 * Layout uses CSS classes (.flow-demo-section, .flow-demo-group) defined
 * in flow.css — no inline layout styles. Density-responsive via sys tokens.
 */
import type { ReactNode } from "react";

import { Surface, Text } from "@flow/primitives";

/** Density-responsive group for subsection wrappers inside a DemoSection. */
export function DemoGroup({ children }: { children: ReactNode }) {
  return <div className="flow-demo-group">{children}</div>;
}

/** Consistent demo section with optional Surface wrapper. */
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
  surfaceProps?: { className?: string };
  noSurface?: boolean;
}) {
  return (
    <section className="flow-demo-section">
      <div className="flow-demo-section-header">
        <Text variant="display-s">{title}</Text>
        {description && (
          <Text variant="paragraph-m" color="secondary" className="flow-text-balance">
            {description}
          </Text>
        )}
      </div>

      {noSurface ? (
        children
      ) : (
        <Surface
          padding="surface"
          radius="surface"
          border
          className={`flow-demo-surface${surfaceProps?.className ? ` ${surfaceProps.className}` : ""}`}
        >
          <div className="flow-demo-section-body">{children}</div>
        </Surface>
      )}
    </section>
  );
}
