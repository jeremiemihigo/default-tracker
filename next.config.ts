import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  //output: "export",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pulse.bboxx.com",
        pathname: "/v2/assets/animations/**",
      },
    ],
  },
};

export default nextConfig;
