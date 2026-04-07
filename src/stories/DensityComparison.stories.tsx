import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlowButton } from "../app/components/controls";
import { FlowTextInput } from "../app/components/inputs";
import { FlowCard, FlowTag } from "../app/components/display";
import { FlowCheckbox, FlowSwitch } from "../app/components/selection";
import { Inline, Stack, Text } from "../app/primitives";

const DensityComparison = () => (
  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "var(--ref-frame-space-6)" }}>
    {(["compact", "default", "comfortable"] as const).map((density) => (
      <div
        key={density}
        data-density={density !== "default" ? density : undefined}
        style={{
          border: "1px solid var(--sys-energy-border-default)",
          borderRadius: "var(--ref-frame-radius-4)",
          padding: "var(--sys-frame-padding-surface)",
          background: "var(--sys-energy-surface-primary)",
        }}
      >
        <Stack gap="subsection">
          <Text role="overline" color="accent">{density}</Text>

          <Stack gap="component">
            <Text role="label-m">Buttons</Text>
            <Inline gap={2} wrap>
              <FlowButton variant="high" size="sm">Small</FlowButton>
              <FlowButton variant="medium" size="md">Medium</FlowButton>
              <FlowButton variant="outline" size="lg">Large</FlowButton>
            </Inline>
          </Stack>

          <Stack gap="component">
            <Text role="label-m">Input</Text>
            <FlowTextInput label="Email" placeholder="you@example.com" size="md" />
          </Stack>

          <Stack gap="component">
            <Text role="label-m">Selection</Text>
            <Inline gap={3} wrap>
              <FlowSwitch label="Toggle" />
              <FlowCheckbox label="Check" />
            </Inline>
          </Stack>

          <Stack gap="component">
            <Text role="label-m">Tags</Text>
            <Inline gap={1} wrap>
              <FlowTag status="info">info</FlowTag>
              <FlowTag status="success">success</FlowTag>
              <FlowTag status="error">error</FlowTag>
            </Inline>
          </Stack>

          <FlowCard elevation={1} padding="md">
            <Stack gap={1}>
              <Text role="label-m">Card</Text>
              <Text role="paragraph-s" color="secondary">Padding and font scale with density.</Text>
            </Stack>
          </FlowCard>
        </Stack>
      </div>
    ))}
  </div>
);

const meta = {
  title: "Foundation/Density Comparison",
  component: DensityComparison,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof DensityComparison>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SideBySide: Story = {};
