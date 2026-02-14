// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // WICHTIG: Erlaubt den Export für GitHub Pages
  images: {
    unoptimized: true, // Notwendig für statische Exporte
  },
  basePath: '/schoollog', // Ersetze 'schoollog' durch deinen exakten Repo-Namen!
};

export default nextConfig;
