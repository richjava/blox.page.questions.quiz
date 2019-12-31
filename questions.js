let responseBtns = $(".response-btn");
let finishBtn = $("#finish-btn");

//getting some logic values from data attached to DOM
let currentPage = $("#current-page").data("current-page");
let noOfQuestions = $("#questions-amt").data("questions-amt");

let prefix = "quizQuestion";

init();

function init() {
  setActiveBtn(localStorage.getItem(`${prefix}${currentPage}`));
  responseBtns.click("click", function() {
    let value = $(this).data("value");
    localStorage.setItem(`${prefix}${currentPage}`, value);
    responseBtns.removeClass("active");
    setActiveBtn(value);
  });

  finishBtn.click("click", function() {
    calculateScore();
  });
}

function setActiveBtn(value) {
  if (value) {
    $(`*[data-value="${value}"]`).addClass("active");
    $('.response-btn-next').removeClass('response-btn-next');
  }
}

function calculateScore() {
  let totalScore = 0;
  for (let i = 0; i < noOfQuestions; i++) {
    let value = parseInt(localStorage.getItem(`${prefix}${i + 1}`));
    if (!value) {
      alert("Please complete all responses");
      return;
    }
    totalScore += value;
  }
  localStorage.setItem("totalScore", totalScore);
  let hasConfirmed = localStorage.getItem("hasConfirmed");
  window.location.href = hasConfirmed ? "/results" : "/confirm";
}
