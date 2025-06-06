# The Plantation House - Maui Wedding Venue

A beautiful Next.js website for The Plantation House, Maui's premier wedding venue.

## Features

- **Next.js 14** - Modern React framework with server-side rendering
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework with custom design system
- **Responsive Design** - Mobile-first approach with beautiful animations
- **Custom Components** - Modular component architecture

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── pages/
│   ├── _app.tsx          # Next.js app wrapper
│   ├── index.tsx         # Home page
│   └── gallery.tsx       # Gallery page
├── components/
│   ├── Navigation.tsx    # Main navigation
│   ├── HeroSection.tsx   # Hero banner
│   ├── Footer.tsx        # Site footer
│   ├── HomeSections.tsx  # Home page sections
│   └── ...               # Other components
└── index.css             # Global styles and Tailwind imports
```

## Pages

- **Home** (`/`) - Main landing page with venue information, services, and contact
- **Gallery** (`/gallery`) - Photo gallery showcasing different venue spaces

## Custom Design System

The project uses a custom color palette:
- **Olive Green** - Primary brand color (#5F653C)
- **Dark Gray** - Text colors
- **Cream** - Background accents

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

This is a standard Next.js application and can be deployed to:
- Vercel (recommended)
- Netlify
- Any hosting platform that supports Node.js

## License

Private project for The Plantation House, Maui. 