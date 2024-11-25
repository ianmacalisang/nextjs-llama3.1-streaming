/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api-pilatre.ianmacalisang.com',
      },
    ],
  },
};

export default nextConfig;
