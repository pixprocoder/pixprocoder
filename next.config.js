/** @type {import('next').NextConfig} */
import createMDX from '@next/mdx';
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: [
      'i.ibb.co',
      'd2devwt40at1e2.cloudfront.net',
      'miro.medium.com',
      'lh3.googleusercontent.com',
    ],
  },
};
const withMDX = createMDX({});

export default withMDX(nextConfig);
