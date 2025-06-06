import React from 'react';
import SEOHead from '../components/SEOHead';
import GalleryPage from '../GalleryPage';

export default function Gallery() {
  return (
    <>
      <SEOHead
        title="Gallery - The Plantation House Maui Wedding Venue"
        description="Explore our beautiful wedding venues and see real celebrations at The Plantation House Maui. View our stunning ceremony and reception spaces."
        canonicalUrl="https://yourdomain.com/gallery/"
        additionalMeta={[
          { name: "keywords", content: "maui wedding photos, plantation house gallery, wedding venue photos, hawaii wedding venues, kapalua wedding" },
          { name: "robots", content: "index, follow" }
        ]}
      />
      
      <GalleryPage />
    </>
  );
} 