import animate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.stories.@(js|jsx|ts|tsx|mdx)',
    './.storybook/**/*.{js,jsx,ts,tsx,mdx}',
  ],
  safelist: [
    // Variants
    'bg-primary',
    'text-primary-foreground',
    'hover:bg-primary/90',
    'bg-destructive',
    'text-destructive-foreground',
    'hover:bg-destructive/90',
    'border',
    'border-input',
    'bg-background',
    'hover:bg-accent',
    'hover:text-accent-foreground',
    'bg-secondary',
    'text-secondary-foreground',
    'hover:bg-secondary/80',
    'text-primary',
    'underline-offset-4',
    'hover:underline',

    // Sizes
    'h-10',
    'px-4',
    'py-2',
    'h-9',
    'rounded-md',
    'px-3',
    'h-11',
    'px-8',
    'w-10',

    // Utility classes from Loader2 and icons
    'mr-2',
    'h-4',
    'w-4',
    'animate-spin',

    // State/Focus classes
    'focus-visible:outline-none',
    'focus-visible:ring-2',
    'focus-visible:ring-ring',
    'focus-visible:ring-offset-2',
    'ring-offset-background',
    'transition-colors',
    'disabled:pointer-events-none',
    'disabled:opacity-50',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        // Figma Colors Start
        brand: {
          green: {
            light: '#94EA6C',
            DEFAULT: '#70C945',
            dark: '#60B83A',
          },
        },
        formInput: {
          bg: 'hsl(var(--form-input-bg, var(--card)))',
          border: 'hsl(var(--form-input-border, var(--border)))',
          placeholder: 'hsl(var(--form-input-placeholder, var(--muted-foreground)))',
          text: 'hsl(var(--form-input-text, var(--card-foreground)))',
        },
        link: {
          DEFAULT: '#2563EB',
          hover: '#1D4ED8',
        },
        figmaText: {
          heading: 'hsl(var(--text-heading, var(--foreground)))',
          subheading: 'hsl(var(--text-subheading, var(--muted-foreground)))',
          label: 'hsl(var(--text-label, var(--foreground)))',
          DEFAULT: 'hsl(var(--text-body, var(--foreground)))',
        },
        googleButton: {
          border: 'hsl(var(--google-button-border, var(--border)))',
          text: 'hsl(var(--google-button-text, var(--foreground)))',
        },
        // Figma Colors End
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [animate],
};
