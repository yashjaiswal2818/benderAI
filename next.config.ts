import type { NextConfig } from "next"
import path from "node:path"

const nextConfig: NextConfig = {
  // A parent-directory lockfile makes Next guess the wrong workspace root;
  // pin it to this project so fonts and assets resolve correctly.
  turbopack: {
    root: path.resolve(__dirname),
  },
}

export default nextConfig
