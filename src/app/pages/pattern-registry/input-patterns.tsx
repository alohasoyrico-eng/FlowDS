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
import React, { type ReactNode } from "react";

import type { PlaygroundConfig } from "../../components/prop-playground";
import {
  FlowAutocomplete,
  FlowColorPicker,
  FlowDatePicker,
  FlowDateRangePicker,
  FlowFileUpload,
  FlowInlineEditable,
  FlowMultiSelect,
  FlowRichTextEditor,
  FlowSearch,
  Stack,
  Surface,
  Text,
} from "@flow/design-system";
import { DemoSection } from "../../components/demo-helpers";
export type { PropEntry, GuidelineEntry } from "../../components/doc-primitives";
import { Callout } from "../../components/doc-primitives";
import type { AccessibilitySpec, AnatomyEntry, KeyboardInteraction } from "../registry/types";
export type { AccessibilitySpec, AnatomyEntry, KeyboardInteraction };

// ── Input pattern demos (priority 5) ──
import {
  AutocompleteOverviewDemo,
  AutocompleteUseCasesDemo,
  DatePickerOverviewDemo,
  DatePickerUseCasesDemo,
  FileUploadOverviewDemo,
  FileUploadUseCasesDemo,
  MultiSelectOverviewDemo,
  MultiSelectUseCasesDemo,
  SearchOverviewDemo,
  SearchUseCasesDemo,
  SearchVariantsDemo,
} from "../input-pattern-demos";

// ── Input pattern demos (remaining 6) ──
import {
  ColorPickerOverviewDemo,
  ColorPickerUseCasesDemo,
  DateRangePickerOverviewDemo,
  DateRangePickerUseCasesDemo,
  InlineEditableOverviewDemo,
  InlineEditableUseCasesDemo,
  OTPInputOverviewDemo,
  OTPInputUseCasesDemo,
  PhoneInputOverviewDemo,
  PhoneInputUseCasesDemo,
  RichTextEditorOverviewDemo,
  RichTextEditorUseCasesDemo,
} from "../input-pattern-demos-2";

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
// INPUT PATTERNS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// NOTE: These entries have minimal demos for now. Full demos to be added progressively.

// Simple demo placeholder for patterns without full demos yet
function _PlaceholderDemo({ patternName = "Pattern" }: { patternName?: string } = {}) {
  return (
    <Stack gap={4}>
      <Callout>
        <Text variant="paragraph-s" color="accent">
          <strong>🚧 Demos in progress</strong>
          <br />
          Full interactive demos for <strong>{patternName}</strong> are being developed.
          <br />
          Component is fully functional — import and use as documented below.
        </Text>
      </Callout>
      <DemoSection
        title="Component Available"
        description={`${patternName} is implemented and ready to use. See Developer tab for usage examples.`}
      >
        <Surface variant="secondary" padding="container">
          <Text variant="paragraph-s" color="secondary">
            Interactive demos coming soon. Component works as specified in props and guidelines.
          </Text>
        </Surface>
      </DemoSection>
    </Stack>
  );
}

const phoneInputEntry: PatternEntry = {
  category: "input-patterns",
  spec: {
    name: "Phone Input",
    purpose:
      "International phone number input with country code selection, flag display, and formatting validation.",
    platform: "shared",
    composesL3: ["FlowTextInput", "FlowSelect", "FlowIcon"],
    orchestrates: [
      "Country selection with flag + dial code",
      "Phone number formatting per country",
      "Paste handling + validation",
    ],
  },
  composition: [
    { component: "FlowTextInput", role: "Phone number text entry", tokens: [] },
    { component: "FlowSelect", role: "Country code selector dropdown", tokens: [] },
  ],
  demos: {
    overview: PhoneInputOverviewDemo,
    useCases: PhoneInputUseCasesDemo,
  },
  developer: {
    reactImport: `import { FlowPhoneInput } from "@flow/design-system";`,
    reactUsage: `<FlowPhoneInput
  label="Phone Number"
  value={phone}
  onChange={setPhone}
  country={country}
  onCountryChange={(entry) => setCountry(entry.code)}
/>`,
    flutterImport: `import 'package:flow/patterns/phone_input.dart';`,
    flutterUsage: `FlowPhoneInput(
  label: 'Phone Number',
  value: phone,
  onChanged: setPhone,
  country: country,
  onCountryChanged: (entry) => setCountry(entry.code),
)`,
    props: [
      { name: "label", type: "string", required: true, description: "Field label text." },
      {
        name: "value",
        type: "string",
        required: false,
        description: "Controlled phone number value.",
      },
      {
        name: "onChange",
        type: "(value: string) => void",
        required: false,
        description: "Change handler.",
      },
      {
        name: "country",
        type: "string",
        required: false,
        defaultValue: "'US'",
        description: "Two-letter country code (ISO 3166-1).",
      },
      { name: "error", type: "string", required: false, description: "Error message." },
      { name: "hint", type: "string", required: false, description: "Hint text." },
      {
        name: "disabled",
        type: "boolean",
        required: false,
        defaultValue: "false",
        description: "Whether disabled.",
      },
      {
        name: "size",
        type: "'sm' | 'md' | 'lg' | 'xl'",
        required: false,
        defaultValue: "'md'",
        description: "Input size.",
      },
    ],
    guidelines: [
      { type: "do", text: "Use for international phone number entry." },
      { type: "do", text: "Default to user's detected country when possible." },
      { type: "dont", text: "Don't use for domestic-only forms." },
    ],
  },
};

