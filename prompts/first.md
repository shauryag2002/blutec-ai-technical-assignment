## Role & Objective

Act as a Senior Frontend Engineer mentoring a junior frontend developer. Build a faithful, production-ready clone of **TeddyPups U.A.E.** (`https://puppy.instabizweb.com/`), matching its storybook visual aesthetic, layout, routes, scroll-driven animations, custom paw cursor, interactive components, and full desktop-to-mobile responsiveness.

**Important code-quality constraint:** I will walk through this entire codebase in a recorded Loom video for a technical interview. Every file, component, and custom hook must be **modular, reusable, cleanly typed, and easy for a junior frontend developer to read and explain**. Avoid over-engineered abstractions, cryptic one-liners, or monolithic files. Keep each component focused on a single responsibility and add brief, plain-English JSDoc comments at the top of every custom hook and key component explaining *what* it does and *why* it exists.

---

## 1. Tech Stack

- **Framework:** React 18 + TypeScript + Vite
- **Routing:** `react-router-dom` (v6)
- **Styling:** Tailwind CSS (with semantic CSS custom properties in `src/styles/theme.css` for colors, fonts, borders, and hard offset shadows)
- **Animations:** `framer-motion` (for scroll-linked transforms, 3D door swings, route curtain transitions, and micro-interactions)
- **Icons:** `lucide-react` plus clean, modular inline SVG components for custom brand artwork (poodle mascot, paw prints, scalloped dividers, passport stamps, Dubai skyline, airplane arc, pushpins)
- **Deployment Target:** Static SPA ready for Vercel or Netlify (include `vercel.json` rewrite rule so direct visits to `/puppies`, `/faq`, etc. do not 404)

---

## 2. Clean, Modular Folder Structure

Create the project using this exact structure so it is easy to present in a code walkthrough:

