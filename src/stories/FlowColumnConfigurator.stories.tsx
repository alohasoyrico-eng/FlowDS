import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlowColumnConfigurator } from "../app/components/patterns";

const meta = {
  title: "Patterns/FlowColumnConfigurator",
  component: FlowColumnConfigurator,
  argTypes: {},
} satisfies Meta<typeof FlowColumnConfigurator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    columns: [
      { key: "name", label: "Name", visible: true },
      { key: "email", label: "Email", visible: true },
      { key: "role", label: "Role", visible: true },
      { key: "status", label: "Status", visible: false },
      { key: "created", label: "Created At", visible: false },
    ],
    onColumnsChange: () => {},
  },
};
