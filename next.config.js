
/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        remotePatterns: [
         {
             protocol: process.env.NODE_ENV === 'production' ? 'https' : 'http',
             hostname: process.env.NODE_ENV === 'production' ? 'strapi.fruitspickingjobs.com' : '127.0.0.1',
             pathname: '/uploads/**',
        },
        ],
    },
    }
    
    module.exports = nextConfig