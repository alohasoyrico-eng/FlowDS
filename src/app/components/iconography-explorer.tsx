/**
 * IconographyExplorer — Interactive icon system explorer
 * ───────────────────────────────────────────────────────
 * Visualizes FLOW's iconography foundation:
 * - Icon grid specification (24px canvas, 20px live area, 1.5px stroke)
 * - 8 semantic categories (5 generic UI + 3 domain-specific Edenred)
 * - Icon color tokens (sys.energy.icon.*)
 * - Naming convention & modifier system
 * - Size scale with live demos
 *
 * Embedded within the Iconography foundation detail page.
 */
import { useState } from "react";
import {
  Activity,
  AlertCircle,
  AlertTriangle,
  ArrowDown,
  ArrowLeft,
  ArrowLeftRight,
  ArrowRight,
  ArrowUp,
  BadgeDollarSign,
  Banknote,
  BarChart3,
  Bell,
  BellOff,
  Bookmark,
  Check,
  CheckCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  CircleDollarSign,
  Clock,
  Copy,
  CreditCard,
  Database,
  DollarSign,
  Download,
  Euro,
  Eye,
  EyeOff,
  File,
  Folder,
  Globe,
  HandCoins,
  Heart,
  Home,
  Image,
  Info,
  Landmark,
  Link,
  Lock,
  type LucideIcon,
  Menu,
  Minus,
  Pencil,
  Percent,
  PieChart,
  PiggyBank,
  Plus,
  Receipt,
  RotateCcw,
  Search,
  Settings,
  Share2,
  ShieldCheck,
  Star,
  ToggleLeft,
  ToggleRight,
  Trash2,
  TrendingUp,
  Undo2,
  Unlock,
  Upload,
  User,
  Wallet,
  XCircle,
} from "lucide-react";

import { Divider, Inline, Stack, Surface, Text } from "@flow/primitives";
import svgPaths from "../../imports/svg-i9u0t6gowv";

// ── Tab types ──
type TabId = "grid" | "categories" | "colors" | "naming" | "sizes";

const TABS: { id: TabId; label: string }[] = [
  { id: "grid", label: "Icon Grid" },
  { id: "categories", label: "Categories" },
  { id: "colors", label: "Color Tokens" },
  { id: "naming", label: "Naming Convention" },
  { id: "sizes", label: "Size Scale" },
];

// ── Category data ──
interface CategoryDef {
  id: string;
  label: string;
  description: string;
  type: "ui" | "domain";
  icons: { name: string; Icon: LucideIcon }[];
  families?: string[];
}

const CATEGORIES: CategoryDef[] = [
  {
    id: "navigation",
    label: "Navigation",
    type: "ui",
    description: "Directional and wayfinding glyphs for moving through UI hierarchy.",
    icons: [
      { name: "arrow-left", Icon: ArrowLeft },
      { name: "arrow-right", Icon: ArrowRight },
      { name: "arrow-up", Icon: ArrowUp },
      { name: "arrow-down", Icon: ArrowDown },
      { name: "chevron-left", Icon: ChevronLeft },
      { name: "chevron-right", Icon: ChevronRight },
      { name: "chevron-up", Icon: ChevronUp },
      { name: "chevron-down", Icon: ChevronDown },
      { name: "menu", Icon: Menu },
      { name: "home", Icon: Home },
      { name: "back", Icon: Undo2 },
    ],
  },
  {
    id: "action",
    label: "Action",
    type: "ui",
    description: "Icons that trigger operations or state changes.",
    icons: [
      { name: "edit", Icon: Pencil },
      { name: "delete", Icon: Trash2 },
      { name: "copy", Icon: Copy },
      { name: "share", Icon: Share2 },
      { name: "download", Icon: Download },
      { name: "upload", Icon: Upload },
      { name: "add", Icon: Plus },
      { name: "remove", Icon: Minus },
      { name: "refresh", Icon: RotateCcw },
    ],
  },
  {
    id: "status",
    label: "Status",
    type: "ui",
    description: "Communicate system state and feedback.",
    icons: [
      { name: "check", Icon: Check },
      { name: "check-circle", Icon: CheckCircle },
      { name: "warning", Icon: AlertTriangle },
      { name: "error", Icon: XCircle },
      { name: "alert-circle", Icon: AlertCircle },
      { name: "info", Icon: Info },
      { name: "clock", Icon: Clock },
      { name: "shield-check", Icon: ShieldCheck },
    ],
  },
  {
    id: "object",
    label: "Object",
    type: "ui",
    description: "Represent entities, resources, and content types.",
    icons: [
      { name: "file", Icon: File },
      { name: "folder", Icon: Folder },
      { name: "user", Icon: User },
      { name: "settings", Icon: Settings },
      { name: "search", Icon: Search },
      { name: "star", Icon: Star },
      { name: "image", Icon: Image },
      { name: "link", Icon: Link },
      { name: "globe", Icon: Globe },
      { name: "database", Icon: Database },
    ],
  },
  {
    id: "toggle",
    label: "Toggle",
    type: "ui",
    description: "Binary state indicators with on/off semantics.",
    icons: [
      { name: "eye", Icon: Eye },
      { name: "eye-off", Icon: EyeOff },
      { name: "lock", Icon: Lock },
      { name: "unlock", Icon: Unlock },
      { name: "bookmark", Icon: Bookmark },
      { name: "heart", Icon: Heart },
      { name: "bell", Icon: Bell },
      { name: "bell-off", Icon: BellOff },
      { name: "toggle-left", Icon: ToggleLeft },
      { name: "toggle-right", Icon: ToggleRight },
    ],
  },
  {
    id: "finance",
    label: "Finance",
    type: "domain",
    description:
      "Edenred domain-specific: wallets, money, receipts, cards, transactions, strongboxes.",
    icons: [
      { name: "wallet", Icon: Wallet },
      { name: "credit-card", Icon: CreditCard },
      { name: "receipt", Icon: Receipt },
      { name: "banknote", Icon: Banknote },
      { name: "transaction", Icon: ArrowLeftRight },
      { name: "landmark", Icon: Landmark },
      { name: "piggy-bank", Icon: PiggyBank },
      { name: "hand-coins", Icon: HandCoins },
      { name: "badge-dollar", Icon: BadgeDollarSign },
      { name: "circle-dollar", Icon: CircleDollarSign },
    ],
    families: [
      "wallet",
      "empty-wallet",
      "money",
      "receipt",
      "card",
      "strongbox",
      "coin",
      "transaction",
    ],
  },
  {
    id: "currency",
    label: "Currency",
    type: "domain",
    description: "Monetary symbols and percentage glyphs.",
    icons: [
      { name: "dollar-sign", Icon: DollarSign },
      { name: "euro", Icon: Euro },
      { name: "percent", Icon: Percent },
    ],
  },
  {
    id: "chart",
    label: "Chart",
    type: "domain",
    description: "Data visualization and metrics indicators.",
    icons: [
      { name: "bar-chart", Icon: BarChart3 },
      { name: "pie-chart", Icon: PieChart },
      { name: "trending-up", Icon: TrendingUp },
      { name: "activity", Icon: Activity },
    ],
  },
];

