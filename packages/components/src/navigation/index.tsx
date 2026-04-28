/**
 * FLOW Domain: Navigation (L3)
 * Atomic navigation primitives: tabs, breadcrumbs, pagination, steppers, nav bars, sidebars.
 * Compound adaptive patterns (DrawerAdapter) promoted to '../patterns' (L4).
 *
 * @domain navigation
 * @layer L3
 * @since FLOW v2.2 — L3/L4 separation
 */

// ── Tabs ──
/** @platform shared */
export { FlowTabs } from "./FlowTabs";
export type { TabsProps, TabItem } from "./FlowTabs";

// ── Breadcrumbs ──
/** @platform desktop */
export { FlowBreadcrumbs } from "./FlowBreadcrumbs";
export type { BreadcrumbsProps, BreadcrumbItem } from "./FlowBreadcrumbs";

// ── Pagination ──
/** @platform desktop */
export { FlowPagination } from "./FlowPagination";
export type { PaginationProps } from "./FlowPagination";

// ── Stepper ──
/** @platform shared */
export { FlowStepper } from "./FlowStepper";
export type { StepperProps, StepperStep } from "./FlowStepper";

// ── Bottom Navigation ──
/** @platform mobile */
export { FlowBottomNav } from "./FlowBottomNav";
export type { BottomNavProps, BottomNavItem } from "./FlowBottomNav";

// ── Sidebar ──
/** @platform desktop */
export { FlowSidebar } from "./FlowSidebar";
export type { SidebarProps, SidebarItem, SidebarGroup } from "./FlowSidebar";
