/**
 * FLOW Design System — Phase 3 Showcase
 * V-010 production-readiness variants: MultiSelect, DateRangePicker, VirtualDataTable
 */
import { useMemo, useState } from "react";

import {
  type CalendarEvent,
  type CommandItem,
  type DateRange,
  Divider,
  FlowCalendarView,
  FlowColorPicker,
  FlowCommandPalette,
  FlowDateRangePicker,
  FlowDragSortableList,
  FlowFileUpload,
  FlowMultiSelect,
  FlowNotificationPanel,
  FlowRichTextEditor,
  FlowSplitPane,
  FlowTransferList,
  FlowTreeView,
  FlowVirtualDataTable,
  Inline,
  type MultiSelectOption,
  type NotificationItem,
  type SortableItem,
  Stack,
  Surface,
  Text,
  type TransferItem,
  type TreeNode,
  type VirtualDataTableColumn,
} from "../../lib";
import { Callout, PAGE_GAP, PageHeader, Section } from "../components/doc-primitives";

// ── Mock data generators ──

const FRUIT_OPTIONS: MultiSelectOption[] = [
  { value: "apple", label: "Apple", icon: "leaf", group: "Common" },
  { value: "banana", label: "Banana", icon: "leaf", group: "Common" },
  { value: "cherry", label: "Cherry", icon: "leaf", group: "Common" },
  { value: "date", label: "Date", icon: "leaf", group: "Exotic" },
  { value: "elderberry", label: "Elderberry", icon: "leaf", group: "Exotic" },
  { value: "fig", label: "Fig", icon: "leaf", group: "Exotic" },
  { value: "grape", label: "Grape", icon: "leaf", group: "Common" },
  { value: "honeydew", label: "Honeydew", icon: "leaf", group: "Melons" },
  { value: "kiwi", label: "Kiwi", icon: "leaf", group: "Exotic" },
  { value: "lemon", label: "Lemon", icon: "leaf", group: "Citrus" },
  { value: "mango", label: "Mango", icon: "leaf", group: "Exotic" },
  { value: "nectarine", label: "Nectarine", icon: "leaf", group: "Stone" },
  { value: "orange", label: "Orange", icon: "leaf", group: "Citrus" },
  { value: "papaya", label: "Papaya", icon: "leaf", group: "Exotic" },
  { value: "quince", label: "Quince", icon: "leaf", group: "Uncommon" },
  { value: "raspberry", label: "Raspberry", icon: "leaf", group: "Berries" },
  { value: "strawberry", label: "Strawberry", icon: "leaf", group: "Berries" },
  { value: "tangerine", label: "Tangerine", icon: "leaf", group: "Citrus" },
  { value: "watermelon", label: "Watermelon", icon: "leaf", group: "Melons" },
];

const ROLE_OPTIONS: MultiSelectOption[] = [
  { value: "admin", label: "Administrator" },
  { value: "editor", label: "Editor" },
  { value: "viewer", label: "Viewer" },
  { value: "moderator", label: "Moderator" },
  { value: "analyst", label: "Analyst" },
  { value: "developer", label: "Developer" },
  { value: "designer", label: "Designer" },
  { value: "guest", label: "Guest", disabled: true },
];

interface VirtualRow {
  id: string;
  name: string;
  email: string;
  department: string;
  role: string;
  salary: number;
  startDate: string;
  status: string;
  location: string;
  performance: number;
}

const DEPARTMENTS = [
  "Engineering",
  "Design",
  "Marketing",
  "Sales",
  "Finance",
  "HR",
  "Legal",
  "Operations",
  "Support",
  "Product",
];
const ROLES = [
  "Senior Engineer",
  "Staff Designer",
  "Marketing Lead",
  "Sales Rep",
  "Analyst",
  "Manager",
  "Director",
  "VP",
  "Intern",
  "Consultant",
];
const LOCATIONS = [
  "San Francisco",
  "New York",
  "London",
  "Berlin",
  "Tokyo",
  "Singapore",
  "Sydney",
  "Toronto",
  "Austin",
  "Remote",
];
const STATUSES = ["Active", "On Leave", "Probation", "Terminated"];
const FIRST_NAMES = [
  "Alice",
  "Bob",
  "Charlie",
  "Diana",
  "Edward",
  "Fiona",
  "George",
  "Hannah",
  "Ivan",
  "Julia",
  "Kevin",
  "Laura",
  "Michael",
  "Nina",
  "Oscar",
  "Patricia",
  "Quinn",
  "Rachel",
  "Samuel",
  "Tina",
];
const LAST_NAMES = [
  "Anderson",
  "Brown",
  "Clark",
  "Davis",
  "Evans",
  "Foster",
  "Garcia",
  "Harris",
  "Ito",
  "Johnson",
  "Kim",
  "Lee",
  "Martinez",
  "Nelson",
  "Ortiz",
  "Park",
  "Quinn",
  "Robinson",
  "Smith",
  "Taylor",
];

