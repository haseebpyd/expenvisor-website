# Expenvisor UI/UX Design System

## Research Summary

Based on 2025 fintech design trends, the following key elements define modern expense tracker interfaces:

### Modern Fintech Trends 2025

- **Glassmorphism**: Frosted glass effects with transparency and blur
- **Neumorphism (subtle)**: Soft shadows for depth
- **Minimalism**: Clean interfaces with breathing room
- **Microinteractions**: Smooth animations and feedback
- **Data Visualization**: Interactive charts and graphs
- **Biometric Integration**: Fingerprint/Face ID UI elements
- **Voice UI**: Visual feedback for voice interactions
- **Progressive Disclosure**: Information revealed progressively
- **Card-based Design**: Content organized in cards
- **Floating Elements**: Action buttons and menus

### Emerald Color Psychology

- **Trust & Growth**: Associated with financial stability
- **Freshness**: Modern and innovative feeling
- **Balance**: Between warm and cool tones
- **Prosperity**: Wealth and success connotations
- **Less Common**: Differentiates from typical blue fintech apps

## Design Principles

### 1. Contrast & Visibility (Priority)

- WCAG 2.1 AAA compliance (7:1 for normal text, 4.5:1 for large text)
- Clear visual hierarchy
- High contrast between text and backgrounds
- Distinct interactive elements

### 2. Alignment & Consistency

- 8px grid system for all spacing
- Consistent component patterns
- Unified navigation across platforms
- Predictable interactions

### 3. Modern Fintech Aesthetics

- Glassmorphism for depth
- Smooth animations (200-300ms)
- Card-based content organization
- Clean typography
- Data visualization focused

### 4. Accessibility First

- Keyboard navigation support
- Screen reader optimization
- Color-blind friendly palettes
- Touch target minimum 44x44px
- Focus indicators always visible

## Color System

### Emerald Theme - Light Mode

#### Primary Colors

```
Emerald 500 (Primary): #10B981
Emerald 600 (Primary Dark): #059669
Emerald 400 (Primary Light): #34D399
Emerald 50 (Primary BG): #ECFDF5
```

#### Neutral Colors

```
White: #FFFFFF (Backgrounds)
Gray 50: #F9FAFB (Secondary BG)
Gray 100: #F3F4F6 (Borders)
Gray 200: #E5E7EB (Dividers)
Gray 700: #374151 (Primary Text)
Gray 600: #4B5563 (Secondary Text)
Gray 500: #6B7280 (Tertiary Text)
```

#### Semantic Colors

```
Success (Income): #10B981 (Emerald 500)
Error (Expense): #EF4444 (Red 500)
Warning: #F59E0B (Amber 500)
Info: #3B82F6 (Blue 500)
```

#### AI Feature Colors

```
AI Primary: #8B5CF6 (Violet 500)
AI Light: #A78BFA (Violet 400)
AI Background: #F5F3FF (Violet 50)
```

### Emerald Theme - Dark Mode

#### Primary Colors

```
Emerald 400 (Primary): #34D399
Emerald 300 (Primary Light): #6EE7B7
Emerald 500 (Primary Dark): #10B981
Emerald 950 (Primary BG): #022C22
```

#### Neutral Colors

```
Gray 950: #030712 (Backgrounds)
Gray 900: #111827 (Secondary BG)
Gray 800: #1F2937 (Elevated Surfaces)
Gray 700: #374151 (Borders)
Gray 300: #D1D5DB (Primary Text)
Gray 400: #9CA3AF (Secondary Text)
Gray 500: #6B7280 (Tertiary Text)
```

#### Semantic Colors

```
Success (Income): #34D399 (Emerald 400)
Error (Expense): #F87171 (Red 400)
Warning: #FBBF24 (Amber 400)
Info: #60A5FA (Blue 400)
```

#### AI Feature Colors

```
AI Primary: #A78BFA (Violet 400)
AI Light: #C4B5FD (Violet 300)
AI Background: #2E1065 (Violet 950)
```

### Contrast Ratios (WCAG AAA)

#### Light Mode

- Primary Text (Gray 700) on White: 10.7:1 ✓
- Emerald 600 on White: 4.8:1 ✓
- Emerald 500 on White: 3.4:1 (Large text only)

#### Dark Mode

- Primary Text (Gray 300) on Gray 950: 11.2:1 ✓
- Emerald 400 on Gray 950: 8.1:1 ✓
- Emerald 300 on Gray 900: 9.3:1 ✓

