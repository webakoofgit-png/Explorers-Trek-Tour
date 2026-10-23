import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, ChevronLeft, ChevronRight, MessageCircle, Mountain, ShieldCheck, Star } from "lucide-react";
import { awards, googleReviews, socialChannels, trustStats } from "@/data/siteData";
import yearsExperienceLogo from "@/assets/Explorer logo (1).webp";
import {
  getWhatsAppGroupLink,
  SITE_SETTINGS_UPDATED_EVENT,
  WHATSAPP_GROUP_STORAGE_KEY,
} from "@/lib/siteSettings";

// Social Logos SVG Components
const InstagramIcon = () => (
  <svg className="h-7 w-7 text-[#E4405F]" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const FacebookIcon = () => (
  <svg className="h-7 w-7 text-[#1877F2]" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const YoutubeIcon = () => (
  <svg className="h-7 w-7 text-[#FF0000]" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const WhatsappIcon = () => (
  <svg className="h-7 w-7 text-[#25D366]" viewBox="0 0 24 24" fill="currentColor">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
  </svg>
);

const TextMessageIcon = () => <MessageCircle className="h-7 w-7 text-[#2563EB]" />;

const GoogleIcon = () => (
  <img src="/google-g-logo.svg" alt="Google" className="h-7 w-7 object-contain" />
);

export const StatsSection = () => (
  <section className="bg-background px-4 py-6">
    <div className="container mx-auto grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      {trustStats.map((stat) => {
        const isYearsExperience = stat.label === "Years Experience";
        const isGoogleRating = stat.label === "Google Rating";
        const StatIcon = stat.label === "Treks Completed" ? Mountain : ShieldCheck;

        return (
          <div key={stat.label} className="rounded-lg border border-border bg-card p-4 text-center shadow-sm">
            {isYearsExperience ? (
              <>
                <img
                  src={yearsExperienceLogo}
                  alt="24 Years Experience"
                  className="mx-auto h-32 w-32 object-contain"
                />
                <div className="mt-0.5 text-[0.7rem] font-semibold text-muted-foreground">{stat.note}</div>
              </>
            ) : (
              <>
                {isGoogleRating ? (
                  <img
                    src="/google-g-logo.svg"
                    alt="Google"
                    className="mx-auto mb-2 h-10 w-10 object-contain"
                    loading="lazy"
                  />
                ) : stat.label === "Certified by Maharashtra Tourism" ? (
                  <img
                    src="/maharashtra.webp"
                    alt="Maharashtra Tourism"
                    className="mx-auto mb-2 h-10 w-10 object-contain"
                  />
                ) : (
                  <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <StatIcon className="h-5 w-5" aria-hidden="true" />
                  </div>
                )}
                <div className="font-heading text-2xl font-black text-primary">{stat.number}</div>
                <div className="mt-1 font-heading text-xs font-black uppercase text-foreground">{stat.label}</div>
                {isGoogleRating && (
                  <div className="mt-1 flex justify-center gap-0.5" aria-label="4.7 out of 5 stars">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star key={index} className="h-3.5 w-3.5 fill-amber-500 text-amber-500" aria-hidden="true" />
                    ))}
                  </div>
                )}
                {"link" in stat ? (
                  <a
                    href={stat.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 block text-[0.7rem] font-semibold text-muted-foreground underline-offset-2 hover:text-primary hover:underline"
                  >
                    {stat.note}
                  </a>
                ) : (
                  <div className="mt-0.5 text-[0.7rem] font-semibold text-muted-foreground">{stat.note}</div>
                )}
              </>
            )}
          </div>
        );
      })}
    </div>
  </section>
);

