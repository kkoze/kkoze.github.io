// ============================================================
//  layout.js — Web Component + shared logic
//  Defines <app-layout> custom element.
//  Every page just needs: <app-layout active="home"></app-layout>
// ============================================================

// ── auto-load transition utility ──
(function () {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "css/transition.css";
  document.head.appendChild(link);

  const script = document.createElement("script");
  script.src = "js/transition.js";
  document.head.appendChild(script);
})();
class AppLayout extends HTMLElement {
  connectedCallback() {
    const active = this.getAttribute("active") || "";

    this.insertAdjacentHTML(
      "beforebegin",
      `
      <div class="bubbles">
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
        <div class="bubble"></div>
      </div>
      <div class="glass-overlay"></div>
      <div class="grain"></div>

      <nav class="menubar">
        <div class="menubar-left">
          <span class="menubar-logo">&#63743;</span>
          <span class="app-name">Ed Cezar</span>
          <div class="menu-items">
            <a href="index.html"    ${active === "home" ? 'class="active"' : ""}>Home</a>
            <a href="projects.html" ${active === "projects" ? 'class="active"' : ""}>Projects</a>
            <a href="career.html"   ${active === "career" ? 'class="active"' : ""}>Career</a>
            <a href="contact.html"  ${active === "contact" ? 'class="active"' : ""}>Contact</a>
          </div>
        </div>
        <div class="notch"></div>
        <div class="menubar-right">
          <span class="sys-icon" id="musicBtn" onclick="togglePlayer()">&#9835;</span>
          <span class="sys-icon">&#8857;</span>
          <div class="dropdown-wrap">
            <span class="sys-icon" id="dropdownBtn" onclick="toggleDropdown()">&#9776;</span>
            <div class="dropdown" id="dropdown">
              <a href="https://github.com/YOUR_USERNAME" target="_blank">
                <span class="dropdown-icon">&#128025;</span> Github
              </a>
              <a href="https://linkedin.com/in/YOUR_USERNAME" target="_blank">
                <span class="dropdown-icon">&#128101;</span> LinkedIn
              </a>
              <a href="mailto:YOUR_EMAIL@gmail.com">
                <span class="dropdown-icon">&#9993;</span> Gmail
              </a>
            </div>
          </div>
          <span class="clock" id="clock"></span>
        </div>
      </nav>
    `,
    );

    this.remove();
  }
}

customElements.define("app-layout", AppLayout);

// ── mood FAB injected at end of body ──
document.body.insertAdjacentHTML(
  "beforeend",
  `
  <div class="mood-fab" id="moodBtn">
    <span class="mood-icon">&#9680;</span>
    <span class="mood-label" id="moodLabel">lava</span>
  </div>
`,
);

// ── live clock ──
function updateClock() {
  const now = new Date();
  const h = now.getHours();
  const m = String(now.getMinutes()).padStart(2, "0");
  const ampm = h >= 12 ? "PM" : "AM";
  const el = document.getElementById("clock");
  if (el) el.textContent = (h % 12 || 12) + ":" + m + " " + ampm;
}
updateClock();
setInterval(updateClock, 1000);

// ── dropdown ──
function toggleDropdown() {
  const dropdown = document.getElementById("dropdown");
  const btn = document.getElementById("dropdownBtn");
  if (!dropdown || !btn) return;
  dropdown.classList.toggle("open");
  btn.classList.toggle("active");
}

document.addEventListener("click", (e) => {
  const wrap = document.querySelector(".dropdown-wrap");
  if (wrap && !wrap.contains(e.target)) {
    document.getElementById("dropdown")?.classList.remove("open");
    document.getElementById("dropdownBtn")?.classList.remove("active");
  }
});

// ── mood / theme switcher ──
const themes = [
  {
    name: "lava",
    bg: "#1a0500",
    glass: "rgba(20,4,0,0.5)",
    colors: [
      "#ff3c00",
      "#ff8c00",
      "#c2001a",
      "#ff5500",
      "#ff2200",
      "#ff6a00",
      "#de1a00",
    ],
  },
  {
    name: "ocean",
    bg: "#00101a",
    glass: "rgba(0,10,25,0.5)",
    colors: [
      "#0077ff",
      "#00c8ff",
      "#0033cc",
      "#00aaff",
      "#0055dd",
      "#00eeff",
      "#0044bb",
    ],
  },
  {
    name: "forest",
    bg: "#021a05",
    glass: "rgba(2,18,5,0.5)",
    colors: [
      "#00cc44",
      "#00ff88",
      "#007722",
      "#22dd66",
      "#00aa33",
      "#44ff99",
      "#009944",
    ],
  },
  {
    name: "galaxy",
    bg: "#07001a",
    glass: "rgba(8,0,22,0.5)",
    colors: [
      "#aa00ff",
      "#ff00cc",
      "#6600dd",
      "#dd00ff",
      "#8800cc",
      "#ff44ee",
      "#5500bb",
    ],
  },
  {
    name: "sunset",
    bg: "#1a0a00",
    glass: "rgba(20,8,0,0.5)",
    colors: [
      "#ff6600",
      "#ffcc00",
      "#ff3300",
      "#ffaa00",
      "#ff8800",
      "#ffdd00",
      "#ee4400",
    ],
  },
];

// ── restore saved theme index from localStorage (default 0 = lava) ──
let currentTheme = parseInt(localStorage.getItem("theme") || "0", 10);
if (currentTheme >= themes.length) currentTheme = 0;

function applyTheme(theme) {
  document.body.style.background = theme.bg;
  const overlay = document.querySelector(".glass-overlay");
  if (overlay) overlay.style.background = theme.glass;
  document.querySelectorAll(".bubble").forEach((b, i) => {
    b.style.background = theme.colors[i % theme.colors.length];
  });
  const label = document.getElementById("moodLabel");
  if (label) label.textContent = theme.name;
}

// apply immediately on every page load
applyTheme(themes[currentTheme]);

document.addEventListener("click", (e) => {
  if (e.target.closest("#moodBtn")) {
    currentTheme = (currentTheme + 1) % themes.length;
    applyTheme(themes[currentTheme]);
    // save to localStorage so it persists across pages
    localStorage.setItem("theme", currentTheme);
  }
});
