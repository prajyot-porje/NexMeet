import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = {
  devIndicators: {
    buildActivity: false, // Disable the build activity indicator
    appDir: false, // Disable the app directory indicator
  },
};

export default nextConfig;
