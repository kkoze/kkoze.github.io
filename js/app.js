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

// inject content
document.getElementById("name").textContent = profile.name;
document.getElementById("position").textContent = profile.position;
document.getElementById("tagline").textContent = profile.description;

const highlightsEl = document.getElementById("highlights");
profile.highlights.forEach((h) => {
  highlightsEl.innerHTML += `
    <div class="highlight-item">
      <span class="highlight-value">${h.value}</span>
      <span class="highlight-label">${h.label}</span>
    </div>`;
});

const skillsEl = document.getElementById("skills");
profile.skills.forEach((skill) => {
  skillsEl.innerHTML += `<span class="skill-tag">${skill}</span>`;
});

// ── staggered reveal animations ──
const img = document.querySelector(".profile-img");
const els = [
  document.getElementById("name"),
  document.getElementById("position"),
  document.getElementById("tagline"),
  document.getElementById("highlights"),
  document.getElementById("skills"),
];

// image slides in first
img.style.setProperty("--delay", "100ms");
img.classList.add("reveal-img");

// each text element staggers in after the image
els.forEach((el, i) => {
  if (!el) return;
  el.style.setProperty("--delay", `${200 + i * 80}ms`);
  el.classList.add("reveal");
});
