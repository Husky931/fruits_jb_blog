
/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        remotePatterns: [
         {
             protocol: process.env.NODE_ENV === 'production' ? 'https' : 'http',
             hostname: process.env.NODE_ENV === 'production' ? 'strapi.fruitspickingjobs.com' : 'localhost',
             pathname: '/uploads/**',
        },
        ],
    },
    }
    
    module.exports = nextConfig