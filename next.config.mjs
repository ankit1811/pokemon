/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname: '/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/**',
      }
    ]
  }
};

export default nextConfig;
