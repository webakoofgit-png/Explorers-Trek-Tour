import { useEffect, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import InternalSearchBar from "./InternalSearchBar";

interface InternalPageHeroProps {
  pageName: string;
  title?: string;
  subtitle?: string;
  eyebrow?: string;
  images: string[];
  children?: ReactNode;
  showSearch?: boolean;
}

const InternalPageHero = ({
  pageName,
  title = pageName,
  subtitle,
  eyebrow,
  images,
  children,
  showSearch = true,
}: InternalPageHeroProps) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const safeImages = images.length ? images : ["/images/hero-mountains.webp"];

  useEffect(() => {
    setActiveSlide(0);

    if (safeImages.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % safeImages.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [safeImages.length]);

  return (
    <>
    <section className="relative min-h-[320px] overflow-hidden bg-slate-900 md:min-h-[430px]" aria-roledescription="carousel">
      {safeImages.map((image, index) => (
        <img
          key={`${image}-${index}`}
          src={image}
          alt=""
          aria-hidden="true"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            index === activeSlide ? "opacity-100" : "opacity-0"
          }`}
          onError={(event) => {
            (event.currentTarget as HTMLImageElement).src = "/images/hero-mountains.webp";
          }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/25" />

      <div className="container relative z-10 mx-auto flex min-h-[320px] items-end px-4 py-9 md:min-h-[430px] md:py-12">
        <div className="max-w-4xl text-white">
          <nav className="mb-5 flex flex-wrap items-center gap-1.5 text-xs font-bold uppercase tracking-[0.16em] text-white/75" aria-label="Breadcrumb">
            <Link to="/" className="transition-colors hover:text-accent">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="text-white" aria-current="page">{pageName}</span>
          </nav>

          {eyebrow && <p className="font-heading text-sm font-black uppercase tracking-[0.24em] text-accent">{eyebrow}</p>}
          <h1 className="mt-2 font-heading text-3xl font-black leading-tight sm:text-4xl md:text-5xl">{title}</h1>
          {subtitle && <p className="mt-4 max-w-3xl text-sm leading-7 text-white/85 md:text-lg">{subtitle}</p>}
          {children && <div className="mt-5">{children}</div>}
        </div>
      </div>

      {safeImages.length > 1 && (
        <div className="absolute bottom-4 right-4 z-20 flex gap-1.5 md:bottom-6 md:right-6" aria-label="Banner slides">
          {safeImages.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActiveSlide(index)}
              className={`h-2 rounded-full transition-all ${index === activeSlide ? "w-7 bg-accent" : "w-2 bg-white/60 hover:bg-white"}`}
              aria-label={`Show banner slide ${index + 1}`}
              aria-current={index === activeSlide ? "true" : undefined}
            />
          ))}
        </div>
      )}
    </section>
    {showSearch && <InternalSearchBar />}
    </>
  );
};

export default InternalPageHero;
