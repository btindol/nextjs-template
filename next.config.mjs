// // next.config.mjs
// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   output: 'standalone',
//   env: {
//     AZURE_AD_CLIENT_ID: process.env.AZURE_AD_CLIENT_ID,
//     AZURE_AD_CLIENT_SECRET: process.env.AZURE_AD_CLIENT_SECRET,
//     AZURE_AD_TENANT_ID: process.env.AZURE_AD_TENANT_ID,
//     NEXTAUTH_URL: process.env.NEXTAUTH_URL,
//     NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
//   },
// };

// export default nextConfig;


//////////deployed to azure

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  env: {
    AZURE_AD_CLIENT_ID: process.env.AZURE_AD_CLIENT_ID,
    AZURE_AD_CLIENT_SECRET: process.env.AZURE_AD_CLIENT_SECRET,
    AZURE_AD_TENANT_ID: process.env.AZURE_AD_TENANT_ID,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  },
  experimental: {
    outputStandalone: true,
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
