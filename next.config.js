/** @type {import('next').NextConfig} */
import createMDX from '@next/mdx';
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['cheerio'],
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: [
      'i.ibb.co',
      'd2devwt40at1e2.cloudfront.net',
      'miro.medium.com',
      'fakestoreapi.com',
      'lh3.googleusercontent.com',
    ],
  },
};
const withMDX = createMDX({});

export default withMDX(nextConfig);
