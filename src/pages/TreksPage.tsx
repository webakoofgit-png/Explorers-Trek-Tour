import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { BadgeCheck, Calendar, ChevronRight, Clock, Filter, Grid, ListFilter, MapPin, Search, Sparkles, Users, X } from "lucide-react";
import Layout from "@/components/Layout";
import InternalPageHero from "@/components/InternalPageHero";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { getCurrentTrekSeason, isTrekDatePast, sortDateStringUpcomingFirst } from "@/lib/trekDates";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { seasonTabs, treks, Trek } from "@/data/siteData";

// Full 12-month order sequence
const monthNamesOrder = [
  "June 2026",
  "July 2026",
  "August 2026",
  "September 2026",
  "October 2026",
  "November 2026",
  "December 2026",
  "January 2027",
  "February 2027",
  "March 2027",
  "April 2027",
  "May 2027",
];

const seasonMonthMap: Record<string, string[]> = {
  monsoon: ["June 2026", "July 2026", "August 2026", "September 2026"],
  winter: ["October 2026", "November 2026", "December 2026", "January 2027"],
  summer: ["February 2027", "March 2027", "April 2027", "May 2027"],
};

const seasonFlowCards = [
  {
    id: "monsoon",
    title: "Monsoon Treks",
    months: "June – September",
    image: "/images/season-logos/monsoon-treks.png",
    description: "Waterfalls, lush trails, forts, and rain-soaked Sahyadri escapes.",
  },
  {
    id: "winter",
    title: "Winter Treks",
    months: "October – January",
    image: "/images/season-logos/winter-adventure.png",
    description: "Clear views, cool weather, camping, and comfortable weekend adventures.",
  },
  {
    id: "summer",
    title: "Summer Treks",
    months: "February – May",
    image: "/images/season-logos/summer-treks.png",
    description: "Early-morning trails, coastal experiences, and carefully paced outings.",
  },
  {
    id: "himalayan",
    title: "Himalayan Treks",
    months: "Seasonal departures",
    image: "/images/hero-mountains.jpg",
    description: "High-altitude journeys with training, preparation, and trained leaders.",
  },
] as const;

const seasonInformation = {
  monsoon: {
    title: "Monsoon Special Treks",
    months: "June to September",
    description: "The Sahyadri monsoon is breathtaking, but it demands experience and responsibility. Foggy conditions, slippery terrain, flowing waterfalls, and poor route visibility make trained leadership and proven safety practices essential. With Explorers Group's 24+ years of field experience, certified trek leaders, and strict safety protocols, you can explore lush and offbeat Sahyadri trails safely and confidently.",
  },
  winter: {
    title: "Winter Adventures & Trending Tours",
    months: "October to January",
    description: "Winter is the most favourable season for adventure activities in India, especially across Maharashtra and the Sahyadri ranges. The cool climate, clear visibility, and stable weather make it ideal for rock climbing, rappelling, technical treks, and advanced adventure activities. Explorers Group conducts adventure-focused treks, outdoor training programs, winter camping, and short tours to destinations such as Hampi, Badami, Gokarna, Murudeshwar, Goa, Dandeli, and the Rann of Kutch, offering a balanced mix of adventure, exploration, and comfort.",
  },
  summer: {
    title: "Summer Season - Treks | Camps | Tours",
    months: "February to May",
    description: "Summer trekking in Maharashtra and the Sahyadri requires smart planning and experienced execution. High temperatures, dehydration risks, and poor scheduling can make a trek uncomfortable when not handled correctly. Explorers Group plans most summer departures as night or early-morning treks to reduce sun exposure, maintain energy levels, and create a safer experience. Summer programs also include night trails, fireflies festivals, summer camping, the Velas Turtle Festival, and refreshing Konkan tours without compromising safety, comfort, or nature's rhythm.",
  },
  himalayan: {
    title: "Himalayan Trek Information",
    months: "Seasonal departures",
    description: "High-altitude trips need fitness preparation, acclimatisation, and suitable gear. Please read the trek-specific checklist before confirming your booking.",
  },
  all: {
    title: "Plan Your Trek by Season",
    months: "All year round",
    description: "Choose a season card above to see the best conditions, important preparation tips, and available date-wise departures for that period.",
  },
} as const;

