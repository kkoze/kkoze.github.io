// ============================================================
//  transition.js — VHS Rewind transition
// ============================================================

(function () {
  // ── inject styles ──
  const style = document.createElement("style");
  style.textContent = `
    #pt {
      position: fixed;
      inset: 0;
      z-index: 50;
      pointer-events: none;
      display: none;
      overflow: hidden;
    }

    /* scanlines overlay — always visible on top */
    #pt::before {
      content: "";
      position: absolute;
      inset: 0;
      background: repeating-linear-gradient(
        0deg,
        transparent,
        transparent 3px,
        rgba(0, 0, 0, 0.35) 3px,
        rgba(0, 0, 0, 0.35) 4px
      );
      z-index: 4;
      pointer-events: none;
    }

    /* dark wipe panel */
    .pt-noise {
      position: absolute;
      left: 0;
      width: 100%;
      height: 105%;
      background: #1a0500;
      transform: translateY(105%);
      z-index: 1;
    }

    /* film grain on top of dark panel */
    .pt-noise::before {
      content: "";
      position: absolute;
      inset: 0;
      background: url("https://grainy-gradients.vercel.app/noise.svg");
      opacity: 0.18;
      mix-blend-mode: screen;
    }

    /* RGB glitch strip on top of dark panel */
    .pt-noise::after {
      content: "";
      position: absolute;
      inset: 0;
      background: repeating-linear-gradient(
        0deg,
        transparent,
        transparent 6px,
        rgba(255, 60, 0, 0.04) 6px,
        rgba(255, 60, 0, 0.04) 7px
      );
      z-index: 2;
    }

    /* glowing VHS tracking line */
    .pt-track {
      position: absolute;
      left: 0;
      width: 100%;
      height: 5px;
      background: linear-gradient(
        to right,
        transparent 0%,
        rgba(255, 80, 0, 0.6) 15%,
        rgba(255, 220, 120, 1) 40%,
        rgba(255, 255, 255, 0.95) 50%,
        rgba(255, 220, 120, 1) 60%,
        rgba(255, 80, 0, 0.6) 85%,
        transparent 100%
      );
      box-shadow:
        0 0 12px 4px rgba(255, 100, 0, 0.7),
        0 0 30px 8px rgba(255, 60, 0, 0.35);
      z-index: 3;
      top: 105%;
    }

    /* horizontal glitch tears */
    .pt-glitch {
      position: absolute;
      left: 0;
      width: 100%;
      height: 3px;
      background: rgba(255, 80, 0, 0.5);
      opacity: 0;
      z-index: 5;
    }

    /* ── ENTERING: wipe up covering page ── */
    #pt.entering .pt-noise {
      animation: vhsWipeIn 0.5s steps(55) forwards;
    }
    #pt.entering .pt-track {
      animation: vhsTrackIn 0.5s linear forwards;
    }
    #pt.entering .pt-glitch { animation: vhsGlitch 0.5s steps(1) forwards; }
    #pt.entering .pt-glitch:nth-child(3) { top: 25%; animation-delay: 80ms;  }
    #pt.entering .pt-glitch:nth-child(4) { top: 55%; animation-delay: 200ms; }
    #pt.entering .pt-glitch:nth-child(5) { top: 78%; animation-delay: 320ms; }

    /* ── LEAVING: wipe up off screen revealing page ── */
    #pt.leaving .pt-noise {
      transform: translateY(0%);
      animation: vhsWipeOut 0.55s steps(55) forwards;
    }
    #pt.leaving .pt-track {
      top: 0%;
      animation: vhsTrackOut 0.55s linear forwards;
    }
    #pt.leaving .pt-glitch { animation: vhsGlitch 0.55s steps(1) forwards; }
    #pt.leaving .pt-glitch:nth-child(3) { top: 70%; animation-delay: 60ms;  }
    #pt.leaving .pt-glitch:nth-child(4) { top: 40%; animation-delay: 180ms; }
    #pt.leaving .pt-glitch:nth-child(5) { top: 15%; animation-delay: 300ms; }

    @keyframes vhsWipeIn {
      0%   { transform: translateY(105%); }
      100% { transform: translateY(0%);   }
    }
    @keyframes vhsWipeOut {
      0%   { transform: translateY(0%);    }
      100% { transform: translateY(-105%); }
    }
    @keyframes vhsTrackIn {
      0%   { top: 105%; opacity: 1; }
      95%  { opacity: 1; }
      100% { top: -1%;  opacity: 0; }
    }
    @keyframes vhsTrackOut {
      0%   { top: 0%;  opacity: 1; }
      100% { top: -5%; opacity: 0.4; }
    }
    @keyframes vhsGlitch {
      0%   { opacity: 0; transform: translateX(0); }
      20%  { opacity: 1; transform: translateX(-8px); }
      40%  { opacity: 0; transform: translateX(5px);  }
      60%  { opacity: 1; transform: translateX(-3px); }
      80%  { opacity: 0; transform: translateX(0);    }
      100% { opacity: 0; }
    }
  `;
  document.head.appendChild(style);

  // ── build DOM ──
  const overlay = document.createElement("div");
  overlay.id = "pt";
  overlay.innerHTML = `
    <div class="pt-noise"></div>
    <div class="pt-track"></div>
    <div class="pt-glitch"></div>
    <div class="pt-glitch"></div>
    <div class="pt-glitch"></div>
  `;
  document.body.appendChild(overlay);

  // ── page enter: wipe off revealing new page ──
  window.addEventListener("DOMContentLoaded", () => {
    overlay.style.display = "block";
    overlay.classList.add("leaving");
    setTimeout(() => {
      overlay.classList.remove("leaving");
      overlay.style.display = "none";
      overlay.style.pointerEvents = "none";
    }, 700);
  });

  // ── intercept nav clicks ──
  document.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (!link) return;
    const href = link.getAttribute("href");
    if (
      !href ||
      href.startsWith("#") ||
      href.startsWith("http") ||
      href.startsWith("mailto") ||
      link.target === "_blank"
    )
      return;

    e.preventDefault();
    overlay.style.display = "block";
    overlay.style.pointerEvents = "all";
    overlay.classList.remove("leaving");
    void overlay.offsetWidth; // force reflow to restart animation
    overlay.classList.add("entering");

    setTimeout(() => {
      window.location.href = href;
    }, 530);
  });
})();
