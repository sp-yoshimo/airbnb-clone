/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images:{
    domains:[
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
      "flagsapi.com",
      "res.cloudinary.com"
    ]
  }
}

module.exports = nextConfig