// ── Icon color token data ──
interface IconColorToken {
  name: string;
  token: string;
  cssVar: string;
  lightValue: string;
  darkValue: string;
  useCase: string;
}

const ICON_COLOR_TOKENS: IconColorToken[] = [
  {
    name: "Default",
    token: "sys.energy.icon.default",
    cssVar: "--sys-energy-icon-default",
    lightValue: "#0F172A",
    darkValue: "#F1F5F9",
    useCase: "Primary icons in content areas",
  },
  {
    name: "Secondary",
    token: "sys.energy.icon.secondary",
    cssVar: "--sys-energy-icon-secondary",
    lightValue: "#64748B",
    darkValue: "#94A3B8",
    useCase: "De-emphasized, supporting icons",
  },
  {
    name: "Tertiary",
    token: "sys.energy.icon.tertiary",
    cssVar: "--sys-energy-icon-tertiary",
    lightValue: "#94A3B8",
    darkValue: "#64748B",
    useCase: "Subtle/decorative icons",
  },
  {
    name: "Action",
    token: "sys.energy.icon.action",
    cssVar: "--sys-energy-icon-action",
    lightValue: "#0060DF",
    darkValue: "#8ABCFF",
    useCase: "Interactive/clickable icons",
  },
  {
    name: "Inverse",
    token: "sys.energy.icon.inverse",
    cssVar: "--sys-energy-icon-inverse",
    lightValue: "#F8FAFC",
    darkValue: "#0F172A",
    useCase: "Icons on inverse/dark surfaces",
  },
  {
    name: "On Action",
    token: "sys.energy.icon.onAction",
    cssVar: "--sys-energy-icon-on-action",
    lightValue: "#FFFFFF",
    darkValue: "#0F172A",
    useCase: "Icons inside action buttons",
  },
  {
    name: "Disabled",
    token: "sys.energy.icon.disabled",
    cssVar: "--sys-energy-icon-disabled",
    lightValue: "#CBD5E1",
    darkValue: "#475569",
    useCase: "Disabled state icons",
  },
  {
    name: "Success",
    token: "sys.energy.icon.success",
    cssVar: "--sys-energy-icon-success",
    lightValue: "#007840",
    darkValue: "#79E6B4",
    useCase: "Success status indicators",
  },
  {
    name: "Warning",
    token: "sys.energy.icon.warning",
    cssVar: "--sys-energy-icon-warning",
    lightValue: "#BF410F",
    darkValue: "#F6AB8E",
    useCase: "Warning status indicators",
  },
  {
    name: "Error",
    token: "sys.energy.icon.error",
    cssVar: "--sys-energy-icon-error",
    lightValue: "#CA0E00",
    darkValue: "#FF8D85",
    useCase: "Error status indicators",
  },
  {
    name: "Info",
    token: "sys.energy.icon.info",
    cssVar: "--sys-energy-icon-info",
    lightValue: "#0060DF",
    darkValue: "#8ABCFF",
    useCase: "Informational indicators",
  },
];

// ── Size scale data ──
interface SizeToken {
  name: string;
  value: string;
  px: number;
  token: string;
  cssVar: string;
  useCase: string;
}

const SIZE_TOKENS: SizeToken[] = [
  {
    name: "XS",
    value: "12px",
    px: 12,
    token: "ref.icon.size.xs",
    cssVar: "--ref-icon-size-xs",
    useCase: "Inline text indicators, status dots",
  },
  {
    name: "SM",
    value: "16px",
    px: 16,
    token: "ref.icon.size.sm",
    cssVar: "--ref-icon-size-sm",
    useCase: "Compact controls, badges, chips",
  },
  {
    name: "MD",
    value: "20px",
    px: 20,
    token: "ref.icon.size.md",
    cssVar: "--ref-icon-size-md",
    useCase: "Default size, buttons, navigation items",
  },
  {
    name: "LG",
    value: "24px",
    px: 24,
    token: "ref.icon.size.lg",
    cssVar: "--ref-icon-size-lg",
    useCase: "Comfortable density, mobile touch targets",
  },
  {
    name: "XL",
    value: "32px",
    px: 32,
    token: "ref.icon.size.xl",
    cssVar: "--ref-icon-size-xl",
    useCase: "Empty states, feature highlights, headers",
  },
];

// ── Figma Finance icons (subset from Frame16) ──
interface FigmaIcon {
  name: string;
  pathKey: keyof typeof svgPaths;
  viewBox: string;
  useFill?: boolean;
  multiPath?: (keyof typeof svgPaths)[];
}

