import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { siteConfig } from './src/config.js'

const htmlMetadataPlugin = () => ({
  name: 'html-metadata',
  transformIndexHtml: {
    order: 'pre',
    handler(html) {
      return html
        .replaceAll('%SITE_TITLE%', siteConfig.siteTitle)
        .replaceAll('%SITE_DESCRIPTION%', siteConfig.siteDescription)
        .replaceAll('%SITE_FAVICON%', siteConfig.favicon)
        .replaceAll('%SITE_OG_IMAGE%', siteConfig.ogImage)
    },
  },
})

export default defineConfig({
  plugins: [react(), htmlMetadataPlugin()],
  server: {
    port: 5173,
    strictPort: true,
  },
})
