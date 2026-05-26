# Design System Inspired by Vaidam Health

## 1. Visual Theme & Atmosphere

Vaidam Health's design system embodies trust, accessibility, and medical professionalism through a clean, modern aesthetic optimized for global medical tourism platforms. The visual language combines a deep teal healthcare authority with warm, approachable neutrals and vibrant accent colors for critical actions. The atmosphere is calm yet decisive—carefully balancing clinical credibility with patient-centric warmth through generous whitespace, clear hierarchies, and intuitive form-driven workflows. Icons are minimalist and illustrative, supporting the narrative of specialized care across multiple disciplines while maintaining consistent visual rhythm throughout the experience.

**Key Characteristics**

- Deep teal primary color (`#005897`) establishing medical trust and institutional credibility
- Bright red secondary action (`#DC3545`) for high-priority CTAs and warning states
- Clean white backgrounds (`#FFFFFF`) with subtle gray accents (`#EEEEEE`) preventing visual fatigue
- Professional sans-serif typography with clear hierarchy supporting rapid scanning
- Generous padding and spacing creating visual breathing room for complex medical information
- Rounded button corners (`6px` to `15px`) softening authority with approachability
- Accessible color contrast ratios supporting diverse user needs in healthcare contexts
- Icon badges and specialty cards creating visual categorization of medical services

## 2. Color Palette & Roles

### Primary

- **Primary Blue** (`#0D6EFD`): Primary interactive elements, links, and active states throughout the platform; used for navigation highlighting and form focus states
- **Deep Teal** (`#005897`): Primary action buttons, headers, and trust-building authority elements; core brand color for medical credibility

### Accent Colors

- **Bright Red** (`#DC3545`): High-priority CTAs, error states, and urgent call-to-action buttons including "Get a FREE quote" and form submission triggers
- **Success Green** (`#198754`): Confirmation states, positive actions, and chat/messaging CTAs like WhatsApp integration
- **Cyan Blue** (`#0DCAF0`): Secondary accent for interactive highlights and tertiary actions; provides visual variety without overwhelming

### Interactive

- **Link Blue** (`#005897`): Standard link color across body content, navigation, and card elements maintaining consistency with primary teal
- **Button Primary Red** (`#DC3545`): Default CTA button background for conversion-focused actions
- **Circular Icon Red** (`#DC3545`): Plus icons and specialty badges on card components

### Neutral Scale

- **Dark Charcoal** (`#333333`): Primary text color for body content, headings, and high-contrast readability
- **Slate Gray** (`#4F4F4F`): Secondary text for descriptions and supporting content
- **Medium Gray** (`#6C757D`): Tertiary text, disabled states, and supplementary labels
- **Light Gray** (`#EEEEEE`): Subtle backgrounds, section dividers, and card backgrounds
- **Off-white** (`#F8F9FA`): Page backgrounds and light container fills preventing stark white fatigue
- **Border Gray** (`#DEE2E6`): Input borders, dividers, and subtle structural lines

### Surface & Borders

- **White** (`#FFFFFF`): Modal backgrounds, card overlays, input fields, and high-contrast containers
- **Light Surface** (`#F8F9FA`): Section backgrounds and subtle differentiation between content zones
- **Border Standard** (`#CCCCCC`): Input field borders, card edges, and subtle dividers

### Semantic / Status

- **Error Red** (`#DC3545`): Form validation errors, alerts, and destructive actions
- **Warning Amber** (`#FFC107`): Warning states, cautionary messages, and attention-requiring notices
- **Success Green** (`#198754`): Success confirmations, positive validations, and approved states

## 3. Typography Rules

### Font Family

**Primary Font:** Myriad Pro Semibold
- Fallback stack: `"MyriadPro-Semibold", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif`
- Used for headings, labels, and emphasis

