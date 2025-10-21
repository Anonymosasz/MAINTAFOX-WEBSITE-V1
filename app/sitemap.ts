import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://www.maintafox.systems';
  return [
    { url: `${base}/`, lastModified: new Date() },
    { url: `${base}/features`, lastModified: new Date() },
    { url: `${base}/about`, lastModified: new Date() },
    { url: `${base}/demo`, lastModified: new Date() },
    { url: `${base}/blog`, lastModified: new Date() },
    { url: `${base}/privacy`, lastModified: new Date() },
    { url: `${base}/terms`, lastModified: new Date() },
    { url: `${base}/contact`, lastModified: new Date() },
  ];
}
