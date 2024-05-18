/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['advertconnectpro.s3.us-east-1.amazonaws.com'],
  },
}

module.exports = nextConfig

module.exports = {
    typescript: {
      ignoreBuildErrors: true,
    },compiler: {
      styledComponents: true,
    },language: 'typescript',
    eagerEsModules: false,
  }

  module.exports = {
    webpack: (config) => {
      config.module.rules.push({
        test: /\.html$/,
        use: 'html-loader',
      });
  
      return config;
    },
  }; 

  
  