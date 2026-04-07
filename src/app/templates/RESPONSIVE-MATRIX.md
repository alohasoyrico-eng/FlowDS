# EmphasisMatrix Responsive Behavior

**Date:** 2026-03-13  
**Component:** `EmphasisMatrix` helper  
**Issue:** Horizontal overflow on mobile viewports  
**Solution:** Adaptive column visibility based on breakpoint

---

## Problem

The `EmphasisMatrix` component displays a CSS Grid with:

- **1 label column** (emphasis names: high, medium, low, etc.)
- **4 data columns** (sizes: sm, md, lg, xl)

On **mobile viewports (< 576px)**, fitting 5 columns causes horizontal scroll, making the matrix difficult to use.

```
┌──────────┬────┬────┬────┬────┐
│          │ sm │ md │ lg │ xl │  ← 5 columns = overflow on mobile
├──────────┼────┼────┼────┼────┤
│ high     │ ● │ ● │ ● │ ● │
│ medium   │ ● │ ● │ ● │ ● │
│ low      │ ● │ ● │ ● │ ● │
│ outline  │ ● │ ● │ ● │ ● │
│ danger   │ ● │ ● │ ● │ ● │
│ ghost    │ ● │ ● │ ● │ ● │
└──────────┴────┴────┴────┴────┘
```

---

## Solution: Responsive Column Visibility

The matrix now **adapts the number of visible size columns** based on viewport:

### Mobile (< 576px) — 2 sizes

Shows **first + last** (sm + xl) to demonstrate range without overflow:

```
┌──────────┬────┬────┐
│          │ sm │ xl │  ← 3 columns = fits mobile
├──────────┼────┼────┤
│ high     │ ● │ ● │
│ medium   │ ● │ ● │
│ low      │ ● │ ● │
│ outline  │ ● │ ● │
│ danger   │ ● │ ● │
│ ghost    │ ● │ ● │
└──────────┴────┴────┘
```

**Rationale:** Mobile users can see the **smallest and largest** sizes, which represent the full range.

---

### Phablet (576px - 768px) — 3 sizes

Shows **sm + md + xl** to add middle-range reference:

```
┌──────────┬────┬────┬────┐
│          │ sm │ md │ xl │  ← 4 columns = fits phablet
├──────────┼────┼────┼────┤
│ high     │ ● │ ● │ ● │
│ medium   │ ● │ ● │ ● │
│ low      │ ● │ ● │ ● │
│ outline  │ ● │ ● │ ● │
│ danger   │ ● │ ● │ ● │
│ ghost    │ ● │ ● │ ● │
└──────────┴────┴────┴────┘
```

**Rationale:** Phablet screens can fit one more column, providing better granularity.

---

### Tablet+ (≥ 768px) — All 4 sizes

Shows **sm + md + lg + xl** (complete matrix):

```
┌──────────┬────┬────┬────┬────┐
│          │ sm │ md │ lg │ xl │  ← 5 columns = desktop default
├──────────┼────┼────┼────┼────┤
│ high     │ ● │ ● │ ● │ ● │
│ medium   │ ● │ ● │ ● │ ● │
│ low      │ ● │ ● │ ● │ ● │
│ outline  │ ● │ ● │ ● │ ● │
│ danger   │ ● │ ● │ ● │ ● │
│ ghost    │ ● │ ● │ ● │ ● │
└──────────┴────┴────┴────┴────┘
```

**Rationale:** Desktop/tablet viewports have sufficient width for the full matrix.

---

## Implementation

### Code

