import { hostname } from 'os';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'cdn.tailgrids.com',
      },
    ],
  },
};

export default nextConfig;
