/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'export', // Enable static export for Cloudflare Pages
  trailingSlash: true, // Add trailing slashes for better SEO
  images: {
    unoptimized: true // Required for static export
  },
  // Security headers now handled by public/_headers for Cloudflare Pages
}

module.exports = nextConfig 