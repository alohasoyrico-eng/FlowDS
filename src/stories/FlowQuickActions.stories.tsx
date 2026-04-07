import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlowShortcutGrid } from "../app/components/layout";

const meta = {
  title: "Layout/FlowShortcutGrid",
  component: FlowShortcutGrid,
  argTypes: {
    columns: { control: "number" },
  },
} satisfies Meta<typeof FlowShortcutGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    actions: [
      { icon: "send", label: "Send" },
      { icon: "camera", label: "Camera" },
      { icon: "file", label: "Files" },
      { icon: "map-pin", label: "Location" },
    ],
    columns: 4,
  },
};

export const TwoColumns: Story = {
  args: {
    actions: [
      { icon: "plus", label: "New" },
      { icon: "edit", label: "Edit" },
      { icon: "copy", label: "Copy" },
      { icon: "trash", label: "Delete" },
    ],
    columns: 2,
  },
};
