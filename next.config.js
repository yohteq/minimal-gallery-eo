/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
    domains: ['moa.ie', 'pixabay.com', 'cdn.pixabay.com'],
  },
}

module.exports = nextConfig 
