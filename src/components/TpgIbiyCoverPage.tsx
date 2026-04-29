import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { NeuralWidget } from "./NeuralWidget";
import {
  ArrowRight,
  BarChart3,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  Cpu,
  CreditCard,
  Globe,
  Hotel,
  Languages,
  Mail,
  MapPin,
  MonitorSmartphone,
  Moon,
  Plane,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Star,
  Sun,
  Ticket,
  TrendingUp,
  Users,
  Wallet,
  Watch,
  Zap,
} from "lucide-react";

// ─── Constants ────────────────────────────────────────────────────────────────

const PURPLE = "#7551fb";
const CYAN = "#3fe0fd";

// ─── Theme tokens ─────────────────────────────────────────────────────────────

interface Tokens {
  bg: string;
  navBg: string;
  navBorder: string;
  cardBg: string;
  cardBorder: string;
  text: string;
  textMuted: string;
  textSubtle: string;
  textFaint: string;
  divider: string;
  purplePill: string;
  purplePillBorder: string;
  cyanCardBg: string;
  iconPurpleBg: string;
  iconCyanBg: string;
  secondaryBtn: string;
  secondaryBtnBorder: string;
  secondaryBtnText: string;
  tableHeader: string;
  tableHeaderText: string;
  tableRowBorder: string;
  footerBorder: string;
  footerText: string;
  ariaBg: string;
  ariaBorder: string;
  ariaOrb: string;
  heroBg: string;
  ctaOrb: string;
  toggleBg: string;
  toggleText: string;
  toggleBorder: string;
  venueNodeText: string;
  braceletBg: string;
}

const dark: Tokens = {
  bg: "#020202",
  navBg: "rgba(2,2,2,0.85)",
  navBorder: "rgba(255,255,255,0.06)",
  cardBg: "rgba(255,255,255,0.04)",
  cardBorder: "rgba(255,255,255,0.08)",
  text: "#ffffff",
  textMuted: "rgba(255,255,255,0.6)",
  textSubtle: "rgba(255,255,255,0.5)",
  textFaint: "rgba(255,255,255,0.4)",
  divider: "rgba(255,255,255,0.08)",
  purplePill: "rgba(117,81,251,0.1)",
  purplePillBorder: "rgba(117,81,251,0.2)",
  cyanCardBg: "rgba(63,224,253,0.12)",
  iconPurpleBg: "rgba(117,81,251,0.1)",
  iconCyanBg: "rgba(63,224,253,0.12)",
  secondaryBtn: "rgba(255,255,255,0.06)",
  secondaryBtnBorder: "rgba(255,255,255,0.12)",
  secondaryBtnText: "#ffffff",
  tableHeader: "rgba(255,255,255,0.04)",
  tableHeaderText: "rgba(255,255,255,0.35)",
  tableRowBorder: "rgba(255,255,255,0.05)",
  footerBorder: "rgba(255,255,255,0.06)",
  footerText: "rgba(255,255,255,0.25)",
  ariaBg: "linear-gradient(135deg, rgba(117,81,251,0.06) 0%, rgba(63,224,253,0.06) 100%)",
  ariaBorder: "rgba(117,81,251,0.15)",
  ariaOrb: "radial-gradient(circle, rgba(117,81,251,0.08) 0%, transparent 70%)",
  heroBg: "radial-gradient(ellipse 70% 60% at 70% 50%, rgba(117,81,251,0.06) 0%, transparent 70%), radial-gradient(ellipse 50% 50% at 30% 50%, rgba(63,224,253,0.07) 0%, transparent 70%)",
  ctaOrb: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(117,81,251,0.07) 0%, transparent 70%)",
  toggleBg: "rgba(255,255,255,0.08)",
  toggleBorder: "rgba(255,255,255,0.12)",
  toggleText: "rgba(255,255,255,0.6)",
  venueNodeText: "rgba(255,255,255,0.5)",
  braceletBg: "linear-gradient(135deg, #1a1a2e 0%, #0d0d1a 100%)",
};

