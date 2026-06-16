import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, ArrowRight, Check, PartyPopper, Heart, Briefcase, Users,
  Baby, Sparkles, Palette, Disc, Coffee, Scissors, CheckCircle2,
  CalendarDays, Clock, Phone, Mail, User, FileText, ChevronRight,
  Minus, Plus, Gift, Camera, Star, Mic2,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

// ─── Data ────────────────────────────────────────────────────────────────────

const eventTypes = [
  { id: "birthday", label: "Birthday Party", icon: <PartyPopper size={28} />, color: "from-pink-500 to-rose-400", hint: "Packages from 8 guests" },
  { id: "date", label: "Couple's Date", icon: <Heart size={28} />, color: "from-rose-500 to-pink-400", hint: "Perfect for 2" },
  { id: "corporate", label: "Corporate Outing", icon: <Briefcase size={28} />, color: "from-blue-600 to-blue-400", hint: "10–50 people" },
  { id: "family", label: "Family Day", icon: <Users size={28} />, color: "from-amber-500 to-orange-400", hint: "3–20 people" },
  { id: "kids", label: "Kids' Party", icon: <Baby size={28} />, color: "from-violet-500 to-purple-400", hint: "Ages 5–12" },
  { id: "custom", label: "Custom Event", icon: <Sparkles size={28} />, color: "from-teal-500 to-emerald-400", hint: "You tell us!" },
];

const activities = [
  { id: "paint", name: "Paint Your Pottery", icon: <Palette size={20} />, price: 599, duration: "1.5–2 hrs", desc: "Choose a ceramic piece, paint it with vibrant glazes, and we fire it for you." },
  { id: "wheel", name: "Pottery Wheel", icon: <Disc size={20} />, price: 799, duration: "45–60 min", desc: "Throw clay on a spinning wheel — guided, beginner-friendly, and genuinely fun." },
  { id: "cafe", name: "Café & Dining", icon: <Coffee size={20} />, price: 450, duration: "Open visit", desc: "Full café menu — mains, desserts, specialty coffee, and mocktails." },
  { id: "knitting", name: "Knitting Studio", icon: <Scissors size={20} />, price: 499, duration: "1–2 hrs", desc: "Stitch, sip, and slow down. Perfect alongside a warm drink." },
];

const addons = [
  { id: "decor", name: "Welcome Decoration", icon: <Sparkles size={18} />, price: 1500, unit: "flat" as const, desc: "Balloons, bunting, centerpieces & custom table setup for your group." },
  { id: "cake", name: "Celebration Cake", icon: <PartyPopper size={18} />, price: 2500, unit: "flat" as const, desc: "Handcrafted cake serving 8–10, customised to your theme." },
  { id: "host", name: "Dedicated Host", icon: <Star size={18} />, price: 2000, unit: "flat" as const, desc: "A dedicated Claytopia team member just for your group all evening." },
  { id: "photo", name: "Studio Photography", icon: <Camera size={18} />, price: 3000, unit: "flat" as const, desc: "1-hour shoot, 20 edited digital photos delivered within 3 days." },
  { id: "bags", name: "Gift Bags", icon: <Gift size={18} />, price: 500, unit: "per-person" as const, desc: "Branded tote with pottery supplies, snacks & a handwritten note." },
  { id: "music", name: "Live Music (30 min)", icon: <Mic2 size={18} />, price: 4000, unit: "flat" as const, desc: "Acoustic performance from one of our resident musicians. Sets the mood." },
];

const timeSlots = ["11:00 AM", "12:00 PM", "1:00 PM", "2:30 PM", "4:00 PM", "5:30 PM", "7:00 PM", "8:30 PM"];

// ─── Types ───────────────────────────────────────────────────────────────────

interface ActivityCount { [id: string]: number }
interface AddonCount { [id: string]: number }

// ─── Helpers ─────────────────────────────────────────────────────────────────

