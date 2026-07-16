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
    ];
  },
};

export default nextConfig;
