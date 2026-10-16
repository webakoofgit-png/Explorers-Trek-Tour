import { useMemo, useState } from "react";
import { CalendarDays, Search, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { globalSchedule } from "@/data/siteData";

interface GlobalSearchBarProps {
  reserveTop?: boolean;
}

const monthsList = [
  "All Months",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const categoriesList = [
  "Upcoming Events",
  "Weekend Treks",
  "Junior Explorers",
  "Lady Explorers",
  "Silver Explorers",
  "Explorers on Wheels",
  "Camping",
  "Himalayan Treks",
  "School Tours",
  "Corporate Tours",
  "Group Tours",
  "Fix Departure Tours",
  "Jungle Safari",
  "Mountain Run",
  "Customised Packages",
  "Tours Out of Maharashtra",
  "Offbeat Tours",
  "ATLAS Training Academy",
];

const GlobalSearchBar = ({ reserveTop = true }: GlobalSearchBarProps) => {
  const [selectedCategory, setSelectedCategory] = useState("Upcoming Events");
  const [selectedMonth, setSelectedMonth] = useState("All Months");
  const [searchQuery, setSearchQuery] = useState("");

  const visibleTypes = useMemo(() => {
    return globalSchedule.filter((item) => {
      // Category Filter
      let matchesCategory = true;
      if (selectedCategory !== "Upcoming Events") {
        if (selectedCategory === "Weekend Treks") {
          matchesCategory = item.type === "Weekend Trek";
        } else if (selectedCategory === "Himalayan Treks") {
          matchesCategory = item.type === "Himalayan Trek";
        } else if (selectedCategory === "Camping") {
          matchesCategory = item.type === "Camping";
        } else {
          const text = `${item.title} ${item.type}`.toLowerCase();
          matchesCategory = text.includes(selectedCategory.toLowerCase());
        }
      }

      // Month Filter (Item 8: January to December all 12 Months)
      let matchesMonth = true;
      if (selectedMonth !== "All Months") {
        matchesMonth = item.month.toLowerCase() === selectedMonth.toLowerCase();
      }

      // Search Query Filter
      let matchesQuery = true;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        matchesQuery =
          item.title.toLowerCase().includes(query) ||
          item.type.toLowerCase().includes(query) ||
          item.month.toLowerCase().includes(query) ||
          item.date.toLowerCase().includes(query);
      }

      return matchesCategory && matchesMonth && matchesQuery;
    });
  }, [selectedCategory, selectedMonth, searchQuery]);

  return (
    <section
      id="upcoming-tours-calendar"
      className={`relative z-30 border-y border-border bg-background/95 shadow-sm backdrop-blur md:sticky md:top-20 ${
        reserveTop ? "mt-16 md:mt-20" : ""
      }`}
    >
      <div className="container mx-auto px-4 py-4 md:py-6">
        <div className="rounded-2xl border border-border bg-card p-4 card-shadow lg:p-6">
          {/* Top Search & Filter Bar (Follow foliageoutdoors style) */}
          <div className="mb-6 rounded-xl border border-border bg-background p-4">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {/* Event Name Search Input */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search event name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 text-sm"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* Month Dropdown (January to December - All 12 Months) */}
              <div>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {monthsList.map((month) => (
                    <option key={month} value={month}>
                      {month === "All Months" ? "All Months (Jan - Dec)" : month}
                    </option>
                  ))}
                </select>
              </div>

              {/* Category Dropdown (Clean dropdown without "Tour Type:" text - Item 6) */}
              <div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {categoriesList.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Reset Filters */}
              <div>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedCategory("Upcoming Events");
                    setSelectedMonth("All Months");
                    setSearchQuery("");
                  }}
                  className="w-full rounded-md font-bold uppercase tracking-wider text-xs"
                >
                  Reset Search
                </Button>
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)]">
            {/* Left Sidebar: Our All Filters (Item 9) */}
            <aside className="rounded-xl border border-border bg-background p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-accent">Our Filters</p>
                  <h2 className="mt-1 font-heading text-lg font-extrabold text-foreground uppercase">
                    All Categories
                  </h2>
                </div>
              </div>

              <div className="mt-4">
                <Link to="/treks" className="block">
                  <Button className="h-11 w-full rounded-lg gradient-highlight font-extrabold uppercase text-xs tracking-wider text-highlight-foreground">
                    <CalendarDays className="mr-2 h-4 w-4" />
                    View Full Calendar
                  </Button>
                </Link>
              </div>

              <div className="mt-4">
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Select Category</p>
                <div className="mt-3 grid gap-1.5 max-h-[480px] overflow-y-auto pr-1">
                  {categoriesList.map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setSelectedCategory(category)}
                      className={`rounded-lg border px-3 py-2.5 text-left transition-colors ${
                        selectedCategory === category
                          ? "border-primary bg-primary/10 text-primary font-black"
                          : "border-border/60 bg-background text-foreground hover:bg-muted"
                      }`}
                    >
                      <span className="block font-heading text-xs font-bold uppercase tracking-[0.1em]">
                        {category}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </aside>

            {/* Main Schedule Listing */}
            <main className="min-w-0">
              <div className="flex flex-col gap-3 border-b border-border pb-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-accent">Upcoming Events</p>
                  <h2 className="mt-1 font-heading text-2xl font-black uppercase text-foreground">
                    Showing {visibleTypes.length} of {globalSchedule.length} Trips
                  </h2>
                </div>
                {(selectedMonth !== "All Months" || selectedCategory !== "Upcoming Events" || searchQuery) && (
                  <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-muted-foreground">
                    <span>Active Filters:</span>
                    {selectedCategory !== "Upcoming Events" && (
                      <span className="rounded-full bg-primary/10 px-2.5 py-1 text-primary">
                        {selectedCategory}
                      </span>
                    )}
                    {selectedMonth !== "All Months" && (
                      <span className="rounded-full bg-accent/20 px-2.5 py-1 text-accent-foreground">
                        {selectedMonth}
                      </span>
                    )}
                    {searchQuery && (
                      <span className="rounded-full bg-muted px-2.5 py-1 text-foreground">
                        "{searchQuery}"
                      </span>
                    )}
                  </div>
                )}
              </div>

              <div className="mt-5 space-y-4">
                <div className="hidden rounded-lg bg-muted/60 px-4 py-3 text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground md:grid md:grid-cols-[9rem_minmax(0,1.2fr)_10rem_5rem]">
                  <span>Date</span>
                  <span>Event</span>
                  <span>Category</span>
                  <span>Year</span>
                </div>

                <div className="grid gap-2">
                  {visibleTypes.map((item) => (
                    <div
                      key={`${item.date}-${item.title}`}
                      className="grid gap-2 rounded-lg border border-border bg-background p-4 md:grid-cols-[9rem_minmax(0,1.2fr)_10rem_5rem] md:items-center hover:border-primary/50 transition-colors"
                    >
                      <span className="font-heading text-sm font-bold text-primary">{item.date}</span>
                      <span className="font-bold text-foreground">{item.title}</span>
                      <span className="inline-flex w-fit rounded-full bg-muted px-3 py-1 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                        {item.type}
                      </span>
                      <span className="text-sm font-semibold text-muted-foreground">{item.year}</span>
                    </div>
                  ))}
                </div>

                {visibleTypes.length === 0 && (
                  <div className="rounded-lg border border-dashed border-border p-10 text-center text-muted-foreground">
                    <Search className="mx-auto mb-2 h-6 w-6" />
                    <p className="font-bold text-foreground">No matching events found</p>
                    <p className="text-xs mt-1">Try resetting the month or category search filters.</p>
                  </div>
                )}
              </div>
            </main>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobalSearchBar;