const searchEntry: PatternEntry = {
  category: "input-patterns",
  spec: {
    name: "Search",
    purpose:
      "Search input with debounced query, keyboard shortcuts, and clear button. Optimized for filtering, global search, and command palettes.",
    platform: "shared",
    composesL3: ["FlowTextInput", "FlowIcon", "FlowIconButton", "FlowCircularProgress"],
    orchestrates: [
      "Debounced query emission (300-500ms)",
      "Clear button visibility logic",
      "Keyboard shortcut hint display",
      "Loading spinner during async search",
      "Auto-focus behavior",
    ],
    doesNotOwn: [
      "Results rendering (use FlowList, FlowEmptyState)",
      "Search logic (filtering, API calls)",
      "Result highlighting",
    ],
    anatomy: [
      {
        part: "Search icon",
        description: "Leading FlowIcon (magnifying glass) — visual affordance for search input",
        tokens: ["comp.textinput.icon.*"],
      },
      {
        part: "Text input",
        description: "FlowTextInput — handles query entry, focus states, placeholder",
        tokens: ["comp.textinput.*"],
      },
      {
        part: "Shortcut hint",
        description: "Trailing Text (⌘K, Ctrl+K) — keyboard shortcut indicator",
        tokens: ["comp.textinput.hint.*"],
        note: "Only shown when shortcut prop provided",
      },
      {
        part: "Clear button",
        description: "FlowIconButton (X icon) — clears query on click",
        tokens: ["comp.iconButton.*"],
        note: "Only shown when clearable=true and value is non-empty",
      },
      {
        part: "Loading spinner",
        description:
          "FlowCircularProgress (indeterminate) — replaces search icon during loading=true",
        tokens: [],
        note: "Inherits color from text input icon slot",
      },
    ],

    variants: [
      "Basic — search icon + clear button",
      "With shortcut — shows keyboard hint (⌘K, Ctrl+K)",
      "Loading — spinner replaces search icon during async operations",
      "No clear — clearable=false, permanent query",
      "Auto-focus — autoFocus=true, immediate keyboard entry",
    ],

    states: ["empty", "filled", "focused", "loading", "disabled"],

    accessibility: {
      handled: [
        "FlowTextInput provides implicit role='searchbox'",
        "Clear button has aria-label='Clear search'",
        "Loading state sets aria-busy='true' on input",
        "Shortcut hint is aria-hidden (visual only)",
        "Focus ring via :focus-visible (keyboard only)",
        "prefers-reduced-motion respected for transitions",
      ],
      required: [
        "Provide placeholder text describing search scope ('Search documents...', 'Filter users...')",
        "If results appear, ensure they have proper ARIA labeling (use FlowList with aria-label)",
      ],
      keyboard: [
        { key: "Tab", action: "Focus input" },
        { key: "Any key", action: "Enter query" },
        { key: "Escape", action: "Clear (if clearable=true)" },
        {
          key: "Custom shortcut (e.g., \u2318K)",
          action: "Focus from anywhere (consumer must implement)",
        },
      ],
    },
  },

  composition: [
    { component: "FlowTextInput", role: "Query text entry", tokens: ["comp.textinput.*"] },
    {
      component: "FlowIcon",
      role: "Search affordance (leading icon)",
      tokens: ["comp.textinput.icon.*"],
    },
    { component: "FlowIconButton", role: "Clear button (trailing)", tokens: ["comp.iconButton.*"] },
    {
      component: "FlowCircularProgress",
      role: "Loading indicator (replaces search icon)",
      tokens: [],
    },
  ],

  demos: {
    overview: SearchOverviewDemo,
    variants: SearchVariantsDemo,
    useCases: SearchUseCasesDemo,
  },

  developer: {
    reactImport: `import { FlowSearch } from "@flow/design-system";`,

    reactUsage: `// Density-aware — omit size to let FLOW resolve it
<FlowSearch
  placeholder="Search documents..."
  onChange={handleSearch}
/>

// With keyboard shortcut hint
<FlowSearch
  placeholder="Search..."
  shortcut="⌘K"
  onChange={handleSearch}
/>

// Async search with loading state
<FlowSearch
  value={query}
  onChange={handleSearch}
  loading={isSearching}
  placeholder="Type to search..."
/>

// Controlled with debounce (recommended pattern)
const [query, setQuery] = useState("");
const debouncedQuery = useDebounce(query, 300);

useEffect(() => {
  if (debouncedQuery) {
    performSearch(debouncedQuery);
  }
}, [debouncedQuery]);

<FlowSearch
  value={query}
  onChange={setQuery}
  placeholder="Search..."
  shortcut="⌘K"
/>

// Auto-focus for modals/dialogs
<FlowSearch
  placeholder="Search..."
  autoFocus
/>

// Without clear button
<FlowSearch
  placeholder="Permanent search"
  clearable={false}
  defaultValue="Design system"
/>`,

    flutterImport: `import 'package:flow_ds/patterns.dart';`,

    flutterUsage: `// Basic search
FlowSearch(
  placeholder: 'Search documents...',
  onChanged: handleSearch,
)

// With keyboard shortcut
FlowSearch(
  placeholder: 'Search...',
  shortcut: '⌘K',
  onChanged: handleSearch,
)

// Async search with loading
FlowSearch(
  value: query,
  onChanged: handleSearch,
  loading: isSearching,
  placeholder: 'Type to search...',
)

// Auto-focus
FlowSearch(
  placeholder: 'Search...',
  autoFocus: true,
)`,

    props: [
      {
        name: "value",
        type: "string",
        required: false,
        description:
          "Controlled search query value. Omit for uncontrolled usage. Use with onChange for controlled input with debouncing.",
      },
      {
        name: "onChange",
        type: "(value: string) => void",
        required: false,
        description:
          "Change handler fired on every keystroke. Recommended: debounce this callback (300-500ms) for async search to avoid excessive API calls.",
      },
      {
        name: "placeholder",
        type: "string",
        required: false,
        defaultValue: "'Search...'",
        description:
          "Placeholder text describing search scope. Be specific: 'Search documents...', 'Filter team members...', 'Find commands...'",
      },
      {
        name: "shortcut",
        type: "string",
        required: false,
        description:
          "Keyboard shortcut hint displayed as trailing text (e.g., '⌘K', 'Ctrl+K'). Visual only — consumer must implement actual shortcut listener.",
      },
      {
        name: "loading",
        type: "boolean",
        required: false,
        defaultValue: "false",
        description:
          "Shows loading spinner (replaces search icon) and sets aria-busy='true'. Use during async search operations to indicate progress.",
      },
      {
        name: "clearable",
        type: "boolean",
        required: false,
        defaultValue: "true",
        description:
          "Shows clear button (X icon) when query is non-empty. Set to false for permanent/fixed search queries.",
      },
      {
        name: "autoFocus",
        type: "boolean",
        required: false,
        defaultValue: "false",
        description:
          "Auto-focuses input on mount. Use for modals, dialogs, or dedicated search pages where immediate input is expected.",
      },
      {
        name: "size",
        type: "'sm' | 'md' | 'lg'",
        required: false,
        defaultValue: "density-aware",
        description:
          "Explicit size override. Omit to let useFlowDefaultSize resolve from viewport density (compact→md, default→lg, comfortable→lg).",
      },
      {
        name: "disabled",
        type: "boolean",
        required: false,
        defaultValue: "false",
        description:
          "Disables input interaction, removes from tab order, and visually mutes the search field.",
      },
      {
        name: "onClear",
        type: "() => void",
        required: false,
        description:
          "Callback fired when clear button is clicked. If omitted, clear button automatically sets value to empty string.",
      },
    ],

    guidelines: [
      {
        type: "do",
        text: "Debounce onChange (300-500ms) for async search to avoid excessive API calls and improve performance. Use a debounce hook or library like lodash.debounce.",
      },
      {
        type: "do",
        text: "Show loading state during search operations to provide feedback. Set loading=true when fetching results, false when complete.",
      },
      {
        type: "do",
        text: "Provide specific placeholder text describing search scope ('Search 1,240 documents...', 'Filter 48 team members...').",
      },
      {
        type: "do",
        text: "Use FlowEmptyState for no-results messaging. Place it where results would normally appear with actionable suggestions.",
      },
      {
        type: "do",
        text: "For command palettes or global search, set autoFocus=true and provide shortcut='⌘K' for discoverability.",
      },
      {
        type: "dont",
        text: "Don't trigger search on every keystroke without debounce — it creates unnecessary load and degrades UX with flickering results.",
      },
      {
        type: "dont",
        text: "Don't implement your own search icon + input combo — FlowSearch handles composition, states, and accessibility correctly.",
      },
      {
        type: "dont",
        text: "Don't hide the clear button on mobile — touch users need an easy way to clear query without deleting character-by-character.",
      },
      {
        type: "info",
        text: "FlowSearch is a controlled component when value prop is provided. For uncontrolled usage, omit value and use defaultValue instead.",
      },
      {
        type: "info",
        text: "The shortcut prop is display-only — you must implement the actual keyboard listener (e.g., useEffect with keydown listener for Cmd+K).",
      },
      {
        type: "info",
        text: "Search uses FlowTextInput internally, inheriting all text input tokens (height, padding, border, focus-ring). No search-specific tokens needed.",
      },
    ],
  },
  playground: {
    renderPreview: (props: Record<string, unknown>) =>
      React.createElement(FlowSearch, {
        placeholder: (props.placeholder as string) ?? "Search...",
        size: (props.size as string) ?? "md",
        disabled: (props.disabled as boolean) ?? false,
        onSearch: () => {},
      } as unknown as React.ComponentProps<typeof FlowSearch>),
    defaults: { placeholder: "Search...", size: "md", disabled: false },
    excludeControls: ["onSearch", "onChange", "value", "suggestions", "shortcut", "className", "style"],
  },
};