type TrekSeason = keyof typeof seasonInformation;

const isTrekSeason = (value: string): value is TrekSeason => value in seasonInformation;

export interface FlatBatchDeparture {
  id: string;
  trekId: string;
  title: string;
  location: string;
  duration: string;
  difficulty: string;
  tourType: string;
  image: string;
  tag: string;
  reporting: string;
  dateStr: string;
  dayOfWeek: string;
  monthYear: string;
  price: number;
  seats: string;
  trek: Trek;
}

// Convert "September 2026" to "month-9-2026"
const getMonthHashId = (monthYearStr: string) => {
  const parts = monthYearStr.split(" ");
  if (parts.length >= 2) {
    const monthName = parts[0];
    const year = parts[1];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const idx = months.indexOf(monthName);
    if (idx !== -1) {
      return `month-${idx + 1}-${year}`;
    }
  }
  return `month-${monthYearStr.toLowerCase().replace(/\s+/g, "-")}`;
};

const getOverviewPreview = (overview: string, maxLength = 120) =>
  overview.length > maxLength ? `${overview.slice(0, maxLength).trimEnd()}…` : overview;

const TreksPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeSeason, setActiveSeason] = useState<TrekSeason>(getCurrentTrekSeason);
  const [selectedMonth, setSelectedMonth] = useState<string>("All");
  const [viewMode, setViewMode] = useState<"timeline" | "grid">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleTrekCount, setVisibleTrekCount] = useState(9);
  const activeSeasonInfo = seasonInformation[activeSeason];

  const urlTypeFilter = searchParams.get("type");
  const isCampingPage = urlTypeFilter?.toLowerCase() === "camping";

  // Handle URL Season parameter & Hash anchor (e.g. #month-9-2026)
  useEffect(() => {
    const queryParam = searchParams.get("q") || "";
    const monthParam = searchParams.get("month");
    setSearchQuery(queryParam);
    if (monthParam) {
      const matchingMonth = monthNamesOrder.find((item) => item.startsWith(`${monthParam} `));
      setSelectedMonth(matchingMonth || "All");
      if (!isCampingPage && matchingMonth) {
        const matchingSeason = Object.entries(seasonMonthMap).find(([, months]) => months.includes(matchingMonth))?.[0];
        if (matchingSeason && isTrekSeason(matchingSeason)) setActiveSeason(matchingSeason);
      }
    } else {
      setSelectedMonth("All");
      if (!searchParams.get("season") && !isCampingPage) {
        setActiveSeason(queryParam ? "all" : getCurrentTrekSeason());
      }
    }

    // Camping keeps all seasonal camps available by default.
    if (isCampingPage) {
      setActiveSeason("all");
    }

    // 1. Check URL query params for season
    const seasonParam = searchParams.get("season");
    if (!isCampingPage && seasonParam && isTrekSeason(seasonParam.toLowerCase())) {
      setActiveSeason(seasonParam.toLowerCase());
    }

    // 2. Check URL Hash (e.g. #month-9-2026 or #month-09-2026)
    const hash = window.location.hash;
    if (hash) {
      const cleanHash = hash.replace("#", "");
      const match = cleanHash.match(/^month-0*(\d+)-(\d{4})$/i);
      if (match) {
        const monthNum = parseInt(match[1], 10);
        const year = match[2];
        const monthNames = [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ];
        const monthName = monthNames[monthNum - 1];
        if (monthName) {
          const fullMonthYear = `${monthName} ${year}`;
          if (seasonMonthMap.monsoon.includes(fullMonthYear)) {
            setActiveSeason("monsoon");
          } else if (seasonMonthMap.winter.includes(fullMonthYear)) {
            setActiveSeason("winter");
          } else if (seasonMonthMap.summer.includes(fullMonthYear)) {
            setActiveSeason("summer");
          } else {
            setActiveSeason("all");
          }
          
          setTimeout(() => {
            const el = document.getElementById(cleanHash) || document.getElementById(`month-${monthNum}-${year}`) || document.getElementById(`month-section-${fullMonthYear.replace(/\s+/g, "-")}`);
            if (el) {
              el.scrollIntoView({ behavior: "smooth" });
            }
          }, 200);
        }
      }
    }
  }, [isCampingPage, searchParams]);

  // Flatten all trek batches into date-wise departure items sorted chronologically
  const allFlatDepartures = useMemo(() => {
    const list: FlatBatchDeparture[] = [];

    treks.forEach((trek) => {
      // Apply URL type filter if present (e.g., ?type=Camping)
      if (urlTypeFilter && trek.tourType !== urlTypeFilter && !trek.title.toLowerCase().includes(urlTypeFilter.toLowerCase())) {
        return;
      }

      trek.batches.forEach((batch, idx) => {
        // Parse batch date string e.g. "06 September 2026"
        const parts = batch.date.split(" ");
        if (parts.length >= 3) {
          const dayNumStr = parts[0];
          const monthName = parts[1];
          const yearNum = parts[2];
          const monthYear = `${monthName} ${yearNum}`;
          
          // Determine day of week
          const dateNum = parseInt(dayNumStr, 10) || 1;
          const days = ["Saturday", "Sunday", "Saturday", "Sunday", "Friday", "Monday"];
          const dayOfWeek = days[dateNum % days.length];

          list.push({
            id: `${trek.id}-${idx}-${batch.date}`,
            trekId: trek.id,
            title: trek.title,
            location: trek.location,
            duration: trek.duration,
            difficulty: trek.difficulty,
            tourType: trek.tourType,
            image: trek.image,
            tag: trek.tag,
            reporting: trek.reporting,
            dateStr: batch.date,
            dayOfWeek,
            monthYear,
            price: batch.price || trek.price,
            seats: batch.seats || "Open",
            trek,
          });
        }
      });
    });

    // Current and upcoming departures are shown first; passed departures move to the end.
    return sortDateStringUpcomingFirst(list);
  }, [urlTypeFilter]);

  const handleSeasonSelect = (season: Exclude<TrekSeason, "all">) => {
    const nearestUpcomingDeparture = allFlatDepartures.find((item) => {
      if (isTrekDatePast(item.dateStr)) return false;
      if (season === "himalayan") return item.tourType === "Himalayan Trek";
      return seasonMonthMap[season]?.includes(item.monthYear);
    });

    setActiveSeason(season);
    setSelectedMonth(nearestUpcomingDeparture?.monthYear || "All");
  };

  // Filter departures by Active Season & Selected Month & Search Query
  const filteredDepartures = useMemo(() => {
    return allFlatDepartures.filter((item) => {
      // Season filter
      if (activeSeason === "himalayan") {
        if (item.tourType !== "Himalayan Trek") return false;
      } else if (activeSeason !== "all") {
        const validMonths = seasonMonthMap[activeSeason] || [];
        if (!validMonths.includes(item.monthYear)) return false;
      }

      // Quick Month Jump filter
      if (selectedMonth !== "All" && item.monthYear !== selectedMonth) {
        return false;
      }

      // Search Query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const fullText = `${item.title} ${item.location} ${item.tourType} ${item.dateStr}`.toLowerCase();
        if (!fullText.includes(query)) return false;
      }

      return true;
    });
  }, [allFlatDepartures, activeSeason, selectedMonth, searchQuery]);

  // Group departures by Month & Year for Yuvashakti-style Monthwise Flow.
  // Expired dates are kept in a separate group so they are always rendered last.
  const groupDeparturesByMonth = (departures: FlatBatchDeparture[]) => {
    const groups: Record<string, FlatBatchDeparture[]> = {};
    departures.forEach((item) => {
      if (!groups[item.monthYear]) {
        groups[item.monthYear] = [];
      }
      groups[item.monthYear].push(item);
    });
    return groups;
  };

  const upcomingDeparturesByMonth = useMemo(
    () => groupDeparturesByMonth(filteredDepartures.filter((item) => !isTrekDatePast(item.dateStr))),
    [filteredDepartures],
  );

  const pastDeparturesByMonth = useMemo(
    () => groupDeparturesByMonth(filteredDepartures.filter((item) => isTrekDatePast(item.dateStr))),
    [filteredDepartures],
  );

  const departureGroups = [
    ...Object.entries(upcomingDeparturesByMonth).map(([monthYear, items]) => ({ monthYear, items, isPast: false })),
    ...Object.entries(pastDeparturesByMonth).map(([monthYear, items]) => ({ monthYear, items, isPast: true })),
  ];

  const upcomingGridDepartures = filteredDepartures.filter((item) => !isTrekDatePast(item.dateStr));
  const visibleGridDepartures = upcomingGridDepartures.slice(0, visibleTrekCount);

  useEffect(() => {
    setVisibleTrekCount(9);
  }, [activeSeason, searchQuery, selectedMonth]);

  // Available months list based on current active season
  const availableMonths = useMemo(() => {
    if (activeSeason === "all" || activeSeason === "himalayan") return monthNamesOrder;
    return seasonMonthMap[activeSeason] || [];
  }, [activeSeason]);

  const handleMonthJump = (month: string) => {
    setSelectedMonth(month);
    if (month !== "All") {
      const hashId = getMonthHashId(month);
      window.history.pushState(null, "", `#${hashId}`);
      const el = document.getElementById(hashId) || document.getElementById(`month-section-${month.replace(/\s+/g, "-")}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const updateTrekSearch = (nextQuery: string) => {
    setSearchQuery(nextQuery);
    const nextParams = new URLSearchParams(searchParams);

    if (nextQuery.trim()) {
      nextParams.set("q", nextQuery);
      nextParams.delete("month");
      nextParams.delete("season");
      setActiveSeason("all");
      setSelectedMonth("All");
    } else {
      nextParams.delete("q");
    }

    setSearchParams(nextParams, { replace: true });
  };

  return (
    <Layout>
      <InternalPageHero
        pageName={urlTypeFilter || "Treks & Tours"}
        eyebrow="Date-Wise & Month-Wise Trek Flow"
        title={urlTypeFilter ? `${urlTypeFilter} Schedule` : "Upcoming Treks & Tours Schedule"}
        subtitle="Explore safe, professionally guided Sahyadri and Himalayan treks. Select your preferred season and browse departures date-wise across every month."
        images={treks.slice(0, 4).map((trek) => trek.image)}
      />

      <section id="trek-schedule" tabIndex={-1} className="scroll-mt-[110px] section-padding bg-background focus:outline-none">
        <div className="container mx-auto">
          <div className="mb-8">
            <div className="mb-5">
              <p className="text-xs font-bold uppercase tracking-widest text-accent">Explore by Season</p>
              <h2 className="mt-1 font-heading text-2xl font-black uppercase text-foreground md:text-3xl">
                Season-Wise Trek Flow
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {seasonFlowCards.map((season) => {
                const isActive = activeSeason === season.id;

                return (
                  <button
                    key={season.id}
                    type="button"
                    onClick={() => handleSeasonSelect(season.id)}
                    className={`group overflow-hidden rounded-xl border bg-card text-left shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg ${
                      isActive ? "border-primary ring-2 ring-primary/20" : "border-border hover:border-primary/60"
                    }`}
                    aria-pressed={isActive}
                  >
                    <div className={`relative h-40 overflow-hidden ${season.id === "himalayan" ? "" : "bg-white"}`}>
                      <img
                        src={season.image}
                        alt=""
                        className={`h-full w-full transition duration-500 group-hover:scale-105 ${
                          season.id === "himalayan" ? "object-cover" : "object-contain p-4"
                        }`}
                      />
                      {season.id === "himalayan" && <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />}
                      <p className={`absolute bottom-3 left-4 text-xs font-black uppercase tracking-wider ${
                        season.id === "himalayan" ? "text-white/90" : "rounded-full bg-white/90 px-2 py-1 text-foreground shadow-sm"
                      }`}>{season.months}</p>
                    </div>
                    <div className="p-4">
                      <h3 className="font-heading text-lg font-black text-foreground">{season.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{season.description}</p>
                      <span className="mt-4 inline-block text-xs font-black uppercase tracking-wider text-primary">
                        View trek flow →
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Month Jump Navigation Strip (Yuvashakti Style) */}
          <div className="mb-6 rounded-xl border border-border bg-card p-4 card-shadow">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-primary" />
                <span className="font-heading text-xs font-black uppercase tracking-wider text-foreground">
                  {isCampingPage ? "Sticky Camping Filters:" : "Quick Month Jump (Date Flow):"}
                </span>
              </div>

              {/* View Switcher (Timeline Date Flow vs Grid View) */}
              <div className="flex items-center gap-1 rounded-lg border border-border bg-muted p-1">
                <button
                  onClick={() => setViewMode("timeline")}
                  className={`flex items-center gap-1.5 rounded-md px-3 py-1 text-xs font-bold uppercase transition ${
                    viewMode === "timeline" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <ListFilter className="h-3.5 w-3.5" /> Monthwise Date Flow
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`flex items-center gap-1.5 rounded-md px-3 py-1 text-xs font-bold uppercase transition ${
                    viewMode === "grid" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Grid className="h-3.5 w-3.5" /> Grid View
                </button>
              </div>
            </div>

            {/* Month Jump Pills Strip */}
            <div className="mt-3 flex gap-2 overflow-x-auto pb-1 no-scrollbar">
              <button
                onClick={() => handleMonthJump("All")}
                className={`shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-heading font-extrabold uppercase tracking-wider transition ${
                  selectedMonth === "All"
                    ? "border-primary bg-primary text-primary-foreground shadow-sm"
                    : "border-border bg-background text-foreground hover:border-primary/50"
                }`}
              >
                All Months
              </button>
              {availableMonths.map((month) => (
                <button
                  key={month}
                  onClick={() => handleMonthJump(month)}
                  className={`shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-heading font-extrabold uppercase tracking-wider transition ${
                    selectedMonth === month
                      ? "border-primary bg-primary text-primary-foreground shadow-sm"
                      : "border-border bg-background text-foreground hover:border-primary/50"
                  }`}
                >
                  {month}
                </button>
              ))}
            </div>

          </div>

          <div className="mb-6 rounded-xl border border-primary/20 bg-primary/5 p-5 md:flex md:items-start md:justify-between md:gap-8">
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-primary">Month & Season Guide</p>
              <h3 className="mt-1 font-heading text-xl font-black text-foreground">{activeSeasonInfo.title}</h3>
              <p className="mt-2 max-w-4xl text-sm leading-relaxed text-muted-foreground">{activeSeasonInfo.description}</p>
            </div>
            <span className="mt-4 inline-flex shrink-0 rounded-full bg-card px-3 py-1.5 text-xs font-black uppercase tracking-wider text-primary shadow-sm md:mt-0">
              {activeSeasonInfo.months}
            </span>
          </div>

          {/* Search Box */}
          {!isCampingPage && <div className="mb-8 max-w-md">
            <label htmlFor="trek-search" className="sr-only">Search treks</label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
              <Input
                id="trek-search"
                type="search"
                placeholder="Search trek name, location, or fort (e.g. Andharban, Kalsubai, Manali)..."
                value={searchQuery}
                onChange={(event) => updateTrekSearch(event.target.value)}
                className="bg-card pl-9 pr-10 text-sm"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => updateTrekSearch("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                  aria-label="Clear trek search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>}

          {/* TIMELINE FLOW VIEW (Yuvashakti Style Month-wise & Date-wise) */}
          {viewMode === "timeline" ? (
            <div className="space-y-12">
              {departureGroups.length === 0 ? (
                <div className="rounded-xl border border-dashed border-border p-12 text-center text-muted-foreground">
                  <Calendar className="mx-auto mb-3 h-8 w-8 text-primary" />
                  <p className="font-heading text-lg font-bold text-foreground">No trek departures found for selected filter</p>
                  <p className="text-xs mt-1">Try selecting a different season tab or search keyword.</p>
                </div>
              ) : (
                departureGroups.map(({ monthYear, items, isPast }) => {
                  const hashId = isPast ? `past-${getMonthHashId(monthYear)}` : getMonthHashId(monthYear);
                  return (
                    <div
                      key={`${isPast}-${monthYear}`}
                      id={hashId}
                      className="space-y-4 month-card scroll-mt-24"
                    >
                      {/* Secondary anchor tags for fallback matching */}
                      {!isPast && <div id={`month-section-${monthYear.replace(/\s+/g, "-")}`} className="hidden" />}

                      {/* Month Card Header - Yuvashakti Style Left Accent Border */}
                      <div className="flex items-center gap-3 border-l-4 border-primary pl-4 py-1">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground font-heading font-black text-sm shadow-sm">
                          <Calendar className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-heading text-2xl font-black uppercase tracking-wide text-foreground">
                            {isPast ? `Past Departures · ${monthYear}` : monthYear}
                          </h3>
                          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                            {items.length} Departure{items.length > 1 ? "s" : ""} Scheduled Date-Wise
                          </p>
                        </div>
                        <span className="ml-auto hidden rounded-full bg-primary/10 px-3 py-1 font-heading text-xs font-black uppercase tracking-wider text-primary sm:inline-block">
                            {isPast ? "PAST DEPARTURES" : `${activeSeason.toUpperCase()} SEASON`}
                        </span>
                      </div>

                      {/* Date-Wise List Items */}
                      <div className="grid gap-3.5 pt-2">
                        {items.map((item) => (
                          <div
                            key={item.id}
                            className="group relative grid gap-4 rounded-xl border border-border bg-card p-4 card-shadow transition-all hover:border-primary/60 hover:shadow-xl md:grid-cols-[12rem_minmax(0,1fr)_12rem] md:items-center lg:p-5"
                          >
                            {/* Date Box Block (Left) - Yuvashakti Style Date Box */}
                            <div className="flex items-center gap-3 border-b border-border pb-3 md:border-b-0 md:border-r md:pb-0 md:pr-4">
                              <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-xl bg-primary px-1.5 text-primary-foreground font-heading shadow-md">
                                <span className="text-[0.6rem] font-black uppercase tracking-[0.08em] leading-tight">
                                  {item.dateStr.split(" ")[1]}
                                </span>
                                <span className="text-2xl font-black leading-none my-0.5">
                                  {item.dateStr.split(" ")[0]}
                                </span>
                                <span className="text-[0.6rem] font-extrabold text-primary-foreground/90 uppercase">
                                  {item.dateStr.split(" ")[2]}
                                </span>
                              </div>
                              <div>
                                <div className="font-heading text-xs font-black uppercase tracking-wider text-primary">
                                  {item.dateStr}
                                </div>
                                <div className="text-xs font-bold text-muted-foreground uppercase">
                                  {item.dayOfWeek}
                                </div>
                                <div className={`mt-1 inline-flex items-center gap-1 text-[0.68rem] font-black uppercase tracking-wider rounded-md px-2 py-0.5 ${
                                  item.seats.includes("Fast") || item.seats.includes("left")
                                    ? "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300"
                                    : "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300"
                                }`}>
                                  <BadgeCheck className="h-3 w-3" />
                                  {item.seats}
                                </div>
                              </div>
                            </div>

                            {/* Trek Info Block (Center) */}
                            <div className="flex items-start gap-4 min-w-0">
                              <img
                                src={item.image}
                                alt={item.title}
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = "/images/hero-mountains.jpg";
                                }}
                                className="h-20 w-24 shrink-0 rounded-lg object-cover sm:h-22 sm:w-28 shadow-sm group-hover:scale-105 transition-transform duration-300"
                              />
                              <div className="min-w-0">
                                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                                  <Badge variant="secondary" className="text-[0.65rem] font-black uppercase tracking-wider">
                                    {item.tourType}
                                  </Badge>
                                  <Badge className="gradient-highlight text-highlight-foreground text-[0.65rem] font-black uppercase">
                                    {item.tag}
                                  </Badge>
                                </div>
                                <h4 className="font-heading text-lg sm:text-xl font-black text-foreground group-hover:text-primary transition-colors truncate">
                                  <Link to={`/treks/${item.trekId}`}>{item.title}</Link>
                                </h4>
                                 <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{getOverviewPreview(item.trek.overview)}</p>
                                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                                  <span className="flex items-center gap-1 font-medium">
                                    <MapPin className="h-3.5 w-3.5 text-primary" /> {item.location}
                                  </span>
                                  <span className="flex items-center gap-1 font-medium">
                                    <Clock className="h-3.5 w-3.5 text-primary" /> {item.duration}
                                  </span>
                                  <span className="flex items-center gap-1 font-bold text-foreground">
                                    Pickup: {item.reporting}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Price & Booking Action Block (Right) */}
                            <div className="flex flex-col items-start gap-2 border-t border-border pt-3 md:items-end md:border-t-0 md:pt-0">
                              <div className="text-left md:text-right">
                                <div className="font-heading text-2xl font-black text-primary">
                                  Rs.{item.price}
                                </div>
                                <div className="text-[0.7rem] font-bold text-muted-foreground uppercase tracking-wider">
                                  Per Explorer
                                </div>
                              </div>

                              <div className="flex w-full items-center gap-2 md:w-auto">
                                <Link to={`/treks/${item.trekId}`} className="flex-1 md:flex-initial">
                                  <Button size="sm" className="w-full rounded-lg gradient-highlight text-highlight-foreground font-heading font-black text-xs uppercase tracking-wider shadow-sm">
                                    View Details
                                  </Button>
                                </Link>
                                <a
                                  href={`https://wa.me/919850504437?text=${encodeURIComponent(`Hi Explorers, I want to book ${item.title} on ${item.dateStr}`)}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition shadow-sm"
                                  title="Instant WhatsApp Booking"
                                >
                                  <WhatsAppIcon className="h-4 w-4" />
                                </a>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          ) : (
            /* GRID VIEW */
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {upcomingGridDepartures.length === 0 ? (
                <div className="rounded-xl border border-dashed border-border p-12 text-center text-muted-foreground md:col-span-2 xl:col-span-3">
                  <Calendar className="mx-auto mb-3 h-8 w-8 text-primary" />
                  <p className="font-heading text-lg font-bold text-foreground">
                    {searchQuery.trim() ? "No matching treks found" : "New departure dates are being updated"}
                  </p>
                  <p className="mt-1 text-xs">
                    {searchQuery.trim()
                      ? "Try another trek name, location, fort, or clear the search."
                      : "Choose another season or month, or contact Explorers for the next available batch."}
                  </p>
                </div>
              ) : visibleGridDepartures.map((item) => (
                <article key={item.id} className="overflow-hidden rounded-xl border border-border bg-card shadow-sm hover:shadow-lg transition">
                  <Link to={`/treks/${item.trekId}`} className="group block">
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/images/hero-mountains.jpg";
                        }}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                      <Badge className="absolute left-4 top-4 gradient-highlight text-highlight-foreground font-black uppercase">{item.tag}</Badge>
                      <span className="absolute right-4 top-4 rounded-full bg-black/75 px-3 py-1 font-heading text-xs font-bold text-white backdrop-blur">
                        {item.dateStr}
                      </span>
                    </div>
                    <div className="p-5">
                      <div className="mb-2 text-xs font-bold uppercase tracking-widest text-accent">
                        {item.tourType} • {item.dayOfWeek}
                      </div>
                      <h3 className="font-heading text-xl font-black text-foreground group-hover:text-primary transition-colors">{item.title}</h3>
                      <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 text-primary" /> {item.location}
                      </p>
                       <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{getOverviewPreview(item.trek.overview)}</p>
                      <div className="mt-4 flex items-end justify-between gap-3 border-t border-border pt-4">
                        <div>
                          <div className="font-heading text-2xl font-black text-primary">Rs.{item.price}</div>
                          <div className="text-xs font-bold text-muted-foreground">{item.duration} | {item.reporting}</div>
                        </div>
                        <span className="inline-flex items-center text-sm font-black text-highlight">
                          View Details <ChevronRight className="ml-1 h-4 w-4" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
              {upcomingGridDepartures.length > visibleTrekCount && (
                <div className="flex justify-center pt-2 md:col-span-2 xl:col-span-3">
                  <Button
                    type="button"
                    onClick={() => setVisibleTrekCount((count) => count + 9)}
                    className="rounded-full px-8 font-heading font-black uppercase tracking-wider gradient-highlight text-highlight-foreground"
                  >
                    Show More Treks ({upcomingGridDepartures.length - visibleTrekCount})
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default TreksPage;

