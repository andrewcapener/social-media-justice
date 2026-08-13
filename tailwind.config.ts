import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Deliberately NOT the competitor's maroon/red ambulance-chaser palette.
        // Reads protective and credible — this audience is parents, not claimants.
        ink: '#1A2340',        // headlines, primary brand
        indigo: '#232F5C',     // primary surfaces
        'indigo-soft': '#5B7BB8',
        amber: '#E8963C',      // CTA — high contrast against indigo
        'amber-deep': '#C77A26',
        success: '#0F9D6E',
        'text-primary': '#15192B',
        'text-secondary': '#5A6376',
        cream: '#FAF8F5',      // warm neutral bg, softer than clinical white
        'border-default': '#E6E2DC',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s ease-out both',
      },
    },
  },
  plugins: [],
}

export default config
