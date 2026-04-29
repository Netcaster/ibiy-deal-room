import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  Download,
  FileText,
  HandHeart,
  Hotel,
  KeyRound,
  LockKeyhole,
  Mail,
  Plane,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Star,
  Ticket,
  TrendingUp,
  Users,
  Wallet,
  Watch,
  Zap,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type ScenarioKey = "aria" | "regional" | "national" | "rise";

interface Scenario {
  label: string;
  icon: React.ElementType;
  users: number;
  allocation: number;
  events: number;
  sponsorMultiplier: number;
  description: string;
}

interface Document {
  title: string;
  status: string;
  type: string;
  icon: React.ElementType;
}

interface User {
  email: string;
  role: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const scenarios: Record<ScenarioKey, Scenario> = {
  aria: {
    label: "ARIA 2027 Anchor",
    icon: Hotel,
    users: 8000,
    allocation: 25,
    events: 1,
    sponsorMultiplier: 1.5,
    description:
      "Flagship Las Vegas deployment with room package integration, digital ticket companion, wallet activation, and sponsor commerce triggers.",
  },
  regional: {
    label: "Regional Event Cycle",
    icon: Ticket,
    users: 25000,
    allocation: 25,
    events: 10,
    sponsorMultiplier: 1.75,
    description:
      "Multi-market cycle across hospitality, entertainment, sports, and event packages with repeated prepaid bracelet allocation.",
  },
  national: {
    label: "National Deployment",
    icon: Building2,
    users: 100000,
    allocation: 25,
    events: 50,
    sponsorMultiplier: 2.0,
    description:
      "Scaled TPG deployment across hotel blocks, concerts, airports, mobile issuance, sponsor campaigns, and media overlays.",
  },
  rise: {
    label: "R.I.S.E. Resident Packet",
    icon: HandHeart,
    users: 771480,
    allocation: 25,
    events: 1,
    sponsorMultiplier: 1.25,
    description:
      "Philanthropic welcome packet issuance across 192,870 containers x 4 residents, including identity, wallet, and access activation.",
  },
};

const documents: Document[] = [
  { title: "Investor Deck", status: "Ready for Upload", type: "PDF / PPT", icon: FileText },
  { title: "$3MM License Term Sheet", status: "Draft Required", type: "Legal", icon: ShieldCheck },
  { title: "ARIA 2027 Deployment Brief", status: "Ready for Upload", type: "Brief", icon: Hotel },
  { title: "R.I.S.E. Packet Economics", status: "Ready for Upload", type: "Model", icon: HandHeart },
  { title: "Manufacturing + Fulfillment Waterfall", status: "Draft Required", type: "Ops", icon: BarChart3 },
  { title: "Sponsor / Vendor Activation Menu", status: "Ready for Upload", type: "Sales", icon: Star },
];

const flow = ["Book", "Allocate", "Float", "Produce", "Redeem", "Activate"];
const activationSteps = ["Tap", "Identity", "Wallet", "Access", "Commerce", "Sponsor"];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatMoney(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

// ─── MetricCard ───────────────────────────────────────────────────────────────

interface MetricCardProps {
  label: string;
  value: string;
  note: string;
  icon: React.ElementType;
}

function MetricCard({ label, value, note, icon: Icon }: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 shadow-xl shadow-black/20 backdrop-blur"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="rounded-2xl p-3" style={{ background: "rgba(117,81,251,0.15)", color: "#3fe0fd" }}>
          <Icon className="h-6 w-6" />
        </div>
        <div className="text-right text-xs uppercase tracking-[0.18em] text-slate-500">{label}</div>
      </div>
      <div className="mt-5 text-3xl font-semibold tracking-tight text-white">{value}</div>
      <div className="mt-2 text-sm leading-6 text-slate-300">{note}</div>
    </motion.div>
  );
}

// ─── PortalLogin ─────────────────────────────────────────────────────────────

interface PortalLoginProps {
  onEnter: (user: User) => void;
}

function PortalLogin({ onEnter }: PortalLoginProps) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Investor");

