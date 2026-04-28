/**
 * FLOW Pattern Demos — Input Patterns (Remaining 6)
 * Gold standard demos for: PhoneInput, DateRangePicker, ColorPicker, OTPInput, InlineEditable, RichTextEditor
 */

import { useState } from "react";

import {
  type DateRange,
  type DateRangePreset,
  FlowButton,
  FlowCard,
  FlowChip,
  FlowColorPicker,
  FlowDateRangePicker,
  FlowInlineEditable,
  FlowList,
  FlowListItem,
  FlowOTPInput,
  FlowPhoneInput,
  FlowRichTextEditor,
  FlowTextInput,
  Grid,
  Inline,
  Stack,
  Surface,
  Text,
} from "@flow/design-system";
import { Callout } from "../components/doc-primitives";
import { DemoSection } from "../components/demo-helpers"; // ✓ Correct import path

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 1. FLOW PHONE INPUT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function PhoneInputOverviewDemo() {
  const [phone1, setPhone1] = useState("");
  const [phone2, setPhone2] = useState("555-1234");
  const [country1, setCountry1] = useState("US");

  return (
    <Stack gap="subsection">
      <DemoSection
        title="Basic Phone Input"
        description="International phone input with country selector and formatting."
      >
        <FlowPhoneInput
          label="Phone Number"
          value={phone1}
          onChange={setPhone1}
          country={country1}
          onCountryChange={(entry) => setCountry1(entry.code)}
        />
      </DemoSection>

      <DemoSection
        title="With Default Value"
        description="Pre-filled phone number with country code."
      >
        <FlowPhoneInput label="Contact Number" value={phone2} onChange={setPhone2} country="US" />
      </DemoSection>

      <DemoSection
        title="Different Countries"
        description="Phone input with various country defaults."
      >
        <Grid minItemWidth="280px" gap="component">
          <FlowPhoneInput label="US Phone" country="US" placeholder="(555) 123-4567" />
          <FlowPhoneInput label="UK Phone" country="GB" placeholder="07123 456789" />
          <FlowPhoneInput label="France Phone" country="FR" placeholder="06 12 34 56 78" />
        </Grid>
      </DemoSection>

      <DemoSection title="Size Variants" description="Phone input supports standard sizes.">
        <Stack gap="component">
          <FlowPhoneInput label="Small" size="sm" country="US" />
          <FlowPhoneInput label="Medium" size="md" country="US" />
          <FlowPhoneInput label="Large" size="lg" country="US" />
        </Stack>
      </DemoSection>

      <DemoSection
        title="Validation States"
        description="Error and success states for form validation."
      >
        <Grid minItemWidth="280px" gap="component">
          <FlowPhoneInput label="Valid Phone" success defaultValue="555-1234" country="US" />
          <FlowPhoneInput label="Invalid Phone" error="Invalid phone format" country="US" />
        </Grid>
      </DemoSection>

      <DemoSection title="Disabled State" description="Non-interactive state for read-only forms.">
        <FlowPhoneInput label="Contact" disabled defaultValue="555-1234" country="US" />
      </DemoSection>
    </Stack>
  );
}

