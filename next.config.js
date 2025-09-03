// next.config.js
const withPWA = require('next-pwa')({
  dest: 'public',
  // By default, disable in dev. Set PWA_DEV=1 to test PWA locally.
  disable: process.env.NODE_ENV === "development", // ✅ disable in dev
  register: true,
  skipWaiting: true,
});

const nextConfig = {
  // App Router is enabled by default in Next 13+, nothing special needed here.
  // You can add any other Next config as required.
};

module.exports = withPWA(nextConfig);