import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	experimental: {
		optimizePackageImports: ['lucide-react', 'three'],
	},
};

export default nextConfig;
