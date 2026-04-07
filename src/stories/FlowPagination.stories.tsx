import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlowPagination } from "../app/components/navigation";

const meta = {
  title: "Navigation/FlowPagination",
  component: FlowPagination,
  argTypes: {
    page: { control: "number" },
    totalPages: { control: "number" },
    siblingCount: { control: "number" },
    showEdges: { control: "boolean" },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof FlowPagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    page: 5,
    totalPages: 10,
    showEdges: true,
  },
};

export const FirstPage: Story = {
  args: {
    page: 1,
    totalPages: 10,
    showEdges: true,
  },
};

export const LastPage: Story = {
  args: {
    page: 10,
    totalPages: 10,
    showEdges: true,
  },
};

export const FewPages: Story = {
  args: {
    page: 2,
    totalPages: 3,
  },
};
