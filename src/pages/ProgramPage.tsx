import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, CheckCircle2, MapPin, Sparkles, Users } from "lucide-react";
import Layout from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { programDirectory, specialPrograms, tourCategoryFilters } from "@/data/siteData";
import InternalPageHero from "@/components/InternalPageHero";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";

const pageContent = {
  "group-tours": {
    eyebrow: "Tours",
    heading: "Handpicked Tours Across India and Beyond",
    intro:
      "Choose from fixed departures, family holidays, heritage circuits, pilgrim routes, wildlife breaks, coastal escapes and fully customised domestic or international tours.",
    enquiryTitle: "Customize Your Tour",
    filters: ["Domestic Tour", "International Tour", "Wildlife Safari", "Corporate Tour", "School Tour", "Honeymoon Tour"],
    highlights: [
      "Fixed departure group tours with clear dates",
      "Customised domestic and international packages",
      "Hotel, transport, food and sightseeing coordination",
      "Family, school, corporate and private group planning",
      "Wildlife, heritage, coastal and pilgrimage itineraries",
      "Experienced Explorers support from enquiry to return",
    ],
    cards: [
      { title: "Malvan Tarkarli", meta: "Kokan beaches | 3-4 days", desc: "Snorkelling, beaches, seafood, Sindhudurg Fort and relaxed coastal stays." },
      { title: "Gokarna-Murudeshwar", meta: "Coastal Karnataka | 4 days", desc: "Temple visits, beaches, viewpoints and comfortable road-trip style travel." },
      { title: "Hampi-Badami", meta: "Heritage circuit | 4-5 days", desc: "UNESCO ruins, caves, temples, stories and expert-led sightseeing." },
      { title: "Ujjain-Omkareshwar", meta: "Pilgrimage | 3 days", desc: "Jyotirlinga darshan, comfortable travel planning and group coordination." },
      { title: "Wildlife Tours", meta: "Tadoba, Pench, Kanha", desc: "Safari bookings, nature stays and wildlife-focused group experiences." },
      { title: "Customised International", meta: "Private groups", desc: "Nepal, Bhutan, Bali, Maldives and international holidays shaped around your dates." },
    ],
    process: ["Select destination", "Share date and group size", "Get itinerary and costing", "Confirm booking", "Travel with Explorers support"],
  },
  "school-tours": {
    eyebrow: "School Tours",
    heading: "Safe Educational Trips & Outdoor Learning",
    intro:
      "School tours, adventure camps and educational outings planned with safety-first logistics, trained leaders and teacher-friendly coordination.",
    enquiryTitle: "Plan a School Tour",
    filters: ["Student Educational Tour", "Teacher Picnic", "One Day School Tour", "Overnight School Tour", "Adventure Camp"],
    highlights: [
      "Age-appropriate educational, adventure and outdoor-learning programs",
      "Certified leaders, first-aid support and structured safety protocols",
      "Comfortable transport, hygienic meals and carefully selected stays",
      "Teacher-friendly planning and end-to-end tour coordination",
      "Custom plans for schools, colleges and student groups",
      "Clear communication for parents, teachers and organisers",
    ],
    cards: [
      { title: "One Day Educational Tours", meta: "Learning beyond classrooms", desc: "Well-paced day outings with age-appropriate activities, travel and meal planning." },
      { title: "Adventure & Nature Camps", meta: "Outdoor learning", desc: "Trekking, camping, team games and guided nature activities with trained leaders." },
      { title: "Overnight School Tours", meta: "2-3 day programs", desc: "Comfortable stays, safe transport and engaging itineraries for school groups." },
      { title: "Wildlife & Eco Tours", meta: "Nature education", desc: "Responsible wildlife, conservation and outdoor observation experiences." },
      { title: "Teacher Picnics", meta: "Staff outings", desc: "Relaxed team outings and customised experiences for teachers and school staff." },
      { title: "College Group Tours", meta: "Student groups", desc: "Adventure, travel and leadership-focused tours for college groups." },
    ],
    process: ["Choose tour type", "Share class, group size and dates", "Receive itinerary and costing", "Confirm school details", "Travel safely with Explorers"],
  },
  "women-on-trails": {
    eyebrow: "Speciality Tours",
    heading: "Curated Experiences For Every Explorer",
    intro:
      "Speciality Tours are designed around age, comfort, confidence, community and style of travel: Junior Explorers, Women on Trails, Silver Explorers and Explorers on Wheels.",
    enquiryTitle: "Join a Speciality Batch",
    filters: ["Women on Trails", "Junior Explorers", "Silver Explorers", "Explorers on Wheels", "Mountain Run", "Camping"],
    highlights: [
      "Women-only treks and tours with trusted group support",
      "Junior Explorers programs for 8-16 years",
      "Silver Explorers batches for 40+ travellers",
      "Bicycle, bike and caravan trips under Explorers on Wheels",
      "Mountain Run events for fitness and trail lovers",
      "Safe, friendly batches with clear communication",
    ],
    cards: [
      { title: "Women on Trails", meta: "Women special", desc: "Treks, tours and camps planned for comfort, confidence and community." },
      { title: "Junior Explorers", meta: "8-16 years", desc: "Outdoor learning, camps, discipline, nature education and adventure activities." },
      { title: "Silver Explorers", meta: "40+ years", desc: "Comfortable pace, thoughtful itineraries and carefully managed travel plans." },
      { title: "Explorers on Wheels", meta: "Bike | Bicycle | Caravan", desc: "Road journeys, cycling plans and scenic routes for wheels-based adventures." },
      { title: "Mountain Run", meta: "Trail running", desc: "Fitness, trail movement and mountain events in natural terrain." },
      { title: "Custom Special Batches", meta: "Private groups", desc: "Special group plans for families, communities, schools and organisations." },
    ],
    process: ["Choose program type", "Check age and comfort level", "Pick batch or custom date", "Confirm pickup and payment", "Explore with the right group"],
  },
  "himalayan-explorers": {
    eyebrow: "Himalayan Treks",
    heading: "High-Altitude Himalayan Expeditions & Treks",
    intro:
      "Guided Himalayan journeys across Himachal, Uttarakhand, Jammu & Kashmir and Nepal led by certified mountain leaders with safety-first preparation.",
    enquiryTitle: "Enquire for Himalayan Treks",
    filters: ["Himalayan Trek", "Snow Trek", "High Altitude Trek", "Summits"],
    highlights: [
      "Kedarkantha, Hampta Pass, Kuari Pass & Valley of Flowers",
      "Certified trek leaders and high-altitude emergency protocols",
      "Comprehensive fitness guidance and equipment checklists",
      "Nutritious meals, camping gear, and porter management",
      "Small batch sizes for personalized care and safety",
    ],
    cards: [
      { title: "Kedarkantha Trek", meta: "Uttarakhand | 6 Days", desc: "Classic winter snow summit trek with pine forests and panoramic mountain views." },
      { title: "Hampta Pass Trek", meta: "Himachal | 5 Days", desc: "Crossover trek from lush Kullu valley to dramatic desert mountain landscape of Lahaul." },
      { title: "Kuari Pass Trek", meta: "Uttarakhand | 6 Days", desc: "Spectacular views of Nanda Devi, Dronagiri and snow-capped Himalayan peaks." },
      { title: "Valley of Flowers", meta: "Uttarakhand | 6 Days", desc: "UNESCO World Heritage floral valley trek with pristine lakes and sacred trails." },
    ],
    process: ["Select Himalayan trek", "Get preparation guide", "Attend briefing batch", "Confirm booking", "Conquer the Himalayas"],
  },
  "junior-explorers": {
    eyebrow: "Junior Explorers",
    heading: "Specially Designed For Aged 8 to 16 Years",
    intro:
      "Outdoor learning programs, adventure camps, nature education, team building, camping skills and confidence building for children.",
    enquiryTitle: "Enroll Junior Explorer",
    filters: ["Summer Camp", "Winter Camp", "One Day Adventure", "Nature Trail"],
    highlights: [
      "Specially designed for children aged 8 to 16 years",
      "Trained child-friendly instructors and safety instructors",
      "Outdoor survival skills, tent pitching, and compass navigation",
      "Screen-free interactive activities, games and teamwork",
    ],
    cards: [
      { title: "Junior Sahyadri Camp", meta: "8-16 years | 2 Days", desc: "Tent stays, star-gazing, knot-tying and nature trails built for kids." },
      { title: "Adventure Leadership Camp", meta: "10-16 years | 3 Days", desc: "Rappelling, obstacle courses, team games and leadership modules." },
    ],
    process: ["Select age program", "Review safety guidelines", "Share child details", "Confirm booking", "Empower young adventurers"],
  },
  "silver-explorers": {
    eyebrow: "Silver Explorers",
    heading: "Comfortable Journeys Curated For Aged 40+ Years",
    intro:
      "Carefully paced treks, stays, pilgrimage tours and nature escapes designed around comfort, health, leisure and camaraderie.",
    enquiryTitle: "Plan Silver Explorers Trip",
    filters: ["Gentle Treks", "Heritage Tours", "Nature Stays", "Pilgrimage"],
    highlights: [
      "Curated specifically for travellers aged 40+ years",
      "Gradual pacing, comfortable hotel stays and delicious local food",
      "Dedicated tour managers and medical first-aid assistance",
    ],
    cards: [
      { title: "Silver Heritage Trail", meta: "40+ years | 3 Days", desc: "Easy walks, cultural exploration and relaxed evening gatherings." },
      { title: "Coastal Breeze Retreat", meta: "40+ years | 4 Days", desc: "Beaches, gentle sightseeing and comfortable resort accommodations." },
    ],
    process: ["Select destination", "Check comfort level", "Book batch", "Travel with peace of mind"],
  },
};

