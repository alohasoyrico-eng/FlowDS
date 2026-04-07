import type { Preview } from "@storybook/react-vite";

// Import Flow design system styles (tokens, components, primitives, responsive)
import "../src/styles/index.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "error",
    },
    backgrounds: {
      default: "surface",
      values: [
        { name: "surface", value: "var(--sys-energy-surface-primary)" },
        { name: "secondary", value: "var(--sys-energy-surface-secondary)" },
        { name: "dark", value: "#0F172A" },
      ],
    },
  },
  globalTypes: {
    density: {
      description: "Density mode",
      defaultValue: "default",
      toolbar: {
        title: "Density",
        icon: "component",
        items: [
          { value: "compact", title: "Compact" },
          { value: "default", title: "Default" },
          { value: "comfortable", title: "Comfortable" },
        ],
        dynamicTitle: true,
      },
    },
    theme: {
      description: "Color theme",
      defaultValue: "light",
      toolbar: {
        title: "Theme",
        icon: "paintbrush",
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const density = context.globals.density || "default";
      const theme = context.globals.theme || "light";
      return (
        <div
          data-theme={theme}
          data-density={density !== "default" ? density : undefined}
          style={{
            padding: "var(--sys-frame-padding-surface)",
            background: "var(--sys-energy-surface-primary)",
            color: "var(--sys-energy-text-primary)",
            minHeight: "100%",
          }}
        >
          <Story />
        </div>
      );
    },
  ],
};

export default preview;
