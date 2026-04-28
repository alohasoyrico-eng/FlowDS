import { ref } from "./tokens.ref.ts";

// Foundation identity colors — all reference ref tokens, zero hardcoded hex
export const foundationColors: Record<string, string> = {
  energy: ref.energy.blue[500],
  voice: ref.energy.green[500],
  frame: ref.energy.orange[500],
  depth: ref.energy.purple[500],
  momentum: ref.energy.red[500],
  state: ref.energy.teal[500],
  tone: ref.energy.olive[500],
  growth: ref.energy.purple[700],
  symbol: ref.energy.green[700],
  iconography: ref.energy.teal[700],
} as const;
