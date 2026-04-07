import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlowCard } from "../app/components/display";
import { Stack, Text } from "../app/primitives";

const meta = {
  title: "Display/FlowCard",
  component: FlowCard,
  argTypes: {
    elevation: { control: "select", options: [0, 1, 2, 3, 4] },
    padding: { control: "select", options: ["none", "sm", "md", "lg", "xl", "container"] },
    interactive: { control: "boolean" },
  },
} satisfies Meta<typeof FlowCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { elevation: 1, padding: "md", children: "Card content" },
  render: (args) => (
    <FlowCard {...args}>
      <Stack gap={2}>
        <Text role="label-m">Card Title</Text>
        <Text role="paragraph-s" color="secondary">
          This is a basic card with elevation and padding controls.
        </Text>
      </Stack>
    </FlowCard>
  ),
};

export const ElevationLevels: Story = {
  args: { children: "Elevation Demo" },
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "var(--sys-frame-gap-component)" }}>
      {[0, 1, 2, 3, 4].map((level) => (
        <FlowCard key={level} elevation={level as 0 | 1 | 2 | 3 | 4} padding="md">
          <Stack gap={1}>
            <Text role="label-m">Level {level}</Text>
            <Text role="caption" color="tertiary">elevation={level}</Text>
          </Stack>
        </FlowCard>
      ))}
    </div>
  ),
};
