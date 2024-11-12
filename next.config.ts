/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/hcd-wireframe", // your repo name
  images: {
    unoptimized: true,
  },
  assetPrefix: "/hcd-wireframe/", // add trailing slash
};

module.exports = nextConfig;
