/* ================================================
   DST-CIMS BHU CHATBOT — script.js
   Save this file in: static/script.js
   ================================================ */

// ── CONFIG ─────────────────────────────────────
// FastAPI ka endpoint /chat hai (NOT /api/chat)
const API_URL = "/chat";

// ── STATE ──────────────────────────────────────
let chatOpen  = false;
let isWaiting = false;

// ── CHAT OPEN / CLOSE ──────────────────────────
function toggleChat() {
  chatOpen = !chatOpen;
  document.getElementById("chat-window").classList.toggle("open", chatOpen);

  if (chatOpen) {
    document.getElementById("unread-dot").style.display = "none";
    if (document.getElementById("messages").children.length === 0) {
      showWelcome();
    }
    setTimeout(() => document.getElementById("user-input").focus(), 200);
  }
}

// ── WELCOME MESSAGE ────────────────────────────
function showWelcome() {
  appendBot(
    `🙏 <strong>Namaste! Welcome to DST-CIMS, BHU.</strong><br><br>
    Main <strong>CIMS Sage</strong> hoon — aapka official AI assistant.<br><br>
    Main in topics pe help kar sakta hoon:<br>
    • M.Sc. Courses (Statistics &amp; Computing, CSA, Maths &amp; Computing)<br>
    • Admissions &amp; CUET-PG eligibility<br>
    • Fees, Faculty &amp; Research areas<br>
    • PhD programmes &amp; Scholarships<br><br>
    Aap kya jaanna chahte hain? 😊`
  );
}

// ── SEND MESSAGE ───────────────────────────────
async function sendMessage() {
  if (isWaiting) return;

  const input = document.getElementById("user-input");
  const msg   = input.value.trim();
  if (!msg) return;

  appendUser(escapeHTML(msg));
  input.value = "";
  input.style.height = "";

  const typingId = showTyping();
  isWaiting = true;
  document.getElementById("send-btn").disabled = true;

  try {
    const res = await fetch(API_URL, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ message: msg }),
    });

    if (!res.ok) throw new Error(`Server error: ${res.status}`);

    const data = await res.json();
    removeTyping(typingId);
    appendBot(formatReply(data.reply || "Sorry, koi response nahi mila. Dobara try karein."));

    if (!chatOpen) {
      document.getElementById("unread-dot").style.display = "block";
    }

  } catch (err) {
    removeTyping(typingId);
    console.error("Chat error:", err);
    appendBot("⚠️ Server se connection nahi ho raha. Terminal mein check karein ki <strong>uvicorn</strong> chal raha hai.");
  } finally {
    isWaiting = false;
    document.getElementById("send-btn").disabled = false;
    document.getElementById("user-input").focus();
  }
}

// ── QUICK REPLY BUTTONS ────────────────────────
function sendQuick(text) {
  document.getElementById("user-input").value = text;
  sendMessage();
}

// ── ENTER = SEND, SHIFT+ENTER = NEWLINE ────────
function handleKeyDown(e) {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
}

// ── TEXTAREA AUTO-RESIZE ───────────────────────
function autoResize(el) {
  el.style.height = "";
  el.style.height = Math.min(el.scrollHeight, 100) + "px";
}

// ── BOT MESSAGE ────────────────────────────────
function appendBot(html) {
  const msgs = document.getElementById("messages");
  const row  = document.createElement("div");
  row.className = "message bot";
  const av  = document.createElement("div");
  av.className  = "bot-avatar";
  av.textContent = "🎓";
  const bub = document.createElement("div");
  bub.className = "bubble";
  bub.innerHTML = html;
  row.appendChild(av);
  row.appendChild(bub);
  msgs.appendChild(row);
  msgs.scrollTop = msgs.scrollHeight;
}

// ── USER MESSAGE ───────────────────────────────
function appendUser(html) {
  const msgs = document.getElementById("messages");
  const row  = document.createElement("div");
  row.className = "message user";
  const bub = document.createElement("div");
  bub.className = "bubble";
  bub.innerHTML = html;
  row.appendChild(bub);
  msgs.appendChild(row);
  msgs.scrollTop = msgs.scrollHeight;
}

// ── TYPING DOTS ────────────────────────────────
function showTyping() {
  const msgs = document.getElementById("messages");
  const id   = "typ-" + Date.now();
  const row  = document.createElement("div");
  row.className = "message bot";
  row.id = id;
  const av  = document.createElement("div");
  av.className  = "bot-avatar";
  av.textContent = "🎓";
  const bub = document.createElement("div");
  bub.className = "bubble";
  bub.innerHTML = `<div class="typing-indicator"><span></span><span></span><span></span></div>`;
  row.appendChild(av);
  row.appendChild(bub);
  msgs.appendChild(row);
  msgs.scrollTop = msgs.scrollHeight;
  return id;
}

function removeTyping(id) {
  const el = document.getElementById(id);
  if (el) el.remove();
}

// ── XSS PROTECTION ────────────────────────────
function escapeHTML(str) {
  const d = document.createElement("div");
  d.appendChild(document.createTextNode(str));
  return d.innerHTML;
}

// ── FORMAT BOT REPLY ──────────────────────────
function formatReply(text) {
  return text
    .replace(/&/g,  "&amp;")
    .replace(/</g,  "&lt;")
    .replace(/>/g,  "&gt;")
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g,     "<em>$1</em>")
    .replace(/\n/g,            "<br>")
    .replace(/(https?:\/\/[^\s<]+)/g,
      '<a href="$1" target="_blank" style="color:#6B1A1A;text-decoration:underline;">$1</a>');
}