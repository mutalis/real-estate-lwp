# Make the logo mark fill its box (crop the SVG whitespace)

The icon looks small next to "Bien rentado" because the SVG's `viewBox` is `0 0 1254 1254` while the actual artwork only occupies a small region in the middle. Scaling the element bigger isn't the fix — the empty padding inside the SVG must be cropped so the drawing itself fills the rendered height.

## What changes

1. **Crop the viewBox to the artwork bounds**
   - Artwork extents (including the 36px stroke width on the roof path): roughly x from 324 to 865, y from 307 to 710.
   - New `viewBox` becomes about `316 299 557 419` (a few units of breathing room, keeping the mark from touching the edges).
   - No path, rect, or circle coordinates change — only the viewBox.

2. **Apply it in all three places**
   - Header logo SVG in `public/landing/index.html`
   - Footer logo SVG in `public/landing/index.html`
   - Standalone `public/landing/logo-icon.svg`

3. **Re-tune the rendered size in `public/landing/styles.css`**
   - With the whitespace gone, the current `height: 1.8rem` / `2rem` would render far too large.
   - Set `.nav-logo-icon` to `height: 1.05rem` (mobile, text is `1.02rem`) and `height: 1.15rem` at the 1024px breakpoint (text is `1.12rem`), `width: auto` so the wider-than-tall mark keeps its aspect ratio.

4. **Verify and repackage**
   - Screenshot the header and footer at 320px, 768px, and 1280px in light and dark mode; confirm the mark's visual height matches the wordmark and stays vertically centered.
   - Regenerate `bien-rentado-landing.zip` with the updated files.

## Technical note

The white inner circle in the mark is hardcoded `#FFFFFF`; it stays as-is since it reads as a highlight inside the orange circle in both themes. Cropping the viewBox does not affect theme variables.