const light: Tokens = {
  bg: "#eaf0f7",
  navBg: "rgba(234,240,247,0.9)",
  navBorder: "rgba(0,0,0,0.08)",
  cardBg: "rgba(255,255,255,0.7)",
  cardBorder: "rgba(0,0,0,0.08)",
  text: "#0f172a",
  textMuted: "#374151",
  textSubtle: "#6b7280",
  textFaint: "#9ca3af",
  divider: "rgba(0,0,0,0.08)",
  purplePill: "rgba(117,81,251,0.1)",
  purplePillBorder: "rgba(117,81,251,0.2)",
  cyanCardBg: "rgba(63,224,253,0.1)",
  iconPurpleBg: "rgba(117,81,251,0.1)",
  iconCyanBg: "rgba(63,224,253,0.1)",
  secondaryBtn: "rgba(255,255,255,0.6)",
  secondaryBtnBorder: "rgba(0,0,0,0.12)",
  secondaryBtnText: "#0f172a",
  tableHeader: "rgba(0,0,0,0.04)",
  tableHeaderText: "#6b7280",
  tableRowBorder: "rgba(0,0,0,0.06)",
  footerBorder: "rgba(0,0,0,0.08)",
  footerText: "#9ca3af",
  ariaBg: "linear-gradient(135deg, rgba(117,81,251,0.05) 0%, rgba(63,224,253,0.05) 100%)",
  ariaBorder: "rgba(117,81,251,0.15)",
  ariaOrb: "radial-gradient(circle, rgba(117,81,251,0.06) 0%, transparent 70%)",
  heroBg: "radial-gradient(ellipse 70% 60% at 70% 50%, rgba(117,81,251,0.05) 0%, transparent 70%), radial-gradient(ellipse 50% 50% at 30% 50%, rgba(63,224,253,0.06) 0%, transparent 70%)",
  ctaOrb: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(117,81,251,0.06) 0%, transparent 70%)",
  toggleBg: "rgba(0,0,0,0.06)",
  toggleBorder: "rgba(0,0,0,0.1)",
  toggleText: "#6b7280",
  venueNodeText: "#6b7280",
  braceletBg: "linear-gradient(135deg, #e8eeff 0%, #d4c8ff 100%)",
};

const ThemeCtx = createContext<{ T: Tokens; isDark: boolean; toggle: () => void }>({
  T: dark,
  isDark: true,
  toggle: () => {},
});

function useT() { return useContext(ThemeCtx).T; }
function useIsDark() { return useContext(ThemeCtx).isDark; }
function useToggle() { return useContext(ThemeCtx).toggle; }

// ─── FadeIn helper ────────────────────────────────────────────────────────────

function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Section wrapper ──────────────────────────────────────────────────────────

function Section({ id, children, className = "" }: { id?: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={`relative mx-auto max-w-6xl px-6 py-24 ${className}`}>
      {children}
    </section>
  );
}

// ─── Section label ────────────────────────────────────────────────────────────

function Label({ children }: { children: React.ReactNode }) {
  const T = useT();
  return (
    <div
      className="mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold tracking-widest uppercase"
      style={{ background: T.purplePill, color: PURPLE, border: `1px solid ${T.purplePillBorder}` }}
    >
      {children}
    </div>
  );
}

// ─── Divider ──────────────────────────────────────────────────────────────────

function Divider() {
  const T = useT();
  return (
    <div className="mx-auto max-w-6xl px-6">
      <div style={{ height: 1, background: `linear-gradient(to right, transparent, ${T.divider}, transparent)` }} />
    </div>
  );
}

// ─── Animated Bracelet Hero ───────────────────────────────────────────────────

const VENUE_NODES = [
  { label: "Hotel", icon: Hotel, angle: 270 },
  { label: "Stadium", icon: Ticket, angle: 342 },
  { label: "Airport", icon: Plane, angle: 54 },
  { label: "Housing", icon: Building2, angle: 126 },
  { label: "Mobile", icon: Smartphone, angle: 198 },
];

