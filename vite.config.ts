import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import fs from 'fs';
// import path from 'path';

// Load environment variables from .env file
// const keyPath = process.env.VITE_SSL_KEY_PATH;
// const certPath = process.env.VITE_SSL_CERT_PATH;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: './tls/key.pem',
      cert: './tls/cert.pem',
    },
    proxy: {
      '/api': {
        target: 'https://localhost:4000',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
