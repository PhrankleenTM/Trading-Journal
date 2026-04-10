// TRADE HISTORY

const trades = JSON.parse(localStorage.getItem("tradesArray"));

tableRowsDisplay.innerHTML = "";

trades.forEach((trade) => {
  const row = document.createElement("tr");

  row.innerHTML = `
            <td>${new Date(trade.date).toLocaleDateString("en-US")}</td>
            <td>${trade.instrument}</td>
            <td style="color: ${trade.pandl >= 0 ? "green" : "red"}">
                ${Number(trade.pandl).toFixed(2)}
            </td>
            <td>${trade.direction}</td>
            <td>${trade.outcome}</td>
            <td>${trade.goodOrBad}</td>
        `;

  tableRowsDisplay.appendChild(row);
  console.log(tableRowsDisplay);
});