  return (
    <div className="relative min-h-screen overflow-hidden px-5 py-10 text-white" style={{ background: "#020202" }}>
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-12%] h-[520px] w-[520px] -translate-x-1/2 rounded-full blur-3xl" style={{ background: "rgba(117,81,251,0.22)" }} />
        <div className="absolute bottom-[-20%] right-[-10%] h-[520px] w-[520px] rounded-full blur-3xl" style={{ background: "rgba(63,224,253,0.15)" }} />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100vh-5rem)] max-w-7xl items-center justify-center">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[1.05fr_.95fr]">
          <div>
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.22em]"
              style={{ border: "1px solid rgba(117,81,251,0.35)", background: "rgba(117,81,251,0.12)", color: "#a98fff" }}
            >
              <LockKeyhole className="h-4 w-4" /> TPG × IBIY Deal Room
            </div>
            <h1 className="mt-7 text-5xl font-semibold tracking-tight md:text-7xl" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Private investor access for prepaid wearable infrastructure.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300" style={{ fontFamily: "'Lato', sans-serif" }}>
              Review the $3MM license opportunity, ARIA 2027 anchor deployment, multi-vertical expansion model, yearly projections, and AI-guided revenue scenarios.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {[
                "License-only capital",
                "Prepaid allocation model",
                "ARIA 2027 anchor",
                "R.I.S.E. $19.287M baseline",
              ].map((x) => (
                <div key={x} className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm text-slate-200">
                  {x}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-7 shadow-2xl shadow-black/30 backdrop-blur">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl p-3" style={{ background: "#7551fb" }}>
                <KeyRound className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold" style={{ fontFamily: "'Poppins', sans-serif" }}>Enter Deal Room</h2>
                <p className="text-sm text-slate-400">Secure investor access portal.</p>
              </div>
            </div>

            <form
              className="mt-7 space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                onEnter({ email, role });
              }}
            >
              <label className="block">
                <span className="mb-2 block text-sm text-slate-300">Email</span>
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 px-4 py-3" style={{ background: "rgba(2,2,2,0.6)" }}>
                  <Mail className="h-5 w-5" style={{ color: "#3fe0fd" }} />
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent text-sm outline-none placeholder:text-slate-600"
                    placeholder="investor@example.com"
                  />
                </div>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm text-slate-300">Access Role</span>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 px-4 py-3 text-sm outline-none"
                  style={{ background: "rgba(2,2,2,0.6)" }}
                >
                  <option>Investor</option>
                  <option>Strategic Partner</option>
                  <option>Hotel / Venue Group</option>
                  <option>Sponsor / Vendor</option>
                  <option>Municipal / R.I.S.E. Partner</option>
                </select>
              </label>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3 font-bold text-white transition hover:opacity-90"
                style={{ background: "#7551fb", fontFamily: "'Poppins', sans-serif" }}
              >
                Unlock Portal <ArrowRight className="h-4 w-4" />
              </button>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
}

// ─── ScenarioEngine ──────────────────────────────────────────────────────────

interface ScenarioEngineProps {
  activeScenario: ScenarioKey;
  setActiveScenario: (key: ScenarioKey) => void;
}

