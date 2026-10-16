import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import Layout from "@/components/Layout";
import InternalPageHero from "@/components/InternalPageHero";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type InsuranceType = "Regular Tour" | "Adventure / Trekking" | "International Travel";

const insuranceTypes: { title: InsuranceType; description: string }[] = [
  { title: "Regular Tour", description: "For domestic tours, family holidays and general travel." },
  { title: "Adventure / Trekking", description: "For treks, camps and adventure-based activities." },
  { title: "International Travel", description: "For overseas tours and international holidays." },
];

const InsurancePage = () => {
  const [insuranceType, setInsuranceType] = useState<InsuranceType>("Regular Tour");
  const [form, setForm] = useState({ name: "", phone: "", email: "", city: "", destination: "", startDate: "", endDate: "", travellers: "" });

  const submitInsuranceEnquiry = (event: React.FormEvent) => {
    event.preventDefault();
    const message = [
      "Hello Explorers, I need insurance assistance.",
      `Insurance type: ${insuranceType}`,
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Email: ${form.email}`,
      `City: ${form.city}`,
      `Destination: ${form.destination}`,
      `Travel dates: ${form.startDate} to ${form.endDate}`,
      `No. of travellers: ${form.travellers}`,
    ].filter(Boolean).join("\n");

    window.open(`https://wa.me/919850504437?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <Layout>
      <InternalPageHero pageName="Insurance Assistance" eyebrow="Travel Support" title="Travel Insurance Assistance" subtitle="Choose your travel type and send a basic enquiry. Our team will guide you through the next private steps." images={["/images/hero-mountains.jpg", "/images/hero-camping.jpg", "/images/hero-women.jpg"]} />

      <section className="section-padding bg-background">
        <div className="container mx-auto grid gap-8 px-4 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <main className="space-y-6">
            <section className="rounded-lg border border-primary/20 bg-primary/5 p-5 sm:p-6">
              <div className="flex gap-3"><ShieldCheck className="mt-0.5 h-6 w-6 shrink-0 text-primary" /><div><h1 className="font-heading text-2xl font-extrabold text-foreground">Important Insurance Information</h1><p className="mt-3 text-sm leading-relaxed text-muted-foreground">Explorers assists with insurance enquiries only. Policy approval, premium, coverage, exclusions, claim decisions and claim settlement are handled by the insurance provider under its policy terms.</p><p className="mt-2 text-sm leading-relaxed text-muted-foreground">Do not send passport, ID, date of birth, medical, payment or other sensitive information through this form or WhatsApp. Our team will explain the private next step if required.</p></div></div>
            </section>

            <section className="rounded-lg border border-border bg-card p-5 card-shadow sm:p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-accent">Step 1</p><h2 className="mt-2 font-heading text-2xl font-extrabold text-foreground">Select Insurance Requirement</h2>
              <div className="mt-5 grid gap-3 md:grid-cols-3">{insuranceTypes.map((item) => <button key={item.title} type="button" onClick={() => setInsuranceType(item.title)} className={`rounded-lg border p-4 text-left transition ${insuranceType === item.title ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background hover:border-primary/50"}`}><h3 className="font-heading font-extrabold">{item.title}</h3><p className={`mt-2 text-sm leading-relaxed ${insuranceType === item.title ? "text-primary-foreground/85" : "text-muted-foreground"}`}>{item.description}</p></button>)}</div>
            </section>

            <form onSubmit={submitInsuranceEnquiry} className="rounded-lg border border-border bg-card p-5 card-shadow sm:p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-accent">Step 2</p><h2 className="mt-2 font-heading text-2xl font-extrabold text-foreground">Basic Insurance Enquiry</h2><p className="mt-2 text-sm text-muted-foreground">Share only basic trip details. Sensitive documents and medical details are never requested here.</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2"><Input required placeholder="Full name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} /><Input required type="tel" placeholder="Mobile number" value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} /><Input type="email" placeholder="Email address" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} /><Input placeholder="City" value={form.city} onChange={(event) => setForm({ ...form, city: event.target.value })} /><Input required placeholder="Travel destination" value={form.destination} onChange={(event) => setForm({ ...form, destination: event.target.value })} /><Input required type="number" min="1" placeholder="Number of travellers" value={form.travellers} onChange={(event) => setForm({ ...form, travellers: event.target.value })} /><Input required type="date" aria-label="Travel start date" value={form.startDate} onChange={(event) => setForm({ ...form, startDate: event.target.value })} /><Input required type="date" aria-label="Travel end date" value={form.endDate} onChange={(event) => setForm({ ...form, endDate: event.target.value })} /></div>
              <Button type="submit" className="mt-5 w-full rounded-full gradient-highlight font-heading font-bold text-highlight-foreground"><WhatsAppIcon className="mr-2 h-4 w-4" />Send Basic Enquiry on WhatsApp</Button>
            </form>
          </main>

          <aside className="h-fit rounded-lg border border-border bg-card p-6 shadow-sm lg:sticky lg:top-32"><h2 className="font-heading text-xl font-extrabold text-foreground">What Happens Next?</h2><ol className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground"><li><strong className="text-foreground">1.</strong> Our team receives your basic enquiry.</li><li><strong className="text-foreground">2.</strong> We guide you to the appropriate insurance enquiry process.</li><li><strong className="text-foreground">3.</strong> Any sensitive details are collected privately, not through this website or WhatsApp.</li></ol><a href="https://wa.me/919850504437?text=Hello%20Explorers%2C%20I%20need%20help%20with%20travel%20insurance." target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-black text-white transition hover:bg-[#20BD5A]"><WhatsAppIcon className="h-4 w-4" />WhatsApp Support</a></aside>
        </div>
      </section>
    </Layout>
  );
};

export default InsurancePage;
