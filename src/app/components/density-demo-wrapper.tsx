/**
 * DensityDemoWrapper — wraps demo content with an inline density switcher
 * ───────────────────────────────────────────────────────────────────────
 * Used in component-detail and pattern-detail pages to let users preview
 * how components render at each density mode.
 */
import { useState } from "react";
import type React from "react";

import { Code, Inline, Stack, Text } from "@flow/primitives";

type Density = "compact" | "default" | "comfortable";

export function DensityDemoWrapper({ children }: { children: React.ReactNode }) {
  const [density, setDensity] = useState<Density>("default");
  const options: Density[] = ["compact", "default", "comfortable"];

  return (
    <Stack gap="component">
      {/* Switcher row */}
      <Inline gap={2} align="center">
        <Text variant="caption" color="tertiary">
          Density:
        </Text>
        <div
          style={{
            display: "inline-flex",
            borderRadius: "var(--sys-frame-radius-full)",
            border: "1px solid var(--sys-energy-border-default)",
            background: "var(--sys-energy-surface-secondary)",
            padding: "var(--ref-frame-space-micro)",
            gap: "var(--ref-frame-space-micro)",
          }}
        >
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => setDensity(opt)}
              style={{
                padding: "var(--ref-frame-space-1) var(--ref-frame-space-3)",
                borderRadius: "var(--sys-frame-radius-full)",
                border: "none",
                background: density === opt ? "var(--sys-energy-surface-primary)" : "transparent",
                boxShadow: density === opt ? "var(--sys-depth-elevation-1)" : "none",
                color:
                  density === opt
                    ? "var(--sys-energy-text-primary)"
                    : "var(--sys-energy-text-tertiary)",
                fontWeight:
                  density === opt
                    ? "var(--ref-voice-weight-semibold)"
                    : "var(--ref-voice-weight-regular)",
                fontSize: "var(--ref-voice-size-2)",
                fontFamily: "var(--ref-voice-family-sans)",
                cursor: "pointer",
                transition: "all var(--sys-momentum-transition-fast)",
                lineHeight: 1.4,
              }}
            >
              {opt}
            </button>
          ))}
        </div>
        {density !== "default" && (
          <Text variant="caption" color="accent">
            <Code>{`data-density="${density}"`}</Code>
          </Text>
        )}
      </Inline>

      {/* Density-affected zone */}
      <div data-density={density !== "default" ? density : undefined} data-density-animate="">
        {children}
      </div>
    </Stack>
  );
}
