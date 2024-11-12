/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/hcd-wireframe",
  images: {
    unoptimized: true,
  },
  assetPrefix: "/hcd-wireframe",
};

module.exports = nextConfig;
