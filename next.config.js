const path = require("path");

const isDev = process.env.NODE_ENV !== "production";
const serverAddress = "https://cogcenter.ir";

const svgLoaders = [
  {
    loader: "@svgr/webpack",
    /** @type {import('@svgr/core').Config} */
    options: {
      svgoConfig: {
        multipass: true,
        plugins: [
          {
            name: "preset-default",
            params: { overrides: { removeViewBox: false } },
          },
          "prefixIds",
        ],
      },
    },
  },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  sassOptions: {
    includePaths: [path.join(__dirname, "app")],
  },
  experimental: {
    turbo: {
      rules: {
        "*.svg": {
          as: "*.js",
          loaders: svgLoaders,
        },
      },
    },
  },
  compiler: {
    emotion: true,
  },
  /** @param {import('webpack').Configuration} config */
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: [/\.[jt]sx?$/, /^$/],
      use: svgLoaders,
    });

    return config;
  },
  async rewrites() {
    if (!isDev) return [];
    return [
      {
        source: "/api/:path*",
        destination: `${serverAddress}/api/:path*`, // Proxy to Backend
      },
    ];
  },
};

module.exports = nextConfig;
