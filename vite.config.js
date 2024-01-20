import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    VITE_EMAIL_SERVICE_ID: `"${process.env.VITE_EMAIL_SERVICE_ID}"`,
    VITE_EMAIL_TEMPLATE_ID: `"${process.env.VITE_EMAIL_TEMPLATE_ID}"`,
    VITE_EMAIL_USER_ID: `"${process.env.VITE_EMAIL_USER_ID}"`,
  },
});