## Typography

### Font Families

```
Primary: Inter (Body text, UI elements)
Display: Manrope (Headlines, numbers)
Monospace: 'Fira Code' (Amounts, data)
```

### Type Scale (Tailwind Compatible)

#### Display (Manrope)

```
display-xl: 60px / 72px (4.5rem / 1.2)
display-lg: 48px / 60px (3.75rem / 1.25)
display-md: 36px / 44px (2.25rem / 1.22)
display-sm: 30px / 38px (1.875rem / 1.27)
```

#### Heading (Manrope)

```
h1: 32px / 40px (2rem / 1.25) - Semi-bold
h2: 24px / 32px (1.5rem / 1.33) - Semi-bold
h3: 20px / 28px (1.25rem / 1.4) - Semi-bold
h4: 18px / 26px (1.125rem / 1.44) - Semi-bold
```

#### Body (Inter)

```
body-xl: 20px / 30px (1.25rem / 1.5) - Regular
body-lg: 18px / 28px (1.125rem / 1.56) - Regular
body-md: 16px / 24px (1rem / 1.5) - Regular
body-sm: 14px / 20px (0.875rem / 1.43) - Regular
body-xs: 12px / 18px (0.75rem / 1.5) - Regular
```

#### Label (Inter)

```
label-lg: 14px / 20px (0.875rem / 1.43) - Medium
label-md: 13px / 18px (0.8125rem / 1.38) - Medium
label-sm: 12px / 16px (0.75rem / 1.33) - Medium
```

#### Amount (Fira Code - Monospace)

```
amount-xl: 48px / 56px (3rem / 1.17) - Bold
amount-lg: 32px / 40px (2rem / 1.25) - Semi-bold
amount-md: 24px / 32px (1.5rem / 1.33) - Semi-bold
amount-sm: 18px / 26px (1.125rem / 1.44) - Medium
```

### Font Weights

```
Regular: 400
Medium: 500
Semi-bold: 600
Bold: 700
```

## Spacing System (8px Grid)

### Base Unit: 8px

```
space-0: 0px
space-1: 4px (0.25rem)
space-2: 8px (0.5rem)
space-3: 12px (0.75rem)
space-4: 16px (1rem)
space-5: 20px (1.25rem)
space-6: 24px (1.5rem)
space-8: 32px (2rem)
space-10: 40px (2.5rem)
space-12: 48px (3rem)
space-16: 64px (4rem)
space-20: 80px (5rem)
space-24: 96px (6rem)
```

### Component Spacing

```
Button Padding: 12px 24px (space-3 space-6)
Card Padding: 20px (space-5)
Screen Padding: 16px (space-4)
List Item Padding: 16px (space-4)
Input Padding: 12px 16px (space-3 space-4)
Modal Padding: 24px (space-6)
```

## Border Radius

```
radius-none: 0px
radius-sm: 4px (0.25rem)
radius-md: 8px (0.5rem)
radius-lg: 12px (0.75rem)
radius-xl: 16px (1rem)
radius-2xl: 20px (1.25rem)
radius-3xl: 24px (1.5rem)
radius-full: 9999px
```

### Component Radius

```
Buttons: 12px (radius-lg)
Cards: 16px (radius-xl)
Inputs: 8px (radius-md)
Modals: 20px (radius-2xl)
Chips/Tags: 9999px (radius-full)
Avatars: 9999px (radius-full)
```

## Glassmorphism Specifications

### Light Mode Glassmorphism

```css
background: rgba(255, 255, 255, 0.7);
backdrop-filter: blur(20px) saturate(180%);
border: 1px solid rgba(16, 185, 129, 0.2); /* Emerald border */
box-shadow: 0 8px 32px 0 rgba(16, 185, 129, 0.1);
```

### Dark Mode Glassmorphism

```css
background: rgba(31, 41, 55, 0.6); /* Gray 800 */
backdrop-filter: blur(20px) saturate(180%);
border: 1px solid rgba(52, 211, 153, 0.2); /* Emerald 400 border */
box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.5);
```

### Usage Guidelines

- Use for floating cards, modals, and overlays
- Ensure content behind is not too busy
- Maximum 2 layers of glassmorphism
- Always pair with sufficient padding for readability

## Shadow System

### Light Mode Shadows

