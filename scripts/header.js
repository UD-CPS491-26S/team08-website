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
      } else {
        link.classList.remove("active");
      }
    });
  })
  .catch((err) => console.error("Error loading navbar:", err));