function generateVirtualData(count: number): VirtualRow[] {
  const rows: VirtualRow[] = [];
  for (let i = 0; i < count; i++) {
    const firstName = FIRST_NAMES[i % FIRST_NAMES.length];
    const lastName = LAST_NAMES[Math.floor(i / FIRST_NAMES.length) % LAST_NAMES.length];
    rows.push({
      id: `emp-${String(i + 1).padStart(5, "0")}`,
      name: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@company.com`,
      department: DEPARTMENTS[i % DEPARTMENTS.length],
      role: ROLES[i % ROLES.length],
      salary: 55000 + Math.floor(Math.random() * 120000),
      startDate: `${2018 + Math.floor(Math.random() * 8)}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, "0")}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, "0")}`,
      status: STATUSES[Math.floor(Math.random() * STATUSES.length)],
      location: LOCATIONS[i % LOCATIONS.length],
      performance: Math.round(Math.random() * 100),
    });
  }
  return rows;
}

// ── p12 Mock Data ──

const TREE_NODES: TreeNode[] = [
  {
    id: "src",
    label: "src",
    icon: "folder",
    children: [
      {
        id: "app",
        label: "app",
        icon: "folder",
        children: [
          { id: "app-tsx", label: "App.tsx", icon: "file" },
          { id: "routes", label: "routes.ts", icon: "file" },
        ],
      },
      {
        id: "components",
        label: "components",
        icon: "folder",
        children: [
          { id: "button", label: "Button.tsx", icon: "file" },
          { id: "card", label: "Card.tsx", icon: "file" },
          { id: "dialog", label: "Dialog.tsx", icon: "file" },
        ],
      },
      {
        id: "styles",
        label: "styles",
        icon: "folder",
        children: [{ id: "flow-css", label: "flow.css", icon: "file" }],
      },
    ],
  },
  { id: "pkg", label: "package.json", icon: "file" },
  { id: "readme", label: "README.md", icon: "file", disabled: true },
];

const COMMANDS: CommandItem[] = [
  { id: "new-file", label: "New File", icon: "file-plus", shortcut: "Ctrl+N", group: "File" },
  { id: "open-file", label: "Open File", icon: "folder-open", shortcut: "Ctrl+O", group: "File" },
  { id: "save", label: "Save", icon: "save", shortcut: "Ctrl+S", group: "File" },
  {
    id: "search",
    label: "Search in Files",
    icon: "search",
    shortcut: "Ctrl+Shift+F",
    group: "Edit",
  },
  { id: "replace", label: "Find and Replace", icon: "replace", shortcut: "Ctrl+H", group: "Edit" },
  { id: "git-commit", label: "Git: Commit", icon: "git-commit", group: "Source Control" },
  { id: "git-push", label: "Git: Push", icon: "upload", group: "Source Control" },
  { id: "terminal", label: "Toggle Terminal", icon: "terminal", shortcut: "Ctrl+`", group: "View" },
  {
    id: "settings",
    label: "Open Settings",
    icon: "settings",
    shortcut: "Ctrl+,",
    group: "Preferences",
  },
];

const TRANSFER_ITEMS: TransferItem[] = [
  { id: "react", label: "React" },
  { id: "vue", label: "Vue" },
  { id: "angular", label: "Angular" },
  { id: "svelte", label: "Svelte" },
  { id: "solid", label: "SolidJS" },
  { id: "preact", label: "Preact" },
  { id: "lit", label: "Lit", disabled: true },
  { id: "qwik", label: "Qwik" },
];

const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "n1",
    title: "Build succeeded",
    message: "Production deployment completed in 2m 14s",
    timestamp: "2 min ago",
    variant: "success",
  },
  {
    id: "n2",
    title: "PR #342 needs review",
    message: "Alice requested your review on 'Fix token aliases'",
    timestamp: "15 min ago",
    variant: "info",
  },
  {
    id: "n3",
    title: "Disk usage warning",
    message: "Storage is at 89% capacity",
    timestamp: "1 hour ago",
    variant: "warning",
  },
  {
    id: "n4",
    title: "Test suite failed",
    message: "3 tests failed in flow-components-p12.test.ts",
    timestamp: "3 hours ago",
    variant: "error",
    read: true,
  },
  {
    id: "n5",
    title: "New team member",
    message: "Bob joined the Design Systems team",
    timestamp: "Yesterday",
    variant: "info",
    read: true,
  },
];