**Secondary Font:** Myriad Pro Regular
- Fallback stack: `"MyriadPro-Regular", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif`
- Used for body text, inputs, and standard content

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|------|--------|-------------|----------------|-------|
| Display / H1 | Myriad Pro Semibold | 32px | 500 | 39px | 0px | Hero headlines and main page titles |
| Heading / H2 | Myriad Pro Semibold | 26px | 500 | 31px | 0px | Section headers and major subsections |
| Subheading / H3 | Myriad Pro Semibold | 16px | 500 | 19px | 0px | Card titles and component headers |
| Heading / H4 | Myriad Pro Semibold | 20px | 500 | 23px | 0px | Form labels and tertiary headings |
| Body Text | Myriad Pro Regular | 19px | 400 | 29px | 0px | Main paragraph content and descriptions |
| Emphasis / Strong | Myriad Pro Regular | 20px | 700 | 30px | 0px | Highlighted numbers and important values |
| Links | Myriad Pro Regular | 15px | 400 | 23px | 0px | Hyperlinks and navigation items |
| Input / Form | Myriad Pro Regular | 14px | 400 | 21px | 0px | Form input placeholders and field labels |
| Caption / Small | Myriad Pro Regular | 13px | 400 | 19px | 0px | Disclaimers, footnotes, and metadata |
| Button Text | Myriad Pro Regular | 14px | 400 | 21px | 0px | CTA button labels and form actions |

### Principles

- **Clear Hierarchy:** Substantial size differentiation (32px → 13px) enables rapid content scanning in medical contexts
- **Medical Readability:** 29px+ line heights on body text (1.5x multiplier) reduce cognitive load for complex health information
- **Accessibility:** Semibold headings (`weight: 500`) paired with regular body text create sufficient contrast without excessive weight
- **Consistency:** Myriad Pro family maintained across all roles ensuring cohesive brand voice across desktop and mobile
- **Semantic Sizing:** Form inputs sized at 14px for dense data entry; body at 19px for comfortable sustained reading

## 4. Component Stylings

### Buttons

#### Primary Action Button (Large CTA)

- Background: `#DC3545`
- Text Color: `#FFFFFF`
- Font: Myriad Pro Regular, 14px, weight 700
- Padding: `0px 12px`
- Height: `42px`
- Border Radius: `6px`
- Border: `1px solid transparent`
- Box Shadow: `none`
- Line Height: `21px`
- Hover State: Background darkened to `#BB2D3B` with increased cursor prominence
- Active State: Background compressed to `#A02834`

#### Primary Action Button (Standard)

- Background: `#DC3545`
- Text Color: `#FFFFFF`
- Font: Myriad Pro Regular, 14px, weight 400
- Padding: `0px 12px`
- Height: `42px`
- Border Radius: `6px`
- Border: `1px solid #DC3545`
- Box Shadow: `none`
- Line Height: `21px`
- Hover State: Background to `#BB2D3B`
- Active State: Background to `#A02834`

#### Circular Icon Button

- Background: `#005897`
- Text Color: `#FFFFFF`
- Font: Myriad Pro Regular, 15px, weight 400
- Padding: `1px 6px`
- Height: `36px`
- Width: `36px`
- Border Radius: `50%`
- Border: `0px`
- Box Shadow: `none`
- Usage: Plus icons on specialty cards, minimize/maximize toggles

#### Secondary Navigation Button

- Background: transparent
- Text Color: `#4F4F4F`
- Font: Myriad Pro Regular, 15px, weight 400
- Padding: `0px 12px`
- Height: auto
- Border Radius: `0px`
- Border: `0px`
- Box Shadow: `none`
- Hover State: Text color to `#005897`, light background to `#F8F9FA`

#### Chat/WhatsApp Button

- Background: `#198754`
- Text Color: `#FFFFFF`
- Font: Myriad Pro Regular, 14px, weight 400
- Padding: `0px 12px`
- Height: `42px`
- Border Radius: `6px`
- Border: `1px solid #198754`
- Box Shadow: `none`
- Hover State: Background darkened to `#146C43`

### Cards & Containers

#### Specialty Service Card

- Background: `#FFFFFF`
- Border: `1px solid #DEE2E6`
- Border Radius: `8px`
- Padding: `20px`
- Box Shadow: `0px 2px 8px rgba(0, 0, 0, 0.06)`
- Icon Container: Background `#FFFFFF`, icon color `#005897`, size 48px
- Title: Font Myriad Pro Semibold, 16px, color `#333333`
- Description: Font Myriad Pro Regular, 14px, color `#6C757D`
- Plus Badge: Background `#DC3545`, positioned top-right, 36px circular
- Hover State: Box shadow elevated to `0px 4px 16px rgba(0, 0, 0, 0.12)`, slight translateY `-2px`

#### Destination Country Card

