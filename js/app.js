// ==============================
//  EDITABLE CONTENT — edit here
// ==============================
const profile = {
  name: "Ed Cezar D. Lampitoc",
  position: "System Analyst / Programmer",
  description:
    "Designing systems, building web applications, and translating real-world processes into scalable digital solutions.",

  highlights: [
    { label: "Experience", value: "1+ Years" },
    { label: "Projects", value: "2" },
    { label: "Status", value: "Working at UPHDMC" },
  ],

  skills: [
    "JavaScript",
    "PHP 3.2+",
    "Python",
    "Laravel 11+",
    "MySQL",
    "MSSQL",
    "RDL SSRS",
    "System Analysis",
    "Database Design",
    "UI/UX",
    "Git",
  ],
};
// ==============================

// inject name, position, description
document.getElementById("name").textContent = profile.name;
document.getElementById("position").textContent = profile.position;
document.getElementById("tagline").textContent = profile.description;

// inject highlights
const highlightsEl = document.getElementById("highlights");
profile.highlights.forEach((h) => {
  highlightsEl.innerHTML += `
    <div class="highlight-item">
      <span class="highlight-value">${h.value}</span>
      <span class="highlight-label">${h.label}</span>
    </div>`;
});

// inject skills
const skillsEl = document.getElementById("skills");
profile.skills.forEach((skill) => {
  skillsEl.innerHTML += `<span class="skill-tag">${skill}</span>`;
});

// live clock
function updateClock() {
  const now = new Date();
  const h = now.getHours();
  const m = String(now.getMinutes()).padStart(2, "0");
  const ampm = h >= 12 ? "PM" : "AM";
  document.getElementById("clock").textContent =
    (h % 12 || 12) + ":" + m + " " + ampm;
}
updateClock();
setInterval(updateClock, 1000);

// dropdown
function toggleDropdown() {
  const dropdown = document.getElementById("dropdown");
  const btn = document.getElementById("dropdownBtn");
  dropdown.classList.toggle("open");
  btn.classList.toggle("active");
}

// close dropdown when clicking outside
document.addEventListener("click", (e) => {
  const wrap = document.querySelector(".dropdown-wrap");
  if (wrap && !wrap.contains(e.target)) {
    document.getElementById("dropdown").classList.remove("open");
    document.getElementById("dropdownBtn").classList.remove("active");
  }
});

// mood switcher
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

let currentTheme = 0;

function applyTheme(theme) {
  document.body.style.background = theme.bg;
  document.querySelector(".glass-overlay").style.background = theme.glass;
  document.querySelectorAll(".bubble").forEach((b, i) => {
    b.style.background = theme.colors[i % theme.colors.length];
  });
  document.getElementById("moodLabel").textContent = theme.name;
}

applyTheme(themes[currentTheme]);

document.getElementById("moodBtn").addEventListener("click", () => {
  currentTheme = (currentTheme + 1) % themes.length;
  applyTheme(themes[currentTheme]);
});
