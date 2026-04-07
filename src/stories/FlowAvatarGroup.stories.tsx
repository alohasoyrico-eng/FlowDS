import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlowAvatarGroup } from "../app/components/display";
import { FlowAvatar } from "../app/components/display";

const meta = {
  title: "Display/FlowAvatarGroup",
  component: FlowAvatarGroup,
  argTypes: {
    max: { control: "number" },
    size: { control: "select", options: ["sm", "md", "lg", "xl"] },
  },
} satisfies Meta<typeof FlowAvatarGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: "md",
    children: [
      <FlowAvatar key="1" initials="AB" />,
      <FlowAvatar key="2" initials="CD" />,
      <FlowAvatar key="3" initials="EF" />,
    ],
  },
};

export const WithOverflow: Story = {
  args: {
    max: 3,
    size: "md",
    children: [
      <FlowAvatar key="1" initials="AB" />,
      <FlowAvatar key="2" initials="CD" />,
      <FlowAvatar key="3" initials="EF" />,
      <FlowAvatar key="4" initials="GH" />,
      <FlowAvatar key="5" initials="IJ" />,
    ],
  },
};
