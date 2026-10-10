/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    qualities: [75, 80, 95, 100],
    localPatterns: [{ pathname: '/assets/**' }, { pathname: '/me.jpg' }, { pathname: '/jeyadev-r.jpg' }],
  },
};

export default nextConfig;

import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev());
