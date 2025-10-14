<!-- 0a77b491-f51e-492f-8725-2e5b6e3e164d 79936a47-107c-454a-b8fa-e900ae53d0aa -->
# Holographic UI Design System Guide

## Overview

This design guide extracts and documents the premium holographic UI style from the provided screenshots, optimized for dark mode only. This system will be used across Flutter app, Next.js website, and Next.js admin panel.

## Key Visual Elements Identified

### Background System

- Deep dark blue-gray gradient (#0F1629 → #1A1F35)
- Subtle mesh/noise texture overlay
- Floating geometric patterns (optional)
- True black for OLED optimization in some areas

### Holographic Gradient Cards

- Multi-color gradients: Pink (#FF6B9D) → Yellow (#FFD93D) → Cyan (#00D9FF) → Purple (#A78BFA)
- Iridescent effect with multiple color stops
- Soft blur behind text for readability
- Raised/floating appearance with subtle shadows

### Glassmorphism Effects

- Frosted glass background blur (backdrop-filter: blur(20px))
- Semi-transparent backgrounds (rgba with 0.1-0.2 alpha)
- Border with subtle gradient or solid white/cyan at 0.1-0.2 opacity
- Box shadow with colored glow

### Typography System

- Primary font: Clean, modern sans-serif (SF Pro Display / Inter / Poppins)
- Display text: Bold, 24-36px
- Body text: Medium, 14-16px
- Caption text: Regular, 11-13px
- High contrast white text on dark backgrounds

### Color Palette (Dark Mode Only)

#### Background Colors

- Primary BG: #0F1629 (deep blue-gray)
- Secondary BG: #1A1F35 (lighter blue-gray)
- Surface: #1E2433 (elevated surfaces)
- True Black: #000000 (for OLED areas)

#### Accent Colors

- Primary Accent: #00D9FF (Cyan) - for highlights, active states
- Secondary Accent: #A78BFA (Soft Purple) - for AI features
- Success/Income: #00FFA3 (Electric Mint)
- Warning/Expense: #FF6B9D (Coral Pink)
- Tertiary: #FFD93D (Golden Yellow)

#### Text Colors

- Primary Text: #FFFFFF (pure white)
- Secondary Text: #94A3B8 (light gray-blue)
- Tertiary Text: #64748B (medium gray-blue)
- Disabled Text: #475569 (dark gray-blue)

#### Holographic Gradient Stops

```
gradient-holographic: linear-gradient(135deg, 
  #FF6B9D 0%,    /* Coral Pink */
  #FFD93D 25%,   /* Yellow */
  #00FFA3 50%,   /* Mint */
  #00D9FF 75%,   /* Cyan */
  #A78BFA 100%   /* Purple */
)
```

## Component Specifications

### 1. Holographic Balance Card

```
Size: Full width, ~180px height
Background: Holographic gradient
Border Radius: 24px
Padding: 24px
Shadow: 0 8px 32px rgba(0, 217, 255, 0.2)
Text: White with semi-transparent background blur
```

### 2. Glassmorphism Container

```
Background: rgba(30, 36, 51, 0.6)
Backdrop Filter: blur(20px) saturate(180%)
Border: 1px solid rgba(255, 255, 255, 0.1)
Border Radius: 16px
Box Shadow: 0 4px 16px rgba(0, 0, 0, 0.3)
```

### 3. Hexagonal Avatar/Icon Container

```
Shape: Hexagon (clip-path or custom shape)
Size: 48-60px
Border: 2px solid rgba(0, 217, 255, 0.3)
Background: rgba(30, 36, 51, 0.8)
Glow Effect: 0 0 20px rgba(0, 217, 255, 0.3)
```

### 4. Chart/Graph Elements

```
Line Color: #00D9FF (Cyan glow)
Fill: Linear gradient from Cyan to transparent
Grid Lines: rgba(255, 255, 255, 0.05)
Data Points: White circles with cyan glow
Background: rgba(30, 36, 51, 0.4)
```

### 5. Transaction List Items

```
Background: rgba(30, 36, 51, 0.5)
Border Radius: 12px
Padding: 16px
Margin: 8px 0
Icon Container: Hexagon with colored border
Hover: Increase opacity to 0.7, add cyan border glow
```

## Flutter Implementation

### Colors (update app_colors.dart)

```dart
// New holographic color system
static const Color bgPrimary = Color(0xFF0F1629);
static const Color bgSecondary = Color(0xFF1A1F35);
static const Color surface = Color(0xFF1E2433);
static const Color accentCyan = Color(0xFF00D9FF);
static const Color accentPurple = Color(0xFFA78BFA);
static const Color accentMint = Color(0xFF00FFA3);
static const Color accentPink = Color(0xFFFF6B9D);
static const Color accentYellow = Color(0xFFFFD93D);

// Holographic gradient
static const LinearGradient holographic = LinearGradient(
  begin: Alignment.topLeft,
  end: Alignment.bottomRight,
  colors: [
    Color(0xFFFF6B9D), // Pink
    Color(0xFFFFD93D), // Yellow
    Color(0xFF00FFA3), // Mint
    Color(0xFF00D9FF), // Cyan
    Color(0xFFA78BFA), // Purple
  ],
  stops: [0.0, 0.25, 0.5, 0.75, 1.0],
);
```

### Glassmorphism Widget

```dart
class GlassmorphicContainer extends StatelessWidget {
  final Widget child;
  final double blur;
  final double opacity;
  final BorderRadius? borderRadius;

  const GlassmorphicContainer({
    required this.child,
    this.blur = 20,
    this.opacity = 0.1,
    this.borderRadius,
  });

  @override
  Widget build(BuildContext context) {
    return ClipRRect(
      borderRadius: borderRadius ?? BorderRadius.circular(16),
      child: BackdropFilter(
        filter: ImageFilter.blur(sigmaX: blur, sigmaY: blur),
        child: Container(
          decoration: BoxDecoration(
            color: Colors.white.withOpacity(opacity),
            borderRadius: borderRadius ?? BorderRadius.circular(16),
            border: Border.all(
              color: Colors.white.withOpacity(0.1),
              width: 1,
            ),
            boxShadow: [
              BoxShadow(
                color: Colors.black.withOpacity(0.3),
                blurRadius: 16,
                offset: const Offset(0, 4),
              ),
            ],
          ),
          child: child,
        ),
      ),
    );
  }
}
```

### Holographic Card Widget

```dart
class HolographicCard extends StatelessWidget {
  final Widget child;
  final double? height;
  final double? width;

  const HolographicCard({
    required this.child,
    this.height,
    this.width,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      height: height,
      width: width,
      decoration: BoxDecoration(
        gradient: AppColors.holographic,
        borderRadius: BorderRadius.circular(24),
        boxShadow: [
          BoxShadow(
            color: AppColors.accentCyan.withOpacity(0.2),
            blurRadius: 32,
            offset: const Offset(0, 8),
          ),
        ],
      ),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(24),
        child: BackdropFilter(
          filter: ImageFilter.blur(sigmaX: 10, sigmaY: 10),
          child: Padding(
            padding: const EdgeInsets.all(24),
            child: child,
          ),
        ),
      ),
    );
  }
}
```

### Hexagon Clipper

```dart
class HexagonClipper extends CustomClipper<Path> {
  @override
  Path getClip(Size size) {
    final path = Path();
    final w = size.width;
    final h = size.height;
    
    path.moveTo(w * 0.5, 0);
    path.lineTo(w, h * 0.25);
    path.lineTo(w, h * 0.75);
    path.lineTo(w * 0.5, h);
    path.lineTo(0, h * 0.75);
    path.lineTo(0, h * 0.25);
    path.close();
    
    return path;
  }

  @override
  bool shouldReclip(CustomClipper<Path> oldClipper) => false;
}
```

## Next.js + Tailwind Implementation

### Tailwind Config (tailwind.config.js)

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        'bg-primary': '#0F1629',
        'bg-secondary': '#1A1F35',
        'surface': '#1E2433',
        'accent-cyan': '#00D9FF',
        'accent-purple': '#A78BFA',
        'accent-mint': '#00FFA3',
        'accent-pink': '#FF6B9D',
        'accent-yellow': '#FFD93D',
      },
      backgroundImage: {
        'holographic': 'linear-gradient(135deg, #FF6B9D 0%, #FFD93D 25%, #00FFA3 50%, #00D9FF 75%, #A78BFA 100%)',
      },
      backdropBlur: {
        'glass': '20px',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'Inter', 'system-ui'],
      },
    },
  },
  plugins: [],
};
```

### Glassmorphism Component (React)

```tsx
export const GlassContainer = ({ 
  children, 
  className = '' 
}: { 
  children: React.ReactNode; 
  className?: string 
}) => {
  return (
    <div 
      className={`
        bg-white/10 
        backdrop-blur-[20px] 
        border border-white/10 
        rounded-2xl 
        shadow-[0_4px_16px_rgba(0,0,0,0.3)]
        ${className}
      `}
    >
      {children}
    </div>
  );
};
```

### Holographic Card Component (React)

```tsx
export const HolographicCard = ({ 
  children, 
  className = '' 
}: { 
  children: React.ReactNode; 
  className?: string 
}) => {
  return (
    <div 
      className={`
        bg-holographic 
        rounded-3xl 
        p-6 
        shadow-[0_8px_32px_rgba(0,217,255,0.2)]
        backdrop-blur-md
        ${className}
      `}
    >
      {children}
    </div>
  );
};
```

### CSS Custom Properties

```css
:root {
  --bg-primary: #0F1629;
  --bg-secondary: #1A1F35;
  --surface: #1E2433;
  --accent-cyan: #00D9FF;
  --accent-purple: #A78BFA;
  --accent-mint: #00FFA3;
  --accent-pink: #FF6B9D;
  --accent-yellow: #FFD93D;
  --text-primary: #FFFFFF;
  --text-secondary: #94A3B8;
  --text-tertiary: #64748B;
}

