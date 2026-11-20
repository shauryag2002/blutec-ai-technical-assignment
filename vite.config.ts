import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ["8d55-2401-4900-8840-899d-17de-481b-e76d-2db9.ngrok-free.app"]
  }
})
