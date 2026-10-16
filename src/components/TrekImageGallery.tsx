import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Expand, Images } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

type TrekImageGalleryProps = {
  images: string[];
  title: string;
};

const TrekImageGallery = ({ images, title }: TrekImageGalleryProps) => {
  const galleryImages = useMemo(() => [...new Set(images.filter(Boolean))], [images]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeThumbnailRef = useRef<HTMLButtonElement>(null);

  const showPrevious = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null) return null;
      return current === 0 ? galleryImages.length - 1 : current - 1;
    });
  }, [galleryImages.length]);

  const showNext = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null) return null;
      return current === galleryImages.length - 1 ? 0 : current + 1;
    });
  }, [galleryImages.length]);

  useEffect(() => {
    if (activeIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, showNext, showPrevious]);

  useEffect(() => {
    activeThumbnailRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [activeIndex]);

  if (galleryImages.length === 0) return null;

  return (
    <>
      <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-3">
        {galleryImages.map((image, index) => (
          <button
            key={`${image}-${index}`}
            type="button"
            onClick={() => setActiveIndex(index)}
            className="group relative h-44 min-w-[82%] snap-start overflow-hidden rounded-lg bg-muted text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:min-w-[48%] lg:min-w-[calc((100%_-_1.5rem)/3)]"
            aria-label={`Open ${title} photo ${index + 1} of ${galleryImages.length}`}
          >
            <img
              src={image}
              alt={`${title} gallery ${index + 1}`}
              loading="lazy"
              className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
            />
            <span className="absolute inset-0 flex items-center justify-center bg-black/0 text-white opacity-0 transition group-hover:bg-black/30 group-hover:opacity-100 group-focus-visible:bg-black/30 group-focus-visible:opacity-100">
              <Expand className="h-8 w-8" aria-hidden="true" />
            </span>
            <span className="absolute bottom-2 right-2 rounded-full bg-black/65 px-2.5 py-1 text-xs font-bold text-white">
              {index + 1}/{galleryImages.length}
            </span>
          </button>
        ))}
      </div>

      <p className="mt-1 flex items-center gap-2 text-xs font-semibold text-muted-foreground">
        <Images className="h-4 w-4 text-primary" aria-hidden="true" />
        Select a photo to open it. Scroll sideways to see all {galleryImages.length} photos.
      </p>

      <Dialog open={activeIndex !== null} onOpenChange={(open) => !open && setActiveIndex(null)}>
        <DialogContent className="flex h-[92dvh] w-[calc(100vw-1rem)] max-w-6xl flex-col gap-3 overflow-hidden border-white/15 bg-black p-3 text-white sm:rounded-xl sm:p-5 [&>button]:z-30 [&>button]:rounded-full [&>button]:bg-black/70 [&>button]:p-2 [&>button]:text-white [&>button]:opacity-100">
          <DialogTitle className="pr-12 text-base font-black text-white sm:text-lg">{title} photo gallery</DialogTitle>
          <DialogDescription className="sr-only">
            Scroll through every photo from {title}. Use the arrow buttons or keyboard arrow keys to move between photos.
          </DialogDescription>

          {activeIndex !== null && (
            <>
              <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-auto rounded-lg bg-zinc-950">
                <img
                  src={galleryImages[activeIndex]}
                  alt={`${title} gallery ${activeIndex + 1}`}
                  className="max-h-full max-w-full object-contain"
                />

                {galleryImages.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={showPrevious}
                      className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/70 p-2.5 text-white transition hover:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:left-4 sm:p-3"
                      aria-label="Show previous photo"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                      type="button"
                      onClick={showNext}
                      className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/70 p-2.5 text-white transition hover:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:right-4 sm:p-3"
                      aria-label="Show next photo"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                  </>
                )}

                <span className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/75 px-3 py-1 text-xs font-bold">
                  Photo {activeIndex + 1} of {galleryImages.length}
                </span>
              </div>

              <div className="flex shrink-0 snap-x gap-2 overflow-x-auto pb-1" aria-label="Gallery thumbnails">
                {galleryImages.map((image, index) => (
                  <button
                    key={`thumbnail-${image}-${index}`}
                    ref={index === activeIndex ? activeThumbnailRef : undefined}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={`h-16 w-24 shrink-0 snap-center overflow-hidden rounded-md border-2 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                      index === activeIndex ? "border-primary opacity-100" : "border-transparent opacity-55 hover:opacity-100"
                    }`}
                    aria-label={`Show photo ${index + 1}`}
                    aria-current={index === activeIndex ? "true" : undefined}
                  >
                    <img src={image} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TrekImageGallery;