const MOCK_EVENTS: CalendarEvent[] = [
  {
    id: "e1",
    title: "Sprint Planning",
    date: "2026-03-03",
    color: "var(--sys-energy-status-info)",
    time: "10:00",
  },
  {
    id: "e2",
    title: "Design Review",
    date: "2026-03-05",
    color: "var(--sys-energy-status-success)",
    time: "14:00",
  },
  {
    id: "e3",
    title: "Release v2.1",
    date: "2026-03-10",
    color: "var(--sys-energy-status-warning)",
    time: "09:00",
  },
  {
    id: "e4",
    title: "Team Standup",
    date: "2026-03-03",
    color: "var(--sys-energy-status-info)",
    time: "09:15",
  },
  {
    id: "e5",
    title: "1:1 with Lead",
    date: "2026-03-12",
    color: "var(--sys-energy-status-success)",
    time: "11:00",
  },
  {
    id: "e6",
    title: "Retro",
    date: "2026-03-17",
    color: "var(--sys-energy-status-info)",
    time: "15:00",
  },
  {
    id: "e7",
    title: "Demo Day",
    date: "2026-03-20",
    color: "var(--sys-energy-status-warning)",
    time: "16:00",
  },
];

const INITIAL_SORTABLE: SortableItem[] = [
  { id: "s1", content: "Review token migration PR" },
  { id: "s2", content: "Update system audit score" },
  { id: "s3", content: "Write FlowTreeView tests" },
  { id: "s4", content: "Fix CalendarView month nav" },
  { id: "s5", content: "Add keyboard shortcuts docs" },
];

// ── Main page ──

