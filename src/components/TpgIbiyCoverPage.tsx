import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
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
  Plane,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Star,
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

function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`relative mx-auto max-w-6xl px-6 py-24 ${className}`}
    >
      {children}
    </section>
  );
}

// ─── Section label ────────────────────────────────────────────────────────────

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold tracking-widest uppercase"
      style={{ background: "rgba(117,81,251,0.1)", color: PURPLE, border: `1px solid rgba(117,81,251,0.2)` }}
    >
      {children}
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
  const radius = 150;
  const centerX = 220;
  const centerY = 220;

  return (
    <div className="relative" style={{ width: 440, height: 440 }}>
      {/* Outer ring */}
      <svg
        className="absolute inset-0"
        width={440}
        height={440}
        viewBox="0 0 440 440"
      >
        {/* Dashed orbit */}
        <circle
          cx={centerX}
          cy={centerY}
          r={radius}
          fill="none"
          stroke="rgba(117,81,251,0.15)"
          strokeWidth={1}
          strokeDasharray="4 6"
        />
        {/* Connecting lines */}
        {VENUE_NODES.map((node) => {
          const rad = (node.angle * Math.PI) / 180;
          const nx = centerX + radius * Math.cos(rad);
          const ny = centerY + radius * Math.sin(rad);
          return (
            <line
              key={node.label}
              x1={centerX}
              y1={centerY}
              x2={nx}
              y2={ny}
              stroke="rgba(117,81,251,0.08)"
              strokeWidth={1}
            />
          );
        })}
      </svg>

      {/* Center bracelet */}
      <motion.div
        className="absolute rounded-full flex flex-col items-center justify-center"
        style={{
          width: 96,
          height: 96,
          top: centerY - 48,
          left: centerX - 48,
          background: "linear-gradient(135deg, #1a1a2e 0%, #0d0d1a 100%)",
          border: `2px solid ${PURPLE}`,
          boxShadow: `0 0 32px rgba(117,81,251,0.3), 0 0 64px rgba(117,81,251,0.1)`,
        }}
        animate={{ boxShadow: ["0 0 32px rgba(117,81,251,0.3)", "0 0 48px rgba(117,81,251,0.5)", "0 0 32px rgba(117,81,251,0.3)"] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Watch className="h-7 w-7 mb-0.5" style={{ color: PURPLE }} />
        <span className="text-[9px] font-bold tracking-widest uppercase" style={{ color: PURPLE }}>
          IBIY
        </span>
      </motion.div>

      {/* Venue nodes */}
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
              style={{
                width: 44,
                height: 44,
                background: "rgba(117,81,251,0.08)",
                border: `1px solid rgba(117,81,251,0.25)`,
              }}
            >
              <Icon className="h-5 w-5" style={{ color: PURPLE }} />
            </div>
            <span className="text-center text-[10px] font-medium" style={{ color: "rgba(255,255,255,0.5)" }}>
              {node.label}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}

// ─── Nav ──────────────────────────────────────────────────────────────────────

function Nav({ onEnter }: { onEnter: () => void }) {
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
        background: scrolled ? "rgba(2,2,2,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Watch className="h-5 w-5" style={{ color: PURPLE }} />
        <span className="font-bold tracking-wide text-sm" style={{ color: "#fff" }}>
          TPG <span style={{ color: PURPLE }}>×</span> IBIY
        </span>
      </div>

      {/* Links — hidden on mobile */}
      <div className="hidden md:flex items-center gap-6">
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="text-sm transition hover:opacity-100"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            {l.label}
          </a>
        ))}
      </div>

      {/* CTA */}
      <button
        onClick={onEnter}
        className="flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition hover:opacity-90 active:scale-95"
        style={{ background: PURPLE, color: "#020202" }}
      >
        Enter Deal Room <ArrowRight className="h-3.5 w-3.5" />
      </button>
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function HeroSection({ onEnter }: { onEnter: () => void }) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background orbs */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 70% 50%, rgba(117,81,251,0.06) 0%, transparent 70%), radial-gradient(ellipse 50% 50% at 30% 50%, rgba(63,224,253,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl w-full px-6 pt-28 pb-16 flex flex-col lg:flex-row items-center gap-16">
        {/* Left text */}
        <div className="flex-1 min-w-0">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold tracking-widest uppercase"
            style={{ background: "rgba(117,81,251,0.1)", color: PURPLE, border: `1px solid rgba(117,81,251,0.2)` }}
          >
            <Sparkles className="h-3 w-3" /> Prepaid Wearable Infrastructure · $3MM License
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl lg:text-6xl font-black leading-tight tracking-tight"
            style={{ color: "#fff" }}
          >
            One Tap.<br />
            <span style={{ color: PURPLE }}>Every Vertical.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 max-w-lg text-lg leading-relaxed"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            IBIY is a prepaid NFC wearable infrastructure platform that unifies
            access, payment, identity, and data across hotels, stadiums, airports,
            housing, and mobile deployments — anchored by the ARIA 2027 Las Vegas
            deal.
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
              style={{ background: PURPLE, color: "#020202" }}
            >
              Enter Deal Room <ArrowRight className="h-4 w-4" />
            </button>
            <a
              href="#platform"
              className="flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition hover:opacity-80"
              style={{
                background: "rgba(255,255,255,0.06)",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              Learn More <ChevronRight className="h-4 w-4" />
            </a>
          </motion.div>

          {/* Quick stats */}
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
                <div className="text-2xl font-black" style={{ color: PURPLE }}>
                  {s.value}
                </div>
                <div className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right diagram */}
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
  return (
    <Section id="platform">
      <FadeIn>
        <Label><Zap className="h-3 w-3" /> Platform</Label>
        <h2 className="text-4xl font-black" style={{ color: "#fff" }}>
          Six Nodes. One Wristband.
        </h2>
        <p className="mt-4 max-w-xl text-base" style={{ color: "rgba(255,255,255,0.5)" }}>
          Every IBIY bracelet activates six interconnected platform layers simultaneously — no app, no card, no friction.
        </p>
      </FadeIn>

      {/* Tap grid */}
      <FadeIn delay={0.1} className="mt-10">
        <div
          className="flex flex-wrap gap-3 mb-10"
        >
          {["Tap = Access", "Tap = Payment", "Tap = Identity", "Tap = Data"].map((t) => (
            <div
              key={t}
              className="rounded-full px-4 py-2 text-sm font-semibold"
              style={{ background: "rgba(117,81,251,0.1)", color: PURPLE, border: `1px solid rgba(117,81,251,0.2)` }}
            >
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
              <div
                className="rounded-2xl p-5"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div
                  className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ background: "rgba(117,81,251,0.1)" }}
                >
                  <Icon className="h-5 w-5" style={{ color: PURPLE }} />
                </div>
                <div className="font-bold text-sm mb-1" style={{ color: "#fff" }}>
                  {node.label}
                </div>
                <div className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
                  {node.desc}
                </div>
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
  return (
    <Section id="aria">
      <div
        className="rounded-3xl p-10 overflow-hidden relative"
        style={{
          background: "linear-gradient(135deg, rgba(117,81,251,0.06) 0%, rgba(63,224,253,0.06) 100%)",
          border: "1px solid rgba(117,81,251,0.15)",
        }}
      >
        <div
          className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(117,81,251,0.08) 0%, transparent 70%)" }}
        />

        <FadeIn>
          <Label><Hotel className="h-3 w-3" /> ARIA 2027</Label>
          <h2 className="text-4xl font-black" style={{ color: "#fff" }}>
            Anchor Deployment · Las Vegas
          </h2>
          <p className="mt-4 max-w-2xl text-base" style={{ color: "rgba(255,255,255,0.55)" }}>
            The ARIA Resort & Casino serves as the flagship anchor deal — locking prepaid capital before a single bracelet ships.
          </p>
        </FadeIn>

        {/* Metrics row */}
        <FadeIn delay={0.1} className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "Users", value: "8,000" },
            { label: "Prepaid Load", value: "$25 ea." },
            { label: "Events", value: "1 Anchor" },
            { label: "Baseline Revenue", value: "$200K" },
          ].map((m) => (
            <div key={m.label}>
              <div className="text-3xl font-black" style={{ color: PURPLE }}>{m.value}</div>
              <div className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>{m.label}</div>
            </div>
          ))}
        </FadeIn>

        {/* Booking flow */}
        <FadeIn delay={0.2} className="mt-12">
          <div className="text-xs font-semibold tracking-widest uppercase mb-5" style={{ color: "rgba(255,255,255,0.35)" }}>
            5-Step Booking Flow
          </div>
          <div className="flex flex-col md:flex-row gap-3">
            {BOOKING_FLOW.map((s, i) => (
              <div key={s.step} className="flex items-start gap-3 flex-1 min-w-0">
                <div
                  className="flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ background: PURPLE, color: "#020202" }}
                >
                  {i + 1}
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold" style={{ color: "#fff" }}>{s.step}</div>
                  <div className="text-xs mt-0.5 leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>{s.desc}</div>
                </div>
                {i < BOOKING_FLOW.length - 1 && (
                  <ChevronRight
                    className="hidden md:block flex-shrink-0 mt-1.5 h-4 w-4"
                    style={{ color: "rgba(255,255,255,0.2)" }}
                  />
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
  return (
    <Section id="verticals">
      <FadeIn>
        <Label><Globe className="h-3 w-3" /> Deployment Verticals</Label>
        <h2 className="text-4xl font-black" style={{ color: "#fff" }}>
          8 Markets. One Infrastructure.
        </h2>
        <p className="mt-4 max-w-xl text-base" style={{ color: "rgba(255,255,255,0.5)" }}>
          The IBIY platform is purpose-built for multi-vertical deployment — the same hardware and rails power every sector.
        </p>
      </FadeIn>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {VERTICAL_CARDS.map((card, i) => {
          const Icon = card.icon;
          return (
            <FadeIn key={card.label} delay={0.05 * i}>
              <div
                className="rounded-2xl p-5 h-full"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div
                  className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-xl"
                  style={{ background: "rgba(63,224,253,0.12)" }}
                >
                  <Icon className="h-4 w-4" style={{ color: CYAN }} />
                </div>
                <div className="font-bold text-sm mb-1" style={{ color: "#fff" }}>
                  {card.label}
                </div>
                <div className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>
                  {card.desc}
                </div>
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
  { label: "ARIA 2027 Anchor", users: "8,000", alloc: "$25", events: "1", revenue: "$200K" },
  { label: "Regional Event Cycle", users: "25,000", alloc: "$25", events: "10", revenue: "$6.25M" },
  { label: "National Deployment", users: "100,000", alloc: "$25", events: "50", revenue: "$125M" },
  { label: "R.I.S.E. Resident Packet", users: "771,480", alloc: "$25", events: "1", revenue: "$19.3M" },
];

function EconomicsSection() {
  return (
    <Section id="economics">
      <FadeIn>
        <Label><TrendingUp className="h-3 w-3" /> Economics</Label>
        <h2 className="text-4xl font-black" style={{ color: "#fff" }}>
          Prepaid Revenue Model
        </h2>
        <p className="mt-4 max-w-xl text-base" style={{ color: "rgba(255,255,255,0.5)" }}>
          Capital is locked before production begins. IBIY earns on float, spread, and activation — not on speculation.
        </p>
      </FadeIn>

      {/* Revenue flow */}
      <FadeIn delay={0.1} className="mt-10">
        <div className="flex flex-col md:flex-row items-stretch gap-2">
          {REVENUE_FLOW.map((step, i) => {
            const Icon = step.icon;
            return (
              <React.Fragment key={step.label}>
                <div
                  className="flex flex-1 flex-col items-center gap-2 rounded-2xl p-5 text-center"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <div
                    className="h-10 w-10 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(117,81,251,0.12)" }}
                  >
                    <Icon className="h-5 w-5" style={{ color: PURPLE }} />
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                    {step.label}
                  </p>
                </div>
                {i < REVENUE_FLOW.length - 1 && (
                  <div className="hidden md:flex items-center" style={{ color: "rgba(255,255,255,0.2)" }}>
                    <ChevronRight className="h-5 w-5" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </FadeIn>

      {/* Scenario table */}
      <FadeIn delay={0.2} className="mt-10">
        <div
          className="rounded-2xl overflow-hidden"
          style={{ border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div
            className="grid grid-cols-5 gap-0 px-5 py-3 text-xs font-semibold tracking-wider uppercase"
            style={{ background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.35)" }}
          >
            <div className="col-span-2">Scenario</div>
            <div className="text-right">Users</div>
            <div className="text-right">Events</div>
            <div className="text-right" style={{ color: PURPLE }}>Revenue</div>
          </div>
          {SCENARIOS.map((s, i) => (
            <div
              key={s.label}
              className="grid grid-cols-5 gap-0 px-5 py-4 items-center"
              style={{
                borderTop: i === 0 ? "none" : "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <div className="col-span-2 text-sm font-medium" style={{ color: "#fff" }}>{s.label}</div>
              <div className="text-right text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>{s.users}</div>
              <div className="text-right text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>{s.events}</div>
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
  {
    label: "Wearable Hardware",
    icon: Watch,
    desc: "NFC-enabled bracelets with custom SKU per vertical. Durable, waterproof, hotel-grade.",
  },
  {
    label: "Mobile Issuance",
    icon: Smartphone,
    desc: "Virtual bracelet provisioning via mobile for pop-up and remote deployments.",
  },
  {
    label: "Wallet Rail",
    icon: Wallet,
    desc: "Prepaid balance engine with real-time authorization, split settlement, and sponsor overlays.",
  },
  {
    label: "Translation Layer",
    icon: Languages,
    desc: "Universal tap protocol mapping IBIY signals to existing POS, access control, and ticketing systems.",
  },
  {
    label: "Distribution Platform",
    icon: Cpu,
    desc: "Partner API and white-label dashboard for TPG verticals, vendors, and municipal deployments.",
  },
];

function TechnologySection() {
  return (
    <Section id="technology">
      <FadeIn>
        <Label><Cpu className="h-3 w-3" /> Technology</Label>
        <h2 className="text-4xl font-black" style={{ color: "#fff" }}>
          Five Layers. Zero Friction.
        </h2>
        <p className="mt-4 max-w-xl text-base" style={{ color: "rgba(255,255,255,0.5)" }}>
          IBIY's stack is designed to drop into existing infrastructure — no rip-and-replace, no proprietary lock-in.
        </p>
      </FadeIn>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-5 gap-4">
        {TECH_LAYERS.map((layer, i) => {
          const Icon = layer.icon;
          return (
            <FadeIn key={layer.label} delay={0.08 * i}>
              <div
                className="rounded-2xl p-5 h-full flex flex-col"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div
                  className="mb-3 h-10 w-10 flex items-center justify-center rounded-xl"
                  style={{ background: "rgba(117,81,251,0.08)" }}
                >
                  <Icon className="h-5 w-5" style={{ color: PURPLE }} />
                </div>
                <div className="font-bold text-sm mb-2" style={{ color: "#fff" }}>
                  {layer.label}
                </div>
                <div className="text-xs leading-relaxed mt-auto" style={{ color: "rgba(255,255,255,0.4)" }}>
                  {layer.desc}
                </div>
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
  return (
    <section id="investor" className="relative overflow-hidden py-24">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(117,81,251,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <FadeIn>
          <div
            className="mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold tracking-widest uppercase"
            style={{ background: "rgba(117,81,251,0.1)", color: PURPLE, border: `1px solid rgba(117,81,251,0.2)` }}
          >
            <MapPin className="h-3 w-3" /> Investor Access
          </div>

          <h2 className="text-5xl font-black" style={{ color: "#fff" }}>
            Ready to Go Deeper?
          </h2>
          <p className="mt-5 text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
            The full deal room contains the investor deck, $3MM term sheet, ARIA 2027 deployment brief, R.I.S.E. economics, and live revenue modeling — all behind a credentialed access gate.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onEnter}
              className="flex items-center gap-2 rounded-full px-8 py-4 text-base font-bold transition hover:opacity-90 active:scale-95 shadow-lg"
              style={{ background: PURPLE, color: "#020202", boxShadow: `0 0 32px rgba(117,81,251,0.3)` }}
            >
              Enter Deal Room <ArrowRight className="h-4 w-4" />
            </button>
            <a
              href="mailto:carl@iptriple.com"
              className="flex items-center gap-2 rounded-full px-8 py-4 text-base font-semibold transition hover:opacity-80"
              style={{
                background: "rgba(255,255,255,0.06)",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
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
              style={{ color: "rgba(255,255,255,0.35)" }}
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
  return (
    <footer
      className="border-t px-6 py-8 text-center text-xs"
      style={{ borderColor: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.25)" }}
    >
      © 2026 TPG × IBIY. Confidential investment materials. Not an offer to sell securities.
    </footer>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function TpgIbiyCoverPage({ onEnter }: { onEnter: () => void }) {
  return (
    <div
      className="min-h-screen antialiased"
      style={{ background: "#020202", color: "#fff", fontFamily: "Poppins, sans-serif" }}
    >
      <Nav onEnter={onEnter} />
      <HeroSection onEnter={onEnter} />

      {/* Divider */}
      <div className="mx-auto max-w-6xl px-6">
        <div style={{ height: 1, background: "linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)" }} />
      </div>

      <PlatformSection />

      <div className="mx-auto max-w-6xl px-6">
        <div style={{ height: 1, background: "linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)" }} />
      </div>

      <AriaSection />

      <div className="mx-auto max-w-6xl px-6">
        <div style={{ height: 1, background: "linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)" }} />
      </div>

      <VerticalsSection />

      <div className="mx-auto max-w-6xl px-6">
        <div style={{ height: 1, background: "linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)" }} />
      </div>

      <EconomicsSection />

      <div className="mx-auto max-w-6xl px-6">
        <div style={{ height: 1, background: "linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)" }} />
      </div>

      <TechnologySection />

      <div className="mx-auto max-w-6xl px-6">
        <div style={{ height: 1, background: "linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)" }} />
      </div>

      <InvestorSection onEnter={onEnter} />
      <Footer />
    </div>
  );
}
