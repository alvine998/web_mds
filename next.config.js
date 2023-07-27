/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_FIREBASE_API_KEY: "AIzaSyC63nknD-LixsoIH7B4P8X2fhxYbuSf4Rk",
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: "sales-midland.firebaseapp.com",
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: "sales-midland",
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: "sales-midland.appspot.com",
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: "419261432902",
    NEXT_PUBLIC_FIREBASE_APP_ID: "1:419261432902:web:92705679e8e9b6b468b647",
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: "G-N6NCP7T8RM",
    URL_API: "http://localhost:8080"
  }
}

module.exports = nextConfig