// Awards Emblem Badges for Item 19
const awardEmblems: Record<string, { label: string; tag: string }> = {
  "Maharashtra Tourism": { label: "Maharashtra Tourism", tag: "Govt Certified" },
  "MSME": { label: "MSME India", tag: "Recognised Operator" },
  "NIDHI": { label: "NIDHI Ministry", tag: "Tourism Board" },
  "ETAA": { label: "ETAA Member", tag: "Travel Assoc." },
  "TAAP": { label: "TAAP Pune", tag: "Registered Member" },
  "Bhartiya Paryatan Coop Society": { label: "Bhartiya Paryatan", tag: "National Co-Op" },
  "ATAOI": { label: "ATOAI India", tag: "Adventure Assoc." },
  "TOI Award": { label: "Times Tourism Award", tag: "Excellence 2022" },
  "Paryatan Committee": { label: "Paryatan Samiti", tag: "Official Member" },
  "Innovative Tour Operator": { label: "Innovative Operator", tag: "Best Practices" },
  "IIHM": { label: "IIHM Hospitality", tag: "Academic Partner" },
  "IHC London": { label: "IHC London", tag: "Global Affiliation" },
};

const TemporaryAwardLogo = ({ award }: { award: string }) => {
  if (award === "NIDHI") {
    return (
      <svg viewBox="0 0 260 96" role="img" aria-label="NIDHI Plus" className="h-16 w-full max-w-[12rem]">
        <text x="8" y="59" fill="#171115" fontFamily="Arial, sans-serif" fontSize="63" fontWeight="500">nidhi</text>
        <path d="M213 21c-11 0-20 8-20 19 0 15 20 34 20 34s20-19 20-34c0-11-9-19-20-19Zm0 27a9 9 0 1 1 0-18 9 9 0 0 1 0 18Z" fill="#ed1c24" />
        <text x="235" y="39" fill="#171115" fontFamily="Arial, sans-serif" fontSize="25" fontWeight="700">+</text>
        <text x="10" y="78" fill="#171115" fontFamily="Arial, sans-serif" fontSize="10" fontWeight="600">National Integrated Database</text>
        <text x="38" y="91" fill="#171115" fontFamily="Arial, sans-serif" fontSize="10" fontWeight="600">of Hospitality Industry</text>
      </svg>
    );
  }

  if (award === "ETAA") {
    return (
      <svg viewBox="0 0 180 125" role="img" aria-label="Enterprising Travel Agents Association" className="h-20 w-full max-w-[9rem]">
        <text x="90" y="13" textAnchor="middle" fill="#222" fontFamily="Arial, sans-serif" fontSize="8" fontWeight="700">ENTERPRISING TRAVEL AGENTS ASSOCIATION</text>
        <rect x="51" y="20" width="78" height="70" rx="2" fill="#169bd5" />
        <path d="M54 23 90 54 126 23v18L90 72 54 41Zm0 64 36-31 36 31h-20L90 73 74 87Z" fill="white" />
        <text x="90" y="116" textAnchor="middle" fill="#222" fontFamily="Georgia, serif" fontSize="28">ETAA</text>
      </svg>
    );
  }

  if (award === "Innovative Tour Operator") {
    const bars = [
      [8, 23, 15, 56, "#ef16b7"],
      [31, 9, 15, 78, "#8f197d"],
      [77, 17, 15, 66, "#302f8f"],
      [100, 6, 15, 84, "#176ce2"],
      [123, 0, 15, 92, "#2498ef"],
      [146, 8, 15, 78, "#05a7ba"],
      [169, 20, 15, 58, "#45c5d5"],
    ] as const;

    return (
      <svg viewBox="0 0 390 96" role="img" aria-label="Innovative Operators" className="h-16 w-full max-w-[20rem]">
        {bars.map(([x, y, width, height, color]) => (
          <rect key={x} x={x} y={y} width={width} height={height} rx="7.5" fill={color} />
        ))}
        <text x="205" y="42" fill="#050505" fontFamily="Arial, sans-serif" fontSize="27" fontWeight="900">INNOVATIVE</text>
        <text x="205" y="72" fill="#050505" fontFamily="Arial, sans-serif" fontSize="27" fontWeight="900">OPERATORS</text>
      </svg>
    );
  }

  return null;
};

