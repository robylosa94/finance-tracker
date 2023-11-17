/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  reactStrictMode: false,
  experimental: {
    scrollRestoration: true,
  },
}

module.exports = nextConfig
