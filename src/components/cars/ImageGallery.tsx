import { useState } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X, Expand } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ImageGallery({ images = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const defaultImages = [
    'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1200',
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200',
    'https://images.unsplash.com/photo-1542362567-b07e54358753?w=1200'
  ];

  const galleryImages = images.length > 0 ? images : defaultImages;

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <div className="space-y-3">
        {/* Main Image */}
        <div className="relative aspect-[16/10] rounded-3xl overflow-hidden bg-gray-100 group">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentIndex}
              src={galleryImages[currentIndex]}
              alt={`Car image ${currentIndex + 1}`}
              className="w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          </AnimatePresence>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Navigation Arrows */}
          {galleryImages.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 backdrop-blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/20"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 backdrop-blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/20"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </>
          )}

          {/* Expand Button */}
          <button
            onClick={() => setIsOpen(true)}
            className="absolute top-4 right-4 p-3 bg-white/10 backdrop-blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/20"
          >
            <Expand className="w-5 h-5 text-white" />
          </button>

          {/* Image Counter */}
          <div className="absolute bottom-4 right-4 px-4 py-2 bg-black/40 backdrop-blur-xl rounded-full text-white text-sm font-medium">
            {currentIndex + 1} / {galleryImages.length}
          </div>
        </div>

        {/* Thumbnails */}
        {galleryImages.length > 1 && (
          <div className="grid grid-cols-6 gap-2">
            {galleryImages.slice(0, 6).map((img, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`relative aspect-square rounded-xl overflow-hidden transition-all duration-200 ${index === currentIndex
                    ? 'ring-2 ring-emerald-500 ring-offset-2'
                    : 'opacity-60 hover:opacity-100'
                  }`}
              >
                <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                {index === 5 && galleryImages.length > 6 && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white font-medium">
                    +{galleryImages.length - 6}
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-7xl w-full h-[90vh] p-0 bg-black/95 border-0 rounded-3xl overflow-hidden">
          <div className="relative w-full h-full flex items-center justify-center">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                src={galleryImages[currentIndex]}
                alt={`Car image ${currentIndex + 1}`}
                className="max-w-full max-h-full object-contain"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              />
            </AnimatePresence>

            {galleryImages.length > 1 && (
              <>
                <button
                  onClick={goToPrevious}
                  className="absolute left-6 top-1/2 -translate-y-1/2 p-4 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                >
                  <ChevronLeft className="w-8 h-8 text-white" />
                </button>
                <button
                  onClick={goToNext}
                  className="absolute right-6 top-1/2 -translate-y-1/2 p-4 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                >
                  <ChevronRight className="w-8 h-8 text-white" />
                </button>
              </>
            )}

            {/* Thumbnails in fullscreen */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 bg-black/40 backdrop-blur-xl p-3 rounded-2xl">
              {galleryImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-16 h-12 rounded-lg overflow-hidden transition-all ${index === currentIndex ? 'ring-2 ring-white' : 'opacity-50 hover:opacity-100'
                    }`}
                >
                  <img src={img} alt={`Thumb ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
