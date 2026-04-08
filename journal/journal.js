document.addEventListener("DOMContentLoaded", function () {
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

  const trades = JSON.parse(localStorage.getItem("tradesArray")) || [];
  // console.log(trades);

  submitButton.addEventListener("click", function () {
    let trade = {
      date: dateInput.value,
      instrument: instrumentInput.value,
      direction: directionSelect.value,
      outcome: outcomeSelect.value,
      entry: entryInput.value,
      sl: slInput.value,
      tp: tpInput.value,
      rr: rrInput.value,
      pandl: pandlInput.value,
      goodOrBad: goodOrBadSelect.value,
      comment: commentTextarea.value,
    };

    trades.push(trade);

    localStorage.setItem("tradesArray", JSON.stringify(trades));
  });
});