const autocompleteEntry: PatternEntry = {
  category: "input-patterns",
  spec: {
    name: "Autocomplete",
    purpose:
      "Text input with suggestion dropdown. Supports free-text, option selection, and async loading.",
    platform: "shared",
    composesL3: ["FlowTextInput", "FlowList", "FlowListItem", "FlowCircularProgress"],
    orchestrates: [
      "Async option fetching",
      "Filter/highlight matching",
      "Free-text + selection modes",
      "Keyboard navigation",
    ],
  },
  composition: [
    { component: "FlowTextInput", role: "Text entry", tokens: [] },
    { component: "FlowList", role: "Dropdown container", tokens: [] },
  ],
  demos: {
    overview: AutocompleteOverviewDemo,
    useCases: AutocompleteUseCasesDemo,
  },
  developer: {
    reactImport: `import { FlowAutocomplete } from "@flow/design-system";`,
    reactUsage: `<FlowAutocomplete
  label="Country"
  value={value}
  onChange={setValue}
  options={countries}
  loading={isLoading}
  freeSolo
/>`,
    flutterImport: `import 'package:flow/patterns/autocomplete.dart';`,
    flutterUsage: `FlowAutocomplete(
  label: 'Country',
  value: value,
  onChanged: setValue,
  options: countries,
  loading: isLoading,
  freeSolo: true,
)`,
    props: [
      { name: "label", type: "string", required: true, description: "Field label." },
      { name: "options", type: "string[]", required: true, description: "Suggestion options." },
      { name: "value", type: "string", required: false, description: "Controlled value." },
      {
        name: "onChange",
        type: "(value: string) => void",
        required: false,
        description: "Change handler.",
      },
      {
        name: "loading",
        type: "boolean",
        required: false,
        defaultValue: "false",
        description: "Loading spinner.",
      },
      {
        name: "freeSolo",
        type: "boolean",
        required: false,
        defaultValue: "false",
        description: "Allow custom values.",
      },
    ],
    guidelines: [
      { type: "do", text: "Use for inputs with 10+ options." },
      { type: "do", text: "Enable freeSolo for custom value entry." },
      { type: "dont", text: "Don't use for < 5 options." },
    ],
  },
  playground: {
    renderPreview: (props: Record<string, unknown>) =>
      React.createElement(FlowAutocomplete, {
        options: props.options,
        label: (props.label as string) ?? "Country",
        placeholder: (props.placeholder as string) ?? "Select a country...",
        size: (props.size as string) ?? "md",
        disabled: (props.disabled as boolean) ?? false,
        onSelect: () => {},
      } as unknown as React.ComponentProps<typeof FlowAutocomplete>),
    defaults: { label: "Country", placeholder: "Select a country...", size: "md", disabled: false },
    fixtures: {
      options: [
        { value: "mx", label: "Mexico" },
        { value: "us", label: "United States" },
        { value: "ca", label: "Canada" },
        { value: "br", label: "Brazil" },
      ],
    },
    excludeControls: ["options", "onSelect", "onChange", "value", "className", "style"],
  },
};

