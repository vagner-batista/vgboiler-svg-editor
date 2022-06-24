/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'i.pravatar.cc',
      'github.com',
      'avatars.githubusercontent.com',
      'localhost',
    ],
    formats: ['image/avif'],
  },
};

module.exports = nextConfig;
