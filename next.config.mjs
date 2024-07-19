/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'api.universalprofile.cloud',
                port: '',
                pathname: '/ipfs/**',
            },
        ],
    },
};

export default nextConfig;
