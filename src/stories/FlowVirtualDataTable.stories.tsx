import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlowVirtualDataTable } from "../app/components/patterns";

type Row = { id: number; name: string; email: string; role: string; status: string };

const sampleData: Row[] = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: ["Admin", "Editor", "Viewer"][i % 3],
  status: ["Active", "Inactive"][i % 2],
}));

const meta = {
  title: "Patterns/FlowVirtualDataTable",
  component: FlowVirtualDataTable<Row>,
  argTypes: {
    height: { control: "number" },
    striped: { control: "boolean" },
    searchable: { control: "boolean" },
    selectable: { control: "boolean" },
    loading: { control: "boolean" },
  },
} satisfies Meta<typeof FlowVirtualDataTable<Row>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    columns: [
      { key: "id", header: "ID", width: "80px", sortable: true },
      { key: "name", header: "Name", sortable: true },
      { key: "email", header: "Email" },
      { key: "role", header: "Role", sortable: true },
      { key: "status", header: "Status" },
    ],
    data: sampleData,
    rowKey: (row: Row) => String(row.id),
    height: 400,
    searchable: true,
  },
};

export const Selectable: Story = {
  args: {
    columns: [
      { key: "id", header: "ID", width: "80px" },
      { key: "name", header: "Name", sortable: true },
      { key: "email", header: "Email" },
      { key: "role", header: "Role" },
    ],
    data: sampleData.slice(0, 20),
    rowKey: (row: Row) => String(row.id),
    height: 400,
    selectable: true,
    striped: true,
  },
};
