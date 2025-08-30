// next.config.js
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
});

const nextConfig = {
  // App Router is enabled by default in Next 13+, nothing special needed here.
  // You can add any other Next config as required.
};

module.exports = withPWA(nextConfig);