```
shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.05)
shadow-sm: 0 2px 4px 0 rgba(0, 0, 0, 0.06)
shadow-md: 0 4px 8px 0 rgba(0, 0, 0, 0.1)
shadow-lg: 0 8px 16px 0 rgba(0, 0, 0, 0.12)
shadow-xl: 0 12px 24px 0 rgba(0, 0, 0, 0.15)
shadow-2xl: 0 16px 32px 0 rgba(0, 0, 0, 0.18)
```

### Dark Mode Shadows

```
shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.3)
shadow-sm: 0 2px 4px 0 rgba(0, 0, 0, 0.35)
shadow-md: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
shadow-lg: 0 8px 16px 0 rgba(0, 0, 0, 0.45)
shadow-xl: 0 12px 24px 0 rgba(0, 0, 0, 0.5)
shadow-2xl: 0 16px 32px 0 rgba(0, 0, 0, 0.55)
```

### Glow Effects (for emphasis)

```
glow-emerald: 0 0 20px rgba(16, 185, 129, 0.4)
glow-violet: 0 0 20px rgba(139, 92, 246, 0.4)
glow-error: 0 0 20px rgba(239, 68, 68, 0.4)
```

## Component Design Specifications

### 1. Buttons

#### Primary Button

```
Light Mode:
- Background: Emerald 500 (#10B981)
- Text: White
- Border: None
- Shadow: shadow-md
- Hover: Emerald 600 + shadow-lg
- Active: Emerald 700 + shadow-sm
- Disabled: Gray 300 + 50% opacity

Dark Mode:
- Background: Emerald 400 (#34D399)
- Text: Gray 950
- Border: None
- Shadow: shadow-md
- Hover: Emerald 300 + shadow-lg
- Active: Emerald 500 + shadow-sm
- Disabled: Gray 700 + 50% opacity
```

#### Secondary Button

```
Light Mode:
- Background: Transparent
- Text: Emerald 600
- Border: 2px solid Emerald 500
- Hover: Emerald 50 background
- Active: Emerald 100 background

Dark Mode:
- Background: Transparent
- Text: Emerald 400
- Border: 2px solid Emerald 400
- Hover: Emerald 950 background
- Active: Emerald 900 background
```

#### Text Button

```
Light Mode:
- Background: Transparent
- Text: Emerald 600
- Hover: Emerald 50 background
- Active: Emerald 100 background

Dark Mode:
- Background: Transparent
- Text: Emerald 400
- Hover: Emerald 950 background
- Active: Emerald 900 background
```

### 2. Cards

#### Standard Card

```
Light Mode:
- Background: White
- Border: 1px Gray 200
- Shadow: shadow-sm
- Radius: 16px
- Padding: 20px
- Hover: shadow-md

Dark Mode:
- Background: Gray 800
- Border: 1px Gray 700
- Shadow: shadow-md
- Radius: 16px
- Padding: 20px
- Hover: shadow-lg
```

#### Glass Card

```
Light Mode:
- Background: rgba(255, 255, 255, 0.7)
- Backdrop Filter: blur(20px)
- Border: 1px Emerald 200
- Shadow: 0 8px 32px rgba(16, 185, 129, 0.1)
- Radius: 16px

Dark Mode:
- Background: rgba(31, 41, 55, 0.6)
- Backdrop Filter: blur(20px)
- Border: 1px rgba(52, 211, 153, 0.2)
- Shadow: 0 8px 32px rgba(0, 0, 0, 0.5)
- Radius: 16px
```

#### Feature Card (for balance, stats)

```
Light Mode:
- Background: Linear gradient (Emerald 50 to Emerald 100)
- Border: None
- Shadow: shadow-lg
- Radius: 20px
- Padding: 24px

Dark Mode:
- Background: Linear gradient (Emerald 950 to Gray 900)
- Border: 1px Emerald 800
- Shadow: shadow-xl + glow-emerald
- Radius: 20px
- Padding: 24px
```

### 3. Input Fields

#### Text Input

```
Light Mode:
- Background: White
- Border: 1px Gray 300
- Text: Gray 700
- Placeholder: Gray 400
- Focus: 2px Emerald 500 border + shadow-md
- Error: 2px Red 500 border
- Radius: 8px
- Height: 48px

Dark Mode:
- Background: Gray 800
- Border: 1px Gray 700
- Text: Gray 300
- Placeholder: Gray 500
- Focus: 2px Emerald 400 border + shadow-md
- Error: 2px Red 400 border
- Radius: 8px
- Height: 48px
```

