const isDev = process.env.NODE_ENV !== 'production';
const serverAddress = 'http://192.168.59.20';

/** @type {import('next').NextConfig} */
const nextConfig = {
  /** @param {import('webpack').Configuration} config */
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: [/\.[jt]sx?$/, /^$/],
      use: [
        {
          loader: '@svgr/webpack',
          /** @type {import('@svgr/core').Config} */
          options: {
            svgoConfig: {
              multipass: true,
              plugins: [
                {
                  name: 'preset-default',
                  params: { overrides: { removeViewBox: false } },
                },
                'prefixIds',
              ],
            },
          },
        },
      ],
    });

    return config;
  },
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
