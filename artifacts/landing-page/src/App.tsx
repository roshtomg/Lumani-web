import { useState } from "react";

const logo = "/logo.png";
const maternityMap = "/maternity-care-deserts.webp";

export default function App() {
  const [nlEmail, setNlEmail] = useState("");
  const [nlStatus, setNlStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [nlMessage, setNlMessage] = useState("");

  async function handleNewsletterSubmit(e: React.FormEvent) {
    e.preventDefault();
    setNlStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: nlEmail }),
      });
      const data = await res.json();
      if (res.ok) {
        setNlStatus("success");
        setNlMessage(data.message || "Thanks for subscribing!");
        setNlEmail("");
      } else {
        setNlStatus("error");
        setNlMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setNlStatus("error");
      setNlMessage("Could not connect. Please try again.");
    }
  }

  return (
    <div className="min-h-screen text-foreground" style={{ fontFamily: "Georgia, 'Times New Roman', serif", background: "linear-gradient(160deg, #e8f4f7 0%, #f0f8fa 30%, #ffffff 60%, #e6f2f5 100%)" }}>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50" style={{ background: "rgba(13,61,71,0.7)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <img src={logo} alt="Lumani" className="h-12 w-auto" style={{ mixBlendMode: "screen", opacity: 0.9 }} />
          <div className="hidden md:flex items-center gap-8 text-sm font-medium" style={{ color: "rgba(255,255,255,0.8)" }}>
            <a href="#problem" className="hover:text-foreground transition-colors">The Problem</a>
            <a href="#solution" className="hover:text-foreground transition-colors">Our Solution</a>
            <a href="#team" className="hover:text-foreground transition-colors">Our Team</a>
            <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
          </div>
          <a
            href="#contact"
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Get in Touch
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-28 px-6 relative overflow-hidden" style={{ backgroundImage: "url('/hero-bg.png')", backgroundSize: "cover", backgroundPosition: "center", minHeight: "100vh", display: "flex", alignItems: "center" }}>
        {/* Dark overlay for text legibility */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(135deg, rgba(13,61,71,0.78) 0%, rgba(26,107,122,0.65) 60%, rgba(13,61,71,0.55) 100%)" }} />

        <div className="max-w-6xl mx-auto flex flex-col items-center text-center relative z-10 w-full">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight max-w-3xl" style={{ color: "#ffffff" }}>
            The Future of Prenatal Ultrasound
          </h1>
          <p className="mt-4 text-2xl font-semibold" style={{ color: "#a8dde8" }}>Care Anywhere</p>
          <p className="mt-5 text-xl max-w-2xl leading-relaxed" style={{ color: "rgba(255,255,255,0.85)" }}>
            Millions of parents lack access to prenatal imaging. Lumani is changing that. We're bringing high-quality prenatal ultrasound into the home.
          </p>
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <a
              href="#problem"
              className="px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity shadow-md"
              style={{ background: "linear-gradient(135deg, #1a6b7a, #2a9ab0)", color: "white" }}
            >
              See the Problem
            </a>
            <a
              href="#solution"
              className="px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors"
              style={{ color: "white", border: "1.5px solid rgba(255,255,255,0.5)", background: "rgba(255,255,255,0.1)", backdropFilter: "blur(4px)" }}
            >
              Our Solution
            </a>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problem" className="py-20 px-6 relative" style={{ background: "linear-gradient(135deg, #0d3d47 0%, #1a6b7a 50%, #2a9ab0 100%)" }}>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold uppercase tracking-wider" style={{ color: "#a8dde8" }}>The Problem</span>
            <h2 className="mt-3 text-4xl font-bold text-white leading-tight">Maternity care deserts are everywhere</h2>
            <p className="mt-4 max-w-2xl mx-auto leading-relaxed text-lg" style={{ color: "#c8eaf0" }}>
              Across the United States, more than 1 in 3 counties have little or no access to maternity care — leaving millions of women without the prenatal imaging they need.
            </p>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-12">
            {[
              { value: "1,119", label: "Maternity Care Deserts", color: "#ff6b6b" },
              { value: "373", label: "Low Access Counties", color: "#ffab6b" },
              { value: "223", label: "Moderate Access Counties", color: "#ffd166" },
              { value: "36M+", label: "Women in Underserved Areas", color: "#a8dde8" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl p-5 text-center shadow-sm" style={{ background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.20)" }}>
                <div className="text-3xl font-bold" style={{ color: stat.color }}>{stat.value}</div>
                <div className="mt-2 text-sm leading-snug" style={{ color: "#c8eaf0" }}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Map */}
          <div className="rounded-2xl overflow-hidden shadow-xl" style={{ border: "1px solid rgba(255,255,255,0.25)" }}>
            <img
              src={maternityMap}
              alt="Figure 1: Maternity Care Deserts, 2020 — U.S. map showing 1,119 maternity care desert counties in red"
              className="w-full h-auto"
            />
          </div>

          <p className="mt-8 text-center max-w-2xl mx-auto leading-relaxed" style={{ color: "#c8eaf0" }}>
            Without access to prenatal ultrasound, dangerous complications go undetected. Lumani exists to close this gap.
          </p>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solution" className="py-20 px-6" style={{ background: "linear-gradient(160deg, #f0f8fa 0%, #ffffff 50%, #e8f4f7 100%)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Our Solution</span>
            <h2 className="mt-3 text-4xl font-bold leading-tight" style={{ color: "#0d3d47" }}>Prenatal care, reimagined</h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Lumani's platform delivers at-home prenatal ultrasound with physician oversight, without the barriers of geography.
            </p>
          </div>
          <div className="relative flex flex-col md:flex-row items-center justify-center gap-0">

            {/* Step 1 — Portable Imaging */}
            <div className="flex flex-col items-center text-center px-8 py-6 flex-1">
              <div className="w-24 h-24 rounded-full flex items-center justify-center shadow-lg mb-5" style={{ background: "linear-gradient(135deg, #1a6b7a, #2a9ab0)" }}>
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g transform="translate(0,48) scale(1,-1)">
                    <path d="M24 2 C31 2 33 6 29 9" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                    <rect x="20" y="9" width="8" height="15" rx="3" fill="white" />
                    <path d="M19 24 L29 24 L32 28 Q32 34 24 36 Q16 34 16 28 Z" fill="white" />
                    <path d="M13 37 Q24 46 35 37" stroke="rgba(255,255,255,0.85)" strokeWidth="2" strokeLinecap="round" fill="none" />
                    <path d="M16 40 Q24 48 32 40" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                    <path d="M19 43 Q24 49 29 43" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeLinecap="round" fill="none" />
                  </g>
                </svg>
              </div>
              <h3 className="text-lg font-bold" style={{ color: "#0d3d47" }}>Portable Imaging</h3>
            </div>

            {/* Arrow 1 */}
            <div className="hidden md:flex items-center flex-shrink-0">
              <svg width="80" height="20" viewBox="0 0 80 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="arrowGrad1" x1="0" y1="0" x2="80" y2="0" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#1a6b7a" />
                    <stop offset="100%" stopColor="#2a9ab0" />
                  </linearGradient>
                </defs>
                <line x1="0" y1="10" x2="66" y2="10" stroke="url(#arrowGrad1)" strokeWidth="1.5" />
                <polygon points="66,4 78,10 66,16" fill="#2a9ab0" />
              </svg>
            </div>
            <div className="flex md:hidden items-center justify-center my-1">
              <svg width="20" height="44" viewBox="0 0 20 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="arrowGradV1" x1="0" y1="0" x2="0" y2="44" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#1a6b7a" />
                    <stop offset="100%" stopColor="#2a9ab0" />
                  </linearGradient>
                </defs>
                <line x1="10" y1="0" x2="10" y2="30" stroke="url(#arrowGradV1)" strokeWidth="1.5" />
                <polygon points="4,30 10,42 16,30" fill="#2a9ab0" />
              </svg>
            </div>

            {/* Step 2 — AI-Assisted Analysis */}
            <div className="flex flex-col items-center text-center px-8 py-6 flex-1">
              <div className="w-24 h-24 rounded-full flex items-center justify-center shadow-lg mb-5" style={{ background: "linear-gradient(135deg, #1a6b7a, #2a9ab0)" }}>
                <svg width="44" height="44" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="4" width="44" height="34" rx="3" fill="rgba(255,255,255,0.15)" />
                  <rect x="2" y="4" width="44" height="34" rx="3" stroke="white" strokeWidth="1.5" />
                  <line x1="6" y1="8" x2="6" y2="34" stroke="rgba(255,255,255,0.25)" strokeWidth="0.5" />
                  <line x1="11" y1="8" x2="11" y2="34" stroke="rgba(255,255,255,0.25)" strokeWidth="0.5" />
                  <line x1="16" y1="8" x2="16" y2="34" stroke="rgba(255,255,255,0.25)" strokeWidth="0.5" />
                  <line x1="21" y1="8" x2="21" y2="34" stroke="rgba(255,255,255,0.25)" strokeWidth="0.5" />
                  <line x1="26" y1="8" x2="26" y2="34" stroke="rgba(255,255,255,0.25)" strokeWidth="0.5" />
                  <line x1="31" y1="8" x2="31" y2="34" stroke="rgba(255,255,255,0.25)" strokeWidth="0.5" />
                  <line x1="36" y1="8" x2="36" y2="34" stroke="rgba(255,255,255,0.25)" strokeWidth="0.5" />
                  <line x1="41" y1="8" x2="41" y2="34" stroke="rgba(255,255,255,0.25)" strokeWidth="0.5" />
                  <ellipse cx="20" cy="18" rx="6" ry="5.5" fill="white" opacity="0.85" />
                  <ellipse cx="28" cy="25" rx="5" ry="4" fill="white" opacity="0.65" />
                  <path d="M22 21 Q26 23 27 27" stroke="rgba(255,255,255,0.9)" strokeWidth="1.2" strokeLinecap="round" fill="none" />
                  <path d="M30 22 Q33 20 34 22" stroke="rgba(255,255,255,0.7)" strokeWidth="1" strokeLinecap="round" fill="none" />
                  <line x1="14" y1="18" x2="26" y2="18" stroke="rgba(255,255,255,0.6)" strokeWidth="0.7" strokeDasharray="1 1" />
                  <line x1="20" y1="12" x2="20" y2="24" stroke="rgba(255,255,255,0.6)" strokeWidth="0.7" strokeDasharray="1 1" />
                  <rect x="2" y="38" width="44" height="6" rx="0" fill="rgba(255,255,255,0.15)" />
                  <rect x="4" y="39.5" width="14" height="3" rx="1" fill="rgba(255,255,255,0.5)" />
                </svg>
              </div>
              <h3 className="text-lg font-bold" style={{ color: "#0d3d47" }}>AI-Assisted Analysis</h3>
            </div>

            {/* Arrow 2 */}
            <div className="hidden md:flex items-center flex-shrink-0">
              <svg width="80" height="20" viewBox="0 0 80 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="arrowGrad2" x1="0" y1="0" x2="80" y2="0" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#1a6b7a" />
                    <stop offset="100%" stopColor="#2a9ab0" />
                  </linearGradient>
                </defs>
                <line x1="0" y1="10" x2="66" y2="10" stroke="url(#arrowGrad2)" strokeWidth="1.5" />
                <polygon points="66,4 78,10 66,16" fill="#2a9ab0" />
              </svg>
            </div>
            <div className="flex md:hidden items-center justify-center my-1">
              <svg width="20" height="44" viewBox="0 0 20 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="arrowGradV2" x1="0" y1="0" x2="0" y2="44" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#1a6b7a" />
                    <stop offset="100%" stopColor="#2a9ab0" />
                  </linearGradient>
                </defs>
                <line x1="10" y1="0" x2="10" y2="30" stroke="url(#arrowGradV2)" strokeWidth="1.5" />
                <polygon points="4,30 10,42 16,30" fill="#2a9ab0" />
              </svg>
            </div>

            {/* Step 3 — Connected Care */}
            <div className="flex flex-col items-center text-center px-8 py-6 flex-1">
              <div className="w-24 h-24 rounded-full flex items-center justify-center shadow-lg mb-5" style={{ background: "linear-gradient(135deg, #1a6b7a, #2a9ab0)" }}>
                <svg width="44" height="44" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="7" r="2.5" fill="white" />
                  <circle cx="30" cy="7" r="2.5" fill="white" />
                  <path d="M12 9.5 L12 18 Q12 26 21 26" stroke="white" strokeWidth="2.8" strokeLinecap="round" fill="none" />
                  <path d="M30 9.5 L30 18 Q30 26 21 26" stroke="white" strokeWidth="2.8" strokeLinecap="round" fill="none" />
                  <path d="M21 26 Q21 34 27 38 Q33 42 36 38" stroke="white" strokeWidth="2.8" strokeLinecap="round" fill="none" />
                  <circle cx="36" cy="36" r="5" fill="rgba(255,255,255,0.3)" stroke="white" strokeWidth="1.5" />
                  <circle cx="36" cy="36" r="2.5" fill="white" />
                </svg>
              </div>
              <h3 className="text-lg font-bold" style={{ color: "#0d3d47" }}>Connected Care</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section id="team" className="py-20 px-6" style={{ background: "linear-gradient(160deg, #e8f4f7 0%, #f0f8fa 50%, #ffffff 100%)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Our Team</span>
            <h2 className="mt-3 text-4xl font-bold leading-tight" style={{ color: "#0d3d47" }}>The people behind Lumani</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-12">
            {/* Melanie Roshto */}
            <div className="flex flex-col items-center text-center max-w-xs">

              <div className="w-48 h-48 rounded-full overflow-hidden shadow-xl mb-5" style={{ border: "3px solid rgba(26,107,122,0.2)", background: "transparent" }}>
                <img
                  src="/team-melanie.png"
                  alt="Melanie Roshto"
                  className="w-full h-full object-contain"
                  style={{ background: "transparent", transform: "scale(1.1) translate(-4%, 14%)", transformOrigin: "50% 50%" }}
                />
              </div>
              <h3 className="text-xl font-bold" style={{ color: "#0d3d47" }}>Melanie Roshto, PA-C</h3>
              <p className="mt-1 text-sm font-semibold uppercase tracking-wider" style={{ color: "#2a9ab0" }}>CEO &amp; Co-founder</p>
              <ul className="mt-4 text-sm leading-relaxed text-left space-y-2" style={{ color: "#4a7a85" }}>
                <li className="flex items-start gap-2"><span style={{ color: "#2a9ab0", marginTop: "2px" }}>▸</span>15 years of direct obstetrical care</li>
                <li className="flex items-start gap-2"><span style={{ color: "#2a9ab0", marginTop: "2px" }}>▸</span>Specializing in high-risk pregnancies</li>
                <li className="flex items-start gap-2"><span style={{ color: "#2a9ab0", marginTop: "2px" }}>▸</span>Healthcare simulation specialist</li>
                <li className="flex items-start gap-2"><span style={{ color: "#2a9ab0", marginTop: "2px" }}>▸</span>Driving product, clinical &amp; regulatory strategy</li>
              </ul>
            </div>

            {/* Sean DeClercq */}
            <div className="flex flex-col items-center text-center max-w-xs">
              <div className="w-48 h-48 rounded-full overflow-hidden shadow-xl mb-5" style={{ border: "3px solid rgba(26,107,122,0.2)", background: "transparent" }}>
                <img
                  src="/team-sean.png"
                  alt="Sean DeClercq"
                  className="w-full h-full object-contain"
                  style={{ background: "transparent", transform: "scale(1.1) translate(-12%, 2%)", transformOrigin: "50% 50%" }}
                />
              </div>
              <h3 className="text-xl font-bold" style={{ color: "#0d3d47" }}>Sean DeClercq</h3>
              <p className="mt-1 text-sm font-semibold uppercase tracking-wider" style={{ color: "#2a9ab0" }}>CBO &amp; Co-founder</p>
              <ul className="mt-4 text-sm leading-relaxed text-left space-y-2" style={{ color: "#4a7a85" }}>
                <li className="flex items-start gap-2"><span style={{ color: "#2a9ab0", marginTop: "2px" }}>▸</span>Supply chain management expert</li>
                <li className="flex items-start gap-2"><span style={{ color: "#2a9ab0", marginTop: "2px" }}>▸</span>Serial entrepreneur</li>
                <li className="flex items-start gap-2"><span style={{ color: "#2a9ab0", marginTop: "2px" }}>▸</span>Driving business development &amp; go-to-market strategy</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0a2e36 0%, #1a6b7a 60%, #2a9ab0 100%)" }}>
        <div className="absolute inset-0 pointer-events-none opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #ffffff 1px, transparent 1px), radial-gradient(circle at 80% 20%, #ffffff 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl font-bold mb-6 text-white">Join us in transforming maternal health</h2>
          <p className="text-xl mb-10 max-w-xl mx-auto leading-relaxed" style={{ color: "#c8eaf0" }}>
            Whether you're a healthcare provider, investor, or partner — we'd love to hear from you.
          </p>
          <a
            id="contact"
            href="mailto:hello@lumani.ai"
            className="inline-block px-8 py-4 rounded-lg font-bold text-lg hover:opacity-90 transition-opacity shadow-lg"
            style={{ background: "white", color: "#0d3d47" }}
          >
            hello@lumani.ai
          </a>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section id="newsletter" className="py-20 px-6" style={{ background: "linear-gradient(160deg, #f0f8fa 0%, #ffffff 50%, #e8f4f7 100%)" }}>
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-3" style={{ color: "#0d3d47" }}>Stay in the loop</h2>
          <p className="mb-8 text-base leading-relaxed" style={{ color: "#4a7a85" }}>
            Get updates on our progress, research, and launch milestones delivered to your inbox.
          </p>
          {nlStatus === "success" ? (
            <div className="rounded-xl px-6 py-5 text-base font-medium" style={{ background: "#dff0f5", color: "#0d3d47", border: "1px solid rgba(26,107,122,0.25)" }}>
              {nlMessage}
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                placeholder="Your email address"
                value={nlEmail}
                onChange={(e) => setNlEmail(e.target.value)}
                disabled={nlStatus === "loading"}
                className="flex-1 rounded-lg px-4 py-3 text-base outline-none"
                style={{
                  border: "1.5px solid rgba(26,107,122,0.3)",
                  color: "#0d3d47",
                  background: "white",
                  fontFamily: "Georgia, 'Times New Roman', serif",
                }}
              />
              <button
                type="submit"
                disabled={nlStatus === "loading"}
                className="rounded-lg px-6 py-3 font-bold text-base transition-opacity hover:opacity-90"
                style={{ background: "#1a6b7a", color: "white", fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                {nlStatus === "loading" ? "Subscribing…" : "Subscribe"}
              </button>
            </form>
          )}
          {nlStatus === "error" && (
            <p className="mt-3 text-sm" style={{ color: "#c0392b" }}>{nlMessage}</p>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 border-t border-border" style={{ background: "linear-gradient(160deg, #e8f4f7 0%, #f0f8fa 100%)" }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <img src={logo} alt="Lumani" className="h-10 w-auto" style={{ mixBlendMode: "multiply" }} />
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Lumani. All rights reserved.</p>
          <div className="flex gap-5 text-sm text-muted-foreground">
            <a href="#problem" className="hover:text-foreground transition-colors">The Problem</a>
            <a href="#solution" className="hover:text-foreground transition-colors">Our Solution</a>
            <a href="mailto:hello@lumani.ai" className="hover:text-foreground transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
