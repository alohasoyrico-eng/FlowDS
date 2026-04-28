/**
 * FLOW — Pattern Registry
 * Per-pattern data + composition demos + usage examples.
 *
 * Key format: "category/pattern-slug"
 *   e.g. "feedback/empty-state"
 *
 * Each entry owns: spec metadata, composition breakdown, usage demos, and API documentation.
 * Patterns are L4 — they orchestrate multiple L3 components.
 */
import React, { type ReactNode, useState } from "react";

import type { PlaygroundConfig } from "../../components/prop-playground";
import {
  FlowAdvancedFilters,
  FlowBadge,
  FlowButton,
  FlowCalendarView,
  FlowChartWrapper,
  FlowChip,
  FlowColumnConfigurator,
  FlowDataTable,
  FlowDragSortableList,
  FlowTransferList,
  FlowVirtualDataTable,
  Inline,
  type SortableItem,
  Stack,
  Surface,
  Text,
  type TransferItem,
  type VirtualDataTableColumn,
} from "@flow/design-system";
import { DemoGroup, DemoSection } from "../../components/demo-helpers";
export type { PropEntry, GuidelineEntry } from "../../components/doc-primitives";
import { DocList } from "../../components/doc-primitives";
import type { AccessibilitySpec, AnatomyEntry } from "../registry/types";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Types
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export type { AccessibilitySpec, AnatomyEntry };

export interface PatternSpec {
  name: string;
  purpose: string;
  platform: "shared" | "desktop" | "mobile";
  /** L3 components this pattern composes/orchestrates */
  composesL3: string[];
  /** Behavioral orchestrations this pattern owns */
  orchestrates: string[];
  /** What this pattern delegates to lower layers */
  doesNotOwn?: string[];
  /** Anatomy breakdown (optional, gold standard) */
  anatomy?: AnatomyEntry[];
  /** Variant descriptions (optional, gold standard) */
  variants?: string[];
  /** State list (optional, gold standard) */
  states?: string[];
  /** Accessibility spec (optional, gold standard) */
  accessibility?: AccessibilitySpec;
  /** Source file (deprecated field, kept for migration) */
  source?: string;
}

export interface CompositionEntry {
  component: string;
  role: string;
  tokens?: string[];
}

export interface PatternDeveloperGuide {
  reactImport: string;
  reactUsage: string;
  flutterImport: string;
  flutterUsage: string;
  /** Structured props/API reference table */
  props?: PropEntry[];
  /** Structured guidelines — rendered as bullet list with intent icons */
  guidelines?: GuidelineEntry[];
}

export interface PatternEntry {
  category: string;
  spec: PatternSpec;
  /** Visual composition breakdown */
  composition?: CompositionEntry[];
  demos: {
    overview?: (ctx?: { patternName: string }) => ReactNode;
    variants?: (ctx?: { patternName: string }) => ReactNode;
    useCases?: (ctx?: { patternName: string }) => ReactNode;
  };
  developer: PatternDeveloperGuide;
  playground?: PlaygroundConfig;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Helper imports for prop table types
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import type { GuidelineEntry, PropEntry } from "../../components/doc-primitives";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// DATA PATTERNS — Demo Functions
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function DataTableOverviewDemo() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [sortInfo, setSortInfo] = useState<string>("");

  const columns = [
    { key: "name", label: "Name", sortable: true },
    { key: "role", label: "Role", sortable: true },
    { key: "department", label: "Department", sortable: true },
    { key: "status", label: "Status", sortable: true },
  ];

  const data = [
    { id: "1", name: "Alice Johnson", role: "Designer", department: "Product", status: "Active" },
    { id: "2", name: "Bob Smith", role: "Developer", department: "Engineering", status: "Active" },
    { id: "3", name: "Carol Williams", role: "Manager", department: "Product", status: "Inactive" },
    {
      id: "4",
      name: "David Brown",
      role: "Developer",
      department: "Engineering",
      status: "Active",
    },
    { id: "5", name: "Eva Davis", role: "Designer", department: "Product", status: "Active" },
  ];

  const handleSort = (key: string, direction: "asc" | "desc") => {
    setSortInfo(`Sorted by ${key} (${direction})`);
  };

