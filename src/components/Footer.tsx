import { Link } from "react-router-dom";
import { Facebook, Instagram, MapPin, Phone, Youtube } from "lucide-react";
import { officialSocialLinks } from "@/data/siteData";
import footerLogo from "@/assets/Explorer logo.webp";

const quickLinks = [
  ["Home", "/"],
  ["About Us", "/about"],
  ["Treks", "/treks"],
  ["Tours", "/programs/group-tours"],
  ["Speciality Tours", "/programs/lady-explorers"],
  ["Camping", "/treks?type=Camping"],
  ["Atlas", "/atlas"],
  ["Contact", "/contact"],
  ["Mountain Run", "/programs/mountain-run"],
  ["School Tours", "/programs/school-tours"],
  ["Corporate Tours", "/programs/corporate-tours"],
  ["Customised Tour Packages", "/programs/customised-packages"],
];

const footerGroups = [
  {
    title: "Useful Links",
    links: [
      ["How to Book", "/contact"],
      ["Cancellation Policy", "/contact"],
      ["Rules During Event", "/contact"],
      ["Discount Policy", "/contact"],
      ["Privacy Policy", "/contact"],
      ["Work With Us", "/contact"],
      ["Career Opportunities", "/contact"],
      ["Why Explorers", "/about"],
    ],
  },
  {
    title: "Speciality",
    links: [
      ["Upcoming Events", "/treks"],
      ["Junior Explorers", "/programs/junior-explorers"],
      ["Lady Explorers", "/programs/lady-explorers"],
      ["Silver Explorers", "/programs/silver-explorers"],
      ["Jungle Safari", "/programs/wildlife-tours"],
      ["ATLAS Academy", "/atlas"],
    ],
  },
  {
    title: "We Also Offer",
    links: [
      ["School & Educational Tours", "/programs/school-tours"],
      ["Corporate / Team Building Tours", "/programs/corporate-tours"],
      ["Domestic Tours", "/programs/customised-packages"],
      ["International Tours", "/programs/customised-packages"],
      ["Fix Departure Tours", "/programs/group-tours"],
      ["Membership", "/contact"],
    ],
  },
];

const socialLinks = [
  ["Instagram", officialSocialLinks.instagram, Instagram],
  ["Facebook", officialSocialLinks.facebook, Facebook],
  ["YouTube", officialSocialLinks.youtube, Youtube],
];

const Footer = () => {
  return (
    <footer className="bg-[#45474d] text-white">
      <div className="container mx-auto px-4 py-10 md:py-12">
        <div className="grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <div className="space-y-5">
            <div>
              <div className="relative mb-3 h-20 w-full max-w-[20rem] overflow-hidden" aria-label="Explorers Treks & Tours">
                <img
                  src={footerLogo}
                  alt="Explorers Treks & Tours"
                  className="absolute left-1/2 top-1/2 w-[110%] min-w-[18rem] max-w-none -translate-x-1/2 -translate-y-1/2 object-contain"
                />
              </div>
              {/* Item 24: Below logo keep TREKS TOURS TRAINING line */}
              <p className="mb-1 font-heading text-sm font-black uppercase tracking-[0.22em] text-white">
                TREKS • TOURS • TRAINING
              </p>
              <p className="mb-3 text-xs font-bold uppercase tracking-widest text-white/80">
                The Name of Excellence Since 2001
              </p>
              <p className="text-sm leading-relaxed text-white/85">
                Trusted by lakhs of explorers for safe treks, camps, tours, school programs, corporate events and customised travel.
              </p>
            </div>

            <div className="space-y-2.5 text-sm">
              <a href="tel:+919850502723" className="flex items-start gap-2 font-semibold text-white/90 hover:text-white">
                <Phone className="mt-0.5 h-4 w-4 shrink-0" />
                <span>Treks / Himalaya / Jungle Safari: 9850502723 | 9850506622</span>
              </a>
              <a href="tel:+919850504433" className="flex items-start gap-2 font-semibold text-white/90 hover:text-white">
                <Phone className="mt-0.5 h-4 w-4 shrink-0" />
                <span>Tour Packages / Corporate / School: 9850504433 | 9850507733</span>
              </a>
              <a href={officialSocialLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 font-semibold text-white/90 hover:text-white">
                <Phone className="mt-0.5 h-4 w-4 shrink-0" />
                <span>WhatsApp: 9850504437</span>
              </a>
              <a
                href="https://maps.app.goo.gl/FsPNVHuJzyX5Yqau7"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 font-semibold text-white/90 hover:text-white"
              >
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                <span>1692, Bhagyadarshan Building, Shop No 5, Sadashiv Peth, Tilak Road, Pune 411030</span>
              </a>
              
              {/* Item 25: GOOGLE LOCATION EMBEDDED MAP */}
              <div className="pt-2">
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-heading text-xs font-black uppercase tracking-wider text-white">
                    Google Location Map
                  </span>
                  <a
                    href="https://maps.app.goo.gl/FsPNVHuJzyX5Yqau7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 font-heading text-[0.7rem] font-black uppercase tracking-wider text-white transition-colors hover:bg-white/25"
                  >
                    <MapPin className="h-3 w-3" />
                    Open in Maps
                  </a>
                </div>
                <div className="overflow-hidden rounded-xl border border-white/20 shadow-md">
                  <iframe
                    src="https://maps.google.com/maps?q=Explorers+Treks+and+Tours+Sadashiv+Peth+Pune&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="160"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Explorers Treks & Tours Google Location Map"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 min-[520px]:grid-cols-2 lg:grid-cols-4">
            <div>
              <h4 className="mb-3 font-heading text-base font-black uppercase tracking-wider">Quick Links</h4>
              <ul className="space-y-1.5 text-sm">
                {quickLinks.map(([label, href]) => (
                  <li key={label}>
                    <Link to={href} className="break-words font-medium text-white/80 transition-colors hover:text-white">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            {footerGroups.map((group) => (
              <div key={group.title}>
                <h4 className="mb-3 font-heading text-base font-black uppercase tracking-wider">{group.title}</h4>
                <ul className="space-y-1.5 text-sm">
                  {group.links.map(([label, href]) => (
                    <li key={label}>
                      <Link to={href} className="break-words font-medium text-white/80 transition-colors hover:text-white">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/20 pt-6 md:flex-row">
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs font-semibold text-white/75 md:justify-start">
            <span>© {new Date().getFullYear()} Explorers Treks & Tours. All rights reserved.</span>
            <span aria-hidden="true">|</span>
            <a
              href="https://webakoof.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white transition-colors hover:text-highlight"
            >
              Designed by Webakoof
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {socialLinks.map(([label, href, Icon]) => (
              <a
                key={label as string}
                href={href as string}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
                aria-label={label as string}
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
