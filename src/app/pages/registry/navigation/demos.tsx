/**
 * FLOW - Navigation Domain Demos
 * Demo functions for navigation components
 */
import { useState } from "react";

import {
  FlowBottomNav, FlowBreadcrumbs, FlowButton, FlowPagination,
  FlowSidebar, FlowStepper, FlowTable, FlowTabs,
  Inline, Stack, Text,
} from "../../../../lib";
import { DemoGroup, DemoSection } from "../../../components/demo-helpers";
import { Callout } from "../../../components/doc-primitives";
import { StaggerDemo } from "../../../components/motion-demo-section";

// ========================================
// FlowBreadcrumbs Demos
// ========================================

export function FlowBreadcrumbsOverview() {
  return (
    <Stack gap="section">
      <DemoSection
        title="Basic Usage"
        description="Navigation trail showing the user's location in a hierarchy. The last item is always the current page (non-interactive, aria-current='page')."
      >
        <DemoGroup>
          <FlowBreadcrumbs
            items={[
              { label: "Home", onClick: () => {} },
              { label: "Products", onClick: () => {} },
              { label: "Category", onClick: () => {} },
              { label: "Current Product" },
            ]}
          />
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Interaction Types"
        description="Items support onClick (SPA navigation) or href (semantic anchors). Last item is always non-interactive."
      >
        <DemoGroup>
          <Stack gap="component">
            <Stack gap="component">
              <Text role="overline" color="tertiary">
                With onClick (SPA navigation)
              </Text>
              <FlowBreadcrumbs
                items={[
                  { label: "Dashboard", onClick: () => {} },
                  { label: "Settings", onClick: () => {} },
                  { label: "Profile" },
                ]}
              />
            </Stack>
            <Stack gap="component">
              <Text role="overline" color="tertiary">
                With href (semantic links)
              </Text>
              <FlowBreadcrumbs
                items={[
                  { label: "Home", href: "/" },
                  { label: "Docs", href: "/docs" },
                  { label: "API Reference" },
                ]}
              />
            </Stack>
          </Stack>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Icon Root Variant"
        description="variant='icon-root' renders the first item as an icon-only button. Saves horizontal space and follows common UI patterns."
      >
        <DemoGroup>
          <Stack gap="component">
            <Stack gap="component">
              <Text role="overline" color="tertiary">
                Default home icon
              </Text>
              <FlowBreadcrumbs
                variant="icon-root"
                items={[
                  { label: "Home", onClick: () => {} },
                  { label: "Products", onClick: () => {} },
                  { label: "Electronics" },
                ]}
              />
            </Stack>
            <Stack gap="component">
              <Text role="overline" color="tertiary">
                Custom icon
              </Text>
              <FlowBreadcrumbs
                variant="icon-root"
                items={[
                  { label: "Dashboard", icon: "layout-dashboard", onClick: () => {} },
                  { label: "Analytics", onClick: () => {} },
                  { label: "Reports" },
                ]}
              />
            </Stack>
          </Stack>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="With Icons"
        description="Add icons to any breadcrumb item for visual context. Icons render before the label text."
      >
        <DemoGroup>
          <FlowBreadcrumbs
            items={[
              { label: "Home", icon: "home", onClick: () => {} },
              { label: "Settings", icon: "settings", onClick: () => {} },
              { label: "Security", icon: "shield", onClick: () => {} },
              { label: "Two-Factor Auth" },
            ]}
          />
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Collapsed with maxItems"
        description="When trail depth exceeds maxItems, intermediate items collapse into an expandable '...' button. Click to expand full trail."
      >
        <DemoGroup>
          <Stack gap="component">
            <Stack gap="component">
              <Text role="overline" color="tertiary">
                maxItems=3 (6 total items)
              </Text>
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
            </Stack>
            <Stack gap="component">
              <Text role="overline" color="tertiary">
                maxItems=4 (7 total items)
              </Text>
              <FlowBreadcrumbs
                maxItems={4}
                items={[
                  { label: "Root", onClick: () => {} },
                  { label: "Level 1", onClick: () => {} },
                  { label: "Level 2", onClick: () => {} },
                  { label: "Level 3", onClick: () => {} },
                  { label: "Level 4", onClick: () => {} },
                  { label: "Level 5", onClick: () => {} },
                  { label: "Current" },
                ]}
              />
            </Stack>
          </Stack>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Trail Depth Variations"
        description="Breadcrumbs adapt to different hierarchy depths - from 2 items (back navigation) to 6+ items (deep hierarchies)."
      >
        <DemoGroup>
          <Stack gap="component">
            <Stack gap="component">
              <Text role="overline" color="tertiary">
                2 items (minimal)
              </Text>
              <FlowBreadcrumbs
                items={[{ label: "Products", onClick: () => {} }, { label: "MacBook Pro" }]}
              />
            </Stack>
            <Stack gap="component">
              <Text role="overline" color="tertiary">
                3 items (common)
              </Text>
              <FlowBreadcrumbs
                items={[
                  { label: "Home", onClick: () => {} },
                  { label: "Blog", onClick: () => {} },
                  { label: "Article Title" },
                ]}
              />
            </Stack>
            <Stack gap="component">
              <Text role="overline" color="tertiary">
                4 items
              </Text>
              <FlowBreadcrumbs
                items={[
                  { label: "Home", onClick: () => {} },
                  { label: "Shop", onClick: () => {} },
                  { label: "Men", onClick: () => {} },
                  { label: "Shoes" },
                ]}
              />
            </Stack>
            <Stack gap="component">
              <Text role="overline" color="tertiary">
                5 items (recommend maxItems)
              </Text>
              <FlowBreadcrumbs
                items={[
                  { label: "Home", onClick: () => {} },
                  { label: "Products", onClick: () => {} },
                  { label: "Electronics", onClick: () => {} },
                  { label: "Audio", onClick: () => {} },
                  { label: "Headphones" },
                ]}
              />
            </Stack>
          </Stack>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Real-World Patterns"
        description="Common breadcrumb patterns for e-commerce, documentation, dashboards, and file systems."
      >
        <DemoGroup>
          <Stack gap="component">
            <Stack gap="component">
              <Text role="overline" color="tertiary">
                E-commerce category navigation
              </Text>
              <FlowBreadcrumbs
                items={[
                  { label: "Home", onClick: () => {} },
                  { label: "Shop", onClick: () => {} },
                  { label: "Women", onClick: () => {} },
                  { label: "Clothing", onClick: () => {} },
                  { label: "Dresses" },
                ]}
              />
            </Stack>
            <Stack gap="component">
              <Text role="overline" color="tertiary">
                Documentation hierarchy
              </Text>
              <FlowBreadcrumbs
                items={[
                  { label: "Docs", href: "/docs" },
                  { label: "Components", href: "/docs/components" },
                  { label: "Navigation", href: "/docs/components/navigation" },
                  { label: "Breadcrumbs" },
                ]}
              />
            </Stack>
            <Stack gap="component">
              <Text role="overline" color="tertiary">
                Dashboard settings
              </Text>
              <FlowBreadcrumbs
                variant="icon-root"
                items={[
                  { label: "Dashboard", icon: "layout-dashboard", onClick: () => {} },
                  { label: "Settings", icon: "settings", onClick: () => {} },
                  { label: "Account" },
                ]}
              />
            </Stack>
            <Stack gap="component">
              <Text role="overline" color="tertiary">
                File system path
              </Text>
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
              />
            </Stack>
          </Stack>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Edge Cases"
        description="Minimum viable breadcrumbs and single-item scenarios. Single item still renders as breadcrumb for consistency."
      >
        <DemoGroup>
          <Stack gap="component">
            <Stack gap="component">
              <Text role="overline" color="tertiary">
                Single item (current page only)
              </Text>
              <FlowBreadcrumbs items={[{ label: "Dashboard" }]} />
            </Stack>
            <Stack gap="component">
              <Text role="overline" color="tertiary">
                Two items (minimal back navigation)
              </Text>
              <FlowBreadcrumbs
                items={[{ label: "All Products", onClick: () => {} }, { label: "Product Details" }]}
              />
            </Stack>
          </Stack>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Separator Variations"
        description="Default chevron separator (›) between items. Separators are aria-hidden for screen readers."
      >
        <DemoGroup>
          <Stack gap="component">
            <Stack gap="component">
              <Text role="overline" color="tertiary">
                Default chevron separator
              </Text>
              <FlowBreadcrumbs
                items={[
                  { label: "Home", onClick: () => {} },
                  { label: "Products", onClick: () => {} },
                  { label: "Details" },
                ]}
              />
            </Stack>
            <Stack gap="component">
              <Text role="caption" color="tertiary">
                Separators are purely decorative - screen readers skip them and announce links in
                sequence.
              </Text>
            </Stack>
          </Stack>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Combined Features"
        description="Real-world examples combining multiple features: icon-root + maxItems + custom icons."
      >
        <DemoGroup>
          <Stack gap="component">
            <Stack gap="component">
              <Text role="overline" color="tertiary">
                Icon-root + collapsed + icons
              </Text>
              <FlowBreadcrumbs
                variant="icon-root"
                maxItems={3}
                items={[
                  { label: "Home", onClick: () => {} },
                  { label: "Projects", icon: "folder", onClick: () => {} },
                  { label: "Design", icon: "palette", onClick: () => {} },
                  { label: "Components", icon: "box", onClick: () => {} },
                  { label: "Navigation", onClick: () => {} },
                  { label: "Breadcrumbs" },
                ]}
              />
            </Stack>
            <Stack gap="component">
              <Text role="overline" color="tertiary">
                Deep hierarchy with href + maxItems
              </Text>
              <FlowBreadcrumbs
                maxItems={4}
                items={[
                  { label: "Docs", href: "/" },
                  { label: "API", href: "/api" },
                  { label: "Components", href: "/api/components" },
                  { label: "Navigation", href: "/api/components/navigation" },
                  { label: "Breadcrumbs", href: "/api/components/navigation/breadcrumbs" },
                  { label: "Props" },
                ]}
              />
            </Stack>
          </Stack>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Accessibility"
        description="Breadcrumbs are wrapped in <nav> with aria-label='Breadcrumb', use <ol> for ordered trail, and mark the last item with aria-current='page'."
      >
        <DemoGroup>
          <Callout intent="info">
            FlowBreadcrumbs automatically handles: semantic &lt;nav&gt; wrapper with
            aria-label=&apos;Breadcrumb&apos;, ordered list (&lt;ol&gt;) for trail structure,
            aria-current=&apos;page&apos; on the last item, aria-hidden separators, and keyboard navigation
            (Tab + Enter). Interactive items are focusable via Tab and clickable via Enter/Space.
          </Callout>
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

export function FlowBreadcrumbsVariants() {
  return (
    <Stack gap="subsection">
      <DemoSection
        title="Icon Root Variant"
        description="variant='icon-root' renders the first item as an icon-only home button. The label is preserved as aria-label for screen readers."
      >
        <DemoGroup>
          <FlowBreadcrumbs
            variant="icon-root"
            items={[
              { label: "Home", onClick: () => {} },
              { label: "Components", onClick: () => {} },
              { label: "Controls", onClick: () => {} },
              { label: "FlowBreadcrumbs" },
            ]}
          />
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Icon Root with Custom Icon"
        description="Override the default home icon via the first item's icon prop."
      >
        <DemoGroup>
          <FlowBreadcrumbs
            variant="icon-root"
            items={[
              { label: "Dashboard", icon: "layout-dashboard", onClick: () => {} },
              { label: "Settings", onClick: () => {} },
              { label: "Profile" },
            ]}
          />
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Collapsed with maxItems"
        description="When items exceed maxItems, intermediate items collapse into an ellipsis button. Click '…' to expand."
      >
        <DemoGroup>
          <Text role="overline" color="tertiary">
            maxItems=3 (6 items)
          </Text>
          <FlowBreadcrumbs
            maxItems={3}
            items={[
              { label: "Home", onClick: () => {} },
              { label: "Products", onClick: () => {} },
              { label: "Category", onClick: () => {} },
              { label: "Subcategory", onClick: () => {} },
              { label: "Details", onClick: () => {} },
              { label: "Current Item" },
            ]}
          />
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Edge Cases"
        description="Minimum viable breadcrumbs and single-item edge case."
      >
        <DemoGroup>
          <Stack gap="component">
            <Text role="overline" color="tertiary">
              Single Item
            </Text>
            <FlowBreadcrumbs items={[{ label: "Dashboard" }]} />
          </Stack>
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

// ========================================
// FlowTabs Demos
// ========================================

export function FlowTabsOverview() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <Stack gap="section">
      <DemoSection
        title="Basic Usage"
        description="Horizontal tab navigation with active state. Click to switch between tabs."
      >
        <DemoGroup>
          <FlowTabs
            activeKey={activeTab}
            onChange={setActiveTab}
            tabs={[
              { key: "overview", label: "Overview" },
              { key: "features", label: "Features" },
              { key: "pricing", label: "Pricing" },
              { key: "support", label: "Support" },
            ]}
          />
          <Text className="demo-spacing-top-lg">Active tab: {activeTab}</Text>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="With Icons"
        description="Add leading icons to tab labels for visual context."
      >
        <DemoGroup>
          <FlowTabs
            activeKey={activeTab}
            onChange={setActiveTab}
            tabs={[
              { key: "home", label: "Home", icon: "home" },
              { key: "search", label: "Search", icon: "search" },
              { key: "notifications", label: "Notifications", icon: "bell" },
              { key: "settings", label: "Settings", icon: "settings" },
            ]}
          />
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Real-World Examples"
        description="Common tab patterns for product pages, settings panels, and dashboard sections."
      >
        <DemoGroup>
          <Stack gap="component">
            <Stack gap="component">
              <Text role="overline" color="tertiary">
                Product details page
              </Text>
              <FlowTabs
                activeKey={activeTab}
                onChange={setActiveTab}
                tabs={[
                  { key: "overview", label: "Overview" },
                  { key: "specs", label: "Specifications" },
                  { key: "reviews", label: "Reviews" },
                  { key: "support", label: "Support" },
                ]}
              />
            </Stack>
            <Stack gap="component">
              <Text role="overline" color="tertiary">
                Settings panel
              </Text>
              <FlowTabs
                activeKey={activeTab}
                onChange={setActiveTab}
                tabs={[
                  { key: "account", label: "Account", icon: "user" },
                  { key: "security", label: "Security", icon: "shield" },
                  { key: "notifications", label: "Notifications", icon: "bell" },
                  { key: "billing", label: "Billing", icon: "credit-card" },
                ]}
              />
            </Stack>
            <Stack gap="component">
              <Text role="overline" color="tertiary">
                Dashboard analytics
              </Text>
              <FlowTabs
                activeKey={activeTab}
                onChange={setActiveTab}
                tabs={[
                  { key: "traffic", label: "Traffic", icon: "trending-up" },
                  { key: "revenue", label: "Revenue", icon: "dollar-sign" },
                  { key: "users", label: "Users", icon: "users" },
                  { key: "reports", label: "Reports", icon: "file-text" },
                ]}
              />
            </Stack>
          </Stack>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Tab Count Variations"
        description="Tabs work best with 2-6 items. More than 6 becomes crowded."
      >
        <DemoGroup>
          <Stack gap="component">
            <Stack gap="component">
              <Text role="overline" color="tertiary">
                2 tabs (minimal)
              </Text>
              <FlowTabs
                activeKey={activeTab}
                onChange={setActiveTab}
                tabs={[
                  { key: "grid", label: "Grid View", icon: "grid" },
                  { key: "list", label: "List View", icon: "list" },
                ]}
              />
            </Stack>
            <Stack gap="component">
              <Text role="overline" color="tertiary">
                5 tabs (optimal)
              </Text>
              <FlowTabs
                activeKey={activeTab}
                onChange={setActiveTab}
                tabs={[
                  { key: "all", label: "All" },
                  { key: "active", label: "Active" },
                  { key: "pending", label: "Pending" },
                  { key: "completed", label: "Completed" },
                  { key: "archived", label: "Archived" },
                ]}
              />
            </Stack>
            <Stack gap="component">
              <Text role="overline" color="tertiary">
                6 tabs (maximum recommended)
              </Text>
              <FlowTabs
                activeKey={activeTab}
                onChange={setActiveTab}
                tabs={[
                  { key: "mon", label: "Mon" },
                  { key: "tue", label: "Tue" },
                  { key: "wed", label: "Wed" },
                  { key: "thu", label: "Thu" },
                  { key: "fri", label: "Fri" },
                  { key: "sat", label: "Sat" },
                ]}
              />
            </Stack>
          </Stack>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Accessibility"
        description="FlowTabs uses semantic ARIA roles and keyboard navigation for screen readers."
      >
        <DemoGroup>
          <Callout intent="info">
            FlowTabs renders with role=&apos;tablist&apos; on container and role=&apos;tab&apos; on each button. Active
            tab has aria-selected=&apos;true&apos;. Keyboard navigation: Arrow Left/Right to navigate tabs,
            Tab to focus tab list, Enter/Space to activate. Each tab should have a unique value for
            proper state management.
          </Callout>
        </DemoGroup>
      </DemoSection>

      <StaggerDemo />
    </Stack>
  );
}

export function FlowTabsVariants() {
  const [_tab, _setTab] = useState("one");

  return (
    <Stack gap="subsection">
      <DemoSection title="All Tab Counts" description="Tabs adapt to 2-8 items naturally.">
        <DemoGroup>
          <Stack gap="component">
            <FlowTabs
              activeKey="a"
              onChange={() => {}}
              tabs={[
                { key: "a", label: "Tab A" },
                { key: "b", label: "Tab B" },
              ]}
            />
            <FlowTabs
              activeKey="a"
              onChange={() => {}}
              tabs={[
                { key: "a", label: "Tab A" },
                { key: "b", label: "Tab B" },
                { key: "c", label: "Tab C" },
              ]}
            />
          </Stack>
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

// ========================================
// FlowPagination Demos
// ========================================

export function FlowPaginationOverview() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <Stack gap="section">
      <DemoSection
        title="Basic Usage"
        description="Navigate through pages with previous/next buttons and page numbers."
      >
        <DemoGroup>
          <FlowPagination page={currentPage} totalPages={10} onChange={setCurrentPage} />
          <Text className="demo-spacing-top-md" role="caption">
            Current page: {currentPage}
          </Text>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Ellipsis Behavior"
        description="When total pages exceed siblingCount, middle pages collapse into ellipsis (...)."
      >
        <DemoGroup>
          <Stack gap="component">
            <FlowPagination page={5} totalPages={20} onChange={() => {}} />
            <FlowPagination page={15} totalPages={20} onChange={() => {}} />
          </Stack>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Real-World Examples"
        description="Pagination is most commonly used with tables, search results, and large datasets."
      >
        <DemoGroup>
          <Stack gap="component">
            <Stack gap="component">
              <Text role="overline" color="tertiary">
                User directory table
              </Text>
              <Stack gap={2}>
                <FlowTable
                  columns={[
                    { key: "name", header: "Name" },
                    { key: "email", header: "Email" },
                    { key: "role", header: "Role" },
                    { key: "status", header: "Status" },
                  ]}
                  data={[
                    {
                      name: "Alice Johnson",
                      email: "alice@example.com",
                      role: "Admin",
                      status: "Active",
                    },
                    {
                      name: "Bob Smith",
                      email: "bob@example.com",
                      role: "Editor",
                      status: "Active",
                    },
                    {
                      name: "Carol White",
                      email: "carol@example.com",
                      role: "Viewer",
                      status: "Inactive",
                    },
                    {
                      name: "David Lee",
                      email: "david@example.com",
                      role: "Editor",
                      status: "Active",
                    },
                    {
                      name: "Emma Davis",
                      email: "emma@example.com",
                      role: "Admin",
                      status: "Active",
                    },
                  ]}
                  hoverable
                  striped
                />
                <FlowPagination page={1} totalPages={12} onChange={() => {}} />
              </Stack>
            </Stack>
            <Stack gap="component">
              <Text role="overline" color="tertiary">
                Product catalog
              </Text>
              <Stack gap={2}>
                <FlowTable
                  columns={[
                    { key: "product", header: "Product" },
                    { key: "category", header: "Category" },
                    { key: "price", header: "Price", align: "right" },
                    { key: "stock", header: "Stock", align: "right" },
                  ]}
                  data={[
                    {
                      product: "Wireless Headphones",
                      category: "Audio",
                      price: "$99.00",
                      stock: "142",
                    },
                    {
                      product: "Smart Watch",
                      category: "Wearables",
                      price: "$249.00",
                      stock: "89",
                    },
                    {
                      product: "Laptop Stand",
                      category: "Accessories",
                      price: "$45.00",
                      stock: "256",
                    },
                    {
                      product: "USB-C Hub",
                      category: "Accessories",
                      price: "$59.00",
                      stock: "178",
                    },
                    {
                      product: "Mechanical Keyboard",
                      category: "Peripherals",
                      price: "$129.00",
                      stock: "64",
                    },
                  ]}
                  hoverable
                />
                <FlowPagination page={3} totalPages={24} onChange={() => {}} />
              </Stack>
            </Stack>
            <Stack gap="component">
              <Text role="overline" color="tertiary">
                Transaction history
              </Text>
              <Stack gap={2}>
                <FlowTable
                  columns={[
                    { key: "date", header: "Date" },
                    { key: "description", header: "Description" },
                    { key: "amount", header: "Amount", align: "right" },
                    { key: "status", header: "Status" },
                  ]}
                  data={[
                    {
                      date: "Mar 15, 2026",
                      description: "Annual subscription",
                      amount: "$299.00",
                      status: "Completed",
                    },
                    {
                      date: "Mar 12, 2026",
                      description: "Pro upgrade",
                      amount: "$49.00",
                      status: "Completed",
                    },
                    {
                      date: "Mar 8, 2026",
                      description: "Team seats (x3)",
                      amount: "$147.00",
                      status: "Completed",
                    },
                    {
                      date: "Feb 28, 2026",
                      description: "Monthly payment",
                      amount: "$29.00",
                      status: "Completed",
                    },
                    {
                      date: "Feb 15, 2026",
                      description: "Add-on features",
                      amount: "$19.00",
                      status: "Pending",
                    },
                  ]}
                  hoverable
                  striped
                />
                <FlowPagination page={1} totalPages={8} onChange={() => {}} />
              </Stack>
            </Stack>
          </Stack>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Accessibility"
        description="FlowPagination uses semantic navigation with ARIA labels for screen readers."
      >
        <DemoGroup>
          <Callout intent="info">
            FlowPagination renders with role=&apos;navigation&apos; and aria-label=&apos;Pagination&apos;. Current page
            button has aria-current=&apos;page&apos;. Previous/Next buttons have descriptive aria-labels and
            disable automatically at first/last page. Keyboard: Tab to focus buttons, Enter/Space to
            activate.
          </Callout>
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

export function FlowPaginationVariants() {
  return (
    <Stack gap="subsection">
      <DemoSection
        title="Edge Cases"
        description="Pagination handles extreme cases gracefully: single page, two pages, and very large page counts."
      >
        <DemoGroup>
          <Stack gap="component">
            <Stack gap="component">
              <Text role="overline" color="tertiary">
                1 page (no navigation needed)
              </Text>
              <FlowPagination page={1} totalPages={1} onChange={() => {}} />
            </Stack>
            <Stack gap="component">
              <Text role="overline" color="tertiary">
                2 pages
              </Text>
              <FlowPagination page={1} totalPages={2} onChange={() => {}} />
            </Stack>
            <Stack gap="component">
              <Text role="overline" color="tertiary">
                3 pages
              </Text>
              <FlowPagination page={2} totalPages={3} onChange={() => {}} />
            </Stack>
            <Stack gap="component">
              <Text role="overline" color="tertiary">
                100+ pages (heavy ellipsis)
              </Text>
              <FlowPagination page={50} totalPages={100} onChange={() => {}} />
            </Stack>
          </Stack>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="siblingCount Variations"
        description="siblingCount controls how many page numbers show on each side of current page. Default is 1."
      >
        <DemoGroup>
          <Stack gap="component">
            <Stack gap="component">
              <Text role="overline" color="tertiary">
                siblingCount=0 (minimal)
              </Text>
              <FlowPagination page={10} totalPages={20} siblingCount={0} onChange={() => {}} />
            </Stack>
            <Stack gap="component">
              <Text role="overline" color="tertiary">
                siblingCount=1 (default)
              </Text>
              <FlowPagination page={10} totalPages={20} siblingCount={1} onChange={() => {}} />
            </Stack>
            <Stack gap="component">
              <Text role="overline" color="tertiary">
                siblingCount=2 (expanded)
              </Text>
              <FlowPagination page={10} totalPages={20} siblingCount={2} onChange={() => {}} />
            </Stack>
            <Stack gap="component">
              <Text role="overline" color="tertiary">
                siblingCount=3 (maximum recommended)
              </Text>
              <FlowPagination page={10} totalPages={20} siblingCount={3} onChange={() => {}} />
            </Stack>
          </Stack>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Various Page Counts"
        description="Pagination adapts to small and large page counts."
      >
        <DemoGroup>
          <Stack gap="component">
            <Text role="overline" color="tertiary">
              3 pages
            </Text>
            <FlowPagination page={2} totalPages={3} onChange={() => {}} />

            <Text role="overline" color="tertiary">
              50 pages (collapsed)
            </Text>
            <FlowPagination page={25} totalPages={50} onChange={() => {}} />
          </Stack>
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

// ========================================
// FlowStepper Demos
// ========================================

export function FlowStepperOverview() {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <Stack gap="section">
      <DemoSection
        title="Basic Usage"
        description="Horizontal stepper showing progress through multi-step flows (checkout, onboarding, forms)."
      >
        <DemoGroup>
          <FlowStepper
            activeStep={currentStep}
            steps={[
              { key: "account", label: "Account Info", description: "Enter your details" },
              { key: "preferences", label: "Preferences", description: "Choose your settings" },
              { key: "confirmation", label: "Confirmation", description: "Review and confirm" },
            ]}
          />
          <Inline gap={2} className="demo-spacing-top-lg">
            <FlowButton onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}>
              Previous
            </FlowButton>
            <FlowButton onClick={() => setCurrentStep(Math.min(2, currentStep + 1))}>
              Next
            </FlowButton>
          </Inline>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Real-World Examples"
        description="Common stepper patterns for checkout flows, onboarding, and multi-step forms."
      >
        <DemoGroup>
          <Stack gap="component">
            <Stack gap="component">
              <Text role="overline" color="tertiary">
                E-commerce checkout
              </Text>
              <FlowStepper
                activeStep={1}
                steps={[
                  { key: "cart", label: "Cart", description: "Review items" },
                  { key: "shipping", label: "Shipping", description: "Delivery address" },
                  { key: "payment", label: "Payment", description: "Billing details" },
                  { key: "confirm", label: "Confirm", description: "Place order" },
                ]}
              />
            </Stack>
            <Stack gap="component">
              <Text role="overline" color="tertiary">
                User onboarding
              </Text>
              <FlowStepper
                activeStep={0}
                steps={[
                  { key: "welcome", label: "Welcome", description: "Get started" },
                  { key: "profile", label: "Profile", description: "Tell us about you" },
                  { key: "preferences", label: "Preferences", description: "Customize experience" },
                  { key: "complete", label: "Complete", description: "You're all set!" },
                ]}
              />
            </Stack>
            <Stack gap="component">
              <Text role="overline" color="tertiary">
                Project setup wizard
              </Text>
              <FlowStepper
                activeStep={2}
                steps={[
                  { key: "details", label: "Details", description: "Name and description" },
                  { key: "team", label: "Team", description: "Add collaborators" },
                  { key: "settings", label: "Settings", description: "Configure options" },
                ]}
              />
            </Stack>
          </Stack>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Step States"
        description="Completed steps show checkmarks, current step is highlighted, upcoming steps are dimmed."
      >
        <DemoGroup>
          <Stack gap="component">
            <Stack gap="component">
              <Text role="overline" color="tertiary">
                Step 1 of 4 (start)
              </Text>
              <FlowStepper
                activeStep={0}
                steps={[
                  { key: "account", label: "Account" },
                  { key: "verification", label: "Verification" },
                  { key: "payment", label: "Payment" },
                  { key: "done", label: "Done" },
                ]}
              />
            </Stack>
            <Stack gap="component">
              <Text role="overline" color="tertiary">
                Step 3 of 4 (mid-flow)
              </Text>
              <FlowStepper
                activeStep={2}
                steps={[
                  { key: "account", label: "Account" },
                  { key: "verification", label: "Verification" },
                  { key: "payment", label: "Payment" },
                  { key: "done", label: "Done" },
                ]}
              />
            </Stack>
            <Stack gap="component">
              <Text role="overline" color="tertiary">
                Step 4 of 4 (complete)
              </Text>
              <FlowStepper
                activeStep={3}
                steps={[
                  { key: "account", label: "Account" },
                  { key: "verification", label: "Verification" },
                  { key: "payment", label: "Payment" },
                  { key: "done", label: "Done" },
                ]}
              />
            </Stack>
          </Stack>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Accessibility"
        description="FlowStepper uses semantic navigation and step indicators for screen readers."
      >
        <DemoGroup>
          <Callout intent="info">
            FlowStepper renders with role=&apos;navigation&apos; and aria-label=&apos;Progress&apos;. Current step has
            aria-current=&apos;step&apos;. Step numbers are announced for screen readers. Completed steps show
            checkmarks, current step is highlighted with accent color, upcoming steps are dimmed.
            Stepper is non-interactive (use buttons like Previous/Next to control flow).
          </Callout>
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

export function FlowStepperVariants() {
  return (
    <Stack gap="subsection">
      <DemoSection title="Step Counts" description="Stepper works best with 3-5 steps.">
        <DemoGroup>
          <Stack gap="subsection">
            <FlowStepper
              activeStep={1}
              steps={[
                { key: "step1", label: "Step 1" },
                { key: "step2", label: "Step 2" },
                { key: "step3", label: "Step 3" },
                { key: "step4", label: "Step 4" },
              ]}
            />
          </Stack>
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

// ========================================
// FlowBottomNav Demos
// ========================================

export function FlowBottomNavOverview() {
  const [active, setActive] = useState("home");

  return (
    <Stack gap="section">
      <DemoSection
        title="Basic Usage"
        description="Mobile-only bottom navigation bar with icon + label items."
      >
        <DemoGroup>
          <div className="demo-mobile-frame">
            <FlowBottomNav
              activeKey={active}
              onChange={setActive}
              items={[
                { key: "home", label: "Home", icon: "home" },
                { key: "search", label: "Search", icon: "search" },
                { key: "favorites", label: "Favorites", icon: "heart" },
                { key: "profile", label: "Profile", icon: "user" },
              ]}
            />
          </div>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Real-World Examples"
        description="Common mobile app navigation patterns for social, e-commerce, and content apps."
      >
        <DemoGroup>
          <Stack gap="component">
            <Stack gap="component">
              <Text role="overline" color="tertiary">
                Social media app
              </Text>
              <div className="demo-mobile-frame">
                <FlowBottomNav
                  activeKey={active}
                  onChange={setActive}
                  items={[
                    { key: "feed", label: "Feed", icon: "home" },
                    { key: "discover", label: "Discover", icon: "compass" },
                    { key: "post", label: "Post", icon: "plus-circle" },
                    { key: "notifications", label: "Alerts", icon: "bell" },
                    { key: "profile", label: "Me", icon: "user" },
                  ]}
                />
              </div>
            </Stack>
            <Stack gap="component">
              <Text role="overline" color="tertiary">
                E-commerce app
              </Text>
              <div className="demo-mobile-frame">
                <FlowBottomNav
                  activeKey={active}
                  onChange={setActive}
                  items={[
                    { key: "shop", label: "Shop", icon: "shopping-bag" },
                    { key: "search", label: "Search", icon: "search" },
                    { key: "cart", label: "Cart", icon: "shopping-cart" },
                    { key: "account", label: "Account", icon: "user" },
                  ]}
                />
              </div>
            </Stack>
            <Stack gap="component">
              <Text role="overline" color="tertiary">
                Content streaming app
              </Text>
              <div className="demo-mobile-frame">
                <FlowBottomNav
                  activeKey={active}
                  onChange={setActive}
                  items={[
                    { key: "home", label: "Home", icon: "home" },
                    { key: "library", label: "Library", icon: "folder" },
                    { key: "favorites", label: "Favorites", icon: "heart" },
                  ]}
                />
              </div>
            </Stack>
          </Stack>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Item Count Variations"
        description="Bottom nav works best with 3-5 items for optimal thumb reach."
      >
        <DemoGroup>
          <Stack gap="component">
            <Stack gap="component">
              <Text role="overline" color="tertiary">
                3 items (minimal)
              </Text>
              <div className="demo-mobile-frame">
                <FlowBottomNav
                  activeKey={active}
                  onChange={setActive}
                  items={[
                    { key: "home", label: "Home", icon: "home" },
                    { key: "search", label: "Search", icon: "search" },
                    { key: "profile", label: "Profile", icon: "user" },
                  ]}
                />
              </div>
            </Stack>
            <Stack gap="component">
              <Text role="overline" color="tertiary">
                4 items (common)
              </Text>
              <div className="demo-mobile-frame">
                <FlowBottomNav
                  activeKey={active}
                  onChange={setActive}
                  items={[
                    { key: "home", label: "Home", icon: "home" },
                    { key: "explore", label: "Explore", icon: "compass" },
                    { key: "notifications", label: "Alerts", icon: "bell" },
                    { key: "profile", label: "Profile", icon: "user" },
                  ]}
                />
              </div>
            </Stack>
            <Stack gap="component">
              <Text role="overline" color="tertiary">
                5 items (maximum recommended)
              </Text>
              <div className="demo-mobile-frame">
                <FlowBottomNav
                  activeKey={active}
                  onChange={setActive}
                  items={[
                    { key: "home", label: "Home", icon: "home" },
                    { key: "explore", label: "Explore", icon: "compass" },
                    { key: "create", label: "Create", icon: "plus" },
                    { key: "notifications", label: "Alerts", icon: "bell" },
                    { key: "profile", label: "Profile", icon: "user" },
                  ]}
                />
              </div>
            </Stack>
          </Stack>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Accessibility"
        description="FlowBottomNav is mobile-only with proper ARIA labels for navigation."
      >
        <DemoGroup>
          <Callout intent="info">
            FlowBottomNav renders with role=&apos;navigation&apos; and aria-label=&apos;Main navigation&apos;. Active
            item has aria-current=&apos;page&apos;. Each item must have an icon and label for clarity. Fixed
            to viewport bottom with safe area insets on mobile devices. Desktop users should use
            FlowSidebar or FlowTabs instead.
          </Callout>
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

export function FlowBottomNavVariants() {
  return (
    <Stack gap="subsection">
      <DemoSection title="Item Counts" description="Bottom nav works best with 3-5 items.">
        <DemoGroup>
          <div className="demo-mobile-frame">
            <FlowBottomNav
              activeKey="home"
              onChange={() => {}}
              items={[
                { key: "home", label: "Home", icon: "home" },
                { key: "explore", label: "Explore", icon: "compass" },
                { key: "create", label: "Create", icon: "plus" },
                { key: "notifications", label: "Alerts", icon: "bell" },
                { key: "profile", label: "Profile", icon: "user" },
              ]}
            />
          </div>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Accessibility"
        description="FlowBottomNav is mobile-only with proper ARIA labels for navigation."
      >
        <DemoGroup>
          <Callout intent="info">
            FlowBottomNav renders with role=&apos;navigation&apos; and aria-label=&apos;Main navigation&apos;. Active
            item has aria-current=&apos;page&apos;. Each item must have an icon and label for clarity. Fixed
            to viewport bottom with safe area insets on mobile devices. Desktop users should use
            FlowSidebar or FlowTabs instead.
          </Callout>
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

// ========================================
// FlowSidebar Demos
// ========================================

export function FlowSidebarOverview() {
  const [activeItem, setActiveItem] = useState("dashboard");

  return (
    <Stack gap="section">
      <DemoSection
        title="Basic Usage"
        description="Desktop sidebar navigation with collapsible sections and active state."
      >
        <DemoGroup>
          <div className="demo-sidebar-frame">
            <FlowSidebar
              activeItem={activeItem}
              onItemClick={setActiveItem}
              items={[
                { id: "dashboard", label: "Dashboard", icon: "layout-dashboard" },
                { id: "projects", label: "Projects", icon: "folder" },
                { id: "team", label: "Team", icon: "users" },
                { id: "settings", label: "Settings", icon: "settings" },
              ]}
            />
          </div>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Real-World Examples"
        description="Common sidebar patterns for dashboards, admin panels, and productivity apps."
      >
        <DemoGroup>
          <Stack gap="component">
            <Stack gap="component">
              <Text role="overline" color="tertiary">
                Project management dashboard
              </Text>
              <div className="demo-sidebar-frame">
                <FlowSidebar
                  activeItem={activeItem}
                  onItemClick={setActiveItem}
                  sections={[
                    {
                      title: "Workspace",
                      items: [
                        { id: "dashboard", label: "Dashboard", icon: "layout-dashboard" },
                        { id: "projects", label: "Projects", icon: "folder" },
                        { id: "tasks", label: "Tasks", icon: "check-square" },
                        { id: "calendar", label: "Calendar", icon: "calendar" },
                      ],
                    },
                    {
                      title: "Team",
                      items: [
                        { id: "members", label: "Members", icon: "users" },
                        { id: "activity", label: "Activity", icon: "activity" },
                      ],
                    },
                  ]}
                />
              </div>
            </Stack>
            <Stack gap="component">
              <Text role="overline" color="tertiary">
                Admin panel
              </Text>
              <div className="demo-sidebar-frame">
                <FlowSidebar
                  activeItem={activeItem}
                  onItemClick={setActiveItem}
                  sections={[
                    {
                      title: "Overview",
                      items: [
                        { id: "dashboard", label: "Dashboard", icon: "layout-dashboard" },
                        { id: "analytics", label: "Analytics", icon: "bar-chart" },
                      ],
                    },
                    {
                      title: "Management",
                      items: [
                        { id: "users", label: "Users", icon: "users" },
                        { id: "content", label: "Content", icon: "file-text" },
                        { id: "media", label: "Media", icon: "image" },
                      ],
                    },
                    {
                      title: "Settings",
                      items: [
                        { id: "general", label: "General", icon: "settings" },
                        { id: "security", label: "Security", icon: "shield" },
                      ],
                    },
                  ]}
                />
              </div>
            </Stack>
          </Stack>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Accessibility"
        description="FlowSidebar uses semantic navigation with keyboard support and ARIA labels."
      >
        <DemoGroup>
          <Callout intent="info">
            FlowSidebar renders with role=&apos;navigation&apos; and aria-label=&apos;Sidebar&apos;. Active item has
            aria-current=&apos;page&apos;. Section headers use proper heading levels for structure. Keyboard
            navigation: Tab to focus items, Enter/Space to activate, Arrow Up/Down to navigate
            between items. Desktop-only — mobile users should use FlowBottomNav.
          </Callout>
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

export function FlowSidebarVariants() {
  return (
    <Stack gap="subsection">
      <DemoSection
        title="With Sections"
        description="Group sidebar items into collapsible sections."
      >
        <DemoGroup>
          <div className="demo-sidebar-frame">
            <FlowSidebar
              activeItem="dashboard"
              onItemClick={() => {}}
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
            />
          </div>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Accessibility"
        description="FlowSidebar uses semantic navigation with keyboard support and ARIA labels."
      >
        <DemoGroup>
          <Callout intent="info">
            FlowSidebar renders with role=&apos;navigation&apos; and aria-label=&apos;Sidebar&apos;. Active item has
            aria-current=&apos;page&apos;. Section headers use proper heading levels for structure. Keyboard
            navigation: Tab to focus items, Enter/Space to activate, Arrow Up/Down to navigate
            between items. Desktop-only — mobile users should use FlowBottomNav.
          </Callout>
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}
