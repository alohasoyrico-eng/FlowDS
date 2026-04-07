import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlowAvatar, FlowList, FlowListItem } from "../app/components/display";
import { FlowIcon } from "../app/primitives";

const meta = {
  title: "Display/FlowList",
  component: FlowList,
  argTypes: {
    dividers: { control: "boolean" },
  },
} satisfies Meta<typeof FlowList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: null,
    "aria-label": "Default list",
  },
  render: (args) => (
    <FlowList {...args}>
      <FlowListItem primary="Inbox" secondary="3 new messages" />
      <FlowListItem primary="Sent" secondary="Last sent 2 hours ago" />
      <FlowListItem primary="Drafts" secondary="1 draft" />
    </FlowList>
  ),
};

export const WithDividers: Story = {
  args: {
    children: null,
    dividers: true,
    "aria-label": "List with dividers",
  },
  render: (args) => (
    <FlowList {...args}>
      <FlowListItem primary="First item" secondary="Description for first" />
      <FlowListItem primary="Second item" secondary="Description for second" />
      <FlowListItem primary="Third item" secondary="Description for third" />
    </FlowList>
  ),
};

export const Interactive: Story = {
  args: {
    children: null,
    "aria-label": "Interactive list",
  },
  render: (args) => (
    <FlowList {...args}>
      <FlowListItem primary="Click me" secondary="Interactive item" interactive onClick={() => {}} />
      <FlowListItem primary="Me too" secondary="Also interactive" interactive onClick={() => {}} />
      <FlowListItem primary="And me" secondary="Another interactive" interactive onClick={() => {}} />
    </FlowList>
  ),
};

export const WithLeadingTrailing: Story = {
  args: {
    children: null,
    "aria-label": "List with leading and trailing",
  },
  render: (args) => (
    <FlowList {...args}>
      <FlowListItem
        primary="Alice Johnson"
        secondary="Product Designer"
        leading={<FlowAvatar name="Alice Johnson" size="sm" />}
        trailing="Online"
      />
      <FlowListItem
        primary="Settings"
        secondary="Manage preferences"
        leading={<FlowIcon name="settings" size="md" />}
        trailing={<FlowIcon name="chevron-right" size="sm" />}
      />
      <FlowListItem
        primary="Bob Smith"
        secondary="Engineering Lead"
        leading={<FlowAvatar name="Bob Smith" size="sm" />}
        trailing="Away"
      />
    </FlowList>
  ),
};

export const Selected: Story = {
  args: {
    children: null,
    "aria-label": "List with selected item",
  },
  render: (args) => (
    <FlowList {...args}>
      <FlowListItem primary="Option A" interactive onClick={() => {}} />
      <FlowListItem primary="Option B" interactive selected onClick={() => {}} />
      <FlowListItem primary="Option C" interactive onClick={() => {}} />
    </FlowList>
  ),
};

export const Disabled: Story = {
  args: {
    children: null,
    "aria-label": "List with disabled item",
  },
  render: (args) => (
    <FlowList {...args}>
      <FlowListItem primary="Enabled item" interactive onClick={() => {}} />
      <FlowListItem primary="Disabled item" secondary="Cannot interact" disabled interactive />
      <FlowListItem primary="Another enabled" interactive onClick={() => {}} />
    </FlowList>
  ),
};
