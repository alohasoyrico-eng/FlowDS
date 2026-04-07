/** Global Flow analytics interface for Growth tracking */
interface FlowAnalytics {
  track?: (event: string, properties?: Record<string, unknown>) => void;
}

interface Window {
  flowAnalytics?: FlowAnalytics;
}
