interface WindowEventMap {
  "flow:impression": CustomEvent<{ event: string; timestamp: number; [key: string]: unknown }>;
  "flow:interaction": CustomEvent<{
    event: string;
    component: string;
    action: string;
    [key: string]: unknown;
  }>;
}
