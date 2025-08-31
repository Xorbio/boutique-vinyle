const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'supabase.co',
        pathname: '/storage/v1/object/public/product/**',
      },
    ],
  },
}
export default nextConfig

