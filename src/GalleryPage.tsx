import React, { useState } from 'react';
import { ChevronRight, X } from 'lucide-react';

// Gallery categories based on the Plantation House website
const categories = [
  {
    id: 'dining-room-lanai',
    name: 'Dining Room Lanai',
    description: 'Elegant open-air dining space with ocean views, perfect for intimate receptions.',
    images: [
      {
        src: 'https://plantationhouseevents.com/app/default/assets/galleries/27840f5db2fe7967ad02aa79b59030de.jpg?v=1674001987',
        alt: 'Wedding Reception Dinner',
        caption: 'Elegant wedding reception setup on the Dining Room Lanai'
      },
      {
        src: 'https://plantationhouseevents.com/app/default/assets/galleries/a6983472813a3a8636a48fc12bbd28a2.jpg?v=1674001987',
        alt: 'Main Dining Room Terrace',
        caption: 'Stunning views from the Main Dining Room Terrace'
      },
      {
        src: 'https://plantationhouseevents.com/app/default/assets/galleries/302e4aea5a933b94db6ad5a5dbbb4ab2.jpg?v=1674001987',
        alt: 'Event Table Setting',
        caption: 'Beautiful table arrangements with ocean backdrop'
      },
      {
        src: 'https://plantationhouseevents.com/app/default/assets/galleries/2a46e8d1bfed2f193be66eb7b4539565.jpg?v=1674001987',
        alt: 'Main Dining Room',
        caption: 'Spacious Main Dining Room ready for events'
      }
    ]
  },
  {
    id: 'upper-dining-level',
    name: 'Upper Dining Level',
    description: 'Elevated dining area with panoramic views, ideal for elegant receptions.',
    images: [
      {
        src: 'https://plantationhouseevents.com/app/default/assets/galleries/44524d399ad243bf7dfb4e271494f607.jpg?',
        alt: 'Wedding Reception',
        caption: 'Sophisticated reception setup in the Upper Dining Level'
      },
      {
        src: 'https://plantationhouseevents.com/app/default/assets/galleries/9d3e38670159ce49c59c47780c7e754a.jpg',
        alt: 'Wedding Cake Cutting',
        caption: 'Special moments during the cake cutting ceremony'
      },
      {
        src: 'https://plantationhouseevents.com/app/default/assets/galleries/8b27af179a4a2755a62d59f90cf4f987.jpg',
        alt: 'Bride & Groom',
        caption: 'Newlyweds enjoying their special day'
      },
      {
        src: 'https://plantationhouseevents.com/app/default/assets/galleries/fcf38137afde8c6308eb15842f7e94e4.jpg',
        alt: 'Dance Floor',
        caption: 'First dance in the elegantly lit reception area'
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
    id: 'main-dining-room',
    name: 'Main Dining Room',
    description: 'Our premier indoor reception space with wall-to-wall windows showcasing dramatic ocean views.',
    images: [
      {
        src: 'https://plantationhouseevents.com/app/default/assets/galleries/5990b179e70d3e359766f632053382fd.jpg',
        alt: 'Sunset Views from Main Dining Room',
        caption: 'Breathtaking sunset views from the Main Dining Room'
      },
      {
        src: 'https://plantationhouseevents.com/app/default/assets/galleries/c141130d4a1dee14968d962dff0426d8.jpg',
        alt: 'Event in Main Dining Room',
        caption: 'Elegant reception setup with ocean backdrop'
      },
      {
        src: 'https://plantationhouseevents.com/app/default/assets/galleries/7d2ec78d222cc48eb0b53b97b7d810e6.jpg',
        alt: 'Bride & Groom Dance',
        caption: 'Romantic first dance in our beautiful Main Dining Room'
      },
      {
        src: 'https://plantationhouseevents.com/app/default/assets/galleries/a4dd274036a2e138b53c824012bac2ac.jpg',
        alt: 'Wedding Reception Dinner',
        caption: 'Sophisticated dinner arrangement for special celebrations'
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
      className="fixed inset-0 bg-dark-800/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="relative max-w-6xl w-full mx-auto bg-dark-700/90 rounded-lg overflow-hidden shadow-2xl">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-50 bg-dark-800/70 hover:bg-dark-800 rounded-full p-2 transition-colors duration-300"
        >
          <X className="h-6 w-6 text-white" />
        </button>
        
        <div className="relative">
          <img 
            src={image.src} 
            alt={image.alt} 
            className="w-full max-h-[80vh] object-contain"
          />
          
          <button 
            onClick={onPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-dark-800/50 hover:bg-dark-800/70 rounded-full p-3 transition-all duration-300"
          >
            <ChevronRight className="h-6 w-6 text-white transform rotate-180" />
          </button>
          
          <button 
            onClick={onNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-dark-800/50 hover:bg-dark-800/70 rounded-full p-3 transition-all duration-300"
          >
            <ChevronRight className="h-6 w-6 text-white" />
          </button>
        </div>
        
        {image.caption && (
          <div className="p-4 text-center">
            <p className="text-white/90 italic">{image.caption}</p>
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
      {/* Hero Banner */}
      <div className="relative h-[40vh] min-h-[300px] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-dark-800/80 via-dark-800/60 to-dark-800/70 z-10"></div>
          <img
            src="https://plantationhouseevents.com/app/default/assets/galleries/02d4494280e8a2e59448ea616a490aa1.jpg"
            alt="Gallery Banner"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight mb-4">
            Photo Gallery
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto px-4">
            Explore the beauty of The Plantation House through our stunning collection of venue photos
          </p>
        </div>
      </div>
      
      <section className="py-16 bg-gradient-to-b from-dark-800 via-dark-700 to-dark-800 relative">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="h-full w-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.15'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10zm10 8c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm40 40c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-white/80 text-lg">
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
                    : 'bg-dark-600/50 text-white/80 hover:bg-dark-600 hover:text-white'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
          
          {/* Active Category Description */}
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-serif text-white mb-4">{activeCategory.name}</h2>
            <p className="text-white/80">{activeCategory.description}</p>
          </div>
          
          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {activeCategory.images.map((image, index) => (
              <div 
                key={index}
                className="group relative bg-dark-600/40 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 cursor-pointer transform hover:scale-[1.02]"
                onClick={() => handleImageClick(image, index)}
              >
                <div className="aspect-w-4 aspect-h-3">
                  <img 
                    src={image.src} 
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-800/80 via-dark-800/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="text-white font-medium">{image.alt}</p>
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
    </>
  );
};

export default GalleryPage; 