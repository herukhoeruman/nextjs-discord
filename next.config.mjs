/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // https://utfs.io/f/4f8f955f-10ca-492c-8786-22b9243d031e-1b290.jpg
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
