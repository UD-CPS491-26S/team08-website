document.addEventListener("DOMContentLoaded", () => {
  fetch("assets/projects.json")
    .then((response) => response.json())
    .then((projects) => {
      const container = document.getElementById("card-container");

      projects.forEach((project) => {
        const card = createCard(project);
        container.appendChild(card);
      });
    })
    .catch((error) => console.error("Error loading projects:", error));
});

function createCard(project) {
  const card = document.createElement("div");
  card.className = "card";

  const button = document.createElement("button");
  button.className = "card-button";
  button.innerHTML = `<h2>${project.Sprint}</h2>`;

  // 👇 Add click event
  button.addEventListener("click", () => {
    displaySprint(project);
  });

  card.appendChild(button);
  return card;
}

function displaySprint(project) {
  const container = document.getElementById("sprint-details");

  container.innerHTML = `
    <h2>${project.Sprint}</h2>

    <h3>${project.Reflection}</h3>
    ${project["Reflection-description"]}

    <h3>${project.Plan}</h3>
    ${project["Plan-description"]}
  `;
}
