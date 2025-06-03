import type { Config } from 'tailwindcss';
import animate from 'tailwindcss-animate';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
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
        sans: ['var(--font-inter)', 'sans-serif'], // Set Inter as primary sans-serif
        mono: ['var(--font-geist-mono)', 'monospace'], // Keep Geist Mono or update if needed
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
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
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
            DEFAULT: '#70C945', // A mid-point, can be used if only one green is needed
            dark: '#60B83A',
          },
        },
        formInput: {
          bg: 'hsl(var(--form-input-bg, var(--card)))', // Fallback to --card if --form-input-bg is not defined
          border: 'hsl(var(--form-input-border, var(--border)))',
          placeholder: 'hsl(var(--form-input-placeholder, var(--muted-foreground)))',
          text: 'hsl(var(--form-input-text, var(--card-foreground)))',
        },
        link: {
          DEFAULT: '#2563EB',
          hover: '#1D4ED8',
        },
        figmaText: {
          heading: 'hsl(var(--text-heading, var(--foreground)))', // Fallback to --foreground
          subheading: 'hsl(var(--text-subheading, var(--muted-foreground)))', // Fallback to --muted-foreground
          label: 'hsl(var(--text-label, var(--foreground)))',
          DEFAULT: 'hsl(var(--text-body, var(--foreground)))', // Default body text
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

export default config;
