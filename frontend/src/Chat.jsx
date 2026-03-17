// ═══════════════════════════════════════════════════════════
//  Chat.jsx  —  Chat Interface Page
//  HamChat · Muhammad Hamza Owais
// ═══════════════════════════════════════════════════════════

import { useState, useRef, useEffect } from "react";
import "./Chat.css";
import { HamLogo, SUGGESTIONS } from "./Home";

// ─── Helpers ──────────────────────────────────────────────
function getTime() {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

const WELCOME_MSG = {
  role: "bot",
  content:
    "Welcome to HamChat! 👋 I'm a fine-tuned T5 AI assistant specialized in Healthcare and Finance. Ask me a question or pick one below!",
  time: getTime(),
  source: "custom",
};

// ─── Source Badge ──────────────────────────────────────────
function SourceBadge({ source }) {
  const MAP = {
    custom: { label: "Custom Rule", color: "#3ECFCF" },
    fallback: { label: "Out of Scope", color: "#F59E0B" },
  };
  const s = MAP[source];
  if (!s) return null;
  return (
    <span
      className="src-badge"
      style={{ color: s.color, borderColor: s.color }}
    >
      {s.label}
    </span>
  );
}

// ─── Typing Indicator ─────────────────────────────────────
function TypingDots() {
  return (
    <div className="typing-dots">
      <span />
      <span />
      <span />
    </div>
  );
}

// ─── Single Message ────────────────────────────────────────
function Message({ msg }) {
  const isUser = msg.role === "user";

  return (
    <div className={`msg-row ${isUser ? "msg-row-user" : "msg-row-bot"}`}>
      {/* Bot avatar (left side) */}
      {!isUser && (
        <div className="avatar avatar-bot">
          <HamLogo size={16} />
        </div>
      )}

      {/* Bubble */}
      <div className={`bubble ${isUser ? "bubble-user" : "bubble-bot"}`}>
        {msg.typing ? (
          <TypingDots />
        ) : (
          <>
            <span className="bubble-text">{msg.content}</span>
            <div className="bubble-meta">
              <span className="bubble-time">{msg.time}</span>
              {msg.source && <SourceBadge source={msg.source} />}
            </div>
          </>
        )}
      </div>

      {/* User avatar (right side) */}
      {isUser && (
        <div className="avatar avatar-user">
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
          </svg>
        </div>
      )}
    </div>
  );
}

// ─── Chat Page ─────────────────────────────────────────────
export default function Chat({
  onBack,
  initialQuestion,
  messages,
  setMessages,
}) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeDomain, setDomain] = useState("healthcare");

  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const didInit = useRef(false);

  // Auto-scroll on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input on mount + handle initial question from Home page
  useEffect(() => {
    inputRef.current?.focus();
    if (initialQuestion && !didInit.current) {
      didInit.current = true;
      // Small delay so the welcome message renders first
      setTimeout(() => sendMessage(initialQuestion), 350);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Reset chat ──────────────────────────────────────────
  function resetChat() {
    setMessages([
      {
        ...WELCOME_MSG,
        content:
          "Chat cleared! 🔄 Ask me anything about Healthcare or Finance.",
        time: getTime(),
      },
    ]);
    setInput("");
    inputRef.current?.focus();
  }

  // ── Send message ────────────────────────────────────────
  async function sendMessage(text) {
    const query = (text || input).trim();
    if (!query || loading) return;

    setInput("");

    // Append user msg + typing indicator
    setMessages((prev) => [
      ...prev,
      { role: "user", content: query, time: getTime() },
      { role: "bot", typing: true, content: "", time: "" },
    ]);
    setLoading(true);

    try {
      const res = await fetch(
        "https://hamza0426-chatbot-backend.hf.space/chat",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query }),
        },
      );
      const data = await res.json();

      setMessages((prev) => [
        ...prev.slice(0, -1),
        {
          role: "bot",
          content: data.response,
          time: getTime(),
          source: data.source,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev.slice(0, -1),
        {
          role: "bot",
          content:
            "⚠️ Backend not reachable. Please run: python app.py in your backend folder.",
          time: getTime(),
          source: "error",
        },
      ]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }

  // ── Enter key to send ───────────────────────────────────
  function handleKey(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  // ───────────────────────────────────────────────────────
  return (
    <div className="chat-page">
      {/* Ambient orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />

      <div className="chat-shell">
        {/* ── Header ── */}
        <header className="chat-hdr">
          {/* Left: Back button */}
          <div className="chat-hdr-left">
            <button className="btn-back" onClick={onBack} title="Back to Home">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            {/* </div> */}

            {/* Center: Logo + title */}
            {/* <div className="chat-hdr-center"> */}
            <HamLogo size={30} />
            <div>
              <span className="hdr-title">HamChat</span>
              <span className="hdr-sub">
                Fine-tuned T5 · Healthcare &amp; Finance
              </span>
            </div>
          </div>

          {/* Right: Reset + Online dot */}
          <div className="chat-hdr-right">
            <button
              className="btn-reset"
              onClick={resetChat}
              title="Clear chat"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6l-1 14H6L5 6" />
                <path d="M10 11v6M14 11v6" />
              </svg>
            </button>
            <div className="online-dot" title="Model Active" />
          </div>
        </header>

        {/* ── Messages ── */}
        <div className="msgs-area">
          {messages.map((msg, i) => (
            <Message key={i} msg={msg} />
          ))}
          <div ref={bottomRef} />
        </div>

        {/* ── Chip / Suggestion Bar ── */}
        <div className="chip-bar">
          <div className="domain-tabs">
            {["healthcare", "finance"].map((d) => (
              <button
                key={d}
                className={`domain-tab ${activeDomain === d ? "active" : ""}`}
                onClick={() => setDomain(d)}
              >
                {d === "healthcare" ? "💊 Healthcare" : "💳 Finance"}
              </button>
            ))}
          </div>
          <div className="chips-list">
            {SUGGESTIONS[activeDomain].map((s, i) => (
              <button
                key={i}
                className="chip-btn"
                onClick={() => sendMessage(s.text)}
                disabled={loading}
              >
                {s.icon} {s.text}
              </button>
            ))}
          </div>
        </div>

        {/* ── Input Bar ── */}
        <div className="inp-bar">
          <textarea
            ref={inputRef}
            className="chat-inp"
            rows={1}
            placeholder="Ask about healthcare or finance..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            disabled={loading}
          />
          <button
            className="btn-send"
            onClick={() => sendMessage()}
            disabled={loading || !input.trim()}
          >
            {loading ? (
              <span className="spinner" />
            ) : (
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            )}
          </button>
        </div>

        {/* ── Footer ── */}
        <p className="chat-foot">
          HamChat · Built with ♥ by Muhammad Hamza Owais
        </p>
      </div>
    </div>
  );
}