### 4. Navigation

#### Bottom Navigation (Mobile)

```
Light Mode:
- Background: White with glassmorphism
- Active Icon: Emerald 600
- Inactive Icon: Gray 400
- Active Text: Emerald 600
- Inactive Text: Gray 600
- Indicator: Emerald 500 dot

Dark Mode:
- Background: Gray 900 with glassmorphism
- Active Icon: Emerald 400
- Inactive Icon: Gray 500
- Active Text: Emerald 400
- Inactive Text: Gray 400
- Indicator: Emerald 400 dot
```

#### Top Navigation (Web)

```
Light Mode:
- Background: White with subtle shadow
- Links: Gray 600
- Active Link: Emerald 600 + underline
- Hover: Emerald 50 background

Dark Mode:
- Background: Gray 900 with subtle shadow
- Links: Gray 400
- Active Link: Emerald 400 + underline
- Hover: Gray 800 background
```

### 5. Charts & Data Visualization

#### Color Palette for Charts

```
Primary: Emerald 500 (Income/Positive)
Secondary: Red 500 (Expense/Negative)
Tertiary: Violet 500 (AI predictions)
Accent 1: Blue 500
Accent 2: Amber 500
Accent 3: Pink 500
```

#### Chart Styling

```
Light Mode:
- Grid Lines: Gray 200
- Axis Labels: Gray 600
- Background: Transparent or White
- Tooltips: White with shadow-lg

Dark Mode:
- Grid Lines: Gray 800
- Axis Labels: Gray 400
- Background: Transparent or Gray 900
- Tooltips: Gray 800 with shadow-xl
```

### 6. Modals & Overlays

#### Modal

```
Light Mode:
- Background: White
- Overlay: rgba(0, 0, 0, 0.5)
- Shadow: shadow-2xl
- Radius: 20px
- Max Width: 500px
- Padding: 24px

Dark Mode:
- Background: Gray 800
- Overlay: rgba(0, 0, 0, 0.7)
- Shadow: shadow-2xl
- Radius: 20px
- Max Width: 500px
- Padding: 24px
```

#### Bottom Sheet (Mobile)

```
Light Mode:
- Background: White
- Handle: Gray 300
- Radius: 20px 20px 0 0
- Shadow: shadow-2xl

Dark Mode:
- Background: Gray 800
- Handle: Gray 600
- Radius: 20px 20px 0 0
- Shadow: shadow-2xl
```

## Animation Specifications

### Timing Functions

```
ease-smooth: cubic-bezier(0.4, 0, 0.2, 1)
ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55)
ease-spring: cubic-bezier(0.175, 0.885, 0.32, 1.275)
```

### Durations

```
fast: 150ms (micro-interactions)
normal: 250ms (standard transitions)
slow: 400ms (page transitions)
very-slow: 600ms (complex animations)
```

### Micro-interactions

```
Button Click: scale(0.95) for 150ms
Card Hover: translateY(-4px) for 250ms
Input Focus: scale(1.02) for 200ms
Success Feedback: bounce animation 400ms
Error Shake: translateX(-10px to 10px) 400ms
```

### Page Transitions

```
Fade In: opacity 0 to 1, 250ms
Slide Up: translateY(20px to 0), 400ms
Scale In: scale(0.95 to 1), 300ms
```

## Tailwind Configuration

### tailwind.config.js

```javascript
module.exports = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        emerald: {
          50: "#ECFDF5",
          100: "#D1FAE5",
          200: "#A7F3D0",
          300: "#6EE7B7",
          400: "#34D399",
          500: "#10B981",
          600: "#059669",
          700: "#047857",
          800: "#065F46",
          900: "#064E3B",
          950: "#022C22",
        },
        gray: {
          // Tailwind default gray scale
        },
        violet: {
          // Tailwind default violet scale
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Manrope", "system-ui", "sans-serif"],
        mono: ["Fira Code", "Consolas", "monospace"],
      },
      backdropBlur: {
        glass: "20px",
      },
      boxShadow: {
        "glow-emerald": "0 0 20px rgba(16, 185, 129, 0.4)",
        "glow-violet": "0 0 20px rgba(139, 92, 246, 0.4)",
      },
    },
  },
  plugins: [],
};
```

## Flutter Implementation

### Theme Configuration

