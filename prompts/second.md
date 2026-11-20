## Objective

Refactor and upgrade my existing TeddyPups U.A.E. clone so the **typography, custom poodle mascot (design + mouse eye-tracking + hover tail-wiggle + scroll poses), paw-step cursor trail, and homepage layout/aesthetic** match the reference site (`https://puppy.instabizweb.com/`) closely.

Keep the codebase **modular, readable, and junior-developer-friendly** (clean TypeScript, small single-responsibility components, and concise JSDoc comments on every custom hook) because I will walk through these exact files and hooks in my Loom interview video.

---

## 1. Fix Typography & Fonts (High Priority — Currently Very Off)

The current draft uses a narrow, sharp serif everywhere (including nav links and buttons) and overuses ALL-CAPS and script headers. Fix the entire type system as follows:

1. **Load Google Fonts in `index.html`:**
   - **Display Serif (Headings only):** `Fraunces` with soft optical variation (`Fraunces:ital,opsz,wght,SOFT@0,9..144,700..900,100`) and apply `font-variation-settings: "SOFT" 100, "WONK" 1;` on headings so serifs have **soft, rounded ball terminals** instead of sharp angular points.
   - **UI & Body Sans-Serif:** `Plus Jakarta Sans` (weights `400, 500, 600, 700`).
   - **Handwritten Script Accents:** `Caveat` (weights `500, 600`).
2. **Strict Font Role Rules (Update Tailwind config & global CSS):**
   - **Display Headings (`h1`, `h2`, `h3`):** Soft rounded `Fraunces` (`font-weight: 800`, tight line-height `1.08`), **single-color solid dark espresso (`#23170F`)** — do **NOT** split `"Premium teacup puppies in Dubai"` into two colors.
   - **Navbar links, CTA buttons, testimonials, and FAQ questions:** Switch from serif to **clean geometric sans-serif (`Plus Jakarta Sans`, weight `500–600`)**.
   - **Body copy & puppy subtitles:** Medium-readable sans-serif (`400–500`, warm dark brown `#4A3528`), never ultra-thin. Format puppy door subtitles in lowercase comma-separated style (`"Maltipoo, boy, 3 months, with video"`) instead of bulleted capitalized text with an extra `[video]` pill.
   - **Script Accents (`Caveat`):** Use sparingly for lowercase playful accents only (`"every puppy is family"` with a hand-drawn wavy underline, `"puppy passport"`, `"In our showroom"`).
   - **Footer Column Headings (`Explore`, `Say hello`):** Change from cursive script to **gold bold display serif (`Fraunces`, `#D8A24A`)**.
   - **Remove Unnecessary ALL-CAPS:** Change `"AVAILABLE"` → `"Available"` (sentence case). Remove `"ICN ✈ DXB EXPRESS"`, `"QUICK BREED SELECT:"`, `"concierge service"`, and `"UNITED ARAB EMIRATES • PUPPY PASSPORT / SERIES 2026-DXB"`.

---

## 2. Rebuild the Illustrated Poodle Mascot (`src/components/mascot/PoodleMascot.tsx`) + Interactive Hooks

Replace the current tiny, flat, static mascot with a richly illustrated, modular SVG poodle component that matches the reference mascot's silhouette, proportions, and animations.

### Visual Design Spec (`PoodleMascot.tsx`)
- **Warm golden/caramel fur** (`#D89A5B` base with subtle warm shading `#C27E3E`) and a consistent **`2px` dark espresso outline (`#23170F`)**.
- **Signature Features (Must Include All):**
  - Large **cloud-like fluffy top head puff** (layered overlapping soft scallops, NOT 3 tiny bumps).
  - **Fluffy scalloped ear puffs** framing both sides of the face (NOT smooth oval ears).
  - Distinct **cream-colored muzzle patch** (`#FBF0DF`).
  - **Prominent soft pink rosy cheeks** (`#F2A2A2`).
  - **Large dark round eyes** (`#23170F`) with **crisp white specular highlight dots** that move dynamically toward the mouse.
  - Rounded-T dark brown nose with a wide, friendly smile.
  - **Rust-brown collar (`#A8462A`) with a small cream heart tag** on the neck.
  - **Fluffy pom-pom tail** anchored cleanly at the back so it can rotate around its base.

### Required Custom Hooks & Animations
1. **Mouse Eye-Tracking (`src/hooks/useEyeTracking.ts`):**
   - Takes a `ref` to the mascot SVG container and listens to `window` `mousemove` (disabled on `pointer: coarse` touchscreens).
   - Calculates the angle and normalized distance from the mascot's center to the cursor and outputs clamped `{ x, y }` offsets (max `±3.5px`) smoothed with `requestAnimationFrame` or Framer Motion `useSpring` (zero React state re-renders per mouse pixel).
   - Apply `{ x, y }` to the mascot's **white eye highlight dots** (and a subtle `0.4x` shift to the dark pupils) so the dog visibly follows the user's cursor around the Hero and page.