const multiSelectEntry: PatternEntry = {
  category: "input-patterns",
  spec: {
    name: "Multi Select",
    purpose: "Multi-selection with chip display, searchable dropdown, and select-all.",
    platform: "shared",
    composesL3: ["FlowSelect", "FlowChip", "FlowCheckbox", "FlowTextInput"],
    orchestrates: [
      "Chip list management",
      "Search within options",
      "Select-all / deselect-all",
      "Overflow indicator",
    ],
  },
  composition: [
    { component: "FlowSelect", role: "Dropdown container", tokens: [] },
    { component: "FlowChip", role: "Selected item chips", tokens: [] },
  ],
  demos: {
    overview: MultiSelectOverviewDemo,
    useCases: MultiSelectUseCasesDemo,
  },
  developer: {
    reactImport: `import { FlowMultiSelect, type MultiSelectOption } from "@flow/design-system";`,
    reactUsage: `<FlowMultiSelect
  label="Tags"
  options={options}
  value={selected}
  onChange={setSelected}
  searchable
  selectAll
/>`,
    flutterImport: `import 'package:flow/patterns/multi_select.dart';`,
    flutterUsage: `FlowMultiSelect(
  label: 'Tags',
  options: options,
  value: selected,
  onChanged: setSelected,
  searchable: true,
  selectAll: true,
)`,
    props: [
      { name: "label", type: "string", required: true, description: "Field label." },
      {
        name: "options",
        type: "MultiSelectOption[]",
        required: true,
        description: "Array of { value, label }.",
      },
      { name: "value", type: "string[]", required: false, description: "Selected values array." },
      {
        name: "onChange",
        type: "(value: string[]) => void",
        required: false,
        description: "Change handler.",
      },
      {
        name: "searchable",
        type: "boolean",
        required: false,
        defaultValue: "false",
        description: "Enable search.",
      },
      {
        name: "selectAll",
        type: "boolean",
        required: false,
        defaultValue: "false",
        description: "Show select-all action.",
      },
    ],
    guidelines: [
      { type: "do", text: "Use for selecting multiple items from a list." },
      { type: "do", text: "Enable search for lists with 10+ options." },
      { type: "dont", text: "Don't use for single selection." },
    ],
  },
  playground: {
    renderPreview: (props: Record<string, unknown>) =>
      React.createElement(FlowMultiSelect, {
        options: props.options,
        label: (props.label as string) ?? "Tags",
        placeholder: (props.placeholder as string) ?? "Select tags...",
        size: (props.size as string) ?? "md",
        disabled: (props.disabled as boolean) ?? false,
        onChange: () => {},
      } as unknown as React.ComponentProps<typeof FlowMultiSelect>),
    defaults: { label: "Tags", placeholder: "Select tags...", size: "md", disabled: false },
    fixtures: {
      options: [
        { value: "react", label: "React" },
        { value: "typescript", label: "TypeScript" },
        { value: "design", label: "Design" },
        { value: "testing", label: "Testing" },
      ],
    },
    excludeControls: ["options", "onChange", "value", "className", "style"],
  },
};

