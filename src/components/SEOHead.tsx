import Head from 'next/head';

interface SEOHeadProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: string;
  additionalMeta?: Array<{
    name?: string;
    property?: string;
    content: string;
  }>;
  structuredData?: object;
}

const SEOHead = ({ 
  title, 
  description, 
  canonicalUrl,
  ogImage = "https://www.theplantationhouse.com/wp-content/uploads/2023/05/Photo-6-1.jpg",
  ogType = "website",
  additionalMeta = [],
  structuredData
}: SEOHeadProps) => {
  const fullTitle = title.includes('The Plantation House') ? title : `${title} | The Plantation House - Maui Wedding Venue`;
  
  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
      
      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      
      {/* Open Graph Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content="The Plantation House - Maui Wedding Venue" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:site_name" content="The Plantation House" />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content="The Plantation House - Maui Wedding Venue" />
      
      {/* Additional Meta Tags */}
      {additionalMeta.map((meta, index) => (
        <meta
          key={index}
          {...(meta.name ? { name: meta.name } : { property: meta.property })}
          content={meta.content}
        />
      ))}
      
      {/* Structured Data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      )}
    </Head>
  );
};

export default SEOHead; 