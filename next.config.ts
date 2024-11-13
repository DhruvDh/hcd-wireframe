/** @type {import('next').NextConfig} */
const nextConfig = {
  // Only apply these settings in production build
  ...(process.env.NODE_ENV === "production"
    ? {
        output: "export",
        basePath: "/hcd-wireframe",
        assetPrefix: "/hcd-wireframe",
      }
    : {}),
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
