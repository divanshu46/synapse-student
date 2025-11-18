# Neobrutalism Components Migration Guide

## Overview
This project has been configured to use Neobrutalism components as drop-in replacements for shadcn/ui components. Neobrutalism components are based on shadcn but with a bold, brutalist design aesthetic.

## What Changed

### 1. Components Configuration
- Updated `components.json` to include Neobrutalism registry
- Registry URL: `https://registry.neobrutalism.dev`

### 2. Landing Page Layout Redesign
The dashboard landing page (`app/page.tsx`) has been restructured:

**Previous Layout:**
- Left: Tasks & Calendar (350px)
- Center: News (flexible)
- Right: Chatbot (450px)

**New Layout:**
- Left: Tasks & Calendar (320px) - slightly narrower
- Center: Chatbot (flexible, max-width 4xl) - **MUCH LARGER**
- Right: News (280px) - **MUCH SMALLER & COMPACT**

### 3. Component Size Adjustments
- **Chatbot Window**: Height increased from 600px to 800px
- **News Section**: Made more compact with smaller text and tighter spacing

## Installing Neobrutalism Components

To replace existing shadcn components with Neobrutalism versions:

### Install Individual Components
```bash
npx shadcn@latest add neobrutalism/button
npx shadcn@latest add neobrutalism/card
npx shadcn@latest add neobrutalism/input
npx shadcn@latest add neobrutalism/badge
# ... etc
```

### Install All Core Components
```bash
# Button components
npx shadcn@latest add neobrutalism/button

# Card components
npx shadcn@latest add neobrutalism/card

# Form components
npx shadcn@latest add neobrutalism/input
npx shadcn@latest add neobrutalism/textarea
npx shadcn@latest add neobrutalism/select
npx shadcn@latest add neobrutalism/checkbox
npx shadcn@latest add neobrutalism/radio-group
npx shadcn@latest add neobrutalism/switch
npx shadcn@latest add neobrutalism/label

# Layout components
npx shadcn@latest add neobrutalism/separator
npx shadcn@latest add neobrutalism/tabs
npx shadcn@latest add neobrutalism/accordion
npx shadcn@latest add neobrutalism/collapsible

# Overlay components
npx shadcn@latest add neobrutalism/dialog
npx shadcn@latest add neobrutalism/alert-dialog
npx shadcn@latest add neobrutalism/sheet
npx shadcn@latest add neobrutalism/popover
npx shadcn@latest add neobrutalism/tooltip

# Navigation components
npx shadcn@latest add neobrutalism/dropdown-menu
npx shadcn@latest add neobrutalism/context-menu
npx shadcn@latest add neobrutalism/menubar
npx shadcn@latest add neobrutalism/navigation-menu

# Data display
npx shadcn@latest add neobrutalism/table
npx shadcn@latest add neobrutalism/badge
npx shadcn@latest add neobrutalism/avatar
npx shadcn@latest add neobrutalism/alert

# Feedback
npx shadcn@latest add neobrutalism/progress
npx shadcn@latest add neobrutalism/skeleton
npx shadcn@latest add neobrutalism/sonner

# Other
npx shadcn@latest add neobrutalism/calendar
npx shadcn@latest add neobrutalism/command
npx shadcn@latest add neobrutalism/scroll-area
npx shadcn@latest add neobrutalism/slider
npx shadcn@latest add neobrutalism/hover-card
```

## Key Differences

### Design Philosophy
- **Shadcn**: Clean, minimal, modern
- **Neobrutalism**: Bold borders, high contrast, brutalist aesthetic

### Visual Changes
- Thicker borders (typically 2-3px)
- More pronounced shadows
- Higher contrast colors
- Bold, statement-making design
- Raw, unpolished aesthetic

## Migration Strategy

### Option 1: Gradual Migration (Recommended)
Replace components one at a time as you work on different sections:
1. Start with high-visibility components (buttons, cards)
2. Move to form components
3. Finally update overlay and navigation components

### Option 2: Complete Migration
Replace all components at once:
```bash
# Remove existing components
rm -rf components/ui/*

# Install all Neobrutalism components
# Run all the commands listed above
```

## Testing After Migration

1. **Visual Testing**: Check all pages for layout issues
2. **Functionality Testing**: Ensure all interactive components work
3. **Responsive Testing**: Test on mobile, tablet, and desktop
4. **Accessibility Testing**: Verify keyboard navigation and screen readers

## Rollback Plan

If you need to revert to shadcn components:
1. Restore `components.json` from git history
2. Remove Neobrutalism components: `rm -rf components/ui/*`
3. Reinstall shadcn components: `npx shadcn@latest add [component-name]`

## Resources

- Neobrutalism Docs: https://www.neobrutalism.dev/docs
- Installation Guide: https://www.neobrutalism.dev/docs/installation
- Component Examples: https://www.neobrutalism.dev/docs/components
- shadcn/ui Docs: https://ui.shadcn.com

## Notes

- Neobrutalism components are **100% compatible** with shadcn - same props, same API
- No code changes needed in your components - just replace the UI files
- All existing functionality will work exactly the same
- The only changes are visual/aesthetic
