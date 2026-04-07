/**
 * FLOW Domain: Inputs (L3)
 * Free-form data entry — the user types, writes, or provides content.
 * Selection controls moved to '../selection' in FLOW v2.2.
 * Compound input patterns (PhoneInput, Search, DatePicker, etc.)
 * promoted to '../patterns' (L4) in FLOW v2.2.
 *
 * @domain inputs
 * @layer L3
 * @since FLOW v2.2 — Controls / Selection / Inputs split + L3/L4 separation
 */

// ── Text entry ──
/** @platform shared */
export { FlowTextInput } from "./FlowTextInput";
export type { TextInputProps } from "./FlowTextInput";
/** @platform shared */
export { FlowTextArea } from "./FlowTextArea";
export type { TextAreaProps } from "./FlowTextArea";

/** @platform shared — phone number input with country picker */
export { FlowPhoneInput } from "./FlowPhoneInput";
export type { PhoneInputProps } from "./FlowPhoneInput";
/** @platform mobile — multi-digit OTP code entry */
export { FlowOTPInput } from "./FlowOTPInput";
export type { OTPInputProps } from "./FlowOTPInput";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Deprecated aliases — migrated to selection/ (v2.2)
// Will be removed after Q4 2026
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/** @deprecated Since FLOW v2.2 — Import from '../selection' instead */
export { FlowRadioButton, FlowRadioGroup } from "../selection/FlowRadioButton";
/** @deprecated Since FLOW v2.2 — Import from '../selection' instead */
export { FlowCheckbox, FlowCheckboxGroup } from "../selection/FlowCheckbox";
/** @deprecated Since FLOW v2.2 — Import from '../selection' instead */
export { FlowSwitch } from "../selection/FlowSwitch";
/** @deprecated Since FLOW v2.2 — Import from '../selection' instead */
export { FlowSelect } from "../selection/FlowSelect";
/** @deprecated Since FLOW v2.2 — Import from '../selection' instead */
export { FlowSlider } from "../selection/FlowSlider";
/** @deprecated Since FLOW v2.2 — Import from '../selection' instead */
export { FlowCountrySelect } from "../selection/FlowCountrySelect";
