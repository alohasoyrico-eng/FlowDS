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
