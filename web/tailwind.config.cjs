/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  important: "#root",
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter"],
        prompt: ["Prompt"],
        "srb-100": ["srb_100"],
        "srb-200": ["srb_200"],
        "srb-300": ["srb_300"],
        "srb-400": ["srb_400"],
        "srb-500": ["srb_500"],
        "srb-600": ["srb_600"],
        "srb-700": ["srb_700"],
        "srb-800": ["srb_800"],
      },
      backgroundImage: {
        "main-background": "url('/images/blue-sky.png')",
        "about-background": "url('/images/about-background.png')",
        "login-background": "url('/images/login-background.png')",
        "admin-background": "url('/images/admin-background.png')",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
