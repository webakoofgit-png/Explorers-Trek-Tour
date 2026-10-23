import { Link, useLocation } from "react-router-dom";
import { Menu, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { programDirectory } from "@/data/siteData";
import ExplorersLogo from "@/components/ExplorersLogo";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  {
    label: "Treks",
    href: "/treks#trek-schedule",
    children: [
      { label: "Monsoon Treks", href: "/treks?season=monsoon" },
      { label: "Winter Treks", href: "/treks?season=winter" },
      { label: "Summer Treks", href: "/treks?season=summer" },
      { label: "Himalayan Treks", href: "/treks?season=himalayan" },
      { label: "Treks at Glance Calendar", href: "/treks?season=all" },
    ],
  },
  {
    label: "Tours",
    href: "/programs/group-tours#tour-experiences",
    children: [
      { label: "Group Tours", href: "/programs/group-tours" },
      { label: "Customised Domestic", href: "/programs/customised-packages" },
      { label: "Customised International", href: "/programs/customised-packages" },
      { label: "Corporate Tours", href: "/programs/corporate-tours" },
      { label: "School Tours", href: "/programs/school-tours" },
      { label: "Wildlife Tours", href: "/programs/wildlife-tours" },
      { label: "Insurance Assistance", href: "/insurance" },
    ],
  },
  {
    label: "Speciality Tours",
    href: "/programs/women-on-trails",
    children: programDirectory
      .filter((item) => ["Junior Explorers", "Women on Trails", "Silver Explorers", "Explorers on Wheels"].includes(item.title))
      .map((item) => ({ label: item.title, href: item.link })),
  },
  { label: "Camping", href: "/treks?type=Camping" },
  { label: "Atlas", href: "/atlas" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const location = useLocation();

  const isActiveLink = (href: string) => {
    const [pathAndHash, query] = href.split("?");
    const [path] = pathAndHash.split("#");
    const currentParams = new URLSearchParams(location.search);

    if (path === "/") return location.pathname === "/";
    if (query) {
      const requiredParams = new URLSearchParams(query);
      return location.pathname === path && [...requiredParams].every(([key, value]) => currentParams.get(key) === value);
    }
    if (href === "/treks" && currentParams.get("type")?.toLowerCase() === "camping") return false;

    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-[#ece4d0] bg-white shadow-sm">
      <div className="container mx-auto flex h-[76px] items-center justify-between gap-3 px-4 md:h-[90px]">
        <Link to="/" className="flex shrink-0 flex-col items-start leading-none">
          <ExplorersLogo className="h-10 w-40 text-foreground sm:h-11 sm:w-48 md:h-12 md:w-56" />
          <span className="mt-1 text-[0.6rem] font-bold uppercase tracking-[0.2em] text-foreground/75 sm:text-[0.65rem]">
            The Name of Excellence Since 2001
          </span>
        </Link>

        <div className="hidden xl:flex flex-1 justify-center px-3">
          <div className="flex items-center gap-1 px-3 py-2">
            {navLinks.map((link) => {
              const isActive = isActiveLink(link.href) || link.children?.some((child) => isActiveLink(child.href));

              return (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`px-2 py-1 text-xs font-heading font-extrabold uppercase tracking-wide transition-colors 2xl:px-2.5 2xl:text-sm whitespace-nowrap ${
                    isActive ? "text-accent" : "text-foreground hover:text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="hidden lg:flex shrink-0 items-center gap-2">
          <Link to="/login">
            <Button variant="outline" className="h-12 rounded-2xl border-[#e5dcc2] bg-[#fcfaf3] px-5 font-bold uppercase tracking-wider text-xs hover:bg-muted">Login</Button>
          </Link>
          <Link to="/login">
            <Button className="h-12 rounded-2xl px-5 gradient-highlight font-extrabold uppercase tracking-wider text-xs text-highlight-foreground">Sign Up</Button>
          </Link>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <button
              className="rounded-xl border border-[#e5dcc2] bg-[#fcfaf3] p-2 text-foreground shadow-sm transition-colors hover:bg-muted xl:hidden"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[min(92vw,24rem)] p-0">
            <div className="h-full flex flex-col">
              <SheetHeader className="px-6 pt-6 pb-4 border-b border-border">
                <SheetTitle className="text-left font-heading text-xl font-extrabold uppercase text-foreground">
                  Menu
                </SheetTitle>
              </SheetHeader>
              <div className="flex-1 overflow-y-auto px-4 py-4">
                <div className="divide-y divide-border">
                  {navLinks.map((link) => {
                    const isActive = isActiveLink(link.href) || link.children?.some((child) => isActiveLink(child.href));

                    return (
                    <div key={link.label}>
                      <Link
                        to={link.href}
                        className={`flex items-center justify-between px-2 py-3 text-base font-extrabold uppercase tracking-[0.12em] transition-colors hover:text-primary ${
                          isActive ? "text-accent" : "text-foreground"
                        }`}
                      >
                        <span className="font-heading">{link.label}</span>
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      </Link>
                      {link.children && (
                        <div className="pb-2">
                          {link.children.map((child) => {
                            const isChildActive = isActiveLink(child.href);

                            return (
                              <Link
                                key={child.label}
                                to={child.href}
                                className={`block px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] transition-colors hover:text-primary ${
                                  isChildActive ? "text-accent" : "text-muted-foreground"
                                }`}
                              >
                                {child.label}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                    );
                  })}
                </div>
              </div>
              <div className="px-6 pb-6 pt-2 border-t border-border">
                <Link to="/login" className="block mb-3">
                  <Button variant="outline" className="w-full rounded-lg font-bold uppercase tracking-wider text-xs">
                    Login / Sign Up
                  </Button>
                </Link>
                <Link to="/contact" className="block">
                  <Button className="w-full rounded-lg gradient-highlight font-extrabold uppercase tracking-wider text-xs text-highlight-foreground">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