  return (
    <Stack gap={6}>
      <DemoSection
        title="Basic Data Table"
        description="Table with sorting, selection, and row actions. Click column headers to sort, checkboxes to select rows."
      >
        <DemoGroup>
          <FlowDataTable
            columns={columns}
            data={data}
            selectable={true}
            selectedKeys={new Set(selectedIds)}
            onSelectionChange={(keys) =>
              setSelectedIds(Array.isArray(keys) ? keys : Array.from(keys))
            }
            onSort={handleSort}
            onRowAction={(rowId, action) => console.log(`Action ${action} on row ${rowId}`)}
          />
        </DemoGroup>
      </DemoSection>

      <DemoSection title="Table Features" description="Key capabilities of the Data Table pattern.">
        <DemoGroup>
          <Stack gap={2}>
            <Surface variant="secondary" padding="container">
              <Stack gap={2}>
                <Text variant="label-s">Core Features:</Text>
                <DocList
                  items={[
                    "Column sorting - Click headers to sort data",
                    "Row selection - Checkboxes for individual/multi-select",
                    "Row actions - Context menu for each row",
                    "Responsive design - Horizontal scroll on small screens",
                    "Accessible - Keyboard navigation and screen reader support",
                  ]}
                />
              </Stack>
            </Surface>
            {sortInfo && (
              <Surface variant="accent" padding="container">
                <Text variant="caption" color="accent">
                  {sortInfo}
                </Text>
              </Surface>
            )}
            {selectedIds.length > 0 && (
              <Surface variant="primary" padding="container">
                <Text variant="caption">
                  Selected {selectedIds.length} row{selectedIds.length > 1 ? "s" : ""}:{" "}
                  {selectedIds.join(", ")}
                </Text>
              </Surface>
            )}
          </Stack>
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

function DataTableUseCasesDemo() {
  const [activeCase, setActiveCase] = useState<string>("users");

  const cases = {
    users: {
      title: "User Management",
      columns: [
        { key: "name", label: "Name", sortable: true },
        { key: "email", label: "Email", sortable: true },
        { key: "role", label: "Role", sortable: true },
        { key: "lastLogin", label: "Last Login", sortable: true },
      ],
      data: [
        {
          id: "1",
          name: "Alice Johnson",
          email: "alice@company.com",
          role: "Admin",
          lastLogin: "2024-03-20",
        },
        {
          id: "2",
          name: "Bob Smith",
          email: "bob@company.com",
          role: "User",
          lastLogin: "2024-03-19",
        },
        {
          id: "3",
          name: "Carol Williams",
          email: "carol@company.com",
          role: "Editor",
          lastLogin: "2024-03-18",
        },
        {
          id: "4",
          name: "David Brown",
          email: "david@company.com",
          role: "User",
          lastLogin: "2024-03-17",
        },
      ],
    },
    products: {
      title: "Product Catalog",
      columns: [
        { key: "name", label: "Product", sortable: true },
        { key: "category", label: "Category", sortable: true },
        { key: "price", label: "Price", sortable: true },
        { key: "stock", label: "Stock", sortable: true },
      ],
      data: [
        { id: "1", name: "Laptop Pro", category: "Electronics", price: "$1,299", stock: "12" },
        { id: "2", name: "Wireless Mouse", category: "Accessories", price: "$29", stock: "45" },
        { id: "3", name: "Monitor 4K", category: "Electronics", price: "$399", stock: "8" },
        { id: "4", name: "Keyboard RGB", category: "Accessories", price: "$89", stock: "23" },
      ],
    },
    orders: {
      title: "Order History",
      columns: [
        { key: "orderId", label: "Order ID", sortable: true },
        { key: "customer", label: "Customer", sortable: true },
        { key: "date", label: "Date", sortable: true },
        { key: "total", label: "Total", sortable: true },
      ],
      data: [
        {
          id: "1",
          orderId: "#1001",
          customer: "Alice Johnson",
          date: "2024-03-20",
          total: "$1,299",
        },
        { id: "2", orderId: "#1002", customer: "Bob Smith", date: "2024-03-19", total: "$29" },
        {
          id: "3",
          orderId: "#1003",
          customer: "Carol Williams",
          date: "2024-03-18",
          total: "$399",
        },
        { id: "4", orderId: "#1004", customer: "David Brown", date: "2024-03-17", total: "$89" },
      ],
    },
  };

  const currentCase = cases[activeCase as keyof typeof cases];

  return (
    <Stack gap={4}>
      <Inline gap={2} wrap>
        {Object.keys(cases).map((key) => (
          <FlowChip
            key={key}
            variant={activeCase === key ? "tonal" : "filled"}
            onClick={() => setActiveCase(key)}
          >
            {cases[key as keyof typeof cases].title}
          </FlowChip>
        ))}
      </Inline>

      <DemoSection
        title={currentCase.title}
        description={`Data table for ${activeCase} management with relevant columns and data types.`}
      >
        <DemoGroup>
          <FlowDataTable
            columns={
              currentCase.columns as Array<{ key: string; label: string; sortable?: boolean }>
            }
            data={currentCase.data as Array<Record<string, string>>}
            selectable={true}
            onRowAction={(rowId: string, action: string) =>
              console.log(`Action ${action} on ${activeCase} row ${rowId}`)
            }
          />
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// VIRTUAL DATA TABLE DEMOS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function VirtualDataTableOverviewDemo() {
  // Generate large dataset for virtualization demo
  const generateLargeDataset = (count: number) => {
    return Array.from({ length: count }, (_, i) => ({
      id: `user-${i + 1}`,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      role: ["Admin", "User", "Editor", "Viewer"][i % 4],
      department: ["Engineering", "Product", "Design", "Marketing"][i % 4],
      lastLogin: new Date(
        Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000,
      ).toLocaleDateString(),
    }));
  };

  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());

  const columns: VirtualDataTableColumn<Record<string, unknown>>[] = [
    {
      key: "name",
      header: "Name",
      width: "150px",
      sortable: true,
      render: (row) => <Text variant="paragraph-s">{row.name as string}</Text>,
    },
    {
      key: "email",
      header: "Email",
      width: "200px",
      sortable: true,
      render: (row) => (
        <Text variant="paragraph-s" color="secondary">
          {row.email as string}
        </Text>
      ),
    },
    {
      key: "role",
      header: "Role",
      width: "100px",
      sortable: true,
      render: (row) => <FlowBadge status="neutral">{row.role as string}</FlowBadge>,
    },
    {
      key: "department",
      header: "Department",
      width: "120px",
      sortable: true,
      render: (row) => <Text variant="paragraph-s">{row.department as string}</Text>,
    },
    {
      key: "lastLogin",
      header: "Last Login",
      width: "120px",
      sortable: true,
      render: (row) => (
        <Text variant="caption" color="secondary">
          {row.lastLogin as string}
        </Text>
      ),
    },
  ];

  const data = generateLargeDataset(10000); // 10K rows for virtualization demo

  return (
    <Stack gap={6}>
      <DemoSection
        title="Virtual Data Table"
        description="High-performance table with virtualized scrolling for large datasets. Only renders visible rows."
      >
        <DemoGroup>
          <Stack gap={3}>
            <Surface variant="secondary" padding="container">
              <Stack gap={2}>
                <Text variant="label-s">Performance Features:</Text>
                <DocList
                  items={[
                    "Virtual scrolling - Only renders visible rows",
                    "Fixed row heights for consistent performance",
                    "Overscan buffer for smooth scrolling",
                    "Handles 10K+ rows without performance degradation",
                  ]}
                />
              </Stack>
            </Surface>

            <FlowVirtualDataTable
              columns={columns}
              data={data}
              rowKey={(row) => row.id}
              height={400}
              selectable={true}
              selectedKeys={selectedKeys}
              onSelectionChange={setSelectedKeys}
              searchable={true}
              searchPlaceholder="Search users..."
              striped={true}
              hoverable={true}
            />

            <Surface variant="primary" padding="container">
              <Text variant="caption">
                Dataset: {data.length.toLocaleString()} rows • Selected: {selectedKeys.size} rows
              </Text>
            </Surface>
          </Stack>
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

function VirtualDataTableUseCasesDemo() {
  const [activeCase, setActiveCase] = useState<string>("logs");

  const cases = {
    logs: {
      title: "System Logs",
      generateData: (count: number) =>
        Array.from({ length: count }, (_, i) => ({
          id: `log-${i + 1}`,
          timestamp: new Date(Date.now() - i * 60000).toLocaleString(),
          level: ["INFO", "WARN", "ERROR", "DEBUG"][i % 4],
          message: `Log message ${i + 1} - ${["User action", "System event", "API call", "Background task"][i % 4]}`,
          source: ["web", "api", "worker", "db"][i % 4],
        })),
      columns: [
        { key: "timestamp", header: "Time", width: "180px" },
        { key: "level", header: "Level", width: "80px" },
        { key: "message", header: "Message", width: "300px" },
        { key: "source", header: "Source", width: "100px" },
      ],
    },
    transactions: {
      title: "Financial Transactions",
      generateData: (count: number) =>
        Array.from({ length: count }, (_, i) => ({
          id: `txn-${i + 1}`,
          date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString(),
          amount: (Math.random() * 1000 - 500).toFixed(2),
          type: ["Credit", "Debit", "Transfer"][i % 3],
          description: `Transaction ${i + 1}`,
          status: ["Completed", "Pending", "Failed"][i % 3],
        })),
      columns: [
        { key: "date", header: "Date", width: "120px" },
        { key: "description", header: "Description", width: "200px" },
        { key: "type", header: "Type", width: "100px" },
        { key: "amount", header: "Amount", width: "100px" },
        { key: "status", header: "Status", width: "100px" },
      ],
    },
    inventory: {
      title: "Inventory Items",
      generateData: (count: number) =>
        Array.from({ length: count }, (_, i) => ({
          id: `item-${i + 1}`,
          sku: `SKU-${String(i + 1).padStart(6, "0")}`,
          name: `Product ${i + 1}`,
          category: ["Electronics", "Clothing", "Books", "Home"][i % 4],
          stock: Math.floor(Math.random() * 1000),
          price: (Math.random() * 500 + 10).toFixed(2),
          location: `Warehouse ${String.fromCharCode(65 + (i % 5))}`,
        })),
      columns: [
        { key: "sku", header: "SKU", width: "120px" },
        { key: "name", header: "Product", width: "200px" },
        { key: "category", header: "Category", width: "120px" },
        { key: "stock", header: "Stock", width: "80px" },
        { key: "price", header: "Price", width: "80px" },
        { key: "location", header: "Location", width: "120px" },
      ],
    },
  };

  const currentCase = cases[activeCase as keyof typeof cases];
  const data = currentCase.generateData(5000); // 5K rows for demo

  const columns: VirtualDataTableColumn<Record<string, unknown>>[] = currentCase.columns.map(
    (col) => ({
      key: col.key,
      header: col.header,
      width: col.width,
      sortable: true,
      render: (row) => {
        if (col.key === "level") {
          const colors: Record<string, "neutral" | "warning" | "error"> = {
            INFO: "neutral",
            WARN: "warning",
            ERROR: "error",
            DEBUG: "neutral",
          };
          return (
            <FlowBadge status={colors[row.level as string] || "neutral"}>
              {row.level as string}
            </FlowBadge>
          );
        }
        if (col.key === "amount") {
          return (
            <Text
              variant="paragraph-s"
              style={{
                color: (row.amount as string).startsWith("-")
                  ? "var(--sys-energy-text-error)"
                  : "var(--sys-energy-text-success)",
              }}
            >
              ${row.amount as string}
            </Text>
          );
        }
        if (col.key === "status") {
          const variants: Record<string, "success" | "warning" | "error"> = {
            Completed: "success",
            Pending: "warning",
            Failed: "error",
          };
          return (
            <FlowBadge status={variants[row.status as string] || "neutral"}>
              {row.status as string}
            </FlowBadge>
          );
        }
        return <Text variant="paragraph-s">{row[col.key] as string}</Text>;
      },
    }),
  );

  return (
    <Stack gap={4}>
      <Inline gap={2} wrap>
        {Object.keys(cases).map((key) => (
          <FlowChip
            key={key}
            variant={activeCase === key ? "tonal" : "filled"}
            onClick={() => setActiveCase(key)}
          >
            {cases[key as keyof typeof cases].title}
          </FlowChip>
        ))}
      </Inline>

      <DemoSection
        title={currentCase.title}
        description={`Virtual table for ${activeCase} data with ${data.length.toLocaleString()} records.`}
      >
        <DemoGroup>
          <FlowVirtualDataTable
            columns={columns}
            data={data}
            rowKey={(row) => row.id as string}
            height={400}
            selectable={true}
            searchable={true}
            searchPlaceholder={`Search ${activeCase}...`}
            striped={true}
            hoverable={true}
          />
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TRANSFER LIST DEMOS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function TransferListOverviewDemo() {
  const [selectedIds, setSelectedIds] = useState<string[]>(["user-2", "user-4"]);

  const items: TransferItem[] = [
    { id: "user-1", label: "Alice Johnson" },
    { id: "user-2", label: "Bob Smith" },
    { id: "user-3", label: "Carol Williams" },
    { id: "user-4", label: "David Brown" },
    { id: "user-5", label: "Eva Davis" },
    { id: "user-6", label: "Frank Miller" },
    { id: "user-7", label: "Grace Lee" },
    { id: "user-8", label: "Henry Wilson" },
  ];

  return (
    <Stack gap={6}>
      <DemoSection
        title="Transfer List"
        description="Dual-list pattern for moving items between available and selected lists. Supports search and bulk operations."
      >
        <DemoGroup>
          <Stack gap={3}>
            <FlowTransferList
              sourceTitle="Available Users"
              targetTitle="Selected Team"
              items={items}
              defaultTargetIds={selectedIds}
              onChange={setSelectedIds}
              searchable={true}
            />

            <Surface variant="primary" padding="container">
              <Text variant="caption">
                Selected: {selectedIds.length} users • Available:{" "}
                {items.length - selectedIds.length} users
              </Text>
            </Surface>
          </Stack>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Transfer List Features"
        description="Key capabilities of the Transfer List pattern."
      >
        <DemoGroup>
          <Stack gap={2}>
            <Surface variant="secondary" padding="container">
              <Stack gap={2}>
                <Text variant="label-s">Core Features:</Text>
                <DocList
                  items={[
                    "Dual-list interface - Available vs Selected",
                    "Individual item transfer - Click arrows to move",
                    "Bulk operations - Move all or selected items",
                    "Search filtering - Find items in both lists",
                    "Selection state - Visual feedback for selected items",
                  ]}
                />
              </Stack>
            </Surface>
          </Stack>
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

function TransferListUseCasesDemo() {
  const [activeCase, setActiveCase] = useState<string>("permissions");

  const cases = {
    permissions: {
      title: "User Permissions",
      sourceTitle: "Available Permissions",
      targetTitle: "Granted Permissions",
      items: [
        { id: "read", label: "Read Documents" },
        { id: "write", label: "Edit Documents" },
        { id: "delete", label: "Delete Documents" },
        { id: "share", label: "Share Documents" },
        { id: "admin", label: "Admin Access" },
        { id: "export", label: "Export Data" },
        { id: "import", label: "Import Data" },
        { id: "audit", label: "View Audit Logs" },
      ],
      defaultSelected: ["read", "write"],
    },
    features: {
      title: "Feature Selection",
      sourceTitle: "Available Features",
      targetTitle: "Enabled Features",
      items: [
        { id: "dashboard", label: "Analytics Dashboard" },
        { id: "reports", label: "Custom Reports" },
        { id: "notifications", label: "Email Notifications" },
        { id: "api", label: "API Access" },
        { id: "mobile", label: "Mobile App" },
        { id: "integrations", label: "Third-party Integrations" },
        { id: "support", label: "Priority Support" },
        { id: "training", label: "Training Sessions" },
      ],
      defaultSelected: ["dashboard", "notifications"],
    },
    tags: {
      title: "Content Tagging",
      sourceTitle: "Available Tags",
      targetTitle: "Applied Tags",
      items: [
        { id: "urgent", label: "Urgent" },
        { id: "important", label: "Important" },
        { id: "review", label: "Needs Review" },
        { id: "draft", label: "Draft" },
        { id: "published", label: "Published" },
        { id: "archived", label: "Archived" },
        { id: "featured", label: "Featured" },
        { id: "trending", label: "Trending" },
      ],
      defaultSelected: ["important", "review"],
    },
  };

  const currentCase = cases[activeCase as keyof typeof cases];
  const [selectedIds, setSelectedIds] = useState<string[]>(currentCase.defaultSelected);

  return (
    <Stack gap={4}>
      <Inline gap={2} wrap>
        {Object.keys(cases).map((key) => (
          <FlowChip
            key={key}
            variant={activeCase === key ? "tonal" : "filled"}
            onClick={() => {
              setActiveCase(key);
              setSelectedIds(cases[key as keyof typeof cases].defaultSelected);
            }}
          >
            {cases[key as keyof typeof cases].title}
          </FlowChip>
        ))}
      </Inline>

      <DemoSection
        title={currentCase.title}
        description={`Transfer list for ${activeCase} management with search and bulk operations.`}
      >
        <DemoGroup>
          <FlowTransferList
            sourceTitle={currentCase.sourceTitle}
            targetTitle={currentCase.targetTitle}
            items={currentCase.items}
            defaultTargetIds={selectedIds}
            onChange={setSelectedIds}
            searchable={true}
          />
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// DRAG SORTABLE LIST DEMOS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function DragSortableListOverviewDemo() {
  const [items, setItems] = useState<SortableItem[]>([
    { id: "1", content: <Text variant="body-s">Dashboard</Text> },
    { id: "2", content: <Text variant="body-s">Analytics</Text> },
    { id: "3", content: <Text variant="body-s">Reports</Text> },
    { id: "4", content: <Text variant="body-s">Settings</Text> },
    { id: "5", content: <Text variant="body-s">Help</Text> },
  ]);

  return (
    <Stack gap={6}>
      <DemoSection
        title="Drag Sortable List"
        description="List with drag-and-drop reordering. Drag items by their handle or use keyboard shortcuts (Alt+Arrow keys)."
      >
        <DemoGroup>
          <Stack gap={3}>
            <Surface variant="secondary" padding="container">
              <Text variant="label-s">
                Instructions: Drag items by the handle (⋮⋮) or use Alt+↑/↓ keys to reorder
              </Text>
            </Surface>

            <FlowDragSortableList
              items={items}
              onReorder={setItems}
              handle={true}
              size="md"
              aria-label="Navigation menu items"
            />

            <Surface variant="primary" padding="container">
              <Text variant="caption">Order: {items.map((item) => item.content).join(" → ")}</Text>
            </Surface>
          </Stack>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Drag Sortable Features"
        description="Key capabilities of the Drag Sortable List pattern."
      >
        <DemoGroup>
          <Stack gap={2}>
            <Surface variant="secondary" padding="container">
              <Stack gap={2}>
                <Text variant="label-s">Core Features:</Text>
                <DocList
                  items={[
                    "Drag handles - Visual grip for dragging",
                    "Drop zone indicators - Visual feedback during drag",
                    "Keyboard navigation - Alt+Arrow keys for reordering",
                    "Smooth animations - Visual feedback during reorder",
                    "Accessibility - Screen reader and keyboard support",
                  ]}
                />
              </Stack>
            </Surface>
          </Stack>
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

function DragSortableListUseCasesDemo() {
  const [activeCase, setActiveCase] = useState<string>("menu");

  const cases = {
    menu: {
      title: "Navigation Menu",
      items: [
        { id: "dashboard", content: <Text variant="body-s">📊 Dashboard</Text> },
        { id: "analytics", content: <Text variant="body-s">📈 Analytics</Text> },
        { id: "reports", content: <Text variant="body-s">📋 Reports</Text> },
        { id: "settings", content: <Text variant="body-s">⚙️ Settings</Text> },
        { id: "help", content: <Text variant="body-s">❓ Help</Text> },
      ],
    },
    tasks: {
      title: "Task Priority",
      items: [
        {
          id: "urgent",
          content: (
            <Inline gap={2} align="center">
              <FlowBadge status="error">High</FlowBadge>
              <Text variant="body-s">Fix critical bug</Text>
            </Inline>
          ),
        },
        {
          id: "important",
          content: (
            <Inline gap={2} align="center">
              <FlowBadge status="warning">Medium</FlowBadge>
              <Text variant="body-s">Update documentation</Text>
            </Inline>
          ),
        },
        {
          id: "normal",
          content: (
            <Inline gap={2} align="center">
              <FlowBadge status="neutral">Low</FlowBadge>
              <Text variant="body-s">Code cleanup</Text>
            </Inline>
          ),
        },
        {
          id: "backlog",
          content: (
            <Inline gap={2} align="center">
              <FlowBadge status="neutral">Backlog</FlowBadge>
              <Text variant="body-s">Future enhancements</Text>
            </Inline>
          ),
        },
      ],
    },
    columns: {
      title: "Table Columns",
      items: [
        { id: "name", content: <Text variant="body-s">Name (required)</Text> },
        { id: "email", content: <Text variant="body-s">Email</Text> },
        { id: "role", content: <Text variant="body-s">Role</Text> },
        { id: "department", content: <Text variant="body-s">Department</Text> },
        { id: "status", content: <Text variant="body-s">Status</Text> },
        { id: "lastLogin", content: <Text variant="body-s">Last Login</Text> },
      ],
    },
  };

  const currentCase = cases[activeCase as keyof typeof cases];
  const [items, setItems] = useState<SortableItem[]>(currentCase.items);

  // Update items when case changes
  const [prevActiveCase, setPrevActiveCase] = React.useState(activeCase);
  if (activeCase !== prevActiveCase) {
    setPrevActiveCase(activeCase);
    setItems(currentCase.items);
  }

  return (
    <Stack gap={4}>
      <Inline gap={2} wrap>
        {Object.keys(cases).map((key) => (
          <FlowChip
            key={key}
            variant={activeCase === key ? "tonal" : "filled"}
            onClick={() => setActiveCase(key)}
          >
            {cases[key as keyof typeof cases].title}
          </FlowChip>
        ))}
      </Inline>

      <DemoSection
        title={currentCase.title}
        description={`Drag and drop to reorder ${activeCase} items. Use the handle or Alt+Arrow keys.`}
      >
        <DemoGroup>
          <FlowDragSortableList
            items={items}
            onReorder={setItems}
            handle={true}
            size="md"
            aria-label={`${activeCase} items list`}
          />
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// DATA PATTERNS REGISTRY
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// ── FlowDataTable ──

const dataTableEntry: PatternEntry = {
  category: "data-patterns",
  spec: {
    name: "Data Table",
    purpose:
      "Full-featured data table with sorting, filtering, pagination, row selection, search, and toolbar actions.",
    platform: "desktop",
    composesL3: [
      "FlowTable",
      "FlowSortControl",
      "FlowSearch",
      "FlowPagination",
      "FlowCheckbox",
      "FlowToolbar",
    ],
    orchestrates: [
      "Client-side sort with custom comparators",
      "Column-level filtering",
      "Pagination state management",
      "Row selection (single/multi/range)",
      "Global text search across all columns",
      "Toolbar action context based on selection",
    ],
    accessibility: {
      handled: [
        "Semantic <table> with <thead>/<tbody> structure",
        "Column sort buttons have aria-sort attribute",
        "Row selection checkboxes have aria-label",
        "Pagination controls are keyboard accessible",
        "Search input has associated label",
      ],
      required: [
        "Provide aria-label on the table describing its data",
        "Ensure column headers are descriptive",
      ],
      keyboard: [
        {
          key: "Tab",
          action: "Move between interactive elements (search, sort, rows, pagination)",
        },
        { key: "Enter", action: "Activate sort on focused column header" },
        { key: "Space", action: "Toggle row selection checkbox" },
        { key: "← → Arrow keys", action: "Navigate pagination pages" },
      ],
      wcag: ["1.3.1", "2.1.1", "4.1.2"],
    },
  },
  composition: [
    { component: "FlowTable", role: "Core table structure", tokens: [] },
    { component: "FlowSortControl", role: "Column sorting controls", tokens: [] },
    { component: "FlowSearch", role: "Global search input", tokens: [] },
    { component: "FlowPagination", role: "Page navigation", tokens: [] },
    { component: "FlowCheckbox", role: "Row selection checkboxes", tokens: [] },
    { component: "FlowToolbar", role: "Action toolbar", tokens: [] },
  ],
  demos: {
    overview: DataTableOverviewDemo,
    useCases: DataTableUseCasesDemo,
  },
  developer: {
    reactImport: `import { FlowDataTable } from "@flow/design-system";`,
    reactUsage: `<FlowDataTable
  columns={columns}
  data={data}
  searchable
  selectable
  sortable
/>`,
    flutterImport: `import 'package:flow/patterns/data_table.dart';`,
    flutterUsage: `FlowDataTable(
  columns: columns,
  data: data,
  searchable: true,
  selectable: true,
  sortable: true,
)`,
    props: [
      {
        name: "columns",
        type: "Column[]",
        required: true,
        description: "Table column definitions.",
      },
      { name: "data", type: "any[]", required: true, description: "Table data rows." },
      {
        name: "searchable",
        type: "boolean",
        required: false,
        defaultValue: "false",
        description: "Enable global search.",
      },
      {
        name: "selectable",
        type: "boolean",
        required: false,
        defaultValue: "false",
        description: "Enable row selection.",
      },
      {
        name: "sortable",
        type: "boolean",
        required: false,
        defaultValue: "false",
        description: "Enable column sorting.",
      },
    ],
    guidelines: [
      { type: "do", text: "Use for structured data display." },
      { type: "do", text: "Enable sorting and filtering for usability." },
      { type: "dont", text: "Don't use for very large datasets (>10K rows)." },
    ],
  },
  playground: {
    renderPreview: (props: Record<string, unknown>) =>
      React.createElement(FlowDataTable, {
        columns: props.columns,
        data: props.data,
        hoverable: (props.hoverable as boolean) ?? true,
        striped: (props.striped as boolean) ?? false,
        size: (props.size as string) ?? "md",
      } as unknown as React.ComponentProps<typeof FlowDataTable>),
    defaults: { hoverable: true, striped: false, size: "md" },
    fixtures: {
      columns: [
        { key: "name", label: "Name" },
        { key: "role", label: "Role" },
        { key: "status", label: "Status" },
      ],
      data: [
        { name: "Alice Johnson", role: "Designer", status: "Active" },
        { name: "Bob Smith", role: "Engineer", status: "Active" },
        { name: "Carol Williams", role: "Manager", status: "Away" },
      ],
    },
    excludeControls: ["columns", "data", "onRowClick", "onSort", "className", "style"],
  },
};

// ── FlowVirtualDataTable ──

const virtualDataTableEntry: PatternEntry = {
  category: "data-patterns",
  spec: {
    name: "Virtual Data Table",
    purpose:
      "High-performance data table with virtualized scrolling for large datasets (10K+ rows).",
    platform: "desktop",
    composesL3: ["FlowTable", "FlowSortControl", "FlowSearch", "FlowCheckbox"],
    orchestrates: [
      "Virtual scroll with overscan buffer",
      "Row height calculation per size variant",
      "Visible range computation from scroll position",
      "All DataTable features (sort, select, search)",
    ],
    accessibility: {
      handled: [
        "Semantic <table> structure preserved during virtual scroll",
        "aria-rowcount reflects total rows (not just visible)",
        "aria-rowindex on each visible row for position context",
        "Column sort buttons have aria-sort attribute",
      ],
      required: [
        "Provide aria-label on the table",
        "Set height prop for proper scroll container sizing",
      ],
      keyboard: [
        { key: "Tab", action: "Move between interactive elements" },
        { key: "↑ ↓ Arrow keys", action: "Scroll through virtualized rows" },
        { key: "Enter", action: "Activate sort on focused column" },
      ],
      wcag: ["1.3.1", "2.1.1", "4.1.2"],
    },
  },
  composition: [
    { component: "FlowTable", role: "Virtualized table structure", tokens: [] },
    { component: "FlowSortControl", role: "Column sorting controls", tokens: [] },
    { component: "FlowSearch", role: "Global search input", tokens: [] },
    { component: "FlowCheckbox", role: "Row selection checkboxes", tokens: [] },
  ],
  demos: {
    overview: VirtualDataTableOverviewDemo,
    useCases: VirtualDataTableUseCasesDemo,
  },
  developer: {
    reactImport: `import { FlowVirtualDataTable } from "@flow/design-system";`,
    reactUsage: `<FlowVirtualDataTable
  columns={columns}
  data={data}
  height={400}
/>`,
    flutterImport: `import 'package:flow/patterns/virtual_data_table.dart';`,
    flutterUsage: `FlowVirtualDataTable(
  columns: columns,
  data: data,
  height: 400,
)`,
    props: [
      {
        name: "columns",
        type: "Column[]",
        required: true,
        description: "Table column definitions.",
      },
      { name: "data", type: "any[]", required: true, description: "Table data rows." },
      { name: "height", type: "number", required: true, description: "Table height in pixels." },
    ],
    guidelines: [
      { type: "do", text: "Use for large datasets (>10K rows)." },
      { type: "do", text: "Set explicit height for virtualization." },
      { type: "dont", text: "Don't use for small datasets." },
    ],
  },
  playground: {
    renderPreview: (props: Record<string, unknown>) =>
      React.createElement(FlowVirtualDataTable, {
        columns: props.columns,
        data: props.data,
        rowHeight: (props.rowHeight as number) ?? 48,
        height: (props.height as number) ?? 300,
      } as unknown as React.ComponentProps<typeof FlowVirtualDataTable>),
    defaults: { rowHeight: 48, height: 300 },
    fixtures: {
      columns: [
        { key: "id", label: "ID", width: 80 },
        { key: "name", label: "Name", width: 200 },
        { key: "email", label: "Email", width: 250 },
      ],
      data: Array.from({ length: 50 }, (_, i) => ({ id: String(i + 1), name: `User ${i + 1}`, email: `user${i + 1}@example.com` })),
    },
    excludeControls: ["columns", "data", "onRowClick", "className", "style"],
  },
};

// ── FlowTransferList ──

const transferListEntry: PatternEntry = {
  category: "data-patterns",
  spec: {
    name: "Transfer List",
    purpose:
      "Dual-list pattern for moving items between 'available' and 'selected' lists with search and bulk actions.",
    platform: "shared",
    composesL3: ["FlowList", "FlowSearch", "FlowButton", "FlowCheckbox"],
    orchestrates: [
      "Dual-list state management",
      "Item transfer (single, bulk, all)",
      "Search filtering per list",
      "Selection state across lists",
    ],
    accessibility: {
      handled: [
        "Dual listboxes with role='listbox' and role='option'",
        "Transfer buttons have descriptive aria-labels",
        "Selection state reflected via aria-selected",
      ],
      required: ["Provide labels for both available and selected lists"],
      keyboard: [
        { key: "Tab", action: "Move focus between lists and transfer buttons" },
        { key: "↑ ↓ Arrow keys", action: "Navigate items within a list" },
        { key: "Space", action: "Select/deselect focused item" },
        { key: "Enter", action: "Transfer selected items" },
      ],
      wcag: ["2.1.1", "4.1.2"],
    },
  },
  composition: [
    { component: "FlowList", role: "Available and selected item lists", tokens: [] },
    { component: "FlowSearch", role: "Search within each list", tokens: [] },
    { component: "FlowButton", role: "Transfer action buttons", tokens: [] },
    { component: "FlowCheckbox", role: "Bulk selection checkboxes", tokens: [] },
  ],
  demos: {
    overview: TransferListOverviewDemo,
    useCases: TransferListUseCasesDemo,
  },
  developer: {
    reactImport: `import { FlowTransferList } from "@flow/design-system";`,
    reactUsage: `<FlowTransferList
  available={availableItems}
  selected={selectedItems}
  onChange={handleSelectionChange}
/>`,
    flutterImport: `import 'package:flow/patterns/transfer_list.dart';`,
    flutterUsage: `FlowTransferList(
  available: availableItems,
  selected: selectedItems,
  onChanged: handleSelectionChange,
)`,
    props: [
      {
        name: "available",
        type: "Item[]",
        required: true,
        description: "Available items to select from.",
      },
      {
        name: "selected",
        type: "Item[]",
        required: true,
        description: "Currently selected items.",
      },
      {
        name: "onChange",
        type: "(selected: Item[]) => void",
        required: true,
        description: "Selection change handler.",
      },
    ],
    guidelines: [
      { type: "do", text: "Use for multi-selection from large lists." },
      { type: "do", text: "Provide search in both lists." },
      { type: "dont", text: "Don't use for single selection." },
    ],
  },
  playground: {
    renderPreview: (props: Record<string, unknown>) =>
      React.createElement(FlowTransferList, {
        available: props.available,
        selected: props.selected,
        onTransfer: () => {},
        title: (props.title as string) ?? "Transfer Items",
      } as unknown as React.ComponentProps<typeof FlowTransferList>),
    defaults: { title: "Transfer Items" },
    fixtures: {
      available: [
        { id: "1", label: "Design" },
        { id: "2", label: "Engineering" },
        { id: "3", label: "Marketing" },
        { id: "4", label: "Sales" },
      ],
      selected: [
        { id: "5", label: "Support" },
      ],
    },
    excludeControls: ["available", "selected", "onTransfer", "className", "style"],
  },
};

// ── FlowDragSortableList ──

const dragSortableListEntry: PatternEntry = {
  category: "data-patterns",
  spec: {
    name: "Drag Sortable List",
    purpose:
      "List with drag-and-drop reordering. Items can be rearranged via drag handle or keyboard shortcuts.",
    platform: "shared",
    composesL3: ["FlowList", "FlowListItem", "FlowIcon"],
    orchestrates: [
      "Drag-and-drop reorder logic",
      "Drop zone calculation",
      "Keyboard reorder (Alt+Arrow)",
      "Animation during drag",
    ],
    accessibility: {
      handled: [
        "Items have role='listitem' within role='list'",
        "Drag handles have aria-roledescription='sortable'",
        "Live region announces position changes during reorder",
      ],
      required: ["Provide aria-label on the list container"],
      keyboard: [
        { key: "Tab", action: "Focus drag handle of each item" },
        { key: "Space", action: "Pick up / drop the focused item" },
        { key: "↑ ↓ Arrow keys", action: "Move grabbed item up or down" },
        { key: "Escape", action: "Cancel drag and restore original position" },
      ],
      wcag: ["2.1.1", "4.1.2"],
    },
  },
  composition: [
    { component: "FlowList", role: "Sortable list container", tokens: [] },
    { component: "FlowListItem", role: "Draggable list items", tokens: [] },
    { component: "FlowIcon", role: "Drag handle icon", tokens: ["--sys-energy-text-secondary"] },
  ],
  demos: {
    overview: DragSortableListOverviewDemo,
    useCases: DragSortableListUseCasesDemo,
  },
  developer: {
    reactImport: `import { FlowDragSortableList } from "@flow/design-system";`,
    reactUsage: `<FlowDragSortableList
  items={items}
  onReorder={handleReorder}
/>`,
    flutterImport: `import 'package:flow/patterns/drag_sortable_list.dart';`,
    flutterUsage: `FlowDragSortableList(
  items: items,
  onReorder: handleReorder,
)`,
    props: [
      { name: "items", type: "Item[]", required: true, description: "Sortable items." },
      {
        name: "onReorder",
        type: "(items: Item[]) => void",
        required: true,
        description: "Reorder handler.",
      },
    ],
    guidelines: [
      { type: "do", text: "Use for user-controlled ordering." },
      { type: "do", text: "Provide keyboard alternative." },
      { type: "dont", text: "Don't use for large lists (>50 items)." },
    ],
  },
  playground: {
    renderPreview: (props: Record<string, unknown>) =>
      React.createElement(FlowDragSortableList, {
        items: props.items,
        onReorder: () => {},
      } as unknown as React.ComponentProps<typeof FlowDragSortableList>),
    defaults: {},
    fixtures: {
      items: [
        { id: "1", label: "First item" },
        { id: "2", label: "Second item" },
        { id: "3", label: "Third item" },
        { id: "4", label: "Fourth item" },
      ],
    },
    excludeControls: ["items", "onReorder", "className", "style"],
  },
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ADVANCED FILTERS DEMOS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function AdvancedFiltersOverviewDemo() {
  const fields: Array<{ key: string; label: string; type: "text" | "number" | "select" | "date" }> = [
    { key: "name", label: "Name", type: "text" },
    { key: "age", label: "Age", type: "number" },
    { key: "department", label: "Department", type: "text" },
    { key: "joined", label: "Joined", type: "date" },
  ];

  const [filters, setFilters] = useState<
    Array<{ id: string; field: string; operator: string; value: string }>
  >([]);

  return (
    <Stack gap={6}>
      <DemoSection
        title="Advanced Filters"
        description="Build dynamic filter expressions with fields, operators y valores."
      >
        <DemoGroup>
          <FlowAdvancedFilters
            fields={fields}
            filters={filters}
            onFiltersChange={setFilters}
            onApply={() => console.log("filters applied", filters)}
            onClear={() => setFilters([])}
          />
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Filter State"
        description="Muestra el estado serializado de los filtros actuales para depuración."
      >
        <DemoGroup>
          <Surface variant="secondary" padding="container">
            <Text variant="paragraph-s">
              {filters.length > 0 ? JSON.stringify(filters, null, 2) : "No filters configured"}
            </Text>
          </Surface>
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

function AdvancedFiltersUseCasesDemo() {
  const [activeCase, setActiveCase] = useState<"users" | "products" | "orders">("users");

  const preset = {
    users: [
      { id: "f1", field: "department", operator: "equals", value: "Engineering" },
      { id: "f2", field: "age", operator: "gte", value: "30" },
    ],
    products: [
      { id: "f1", field: "name", operator: "contains", value: "Pro" },
      { id: "f2", field: "joined", operator: "before", value: "2025-01-01" },
    ],
    orders: [
      { id: "f1", field: "status", operator: "equals", value: "Pending" },
      { id: "f2", field: "age", operator: "gt", value: "0" },
    ],
  };

  const fields: Array<{ key: string; label: string; type: "text" | "number" | "select" | "date" }> = [
    { key: "name", label: "Name", type: "text" },
    { key: "status", label: "Status", type: "text" },
    { key: "age", label: "Age", type: "number" },
    { key: "joined", label: "Joined", type: "date" },
    { key: "department", label: "Department", type: "text" },
  ];

  const [filters, setFilters] = useState(preset[activeCase]);

  return (
    <Stack gap={4}>
      <Inline gap={2} wrap>
        {(Object.keys(preset) as Array<keyof typeof preset>).map((key) => (
          <FlowChip
            key={key}
            variant={activeCase === key ? "tonal" : "filled"}
            onClick={() => {
              setActiveCase(key);
              setFilters(preset[key]);
            }}
          >
            {key}
          </FlowChip>
        ))}
      </Inline>

      <DemoSection
        title="Preset Filters"
        description="Cambiar entre conjuntos de filtros predefinidos."
      >
        <DemoGroup>
          <FlowAdvancedFilters
            fields={fields}
            filters={filters}
            onFiltersChange={setFilters}
            onApply={() => console.log("applied", activeCase, filters)}
          />
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// COLUMN CONFIGURATOR DEMOS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function ColumnConfiguratorOverviewDemo() {
  const [columns, setColumns] = useState([
    { key: "name", label: "Name", visible: true },
    { key: "email", label: "Email", visible: true },
    { key: "role", label: "Role", visible: true },
    { key: "department", label: "Department", visible: true },
  ]);

  return (
    <Stack gap={6}>
      <DemoSection
        title="Column Configurator"
        description="Mostrar/ocultar y reordenar columnas de una tabla."
      >
        <DemoGroup>
          <Inline gap={2} align="center">
            <FlowColumnConfigurator columns={columns} onColumnsChange={setColumns} />
            <Text variant="caption">
              Visible:{" "}
              {columns
                .filter((c) => c.visible)
                .map((c) => c.label)
                .join(", ")}
            </Text>
          </Inline>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Example Data Table"
        description="Aplicar configuración al renderizado ficticio de columnas."
      >
        <DemoGroup>
          <FlowDataTable
            columns={columns
              .filter((c) => c.visible)
              .map((c) => ({ key: c.key, label: c.label, sortable: true }))}
            data={[
              {
                id: "1",
                name: "Alice",
                email: "alice@example.com",
                role: "Admin",
                department: "Engineering",
              },
              {
                id: "2",
                name: "Bob",
                email: "bob@example.com",
                role: "User",
                department: "Product",
              },
            ]}
          />
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

function ColumnConfiguratorUseCasesDemo() {
  const presets = {
    minimal: [
      { key: "name", label: "Name", visible: true },
      { key: "email", label: "Email", visible: true },
      { key: "role", label: "Role", visible: false },
      { key: "department", label: "Department", visible: false },
    ],
    standard: [
      { key: "name", label: "Name", visible: true },
      { key: "email", label: "Email", visible: true },
      { key: "role", label: "Role", visible: true },
      { key: "department", label: "Department", visible: true },
    ],
    analytics: [
      { key: "name", label: "Name", visible: true },
      { key: "email", label: "Email", visible: false },
      { key: "role", label: "Role", visible: true },
      { key: "department", label: "Department", visible: true },
    ],
  };

  const [activeCase, setActiveCase] = useState<keyof typeof presets>("standard");
  const [columns, setColumns] = useState(presets.standard);

  return (
    <Stack gap={4}>
      <Inline gap={2} wrap>
        {(Object.keys(presets) as Array<keyof typeof presets>).map((value) => (
          <FlowChip
            key={value}
            variant={activeCase === value ? "tonal" : "filled"}
            onClick={() => {
              setActiveCase(value);
              setColumns(presets[value]);
            }}
          >
            {value}
          </FlowChip>
        ))}
      </Inline>

      <DemoSection
        title="Preset column sets"
        description="Switch between diferentes configuraciones de columnas."
      >
        <DemoGroup>
          <FlowColumnConfigurator columns={columns} onColumnsChange={setColumns} />
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Result Table"
        description="Renderizado en la Table con columnas visibles."
      >
        <DemoGroup>
          <FlowDataTable
            columns={columns
              .filter((c) => c.visible)
              .map((c) => ({ key: c.key, label: c.label, sortable: true }))}
            data={[
              {
                id: "1",
                name: "Alice",
                email: "alice@example.com",
                role: "Admin",
                department: "Engineering",
              },
              {
                id: "2",
                name: "Bob",
                email: "bob@example.com",
                role: "User",
                department: "Product",
              },
            ]}
          />
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CALENDAR VIEW DEMOS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function CalendarViewOverviewDemo() {
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().slice(0, 10));
  const events = [
    { id: "e1", title: "Team Meeting", date: new Date().toISOString().slice(0, 10) },
    {
      id: "e2",
      title: "Release Review",
      date: new Date(new Date().setDate(new Date().getDate() + 3)).toISOString().slice(0, 10),
    },
    {
      id: "e3",
      title: "Sprint Planning",
      date: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().slice(0, 10),
    },
  ];

  return (
    <Stack gap={6}>
      <DemoSection
        title="Calendar View"
        description="Month calendar with event markers y selección de fecha."
      >
        <DemoGroup>
          <FlowCalendarView
            events={events}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            onEventClick={(event) => console.log("event click", event)}
          />
        </DemoGroup>
      </DemoSection>

      <DemoSection title="Selected date" description="Se muestra la fecha seleccionada.">
        <DemoGroup>
          <Surface variant="secondary" padding="container">
            <Text variant="caption">Fecha actual seleccionada: {selectedDate}</Text>
          </Surface>
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

function CalendarViewUseCasesDemo() {
  const [activeCase, setActiveCase] = useState<"work" | "events" | "holidays">("work");
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().slice(0, 10));

  const scenarios = {
    work: {
      title: "Work Calendar",
      events: [
        { id: "w1", title: "Stand-up", date: new Date().toISOString().slice(0, 10) },
        {
          id: "w2",
          title: "Demo",
          date: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString().slice(0, 10),
        },
      ],
    },
    events: {
      title: "Event Schedule",
      events: [
        {
          id: "e1",
          title: "Conference",
          date: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().slice(0, 10),
        },
        {
          id: "e2",
          title: "Webinar",
          date: new Date(new Date().setDate(new Date().getDate() + 5)).toISOString().slice(0, 10),
        },
      ],
    },
    holidays: {
      title: "Holidays",
      events: [
        { id: "h1", title: "New Year", date: "2026-01-01" },
        { id: "h2", title: "Labor Day", date: "2026-05-01" },
      ],
    },
  };

  const currentScenario = scenarios[activeCase];

  return (
    <Stack gap={4}>
      <Inline gap={2} wrap>
        {(Object.keys(scenarios) as Array<keyof typeof scenarios>).map((key) => (
          <FlowChip
            key={key}
            variant={activeCase === key ? "tonal" : "filled"}
            onClick={() => setActiveCase(key)}
          >
            {scenarios[key].title}
          </FlowChip>
        ))}
      </Inline>

      <DemoSection title={currentScenario.title} description="Muestra eventos en el calendario.">
        <DemoGroup>
          <FlowCalendarView
            events={currentScenario.events}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            onEventClick={(event) => console.log("event click", event)}
          />
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CHART WRAPPER DEMOS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function ChartWrapperOverviewDemo() {
  const data = [
    { label: "Jan", value: 30 },
    { label: "Feb", value: 45 },
    { label: "Mar", value: 28 },
    { label: "Apr", value: 60 },
    { label: "May", value: 51 },
  ];

  return (
    <Stack gap={6}>
      <DemoSection
        title="Chart Wrapper"
        description="Input container for charts con título, acciones y leyenda."
      >
        <DemoGroup>
          <FlowChartWrapper
            title="Sales Overview"
            subtitle="Q1-Q2"
            actions={
              <FlowButton size="sm" onClick={() => console.log("refresh chart")}>
                Refresh
              </FlowButton>
            }
            legend={
              <Inline gap={1}>
                <FlowBadge status="info">Revenue</FlowBadge>
                <FlowBadge>Target</FlowBadge>
              </Inline>
            }
            height={320}
          >
            <Surface variant="primary" padding="container">
              <Stack align="center" justify="center" style={{ minHeight: 240 }}>
                <Text variant="caption">[Insert chart component here] {data.length} points</Text>
              </Stack>
            </Surface>
          </FlowChartWrapper>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="Empty and Loading States"
        description="Controlled states for chart wrappers."
      >
        <DemoGroup>
          <Inline gap={2}>
            <FlowChartWrapper title="No Data" empty={true} emptyMessage="No metrics available" />
            <FlowChartWrapper title="Loading" loading={true} />
          </Inline>
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

function ChartWrapperUseCasesDemo() {
  const [variant, setVariant] = useState<"bar" | "line" | "pie">("bar");

  return (
    <Stack gap={4}>
      <Inline gap={2} wrap>
        {(["bar", "line", "pie"] as const).map((type) => (
          <FlowChip
            key={type}
            variant={variant === type ? "tonal" : "filled"}
            onClick={() => setVariant(type)}
          >
            {type}
          </FlowChip>
        ))}
      </Inline>
      <DemoSection
        title="Chart Variants"
        description={`Render chart wrapper for ${variant} chart.`}
      >
        <DemoGroup>
          <FlowChartWrapper
            title="Revenue"
            subtitle={`${variant.toUpperCase()} chart placeholder`}
            actions={<FlowButton size="sm">Export</FlowButton>}
          >
            <Surface variant="secondary" padding="container">
              <Stack align="center" justify="center" style={{ minHeight: 220 }}>
                <Text variant="caption">Chart type: {variant} (placeholder content)</Text>
              </Stack>
            </Surface>
          </FlowChartWrapper>
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// DATA PATTERNS REGISTRY
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const advancedFiltersEntry: PatternEntry = {
  category: "data-patterns",
  spec: {
    name: "Advanced Filters",
    purpose:
      "Complex filter builder with multiple conditions, operators, and grouping. Used alongside DataTable for server-side filtering.",
    platform: "desktop",
    composesL3: ["FlowSelect", "FlowTextInput", "FlowButton", "FlowIconButton", "Stack"],
    orchestrates: [
      "Filter condition CRUD",
      "Operator selection per field type",
      "AND/OR grouping logic",
      "Filter serialization for API calls",
      "Preset filter management",
    ],
    accessibility: {
      handled: [
        "Filter rows are grouped in a fieldset",
        "Add/remove buttons have descriptive aria-labels",
        "Field selects and value inputs have associated labels",
      ],
      required: ["Provide aria-label on the filter container"],
      keyboard: [
        { key: "Tab", action: "Move between filter fields, operators, values, and action buttons" },
        { key: "Enter", action: "Apply filters or add new filter row" },
        { key: "Escape", action: "Cancel and close filter panel" },
      ],
      wcag: ["2.1.1", "4.1.2"],
    },
  },
  composition: [
    { component: "FlowSelect", role: "Field and operator selectors", tokens: [] },
    { component: "FlowTextInput", role: "Value input fields", tokens: [] },
    { component: "FlowButton", role: "Add/remove condition buttons", tokens: [] },
    { component: "FlowIconButton", role: "Group/ungroup buttons", tokens: [] },
    {
      component: "Stack",
      role: "Filter condition layout",
      tokens: ["--sys-frame-gap-component", "--sys-frame-padding-*"],
    },
  ],
  demos: {
    overview: AdvancedFiltersOverviewDemo,
    useCases: AdvancedFiltersUseCasesDemo,
  },
  developer: {
    reactImport: `import { FlowAdvancedFilters } from "@flow/design-system";`,
    reactUsage: `<FlowAdvancedFilters
  fields={fields}
  filters={filters}
  onChange={handleFiltersChange}
/>`,
    flutterImport: `import 'package:flow/patterns/advanced_filters.dart';`,
    flutterUsage: `FlowAdvancedFilters(
  fields: fields,
  filters: filters,
  onChanged: handleFiltersChange,
)`,
    props: [
      {
        name: "fields",
        type: "Field[]",
        required: true,
        description: "Available filterable fields.",
      },
      {
        name: "filters",
        type: "Filter[]",
        required: true,
        description: "Current filter conditions.",
      },
      {
        name: "onChange",
        type: "(filters: Filter[]) => void",
        required: true,
        description: "Filter change handler.",
      },
    ],
    guidelines: [
      { type: "do", text: "Use for complex filtering needs." },
      { type: "do", text: "Support AND/OR logic." },
      { type: "dont", text: "Don't use for simple filters." },
    ],
  },
  playground: {
    renderPreview: (props: Record<string, unknown>) =>
      React.createElement(FlowAdvancedFilters, {
        fields: props.fields,
        onApply: () => {},
      } as unknown as React.ComponentProps<typeof FlowAdvancedFilters>),
    defaults: {},
    fixtures: {
      fields: [
        { key: "name", label: "Name", type: "text" },
        { key: "status", label: "Status", type: "select", options: ["Active", "Inactive"] },
        { key: "date", label: "Date", type: "date" },
      ],
    },
    excludeControls: ["fields", "onApply", "onClear", "value", "className", "style"],
  },
};

// ── FlowColumnConfigurator ──

const columnConfiguratorEntry: PatternEntry = {
  category: "data-patterns",
  spec: {
    name: "Column Configurator",
    purpose:
      "Column visibility and order management for DataTable. Drag to reorder, toggle to show/hide columns.",
    platform: "desktop",
    composesL3: ["FlowDragSortableList", "FlowSwitch", "FlowDialog", "FlowButton"],
    orchestrates: [
      "Column visibility toggling",
      "Column order drag-and-drop",
      "Reset to defaults",
      "Persistence of configuration",
    ],
    accessibility: {
      handled: [
        "Column toggles are checkboxes with labels",
        "Reorder handles have aria-roledescription='sortable'",
        "Live region announces column visibility changes",
      ],
      required: ["Provide aria-label describing the configurator purpose"],
      keyboard: [
        { key: "Tab", action: "Move between column toggles and reorder handles" },
        { key: "Space", action: "Toggle column visibility or pick up for reorder" },
        { key: "↑ ↓ Arrow keys", action: "Move grabbed column up or down" },
        { key: "Escape", action: "Cancel column reorder" },
      ],
      wcag: ["2.1.1", "4.1.2"],
    },
  },
  composition: [
    { component: "FlowDragSortableList", role: "Column order management", tokens: [] },
    { component: "FlowSwitch", role: "Visibility toggles", tokens: [] },
    { component: "FlowDialog", role: "Configuration modal", tokens: [] },
    { component: "FlowButton", role: "Apply/reset buttons", tokens: [] },
  ],
  demos: {
    overview: ColumnConfiguratorOverviewDemo,
    useCases: ColumnConfiguratorUseCasesDemo,
  },
  developer: {
    reactImport: `import { FlowColumnConfigurator } from "@flow/design-system";`,
    reactUsage: `<FlowColumnConfigurator
  columns={columns}
  onChange={handleColumnChange}
/>`,
    flutterImport: `import 'package:flow/patterns/column_configurator.dart';`,
    flutterUsage: `FlowColumnConfigurator(
  columns: columns,
  onChanged: handleColumnChange,
)`,
    props: [
      {
        name: "columns",
        type: "Column[]",
        required: true,
        description: "Table columns configuration.",
      },
      {
        name: "onChange",
        type: "(columns: Column[]) => void",
        required: true,
        description: "Column change handler.",
      },
    ],
    guidelines: [
      { type: "do", text: "Use with DataTable for customization." },
      { type: "do", text: "Allow drag-to-reorder." },
      { type: "dont", text: "Don't hide essential columns." },
    ],
  },
  playground: {
    renderPreview: (props: Record<string, unknown>) =>
      React.createElement(FlowColumnConfigurator, {
        columns: props.columns,
        onChange: () => {},
      } as unknown as React.ComponentProps<typeof FlowColumnConfigurator>),
    defaults: {},
    fixtures: {
      columns: [
        { key: "name", label: "Name", visible: true },
        { key: "email", label: "Email", visible: true },
        { key: "role", label: "Role", visible: false },
        { key: "status", label: "Status", visible: true },
      ],
    },
    excludeControls: ["columns", "onChange", "className", "style"],
  },
};

// ── FlowCalendarView ──

const calendarViewEntry: PatternEntry = {
  category: "data-patterns",
  spec: {
    name: "Calendar View",
    purpose:
      "Calendar-based event display with month/week/day views, event creation, and drag-to-reschedule.",
    platform: "shared",
    composesL3: ["Surface", "FlowButton", "FlowIconButton", "FlowPopover", "Text"],
    orchestrates: [
      "View mode switching (month/week/day)",
      "Event positioning in grid",
      "Event creation via click/drag",
      "Event detail popover",
      "Navigation between periods",
    ],
    accessibility: {
      handled: [
        "Calendar grid has role='grid' with proper row/cell structure",
        "Navigation buttons have aria-labels for month/year navigation",
        "Selected date announced via aria-selected",
        "Today's date marked with aria-current='date'",
      ],
      required: ["Provide aria-label on the calendar component"],
      keyboard: [
        { key: "← → Arrow keys", action: "Move focus between days in a week" },
        { key: "↑ ↓ Arrow keys", action: "Move focus between weeks" },
        { key: "Enter / Space", action: "Select the focused date" },
        { key: "Page Up / Page Down", action: "Navigate to previous/next month" },
        { key: "Home / End", action: "Jump to first/last day of the month" },
      ],
      wcag: ["1.3.1", "2.1.1", "4.1.2"],
    },
  },
  composition: [
    {
      component: "Surface",
      role: "Calendar grid container",
      tokens: ["--sys-energy-surface-primary"],
    },
    { component: "FlowButton", role: "Navigation and view switch buttons", tokens: [] },
    { component: "FlowIconButton", role: "Action buttons", tokens: [] },
    { component: "FlowPopover", role: "Event detail popup", tokens: [] },
    { component: "Text", role: "Event titles and dates", tokens: ["--sys-voice-*-size"] },
  ],
  demos: {
    overview: CalendarViewOverviewDemo,
    useCases: CalendarViewUseCasesDemo,
  },
  developer: {
    reactImport: `import { FlowCalendarView } from "@flow/design-system";`,
    reactUsage: `<FlowCalendarView
  events={events}
  onEventCreate={handleEventCreate}
  onEventUpdate={handleEventUpdate}
/>`,
    flutterImport: `import 'package:flow/patterns/calendar_view.dart';`,
    flutterUsage: `FlowCalendarView(
  events: events,
  onEventCreate: handleEventCreate,
  onEventUpdate: handleEventUpdate,
)`,
    props: [
      { name: "events", type: "Event[]", required: true, description: "Calendar events." },
      {
        name: "onEventCreate",
        type: "(event: Event) => void",
        required: false,
        description: "Event creation handler.",
      },
      {
        name: "onEventUpdate",
        type: "(event: Event) => void",
        required: false,
        description: "Event update handler.",
      },
    ],
    guidelines: [
      { type: "do", text: "Use for scheduling and event management." },
      { type: "do", text: "Support multiple view modes." },
      { type: "dont", text: "Don't use for simple date selection." },
    ],
  },
  playground: {
    renderPreview: (props: Record<string, unknown>) =>
      React.createElement(FlowCalendarView, {
        events: props.events,
        view: (props.view as string) ?? "month",
        onEventClick: () => {},
      } as unknown as React.ComponentProps<typeof FlowCalendarView>),
    defaults: { view: "month" },
    fixtures: {
      events: [
        { id: "1", title: "Team Standup", start: "2026-04-23T09:00:00", end: "2026-04-23T09:30:00", color: "var(--sys-energy-status-info)" },
        { id: "2", title: "Design Review", start: "2026-04-23T14:00:00", end: "2026-04-23T15:00:00", color: "var(--sys-energy-status-success)" },
        { id: "3", title: "Sprint Planning", start: "2026-04-24T10:00:00", end: "2026-04-24T11:30:00", color: "var(--sys-energy-accent)" },
      ],
    },
    excludeControls: ["events", "onEventClick", "onDateClick", "className", "style"],
  },
};

// ── FlowChartWrapper ──

const chartWrapperEntry: PatternEntry = {
  category: "data-patterns",
  spec: {
    name: "Chart Wrapper",
    purpose:
      "Standardized chart container with title, legend, loading state, empty state, and export actions.",
    platform: "shared",
    composesL3: ["FlowCard", "FlowChartLegendItem", "FlowSkeleton", "FlowEmptyState", "FlowMenu"],
    orchestrates: [
      "Chart lifecycle (loading -> data -> error -> empty)",
      "Legend interaction (toggle series)",
      "Export actions (PNG, CSV)",
      "Responsive chart sizing",
      "Title and subtitle layout",
    ],
    accessibility: {
      handled: [
        "Chart container has role='img' for screen readers",
        "Decorative elements are aria-hidden",
        "Loading state uses aria-busy",
      ],
      required: [
        "Provide aria-label describing the chart's data and purpose",
        "Consider providing a data table alternative for screen reader users",
      ],
      keyboard: [],
      wcag: ["1.1.1"],
    },
  },
  composition: [
    { component: "FlowCard", role: "Chart container with header", tokens: [] },
    { component: "FlowChartLegendItem", role: "Interactive legend items", tokens: [] },
    { component: "FlowSkeleton", role: "Loading state placeholder", tokens: [] },
    { component: "FlowEmptyState", role: "Empty data state", tokens: [] },
    { component: "FlowMenu", role: "Export actions dropdown", tokens: [] },
  ],
  demos: {
    overview: ChartWrapperOverviewDemo,
    useCases: ChartWrapperUseCasesDemo,
  },
  developer: {
    reactImport: `import { FlowChartWrapper } from "@flow/design-system";`,
    reactUsage: `<FlowChartWrapper
  title="Revenue Trend"
  loading={isLoading}
  data={chartData}
>
  <LineChart data={chartData} />
</FlowChartWrapper>`,
    flutterImport: `import 'package:flow/patterns/chart_wrapper.dart';`,
    flutterUsage: `FlowChartWrapper(
  title: 'Revenue Trend',
  loading: isLoading,
  data: chartData,
  child: LineChart(data: chartData),
)`,
    props: [
      { name: "title", type: "string", required: true, description: "Chart title." },
      { name: "children", type: "ReactNode", required: true, description: "Chart component." },
      {
        name: "loading",
        type: "boolean",
        required: false,
        defaultValue: "false",
        description: "Loading state.",
      },
      {
        name: "data",
        type: "any",
        required: false,
        description: "Chart data for empty state detection.",
      },
    ],
    guidelines: [
      { type: "do", text: "Use for all chart displays." },
      { type: "do", text: "Provide export options." },
      { type: "dont", text: "Don't render charts directly without wrapper." },
    ],
  },
  playground: {
    renderPreview: (props: Record<string, unknown>) =>
      React.createElement(FlowChartWrapper, {
        title: (props.title as string) ?? "Monthly Revenue",
        subtitle: (props.subtitle as string) ?? "Last 6 months",
        height: (props.height as number) ?? 300,
        loading: (props.loading as boolean) ?? false,
        children: React.createElement(Surface, { variant: "sunken", padding: "container", style: { height: "100%", display: "flex", alignItems: "center", justifyContent: "center" } }, React.createElement(Text, { variant: "caption", color: "secondary", children: "Chart area" } as React.ComponentProps<typeof Text>)),
      } as unknown as React.ComponentProps<typeof FlowChartWrapper>),
    defaults: { title: "Monthly Revenue", subtitle: "Last 6 months", height: 300, loading: false },
    excludeControls: ["children", "actions", "className", "style"],
  },
};

// ── Exported registry slice ──
export const dataPatterns: Record<string, PatternEntry> = {
  "data-patterns/data-table": dataTableEntry,
  "data-patterns/virtual-data-table": virtualDataTableEntry,
  "data-patterns/transfer-list": transferListEntry,
  "data-patterns/drag-sortable-list": dragSortableListEntry,
  "data-patterns/advanced-filters": advancedFiltersEntry,
  "data-patterns/column-configurator": columnConfiguratorEntry,
  "data-patterns/calendar-view": calendarViewEntry,
  "data-patterns/chart-wrapper": chartWrapperEntry,
};
