/**
 * FLOW - Navigation Domain Registry
 * Component metadata, demos, and developer guides for navigation components.
 */
import type { ComponentEntry } from "../types";
import {
  FlowBottomNavOverview,
  FlowBottomNavVariants,
  FlowBreadcrumbsOverview,
  FlowBreadcrumbsVariants,
  FlowPaginationOverview,
  FlowPaginationVariants,
  FlowSidebarOverview,
  FlowSidebarVariants,
  FlowStepperOverview,
  FlowStepperVariants,
  FlowTabsOverview,
  FlowTabsVariants,
} from "./demos";

export const NAVIGATION_REGISTRY: Record<string, ComponentEntry> = {
  // ─── FlowBreadcrumbs ───
  "navigation/flow-breadcrumbs": {
    domain: "Navigation",
    spec: {
      name: "FlowBreadcrumbs",
      purpose:
        "Navigation trail showing the user's location in a hierarchy. Composes FlowButton (ghost emphasis) for interactive items, native <a> for href items, and <span> for the current page.",
      platform: "desktop",
      anatomy: [
        {
          part: "Nav container",
          description: "Semantic <nav> wrapper — provides landmark for assistive technology",
          tokens: ["comp.breadcrumbs.gap"],
        },
        {
          part: "Interactive item",
          description:
            "FlowButton (ghost) for onClick items, native <a> for href items — both keyboard accessible",
          tokens: [
            "comp.breadcrumbs.text",
            "comp.breadcrumbs.text-hover",
            "comp.breadcrumbs.font",
            "comp.breadcrumbs.font-family",
            "comp.breadcrumbs.item-padding-x",
            "comp.breadcrumbs.item-padding-y",
            "comp.breadcrumbs.item-gap",
            "comp.breadcrumbs.item-radius",
            "comp.breadcrumbs.transition",
            "comp.breadcrumbs.focus-ring-width",
            "comp.breadcrumbs.focus-ring-offset",
          ],
        },
        {
          part: "Current page",
          description: "Non-interactive <span> with aria-current='page' — always the last item",
          tokens: ["comp.breadcrumbs.text-active", "comp.breadcrumbs.font-weight"],
        },
        {
          part: "Separator",
          description: "Chevron glyph between items — decorative, hidden from screen readers",
          tokens: ["comp.breadcrumbs.separator", "comp.breadcrumbs.separator-font"],
        },
      ],
      variants: [
        "Default (chevron separator)",
        "Icon Root (icon-only first item)",
        "Custom separator",
        "Collapsed (maxItems with ellipsis)",
      ],
      states: ["default", "hover", "focus-visible", "collapsed (ellipsis)"],
      accessibility: {
        handled: [
          "Wrapped in <nav> with aria-label='Breadcrumb'",
          "Uses <ol> for ordered trail semantics",
          "Last item gets aria-current='page'",
          "Separators are aria-hidden='true'",
          "Ellipsis button is keyboard-accessible",
        ],
        keyboard: [
          "Tab to navigate between breadcrumb links",
          "Enter to follow link",
          "Enter on ellipsis to expand collapsed items",
        ],
      },
    },
    demos: {
      overview: () => <FlowBreadcrumbsOverview />,
      variants: () => <FlowBreadcrumbsVariants />,
    },
    developer: {
      reactImport: `import { FlowBreadcrumbs } from "@flow/design-system";`,
      reactUsage: `// Basic trail with onClick (SPA navigation)
<FlowBreadcrumbs
  items={[
    { label: "Home", onClick: () => navigate("/") },
    { label: "Products", onClick: () => navigate("/products") },
    { label: "Current Product" },
  ]}
/>

// With href (semantic anchors for SEO)
<FlowBreadcrumbs
  items={[
    { label: "Home", href: "/" },
    { label: "Docs", href: "/docs" },
    { label: "API Reference" },
  ]}
/>

// Icon-root variant (icon-only first item saves space)
<FlowBreadcrumbs
  variant="icon-root"
  items={[
    { label: "Home", onClick: () => navigate("/") },
    { label: "Products", onClick: () => navigate("/products") },
    { label: "Current Product" },
  ]}
/>

// Icon-root with custom icon
<FlowBreadcrumbs
  variant="icon-root"
  items={[
    { label: "Dashboard", icon: "layout-dashboard", onClick: () => {} },
    { label: "Analytics", onClick: () => {} },
    { label: "Reports" },
  ]}
/>

// With icons on multiple items
<FlowBreadcrumbs
  items={[
    { label: "Home", icon: "home", onClick: () => {} },
    { label: "Settings", icon: "settings", onClick: () => {} },
    { label: "Security", icon: "shield", onClick: () => {} },
    { label: "Two-Factor Auth" },
  ]}
/>

// Collapsed with maxItems (prevents horizontal overflow)
<FlowBreadcrumbs
  maxItems={3}
  items={[
    { label: "Home", onClick: () => {} },
    { label: "Products", onClick: () => {} },
    { label: "Electronics", onClick: () => {} },
    { label: "Computers", onClick: () => {} },
    { label: "Laptops", onClick: () => {} },
    { label: "MacBook Pro 16" },
  ]}
/>

// Common patterns

// E-commerce category navigation
<FlowBreadcrumbs
  items={[
    { label: "Home", onClick: () => navigate("/") },
    { label: "Shop", onClick: () => navigate("/shop") },
    { label: "Women", onClick: () => navigate("/shop/women") },
    { label: "Clothing", onClick: () => navigate("/shop/women/clothing") },
    { label: "Dresses" },
  ]}
/>

// Documentation hierarchy (SEO-friendly with href)
<FlowBreadcrumbs
  items={[
    { label: "Docs", href: "/docs" },
    { label: "Components", href: "/docs/components" },
    { label: "Navigation", href: "/docs/components/navigation" },
    { label: "Breadcrumbs" },
  ]}
/>

// Dashboard settings navigation
<FlowBreadcrumbs
  variant="icon-root"
  items={[
    { label: "Dashboard", onClick: () => navigate("/") },
    { label: "Settings", onClick: () => navigate("/settings") },
    { label: "Account" },
  ]}
/>

// File system path
<FlowBreadcrumbs
  maxItems={4}
  items={[
    { label: "Root", icon: "folder", onClick: () => {} },
    { label: "Projects", onClick: () => {} },
    { label: "Design System", onClick: () => {} },
    { label: "Components", onClick: () => {} },
    { label: "Navigation", onClick: () => {} },
    { label: "breadcrumbs.tsx" },
  ]}
/>`,
      flutterImport: `import 'package:flow_ds/navigation.dart';`,
      flutterUsage: `FlowBreadcrumbs(
  items: [
    BreadcrumbItem(label: 'Home', onTap: () => context.go('/')),
    BreadcrumbItem(label: 'Products', onTap: () => context.go('/products')),
    BreadcrumbItem(label: 'Current Product'),
  ],
)

// Icon-root variant (home icon for first item)
FlowBreadcrumbs(
  variant: BreadcrumbVariant.iconRoot,
  items: [
    BreadcrumbItem(label: 'Home', onTap: () => context.go('/')),
    BreadcrumbItem(label: 'Products', onTap: () => context.go('/products')),
    BreadcrumbItem(label: 'Current Product'),
  ],
)

// Collapsed
FlowBreadcrumbs(
  maxItems: 3,
  items: [
    BreadcrumbItem(label: 'Home', onTap: () {}),
    BreadcrumbItem(label: 'Cat', onTap: () {}),
    BreadcrumbItem(label: 'Sub', onTap: () {}),
    BreadcrumbItem(label: 'Current'),
  ],
)`,
      notes:
        "The last item is always rendered as the current page (non-interactive <span> with aria-current='page'). Items with href use native <a> elements; items with onClick use FlowButton ghost. The maxItems prop collapses intermediate items into an expandable '…' button. Density-aware: font, gap, padding, and icon-only-size shift ±1 step in compact/comfortable via comp token overrides.",
      props: [
        {
          name: "items",
          type: "BreadcrumbItem[]",
          description:
            "Array of trail items: { label, onClick?, href?, icon? }. Last item is always current page (non-interactive, aria-current='page'). Minimum 1 item required.",
          required: true,
        },
        {
          name: "variant",
          type: '"default" | "icon-root"',
          default: '"default"',
          description:
            "Display variant. 'default' shows full text labels. 'icon-root' renders the first item as an icon-only button (defaults to 'home' icon, label becomes aria-label) - saves horizontal space.",
        },
        {
          name: "maxItems",
          type: "number",
          description:
            "Maximum items to show before collapsing. When trail length exceeds maxItems, intermediate items collapse into an expandable '…' button. Recommended for hierarchies 5+ levels deep.",
          required: false,
        },
        {
          name: "items[].label",
          type: "string",
          description:
            "Display text for the breadcrumb item. Always required — used as visible text (default variant) or aria-label (icon-root first item). Last item is the current page.",
          required: true,
        },
        {
          name: "items[].onClick",
          type: "() => void",
          description:
            "Click handler — renders item as FlowButton (ghost emphasis). Use for SPA navigation (React Router, Next.js). Only interactive items support onClick. Last item ignores this prop.",
          required: false,
        },
        {
          name: "items[].href",
          type: "string",
          description:
            "Link URL — renders item as native <a> element. Use for SEO-friendly links and server-side routing. Do not combine with onClick on the same item. Last item ignores this prop.",
          required: false,
        },
        {
          name: "items[].icon",
          type: "string",
          description:
            "FlowIcon name rendered before the label. All items support icons. In icon-root variant, the first item defaults to 'home' if omitted — you can override with a custom icon.",
          required: false,
        },
        {
          name: "className",
          type: "string",
          description:
            "Additional CSS class names appended to the <nav> root. Merges with component classes. Use for custom styling or layout adjustments.",
          required: false,
        },
        {
          name: "style",
          type: "CSSProperties",
          description:
            "Inline React styles applied to the <nav> wrapper. Use sparingly — prefer CSS tokens. Useful for dynamic positioning or spacing.",
          required: false,
        },
        {
          name: "id",
          type: "string",
          description:
            "HTML id attribute on the <nav> element. Use for linking with aria-describedby, anchor navigation, or targeting with document.getElementById().",
          required: false,
        },
        {
          name: "data-*",
          type: "string | number | boolean",
          description:
            "Custom data attributes (e.g., data-testid='breadcrumbs-nav'). Common for testing selectors, analytics tracking, or storing metadata.",
          required: false,
        },
        {
          name: "aria-label",
          type: "string",
          default: '"Breadcrumb"',
          description:
            "Accessible label for the <nav> landmark. Default 'Breadcrumb' is appropriate for most cases. Override when multiple breadcrumbs exist on the same page (e.g., 'Primary navigation', 'Content path').",
        },
        {
          name: "role",
          type: "string",
          default: '"navigation"',
          description:
            "ARIA role for the <nav> element. Default 'navigation' is appropriate for breadcrumbs. Do not override unless required for custom accessibility patterns.",
        },
      ],
      guidelines: [
        {
          intent: "do",
          text: "Always make the last item the current page — it renders as a non-interactive <span> with aria-current='page'.",
        },
        {
          intent: "do",
          text: "Use href for SEO-critical links and onClick for SPA navigation — don't mix both on the same item.",
        },
        {
          intent: "do",
          text: "Use maxItems for deep hierarchies (5+ levels) to prevent horizontal overflow.",
        },
        {
          intent: "dont",
          text: "Don't use breadcrumbs on mobile — the pattern is desktop-oriented. Use back navigation instead.",
        },
        {
          intent: "dont",
          text: "Don't make the last item interactive — it represents the current page and should not be clickable.",
        },
        {
          intent: "info",
          text: "The component wraps in <nav> with aria-label='Breadcrumb' and uses <ol> for ordered trail semantics.",
        },
        {
          intent: "do",
          text: "Use variant='icon-root' when the breadcrumb starts with a Home or root-level destination — it saves horizontal space and follows a widely recognized pattern.",
        },
        {
          intent: "info",
          text: "Separators (chevrons) are aria-hidden='true' — screen readers skip them and just announce the link sequence.",
        },
        {
          intent: "info",
          text: "In icon-root variant, the first item's label becomes the button's aria-label. The icon defaults to 'home' but can be overridden via items[0].icon.",
        },
        {
          intent: "info",
          text: "Density-aware: font (13→12/14px), gap (8→4/12px), padding (4→2/8px), and icon-only-size (32→28/36px) shift ±1 step in compact/comfortable density.",
        },
      ],
    },
  },

  // ─── FlowTabs ───
  "navigation/flow-tabs": {
    domain: "Navigation",
    spec: {
      name: "FlowTabs",
      purpose:
        "Horizontal tab navigation for switching between views or sections. Single active tab at a time. Supports icons, controlled state, and responsive overflow behavior.",
      platform: "shared",
      anatomy: [
        {
          part: "Tab list container",
          description: "Horizontal wrapper with role='tablist' for ARIA",
          tokens: ["comp.tabs.container-bg", "comp.tabs.gap"],
        },
        {
          part: "Tab button",
          description: "Interactive button with active indicator (bottom border)",
          tokens: [
            "comp.tabs.text",
            "comp.tabs.text-active",
            "comp.tabs.indicator",
            "comp.tabs.padding",
          ],
        },
        {
          part: "Active indicator",
          description: "Bottom border showing active tab",
          tokens: ["comp.tabs.indicator-height", "comp.tabs.indicator-color"],
        },
      ],
      variants: ["Default (text only)", "With icons"],
      states: ["default", "hover", "active", "focus-visible"],
      accessibility: {
        handled: [
          "role='tablist' on container",
          "role='tab' on each tab button",
          "aria-selected='true' on active tab",
          "Keyboard: Arrow Left/Right to navigate tabs",
        ],
        required: ["Provide unique value for each tab"],
        keyboard: [
          "Arrow Left/Right: Navigate between tabs",
          "Tab: Focus tab list",
          "Enter/Space: Activate focused tab",
        ],
      },
    },
    demos: {
      overview: () => <FlowTabsOverview />,
      variants: () => <FlowTabsVariants />,
    },
    developer: {
      reactImport: `import { FlowTabs } from "@flow/design-system";`,
      reactUsage: `// Basic tabs
const [activeTab, setActiveTab] = useState("overview");

<FlowTabs
  value={activeTab}
  onChange={setActiveTab}
  tabs={[
    { value: "overview", label: "Overview" },
    { value: "features", label: "Features" },
    { value: "pricing", label: "Pricing" },
  ]}
/>

// With icons
<FlowTabs
  value={activeTab}
  onChange={setActiveTab}
  tabs={[
    { value: "home", label: "Home", icon: "home" },
    { value: "search", label: "Search", icon: "search" },
    { value: "settings", label: "Settings", icon: "settings" },
  ]}
/>`,
      flutterImport: `import 'package:flow_ds/navigation.dart';`,
      flutterUsage: `FlowTabs(
  value: activeTab,
  onChanged: (value) => setState(() => activeTab = value),
  tabs: [
    Tab(value: 'overview', label: 'Overview'),
    Tab(value: 'features', label: 'Features'),
  ],
)`,
      notes:
        "FlowTabs provides horizontal tab navigation. Use for switching between related content or views. Tabs automatically handle active state via controlled value prop. Best used with 2-8 tabs. For more tabs, consider using FlowMenu or progressive disclosure patterns.",
      props: [
        { name: "value", type: "string", description: "Current active tab value.", required: true },
        {
          name: "onChange",
          type: "(value: string) => void",
          description: "Callback when tab is clicked.",
          required: true,
        },
        {
          name: "tabs",
          type: "Tab[]",
          description: "Array of tab objects: { value, label, icon? }.",
          required: true,
        },
        {
          name: "className",
          type: "string",
          description: "Additional CSS classes.",
          required: false,
        },
      ],
      guidelines: [
        { intent: "do", text: "Use tabs for switching between related content views." },
        { intent: "do", text: "Keep tab labels concise (1-2 words)." },
        {
          intent: "dont",
          text: "Don't use more than 8 tabs — consider menu or progressive disclosure instead.",
        },
        { intent: "info", text: "Active tab shows bottom border indicator." },
      ],
    },
  },

  // ─── FlowPagination ───
  "navigation/flow-pagination": {
    domain: "Navigation",
    spec: {
      name: "FlowPagination",
      purpose:
        "Page navigation for data tables, search results, and long lists. Shows current page, total pages, previous/next buttons, and page number buttons with ellipsis for large page counts.",
      platform: "desktop",
      anatomy: [
        {
          part: "Pagination container",
          description: "Horizontal wrapper with navigation buttons and page numbers",
          tokens: ["comp.pagination.gap"],
        },
        {
          part: "Previous/Next buttons",
          description: "Navigation arrows for adjacent pages",
          tokens: ["comp.pagination.button-size"],
        },
        {
          part: "Page number buttons",
          description: "Clickable page numbers with active state",
          tokens: ["comp.pagination.number-size", "comp.pagination.active-bg"],
        },
        { part: "Ellipsis", description: "... indicator for collapsed page ranges", tokens: [] },
      ],
      variants: ["Default", "With ellipsis (large page counts)"],
      states: ["default", "hover", "active", "disabled (first/last page)"],
      accessibility: {
        handled: [
          "role='navigation' with aria-label='Pagination'",
          "Previous/Next buttons have aria-label",
          "Current page has aria-current='page'",
        ],
        required: ["Provide descriptive aria-label for navigation"],
        keyboard: ["Tab to focus buttons", "Enter/Space to activate"],
      },
    },
    demos: {
      overview: () => <FlowPaginationOverview />,
      variants: () => <FlowPaginationVariants />,
    },
    developer: {
      reactImport: `import { FlowPagination } from "@flow/design-system";`,
      reactUsage: `const [currentPage, setCurrentPage] = useState(1);

<FlowPagination
  currentPage={currentPage}
  totalPages={10}
  onChange={setCurrentPage}
/>

// With ellipsis (many pages)
<FlowPagination
  currentPage={15}
  totalPages={50}
  onChange={setCurrentPage}
  siblingCount={1}
/>`,
      flutterImport: `import 'package:flow_ds/navigation.dart';`,
      flutterUsage: `FlowPagination(
  currentPage: currentPage,
  totalPages: 10,
  onPageChange: (page) => setState(() => currentPage = page),
)`,
      notes:
        "FlowPagination is desktop-only. Use for tables, search results, and long lists. Ellipsis appears when total pages exceed visible range. siblingCount controls how many page numbers to show on each side of current page.",
      props: [
        {
          name: "currentPage",
          type: "number",
          description: "Current active page (1-indexed).",
          required: true,
        },
        {
          name: "totalPages",
          type: "number",
          description: "Total number of pages.",
          required: true,
        },
        {
          name: "onChange",
          type: "(page: number) => void",
          description: "Callback when page is changed.",
          required: true,
        },
        {
          name: "siblingCount",
          type: "number",
          default: "1",
          description: "Number of page buttons to show on each side of current page.",
        },
        {
          name: "className",
          type: "string",
          description: "Additional CSS classes.",
          required: false,
        },
      ],
      guidelines: [
        { intent: "do", text: "Use pagination for large data sets (50+ items)." },
        { intent: "do", text: "Show total page count and current page for context." },
        { intent: "dont", text: "Don't use pagination on mobile — use infinite scroll instead." },
        { intent: "info", text: "Previous/Next buttons disable at first/last page." },
      ],
    },
  },

  // ─── FlowStepper ───
  "navigation/flow-stepper": {
    domain: "Navigation",
    spec: {
      name: "FlowStepper",
      purpose:
        "Horizontal progress indicator for multi-step flows (checkout, onboarding, forms). Shows current step, completed steps, and upcoming steps with connecting lines.",
      platform: "shared",
      anatomy: [
        {
          part: "Stepper container",
          description: "Horizontal wrapper with steps and connecting lines",
          tokens: ["comp.stepper.gap"],
        },
        {
          part: "Step indicator",
          description: "Circle with step number or icon",
          tokens: ["comp.stepper.circle-size", "comp.stepper.circle-bg"],
        },
        {
          part: "Step label",
          description: "Text below circle showing step name",
          tokens: ["comp.stepper.label-size"],
        },
        {
          part: "Connecting line",
          description: "Line between steps showing progress",
          tokens: ["comp.stepper.line-thickness", "comp.stepper.line-color"],
        },
      ],
      variants: ["Default", "With descriptions", "With icons"],
      states: ["completed", "current", "upcoming"],
      accessibility: {
        handled: [
          "role='navigation' with aria-label='Progress'",
          "aria-current='step' on current step",
          "Step numbers are announced for screen readers",
        ],
        required: ["Provide descriptive step labels"],
        keyboard: [],
      },
    },
    demos: {
      overview: () => <FlowStepperOverview />,
      variants: () => <FlowStepperVariants />,
    },
    developer: {
      reactImport: `import { FlowStepper } from "@flow/design-system";`,
      reactUsage: `const [currentStep, setCurrentStep] = useState(1);

<FlowStepper
  currentStep={currentStep}
  steps={[
    { label: "Account Info", description: "Enter your details" },
    { label: "Preferences", description: "Choose settings" },
    { label: "Confirmation", description: "Review and confirm" },
  ]}
/>`,
      flutterImport: `import 'package:flow_ds/navigation.dart';`,
      flutterUsage: `FlowStepper(
  currentStep: currentStep,
  steps: [
    Step(label: 'Account Info'),
    Step(label: 'Preferences'),
    Step(label: 'Confirmation'),
  ],
)`,
      notes:
        "FlowStepper works best with 3-5 steps. Use for checkout, onboarding, multi-step forms. Shows visual progress with completed steps marked. Current step is highlighted. Future steps are dimmed.",
      props: [
        {
          name: "currentStep",
          type: "number",
          description: "Current active step (0-indexed).",
          required: true,
        },
        {
          name: "steps",
          type: "Step[]",
          description: "Array of step objects: { label, description? }.",
          required: true,
        },
        {
          name: "className",
          type: "string",
          description: "Additional CSS classes.",
          required: false,
        },
      ],
      guidelines: [
        { intent: "do", text: "Use stepper for linear multi-step processes." },
        { intent: "do", text: "Keep step labels short and clear (1-3 words)." },
        {
          intent: "dont",
          text: "Don't use more than 5 steps — break into multiple flows instead.",
        },
        { intent: "info", text: "Completed steps show checkmarks, current step is highlighted." },
      ],
    },
  },

  // ─── FlowBottomNav ───
  "navigation/flow-bottom-nav": {
    domain: "Navigation",
    spec: {
      name: "FlowBottomNav",
      purpose:
        "Mobile-only bottom navigation bar with 3-5 icon + label items. Primary navigation for mobile apps. Fixed to bottom of viewport.",
      platform: "mobile",
      anatomy: [
        {
          part: "Nav container",
          description: "Fixed bottom bar with background and border",
          tokens: ["comp.bottomnav.bg", "comp.bottomnav.border", "comp.bottomnav.height"],
        },
        {
          part: "Nav item",
          description: "Icon + label button with active state",
          tokens: [
            "comp.bottomnav.item-size",
            "comp.bottomnav.icon-size",
            "comp.bottomnav.label-size",
          ],
        },
        {
          part: "Active indicator",
          description: "Color change showing active item",
          tokens: ["comp.bottomnav.active-color"],
        },
      ],
      variants: ["Icon + label (default)", "Icon only"],
      states: ["default", "active"],
      accessibility: {
        handled: [
          "role='navigation' with aria-label='Main navigation'",
          "aria-current='page' on active item",
          "Each item has accessible label",
        ],
        required: ["Provide descriptive labels for all items"],
        keyboard: [],
      },
    },
    demos: {
      overview: () => <FlowBottomNavOverview />,
      variants: () => <FlowBottomNavVariants />,
    },
    developer: {
      reactImport: `import { FlowBottomNav } from "@flow/design-system";`,
      reactUsage: `const [active, setActive] = useState("home");

<FlowBottomNav
  value={active}
  onChange={setActive}
  items={[
    { value: "home", label: "Home", icon: "home" },
    { value: "search", label: "Search", icon: "search" },
    { value: "favorites", label: "Favorites", icon: "heart" },
    { value: "profile", label: "Profile", icon: "user" },
  ]}
/>`,
      flutterImport: `import 'package:flow_ds/navigation.dart';`,
      flutterUsage: `FlowBottomNav(
  value: active,
  onChanged: (value) => setState(() => active = value),
  items: [
    BottomNavItem(value: 'home', label: 'Home', icon: Icons.home),
    BottomNavItem(value: 'search', label: 'Search', icon: Icons.search),
  ],
)`,
      notes:
        "FlowBottomNav is mobile-only. Use for primary navigation in mobile apps. Works best with 3-5 items. Fixed to bottom of viewport. Active item shows accent color. Icons are required, labels optional but recommended.",
      props: [
        {
          name: "value",
          type: "string",
          description: "Current active item value.",
          required: true,
        },
        {
          name: "onChange",
          type: "(value: string) => void",
          description: "Callback when item is clicked.",
          required: true,
        },
        {
          name: "items",
          type: "BottomNavItem[]",
          description: "Array of nav items: { value, label, icon }.",
          required: true,
        },
        {
          name: "className",
          type: "string",
          description: "Additional CSS classes.",
          required: false,
        },
      ],
      guidelines: [
        { intent: "do", text: "Use bottom nav for primary mobile navigation (3-5 items)." },
        { intent: "do", text: "Include icons + labels for best clarity." },
        { intent: "dont", text: "Don't use on desktop — use FlowSidebar or FlowTabs instead." },
        { intent: "info", text: "Bottom nav is fixed to viewport bottom with safe area insets." },
      ],
    },
  },

  // ─── FlowSidebar ───
  "navigation/flow-sidebar": {
    domain: "Navigation",
    spec: {
      name: "FlowSidebar",
      purpose:
        "Desktop sidebar navigation with collapsible sections, icons, and active state. Primary navigation for desktop apps and dashboards.",
      platform: "desktop",
      anatomy: [
        {
          part: "Sidebar container",
          description: "Fixed left panel with background",
          tokens: ["comp.sidebar.bg", "comp.sidebar.width", "comp.sidebar.padding"],
        },
        {
          part: "Nav item",
          description: "Icon + label button with hover/active states",
          tokens: [
            "comp.sidebar.item-height",
            "comp.sidebar.item-padding",
            "comp.sidebar.item-radius",
          ],
        },
        {
          part: "Section header",
          description: "Collapsible section title",
          tokens: ["comp.sidebar.section-size"],
        },
        {
          part: "Active indicator",
          description: "Background highlight showing active item",
          tokens: ["comp.sidebar.active-bg"],
        },
      ],
      variants: ["Default (expanded)", "With sections", "Collapsed (icon-only)"],
      states: ["default", "hover", "active"],
      accessibility: {
        handled: [
          "role='navigation' with aria-label='Sidebar'",
          "aria-current='page' on active item",
          "Section headers use proper heading levels",
        ],
        required: ["Provide descriptive labels for all items"],
        keyboard: ["Tab to focus items", "Enter/Space to activate", "Arrow Up/Down to navigate"],
      },
    },
    demos: {
      overview: () => <FlowSidebarOverview />,
      variants: () => <FlowSidebarVariants />,
    },
    developer: {
      reactImport: `import { FlowSidebar } from "@flow/design-system";`,
      reactUsage: `const [activeItem, setActiveItem] = useState("dashboard");

<FlowSidebar
  activeItem={activeItem}
  onItemClick={setActiveItem}
  items={[
    { id: "dashboard", label: "Dashboard", icon: "layout-dashboard" },
    { id: "projects", label: "Projects", icon: "folder" },
    { id: "settings", label: "Settings", icon: "settings" },
  ]}
/>

// With sections
<FlowSidebar
  activeItem={activeItem}
  onItemClick={setActiveItem}
  sections={[
    {
      title: "Main",
      items: [
        { id: "dashboard", label: "Dashboard", icon: "layout-dashboard" },
        { id: "analytics", label: "Analytics", icon: "bar-chart" },
      ],
    },
    {
      title: "Workspace",
      items: [
        { id: "projects", label: "Projects", icon: "folder" },
        { id: "team", label: "Team", icon: "users" },
      ],
    },
  ]}
/>`,
      flutterImport: `import 'package:flow_ds/navigation.dart';`,
      flutterUsage: `FlowSidebar(
  activeItem: activeItem,
  onItemClick: (id) => setState(() => activeItem = id),
  items: [
    SidebarItem(id: 'dashboard', label: 'Dashboard', icon: Icons.dashboard),
    SidebarItem(id: 'settings', label: 'Settings', icon: Icons.settings),
  ],
)`,
      notes:
        "FlowSidebar is desktop-only. Use for primary navigation in desktop apps and dashboards. Supports collapsible sections for organization. Active item shows background highlight. Can collapse to icon-only mode for space efficiency.",
      props: [
        {
          name: "activeItem",
          type: "string",
          description: "Current active item id.",
          required: true,
        },
        {
          name: "onItemClick",
          type: "(id: string) => void",
          description: "Callback when item is clicked.",
          required: true,
        },
        {
          name: "items",
          type: "SidebarItem[]",
          description: "Array of nav items: { id, label, icon }. Use if not using sections.",
          required: false,
        },
        {
          name: "sections",
          type: "SidebarSection[]",
          description: "Array of collapsible sections with items. Use instead of items prop.",
          required: false,
        },
        {
          name: "collapsed",
          type: "boolean",
          default: "false",
          description: "Collapses sidebar to icon-only mode.",
        },
        {
          name: "className",
          type: "string",
          description: "Additional CSS classes.",
          required: false,
        },
      ],
      guidelines: [
        { intent: "do", text: "Use sidebar for primary desktop navigation." },
        { intent: "do", text: "Group related items into sections for better organization." },
        { intent: "dont", text: "Don't use on mobile — use FlowBottomNav instead." },
        { intent: "info", text: "Sidebar can collapse to icon-only mode to save space." },
      ],
    },
  },
};