const FIGMA_FINANCE_ICONS: FigmaIcon[] = [
  { name: "wallet-add", pathKey: "p1564f300", viewBox: "0 0 22.5 22.5" },
  { name: "empty-wallet", pathKey: "p3879e300", viewBox: "0 0 21.5588 21.4552" },
  { name: "wallet-check", pathKey: "p3eb15500", viewBox: "0 0 22.5 22.5" },
  { name: "receipt-item", pathKey: "p38f91700", viewBox: "0 0 21.5 22.0825" },
  { name: "receipt-discount", pathKey: "p12242cf0", viewBox: "0 0 21.5 22.0825" },
  { name: "receipt-minus", pathKey: "p3c3fc280", viewBox: "0 0 21.5 22.0825" },
  { name: "wallet-search", pathKey: "p1c699a00", viewBox: "0 0 21.5 21.55" },
  { name: "strongbox-2", pathKey: "p2eb0800", viewBox: "0 0 21.5 21.5" },
  { name: "receipt-add", pathKey: "p10781000", viewBox: "0 0 21.5 22.0825" },
  { name: "money", pathKey: "p3abcb680", viewBox: "0 0 21.5 18.5" },
  { name: "money-2", pathKey: "p8a6b400", viewBox: "0 0 21.5 18.5" },
  { name: "money-3", pathKey: "p1db3f880", viewBox: "0 0 21.5 18.5" },
  { name: "percentage-square", pathKey: "p2a753900", viewBox: "0 0 21.5 21.5" },
  { name: "coin", pathKey: "p1bc30ac0", viewBox: "0 0 14.5 21.5" },
  { name: "money-tick", pathKey: "p3918bb80", viewBox: "0 0 22.5 19.5" },
  { name: "discount-shape", pathKey: "p30e3e180", viewBox: "0 0 21.47 21.47" },
  { name: "money-add", pathKey: "p1668cb72", viewBox: "0 0 22.5 19.5" },
  { name: "card-change", pathKey: "p1e09cf00", viewBox: "0 0 21.5 21.51" },
  { name: "discount-circle", pathKey: "p32920100", viewBox: "0 0 21.5 21.5" },
  { name: "wallet-2", pathKey: "p1a063a00", viewBox: "0 0 21.5 18.5" },
  { name: "money-remove", pathKey: "p37cf3880", viewBox: "0 0 22.5 19.5" },
  { name: "strongbox", pathKey: "p12242080", viewBox: "0 0 21.5016 21.5" },
  { name: "wallet-card-1", pathKey: "p36c5f400", viewBox: "0 0 21.5 21.5" },
  { name: "money-change", pathKey: "p2e015700", viewBox: "0 0 21.5 19.5003" },
  {
    name: "direct-debit",
    pathKey: "p1b7e4640",
    viewBox: "0 0 21.5 21.5",
    useFill: true,
    multiPath: ["p1b7e4640", "p3de78c00", "p3442d100"],
  },
];

// ── Shared styles ──
const tabBar: React.CSSProperties = {
  display: "flex",
  gap: "var(--ref-frame-space-1)",
  flexWrap: "wrap",
  background: "var(--sys-energy-surface-tertiary)",
  padding: "var(--ref-frame-space-1)",
  borderRadius: "var(--ref-frame-radius-2)",
};

function tabBtn(active: boolean): React.CSSProperties {
  return {
    padding: "var(--ref-frame-space-2) var(--ref-frame-space-4)",
    borderRadius: "var(--ref-frame-radius-2)",
    border: "none",
    cursor: "pointer",
    background: active ? "var(--sys-energy-surface-primary)" : "transparent",
    color: active ? "var(--sys-energy-text-primary)" : "var(--sys-energy-text-secondary)",
    boxShadow: active ? "var(--sys-depth-elevation-1)" : "none",
    transition: "all 200ms cubic-bezier(0.2, 0, 0, 1)",
    whiteSpace: "nowrap" as const,
  };
}

const cardStyle: React.CSSProperties = {
  background: "var(--sys-energy-surface-primary)",
  border: "1px solid var(--sys-energy-border-default)",
  borderRadius: "var(--ref-frame-radius-3)",
  padding: "var(--ref-frame-space-6)",
};

const monoStyle: React.CSSProperties = {
  fontFamily: "var(--ref-voice-family-mono)",
  fontSize: "var(--ref-voice-size-3)",
};

