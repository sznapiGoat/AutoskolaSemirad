/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
  },
  async redirects() {
    return [
      // Old-site URLs printed on QR-code stickers. The old pricing page gets
      // its exact match first; anything else under the old prefix falls back
      // to the homepage.
      {
        source:
          "/autoskola-liberec-odbornost-praxe-vzdelani-vozidlo/autoskola-liberec-cenik-sluzeb-kurzy-dle-potreby",
        destination: "/cenik",
        permanent: true,
      },
      {
        source: "/autoskola-liberec-odbornost-praxe-vzdelani-vozidlo/:path*",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
