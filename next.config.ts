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
    eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
