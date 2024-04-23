/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/chart/:path*',
        destination: 'http://illuminals.io:45773/:path*',
      },
      {
        source: '/api/:path*',
        destination: 'http://illuminals.io:5001/:path*',
      }
    ];
  },
};

export default nextConfig;
