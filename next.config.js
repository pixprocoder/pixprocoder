/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["i.ibb.co", "d2devwt40at1e2.cloudfront.net"],
  },
};

module.exports = nextConfig;