const tourRegions = [
  { name: "West India", description: "Konkan, Goa, Gujarat and Maharashtra escapes", image: "/images/hero-camping.webp", types: ["Domestic Tour", "Wildlife Safari", "Honeymoon Tour"] },
  { name: "South India", description: "Coastal Karnataka, Kerala and Tamil Nadu", image: "/images/hero-mountains.webp", types: ["Domestic Tour", "Honeymoon Tour", "Wildlife Safari"] },
  { name: "North India", description: "Himalayas, heritage and pilgrimage routes", image: "/images/manali-camp/manali-camp-1.webp", types: ["Domestic Tour", "Honeymoon Tour", "Wildlife Safari"] },
  { name: "East India", description: "Culture, wildlife and scenic landscapes", image: "/images/velas-turtle-festival/velas-turtle-5.webp", types: ["Domestic Tour", "Wildlife Safari"] },
  { name: "International", description: "Private holidays across Asia and beyond", image: "/images/hero-women.webp", types: ["International Tour", "Honeymoon Tour"] },
  { name: "Cruise", description: "Sea journeys and premium holiday experiences", image: "/images/velas-turtle-festival/velas-turtle-1.webp", types: ["International Tour", "Honeymoon Tour"] },
];

const tourPackages = [
  { title: "Malvan Tarkarli", type: "Domestic Tour", region: "West India", meta: "Konkan Beaches | 3-4 Days", season: "Oct - May", image: "/images/hero-camping.webp" },
  { title: "Gokarna-Murudeshwar", type: "Domestic Tour", region: "South India", meta: "Coastal Karnataka | 4 Days", season: "Oct - Feb", image: "/images/hero-mountains.webp" },
  { title: "Hampi-Badami", type: "Domestic Tour", region: "South India", meta: "Heritage Circuit | 4-5 Days", season: "Oct - Mar", image: "/images/manali-camp/manali-camp-2.webp" },
  { title: "Ujjain-Omkareshwar", type: "Domestic Tour", region: "North India", meta: "Pilgrimage | 3 Days", season: "All Year", image: "/images/velas-turtle-festival/velas-turtle-4.webp" },
  { title: "Wildlife Escapes", type: "Wildlife Safari", region: "West India", meta: "Tadoba, Pench & Kanha", season: "Oct - Jun", image: "/images/velas-turtle-festival/velas-turtle-5.webp" },
  { title: "Customised International", type: "International Tour", region: "International", meta: "Private Groups", season: "All Year", image: "/images/hero-women.webp" },
  { title: "International Honeymoon", type: "Honeymoon Tour", region: "International", meta: "Couples | Custom Dates", season: "All Year", image: "/images/kids-camp/tent-1.webp" },
  { title: "Corporate Offsite", type: "Corporate Tour", region: "West India", meta: "Teams | Custom Dates", season: "All Year", image: "/images/kids-camp/rope-activity.webp" },
  { title: "School Adventure Tour", type: "School Tour", region: "West India", meta: "Schools | 1-3 Days", season: "Oct - May", image: "/images/kids-camp/archery.webp" },
];