const suppliedAwardLogos = [
  { name: "Bhartiya Paryatan Coop Society", label: "Bhartiya Paryatan", tag: "National Co-Op", src: "/award%20logos/Bhartiya%20Paryatan.webp" },
  { name: "ATAOI", label: "ATOAI India", tag: "Adventure Association", src: "/award%20logos/ATOAI%20India.webp" },
  { name: "MSME", label: "MSME India", tag: "Government Recognition", src: "/award%20logos/MSME%20India.webp" },
  { name: "TAAP", label: "TAAP Pune", tag: "Travel Association", src: "/award%20logos/TAAP%20Pune.webp" },
  { name: "IIHM Hospitality", label: "IIHM Hospitality", tag: "Academic Affiliation", src: "/award%20logos/IIHM%20Hospitality.webp" },
  { name: "Indian Institute of Hotel Management", label: "Indian Institute of Hotel Management", tag: "Academic Affiliation", src: "/award%20logos/IIhm_LOGO.webp" },
  { name: "Institute of Hospitality", label: "Institute of Hospitality", tag: "Global Affiliation", src: "/award%20logos/IHC%20London.webp" },
];

const suppliedAwardNames = new Set(["Maharashtra Tourism", "MSME", "TAAP", "IIHM", "IHC London", "Bhartiya Paryatan Coop Society", "ATAOI"]);
const awardItems = [
  ...suppliedAwardLogos,
  ...awards.filter((award) => !suppliedAwardNames.has(award)).map((award) => ({ name: award })),
];

