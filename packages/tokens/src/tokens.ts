/**
 * FLOW Design System — Token barrel
 * Re-exports all token layers. See ARCHITECTURE.md for design decisions and migration history.
 *
 * Architecture: ref → sys → comp
 *   ref   = Raw, unaliased values. Only place absolute values exist.
 *   sys   = Semantic aliases. Themes remap sys tokens to different ref tokens.
 *   comp  = Component-scoped bindings aliasing sys tokens.
 */

export { _space, _contentMax } from "./_scales.ts";
export { ref } from "./tokens.ref.ts";
export { sysLight, sysDark } from "./tokens.sys.ts";
export { compLight, compDark } from "./tokens.comp.ts";
export { foundationColors } from "./tokens.foundation.ts";