const ProgramPage = () => {
  const { programId } = useParams();
  const program = specialPrograms.find((p) => p.id === programId);
  const [form, setForm] = useState({
    name: "", phone: "", email: "", city: "", category: "", destination: "", travelDate: "", groupSize: "", duration: "",
    hotelCategory: "Standard", mealPlan: "CP", purpose: "Family", adults: "", children: "", flightRequired: "No", selfDrive: "No", message: "",
    schoolName: "", schoolLocation: "", designation: "", standard: "", schoolTourDuration: "One Day", transportPreference: "", budget: "", callPreference: "",
  });
  const [formStep, setFormStep] = useState<1 | 2>(1);
  const [selectedExperience, setSelectedExperience] = useState("");
  const [selectedTourType, setSelectedTourType] = useState("Domestic Tour");
  const [selectedTourRegion, setSelectedTourRegion] = useState("West India");
  const rawContent = pageContent[programId as keyof typeof pageContent];
  const content = rawContent || {
    eyebrow: program?.title || "Explorers Program",
    heading: program?.title || "Curated Explorers Experience",
    intro: program?.description || "Explore curated outdoor journeys, treks, tours and camps planned by Explorers.",
    enquiryTitle: `Plan Your ${program?.title || "Trip"}`,
    filters: tourCategoryFilters,
    highlights: [
      "Expert safety management and certified lead instructors",
      "Tailored itineraries for groups, families, and individuals",
      "Complete end-to-end support from booking to return",
    ],
    cards: [
      { title: "Fixed Departure Batches", meta: "Scheduled Dates", desc: "Join fixed departure batches with experienced leaders." },
      { title: "Custom Group Plans", meta: "Private Groups", desc: "Customise dates and itinerary for your private group." },
    ],
    process: ["Select program", "Check batch dates", "Confirm booking", "Explore with Explorers"],
  };
  const filters = content.filters || tourCategoryFilters;
  const selectedCategory = form.category || filters[0];
  const categoryText = selectedCategory.toLowerCase();
  const isSchoolTour = programId === "school-tours";
  const isGroupTours = programId === "group-tours";
  const isTeacherPicnic = isSchoolTour && selectedCategory === "Teacher Picnic";
  const visibleTourRegions = tourRegions.filter((region) => region.types.includes(selectedTourType));
  const visibleTourPackages = tourPackages.filter((tour) => tour.type === selectedTourType && tour.region === selectedTourRegion);
  const categoryGuidance = categoryText.includes("international")
    ? "Share your preferred country, travel month and traveller count."
    : categoryText.includes("wildlife")
      ? "Share your preferred park, safari month and group size."
      : categoryText.includes("corporate") || categoryText.includes("school")
        ? "Share your group type, preferred date and approximate participant count."
        : categoryText.includes("honeymoon")
          ? "Share your preferred destination, travel month and couple preferences."
          : "Share your preferred destination, travel month and group size.";
  const getCardCategory = (title: string) => {
    const matchedFilter = filters.find((filter) =>
      title.toLowerCase().includes(filter.replace(" Tour", "").replace(" Safari", "").toLowerCase()) ||
      filter.toLowerCase().includes(title.toLowerCase().replace(" tours", "")),
    );
    if (matchedFilter) return matchedFilter;
    if (/international/i.test(title)) return filters.find((filter) => /international/i.test(filter)) || filters[0];
    if (/wildlife/i.test(title)) return filters.find((filter) => /wildlife/i.test(filter)) || filters[0];
    if (/school/i.test(title)) return filters.find((filter) => /school/i.test(filter)) || filters[0];
    if (/corporate/i.test(title)) return filters.find((filter) => /corporate/i.test(filter)) || filters[0];
    return filters[0];
  };

  const relatedPrograms = useMemo(
    () => programDirectory.filter((item) => !item.link.endsWith(`/${programId}`)).slice(0, 8),
    [programId],
  );

  const submitEnquiry = (event: React.FormEvent) => {
    event.preventDefault();
    const details = [
      `Hi Explorers, I want details for ${program?.title}.`,
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Tour type: ${selectedCategory}`,
      form.destination ? `Preferred destination: ${form.destination}` : "",
      form.travelDate ? `Preferred date/month: ${form.travelDate}` : "",
      form.groupSize ? `Travellers: ${form.groupSize}` : "",
      form.duration ? `Duration: ${form.duration} days` : "",
      `Hotel category: ${form.hotelCategory}`,
      `Meal plan: ${form.mealPlan}`,
      `Travel purpose: ${form.purpose}`,
      form.adults ? `Adults: ${form.adults}` : "",
      form.children ? `Children: ${form.children}` : "",
      `Flight required: ${form.flightRequired}`,
      `Self-drive: ${form.selfDrive}`,
      form.email ? `Email: ${form.email}` : "",
      form.city ? `City: ${form.city}` : "",
      form.schoolName ? `School: ${form.schoolName}` : "",
      form.schoolLocation ? `School location: ${form.schoolLocation}` : "",
      form.designation ? `Designation: ${form.designation}` : "",
      form.standard ? `Standard/class: ${form.standard}` : "",
      isSchoolTour ? `School tour duration: ${form.schoolTourDuration}` : "",
      form.transportPreference ? `Transport preference: ${form.transportPreference}` : "",
      form.budget ? `Budget: ${form.budget}` : "",
      form.callPreference ? `Preferred calling time: ${form.callPreference}` : "",
      form.message ? `Message: ${form.message}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    window.open(`https://wa.me/919850504437?text=${encodeURIComponent(details)}`, "_blank", "noopener,noreferrer");
  };

  if (!program) {
    return (
      <Layout>
        <div className="container mx-auto flex min-h-[44vh] items-center justify-center px-4 py-16">
          <div className="rounded-lg border border-border bg-card p-8 text-center card-shadow">
            <h1 className="mb-4 font-heading text-2xl font-bold text-foreground">Program Not Found</h1>
            <Link to="/">
              <Button className="rounded-lg gradient-highlight text-highlight-foreground">Go Home</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <InternalPageHero
        pageName={program.title}
        eyebrow={content?.eyebrow || program.ageGroup}
        title={content?.heading || program.title}
        subtitle={content?.intro || program.description}
        images={[program.image, "/images/hero-mountains.webp", "/images/hero-camping.webp"]}
      >
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex rounded-full border border-white/25 bg-white/10 px-4 py-2 font-heading text-xs font-bold uppercase tracking-widest text-white/90 backdrop-blur">
            {program.ageGroup}
          </span>
          <a
            href={`https://wa.me/919850504437?text=${encodeURIComponent(`Hello Explorers! I would like to enquire about ${program.title}. Please share the available options and booking details.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-4 py-2.5 text-xs font-black uppercase tracking-wider text-white transition hover:bg-[#20BD5A]"
          >
            <WhatsAppIcon className="h-4 w-4" /> WhatsApp Us
          </a>
        </div>
      </InternalPageHero>

      <section id="tour-experiences" tabIndex={-1} className="scroll-mt-[110px] section-padding bg-background focus:outline-none">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(320px,380px)]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {isGroupTours && (
                <div className="space-y-6">
                  <section className="overflow-hidden rounded-lg border border-border bg-card card-shadow">
                    <div className="bg-primary px-6 py-6 text-primary-foreground">
                      <p className="text-xs font-black uppercase tracking-[0.2em] text-primary-foreground/75">Build your perfect trip</p>
                      <h2 className="mt-2 font-heading text-3xl font-extrabold">Choose Your Tour in 3 Simple Steps</h2>
                      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-primary-foreground/85">Start with the travel style, choose a region, then customize the package you like.</p>
                    </div>
                    <div className="space-y-6 p-5 sm:p-6">
                      <div>
                        <div className="mb-3 flex items-center gap-3"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent font-heading text-sm font-black text-accent-foreground">1</span><h3 className="font-heading text-xl font-extrabold">What kind of tour do you want?</h3></div>
                        <div className="flex flex-wrap gap-2">
                          {filters.map((type) => <button key={type} type="button" onClick={() => { setSelectedTourType(type); setSelectedTourRegion((tourRegions.find((region) => region.types.includes(type)) || tourRegions[0]).name); setForm((previous) => ({ ...previous, category: type })); }} className={`rounded-full border px-4 py-2 text-sm font-bold transition ${selectedTourType === type ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background text-foreground hover:border-primary/50"}`}>{type}</button>)}
                        </div>
                      </div>
                      <div>
                        <div className="mb-3 flex items-center gap-3"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent font-heading text-sm font-black text-accent-foreground">2</span><h3 className="font-heading text-xl font-extrabold">Which region interests you?</h3></div>
                        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                          {visibleTourRegions.map((region) => <button key={region.name} type="button" onClick={() => setSelectedTourRegion(region.name)} className={`group overflow-hidden rounded-lg border text-left transition ${selectedTourRegion === region.name ? "border-primary ring-2 ring-primary/20" : "border-border hover:border-primary/50"}`}><img src={region.image} alt="" className="h-24 w-full object-cover transition duration-300 group-hover:scale-105" /><div className="p-3"><h4 className="font-heading font-extrabold text-foreground">{region.name}</h4><p className="mt-1 text-xs leading-relaxed text-muted-foreground">{region.description}</p></div></button>)}
                        </div>
                      </div>
                    </div>
                  </section>

                  <section className="rounded-lg border border-border bg-card p-5 card-shadow sm:p-6">
                    <div className="mb-5 flex items-center gap-3"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent font-heading text-sm font-black text-accent-foreground">3</span><div><p className="text-xs font-bold uppercase tracking-widest text-accent">Recommended packages</p><h2 className="mt-1 font-heading text-2xl font-extrabold text-foreground">Explore {selectedTourRegion}</h2></div></div>
                    {visibleTourPackages.length ? <div className="grid gap-4 md:grid-cols-2">{visibleTourPackages.map((tour) => <article key={tour.title} className={`overflow-hidden rounded-lg border bg-background transition ${selectedExperience === tour.title ? "border-primary ring-2 ring-primary/20" : "border-border"}`}><img src={tour.image} alt={tour.title} className="h-44 w-full object-cover" /><div className="p-5"><div className="flex flex-wrap gap-2"><span className="rounded-full bg-primary/10 px-2.5 py-1 text-[0.65rem] font-black uppercase tracking-wider text-primary">{tour.meta}</span><span className="rounded-full bg-accent/15 px-2.5 py-1 text-[0.65rem] font-black uppercase tracking-wider text-accent">{tour.season}</span></div><h3 className="mt-3 font-heading text-xl font-extrabold text-foreground">{tour.title}</h3><Button type="button" onClick={() => { setSelectedExperience(tour.title); setForm((previous) => ({ ...previous, category: tour.type, destination: tour.title })); setFormStep(1); document.getElementById("tour-enquiry")?.scrollIntoView({ behavior: "smooth", block: "center" }); }} className="mt-4 rounded-full gradient-highlight text-highlight-foreground">Customize this tour <ArrowRight className="ml-2 h-4 w-4" /></Button></div></article>)}</div> : <div className="rounded-lg bg-muted p-5 text-sm text-muted-foreground">Our team will create a custom {selectedTourType.toLowerCase()} package for {selectedTourRegion}. Use the form to share your preferred dates and group size.</div>}
                  </section>
                </div>
              )}
              {content && (
                <div className={`${isGroupTours ? "hidden" : ""} rounded-lg border border-border bg-card p-6 card-shadow`}>
                  <div className="mb-5 flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-accent">{content.eyebrow}</p>
                      <h2 className="mt-2 font-heading text-2xl font-extrabold text-foreground">
                        {program.title === "Group Tours" ? "Popular Tour Experiences" : "Speciality Programs"}
                      </h2>
                    </div>
                    <Sparkles className="h-6 w-6 shrink-0 text-primary" />
                  </div>
                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {content.cards.map((card) => (
                      <button
                        key={card.title}
                        type="button"
                        onClick={() => {
                          setSelectedExperience(card.title);
                          setForm((prev) => ({ ...prev, category: getCardCategory(card.title) }));
                        }}
                        className={`rounded-lg border bg-background p-5 text-left transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-md ${selectedExperience === card.title ? "border-primary ring-2 ring-primary/20" : "border-border"}`}
                      >
                        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full gradient-highlight text-sm font-heading font-extrabold text-highlight-foreground">
                          {card.title.slice(0, 2)}
                        </div>
                        <h3 className="font-heading text-lg font-extrabold text-foreground">{card.title}</h3>
                        <p className="mt-1 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-accent">
                          <MapPin className="h-3.5 w-3.5" />
                          {card.meta}
                        </p>
                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{card.desc}</p>
                      </button>
                    ))}
                  </div>
                  {selectedExperience && (
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-lg bg-primary/10 p-4">
                      <p className="text-sm font-semibold text-foreground">
                        Planning <span className="font-heading font-black text-primary">{selectedExperience}</span> — the form is set to {selectedCategory}.
                      </p>
                      <Button type="button" size="sm" onClick={() => document.getElementById("tour-enquiry")?.scrollIntoView({ behavior: "smooth", block: "center" })} className="rounded-full gradient-highlight text-highlight-foreground">
                        Customize this tour <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              )}

              <div className={`${isGroupTours ? "hidden" : ""} rounded-lg border border-border bg-card p-6 card-shadow`}>
                <p className="mb-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  {content ? "Related Explorers Pages" : "Same filter for all internal pages"}
                </p>
                <div className="flex flex-wrap gap-2">
                  {relatedPrograms.map((item) => (
                    <Link key={item.title} to={item.link}>
                      <Badge variant="secondary" className="rounded-full px-3 py-1.5">
                        {item.title}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </div>

              <div className={`${isGroupTours ? "hidden" : ""} rounded-lg border border-border bg-card p-6 card-shadow`}>
                <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-accent">{content?.eyebrow || "Camp / Tour Category"}</p>
                    <h2 className="mt-2 font-heading text-2xl font-extrabold text-foreground">
                      {content ? "Choose Your Interest" : "Choose Your Plan"}
                    </h2>
                  </div>
                  <Link to="/treks">
                    <Button variant="outline" className="rounded-full font-heading font-bold">
                      View Upcoming Events
                    </Button>
                  </Link>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                  {filters.map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setForm((prev) => ({ ...prev, category }))}
                      className={`min-h-28 rounded-lg border p-4 text-left transition-all ${
                        selectedCategory === category
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border bg-background text-foreground hover:border-primary/50"
                      }`}
                    >
                      <CheckCircle2 className="mb-3 h-5 w-5" />
                      <span className="font-heading text-sm font-bold">{category}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className={`${isGroupTours ? "hidden" : ""} rounded-lg border border-border bg-card p-6 card-shadow`}>
                <h2 className="font-heading text-2xl font-extrabold text-foreground">
                  {content ? "What Makes This Page Different" : "Program Details"}
                </h2>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {(content?.highlights || [
                    `Age Group: ${program.ageGroup}`,
                    "Expert certified instructors",
                    "Safety equipment and first-aid support",
                    "Certificate of completion",
                    "Photo and video documentation",
                    "Custom plans for groups available",
                  ]).map((detail) => (
                    <div
                      key={detail}
                      className="flex items-start gap-3 rounded-lg bg-background p-4 text-sm text-muted-foreground"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              {isSchoolTour && (
                <section className="rounded-lg border border-border bg-card p-6 card-shadow">
                  <div className="max-w-2xl">
                    <p className="text-xs font-bold uppercase tracking-widest text-accent">Planned with care</p>
                    <h2 className="mt-2 font-heading text-2xl font-extrabold text-foreground">Before a School Tour, We Consider</h2>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Every school group is planned around student comfort, learning value, safety and smooth coordination.</p>
                  </div>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {[
                      ["Travel distance & timing", "Age-appropriate routes and practical journey schedules."],
                      ["Safe accommodation", "Suitable stays with comfort, hygiene and group supervision."],
                      ["Activity space & privacy", "Open areas for learning, games and well-managed group movement."],
                      ["Educational sightseeing", "Meaningful places and experiences chosen for the group."],
                      ["Hygienic food planning", "Meal choices and timings planned for student groups."],
                      ["Experienced tour team", "Coordinators and trained activity leaders throughout the tour."],
                      ["First aid & safety", "Structured safety planning, first aid support and emergency readiness."],
                      ["Teacher coordination", "Clear communication for teachers, parents and school organisers."],
                    ].map(([title, description], index) => (
                      <div key={title} className="flex gap-4 rounded-lg bg-background p-4">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 font-heading text-sm font-black text-primary">{index + 1}</span>
                        <div>
                          <h3 className="font-heading font-extrabold text-foreground">{title}</h3>
                          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {content && (
                <div className="overflow-hidden rounded-lg border border-border bg-card card-shadow">
                  <div className="flex flex-col gap-4 bg-primary px-6 py-6 text-primary-foreground sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-primary-foreground/75">
                        <CalendarDays className="h-4 w-4" /> Simple booking journey
                      </div>
                      <h2 className="mt-2 font-heading text-2xl font-extrabold">How It Works</h2>
                    </div>
                    <p className="max-w-sm text-sm leading-relaxed text-primary-foreground/85">From your first idea to a well-managed trip, our team keeps every step clear.</p>
                  </div>
                  <div className="grid gap-4 p-5 sm:grid-cols-2 lg:grid-cols-5">
                    {content.process.map((step, index) => (
                      <div key={step} className="group relative rounded-lg border border-border bg-background p-5 transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-md">
                        <div className="flex items-center justify-between gap-3">
                          <span className="font-heading text-xs font-black uppercase tracking-widest text-muted-foreground">Step {index + 1}</span>
                          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary font-heading text-sm font-black text-primary-foreground">{index + 1}</span>
                        </div>
                        <p className="mt-6 font-heading text-base font-extrabold leading-snug text-foreground">{step}</p>
                        <div className="mt-5 h-1 w-10 rounded-full bg-accent transition-all group-hover:w-full" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            <motion.aside
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:sticky lg:top-40 lg:self-start"
            >
              <form id="tour-enquiry" onSubmit={submitEnquiry} className="rounded-lg border border-border bg-card p-6 card-shadow">
                <p className="text-xs font-bold uppercase tracking-widest text-accent">{content?.eyebrow || "One Day Trekking Plan"}</p>
                <h2 className="mt-2 font-heading text-2xl font-extrabold text-foreground">{content?.enquiryTitle || "Fill Enquiry Form"}</h2>
                <div className="mt-4 flex items-center gap-2 text-xs font-black uppercase tracking-wider">
                  <span className={`rounded-full px-3 py-1 ${formStep === 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>1. Tour details</span>
                  <span className={`rounded-full px-3 py-1 ${formStep === 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>2. Your details</span>
                </div>
                {content && (
                  <div className="mt-4 rounded-lg bg-background p-4">
                    <div className="flex items-center gap-2 font-heading text-sm font-bold text-foreground">
                      <Users className="h-4 w-4 text-primary" />
                      Best for
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{program.ageGroup}</p>
                  </div>
                )}
                <div className="mt-5 space-y-4">
                  {formStep === 1 ? (
                    <>
                      <select
                        value={selectedCategory}
                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        {filters.map((category) => (
                          <option key={category}>{category}</option>
                        ))}
                      </select>
                      <p className="-mt-1 text-xs leading-relaxed text-muted-foreground">{categoryGuidance}</p>
                      <Input
                        placeholder={categoryText.includes("international") ? "Preferred country or city" : "Preferred destination"}
                        value={form.destination}
                        onChange={(e) => setForm({ ...form, destination: e.target.value })}
                        className="bg-background"
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <Input type="month" aria-label="Preferred travel month" value={form.travelDate} onChange={(e) => setForm({ ...form, travelDate: e.target.value })} className="bg-background" />
                        <Input type="number" min="1" placeholder={categoryText.includes("corporate") || categoryText.includes("school") ? "Participants" : "Travellers"} value={form.groupSize} onChange={(e) => setForm({ ...form, groupSize: e.target.value })} className="bg-background" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <Input type="number" min="1" max="15" placeholder="No. of days" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} className="bg-background" />
                        <select value={form.hotelCategory} onChange={(e) => setForm({ ...form, hotelCategory: e.target.value })} aria-label="Hotel category" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring">
                          {["Standard", "Deluxe", "3 Star", "4 Star", "5 Star"].map((option) => <option key={option}>{option}</option>)}
                        </select>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <select value={form.mealPlan} onChange={(e) => setForm({ ...form, mealPlan: e.target.value })} aria-label="Meal plan" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring">
                          <option value="CP">CP - Breakfast</option><option value="MAP">MAP - Breakfast & Dinner</option>
                        </select>
                        <select value={form.purpose} onChange={(e) => setForm({ ...form, purpose: e.target.value })} aria-label="Travel purpose" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring">
                          {["Solo", "Couple", "Family", "Friends", "Students", "Senior Citizens"].map((option) => <option key={option}>{option}</option>)}
                        </select>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <Input type="number" min="1" placeholder="Adults" value={form.adults} onChange={(e) => setForm({ ...form, adults: e.target.value })} className="bg-background" />
                        <Input type="number" min="0" placeholder="Children" value={form.children} onChange={(e) => setForm({ ...form, children: e.target.value })} className="bg-background" />
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-sm font-semibold">
                        <label className="flex items-center justify-between gap-2 rounded-md border border-input bg-background px-3 py-2">Flight needed?<select value={form.flightRequired} onChange={(e) => setForm({ ...form, flightRequired: e.target.value })} className="bg-transparent text-sm outline-none"><option>Yes</option><option>No</option></select></label>
                        <label className="flex items-center justify-between gap-2 rounded-md border border-input bg-background px-3 py-2">Self-drive?<select value={form.selfDrive} onChange={(e) => setForm({ ...form, selfDrive: e.target.value })} className="bg-transparent text-sm outline-none"><option>Yes</option><option>No</option></select></label>
                      </div>
                      {isSchoolTour && (
                        <div className="space-y-3 rounded-lg border border-primary/20 bg-primary/5 p-4">
                          <p className="text-xs font-black uppercase tracking-wider text-primary">{isTeacherPicnic ? "Teacher Picnic Details" : "Student Tour Details"}</p>
                          {!isTeacherPicnic && (
                            <select value={form.standard} onChange={(e) => setForm({ ...form, standard: e.target.value })} aria-label="Class standard" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring">
                              <option value="">Select class standard</option><option>1st - 4th Standard</option><option>5th - 7th Standard</option><option>8th - 10th Standard</option><option>Junior College</option><option>Senior College</option><option>Mixed standards</option>
                            </select>
                          )}
                          <div className="grid grid-cols-2 gap-3">
                            <select value={form.schoolTourDuration} onChange={(e) => setForm({ ...form, schoolTourDuration: e.target.value })} aria-label="School tour duration" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring">
                              <option>One Day</option><option>Overnight</option><option>Multi-days</option>
                            </select>
                            <Input placeholder={isTeacherPicnic ? "Budget per person" : "Approx. budget"} value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} className="bg-background" />
                          </div>
                          {isTeacherPicnic && <Input placeholder="Preferred picnic destination" value={form.destination} onChange={(e) => setForm({ ...form, destination: e.target.value })} className="bg-background" />}
                          <select value={form.transportPreference} onChange={(e) => setForm({ ...form, transportPreference: e.target.value })} aria-label="Transport preference" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring">
                            <option value="">Transport preference</option><option>AC Bus</option><option>Non-AC Bus</option><option>Own Transport</option>
                          </select>
                        </div>
                      )}
                      <Button type="button" onClick={() => setFormStep(2)} className="w-full font-heading font-bold text-highlight-foreground gradient-highlight">
                        Next <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </>
                  ) : (
                    <>
                      <Input required placeholder="Your Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="bg-background" />
                      <Input required type="tel" placeholder="Mobile Number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="bg-background" />
                      <Input type="email" placeholder="Email address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="bg-background" />
                      <Input placeholder="Your city" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="bg-background" />
                      {isSchoolTour && (
                        <>
                          <Input placeholder="School / college name" value={form.schoolName} onChange={(e) => setForm({ ...form, schoolName: e.target.value })} className="bg-background" />
                          <Input placeholder="School / college location" value={form.schoolLocation} onChange={(e) => setForm({ ...form, schoolLocation: e.target.value })} className="bg-background" />
                          <div className="grid grid-cols-2 gap-3">
                            <Input placeholder="Your designation" value={form.designation} onChange={(e) => setForm({ ...form, designation: e.target.value })} className="bg-background" />
                            <select value={form.callPreference} onChange={(e) => setForm({ ...form, callPreference: e.target.value })} aria-label="Preferred calling time" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring">
                              <option value="">Preferred call time</option><option>Morning</option><option>Afternoon</option><option>Evening</option>
                            </select>
                          </div>
                        </>
                      )}
                      <Textarea placeholder={`Anything else about your ${selectedCategory.toLowerCase()} plan?`} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="bg-background" rows={4} />
                      <div className="grid grid-cols-2 gap-3">
                        <Button type="button" variant="outline" onClick={() => setFormStep(1)} className="font-heading font-bold">Back</Button>
                        <Button type="submit" className="font-heading font-bold text-highlight-foreground gradient-highlight">
                          <WhatsAppIcon className="mr-2 h-4 w-4" /> Send
                        </Button>
                      </div>
                    </>
                  )}
                  <Link to="/contact" className="flex flex-wrap items-center justify-center gap-2 text-center text-sm font-semibold text-primary">
                    Contact office directly <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </form>
            </motion.aside>
          </div>
        </div>
      </section>

      <section className="section-padding bg-card">
        <div className="container mx-auto">
          <div className="mb-8 max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-widest text-accent">Explore More</p>
            <h2 className="mt-2 font-heading text-3xl font-extrabold text-foreground">More Explorers Categories</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {programDirectory.map((item) => (
              <Link
                key={item.title}
                to={item.link}
                className="group rounded-lg border border-border bg-background p-5 transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg"
              >
                <h3 className="font-heading text-lg font-bold text-foreground group-hover:text-primary">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.subtitle}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProgramPage;
