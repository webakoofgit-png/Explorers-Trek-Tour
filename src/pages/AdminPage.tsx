import { useState } from "react";
import { Lock, MessageCircle, Plus, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import Layout from "@/components/Layout";
import { adminModules, offers, treks } from "@/data/siteData";
import { getWhatsAppGroupLink, saveWhatsAppGroupLink } from "@/lib/siteSettings";
import { useToast } from "@/hooks/use-toast";

const AdminPage = () => {
  const { toast } = useToast();
  const [whatsAppGroupLink, setWhatsAppGroupLink] = useState(getWhatsAppGroupLink);

  const handleWhatsAppGroupSave = () => {
    try {
      const savedLink = saveWhatsAppGroupLink(whatsAppGroupLink);
      setWhatsAppGroupLink(savedLink);
      toast({
        title: "WhatsApp group updated",
        description: "The Join Our WhatsApp Group card now uses the new invite link.",
      });
    } catch (error) {
      toast({
        title: "Invalid WhatsApp link",
        description: error instanceof Error ? error.message : "Please check the group invite link.",
        variant: "destructive",
      });
    }
  };

  return (
    <Layout>
      <section className="gradient-primary px-4 py-12 text-foreground md:py-14">
        <div className="container mx-auto">
          <p className="font-heading text-sm font-black uppercase tracking-[0.24em] text-accent">Secure Admin Panel</p>
          <h1 className="mt-3 font-heading text-3xl font-black sm:text-4xl md:text-5xl">Manage Explorers Website Content</h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-foreground/75 md:text-base">Admin-ready interface for sliders, event cards, seasonal tabs, batches, offers, galleries, bookings, payments, enquiries, and contact details.</p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container mx-auto grid gap-8 lg:grid-cols-[18rem_minmax(0,1fr)] xl:grid-cols-[20rem_minmax(0,1fr)]">
          <aside className="rounded-lg border border-border bg-card p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <Lock className="h-5 w-5 text-primary" />
              <h2 className="font-heading font-black">Admin Login</h2>
            </div>
            <div className="mt-5 space-y-3">
              <Input placeholder="Admin email" />
              <Input placeholder="Password" type="password" />
              <Button className="w-full rounded-full gradient-primary text-primary-foreground">Secure Login</Button>
            </div>
          </aside>

          <main className="space-y-8">
            <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#25D366]/15 text-[#128C7E]">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-heading text-2xl font-black">WhatsApp Group Management</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Change the invite used by the “Join Our WhatsApp Group” card on the Home page.
                  </p>
                </div>
              </div>

              <div className="mt-5 grid gap-3 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
                <label className="grid gap-2 text-sm font-bold text-foreground">
                  WhatsApp group invite link
                  <Input
                    type="url"
                    value={whatsAppGroupLink}
                    onChange={(event) => setWhatsAppGroupLink(event.target.value)}
                    placeholder="https://chat.whatsapp.com/your-invite-code"
                    spellCheck={false}
                  />
                </label>
                <Button type="button" onClick={handleWhatsAppGroupSave} className="w-full rounded-lg md:w-auto">
                  <Save className="mr-2 h-4 w-4" /> Save Group Link
                </Button>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                Only secure links from chat.whatsapp.com are accepted.
              </p>
            </div>

            <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="font-heading text-2xl font-black">Editable Modules</h2>
                  <p className="text-sm text-muted-foreground">Every card/page content area is represented as a module for add, edit, delete, hide, and show workflows.</p>
                </div>
                <Button className="w-full rounded-lg gradient-highlight text-highlight-foreground sm:w-auto"><Plus className="mr-2 h-4 w-4" /> Add Content</Button>
              </div>
              <div className="mt-6 grid gap-3 md:grid-cols-2">
                {adminModules.map((module) => (
                  <div key={module} className="flex items-center justify-between gap-4 rounded-lg border border-border bg-background p-4">
                    <span className="text-sm font-bold text-foreground">{module}</span>
                    <Switch defaultChecked />
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
              <h2 className="font-heading text-2xl font-black">Event Cards</h2>
              <div className="mt-5 grid gap-4">
                {treks.slice(0, 4).map((event) => (
                  <div key={event.id} className="grid gap-3 rounded-lg border border-border bg-background p-4 md:grid-cols-[1fr_auto_auto] md:items-center">
                    <div>
                      <div className="font-heading font-black text-primary">{event.title}</div>
                      <div className="text-sm text-muted-foreground">{event.location} | Rs.{event.price} | {event.tag}</div>
                    </div>
                    <Switch defaultChecked />
                    <Button variant="outline" size="sm" className="w-full md:w-auto"><Save className="mr-2 h-4 w-4" /> Save</Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
              <h2 className="font-heading text-2xl font-black">Offer Engine</h2>
              <div className="mt-5 grid gap-3 md:grid-cols-2">
                {offers.map((offer) => (
                  <div key={offer.name} className="rounded-lg border border-border bg-background p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div className="font-heading font-black text-primary">{offer.name}</div>
                      <Switch defaultChecked />
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{offer.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </section>
    </Layout>
  );
};

export default AdminPage;
