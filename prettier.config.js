/** @type {import("prettier").Config} */
export default {
  plugins: ["prettier-plugin-tailwindcss"],
  tailwindFunctions: ["classNames", "cva"],
  tailwindStylesheet: "./src/styles/main.css",
};
