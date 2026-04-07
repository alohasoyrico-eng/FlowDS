import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { FlowTooltip } from "../app/components/overlays";
import { FlowButton } from "../app/components/controls";

const meta = {
  title: "Overlays/FlowTooltip",
  component: FlowTooltip,
  argTypes: {
    content: { control: "text" },
    position: { control: "select", options: ["top", "bottom", "left", "right"] },
    delay: { control: "number" },
    disabled: { control: "boolean" },
    size: { control: "select", options: ["sm", "md", "lg", "xl"] },
  },
} satisfies Meta<typeof FlowTooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: "This is a tooltip",
    children: <FlowButton variant="medium">Hover me</FlowButton>,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByText("Hover me");
    await expect(trigger).toBeInTheDocument();
    await userEvent.hover(trigger);
    const tooltip = await canvas.findByRole("tooltip", {}, { timeout: 3000 });
    await expect(tooltip).toBeInTheDocument();
    await expect(tooltip).toHaveTextContent("This is a tooltip");
    await userEvent.unhover(trigger);
  },
};

export const Positions: Story = {
  args: {
    content: "Tooltip text",
    children: <FlowButton variant="medium">Hover</FlowButton>,
  },
  render: (args) => (
    <div style={{ display: "flex", gap: "var(--sys-frame-gap-component)", padding: "80px 40px", justifyContent: "center" }}>
      {(["top", "bottom", "left", "right"] as const).map((position) => (
        <FlowTooltip key={position} {...args} position={position} content={`Tooltip on ${position}`}>
          <FlowButton variant="medium">{position}</FlowButton>
        </FlowTooltip>
      ))}
    </div>
  ),
};

export const LongDelay: Story = {
  args: {
    content: "Appeared after 1 second",
    delay: 1000,
    children: <FlowButton variant="medium">Hover (1s delay)</FlowButton>,
  },
};

export const Disabled: Story = {
  args: {
    content: "You will not see this",
    disabled: true,
    children: <FlowButton variant="medium">Hover (disabled tooltip)</FlowButton>,
  },
};

export const AllSizes: Story = {
  args: {
    content: "Tooltip",
    children: <FlowButton variant="medium">Hover</FlowButton>,
  },
  render: (args) => (
    <div style={{ display: "flex", gap: "var(--sys-frame-gap-component)", padding: "60px 40px" }}>
      {(["sm", "md", "lg", "xl"] as const).map((size) => (
        <FlowTooltip key={size} {...args} size={size} content={`Size: ${size}`}>
          <FlowButton variant="medium">{size}</FlowButton>
        </FlowTooltip>
      ))}
    </div>
  ),
};

export const RichContent: Story = {
  args: {
    content: (
      <span>
        <strong>Bold text</strong> with <em>emphasis</em>
      </span>
    ),
    children: <FlowButton variant="medium">Rich tooltip</FlowButton>,
  },
};