const datePickerEntry: PatternEntry = {
  category: "input-patterns",
  spec: {
    name: "Date Picker",
    purpose: "Date selection with calendar grid, month/year navigation, and text input.",
    platform: "shared",
    composesL3: ["FlowTextInput", "FlowPopover", "FlowIconButton", "Surface"],
    orchestrates: [
      "Calendar grid rendering",
      "Month/year navigation",
      "Date parsing from text",
      "Min/max constraints",
    ],
  },
  composition: [{ component: "FlowTextInput", role: "Date text entry", tokens: [] }],
  demos: {
    overview: DatePickerOverviewDemo,
    useCases: DatePickerUseCasesDemo,
  },
  developer: {
    reactImport: `import { FlowDatePicker } from "@flow/design-system";`,
    reactUsage: `<FlowDatePicker
  label="Start Date"
  value={date}
  onChange={setDate}
  min="2026-03-11"
/>`,
    flutterImport: `import 'package:flow/patterns/date_picker.dart';`,
    flutterUsage: `FlowDatePicker(
  label: 'Start Date',
  value: date,
  onChanged: setDate,
  min: '2026-03-11',
)`,
    props: [
      { name: "label", type: "string", required: false, description: "Field label." },
      {
        name: "value",
        type: "string",
        required: false,
        description: "Controlled date value (ISO YYYY-MM-DD).",
      },
      {
        name: "defaultValue",
        type: "string",
        required: false,
        description: "Default date (uncontrolled).",
      },
      {
        name: "onChange",
        type: "(date: string) => void",
        required: false,
        description: "Change handler (ISO string).",
      },
      {
        name: "min",
        type: "string",
        required: false,
        description: "Minimum selectable date (ISO).",
      },
      {
        name: "max",
        type: "string",
        required: false,
        description: "Maximum selectable date (ISO).",
      },
      { name: "placeholder", type: "string", required: false, description: "Placeholder text." },
      {
        name: "error",
        type: "boolean",
        required: false,
        defaultValue: "false",
        description: "Error state.",
      },
      {
        name: "disabled",
        type: "boolean",
        required: false,
        defaultValue: "false",
        description: "Whether disabled.",
      },
      {
        name: "size",
        type: "'sm' | 'md' | 'lg' | 'xl'",
        required: false,
        defaultValue: "'md'",
        description: "Input size.",
      },
    ],
    guidelines: [
      { type: "do", text: "Use for single date selection." },
      { type: "do", text: "Set minDate/maxDate to prevent invalid selections." },
      { type: "dont", text: "Don't use for date ranges — use FlowDateRangePicker." },
    ],
  },
  playground: {
    renderPreview: (props: Record<string, unknown>) =>
      React.createElement(FlowDatePicker, {
        label: (props.label as string) ?? "Date",
        placeholder: (props.placeholder as string) ?? "Select date...",
        size: (props.size as string) ?? "md",
        disabled: (props.disabled as boolean) ?? false,
        onChange: () => {},
      } as unknown as React.ComponentProps<typeof FlowDatePicker>),
    defaults: { label: "Date", placeholder: "Select date...", size: "md", disabled: false },
    excludeControls: ["onChange", "value", "minDate", "maxDate", "className", "style"],
  },
};

