import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
const heroKids = "/images/kids-camp/archery.jpg";

const AtlasSection = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-accent font-heading font-semibold text-sm tracking-widest uppercase">
              Leadership Through Adventure
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-foreground mt-3 mb-6">
              ATLAS <span className="text-gradient-primary">Academy</span>
            </h2>
            <p className="text-muted-foreground font-body leading-relaxed mb-6">
              Adventure Training for Leadership, Adventure & Survival. Our flagship program develops leadership
              qualities, team spirit, and survival skills through carefully designed outdoor challenges.
              Certified instructors guide participants through progressive skill-building modules.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "Certified mountaineering training",
                "Wilderness survival skills",
                "Leadership & team building",
                "First aid & rescue certification",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-foreground font-body">
                  <span className="w-2 h-2 rounded-full bg-highlight shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Link to="/atlas">
              <Button size="lg" className="gradient-primary text-primary-foreground font-heading font-bold rounded-full px-8">
                Learn More
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <img
              src={heroKids}
              alt="ATLAS Academy training"
              loading="lazy"
              className="h-72 w-full rounded-lg object-cover card-shadow sm:h-[400px]"
            />
            <div className="absolute bottom-3 left-3 rounded-lg bg-highlight p-4 font-heading text-highlight-foreground card-shadow sm:-bottom-4 sm:-left-4">
              <div className="text-2xl font-extrabold">500+</div>
              <div className="text-xs font-medium">Certified Leaders</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AtlasSection;
