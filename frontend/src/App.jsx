// ═══════════════════════════════════════════════════════════
//  App.jsx  —  Root Router
//  Switches between Home (landing) and Chat pages
//  HamChat · Muhammad Hamza Owais
// ═══════════════════════════════════════════════════════════

import { useState, useRef } from "react";
import Home from "./Home";
import Chat from "./Chat";

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

export default function App() {
  // 'home' | 'chat'
  const [page, setPage] = useState("home");
  const [messages, setMessages] = useState([WELCOME_MSG]);

  // Store a pending question when user clicks a sample on Home
  const pendingQuestion = useRef(null);

  function goToChat() {
    pendingQuestion.current = null;
    setPage("chat");
  }

  function goHome() {
    setPage("home");
  }

  // When a sample question is clicked on Home, go to Chat and ask it
  function askFromHome(question) {
    pendingQuestion.current = question;
    setPage("chat");
  }

  if (page === "home") {
    return <Home onLaunch={goToChat} onAsk={askFromHome} />;
  }

  return (
    <Chat
      onBack={goHome}
      initialQuestion={pendingQuestion.current}
      messages={messages}
      setMessages={setMessages}
    />
  );
}
