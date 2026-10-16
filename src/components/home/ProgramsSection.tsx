import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { specialPrograms } from "@/data/siteData";
import { ArrowRight } from "lucide-react";

const ProgramsSection = () => {
  return (
    <section className="section-padding bg-card">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-foreground mb-3">
            Special <span className="text-gradient-primary">Programs</span>
          </h2>
          <p className="text-muted-foreground font-body max-w-xl mx-auto">
            Curated experiences for every age, every passion.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {specialPrograms.map((program, i) => (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={`/programs/${program.id}`}
                className="group relative block h-72 overflow-hidden rounded-lg card-shadow transition-all duration-300 hover:card-shadow-hover"
              >
                <img
                  src={program.image}
                  alt={program.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="text-accent text-xs font-heading font-semibold tracking-wider uppercase">
                    {program.ageGroup}
                  </span>
                  <h3 className="font-heading text-xl font-bold text-primary-foreground mt-1 mb-2">
                    {program.title}
                  </h3>
                  <p className="text-primary-foreground/70 text-sm font-body line-clamp-2 mb-3">
                    {program.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-highlight text-sm font-semibold group-hover:gap-2 transition-all">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;
