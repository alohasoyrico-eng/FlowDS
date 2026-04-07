/**
 * FLOW Domain Demos — Interactive demos for component domains & pattern categories
 *
 * Exports:
 * - DOMAIN_DEMO_MAP: Record<string, React.ComponentType> — keyed by domain slug
 * - PATTERN_DEMO_MAP: Record<string, React.ComponentType> — keyed by pattern category slug
 *
 * NOTE: This file was recovered as a stub after accidental deletion.
 *       The original contained ~45 KB of rich interactive demos.
 *       These placeholder components render minimal UI so the app compiles.
 */

import type { ComponentType } from "react";

import { Stack, Surface, Text } from "../../lib";

// ── Placeholder component factory ──

function makePlaceholder(label: string): ComponentType {
  return function PlaceholderDemo() {
    return (
      <Surface style={{ padding: "var(--sys-frame-padding-section)" }}>
        <Stack gap={2}>
          <Text role="heading-m">{label} Demos</Text>
          <Text style={{ opacity: 0.6 }}>
            Interactive demos for this section are being restored. Check back shortly.
          </Text>
        </Stack>
      </Surface>
    );
  };
}

// ── Domain demo map (keyed by domain slug from /components/:domain) ──

export const DOMAIN_DEMO_MAP: Record<string, ComponentType> = {
  controls: makePlaceholder("Controls"),
  selection: makePlaceholder("Selection"),
  inputs: makePlaceholder("Inputs"),
  display: makePlaceholder("Display"),
  navigation: makePlaceholder("Navigation"),
  overlays: makePlaceholder("Overlays"),
  layout: makePlaceholder("Layout"),
  data: makePlaceholder("Data"),
  feedback: makePlaceholder("Feedback"),
};

// ── Pattern demo map (keyed by pattern category slug from /patterns/:category) ──

export const PATTERN_DEMO_MAP: Record<string, ComponentType> = {
  feedback: makePlaceholder("Feedback Patterns"),
  content: makePlaceholder("Content Patterns"),
  navigation: makePlaceholder("Navigation Patterns"),
  overlays: makePlaceholder("Overlay Patterns"),
  data: makePlaceholder("Data Patterns"),
  input: makePlaceholder("Input Patterns"),
};