- Background: `#FFFFFF`
- Border: `2px solid #005897`
- Border Radius: `10px`
- Padding: `16px 20px`
- Layout: Flex row with flag emoji + country name
- Text: Font Myriad Pro Regular, 15px, color `#005897`
- Height: `52px`
- Min Width: `150px`
- Hover State: Background to `#F8F9FA`, shadow `0px 2px 8px rgba(0, 88, 151, 0.15)`

#### Form Container / Modal Card

- Background: `#FFFFFF`
- Border Radius: `12px`
- Padding: `32px`
- Box Shadow: `0px 8px 32px rgba(0, 0, 0, 0.12)`
- Title: Myriad Pro Semibold, 26px, color `#333333`
- Spacing between fields: `16px` vertical gap

### Inputs & Forms

#### Search Input (Rounded)

- Background: `#FFFFFF`
- Text Color: `#212529`
- Font: Myriad Pro Regular, 14px, weight 400
- Padding: `10px 45px 10px 15px`
- Height: `38px`
- Border Radius: `30px`
- Border: `2px solid #E0E0E0`
- Placeholder Color: `#ADB5BD`
- Focus State: Border color to `#0D6EFD`, box shadow `0px 0px 0px 3px rgba(13, 110, 253, 0.1)`
- Icon Position: Right-aligned search icon `8px` from right edge

#### Standard Form Input

- Background: `#FFFFFF`
- Text Color: `#212529`
- Font: Myriad Pro Regular, 16px, weight 400
- Padding: `6px 12px 6px 18px`
- Height: `35px`
- Border Radius: `8px`
- Border: `1px solid #CCCCCC`
- Placeholder Color: `#6C757D`
- Focus State: Border color to `#0D6EFD`, box shadow `0px 0px 0px 2px rgba(13, 110, 253, 0.1)`
- Line Height: `24px`

#### Dropdown / Select Input

- Background: `#FFFFFF`
- Text Color: `#212529`
- Font: Myriad Pro Regular, 14px, weight 400
- Padding: `8px 12px`
- Height: `36px`
- Border Radius: `6px`
- Border: `1px solid #CCCCCC`
- Arrow Icon: Color `#005897`, size 16px, right-aligned
- Focus State: Border to `#0D6EFD`, shadow `0px 0px 0px 2px rgba(13, 110, 253, 0.1)`

#### Textarea / Multi-line Input

- Background: `#FFFFFF`
- Text Color: `#212529`
- Font: Myriad Pro Regular, 14px, weight 400
- Padding: `10px 15px`
- Border Radius: `6px`
- Border: `1px solid #CCCCCC`
- Min Height: `90px`
- Line Height: `21px`
- Placeholder: `#6C757D`, text "Describe The Current Medical Problem ..."
- Focus State: Border to `#0D6EFD`, box shadow `0px 0px 0px 2px rgba(13, 110, 253, 0.1)`

### Navigation

#### Primary Navigation Bar

- Background: `#005897`
- Height: `57px`
- Padding: `0px 20px`
- Layout: Flex row, items center-aligned
- Logo: Height `40px`, left-aligned with `8px` right margin
- Nav Items: Myriad Pro Regular, 15px, color `#FFFFFF`
- Item Spacing: `24px` between items
- Hover State: Nav text color remains `#FFFFFF`, underline appears in `#0DCAF0`
- Active State: Text color `#0DCAF0`, bottom border `3px solid #0DCAF0`

#### Secondary Navigation (Dropdown)

- Background: `#FFFFFF`
- Border: `1px solid #DEE2E6`
- Border Radius: `6px`
- Padding: `8px 0px`
- Items: Myriad Pro Regular, 14px, color `#333333`
- Item Padding: `8px 16px`
- Hover Item: Background `#F8F9FA`
- Box Shadow: `0px 4px 12px rgba(0, 0, 0, 0.1)`

### Badges & Labels

#### Specialty Plus Badge

- Background: `#DC3545`
- Text/Icon: `+` symbol, `#FFFFFF`
- Shape: Circle
- Diameter: `36px`
- Font Size: `24px`
- Position: Absolute top-right on cards with `8px` offset
- Hover State: Background to `#BB2D3B`, shadow `0px 2px 8px rgba(220, 53, 69, 0.3)`

#### Icon Badge (Circular, Teal)

- Background: `#005897`
- Icon Color: `#FFFFFF`
- Shape: Circle
- Diameter: `48px`
- Display: Icon centered, Flex layout

## 5. Layout Principles

### Spacing System

**Base Unit:** `4px`

