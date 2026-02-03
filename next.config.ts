import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 移除静态导出，支持 API 路由
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
