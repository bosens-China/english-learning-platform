/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
  output: 'export',
  basePath: process.env.GITHUB_ACTOR ? '/english-learning-platform/' : undefined,
};

console.log(process.env);

export default nextConfig;
