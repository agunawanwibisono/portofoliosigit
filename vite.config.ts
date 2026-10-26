import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// Mode `single` menghasilkan satu index.html mandiri (untuk halaman web yang dipublikasikan).
// Build biasa (`npm run build`) tetap memakai output Vite standar untuk Vercel.
export default defineConfig(({ mode }) => ({
  plugins: [react(), ...(mode === 'single' ? [viteSingleFile()] : [])],
}))
