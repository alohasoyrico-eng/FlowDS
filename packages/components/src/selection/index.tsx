/**
 * FLOW Domain: Selection (L3)
 * Components where the user chooses from predefined options or toggles states.
 * Distinct from Controls (fire-and-forget action triggers) and Inputs (free-form data entry).
 *
 * @domain selection
 * @layer L3
 * @since FLOW v2.2 — L3 domain reorganization (Controls / Selection / Inputs split)
 */

// ── Exclusive selection (one-of-N) ──
/** @platform shared */
export { FlowSegmentedControl } from "./FlowSegmentedControl";
export type { SegmentedControlProps } from "./FlowSegmentedControl";
/** @platform shared */
export { FlowRadioButton, FlowRadioGroup } from "./FlowRadioButton";
export type { RadioButtonProps, RadioGroupProps } from "./FlowRadioButton";
/** @platform shared */
export { FlowSelect } from "./FlowSelect";
export type { SelectProps } from "./FlowSelect";

// ── Multiple selection (N-of-M) ──
/** @platform shared */
export { FlowCheckbox, FlowCheckboxGroup } from "./FlowCheckbox";
export type { CheckboxProps, CheckboxGroupProps } from "./FlowCheckbox";

// ── Binary toggles (on/off) ──
/** @platform shared */
export { FlowSwitch } from "./FlowSwitch";
export type { SwitchProps } from "./FlowSwitch";
/** @platform shared */
export { FlowToggleButton, FlowToggleButtonGroup } from "./FlowToggleButton";
export type { ToggleButtonProps, ToggleButtonGroupProps } from "./FlowToggleButton";

// ── Range selection ──
/** @platform shared */
export { FlowSlider } from "./FlowSlider";
export type { SliderProps } from "./FlowSlider";

// ── Country selection ──
/** @platform shared — country dropdown with flag + dial code */
export { FlowCountrySelect } from "./FlowCountrySelect";
export type { CountrySelectProps } from "./FlowCountrySelect";
