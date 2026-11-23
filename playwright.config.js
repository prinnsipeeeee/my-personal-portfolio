import { defineConfig, devices } from '@playwright/test'

const { defaultBrowserType: _tabletBrowser, ...ipadMini } = devices['iPad Mini']
const { defaultBrowserType: _mobileBrowser, ...pixel7 } = devices['Pixel 7']

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 1,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'http://localhost:4173',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'Desktop Chrome',
      use: {
        browserName: 'chromium',
        viewport: { width: 1280, height: 800 },
      },
    },
    {
      name: 'Tablet',
      use: {
        ...ipadMini,
        browserName: 'chromium',
      },
    },
    {
      name: 'Mobile',
      use: {
        ...pixel7,
        browserName: 'chromium',
      },
    },
  ],
  webServer: {
    command: 'npm run build && npm run preview -- --port 4173 --strictPort',
    url: 'http://localhost:4173',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
})
