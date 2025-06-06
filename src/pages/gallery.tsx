import React from 'react';
import Head from 'next/head';
import GalleryPage from '../GalleryPage';

export default function Gallery() {
  return (
    <>
      <Head>
        <title>Gallery - The Plantation House Maui Wedding Venue</title>
        <meta name="description" content="Explore our beautiful wedding venues and see real celebrations at The Plantation House Maui." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <GalleryPage />
    </>
  );
} 