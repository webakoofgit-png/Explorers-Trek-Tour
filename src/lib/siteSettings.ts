export const WHATSAPP_GROUP_STORAGE_KEY = "explorers.whatsappGroupLink";
export const SITE_SETTINGS_UPDATED_EVENT = "explorers:site-settings-updated";

export const defaultWhatsAppGroupLink = "https://chat.whatsapp.com/ExplorersGroupJoin";

export const isValidWhatsAppGroupLink = (value: string) => {
  try {
    const url = new URL(value.trim());
    return url.protocol === "https:" && url.hostname === "chat.whatsapp.com" && url.pathname.length > 1;
  } catch {
    return false;
  }
};

export const getWhatsAppGroupLink = () => {
  if (typeof window === "undefined") return defaultWhatsAppGroupLink;

  const savedLink = window.localStorage.getItem(WHATSAPP_GROUP_STORAGE_KEY)?.trim();
  return savedLink && isValidWhatsAppGroupLink(savedLink) ? savedLink : defaultWhatsAppGroupLink;
};

export const saveWhatsAppGroupLink = (value: string) => {
  const link = value.trim();

  if (!isValidWhatsAppGroupLink(link)) {
    throw new Error("Enter a valid WhatsApp group invite link beginning with https://chat.whatsapp.com/");
  }

  window.localStorage.setItem(WHATSAPP_GROUP_STORAGE_KEY, link);
  window.dispatchEvent(new CustomEvent(SITE_SETTINGS_UPDATED_EVENT));
  return link;
};