**Scale:** Multiples of the base unit following the sequence:
- `4px` (1x) – tight adjacent elements, icon spacing
- `8px` (2x) – minimal padding, nested elements
- `12px` (3x) – standard internal padding for small components
- `16px` (4x) – gap between flex columns, form field spacing
- `20px` (5x) – component padding, section boundaries
- `24px` (6x) – margin between subsections
- `32px` (8x) – padding within cards and containers
- `40px` (10x) – margin between major sections
- `48px` (12x) – large section padding, horizontal rhythms
- `52px` (13x) – specialty spacing for prominent containers
- `92px` (23x) – hero section padding, maximum top margins

**Usage Context:**
- Form fields: `16px` vertical gap between inputs
- Card content: `20px` padding, `8px` icon-to-text spacing
- Section margins: `40px` to `92px` creating visual breathing room
- Button padding: `0px 12px` horizontal, `8px` vertical for standard buttons

### Grid & Container

- **Max Width:** `1200px` for main content containers
- **Sidebar Width:** `300px` for navigation sidebars (when present)
- **Column Strategy:** 12-column grid system on desktop with 6-column on tablet, 4-column on mobile
- **Gutter:** `16px` between columns, increased to `24px` on larger screens
- **Section Patterns:**
  - Hero section: Full-width with background image overlay, 92px top/bottom padding
  - Content section: Max-width container with 48px horizontal padding
  - Card grid: 3-column on desktop (specialty cards), 2-column tablet, 1-column mobile
  - Form modal: Fixed 500px width on desktop, 90vw on mobile with 20px margins

### Whitespace Philosophy

The design prioritizes generous whitespace to reduce cognitive load when presenting complex medical information. Vaidam Health's interface respects the principle that empty space is not wasted space—it provides visual rest and emphasizes content hierarchy. Each section is isolated with substantial margins (`40px` to `92px`), preventing content fatigue during research-intensive browsing. Form containers especially benefit from spacious padding (`32px` minimum) and field gaps (`16px`), making data entry less daunting. Icon-to-text spacing (`8px` to `12px`) ensures visual clarity without crowding, while paragraph line heights (`29px`) exceed standard minimums to support sustained reading of medical descriptions.

### Border Radius Scale

- **Sharp:** `0px` – Navigation bars, full-width sections, legacy button elements
- **Subtle:** `5px` – Small interactive elements, legacy buttons
- **Standard:** `6px` – Form inputs, standard buttons, badge icons
- **Rounded:** `8px` – Input fields, specialty card corners, modal containers
- **Generous:** `10px` – Destination country cards, prominent containers
- **Extra Round:** `15px` – Large CTA buttons (variant)
- **Circular:** `50%` – Icon badges, plus buttons, avatar containers, circular progress indicators

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Flat | `box-shadow: none` | Navigation bars, section backgrounds, disabled states |
| Raised | `box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.06)` | Card containers, form fields, standard interactive elements |
| Floating | `box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.12)` | Hovered cards, tooltip containers, secondary modals |
| Elevated | `box-shadow: 0px 8px 32px rgba(0, 0, 0, 0.12)` | Primary modals, dropdown menus, focus states |
| Modal | `box-shadow: 0px 12px 48px rgba(0, 0, 0, 0.15)` | Full-screen overlays, critical alerts (use sparingly) |
| Accent Elevation | `box-shadow: 0px 2px 8px rgba(220, 53, 69, 0.3)` | Red button hovers, warning badges, emphasis elements |
| Trust Elevation | `box-shadow: 0px 2px 8px rgba(0, 88, 151, 0.15)` | Primary teal elements on hover, trust-building components |

**Shadow Philosophy:**

The elevation system uses soft, diffused shadows to create subtle depth without introducing visual noise. Shadows use semi-transparent black (`rgba(0, 0, 0, X)`) to maintain color independence and blend naturally over any background. The shadow scale progresses gradually (2px → 12px blur radius), providing incremental visual hierarchy. Healthcare contexts benefit from restrained depth—excessive shadows distract from content clarity. Interactive elements (cards, buttons) receive shadow increases on hover, providing clear affordance feedback. Accent colors receive colored shadows (red for danger, teal for trust) to reinforce semantic meaning while maintaining the soft aesthetic. All shadows remain below 15% opacity to prevent visual heaviness.

## 7. Do's and Don'ts

### Do

