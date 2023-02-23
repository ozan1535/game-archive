/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["media.rawg.io", "localhost:3000"],
  },
};

module.exports = nextConfig;
