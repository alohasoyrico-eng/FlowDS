import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  FlowToolbar,
  FlowToolbarDivider,
  FlowToolbarGroup,
  FlowToolbarSpacer,
} from "../app/components/patterns";
import { FlowButton } from "../app/components/controls";
import { FlowIconButton } from "../app/components/controls";

const meta = {
  title: "Patterns/FlowToolbar",
  component: FlowToolbar,
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    bordered: { control: "boolean" },
    "aria-label": { control: "text" },
  },
} satisfies Meta<typeof FlowToolbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    "aria-label": "Editor toolbar",
    children: (
      <>
        <FlowToolbarGroup>
          <FlowButton variant="ghost" size="sm" leadingIcon="bold">B</FlowButton>
          <FlowButton variant="ghost" size="sm" leadingIcon="italic">I</FlowButton>
          <FlowButton variant="ghost" size="sm" leadingIcon="underline">U</FlowButton>
        </FlowToolbarGroup>
        <FlowToolbarDivider />
        <FlowToolbarGroup>
          <FlowIconButton icon="align-left" variant="ghost" size="sm" aria-label="Align left" />
          <FlowIconButton icon="align-center" variant="ghost" size="sm" aria-label="Align center" />
          <FlowIconButton icon="align-right" variant="ghost" size="sm" aria-label="Align right" />
        </FlowToolbarGroup>
      </>
    ),
  },
};

export const WithSlots: Story = {
  args: {
    "aria-label": "Actions toolbar",
    leftActions: (
      <FlowToolbarGroup>
        <FlowButton variant="ghost" size="sm" leadingIcon="plus">New</FlowButton>
        <FlowButton variant="ghost" size="sm" leadingIcon="download">Export</FlowButton>
      </FlowToolbarGroup>
    ),
    rightActions: (
      <FlowToolbarGroup>
        <FlowIconButton icon="settings" variant="ghost" size="sm" aria-label="Settings" />
        <FlowIconButton icon="more-vertical" variant="ghost" size="sm" aria-label="More" />
      </FlowToolbarGroup>
    ),
  },
};

export const WithSpacer: Story = {
  args: {
    "aria-label": "Document toolbar",
    children: (
      <>
        <FlowToolbarGroup>
          <FlowButton variant="ghost" size="sm" leadingIcon="file">File</FlowButton>
          <FlowButton variant="ghost" size="sm" leadingIcon="edit">Edit</FlowButton>
        </FlowToolbarGroup>
        <FlowToolbarSpacer />
        <FlowToolbarGroup>
          <FlowButton variant="high" size="sm" leadingIcon="check">Save</FlowButton>
        </FlowToolbarGroup>
      </>
    ),
  },
};

export const NoBorder: Story = {
  args: {
    "aria-label": "Borderless toolbar",
    bordered: false,
    children: (
      <FlowToolbarGroup>
        <FlowButton variant="ghost" size="sm" leadingIcon="copy">Copy</FlowButton>
        <FlowButton variant="ghost" size="sm" leadingIcon="clipboard">Paste</FlowButton>
        <FlowButton variant="ghost" size="sm" leadingIcon="trash">Delete</FlowButton>
      </FlowToolbarGroup>
    ),
  },
};

export const AllSizes: Story = {
  args: { "aria-label": "Size demo" },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--sys-frame-gap-section)" }}>
      {(["sm", "md", "lg"] as const).map((s) => (
        <FlowToolbar key={s} size={s} aria-label={`${s} toolbar`}>
          <FlowToolbarGroup>
            <FlowButton variant="ghost" size="sm" leadingIcon="bold">B</FlowButton>
            <FlowButton variant="ghost" size="sm" leadingIcon="italic">I</FlowButton>
          </FlowToolbarGroup>
          <FlowToolbarDivider />
          <FlowButton variant="ghost" size="sm">Size: {s}</FlowButton>
        </FlowToolbar>
      ))}
    </div>
  ),
};