const dateRangePickerEntry: PatternEntry = {
  category: "input-patterns",
  spec: {
    name: "Date Range Picker",
    purpose: "Start/end date range selection with dual calendar and preset ranges.",
    platform: "shared",
    composesL3: ["FlowTextInput", "FlowPopover", "FlowButton", "Surface"],
    orchestrates: [
      "Dual calendar sync",
      "Range highlight",
      "Preset ranges",
      "Start/end validation",
    ],
  },
  composition: [{ component: "FlowTextInput", role: "Date range text entry", tokens: [] }],
  demos: {
    overview: DateRangePickerOverviewDemo,
    useCases: DateRangePickerUseCasesDemo,
  },
  developer: {
    reactImport: `import { FlowDateRangePicker, type DateRange } from "@flow/design-system";`,
    reactUsage: `<FlowDateRangePicker
  label="Date Range"
  value={range}
  onChange={setRange}
  presets={['last7days', 'last30days']}
/>`,
    flutterImport: `import 'package:flow/patterns/date_range_picker.dart';`,
    flutterUsage: `FlowDateRangePicker(
  label: 'Date Range',
  value: range,
  onChanged: setRange,
  presets: ['last7days', 'last30days'],
)`,
    props: [
      { name: "label", type: "string", required: true, description: "Field label." },
      {
        name: "value",
        type: "DateRange",
        required: false,
        description: "{ start: Date, end: Date }.",
      },
      {
        name: "onChange",
        type: "(range: DateRange) => void",
        required: false,
        description: "Change handler.",
      },
      { name: "presets", type: "string[]", required: false, description: "Preset range options." },
    ],
    guidelines: [
      { type: "do", text: "Use for date range selection (reporting, filtering)." },
      { type: "do", text: "Provide common presets (last 7 days, this month, etc.)." },
      { type: "dont", text: "Don't use for single dates." },
    ],
  },
  playground: {
    renderPreview: (props: Record<string, unknown>) =>
      React.createElement(FlowDateRangePicker, {
        label: (props.label as string) ?? "Date Range",
        size: (props.size as string) ?? "md",
        disabled: (props.disabled as boolean) ?? false,
        onChange: () => {},
      } as unknown as React.ComponentProps<typeof FlowDateRangePicker>),
    defaults: { label: "Date Range", size: "md", disabled: false },
    excludeControls: ["onChange", "value", "presets", "minDate", "maxDate", "className", "style"],
  },
};

const colorPickerEntry: PatternEntry = {
  category: "input-patterns",
  spec: {
    name: "Color Picker",
    purpose: "Color selection with spectrum, swatches, and hex/rgb input.",
    platform: "shared",
    composesL3: ["FlowTextInput", "FlowPopover", "Surface"],
    orchestrates: [
      "HSL spectrum interaction",
      "Swatch palette",
      "Hex/RGB parsing",
      "Format conversion",
    ],
  },
  composition: [{ component: "FlowTextInput", role: "Color hex input", tokens: [] }],
  demos: {
    overview: ColorPickerOverviewDemo,
    useCases: ColorPickerUseCasesDemo,
  },
  developer: {
    reactImport: `import { FlowColorPicker } from "@flow/design-system";`,
    reactUsage: `<FlowColorPicker
  label="Brand Color"
  value={color}
  onChange={setColor}
  swatches={['#FF0000', '#00FF00', '#0000FF']}
/>`,
    flutterImport: `import 'package:flow/patterns/color_picker.dart';`,
    flutterUsage: `FlowColorPicker(
  label: 'Brand Color',
  value: color,
  onChanged: setColor,
  swatches: [Colors.red, Colors.green, Colors.blue],
)`,
    props: [
      { name: "label", type: "string", required: true, description: "Field label." },
      { name: "value", type: "string", required: false, description: "Hex color value." },
      {
        name: "onChange",
        type: "(color: string) => void",
        required: false,
        description: "Change handler.",
      },
      {
        name: "swatches",
        type: "string[]",
        required: false,
        description: "Preset color swatches.",
      },
    ],
    guidelines: [
      { type: "do", text: "Use for theme customization, branding, design tools." },
      { type: "do", text: "Provide brand color swatches for quick selection." },
      {
        type: "dont",
        text: "Don't use for categorical selection — use color-coded FlowChip instead.",
      },
    ],
  },
  playground: {
    renderPreview: (props: Record<string, unknown>) =>
      React.createElement(FlowColorPicker, {
        label: (props.label as string) ?? "Color",
        size: (props.size as string) ?? "md",
        disabled: (props.disabled as boolean) ?? false,
        onChange: () => {},
      } as unknown as React.ComponentProps<typeof FlowColorPicker>),
    defaults: { label: "Color", size: "md", disabled: false },
    excludeControls: ["onChange", "value", "swatches", "className", "style"],
  },
};

