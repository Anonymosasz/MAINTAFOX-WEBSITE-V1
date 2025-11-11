/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async redirects() {
    return [
      // Redirect old hash URLs to dedicated pages
      {
        source: '/:path*#pricing',
        destination: '/pricing',
        permanent: true,
      },
      {
        source: '/:path*#benefits',
        destination: '/#benefits',
        permanent: false,
      },
      {
        source: '/:path*#how-it-works',
        destination: '/#how-it-works',
        permanent: false,
      },
    ];
  },
  experimental: {
    // App Router by default in Next 14+
  },
};

module.exports = nextConfig;
