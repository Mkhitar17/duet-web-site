/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['i.imgur.com'], // Add this line to whitelist Imgur
  },
};

module.exports = nextConfig;