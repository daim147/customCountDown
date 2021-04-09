const inputContainer = document.getElementById("input-container");
// const title = document.getElementById("title");
const form = document.getElementById("form");
const datePicker = document.getElementById("date-picker");
const countDown = document.getElementById("countdown");
const countdownTitle = document.getElementById("countdown-title");
const countdownBtn = document.getElementById("countdown-button");
const timeElement = countDown.querySelectorAll("span");
const complete = document.getElementById("complete");
const completeTitle = document.getElementById("complete-title");
const completeBtn = document.getElementById("complete-btn");

let usertTitle = "";
let userDate = "";
let userValue = "";
let countdownActive;
let saved = {};

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// Date Input Minimum with current
const todayDate = new Date().toISOString().split("T")[0];
datePicker.setAttribute("min", todayDate);
console.log(todayDate)

// Populate Countdown
function updateDom() {
  countdownActive = setInterval(() => {
    const now = new Date().getTime();
    const standardTime = userValue - now;
    const distance = standardTime -  18000000 // According to Pakistan 
    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);

    //   Hide Input
    inputContainer.hidden = true;

    // if countdown ended
    if (distance < 0) {
      countDown.hidden = true;
      clearInterval(countdownActive);
      completeTitle.textContent = `${usertTitle} finished on ${userdate}`;
      complete.hidden = false;
    } else {
      //   Populating Count
      countdownTitle.textContent = `${usertTitle}`;
      timeElement[0].textContent = `${days}`;
      timeElement[1].textContent = `${hours}`;
      timeElement[2].textContent = `${minutes}`;
      timeElement[3].textContent = `${seconds}`;
      countDown.hidden = false;
      complete.hidden = true;
    }
  }, 1000);
}

// Take Value From input
function updateCountdown(e) {
  e.preventDefault();
  usertTitle = e.srcElement[0].value;
  userdate = e.srcElement[1].value;
  saved = {
    title: usertTitle,
    date: userdate,
  };
  localStorage.setItem("countdown", JSON.stringify(saved));

  if (userdate === "") {
    alert("Please select a date for countdown");
  } else {
    //   Get number version of Date
    userValue = new Date(userdate).getTime();
    updateDom();
  }
}

// Reset All
function reset() {
  //   Hide Input
  inputContainer.hidden = false;
  complete.hidden = true;
  //  Countdown show
  countDown.hidden = true;
  // Stop Countdown
  clearInterval(countdownActive);
  // Reset value
  usertTitle = "";
  userdate = "";
  localStorage.removeItem("countdown");
}

// LocalStorage
function local() {
  if (localStorage.getItem("countdown")) {
    inputContainer.hidden = true;
    savedCountDown = JSON.parse(localStorage.getItem("countdown"));
    usertTitle = savedCountDown.title;
    userdate = savedCountDown.date;
    userValue = new Date(userdate).getTime();
    updateDom();
  }
}

// Event Listener
form.addEventListener("submit", updateCountdown);
countdownBtn.addEventListener("click", reset);
completeBtn.addEventListener("click", reset);

local();
