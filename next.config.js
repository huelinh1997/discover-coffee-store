/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ["images.unsplash.com"],
  },
  // env: {
  //   customKey: 'my-value',
  // },
};

module.exports = nextConfig;
