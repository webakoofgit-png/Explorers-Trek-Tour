import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { heroSlides } from "@/data/siteData";

const HeroSection = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((prev) => (prev + 1) % heroSlides.length), 5200);
    return () => clearInterval(timer);
  }, []);

  const slide = heroSlides[current];

  return (
    <section className="relative left-1/2 min-h-[72vh] w-screen -translate-x-1/2 overflow-hidden md:min-h-[86vh]">
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.title}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.75 }}
          className="absolute inset-0"
        >
          <img
            src={slide.image}
            alt={slide.title}
            decoding="async"
            fetchPriority="high"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/20 to-black/78" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 flex min-h-[72vh] items-center px-4 pt-20 md:min-h-[86vh]">
        <div className="container mx-auto">
          <motion.div key={`${slide.title}-copy`} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl text-left">
            <div className="mb-6 inline-flex flex-wrap items-center gap-3 rounded-full border border-primary-foreground/25 bg-black/20 px-4 py-2 text-primary-foreground shadow-lg backdrop-blur-sm">
              <span className="font-heading text-sm font-extrabold tracking-wide">EXPLORERS GROUP</span>
              <span className="h-1 w-1 rounded-full bg-highlight" />
              <span className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/80">Adventure</span>
              <span className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/80">Travel</span>
              <span className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/80">Training</span>
            </div>
            <p className="mb-4 font-heading text-sm font-semibold uppercase tracking-widest text-accent md:text-base">
              Since 2001 - The Name of Excellence
            </p>
            <h1 className="mb-4 max-w-4xl font-heading text-3xl font-extrabold leading-tight text-primary-foreground sm:text-4xl md:text-5xl lg:text-6xl">
              {slide.title}
            </h1>
            <p className="mb-8 max-w-2xl font-body text-lg text-primary-foreground/85 md:text-xl">{slide.subtitle}</p>
            <Link to={slide.link} className="inline-flex">
              <Button size="lg" className="gradient-highlight rounded-full px-8 font-heading text-base font-bold text-highlight-foreground">
                View Details
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      <button onClick={() => setCurrent((current - 1 + heroSlides.length) % heroSlides.length)} className="absolute left-3 top-1/2 z-20 rounded-full bg-white/15 p-2 text-accent backdrop-blur hover:bg-white/25" aria-label="Previous slide">
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button onClick={() => setCurrent((current + 1) % heroSlides.length)} className="absolute right-3 top-1/2 z-20 rounded-full bg-white/15 p-2 text-accent backdrop-blur hover:bg-white/25" aria-label="Next slide">
        <ChevronRight className="h-6 w-6" />
      </button>
      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {heroSlides.map((item, index) => (
          <button key={item.title} onClick={() => setCurrent(index)} className={`h-2.5 rounded-full transition-all ${index === current ? "w-9 bg-accent" : "w-2.5 bg-white/45"}`} aria-label={`Show ${item.title}`} />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
