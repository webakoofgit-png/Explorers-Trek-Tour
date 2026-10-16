import { officialSocialLinks } from "@/data/siteData";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";

const WhatsAppButton = () => {
  return (
    <a
      href={officialSocialLinks.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-[#fff] shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#20BD5A] hover:shadow-xl sm:right-6"
      aria-label="Message Explorers on WhatsApp"
    >
      <WhatsAppIcon className="h-6 w-6" />
    </a>
  );
};

export default WhatsAppButton;
