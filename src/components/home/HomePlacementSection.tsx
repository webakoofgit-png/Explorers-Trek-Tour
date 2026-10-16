import { Link } from "react-router-dom";
import { CalendarDays, Filter, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { programDirectory, tourCategoryFilters, treks } from "@/data/siteData";

const tags = ["Offbeat", "Trending", "Popular", "Weekend", "Monsoon", "Family"];

const trekSeasons = [
  "Monsoon Treks (June to September)",
  "Winter Treks (October to January)",
  "Summer Treks (February to May)",
];

const HomePlacementSection = () => {
  const upcoming = treks.slice(0, 3);

  return (
    <section className="section-padding bg-background">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.35fr)]">
          <div className="space-y-6">
            <div>
              <span className="font-heading text-sm font-semibold uppercase tracking-widest text-accent">
                About Explorers
              </span>
              <h2 className="mt-3 font-heading text-3xl font-extrabold text-foreground md:text-4xl">
                Adventure, Travel and Training Since 2001
              </h2>
              <p className="mt-4 max-w-xl font-body leading-relaxed text-muted-foreground">
                Explorers Group has been creating safe outdoor learning, trekking and travel experiences for more than
                24 years, with certified leaders, Maharashtra tourism recognition and carefully planned programs for
                children, women, families, schools, corporates and senior explorers.
              </p>
            </div>

            <div className="rounded-lg border border-border bg-card p-5 card-shadow">
              <div className="mb-4 flex items-center gap-2">
                <Filter className="h-5 w-5 text-primary" />
                <h3 className="font-heading text-lg font-bold text-foreground">Filter Events</h3>
              </div>
              <div className="space-y-5">
                <div>
                  <p className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    Event name and age wise
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {programDirectory.slice(0, 10).map((filter) => (
                      <Link key={filter.title} to={filter.link}>
                        <Badge variant="secondary" className="rounded-full px-3 py-1.5 text-xs">
                          {filter.title}
                        </Badge>
                      </Link>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    Weekend Treks
                  </p>
                  <div className="grid gap-2">
                    {trekSeasons.map((season) => (
                      <Link
                        key={season}
                        to="/treks?type=Weekend+Trek"
                        className="rounded-xl border border-border bg-background px-4 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary/50 hover:text-primary"
                      >
                        {season}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {tags.map((tag) => (
                <Link
                  key={tag}
                  to="/treks"
                  className="rounded-lg border border-border bg-card px-3 py-4 text-center font-heading text-sm font-bold text-foreground card-shadow transition-all hover:-translate-y-1 hover:border-primary/50 hover:text-primary sm:py-5"
                >
                  {tag}
                </Link>
              ))}
            </div>

            <div className="rounded-lg border border-border bg-card p-5 card-shadow">
              <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <span className="font-heading text-xs font-semibold uppercase tracking-widest text-accent">
                    Upcoming Events
                  </span>
                  <h3 className="mt-1 font-heading text-2xl font-extrabold text-foreground">Plan Your Next Event</h3>
                </div>
                <Link to="/treks">
                  <Button className="gradient-primary rounded-full px-6 font-heading font-bold text-primary-foreground">
                    View All
                  </Button>
                </Link>
              </div>

              <div className="grid gap-4">
                {upcoming.map((event) => (
                  <Link
                    key={event.id}
                    to={`/treks/${event.id}`}
                    className="grid gap-4 rounded-lg border border-border bg-background p-3 transition-colors hover:border-primary/50 sm:grid-cols-[128px_minmax(0,1fr)]"
                  >
                    <img
                      src={event.image}
                      alt={event.title}
                      className="h-32 w-full rounded-xl object-cover sm:h-full"
                      loading="lazy"
                    />
                    <div className="py-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge className="gradient-highlight text-highlight-foreground">{event.tourType}</Badge>
                        <span className="text-xs font-semibold text-muted-foreground">{event.ageGroup} Years</span>
                      </div>
                      <h4 className="mt-2 font-heading text-lg font-bold text-foreground">{event.title}</h4>
                      <div className="mt-2 flex flex-wrap gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {event.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <CalendarDays className="h-4 w-4" />
                          {event.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {event.difficulty}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-border bg-card p-5 card-shadow">
              <p className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Camp Category / Tour Category
              </p>
              <div className="flex flex-wrap gap-2">
                {tourCategoryFilters.map((category) => (
                  <Link key={category} to="/treks">
                    <Badge variant="outline" className="rounded-full px-3 py-1.5">
                      {category}
                    </Badge>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePlacementSection;
