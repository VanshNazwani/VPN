/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    unoptimized: true,
    domains: ['images.pexels.com', 'res.cloudinary.com', 'img.youtube.com']
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;