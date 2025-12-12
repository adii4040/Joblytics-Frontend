export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0a",
        foreground: "#fafafa",
        card: "#1a1a1a",
        "card-foreground": "#fafafa",
        primary: "#3b82f6",
        "primary-foreground": "#ffffff",
        secondary: "#64748b",
        "secondary-foreground": "#ffffff",
        accent: "#8b5cf6",
        muted: "#404040",
        "muted-foreground": "#a1a1a1",
        destructive: "#ef4444",
        border: "#262626",
      },
      spacing: {
        safe: "max(1rem, env(safe-area-inset-bottom))",
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  darkMode: "class",
  plugins: [],
}
