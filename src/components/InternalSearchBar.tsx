import { FormEvent, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";

const months = [
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

const eventTypes = [
  "Upcoming Events",
  "Weekend Trek",
  "Himalayan Trek",
  "Camping",
  "Tour",
  "Wildlife Tour",
  "Speciality Tour",
];

const InternalSearchBar = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [month, setMonth] = useState(searchParams.get("month") || "All Months");
  const [eventType, setEventType] = useState(searchParams.get("type") || "Upcoming Events");
  const isCampingSearch = searchParams.get("type")?.toLowerCase() === "camping";

  const openSchedule = (nextQuery = query, nextMonth = month, nextEventType = eventType) => {
    const params = new URLSearchParams();
    if (nextQuery.trim()) params.set("q", nextQuery.trim());
    if (nextMonth !== "All Months") params.set("month", nextMonth);
    if (nextEventType !== "Upcoming Events") params.set("type", nextEventType);
    const search = params.toString();
    navigate(`/treks${search ? `?${search}` : ""}`);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    openSchedule();
  };

  const resetSearch = () => {
    setQuery("");
    setMonth("All Months");
    setEventType("Upcoming Events");
    navigate("/treks");
  };

  return (
    <section
      className={`bg-background px-4 py-5 ${
        isCampingSearch ? "fixed left-0 right-0 top-[76px] z-40 border-y border-border shadow-md md:top-[90px]" : ""
      }`}
      aria-label="Search events"
    >
      <form
        onSubmit={handleSubmit}
        className="container mx-auto grid gap-3 rounded-2xl border border-[#e5dcc2] bg-[#fcfaf3] p-4 shadow-sm sm:grid-cols-2 lg:grid-cols-4 lg:p-5"
      >
        <label className="relative block">
          <span className="sr-only">Search event name</span>
          <button
            type="submit"
            className="absolute left-4 top-1/2 z-10 -translate-y-1/2 text-slate-500 transition-colors hover:text-primary"
            aria-label="Search events"
          >
            <Search className="h-5 w-5" />
          </button>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search event name..."
            className="h-12 w-full rounded-xl border border-[#e5dcc2] bg-white/70 pl-12 pr-4 text-base text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </label>

        <label>
          <span className="sr-only">Select month</span>
          <select
            value={month}
            onChange={(event) => {
              const nextMonth = event.target.value;
              setMonth(nextMonth);
              openSchedule(query, nextMonth, eventType);
            }}
            className="h-12 w-full rounded-xl border border-[#e5dcc2] bg-white/70 px-4 text-base font-semibold text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          >
            {months.map((item) => (
              <option key={item} value={item}>{item === "All Months" ? "All Months (Jan - Dec)" : item}</option>
            ))}
          </select>
        </label>

        <label>
          <span className="sr-only">Select event type</span>
          <select
            value={eventType}
            onChange={(event) => {
              const nextEventType = event.target.value;
              setEventType(nextEventType);
              openSchedule(query, month, nextEventType);
            }}
            className="h-12 w-full rounded-xl border border-[#e5dcc2] bg-white/70 px-4 text-base font-semibold text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          >
            {eventTypes.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </label>

        <button
          type="button"
          onClick={resetSearch}
          className="h-12 rounded-xl border border-[#e5dcc2] bg-white/70 px-5 font-heading text-xs font-black uppercase tracking-wider text-foreground transition hover:border-primary hover:bg-primary hover:text-white"
        >
          Reset Search
        </button>
      </form>
    </section>
  );
};

export default InternalSearchBar;
