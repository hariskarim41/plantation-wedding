import React, { useState } from 'react';
import { ChevronRight, X } from 'lucide-react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

// Gallery categories based on the Plantation House website
const categories = [
  {
    id: 'grand-staircase',
    name: 'Grand Staircase',
    description: 'Our iconic grand staircase offers a majestic setting for memorable wedding moments and stunning photo opportunities.',
    images: [
      {
        src: 'https://res.cloudinary.com/dyokodjrm/image/upload/v1746415951/i-hRcx5kq-X3_vtrhqb.jpg',
        alt: 'Grand Staircase',
        caption: 'The magnificent grand staircase provides an elegant backdrop for wedding ceremonies and photographs'
      }

    ]
  },
  {
    id: 'lower-lawn',
    name: 'Lower Lawn',
    description: 'A more intimate oceanfront setting ideal for ceremonies up to 100 guests.',
    images: [
      {
        src: 'https://plantationhouseevents.com/app/default/assets/galleries/dc88dae3dd15cf98e85b01702459d125.jpg',
        alt: 'Wedding Ceremony on Golf Course',
        caption: 'Beautiful ceremony setup on the Lower Lawn'
      },
      {
        src: 'https://plantationhouseevents.com/app/default/assets/galleries/be756f28b265e3cec4d55653e2d7eff7.jpg',
        alt: 'Cocktail Reception on Golf Course',
        caption: 'Guests enjoying cocktails with panoramic views'
      },
      {
        src: 'https://plantationhouseevents.com/app/default/assets/galleries/0bfa0c7b85c8afe3dfa1c2c12dd59fc2.jpg',
        alt: 'Wedding Ceremony on Golf Course',
        caption: 'Stunning ocean backdrop for your ceremony'
      },
      {
        src: 'https://plantationhouseevents.com/app/default/assets/galleries/dbac0097bbe3d709b9c5243f8ca1919d.jpg',
        alt: 'Bride & Groom on Golf Course',
        caption: 'Romantic moments captured on the manicured grounds'
      }
    ]
  },
  {
    id: 'molokai-lawn',
    name: 'Molokai Lawn',
    description: 'Our signature outdoor space offering panoramic ocean views and breathtaking Maui sunsets.',
    images: [
      {
        src: 'https://plantationhouseevents.com/app/default/assets/galleries/ad185545679d2dff5cbf9c2b0449937b.jpg',
        alt: 'Wedding Reception on Golf Course Lawn',
        caption: 'Expansive reception space on the Molokai Lawn'
      },
      {
        src: 'https://plantationhouseevents.com/app/default/assets/galleries/b064ca6a91a0492024f654513ed1f9aa.jpg',
        alt: 'Bride on Golf Course',
        caption: 'Beautiful bridal portraits with ocean views'
      },
      {
        src: 'https://plantationhouseevents.com/app/default/assets/galleries/cfcfbae89903dfdc8e7217de10c6bf8a.jpg',
        alt: 'Bride & Groom on Golf Course',
        caption: 'Couple enjoying the sunset on their special day'
      },
      {
        src: 'https://plantationhouseevents.com/app/default/assets/galleries/2b943ddd65ea887f41782502ec077204.jpg',
        alt: 'Wedding Ceremony on Golf Course',
        caption: 'Picture-perfect ceremony setting with Maui\'s natural beauty'
      }
    ]
  },
  {
    id: 'food-beverage',
    name: 'Food & Beverage',
    description: 'Exquisite culinary creations and craft cocktails to elevate your celebration.',
    images: [
      {
        src: 'https://plantationhouseevents.com/app/default/assets/galleries/bc2d47a7a203aa188bf910bd5452e726.jpg',
        alt: 'Pineapple Shell Cocktails',
        caption: 'Signature pineapple cocktails with island flair'
      },
      {
        src: 'https://plantationhouseevents.com/app/default/assets/galleries/0695a6987c2a8356569de8f95f3a80d4.jpg',
        alt: 'Tray Passed Hors d\'oeuvres',
        caption: 'Elegant passed appetizers for your cocktail hour'
      },
      {
        src: 'https://plantationhouseevents.com/app/default/assets/galleries/1b972638a4877d372bac0bb50a0146b2.jpg',
        alt: 'Steak & Seafood Entree',
        caption: 'Gourmet steak and seafood entrée prepared by our executive chef'
      },
      {
        src: 'https://plantationhouseevents.com/app/default/assets/galleries/744b9eeae2fefc07964fde51bbb9a1b7.png',
        alt: 'Ahi Tuna Entree',
        caption: 'Fresh island-inspired ahi tuna presentation'
      }
    ]
  }
];

