import logoImg from "@/assets/logo.png";

interface ExplorersLogoProps {
  className?: string;
  compact?: boolean;
}

const ExplorersLogo = ({ className = "" }: ExplorersLogoProps) => {
  return (
    <img
      src={logoImg}
      alt="Explorers Treks & Tours"
      className={`object-contain ${className}`}
    />
  );
};

export default ExplorersLogo;
