/* ═══════════════════════════════════════════════════════════
   Know Your Hydration — AI Chat Widget
   Powered by Cloudflare Worker → Claude (Anthropic)
   Worker: https://hydration-chat.osmo-1a2.workers.dev
═══════════════════════════════════════════════════════════ */

const WORKER_URL = 'https://hydration-chat.osmo-1a2.workers.dev';

const SUGGESTIONS = [
  'Why do I cramp during runs?',
  'How much sodium for a 90-min session?',
  'Is coconut water enough in Indian heat?',
  'What does Mg actually do for recovery?',
  'Best electrolyte for keto?',
];

// Conversation history kept in memory for multi-turn chat
let chatHistory = [];

function initChat() {
  const widget = document.createElement('div');
  widget.className = 'chat-widget';
  widget.innerHTML = `
    <div class="chat-panel" id="chatPanel">
      <div class="chat-panel-head">
        <div class="chat-panel-avatar">💧</div>
        <div>
          <div class="chat-panel-title">Ask the Database</div>
          <div class="chat-panel-sub">Powered by peer-reviewed science · AI answers</div>
        </div>
        <button class="chat-panel-close" onclick="closeChat()" aria-label="Close">✕</button>
      </div>

      <div class="chat-messages" id="chatMessages">
        <div class="chat-msg chat-msg-bot">
          Hi! I'm your hydration expert. Ask me anything about electrolytes, athlete performance, or what your body actually needs — I'll give you a science-backed answer. 👇
        </div>
      </div>

      <div class="chat-suggestions" id="chatSuggestions">
        ${SUGGESTIONS.slice(0, 3).map(s =>
          `<button class="chat-suggestion" onclick="sendSuggestion(this)">${s}</button>`
        ).join('')}
      </div>

      <div class="chat-input-row">
        <input class="chat-panel-input" type="text" id="chatPanelInput"
          placeholder="Ask about sodium, cramps, recovery, heat..."
          onkeypress="if(event.key==='Enter')sendChatMsg()"/>
        <button class="chat-panel-send" onclick="sendChatMsg()" aria-label="Send">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
        </button>
      </div>
      <div class="chat-panel-footer">Powered by 60+ peer-reviewed sources · Claude AI</div>
    </div>

    <button class="chat-trigger" id="chatTrigger" onclick="toggleChat()" aria-label="Open chat">
      <div class="chat-badge" id="chatBadge">1</div>
      <svg class="icon-open" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
      <svg class="icon-close" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
    </button>
  `;
  document.body.appendChild(widget);
}

let chatOpen = false;

function toggleChat() { chatOpen ? closeChat() : openChat(); }

function openChat() {
  chatOpen = true;
  document.getElementById('chatPanel').classList.add('open');
  document.getElementById('chatTrigger').classList.add('open');
  document.getElementById('chatBadge').classList.add('hidden');
  setTimeout(() => document.getElementById('chatPanelInput').focus(), 250);
}

function closeChat() {
  chatOpen = false;
  document.getElementById('chatPanel').classList.remove('open');
  document.getElementById('chatTrigger').classList.remove('open');
}

function sendSuggestion(btn) {
  document.getElementById('chatPanelInput').value = btn.textContent;
  document.getElementById('chatSuggestions').style.display = 'none';
  sendChatMsg();
}

function appendMsg(role, html) {
  const messages = document.getElementById('chatMessages');
  const div = document.createElement('div');
  div.className = `chat-msg chat-msg-${role === 'user' ? 'user' : 'bot'}`;
  div.innerHTML = html;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
  return div;
}

function showTyping() {
  const messages = document.getElementById('chatMessages');
  const typing = document.createElement('div');
  typing.className = 'chat-msg-typing';
  typing.id = 'chatTyping';
  typing.innerHTML = '<span></span><span></span><span></span>';
  messages.appendChild(typing);
  messages.scrollTop = messages.scrollHeight;
}

function hideTyping() {
  const el = document.getElementById('chatTyping');
  if (el) el.remove();
}

// Format markdown-lite: bold, bullet lists, line breaks
function formatReply(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, m => `<ul style="margin:6px 0 6px 18px">${m}</ul>`)
    .replace(/\n{2,}/g, '<br/><br/>')
    .replace(/\n/g, '<br/>');
}

const DISCLAIMER = `
  <div style="margin-top:12px;padding:10px 12px;background:#FFF7ED;border:1px solid #FED7AA;border-left:3px solid #EA580C;border-radius:8px;font-size:11px;color:#7C3400;line-height:1.55;">
    ⚕️ <strong>Clinical note:</strong> This answer is based on peer-reviewed research.
    Individual needs vary. Always consult a registered dietitian or sports medicine professional for personalised guidance.
  </div>`;

async function sendChatMsg() {
  const input = document.getElementById('chatPanelInput');
  const q = (input.value || '').trim();
  if (!q) return;
  input.value = '';
  input.disabled = true;

  // Hide suggestions after first message
  document.getElementById('chatSuggestions').style.display = 'none';

  // Add user message to UI and history
  appendMsg('user', q);
  chatHistory.push({ role: 'user', content: q });

  // Show typing indicator
  showTyping();

  try {
    const res = await fetch(WORKER_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ history: chatHistory })
    });

    hideTyping();

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      appendMsg('bot', `Sorry, something went wrong: ${err.error || res.status}. Please try again.`);
      chatHistory.pop(); // remove failed user message
      return;
    }

    const data = await res.json();
    const reply = data.reply || 'No response received.';

    // Add to history
    chatHistory.push({ role: 'assistant', content: reply });

    // Keep history from growing too large
    if (chatHistory.length > 20) chatHistory = chatHistory.slice(-20);

    // Render formatted reply + disclaimer
    appendMsg('bot', formatReply(reply) + DISCLAIMER);

  } catch (err) {
    hideTyping();
    appendMsg('bot', `Connection error — please check your internet and try again.`);
    chatHistory.pop();
  } finally {
    input.disabled = false;
    input.focus();
  }
}