```tsx
export function EmphasisMatrix({ sizes, emphasisLevels, children }) {
  const { breakpoint } = useFlowTheme();
  
  // Responsive column strategy
  const visibleSizes = React.useMemo(() => {
    const sizeArray = Array.from(sizes);
    if (breakpoint.name === "mobile") {
      // Show first and last (sm, xl)
      return [sizeArray[0], sizeArray[sizeArray.length - 1]];
    } else if (breakpoint.name === "phablet") {
      // Show first, middle, last (sm, md, xl)
      if (sizeArray.length === 4) {
        return [sizeArray[0], sizeArray[1], sizeArray[3]];
      }
      return sizeArray.slice(0, 3);
    }
    return sizeArray; // Show all on tablet+
  }, [sizes, breakpoint.name]);

  const matrixStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: `auto repeat(${visibleSizes.length}, 1fr)`,
    alignItems: "center",
    gap: "0.5rem 0.75rem",
  };

  return (
    <div style={matrixStyle}>
      {/* Header row */}
      <div />
      {visibleSizes.map((size) => (
        <div key={size}>{/* size label */}</div>
      ))}
      
      {/* Data rows */}
      {emphasisLevels.map((emphasis) => (
        <div key={emphasis} style={{ display: "contents" }}>
          <div>{/* emphasis label */}</div>
          {visibleSizes.map((size) => (
            <div key={size}>{children(emphasis, size)}</div>
          ))}
        </div>
      ))}
    </div>
  );
}
```

### Key Changes

1. **`useFlowTheme()` hook** — Access current breakpoint
2. **`visibleSizes` computed property** — Filter sizes based on breakpoint.name
3. **Dynamic `gridTemplateColumns`** — Adapts to `visibleSizes.length`
4. **Memoized computation** — Prevents unnecessary recalculations

---

## Benefits

✅ **No horizontal scroll** on mobile  
✅ **Progressive enhancement** — Shows more columns as viewport widens  
✅ **Maintains utility** — Users still see representative size range  
✅ **Consistent API** — No props changes required (automatic behavior)  
✅ **Performance** — Uses `useMemo` to prevent excessive re-renders

---

## Tradeoffs

### ⚠️ Information Density

- **Mobile/Phablet:** Users don't see **all 4 sizes** in the matrix
- **Mitigation:** The "Sizes" section (always visible) shows all 4 sizes explicitly

### ✅ User Experience Priority

- **Mobile users** scrolling horizontally = bad UX
- **Showing representative range** = good enough for mobile context
- **Desktop users** still get the full matrix

---

## Alternative Approaches Considered

### 1. ❌ Horizontal Scroll

**Approach:** Let the matrix overflow and add `overflow-x: auto`

**Problem:**
- Poor UX on touch devices
- Hard to see full row at once
- Breaks visual hierarchy

---

### 2. ❌ Vertical Stack

**Approach:** Stack all size variants vertically on mobile

**Problem:**
- Loses matrix structure (can't compare across emphasis)
- Takes too much vertical space (7 emphasis × 4 sizes = 28 rows)
- Defeats purpose of matrix layout

---

### 3. ❌ Hide Matrix on Mobile

**Approach:** Don't show matrix section at all on mobile

**Problem:**
- Removes valuable reference material
- Inconsistent documentation experience
- Users may want to see combinations

---

### 4. ✅ Adaptive Column Visibility (Chosen)

**Approach:** Show fewer columns on narrow viewports

**Benefits:**
- Maintains matrix structure
- Prevents horizontal scroll
- Progressive enhancement
- No API changes required

---

## Testing Checklist

- [x] Mobile (< 576px) shows 2 columns (sm + xl)
- [x] Phablet (576-768px) shows 3 columns (sm + md + xl)
- [x] Tablet+ (≥ 768px) shows 4 columns (sm + md + lg + xl)
- [x] Matrix updates when viewport resizes
- [x] No horizontal overflow at any breakpoint
- [x] Grid structure remains intact
- [x] Labels align correctly with columns

---

## Conclusion

The responsive `EmphasisMatrix` solves the mobile overflow issue while maintaining the utility of the matrix layout. Users on narrow viewports see a representative range of sizes, while desktop users get the full matrix.

**This is now the default behavior** — no configuration needed. All existing uses of `EmphasisMatrix` automatically benefit from this improvement.

---

**End of Responsive Matrix Documentation**
