import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Sparkles, Compass, ShieldCheck, Award, Heart, MessageCircle } from "lucide-react";
import { kidsCampImages, KidsCampImage } from "@/data/kidsCampData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const categories = [
  "All",
  "Himalayan & Manali Camp",
  "Archery & Shooting",
  "Camping & Tents",
  "Rappelling & Ropes",
  "Treks & Trails",
  "Games & Activities",
] as const;

export const KidsCampGallery: React.FC<{ limit?: number; showFilter?: boolean }> = ({
  limit,
  showFilter = true,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  const filteredImages = selectedCategory === "All"
    ? kidsCampImages
    : kidsCampImages.filter((img) => img.category === selectedCategory);

  const displayImages = limit ? filteredImages.slice(0, limit) : filteredImages;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeImageIndex !== null) {
      setActiveImageIndex((prev) => (prev === 0 ? filteredImages.length - 1 : (prev ?? 0) - 1));
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeImageIndex !== null) {
      setActiveImageIndex((prev) => (prev === filteredImages.length - 1 ? 0 : (prev ?? 0) + 1));
    }
  };

  const activeImage: KidsCampImage | null =
    activeImageIndex !== null && filteredImages[activeImageIndex]
      ? filteredImages[activeImageIndex]
      : null;

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/30 px-3 py-1 text-sm font-semibold rounded-full mb-3 inline-flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-amber-500" />
          Real Kids Camp Photo Gallery
        </Badge>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
          Junior Explorers Kids Camp Moments
        </h2>
        <p className="mt-3 text-muted-foreground text-base sm:text-lg">
          Real pictures from our 24+ years of conducting safe, screen-free, activity-packed outdoor adventure camps for ages 8-16.
        </p>

        {/* Highlight Stats Badges */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-sm font-medium text-foreground/80">
          <div className="flex items-center gap-1.5 bg-background border px-3.5 py-1.5 rounded-full shadow-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>100% Certified Leaders</span>
          </div>
          <div className="flex items-center gap-1.5 bg-background border px-3.5 py-1.5 rounded-full shadow-sm">
            <Award className="w-4 h-4 text-amber-500" />
            <span>Archery & Rifle Shooting</span>
          </div>
          <div className="flex items-center gap-1.5 bg-background border px-3.5 py-1.5 rounded-full shadow-sm">
            <Compass className="w-4 h-4 text-sky-600" />
            <span>Camping & Rappelling</span>
          </div>
        </div>
      </div>

      {/* Category Filters */}
      {showFilter && (
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 border ${
                  isActive
                    ? "bg-amber-500 text-white border-amber-500 shadow-md shadow-amber-500/20 scale-105"
                    : "bg-card text-foreground hover:bg-accent border-border hover:border-amber-300"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      )}

      {/* Image Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
      >
        <AnimatePresence>
          {displayImages.map((image, index) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.25 }}
              key={image.id}
              onClick={() => setActiveImageIndex(index)}
              className="group relative cursor-pointer overflow-hidden rounded-2xl border bg-card shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-muted relative">
                <img
                  src={image.src}
                  alt={image.title}
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/images/hero-mountains.jpg";
                  }}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                  <Badge className="w-fit bg-amber-500 text-white border-none text-xs mb-1">
                    {image.category}
                  </Badge>
                  <h4 className="font-semibold text-sm line-clamp-1">{image.title}</h4>
                  <p className="text-xs text-white/80 line-clamp-2 mt-0.5">{image.description}</p>
                </div>
              </div>
              <div className="p-3 bg-card flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-foreground line-clamp-1">{image.title}</p>
                  <span className="text-[11px] text-muted-foreground">{image.category}</span>
                </div>
                <Sparkles className="w-4 h-4 text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveImageIndex(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
          >
            <button
              onClick={() => setActiveImageIndex(null)}
              className="absolute top-5 right-5 z-50 p-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Previous & Next Controls */}
            <button
              onClick={handlePrev}
              className="absolute left-4 z-50 p-3 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors hidden sm:block"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-4 z-50 p-3 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors hidden sm:block"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            {/* Modal Image Box */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl"
            >
              <div className="max-h-[75vh] overflow-hidden bg-black flex items-center justify-center">
                <img
                  src={activeImage.src}
                  alt={activeImage.title}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/images/hero-mountains.jpg";
                  }}
                  className="max-h-[75vh] w-auto object-contain mx-auto"
                />
              </div>
              <div className="p-5 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-zinc-900 border-t border-zinc-800">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Badge className="bg-amber-500 text-white border-none text-xs">
                      {activeImage.category}
                    </Badge>
                    <span className="text-xs text-zinc-400">
                      Photo { (activeImageIndex ?? 0) + 1 } of {filteredImages.length}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold">{activeImage.title}</h3>
                  <p className="text-sm text-zinc-300 mt-1 max-w-2xl">{activeImage.description}</p>
                </div>
                <a
                  href={`https://wa.me/919850504437?text=${encodeURIComponent(`Hi Explorers Team, I saw the Kids Camp photo "${activeImage.title}". I would like to inquire about upcoming Kids Camp batches!`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl font-medium text-sm transition-colors whitespace-nowrap shadow-lg shadow-emerald-600/30"
                >
                  <MessageCircle className="w-4 h-4" />
                  Inquire Kids Camp
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default KidsCampGallery;
