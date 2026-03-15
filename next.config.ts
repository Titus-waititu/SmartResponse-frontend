import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Expose env vars to the browser (NEXT_PUBLIC_* is automatic, but listed
  // here as documentation of the expected shape).
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL!,
    NEXT_PUBLIC_WS_URL: process.env.NEXT_PUBLIC_WS_URL!,
    NEXT_PUBLIC_APP_ENV: process.env.NEXT_PUBLIC_APP_ENV!,
  },

  // Proxy API calls through Next.js in development to avoid CORS issues.
  // Remove / adjust if the NestJS server already handles CORS.
  async rewrites() {
    if (process.env.NODE_ENV !== "development") return [];
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`,
      },
    ];
  },

  // Strict mode catches hydration issues early.
  reactStrictMode: true,
};

export default nextConfig;
