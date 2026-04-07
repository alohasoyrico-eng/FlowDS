import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlowStepper } from "../app/components/navigation";

const meta = {
  title: "Navigation/FlowStepper",
  component: FlowStepper,
  argTypes: {
    activeStep: { control: "number" },
    orientation: { control: "select", options: ["horizontal", "vertical"] },
    size: { control: "select", options: ["sm", "md", "lg", "xl"] },
    clickable: { control: "boolean" },
  },
} satisfies Meta<typeof FlowStepper>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultSteps = [
  { key: "account", label: "Account", description: "Create your account" },
  { key: "profile", label: "Profile", description: "Set up your profile" },
  { key: "preferences", label: "Preferences", description: "Configure settings" },
  { key: "review", label: "Review", description: "Confirm your details" },
];

export const Default: Story = {
  args: {
    steps: defaultSteps,
    activeStep: 1,
  },
};

export const WithError: Story = {
  args: {
    steps: [
      { key: "upload", label: "Upload", description: "Upload your files" },
      { key: "validate", label: "Validate", description: "Validation failed", error: true },
      { key: "process", label: "Process", description: "Process data" },
      { key: "done", label: "Done", description: "Complete" },
    ],
    activeStep: 1,
  },
};

export const Completed: Story = {
  args: {
    steps: defaultSteps,
    activeStep: 4,
  },
};

export const Vertical: Story = {
  args: {
    steps: defaultSteps,
    activeStep: 2,
    orientation: "vertical",
  },
};
