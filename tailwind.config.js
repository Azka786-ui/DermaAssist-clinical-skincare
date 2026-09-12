/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        derma: {
          dark: "#0a0e12",
          surface: "#12171d",
          elevated: "#1a2129",
          border: "#26323d",
          muted: "#8a9aa8",
          light: "#f7f9fa",
          cream: "#f4ede4",
          sage: {
            DEFAULT: "#2d544b",
            light: "#3e6d62",
            dark: "#1c3731",
            soft: "#eaf3f0",
            glow: "rgba(62, 109, 98, 0.25)",
          },
          gold: {
            DEFAULT: "#c6a87d",
            light: "#dfc7a2",
            dark: "#9f8055",
            glow: "rgba(198, 168, 125, 0.3)",
          },
          accent: "#2ea3f2",
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        display: ['"Outfit"', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' },
        },
        shine: {
          '0%, 100%': { backgroundPosition: '200% 0' },
          '50%': { backgroundPosition: '-200% 0' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        marqueeLeft: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        marqueeRight: {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        swirlFadeIn: {
          '0%': {
            opacity: '0',
            transform: 'scale(1.08) rotate(1.5deg)',
            filter: 'blur(6px)',
          },
          '60%': {
            opacity: '0.85',
            transform: 'scale(1.03) rotate(0.4deg)',
            filter: 'blur(1px)',
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1.0) rotate(0deg)',
            filter: 'blur(0px)',
          },
        },
        swirlFadeOut: {
          '0%': {
            opacity: '1',
            transform: 'scale(1.0) rotate(0deg)',
            filter: 'blur(0px)',
          },
          '100%': {
            opacity: '0',
            transform: 'scale(0.96) rotate(-1deg)',
            filter: 'blur(4px)',
          },
        },
        kenBurns: {
          '0%': { transform: 'scale(1.0) translateX(0px)' },
          '100%': { transform: 'scale(1.08) translateX(-12px)' },
        },
      },
      animation: {
        shimmer: 'shimmer 2.5s infinite',
        shine: 'shine 6s ease-in-out infinite',
        fadeInUp: 'fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        float: 'float 4s ease-in-out infinite',
        'marquee-left': 'marqueeLeft 38s linear infinite',
        'marquee-right': 'marqueeRight 34s linear infinite',
        'swirl-in': 'swirlFadeIn 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        'swirl-out': 'swirlFadeOut 0.9s cubic-bezier(0.55, 0, 1, 0.45) forwards',
        'ken-burns': 'kenBurns 5s ease-out forwards',
      },
    },
  },
  plugins: [],
}