const otpInputEntry: PatternEntry = {
  category: "input-patterns",
  spec: {
    name: "OTP Input",
    purpose: "One-time password input with individual digit cells and auto-advance.",
    platform: "mobile",
    composesL3: ["FlowTextInput"],
    orchestrates: [
      "Multi-cell auto-advance",
      "Paste distribution",
      "Backspace navigation",
      "Completion callback",
    ],
  },
  composition: [{ component: "FlowTextInput", role: "Individual digit cells", tokens: [] }],
  demos: {
    overview: OTPInputOverviewDemo,
    useCases: OTPInputUseCasesDemo,
  },
  developer: {
    reactImport: `import { FlowOTPInput } from "@flow/design-system";`,
    reactUsage: `<FlowOTPInput
  length={6}
  value={otp}
  onChange={setOtp}
  onComplete={handleVerify}
/>`,
    flutterImport: `import 'package:flow/patterns/otp_input.dart';`,
    flutterUsage: `FlowOTPInput(
  length: 6,
  value: otp,
  onChanged: setOtp,
  onComplete: handleVerify,
)`,
    props: [
      {
        name: "length",
        type: "number",
        required: false,
        defaultValue: "6",
        description: "Number of OTP digits.",
      },
      { name: "value", type: "string", required: false, description: "Controlled OTP value." },
      {
        name: "onChange",
        type: "(value: string) => void",
        required: false,
        description: "Change handler.",
      },
      {
        name: "onComplete",
        type: "() => void",
        required: false,
        description: "Callback when all digits entered.",
      },
    ],
    guidelines: [
      { type: "do", text: "Use for 2FA, SMS verification codes." },
      { type: "do", text: "Auto-submit or show verify button on completion." },
      { type: "dont", text: "Don't use for long passwords — use FlowTextInput." },
    ],
  },
};

const inlineEditableEntry: PatternEntry = {
  category: "input-patterns",
  spec: {
    name: "Inline Editable",
    purpose: "Click-to-edit inline text. Shows text normally, transforms to input on interaction.",
    platform: "shared",
    composesL3: ["FlowTextInput", "FlowIconButton", "Text"],
    orchestrates: [
      "Read/edit mode switching",
      "Save/cancel actions",
      "Escape to cancel",
      "Click-outside behavior",
    ],
  },
  composition: [{ component: "FlowTextInput", role: "Edit mode input", tokens: [] }],
  demos: {
    overview: InlineEditableOverviewDemo,
    useCases: InlineEditableUseCasesDemo,
  },
  developer: {
    reactImport: `import { FlowInlineEditable } from "@flow/design-system";`,
    reactUsage: `<FlowInlineEditable
  value={title}
  onChange={setTitle}
  placeholder="Enter title"
/>`,
    flutterImport: `import 'package:flow/patterns/inline_editable.dart';`,
    flutterUsage: `FlowInlineEditable(
  value: title,
  onChanged: setTitle,
  placeholder: 'Enter title',
)`,
    props: [
      { name: "value", type: "string", required: true, description: "Controlled text value." },
      {
        name: "onChange",
        type: "(value: string) => void",
        required: true,
        description: "Change handler.",
      },
      {
        name: "placeholder",
        type: "string",
        required: false,
        description: "Placeholder when empty.",
      },
    ],
    guidelines: [
      { type: "do", text: "Use for titles, labels that need quick editing." },
      { type: "do", text: "Show save/cancel buttons or auto-save on blur." },
      { type: "dont", text: "Don't use for multi-line content — use FlowTextArea." },
    ],
  },
  playground: {
    renderPreview: (props: Record<string, unknown>) =>
      React.createElement(FlowInlineEditable, {
        value: (props.value as string) ?? "Click to edit",
        placeholder: (props.placeholder as string) ?? "Enter text...",
        size: (props.size as string) ?? "md",
        disabled: (props.disabled as boolean) ?? false,
        onSave: () => {},
      } as unknown as React.ComponentProps<typeof FlowInlineEditable>),
    defaults: { value: "Click to edit", placeholder: "Enter text...", size: "md", disabled: false },
    excludeControls: ["onSave", "onCancel", "className", "style"],
  },
};

const richTextEditorEntry: PatternEntry = {
  category: "input-patterns",
  spec: {
    name: "Rich Text Editor",
    purpose: "WYSIWYG rich text editor with formatting toolbar.",
    platform: "shared",
    composesL3: ["FlowToolbar", "FlowToggleButton", "FlowMenu", "Surface"],
    orchestrates: [
      "Formatting commands",
      "Toolbar state sync",
      "Content serialization",
      "Keyboard shortcuts",
    ],
  },
  composition: [{ component: "FlowToolbar", role: "Formatting toolbar", tokens: [] }],
  demos: {
    overview: RichTextEditorOverviewDemo,
    useCases: RichTextEditorUseCasesDemo,
  },
  developer: {
    reactImport: `import { FlowRichTextEditor } from "@flow/design-system";`,
    reactUsage: `<FlowRichTextEditor
  value={content}
  onChange={setContent}
  toolbar={['bold', 'italic', 'underline', 'link']}
/>`,
    flutterImport: `import 'package:flow/patterns/rich_text_editor.dart';`,
    flutterUsage: `FlowRichTextEditor(
  value: content,
  onChanged: setContent,
  toolbar: ['bold', 'italic', 'underline', 'link'],
)`,
    props: [
      { name: "value", type: "string", required: false, description: "HTML content." },
      {
        name: "onChange",
        type: "(html: string) => void",
        required: false,
        description: "Change handler.",
      },
      { name: "toolbar", type: "string[]", required: false, description: "Toolbar button set." },
    ],
    guidelines: [
      { type: "do", text: "Use for long-form content (blog posts, documentation)." },
      { type: "do", text: "Limit toolbar to essential formatting options." },
      { type: "dont", text: "Don't use for short text — use FlowTextInput." },
    ],
  },
  playground: {
    renderPreview: (props: Record<string, unknown>) =>
      React.createElement(FlowRichTextEditor, {
        placeholder: (props.placeholder as string) ?? "Start writing...",
        height: (props.height as number) ?? 200,
        disabled: (props.disabled as boolean) ?? false,
        onChange: () => {},
      } as unknown as React.ComponentProps<typeof FlowRichTextEditor>),
    defaults: { placeholder: "Start writing...", height: 200, disabled: false },
    excludeControls: ["onChange", "value", "toolbar", "className", "style"],
  },
};

