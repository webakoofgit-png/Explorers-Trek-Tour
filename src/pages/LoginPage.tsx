import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
const heroMountains = "/images/hero-mountains.jpg";
const heroCamping = "/images/hero-camping.jpg";
const heroWomen = "/images/hero-women.jpg";
const heroKids = "/images/kids-camp/tent-1.jpg";

const LoginPage = () => {
  const [tab, setTab] = useState<"login" | "signup">("login");

  return (
    <Layout>
      <div>
        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            <div className="lg:col-span-6 hidden lg:block">
              <div className="relative h-full min-h-[520px] overflow-hidden rounded-lg border border-border card-shadow">
                <img src={heroMountains} alt="Mountain trek" className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <p className="text-xs uppercase tracking-widest text-white/70">Explorers Treks & Tours</p>
                  <h2 className="mt-2 font-heading text-3xl font-extrabold">Start your next adventure</h2>
                  <p className="mt-2 text-white/80 text-sm">Track bookings, manage profiles, and get early access to departures.</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-lg border border-border bg-card p-5 card-shadow sm:p-8 md:p-10">
                <div className="flex items-center gap-6 border-b border-border pb-4">
                  <button
                    onClick={() => setTab("login")}
                    className={`text-sm font-semibold pb-3 ${tab === "login" ? "text-primary border-b-2 border-primary" : "text-muted-foreground"}`}
                  >
                    Login
                  </button>
                  <button
                    onClick={() => setTab("signup")}
                    className={`text-sm font-semibold pb-3 ${tab === "signup" ? "text-primary border-b-2 border-primary" : "text-muted-foreground"}`}
                  >
                    Sign Up
                  </button>
                </div>

                {tab === "login" ? (
                  <div className="mt-6 space-y-5">
                    <h3 className="font-heading text-2xl font-extrabold text-foreground">Log into your account</h3>
                    <Input type="email" placeholder="Email" className="bg-background" />
                    <div className="space-y-2">
                      <Input type="password" placeholder="Password" className="bg-background" />
                      <div className="text-right">
                        <button className="text-xs font-semibold text-primary hover:underline">Forgot Password?</button>
                      </div>
                    </div>
                    <Button className="w-full rounded-lg gradient-highlight py-6 font-heading text-base font-bold text-highlight-foreground">
                      Login
                    </Button>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="h-px flex-1 bg-border" />
                      or
                      <span className="h-px flex-1 bg-border" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <Button variant="outline" className="rounded-lg">Sign in with Google</Button>
                      <Button variant="outline" className="rounded-lg">Continue with Mobile</Button>
                    </div>
                  </div>
                ) : (
                  <div className="mt-6 space-y-5">
                    <h3 className="font-heading text-2xl font-extrabold text-foreground">Create your account</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input placeholder="First Name" className="bg-background" />
                      <Input placeholder="Last Name" className="bg-background" />
                    </div>
                    <Input type="tel" placeholder="Phone Number" className="bg-background" />
                    <Input type="email" placeholder="Email" className="bg-background" />
                    <Input type="password" placeholder="Password" className="bg-background" />
                    <Input type="password" placeholder="Confirm Password" className="bg-background" />
                    <Button className="w-full rounded-lg gradient-highlight py-6 font-heading text-base font-bold text-highlight-foreground">
                      Create Account
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
