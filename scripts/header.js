// Load header
fetch("header.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("header").innerHTML = data;

    // Highlight active page
    const links = document.querySelectorAll("#navbar a");
    const current = window.location.pathname.split("/").pop();

    links.forEach((link) => {
      if (link.getAttribute("href") === current) {
        link.classList.add("active");
      }
    });
    initTheme();
  })
  .catch((err) => console.error("Error loading navbar:", err));

(function () {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.documentElement.classList.add("dark-mode");
  }
})();

function initTheme() {
  const toggleBtn = document.getElementById("theme-toggle");

  if (!toggleBtn) return;

  const savedTheme = localStorage.getItem("theme");
  const isDark = savedTheme === "dark";

  if (isDark) {
    document.documentElement.classList.add("dark-mode");
    toggleBtn.textContent = "☀️";
  } else {
    toggleBtn.textContent = "🌙";
  }

  // ✅ FIX: apply correct images on load
  updateThemeImages(isDark);

  toggleBtn.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark-mode");

    const isDarkNow = document.documentElement.classList.contains("dark-mode");

    localStorage.setItem("theme", isDarkNow ? "dark" : "light");
    toggleBtn.textContent = isDarkNow ? "☀️" : "🌙";

    updateThemeImages(isDarkNow);
  });
}

function updateThemeImages(isDark) {
  const images = document.querySelectorAll(".theme-diagram");

  images.forEach((img) => {
    const baseName = img.dataset.base; // e.g. Activity-T8
    img.src = `assets/diagrams/${baseName}-${isDark ? "Dark" : "Light"}.png`;
  });
}
