/**
 * FLOW - Overlays Domain Extended Demos
 * Demo functions for dialog, sheet, menu, popover components
 */
import { useState } from "react";

import {
  FlowBottomSheet,
  FlowButton,
  FlowContextMenu,
  FlowDialog,
  FlowMenu,
  FlowPopover,
  Stack,
  Text,
} from "@flow/design-system";
import { DemoGroup, DemoSection } from "../../../components/demo-helpers";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowDialog Demos
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function FlowDialogOverview() {
  const [open, setOpen] = useState(false);

  return (
    <Stack gap={6}>
      <DemoSection
        title="Basic Usage"
        description="Modal dialog with backdrop overlay. Traps focus inside dialog while open."
      >
        <DemoGroup>
          <FlowButton onClick={() => setOpen(true)}>Open Dialog</FlowButton>
          <FlowDialog open={open} onClose={() => setOpen(false)} title="Dialog Title">
            <Text>This is dialog content. Press Escape or click backdrop to close.</Text>
          </FlowDialog>
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

export function FlowDialogVariants() {
  return (
    <Stack gap={4}>
      <DemoSection title="Sizes" description="Dialog supports sm, md, lg, xl sizes.">
        <DemoGroup>
          <Text>Click buttons in Overview to see dialog sizes.</Text>
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowBottomSheet Demos
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function FlowBottomSheetOverview() {
  const [open, setOpen] = useState(false);

  return (
    <Stack gap={6}>
      <DemoSection
        title="Basic Usage"
        description="Mobile bottom sheet that slides up from bottom. Swipe down or tap backdrop to close."
      >
        <DemoGroup>
          <FlowButton onClick={() => setOpen(true)}>Open Bottom Sheet</FlowButton>
          <FlowBottomSheet open={open} onClose={() => setOpen(false)} title="Sheet Title">
            <Text>This is bottom sheet content. Swipe down to close.</Text>
          </FlowBottomSheet>
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

export function FlowBottomSheetVariants() {
  return (
    <Stack gap={4}>
      <DemoSection title="Heights" description="Sheet supports auto, half, full heights.">
        <DemoGroup>
          <Text>Click buttons in Overview to see sheet heights.</Text>
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowContextMenu Demos
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function FlowContextMenuOverview() {
  return (
    <Stack gap={6}>
      <DemoSection
        title="Basic Usage"
        description="Right-click menu triggered by context menu event."
      >
        <DemoGroup>
          <FlowContextMenu
            items={[
              { key: "cut", label: "Cut", icon: "scissors" },
              { key: "copy", label: "Copy", icon: "copy" },
              { key: "paste", label: "Paste", icon: "clipboard" },
            ]}
            onSelect={(key) => console.log(key)}
          >
            <div
              style={{
                padding: "var(--ref-frame-space-6)",
                border: "1px dashed var(--ref-frame-border-subtle)",
                borderRadius: "var(--ref-frame-radius-2)",
              }}
            >
              <Text>Right-click this area</Text>
            </div>
          </FlowContextMenu>
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

export function FlowContextMenuVariants() {
  return (
    <Stack gap={4}>
      <DemoSection title="With Sections" description="Context menu supports dividers and sections.">
        <DemoGroup>
          <Text>Right-click in Overview to see menu.</Text>
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowMenu Demos
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function FlowMenuOverview() {
  return (
    <Stack gap={6}>
      <DemoSection title="Basic Usage" description="Click-triggered dropdown menu.">
        <DemoGroup>
          <FlowMenu
            trigger={<FlowButton>Open Menu</FlowButton>}
            items={[
              { id: "profile", label: "Profile", icon: "user" },
              { id: "settings", label: "Settings", icon: "settings" },
              { id: "logout", label: "Logout", icon: "log-out" },
            ]}
            onSelect={(key) => console.log(key)}
          />
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

export function FlowMenuVariants() {
  return (
    <Stack gap={4}>
      <DemoSection
        title="Positions"
        description="Menu supports top, bottom, left, right positions."
      >
        <DemoGroup>
          <Text>Click buttons in Overview to see menu positions.</Text>
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FlowPopover Demos
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function FlowPopoverOverview() {
  return (
    <Stack gap={6}>
      <DemoSection title="Basic Usage" description="Click-triggered popover with custom content.">
        <DemoGroup>
          <FlowPopover trigger={<FlowButton>Open Popover</FlowButton>}>
            <Stack gap={2}>
              <Text variant="h3">Popover Title</Text>
              <Text>This is popover content with any ReactNode.</Text>
            </Stack>
          </FlowPopover>
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

export function FlowPopoverVariants() {
  return (
    <Stack gap={4}>
      <DemoSection
        title="Positions"
        description="Popover supports top, bottom, left, right positions."
      >
        <DemoGroup>
          <Text>Click buttons in Overview to see popover positions.</Text>
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}
