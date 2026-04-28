/**
 * Token Parity Test — React ↔ Flutter
 *
 * Validates that ref-level color tokens in the Flutter Dart file
 * match the canonical TypeScript token source.
 * Ensures Principle 2 (Platform Parity) is enforced at CI time.
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { ref } from "../../../packages/tokens/src/tokens.ts";

// ── Parse Dart Color(0xFFrrggbb) values into { name: string, hex: string } ──
function parseDartColors(source: string): Map<string, string> {
  const map = new Map<string, string>();
  // Match: static const Color varName = Color(0xFFHHHHHH);
  const re = /static\s+const\s+Color\s+(\w+)\s*=\s*Color\(0xFF([0-9A-Fa-f]{6})\)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(source)) !== null) {
    map.set(m[1], `#${m[2].toLowerCase()}`);
  }
  return map;
}

// ── Convert camelCase Dart name to the TS token path ──
// e.g. "neutral500" → energy.neutral[500], "blue50" → energy.blue[50]
function dartNameToTokenPath(name: string): { palette: string; shade: string } | null {
  const m = name.match(/^([a-z]+?)(\d+)$/);
  if (!m) return null;
  return { palette: m[1], shade: m[2] };
}

const dartSource = readFileSync(resolve("flutter/flow_ds/lib/tokens/ref_tokens.dart"), "utf-8");
const dartColors = parseDartColors(dartSource);

// Build TS color map from ref.energy
const tsColors = new Map<string, string>();
for (const [palette, shades] of Object.entries(ref.energy)) {
  if (typeof shades === "object" && shades !== null) {
    for (const [shade, hex] of Object.entries(shades)) {
      if (typeof hex === "string" && hex.startsWith("#")) {
        tsColors.set(`${palette}${shade}`, hex.toLowerCase());
      }
    }
  }
}

describe("Token Parity — React ↔ Flutter", () => {
  it("Dart ref_tokens.dart has color entries", () => {
    assert.ok(dartColors.size > 0, "Expected Dart colors to be parsed");
  });

  it("TS tokens.ts has color entries", () => {
    assert.ok(tsColors.size > 0, "Expected TS colors to be parsed");
  });

  // For each numeric Dart color (neutral500, blue50, etc.), verify it matches TS
  const numericDartEntries = [...dartColors.entries()].filter(([name]) =>
    dartNameToTokenPath(name),
  );

  it(`checks ${numericDartEntries.length}+ numeric color tokens for parity`, () => {
    const mismatches: string[] = [];

    for (const [dartName, dartHex] of numericDartEntries) {
      const path = dartNameToTokenPath(dartName);
      if (!path) continue;
      const tsKey = `${path.palette}${path.shade}`;
      const tsHex = tsColors.get(tsKey);

      if (!tsHex) {
        // Token exists in Dart but not in TS — could be a named alias like "coldWhite"
        continue;
      }

      if (tsHex !== dartHex) {
        mismatches.push(`${dartName}: Dart=${dartHex}, TS=${tsHex}`);
      }
    }

    assert.equal(mismatches.length, 0, `Token parity violations:\n${mismatches.join("\n")}`);
  });

  // Spot-check critical tokens
  const CRITICAL_TOKENS = [
    ["neutral0", "#ffffff"],
    ["neutral950", "#080e1b"],
    ["blue500", "#0060df"],
    ["red500", "#ca0e00"],
    ["green500", "#007840"],
  ];

  for (const [name, expectedHex] of CRITICAL_TOKENS) {
    it(`critical token ${name} matches in both platforms`, () => {
      const dartHex = dartColors.get(name);
      const tsHex = tsColors.get(name);
      assert.equal(dartHex, expectedHex, `Dart ${name} expected ${expectedHex} got ${dartHex}`);
      assert.equal(tsHex, expectedHex, `TS ${name} expected ${expectedHex} got ${tsHex}`);
    });
  }
});
