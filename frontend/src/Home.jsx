// ═══════════════════════════════════════════════════════════
//  Home.jsx  —  Landing Page
//  HamChat · Muhammad Hamza Owais
// ═══════════════════════════════════════════════════════════

import "./Home.css";

// ─── Data ─────────────────────────────────────────────────
const STATS = [
  { value: "3,000", label: "Training Samples" },
  { value: "T5-Small", label: "Base Model" },
  { value: "10", label: "Epochs Trained" },
  { value: "2", label: "Domains Covered" },
];

const PIPELINE = [
  ["📂", "Load Dataset", "3,000 Q&A pairs — Healthcare & Finance"],
  ["🧹", "Preprocess", "Text cleaning, 80/20 train/val split"],
  ["🔤", "Tokenize", "T5Tokenizer with max_length = 250"],
  ["🎯", "Fine-Tune", "T5-small · 10 epochs · beam search (n=5)"],
  ["💾", "Save & Deploy", "Flask REST API + React.js Frontend"],
];

export const SUGGESTIONS = {
  healthcare: [
    { icon: "💉", text: "What are the side effects of COVID-19 vaccine?" },
    { icon: "📅", text: "How can I schedule a doctor appointment?" },
    { icon: "💊", text: "What if I miss a dose of my medication?" },
    { icon: "🤒", text: "What are the symptoms of flu?" },
  ],
  finance: [
    { icon: "💳", text: "How can I check my account balance?" },
    { icon: "📈", text: "What is the interest rate for a personal loan?" },
    { icon: "🚨", text: "I lost my credit card, what should I do?" },
    { icon: "🎓", text: "How do I apply for a student loan?" },
  ],
};

// ─── SVG Logo ──────────────────────────────────────────────
export function HamLogo({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="9" fill="url(#hg)" />
      <circle cx="11" cy="13" r="2.5" fill="white" opacity="0.95" />
      <circle cx="21" cy="13" r="2.5" fill="white" opacity="0.95" />
      <path
        d="M10 20s2 2.5 6 2.5 6-2.5 6-2.5"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient id="hg" x1="0" y1="0" x2="32" y2="32">
          <stop offset="0%" stopColor="#4F46E5" />
          <stop offset="100%" stopColor="#06B6D4" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// ─── Home Component ────────────────────────────────────────
export default function Home({ onLaunch, onAsk }) {
  return (
    <div className="home">
      {/* Ambient orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      {/* ── Navbar ── */}
      <nav className="hnav">
        <div className="hnav-logo">
          <HamLogo size={28} />
          <span className="hnav-name">HamChat</span>
        </div>
        <div className="hnav-right">
          <span className="hnav-tag">Generative AI Project</span>
          <button className="btn-nav" onClick={onLaunch}>
            Try Now →
          </button>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="hero">
        <span className="hero-badge">🎓 Fine-tuned T5 Transformer</span>

        <h1 className="hero-h1">
          Domain-Specific
          <br />
          <span className="grad-text">AI Chatbot</span>
        </h1>

        <p className="hero-p">
          A T5-small model fine-tuned on a custom Healthcare &amp; Finance
          dataset. Trained on <strong>3,000 samples</strong> across{" "}
          <strong>10 intents</strong> for 10 epochs.
        </p>

        <div className="hero-btns">
          <button className="btn-launch" onClick={onLaunch}>
            <span>Launch HamChat</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
          <a
            className="btn-ghost"
            href="https://github.com/hamza0426"
            target="_blank"
            rel="noreferrer"
          >
            View on GitHub
          </a>
        </div>

        {/* Stats */}
        <div className="stats-row">
          {STATS.map((s, i) => (
            <div key={i} className="stat-card">
              <span className="stat-val">{s.value}</span>
              <span className="stat-lbl">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── About / Pipeline ── */}
      <section className="about-sec">
        <div className="about-grid">
          {/* Left: description */}
          <div className="about-left">
            <h2 className="sec-title">What is HamChat?</h2>
            <p className="sec-p">
              HamChat is a fine-tuned T5 (Text-to-Text Transfer Transformer)
              language model trained specifically on Healthcare and Finance
              domain questions. Unlike generic chatbots, it gives precise,
              domain-aware answers by learning patterns from a curated dataset.
            </p>
            <p className="sec-p">
              Built by <strong>Muhammad Hamza Owais</strong> using Hugging Face
              Transformers with a full custom training pipeline — data
              preprocessing, tokenization, fine-tuning, and evaluation.
            </p>
            <div className="tech-tags">
              {[
                "T5-Small",
                "HuggingFace",
                "PyTorch",
                "Flask",
                "React.js",
                "Fine-Tuning",
              ].map((t) => (
                <span key={t} className="tech-tag">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Right: pipeline card */}
          <div className="about-right">
            <div className="flow-card">
              <p className="flow-card-title">Model Pipeline</p>
              {PIPELINE.map(([icon, step, desc], i) => (
                <div key={i} className="flow-step">
                  <div className="flow-num">{i + 1}</div>
                  <div>
                    <div className="flow-step-title">
                      {icon} {step}
                    </div>
                    <div className="flow-step-desc">{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Try Questions ── */}
      <section className="try-sec">
        <h2 className="sec-title">Try Sample Questions</h2>
        <p className="sec-p">Click any question to instantly ask HamChat</p>

        <div className="try-grid">
          {["healthcare", "finance"].map((domain) => (
            <div key={domain} className="try-col">
              <div className="try-header">
                <span className="try-icon">
                  {domain === "healthcare" ? "💊" : "💳"}
                </span>
                <span>
                  {domain === "healthcare" ? "Healthcare" : "Finance"}
                </span>
              </div>
              {SUGGESTIONS[domain].map((s, i) => (
                <button
                  key={i}
                  className="try-btn"
                  onClick={() => onAsk(s.text)}
                >
                  <span>{s.icon}</span>
                  <span>{s.text}</span>
                  <svg
                    className="try-arrow"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="hfooter">
        <div className="hfooter-logo">
          <HamLogo size={22} />
          <span>HamChat</span>
        </div>

        <p className="hfooter-tagline">
          Built with <span>♥</span> by Muhammad Hamza Owais
        </p>

        <div className="connect-links">
          <a
            className="connect-link"
            href="https://linkedin.com/in/muhammad-hamza-owais"
            target="_blank"
            rel="noreferrer"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            LinkedIn
          </a>
          <a
            className="connect-link"
            href="https://github.com/hamza0426"
            target="_blank"
            rel="noreferrer"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </a>
          <a
            className="connect-link"
            href="mailto:muhammadhamzaowais5@gmail.com"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <polyline points="22,4 12,13 2,4" />
            </svg>
            Email
          </a>
          <a className="connect-link" href="tel:+923340246628">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.59 3.59 2 2 0 0 1 3.56 1.4h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l1.87-1.87a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            Contact
          </a>
        </div>

        <p className="hfooter-copy">
          HamChat · Fine-tuned T5 Transformer · Healthcare &amp; Finance Domain
        </p>
      </footer>
    </div>
  );
}
