import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        110: '350px'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-radial-circle': 'radial-gradient(circle, var(--tw-gradient-stops))',
        'gradient-radial-ellipse': 'radial-gradient(ellipse, var(--tw-gradient-stops))',
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      addCommonColors: true,
      themes: {
        light: {
          colors: {
            background: "#a1a1aa",
            primary: {
              400: '#137AD9',
              500: '#004493',
            },
            content1: {
              "900": 'rgba(255,255,255,0.7)'
            }
          },
        }, // light theme colors
        dark: {
        },
      },
    }),
  ],
};
export default config;
