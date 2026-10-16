import type { LucideIcon } from "lucide-react";
import { BadgeCheck, CalendarClock, Mountain, ShieldCheck, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const iconsByLabel: Record<string, LucideIcon> = {
  "Years Experience": CalendarClock,
  "Certified by Maharashtra Tourism": BadgeCheck,
  "Safety Record": ShieldCheck,
  "Google Rating": Star,
  "Treks Completed": Mountain,
};

type TrustStatIconProps = {
  label: string;
  inverted?: boolean;
  className?: string;
};

const TrustStatIcon = ({ label, inverted = false, className }: TrustStatIconProps) => {
  const Icon = iconsByLabel[label] ?? BadgeCheck;
  const isRating = label === "Google Rating";

  return (
    <div
      className={cn(
        "flex h-11 w-11 items-center justify-center rounded-xl ring-1",
        inverted
          ? "bg-white/15 text-white ring-white/25"
          : "bg-primary/10 text-primary ring-primary/20",
        className,
      )}
      aria-hidden="true"
    >
      <Icon className={cn("h-6 w-6", isRating && "fill-current")} strokeWidth={2.2} />
    </div>
  );
};

export default TrustStatIcon;
