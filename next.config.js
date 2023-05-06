/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: {
        and: [/\.(ts|tsx|js|jsx|md|mdx)$/],
      },
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

module.exports = nextConfig;
