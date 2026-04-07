import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlowTreeView } from "../app/components/display";
import type { TreeNode } from "../app/components/display";

const fileSystemNodes: TreeNode[] = [
  {
    id: "src",
    label: "src",
    children: [
      {
        id: "src/components",
        label: "components",
        children: [
          { id: "src/components/Button.tsx", label: "Button.tsx" },
          { id: "src/components/Card.tsx", label: "Card.tsx" },
          { id: "src/components/Input.tsx", label: "Input.tsx" },
        ],
      },
      {
        id: "src/hooks",
        label: "hooks",
        children: [
          { id: "src/hooks/useAuth.ts", label: "useAuth.ts" },
          { id: "src/hooks/useTheme.ts", label: "useTheme.ts" },
        ],
      },
      { id: "src/index.ts", label: "index.ts" },
    ],
  },
  {
    id: "public",
    label: "public",
    children: [
      { id: "public/favicon.ico", label: "favicon.ico" },
      { id: "public/index.html", label: "index.html" },
    ],
  },
  { id: "package.json", label: "package.json" },
];

const meta = {
  title: "Display/FlowTreeView",
  component: FlowTreeView,
  argTypes: {
    expandAll: { control: "boolean" },
    size: { control: "select", options: ["sm", "md", "lg", "xl"] },
    multiSelect: { control: "boolean" },
  },
} satisfies Meta<typeof FlowTreeView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    nodes: fileSystemNodes,
    "aria-label": "File system",
  },
};

export const ExpandAll: Story = {
  args: {
    nodes: fileSystemNodes,
    expandAll: true,
    "aria-label": "Expanded file system",
  },
};

export const WithIcons: Story = {
  args: {
    nodes: [
      {
        id: "src",
        label: "src",
        icon: "folder",
        children: [
          {
            id: "src/components",
            label: "components",
            icon: "folder",
            children: [
              { id: "src/components/Button.tsx", label: "Button.tsx", icon: "file" },
              { id: "src/components/Card.tsx", label: "Card.tsx", icon: "file" },
            ],
          },
          { id: "src/index.ts", label: "index.ts", icon: "file" },
        ],
      },
      {
        id: "docs",
        label: "docs",
        icon: "folder",
        children: [
          { id: "docs/README.md", label: "README.md", icon: "file" },
        ],
      },
    ],
    expandAll: true,
    "aria-label": "File tree with icons",
  },
};

export const AllSizes: Story = {
  args: {
    nodes: fileSystemNodes,
    "aria-label": "Size comparison",
  },
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "var(--sys-frame-gap-section)" }}>
      {(["sm", "md", "lg"] as const).map((s) => (
        <div key={s}>
          <p style={{ marginBottom: "var(--ref-frame-space-2)", fontWeight: 600 }}>{s}</p>
          <FlowTreeView
            nodes={fileSystemNodes}
            size={s}
            expandAll
            aria-label={`Tree size ${s}`}
          />
        </div>
      ))}
    </div>
  ),
};