2. **Tail Wiggle on Hover:**
   - Wrap the pom-pom tail `<g>` in a Framer Motion `<motion.g>` with `transformOrigin` set at the base of the tail.
   - When the user hovers over the mascot (`onMouseEnter` / `isHovered`), play a lively tail-wiggle keyframe (`rotate: [-14, 18, -14, 18, 0]`, `duration: 0.45`, repeating smoothly while hovered).
3. **Scroll & Section Poses (`pose` prop):**
   - `"hero-peek"`: **Large (`~220px` wide)** head and two front paws peeking over the Hero's scalloped stitched divider; gently bobs/pops up as you scroll.
   - `"side-walk"`: Side-profile walking pose with animated stepping legs moving along the wooden plank floor in **Meet the Pups** and **Intro Preloader**.
   - `"signpost-peek"`: Peeking playfully from behind the central wooden signpost in **Two Ways to Meet Your Puppy**.
   - `"journey-step"`: Walking/sitting beside steps `1–3` in **Your Puppy Journey**.
   - `"passport-stand"`: Compact upright standing pose neatly positioned on the **left page** of the open Puppy Passport (never overlapping text).
   - `"shelf-walk"` / `"footer-walk"`: Walking along the wooden shelf in **Happy Families**, standing beside **Questions, Answered**, and walking into the footer with a `"coming?"` speech bubble.

---

## 3. Fix the Cursor Paw-Print Step Trail (`src/hooks/usePawTrail.ts` & `src/components/cursor/PawTrail.tsx`)

The current paw prints are too large (`25–30px`) with heavy dark cartoon outlines. Replace them with the subtle, refined paw-step trail from the reference site:

1. **Desktop Fine-Pointer Only (`useMediaQuery('(pointer: fine)')`):** Completely disabled on touch/mobile screens.
2. **Paw-Print Appearance:**
   - **Size:** Small and delicate (`16px–20px`).
   - **Style:** **Flat, soft, semi-transparent muted tan/brown silhouette** (`#9C7A5B` at `0.35` initial opacity) with **NO dark outline**.
