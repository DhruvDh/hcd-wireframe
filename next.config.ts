/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // Enable static exports
  basePath: "/hcd-wireframe", // Replace with your repo name
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
