let currentTrack = 0;

function getEmbedUrl(spotifyUrl) {
  return (
    spotifyUrl
      .replace("https://open.spotify.com/", "https://open.spotify.com/embed/")
      .split("?")[0] + "?utm_source=generator&theme=0"
  );
}

function loadTrack(index) {
  const iframe = document.getElementById("spotifyIframe");
  const label = document.getElementById("trackLabel");
  const title = document.getElementById("trackTitle");
  iframe.src = getEmbedUrl(tracks[index].url);
  label.textContent = index + 1 + " / " + tracks.length;
  title.textContent = tracks[index].title;
}

function togglePlayer() {
  const panel = document.getElementById("spotifyPanel");
  const btn = document.getElementById("musicBtn");
  panel.classList.toggle("open");
  btn.classList.toggle("active");
}

function prevTrack() {
  currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
  loadTrack(currentTrack);
}

function nextTrack() {
  currentTrack = (currentTrack + 1) % tracks.length;
  loadTrack(currentTrack);
}

// inject component directly — no fetch needed
document.getElementById("spotifyMount").innerHTML = `
  <div class="spotify-panel" id="spotifyPanel">
    <div class="spotify-header">
      <span class="spotify-logo">&#9679; spotify</span>
      <span class="track-title" id="trackTitle"></span>
    </div>
    <iframe
      id="spotifyIframe"
      src=""
      width="100%"
      height="152"
      frameborder="0"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
    ></iframe>
    <div class="spotify-controls">
      <button class="sp-btn" onclick="prevTrack()">&#9664;</button>
      <span class="track-label" id="trackLabel">1 / 1</span>
      <button class="sp-btn" onclick="nextTrack()">&#9654;</button>
    </div>
  </div>
`;

// init first track after DOM is injected
loadTrack(0);
