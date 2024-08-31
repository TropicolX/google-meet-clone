import { hostname } from 'os';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'cdn.tailgrids.com',
      },
      {
        hostname: 'gstatic.com',
      },
    ],
  },
};

export default nextConfig;