const fileUploadEntry: PatternEntry = {
  category: "input-patterns",
  spec: {
    name: "File Upload",
    purpose: "File upload with drag-and-drop, progress tracking, and file list.",
    platform: "shared",
    composesL3: ["FlowButton", "FlowProgressBar", "FlowList", "FlowIconButton", "Surface"],
    orchestrates: [
      "Drag-and-drop zone",
      "Upload progress",
      "File type validation",
      "Multi-file queue",
    ],
  },
  composition: [{ component: "FlowButton", role: "Browse files button", tokens: [] }],
  demos: {
    overview: FileUploadOverviewDemo,
    useCases: FileUploadUseCasesDemo,
  },
  developer: {
    reactImport: `import { FlowFileUpload } from "@flow/design-system";`,
    reactUsage: `<FlowFileUpload
  label="Upload Images"
  description="PNG or JPG, max 5MB"
  accept="image/*"
  multiple
  maxSizeMB={5}
  onFiles={handleUpload}
/>`,
    flutterImport: `import 'package:flow/patterns/file_upload.dart';`,
    flutterUsage: `FlowFileUpload(
  label: 'Upload Images',
  description: 'PNG or JPG, max 5MB',
  accept: 'image/*',
  multiple: true,
  maxSizeMB: 5,
  onFiles: handleUpload,
)`,
    props: [
      {
        name: "label",
        type: "string",
        required: false,
        defaultValue: "'Upload Files'",
        description: "Upload area label.",
      },
      {
        name: "description",
        type: "string",
        required: false,
        description: "Helper text below upload zone.",
      },
      {
        name: "accept",
        type: "string",
        required: false,
        description: "File type filter (e.g., 'image/*', '.pdf').",
      },
      {
        name: "multiple",
        type: "boolean",
        required: false,
        defaultValue: "true",
        description: "Allow multiple files.",
      },
      {
        name: "maxSizeMB",
        type: "number",
        required: false,
        defaultValue: "10",
        description: "Max file size in megabytes.",
      },
      {
        name: "maxFiles",
        type: "number",
        required: false,
        defaultValue: "10",
        description: "Maximum number of files.",
      },
      {
        name: "onFiles",
        type: "(files: File[]) => void",
        required: false,
        description: "Callback when files are selected.",
      },
      {
        name: "disabled",
        type: "boolean",
        required: false,
        defaultValue: "false",
        description: "Whether upload is disabled.",
      },
      {
        name: "size",
        type: "'sm' | 'md' | 'lg'",
        required: false,
        defaultValue: "'md'",
        description: "Upload zone size.",
      },
    ],
    guidelines: [
      { type: "do", text: "Use for document, image, or media uploads." },
      { type: "do", text: "Show upload progress and file validation errors." },
      { type: "dont", text: "Don't allow unlimited file sizes — set reasonable maxSize." },
    ],
  },
  playground: {
    renderPreview: (props: Record<string, unknown>) =>
      React.createElement(FlowFileUpload, {
        label: (props.label as string) ?? "Upload files",
        accept: (props.accept as string) ?? "*/*",
        multiple: (props.multiple as boolean) ?? true,
        disabled: (props.disabled as boolean) ?? false,
        onUpload: () => {},
      } as unknown as React.ComponentProps<typeof FlowFileUpload>),
    defaults: { label: "Upload files", accept: "*/*", multiple: true, disabled: false },
    excludeControls: ["onUpload", "onRemove", "files", "maxSize", "className", "style"],
  },
};

// ── Exported registry slice ──
export const inputPatternsPatterns: Record<string, PatternEntry> = {
  "input-patterns/phone-input": phoneInputEntry,
  "input-patterns/search": searchEntry,
  "input-patterns/autocomplete": autocompleteEntry,
  "input-patterns/multi-select": multiSelectEntry,
  "input-patterns/date-picker": datePickerEntry,
  "input-patterns/date-range-picker": dateRangePickerEntry,
  "input-patterns/color-picker": colorPickerEntry,
  "input-patterns/otp-input": otpInputEntry,
  "input-patterns/inline-editable": inlineEditableEntry,
  "input-patterns/rich-text-editor": richTextEditorEntry,
  "input-patterns/file-upload": fileUploadEntry,
};
