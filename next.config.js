/** @type {import('next').NextConfig} */
const createMDX = require('@next/mdx');

const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: [
      'blog.logrocket.com',
      'i.ibb.co',
      'd2devwt40at1e2.cloudfront.net',
      'miro.medium.com',
      'fakestoreapi.com',
      'lh3.googleusercontent.com',
      'avatars.githubusercontent.com',
      'www.pixprocoder.com',
    ],
  },
};

const withMDX = createMDX();
module.exports = withMDX(nextConfig);
