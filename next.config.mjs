/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/chart/:path*',
        destination: 'http://illuminals.io:44007/:path*',
      },
      {
        source: '/api/:path*',
        destination: 'http://illuminals.io:5001/:path*',
      }
    ];
  },
  images:{
    domains:["res.cloudinary.com"]
  }

};

export default nextConfig;