function calcTotal(acts: ActivityCount, adds: AddonCount, totalGuests: number) {
  const actTotal = activities.reduce((sum, a) => sum + (acts[a.id] ?? 0) * a.price, 0);
  const addTotal = addons.reduce((sum, a) => {
    const qty = adds[a.id] ?? 0;
    if (!qty) return sum;
    return sum + (a.unit === "flat" ? a.price : a.price * Math.max(qty, 1));
  }, 0);
  return actTotal + addTotal;
}

function generateRef() { return "EVT-" + Math.floor(Math.random() * 90000 + 10000); }

// ─── Step progress ───────────────────────────────────────────────────────────

const STEPS = ["Event Type", "Build Experience", "Your Details", "Review & Confirm"];

function StepBar({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-10">
      {STEPS.map((label, i) => {
        const idx = i + 1;
        const done = idx < current;
        const active = idx === current;
        return (
          <div key={i} className="flex items-center">
            <div className="flex flex-col items-center">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${done ? "bg-primary text-primary-foreground" : active ? "bg-primary text-primary-foreground ring-4 ring-primary/20" : "bg-muted text-muted-foreground"}`}>
                {done ? <Check size={16} /> : idx}
              </div>
              <span className={`text-[10px] mt-1.5 font-medium hidden sm:block whitespace-nowrap ${active ? "text-primary" : done ? "text-foreground/60" : "text-muted-foreground"}`}>{label}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`w-12 sm:w-20 h-0.5 mx-1 transition-all duration-300 ${idx < current ? "bg-primary" : "bg-border"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Slide wrapper ────────────────────────────────────────────────────────────

function Slide({ children, stepKey }: { children: React.ReactNode; stepKey: number }) {
  return (
    <motion.div
      key={stepKey}
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function PlanEventPage() {
  const { toast } = useToast();

  const preselectedType =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("type") ?? ""
      : "";

  const [step, setStep] = useState(preselectedType ? 1 : 1);
  const [eventType, setEventType] = useState(preselectedType);
  const [actCounts, setActCounts] = useState<ActivityCount>({});
  const [addonCounts, setAddonCounts] = useState<AddonCount>({});
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [totalGuests, setTotalGuests] = useState(4);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [orderRef] = useState(generateRef);

  useEffect(() => {
    document.title = "Plan an Event | Bistro Claytopia – Koramangala, Bengaluru";
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const total = calcTotal(actCounts, addonCounts, totalGuests);
  const hasActivities = Object.values(actCounts).some((v) => v > 0);

  const setAct = (id: string, delta: number) => {
    setActCounts((p) => { const n = Math.max(0, (p[id] ?? 0) + delta); return { ...p, [id]: n }; });
  };
  const toggleAddon = (id: string) => {
    setAddonCounts((p) => ({ ...p, [id]: p[id] ? 0 : 1 }));
  };
  const setAddonQty = (id: string, delta: number) => {
    setAddonCounts((p) => { const n = Math.max(0, (p[id] ?? 0) + delta); return { ...p, [id]: n }; });
  };

  const canProceed = () => {
    if (step === 1) return !!eventType;
    if (step === 2) return hasActivities;
    if (step === 3) return !!(name && email && phone && date && timeSlot);
    return true;
  };

  const handleConfirm = () => {
    setSubmitted(true);
    toast({ title: "Event request received! 🎉", description: `We'll confirm ${orderRef} within 2 hours.` });
  };

  if (submitted) return <SubmittedScreen orderRef={orderRef} name={name} />;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero header — sits cleanly above wizard, no overlap */}
      <section className="relative h-[44vh] min-h-[320px] max-h-[460px] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/gallery-2.png')" }}
          role="img"
          aria-label="Guests enjoying a group pottery event at Bistro Claytopia"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/20" />
        </div>
        <div className="relative z-10 container mx-auto px-4 md:px-6 pb-10 md:pb-12 w-full">
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-white/60 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors" data-testid="link-plan-back">
                  Home
                </Link>
              </li>
              <li><ChevronRight size={14} /></li>
              <li className="text-white font-medium">Plan an Event</li>
            </ol>
          </nav>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
          >
            <p className="text-primary text-xs uppercase tracking-[0.2em] font-semibold mb-2">
              Private & Group Events
            </p>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white drop-shadow-lg mb-2.5">
              Plan Your Event
            </h1>
            <p className="text-white/70 text-base md:text-lg max-w-xl leading-relaxed">
              Build your perfect Claytopia experience — choose activities, add-ons, and we'll handle every detail.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Wizard — sits on its own white section, fully separate from hero */}
      <section className="pb-20 md:pb-28 bg-background">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <StepBar current={step} />

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-10">
            {/* Step content */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <Slide stepKey={1}>
                    <Step1EventType selected={eventType} onSelect={setEventType} />
                  </Slide>
                )}
                {step === 2 && (
                  <Slide stepKey={2}>
                    <Step2Experience
                      actCounts={actCounts}
                      addonCounts={addonCounts}
                      totalGuests={totalGuests}
                      onSetAct={setAct}
                      onToggleAddon={toggleAddon}
                      onSetAddonQty={setAddonQty}
                    />
                  </Slide>
                )}
                {step === 3 && (
                  <Slide stepKey={3}>
                    <Step3Details
                      totalGuests={totalGuests} setTotalGuests={setTotalGuests}
                      date={date} setDate={setDate}
                      timeSlot={timeSlot} setTimeSlot={setTimeSlot}
                      name={name} setName={setName}
                      email={email} setEmail={setEmail}
                      phone={phone} setPhone={setPhone}
                      notes={notes} setNotes={setNotes}
                    />
                  </Slide>
                )}
                {step === 4 && (
                  <Slide stepKey={4}>
                    <Step4Review
                      eventType={eventType}
                      actCounts={actCounts}
                      addonCounts={addonCounts}
                      totalGuests={totalGuests}
                      date={date} timeSlot={timeSlot}
                      name={name} email={email} phone={phone} notes={notes}
                      total={total}
                    />
                  </Slide>
                )}
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-border/60">
                {step > 1 ? (
                  <button onClick={() => setStep(s => s - 1)} className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-border text-sm font-medium hover:bg-muted transition-colors" data-testid="button-step-back">
                    <ArrowLeft size={15} /> Back
                  </button>
                ) : <div />}
                {step < 4 ? (
                  <button
                    onClick={() => canProceed() && setStep(s => s + 1)}
                    disabled={!canProceed()}
                    data-testid="button-step-next"
                    className="flex items-center gap-2 px-8 py-3 rounded-full bg-primary text-primary-foreground text-sm font-bold hover:bg-primary/90 transition-all hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 shadow-md"
                  >
                    Continue <ArrowRight size={15} />
                  </button>
                ) : (
                  <button
                    onClick={handleConfirm}
                    data-testid="button-confirm-event"
                    className="flex items-center gap-2 px-8 py-3 rounded-full bg-primary text-primary-foreground text-sm font-bold hover:bg-primary/90 transition-all hover:scale-105 shadow-md"
                  >
                    <CheckCircle2 size={16} /> Confirm Event Request
                  </button>
                )}
              </div>
            </div>

            {/* Sidebar: live pricing */}
            <div className="hidden lg:block">
              <div className="sticky top-24">
                <PricingSidebar
                  eventType={eventType}
                  actCounts={actCounts}
                  addonCounts={addonCounts}
                  totalGuests={totalGuests}
                  total={total}
                  step={step}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// ─── Step 1: Event Type ───────────────────────────────────────────────────────

function Step1EventType({ selected, onSelect }: { selected: string; onSelect: (v: string) => void }) {
  return (
    <div>
      <h2 className="text-2xl font-serif font-bold mb-2">What are you celebrating?</h2>
      <p className="text-muted-foreground text-sm mb-7">Choose the type of event — this helps us tailor the experience for you.</p>
      <div className="grid sm:grid-cols-2 gap-4">
        {eventTypes.map((et) => (
          <button
            key={et.id}
            onClick={() => onSelect(et.id)}
            data-testid={`button-event-type-${et.id}`}
            className={`group relative flex items-start gap-4 p-5 rounded-2xl border-2 text-left transition-all duration-200 ${selected === et.id ? "border-primary bg-primary/5 shadow-lg" : "border-border/60 bg-card hover:border-primary/40 hover:bg-card/80 hover:shadow-md"}`}
          >
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${et.color} flex items-center justify-center text-white shrink-0 shadow-md group-hover:scale-105 transition-transform`}>
              {et.icon}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-foreground text-base mb-0.5">{et.label}</h3>
              <p className="text-xs text-muted-foreground">{et.hint}</p>
            </div>
            {selected === et.id && (
              <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                <Check size={13} className="text-primary-foreground" />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Step 2: Experience builder ───────────────────────────────────────────────

function Step2Experience({ actCounts, addonCounts, totalGuests, onSetAct, onToggleAddon, onSetAddonQty }: {
  actCounts: ActivityCount; addonCounts: AddonCount; totalGuests: number;
  onSetAct: (id: string, delta: number) => void;
  onToggleAddon: (id: string) => void;
  onSetAddonQty: (id: string, delta: number) => void;
}) {
  return (
    <div className="space-y-8">
      {/* Activities */}
      <div>
        <h2 className="text-2xl font-serif font-bold mb-2">Choose your experiences</h2>
        <p className="text-muted-foreground text-sm mb-6">Set how many people will do each activity. Mix and match freely.</p>
        <div className="space-y-3">
          {activities.map((act) => {
            const qty = actCounts[act.id] ?? 0;
            return (
              <div key={act.id} data-testid={`row-activity-${act.id}`}
                className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${qty > 0 ? "border-primary/40 bg-primary/5" : "border-border/60 bg-card hover:border-border"}`}
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-colors ${qty > 0 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                  {act.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-sm">{act.name}</h3>
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{act.duration}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{act.desc}</p>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <p className="font-bold text-sm">₹{act.price}<span className="font-normal text-muted-foreground text-xs">/person</span></p>
                  <div className="flex items-center gap-2">
                    <button onClick={() => onSetAct(act.id, -1)} disabled={qty === 0} className="w-7 h-7 rounded-full bg-muted hover:bg-border flex items-center justify-center disabled:opacity-40 transition-colors" data-testid={`button-dec-act-${act.id}`}><Minus size={12} /></button>
                    <span className={`w-7 text-center text-sm font-bold ${qty > 0 ? "text-primary" : "text-muted-foreground"}`}>{qty}</span>
                    <button onClick={() => onSetAct(act.id, 1)} className="w-7 h-7 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 flex items-center justify-center transition-colors" data-testid={`button-inc-act-${act.id}`}><Plus size={12} /></button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add-ons */}
      <div>
        <h2 className="text-xl font-serif font-bold mb-2">Add-ons</h2>
        <p className="text-muted-foreground text-sm mb-5">Make your event extra special. All optional.</p>
        <div className="grid sm:grid-cols-2 gap-3">
          {addons.map((addon) => {
            const qty = addonCounts[addon.id] ?? 0;
            const active = qty > 0;
            return (
              <div key={addon.id} data-testid={`card-addon-${addon.id}`}
                className={`p-4 rounded-2xl border-2 transition-all ${active ? "border-primary/40 bg-primary/5" : "border-border/60 bg-card"}`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                      {addon.icon}
                    </div>
                    <div>
                      <p className="font-semibold text-sm leading-snug">{addon.name}</p>
                      <p className="text-xs text-primary font-medium">₹{addon.price}{addon.unit === "per-person" ? "/person" : " flat"}</p>
                    </div>
                  </div>
                  {addon.unit === "per-person" && active ? (
                    <div className="flex items-center gap-1.5">
                      <button onClick={() => onSetAddonQty(addon.id, -1)} className="w-6 h-6 rounded-full bg-muted hover:bg-border flex items-center justify-center text-xs" data-testid={`button-dec-addon-${addon.id}`}><Minus size={10} /></button>
                      <span className="text-sm font-bold text-primary w-5 text-center">{qty}</span>
                      <button onClick={() => onSetAddonQty(addon.id, 1)} className="w-6 h-6 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 flex items-center justify-center text-xs" data-testid={`button-inc-addon-${addon.id}`}><Plus size={10} /></button>
                    </div>
                  ) : (
                    <button onClick={() => onToggleAddon(addon.id)} data-testid={`button-toggle-addon-${addon.id}`}
                      className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${active ? "bg-primary border-primary text-primary-foreground" : "border-border hover:border-primary/60"}`}>
                      {active ? <Check size={14} /> : <Plus size={14} />}
                    </button>
                  )}
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{addon.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Step 3: Details ──────────────────────────────────────────────────────────

function Step3Details({ totalGuests, setTotalGuests, date, setDate, timeSlot, setTimeSlot, name, setName, email, setEmail, phone, setPhone, notes, setNotes }: {
  totalGuests: number; setTotalGuests: (v: number) => void;
  date: string; setDate: (v: string) => void;
  timeSlot: string; setTimeSlot: (v: string) => void;
  name: string; setName: (v: string) => void;
  email: string; setEmail: (v: string) => void;
  phone: string; setPhone: (v: string) => void;
  notes: string; setNotes: (v: string) => void;
}) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-serif font-bold mb-2">Group & Date Details</h2>
        <p className="text-muted-foreground text-sm mb-6">Tell us when and how many — we'll make sure everything is ready.</p>
      </div>

      {/* Guest count */}
      <div className="bg-card rounded-2xl border border-border/60 p-6">
        <h3 className="font-semibold mb-4 flex items-center gap-2"><Users size={16} className="text-primary" /> Total Guests</h3>
        <div className="flex items-center gap-4">
          <button onClick={() => setTotalGuests(Math.max(1, totalGuests - 1))} className="w-10 h-10 rounded-full border-2 border-border hover:border-primary/60 flex items-center justify-center transition-colors" data-testid="button-dec-guests"><Minus size={16} /></button>
          <div className="text-center">
            <span className="text-4xl font-serif font-bold text-primary">{totalGuests}</span>
            <p className="text-xs text-muted-foreground mt-0.5">people</p>
          </div>
          <button onClick={() => setTotalGuests(totalGuests + 1)} className="w-10 h-10 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 flex items-center justify-center transition-colors" data-testid="button-inc-guests"><Plus size={16} /></button>
          <p className="text-sm text-muted-foreground ml-2">For groups over 20, we'll follow up with a tailored quote.</p>
        </div>
      </div>

      {/* Date & Time */}
      <div className="bg-card rounded-2xl border border-border/60 p-6 space-y-5">
        <h3 className="font-semibold flex items-center gap-2"><CalendarDays size={16} className="text-primary" /> Date & Time</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground block mb-1.5">Preferred Date</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} data-testid="input-event-date"
              min={new Date().toISOString().split("T")[0]}
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground block mb-1.5">Preferred Time</label>
            <div className="grid grid-cols-2 gap-2 max-h-36 overflow-y-auto pr-1">
              {timeSlots.map((t) => (
                <button key={t} onClick={() => setTimeSlot(t)} data-testid={`button-timeslot-${t.replace(" ", "-")}`}
                  className={`px-2 py-2 rounded-lg text-xs font-medium border transition-all ${timeSlot === t ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary/50 bg-background"}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="bg-card rounded-2xl border border-border/60 p-6 space-y-4">
        <h3 className="font-semibold flex items-center gap-2"><User size={16} className="text-primary" /> Your Contact</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground block mb-1.5">Full Name *</label>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" data-testid="input-event-name"
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 placeholder:text-muted-foreground" />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground block mb-1.5">Phone *</label>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 98765 43210" type="tel" data-testid="input-event-phone"
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 placeholder:text-muted-foreground" />
          </div>
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground block mb-1.5">Email *</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" type="email" data-testid="input-event-email"
            className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 placeholder:text-muted-foreground" />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground block mb-1.5">Special Requests or Notes</label>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} placeholder="Dietary needs, theme preferences, surprise elements..." data-testid="input-event-notes"
            className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none placeholder:text-muted-foreground" />
        </div>
      </div>
    </div>
  );
}

// ─── Step 4: Review ───────────────────────────────────────────────────────────

function Step4Review({ eventType, actCounts, addonCounts, totalGuests, date, timeSlot, name, email, phone, notes, total }: {
  eventType: string; actCounts: ActivityCount; addonCounts: AddonCount;
  totalGuests: number; date: string; timeSlot: string;
  name: string; email: string; phone: string; notes: string; total: number;
}) {
  const et = eventTypes.find((e) => e.id === eventType);
  const selectedActs = activities.filter((a) => (actCounts[a.id] ?? 0) > 0);
  const selectedAddons = addons.filter((a) => (addonCounts[a.id] ?? 0) > 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-serif font-bold mb-2">Review your event plan</h2>
        <p className="text-muted-foreground text-sm mb-6">Everything looks good? Confirm and we'll reach out within 2 hours.</p>
      </div>

      {/* Event type */}
      <div className="bg-card rounded-2xl border border-border/60 p-5">
        <p className="text-xs uppercase tracking-[0.15em] text-primary font-semibold mb-2">Event Type</p>
        <div className={`inline-flex items-center gap-3 px-4 py-2.5 rounded-xl bg-gradient-to-r ${et?.color} text-white font-semibold`}>
          {et?.icon} <span className="text-sm">{et?.label}</span>
        </div>
      </div>

      {/* Activities */}
      {selectedActs.length > 0 && (
        <div className="bg-card rounded-2xl border border-border/60 p-5">
          <p className="text-xs uppercase tracking-[0.15em] text-primary font-semibold mb-3">Activities</p>
          <div className="space-y-3">
            {selectedActs.map((a) => (
              <div key={a.id} className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">{a.icon}</span>
                  <span>{a.name}</span>
                  <span className="text-muted-foreground">× {actCounts[a.id]}</span>
                </div>
                <span className="font-semibold text-sm">₹{a.price * actCounts[a.id]}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add-ons */}
      {selectedAddons.length > 0 && (
        <div className="bg-card rounded-2xl border border-border/60 p-5">
          <p className="text-xs uppercase tracking-[0.15em] text-primary font-semibold mb-3">Add-ons</p>
          <div className="space-y-3">
            {selectedAddons.map((a) => {
              const qty = addonCounts[a.id];
              const cost = a.unit === "flat" ? a.price : a.price * qty;
              return (
                <div key={a.id} className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-sm">
                    <span>{a.icon}</span>
                    <span>{a.name}</span>
                    {a.unit === "per-person" && <span className="text-muted-foreground">× {qty}</span>}
                  </div>
                  <span className="font-semibold text-sm">₹{cost}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Event details */}
      <div className="bg-card rounded-2xl border border-border/60 p-5 grid sm:grid-cols-2 gap-4 text-sm">
        <div><p className="text-xs text-muted-foreground mb-0.5">Date</p><p className="font-semibold">{date || "—"}</p></div>
        <div><p className="text-xs text-muted-foreground mb-0.5">Time</p><p className="font-semibold">{timeSlot || "—"}</p></div>
        <div><p className="text-xs text-muted-foreground mb-0.5">Guests</p><p className="font-semibold">{totalGuests} people</p></div>
        <div><p className="text-xs text-muted-foreground mb-0.5">Contact</p><p className="font-semibold">{name}</p></div>
        <div className="sm:col-span-2"><p className="text-xs text-muted-foreground mb-0.5">Email / Phone</p><p className="font-semibold">{email} · {phone}</p></div>
        {notes && <div className="sm:col-span-2"><p className="text-xs text-muted-foreground mb-0.5">Notes</p><p className="text-sm">{notes}</p></div>}
      </div>

      {/* Total */}
      <div className="bg-primary/5 border-2 border-primary/20 rounded-2xl p-5 flex justify-between items-center">
        <div>
          <p className="text-xs text-muted-foreground">Estimated Total</p>
          <p className="text-3xl font-serif font-bold text-primary">₹{total.toLocaleString("en-IN")}</p>
          <p className="text-xs text-muted-foreground mt-0.5">Final quote confirmed by our team</p>
        </div>
        <CheckCircle2 size={40} className="text-primary/30" />
      </div>
    </div>
  );
}

// ─── Pricing sidebar ──────────────────────────────────────────────────────────

function PricingSidebar({ eventType, actCounts, addonCounts, totalGuests, total, step }: {
  eventType: string; actCounts: ActivityCount; addonCounts: AddonCount;
  totalGuests: number; total: number; step: number;
}) {
  const et = eventTypes.find((e) => e.id === eventType);
  const selectedActs = activities.filter((a) => (actCounts[a.id] ?? 0) > 0);
  const selectedAddons = addons.filter((a) => (addonCounts[a.id] ?? 0) > 0);

  return (
    <div className="bg-card rounded-2xl border border-border/60 overflow-hidden shadow-sm">
      <div className="bg-primary px-5 py-4">
        <p className="text-primary-foreground/80 text-xs uppercase tracking-[0.15em] mb-0.5">Your Event Plan</p>
        <p className="text-primary-foreground font-serif font-bold text-lg">{et?.label ?? "Not set yet"}</p>
      </div>
      <div className="p-5 space-y-4 text-sm">
        {step === 1 && (
          <p className="text-muted-foreground text-center py-4 text-xs">Select an event type to start building your plan.</p>
        )}
        {selectedActs.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Activities</p>
            <div className="space-y-2">
              {selectedActs.map((a) => (
                <div key={a.id} className="flex justify-between text-xs">
                  <span className="text-muted-foreground">{a.name} × {actCounts[a.id]}</span>
                  <span className="font-medium">₹{a.price * actCounts[a.id]}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {selectedAddons.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Add-ons</p>
            <div className="space-y-2">
              {selectedAddons.map((a) => {
                const qty = addonCounts[a.id];
                return (
                  <div key={a.id} className="flex justify-between text-xs">
                    <span className="text-muted-foreground">{a.name}{a.unit === "per-person" ? ` × ${qty}` : ""}</span>
                    <span className="font-medium">₹{a.unit === "flat" ? a.price : a.price * qty}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {(selectedActs.length > 0 || selectedAddons.length > 0) && (
          <>
            <div className="border-t border-border/60 pt-3 flex justify-between font-bold">
              <span>Estimated Total</span>
              <span className="text-primary">₹{total.toLocaleString("en-IN")}</span>
            </div>
            <p className="text-[10px] text-muted-foreground">Final quote confirmed after submission. No upfront payment required.</p>
          </>
        )}
        <div className="pt-2 border-t border-border/60 text-xs text-muted-foreground space-y-1">
          <p className="flex items-center gap-1.5"><CheckCircle2 size={11} className="text-primary" /> No upfront payment needed</p>
          <p className="flex items-center gap-1.5"><CheckCircle2 size={11} className="text-primary" /> Confirmed within 2 hours</p>
          <p className="flex items-center gap-1.5"><CheckCircle2 size={11} className="text-primary" /> Free cancellation up to 48 hrs</p>
        </div>
      </div>
    </div>
  );
}

// ─── Success screen ───────────────────────────────────────────────────────────

function SubmittedScreen({ orderRef, name }: { orderRef: string; name: string }) {
  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, []);
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex items-center justify-center min-h-[80vh] px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-md w-full text-center"
        >
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <PartyPopper size={44} className="text-primary" />
          </div>
          <h1 className="text-3xl font-serif font-bold mb-3">You're all set, {name.split(" ")[0]}!</h1>
          <p className="text-muted-foreground mb-6 leading-relaxed">Your event request has been received. Our events team will reach out within 2 hours to confirm everything and answer any questions.</p>
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5 mb-8">
            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Reference Number</p>
            <p className="text-3xl font-mono font-bold text-primary tracking-widest">{orderRef}</p>
            <p className="text-xs text-muted-foreground mt-1">Save this — you'll need it when we call.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/" className="px-6 py-3 rounded-full border border-border text-sm font-medium hover:bg-muted transition-colors">Back to Home</Link>
            <Link href="/experiences/paint" className="px-6 py-3 rounded-full bg-primary text-primary-foreground text-sm font-bold hover:bg-primary/90 transition-all hover:scale-105 shadow-md">Explore Experiences</Link>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}
