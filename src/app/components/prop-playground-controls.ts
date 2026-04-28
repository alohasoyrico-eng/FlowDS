/**
 * FLOW Docs — Prop Playground Controls
 * Parses PropEntry.type strings into control descriptors for auto-generating UI knobs.
 */

export type ControlDescriptor =
  | { kind: "enum"; options: string[] }
  | { kind: "boolean" }
  | { kind: "string" }
  | { kind: "number" }
  | { kind: "reactnode" }
  | { kind: "fixture" }
  | { kind: "callback" }
  | { kind: "unknown" };

/**
 * Infer a control type from a PropEntry type string.
 * Examples:
 *   '"sm" | "md" | "lg"' → enum ["sm", "md", "lg"]
 *   'boolean' → boolean
 *   'string' → string
 *   'number' → number
 *   'ReactNode' → reactnode
 */
export function inferControl(typeStr: string): ControlDescriptor {
  const t = typeStr.trim();

  // Array / object props — fixture data, no control
  if (t.includes("[]") || t.includes("Array<") || t.startsWith("{")) return { kind: "fixture" };

  // Callback props — auto-wired as no-op
  if (t.includes("=>") || t === "Function") return { kind: "callback" };

  // Boolean
  if (t === "boolean") return { kind: "boolean" };

  // Number
  if (t === "number") return { kind: "number" };

  // ReactNode
  if (t.includes("ReactNode")) return { kind: "reactnode" };

  // String union (enum): look for quoted values separated by |
  const enumMatch = t.match(/^["']([^"']+)["']\s*(\|\s*["']([^"']+)["'])+$/);
  if (enumMatch || t.includes('" | "') || t.includes("' | '")) {
    const parts = t.split("|").map((p) => p.trim().replace(/^["']|["']$/g, ""));
    if (parts.length >= 2 && parts.every((p) => p.length > 0 && !p.includes(" "))) {
      return { kind: "enum", options: parts };
    }
  }

  // Plain string
  if (t === "string") return { kind: "string" };

  // Fallback
  return { kind: "unknown" };
}
