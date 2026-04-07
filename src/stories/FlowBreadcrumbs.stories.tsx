import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlowBreadcrumbs } from "../app/components/navigation";

const meta = {
  title: "Navigation/FlowBreadcrumbs",
  component: FlowBreadcrumbs,
  argTypes: {
    variant: { control: "select", options: ["default", "icon-root"] },
    maxItems: { control: "number" },
  },
} satisfies Meta<typeof FlowBreadcrumbs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      { key: "home", label: "Home", href: "#" },
      { key: "products", label: "Products", href: "#" },
      { key: "shoes", label: "Running Shoes" },
    ],
  },
};

export const WithIcons: Story = {
  args: {
    items: [
      { key: "home", label: "Home", icon: "home", href: "#" },
      { key: "library", label: "Library", icon: "book-open", href: "#" },
      { key: "article", label: "Current Article", icon: "file-text" },
    ],
  },
};

export const Collapsed: Story = {
  args: {
    items: [
      { key: "home", label: "Home", href: "#" },
      { key: "category", label: "Category", href: "#" },
      { key: "subcategory", label: "Subcategory", href: "#" },
      { key: "section", label: "Section", href: "#" },
      { key: "subsection", label: "Subsection", href: "#" },
      { key: "page", label: "Current Page" },
    ],
    maxItems: 3,
  },
};

export const WithSeparator: Story = {
  args: {
    items: [
      { key: "home", label: "Home", href: "#" },
      { key: "docs", label: "Documentation", href: "#" },
      { key: "guide", label: "Getting Started" },
    ],
    separator: "/",
  },
};