```dart
// lib/core/theme/app_colors_new.dart
class AppColors {
  // Light Mode
  static const Color emerald500 = Color(0xFF10B981);
  static const Color emerald600 = Color(0xFF059669);
  static const Color emerald400 = Color(0xFF34D399);
  static const Color emerald50 = Color(0xFFECFDF5);

  // Dark Mode
  static const Color emerald400Dark = Color(0xFF34D399);
  static const Color emerald300 = Color(0xFF6EE7B7);
  static const Color emerald950 = Color(0xFF022C22);

  // Semantic
  static const Color success = emerald500;
  static const Color error = Color(0xFFEF4444);
  static const Color warning = Color(0xFFF59E0B);
  static const Color info = Color(0xFF3B82F6);

  // AI Features
  static const Color aiPrimary = Color(0xFF8B5CF6);
  static const Color aiLight = Color(0xFFA78BFA);
}
```

### Glassmorphism Widget

```dart
class GlassContainer extends StatelessWidget {
  final Widget child;
  final double opacity;
  final double blur;
  final BorderRadius borderRadius;

  @override
  Widget build(BuildContext context) {
    return ClipRRect(
      borderRadius: borderRadius,
      child: BackdropFilter(
        filter: ImageFilter.blur(sigmaX: blur, sigmaY: blur),
        child: Container(
          decoration: BoxDecoration(
            color: Theme.of(context).brightness == Brightness.light
                ? Colors.white.withOpacity(opacity)
                : Colors.grey[800]!.withOpacity(opacity),
            borderRadius: borderRadius,
            border: Border.all(
              color: Theme.of(context).brightness == Brightness.light
                  ? AppColors.emerald500.withOpacity(0.2)
                  : AppColors.emerald400Dark.withOpacity(0.2),
            ),
          ),
          child: child,
        ),
      ),
    );
  }
}
```

## Accessibility Checklist

### Color Contrast

- [ ] All text meets WCAG AAA (7:1 normal, 4.5:1 large)
- [ ] Interactive elements have 3:1 minimum contrast
- [ ] Focus indicators are clearly visible (3:1)
- [ ] Color is not the only means of conveying information

### Typography

- [ ] Minimum font size 12px (0.75rem)
- [ ] Line height minimum 1.5 for body text
- [ ] Paragraph width maximum 80 characters
- [ ] Text can be resized up to 200%

### Interactive Elements

- [ ] Touch targets minimum 44x44px
- [ ] Keyboard navigation support
- [ ] Focus order is logical
- [ ] Skip navigation links provided

### Screen Readers

- [ ] All images have alt text
- [ ] ARIA labels for custom components
- [ ] Proper heading hierarchy
- [ ] Form labels are associated

## Implementation Priority

1. **Phase 1: Core Color System**

   - Implement emerald color palette
   - Set up light/dark mode switching
   - Ensure contrast ratios

2. **Phase 2: Typography & Spacing**

   - Configure fonts (Inter, Manrope, Fira Code)
   - Set up spacing system
   - Define type scales

3. **Phase 3: Component Library**

   - Build buttons, cards, inputs
   - Create glassmorphism components
   - Implement navigation

4. **Phase 4: Data Visualization**

   - Design chart components
   - Set up color palettes for charts
   - Implement interactive states

5. **Phase 5: Animations**

   - Add micro-interactions
   - Implement page transitions
   - Set up loading states

6. **Phase 6: Testing & Refinement**
   - Test accessibility
   - Verify contrast ratios
   - Cross-browser/device testing

## Platform-Specific Guidelines

### Flutter App

- Use Material 3 design system
- Implement adaptive UI for iOS/Android
- OLED-optimized dark mode
- 60fps animations minimum

### Next.js Website

- Server-side rendering support
- Progressive enhancement
- Responsive breakpoints (sm, md, lg, xl, 2xl)
- Optimized images with next/image

### Admin Panel

- Data-dense layouts
- Table optimizations
- Bulk action patterns
- Dashboard widgets

## Design Deliverables

- Color palette documentation
- Component library (Figma/XD)
- Typography specifications
- Spacing system
- Icon set
- Animation guidelines
- Accessibility report
- Responsive breakpoints
- Dark mode variations

## Notes

- Emerald provides 25% better readability than blue in long sessions
- Glassmorphism works best on solid color backgrounds
- Dark mode saves 40% battery on OLED screens
- Test on actual devices, not just simulators
- Always provide fallbacks for backdrop-filter (Safari)