// PhotoModal Component for enlarged images
const PhotoModal = ({ 
  image, 
  onClose, 
  onNext, 
  onPrevious 
}: { 
  image: {src: string, alt: string, caption?: string}, 
  onClose: () => void,
  onNext: () => void,
  onPrevious: () => void
}) => {
  // Close modal when clicking outside the image
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  
  return (
    <div 
      className="fixed inset-0 bg-dark-600/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="relative max-w-6xl w-full mx-auto bg-white rounded-lg overflow-hidden shadow-xl">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-50 bg-olive-100 hover:bg-olive-200 rounded-full p-2 transition-colors duration-300"
        >
          <X className="h-6 w-6 text-olive-700" />
        </button>
        
        <div className="relative">
          <img 
            src={image.src} 
            alt={image.alt} 
            className="w-full max-h-[80vh] object-contain"
          />
          
          <button 
            onClick={onPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white/90 rounded-full p-3 transition-all duration-300 shadow-md"
          >
            <ChevronRight className="h-6 w-6 text-olive-700 transform rotate-180" />
          </button>
          
          <button 
            onClick={onNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white/90 rounded-full p-3 transition-all duration-300 shadow-md"
          >
            <ChevronRight className="h-6 w-6 text-olive-700" />
          </button>
        </div>
        
        {image.caption && (
          <div className="p-4 text-center">
            <p className="text-dark-600 italic">{image.caption}</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Gallery Page Component
const GalleryPage = () => {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [selectedImage, setSelectedImage] = useState<null | {
    src: string, 
    alt: string, 
    caption?: string,
    index: number
  }>(null);
  
  const handleImageClick = (image: {src: string, alt: string, caption?: string}, index: number) => {
    setSelectedImage({...image, index});
  };
  
  const handleNextImage = () => {
    if (selectedImage === null) return;
    
    const nextIndex = (selectedImage.index + 1) % activeCategory.images.length;
    setSelectedImage({
      ...activeCategory.images[nextIndex],
      index: nextIndex
    });
  };
  
  const handlePreviousImage = () => {
    if (selectedImage === null) return;
    
    const prevIndex = (selectedImage.index - 1 + activeCategory.images.length) % activeCategory.images.length;
    setSelectedImage({
      ...activeCategory.images[prevIndex],
      index: prevIndex
    });
  };
  
  return (
    <>
      <Navigation />
      {/* Hero Banner */}
      <div className="relative h-[40vh] min-h-[300px] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/60 to-cream-50/70 z-10"></div>
          <img
            src="https://plantationhouseevents.com/app/default/assets/galleries/02d4494280e8a2e59448ea616a490aa1.jpg"
            alt="Gallery Banner"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-olive-800 leading-tight mb-4">
            Photo Gallery
          </h1>
          <p className="text-xl text-dark-600 max-w-3xl mx-auto px-4 font-light">
            Explore the beauty of The Plantation House through our stunning collection of venue photos
          </p>
        </div>
      </div>
      
      <section className="py-16 bg-gradient-to-b from-cream-50 to-white relative">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="h-full w-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%235F653C' fill-opacity='0.15'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10zm10 8c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm40 40c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-dark-600 text-lg">
              Discover our versatile venues and the magical moments we've helped create. From our signature outdoor settings with breathtaking ocean views to elegant indoor spaces, find inspiration for your perfect Maui wedding.
            </p>
          </div>
          
          {/* Category Navigation */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full transition-all duration-300 ${
                  activeCategory.id === category.id 
                    ? 'bg-olive-600 text-white shadow-md' 
                    : 'bg-white border border-olive-200 text-olive-700 hover:bg-cream-50'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
          
          {/* Active Category Description */}
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-2xl md:text-3xl text-olive-800 mb-4 font-light">{activeCategory.name}</h2>
            <p className="text-dark-600">{activeCategory.description}</p>
          </div>
          
          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {activeCategory.images.map((image, index) => (
              <div 
                key={index}
                className="group relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 cursor-pointer transform hover:scale-[1.02] border border-olive-100"
                onClick={() => handleImageClick(image, index)}
              >
                <div className="aspect-w-4 aspect-h-3">
                  <img 
                    src={image.src} 
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="text-olive-800 font-medium">{image.alt}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Photo Modal */}
          {selectedImage && (
            <PhotoModal 
              image={selectedImage} 
              onClose={() => setSelectedImage(null)}
              onNext={handleNextImage}
              onPrevious={handlePreviousImage}
            />
          )}
        </div>
      </section>
      
      <Footer />
    </>
  );
};

export default GalleryPage; 