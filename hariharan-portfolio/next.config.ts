import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Pin the workspace root to this project (a stray lockfile elsewhere was confusing Turbopack).
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