```text
src/
├── main.tsx
├── App.tsx
├── styles/
│   ├── theme.css                  # CSS variables (palette, typography, hard shadows, scalloped masks)
│   └── cursor.css                 # Fine-pointer custom paw cursor rules & touch fallback
├── types/
│   ├── puppy.ts                   # Puppy, FilterState, Breed, LocationCollection types
│   ├── content.ts                 # FaqItem, FamilyMoment, AdoptedTicket, NavItem types
│   └── forms.ts                   # EnquiryFormData, ContactLetterData types
├── data/
│   ├── puppies.ts                 # 15 realistic puppy listings (including 5 Korean Teacup entries)
│   ├── happyFamilies.ts           # Polaroid moments & testimonials ("64 moments and counting")
│   ├── faqs.ts                    # 9 corkboard FAQ Q&A notes
│   ├── goneHome.ts                # Adopted puppies boarding-pass archive
│   └── navigation.ts              # Header links, footer links, contact details
├── hooks/
│   ├── useCustomCursor.ts         # Tracks pointer position & interactive hover state (desktop fine-pointer only)
│   ├── useMediaQuery.ts           # Clean responsive breakpoint helper (isMobile, isTablet, isDesktop, isFinePointer)
│   ├── usePuppyFilters.ts         # Syncs catalogue filters (where, breed, gender) with URL query params
│   ├── useFaqSearch.ts            # Live search filtering + active card open/close state for corkboard FAQ
│   ├── useScrollStep.ts           # Tracks active step (1–3) during scroll in "Your Puppy Journey"
│   └── useRouteTransition.ts      # Coordinates the scalloped-curtain poodle page transition
├── components/
│   ├── cursor/
│   │   └── PawCursor.tsx          # Custom brown paw-print cursor overlay for desktop interactive elements
│   ├── layout/
│   │   ├── Layout.tsx             # Wraps Navbar, RouteTransitionCurtain, <Outlet />, and StarryFooter
│   │   ├── Navbar.tsx             # Desktop nav with active paw indicator + mobile hamburger drawer
│   │   ├── StarryFooter.tsx       # Deep espresso starry night footer with moon, Explore/Say hello, script tagline
│   │   └── RouteTransition.tsx    # Full-screen scalloped diamond-grid curtain with walking poodle & paw trail
│   ├── mascot/
│   │   └── PoodleMascot.tsx       # Reusable SVG poodle mascot with pose prop ("peek" | "walk" | "sit" | "flip" | "think" | "basket")
│   └── ui/
│       ├── StickerButton.tsx      # Pill CTA with thick espresso border, hard offset shadow & hover inversion
│       ├── ScallopedDivider.tsx   # Reusable scalloped/stitched border SVG band
│       ├── WashiTapePolaroid.tsx  # Tilted Polaroid frame with pastel washi tape & handwritten caption
│       ├── PuppyDoorCard.tsx      # Arched wooden-plank door with 3D swing-open hover/scroll reveal & Available badge
│       ├── PassportStamp.tsx      # Ink-stamp badge for the open leather Puppy Passport
│       ├── FilterPill.tsx         # Toggleable pill button with active terracotta fill
│       ├── PushpinNoteCard.tsx    # Tilted corkboard note that straightens on click to expand answer
│       └── BoardingPassCard.tsx   # Perforated "one ticket home" / "admit one" card for /gone-home
├── sections/
│   └── home/
│       ├── HeroSection.tsx        # Tagline, headline, 2 CTAs, 6 arched breed-cycling portraits, flipping mascot
│       ├── MeetThePupsSection.tsx # Desktop pinned horizontal scroll showcase / Mobile swipe carousel
│       ├── TwoWaysSection.tsx     # Wooden signpost: Dubai showroom awning vs. Korea-to-Dubai airplane arc
│       ├── PuppyJourneySection.tsx# 3 scroll-highlighted steps + tilted smartphone chat mockup
│       ├── PuppyPassportSection.tsx# Open leather passport with 4 ink stamps + sunset Dubai skyline
│       ├── HappyFamiliesSection.tsx# Burnt-sienna testimonial, wooden shelf, 2 rows of Polaroids, streetlamp
│       ├── QuestionsSection.tsx   # Starry dark espresso FAQ preview with 3 gold-sparkle Q&As
│       └── ShowroomCtaSection.tsx # Opening storefront door, plants, "welcome home" doormat & CTAs
└── pages/
    ├── HomePage.tsx
    ├── PuppiesPage.tsx            # /puppies (filterable catalogue with URL query sync)
    ├── PuppyDetailPage.tsx        # /puppies/:slug (numbered chapters 1–4, carousel, postcard enquiry form)
    ├── HappyFamiliesPage.tsx      # /happy-families (Polaroid wall)
    ├── HowItWorksPage.tsx         # /how-it-works (jump links, In Dubai vs. Imported toggle, #delivery section)
    ├── FaqPage.tsx                # /faq (searchable corkboard of 9 pushpin note cards)
    ├── ContactPage.tsx            # /contact (showroom info + Mad-Libs fill-in-the-blank letter form)
    └── GoneHomePage.tsx           # /gone-home (boarding-pass archive of adopted puppies)
```

---

## 3. Design System & Visual Tokens

Create a warm, tactile, storybook-sticker aesthetic matching the reference site:

### Color Palette (`src/styles/theme.css`)
- **Warm Cream / Parchment (Primary BG):** `#FDF6EC`
- **Soft Peach-Beige Glow:** `#F7E6D0`
- **Warm Tan / Wood Plank Surface:** `#D9A773` / `#C68E56`
- **Burnt Sienna / Terracotta (Primary CTA & Accent):** `#B8502D` (hover `#9C3F20`)
- **Deep Espresso Brown (Borders, Hard Shadows, Night/Footer BG):** `#2A1A14`
- **Emerald / Forest Green (WhatsApp CTA & Verified Stamp):** `#1E7F4F` (hover `#16633D`)
- **Muted Gold / Amber (Sparkles, Footer Headings, Script Taglines):** `#D8A24A`
- **Pastel Washi Tape Accents:** Soft Blue `#A7D3E8`, Soft Pink `#F2B6C1`, Soft Yellow `#F6DF8C`

