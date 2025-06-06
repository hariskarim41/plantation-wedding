const fs = require('fs');
const path = require('path');

// Your website URL - replace with your actual domain
const WEBSITE_URL = 'https://yourdomain.com';

// Define your routes and their priorities
const routes = [
  {
    url: '/',
    priority: '1.0',
    changefreq: 'monthly'
  },
  {
    url: '/gallery/',
    priority: '0.8',
    changefreq: 'monthly'
  },
  {
    url: '/thank-you/',
    priority: '0.3',
    changefreq: 'yearly'
  }
];

// Generate sitemap XML
const generateSitemap = () => {
  const currentDate = new Date().toISOString().split('T')[0];
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  routes.forEach(route => {
    sitemap += `
  <url>
    <loc>${WEBSITE_URL}${route.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
  });

  sitemap += `
</urlset>`;

  // Write sitemap to public directory
  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
  console.log('✅ Sitemap generated successfully at public/sitemap.xml');
};

generateSitemap(); 