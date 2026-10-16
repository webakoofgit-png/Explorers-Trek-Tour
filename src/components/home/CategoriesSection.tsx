import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { experienceCategories } from "@/data/siteData";

const CategoriesSection = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container mx-auto">
        <div className="mx-auto mb-6 max-w-3xl text-center">
          <h2 className="font-heading text-2xl md:text-4xl font-black uppercase text-foreground">
            CURATED EXPERIENCES FOR EVERYONE
          </h2>
        </div>
        <div className="grid auto-rows-[13rem] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {experienceCategories.map((category, index) => {
            const tall = index % 7 === 0 || index % 7 === 4;
            const wide = index % 5 === 1;
            return (
              <motion.div
                key={category.name}
                layout
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.03 }}
                className={`${tall ? "sm:row-span-2" : ""} ${wide ? "lg:col-span-2" : ""}`}
              >
                <Link
                  to={category.link}
                  className="group relative flex h-full overflow-hidden rounded-lg border border-border bg-black"
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    className="absolute inset-0 h-full w-full object-cover opacity-80 transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  <div className="relative mt-auto flex w-full items-end justify-between gap-4 p-5">
                    <div>
                      <h3 className="font-heading text-lg font-black uppercase leading-tight text-white sm:text-xl">
                        {category.name}
                      </h3>
                      <p className="mt-1 text-xs font-medium text-white/80 line-clamp-2">
                        {category.subtitle}
                      </p>
                    </div>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-primary">
                      <ArrowUpRight className="h-5 w-5" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
