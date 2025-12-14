/** @type {import('next').NextConfig} */

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: '/Myportfolio2',
  assetPrefix: '/Myportfolio2',
  images: {
    unoptimized: true
  }
}

export default nextConfig