/**
 * FLOW Pattern Demos — Input Patterns (First 5)
 * Gold standard demos for: Search, DatePicker, Autocomplete, MultiSelect, FileUpload
 */

import { useState } from "react";

import {
  Divider, FlowAutocomplete, FlowButton, FlowChip, FlowDatePicker,
  FlowFileUpload, FlowList, FlowListItem, FlowMultiSelect, FlowSearch,
  FlowTextInput, Grid, Inline, type MultiSelectOption,
  Stack, Surface, Text, useFlowTheme,
} from "../../lib";
import { Callout } from "../components/doc-primitives";
import { DemoGroup, DemoSection } from "../components/demo-helpers";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SHARED CONSTANTS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/** Standard sizes across all input patterns */
const _SIZES = ["sm", "md", "lg", "xl"] as const;

/** Search sizes (no xl for search patterns) */
const SEARCH_SIZES = ["sm", "md", "lg"] as const;

/**
 * Simulated async delay for loading-state demos.
 * This is intentionally longer than motion tokens (which top out at 500ms)
 * to mimic a realistic network request. Use this constant instead of
 * magic numbers so demos remain consistent and easy to audit.
 *
 * Motion token reference:
 *   instant: 0ms | fast: 100ms | normal: 200ms | slow: 350ms | slower: 500ms
 */
const DEMO_ASYNC_DELAY_MS = 1200;
const DEMO_FILTER_DELAY_MS = 800;

