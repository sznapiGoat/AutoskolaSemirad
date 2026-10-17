/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
  },
  async redirects() {
    return [
      // Old-site URLs printed on QR-code stickers all land on the homepage.
      {
        source: "/autoskola-liberec-odbornost-praxe-vzdelani-vozidlo/:path*",
        destination: "/",
        permanent: true,
      },
      // Other old WordPress pages that Google still lists, so their ranking
      // carries over instead of ending in a 404.
      { source: "/semi/autoskola", destination: "/", permanent: true },
      { source: "/semi/:path*", destination: "/sluzby", permanent: true },
      { source: "/poradenstvi", destination: "/sluzby", permanent: true },
      {
        source: "/wp-content/uploads/:year/:month/Lekarsky-posudek.pdf",
        destination: "/dokumenty/lekarsky-posudek.pdf",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
