/**
 * FLOW Design System — Extended Component Demos (Phases 2–11)
 *
 * Default export: ExtendedDemos — renders extended interactive demos
 * that complement the core demos in demos.tsx.
 *
 * NOTE: This file was recovered as a stub after accidental deletion.
 *       The original contained ~76 KB of rich interactive demos covering
 *       phases 2–11 of L3 components.
 *       This placeholder renders minimal UI so the app compiles.
 */

import { Stack, Surface, Text } from "../../lib";

export default function ExtendedDemos() {
  return (
    <Surface style={{ padding: "var(--sys-frame-padding-section)" }}>
      <Stack gap={3}>
        <Text role="heading-l">Extended Component Demos</Text>
        <Text style={{ opacity: 0.6 }}>
          Extended demos for phases 2–11 are being restored. The core demos above remain fully
          functional.
        </Text>
      </Stack>
    </Surface>
  );
}