### Borders & Shadows (Tactile Sticker Style)
- Every card, pill button, Polaroid, and badge uses a crisp `2px solid #2A1A14` border paired with a solid, unblurred hard offset shadow:
  - `--shadow-hard-sm: 3px 3px 0px #2A1A14;`
  - `--shadow-hard-md: 5px 5px 0px #2A1A14;`
  - `--shadow-hard-lg: 8px 8px 0px #2A1A14;`
- On button press/active state, translate `(2px, 2px)` and reduce shadow to `1px 1px 0px #2A1A14` for physical button feedback.

### Typography (Load via Google Fonts in `index.html`)
- **Display / Headings:** `Fraunces` (weight 700–900, warm high-contrast editorial serif)
- **Body & UI:** `Plus Jakarta Sans` or `Nunito` (weight 400–700, clean rounded geometric sans-serif)
- **Accent Script:** `Caveat` (weight 600–700, casual handwritten style for `every puppy is family`, Polaroid captions, and playful annotations)

---

## 4. Custom Cursor & Hover Interaction System

Implement a dedicated, accessible custom cursor system in `src/hooks/useCustomCursor.ts` and `src/components/cursor/PawCursor.tsx`:

1. **Desktop Only (`@media (pointer: fine)`):**
   - Only enable custom cursor tracking when `useMediaQuery('(pointer: fine)')` is `true` so mobile/tablet touchscreens never render a stuck cursor.
2. **Interactive Paw-Print Cursor:**
   - Default pointer stays clean and readable on plain body text.
   - Whenever hovering over any interactive element (`a`, `button`, `[role="button"]`, `input`, `select`, `textarea`, `.puppy-door`, `.pushpin-card`, `[data-cursor="paw"]`), switch to a **custom brown paw-print cursor** (`#8B4513` / `#B8502D` with `#2A1A14` outline).
   - Add a subtle scale-up (`1.12`) and slight playful tilt (`-8deg`) when hovering clickable cards or CTAs, and a gentle press-down scale (`0.92`) on `mousedown`.
   - Use `pointer-events: none`, `position: fixed`, and `requestAnimationFrame` / Framer Motion spring values (`useMotionValue` + `useSpring`) so cursor movement is 60fps with zero React re-renders on `mousemove`.
3. **Button & Element Hover States:**
   - Outlined cream pill buttons (e.g., **Visit & contact**, **Enquire on WhatsApp**) smoothly invert on hover (fill with warm cream `#FDF6EC` and dark espresso text `#2A1A14` on dark sections, or terracotta fill with cream text on light sections).
   - Active navigation link displays terracotta text plus a small paw-print icon centered underneath.

---

## 5. Page-by-Page Functional & Visual Requirements

### Global Navigation & Footer
- **Navbar (`Navbar.tsx`):**
  - Left: Circular TeddyPups U.A.E. emblem + bold serif **TeddyPups** wordmark.
  - Center: `Home` (`/`), `Puppies` (`/puppies`), `Happy families` (`/happy-families`), `How it works` (`/how-it-works`), `FAQ` (`/faq`), `Visit & contact` (`/contact`). Active link highlighted in terracotta with a small paw icon underneath.
  - Right: Emerald green pill CTA **WhatsApp us** with dark espresso hard offset shadow.
  - Behavior: On the homepage (`/`), the navbar scrolls naturally with the page (not sticky). On subpages, include a subtle scalloped bottom edge.
- **Route Transition (`RouteTransition.tsx`):**
  - Triggered on initial load (brief 900ms preloader) and route navigation: scalloped curtain with diagonal diamond-grid pattern, radial white center glow, illustrated poodle walking left-to-right leaving paw prints above `"every puppy is family"`.
- **Footer (`StarryFooter.tsx`):**
  - Heading `Home, at last.` on a deep espresso starry night background with crescent moon, twinkling stars, and the poodle mascot resting in a woven basket.
  - **Explore column:** `Available puppies` (`/puppies`), `Gone home` (`/gone-home`), `Happy families` (`/happy-families`), `How it works` (`/how-it-works`), `Delivery & collection` (`/how-it-works#delivery`), `FAQ` (`/faq`), `Visit & contact` (`/contact`).
  - **Say hello column:** `WhatsApp +971 50 000 0000`, `info@instabizweb.com`, `Downtown Dubai, United Arab Emirates`, and pill buttons for **Instagram**, **TikTok**, **Facebook**.
  - **Bottom bar:** Circular logo + `© 2026 TeddyPups U.A.E.` on the left; `every puppy is family` in gold handwritten script on the right.

