import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Layout from "@/components/Layout";
import { trustStats } from "@/data/siteData";
import { CheckCircle2, ShieldCheck, Users, Leaf } from "lucide-react";
import InternalPageHero from "@/components/InternalPageHero";

const heroMountains = "/images/hero-mountains.jpg";
const heroWomen = "/images/hero-women.jpg";
const heroCamping = "/images/hero-camping.jpg";
const heroKids = "/images/kids-camp/tent-1.jpg";

const promiseSlides = [
  {
    image: heroCamping,
    title: "Adventures that feel personal, safe, and unforgettable",
    description:
      "Whether it is your first trek or your fiftieth, we design every journey with care. Our teams manage logistics, safety, and support so you can focus on the trail, the views, and the memories.",
  },
  {
    image: heroMountains,
    title: "Safety and preparation at every step",
    description:
      "From route planning and participant guidance to trained leaders and first-aid readiness, we work carefully to make every experience organised and dependable.",
  },
  {
    image: heroWomen,
    title: "Welcoming journeys built around people",
    description:
      "We create supportive groups where beginners, experienced travellers, families, students, and speciality communities can explore with confidence.",
  },
];

const OurPromiseCarousel = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % promiseSlides.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  const slide = promiseSlides[activeSlide];

  return (
    <section className="section-padding bg-secondary/40">
      <div className="container mx-auto" aria-roledescription="carousel" aria-label="Our Promise">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.title}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12"
          >
            <div className="lg:col-span-6">
              <img src={slide.image} alt="" className="h-72 w-full rounded-lg object-cover card-shadow sm:h-[360px]" />
            </div>
            <div className="lg:col-span-6">
              <span className="inline-flex items-center rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Our Promise
              </span>
              <h2 className="mt-4 font-heading text-3xl font-extrabold text-foreground md:text-4xl">
                {slide.title}
              </h2>
              <p className="mt-4 font-body leading-relaxed text-muted-foreground">{slide.description}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-7 flex justify-center gap-2" aria-label="Our Promise slides">
          {promiseSlides.map((item, index) => (
            <button
              key={item.title}
              type="button"
              onClick={() => setActiveSlide(index)}
              className={`h-2.5 rounded-full transition-all ${index === activeSlide ? "w-8 bg-primary" : "w-2.5 bg-muted-foreground/30 hover:bg-muted-foreground/50"}`}
              aria-label={`Show promise ${index + 1}`}
              aria-current={index === activeSlide ? "true" : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const AboutPage = () => {
  return (
    <Layout>
      <div>
        <InternalPageHero
          pageName="About Us"
          eyebrow="About Explorers"
          title="Crafting Adventures That Last a Lifetime"
          subtitle="Since 2001, we have helped thousands of explorers discover the mountains with confidence, comfort, and care."
          images={[heroMountains, heroWomen, heroCamping, heroKids]}
        />

        <section className="section-padding">
          <div className="container mx-auto max-w-5xl">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-foreground">
                  Our Story
                </h2>
                <div className="mt-5 space-y-4 text-justify font-body text-base leading-8 text-muted-foreground">
                <p>
                  Founded in 2001, Explorers Treks & Tours began as a small group of passionate trekkers who believed in the
                  transformative power of nature. What started as weekend hikes in the Sahyadri mountains has grown into one
                  of India's most trusted adventure travel organizations.
                </p>
                <p>
                  Today, we've taken over 2 lakh members on adventures ranging from beginner-friendly weekend treks to
                  challenging Himalayan expeditions. Our commitment to safety, quality, and unforgettable experiences remains
                  unwavering.
                </p>
                <p>
                  With certified trek leaders, first-aid trained guides, and careful route planning, every Explorers event is
                  designed to be safe, organised, and memorable.
                </p>
                </div>
              </motion.div>
          </div>
        </section>

        <section className="section-padding bg-card">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 lg:grid-cols-5">
              {trustStats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-lg border border-border bg-background p-6 text-center card-shadow"
                >
                  <img
                    src={stat.logo}
                    alt={stat.logoAlt}
                    className="mx-auto mb-3 h-10 w-24 object-contain"
                    loading="lazy"
                  />
                  <div className="font-heading text-3xl font-extrabold text-foreground mb-2">{stat.number}</div>
                  <p className="text-muted-foreground font-body text-sm">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container mx-auto grid gap-6 lg:grid-cols-2 lg:items-stretch">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-border bg-card p-6 card-shadow sm:p-8"
            >
              <h2 className="font-heading text-3xl font-extrabold text-foreground md:text-4xl">Our Values</h2>
              <p className="mt-3 font-body text-muted-foreground">
                Every trek is crafted with a focus on safety, community, and respect for the mountains.
              </p>
              <div className="mt-7 grid gap-4">
              {[
                { title: "Safety First", desc: "Certified guides, first-aid support, and meticulous route planning for every adventure.", icon: ShieldCheck },
                { title: "Community", desc: "Building lasting friendships through shared adventures and a growing explorer family.", icon: Users },
                { title: "Sustainability", desc: "Leave No Trace principles, eco-friendly practices, and supporting local communities.", icon: Leaf },
              ].map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-4 rounded-xl border border-border bg-background p-4"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <v.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-foreground">{v.title}</h3>
                    <p className="mt-1 font-body text-sm leading-relaxed text-muted-foreground">{v.desc}</p>
                  </div>
                </motion.div>
              ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="rounded-2xl border border-border bg-secondary/40 p-6 card-shadow sm:p-8"
            >
              <h2 className="font-heading text-3xl font-extrabold text-foreground md:text-4xl">Why Explorers</h2>
              <p className="mt-3 font-body leading-relaxed text-muted-foreground">
                Since 2001, our experienced team has made outdoor travel organised, welcoming, and dependable for explorers of different ages and experience levels.
              </p>
              <div className="mt-7 grid gap-4">
                {[
                  "Experienced trek leaders and carefully planned routes",
                  "Safety-first operations with clear participant guidance",
                  "Treks, tours, camps, and training for varied age groups",
                  "Transparent schedules, pricing, and trip communication",
                  "Responsible travel practices that respect local communities",
                  "Personal support before, during, and after every journey",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-xl bg-background/80 p-4 text-sm font-semibold text-foreground">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <span className="leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <OurPromiseCarousel />
      </div>
    </Layout>
  );
};

export default AboutPage;
