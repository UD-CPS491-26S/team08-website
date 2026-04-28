document.addEventListener("DOMContentLoaded", () => {
  fetch("assets/sprints.json")
    .then((response) => {
      if (!response.ok) throw new Error("Failed to load JSON");
      return response.json();
    })
    .then((sprints) => {
      const container = document.getElementById("card-container");

      sprints.forEach((sprint, index) => {
        container.appendChild(createCard(sprint, index));
      });

      document.getElementById("sprint-details").style.display = "none";
    })
    .catch((error) => console.error("Error loading sprints:", error));
});

function createCard(sprint) {
  const card = document.createElement("div");
  card.className = "card";

  const button = document.createElement("button");
  button.className = "card-button";

  button.innerHTML = `
    <h2>${sprint.Title}</h2>
    <p>${sprint.Subtitle}</p>
  `;

  button.addEventListener("click", () => {
    // remove active from all buttons
    document.querySelectorAll(".card-button").forEach(btn => {
      btn.classList.remove("active");
    });

    // add active to clicked button
    button.classList.add("active");

    displaySprint(sprint);
  });

  card.appendChild(button);
  return card;
}

function displaySprint(sprint) {
  const container = document.getElementById("sprint-details");
  container.style.display = "block";
  
  let html = `<h2>${sprint.Title}</h2>`;

  if (sprint.mediaTitle) {
    html += `<h3>${sprint.mediaTitle}</h3>`;
  }

  if (sprint.mediaType === "image") {
    html += `<img src="${sprint.mediaUrl}" style="max-width:100%; border-radius:8px; margin:10px 0;" />`;
  }

  if (sprint.mediaType === "video") {
    html += `
      <div style="margin:10px 0;">
        <iframe width="100%" height="400"
          src="${sprint.mediaUrl}"
          frameborder="0"
          allowfullscreen>
        </iframe>
      </div>
    `;
  }

  sprint.Sections.forEach((section, index) => {
    if (index !== 0) {
      html += `<hr class="section-divider">`;
    }

    html += `
      <br>
      <h3>${section.title}</h3>
      <p>${
        section.content
          .replace(/\n>>/g, "<br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;")
          .replace(/>>/g, "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;")
      }</p>
    `;
  });

  container.innerHTML = html;
}