### Homepage (`/`) — All 8 Sections in Order
1. **Hero Section (`HeroSection.tsx`):**
   - Handwritten tagline `every puppy is family` with hand-drawn wavy underline.
   - Headline: **Premium teacup puppies in Dubai**
   - Subheadline: *"Meet your new best friend in our Dubai showroom, or order a rare miniature breed from trusted breeders worldwide."*
   - CTAs: **View available puppies** (terracotta fill -> `/puppies`) and **Enquire on WhatsApp** (cream outlined).
   - Visuals: 6 arched/dome-framed puppy portraits behind a scalloped, dashed-stitched cream border and diagonal diamond-grid band. The portraits periodically cycle through breeds (e.g., `Maltipoo` → `Shih Tzu` → `Pomeranian` → `Cavapoo` → `Toy Poodle`). The illustrated poodle mascot peeks over the center and performs a smooth 3D Y-axis flip/spin tied to scroll (`useScroll` + `useTransform`).
2. **Meet the Pups (`MeetThePupsSection.tsx`):**
   - Header: **Meet the pups** (*"Real puppies, real photos, looking for their families right now."*) + **See all available puppies** button.
   - Curved paw-print trail leading to the poodle mascot with a `"coming?"` speech bubble.
   - Featured arched wooden-plank doors (e.g., *Max*, *Korean Teacup Maltipoo*, *Korean Teacup Poodle*, *Maltipoo & Cavapoo*, *Toy Poodle*, *Pomeranian*, *Copper*) with tilted **Available** badges, paw motifs, and doorknobs, ending in a dashed arch reading **Meet them all** (links to `/puppies`).
   - **Desktop behavior:** Scroll-pinned section (`position: sticky`) where vertical scroll drives horizontal track movement, the poodle walks along the wooden floor, and each arched wooden door swings open in 3D (`rotateY`) as it enters center view to reveal the puppy photo inside.
   - **Mobile/Tablet behavior:** Automatically switches to a smooth horizontal swipe carousel (`overflow-x-auto snap-x snap-mandatory`) where tapping a door toggles its 3D open state—preventing awkward vertical scroll hijacking on small screens.
3. **Two Ways to Meet Your Puppy (`TwoWaysSection.tsx`):**
   - Illustrated wooden signpost pointing left (**Puppies in Dubai**) and right (**Imported for you**).
   - Left card (`In our showroom`): Puppy photo framed under a striped shop awning over a line-art Dubai skyline; CTA **Meet local puppies** (`/puppies?collection=dubai`).
   - Right card (`Imported for you`): Illustrated airplane carrying a circular puppy photo along a dashed arc from **Korea** to **Dubai**; CTA **See imported puppies** (`/puppies?collection=korean-teacup`).
4. **Your Puppy Journey (`PuppyJourneySection.tsx`):**
   - 3 numbered steps: `(1) Choose your breed`, `(2) Get photos & details`, `(3) Secure & safe delivery`, plus an outlined **How it works** button (`/how-it-works`).
   - Paired with a tilted smartphone mockup (**TeddyPups U.A.E.**) on a paw-print chat background.
   - As the user scrolls through steps 1–3 (or taps steps on mobile), the active step highlights and the phone header animates `online` → `typing...`, revealing chat messages and interactive quick-reply breed pills (`Maltipoo`, `Pomeranian`, `Poodle`, `Cavapoo`, `Shih Tzu`).
5. **Why Families Trust TeddyPups (`PuppyPassportSection.tsx`):**
   - Styled as an open leather-bound **puppy passport** with the poodle mascot sitting on the center spine and 4 passport ink stamps:
     1. **Vet-checked & healthy**
     2. **Korea to Dubai, safely**
     3. **Support 24/7**
     4. **Trusted by families worldwide**
   - Transitions smoothly into a warm sunset gradient with layered Dubai skyline silhouettes.
