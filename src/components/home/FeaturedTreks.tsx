import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { treks } from "@/data/siteData";
import { sortByUpcomingDate } from "@/lib/trekDates";

const FeaturedTreks = () => {
  const [page, setPage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [itemsPerView, setItemsPerView] = useState(1);
  const featuredEvents = useMemo(() => {
    return treks
      .filter((event) => event.featured)
      .sort((first, second) => {
        const firstBatch = sortByUpcomingDate(first.batches)[0];
        const secondBatch = sortByUpcomingDate(second.batches)[0];
        return new Date(firstBatch?.date || "9999-12-31").getTime() - new Date(secondBatch?.date || "9999-12-31").getTime();
      })
      .slice(0, 6);
  }, []);
  const maxPage = Math.max(0, featuredEvents.length - itemsPerView);

  useEffect(() => {
    const updateItemsPerView = () => {
      const nextItemsPerView = window.innerWidth >= 1280 ? 3 : window.innerWidth >= 768 ? 2 : 1;
      setItemsPerView(nextItemsPerView);
      setPage((current) => Math.min(current, Math.max(0, featuredEvents.length - nextItemsPerView)));
    };

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, [featuredEvents.length]);

  useEffect(() => {
    if (isPaused || maxPage === 0 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const timer = window.setInterval(() => {
      setPage((current) => (current >= maxPage ? 0 : current + 1));
    }, 3000);

    return () => window.clearInterval(timer);
  }, [isPaused, maxPage]);

  return (
    <section className="section-padding bg-secondary/50">
      <div className="container mx-auto">
        <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="mt-2 font-heading text-2xl md:text-4xl font-black uppercase text-foreground">FEATURED EVENTS</h2>
          </div>
          <Link to="/treks">
            <Button variant="outline" className="rounded-lg border-primary text-primary hover:bg-primary hover:text-white">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocusCapture={() => setIsPaused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              setIsPaused(false);
            }
          }}
          aria-roledescription="carousel"
          aria-label="Featured events"
        >
          <button
            type="button"
            onClick={() => setPage((current) => (current <= 0 ? maxPage : current - 1))}
            className="absolute left-1 top-1/2 z-20 inline-flex -translate-y-1/2 rounded-full border border-accent/60 bg-background/95 p-2 text-accent shadow-lg transition-all hover:scale-105 hover:bg-accent/10 md:-left-5 lg:-left-14 lg:p-4"
            aria-label="Previous featured events"
            disabled={maxPage === 0}
          >
            <ArrowRight className="h-4 w-4 rotate-180 lg:h-8 lg:w-8" />
          </button>

          <button
            type="button"
            onClick={() => setPage((current) => (current >= maxPage ? 0 : current + 1))}
            className="absolute right-1 top-1/2 z-20 inline-flex -translate-y-1/2 rounded-full border border-accent/60 bg-background/95 p-2 text-accent shadow-lg transition-all hover:scale-105 hover:bg-accent/10 md:-right-5 lg:-right-14 lg:p-4"
            aria-label="Next featured events"
            disabled={maxPage === 0}
          >
            <ArrowRight className="h-4 w-4 lg:h-8 lg:w-8" />
          </button>

          <div className="overflow-hidden pb-4">
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${page * (100 / itemsPerView)}%)` }}
              aria-live="polite"
            >
              {featuredEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                  className="shrink-0 px-2.5"
                  style={{ flexBasis: `${100 / itemsPerView}%` }}
                >
                      <Link to={`/treks/${event.id}`} className="group block h-full overflow-hidden rounded-lg border border-border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                        <div className="relative h-52 overflow-hidden sm:h-60 lg:h-64">
                          <img
                            src={event.image}
                            alt={event.title}
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "/images/hero-mountains.jpg";
                            }}
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                          />
                          <span className="absolute right-4 top-4 rounded-full bg-accent px-3 py-1 text-xs font-black uppercase tracking-wide text-white">
                            {event.tag}
                          </span>
                        </div>
                        <div className="relative mx-3 -mt-7 rounded-lg bg-white p-4 shadow-lg sm:mx-4 sm:p-5">
                          <h3 className="font-heading text-lg font-black leading-tight text-foreground sm:text-xl">{event.title}</h3>
                          <div className="mt-4 grid gap-2 text-sm text-muted-foreground">
                            <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> {event.location}</span>
                            <span className="flex items-center gap-2"><Clock className="h-4 w-4 text-primary" /> {event.duration}</span>
                            <span className="flex items-center gap-2"><Calendar className="h-4 w-4 text-primary" /> Next batch: {sortByUpcomingDate(event.batches)[0]?.date || "Dates coming soon"}</span>
                          </div>
                          <div className="mt-5 flex items-end justify-between gap-3">
                            <div>
                              <div className="font-heading text-xl font-black text-primary sm:text-2xl">Rs.{event.price}</div>
                              <div className="text-xs font-bold text-muted-foreground">{event.reporting}</div>
                            </div>
                            <span className="inline-flex items-center text-sm font-black text-highlight">
                              Details <ArrowRight className="ml-1 h-4 w-4" />
                            </span>
                          </div>
                        </div>
                      </Link>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-1 flex justify-center gap-2" aria-label="Featured event slides">
            {Array.from({ length: maxPage + 1 }).map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setPage(index)}
                className={`h-2 rounded-full transition-all ${page === index ? "w-7 bg-primary" : "w-2 bg-muted-foreground/30"}`}
                aria-label={`Show featured event slide ${index + 1}`}
                aria-current={page === index ? "true" : undefined}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedTreks;
