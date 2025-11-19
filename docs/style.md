# MotherDuck.com Style System

> Snapshot of the production homepage on 2024‑xx‑xx (captured from `motherduck.html`, `motherduck.css`, and inline styled-components dump). Use this when recreating the site with pixel-level fidelity.

---

## 1. Brand & Art Direction
- **Voice**: playful but confident. Headlines are short, uppercase, deadpan jokes (“FINALLY: A database you don't hate”). Supporting prose is light and benefits-oriented.
- **Visual metaphor**: retro workstation + hand-drawn ducks. High-contrast outlines (`#383838`) mimicking risograph printing and blueprint scribbles overlaying crisp product shots.
- **Structure**: long scroll with alternating neutral sections. Blue gradients and yellow callouts break monotony but still rely on hard borders and 2 px outlines.
- **Surface hierarchy**: hero + CTAs on cream background (`#F4EFEA`). Feature proof points and testimonials use white cards with 2 px charcoal borders. Deep sections (ecosystem, footer) invert to solid charcoal backgrounds with white type.

---

## 2. Layout System

### 2.1 Breakpoints (from CSS media queries)
| Token | Value | Notes |
| --- | --- | --- |
| `bp-xs` | default (< 556 px) | stacked single column. |
| `bp-sm` | 556 px | sets 3‑column logo grid, wizard badges scaling. |
| `bp-md` | 728 px | core breakpoint; containers tighten padding, hero CTA row widens, grid cards become 2 columns. |
| `bp-lg` | 960 px | hero becomes two-column; footers open multi-columns. |
| `bp-xl` | 1302 px | desktop baseline, large art enters (scribbles, stickers). |
| `bp-xxl` | 1600 px | only a few decorative offsets adjust. |

### 2.2 Container (`.kHNfYW`)
- Width: `100%` with horizontal padding `24px`.
- `@728px`: max width `728px`, padding `20px`.
- `@960px`: max `960px`, padding `60px`.
- `@1302px`: max `1302px`, padding `30px`.
- Use this wrapper for every section to keep center alignment consistent.

### 2.3 Vertical rhythm
- Section padding ranges `40–120px` depending on prominence (hero `40px/160px`; features `60px/120px`; footer `90px/72px`).
- Base spacing unit is **4 px**. Common stacks: 8, 12, 16, 20, 24, 32, 40, 48, 64, 72, 90, 120.
- Cards use `gap:24px` mobile, `32px` desktop.
- Buttons maintain `padding:16.5px 22px` (line-height of 120 %).

### 2.4 Surface framing
- Cream canvas `#F4EFEA` sits behind most sections; hero & CTA modules use the same color to feel airy.
- Section separators are 2 px charcoal borders (see `.cGsGJM`), with a transparent grid texture (`transparent-grid-pattern-lighter.png`) scaled to 480 px mobile / 640 px desktop.
- Hero, blue promo bands (`#6FC2FF`) and yellow chips use squared corners except when hovered (chips adopt 36 px radius).

---

## 3. Typography

| Role | Font | Weight | Size / Line-height | Notes |
| --- | --- | --- | --- | --- |
| `h1` hero | Aeonik Mono | 400 | 30 px / 140 % mobile → 56 px @728 px → 80 px @960 px | Uppercase, `letter-spacing: normal` with manual `0.02em` from `.kvnRPl`. |
| `h2` section titles | Aeonik Mono | 400 | 24 px → 40 px @960 px | All uppercase (`text-transform: uppercase`). |
| `h3-h6` | Aeonik Mono | 400 | 18–32 px | Uniform uppercase to maintain brand voice. |
| Body copy | Inter | 300 | 16 px / 140 % (`letter-spacing: 0.02em`) | All paragraphs default to this. |
| Labels | Inter | 400 | 14 px / 140 % → 16 px / 160 % @728 px | Used in form fields, checkboxes. |
| Utility badge | Aeonik Fono / Aeonik Mono | 400 | 16 px uppercase | e.g. `FINALLY:` slug background `#383838`. |
| CTA subtext | Inter | 400 | 16 px / 120 % | Buttons embed `<span>` with Inter to contrast Aeonik outlines. |

Tips:
- Keep `text-transform: uppercase` for all headings & CTAs.
- Use Inter still for inline emphasis, checkboxes, disclaimers, placeholder text.
- Underlines on inline buttons use `border-bottom: 0.09em solid #383838` and thicken (`+1px`) + turn aqua (`#6FC2FF`) on hover.

---

## 4. Color System

### 4.1 Palette
| Token | Hex | Usage |
| --- | --- | --- |
| `ink` | `#383838` | Primary text, borders, icons. |
| `background-cream` | `#F4EFEA` | Global page background, CTA fills, nav. |
| `surface-white` | `#FFFFFF` | Cards, hero CTA background. |
| `neutral-light` | `#F8F8F7` | Disabled buttons, subtle fills. |
| `neutral-outline` | `#A1A1A1` | Muted text, disabled icons. |
| `cta-blue` | `#6FC2FF` | Primary button fill, hero video highlight. |
| `cta-blue-hover` | `#2BA5FF` | Button active / focus outlines. |
| `cta-green` | `#53DBC9` with `#38C1B0`, `#16AA98` | Secondary accent in hero art + ecosystem icons. |
| `cta-orange` | `#FF9538` | Supporting accent (logos, illustrations). |
| `cta-peach` | `#FF7169`, `#F38E84` | Notification highlights. |
| `cta-yellow` | `#FFDE00` / `#E1C427` / `#FFFDE7` | “Duckling sizes” chip backgrounds. |
| `cta-lime` | `#B3C419` | Additional accent for chips. |
| `cta-lilac` | `#B291DE` | Rare highlight around testimonials. |
| `bg-blue` | `#6FC2FF` | Use-case strip background. |
| `bg-green` | `#E8F5E9` / `#EBF9FF` | Soft success states. |
| `bg-rose` | `#FFEBE9` / `#FDEDDA` | Warning strips. |
| `footer` | `#383838` background, `#FFFFFF` text. |

### 4.2 Patterning
- Buttons and cards rely on 2 px charcoal outlines. Disabled states lighten fill to `#F8F8F7` with `#A1A1A1` borders/icons.
- Focus rings use `outline-color: #2BA5FF; outline-offset: 0`.
- Scrollbar (WebKit) uses `#888` thumb, `#555` hover, `#f1f1f1` track.

---

## 5. Iconography & Illustration
- Illustrations are exported PNGs with transparent backgrounds, sized via `<img data-nimg="fill">` and `position:absolute`.
- Surround hero and CTA modules with SVG scribbles (class `.jLqArr`, `.ecvPDC`, `.bTSOcX`) using `stroke: #383838`, `stroke-width: 3.5px` desktop.
- Stats and chips rely on line icons filled with `#FFFFFF` and stroked `#383838 1.5px`.
- Checkbox ticks use inline SVG `10x7`, fill `#383838`.
- Logos grid uses grayscale PNG/SVG placed inside flex wrappers with hover ghost highlight (`background-color: #38383815`).

---

## 6. Interaction & Motion
- Scroll reveal classes (`.scroll-animate-*`) start at `opacity:0` with ±100 px translation, toggled to `.scroll-animate-visible` (opacity 1, translate 0).
- Buttons:
  - `.kTwmuj` (primary) / `.ldYJVY` (outline) translate `7px` right/up on hover, snap back on active.
  - Outline buttons change fill to `#E1D6CB` on active.
  - Inline link buttons (`.kUDpUT`, `.dBayK`) animate underline thickness & color.
- Chips grid (`.eRpzpp`) scale to 1.15 and gain `border-radius: 36px` on hover at `bp-xl`.
- Hero scribble overlays fade in/out via `@keyframes idkxa`, `jLKMiS`.
- Input placeholders slide to floating labels on focus using `transform: translateY(-100%)`.

---

## 7. Component Specifications

### 7.1 Eyebrow + Header
- Sticky header (`.dEvzxj`) anchored top with `border-bottom: 2px solid transparent` that becomes charcoal on scroll via JS.
- Height tokens: `--header-mobile`, `--header-desktop`.
- Structure: left logo (`154x27` → `174x31`), center nav (hidden < 1302 px), right CTA group.
- Mobile nav toggler (`.fwgfTb`) shows hamburger.
- Buttons in header adopt outline style with `padding: 11.5px 18px`, `font-size:14px`.

### 7.2 Primary CTA Buttons
- **Primary (filled)** `.kTwmuj`: fill `#6FC2FF`, border `2px #383838`, radius `2px`, uppercase Aeonik wrapper + Inter span. Hover: translate (7, -7), active fill `#2BA5FF`.
- **Secondary (outline)** `.ldYJVY`: same border but `background-color: #F4EFEA`. Disabled state uses `#F8F8F7`.
- **Text link button** `.kUDpUT` / `.dBayK`: underline block spanning entire label; active color `#6FC2FF`.
- Keep `gap: 8px` between text and arrow icons.

### 7.3 Hero Module
- Wrapper `.gyLjYh` with `padding-top:40px/padding-bottom:160px` mobile → `110px/180px`.
- Left column `.qKPNC`: stack of badge (Aeonik Fono), `h1`, supporting Aeonik paragraph, CTA row `.hqnFcK`.
- Right column `.ZRzlB`: responsive video container (max width 500→800 px) with autoplay `.webm`. Outline scribbles layered via absolutely positioned SVGs (`.jLqArr`, `.ecvPDC`, `.bTSOcX`) and clickable overlay `.hVwPNm`.
- Video poster uses `poster` attr; overlay link points to blog.
- Background behind hero inherits `#F4EFEA`; hero sits inside `overflow:hidden` to allow scribbles to float out of bounds.

### 7.4 “FINALLY” / Why It’s Better Grid
- Section container `.jHuUkf` uses cream background.
- Eyebrow `.hTqUZI`: Aeonik Mono, `background:#383838`, text white, padding `8px 16px`.
- Subtitle `.dkbHiP`: Aeonik, 40 px/48 px, uppercase.
- Grid `.ffMxqb`: 1 column mobile, 2 columns @728 px, 4 columns @1302 px with `gap:24px→32px`.
- Card `.jfoJoM`: `border:2px solid #383838`, `background:#FFFFFF`, `min-height:164px→352px`.
- Image container `.RyNr` `min-height:164px` with absolutely positioned image; description `.cQYsnH` (Inter 16px) sits below.

### 7.5 “Who is it for?” Cards
- Two implementations exist: stacked cards (`.sc-b1cc4a90-*`) for desktop and carousel version (`.sc-3a8b699b-*`). Keep both for responsiveness.
- Card anchor `.kFDXix`: borderless link wrapping image, `h3` (Aeonik uppercase 24→32px) and paragraph (Inter 16px).
- Image frame `.cRVwEM`: fixed aspect ratio (square) with absolute `img` fill and subtle drop shadow implied by 2 px border.
- Copy lines (“Who ended up with…” etc.) remain Inter 16 px 140 % with `letter-spacing:0.02em`.
- Cards share equal width with `gap:32px` desktop; mobile uses horizontal scroll container.

### 7.6 Use Cases Section
- Title block with Aeonik H2 and Inter paragraph.
- Use-case tabs (Data Warehousing, Customer-facing Analytics) appear as cards with `border:2px`, `background:#FFFFFF`, large Aeonik uppercase `h3`, Inter body.
- Layout is split: copy + bullet list left, screenshot right. Use `grid-template-columns: repeat(2, minmax(0,1fr))` at ≥960 px.
- Keep background neutral (#F4EFEA) and maintain 32 px gaps.

### 7.7 “How We Scale” + Duckling Sizes
- Section `.sc-4f86df99-*` sits on cream with grid texture.
- Central CTA copy width `335px → 1280px` (class `.kBWzjw`).
- Accordion/diagram uses `.boSIBL` card with nested `.sc-4f86df99-11` items (duckling chips) arranged via CSS grid.
- Duckling chip `.eRpzpp`: yellow `#FFFDE7` fill, `border:2px #E1C427`, width `84→280px`, `min-height:78→145px`, `padding:4px 9px` mobile, `12px 20px` desktop. On hover, border width grows to 4 px and radius 36 px.
- Secondary chips `.HgwHk`, `.DBNDq`, etc. follow same pattern but swap accent colors (#53DBC9, #FF9538, #B3C419, #B291DE). Keep uppercase Aeonik labels, Inter supporting text inside.
- Graph subsections (Per-user tenancy, Read scaling) place descriptive copy left and illustration right with fixed heights; images fill container via absolute positioning.

### 7.8 Ecosystem Grid (“Join the flock” logos)
- Wrapper `.efiIuZ` (dark footer lead-in) uses `padding:64px→90px` and `background:#383838`.
- Column groups `.gfppmB` host heading + CTA button (`.eUblhq`).
- Logos laid out using CSS grid `.didOgE`: columns switch 2→3→4 with gaps `40px→24px→16px→32px`.
- Each logo cell `.hZXCXs`, `.bqENAu`, etc. is a flex box with width tokens (16→88px) and hover halo.
- CTA button on dark background is inline SVG wordmark.

### 7.9 Newsletter “DuckDB in Action” Form
- Gradient background uses `#F4EFEA`.
- Input `.fFAtFO`: `border:2px solid #383838`, `padding:16px 40px 16px 24px`, background `rgba(248,248,247,0.7)`, placeholder `#A1A1A1`.
- Floating label `.gvXWox` sits absolutely; transitions to `font-size:12px` and `top:-5px` when focused or filled.
- Checkbox rows `.nWNaP`: custom checkboxes built by stacking `<input type="checkbox">` with absolute pseudo-check `fxtIgx`. Keep `gap:12px`.
- Submit button uses disabled state `.UiqRj` until form validation passes (gray fill).
- Legal helper `.izDvBy`: Inter 12 px, right-aligned.

### 7.10 Footer
- Outer container `.efiIuZ` (charcoal) with `gap:52px→64px`.
- Layout: brand column (logo + tagline) + nav columns + CTA (social icons, contact).
- Section titles uppercase Aeonik, nav links Inter 16 px/160 %.
- Social buttons use 2 px outlines and invert on hover.
- Footer grid adapts: 2 columns mobile, 4 columns at ≥728 px, reorganizes at ≥960 px.

### 7.11 Blue Promo Strip (“Ducking Simple analytics for customer-facing analytics and BI”)
- Height `725px` mobile → `380px` desktop (`.frWTAM`).
- Background `#6FC2FF` with white scribbles anchored bottom left/right (classes `.fxuDRV`, `.pHxhb`) and giant white duck silhouette inserted only at ≥1302 px (`.dQXfvb`).
- Text sits centered with Aeonik title, Inter descriptor, and CTA buttons.
- Use absolute overlay video frame similar to hero but tinted.

---

## 8. Implementation Checklist
1. **Base setup**: import Aeonik Mono, Aeonik Fono, Inter (weights 300/400/600/700) as in `<head>`. Apply CSS reset provided in inline styles (border-box, zero margins, Inter paragraphs).
2. **Global variables**: set CSS custom properties for header heights, scroll padding, and reuse `scroll-animate-*` classes for reveal.
3. **Containers**: wrap each section with `.kHNfYW`, apply top/bottom padding per section spec, and add `border-top/bottom` when referencing `.cGsGJM`.
4. **Buttons**: ensure the same markup `<button class="sc-2f7a5bd-1 ..."><span>LABEL</span></button>` so Inter spans inherit proper typography and transitions.
5. **Sections**: follow the component specs above; maintain 2 px border thickness, uppercase headings, and alternating background fills exactly as documented.
6. **Imagery**: use Next/Image or CSS `position:absolute; inset:0` wrappers to guarantee art scales precisely; keep `sizes="100vw"` for responsive density.
7. **Responsive behavior**: align breakpoints to 728/960/1302; verify hero, grids, logos, and chips reflow at those widths.
8. **Accessibility**: keep outline color `#2BA5FF`, maintain `text-underline-offset:0.22em` for anchors, add `aria-label` to decorative anchors (hero video link).

Following this map will let you reproduce the MotherDuck marketing experience with the same typography, palette, and interaction polish as the live site.