6. **Happy Families & Puppies (`HappyFamiliesSection.tsx`):**
   - Burnt-sienna background with a speech-bubble testimonial from *Sarah M., Dubai, UAE*, a dark brown wooden shelf, two rows of tilted Polaroid photos taped with pastel washi tape (including captions like `"Lulu 🧸 with her new mummy ❤️"` and `"Gang of 3 😍🧸"`), a cozy streetlamp illustration, arched double doors, and **See every happy family** CTA (`/happy-families`).
7. **Questions, Answered (`QuestionsSection.tsx`):**
   - Dark espresso starry section with **Read all questions** button (`/faq`) and 3 Q&As marked by gold 4-point sparkles:
     - *"Are your puppies vaccinated and health-checked?"*
     - *"Can I meet a puppy before I decide?"*
     - *"Can I take my puppy home the same day?"*
8. **Showroom Closing CTA (`ShowroomCtaSection.tsx`):**
   - Heading: **Ready to meet your new best friend?**
   - Illustrated storefront door that swings open on hover/view to reveal a puppy, flanked by potted plants and a `"welcome home"` doormat, with **Enquire on WhatsApp** and **Visit & contact** buttons.

### Subpages (All Fully Functional)
- **Available Puppies (`/puppies` — `PuppiesPage.tsx`):**
  - Displays `15 puppies looking for a home` (dynamic live count, e.g., `5 puppies match` when filtered).
  - Taped-on filter card with pill toggles synced to URL query parameters (`?collection=korean-teacup`, `?breed=maltipoo`, `?gender=girls`):
    - **where:** `Everywhere`, `Imported`, `Korean Teacup`
    - **breed:** `Maltipoo`, `Pomeranian`, `Poodle`, `Cavapoo`, `Shih Tzu`
    - **boy or girl:** `Boys`, `Girls`
  - Includes a dynamic **Clear filters** link when any filter is active, plus an empty-state illustration if a combination has 0 matches.
  - Clicking any puppy card navigates to `/puppies/:slug`.
- **Puppy Detail (`/puppies/:slug` — `PuppyDetailPage.tsx`):**
  - Organized into numbered chapters `(1)` through `(4)`:
    - `(1)` Photo/video carousel with left/right arrows, `1 / N` counter, and clickable horizontal thumbnail strip.
    - `(2)` Puppy traits, age, weight, temperament, and vet/vaccination health checklist.
    - `(3)` Local pickup or Korea-to-Dubai import timeline.
    - `(4) dear TeddyPups...` postcard-styled inline enquiry form with a stitched paw stamp, required `Your name *` and `Phone or WhatsApp *`, optional `Email` and `Your area`, and a pre-filled `Message` mentioning the selected puppy's name. Show clean inline validation and a friendly sent confirmation state.
- **Happy Families (`/happy-families` — `HappyFamiliesPage.tsx`):**
  - Header showing `64 moments and counting`, featured family testimonials, and a responsive Polaroid wall with pastel washi tape and lightbox/modal preview on click.
- **How It Works (`/how-it-works` — `HowItWorksPage.tsx`):**
  - Quick jump links at top, an interactive segmented pill toggle switching between **In Dubai (meet in person)** and **Imported (order upon request)** (updating illustrations, steps, and copy smoothly), and a dedicated `#delivery` section covering **Delivery & collection**.
- **FAQ (`/faq` — `FaqPage.tsx`):**
  - Live search bar with placeholder `"sniff out a question"` and live note count (`9 notes on the board`).
  - Corkboard grid of 9 tilted pushpin note cards. Clicking a card straightens its rotation to `0deg`, expands the answer below a dashed divider, and updates the poodle mascot's speech bubble from `?` to `hm?`.
