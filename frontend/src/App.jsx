// ═══════════════════════════════════════════════════════════
//  App.jsx  —  Root Router
//  Switches between Home (landing) and Chat pages
//  HamChat · Muhammad Hamza Owais
// ═══════════════════════════════════════════════════════════

import { useState, useRef } from "react";
import Home from "./Home";
import Chat from "./Chat";

export default function App() {
  // 'home' | 'chat'
  const [page, setPage] = useState("home");

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

  return <Chat onBack={goHome} initialQuestion={pendingQuestion.current} />;
}