// ═══════════════════════════════════════════════
// TAB 1: Icon Grid
// ═══════════════════════════════════════════════
function GridTab() {
  return (
    <Stack gap="component">
      <Text variant="heading-m">Grid Specification</Text>
      <Text>
        Every FLOW icon is drawn on a 24x24px canvas with a 2px padding zone, yielding a 20x20px
        live area. Figma source uses a 32x32 viewBox as virtual canvas. All strokes are 1.5px with
        round caps and joins.
      </Text>

      {/* Visual grid demo */}
      <div
        style={{
          display: "flex",
          gap: "var(--ref-frame-space-8)",
          flexWrap: "wrap",
          alignItems: "start",
        }}
      >
        {/* Grid anatomy */}
        <div style={cardStyle}>
          <Stack gap={4}>
            <Text variant="caption">Grid Anatomy</Text>
            <div style={{ position: "relative", width: 192, height: 192 }}>
              {/* Outer canvas */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  border: "2px dashed var(--sys-energy-border-accent)",
                  borderRadius: "var(--ref-frame-radius-1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    ...monoStyle,
                    position: "absolute",
                    top: -20,
                    left: 0,
                    color: "var(--sys-energy-text-accent)",
                  }}
                >
                  24px canvas
                </span>
              </div>
              {/* Padding zone */}
              <div
                style={{
                  position: "absolute",
                  inset: "var(--ref-frame-space-4)",
                  border: "2px solid var(--sys-energy-icon-action)",
                  borderRadius: "var(--ref-frame-space-micro)",
                  background: "color-mix(in srgb, var(--sys-energy-icon-action) 4%, transparent)",
                }}
              >
                <span
                  style={{
                    ...monoStyle,
                    position: "absolute",
                    bottom: -20,
                    right: 0,
                    color: "var(--sys-energy-icon-action)",
                  }}
                >
                  20px live area
                </span>
              </div>
              {/* Padding markers */}
              <div
                style={{
                  position: "absolute",
                  top: "var(--ref-frame-space-micro)",
                  left: "50%",
                  transform: "translateX(-50%)",
                  ...monoStyle,
                  color: "var(--sys-energy-text-tertiary)",
                }}
              >
                2px
              </div>
              <div
                style={{
                  position: "absolute",
                  left: "var(--ref-frame-space-micro)",
                  top: "50%",
                  transform: "translateY(-50%) rotate(-90deg)",
                  ...monoStyle,
                  color: "var(--sys-energy-text-tertiary)",
                }}
              >
                2px
              </div>
              {/* Sample icon inside */}
              <div
                style={{
                  position: "absolute",
                  inset: "var(--ref-frame-space-4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Wallet
                  size={120}
                  strokeWidth={1.5}
                  style={{ color: "var(--sys-energy-icon-default)" }}
                />
              </div>
            </div>
          </Stack>
        </div>

        {/* Stroke rules */}
        <div style={{ ...cardStyle, flex: 1, minWidth: 280 }}>
          <Stack gap={4}>
            <Text variant="caption">Stroke Rules</Text>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "auto 1fr",
                gap: "var(--ref-frame-space-2) var(--ref-frame-space-4)",
              }}
            >
              {[
                ["Weight", "1.5px (uniform)"],
                ["Line cap", "round"],
                ["Line join", "round"],
                ["Corner (terminal)", "1px radius"],
                ["Corner (enclosed)", "2px radius"],
                ["Optical adjust", "+1px for circles"],
              ].map(([label, value]) => (
                <div key={label} style={{ display: "contents" }}>
                  <Text variant="caption" color="secondary">
                    {label}
                  </Text>
                  <Text style={monoStyle}>{value}</Text>
                </div>
              ))}
            </div>

            <Divider spacing={2} />
            <Text variant="caption">Style Variants</Text>
            <Inline gap={4}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "var(--ref-frame-space-1)",
                }}
              >
                <div
                  style={{
                    padding: "var(--ref-frame-space-2)",
                    border: "1px solid var(--sys-energy-border-default)",
                    borderRadius: "var(--ref-frame-radius-2)",
                  }}
                >
                  <Wallet
                    size={24}
                    strokeWidth={1.5}
                    style={{ color: "var(--sys-energy-icon-default)" }}
                  />
                </div>
                <Text variant="caption" color="secondary">
                  Outline
                </Text>
                <Text style={{ ...monoStyle, color: "var(--sys-energy-status-success)" }}>
                  default
                </Text>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "var(--ref-frame-space-1)",
                }}
              >
                <div
                  style={{
                    padding: "var(--ref-frame-space-2)",
                    border: "1px solid var(--sys-energy-border-default)",
                    borderRadius: "var(--ref-frame-radius-2)",
                  }}
                >
                  <Wallet
                    size={24}
                    strokeWidth={0}
                    fill="var(--sys-energy-icon-default)"
                    style={{ color: "var(--sys-energy-icon-default)" }}
                  />
                </div>
                <Text variant="caption" color="secondary">
                  Filled
                </Text>
                <Text style={{ ...monoStyle, color: "var(--sys-energy-text-tertiary)" }}>
                  active/selected
                </Text>
              </div>
            </Inline>
          </Stack>
        </div>
      </div>

      {/* Figma export note */}
      <Surface variant="filled" padding={4} radius={2}>
        <Stack gap={2}>
          <Text variant="caption">Export Specification (Figma to FLOW)</Text>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "auto 1fr",
              gap: "var(--ref-frame-space-1) var(--ref-frame-space-4)",
            }}
          >
            {[
              ["Figma viewBox", "32x32 (virtual canvas)"],
              ["FLOW container", "24x24 (CSS size)"],
              ["Live area", "20x20 (paths drawn within)"],
              ["Color binding", "var(--stroke-0, #0F172A) -> sys.energy.icon.default"],
              ["strokeMiterlimit", "Omit (use round join consistently)"],
            ].map(([label, value]) => (
              <div key={label} style={{ display: "contents" }}>
                <Text style={monoStyle} color="secondary">
                  {label}
                </Text>
                <Text style={monoStyle}>{value}</Text>
              </div>
            ))}
          </div>
        </Stack>
      </Surface>
    </Stack>
  );
}

