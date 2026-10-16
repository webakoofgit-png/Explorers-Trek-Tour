import { Link, useParams } from "react-router-dom";
import { Calendar, Check, Clock, Facebook, Mail, MapPin, Share2, Star, TrendingUp, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Layout from "@/components/Layout";
import { awards, brand, pickupPoints, treks } from "@/data/siteData";
import InternalPageHero from "@/components/InternalPageHero";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import TrekImageGallery from "@/components/TrekImageGallery";
import { sortByUpcomingDate } from "@/lib/trekDates";

const tabs = ["Photo/Video Gallery", "Overview", "Highlights", "Batches", "Itinerary", "Includes/Excludes", "Offers", "What To Bring", "FAQ", "Share"];

const TrekDetailPage = () => {
  const { id } = useParams();
  const trek = treks.find((item) => item.id === id);

  if (!trek) {
    return (
      <Layout>
        <div className="flex min-h-[60vh] items-center justify-center px-4 text-center">
          <div>
            <h1 className="font-heading text-3xl font-black">Event Not Found</h1>
            <Link to="/treks"><Button className="mt-4">Browse Events</Button></Link>
          </div>
        </div>
      </Layout>
    );
  }

  const similar = treks.filter((item) => item.id !== trek.id).slice(0, 3);
  const trekWhatsAppLink = `https://wa.me/91${brand.whatsapp}?text=${encodeURIComponent(
    `Hello Explorers! I would like to enquire about the ${trek.title} trek. Please share the next batch and booking details.`,
  )}`;
  const trekFaqs = [
    {
      question: `Who can join ${trek.title}?`,
      answer: `${trek.title} is planned for ${trek.ageGroup}. Please review the difficulty level (${trek.difficulty}) and contact us if you have any health or age-related questions.`,
    },
    {
      question: "What is included in the trek fee?",
      answer: trek.includes.join(", ") + ".",
    },
    {
      question: "What should I carry?",
      answer: "Carry trekking shoes, a water bottle, weather-appropriate clothing, a small backpack, personal medicines and a valid ID proof.",
    },
    {
      question: "How do I book a batch?",
      answer: "Choose an available batch and use Book Now, or message our team on WhatsApp for seat availability, pickup and payment details.",
    },
  ];

  return (
    <Layout>
      <InternalPageHero
        pageName={trek.title}
        eyebrow={trek.tourType}
        title={trek.title}
        images={[trek.image, ...trek.gallery]}
      >
        <div className="flex flex-wrap items-center gap-3 text-sm font-bold text-white/85">
          <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> {trek.duration}</span>
          <span className="flex items-center gap-2"><TrendingUp className="h-4 w-4" /> {trek.difficulty}</span>
          <span className="flex items-center gap-2"><MapPin className="h-4 w-4" /> {trek.location}</span>
          <a
            href={trekWhatsAppLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-4 py-2.5 text-xs font-black uppercase tracking-wider text-white transition hover:bg-[#20BD5A]"
          >
            <WhatsAppIcon className="h-4 w-4" /> WhatsApp Us
          </a>
        </div>
      </InternalPageHero>

      <nav className="relative z-20 border-y border-border bg-white/95 backdrop-blur md:sticky md:top-[8.35rem]">
        <div className="container mx-auto flex gap-2 overflow-x-auto px-4 py-3 no-scrollbar">
          {tabs.map((tab) => (
            <a key={tab} href={`#${tab.toLowerCase().replaceAll("/", "-").replaceAll(" ", "-")}`} className="whitespace-nowrap rounded-full bg-muted px-4 py-2 text-xs font-black text-muted-foreground hover:bg-primary hover:text-primary-foreground">
              {tab}
            </a>
          ))}
        </div>
      </nav>

      <div className="container mx-auto grid gap-8 px-4 py-10 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <main className="space-y-8">
          <section id="photo-video-gallery" className="rounded-lg border border-border bg-card p-5 shadow-sm">
            <TrekImageGallery images={[trek.image, ...trek.gallery]} title={trek.title} />
          </section>

          <section id="overview" className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <h2 className="font-heading text-2xl font-black text-foreground">Overview</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">{trek.overview}</p>
          </section>

          <section id="highlights" className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <h2 className="font-heading text-2xl font-black text-foreground">Highlights</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {trek.highlights.map((item) => <div key={item} className="flex gap-3 font-semibold text-foreground"><Check className="h-5 w-5 text-highlight" /> {item}</div>)}
            </div>
          </section>

          <section id="batches" className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <h2 className="font-heading text-2xl font-black text-foreground">Batches</h2>
            <div className="mt-4 overflow-hidden rounded-lg border border-border">
              {sortByUpcomingDate(trek.batches).map((batch) => (
                <div key={`${batch.label}-${batch.date}`} className="grid gap-3 border-b border-border p-4 last:border-b-0 sm:grid-cols-[1fr_1fr_1fr_auto] sm:items-center">
                  <strong>{batch.label}</strong>
                  <span>{batch.date}</span>
                  <span className="font-heading font-black text-primary">Rs.{batch.price}</span>
                  <Button size="sm" className="rounded-full gradient-highlight text-highlight-foreground">Book Now</Button>
                </div>
              ))}
            </div>
            <Button variant="outline" className="mt-4 rounded-lg">View More Batches Month-wise</Button>
          </section>

          <section id="itinerary" className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <h2 className="font-heading text-2xl font-black text-foreground">Itinerary</h2>
            <div className="mt-5 space-y-4">
              {trek.itinerary.map((day) => (
                <div key={day.day} className="rounded-lg bg-background p-4">
                  <div className="font-heading font-black text-primary">Day {day.day}: {day.title}</div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{day.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="includes-excludes" className="grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
              <h2 className="font-heading text-xl font-black">Includes</h2>
              <div className="mt-4 space-y-2">{trek.includes.map((item) => <p key={item} className="flex gap-2 text-sm"><Check className="h-4 w-4 text-highlight" /> {item}</p>)}</div>
            </div>
            <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
              <h2 className="font-heading text-xl font-black">Excludes</h2>
              <div className="mt-4 space-y-2">{trek.excludes.map((item) => <p key={item} className="flex gap-2 text-sm text-muted-foreground"><X className="h-4 w-4 text-destructive" /> {item}</p>)}</div>
            </div>
          </section>

          <section id="offers" className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <h2 className="font-heading text-2xl font-black">Offers and Social Links</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {["Early Bird", "Group Discount", "Membership Discount", "Repeater Discount"].map((offer) => <div key={offer} className="rounded-lg bg-secondary p-4 font-heading font-black text-primary">{offer}</div>)}
              <Button variant="outline" asChild>
                <a href={trekWhatsAppLink} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon className="mr-2 h-4 w-4" /> WhatsApp
                </a>
              </Button>
              <Button variant="outline"><Facebook className="mr-2 h-4 w-4" /> Facebook</Button>
              </div>
          </section>

          <section id="what-to-bring" className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <h2 className="font-heading text-2xl font-black">What To Bring / Things To Know</h2>
            <p className="mt-3 text-muted-foreground">Trekking shoes, rainwear, water bottle, personal medicines, small backpack, ID proof, and weather-appropriate clothing. Follow trek leader instructions throughout the event.</p>
          </section>

          <section id="faq" className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <h2 className="font-heading text-2xl font-black">Frequently Asked Questions</h2>
            <div className="mt-5 divide-y divide-border rounded-lg border border-border">
              {trekFaqs.map((faq) => (
                <details key={faq.question} className="group px-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-heading font-black text-foreground marker:content-none">
                    {faq.question}
                    <span className="text-xl leading-none text-primary transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="pb-4 text-sm leading-relaxed text-muted-foreground">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <h2 className="font-heading text-2xl font-black">Similar Treks</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {similar.map((item) => (
                <Link key={item.id} to={`/treks/${item.id}`} className="overflow-hidden rounded-lg border border-border">
                  <img src={item.image} alt={item.title} className="h-32 w-full object-cover" />
                  <div className="p-3 font-heading text-sm font-black">{item.title}</div>
                </Link>
              ))}
            </div>
          </section>

          <section className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <h2 className="font-heading text-2xl font-black">Awards Logos</h2>
            <div className="mt-4 flex flex-wrap gap-2">{awards.slice(0, 8).map((award) => <span key={award} className="rounded-full bg-muted px-3 py-1 text-xs font-black text-primary">{award}</span>)}</div>
          </section>
        </main>

        <aside className="space-y-5 lg:sticky lg:top-40 lg:self-start">
          <div className="rounded-lg border border-border bg-card p-6 shadow-xl">
            <div className="font-heading text-3xl font-black text-primary">Rs.{trek.price}</div>
            <p className="text-sm font-semibold text-muted-foreground">per person</p>
            <Button className="mt-5 w-full rounded-full gradient-highlight text-highlight-foreground">Book Now</Button>
            <div className="mt-5 space-y-2 text-sm">
              <p className="flex items-center gap-2"><Calendar className="h-4 w-4 text-primary" /> {trek.duration}</p>
              <p className="flex items-center gap-2"><Star className="h-4 w-4 text-primary" /> {trek.difficulty}</p>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
            <h3 className="font-heading font-black">Pickup Location</h3>
            <div className="mt-3 space-y-2">
              {pickupPoints.map((point) => <a key={point.name} href={point.map} target="_blank" rel="noopener noreferrer" className="block rounded-md bg-background px-3 py-2 text-sm font-semibold text-primary">{point.name}</a>)}
            </div>
          </div>

          <form className="rounded-lg border border-border bg-card p-5 shadow-sm">
            <h3 className="font-heading font-black">Enquiry Form</h3>
            <div className="mt-4 space-y-3">
              <Input placeholder="Name" />
              <Input placeholder="Phone" />
              <Input placeholder="Email" />
              <Textarea placeholder="Message" />
              <Button className="w-full rounded-full gradient-primary text-primary-foreground">Send Enquiry</Button>
            </div>
          </form>

          <div id="share" className="grid grid-cols-2 gap-3">
            <Button variant="outline"><Mail className="mr-2 h-4 w-4" /> Email</Button>
            <Button variant="outline"><Share2 className="mr-2 h-4 w-4" /> Share</Button>
          </div>
        </aside>
      </div>
    </Layout>
  );
};

export default TrekDetailPage;
