import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlowFileUpload } from "../app/components/patterns";

const meta = {
  title: "Patterns/FlowFileUpload",
  component: FlowFileUpload,
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    label: { control: "text" },
    description: { control: "text" },
    accept: { control: "text" },
    multiple: { control: "boolean" },
    maxSizeMB: { control: "number" },
    maxFiles: { control: "number" },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof FlowFileUpload>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Upload Files",
    description: "Supported formats: PNG, JPG, PDF",
  },
};

export const SingleFile: Story = {
  args: {
    label: "Upload Avatar",
    description: "Upload a profile picture",
    multiple: false,
    accept: "image/*",
    maxSizeMB: 5,
  },
};

export const Restricted: Story = {
  args: {
    label: "Upload Documents",
    accept: ".pdf,.doc,.docx",
    maxSizeMB: 2,
    maxFiles: 3,
    description: "PDF or Word documents only",
  },
};

export const Disabled: Story = {
  args: {
    label: "Upload Files",
    disabled: true,
  },
};

export const AllSizes: Story = {
  args: { label: "Size demo" },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--sys-frame-gap-section)" }}>
      <FlowFileUpload size="sm" label="Small upload" description="Compact zone" />
      <FlowFileUpload size="md" label="Medium upload" description="Default zone" />
      <FlowFileUpload size="lg" label="Large upload" description="Expanded zone" />
    </div>
  ),
};
