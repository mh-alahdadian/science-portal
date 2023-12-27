const isDev = process.env.NODE_ENV !== 'production';
const serverAddress = 'http://192.168.59.20';

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    if (!isDev) return [];
    return [
      {
        source: '/api/:path*',
        destination: `${serverAddress}/api/:path*`, // Proxy to Backend
      },
    ];
  },
};

module.exports = nextConfig;