- **Use the deep teal (`#005897`) for primary trust-building elements** like navigation, icons, and authority buttons; it establishes medical credibility immediately
- **Apply the red (`#DC3545`) exclusively to high-priority CTAs** including "Get a FREE quote," form submissions, and error states to create consistent conversion signals
- **Maintain the 32px → 13px typography scale** to ensure clear hierarchy; avoid intermediate sizes that disrupt scanning patterns
- **Space form fields 16px apart vertically** and apply 32px padding to form containers; this breathing room reduces anxiety during health data entry
- **Use the raised shadow (`0px 2px 8px rgba(0, 0, 0, 0.06)`) on all clickable cards** to signify interactivity without overwhelming the interface
- **Pair Myriad Pro Semibold headings with regular body text** to maximize readability contrast; never use regular weight for headings
- **Apply 30px border radius to search/input fields** at the top of pages; this distinctive shape signals data entry and creates visual brand consistency
- **Include 16px gaps between columns and flex items** to ensure content breathes and prevents dense information clumps
- **Use the 50% border radius for circular icon badges** and buttons to create cohesive focal points throughout specialty cards
- **Test all interactive elements with the 36px minimum touch target** on mobile to ensure accessibility for diverse users including those with motor limitations

### Don't

- **Never use the blue (`#0D6EFD`) for primary actions** where red (`#DC3545`) is established; maintain red as the exclusive conversion driver for form submissions
- **Don't mix font families** beyond Myriad Pro Semibold and Myriad Pro Regular; introducing additional fonts fragments brand consistency
- **Avoid shadows darker than `rgba(0, 0, 0, 0.15)`** which creates visual heaviness inappropriate for medical contexts; healthcare demands clarity over drama
- **Never reduce heading sizes below 16px** for any primary heading role; smaller text increases cognitive load and undermines information hierarchy
- **Don't apply padding less than 8px** to internal component elements; tight spacing creates visual claustrophobia and reduces accessibility
- **Avoid using the green (`#198754`) for primary CTAs** outside messaging integration; reserve it for success states and secondary chat features
- **Don't create custom rounded corners** outside the established scale (0px, 5px, 6px, 8px, 10px, 15px, 50%); inconsistent radius undermines cohesion
- **Never use light gray text (`#ADB5BD`) for body content** longer than captions; insufficient contrast creates readability failures for users with vision challenges
- **Don't apply more than one shadow elevation level to a single element** (e.g., no stacked shadows); layered shadows create visual confusion
- **Avoid left-aligning icon badges on cards**; maintain top-right positioning (`8px` offset) as the consistent badge anchor point

## 8. Responsive Behavior

### Breakpoints

| Name | Width | Key Changes | Column Layout | Spacing Adjustments |
|------|-------|-------------|----------------|---------------------|
| Mobile | 320px–639px | Single-column layout, full-width modals, hamburger nav, stacked form fields | 1 column | Padding `12px`, gaps `12px`, font `14px` body |
| Tablet | 640px–1023px | 2-column card grids, collapsible navigation, condensed form sections | 2 columns | Padding `20px`, gaps `16px`, font `16px` body |
| Desktop | 1024px–1439px | 3-column card grids, full navigation, optimal form layout, max-width containers | 3 columns | Padding `32px`, gaps `16px`, font `19px` body |
| Large Desktop | 1440px+ | 4-column specialty cards (on wide hero sections), expanded hero sections, premium whitespace | 4 columns | Padding `48px`, gaps `20px`, font `19px` body |

### Touch Targets

- **Minimum Interactive Size:** `44px` × `44px` for all clickable elements (buttons, links, inputs)
- **Recommended Spacing:** `8px` minimum between adjacent touch targets to prevent accidental taps
- **Button Height:** `42px` on mobile, expandable to `44px` for primary CTAs
- **Form Input Height:** `35px`–`38px` accommodating thumb accessibility on mobile devices
- **Icon Buttons:** `36px` × `36px` minimum (circular badges meet this standard)
- **Link Hit Area:** Extend link padding to `8px` vertical, `12px` horizontal to increase target size without enlarging text

### Collapsing Strategy