export function PhoneInputUseCasesDemo() {
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("US");

  return (
    <Stack gap="component-lg">
      <Surface variant="primary" padding="container">
        <Stack gap="component">
          <Text variant="heading-m">Contact Form</Text>
          <FlowTextInput label="Full Name" placeholder="John Doe" />
          <FlowTextInput label="Email" placeholder="john@example.com" type="email" />
          <FlowPhoneInput
            label="Phone Number"
            value={phone}
            onChange={setPhone}
            country={country}
            onCountryChange={(entry) => setCountry(entry.code)}
            hint="We'll use this to contact you"
          />
          <FlowButton variant="primary">Submit</FlowButton>
        </Stack>
      </Surface>

      <Surface variant="primary" padding="container">
        <Stack gap="component">
          <Text variant="heading-m">User Registration</Text>
          <FlowTextInput label="Username" placeholder="johndoe" />
          <FlowTextInput label="Email" placeholder="john@example.com" type="email" />
          <FlowPhoneInput
            label="Mobile Number (Required)"
            country="US"
            hint="For two-factor authentication"
          />
          <FlowTextInput label="Password" type="password" placeholder="••••••••" />
          <FlowButton variant="primary">Create Account</FlowButton>
        </Stack>
      </Surface>

      <Surface variant="primary" padding="container">
        <Stack gap="component">
          <Text variant="heading-m">Delivery Information</Text>
          <FlowTextInput label="Street Address" placeholder="123 Main St" />
          <Grid minItemWidth="200px" gap="component">
            <FlowTextInput label="City" placeholder="New York" />
            <FlowTextInput label="ZIP Code" placeholder="10001" />
          </Grid>
          <FlowPhoneInput label="Delivery Contact" country="US" hint="For delivery updates" />
          <FlowButton variant="primary">Continue to Payment</FlowButton>
        </Stack>
      </Surface>
    </Stack>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 2. FLOW DATE RANGE PICKER
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const COMMON_PRESETS: DateRangePreset[] = [
  {
    label: "Today",
    getRange: () => {
      const today = new Date().toISOString().split("T")[0];
      return { start: today, end: today };
    },
  },
  {
    label: "Last 7 Days",
    getRange: () => {
      const end = new Date();
      const start = new Date();
      start.setDate(start.getDate() - 6);
      return {
        start: start.toISOString().split("T")[0],
        end: end.toISOString().split("T")[0],
      };
    },
  },
  {
    label: "Last 30 Days",
    getRange: () => {
      const end = new Date();
      const start = new Date();
      start.setDate(start.getDate() - 29);
      return {
        start: start.toISOString().split("T")[0],
        end: end.toISOString().split("T")[0],
      };
    },
  },
  {
    label: "This Month",
    getRange: () => {
      const now = new Date();
      const start = new Date(now.getFullYear(), now.getMonth(), 1);
      const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      return {
        start: start.toISOString().split("T")[0],
        end: end.toISOString().split("T")[0],
      };
    },
  },
];

export function DateRangePickerOverviewDemo() {
  const [range1, setRange1] = useState<DateRange | null>(null);
  const [range2, setRange2] = useState<DateRange | null>({
    start: "2026-03-01",
    end: "2026-03-15",
  });

  return (
    <Stack gap="subsection">
      <DemoSection
        title="Basic Date Range Picker"
        description="Select start and end dates with dual calendar view."
      >
        <FlowDateRangePicker label="Date Range" value={range1} onChange={setRange1} />
      </DemoSection>

      <DemoSection
        title="With Default Value"
        description="Pre-filled date range displayed in inputs."
      >
        <FlowDateRangePicker label="Booking Dates" value={range2} onChange={setRange2} />
      </DemoSection>

      <DemoSection
        title="With Presets"
        description="Quick selection buttons for common date ranges."
      >
        <FlowDateRangePicker
          label="Reporting Period"
          presets={COMMON_PRESETS}
          placeholderStart="Start date"
          placeholderEnd="End date"
        />
      </DemoSection>

      <DemoSection title="Size Variants" description="Date range picker supports standard sizes.">
        <Stack gap="component">
          <FlowDateRangePicker
            label="Small"
            size="sm"
            defaultValue={{ start: "2026-03-01", end: "2026-03-15" }}
          />
          <FlowDateRangePicker
            label="Medium"
            size="md"
            defaultValue={{ start: "2026-03-01", end: "2026-03-15" }}
          />
          <FlowDateRangePicker
            label="Large"
            size="lg"
            defaultValue={{ start: "2026-03-01", end: "2026-03-15" }}
          />
        </Stack>
      </DemoSection>

      <DemoSection title="Validation States" description="Error state for form validation.">
        <Grid minItemWidth="280px" gap="component">
          <FlowDateRangePicker
            label="Valid Range"
            defaultValue={{ start: "2026-03-01", end: "2026-03-15" }}
          />
          <FlowDateRangePicker
            label="Invalid Range"
            error
            errorMessage="End date must be after start date"
          />
        </Grid>
      </DemoSection>

      <DemoSection title="Disabled State" description="Non-interactive state for read-only forms.">
        <FlowDateRangePicker
          label="Fixed Period"
          disabled
          defaultValue={{ start: "2026-03-01", end: "2026-03-15" }}
        />
      </DemoSection>
    </Stack>
  );
}

export function DateRangePickerUseCasesDemo() {
  const [bookingRange, setBookingRange] = useState<DateRange | null>(null);
  const [reportRange, setReportRange] = useState<DateRange | null>(null);

  return (
    <Stack gap="component-lg">
      <Surface variant="primary" padding="container">
        <Stack gap="component">
          <Text variant="heading-m">Hotel Booking</Text>
          <FlowTextInput label="Guest Name" placeholder="Jane Smith" />
          <FlowDateRangePicker
            label="Check-in / Check-out"
            value={bookingRange}
            onChange={setBookingRange}
            placeholderStart="Check-in date"
            placeholderEnd="Check-out date"
            min={new Date().toISOString().split("T")[0]}
          />
          <FlowTextInput label="Number of Guests" type="number" defaultValue="2" />
          <FlowButton variant="primary">Check Availability</FlowButton>
        </Stack>
      </Surface>

      <Surface variant="primary" padding="container">
        <Stack gap="component">
          <Text variant="heading-m">Analytics Dashboard</Text>
          <FlowDateRangePicker
            label="Date Range"
            value={reportRange}
            onChange={setReportRange}
            presets={COMMON_PRESETS}
            size="sm"
          />
          {reportRange && (
            <Callout>
              <Text variant="paragraph-s">
                Showing data from <strong>{reportRange.start}</strong> to{" "}
                <strong>{reportRange.end}</strong>
              </Text>
            </Callout>
          )}
          <Inline gap={2}>
            <FlowButton variant="primary">Generate Report</FlowButton>
            <FlowButton variant="outlined">Export CSV</FlowButton>
          </Inline>
        </Stack>
      </Surface>

      <Surface variant="primary" padding="container">
        <Stack gap="component">
          <Text variant="heading-m">Campaign Scheduler</Text>
          <FlowTextInput label="Campaign Name" placeholder="Summer Sale 2026" />
          <FlowDateRangePicker label="Campaign Duration" presets={COMMON_PRESETS} />
          <FlowButton variant="primary">Schedule Campaign</FlowButton>
        </Stack>
      </Surface>
    </Stack>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 3. FLOW COLOR PICKER
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function ColorPickerOverviewDemo() {
  const [color1, setColor1] = useState("#3b82f6");
  const [color2, setColor2] = useState("#ef4444");

  const customSwatches = [
    "#ff6b6b",
    "#4ecdc4",
    "#45b7d1",
    "#f7b731",
    "#5f27cd",
    "#00d2d3",
    "#ff9ff3",
    "#54a0ff",
  ];

  return (
    <Stack gap="subsection">
      <DemoSection
        title="Basic Color Picker"
        description="HSL color picker with hex input and swatch palette."
      >
        <FlowColorPicker label="Brand Color" value={color1} onChange={setColor1} />
      </DemoSection>

      <DemoSection title="With Default Color" description="Pre-selected color displayed in picker.">
        <FlowColorPicker label="Accent Color" value={color2} onChange={setColor2} />
      </DemoSection>

      <DemoSection
        title="Custom Swatches"
        description="Define custom color swatches for quick selection."
      >
        <FlowColorPicker label="Theme Color" swatches={customSwatches} defaultValue="#4ecdc4" />
      </DemoSection>

      <DemoSection title="Size Variants" description="Color picker supports standard sizes.">
        <Stack gap="component">
          <FlowColorPicker label="Small" size="sm" defaultValue="#8b5cf6" />
          <FlowColorPicker label="Medium" size="md" defaultValue="#ec4899" />
          <FlowColorPicker label="Large" size="lg" defaultValue="#f97316" />
        </Stack>
      </DemoSection>

      <DemoSection title="Live Preview" description="See selected color applied to a preview box.">
        <Stack gap="component">
          <FlowColorPicker label="Background Color" value={color1} onChange={setColor1} />
          <Surface
            variant="secondary"
            padding="container"
            style={{ backgroundColor: color1, minHeight: 80 }}
          >
            <Text
              variant="paragraph-s"
              style={{ color: "var(--ref-energy-neutral-0)", textAlign: "center" }}
            >
              Preview: {color1}
            </Text>
          </Surface>
        </Stack>
      </DemoSection>

      <DemoSection title="Disabled State" description="Non-interactive state for read-only forms.">
        <FlowColorPicker label="Fixed Color" disabled defaultValue="#22c55e" />
      </DemoSection>
    </Stack>
  );
}

export function ColorPickerUseCasesDemo() {
  const [brandColor, setBrandColor] = useState("#3b82f6");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [textColor, setTextColor] = useState("#000000");

  return (
    <Stack gap="component-lg">
      <Surface variant="primary" padding="container">
        <Stack gap="component">
          <Text variant="heading-m">Brand Identity</Text>
          <FlowTextInput label="Company Name" placeholder="Acme Inc." />
          <FlowColorPicker
            label="Primary Brand Color"
            value={brandColor}
            onChange={setBrandColor}
          />
          <FlowColorPicker label="Secondary Color" defaultValue="#10b981" />
          <FlowButton variant="primary">Save Brand</FlowButton>
        </Stack>
      </Surface>

      <Surface variant="primary" padding="container">
        <Stack gap="component">
          <Text variant="heading-m">Theme Customizer</Text>
          <FlowColorPicker label="Background" value={bgColor} onChange={setBgColor} />
          <FlowColorPicker label="Text Color" value={textColor} onChange={setTextColor} />
          <Surface
            variant="secondary"
            padding="container"
            style={{ backgroundColor: bgColor, minHeight: 100 }}
          >
            <Text variant="paragraph-m" style={{ color: textColor }}>
              This is a preview of your theme settings
            </Text>
          </Surface>
          <Inline gap={2}>
            <FlowButton variant="primary">Apply Theme</FlowButton>
            <FlowButton variant="outlined">Reset</FlowButton>
          </Inline>
        </Stack>
      </Surface>

      <Surface variant="primary" padding="container">
        <Stack gap="component">
          <Text variant="heading-m">Tag Colors</Text>
          <Text variant="paragraph-s" color="secondary">
            Assign colors to project tags
          </Text>
          <Grid minItemWidth="250px" gap="component">
            <FlowColorPicker label="Design Tag" size="sm" defaultValue="#ec4899" />
            <FlowColorPicker label="Engineering Tag" size="sm" defaultValue="#3b82f6" />
            <FlowColorPicker label="Marketing Tag" size="sm" defaultValue="#f97316" />
          </Grid>
        </Stack>
      </Surface>
    </Stack>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 4. FLOW OTP INPUT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function OTPInputOverviewDemo() {
  const [otp1, setOtp1] = useState("");
  const [otp2, setOtp2] = useState("");

  const handleComplete = (_value: string) => {
    // OTP complete handler — wire to real callback
  };

  return (
    <Stack gap="subsection">
      <DemoSection
        title="Basic OTP Input"
        description="Multi-digit code entry with auto-focus and auto-advance."
      >
        <FlowOTPInput
          label="Enter Verification Code"
          length={6}
          value={otp1}
          onChange={setOtp1}
          onComplete={handleComplete}
        />
      </DemoSection>

      <DemoSection title="4-Digit Code" description="Shorter OTP for PIN entry.">
        <FlowOTPInput label="Enter PIN" length={4} value={otp2} onChange={setOtp2} type="numeric" />
      </DemoSection>

      <DemoSection title="Alphanumeric Code" description="Accept both letters and numbers.">
        <FlowOTPInput label="Activation Code" length={8} type="alphanumeric" />
      </DemoSection>

      <DemoSection title="Size Variants" description="OTP input supports standard sizes.">
        <Stack gap="component">
          <FlowOTPInput label="Small" size="sm" length={6} />
          <FlowOTPInput label="Medium" size="md" length={6} />
          <FlowOTPInput label="Large" size="lg" length={6} />
        </Stack>
      </DemoSection>

      <DemoSection title="Validation States" description="Error state for invalid codes.">
        <Grid minItemWidth="280px" gap="component">
          <FlowOTPInput label="Valid Code" length={6} defaultValue="123456" />
          <FlowOTPInput
            label="Invalid Code"
            length={6}
            error
            errorMessage="Invalid verification code"
          />
        </Grid>
      </DemoSection>

      <DemoSection title="Disabled State" description="Non-interactive state.">
        <FlowOTPInput label="Verified" length={6} disabled defaultValue="123456" />
      </DemoSection>
    </Stack>
  );
}

export function OTPInputUseCasesDemo() {
  const [verificationCode, setVerificationCode] = useState("");
  const [verified, setVerified] = useState(false);

  const handleVerify = (_code: string) => {
    // Simulate verification
    setTimeout(() => setVerified(true), 1000);
  };

  return (
    <Stack gap="component-lg">
      <Surface variant="primary" padding="container">
        <Stack gap="component">
          <Text variant="heading-m">Two-Factor Authentication</Text>
          <Text variant="paragraph-s" color="secondary">
            Enter the 6-digit code from your authenticator app
          </Text>
          <FlowOTPInput
            label="Verification Code"
            length={6}
            value={verificationCode}
            onChange={setVerificationCode}
            onComplete={handleVerify}
            autoFocus
          />
          {verified && (
            <Callout>
              <Text variant="paragraph-s" color="accent">
                ✓ Code verified successfully!
              </Text>
            </Callout>
          )}
          <FlowButton variant="primary" disabled={verificationCode.length < 6}>
            Verify & Continue
          </FlowButton>
        </Stack>
      </Surface>

      <Surface variant="primary" padding="container">
        <Stack gap="component">
          <Text variant="heading-m">Phone Verification</Text>
          <Text variant="paragraph-s" color="secondary">
            We sent a code to +1 (555) 123-4567
          </Text>
          <FlowOTPInput label="SMS Code" length={4} type="numeric" size="lg" />
          <Inline gap={2}>
            <FlowButton variant="primary">Verify</FlowButton>
            <FlowButton variant="ghost">Resend Code</FlowButton>
          </Inline>
        </Stack>
      </Surface>

      <Surface variant="primary" padding="container">
        <Stack gap="component">
          <Text variant="heading-m">Account Recovery</Text>
          <Text variant="paragraph-s" color="secondary">
            Enter the recovery code from your backup codes
          </Text>
          <FlowOTPInput label="Recovery Code" length={8} type="alphanumeric" />
          <FlowButton variant="primary">Recover Account</FlowButton>
        </Stack>
      </Surface>
    </Stack>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 5. FLOW INLINE EDITABLE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function InlineEditableOverviewDemo() {
  const [title1, setTitle1] = useState("Click to edit this title");
  const [title2, setTitle2] = useState("");
  const [price, setPrice] = useState("$99.99");

  return (
    <Stack gap="subsection">
      <DemoSection
        title="Basic Inline Editable"
        description="Click text to edit in place, blur or Enter to save."
      >
        <FlowInlineEditable value={title1} onChange={setTitle1} />
      </DemoSection>

      <DemoSection title="With Placeholder" description="Shows placeholder when value is empty.">
        <FlowInlineEditable
          value={title2}
          onChange={setTitle2}
          placeholder="Click to add a title..."
        />
      </DemoSection>

      <DemoSection title="In Context" description="Inline editing within other UI elements.">
        <FlowCard padding="container">
          <Stack gap={2}>
            <FlowInlineEditable
              value={title1}
              onChange={setTitle1}
              style={{ fontSize: "var(--ref-type-size-5)", fontWeight: 600 }}
            />
            <Text variant="paragraph-s" color="secondary">
              Product ID: #12345
            </Text>
            <Inline gap={2} align="center">
              <Text variant="paragraph-s">Price:</Text>
              <FlowInlineEditable value={price} onChange={setPrice} />
            </Inline>
          </Stack>
        </FlowCard>
      </DemoSection>

      <DemoSection title="List Items" description="Editable items in a list.">
        <FlowList dividers>
          <FlowListItem
            primary={<FlowInlineEditable value="Task 1: Design mockups" onChange={() => {}} />}
            trailing={<FlowChip size="sm">In Progress</FlowChip>}
          />
          <FlowListItem
            primary={<FlowInlineEditable value="Task 2: Review code" onChange={() => {}} />}
            trailing={<FlowChip size="sm">Complete</FlowChip>}
          />
          <FlowListItem
            primary={
              <FlowInlineEditable value="" onChange={() => {}} placeholder="Add new task..." />
            }
            trailing={<FlowChip size="sm">New</FlowChip>}
          />
        </FlowList>
      </DemoSection>

      <DemoSection title="Disabled State" description="Non-editable state.">
        <FlowInlineEditable value="Read-only content" onChange={() => {}} disabled />
      </DemoSection>
    </Stack>
  );
}

export function InlineEditableUseCasesDemo() {
  const [projectName, setProjectName] = useState("Q1 Marketing Campaign");
  const [taskTitle, setTaskTitle] = useState("Update landing page");
  const [notes, setNotes] = useState("Add customer testimonials");

  return (
    <Stack gap="component-lg">
      <Surface variant="primary" padding="container">
        <Stack gap="component">
          <Inline gap={2} align="center">
            <Text variant="heading-s">Project:</Text>
            <FlowInlineEditable
              value={projectName}
              onChange={setProjectName}
              style={{ fontSize: "var(--ref-type-size-4)", fontWeight: 600 }}
            />
          </Inline>
          <Text variant="paragraph-s" color="secondary">
            Click the project name to rename it
          </Text>
          <FlowButton variant="outlined">Project Settings</FlowButton>
        </Stack>
      </Surface>

      <Surface variant="primary" padding="container">
        <Stack gap="component">
          <Text variant="heading-m">Task Board</Text>
          <FlowCard padding="container">
            <Stack gap={2}>
              <FlowInlineEditable
                value={taskTitle}
                onChange={setTaskTitle}
                style={{ fontSize: "var(--ref-type-size-4)", fontWeight: 500 }}
              />
              <Text variant="paragraph-s" color="secondary">
                Assigned to: Alice Johnson
              </Text>
              <Inline gap={2} align="center">
                <Text variant="paragraph-s">Notes:</Text>
                <FlowInlineEditable value={notes} onChange={setNotes} />
              </Inline>
            </Stack>
          </FlowCard>
        </Stack>
      </Surface>

      <Surface variant="primary" padding="container">
        <Stack gap="component">
          <Text variant="heading-m">Product Catalog</Text>
          <Grid minItemWidth="280px" gap="component">
            <FlowCard padding="container">
              <Stack gap={2}>
                <FlowInlineEditable
                  value="Premium Widget"
                  onChange={() => {}}
                  style={{ fontWeight: 600 }}
                />
                <FlowInlineEditable value="$149.99" onChange={() => {}} />
                <Text variant="paragraph-s" color="secondary">
                  SKU: WDG-001
                </Text>
              </Stack>
            </FlowCard>
            <FlowCard padding="container">
              <Stack gap={2}>
                <FlowInlineEditable
                  value="Standard Widget"
                  onChange={() => {}}
                  style={{ fontWeight: 600 }}
                />
                <FlowInlineEditable value="$99.99" onChange={() => {}} />
                <Text variant="paragraph-s" color="secondary">
                  SKU: WDG-002
                </Text>
              </Stack>
            </FlowCard>
          </Grid>
        </Stack>
      </Surface>
    </Stack>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 6. FLOW RICH TEXT EDITOR
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function RichTextEditorOverviewDemo() {
  const [content1, setContent1] = useState("<p>Start typing...</p>");
  const [content2, setContent2] = useState(
    "<p><strong>Bold text</strong> and <em>italic text</em></p>",
  );

  return (
    <Stack gap="subsection">
      <DemoSection
        title="Basic Rich Text Editor"
        description="WYSIWYG editor with formatting toolbar (bold, italic, underline, lists)."
      >
        <FlowRichTextEditor
          label="Description"
          defaultValue={content1}
          onChange={setContent1}
          placeholder="Enter your content here..."
        />
      </DemoSection>

      <DemoSection title="With Default Content" description="Pre-filled HTML content.">
        <FlowRichTextEditor
          label="Product Description"
          defaultValue={content2}
          onChange={setContent2}
        />
      </DemoSection>

      <DemoSection title="Custom Height" description="Configure minimum and maximum editor height.">
        <FlowRichTextEditor
          label="Article Body"
          minHeight={200}
          maxHeight={400}
          placeholder="Write your article..."
        />
      </DemoSection>

      <DemoSection title="Compact Editor" description="Smaller editor for inline comments.">
        <FlowRichTextEditor
          label="Add Comment"
          minHeight={100}
          placeholder="Type your comment..."
        />
      </DemoSection>

      <DemoSection title="Disabled State" description="Non-editable state for read-only content.">
        <FlowRichTextEditor
          label="Published Content"
          disabled
          defaultValue="<p>This content is <strong>published</strong> and cannot be edited.</p>"
        />
      </DemoSection>
    </Stack>
  );
}

export function RichTextEditorUseCasesDemo() {
  return (
    <Stack gap="component-lg">
      <Surface variant="primary" padding="container">
        <Stack gap="component">
          <Text variant="heading-m">Blog Post Editor</Text>
          <FlowTextInput label="Post Title" placeholder="Enter post title..." />
          <FlowRichTextEditor
            label="Content"
            minHeight={300}
            placeholder="Write your blog post here..."
          />
          <Inline gap={2}>
            <FlowButton variant="primary">Publish</FlowButton>
            <FlowButton variant="outlined">Save Draft</FlowButton>
          </Inline>
        </Stack>
      </Surface>

      <Surface variant="primary" padding="container">
        <Stack gap="component">
          <Text variant="heading-m">Product Description</Text>
          <FlowTextInput label="Product Name" placeholder="Premium Widget" />
          <FlowRichTextEditor
            label="Full Description"
            minHeight={200}
            placeholder="Describe your product features, benefits, specifications..."
          />
          <FlowButton variant="primary">Update Product</FlowButton>
        </Stack>
      </Surface>

      <Surface variant="primary" padding="container">
        <Stack gap="component">
          <Text variant="heading-m">Email Composer</Text>
          <FlowTextInput label="To" placeholder="recipient@example.com" />
          <FlowTextInput label="Subject" placeholder="Email subject" />
          <FlowRichTextEditor label="Message" minHeight={250} placeholder="Compose your email..." />
          <Inline gap={2}>
            <FlowButton variant="primary">Send</FlowButton>
            <FlowButton variant="outlined">Save Draft</FlowButton>
            <FlowButton variant="ghost">Discard</FlowButton>
          </Inline>
        </Stack>
      </Surface>

      <Surface variant="primary" padding="container">
        <Stack gap="component">
          <Text variant="heading-m">Help Article</Text>
          <FlowTextInput label="Article Title" placeholder="How to..." />
          <FlowRichTextEditor
            label="Article Content"
            minHeight={350}
            placeholder="Write step-by-step instructions..."
          />
          <FlowButton variant="primary">Publish Article</FlowButton>
        </Stack>
      </Surface>
    </Stack>
  );
}