export function Phase3ShowcasePage() {
  // MultiSelect demos
  const [fruits, setFruits] = useState<string[]>(["apple", "cherry", "mango"]);
  const [roles, setRoles] = useState<string[]>([]);
  const [errFruits, setErrFruits] = useState<string[]>([]);

  // DateRangePicker demos
  const [range1, setRange1] = useState<DateRange | null>(null);
  const [range2, setRange2] = useState<DateRange | null>({
    start: "2026-02-15",
    end: "2026-03-01",
  });

  // VirtualDataTable demo
  const virtualData = useMemo(() => generateVirtualData(10000), []);
  const [vtSelectedKeys, setVtSelectedKeys] = useState<Set<string>>(new Set());

  // p12 Desktop Advanced demos
  const [treeSelected, setTreeSelected] = useState<string | null>("app-tsx");
  const [cmdOpen, setCmdOpen] = useState(false);
  const [pickerColor, setPickerColor] = useState("#3B82F6");
  const [notifications, setNotifications] = useState<NotificationItem[]>(MOCK_NOTIFICATIONS);
  const [sortableItems, setSortableItems] = useState<SortableItem[]>(INITIAL_SORTABLE);
  const [calSelectedDate, setCalSelectedDate] = useState<string | null>("2026-03-03");

  const vtColumns: VirtualDataTableColumn<VirtualRow>[] = useMemo(
    () => [
      {
        key: "id",
        header: "ID",
        width: "100px",
        sortable: true,
        render: (row) => (
          <Text role="caption" color="accent" className="flow-mono">
            {row.id}
          </Text>
        ),
      },
      {
        key: "name",
        header: "Name",
        width: "180px",
        sortable: true,
        render: (row) => (
          <Text role="paragraph-s" className="flow-medium">
            {row.name}
          </Text>
        ),
      },
      { key: "email", header: "Email", minWidth: "220px", sortable: true },
      { key: "department", header: "Department", width: "130px", sortable: true },
      { key: "role", header: "Role", width: "150px", sortable: true },
      {
        key: "salary",
        header: "Salary",
        width: "110px",
        align: "right",
        sortable: true,
        sortFn: (a, b) => a.salary - b.salary,
        render: (row) => `$${row.salary.toLocaleString()}`,
      },
      {
        key: "status",
        header: "Status",
        width: "100px",
        sortable: true,
        render: (row) => {
          const color =
            row.status === "Active"
              ? "var(--sys-energy-status-success)"
              : row.status === "On Leave"
                ? "var(--sys-energy-status-warning)"
                : row.status === "Terminated"
                  ? "var(--sys-energy-status-error)"
                  : "var(--sys-energy-text-tertiary)";
          return (
            <span
              className="flow-caption"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "var(--ref-frame-space-1)",
              }}
            >
              <span
                style={{
                  width: "var(--ref-frame-space-2)",
                  height: "var(--ref-frame-space-2)",
                  borderRadius: "var(--ref-frame-radius-full)",
                  background: color,
                  flexShrink: 0,
                }}
              />
              {row.status}
            </span>
          );
        },
      },
      { key: "location", header: "Location", width: "130px", sortable: true },
      {
        key: "performance",
        header: "Perf.",
        width: "80px",
        align: "center",
        sortable: true,
        sortFn: (a, b) => a.performance - b.performance,
        render: (row) => {
          const color =
            row.performance >= 75
              ? "var(--sys-energy-status-success)"
              : row.performance >= 50
                ? "var(--sys-energy-status-warning)"
                : "var(--sys-energy-status-error)";
          return (
            <span className="flow-inline-code flow-semibold" style={{ color }}>
              {row.performance}%
            </span>
          );
        },
      },
    ],
    [],
  );

  return (
    <Stack gap={PAGE_GAP}>
      <PageHeader chapter="V-010 Phase 3" title="Production-Readiness Variants">
        Three critical missing variants implemented and audited for production usage: Multi-Select,
        Date Range Picker, and Virtual Scroll DataTable. All follow FLOW architecture — composing L2
        primitives, consuming ref/sys/comp tokens, using stateAttrs() for state precedence, and
        meeting WAI-ARIA Authoring Practices. Post-audit: 17 violations resolved (4 critical, 7
        high, 6 medium) — maturity score 89→91.
      </PageHeader>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* § 1. MULTI-SELECT              */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <Section
        title="1. FlowMultiSelect"
        description="Multi-value select with search, grouped options, chip display, select all/clear all, and keyboard navigation."
      >
        <Stack gap={6}>
          {/* Demo: Grouped + pre-selected */}
          <Stack gap={2}>
            <Text role="label-s" color="secondary">
              Grouped options with pre-selected values
            </Text>
            <div style={{ maxWidth: "var(--sys-frame-content-dialog)" }}>
              <FlowMultiSelect
                label="Favorite Fruits"
                options={FRUIT_OPTIONS}
                value={fruits}
                onChange={(v) => setFruits(v)}
                hint="Choose your preferred fruits"
                searchable
                maxDisplayChips={3}
              />
            </div>
            <Text role="caption" color="tertiary">
              Selected: {fruits.length > 0 ? fruits.join(", ") : "none"}
            </Text>
          </Stack>

          <Divider />

          {/* Demo: Flat list, no initial value */}
          <Stack gap={2}>
            <Text role="label-s" color="secondary">
              Flat options with no default
            </Text>
            <div style={{ maxWidth: "var(--sys-frame-content-dialog)" }}>
              <FlowMultiSelect
                label="User Roles"
                options={ROLE_OPTIONS}
                value={roles}
                onChange={(v) => setRoles(v)}
                placeholder="Assign roles..."
                hint="Guest role is disabled"
                searchable
              />
            </div>
          </Stack>

          <Divider />

          {/* Demo: Error state */}
          <Stack gap={2}>
            <Text role="label-s" color="secondary">
              Error state (minimum 2 required)
            </Text>
            <div style={{ maxWidth: "var(--sys-frame-content-dialog)" }}>
              <FlowMultiSelect
                label="Required Tags"
                options={FRUIT_OPTIONS.slice(0, 8)}
                value={errFruits}
                onChange={(v) => setErrFruits(v)}
                error={errFruits.length < 2 ? "Select at least 2 options" : undefined}
                required
              />
            </div>
          </Stack>

          <Divider />

          {/* Demo: Disabled */}
          <Stack gap={2}>
            <Text role="label-s" color="secondary">
              Disabled state
            </Text>
            <div style={{ maxWidth: "var(--sys-frame-content-dialog)" }}>
              <FlowMultiSelect
                label="Locked Selection"
                options={ROLE_OPTIONS}
                value={["admin", "editor"]}
                disabled
              />
            </div>
          </Stack>

          <Divider />

          {/* Demo: Size variants */}
          <Stack gap={2}>
            <Text role="label-s" color="secondary">
              Size variants (sm / md / lg)
            </Text>
            <Inline gap={4} style={{ alignItems: "flex-start", flexWrap: "wrap" }}>
              <div style={{ maxWidth: "300px", flex: 1 }}>
                <FlowMultiSelect
                  label="Small"
                  options={ROLE_OPTIONS.slice(0, 4)}
                  value={["admin"]}
                  size="sm"
                />
              </div>
              <div style={{ maxWidth: "300px", flex: 1 }}>
                <FlowMultiSelect
                  label="Medium (default)"
                  options={ROLE_OPTIONS.slice(0, 4)}
                  value={["editor"]}
                  size="md"
                />
              </div>
              <div style={{ maxWidth: "300px", flex: 1 }}>
                <FlowMultiSelect
                  label="Large"
                  options={ROLE_OPTIONS.slice(0, 4)}
                  value={["viewer"]}
                  size="lg"
                />
              </div>
            </Inline>
          </Stack>
        </Stack>
      </Section>

      <Divider />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* § 2. DATE RANGE PICKER          */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <Section
        title="2. FlowDateRangePicker"
        description="Two-month calendar with range selection, visual range highlighting, quick presets, and keyboard support."
      >
        <Stack gap={6}>
          {/* Demo: Default with presets */}
          <Stack gap={2}>
            <Text role="label-s" color="secondary">
              Default with presets sidebar
            </Text>
            <FlowDateRangePicker label="Report Period" value={range1} onChange={setRange1} />
            <Text role="caption" color="tertiary">
              Selected: {range1 ? `${range1.start} to ${range1.end}` : "none"}
            </Text>
          </Stack>

          <Divider />

          {/* Demo: Pre-populated */}
          <Stack gap={2}>
            <Text role="label-s" color="secondary">
              Pre-populated range
            </Text>
            <FlowDateRangePicker
              label="Billing Cycle"
              value={range2}
              onChange={setRange2}
              min="2026-01-01"
              max="2026-12-31"
            />
            <Text role="caption" color="tertiary">
              Selected: {range2 ? `${range2.start} to ${range2.end}` : "none"}
            </Text>
          </Stack>

          <Divider />

          {/* Demo: Error */}
          <Stack gap={2}>
            <Text role="label-s" color="secondary">
              Error state
            </Text>
            <FlowDateRangePicker
              label="Invalid Range"
              error
              errorMessage="Date range is required"
            />
          </Stack>

          <Divider />

          {/* Demo: Disabled */}
          <Stack gap={2}>
            <Text role="label-s" color="secondary">
              Disabled
            </Text>
            <FlowDateRangePicker
              label="Locked Period"
              value={{ start: "2026-01-01", end: "2026-01-31" }}
              disabled
            />
          </Stack>

          <Divider />

          {/* Demo: Size variants */}
          <Stack gap={2}>
            <Text role="label-s" color="secondary">
              Size variants (sm / md / lg)
            </Text>
            <Stack gap={3}>
              <FlowDateRangePicker label="Small" size="sm" />
              <FlowDateRangePicker label="Medium (default)" size="md" />
              <FlowDateRangePicker label="Large" size="lg" />
            </Stack>
          </Stack>
        </Stack>
      </Section>

      <Divider />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* § 3. VIRTUAL DATA TABLE          */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <Section
        title="3. FlowVirtualDataTable"
        description="Windowed virtual scroll for large datasets. 10,000 rows rendered with only ~20 DOM nodes visible at a time."
      >
        <Callout intent="accent" title="Performance">
          This table contains <strong>10,000 rows</strong> rendered via virtual scrolling. Only the
          visible rows (+ buffer) are in the DOM at any time, enabling smooth 60fps scrolling even
          on large datasets. Sorting, filtering, and selection work across the full dataset.
        </Callout>

        <FlowVirtualDataTable<VirtualRow>
          columns={vtColumns}
          data={virtualData}
          rowKey={(row) => row.id}
          height={500}
          rowHeight={40}
          overscan={8}
          selectable
          selectedKeys={vtSelectedKeys}
          onSelectionChange={setVtSelectedKeys}
          searchable
          searchPlaceholder="Search employees..."
          striped
          hoverable
          aria-label="Employee directory (10,000 records)"
        />

        <Inline gap={3}>
          <Surface padding="control" radius="control">
            <Stack gap={1}>
              <Text role="label-s" color="tertiary">
                Total rows
              </Text>
              <Text role="label-m" color="accent" className="flow-mono">
                {virtualData.length.toLocaleString()}
              </Text>
            </Stack>
          </Surface>
          <Surface padding="control" radius="control">
            <Stack gap={1}>
              <Text role="label-s" color="tertiary">
                Selected
              </Text>
              <Text role="label-m" color="accent" className="flow-mono">
                {vtSelectedKeys.size.toLocaleString()}
              </Text>
            </Stack>
          </Surface>
          <Surface padding="control" radius="control">
            <Stack gap={1}>
              <Text role="label-s" color="tertiary">
                DOM nodes rendered
              </Text>
              <Text role="label-m" color="accent" className="flow-mono">
                ~{Math.min(Math.ceil(500 / 40) + 16, virtualData.length)}
              </Text>
            </Stack>
          </Surface>
        </Inline>
      </Section>

      <Divider />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* § 4. P12 DESKTOP ADVANCED — VISUAL REGRESSION */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <Section
        title="4. Phase 12 — Desktop Advanced Components"
        description="Visual regression pass for all 10 p12 components. Token migration verified: all --ref-typo-scale-* aliases replaced with canonical --ref-voice-size-* tokens."
      >
        <Callout intent="success" title="Token Migration Complete">
          All 24 non-canonical token references in p12 migrated to canonical tokens:
          <code> --ref-typo-scale-xs/sm</code> &rarr; <code>--ref-voice-size-3/5</code>,{" "}
          <code>--ref-frame-shadow-md/lg</code> &rarr; <code>--ref-depth-shadow-2/3</code>,{" "}
          <code>--ref-typo-font-mono</code> &rarr; <code>--ref-voice-family-mono</code>. CSS aliases
          remain in flow.css for backward compatibility.
        </Callout>

        <Stack gap={6}>
          {/* 4a. TreeView */}
          <Stack gap={2}>
            <Text role="label-s" color="secondary">
              4a. FlowTreeView — Hierarchical collapsible tree
            </Text>
            <Surface padding="container" radius="container">
              <FlowTreeView
                nodes={TREE_NODES}
                selectedId={treeSelected}
                onSelect={setTreeSelected}
                defaultExpandedIds={["src", "app", "components"]}
                aria-label="Project file tree"
              />
            </Surface>
            <Text role="caption" color="tertiary">
              Selected: {treeSelected ?? "none"}
            </Text>
          </Stack>

          <Divider />

          {/* 4b. SplitPane */}
          <Stack gap={2}>
            <Text role="label-s" color="secondary">
              4b. FlowSplitPane — Resizable split panels
            </Text>
            <div style={{ height: 200 }}>
              <FlowSplitPane
                first={
                  <Surface
                    padding="control"
                    style={{
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text role="paragraph-s" color="secondary">
                      Left Panel
                    </Text>
                  </Surface>
                }
                second={
                  <Surface
                    padding="control"
                    style={{
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text role="paragraph-s" color="secondary">
                      Right Panel
                    </Text>
                  </Surface>
                }
                defaultSplit={40}
              />
            </div>
            <Text role="caption" color="tertiary">
              Drag the divider or use arrow keys to resize
            </Text>
          </Stack>

          <Divider />

          {/* 4c. CommandPalette */}
          <Stack gap={2}>
            <Text role="label-s" color="secondary">
              4c. FlowCommandPalette — Keyboard-driven command launcher
            </Text>
            <button
              onClick={() => setCmdOpen(true)}
              style={{
                padding: "var(--ref-frame-space-2) var(--ref-frame-space-4)",
                border: "var(--sys-frame-border-thin) solid var(--sys-energy-border-default)",
                borderRadius: "var(--ref-frame-radius-2)",
                background: "var(--sys-energy-surface-secondary)",
                cursor: "pointer",
                color: "var(--sys-energy-text-secondary)",
                display: "inline-flex",
                alignItems: "center",
                gap: "var(--ref-frame-space-2)",
                alignSelf: "flex-start",
              }}
            >
              Open Command Palette
              <kbd className="flow-inline-code">Ctrl+K</kbd>
            </button>
            <FlowCommandPalette
              open={cmdOpen}
              onClose={() => setCmdOpen(false)}
              commands={COMMANDS}
              placeholder="Search commands..."
            />
          </Stack>

          <Divider />

          {/* 4d. ColorPicker */}
          <Stack gap={2}>
            <Text role="label-s" color="secondary">
              4d. FlowColorPicker — HSL color picker with hex input
            </Text>
            <div style={{ maxWidth: 300 }}>
              <FlowColorPicker value={pickerColor} onChange={setPickerColor} />
            </div>
            <Text role="caption" color="tertiary">
              Selected color:{" "}
              <span className="flow-mono" style={{ color: pickerColor }}>
                {pickerColor}
              </span>
            </Text>
          </Stack>

          <Divider />

          {/* 4e. FileUpload */}
          <Stack gap={2}>
            <Text role="label-s" color="secondary">
              4e. FlowFileUpload — Drag-and-drop file upload
            </Text>
            <div style={{ maxWidth: 500 }}>
              <FlowFileUpload
                accept=".png,.jpg,.svg,.pdf"
                maxSizeMB={5}
                multiple
                label="Upload design assets"
                hint="PNG, JPG, SVG, PDF up to 5MB"
              />
            </div>
          </Stack>

          <Divider />

          {/* 4f. RichTextEditor */}
          <Stack gap={2}>
            <Text role="label-s" color="secondary">
              4f. FlowRichTextEditor — WYSIWYG editor with toolbar
            </Text>
            <div style={{ maxWidth: "var(--sys-frame-content-prose)" }}>
              <FlowRichTextEditor
                label="Release Notes"
                placeholder="Write release notes here..."
                minHeight={120}
                defaultValue="<p>FLOW v2.1 includes <strong>10 new desktop-advanced components</strong> with full token migration and WAI-ARIA compliance.</p>"
              />
            </div>
          </Stack>

          <Divider />

          {/* 4g. TransferList */}
          <Stack gap={2}>
            <Text role="label-s" color="secondary">
              4g. FlowTransferList — Dual-list selector with search
            </Text>
            <FlowTransferList
              items={TRANSFER_ITEMS}
              defaultTargetIds={["react", "svelte"]}
              sourceTitle="Available Frameworks"
              targetTitle="Selected Frameworks"
              searchable
            />
          </Stack>

          <Divider />

          {/* 4h. NotificationPanel */}
          <Stack gap={2}>
            <Text role="label-s" color="secondary">
              4h. FlowNotificationPanel — Notification center with variants
            </Text>
            <div style={{ maxWidth: "var(--sys-frame-content-dialog)" }}>
              <FlowNotificationPanel
                notifications={notifications}
                onMarkRead={(id) =>
                  setNotifications((prev) =>
                    prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
                  )
                }
                onMarkAllRead={() =>
                  setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
                }
                onDismiss={(id) => setNotifications((prev) => prev.filter((n) => n.id !== id))}
                maxHeight={320}
              />
            </div>
          </Stack>

          <Divider />

          {/* 4i. CalendarView */}
          <Stack gap={2}>
            <Text role="label-s" color="secondary">
              4i. FlowCalendarView — Month calendar with events
            </Text>
            <div style={{ maxWidth: "var(--sys-frame-content-prose)" }}>
              <FlowCalendarView
                events={MOCK_EVENTS}
                selectedDate={calSelectedDate ?? undefined}
                onSelectDate={setCalSelectedDate}
              />
            </div>
            <Text role="caption" color="tertiary">
              Selected date: {calSelectedDate ?? "none"}
            </Text>
          </Stack>

          <Divider />

          {/* 4j. DragSortableList */}
          <Stack gap={2}>
            <Text role="label-s" color="secondary">
              4j. FlowDragSortableList — Reorderable list via drag or keyboard
            </Text>
            <div style={{ maxWidth: "var(--sys-frame-content-dialog)" }}>
              <FlowDragSortableList
                items={sortableItems}
                onReorder={setSortableItems}
                aria-label="Task priority list"
              />
            </div>
            <Text role="caption" color="tertiary">
              Use Alt+Arrow to reorder with keyboard
            </Text>
          </Stack>
        </Stack>
      </Section>

      <Divider />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* ARCHITECTURE NOTES              */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <Section
        title="Architecture Notes"
        description="Implementation decisions for cross-platform alignment."
      >
        <Stack gap={3}>
          <Callout intent="success" title="Post-Audit Status">
            All 17 violations from the Phase 3 audit have been resolved: 4 critical (keyboard
            access, ARIA roles), 7 high (token consumption, stateAttrs integration, auto-focus), 6
            medium (aria-multiselectable placement, group roles, useCallback optimization). Token
            bug fixed: components now correctly consume
            <code> --sys-size-control-height</code> (was referencing non-existent{" "}
            <code>--sys-size-height-control</code>), enabling size prop to cascade through the FLOW
            density system.
          </Callout>

          <Surface padding="container" radius="container">
            <Stack gap={2}>
              <Text role="label-m">FlowMultiSelect</Text>
              <Stack gap={1}>
                <Text role="caption" color="secondary">
                  - Extends FlowSelect&apos;s visual language: same floating label, dropdown, keyboard
                  nav
                </Text>
                <Text role="caption" color="secondary">
                  - Checkbox indicators in options (not checkmarks) for clearer multi-select
                  affordance
                </Text>
                <Text role="caption" color="secondary">
                  - Grouped options with sticky group headers (role=&quot;group&quot; + aria-label)
                </Text>
                <Text role="caption" color="secondary">
                  - Chip display with configurable maxDisplayChips (overflow shows &quot;+N more&quot;)
                </Text>
                <Text role="caption" color="secondary">
                  - role=&quot;listbox&quot; aria-multiselectable=&quot;true&quot; per WAI-ARIA Listbox pattern
                </Text>
                <Text role="caption" color="secondary">
                  - stateAttrs() on wrapper + container for disabled/error/success/loading
                  precedence
                </Text>
                <Text role="caption" color="secondary">
                  - data-size cascades --sys-size-control-height for sm/md/lg/xl sizing
                </Text>
                <Text role="caption" color="secondary">
                  - Flutter parity: FlowMultiSelect widget with same API shape
                </Text>
              </Stack>
            </Stack>
          </Surface>

          <Surface padding="container" radius="container">
            <Stack gap={2}>
              <Text role="label-m">FlowDateRangePicker</Text>
              <Stack gap={1}>
                <Text role="caption" color="secondary">
                  - Two-month side-by-side calendar for range visibility
                </Text>
                <Text role="caption" color="secondary">
                  - Two-click selection model: click start, hover preview, click end
                </Text>
                <Text role="caption" color="secondary">
                  - Quick presets sidebar (Today, Last 7/30 days, This/Last month)
                </Text>
                <Text role="caption" color="secondary">
                  - Reuses comp-date-picker tokens for cell sizes and grid gap
                </Text>
                <Text role="caption" color="secondary">
                  - role=&quot;grid&quot;/&quot;row&quot;/&quot;gridcell&quot; per WAI-ARIA Grid pattern
                </Text>
                <Text role="caption" color="secondary">
                  - Full arrow-key calendar navigation (Arrow/PageUp/PageDown/Home/End +
                  Enter/Space)
                </Text>
                <Text role="caption" color="secondary">
                  - Auto-focus into calendar on open; clear button is now a real &lt;button&gt;
                </Text>
                <Text role="caption" color="secondary">
                  - stateAttrs() on container + end-button for disabled/error precedence
                </Text>
                <Text role="caption" color="secondary">
                  - data-size cascades --sys-size-control-height for sm/md/lg/xl sizing
                </Text>
                <Text role="caption" color="secondary">
                  - Flutter parity: FlowDateRangePicker widget, showDateRangePicker() dialog
                </Text>
              </Stack>
            </Stack>
          </Surface>

          <Surface padding="container" radius="container">
            <Stack gap={2}>
              <Text role="label-m">FlowVirtualDataTable</Text>
              <Stack gap={1}>
                <Text role="caption" color="secondary">
                  - Zero external dependencies — pure windowed rendering via scroll position + row
                  height
                </Text>
                <Text role="caption" color="secondary">
                  - Fixed row height (size-aware: sm=32, md=40, lg=48, xl=56) for O(1) position
                  calculation
                </Text>
                <Text role="caption" color="secondary">
                  - Configurable overscan buffer (default 5) for smooth scroll feel
                </Text>
                <Text role="caption" color="secondary">
                  - Full sort/filter/selection works on complete dataset, not just visible window
                </Text>
                <Text role="caption" color="secondary">
                  - Flexbox columns (not table) for sticky header + virtual body compatibility
                </Text>
                <Text role="caption" color="secondary">
                  - role=&quot;table&quot; wrapper with aria-rowcount/aria-colcount; rows have aria-rowindex
                </Text>
                <Text role="caption" color="secondary">
                  - Sortable column headers: tabIndex + onKeyDown + .flow-focusable + aria-sort
                </Text>
                <Text role="caption" color="secondary">
                  - stateAttrs() on table wrapper for loading state;
                  comp-virtual-table-header-height tokenized
                </Text>
                <Text role="caption" color="secondary">
                  - Replaces pagination with continuous scroll — footer shows total count
                </Text>
                <Text role="caption" color="secondary">
                  - Flutter parity: ListView.builder with itemExtent (same windowed approach)
                </Text>
              </Stack>
            </Stack>
          </Surface>
        </Stack>
      </Section>
    </Stack>
  );
}

export default Phase3ShowcasePage;
