import { withPayload } from '@payloadcms/next/withPayload';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  outputFileTracingIncludes: {
    '*': [
      './node_modules/@libsql/darwin-*/**/*',
      './node_modules/@libsql/linux-*/**/*',
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
