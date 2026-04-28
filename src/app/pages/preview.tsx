import { useParams, useSearchParams } from "react-router";

import { previewRegistry } from "../registry/preview-registry";

export function PreviewPage() {
  const { componentId, variant = "default" } = useParams<{ componentId: string; variant?: string }>();
  const [params] = useSearchParams();
  const density = params.get("density") ?? "default";
  const theme = params.get("theme") ?? "light";

  const entry = previewRegistry[componentId ?? ""];
  const render = entry?.[variant];

  if (!entry) {
    return (
      <div style={{ padding: 24, fontFamily: "monospace", color: "#64748B" }}>
        <p>Unknown component: <strong>{componentId}</strong></p>
        <p>Available: {Object.keys(previewRegistry).join(", ")}</p>
      </div>
    );
  }

  if (!render) {
    return (
      <div style={{ padding: 24, fontFamily: "monospace", color: "#64748B" }}>
        <p>Unknown variant: <strong>{variant}</strong> for <strong>{componentId}</strong></p>
        <p>Available variants: {Object.keys(entry).join(", ")}</p>
      </div>
    );
  }

  return (
    <div
      data-density={density}
      data-theme={theme}
      style={{ padding: 24, minHeight: "100dvh" }}
    >
      {render()}
    </div>
  );
}
