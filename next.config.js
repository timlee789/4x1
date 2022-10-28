/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = {
  images: {
    domains: ['bijouxhair.com', 'res.cloudinary.com'],
    // webpack5: true,
    // webpack: (config) => {
    //   config.resolve.fallback = { fs: false };

    //   return config;
    // },
  },
};
