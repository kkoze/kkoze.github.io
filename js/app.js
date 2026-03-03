const profileData = {
  name: "Ed Cezar Lampitoc",

  position: "System Analyst / Programmer",

  tagline:
    "Designing systems, building web applications, and translating real-world processes into scalable digital solutions.",
};

document.getElementById("name").textContent = profileData.name;
document.getElementById("position").textContent = profileData.position;
document.getElementById("tagline").textContent = profileData.tagline;

const toggle = document.getElementById("themeToggle");
toggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
});