// ═══════════════════════════════════════════════
// TAB 2: Categories
// ═══════════════════════════════════════════════
function CategoriesTab() {
  const [selectedCat, setSelectedCat] = useState<string>("navigation");
  const [showFigma, setShowFigma] = useState(false);

  const currentCat = CATEGORIES.find((c) => c.id === selectedCat)!;

  return (
    <Stack gap="component">
      <Inline gap={2} justify="between" style={{ flexWrap: "wrap" }}>
        <Text variant="heading-m">Semantic Categories</Text>
        <div
          style={{
            display: "flex",
            gap: "var(--ref-frame-space-1)",
            background: "var(--sys-energy-surface-tertiary)",
            padding: "var(--ref-frame-space-1)",
            borderRadius: "var(--ref-frame-radius-2)",
          }}
        >
          <button onClick={() => setShowFigma(false)} style={tabBtn(!showFigma)}>
            Lucide (Generic)
          </button>
          <button onClick={() => setShowFigma(true)} style={tabBtn(showFigma)}>
            Figma Edenred
          </button>
        </div>
      </Inline>

      <Text>
        Icons are organized into 8 semantic categories: 5 generic UI categories shared across all
        products, and 3 domain-specific categories for Edenred fintech use cases.
      </Text>

      {/* Category selector */}
      <div style={{ display: "flex", gap: "var(--ref-frame-space-2)", flexWrap: "wrap" }}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setSelectedCat(cat.id);
              if (cat.type === "domain" && cat.id === "finance") setShowFigma(true);
            }}
            style={{
              ...tabBtn(selectedCat === cat.id),
              background:
                selectedCat === cat.id
                  ? cat.type === "domain"
                    ? "var(--sys-energy-surface-accent)"
                    : "var(--sys-energy-surface-primary)"
                  : "var(--sys-energy-surface-tertiary)",
              color:
                selectedCat === cat.id
                  ? cat.type === "domain"
                    ? "var(--sys-energy-text-accent)"
                    : "var(--sys-energy-text-primary)"
                  : "var(--sys-energy-text-secondary)",
              border:
                cat.type === "domain"
                  ? "1px solid var(--sys-energy-border-accent)"
                  : "1px solid transparent",
            }}
          >
            {cat.type === "domain" ? `${cat.label}` : cat.label}
          </button>
        ))}
      </div>

      {/* Category detail */}
      <div style={cardStyle}>
        <Stack gap={4}>
          <Inline gap={2}>
            <Text variant="label-l">{currentCat.label}</Text>
            <span
              style={{
                ...monoStyle,
                padding: "var(--ref-frame-space-micro) var(--ref-frame-space-2)",
                borderRadius: "var(--ref-frame-radius-full)",
                background:
                  currentCat.type === "domain"
                    ? "var(--sys-energy-surface-accent)"
                    : "var(--sys-energy-surface-tertiary)",
                color:
                  currentCat.type === "domain"
                    ? "var(--sys-energy-text-accent)"
                    : "var(--sys-energy-text-secondary)",
              }}
            >
              {currentCat.type === "domain" ? "Domain" : "Generic UI"}
            </span>
          </Inline>
          <Text color="secondary">{currentCat.description}</Text>

          <Divider spacing={2} />

          {/* Icon grid */}
          {showFigma && currentCat.id === "finance" ? (
            <Stack gap={4}>
              <Text variant="caption">Figma Edenred Finance Icons (imported from source)</Text>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))",
                  gap: "var(--ref-frame-space-3)",
                }}
              >
                {FIGMA_FINANCE_ICONS.map((icon) => (
                  <div
                    key={icon.name}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "var(--ref-frame-space-1)",
                      padding: "var(--ref-frame-space-3)",
                      border: "1px solid var(--sys-energy-border-default)",
                      borderRadius: "var(--ref-frame-radius-2)",
                      transition: "border-color 150ms",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.borderColor = "var(--sys-energy-border-accent)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.borderColor = "var(--sys-energy-border-default)")
                    }
                  >
                    <div
                      style={{
                        width: "var(--ref-frame-space-6)",
                        height: "var(--ref-frame-space-6)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <svg width="20" height="20" fill="none" viewBox={icon.viewBox}>
                        {icon.useFill && icon.multiPath ? (
                          icon.multiPath.map((key, i) => (
                            <path key={i} d={svgPaths[key]} fill="var(--sys-energy-icon-default)" />
                          ))
                        ) : (
                          <path
                            d={svgPaths[icon.pathKey]}
                            stroke="var(--sys-energy-icon-default)"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                          />
                        )}
                      </svg>
                    </div>
                    <Text
                      style={{
                        ...monoStyle,
                        fontSize: "var(--ref-voice-size-1)",
                        textAlign: "center",
                        wordBreak: "break-all" as const,
                      }}
                    >
                      {icon.name}
                    </Text>
                  </div>
                ))}
              </div>
              {currentCat.families && (
                <Surface variant="filled" padding={3} radius={2}>
                  <Stack gap={1}>
                    <Text variant="caption">Icon Families in this category</Text>
                    <Text style={monoStyle}>{currentCat.families.join(", ")}</Text>
                  </Stack>
                </Surface>
              )}
            </Stack>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))",
                gap: "var(--ref-frame-space-3)",
              }}
            >
              {currentCat.icons.map(({ name, Icon }) => (
                <div
                  key={name}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "var(--ref-frame-space-1)",
                    padding: "var(--ref-frame-space-3)",
                    border: "1px solid var(--sys-energy-border-default)",
                    borderRadius: "var(--ref-frame-radius-2)",
                    transition: "border-color 150ms",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.borderColor = "var(--sys-energy-border-accent)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.borderColor = "var(--sys-energy-border-default)")
                  }
                >
                  <Icon
                    size={24}
                    strokeWidth={1.5}
                    style={{ color: "var(--sys-energy-icon-default)" }}
                  />
                  <Text
                    style={{
                      ...monoStyle,
                      fontSize: "var(--ref-voice-size-1)",
                      textAlign: "center",
                    }}
                  >
                    {name}
                  </Text>
                </div>
              ))}
            </div>
          )}
        </Stack>
      </div>

      {/* Category summary */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: "var(--ref-frame-space-3)",
        }}
      >
        {CATEGORIES.map((cat) => (
          <Surface key={cat.id} variant="outlined" padding={3} radius={2}>
            <Stack gap={1}>
              <Inline gap={2}>
                <Text variant="caption">{cat.label}</Text>
                <span
                  style={{
                    ...monoStyle,
                    fontSize: "var(--ref-voice-size-1)",
                    padding: "var(--ref-frame-space-micro) var(--ref-frame-space-2)",
                    borderRadius: "var(--ref-frame-radius-full)",
                    background:
                      cat.type === "domain"
                        ? "var(--sys-energy-surface-accent)"
                        : "var(--sys-energy-surface-tertiary)",
                    color:
                      cat.type === "domain"
                        ? "var(--sys-energy-text-accent)"
                        : "var(--sys-energy-text-tertiary)",
                  }}
                >
                  {cat.type === "domain" ? "D" : "UI"}
                </span>
              </Inline>
              <Text style={{ ...monoStyle, color: "var(--sys-energy-text-tertiary)" }}>
                {cat.id === "finance"
                  ? `${FIGMA_FINANCE_ICONS.length} Figma + ${cat.icons.length} Lucide`
                  : `${cat.icons.length} icons`}
              </Text>
            </Stack>
          </Surface>
        ))}
      </div>
    </Stack>
  );
}

