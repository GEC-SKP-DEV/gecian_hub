// next.config.js
const isDev = process.env.NODE_ENV === 'development';
const withPWA = require('next-pwa')({
  dest: 'public',
  // By default, disable in dev. Set PWA_DEV=1 to test PWA locally.
  disable: isDev && !process.env.PWA_DEV,
  register: true,
  skipWaiting: true,
});

const nextConfig = {
  // App Router is enabled by default in Next 13+, nothing special needed here.
  // You can add any other Next config as required.
};

module.exports = withPWA(nextConfig);