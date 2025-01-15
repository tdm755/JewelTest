import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import tsconfigPaths from 'vite-tsconfig-paths'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 7777,
    host: '0.0.0.0',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  }
})
