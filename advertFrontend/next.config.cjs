/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['advertconnectpro.s3.us-east-1.amazonaws.com'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  compiler: {
    styledComponents: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.html$/,
      use: 'html-loader',
    });
    config.module.rules.push({
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader',
        'postcss-loader',
      ],
    });
    return config;
  },
  language: 'typescript',
  eagerEsModules: false,
};

module.exports = nextConfig;







