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

  // Load saved theme
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.documentElement.classList.add("dark-mode");
    toggleBtn.textContent = "☀️";
  } else {
    toggleBtn.textContent = "🌙";
  }

  // Click listener
  toggleBtn.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark-mode");

    const isDark = document.documentElement.classList.contains("dark-mode");

    localStorage.setItem("theme", isDark ? "dark" : "light");
    toggleBtn.textContent = isDark ? "☀️" : "🌙";
  });
}