function BraceletDiagram() {
  const T = useT();
  const radius = 150;
  const centerX = 220;
  const centerY = 220;

  return (
    <div className="relative" style={{ width: 440, height: 440 }}>
      <svg className="absolute inset-0" width={440} height={440} viewBox="0 0 440 440">
        <circle cx={centerX} cy={centerY} r={radius} fill="none" stroke="rgba(117,81,251,0.15)" strokeWidth={1} strokeDasharray="4 6" />
        {VENUE_NODES.map((node) => {
          const rad = (node.angle * Math.PI) / 180;
          const nx = centerX + radius * Math.cos(rad);
          const ny = centerY + radius * Math.sin(rad);
          return (
            <line key={node.label} x1={centerX} y1={centerY} x2={nx} y2={ny} stroke="rgba(117,81,251,0.08)" strokeWidth={1} />
          );
        })}
      </svg>

      <motion.div
        className="absolute rounded-full flex flex-col items-center justify-center"
        style={{
          width: 96, height: 96,
          top: centerY - 48, left: centerX - 48,
          background: T.braceletBg,
          border: `2px solid ${PURPLE}`,
          boxShadow: `0 0 32px rgba(117,81,251,0.3), 0 0 64px rgba(117,81,251,0.1)`,
        }}
        animate={{ boxShadow: ["0 0 32px rgba(117,81,251,0.3)", "0 0 48px rgba(117,81,251,0.5)", "0 0 32px rgba(117,81,251,0.3)"] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Watch className="h-7 w-7 mb-0.5" style={{ color: PURPLE }} />
        <span className="text-[9px] font-bold tracking-widest uppercase" style={{ color: PURPLE }}>IBIY</span>
      </motion.div>

      {VENUE_NODES.map((node, i) => {
        const rad = (node.angle * Math.PI) / 180;
        const nx = centerX + radius * Math.cos(rad);
        const ny = centerY + radius * Math.sin(rad);
        const Icon = node.icon;
        return (
          <motion.div
            key={node.label}
            className="absolute flex flex-col items-center gap-1"
            style={{ top: ny - 32, left: nx - 32, width: 64 }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
          >
            <div
              className="rounded-xl flex items-center justify-center"
              style={{ width: 44, height: 44, background: T.iconPurpleBg, border: `1px solid ${T.purplePillBorder}` }}
            >
              <Icon className="h-5 w-5" style={{ color: PURPLE }} />
            </div>
            <span className="text-center text-[10px] font-medium" style={{ color: T.venueNodeText }}>
              {node.label}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}

// ─── Theme Toggle ─────────────────────────────────────────────────────────────

function ThemeToggle() {
  const T = useT();
  const isDark = useIsDark();
  const toggle = useToggle();
  return (
    <button
      onClick={toggle}
      className="flex items-center justify-center rounded-full transition hover:opacity-80 active:scale-95"
      style={{ width: 36, height: 36, background: T.toggleBg, border: `1px solid ${T.toggleBorder}`, color: T.toggleText }}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}

// ─── Nav ──────────────────────────────────────────────────────────────────────

function Nav({ onEnter }: { onEnter: () => void }) {
  const T = useT();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = [
    { label: "Platform", href: "#platform" },
    { label: "ARIA 2027", href: "#aria" },
    { label: "Verticals", href: "#verticals" },
    { label: "Economics", href: "#economics" },
    { label: "Technology", href: "#technology" },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 transition-all"
      style={{
        background: scrolled ? T.navBg : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? `1px solid ${T.navBorder}` : "none",
      }}
    >
      <div className="flex items-center gap-2">
        <Watch className="h-5 w-5" style={{ color: PURPLE }} />
        <span className="font-bold tracking-wide text-sm" style={{ color: T.text }}>
          TPG <span style={{ color: PURPLE }}>×</span> IBIY
        </span>
      </div>

      <div className="hidden md:flex items-center gap-6">
        {links.map((l) => (
          <a key={l.href} href={l.href} className="text-sm transition hover:opacity-100" style={{ color: T.textSubtle }}>
            {l.label}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <ThemeToggle />
        <button
          onClick={onEnter}
          className="flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition hover:opacity-90 active:scale-95"
          style={{ background: PURPLE, color: "#fff" }}
        >
          Enter Deal Room <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function HeroSection({ onEnter }: { onEnter: () => void }) {
  const T = useT();
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="pointer-events-none absolute inset-0" style={{ background: T.heroBg }} />

      <div className="relative mx-auto max-w-6xl w-full px-6 pt-28 pb-16 flex flex-col lg:flex-row items-center gap-16">
        <div className="flex-1 min-w-0">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold tracking-widest uppercase"
            style={{ background: T.purplePill, color: PURPLE, border: `1px solid ${T.purplePillBorder}` }}
          >
            <Sparkles className="h-3 w-3" /> Prepaid Wearable Infrastructure · $3MM License
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl lg:text-6xl font-black leading-tight tracking-tight"
            style={{ color: T.text }}
          >
            One Tap.<br />
            <span style={{ color: PURPLE }}>Every Vertical.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 max-w-lg text-lg leading-relaxed"
            style={{ color: T.textMuted }}
          >
            IBIY is a prepaid NFC wearable infrastructure platform that unifies
            access, payment, identity, and data across hotels, stadiums, airports,
            housing, and mobile deployments — anchored by the ARIA 2027 Las Vegas deal.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <button
              onClick={onEnter}
              className="flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition hover:opacity-90 active:scale-95"
              style={{ background: PURPLE, color: "#fff" }}
            >
              Enter Deal Room <ArrowRight className="h-4 w-4" />
            </button>
            <a
              href="#platform"
              className="flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition hover:opacity-80"
              style={{ background: T.secondaryBtn, color: T.secondaryBtnText, border: `1px solid ${T.secondaryBtnBorder}` }}
            >
              Learn More <ChevronRight className="h-4 w-4" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-12 grid grid-cols-3 gap-4"
          >
            {[
              { label: "License Raise", value: "$3MM" },
              { label: "ARIA Baseline", value: "$200K" },
              { label: "R.I.S.E. Potential", value: "$19.3M" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-2xl font-black" style={{ color: PURPLE }}>{s.value}</div>
                <div className="text-xs mt-0.5" style={{ color: T.textFaint }}>{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-shrink-0 hidden lg:block"
        >
          <BraceletDiagram />
        </motion.div>
      </div>
    </section>
  );
}

// ─── Platform Section ─────────────────────────────────────────────────────────

const PLATFORM_NODES = [
  { label: "Access Control", icon: CheckCircle2, desc: "Room keys, venue gates, VIP tiers" },
  { label: "Prepaid Wallet", icon: Wallet, desc: "Loaded value, tap-to-pay at any POS" },
  { label: "Digital Identity", icon: Users, desc: "KYC-lite verification at enrollment" },
  { label: "Sponsor Commerce", icon: ShoppingBag, desc: "Branded triggers and merchant rails" },
  { label: "Data Intelligence", icon: BarChart3, desc: "Behavioral signals for partners" },
  { label: "Media Overlay", icon: Star, desc: "VIBE and media channel integration" },
];

function PlatformSection() {
  const T = useT();
  return (
    <Section id="platform">
      <FadeIn>
        <Label><Zap className="h-3 w-3" /> Platform</Label>
        <h2 className="text-4xl font-black" style={{ color: T.text }}>Six Nodes. One Wristband.</h2>
        <p className="mt-4 max-w-xl text-base" style={{ color: T.textSubtle }}>
          Every IBIY bracelet activates six interconnected platform layers simultaneously — no app, no card, no friction.
        </p>
      </FadeIn>

      <FadeIn delay={0.1} className="mt-10">
        <div className="flex flex-wrap gap-3 mb-10">
          {["Tap = Access", "Tap = Payment", "Tap = Identity", "Tap = Data"].map((t) => (
            <div key={t} className="rounded-full px-4 py-2 text-sm font-semibold"
              style={{ background: T.purplePill, color: PURPLE, border: `1px solid ${T.purplePillBorder}` }}>
              {t}
            </div>
          ))}
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {PLATFORM_NODES.map((node, i) => {
          const Icon = node.icon;
          return (
            <FadeIn key={node.label} delay={0.1 + i * 0.07}>
              <div className="rounded-2xl p-5" style={{ background: T.cardBg, border: `1px solid ${T.cardBorder}` }}>
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: T.iconPurpleBg }}>
                  <Icon className="h-5 w-5" style={{ color: PURPLE }} />
                </div>
                <div className="font-bold text-sm mb-1" style={{ color: T.text }}>{node.label}</div>
                <div className="text-xs leading-relaxed" style={{ color: T.textSubtle }}>{node.desc}</div>
              </div>
            </FadeIn>
          );
        })}
      </div>
    </Section>
  );
}

// ─── ARIA 2027 Section ────────────────────────────────────────────────────────

const BOOKING_FLOW = [
  { step: "Book", desc: "Hotel + event package confirmed" },
  { step: "Allocate", desc: "$25 prepaid load per bracelet" },
  { step: "Float", desc: "Capital held in escrow pre-event" },
  { step: "Produce", desc: "Bracelets manufactured + fulfilled" },
  { step: "Redeem", desc: "Guest activates on arrival tap" },
];

function AriaSection() {
  const T = useT();
  return (
    <Section id="aria">
      <div className="rounded-3xl p-10 overflow-hidden relative"
        style={{ background: T.ariaBg, border: `1px solid ${T.ariaBorder}` }}>
        <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full"
          style={{ background: T.ariaOrb }} />

        <FadeIn>
          <Label><Hotel className="h-3 w-3" /> ARIA 2027</Label>
          <h2 className="text-4xl font-black" style={{ color: T.text }}>Anchor Deployment · Las Vegas</h2>
          <p className="mt-4 max-w-2xl text-base" style={{ color: T.textMuted }}>
            The ARIA Resort & Casino serves as the flagship anchor deal — locking prepaid capital before a single bracelet ships.
          </p>
        </FadeIn>

        <FadeIn delay={0.1} className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "Users", value: "8,000" },
            { label: "Prepaid Load", value: "$25 ea." },
            { label: "Events", value: "1 Anchor" },
            { label: "Baseline Revenue", value: "$200K" },
          ].map((m) => (
            <div key={m.label}>
              <div className="text-3xl font-black" style={{ color: PURPLE }}>{m.value}</div>
              <div className="text-xs mt-1" style={{ color: T.textFaint }}>{m.label}</div>
            </div>
          ))}
        </FadeIn>

        <FadeIn delay={0.2} className="mt-12">
          <div className="text-xs font-semibold tracking-widest uppercase mb-5" style={{ color: T.textFaint }}>
            5-Step Booking Flow
          </div>
          <div className="flex flex-col md:flex-row gap-3">
            {BOOKING_FLOW.map((s, i) => (
              <div key={s.step} className="flex items-start gap-3 flex-1 min-w-0">
                <div className="flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ background: PURPLE, color: "#fff" }}>
                  {i + 1}
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold" style={{ color: T.text }}>{s.step}</div>
                  <div className="text-xs mt-0.5 leading-relaxed" style={{ color: T.textFaint }}>{s.desc}</div>
                </div>
                {i < BOOKING_FLOW.length - 1 && (
                  <ChevronRight className="hidden md:block flex-shrink-0 mt-1.5 h-4 w-4" style={{ color: T.textFaint }} />
                )}
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </Section>
  );
}

// ─── Verticals Section ────────────────────────────────────────────────────────

const VERTICAL_CARDS = [
  { label: "Hospitality", icon: Hotel, desc: "Hotel room packages + F&B activation across TPG properties" },
  { label: "Events", icon: Ticket, desc: "Concerts, sports, festivals — ticketing + wallet in one tap" },
  { label: "Travel", icon: Plane, desc: "Airport lounges, upgrades, travel commerce rails" },
  { label: "Mobile", icon: Smartphone, desc: "App-free issuance for on-the-go and pop-up deployments" },
  { label: "R.I.S.E.", icon: Building2, desc: "771K resident welcome packets — identity, wallet, access" },
  { label: "Retail", icon: ShoppingBag, desc: "Branded prepaid commerce for sponsor and merchant networks" },
  { label: "Casino", icon: Star, desc: "Gaming credits, VIP access, and loyalty integration" },
  { label: "Media / VIBE", icon: MonitorSmartphone, desc: "VIBE white-label media overlay and channel distribution" },
];

function VerticalsSection() {
  const T = useT();
  return (
    <Section id="verticals">
      <FadeIn>
        <Label><Globe className="h-3 w-3" /> Deployment Verticals</Label>
        <h2 className="text-4xl font-black" style={{ color: T.text }}>8 Markets. One Infrastructure.</h2>
        <p className="mt-4 max-w-xl text-base" style={{ color: T.textSubtle }}>
          The IBIY platform is purpose-built for multi-vertical deployment — the same hardware and rails power every sector.
        </p>
      </FadeIn>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {VERTICAL_CARDS.map((card, i) => {
          const Icon = card.icon;
          return (
            <FadeIn key={card.label} delay={0.05 * i}>
              <div className="rounded-2xl p-5 h-full" style={{ background: T.cardBg, border: `1px solid ${T.cardBorder}` }}>
                <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-xl" style={{ background: T.iconCyanBg }}>
                  <Icon className="h-4 w-4" style={{ color: CYAN }} />
                </div>
                <div className="font-bold text-sm mb-1" style={{ color: T.text }}>{card.label}</div>
                <div className="text-xs leading-relaxed" style={{ color: T.textFaint }}>{card.desc}</div>
              </div>
            </FadeIn>
          );
        })}
      </div>
    </Section>
  );
}

// ─── Economics Section ────────────────────────────────────────────────────────

const REVENUE_FLOW = [
  { label: "Guest books hotel + event", icon: CalendarDays },
  { label: "$25 prepaid load allocated", icon: CreditCard },
  { label: "Capital floated pre-production", icon: CircleDollarSign },
  { label: "Bracelet manufactured + shipped", icon: Watch },
  { label: "Revenue recognized on tap", icon: Zap },
];

const SCENARIOS = [
  { label: "ARIA 2027 Anchor", users: "8,000", events: "1", revenue: "$200K" },
  { label: "Regional Event Cycle", users: "25,000", events: "10", revenue: "$6.25M" },
  { label: "National Deployment", users: "100,000", events: "50", revenue: "$125M" },
  { label: "R.I.S.E. Resident Packet", users: "771,480", events: "1", revenue: "$19.3M" },
];

function EconomicsSection() {
  const T = useT();
  return (
    <Section id="economics">
      <FadeIn>
        <Label><TrendingUp className="h-3 w-3" /> Economics</Label>
        <h2 className="text-4xl font-black" style={{ color: T.text }}>Prepaid Revenue Model</h2>
        <p className="mt-4 max-w-xl text-base" style={{ color: T.textSubtle }}>
          Capital is locked before production begins. IBIY earns on float, spread, and activation — not on speculation.
        </p>
      </FadeIn>

      <FadeIn delay={0.1} className="mt-10">
        <div className="flex flex-col md:flex-row items-stretch gap-2">
          {REVENUE_FLOW.map((step, i) => {
            const Icon = step.icon;
            return (
              <React.Fragment key={step.label}>
                <div className="flex flex-1 flex-col items-center gap-2 rounded-2xl p-5 text-center"
                  style={{ background: T.cardBg, border: `1px solid ${T.cardBorder}` }}>
                  <div className="h-10 w-10 rounded-full flex items-center justify-center" style={{ background: T.iconPurpleBg }}>
                    <Icon className="h-5 w-5" style={{ color: PURPLE }} />
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: T.textMuted }}>{step.label}</p>
                </div>
                {i < REVENUE_FLOW.length - 1 && (
                  <div className="hidden md:flex items-center" style={{ color: T.textFaint }}>
                    <ChevronRight className="h-5 w-5" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </FadeIn>

      <FadeIn delay={0.2} className="mt-10">
        <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${T.cardBorder}` }}>
          <div className="grid grid-cols-4 gap-0 px-5 py-3 text-xs font-semibold tracking-wider uppercase"
            style={{ background: T.tableHeader, color: T.tableHeaderText }}>
            <div className="col-span-2">Scenario</div>
            <div className="text-right">Users</div>
            <div className="text-right" style={{ color: PURPLE }}>Revenue</div>
          </div>
          {SCENARIOS.map((s, i) => (
            <div key={s.label} className="grid grid-cols-4 gap-0 px-5 py-4 items-center"
              style={{ borderTop: i === 0 ? "none" : `1px solid ${T.tableRowBorder}` }}>
              <div className="col-span-2 text-sm font-medium" style={{ color: T.text }}>{s.label}</div>
              <div className="text-right text-sm" style={{ color: T.textSubtle }}>{s.users}</div>
              <div className="text-right text-sm font-bold" style={{ color: PURPLE }}>{s.revenue}</div>
            </div>
          ))}
        </div>
      </FadeIn>
    </Section>
  );
}

// ─── Technology Section ───────────────────────────────────────────────────────

const TECH_LAYERS = [
  { label: "Wearable Hardware", icon: Watch, desc: "NFC-enabled bracelets with custom SKU per vertical. Durable, waterproof, hotel-grade." },
  { label: "Mobile Issuance", icon: Smartphone, desc: "Virtual bracelet provisioning via mobile for pop-up and remote deployments." },
  { label: "Wallet Rail", icon: Wallet, desc: "Prepaid balance engine with real-time authorization, split settlement, and sponsor overlays." },
  { label: "Translation Layer", icon: Languages, desc: "Universal tap protocol mapping IBIY signals to existing POS, access control, and ticketing systems." },
  { label: "Distribution Platform", icon: Cpu, desc: "Partner API and white-label dashboard for TPG verticals, vendors, and municipal deployments." },
];

function TechnologySection() {
  const T = useT();
  return (
    <Section id="technology">
      <FadeIn>
        <Label><Cpu className="h-3 w-3" /> Technology</Label>
        <h2 className="text-4xl font-black" style={{ color: T.text }}>Five Layers. Zero Friction.</h2>
        <p className="mt-4 max-w-xl text-base" style={{ color: T.textSubtle }}>
          IBIY's stack is designed to drop into existing infrastructure — no rip-and-replace, no proprietary lock-in.
        </p>
      </FadeIn>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-5 gap-4">
        {TECH_LAYERS.map((layer, i) => {
          const Icon = layer.icon;
          return (
            <FadeIn key={layer.label} delay={0.08 * i}>
              <div className="rounded-2xl p-5 h-full flex flex-col" style={{ background: T.cardBg, border: `1px solid ${T.cardBorder}` }}>
                <div className="mb-3 h-10 w-10 flex items-center justify-center rounded-xl" style={{ background: T.iconPurpleBg }}>
                  <Icon className="h-5 w-5" style={{ color: PURPLE }} />
                </div>
                <div className="font-bold text-sm mb-2" style={{ color: T.text }}>{layer.label}</div>
                <div className="text-xs leading-relaxed mt-auto" style={{ color: T.textFaint }}>{layer.desc}</div>
              </div>
            </FadeIn>
          );
        })}
      </div>
    </Section>
  );
}

// ─── Investor Access (CTA) ────────────────────────────────────────────────────

function InvestorSection({ onEnter }: { onEnter: () => void }) {
  const T = useT();
  return (
    <section id="investor" className="relative overflow-hidden py-24">
      <div className="pointer-events-none absolute inset-0" style={{ background: T.ctaOrb }} />

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <FadeIn>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold tracking-widest uppercase"
            style={{ background: T.purplePill, color: PURPLE, border: `1px solid ${T.purplePillBorder}` }}>
            <MapPin className="h-3 w-3" /> Investor Access
          </div>

          <h2 className="text-5xl font-black" style={{ color: T.text }}>Ready to Go Deeper?</h2>
          <p className="mt-5 text-lg leading-relaxed" style={{ color: T.textMuted }}>
            The full deal room contains the investor deck, $3MM term sheet, ARIA 2027 deployment brief, R.I.S.E. economics,
            and live revenue modeling — all behind a credentialed access gate.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onEnter}
              className="flex items-center gap-2 rounded-full px-8 py-4 text-base font-bold transition hover:opacity-90 active:scale-95 shadow-lg"
              style={{ background: PURPLE, color: "#fff", boxShadow: "0 0 32px rgba(117,81,251,0.3)" }}
            >
              Enter Deal Room <ArrowRight className="h-4 w-4" />
            </button>
            <a
              href="mailto:carl@iptriple.com"
              className="flex items-center gap-2 rounded-full px-8 py-4 text-base font-semibold transition hover:opacity-80"
              style={{ background: T.secondaryBtn, color: T.secondaryBtnText, border: `1px solid ${T.secondaryBtnBorder}` }}
            >
              <Mail className="h-4 w-4" /> Email Investor Relations
            </a>
          </div>

          <div className="mt-8">
            <a
              href="https://calendly.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm underline underline-offset-4 transition hover:opacity-80"
              style={{ color: T.textFaint }}
            >
              Schedule a call with the TPG × IBIY team
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  const T = useT();
  return (
    <footer className="border-t px-6 py-8 text-center text-xs"
      style={{ borderColor: T.footerBorder, color: T.footerText }}>
      © 2026 TPG × IBIY. Confidential investment materials. Not an offer to sell securities.
    </footer>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function TpgIbiyCoverPage({ onEnter }: { onEnter: () => void }) {
  const [isDark, setIsDark] = useState(true);
  const T = isDark ? dark : light;

  return (
    <ThemeCtx.Provider value={{ T, isDark, toggle: () => setIsDark((d) => !d) }}>
      <div
        className="min-h-screen antialiased transition-colors duration-300"
        style={{ background: T.bg, color: T.text, fontFamily: "Poppins, sans-serif" }}
      >
        <Nav onEnter={onEnter} />
        <HeroSection onEnter={onEnter} />
        <Divider />
        <PlatformSection />
        <Divider />
        <AriaSection />
        <Divider />
        <VerticalsSection />
        <Divider />
        <EconomicsSection />
        <Divider />
        <TechnologySection />
        <Divider />
        <InvestorSection onEnter={onEnter} />
        <Footer />
        <NeuralWidget color="#7551fb" colorDark="#5b3fd4" />
      </div>
    </ThemeCtx.Provider>
  );
}
