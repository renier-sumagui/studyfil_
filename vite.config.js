import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: "/src",
      features: "/src/features",
      hooks: "/src/hooks",
      pages: "/src/pages",
      layouts: "/src/layouts",
      stylesheets: "/src/assets/stylesheets",
      constants: "/src/constants",
      routes: "/src/routes",
      context: "/src/context"
    }
  }
})
