import { FormEvent, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  CalendarDays,
  Check,
  ChevronDown,
  Clock,
  Facebook,
  Instagram,
  MapPin,
  MessageCircle,
  Mountain,
  Route,
  ShieldCheck,
  Sparkles,
  Users,
  Youtube,
  X,
} from "lucide-react";
import Layout from "@/components/Layout";
import InternalPageHero from "@/components/InternalPageHero";
import TrekImageGallery from "@/components/TrekImageGallery";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { brand, offers, officialSocialLinks, pickupPoints, Trek, treks } from "@/data/siteData";
import { getWhatsAppGroupLink } from "@/lib/siteSettings";
import { isTrekDatePast, sortByUpcomingDate } from "@/lib/trekDates";

type TrekInternalPageProps = {
  trek: Trek;
};

const sectionLinks = [
  ["gallery", "Gallery"],
  ["overview", "Overview"],
  ["highlights", "Highlights"],
  ["batches", "Batches"],
  ["itinerary", "Itinerary"],
  ["includes", "Includes / Excludes"],
  ["offers", "Offers"],
  ["packing", "What To Bring"],
  ["things-to-know", "Things To Know"],
] as const;

const pickupTimes: Record<string, string> = {
  "Explorers Office": "05:00 AM",
  Deccan: "05:15 AM",
  "Sancheti Hospital": "05:25 AM",
  "Nashik Phata": "05:50 AM",
  Moshi: "06:10 AM",
};

const standardPackingGroups = [
  {
    title: "Must Carry",
    items: ["Trekking shoes with strong grip", "2 litres of water", "Rainwear or poncho", "Personal medicines", "Valid photo ID"],
  },
  {
    title: "Useful in Journey",
    items: ["Light snacks", "Travel pillow", "Power bank", "Reusable food container", "Small waste bag"],
  },
  {
    title: "Useful While Trekking",
    items: ["20-30 litre backpack", "Quick-dry clothing", "Cap or head cover", "Extra socks", "Electrolyte sachets"],
  },
  {
    title: "Optional",
    items: ["Trekking pole", "Camera", "Sunglasses", "Insect repellent", "Compact towel"],
  },
];

const himalayanPackingGroups = [
  {
    title: "Must Carry",
    items: ["High-ankle trekking shoes", "Layered warm clothing", "Waterproof jacket", "Personal medicines", "Valid photo ID"],
  },
  {
    title: "Essential Gear",
    items: ["40-50 litre backpack", "Headlamp with spare cells", "Insulated water bottle", "Trekking pole", "Rain cover"],
  },
  {
    title: "Clothing",
    items: ["Thermal base layers", "Fleece and down jacket", "Quick-dry trek pants", "Woollen cap and gloves", "Extra socks"],
  },
  {
    title: "Optional",
    items: ["Camera", "Power bank", "Sunglasses", "Sunscreen", "Compact towel"],
  },
];

const policies = [
  {
    title: "Cancellation Policy",
    content: "Cancellation charges depend on how close the request is to departure. Contact the Explorers office before cancelling; the applicable deduction and eligible refund will be confirmed in writing.",
  },
  {
    title: "Discount Policy",
    content: "Only offers active for the selected batch are applicable. Discounts are confirmed before payment and cannot be assumed, exchanged for cash or combined unless explicitly stated.",
  },
  {
    title: "Rules During Event",
    content: "Follow trek-leader instructions, remain with the group, avoid alcohol and prohibited substances, respect local communities, and carry all personal waste back from the trail.",
  },
  {
    title: "FAQ",
    content: "First-time trekkers can join after reviewing the difficulty and fitness expectations. Contact the team before booking if you have an injury, medical condition or age-related concern.",
  },
  {
    title: "Terms & Conditions",
    content: "The itinerary may change because of weather, route access, government restrictions or safety considerations. The event leader's on-ground safety decision is final.",
  },
  {
    title: "Tips for Happy Trekking",
    content: "Sleep well before departure, keep your backpack light, hydrate regularly, wear tested footwear and maintain a comfortable pace instead of rushing the group.",
  },
];

const brandLinks = [
  ["Junior Explorers", "/programs/junior-explorers"],
  ["Lady Explorers", "/programs/lady-explorers"],
  ["Silver Explorers", "/programs/silver-explorers"],
  ["Explorers on Wheels", "/programs/on-wheels"],
  ["ATLAS Academy", "/atlas"],
] as const;

