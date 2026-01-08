/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'images.pexels.com' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'img.youtube.com' }
    ]
  },
  experimental: {
    // serverActions should be an object in newer Next versions
    serverActions: {},
  },
};

module.exports = nextConfig;