body {
  background: linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
  color: var(--text-primary);
}

.glass-effect {
  background: rgba(30, 36, 51, 0.6);
  backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
}

.holographic-gradient {
  background: linear-gradient(135deg, 
    #FF6B9D 0%, 
    #FFD93D 25%, 
    #00FFA3 50%, 
    #00D9FF 75%, 
    #A78BFA 100%
  );
}

.text-glow {
  text-shadow: 0 0 20px currentColor;
}

.box-glow-cyan {
  box-shadow: 0 0 20px rgba(0, 217, 255, 0.3);
}
```

## Animation Guidelines

### Micro-interactions

- Button hover: Scale 1.02, add glow shadow
- Card hover: Lift effect (translateY -4px), increase shadow
- Transition duration: 200-300ms
- Easing: cubic-bezier(0.4, 0, 0.2, 1)

### Page transitions

- Fade + slide from bottom
- Duration: 400ms
- Stagger child elements by 50ms

### Loading states

- Shimmer effect with holographic gradient
- Skeleton screens with glass effect
- Pulse animation for avatars

## Spacing & Layout

### Container Max Widths

- Mobile: 100%
- Tablet: 768px
- Desktop: 1200px

### Padding System

- Screen edges: 20px
- Card padding: 20-24px
- Button padding: 12px 24px
- List item padding: 16px

### Grid System

- 12-column grid
- Gap: 16px (mobile), 24px (desktop)

## Accessibility Notes

### Color Contrast

- Ensure text on holographic backgrounds has blur backdrop
- White text on dark backgrounds: WCAG AAA compliant
- Accent colors meet AA standard for non-text elements

### Focus States

- Cyan glow ring: 0 0 0 3px rgba(0, 217, 255, 0.5)
- Always visible on keyboard navigation
- Remove on mouse click

## Implementation Priority

1. Update color system across all platforms
2. Create base glassmorphism and holographic components
3. Apply background gradients and textures
4. Update typography system
5. Implement micro-interactions
6. Test accessibility and contrast
7. Optimize performance (backdrop-filter can be expensive)

## Notes

- Dark mode only - no light variant needed
- Focus on performance: use CSS transforms for animations
- Backdrop filters can impact performance on low-end devices - provide fallbacks
- Test on actual devices for color accuracy
- Holographic gradients work best on OLED screens

### To-dos

- [ ] Update app_colors.dart with new holographic color palette
- [ ] Create GlassmorphicContainer widget for Flutter
- [ ] Create HolographicCard widget for Flutter
- [ ] Create HexagonClipper for Flutter avatar/icons
- [ ] Update Tailwind config for Next.js projects with new colors
- [ ] Create GlassContainer and HolographicCard React components
- [ ] Update app_theme.dart to use new color system
- [ ] Test color contrast and accessibility compliance