const affiliationLogos = [
  { label: "ATOAI India", src: "/award%20logos/ATOAI%20India.png" },
  { label: "MSME India", src: "/award%20logos/MSME%20India.jpeg" },
  { label: "TAAP Pune", src: "/award%20logos/TAAP%20Pune.jpeg" },
  { label: "Maharashtra Tourism", src: "/maharashtra.png" },
] as const;

const TrekInternalPage = ({ trek }: TrekInternalPageProps) => {
  const sortedBatches = useMemo(() => sortByUpcomingDate(trek.batches), [trek.batches]);
  const upcomingBatches = useMemo(() => sortedBatches.filter((batch) => !isTrekDatePast(batch.date)), [sortedBatches]);
  const displayedBatches = upcomingBatches.length > 0 ? upcomingBatches : sortedBatches;
  const pickupOptions = useMemo(
    () => trek.reporting.toLowerCase() === "pune to pune" ? pickupPoints : [{ name: trek.reporting, map: "" }],
    [trek.reporting],
  );
  const packingGroups = trek.tourType === "Himalayan Trek" ? himalayanPackingGroups : standardPackingGroups;
  const [showAllBatches, setShowAllBatches] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState(upcomingBatches[0]?.date || "Next available batch");
  const [selectedPickup, setSelectedPickup] = useState(pickupOptions[0]?.name || trek.reporting);
  const [travellers, setTravellers] = useState("1");
  const [bookingName, setBookingName] = useState("");
  const [bookingPhone, setBookingPhone] = useState("");
  const [enquiry, setEnquiry] = useState({ name: "", phone: "", email: "", message: "" });
  const visibleBatches = showAllBatches ? displayedBatches : displayedBatches.slice(0, 5);
  const similarTreks = useMemo(
    () => treks
      .filter((item) => item.id !== trek.id)
      .sort((first, second) => Number(second.tourType === trek.tourType) - Number(first.tourType === trek.tourType))
      .slice(0, 3),
    [trek.id, trek.tourType],
  );

  const openWhatsApp = (message: string) => {
    window.open(`https://wa.me/91${brand.whatsapp}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  const selectBatch = (date: string) => {
    setSelectedBatch(date);
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const submitBooking = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    openWhatsApp(
      `Hi Explorers, I want to book ${trek.title}.\nName: ${bookingName}\nPhone: ${bookingPhone}\nBatch: ${selectedBatch}\nPickup: ${selectedPickup}\nTravellers: ${travellers}`,
    );
  };

  const submitEnquiry = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    openWhatsApp(
      `Hi Explorers, I have an enquiry about ${trek.title}.\nName: ${enquiry.name}\nPhone: ${enquiry.phone}\nEmail: ${enquiry.email || "Not provided"}\nMessage: ${enquiry.message || "Please share complete details."}`,
    );
  };

  return (
    <Layout>
      <InternalPageHero
        pageName={trek.title}
        eyebrow={`${trek.tourType} | ${trek.tag}`}
        title={trek.title}
        subtitle={trek.description}
        images={[trek.image, ...trek.gallery]}
      >
        <div className="flex flex-wrap items-center gap-2 text-sm font-bold text-white/90">
          <span className="rounded-full bg-white/15 px-3 py-1.5 backdrop-blur"><Clock className="mr-1.5 inline h-4 w-4" />{trek.duration}</span>
          <span className="rounded-full bg-white/15 px-3 py-1.5 backdrop-blur"><Mountain className="mr-1.5 inline h-4 w-4" />{trek.difficulty}</span>
          <span className="rounded-full bg-white/15 px-3 py-1.5 backdrop-blur"><MapPin className="mr-1.5 inline h-4 w-4" />{trek.location}</span>
          <Badge className="border-0 bg-highlight px-3 py-1.5 text-highlight-foreground">{trek.tag}</Badge>
        </div>
      </InternalPageHero>

      <nav className="relative z-20 border-y border-border bg-background/95 shadow-sm backdrop-blur md:sticky md:top-[8.35rem]">
        <div className="container mx-auto flex gap-2 overflow-x-auto px-4 py-3 no-scrollbar">
          {sectionLinks.map(([id, label]) => (
            <a key={id} href={`#${id}`} className="whitespace-nowrap rounded-full border border-border bg-card px-4 py-2 text-xs font-black uppercase tracking-wide text-foreground transition hover:border-primary hover:bg-primary hover:text-primary-foreground">
              {label}
            </a>
          ))}
        </div>
      </nav>

      <div className="container mx-auto grid gap-8 px-4 py-10 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <main className="min-w-0 space-y-8">
          <section id="gallery" className="scroll-mt-40 rounded-xl border border-border bg-card p-5 shadow-sm">
            <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
              <div><p className="text-xs font-black uppercase tracking-widest text-accent">See the experience</p><h2 className="mt-1 font-heading text-2xl font-black">Photo Gallery</h2></div>
              <a href={officialSocialLinks.youtube} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-black text-primary"><Youtube className="h-4 w-4" /> Watch trek videos</a>
            </div>
            <TrekImageGallery images={[trek.image, ...trek.gallery]} title={trek.title} />
          </section>

          <section id="overview" className="scroll-mt-40 rounded-xl border border-border bg-card p-6 shadow-sm">
            <p className="text-xs font-black uppercase tracking-widest text-accent">About the trek</p>
            <h2 className="mt-1 font-heading text-2xl font-black">Overview</h2>
            <p className="mt-4 leading-7 text-muted-foreground">{trek.overview}</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {[
                [Clock, "Duration", trek.duration],
                [Mountain, "Difficulty", trek.difficulty],
                [Sparkles, "Endurance", trek.endurance],
                [Users, "Age Group", trek.ageGroup],
              ].map(([Icon, label, value]) => {
                const DetailIcon = Icon as typeof Clock;
                return <div key={String(label)} className="rounded-lg bg-background p-4"><DetailIcon className="h-5 w-5 text-primary" /><div className="mt-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">{String(label)}</div><div className="mt-1 font-heading font-black">{String(value)}</div></div>;
              })}
            </div>
          </section>

          <section id="highlights" className="scroll-mt-40 rounded-xl border border-border bg-card p-6 shadow-sm">
            <p className="text-xs font-black uppercase tracking-widest text-accent">Why choose this trek</p>
            <h2 className="mt-1 font-heading text-2xl font-black">Highlights</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {trek.highlights.map((item) => <div key={item} className="flex items-start gap-3 rounded-lg bg-background p-4 font-semibold"><span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground"><Check className="h-4 w-4" /></span>{item}</div>)}
            </div>
          </section>

          <section id="batches" className="scroll-mt-40 overflow-hidden rounded-xl border border-border bg-card shadow-sm">
            <div className="bg-primary p-6 text-primary-foreground"><p className="text-xs font-black uppercase tracking-widest text-primary-foreground/75">{upcomingBatches.length > 0 ? "Choose your date" : "Reference schedule"}</p><h2 className="mt-1 font-heading text-2xl font-black">{upcomingBatches.length > 0 ? "Upcoming Batches" : "Previous Batches"}</h2>{upcomingBatches.length === 0 && <p className="mt-2 text-sm text-primary-foreground/80">New departure dates are being updated. Ask our team for the next available batch.</p>}</div>
            <div className="divide-y divide-border">
              {visibleBatches.map((batch) => (
                <div key={`${batch.label}-${batch.date}`} className="grid gap-3 p-4 sm:grid-cols-[1fr_1.3fr_.8fr_auto] sm:items-center">
                  <div><div className="font-heading font-black">{batch.label}</div><div className={`mt-1 text-xs font-bold ${upcomingBatches.length > 0 ? "text-emerald-700" : "text-muted-foreground"}`}>{upcomingBatches.length > 0 ? batch.seats || "Open" : "Completed"}</div></div>
                  <span className="flex items-center gap-2 text-sm font-semibold"><CalendarDays className="h-4 w-4 text-primary" />{batch.date}</span>
                  <span className="font-heading text-xl font-black text-primary">Rs.{batch.price}</span>
                  <Button type="button" size="sm" onClick={() => selectBatch(upcomingBatches.length > 0 ? batch.date : "Next available batch")} className="rounded-lg gradient-highlight font-black text-highlight-foreground">{upcomingBatches.length > 0 ? "Book Now" : "Ask Next Date"}</Button>
                </div>
              ))}
            </div>
            {displayedBatches.length > 5 && <button type="button" onClick={() => setShowAllBatches((value) => !value)} className="flex w-full items-center justify-center gap-2 border-t border-border px-4 py-4 text-sm font-black text-primary hover:bg-muted"><ChevronDown className={`h-4 w-4 transition ${showAllBatches ? "rotate-180" : ""}`} />{showAllBatches ? "Show fewer batches" : `View ${displayedBatches.length - 5} more batches`}</button>}
          </section>

          <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h2 className="font-heading text-2xl font-black">Important Trek Information</h2>
            <div className="mt-5 grid gap-x-8 gap-y-4 md:grid-cols-2">
              {[
                ["Last date of booking", "3 days before departure or until seats fill"],
                ["Reporting point", trek.reporting],
                ["Expected return", "Confirmed in the pre-departure briefing"],
                ["Batch limit", "Confirmed for the selected departure"],
                ["Activity time", "As detailed in the event itinerary"],
                ["Parking", "At owner's risk near the reporting area"],
              ].map(([label, value]) => <div key={label} className="border-b border-border pb-3"><div className="text-xs font-black uppercase tracking-wider text-muted-foreground">{label}</div><div className="mt-1 font-semibold">{value}</div></div>)}
            </div>
            <div className="mt-5 flex items-start gap-3 rounded-lg bg-primary/5 p-4"><Route className="mt-0.5 h-5 w-5 shrink-0 text-primary" /><p className="text-sm leading-6"><strong>Route:</strong> Reporting from {trek.reporting}. The final route, stops and timing are shared during the pre-departure briefing.</p></div>
          </section>

          <section id="itinerary" className="scroll-mt-40 rounded-xl border border-border bg-card p-6 shadow-sm">
            <p className="text-xs font-black uppercase tracking-widest text-accent">Planned event flow</p><h2 className="mt-1 font-heading text-2xl font-black">Itinerary</h2>
            <div className="relative mt-6 space-y-1 before:absolute before:bottom-4 before:left-[3.7rem] before:top-4 before:w-px before:bg-border">
              {trek.itinerary.map((item) => <div key={`${item.day}-${item.title}`} className="relative grid grid-cols-[6rem_1fr] gap-4 py-3"><div className="z-10 h-fit rounded-full bg-primary px-2 py-1 text-center text-xs font-black text-primary-foreground">Day {item.day}</div><div><h3 className="font-heading font-black">{item.title}</h3><p className="mt-1 text-sm leading-6 text-muted-foreground">{item.description}</p></div></div>)}
            </div>
          </section>

          <section id="includes" className="scroll-mt-40 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-6"><h2 className="font-heading text-xl font-black text-emerald-900">Includes</h2><div className="mt-4 space-y-3">{trek.includes.map((item) => <p key={item} className="flex gap-2 text-sm text-emerald-950"><Check className="h-4 w-4 shrink-0 text-emerald-700" />{item}</p>)}</div></div>
            <div className="rounded-xl border border-red-200 bg-red-50/60 p-6"><h2 className="font-heading text-xl font-black text-red-900">Excludes</h2><div className="mt-4 space-y-3">{trek.excludes.map((item) => <p key={item} className="flex gap-2 text-sm text-red-950"><X className="h-4 w-4 shrink-0 text-red-700" />{item}</p>)}</div></div>
          </section>

          <section id="offers" className="scroll-mt-40 rounded-xl border border-border bg-card p-6 shadow-sm">
            <p className="text-xs font-black uppercase tracking-widest text-accent">Save on eligible bookings</p><h2 className="mt-1 font-heading text-2xl font-black">Offers</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">{offers.map((offer) => <div key={offer.name} className="rounded-lg border border-primary/20 bg-primary/5 p-4"><Sparkles className="h-5 w-5 text-primary" /><h3 className="mt-3 font-heading font-black">{offer.name}</h3><p className="mt-1 text-sm leading-6 text-muted-foreground">{offer.value}</p></div>)}</div>
            <p className="mt-4 text-xs leading-5 text-muted-foreground">Offer eligibility and combination rules are confirmed by the Explorers team before payment.</p>
          </section>

          <section id="packing" className="scroll-mt-40 rounded-xl border border-border bg-card p-6 shadow-sm">
            <p className="text-xs font-black uppercase tracking-widest text-accent">Pack light, trek comfortably</p><h2 className="mt-1 font-heading text-2xl font-black">What To Bring</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{packingGroups.map((group) => <div key={group.title} className="rounded-lg border border-border bg-background p-4"><h3 className="font-heading font-black text-primary">{group.title}</h3><ul className="mt-3 space-y-2">{group.items.map((item) => <li key={item} className="flex gap-2 text-sm text-muted-foreground"><Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />{item}</li>)}</ul></div>)}</div>
          </section>

          <section className="rounded-xl border border-amber-200 bg-amber-50 p-6">
            <div className="flex items-start gap-3"><MessageCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" /><div><h2 className="font-heading text-xl font-black text-amber-950">Please Note</h2><ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-6 text-amber-950/80"><li>A departure WhatsApp group is created before the event for coordinator details, pickup GPS points and important live updates.</li><li>Tell the office while booking if you do not want your phone number added to the group.</li><li>Weather or safety conditions may require the trek leader to modify the route or timings.</li></ol></div></div>
          </section>

          <div className="flex items-start gap-3 rounded-xl bg-primary p-5 text-primary-foreground"><ShieldCheck className="mt-0.5 h-6 w-6 shrink-0" /><div><div className="font-heading font-black">Safety First</div><p className="mt-1 text-sm leading-6 text-primary-foreground/80">Professionally guided trek with route briefing, group management and first-aid support.</p></div></div>

          <section id="things-to-know" className="scroll-mt-40 rounded-xl border border-border bg-card p-6 shadow-sm">
            <p className="text-xs font-black uppercase tracking-widest text-accent">Read before booking</p><h2 className="mt-1 font-heading text-2xl font-black">Things To Know</h2>
            <Accordion type="single" collapsible className="mt-4 rounded-lg border border-border px-4">{policies.map((policy) => <AccordionItem key={policy.title} value={policy.title}><AccordionTrigger className="text-left font-heading font-black hover:no-underline">{policy.title}</AccordionTrigger><AccordionContent className="leading-6 text-muted-foreground">{policy.content}</AccordionContent></AccordionItem>)}</Accordion>
          </section>

        </main>

        <aside className="space-y-5 lg:self-start">
          <section className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
            <div className="border-b border-border px-5 py-4">
              <p className="text-xs font-black uppercase tracking-widest text-accent">Watch on this page</p>
              <h2 className="mt-1 font-heading text-xl font-black">Video Gallery</h2>
            </div>
            <div className="aspect-video bg-slate-900">
              <iframe
                className="h-full w-full"
                src={officialSocialLinks.youtubeEmbed}
                title="Explorers Treks and Tours YouTube videos"
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            <div className="grid gap-2 p-4">
              <a href={getWhatsAppGroupLink()} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#25D366] px-4 text-center text-xs font-black uppercase tracking-wide text-white"><WhatsAppIcon className="h-5 w-5" />Join Our WhatsApp Group</a>
              <a href={officialSocialLinks.instagram} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center justify-center gap-2 rounded-lg bg-pink-600 px-4 text-center text-xs font-black uppercase tracking-wide text-white"><Instagram className="h-5 w-5" />Follow Us on Instagram</a>
              <a href={officialSocialLinks.facebook} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center justify-center gap-2 rounded-lg bg-blue-700 px-4 text-center text-xs font-black uppercase tracking-wide text-white"><Facebook className="h-5 w-5" />Follow Us on Facebook</a>
            </div>
          </section>

          <section className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <p className="text-xs font-black uppercase tracking-widest text-accent">You may also like</p>
            <h2 className="mt-1 font-heading text-xl font-black">Similar Treks</h2>
            <div className="mt-4 grid gap-4">
              {similarTreks.map((item) => (
                <Link key={item.id} to={`/treks/${item.id}`} className="group grid grid-cols-[6.5rem_1fr] overflow-hidden rounded-lg border border-border bg-background transition hover:border-primary hover:shadow-md">
                  <img src={item.image} alt={item.title} className="h-full min-h-28 w-full object-cover transition duration-300 group-hover:scale-105" />
                  <div className="p-3">
                    <Badge variant="secondary" className="text-[0.6rem]">{item.tag}</Badge>
                    <h3 className="mt-2 font-heading text-sm font-black leading-snug group-hover:text-primary">{item.title}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">{item.duration} | Rs.{item.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <p className="text-xs font-black uppercase tracking-widest text-accent">Other Brands</p>
            <h2 className="mt-1 font-heading text-xl font-black">Explore With Us</h2>
            <div className="mt-4 grid gap-2">{brandLinks.map(([label, href]) => <Link key={label} to={href} className="rounded-lg border border-border bg-background px-3 py-2.5 text-center text-sm font-bold transition hover:border-primary hover:bg-primary hover:text-primary-foreground">{label}</Link>)}</div>
          </section>

          <section className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <p className="text-xs font-black uppercase tracking-widest text-accent">Trusted & Recognised</p>
            <h2 className="mt-1 font-heading text-xl font-black">Awards & Affiliations</h2>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {affiliationLogos.map((item) => (
                <div key={item.label} className="flex min-h-24 items-center justify-center rounded-lg border border-border bg-white p-3">
                  <img src={item.src} alt={item.label} loading="lazy" className="max-h-16 w-full object-contain" />
                </div>
              ))}
            </div>
          </section>

          <form onSubmit={submitEnquiry} className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <p className="text-xs font-black uppercase tracking-widest text-accent">Need more details?</p>
            <h2 className="mt-1 font-heading text-xl font-black">Enquire About This Trek</h2>
            <div className="mt-4 space-y-3">
              <Input required placeholder="Name" value={enquiry.name} onChange={(event) => setEnquiry({ ...enquiry, name: event.target.value })} />
              <Input required type="tel" placeholder="Phone" value={enquiry.phone} onChange={(event) => setEnquiry({ ...enquiry, phone: event.target.value })} />
              <Input type="email" placeholder="Email" value={enquiry.email} onChange={(event) => setEnquiry({ ...enquiry, email: event.target.value })} />
              <Textarea placeholder="Your question" value={enquiry.message} onChange={(event) => setEnquiry({ ...enquiry, message: event.target.value })} />
              <Button type="submit" variant="outline" className="w-full border-primary font-black text-primary"><MessageCircle className="mr-2 h-4 w-4" />Send Enquiry</Button>
            </div>
          </form>

          <form id="booking" onSubmit={submitBooking} className="scroll-mt-40 rounded-xl border border-primary/30 bg-card p-5 shadow-xl">
            <p className="text-xs font-black uppercase tracking-widest text-accent">Book Now</p><div className="mt-1 font-heading text-3xl font-black text-primary">Rs.{trek.price}</div><p className="text-xs font-semibold text-muted-foreground">per explorer</p>
            <div className="mt-5 space-y-3">
              <Input required placeholder="Your name" value={bookingName} onChange={(event) => setBookingName(event.target.value)} />
              <Input required type="tel" placeholder="Mobile number" value={bookingPhone} onChange={(event) => setBookingPhone(event.target.value)} />
              <label className="grid gap-1.5 text-xs font-bold text-muted-foreground">Batch<select required value={selectedBatch} onChange={(event) => setSelectedBatch(event.target.value)} className="h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground">{upcomingBatches.length === 0 && <option>Next available batch</option>}{upcomingBatches.map((batch) => <option key={batch.date} value={batch.date}>{batch.date} - Rs.{batch.price}</option>)}</select></label>
              <label className="grid gap-1.5 text-xs font-bold text-muted-foreground">Pickup / reporting point<select required value={selectedPickup} onChange={(event) => setSelectedPickup(event.target.value)} className="h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground">{pickupOptions.map((point) => <option key={point.name} value={point.name}>{point.name}{pickupTimes[point.name] ? ` - ${pickupTimes[point.name]}` : ""}</option>)}</select></label>
              <Input required type="number" min="1" max="15" aria-label="Number of travellers" value={travellers} onChange={(event) => setTravellers(event.target.value)} />
              <Button type="submit" className="w-full rounded-lg gradient-highlight font-heading font-black text-highlight-foreground"><WhatsAppIcon className="mr-2 h-4 w-4" />Book on WhatsApp</Button>
            </div>
          </form>
        </aside>
      </div>
    </Layout>
  );
};

export default TrekInternalPage;
