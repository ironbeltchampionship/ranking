// const csvUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSpFUdHS6lVlRnAj72nMQSpb87fFhmrbVvKjG2QuGhHzJQ6IM-P5BjN6aYllHI54uYoBCK1EulaQHSU/pub?gid=1005915904&single=true&output=csv";
// const infoUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSpFUdHS6lVlRnAj72nMQSpb87fFhmrbVvKjG2QuGhHzJQ6IM-P5BjN6aYllHI54uYoBCK1EulaQHSU/pub?gid=1753319475&single=true&output=csv";
const csvUrl = "ranking-test.csv";
const infoUrl = "info.csv";

fetch(infoUrl)
  .then(response => response.text())
  .then(csv => {
    const rows = csv.trim().split("\n").map(row => row.trim()).map(row => row.split(",").map(cell => cell.trim()));
    const headers = rows[0];
    const data = rows[1];

    const info = {};
    headers.forEach((header, index) => {
      info[header.toLowerCase().replace(' ', '')] = data[index];
    });

    const title = document.querySelector(".title");
    
    // Update subtitle with ladder
    const subtitle = document.querySelector(".subtitle");
    subtitle.textContent = info.ladder;

    // Add last updated
    const lastUpdated = document.createElement("div");
    lastUpdated.className = "last-updated";
    lastUpdated.textContent = `Ultimo aggiornamento: ${info.lastupdated}`;
    title.insertAdjacentElement("afterend", lastUpdated);

    // Add event link if upcoming is not empty
    if (info.upcoming && info.upcoming.trim() !== "") {
      const eventLink = document.createElement("div");
      eventLink.className = "event-link";
      eventLink.innerHTML = `UNISCITI AL PROSSIMO EVENTO! <a href="${info.upcoming}" target="_blank">LINK</a>`;
      lastUpdated.insertAdjacentElement("afterend", eventLink);
    }
  })
  .catch(error => console.error("Errore nel caricamento di info.csv:", error));

fetch(csvUrl)
  .then(response => response.text())
  .then(csv => {
    const rows = csv.trim().split("\n").map(row => row.split(","));

    const thead = document.querySelector("#ranking-table thead");
    const tbody = document.querySelector("#ranking-table tbody");

    rows.forEach((row, index) => {
      const tr = document.createElement("tr");

      row.forEach(cell => {
        const element = document.createElement(index === 0 ? "th" : "td");

        element.textContent = cell;

        tr.appendChild(element);
      });

      if (index === 0) {
        thead.appendChild(tr);
      } else {
        tbody.appendChild(tr);
      }
    });
  })
  .catch(error => console.error("Errore nel caricamento del ranking CSV:", error));

