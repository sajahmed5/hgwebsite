import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    // Wellbeing & Training were merged into the "What We Do" page.
    return [
      { source: "/wellbeing", destination: "/services#wellbeing", permanent: true },
      { source: "/training", destination: "/services#training", permanent: true },
      { source: "/about", destination: "/#about", permanent: true },
    ];
  },
};

export default nextConfig;