3. **Step-Path Mechanics (`usePawTrail.ts`):**
   - Track the last spawned paw coordinates `(lastX, lastY)`.
   - Only spawn a new paw step when cursor travel distance exceeds `~40px` (so stationary or jittery movement doesn't stack paws).
   - Calculate the movement angle `Math.atan2(dy, dx)` and rotate each paw print to face the direction of travel (`angle + 90deg`).
   - **Alternate left/right foot offset** (`±6px` perpendicular to the movement vector) on every consecutive step so it looks like real tiny puppy footsteps walking behind the cursor.
   - Each paw fades smoothly from `opacity: 0.35, scale: 0.9` to `opacity: 0, scale: 0.75` over `700ms` and cleans itself up from state (cap max active paws to `18` for 60fps performance).

---

## 4. Fix Overall Visual Style & Homepage Section-by-Section Layout

### Global Aesthetic Shift (Remove Neo-Brutalism)
- **Remove** all heavy hard black offset drop-shadows (`5px 5px 0 #000`) on cards, arches, and sections, and **remove** solid black horizontal divider lines between sections.
- Use the reference's **soft storybook handcrafted aesthetic**: thin `1.5px` warm espresso borders (`#3A261B`), subtle bottom-lip shadow on pill buttons (`box-shadow: 0 3px 0 #23170F`, compressing to `0 1px 0` on active press), and seamless illustrated/color transitions between sections.

### Navbar (`Navbar.tsx`)
- Make the navbar **sticky (`sticky top-0 z-40`)** on all pages including the homepage, with a **subtle scalloped bottom edge** (`ScallopedDivider` SVG strip along the bottom edge).
- Keep the brand wordmark clean as **`TeddyPups`** (remove the `"U.A.E."` sub-label underneath).
- Use `Plus Jakarta Sans` (medium/semibold) for links and the emerald green **WhatsApp us** pill button.

### Section 1 — Hero (`HeroSection.tsx`)
- Keep the headline single-color dark espresso: **Premium teacup puppies in Dubai**.
- Place the **large (`~220px`) peeking `PoodleMascot`** resting its paws directly on top of a **cream scalloped dashed-stitched divider** *above* the puppy portraits (NOT below them).
- Replace the 6 static equal-height cards with a **continuous horizontal auto-scrolling marquee** of **varied-height arched puppy photos** (staggered heights for an organic storybook feel) with **floating slightly-rotated pill breed labels** (`"Shih Tzu"`, `"Pomeranian"`, `"Korean Teacup Pomeranian"`, `"Maltipoo"`, `"Cavapoo"`, `"Toy Poodle"`).
- Below the marquee, add the **warm cream diagonal-diamond grid band** transitioning into Section 2.

### Section 2 — Meet the Pups (`MeetThePupsSection.tsx`)
- Give each arched wooden door a **distinct warm wood tone** (cycle across rust-brown `#9E4B2E`, dark espresso `#4A2C20`, warm tan `#C78E59`, terracotta `#B55838`) with a subtle engraved paw watermark and a **simple round doorknob** (no keyhole).
- Use a **wooden plank floor** along the bottom (replace the dashed ground line) where the side-profile `PoodleMascot` walks as you scroll.
- **Fix the 3D Door Opening Animation:** Tie each door's `rotateY` transform (`0deg` → `-105deg`, `transformOrigin: "left center"`, `perspective: 1200px`) directly to horizontal scroll progress so **each door visibly swings open as the walking mascot passes it**, revealing the puppy portrait framed inside. (On mobile `< 768px`, use a horizontal snap-swipe carousel where tapping a door toggles its 3D open state.)

### Section 3 — Two Ways to Meet Your Puppy (`TwoWaysSection.tsx`)
- Remove the circular compass and the two heavy white bordered neo-brutalist boxes.
- Build an open, airy illustrated layout:
  - **Center:** An illustrated **wooden signpost** pointing left (`Puppies in Dubai`) and right (`Imported for you`) with the `PoodleMascot` peeking playfully from behind the post.
  - **Left (`In our showroom`):** Striped shop awning framing a puppy photo above minimalist **Dubai skyline line-art**.
  - **Right (`Imported for you`):** **Korea → Dubai** dotted flight arc with an **illustrated airplane carrying a circular puppy photo** in the window.

### Section 4 — Your Puppy Journey (`PuppyJourneySection.tsx`)
- Remove the `"concierge service"` eyebrow and remove the heavy bordered boxes around steps `(1)`, `(2)`, `(3)` — render them as clean editorial numbered steps on the cream background.
- Add the **`PoodleMascot`** between the steps and the tilted smartphone mockup (walking down steps `1–2` and sitting at step `3`).
- Inside the phone mockup, remove `"QUICK BREED SELECT:"` and animate the WhatsApp chat (`online` → `typing...` → messages + clean breed reply pills) synced to the active scroll step.

### Section 5 — Why Families Trust TeddyPups (`PuppyPassportSection.tsx`)
- Set the section background to **warm golden-tan (`#E7C592`)** instead of cream.
- Render an **open 2-page leather-bound `"puppy passport"` booklet** with scalloped inner page edges:
  - **Left Page:** Section heading + subtitle + upright `PoodleMascot` neatly aligned with generous breathing room (zero overlap!).
  - **Right Page:** The 4 passport ink stamps arranged in a **2×2 grid** (not a 1×4 row).

### Section 6 — Happy Families & Puppies (`HappyFamiliesSection.tsx`)
- Keep the burnt-sienna/terracotta upper band with a **detailed Dubai sunset skyline silhouette (including Burj Khalifa)**, a **comic-style speech-bubble testimonial** (not a heavy-shadow rectangle), and the mascot walking along a wooden shelf.
- Transition the lower Polaroid gallery onto a **dark brown wooden plank wall** (`#3B241A` with subtle plank lines) with Polaroids taped up using pastel washi tape, flanked by a cozy **illustrated floor lamp** and an **arched wooden door**.

### Section 7, 8 & Footer — Continuous Dark Espresso Night Zone
- Keep **Questions, Answered**, **Ready to meet your new best friend?**, and the **Footer (`Home, at last.`)** on **one continuous deep espresso brown (`#23170F`)** starry night background (do **NOT** switch back to cream for `"Ready to meet your new best friend?"`).
- **Ready to Meet (`ShowroomCtaSection.tsx`):** Show a warm **glowing porch light** above an illustrated **swinging open door** revealing a puppy, with `"Enquire on WhatsApp"` and `"Visit & contact"` pills.
- **Footer (`StarryFooter.tsx`):** Gold bold serif column headings (`Explore`, `Say hello`), crescent moon + golden 4-point sparkles, walking `PoodleMascot` with `"coming?"` bubble (remove the woven basket `"sweet dreams"` scene), and clean bottom bar (`© 2026 TeddyPups U.A.E.` | `every puppy is family`).

---

## 5. Verification Checklist Before Finishing

1. Check that `Fraunces` (soft), `Plus Jakarta Sans`, and `Caveat` are actually loaded in DevTools Computed Styles and applied to their exact roles.
2. Move the cursor around the Hero and verify:
   - The poodle mascot's eye highlights track the cursor smoothly.
   - Hovering over the poodle makes its pom-pom tail wiggle.
   - Small, flat, semi-transparent muted-tan paw steps appear along the cursor path and fade cleanly.
3. Scroll through the entire homepage on desktop (`1440px`) and verify the Hero marquee moves smoothly, `Meet the Pups` doors swing open in 3D as the mascot walks past, the Puppy Passport has zero text overlap, and the final 3 sections share the continuous deep espresso night backdrop.
4. Verify mobile (`375px`) has zero horizontal overflow, disables the paw trail on touch, and switches `Meet the Pups` to a tap-to-open swipe carousel.