/** State matrix for comprehensive search testing */
const SEARCH_STATES = [
  { label: "Empty", props: {} },
  { label: "Filled", props: { defaultValue: "Design system" } },
  { label: "Loading", props: { loading: true, defaultValue: "Searching..." } },
  { label: "With Shortcut", props: { shortcut: "⌘K" } },
  { label: "No Clear", props: { clearable: false, defaultValue: "Fixed query" } },
  { label: "Auto Focus", props: { autoFocus: true, placeholder: "Focus on mount" } },
] as const;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 1. FLOW SEARCH
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function SearchOverviewDemo() {
  const { breakpoint } = useFlowTheme();
  const gridProps = breakpoint.isDesktop
    ? { columns: 4 as number }
    : breakpoint.isTablet
      ? { columns: 2 as number }
      : { columns: 1 as number };

  return (
    <Stack gap="section">
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* SIZES */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <DemoSection
        title="Sizes"
        description="Search comes in three sizes: sm, md (default), lg. Omit size to let density-aware defaults apply."
      >
        <DemoGroup>
          <Grid {...gridProps} gap="component">
            {SEARCH_SIZES.map((size) => (
              <Stack key={size} gap="component" align="center">
                <Text role="overline" color="tertiary">
                  {size.toUpperCase()}
                </Text>
                <FlowSearch size={size} placeholder={`${size.toUpperCase()} search`} />
              </Stack>
            ))}
          </Grid>
        </DemoGroup>
      </DemoSection>

      <Divider spacing={2} />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* STATES */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <DemoSection
        title="Interactive States"
        description="All interaction states: empty, filled, loading, with shortcut, clearable control, auto-focus."
      >
        <DemoGroup>
          <Grid {...gridProps} gap="component">
            {SEARCH_STATES.map(({ label, props }) => (
              <Stack key={label} gap="component" align="center">
                <Text role="overline" color="tertiary">
                  {label}
                </Text>
                <FlowSearch placeholder="Search..." {...props} />
              </Stack>
            ))}
          </Grid>
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

export function SearchVariantsDemo() {
  const [loadingMap, setLoadingMap] = useState<Record<string, boolean>>({});
  const triggerLoading = (key: string) => {
    setLoadingMap((m) => ({ ...m, [key]: true }));
    setTimeout(() => setLoadingMap((m) => ({ ...m, [key]: false })), DEMO_ASYNC_DELAY_MS);
  };

  return (
    <Stack gap="subsection">
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* SIZE × FEATURE MATRIX */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <DemoSection
        title="Size × Feature Matrix"
        description="Cross-reference of sizes and key features (clearable, shortcut, loading) to verify visual consistency."
      >
        <DemoGroup>
          {SEARCH_SIZES.map((size) => (
            <Stack key={size} gap={1}>
              <Text role="overline" color="tertiary">
                {size.toUpperCase()}
              </Text>
              <Inline gap="component" wrap align="center">
                <FlowSearch size={size} placeholder="Basic" clearable />
                <FlowSearch size={size} placeholder="With ⌘K" shortcut="⌘K" clearable />
                <FlowSearch size={size} placeholder="Loading..." loading clearable />
                <FlowSearch
                  size={size}
                  placeholder="No clear"
                  clearable={false}
                  defaultValue="Fixed"
                />
              </Inline>
            </Stack>
          ))}
        </DemoGroup>
      </DemoSection>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* INTERACTIVE LOADING */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <DemoSection
        title="Interactive Loading States"
        description="Type in any search to trigger async loading state. Each input manages independent loading."
      >
        <DemoGroup>
          <Grid minItemWidth="280px" gap="component-lg">
            {(["documents", "users", "projects"] as const).map((context) => (
              <FlowSearch
                key={context}
                size="md"
                placeholder={`Search ${context}...`}
                loading={loadingMap[context] || false}
                onChange={(value) => value && triggerLoading(context)}
                shortcut={context === "documents" ? "⌘K" : undefined}
              />
            ))}
          </Grid>
        </DemoGroup>
      </DemoSection>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* FULL WIDTH */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <DemoSection
        title="Full Width Layouts"
        description="Search adapts to container width for hero sections, modals, and full-page search experiences."
      >
        <DemoGroup>
          <Stack gap="component">
            <FlowSearch size="lg" placeholder="Hero search (large, full width)" shortcut="⌘K" />
            <FlowSearch size="md" placeholder="Modal search (medium, full width)" />
            <FlowSearch size="sm" placeholder="Inline filter (small, full width)" />
          </Stack>
        </DemoGroup>
      </DemoSection>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* DISABLED STATE */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <DemoSection
        title="Disabled State"
        description="Non-interactive state for read-only or locked search contexts."
      >
        <DemoGroup>
          <Inline gap="component" wrap align="start">
            <FlowSearch size="sm" placeholder="Disabled small" disabled />
            <FlowSearch
              size="md"
              placeholder="Disabled medium"
              disabled
              defaultValue="Locked query"
            />
            <FlowSearch size="lg" placeholder="Disabled large" disabled shortcut="⌘K" />
          </Inline>
        </DemoGroup>
      </DemoSection>
    </Stack>
  );
}

export function SearchUseCasesDemo() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [filterQuery, setFilterQuery] = useState("");

  const handleSearch = (value: string) => {
    setQuery(value);
    setLoading(true);
    setTimeout(() => setLoading(false), DEMO_FILTER_DELAY_MS);
  };

  const allUsers = [
    { name: "Alice Johnson", email: "alice@example.com", role: "Designer" },
    { name: "Bob Smith", email: "bob@example.com", role: "Engineer" },
    { name: "Carol White", email: "carol@example.com", role: "Product Manager" },
    { name: "David Chen", email: "david@example.com", role: "Engineer" },
  ];

  const filteredUsers = allUsers.filter(
    (u) =>
      !filterQuery ||
      u.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(filterQuery.toLowerCase()),
  );

  return (
    <Stack gap="component-lg">
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* USE CASE 1: Document Library */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <Surface variant="primary" padding="container" radius="control">
        <Stack gap="component">
          <Text role="heading-m">Document Library</Text>
          <FlowSearch
            value={query}
            onChange={handleSearch}
            placeholder="Search documents by name, tag, or content..."
            shortcut="⌘K"
            loading={loading}
            size="lg"
          />
          {query && (
            <Callout>
              <Text role="paragraph-s">
                Showing results for <strong>&quot;{query}&quot;</strong>
              </Text>
            </Callout>
          )}
        </Stack>
      </Surface>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* USE CASE 2: Team Directory */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <Surface variant="primary" padding="container" radius="control">
        <Stack gap="component">
          <Inline gap={2} justify="between" align="center">
            <Stack gap={1}>
              <Text role="heading-m">Team Members</Text>
              <Text role="paragraph-s" color="secondary">
                {filteredUsers.length} of {allUsers.length} members
              </Text>
            </Stack>
            <FlowSearch
              size="sm"
              placeholder="Filter..."
              value={filterQuery}
              onChange={setFilterQuery}
            />
          </Inline>
          <FlowList dividers aria-label="Team members list">
            {filteredUsers.map((user) => (
              <FlowListItem
                key={user.email}
                primary={user.name}
                secondary={user.email}
                trailing={<FlowChip size="sm">{user.role}</FlowChip>}
              />
            ))}
            {filteredUsers.length === 0 && (
              <FlowListItem primary="No members found" secondary="Try a different search" />
            )}
          </FlowList>
        </Stack>
      </Surface>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* USE CASE 3: Command Palette */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <Surface variant="primary" padding="container" radius="control">
        <Stack gap="component">
          <Text role="heading-m">Command Bar</Text>
          <Text role="paragraph-s" color="secondary">
            Press ⌘K anywhere to open search
          </Text>
          <FlowSearch placeholder="Search commands..." shortcut="⌘K" size="lg" />
        </Stack>
      </Surface>
    </Stack>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 2. FLOW AUTOCOMPLETE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function AutocompleteOverviewDemo() {
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [value3, setValue3] = useState("");

  const fruits = ["Apple", "Banana", "Cherry", "Date", "Elderberry", "Fig", "Grape", "Honeydew"];
  const countries = ["United States", "United Kingdom", "Canada", "Australia", "Germany", "France"];

  return (
    <Stack gap="subsection">
      <DemoSection
        title="Basic Autocomplete"
        description="Text input with filtered suggestion dropdown."
      >
        <FlowAutocomplete
          label="Select Fruit"
          value={value1}
          onChange={setValue1}
          options={fruits}
          placeholder="Type to search..."
        />
      </DemoSection>

      <DemoSection
        title="With Hint Text"
        description="Hint text provides additional context below the input."
      >
        <FlowAutocomplete
          label="Country"
          value={value2}
          onChange={setValue2}
          options={countries}
          hint="Start typing to see suggestions"
          placeholder="Select a country"
        />
      </DemoSection>

      <DemoSection
        title="Free Text Mode (freeSolo)"
        description="Allows entering values not in the options list."
      >
        <FlowAutocomplete
          label="Programming Language"
          value={value3}
          onChange={setValue3}
          options={["JavaScript", "TypeScript", "Python", "Rust", "Go"]}
          freeSolo
          placeholder="Enter or select a language"
          hint="You can type custom values"
        />
      </DemoSection>

      <DemoSection title="Loading State" description="Shows spinner while fetching async options.">
        <FlowAutocomplete
          label="City"
          options={[]}
          loading
          placeholder="Type to search cities..."
          hint="Loading cities from API..."
        />
      </DemoSection>

      <DemoSection
        title="Validation States"
        description="Error and success states for form validation."
      >
        <Grid minItemWidth="280px" gap="component">
          <FlowAutocomplete label="Valid Selection" options={fruits} defaultValue="Apple" success />
          <FlowAutocomplete
            label="Invalid Entry"
            options={fruits}
            error="Please select a valid fruit"
          />
        </Grid>
      </DemoSection>

      <DemoSection title="Disabled State" description="Non-interactive state for read-only forms.">
        <FlowAutocomplete
          label="Preset Value"
          options={countries}
          defaultValue="United States"
          disabled
        />
      </DemoSection>
    </Stack>
  );
}

export function AutocompleteUseCasesDemo() {
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [skill, setSkill] = useState("");

  return (
    <Stack gap="component-lg">
      <Surface variant="primary" padding="container">
        <Stack gap="component">
          <Text role="heading-m">Address Form</Text>
          <FlowTextInput label="Street Address" placeholder="123 Main St" />
          <FlowAutocomplete
            label="City"
            value={city}
            onChange={setCity}
            options={["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"]}
            placeholder="Select or type city"
          />
          <FlowAutocomplete
            label="State"
            value={state}
            onChange={setState}
            options={["California", "Texas", "New York", "Florida", "Illinois"]}
            placeholder="Select state"
          />
          <FlowButton variant="high">Continue</FlowButton>
        </Stack>
      </Surface>

      <Surface variant="primary" padding="container">
        <Stack gap="component">
          <Text role="heading-m">Profile Setup</Text>
          <Text role="paragraph-s" color="secondary">
            Add skills to your profile
          </Text>
          <FlowAutocomplete
            label="Add Skill"
            value={skill}
            onChange={setSkill}
            options={["React", "Vue", "Angular", "Svelte", "Node.js", "Python"]}
            freeSolo
            placeholder="Type to add skill"
            hint="Can enter custom skills"
          />
          <Inline gap={2}>
            <FlowChip size="sm" removable>
              React
            </FlowChip>
            <FlowChip size="sm" removable>
              TypeScript
            </FlowChip>
            <FlowChip size="sm" removable>
              Design Systems
            </FlowChip>
          </Inline>
        </Stack>
      </Surface>

      <Surface variant="primary" padding="container">
        <Stack gap="component">
          <Text role="heading-m">Quick Filters</Text>
          <Grid minItemWidth="200px" gap="component">
            <FlowAutocomplete
              label="Category"
              options={["All", "Design", "Engineering", "Product"]}
              defaultValue="All"
            />
            <FlowAutocomplete
              label="Status"
              options={["Active", "Pending", "Completed", "Archived"]}
              defaultValue="Active"
            />
          </Grid>
        </Stack>
      </Surface>
    </Stack>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 3. FLOW MULTI SELECT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function MultiSelectOverviewDemo() {
  const [selected1, setSelected1] = useState<string[]>([]);
  const [selected2, setSelected2] = useState<string[]>(["react", "typescript"]);
  const [selected3, setSelected3] = useState<string[]>([]);

  const frameworkOptions: MultiSelectOption[] = [
    { value: "react", label: "React" },
    { value: "vue", label: "Vue" },
    { value: "angular", label: "Angular" },
    { value: "svelte", label: "Svelte" },
  ];

  const manyOptions: MultiSelectOption[] = Array.from({ length: 20 }, (_, i) => ({
    value: `tag-${i}`,
    label: `Tag ${i + 1}`,
  }));

  return (
    <Stack gap="subsection">
      <DemoSection
        title="Basic Multi-Select"
        description="Select multiple options with chip display."
      >
        <FlowMultiSelect
          label="Frameworks"
          options={frameworkOptions}
          value={selected1}
          onChange={setSelected1}
          hint="Select one or more frameworks"
        />
      </DemoSection>

      <DemoSection
        title="With Default Values"
        description="Pre-selected values displayed as chips."
      >
        <FlowMultiSelect
          label="Tech Stack"
          options={frameworkOptions}
          value={selected2}
          onChange={setSelected2}
        />
      </DemoSection>

      <DemoSection title="Searchable Options" description="Search within options for large lists.">
        <FlowMultiSelect
          label="Tags"
          options={manyOptions}
          value={selected3}
          onChange={setSelected3}
          searchable
          hint="Type to filter options"
        />
      </DemoSection>

      <DemoSection title="With Select All" description="Select/deselect all options at once.">
        <FlowMultiSelect
          label="Skills"
          options={frameworkOptions}
          value={selected1}
          onChange={setSelected1}
          selectAll
        />
      </DemoSection>

      <DemoSection title="Size Variants" description="Multi-select supports standard sizes.">
        <Stack gap="component">
          <FlowMultiSelect label="Small" size="sm" options={frameworkOptions} value={["react"]} />
          <FlowMultiSelect
            label="Medium"
            size="md"
            options={frameworkOptions}
            value={["react", "vue"]}
          />
        </Stack>
      </DemoSection>

      <DemoSection title="Validation States" description="Error and disabled states.">
        <Grid minItemWidth="280px" gap="component">
          <FlowMultiSelect
            label="Required Field"
            options={frameworkOptions}
            error="Please select at least one option"
          />
          <FlowMultiSelect label="Disabled" options={frameworkOptions} value={["react"]} disabled />
        </Grid>
      </DemoSection>
    </Stack>
  );
}

export function MultiSelectUseCasesDemo() {
  const [frameworks, setFrameworks] = useState<string[]>(["react"]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [assignees, setAssignees] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>(["important", "review"]);

  return (
    <Stack gap="component-lg">
      <Surface variant="primary" padding="container">
        <Stack gap="component">
          <Text role="heading-m">Project Configuration</Text>
          <FlowTextInput label="Project Name" placeholder="My Awesome Project" />
          <FlowMultiSelect
            label="Frameworks"
            options={[
              { value: "react", label: "React" },
              { value: "vue", label: "Vue" },
              { value: "angular", label: "Angular" },
              { value: "svelte", label: "Svelte" },
            ]}
            value={frameworks}
            onChange={setFrameworks}
            hint="Select one or more frameworks"
          />
          <FlowMultiSelect
            label="Languages"
            options={[
              { value: "js", label: "JavaScript" },
              { value: "ts", label: "TypeScript" },
              { value: "py", label: "Python" },
              { value: "go", label: "Go" },
            ]}
            value={languages}
            onChange={setLanguages}
            selectAll
            searchable
          />
          <FlowButton variant="high">Create Project</FlowButton>
        </Stack>
      </Surface>

      <Surface variant="primary" padding="container">
        <Stack gap="component">
          <Text role="heading-m">Task Assignment</Text>
          <FlowTextInput label="Task Title" placeholder="Update documentation" />
          <FlowMultiSelect
            label="Assign To"
            options={[
              { value: "alice", label: "Alice Johnson" },
              { value: "bob", label: "Bob Smith" },
              { value: "carol", label: "Carol White" },
              { value: "david", label: "David Chen" },
            ]}
            value={assignees}
            onChange={setAssignees}
            searchable
            hint="Search team members"
          />
          <FlowMultiSelect
            label="Tags"
            options={[
              { value: "important", label: "Important" },
              { value: "urgent", label: "Urgent" },
              { value: "review", label: "Needs Review" },
              { value: "blocked", label: "Blocked" },
            ]}
            value={tags}
            onChange={setTags}
          />
          <Inline gap={2}>
            <FlowButton variant="high">Create Task</FlowButton>
            <FlowButton variant="outline">Cancel</FlowButton>
          </Inline>
        </Stack>
      </Surface>

      <Surface variant="primary" padding="container">
        <Stack gap="component">
          <Text role="heading-m">Filter Panel</Text>
          <FlowMultiSelect
            label="Categories"
            options={[
              { value: "design", label: "Design" },
              { value: "engineering", label: "Engineering" },
              { value: "product", label: "Product" },
              { value: "marketing", label: "Marketing" },
            ]}
            selectAll
            searchable
            size="sm"
          />
          <FlowButton variant="outline" size="sm">
            Apply Filters
          </FlowButton>
        </Stack>
      </Surface>
    </Stack>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 4. FLOW DATE PICKER
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function DatePickerOverviewDemo() {
  const [date1, setDate1] = useState<string>("");
  const [date2, setDate2] = useState<string>("2026-03-15");

  const today = new Date().toISOString().split("T")[0];
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowISO = tomorrow.toISOString().split("T")[0];

  const oneYearFromNow = new Date();
  oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
  const oneYearISO = oneYearFromNow.toISOString().split("T")[0];

  return (
    <Stack gap="subsection">
      <DemoSection
        title="Basic Date Picker"
        description="Date selection with calendar popover and text input."
      >
        <FlowDatePicker label="Select Date" value={date1} onChange={setDate1} />
      </DemoSection>

      <DemoSection title="With Default Value" description="Pre-filled date displayed in input.">
        <FlowDatePicker label="Event Date" value={date2} onChange={setDate2} />
      </DemoSection>

      <DemoSection
        title="Date Constraints"
        description="Min/max date to restrict selectable range."
      >
        <Grid minItemWidth="280px" gap="component">
          <FlowDatePicker
            label="Future Dates Only"
            min={tomorrowISO}
            placeholder="Select a future date"
          />
          <FlowDatePicker
            label="Within One Year"
            min={today}
            max={oneYearISO}
            placeholder="Max 1 year from today"
          />
        </Grid>
      </DemoSection>

      <DemoSection title="Size Variants" description="Date picker supports standard sizes.">
        <Stack gap="component">
          <FlowDatePicker label="Small" size="sm" defaultValue="2026-03-11" />
          <FlowDatePicker label="Medium" size="md" defaultValue="2026-03-11" />
          <FlowDatePicker label="Large" size="lg" defaultValue="2026-03-11" />
        </Stack>
      </DemoSection>

      <DemoSection title="Validation States" description="Error state for form validation.">
        <Grid minItemWidth="280px" gap="component">
          <FlowDatePicker label="Valid Date" defaultValue="2026-03-11" />
          <FlowDatePicker label="Invalid Date" error />
        </Grid>
      </DemoSection>

      <DemoSection title="Disabled State" description="Non-interactive state for read-only forms.">
        <FlowDatePicker label="Fixed Date" disabled defaultValue="2026-03-11" />
      </DemoSection>
    </Stack>
  );
}

export function DatePickerUseCasesDemo() {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [birthDate, setBirthDate] = useState<string>("");

  const today = new Date().toISOString().split("T")[0];
  const maxBirthDate = new Date();
  maxBirthDate.setFullYear(maxBirthDate.getFullYear() - 18);
  const maxBirthISO = maxBirthDate.toISOString().split("T")[0];

  return (
    <Stack gap="component-lg">
      <Surface variant="primary" padding="container">
        <Stack gap="component">
          <Text role="heading-m">Event Planning</Text>
          <FlowTextInput label="Event Name" placeholder="Team Offsite 2026" />
          <FlowDatePicker
            label="Start Date"
            value={startDate}
            onChange={setStartDate}
            min={today}
            placeholder="Select start date"
          />
          <FlowDatePicker
            label="End Date"
            value={endDate}
            onChange={setEndDate}
            min={startDate || today}
            placeholder="Select end date"
          />
          <FlowButton variant="high">Create Event</FlowButton>
        </Stack>
      </Surface>

      <Surface variant="primary" padding="container">
        <Stack gap="component">
          <Text role="heading-m">User Profile</Text>
          <FlowTextInput label="Full Name" placeholder="Jane Doe" />
          <FlowDatePicker
            label="Date of Birth"
            value={birthDate}
            onChange={setBirthDate}
            max={maxBirthISO}
            placeholder="MM/DD/YYYY"
          />
          <Text role="paragraph-s" color="secondary">
            You must be 18 or older
          </Text>
          <FlowButton variant="high">Save Profile</FlowButton>
        </Stack>
      </Surface>

      <Surface variant="primary" padding="container">
        <Stack gap="component">
          <Text role="heading-m">Task Deadline</Text>
          <FlowTextInput label="Task Title" placeholder="Review design mockups" />
          <FlowDatePicker label="Due Date (Optional)" min={today} placeholder="Select deadline" />
          <Inline gap={2}>
            <FlowButton variant="high">Create Task</FlowButton>
            <FlowButton variant="outline">Cancel</FlowButton>
          </Inline>
        </Stack>
      </Surface>

      <Surface variant="primary" padding="container">
        <Stack gap="component">
          <Text role="heading-m">Availability Calendar</Text>
          <Text role="paragraph-s" color="secondary">
            Select your available dates
          </Text>
          <Grid minItemWidth="250px" gap="component">
            <FlowDatePicker label="From" defaultValue={today} />
            <FlowDatePicker label="To" min={today} />
          </Grid>
          <FlowButton variant="outline">Save Availability</FlowButton>
        </Stack>
      </Surface>
    </Stack>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 5. FLOW FILE UPLOAD
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function FileUploadOverviewDemo() {
  const [files1, setFiles1] = useState<File[]>([]);

  const handleUpload = (newFiles: File[]) => {
    setFiles1([...files1, ...newFiles]);
  };

  return (
    <Stack gap="subsection">
      <DemoSection
        title="Basic File Upload"
        description="Drag-and-drop zone with browse button and progress tracking."
      >
        <FlowFileUpload onFiles={handleUpload} label="Upload Documents" />
      </DemoSection>

      <DemoSection title="Image Upload Only" description="Restrict file types with accept prop.">
        <FlowFileUpload
          accept="image/*"
          label="Upload Images"
          description="Only image files (PNG, JPG, GIF)"
        />
      </DemoSection>

      <DemoSection title="Single File Mode" description="Allow only one file at a time.">
        <FlowFileUpload
          multiple={false}
          label="Upload Profile Photo"
          description="Select a single image file"
        />
      </DemoSection>

      <DemoSection
        title="File Size Limit"
        description="Restrict maximum file size (5MB in this example)."
      >
        <FlowFileUpload
          maxSizeMB={5}
          label="Upload Document"
          description="Maximum file size: 5MB"
        />
      </DemoSection>

      <DemoSection title="Size Variants" description="File upload supports standard sizes.">
        <Stack gap="component">
          <FlowFileUpload size="sm" label="Small Upload" />
          <FlowFileUpload size="md" label="Medium Upload (default)" />
          <FlowFileUpload size="lg" label="Large Upload" />
        </Stack>
      </DemoSection>

      <DemoSection
        title="Disabled State"
        description="Non-interactive state when uploads are not allowed."
      >
        <FlowFileUpload
          disabled
          label="Upload Disabled"
          description="File uploads temporarily disabled"
        />
      </DemoSection>
    </Stack>
  );
}

export function FileUploadUseCasesDemo() {
  return (
    <Stack gap="component-lg">
      <Surface variant="primary" padding="container">
        <Stack gap="component">
          <Text role="heading-m">Profile Photo</Text>
          <Text role="paragraph-s" color="secondary">
            Upload a profile picture
          </Text>
          <FlowFileUpload
            accept="image/*"
            multiple={false}
            maxSizeMB={2}
            label="Profile Photo"
            description="PNG or JPG, max 2MB"
          />
          <FlowButton variant="high">Save Profile</FlowButton>
        </Stack>
      </Surface>

      <Surface variant="primary" padding="container">
        <Stack gap="component">
          <Text role="heading-m">Document Upload</Text>
          <Text role="paragraph-s" color="secondary">
            Upload supporting documents (PDF, DOCX)
          </Text>
          <FlowFileUpload
            accept=".pdf,.doc,.docx"
            multiple
            maxSizeMB={10}
            maxFiles={5}
            label="Supporting Documents"
            description="PDF or Word documents, max 10MB each, up to 5 files"
          />
          <Inline gap={2}>
            <FlowButton variant="high">Submit Application</FlowButton>
            <FlowButton variant="outline">Cancel</FlowButton>
          </Inline>
        </Stack>
      </Surface>

      <Surface variant="primary" padding="container">
        <Stack gap="component">
          <Text role="heading-m">Bulk Import</Text>
          <Text role="paragraph-s" color="secondary">
            Upload CSV file to import data
          </Text>
          <FlowFileUpload
            accept=".csv"
            multiple={false}
            maxFiles={1}
            label="Import Data"
            description="CSV format only"
          />
          <Inline gap={2}>
            <FlowButton variant="high">Import</FlowButton>
            <FlowButton variant="outline">Download Template</FlowButton>
          </Inline>
        </Stack>
      </Surface>

      <Surface variant="primary" padding="container">
        <Stack gap="component">
          <Text role="heading-m">Media Gallery</Text>
          <FlowFileUpload
            accept="image/*,video/*"
            multiple
            maxSizeMB={50}
            maxFiles={20}
            label="Upload Media"
            description="Images or videos, max 50MB per file, up to 20 files"
            size="lg"
          />
        </Stack>
      </Surface>
    </Stack>
  );
}
