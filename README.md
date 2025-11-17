# Mini Country Viewer

A lightweight React application to explore countries with live search and expandable details. Built with modern design principles inspired by Apple iOS and ChronicleHQ.

## Features

- **Live Search**: Filter countries by name in real-time
- **Expandable Cards**: Click to reveal capital and population details
- **Responsive Design**: Fully functional at 375px and scales beautifully
- **Keyboard Accessible**: Navigate and interact with Tab, Enter, and Space keys
- **Minimal Dependencies**: Uses React hooks, Tailwind CSS, and Vite for optimal performance

## Setup

```bash
npm install
npm run dev       # Start development server
npm run build     # Production build
npm run lint      # Run ESLint
npx eslint . --fix  # Auto-fix linting issues
```

## Design Decisions

**Visual Polish**: Inspired by iOS and ChronicleHQ minimalism—clean card-based layout with subtle shadows and smooth transitions. Focus on whitespace and typography hierarchy.

**Keyboard-First A11y**: Semantic HTML with ARIA labels. Cards are keyboard-operable (Tab to focus, Space/Enter to expand). Search input auto-focuses on mount.

**Responsive**: Tailwind's responsive classes ensure 375px mobile view works perfectly with scaled typography, padding, and grid columns (1 mobile → 3 desktop).

**Performance**: React hooks with `useMemo` for efficient filtering; lazy imports; CSS modules via Tailwind for minimal bundle.

**Data Structure**: JSON with flag emojis/SVGs provides rich context without network overhead.