- **Hero Section:** Full background image on desktop; image replaced with solid color overlay on mobile, text enlarges to fill space
- **Navigation:** Horizontal desktop nav collapses to hamburger menu at 640px, drawer slides from left with 80vw width
- **Card Grids:** Desktop 3-column → Tablet 2-column → Mobile 1-column stacking
- **Form Sections:** Desktop side-by-side input pairs stack vertically at tablet breakpoint; full-width inputs on mobile
- **Search Bar:** Maintains `30px` border radius but reduces width from `427px` to `90vw` on mobile, icon positioned right edge
- **Footer:** Desktop 4-column grid collapses to 2-column at tablet, single column at mobile with `24px` spacing
- **Modal Windows:** Desktop 500px fixed width expands to 90vw on tablet with `20px` side margins; full screen mobile with safe area insets
- **Typography:** Heading scale reduced proportionally (H1 from 32px → 24px mobile); body text reduced from 19px → 16px on mobile
- **Padding Collapse:** Container padding reduces from 48px desktop → 20px mobile to preserve screen real estate
- **Specialty Badges:** Plus icons remain `36px` circular on all sizes; position adjusted for mobile viewport

## 9. Agent Prompt Guide

### Quick Color Reference

- **Primary CTA:** Bright Red (`#DC3545`) – All high-priority action buttons including form submissions, "Get a FREE quote," error states
- **Primary Trust:** Deep Teal (`#005897`) – Navigation background, primary icons, heading emphasis, authority elements
- **Primary Link:** Deep Teal (`#005897`) – All hyperlinks and navigation active states
- **Background:** White (`#FFFFFF`) – Modal backgrounds, card overlays, input fields
- **Section Background:** Off-white (`#F8F9FA`) – Page background, subtle section differentiation
- **Heading Text:** Dark Charcoal (`#333333`) – All heading text (H1–H4), primary body emphasis
- **Body Text:** Dark Charcoal (`#333333`) – Main paragraph content
- **Secondary Text:** Slate Gray (`#4F4F4F`) – Descriptions, supporting content
- **Tertiary Text / Disabled:** Medium Gray (`#6C757D`) – Labels, metadata, disabled states
- **Borders:** Border Gray (`#DEE2E6`) – Input borders, card edges, dividers
- **Success State:** Success Green (`#198754`) – Confirmations, positive actions, chat CTAs
- **Warning State:** Warning Amber (`#FFC107`) – Warning messages, cautionary alerts
- **Accent Highlight:** Cyan Blue (`#0DCAF0`) – Secondary interactive highlights, nav active underlines

### Iteration Guide

1. **Primary Actions Always Red:** Every form submission, quote request, or critical conversion point must use `background: #DC3545`, `color: #FFFFFF`. Verify no other button color triggers primary conversions.

2. **Typography Hierarchy Strict:** Use only: 32px (H1), 26px (H2), 20px (H4), 16px (H3), 19px (body), 15px (links), 14px (inputs), 13px (captions). Never create intermediate sizes; ensure each level is purposeful.

3. **Spacing Scale Binary:** Apply only values from the approved scale: 4px, 8px, 12px, 16px, 20px, 24px, 32px, 40px, 48px, 52px, 92px. Never use arbitrary spacing like 18px or 35px.

4. **Border Radius Whitelist:** Restrict radius values to: 0px, 5px, 6px, 8px, 10px, 15px, 50%. All other values break brand consistency.

5. **Form Input Specific Styling:** Search bars: `border-radius: 30px`, `padding: 10px 45px 10px 15px`, `height: 38px`, `border: 2px solid #E0E0E0`. Standard inputs: `border-radius: 8px`, `padding: 6px 12px 6px 18px`, `height: 35px`.

6. **Shadow Elevation Caps:** Maximum shadow: `0px 8px 32px rgba(0, 0, 0, 0.12)` for primary modals. Never exceed this; lighter shadows sufficient for 99% of interactions.

7. **Myriad Pro Exclusive:** Body uses Myriad Pro Regular; headings use Myriad Pro Semibold (weight 500). No fallback to system sans-serif for brand elements; ensure font file delivery.

8. **Card Padding Standard:** All content cards use minimum `20px` padding; form containers use `32px`. Icon spacing within cards: `8px` between icon and text.

9. **Navigation Authority:** Navigation background always `#005897`, text always `#FFFFFF`, height fixed at `57px`. Active nav items display `color: #0DCAF0` with bottom border `3px solid #0DCAF0`.

10. **Responsive Collapse Rules:** Desktop max-width 1200px; tablet breakpoint 640px; mobile single-column at 320px. Form fields stack vertically at tablet. Card grids reduce 3-column → 2-column → 1-column progressively.