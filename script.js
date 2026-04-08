// Wait for DOM to load
document.addEventListener("DOMContentLoaded", function () {
  const closeMenuBtn = document.querySelector(".close");
  const openMenuBtn = document.querySelector(".menu");
  const menu = document.querySelector(".menu-sidebar");
  const menuDashboard = document.getElementById("menu-dashboard");
  const menuJournal = document.getElementById("menu-journal");
  const menuSync = document.getElementById("menu-sync");
  const menuMore = document.getElementById("menu-more");
  const dateInput = document.getElementById("date");
  const instrumentInput = document.getElementById("instrument");
  const directionSelect = document.getElementById("direction");
  const outcomeSelect = document.getElementById("outcome");
  const entryInput = document.getElementById("entry");
  const slInput = document.getElementById("sl");
  const tpInput = document.getElementById("tp");
  const rrInput = document.getElementById("rr");
  const pandlInput = document.getElementById("pandl");
  const goodOrBadSelect = document.getElementById("good-or-bad");
  const commentTextarea = document.getElementById("comment");
  const submitButton = document.querySelector(".submit");
  const winRateDisplay = document.getElementById("winRate");
  const pAndLDisplay = document.getElementById("pAndL");
  const strikeRateDisplay = document.getElementById("strikeRate");
  const totalTradesDisplay = document.getElementById("totalTrades");
  const recentTradesDisplay = document.getElementById("recentTrades");
  const ctx = document.getElementById("myChart");

  closeMenuBtn.addEventListener("click", function () {
    hideMenuBar();
    closeMenuBtn.style.display = "none";
    openMenuBtn.style.display = "block";
    menuDashboard.classList.remove("active");
    menuJournal.classList.remove("active");
    menuSync.classList.remove("active");
    menuMore.classList.remove("active");
  });

  openMenuBtn.addEventListener("click", function () {
    showMenuBar();
    openMenuBtn.style.display = "none";
    closeMenuBtn.style.display = "block";
  });

  menuDashboard.addEventListener("click", function () {
    menuDashboard.classList.add("active");
    menuJournal.classList.remove("active");
    menuSync.classList.remove("active");
    menuMore.classList.remove("active");
  });

  menuJournal.addEventListener("click", function () {
    menuDashboard.classList.remove("active");
    menuJournal.classList.add("active");
    menuSync.classList.remove("active");
    menuMore.classList.remove("active");
  });

  menuSync.addEventListener("click", function () {
    menuDashboard.classList.remove("active");
    menuJournal.classList.remove("active");
    menuSync.classList.add("active");
    menuMore.classList.remove("active");
  });

  menuMore.addEventListener("click", function () {
    menuDashboard.classList.remove("active");
    menuJournal.classList.remove("active");
    menuSync.classList.remove("active");
    menuMore.classList.add("active");
  });

  function showMenuBar() {
    menu.style.display = "block";
  }

  function hideMenuBar() {
    menu.style.display = "none";
  }

  // export const tradeData = {
  //   date: dateInput.value,
  //   instrument: instrumentInput.value,
  //   direction: directionSelect.value,
  //   outcome: outcomeSelect.value,
  //   entry: entryInput.value,
  //   sl: slInput.value,
  //   tp: tpInput.value,
  //   rr: rrInput.value,
  //   pandl: pandlInput.value,
  //   goodOrBad: goodOrBadSelect.value,
  //   comment: commentTextarea.value,
  // };

  // export default tradeData;

  const trades = JSON.parse(localStorage.getItem("tradesArray"));
  console.log(trades);

  // console.log(trades);

  // Let's get the Win Rate
  let winRate = 0;
  const totalTrades = trades.length;
  // console.log(totalTrades);

  const wonTrades = trades.filter((t) => t.outcome === "win").length;

  const breakEvenTrades = trades.filter((t) => t.outcome === "be").length;

  const lostTrade = trades.filter((t) => t.outcome === "loss").length;

  const pAndL = trades.map((amount) => amount.pandl);
  console.log(pAndL);

  const dates = trades.map((date) => date.date);
  console.log(dates);

  pAndL.forEach((value) => {
    if (value > 0 || value < 0) {
      winRate = ((wonTrades / totalTrades) * 100).toFixed(2);
    }
  });

  winRateDisplay.innerHTML = `<h3>${winRate}%</h3>`;

  // Let's get the Total P&L

  let sum = 0;
  pAndL.forEach((element) => {
    sum = Number(element) + sum;
    // pAndL.length++;
  });

  // console.log(sum);

  pAndLDisplay.innerHTML = `<h3>$${sum}</h3>`;

  // Let's Get The Risk to Reward/Strike Rate

  const riskToReward = trades.map((amount) => amount.rr);
  // console.log(riskToReward);
  let rrSum = 0;
  riskToReward.forEach((element) => {
    rrSum = Number(element) + rrSum;
  });
  // console.log(rrSum);

  strikeRateDisplay.innerHTML = `<h3>${rrSum} RR</h3>`;

  // Let's Get Total Trades

  totalTradesDisplay.innerHTML = `<h3>${totalTrades}</h3>`;

  // CHARTS SECTION

  // Two arrays for Chart.js or any charting library
  const labels = [];
  const data = [];

  // Function to group dates and sum PnL + format dates nicely
  function sumPnLByDate(dates, pAndL) {
    const map = new Map();

    // Step 1: Group and sum PnL for each date
    dates.forEach((date, index) => {
      if (!map.has(date)) {
        map.set(date, 0);
      }
      map.set(date, map.get(date) + Number(pAndL[index]));
    });

    // Clear previous data (good practice)
    labels.length = 0;
    data.length = 0;

    // Step 2: Push formatted date into labels and summed PnL into data
    map.forEach((totalPnL, date) => {
      // Format date nicely: "Jan 1, 2023"
      const formattedDate = formatDate(date);

      labels.push(formattedDate); // Push nice readable date
      data.push(totalPnL); // Push summed PnL
    });
  }

  // Helper function to format date from "2023-01-01" → "Jan 1, 2023"
  function formatDate(dateString) {
    const date = new Date(dateString);

    const options = {
      month: "short", // Jan, Feb, Mar...
      day: "numeric", // 1, 2, 3...
      year: "numeric", // 2023
    };

    return date.toLocaleDateString("en-US", options);
  }

  // ======================
  // Run the function
  // ======================
  sumPnLByDate(dates, pAndL);

  // Display results
  console.log("Labels (Formatted Dates):", labels);
  console.log("Data (Summed PnL):", data);

  // Side-by-side view
  console.log("\nFinal Labels vs Data:");
  labels.forEach((label, index) => {
    console.log(`Index ${index}: ${label} → ${data[index]}`);
  });

  const myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Total PnL",
          data: data,
          borderWidth: 1,
          tension: 0.4,
          // borderColor: "rgba(75, 192, 192, 1)",
        },
      ],
    },
    options: {
      responsive: true,
      // autoPadding: true,

      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Profit & Loss",
          },
        },
        x: {
          title: {
            display: true,
            text: "Date",
          },
        },
      },
    },
  });

  window.addEventListener("resize", () => {
    myChart.resize();
  });

  // RECENT TRADES

  let instrumentDisplay = "";

  trades.slice(0, 5).forEach((trade) => {
    console.log(trade.instrument);
    instrumentDisplay += `<h3>Pair: ${trade.instrument}</h3> - Result: ${trade.outcome}`;
  });

  recentTradesDisplay.innerHTML = instrumentDisplay;
});
