/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["i.ibb.co"],
  },
};

module.exports = nextConfig;