// ═══════════════════════════════════════════════
// TAB 3: Color Tokens
// ═══════════════════════════════════════════════
function ColorsTab() {
  return (
    <Stack gap="component">
      <Text variant="heading-m">Icon Color Tokens</Text>
      <Text>
        {}
        sys.energy.icon.* tokens formalize the default <span style={monoStyle}>#0F172A</span> from
        Figma&apos;s <span style={monoStyle}>var(--stroke-0)</span> into proper semantic roles.
        These tokens automatically adapt between light and dark themes.
      </Text>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid var(--sys-energy-border-strong)" }}>
              {["Preview", "Token", "CSS Variable", "Light", "Dark", "Use Case"].map((h) => (
                <th
                  key={h}
                  style={{
                    ...monoStyle,
                    textAlign: "left",
                    padding: "var(--ref-frame-space-2) var(--ref-frame-space-3)",
                    color: "var(--sys-energy-text-secondary)",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ICON_COLOR_TOKENS.map((t) => (
              <tr
                key={t.name}
                style={{ borderBottom: "1px solid var(--sys-energy-border-default)" }}
              >
                <td style={{ padding: "var(--ref-frame-space-2) var(--ref-frame-space-3)" }}>
                  <div
                    style={{
                      display: "flex",
                      gap: "var(--ref-frame-space-2)",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        width: "var(--ref-frame-space-8)",
                        height: "var(--ref-frame-space-8)",
                        borderRadius: "var(--ref-frame-radius-2)",
                        background:
                          t.name === "Inverse" || t.name === "On Action"
                            ? "var(--sys-energy-surface-inverse)"
                            : "var(--sys-energy-surface-secondary)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Star size={20} strokeWidth={1.5} style={{ color: `var(${t.cssVar})` }} />
                    </div>
                  </div>
                </td>
                <td
                  style={{
                    ...monoStyle,
                    padding: "var(--ref-frame-space-2) var(--ref-frame-space-3)",
                    color: "var(--sys-energy-text-primary)",
                  }}
                >
                  {t.token}
                </td>
                <td
                  style={{
                    ...monoStyle,
                    padding: "var(--ref-frame-space-2) var(--ref-frame-space-3)",
                    color: "var(--sys-energy-text-tertiary)",
                  }}
                >
                  {t.cssVar}
                </td>
                <td style={{ padding: "var(--ref-frame-space-2) var(--ref-frame-space-3)" }}>
                  <Inline gap={2}>
                    <div
                      style={{
                        width: "var(--ref-frame-space-4)",
                        height: "var(--ref-frame-space-4)",
                        borderRadius: "var(--ref-frame-radius-1)",
                        background: t.lightValue,
                        border: "1px solid var(--sys-energy-border-default)",
                      }}
                    />
                    <span style={monoStyle}>{t.lightValue}</span>
                  </Inline>
                </td>
                <td style={{ padding: "var(--ref-frame-space-2) var(--ref-frame-space-3)" }}>
                  <Inline gap={2}>
                    <div
                      style={{
                        width: "var(--ref-frame-space-4)",
                        height: "var(--ref-frame-space-4)",
                        borderRadius: "var(--ref-frame-radius-1)",
                        background: t.darkValue,
                        border: "1px solid var(--sys-energy-border-default)",
                      }}
                    />
                    <span style={monoStyle}>{t.darkValue}</span>
                  </Inline>
                </td>
                <td
                  style={{
                    padding: "var(--ref-frame-space-2) var(--ref-frame-space-3)",
                    color: "var(--sys-energy-text-secondary)",
                  }}
                >
                  <Text variant="caption">{t.useCase}</Text>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Live demo row */}
      <div style={cardStyle}>
        <Stack gap={4}>
          <Text variant="caption">Live Token Demo</Text>
          <div style={{ display: "flex", gap: "var(--ref-frame-space-6)", flexWrap: "wrap" }}>
            {/* Default on surface */}
            <Stack gap={2} style={{ alignItems: "center" }}>
              <div
                style={{
                  padding: "var(--ref-frame-space-3)",
                  background: "var(--sys-energy-surface-primary)",
                  border: "1px solid var(--sys-energy-border-default)",
                  borderRadius: "var(--ref-frame-radius-2)",
                }}
              >
                <Settings
                  size={24}
                  strokeWidth={1.5}
                  style={{ color: "var(--sys-energy-icon-default)" }}
                />
              </div>
              <Text style={{ ...monoStyle, fontSize: "var(--ref-voice-size-1)" }}>default</Text>
            </Stack>
            {/* Secondary */}
            <Stack gap={2} style={{ alignItems: "center" }}>
              <div
                style={{
                  padding: "var(--ref-frame-space-3)",
                  background: "var(--sys-energy-surface-primary)",
                  border: "1px solid var(--sys-energy-border-default)",
                  borderRadius: "var(--ref-frame-radius-2)",
                }}
              >
                <Settings
                  size={24}
                  strokeWidth={1.5}
                  style={{ color: "var(--sys-energy-icon-secondary)" }}
                />
              </div>
              <Text style={{ ...monoStyle, fontSize: "var(--ref-voice-size-1)" }}>secondary</Text>
            </Stack>
            {/* Action */}
            <Stack gap={2} style={{ alignItems: "center" }}>
              <div
                style={{
                  padding: "var(--ref-frame-space-3)",
                  background: "var(--sys-energy-surface-primary)",
                  border: "1px solid var(--sys-energy-border-default)",
                  borderRadius: "var(--ref-frame-radius-2)",
                }}
              >
                <Settings
                  size={24}
                  strokeWidth={1.5}
                  style={{ color: "var(--sys-energy-icon-action)" }}
                />
              </div>
              <Text style={{ ...monoStyle, fontSize: "var(--ref-voice-size-1)" }}>action</Text>
            </Stack>
            {/* On Action */}
            <Stack gap={2} style={{ alignItems: "center" }}>
              <div
                style={{
                  padding: "var(--ref-frame-space-3)",
                  background: "var(--sys-energy-action-primary)",
                  borderRadius: "var(--ref-frame-radius-2)",
                }}
              >
                <Settings
                  size={24}
                  strokeWidth={1.5}
                  style={{ color: "var(--sys-energy-icon-on-action)" }}
                />
              </div>
              <Text style={{ ...monoStyle, fontSize: "var(--ref-voice-size-1)" }}>onAction</Text>
            </Stack>
            {/* Disabled */}
            <Stack gap={2} style={{ alignItems: "center" }}>
              <div
                style={{
                  padding: "var(--ref-frame-space-3)",
                  background: "var(--sys-energy-surface-primary)",
                  border: "1px solid var(--sys-energy-border-default)",
                  borderRadius: "var(--ref-frame-radius-2)",
                  opacity: 0.6,
                }}
              >
                <Settings
                  size={24}
                  strokeWidth={1.5}
                  style={{ color: "var(--sys-energy-icon-disabled)" }}
                />
              </div>
              <Text style={{ ...monoStyle, fontSize: "var(--ref-voice-size-1)" }}>disabled</Text>
            </Stack>
            {/* Success */}
            <Stack gap={2} style={{ alignItems: "center" }}>
              <div
                style={{
                  padding: "var(--ref-frame-space-3)",
                  background: "var(--sys-energy-surface-success)",
                  border: "1px solid var(--sys-energy-border-success)",
                  borderRadius: "var(--ref-frame-radius-2)",
                }}
              >
                <CheckCircle
                  size={24}
                  strokeWidth={1.5}
                  style={{ color: "var(--sys-energy-icon-success)" }}
                />
              </div>
              <Text style={{ ...monoStyle, fontSize: "var(--ref-voice-size-1)" }}>success</Text>
            </Stack>
            {/* Warning */}
            <Stack gap={2} style={{ alignItems: "center" }}>
              <div
                style={{
                  padding: "var(--ref-frame-space-3)",
                  background: "var(--sys-energy-surface-warning)",
                  border: "1px solid var(--sys-energy-border-warning)",
                  borderRadius: "var(--ref-frame-radius-2)",
                }}
              >
                <AlertTriangle
                  size={24}
                  strokeWidth={1.5}
                  style={{ color: "var(--sys-energy-icon-warning)" }}
                />
              </div>
              <Text style={{ ...monoStyle, fontSize: "var(--ref-voice-size-1)" }}>warning</Text>
            </Stack>
            {/* Error */}
            <Stack gap={2} style={{ alignItems: "center" }}>
              <div
                style={{
                  padding: "var(--ref-frame-space-3)",
                  background: "var(--sys-energy-surface-danger)",
                  border: "1px solid var(--sys-energy-border-danger)",
                  borderRadius: "var(--ref-frame-radius-2)",
                }}
              >
                <XCircle
                  size={24}
                  strokeWidth={1.5}
                  style={{ color: "var(--sys-energy-icon-error)" }}
                />
              </div>
              <Text style={{ ...monoStyle, fontSize: "var(--ref-voice-size-1)" }}>error</Text>
            </Stack>
          </div>
        </Stack>
      </div>
    </Stack>
  );
}

// ═══════════════════════════════════════════════
// TAB 4: Naming Convention
// ═══════════════════════════════════════════════
function NamingTab() {
  const modifiers = [
    "add",
    "remove",
    "check",
    "tick",
    "search",
    "edit",
    "time",
    "change",
    "forbidden",
    "send",
    "receive",
  ];
  const families = ["wallet", "empty-wallet", "money", "receipt", "card", "strongbox"];

  return (
    <Stack gap="component">
      <Text variant="heading-m">Naming Convention</Text>
      <Text>
        Icons follow a compositional naming pattern:{" "}
        <span style={monoStyle}>
          {"{family}"}-{"{modifier}"}
        </span>
        . This enables predictable variant generation for any icon family.
      </Text>

      {/* Pattern breakdown */}
      <div style={cardStyle}>
        <Stack gap={4}>
          <Text variant="caption">Composition Patterns</Text>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "auto 1fr auto",
              gap: "var(--ref-frame-space-2) var(--ref-frame-space-4)",
              alignItems: "center",
            }}
          >
            {[
              ["{family}", "wallet", "Base icon"],
              ["{family}-{action}", "wallet-add", "Variant with action"],
              ["{prefix}-{family}", "empty-wallet", "State variant"],
              ["{prefix}-{family}-{action}", "empty-wallet-add", "Combined"],
              ["{family}-{n}", "money-2", "Numeric alt"],
            ].map(([pattern, example, desc]) => (
              <div key={pattern as string} style={{ display: "contents" }}>
                <Text style={{ ...monoStyle, color: "var(--sys-energy-text-accent)" }}>
                  {pattern}
                </Text>
                <Text style={monoStyle}>{example}</Text>
                <Text variant="caption" color="secondary">
                  {desc}
                </Text>
              </div>
            ))}
          </div>
        </Stack>
      </div>

      {/* Modifier set */}
      <div style={cardStyle}>
        <Stack gap={4}>
          <Text variant="caption">Closed Modifier Set (11 actions)</Text>
          <Text color="secondary">
            These are the only valid action suffixes. New modifiers require design system governance
            approval.
          </Text>
          <div style={{ display: "flex", gap: "var(--ref-frame-space-2)", flexWrap: "wrap" }}>
            {modifiers.map((mod) => (
              <span
                key={mod}
                style={{
                  ...monoStyle,
                  padding: "var(--ref-frame-space-1) var(--ref-frame-space-3)",
                  background: "var(--sys-energy-surface-accent)",
                  color: "var(--sys-energy-text-accent)",
                  borderRadius: "var(--ref-frame-radius-full)",
                  border: "1px solid var(--sys-energy-border-accent)",
                }}
              >
                -{mod}
              </span>
            ))}
          </div>
        </Stack>
      </div>

      {/* Family x Modifier matrix */}
      <div style={cardStyle}>
        <Stack gap={4}>
          <Text variant="caption">Family x Modifier Matrix (Finance)</Text>
          <div style={{ overflowX: "auto" }}>
            <table style={{ borderCollapse: "collapse", width: "100%" }}>
              <thead>
                <tr>
                  <th
                    style={{
                      ...monoStyle,
                      textAlign: "left",
                      padding: "var(--ref-frame-space-1) var(--ref-frame-space-2)",
                      borderBottom: "2px solid var(--sys-energy-border-strong)",
                      color: "var(--sys-energy-text-secondary)",
                    }}
                  >
                    Family
                  </th>
                  {modifiers.slice(0, 7).map((m) => (
                    <th
                      key={m}
                      style={{
                        ...monoStyle,
                        textAlign: "center",
                        padding: "var(--ref-frame-space-1) var(--ref-frame-space-1)",
                        borderBottom: "2px solid var(--sys-energy-border-strong)",
                        color: "var(--sys-energy-text-secondary)",
                        fontSize: "var(--ref-voice-size-1)",
                      }}
                    >
                      {m}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {families.map((fam) => {
                  const knownVariants: Record<string, string[]> = {
                    wallet: ["add", "check", "remove", "search"],
                    "empty-wallet": ["add", "remove", "tick", "time", "change"],
                    money: ["add", "remove", "tick", "time", "change", "forbidden"],
                    receipt: ["add", "edit", "search"],
                    card: ["change"],
                    strongbox: [],
                  };
                  const variants = knownVariants[fam] || [];
                  return (
                    <tr
                      key={fam}
                      style={{ borderBottom: "1px solid var(--sys-energy-border-default)" }}
                    >
                      <td
                        style={{
                          ...monoStyle,
                          padding: "var(--ref-frame-space-1) var(--ref-frame-space-2)",
                        }}
                      >
                        {fam}
                      </td>
                      {modifiers.slice(0, 7).map((m) => (
                        <td
                          key={m}
                          style={{
                            textAlign: "center",
                            padding: "var(--ref-frame-space-1) var(--ref-frame-space-1)",
                          }}
                        >
                          {variants.includes(m) ? (
                            <Check
                              size={14}
                              style={{ color: "var(--sys-energy-status-success)" }}
                            />
                          ) : (
                            <span style={{ color: "var(--sys-energy-text-tertiary)" }}>-</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Stack>
      </div>
    </Stack>
  );
}

// ═══════════════════════════════════════════════
// TAB 5: Size Scale
// ═══════════════════════════════════════════════
function SizesTab() {
  return (
    <Stack gap="component">
      <Text variant="heading-m">Size Scale</Text>
      <Text>
        5 icon sizes from 12px (inline indicators) to 32px (empty states). The default size for most
        UI contexts is 20px (MD).
      </Text>

      <div
        style={{
          display: "flex",
          gap: "var(--ref-frame-space-6)",
          flexWrap: "wrap",
          alignItems: "end",
        }}
      >
        {SIZE_TOKENS.map((s) => (
          <div
            key={s.name}
            style={{
              ...cardStyle,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "var(--ref-frame-space-3)",
              minWidth: "var(--ref-frame-space-24)",
            }}
          >
            <div
              style={{
                width: s.px + 16,
                height: s.px + 16,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px dashed var(--sys-energy-border-accent)",
                borderRadius: "var(--ref-frame-radius-1)",
              }}
            >
              <Star
                size={s.px}
                strokeWidth={1.5}
                style={{ color: "var(--sys-energy-icon-default)" }}
              />
            </div>
            <Stack gap={1} style={{ alignItems: "center" }}>
              <Text variant="caption">{s.name}</Text>
              <Text style={monoStyle}>{s.value}</Text>
              <Text
                style={{
                  ...monoStyle,
                  color: "var(--sys-energy-text-tertiary)",
                  fontSize: "var(--ref-voice-size-1)",
                }}
              >
                {s.cssVar}
              </Text>
            </Stack>
          </div>
        ))}
      </div>

      {/* Token reference */}
      <div style={cardStyle}>
        <Stack gap={3}>
          <Text variant="caption">Token Reference</Text>
          {SIZE_TOKENS.map((s) => (
            <div
              key={s.name}
              style={{
                display: "grid",
                gridTemplateColumns: "40px 60px 1fr auto",
                gap: "var(--ref-frame-space-3)",
                alignItems: "center",
                padding: "var(--ref-frame-space-2) 0",
                borderBottom: "1px solid var(--sys-energy-border-default)",
              }}
            >
              <Star
                size={s.px}
                strokeWidth={1.5}
                style={{ color: "var(--sys-energy-icon-default)" }}
              />
              <Text style={monoStyle}>{s.value}</Text>
              <Text style={{ ...monoStyle, color: "var(--sys-energy-text-accent)" }}>
                {s.token}
              </Text>
              <Text variant="caption" color="secondary">
                {s.useCase}
              </Text>
            </div>
          ))}
        </Stack>
      </div>

      {/* Size context examples */}
      <Surface variant="filled" padding={4} radius={2}>
        <Stack gap={3}>
          <Text variant="caption">Size in Context</Text>
          <div style={{ display: "flex", gap: "var(--ref-frame-space-8)", flexWrap: "wrap" }}>
            {/* Button */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--ref-frame-space-2)",
                padding: "var(--ref-frame-space-2) var(--ref-frame-space-4)",
                background: "var(--sys-energy-action-primary)",
                borderRadius: "var(--ref-frame-radius-2)",
                color: "var(--sys-energy-icon-on-action)",
              }}
            >
              <Plus size={20} strokeWidth={1.5} />
              <span>Add item</span>
            </div>
            {/* Nav item */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--ref-frame-space-2)",
                padding: "var(--ref-frame-space-2) var(--ref-frame-space-4)",
                background: "var(--sys-energy-surface-primary)",
                borderRadius: "var(--ref-frame-radius-2)",
                border: "1px solid var(--sys-energy-border-default)",
              }}
            >
              <Home
                size={20}
                strokeWidth={1.5}
                style={{ color: "var(--sys-energy-icon-default)" }}
              />
              <span>Home</span>
            </div>
            {/* Badge with inline icon */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--ref-frame-space-1)",
                padding: "var(--ref-frame-space-1) var(--ref-frame-space-3)",
                background: "var(--sys-energy-surface-success)",
                borderRadius: "var(--ref-frame-radius-full)",
              }}
            >
              <Check
                size={12}
                strokeWidth={2}
                style={{ color: "var(--sys-energy-icon-success)" }}
              />
              <Text style={{ ...monoStyle, color: "var(--sys-energy-text-success)" }}>
                Verified
              </Text>
            </div>
          </div>
        </Stack>
      </Surface>
    </Stack>
  );
}

// ═══════════════════════════════════════════════
// Main Explorer
// ═══════════════════════════════════════════════
export function IconographyExplorer() {
  const [activeTab, setActiveTab] = useState<TabId>("grid");

  return (
    <Stack gap="component">
      <Divider spacing={4} />
      <Stack gap={2}>
        <Text variant="heading-l">Interactive Explorer</Text>
        <Text color="secondary">
          Explore FLOW&apos;s icon system: grid specs, 8 semantic categories (including Edenred
          Finance), color tokens with light/dark support, naming conventions, and the 5-step size
          scale.
        </Text>
      </Stack>

      {/* Tab bar */}
      <div style={tabBar}>
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={tabBtn(activeTab === tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div>
        {activeTab === "grid" && <GridTab />}
        {activeTab === "categories" && <CategoriesTab />}
        {activeTab === "colors" && <ColorsTab />}
        {activeTab === "naming" && <NamingTab />}
        {activeTab === "sizes" && <SizesTab />}
      </div>
    </Stack>
  );
}
