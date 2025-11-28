/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  reactStrictMode: true,
  basePath: "/Myportfolio2", 
  assetPrefix: "/Myportfolio2/",
};

export default nextConfig;