function ScenarioEngine({ activeScenario, setActiveScenario }: ScenarioEngineProps) {
  const [step, setStep] = useState(0);
  const [users, setUsers] = useState(scenarios[activeScenario].users);
  const [allocation, setAllocation] = useState(scenarios[activeScenario].allocation);
  const [events, setEvents] = useState(scenarios[activeScenario].events);
  const [sponsorMultiplier, setSponsorMultiplier] = useState(scenarios[activeScenario].sponsorMultiplier);

  const current = scenarios[activeScenario];
  const ScenarioIcon = current.icon;
  const prepaidRevenue = users * allocation * events;
  const sponsorUpside = prepaidRevenue * (sponsorMultiplier - 1);
  const totalModeled = prepaidRevenue + sponsorUpside;

  const applyScenario = (key: ScenarioKey) => {
    const next = scenarios[key];
    setActiveScenario(key);
    setUsers(next.users);
    setAllocation(next.allocation);
    setEvents(next.events);
    setSponsorMultiplier(next.sponsorMultiplier);
    setStep(0);
  };

  const exportSnapshot = () => {
    const snapshot = [
      "TPG x IBIY Investor Scenario Snapshot",
      `Scenario: ${current.label}`,
      `Users: ${users.toLocaleString()}`,
      `Allocation: $${allocation}`,
      `Events / Deployments: ${events}`,
      `Prepaid Revenue: ${formatMoney(prepaidRevenue)}`,
      `Sponsor / Vendor Upside: ${formatMoney(sponsorUpside)}`,
      `Total Modeled Opportunity: ${formatMoney(totalModeled)}`,
      "Flow: Book > Allocate > Float > Produce > Redeem > Activate",
      "Core Thesis: Revenue captured before fulfillment.",
    ].join("\n");

    const blob = new Blob([snapshot], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `TPG-IBIY-${current.label.replaceAll(" ", "-")}-Snapshot.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-black/25 backdrop-blur">
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
        <div>
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold text-white"
            style={{ background: "#7551fb", fontFamily: "'Poppins', sans-serif" }}
          >
            <ScenarioIcon className="h-4 w-4" /> Scenario Engine
          </div>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight" style={{ fontFamily: "'Poppins', sans-serif" }}>Live investor revenue model</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300" style={{ fontFamily: "'Lato', sans-serif" }}>
            Select a deployment, step through the activation flow, then model prepaid revenue, yearly stacking, and sponsor/vendor upside.
          </p>
        </div>
        <button
          onClick={exportSnapshot}
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-semibold hover:bg-white/15"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          <Download className="h-4 w-4" /> Export Snapshot
        </button>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-4">
        {(Object.entries(scenarios) as [ScenarioKey, Scenario][]).map(([key, item]) => {
          const Icon = item.icon;
          const active = key === activeScenario;
          return (
            <button
              key={key}
              onClick={() => applyScenario(key)}
              className="rounded-2xl border p-4 text-left transition"
              style={
                active
                  ? { border: "1px solid rgba(117,81,251,0.5)", background: "rgba(117,81,251,0.15)" }
                  : { border: "1px solid rgba(255,255,255,0.1)", background: "rgba(2,2,2,0.4)" }
              }
            >
              <Icon className="h-5 w-5" style={{ color: active ? "#3fe0fd" : "#64748b" }} />
              <div className="mt-3 font-semibold text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>{item.label}</div>
              <div className="mt-1 text-xs leading-5 text-slate-400" style={{ fontFamily: "'Lato', sans-serif" }}>{item.description}</div>
            </button>
          );
        })}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[.8fr_1.2fr]">
        <div className="rounded-[2rem] border border-white/10 p-6 text-center" style={{ background: "rgba(2,2,2,0.5)" }}>
          <motion.div
            onClick={() => setStep((s) => (s < activationSteps.length - 1 ? s + 1 : 0))}
            className="relative mx-auto flex h-36 w-36 cursor-pointer items-center justify-center rounded-full"
            style={{ border: "1px solid rgba(117,81,251,0.5)", background: "#020202" }}
            animate={{ scale: step > 0 ? 1.06 : 1 }}
          >
            <Watch className="h-10 w-10" style={{ color: "#3fe0fd" }} />
            {step > 0 && (
              <motion.div
                initial={{ scale: 1, opacity: 0.6 }}
                animate={{ scale: 2.1, opacity: 0 }}
                transition={{ duration: 1.1, repeat: Infinity }}
                className="absolute h-full w-full rounded-full"
                style={{ border: "1px solid #7551fb" }}
              />
            )}
          </motion.div>
          <div className="mt-5 text-xl font-semibold" style={{ color: "#3fe0fd", fontFamily: "'Poppins', sans-serif" }}>{activationSteps[step]}</div>
          <div className="mt-2 text-sm text-slate-400">Click the bracelet node to advance activation.</div>

          <div className="mt-7 flex flex-wrap justify-center gap-3">
            {activationSteps.slice(0, step + 1).map((x, i) => (
              <motion.div
                key={`${x}-${i}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-full border border-white/10 bg-white/10 px-3 py-2 text-xs text-slate-200"
              >
                {x}
              </motion.div>
            ))}
          </div>

          {step >= 5 && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-7 rounded-2xl p-4"
              style={{ border: "1px solid rgba(117,81,251,0.25)", background: "rgba(117,81,251,0.1)" }}
            >
              <div className="text-xs uppercase tracking-[0.18em]" style={{ color: "#a98fff" }}>Sponsor Trigger</div>
              <div className="mt-3 flex flex-wrap justify-center gap-2">
                {["Hello Energy", "VIBE Water", "Sponsor SKU"].map((s) => (
                  <span
                    key={s}
                    className="rounded-full px-3 py-1 text-xs font-bold text-white"
                    style={{ background: "#7551fb", fontFamily: "'Poppins', sans-serif" }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        <div>
          <div className="grid gap-4 md:grid-cols-3">
            <MetricCard label="Prepaid" value={formatMoney(prepaidRevenue)} note="Captured before fulfillment." icon={CircleDollarSign} />
            <MetricCard label="Sponsor Upside" value={formatMoney(sponsorUpside)} note="Modeled incremental layer." icon={Star} />
            <MetricCard label="Total Modeled" value={formatMoney(totalModeled)} note="Prepaid + modeled upside." icon={TrendingUp} />
          </div>

          <div className="mt-6 rounded-[2rem] border border-white/10 p-5" style={{ background: "rgba(2,2,2,0.5)" }}>
            <div className="grid gap-5 md:grid-cols-2">
              <label>
                <div className="mb-2 flex justify-between text-sm text-slate-300">
                  <span>Users</span><span>{users.toLocaleString()}</span>
                </div>
                <input type="range" min="1000" max="1000000" step="1000" value={users} onChange={(e) => setUsers(Number(e.target.value))} className="w-full" />
              </label>
              <label>
                <div className="mb-2 flex justify-between text-sm text-slate-300">
                  <span>Allocation</span><span>${allocation}</span>
                </div>
                <input type="range" min="10" max="100" step="5" value={allocation} onChange={(e) => setAllocation(Number(e.target.value))} className="w-full" />
              </label>
              <label>
                <div className="mb-2 flex justify-between text-sm text-slate-300">
                  <span>Events / Deployments</span><span>{events}</span>
                </div>
                <input type="range" min="1" max="150" step="1" value={events} onChange={(e) => setEvents(Number(e.target.value))} className="w-full" />
              </label>
              <label>
                <div className="mb-2 flex justify-between text-sm text-slate-300">
                  <span>Sponsor Multiplier</span><span>{sponsorMultiplier.toFixed(2)}x</span>
                </div>
                <input type="range" min="1" max="3" step="0.05" value={sponsorMultiplier} onChange={(e) => setSponsorMultiplier(Number(e.target.value))} className="w-full" />
              </label>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-2 text-sm text-slate-300">
            {flow.map((x, i) => (
              <React.Fragment key={x}>
                <span className="rounded-full bg-white px-3 py-1 font-semibold text-slate-950">{x}</span>
                {i < flow.length - 1 && <ArrowRight className="h-4 w-4 text-slate-500" />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── AiRevenuePanel ───────────────────────────────────────────────────────────

interface AiRevenuePanelProps {
  activeScenario: ScenarioKey;
}

function AiRevenuePanel({ activeScenario }: AiRevenuePanelProps) {
  const [venueRooms, setVenueRooms] = useState(5000);
  const [guestsPerRoom, setGuestsPerRoom] = useState(2);
  const [events, setEvents] = useState(12);
  const [allocation, setAllocation] = useState(25);

  const suggestedUsers = venueRooms * guestsPerRoom;
  const eventRevenue = suggestedUsers * allocation;
  const yearlyRevenue = eventRevenue * events;
  const sponsorLayer = yearlyRevenue * 0.75;
  const blended = yearlyRevenue + sponsorLayer;

  const recommendation = useMemo(() => {
    if (activeScenario === "rise")
      return "Recommended: treat R.I.S.E. as a baseline enterprise contract, then layer sponsor-funded replenishment and vendor redemption economics.";
    if (venueRooms >= 5000)
      return "Recommended: position as anchor deployment with premium sponsor tiers and mandatory package inclusion.";
    if (events >= 25)
      return "Recommended: prioritize regional replication and lock annual sponsor commitments against the full event calendar.";
    return "Recommended: begin with controlled pilot deployment, collect redemption data, then expand into regional event stacking.";
  }, [activeScenario, venueRooms, events]);

  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-black/25">
      <div className="flex items-center gap-3">
        <div className="rounded-2xl p-3" style={{ background: "rgba(63,224,253,0.12)", color: "#3fe0fd" }}>
          <Sparkles className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold" style={{ fontFamily: "'Poppins', sans-serif" }}>AI Suggested Revenue Scenarios</h2>
          <p className="text-sm text-slate-400">Connect to internal model or LLM endpoint for production use.</p>
        </div>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <label>
          <div className="mb-2 flex justify-between text-sm text-slate-300"><span>Rooms / Units</span><span>{venueRooms.toLocaleString()}</span></div>
          <input type="range" min="500" max="10000" step="100" value={venueRooms} onChange={(e) => setVenueRooms(Number(e.target.value))} className="w-full" />
        </label>
        <label>
          <div className="mb-2 flex justify-between text-sm text-slate-300"><span>Guests / Unit</span><span>{guestsPerRoom}</span></div>
          <input type="range" min="1" max="4" step="1" value={guestsPerRoom} onChange={(e) => setGuestsPerRoom(Number(e.target.value))} className="w-full" />
        </label>
        <label>
          <div className="mb-2 flex justify-between text-sm text-slate-300"><span>Events / Year</span><span>{events}</span></div>
          <input type="range" min="1" max="100" step="1" value={events} onChange={(e) => setEvents(Number(e.target.value))} className="w-full" />
        </label>
        <label>
          <div className="mb-2 flex justify-between text-sm text-slate-300"><span>IBIY Allocation</span><span>${allocation}</span></div>
          <input type="range" min="10" max="100" step="5" value={allocation} onChange={(e) => setAllocation(Number(e.target.value))} className="w-full" />
        </label>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-4">
        <MetricCard label="Users/Event" value={suggestedUsers.toLocaleString()} note="Rooms x guests." icon={Users} />
        <MetricCard label="Event Revenue" value={formatMoney(eventRevenue)} note="Single deployment." icon={CalendarDays} />
        <MetricCard label="Yearly Prepaid" value={formatMoney(yearlyRevenue)} note="Annual stack." icon={BarChart3} />
        <MetricCard label="Blended Upside" value={formatMoney(blended)} note="Includes sponsor layer." icon={Zap} />
      </div>

      <div
        className="mt-6 rounded-3xl p-5 text-sm leading-7"
        style={{ border: "1px solid rgba(117,81,251,0.25)", background: "rgba(117,81,251,0.1)", color: "#d4c8ff" }}
      >
        <strong style={{ color: "#a98fff" }}>AI Recommendation:</strong> {recommendation}
      </div>
    </div>
  );
}

// ─── DocumentsPanel ───────────────────────────────────────────────────────────

function DocumentsPanel() {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-black/25">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold" style={{ fontFamily: "'Poppins', sans-serif" }}>Deal Room Materials</h2>
          <p className="mt-1 text-sm text-slate-400">Replace these placeholders with secure document links.</p>
        </div>
        <button className="rounded-2xl border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold hover:bg-white/15" style={{ fontFamily: "'Poppins', sans-serif" }}>
          Upload Asset
        </button>
      </div>
      <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {documents.map((doc) => {
          const Icon = doc.icon;
          return (
            <div key={doc.title} className="rounded-3xl border border-white/10 p-5" style={{ background: "rgba(2,2,2,0.5)" }}>
              <div className="flex items-start justify-between gap-3">
                <Icon className="h-6 w-6" style={{ color: "#3fe0fd" }} />
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-300">{doc.type}</span>
              </div>
              <h3 className="mt-5 font-semibold text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>{doc.title}</h3>
              <p className="mt-2 text-sm text-slate-400">{doc.status}</p>
              <button
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold hover:opacity-75 transition"
                style={{ color: "#3fe0fd", fontFamily: "'Poppins', sans-serif" }}
              >
                Open / Replace <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── DealRoom ─────────────────────────────────────────────────────────────────

interface DealRoomProps {
  user: User;
  onLogout: () => void;
}

function DealRoom({ user, onLogout }: DealRoomProps) {
  const [activeScenario, setActiveScenario] = useState<ScenarioKey>("aria");

  return (
    <div className="min-h-screen text-white" style={{ background: "#020202" }}>
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-20%] h-[620px] w-[620px] -translate-x-1/2 rounded-full blur-3xl" style={{ background: "rgba(117,81,251,0.12)" }} />
        <div className="absolute bottom-[-25%] right-[-10%] h-[520px] w-[520px] rounded-full blur-3xl" style={{ background: "rgba(63,224,253,0.08)" }} />
      </div>

      <header
        className="sticky top-0 z-50 border-b border-white/10 backdrop-blur-xl"
        style={{ background: "rgba(2,2,2,0.75)" }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl" style={{ background: "#7551fb" }}>
              <Watch className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="text-sm font-bold" style={{ fontFamily: "'Poppins', sans-serif" }}>TPG × IBIY Deal Room</div>
              <div className="text-xs text-slate-400">{user.role} Access • {user.email || "demo@dealroom.local"}</div>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Exit
          </button>
        </div>
      </header>

      <main className="relative mx-auto max-w-7xl space-y-8 px-5 py-8">
        {/* Hero */}
        <section
          className="rounded-[2rem] border border-white/10 p-7 shadow-2xl shadow-black/25"
          style={{ background: "linear-gradient(135deg, rgba(117,81,251,0.12) 0%, rgba(255,255,255,0.03) 50%, rgba(63,224,253,0.08) 100%)" }}
        >
          <div className="grid gap-8 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
            <div>
              <div
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.22em]"
                style={{ border: "1px solid rgba(117,81,251,0.35)", background: "rgba(117,81,251,0.12)", color: "#a98fff" }}
              >
                <ShieldCheck className="h-4 w-4" /> Private Capital Package
              </div>
              <h1
                className="mt-5 text-4xl font-semibold tracking-tight md:text-6xl"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                $3MM license-only opportunity. Prepaid multi-vertical deployment engine.
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300" style={{ fontFamily: "'Lato', sans-serif" }}>
                The capital ask secures license rights. Unit manufacturing and D2C fulfillment are designed to be funded by prepaid allocation embedded into hotel rooms, tickets, mobile issuance, sponsor packages, and R.I.S.E. welcome packets.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <MetricCard label="Ask" value="$3MM" note="License-only capital." icon={CircleDollarSign} />
              <MetricCard label="Baseline" value="$19.287M" note="R.I.S.E. welcome packet value." icon={HandHeart} />
              <MetricCard label="Anchor" value="ARIA 2027" note="Flagship deployment." icon={Hotel} />
              <MetricCard label="Model" value="Prepaid" note="Revenue before fulfillment." icon={Wallet} />
            </div>
          </div>
        </section>

        <ScenarioEngine activeScenario={activeScenario} setActiveScenario={setActiveScenario} />
        <AiRevenuePanel activeScenario={activeScenario} />
        <DocumentsPanel />
      </main>
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function TpgIbiyDealRoomUI() {
  const [user, setUser] = useState<User | null>(null);
  return user ? (
    <DealRoom user={user} onLogout={() => setUser(null)} />
  ) : (
    <PortalLogin onEnter={setUser} />
  );
}

void Plane; void ShoppingCart; void CheckCircle2;
