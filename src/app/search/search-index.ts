/**
 * FLOW Docs — Search Index
 * Aggregates all searchable content: foundations, primitives, components, patterns.
 */

export interface SearchEntry {
  title: string;
  category: "Foundation" | "Primitive" | "Component" | "Pattern";
  domain?: string;
  path: string;
  description: string;
  keywords: string[];
}

// ── Static foundation metadata (avoids importing heavy JSX content) ──
const FOUNDATIONS: { id: string; title: string; subtitle: string }[] = [
  { id: "energy", title: "Energy", subtitle: "Color & Semantic Roles" },
  { id: "voice", title: "Voice", subtitle: "Typography System" },
  { id: "frame", title: "Frame", subtitle: "Layout, Density & Rhythm" },
  { id: "depth", title: "Depth", subtitle: "Surfaces & Elevation" },
  { id: "momentum", title: "Momentum", subtitle: "Motion System" },
  { id: "state", title: "State", subtitle: "Interaction States & Precedence" },
  { id: "tone", title: "Tone", subtitle: "Shape Language" },
  { id: "growth", title: "Growth", subtitle: "Responsive & Adaptive" },
  { id: "symbol", title: "Symbol", subtitle: "Logo & Brand Mark" },
  { id: "iconography", title: "Iconography", subtitle: "Icon System" },
];

// ── Static primitive metadata ──
const PRIMITIVES: { name: string; desc: string }[] = [
  { name: "Surface", desc: "Container with elevation, border, padding, and radius" },
  { name: "Stack", desc: "Vertical layout with consistent gap spacing" },
  { name: "Inline", desc: "Horizontal layout with wrapping and gap" },
  { name: "Grid", desc: "CSS Grid abstraction with responsive columns" },
  { name: "Text", desc: "Typography primitive with semantic roles" },
  { name: "Divider", desc: "Horizontal or vertical separator line" },
  { name: "Spacer", desc: "Deliberate whitespace for layout control" },
  { name: "FlowIcon", desc: "Icon rendering from the icon registry" },
  { name: "FlowFlag", desc: "Country flag sprite rendering" },
  { name: "ActionSurface", desc: "Clickable surface with press/hover states" },
  { name: "ThemeToggle", desc: "Light/dark theme switcher" },
  { name: "LayoutGrid", desc: "12-column responsive layout grid" },
  { name: "InputSurface", desc: "Shared primitive for input-family components" },
  { name: "Accordion", desc: "Collapsible content sections" },
  { name: "Code", desc: "Monospace code display" },
];

let _cachedIndex: SearchEntry[] | null = null;

export function buildSearchIndex(
  componentRegistry?: Record<
    string,
    {
      domain: string;
      spec: { name: string; purpose: string; variants?: string[]; states?: string[] };
    }
  >,
  patternRegistry?: Record<
    string,
    {
      category: string;
      spec: { name: string; purpose: string; composesL3: string[]; variants?: string[] };
    }
  >,
): SearchEntry[] {
  if (_cachedIndex) return _cachedIndex;

  const entries: SearchEntry[] = [];

  // Foundations
  for (const f of FOUNDATIONS) {
    entries.push({
      title: f.title,
      category: "Foundation",
      path: `/foundations/${f.id}`,
      description: f.subtitle,
      keywords: [f.id, "foundation", "L1"],
    });
  }

  // Primitives
  for (const p of PRIMITIVES) {
    entries.push({
      title: p.name,
      category: "Primitive",
      path: "/primitives",
      description: p.desc,
      keywords: ["primitive", "L2", p.name.toLowerCase()],
    });
  }

  // Components (L3)
  if (componentRegistry) {
    for (const [key, entry] of Object.entries(componentRegistry)) {
      entries.push({
        title: entry.spec.name,
        category: "Component",
        domain: entry.domain,
        path: `/components/${key}`,
        description: entry.spec.purpose,
        keywords: [
          entry.domain,
          "L3",
          ...(entry.spec.variants ?? []),
          ...(entry.spec.states ?? []),
        ],
      });
    }
  }

  // Patterns (L4)
  if (patternRegistry) {
    for (const [key, entry] of Object.entries(patternRegistry)) {
      entries.push({
        title: entry.spec.name,
        category: "Pattern",
        domain: entry.category,
        path: `/patterns/${key}`,
        description: entry.spec.purpose,
        keywords: [entry.category, "L4", ...entry.spec.composesL3, ...(entry.spec.variants ?? [])],
      });
    }
  }

  _cachedIndex = entries;
  return entries;
}
