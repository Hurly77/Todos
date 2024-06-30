import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extent: {},
  },
  darkMode: "class",
  plugins: [
    nextui({
      defaultTheme: "light",
      defaultExtendTheme: "light",
      layout: {
        radius: {
          small: "0.125rem",
          medium: "0.25rem",
          large: "0.375rem",
        },
      },
      themes: {
        light: {
          layout: {},
          colors: {},
        },
        dark: {
          layout: {},
          colors: {},
        },
      },
    }),
  ],
};
export default config;
