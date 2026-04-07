import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlowSnackbarProvider, useSnackbar } from "../app/components/patterns";
import { FlowButton } from "../app/components/controls";

/** Wrapper so stories are always inside the provider */
function SnackbarDemo({
  variant = "info",
  message = "This is a notification",
  withAction = false,
}: {
  variant?: "info" | "success" | "warning" | "error";
  message?: string;
  withAction?: boolean;
}) {
  const { show } = useSnackbar();
  return (
    <div style={{ display: "flex", gap: "var(--sys-frame-gap-component)", flexWrap: "wrap" }}>
      <FlowButton
        variant="high"
        size="sm"
        onClick={() =>
          show({
            message,
            variant,
            action: withAction ? { label: "Undo", onClick: () => alert("Undo clicked") } : undefined,
          })
        }
      >
        Show {variant}
      </FlowButton>
    </div>
  );
}

function AllVariantsDemo() {
  const { show } = useSnackbar();
  return (
    <div style={{ display: "flex", gap: "var(--sys-frame-gap-component)", flexWrap: "wrap" }}>
      {(["info", "success", "warning", "error"] as const).map((v) => (
        <FlowButton
          key={v}
          variant="medium"
          size="sm"
          onClick={() => show({ message: `This is a ${v} snackbar`, variant: v })}
        >
          {v}
        </FlowButton>
      ))}
    </div>
  );
}

const meta = {
  title: "Patterns/FlowSnackbar",
  component: FlowSnackbarProvider,
  decorators: [
    (Story) => (
      <FlowSnackbarProvider>
        <Story />
      </FlowSnackbarProvider>
    ),
  ],
} satisfies Meta<typeof FlowSnackbarProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {
  args: { children: null },
  render: () => <SnackbarDemo variant="info" message="Your changes have been saved." />,
};

export const Success: Story = {
  args: { children: null },
  render: () => <SnackbarDemo variant="success" message="File uploaded successfully!" />,
};

export const Warning: Story = {
  args: { children: null },
  render: () => <SnackbarDemo variant="warning" message="Storage almost full. Consider freeing up space." />,
};

export const Error: Story = {
  args: { children: null },
  render: () => <SnackbarDemo variant="error" message="Failed to save. Please try again." />,
};

export const WithAction: Story = {
  args: { children: null },
  render: () => (
    <SnackbarDemo variant="info" message="Item deleted" withAction />
  ),
};

export const AllVariants: Story = {
  args: { children: null },
  render: () => <AllVariantsDemo />,
};
