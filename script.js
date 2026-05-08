const csvUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSpFUdHS6lVlRnAj72nMQSpb87fFhmrbVvKjG2QuGhHzJQ6IM-P5BjN6aYllHI54uYoBCK1EulaQHSU/pub?gid=1005915904&single=true&output=csv";

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
  });