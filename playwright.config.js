// @ts-check
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30000,
  use: {
    baseURL: 'http://localhost:3000',
    headless: false,
    screenshot: 'only-on-failure',
  },
  webServer: {
    command: 'npx serve . -p 3000 -s',
    port: 3000,
    reuseExistingServer: true,
    timeout: 15000,
  },
});
