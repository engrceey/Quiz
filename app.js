const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");
const answersIndicatorContainer = document.querySelector(".answers-indicators");
const reaction = document.querySelector(".reaction");
const homeBox = document.querySelector(".home-box");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");

let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];
let correctAnswers = 0;
let attempt = 0;
let react = document.querySelector(".react");

function setAvailableQuestions() {
  const totalQuestion = quiz.length;
  for (let i = 0; i < totalQuestion; i++) {
    availableQuestions.push(quiz[i]);
  }
}

function getNewQuestion() {
  questionNumber.textContent =
    "Question " + (questionCounter + 1) + " of " + quiz.length;
  const questionIndex =
    availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
  currentQuestion = questionIndex;
  questionText.textContent = currentQuestion.q;
  const index1 = availableQuestions.indexOf(questionIndex);
  availableQuestions.splice(index1, 1);
  const optionLen = currentQuestion.options.length;

  for (let i = 0; i < optionLen; i++) {
    availableOptions.push(i);
  }

  optionContainer.textContent = "";
  let animationDelay = 0.15;
  for (let i = 0; i < optionLen; i++) {
    const optionIndex =
      availableOptions[Math.floor(Math.random() * availableOptions.length)];
    const index2 = availableOptions.indexOf(optionIndex);
    availableOptions.splice(index2, 1);

    const option = document.createElement("div");
    option.innerHTML = currentQuestion.options[optionIndex];
    option.id = optionIndex;
    option.style.animationDelay = animationDelay + "s";
    animationDelay = animationDelay + 0.15;
    option.className = "option";
    optionContainer.appendChild(option);
    option.setAttribute("onclick", "getResult(this)");
  }
  questionCounter++;
}

function getResult(element) {
  const id = parseInt(element.id);

  if (id === currentQuestion.answer) {
    react.classList.remove("hide");
    let good = positive[Math.floor(Math.random() * positive.length)];
    react.innerHTML = good;
    element.classList.add("correct");
    updateAnswerIndicator("correct");

    correctAnswers++;
  } else {
    react.classList.remove("hide");
    let bad = negative[Math.floor(Math.random() * negative.length)];
    react.innerHTML = bad;
    element.classList.add("wrong");
    updateAnswerIndicator("wrong");
  }
  attempt++;
  unclickableOptions();
}

function unclickableOptions() {
  const optionLen = optionContainer.children.length;
  for (let i = 0; i < optionLen; i++) {
    optionContainer.children[i].classList.add("alreadey-answered");
  }
}

function answersIndicator() {
  answersIndicatorContainer.innerHTML = "";
  const totalQuestion = quiz.length;
  for (let i = 0; i < totalQuestion; i++) {
    var indicator = document.createElement("div");

    answersIndicatorContainer.appendChild(indicator);
  }
}

function updateAnswerIndicator(markType) {
  answersIndicatorContainer.children[questionCounter - 1].classList.add(
    markType
  );
}

function next() {
  if (questionCounter === quiz.length) {
    quizOver();
  } else {
    react.classList.add("hide");
    getNewQuestion();
  }
}

function quizOver() {
  quizBox.classList.add("hide");

  resultBox.classList.remove("hide");
  quizResult();
}

function quizResult() {
  if (correctAnswers < quiz.length / 2 - 1) {
    reaction.innerHTML =
      "YOUR SCHOOL FEES NA WASTE!! &#128532;";
  } else if (correctAnswers <= quiz.length / 2) {
    reaction.innerHTML = "SO YOU NO FIT GET ABOVE HALF &#128530; ";
  } else if (correctAnswers == quiz.length) {
    reaction.innerHTML = "YOU TOO MUCH!! &#128170; ";
  }
  resultBox.querySelector(".total-question").innerHTML = quiz.length;
  resultBox.querySelector(".total-attempt").innerHTML = attempt;
  resultBox.querySelector(".total-correct").innerHTML = correctAnswers;
  resultBox.querySelector(".total-wrong").innerHTML = attempt - correctAnswers;
  const percent = (correctAnswers / quiz.length) * 100;
  resultBox.querySelector(".percentage").innerHTML = percent.toFixed(2) + " % ";
  resultBox.querySelector(".total-score").innerHTML =
    correctAnswers + " / " + quiz.length;
}

function resetQuiz() {
  questionCounter = 0;
  correctAnswers = 0;
  attempt = 0;
}
function tryAgain() {
  resultBox.classList.add("hide");
  quizBox.classList.remove("hide");
  resetQuiz();
  startQuiz();
}

function goToHome() {
  resultBox.classList.add("hide");
  homeBox.classList.remove("hide");
  resetQuiz();
}
function startQuiz() {
  homeBox.classList.add("hide");
  quizBox.classList.remove("hide");
  setAvailableQuestions();
  getNewQuestion();
  answersIndicator();
}

window.onload = function () {
  homeBox.querySelector(".total-question").textContent = quiz.length;
};