- **Visit & Contact (`/contact` — `ContactPage.tsx`):**
  - Showroom hours, Downtown Dubai location card, direct WhatsApp/email links, and a **Mad-Libs fill-in-the-blank letter form**:
    - `"Dear TeddyPups, my name is [___], and you can reach me on [___]..."` with an inline breed/topic dropdown (default: `any puppy (not sure yet)`), lined notebook textarea, and **Post my letter** button with validation and confirmation banner.
- **Gone Home (`/gone-home` — `GoneHomePage.tsx`):**
  - Archive of adopted puppies styled as perforated `"one ticket home"` / `"admit one"` boarding passes with departure/arrival stamps (e.g., `SEOUL → DUBAI` or `SHOWROOM → FOREVER HOME`).

---

## 6. Responsive Breakpoint Plan (Desktop, Tablet & Mobile)

Design mobile-first with clean Tailwind breakpoints (`sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`) and verify zero horizontal overflow at `375px`, `768px`, `1024px`, and `1440px`:

| Component / Section             | Desktop (`>= 1024px`)                                            | Tablet (`768px–1023px`)                 | Mobile (`< 768px`)                                                                  |
| :------------------------------ | :--------------------------------------------------------------- | :-------------------------------------- | :---------------------------------------------------------------------------------- |
| **Navbar**                      | Full centered links + active paw + WhatsApp pill                 | Compact links + WhatsApp pill           | Logo + hamburger button opening full-width scalloped cream drawer with WhatsApp CTA |
| **Custom Paw Cursor**           | Active on interactive elements (`pointer: fine`)                 | Active only if fine pointer             | Disabled (`pointer: coarse`); native touch states                                   |
| **Hero Portrait Strip**         | 6 arched portraits in a single row                               | 3×2 grid                                | 2×3 compact arch grid or swipeable row                                              |
| **Meet the Pups**               | Sticky pinned vertical-to-horizontal scroll + 3D auto-open doors | Horizontal swipe carousel + tap-to-open | Horizontal snap-scroll carousel + tap-to-open doors                                 |
| **Two Ways**                    | Side-by-side 2-column cards with central signpost                | Stacked 2-row cards                     | Stacked single-column cards                                                         |
| **Puppy Journey**               | 2-column sticky phone + scroll-triggered steps                   | 2-column compact                        | Stacked steps with tap-to-preview phone chat                                        |
| **Puppy Passport**              | Open 2-page leather book spread                                  | Open 2-page compact                     | Single-column stacked passport pages                                                |
| **Catalogue / FAQ / Gone Home** | 3-column grids                                                   | 2-column grids                          | 1-column stack with `>= 44px` tap targets                                           |

---

## 7. Image Assets Strategy

- Use high-resolution, reliable puppy photography (e.g., curated Unsplash puppy photo URLs organized cleanly in `src/data/puppies.ts` and `src/data/happyFamilies.ts` with fallback handling so no broken images ever appear).
- Build all mascot poses, scalloped edges, wooden signpost, striped awning, airplane flight arc, passport stamps, corkboard pushpins, and starry skyline as lightweight, crisp inline SVG components so the storybook art style renders sharply on Retina and mobile screens without external asset failures.

---

## 8. Implementation Order & Verification

Build cleanly in this order so every milestone is testable:
1. Project setup (`Vite + React + TS + Tailwind + Framer Motion + React Router`), Google Fonts, `theme.css`, and `vercel.json`.
2. Core types (`src/types/*`) and realistic mock data (`src/data/*`).
3. Custom hooks (`src/hooks/*`) with beginner-friendly JSDoc comments.
4. Reusable UI primitives (`src/components/ui/*`), `PoodleMascot`, `PawCursor`, and `Layout` (`Navbar`, `RouteTransition`, `StarryFooter`).
5. Homepage (`src/sections/home/*`) with scroll-driven desktop animations and touch-friendly mobile fallbacks.
6. All 7 subpages (`/puppies`, `/puppies/:slug`, `/happy-families`, `/how-it-works`, `/faq`, `/contact`, `/gone-home`).
7. Run `npm run build` and `npm run lint` to confirm zero TypeScript or build errors, and verify every route, filter, form, cursor state, and responsive breakpoint (`375px` mobile and `1440px` desktop).