export const AwardsSection = () => (
  <section className="section-padding bg-background border-t border-border">
    <div className="container mx-auto">
      <div className="mb-6 text-center">
        <h2 className="font-heading text-2xl md:text-4xl font-black uppercase tracking-wider text-foreground">
          AWARDS & AFFILIATIONS
        </h2>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {awardItems.map((item) => {
          const award = item.name;
          const info = awardEmblems[award] || { label: award, tag: "Certified" };
          const temporaryLogo = TemporaryAwardLogo({ award });
          const officialLogo = "src" in item ? item.src : undefined;
          const label = "label" in item ? item.label : info.label;
          const tag = "tag" in item ? item.tag : info.tag;

          return (
            <div
              key={award}
              className="flex flex-col items-center justify-center rounded-xl border border-border bg-card p-4 text-center shadow-sm hover:border-primary/50 transition-colors"
            >
              {officialLogo ? (
                <div className="mb-2 flex h-20 w-full items-center justify-center rounded-lg bg-white p-2">
                  <img src={officialLogo} alt={label} className="h-full w-full object-contain" loading="lazy" />
                </div>
              ) : temporaryLogo ? (
                <div className="mb-2 flex min-h-20 w-full items-center justify-center rounded-lg bg-white px-2 py-1">
                  {temporaryLogo}
                </div>
              ) : (
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-heading font-black text-xs">
                  <Award className="h-5 w-5 text-accent" />
                </div>
              )}
              <div className="font-heading text-xs font-black uppercase text-foreground leading-tight">{label}</div>
              <div className="mt-1 rounded-full bg-muted px-2 py-0.5 text-[0.65rem] font-bold text-muted-foreground uppercase tracking-wider">
                {tag}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

export const SocialProofSection = () => {
  const [currentReview, setCurrentReview] = useState(0);
  const [whatsAppGroupLink, setWhatsAppGroupLink] = useState(getWhatsAppGroupLink);

  useEffect(() => {
    const refreshWhatsAppGroupLink = () => setWhatsAppGroupLink(getWhatsAppGroupLink());
    const handleStorage = (event: StorageEvent) => {
      if (event.key === WHATSAPP_GROUP_STORAGE_KEY) refreshWhatsAppGroupLink();
    };

    window.addEventListener(SITE_SETTINGS_UPDATED_EVENT, refreshWhatsAppGroupLink);
    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener(SITE_SETTINGS_UPDATED_EVENT, refreshWhatsAppGroupLink);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  // Auto-rotate reviews every 3.5s (Item 23)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % googleReviews.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const review = googleReviews[currentReview];

  return (
    <section className="gradient-primary section-padding text-foreground">
      <div className="container mx-auto">
        <div className="mb-6 text-center">
          <h2 className="font-heading text-2xl md:text-4xl font-black uppercase tracking-wider text-primary-foreground">
            FOLLOW US ON SOCIAL MEDIA
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          {/* Social Channels List with Logos & Action Badges (Items 20, 21, 22) */}
          <div className="grid gap-3 sm:grid-cols-2">
            {socialChannels.map((social) => {
              let Icon = GoogleIcon;
              if (social.type === "instagram") Icon = InstagramIcon;
              if (social.type === "facebook") Icon = FacebookIcon;
              if (social.type === "youtube") Icon = YoutubeIcon;
              if (social.type.includes("whatsapp")) Icon = WhatsappIcon;
              if (social.type === "text-message") Icon = TextMessageIcon;
              const socialLink = social.type === "whatsapp-group" ? whatsAppGroupLink : social.link;

              return (
                <a
                  key={social.name}
                  href={socialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-3 rounded-xl border border-primary-foreground/20 bg-primary-foreground p-4 text-foreground shadow-md transition-transform hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="shrink-0">
                      <Icon />
                    </div>
                    <div className="min-w-0">
                      <div className="font-heading text-xs font-extrabold uppercase leading-snug text-foreground break-words">
                        {social.name}
                      </div>
                      <div className="text-[0.7rem] font-semibold text-muted-foreground truncate">
                        {social.subtext}
                      </div>
                    </div>
                  </div>
                  <span className="shrink-0 rounded-lg bg-accent px-3 py-1.5 font-heading text-xs font-extrabold uppercase text-white tracking-wider shadow-sm">
                    {social.action}
                  </span>
                </a>
              );
            })}
          </div>

          {/* Dynamic Auto-Changing 5-Star Google Reviews (Item 23) */}
          <div className="relative rounded-2xl bg-card p-6 text-foreground shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div className="flex items-center gap-3">
                  <GoogleIcon />
                  <div>
                    <div className="font-heading text-sm font-black uppercase text-foreground">Google Reviews</div>
                    <div className="flex items-center gap-1 text-accent text-xs font-extrabold">
                      <span>4.7</span>
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="h-3.5 w-3.5 fill-accent text-accent" />
                        ))}
                      </div>
                      <span className="text-muted-foreground ml-1">(476 Reviews)</span>
                    </div>
                  </div>
                </div>
                <span className="rounded-full bg-emerald-100 text-emerald-800 px-3 py-1 text-[0.68rem] font-extrabold uppercase tracking-wider">
                  Verified Reviews
                </span>
              </div>

              <div className="mt-5 min-h-[140px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-heading font-black text-white text-sm">
                        {review.avatar}
                      </div>
                      <div>
                        <div className="font-heading text-sm font-extrabold text-foreground">{review.name}</div>
                        <div className="text-[0.72rem] font-semibold text-muted-foreground flex items-center gap-2">
                          <span>{review.time}</span>
                          <span>•</span>
                          <span>{review.location}</span>
                        </div>
                      </div>
                      <div className="ml-auto flex text-amber-500">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-amber-500" />
                        ))}
                      </div>
                    </div>

                    <p className="text-sm font-semibold text-muted-foreground leading-relaxed">
                      {review.text}
                    </p>
                    <p className="mt-3 text-[0.68rem] font-bold uppercase tracking-wider text-muted-foreground/80">
                      Review summary from Google Business Profile
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Slider Dots & Arrow Navigation */}
            <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
              <div className="flex gap-1.5">
                {googleReviews.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => setCurrentReview(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === currentReview ? "w-6 bg-primary" : "w-2 bg-muted-foreground/30"
                    }`}
                    aria-label={`Show review ${index + 1}`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentReview((prev) => (prev - 1 + googleReviews.length) % googleReviews.length)}
                  className="rounded-full border border-border p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
                  aria-label="Previous review"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setCurrentReview((prev) => (prev + 1) % googleReviews.length)}
                  className="rounded-full border border-border p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
                  aria-label="Next review"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const OffersAdminSection = () => null;

