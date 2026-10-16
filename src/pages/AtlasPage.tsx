import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import InternalPageHero from "@/components/InternalPageHero";
const heroKids = "/images/kids-camp/archery.jpg";

const AtlasPage = () => {
  return (
    <Layout>
      <InternalPageHero
        pageName="ATLAS Academy"
        eyebrow="Training Academy"
        title="ATLAS Academy"
        subtitle="Adventure Training for Leadership, Adventure & Survival"
        images={[heroKids, "/images/hero-mountains.jpg", "/images/hero-camping.jpg"]}
      />

      <section className="section-padding bg-card">
        <div className="container mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-heading text-3xl font-extrabold text-foreground mb-6">About ATLAS</h2>
            <p className="text-muted-foreground font-body leading-relaxed mb-6">
              ATLAS Academy is our flagship leadership development program that uses outdoor adventure
              as a medium for personal growth. Through carefully designed challenges, participants develop
              resilience, teamwork, decision-making, and leadership skills that translate into every
              aspect of life.
            </p>
            <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
              {[
                { title: "Mountaineering", desc: "Learn basic to advanced mountaineering skills from certified instructors." },
                { title: "Survival Skills", desc: "Navigation, shelter building, fire craft, and wilderness first aid." },
                { title: "Leadership", desc: "Team dynamics, conflict resolution, and leading under pressure." },
                { title: "Certification", desc: "Receive recognized certification upon completing the program." },
              ].map((m) => (
                <div key={m.title} className="bg-background rounded-xl p-6 card-shadow border border-border">
                  <h3 className="font-heading font-bold text-foreground mb-2">{m.title}</h3>
                  <p className="text-muted-foreground font-body text-sm">{m.desc}</p>
                </div>
              ))}
            </div>
            <Link to="/contact">
              <Button size="lg" className="w-full rounded-lg px-8 font-heading font-bold text-highlight-foreground gradient-highlight sm:w-auto sm:px-10">
                Enroll Now
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default AtlasPage;
