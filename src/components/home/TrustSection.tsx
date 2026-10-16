import { motion } from "framer-motion";
import { Award, Facebook, Instagram, Star, Youtube } from "lucide-react";
import { trustStats } from "@/data/siteData";

const socialLinks = [
  { label: "Live Instagram", href: "https://www.instagram.com/explorers_group/", icon: Instagram },
  { label: "Facebook Page Live", href: "https://www.facebook.com/Explorers.DareToDiscover/", icon: Facebook },
  { label: "YouTube", href: "https://www.youtube.com/channel/UC5ffVZUnp2p2Bi6VqNyMRcw", icon: Youtube },
  {
    label: "Live Google Reviews",
    href: "https://www.google.com/search?q=Explorers+Treks+and+Tours+Pune+reviews",
    icon: Star,
  },
];

const affiliations = [
  "24+ years of adventure operations",
  "Certified trek leaders and first-aid support",
  "School, corporate and family tour specialists",
  "Safety-first event planning",
];

const TrustSection = () => {
  return (
    <section className="gradient-primary section-padding">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-primary-foreground mb-3">
            Trusted by Lakhs of Explorers
          </h2>
          <p className="text-primary-foreground/70 font-body max-w-xl mx-auto">
            Over two decades of safe, memorable adventures.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {trustStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-lg bg-primary-foreground/10 p-6 text-center backdrop-blur-sm"
            >
              {stat.label === "Certified by Maharashtra Tourism" ? (
                <img
                  src="/maharashtra.png"
                  alt="Maharashtra Tourism"
                  className="mx-auto mb-3 h-10 w-10 object-contain"
                />
              ) : (
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/10 text-primary-foreground">
                  <Award className="h-5 w-5" />
                </div>
              )}
              <div className="font-heading text-4xl md:text-5xl font-extrabold text-primary-foreground mb-2">
                {stat.number}
              </div>
              <p className="text-primary-foreground/70 font-body text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.15fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-lg bg-primary-foreground/10 p-6 backdrop-blur-sm"
          >
            <div className="mb-5 flex items-center gap-3">
              <Award className="h-6 w-6 text-highlight" />
              <h3 className="font-heading text-2xl font-extrabold text-primary-foreground">Awards & Affiliations</h3>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {affiliations.map((item) => (
                <div key={item} className="rounded-lg border border-primary-foreground/15 bg-primary-foreground/10 p-4 text-sm font-semibold text-primary-foreground/80">
                  {item}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-lg bg-primary-foreground p-6 text-foreground"
          >
            <p className="text-xs font-bold uppercase tracking-widest text-accent">Social Media Live Links</p>
            <h3 className="mt-2 font-heading text-2xl font-extrabold">Reviews, Updates and Testimonials</h3>
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                const isGoogleReview = social.label === "Live Google Reviews";

                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`rounded-lg border border-border bg-background p-4 transition-colors hover:border-primary/50 hover:text-primary ${
                      isGoogleReview ? "flex flex-col items-center justify-center gap-2 text-center" : "flex items-center gap-3"
                    }`}
                  >
                    {isGoogleReview ? (
                      <>
                        <img src="/google-g-logo.svg" alt="Google" className="h-6 w-6 object-contain" />
                        <span className="font-heading text-sm font-bold leading-tight">{social.label}</span>
                      </>
                    ) : (
                      <>
                        <Icon className="h-5 w-5" />
                        <span className="font-heading text-sm font-bold">{social.label}</span>
                      </>
                    )}
                  </a>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
