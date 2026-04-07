/**
 * FLOW Design System — Overlays & Navigation Demos
 * FlowDialog, FlowBottomNav, FlowBottomSheet, FlowFAB, FlowShortcutGrid,
 * FlowSidebar, FlowToolbar, FlowBreadcrumbs, FlowContextMenu.
 */
import { useState } from "react";

import {
  FlowBottomNav,
  FlowBottomSheet,
  FlowBreadcrumbs,
  FlowButton,
  FlowContextMenu,
  FlowDialog,
  FlowFAB,
  FlowIconButton,
  FlowSelect,
  FlowSidebar,
  FlowTextArea,
  FlowTextInput,
  FlowToolbar,
  Inline,
  Stack,
  Surface,
  Text,
} from "../../../lib";
import { FlowShortcutGrid } from "../../components/layout";
import { DemoGroup, DemoSection } from "./helpers";

export function OverlaysNavDemos() {
  // ── FlowDialog state ──
  const [alertOpen, setAlertOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [dialogSizeDemo, setDialogSizeDemo] = useState<"sm" | "md" | "lg" | "xl" | null>(null);
  const [formDialogSizeDemo, setFormDialogSizeDemo] = useState<"sm" | "md" | "lg" | "xl" | null>(
    null,
  );

  const [bottomNavActive, setBottomNavActive] = useState("home");
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarActive, setSidebarActive] = useState("dashboard");
  const [dataTableSelected, setDataTableSelected] = useState(0);

  return (
    <>
      <DemoSection
        title="FlowDialog"
        description="Alert and form dialog variants with size control (sm/md/lg/xl). Focus trapping, Escape to close, overlay backdrop."
      >
        <Inline gap={3}>
          <FlowButton variant="high" onClick={() => setAlertOpen(true)}>
            Open alert dialog
          </FlowButton>
          <FlowButton variant="medium" onClick={() => setFormOpen(true)}>
            Open form dialog
          </FlowButton>
        </Inline>

        <FlowDialog
          open={alertOpen}
          onClose={() => setAlertOpen(false)}
          title="Delete this project?"
          description="This action cannot be undone. All data associated with this project will be permanently removed."
          variant="alert"
          actions={
            <>
              <FlowButton variant="low" onClick={() => setAlertOpen(false)}>
                Cancel
              </FlowButton>
              <FlowButton variant="danger" onClick={() => setAlertOpen(false)}>
                Delete project
              </FlowButton>
            </>
          }
        />

        <FlowDialog
          open={formOpen}
          onClose={() => setFormOpen(false)}
          title="Create new token"
          description="Define a new design token for the Flow system."
          variant="form"
          actions={
            <>
              <FlowButton variant="low" onClick={() => setFormOpen(false)}>
                Cancel
              </FlowButton>
              <FlowButton variant="high" onClick={() => setFormOpen(false)}>
                Create token
              </FlowButton>
            </>
          }
        >
          <Stack gap="component">
            <FlowTextInput label="Token name" placeholder="comp.button.radius" />
            <FlowTextInput label="Value" placeholder="var(--ref-frame-radius-3)" />
            <FlowTextInput label="Description" placeholder="Corner radius for buttons" />
          </Stack>
        </FlowDialog>

        {/* Size variant buttons */}
        <DemoGroup>
          <Text role="overline">Dialog Size Variants</Text>
          <Inline gap={3}>
            {(["sm", "md", "lg", "xl"] as const).map((s) => (
              <FlowButton key={s} variant="low" size="sm" onClick={() => setDialogSizeDemo(s)}>
                size=&quot;{s}&quot;
              </FlowButton>
            ))}
          </Inline>
        </DemoGroup>

        {dialogSizeDemo && (
          <FlowDialog
            open
            onClose={() => setDialogSizeDemo(null)}
            title={`Dialog — size="${dialogSizeDemo}"`}
            description={`This dialog uses size="${dialogSizeDemo}" which maps to --comp-dialog-max-width.`}
            size={dialogSizeDemo}
            actions={
              <FlowButton variant="high" onClick={() => setDialogSizeDemo(null)}>
                Close
              </FlowButton>
            }
          />
        )}

        {/* Form Dialog Size Variants */}
        <DemoGroup>
          <Text role="overline">Form Dialog Size Variants</Text>
          <Inline gap={3}>
            {(["sm", "md", "lg", "xl"] as const).map((s) => (
              <FlowButton
                key={s}
                variant="medium"
                size="sm"
                onClick={() => setFormDialogSizeDemo(s)}
              >
                Form size=&quot;{s}&quot;
              </FlowButton>
            ))}
          </Inline>
        </DemoGroup>

        {formDialogSizeDemo && (
          <FlowDialog
            open
            onClose={() => setFormDialogSizeDemo(null)}
            title={`Form Dialog — size="${formDialogSizeDemo}"`}
            description={`Fase 4 validation: title (headline), description (body), inputs (body/caption), select, and buttons all inherit size="${formDialogSizeDemo}" via [data-size] cascade.`}
            variant="form"
            size={formDialogSizeDemo}
            actions={
              <>
                <FlowButton variant="low" onClick={() => setFormDialogSizeDemo(null)}>
                  Cancel
                </FlowButton>
                <FlowButton variant="high" onClick={() => setFormDialogSizeDemo(null)}>
                  Submit
                </FlowButton>
              </>
            }
          >
            <Stack gap="component">
              <FlowTextInput
                label="Token name"
                placeholder="comp.button.radius"
                hint="sys.size.voice.body for value text"
              />
              <FlowSelect
                label="Layer"
                options={[
                  { value: "ref", label: "L1 — Reference" },
                  { value: "sys", label: "L2 — System" },
                  { value: "comp", label: "L3 — Component" },
                ]}
                hint="sys.size.voice.caption for label & hint"
              />
              <FlowTextInput label="Value" placeholder="var(--ref-frame-radius-3)" />
              <FlowTextArea
                label="Description"
                placeholder="Corner radius for buttons"
                rows={2}
                hint="All typography scales uniformly with size"
              />
            </Stack>
          </FlowDialog>
        )}
      </DemoSection>

      <DemoSection
        title="FlowBottomNav"
        description="Mobile-first navigation bar for touch interfaces. Persistent at bottom of screen with 3-5 items."
      >
        <DemoGroup>
          <Text role="overline">Interactive Example — Labeled Variant</Text>
          <Surface padding={0} border style={{ borderRadius: "var(--ref-frame-radius-4)", overflow: "hidden" }}>
            <FlowBottomNav
              items={[
                { key: "home", icon: "home", label: "Home" },
                { key: "search", icon: "search", label: "Search" },
                { key: "activity", icon: "bell", label: "Activity", badge: 3 },
                { key: "profile", icon: "user", label: "Profile" },
              ]}
              activeKey={bottomNavActive}
              onChange={setBottomNavActive}
            />
          </Surface>
        </DemoGroup>

        <DemoGroup>
          <Text role="overline">Icon-Only Variant</Text>
          <Surface padding={0} border style={{ borderRadius: "var(--ref-frame-radius-4)", overflow: "hidden" }}>
            <FlowBottomNav
              items={[
                { key: "home", icon: "home", label: "Home" },
                { key: "search", icon: "search", label: "Search" },
                { key: "activity", icon: "bell", label: "Activity", badge: 12 },
                { key: "profile", icon: "user", label: "Profile" },
              ]}
              activeKey="search"
              onChange={() => {}}
              showLabels={false}
            />
          </Surface>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="FlowBottomSheet"
        description="A panel that slides up from bottom of screen. Used for contextual content without leaving the view."
      >
        <DemoGroup>
          <Text role="overline">Interactive Example</Text>
          <FlowButton variant="medium" onClick={() => setBottomSheetOpen(true)}>
            Open Bottom Sheet
          </FlowButton>

          <FlowBottomSheet
            open={bottomSheetOpen}
            onClose={() => setBottomSheetOpen(false)}
            title="Share with friends"
            snapPoints={["half", "full"]}
          >
            <Stack gap={3}>
              <Text>Select how you&apos;d like to share this content.</Text>
              <FlowShortcutGrid
                actions={[
                  { icon: "search", label: "Message" },
                  { icon: "copy", label: "Copy Link" },
                  { icon: "download", label: "Save" },
                ]}
                columns={3}
              />
            </Stack>
          </FlowBottomSheet>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="FlowFAB"
        description="Floating Action Button for the primary action on a screen. Used sparingly — one per screen maximum."
      >
        <DemoGroup>
          <Text role="overline">Variants</Text>
          <Inline gap={4} style={{ flexWrap: "wrap" }}>
            <FlowFAB
              icon="plus"
              label="Standard"
              size="standard"
              variant="standard"
              contained={true}
            />
            <FlowFAB icon="plus" label="Small" size="small" variant="standard" contained={true} />
            <FlowFAB icon="plus" label="New Message" variant="extended" contained={true} />
          </Inline>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="FlowShortcutGrid"
        description="Grid of shortcut actions with large touch targets. Often used on home screens or dashboards."
      >
        <DemoGroup>
          <Text role="overline">3-Column Grid</Text>
          <FlowShortcutGrid
            actions={[
              { icon: "send", label: "Transfer" },
              { icon: "credit-card", label: "Pay Bills" },
              { icon: "bar-chart", label: "Statements" },
              { icon: "file-text", label: "Documents" },
              { icon: "bell", label: "Alerts" },
              { icon: "user", label: "Support" },
            ]}
            columns={3}
          />
        </DemoGroup>

        <DemoGroup>
          <Text role="overline">4-Column Layout</Text>
          <FlowShortcutGrid
            actions={[
              { icon: "home", label: "Home" },
              { icon: "search", label: "Search" },
              { icon: "settings", label: "Settings" },
              { icon: "user", label: "Profile" },
            ]}
            columns={4}
          />
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="FlowSidebar"
        description="Persistent vertical navigation for desktop applications. Supports collapsed icon-only mode."
      >
        <DemoGroup>
          <Text role="overline">Interactive Example — Collapsible</Text>
          <Surface
            padding={0}
            border
            style={{ borderRadius: "var(--ref-frame-radius-4)", overflow: "hidden", height: "var(--ref-frame-content-sidebar-demo)" }}
          >
            <FlowSidebar
              groups={[
                {
                  items: [
                    {
                      key: "dashboard",
                      icon: "home",
                      label: "Dashboard",
                      active: sidebarActive === "dashboard",
                      onClick: () => setSidebarActive("dashboard"),
                    },
                    {
                      key: "customers",
                      icon: "users",
                      label: "Customers",
                      active: sidebarActive === "customers",
                      onClick: () => setSidebarActive("customers"),
                    },
                    {
                      key: "documents",
                      icon: "file-text",
                      label: "Documents",
                      active: sidebarActive === "documents",
                      onClick: () => setSidebarActive("documents"),
                    },
                    {
                      key: "analytics",
                      icon: "bar-chart",
                      label: "Analytics",
                      active: sidebarActive === "analytics",
                      onClick: () => setSidebarActive("analytics"),
                    },
                    {
                      key: "settings",
                      icon: "settings",
                      label: "Settings",
                      active: sidebarActive === "settings",
                      onClick: () => setSidebarActive("settings"),
                    },
                  ],
                },
              ]}
              collapsed={sidebarCollapsed}
              onCollapsedChange={setSidebarCollapsed}
            />
          </Surface>
          <Text role="caption" color="secondary">
            Try clicking the collapse button to see icon-only mode
          </Text>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="FlowToolbar"
        description="Horizontal bar of contextual actions. Switches to bulk action mode when items are selected."
      >
        <DemoGroup>
          <Text role="overline">Standard Actions</Text>
          <FlowToolbar
            leftActions={
              <>
                <FlowButton variant="low" size="sm" leadingIcon="plus">
                  Create
                </FlowButton>
                <FlowButton variant="low" size="sm" leadingIcon="edit">
                  Edit
                </FlowButton>
                <FlowButton variant="low" size="sm" leadingIcon="download">
                  Archive
                </FlowButton>
              </>
            }
          />
        </DemoGroup>

        <DemoGroup>
          <Text role="overline">With Selection (Bulk Actions)</Text>
          <Stack gap={2}>
            <FlowToolbar
              leftActions={
                <>
                  <Text role="label-m">
                    {dataTableSelected} {dataTableSelected === 1 ? "item" : "items"} selected
                  </Text>
                </>
              }
              rightActions={
                <>
                  <FlowIconButton icon="trash" variant="low" aria-label="Delete selected" />
                  <FlowIconButton icon="download" variant="low" aria-label="Download selected" />
                </>
              }
            />
            <Inline gap={2}>
              {[0, 1, 3, 5].map((count) => (
                <FlowButton
                  key={count}
                  variant="low"
                  size="sm"
                  onClick={() => setDataTableSelected(count)}
                >
                  Select {count}
                </FlowButton>
              ))}
            </Inline>
          </Stack>
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="FlowBreadcrumbs"
        description="Horizontal trail showing location within hierarchical structure. Enables navigation to parent levels."
      >
        <DemoGroup>
          <Text role="overline">Navigation Path</Text>
          <FlowBreadcrumbs
            items={[
              { label: "Home" },
              { label: "Documents" },
              { label: "Projects" },
              { label: "Q1 Report" },
            ]}
          />
        </DemoGroup>

        <DemoGroup>
          <Text role="overline">Shorter Path</Text>
          <FlowBreadcrumbs items={[{ label: "Dashboard" }, { label: "Settings" }]} />
        </DemoGroup>
      </DemoSection>

      <DemoSection
        title="FlowContextMenu"
        description="Right-click menu with contextual actions. Desktop-only interaction pattern."
      >
        <DemoGroup>
          <Text role="overline">Click Button to Open Menu</Text>
          <FlowContextMenu
            items={[
              { icon: "copy", label: "Copy", action: "copy" },
              { icon: "edit", label: "Edit", action: "edit" },
              { type: "divider" },
              { icon: "download", label: "Archive", action: "archive" },
              { type: "divider" },
              { icon: "trash", label: "Delete", action: "delete", variant: "danger" },
            ]}
            onSelect={(action) => {
              console.log("Action:", action);
            }}
          />
        </DemoGroup>

        <DemoGroup>
          <Text role="overline">Custom Trigger</Text>
          <FlowContextMenu
            trigger={
              <FlowButton variant="low" size="sm">
                Options Menu
              </FlowButton>
            }
            items={[
              { icon: "settings", label: "Preferences", action: "preferences" },
              { icon: "user", label: "Account", action: "account" },
              { type: "divider" },
              { icon: "info", label: "Help", action: "help" },
            ]}
            onSelect={(action) => {
              console.log("Action:", action);
            }}
          />
        </DemoGroup>
      </DemoSection>
    </>
  );
}
