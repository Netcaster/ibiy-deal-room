import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const NEURAL_SVG = (
  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="15" cy="15" r="3.5" fill="white"/>
    <circle cx="15" cy="5"  r="2.2" fill="white" opacity="0.85"/>
    <circle cx="23.5" cy="10" r="2.2" fill="white" opacity="0.85"/>
    <circle cx="23.5" cy="20" r="2.2" fill="white" opacity="0.85"/>
    <circle cx="15" cy="25" r="2.2" fill="white" opacity="0.85"/>
    <circle cx="6.5" cy="20" r="2.2" fill="white" opacity="0.85"/>
    <circle cx="6.5" cy="10" r="2.2" fill="white" opacity="0.85"/>
    <line x1="15" y1="7.2"  x2="15"   y2="11.5" stroke="white" strokeWidth="1" opacity="0.45"/>
    <line x1="21.7" y1="11.2" x2="18.2" y2="13.2" stroke="white" strokeWidth="1" opacity="0.45"/>
    <line x1="21.7" y1="18.8" x2="18.2" y2="16.8" stroke="white" strokeWidth="1" opacity="0.45"/>
    <line x1="15" y1="22.8" x2="15"   y2="18.5" stroke="white" strokeWidth="1" opacity="0.45"/>
    <line x1="8.3" y1="18.8" x2="11.8" y2="16.8" stroke="white" strokeWidth="1" opacity="0.45"/>
    <line x1="8.3" y1="11.2" x2="11.8" y2="13.2" stroke="white" strokeWidth="1" opacity="0.45"/>
    <circle cx="15" cy="15" r="7"  stroke="white" strokeWidth="0.5" opacity="0.15"/>
    <circle cx="15" cy="15" r="12" stroke="white" strokeWidth="0.4" opacity="0.08"/>
  </svg>
);

const CLOSE_SVG = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
    <line x1="18" y1="6"  x2="6"  y2="18"/>
    <line x1="6"  y1="6"  x2="18" y2="18"/>
  </svg>
);

export function NeuralWidget({ color = "#6366f1", colorDark = "#4f46e5" }: { color?: string; colorDark?: string }) {
  const BUBBLE_COLOR = color;
  const BUBBLE_DARK  = colorDark;
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        id="nalu-bubble"
        aria-label="Open IBIY Neural assistant"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        style={{
          position:       "fixed",
          bottom:         "24px",
          right:          "24px",
          width:          "56px",
          height:         "56px",
          borderRadius:   "50%",
          background:     `linear-gradient(135deg, ${BUBBLE_COLOR}, ${BUBBLE_DARK})`,
          border:         "none",
          cursor:         "pointer",
          boxShadow:      "0 4px 20px rgba(0,0,0,0.28)",
          zIndex:         2147483646,
          display:        "flex",
          alignItems:     "center",
          justifyContent: "center",
          transition:     "transform 0.2s ease, box-shadow 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.08)";
          e.currentTarget.style.boxShadow = "0 6px 28px rgba(0,0,0,0.38)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "";
          e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.28)";
        }}
      >
        {open ? CLOSE_SVG : NEURAL_SVG}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0,  scale: 1 }}
            exit={{    opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{
              position:      "fixed",
              bottom:        "92px",
              right:         "24px",
              width:         "370px",
              zIndex:        2147483645,
              borderRadius:  "16px",
              overflow:      "hidden",
              boxShadow:     "0 8px 40px rgba(0,0,0,0.32)",
              display:       "flex",
              flexDirection: "column",
            }}
          >
            {/* Header */}
            <div style={{
              background:  `linear-gradient(135deg, ${BUBBLE_COLOR} 0%, ${BUBBLE_DARK} 100%)`,
              padding:     "14px 16px",
              display:     "flex",
              alignItems:  "center",
              gap:         12,
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: "50%",
                background: "rgba(255,255,255,0.18)",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                {NEURAL_SVG}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ color: "#fff", fontWeight: 600, fontSize: 13 }}>IBIY Neural</div>
                <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 10, marginTop: 1 }}>Powered by Nalu Ai</div>
              </div>
              <button
                onClick={() => setOpen(false)}
                style={{ background: "none", border: "none", color: "rgba(255,255,255,0.65)", cursor: "pointer", padding: 4, borderRadius: 6, display: "flex" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.65)")}
              >
                <X size={15} />
              </button>
            </div>

            {/* Body */}
            <div style={{
              background: "#06101a",
              padding:    "16px",
              flex:       1,
              minHeight:  "200px",
              display:    "flex",
              flexDirection: "column",
              gap:        12,
            }}>
              <div style={{ display: "flex", gap: 8 }}>
                <div style={{
                  width: 28, height: 28, borderRadius: "50%",
                  background: BUBBLE_COLOR,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0, fontSize: 11, fontWeight: 600, color: "#fff",
                }}>AI</div>
                <div style={{
                  background:   "#102030",
                  borderRadius: "4px 14px 14px 14px",
                  padding:      "9px 12px",
                  fontSize:     13.5,
                  lineHeight:   1.55,
                  color:        "#eaf0f7",
                  maxWidth:     "82%",
                }}>
                  Hi! I'm the AI assistant for <strong>IBIY</strong>. How can I help you today?
                </div>
              </div>
            </div>

            {/* Footer */}
            <div style={{
              background:  "#06101a",
              borderTop:   "1px solid rgba(255,255,255,0.06)",
              padding:     "8px 16px",
              textAlign:   "center",
              fontSize:    10,
              color:       "rgba(255,255,255,0.20)",
            }}>
              Powered by <span style={{ color: "rgba(255,255,255,0.35)" }}>Nalu Ai</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
