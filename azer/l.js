(function() {
  "use strict";

  let questions = [
    {
      question: "What is the main difference between a total solar eclipse and a partial solar eclipse?",
      answers: ["A total solar eclipse lasts longer", "A total solar eclipse is more frequent.  ", "A total solar eclipse completely obscures the Sun.", "A total solar eclipse can only be observed from space"],
      correctAnswer: 3
    },
    {
      question: "Why do lunar eclipses occur more frequently than solar eclipses?",
      answers: ["The Moon is larger than the Sun", "The Earth regularly blocks sunlight to the Moon.", " The Moon orbits closer to Earth. ", " Lunar eclipses are not more frequent than solar eclipses."],
      correctAnswer: 2
    },
    {
      question: "What lunar phase is required for a solar eclipse to occur?",
      answers: ["New moon", "Bucharest", "Budapest", "Chisinau"],
      correctAnswer: 1
    },
    {
      question: "What happens during a lunar eclipse ?",
      answers: ["Earth is between the Sun and the Moon, casting a shadow on the Moon.", " The Moon is between the Sun and Earth, casting a shadow on Earth. ", " The Moon rotates faster on its axis.", " The Moon temporarily disappears from the sky"],
      correctAnswer: 1
    },
    {
      question: " What is an annular eclipse?",
      answers: ["An eclipse where the Moon completely covers the Sun. ", "An eclipse where the Sun, Moon, and Earth are aligned.", " An eclipse where a ring of solar fire is visible around the Moon.", " An eclipse where the Moon is partially covered by Earth."],
      correctAnswer: 3
    },
    {
      question: " What is the typical color of the Moon during a total lunar eclipse?",
      answers: ["Red", "Blue", "Green", " Yellow"],
      correctAnswer: 1
    },
    {
      question: "On average, how long does a total solar eclipse last when viewed from      the same location on Earth?",
      answers: ["1 to 2 minutes", "10 to 15 minutes", "30 to 40 minutes", " Over an hour"],
      correctAnswer: 1
    },
    {
      question: " What type of eclipse occurs when the Moon passes in front of the Sun but does not completely cover it, leaving a crescent of the Sun visible?",
      answers: ["Total solar eclipse", "Partial Solar Eclipse", "Lunar eclipse", "Annular eclipse"],
      correctAnswer: 2
    },
    {
      question: "What is the general periodicity of solar and lunar eclipse ?",
      answers: ["Every month", "Every six months", "Every year", "Every 18 years"],
      correctAnswer: 4
    },
    {
      question: "What is the general direction of the shadow's movement during a solar eclipse on Earth ?",
      answers: ["From west to east", "From north to south", "From east to west", "It remains stationary"],
      correctAnswer: 1
    }
  ];

  let questionIndex,
    currentQuestion,
    score,
    timeSpent,
    quizTimer,
    questionIsAnswered,
    isQuizDone;
  let quiz = document.getElementById("quiz");

  function initQuiz() {
    quiz.classList.remove("quiz-intro");
    quiz.classList.add("quiz-started");

    questionIndex = 0;
    currentQuestion = 1;
    questionIsAnswered = 0;
    score = 0;
    timeSpent = "00:00";

    quiz.innerHTML = `<div id="progress-container"><span id="progress"></span></div>
    <div id="stats">
    <p>Question: <span id="questionNumber">${currentQuestion}/${
      questions.length
    }</span></p>
    <p>Score: <span id="score">${score}</span></p>
    <p>Time: <span id="timer">00:00</span></p>
    </div>
    <section id="answers"></section>`;

    displayQuestion();
    startTimer();
  }

  function displayQuestion() {
    let question = questions[questionIndex];
    let answers = document.getElementById("answers");
    let answerNumber = 0;
    let output = `<h2 class="text-center bold">${currentQuestion}. ${
      question.question
    }</h2>`;

    for (let i in question.answers) {
      answerNumber++;
      output += `<div class="answer">
      <input type="radio" id="answer-${answerNumber}" name="answers" value="${answerNumber}">
      <label for="answer-${answerNumber}">
      <span class="answer-number">${answerNumber}.</span> ${question.answers[i]}
      </label>
      </div>`;
    }

    answers.innerHTML = output;
  }

  function startTimer() {
    let s = 0;
    let m = 0;
    let h = 0;
    let seconds = 0;
    let minutes = 0;
    let hours = 0;
    let timer = document.getElementById("timer");

    quizTimer = setInterval(function() {
      s++;

      if (s > 59) {
        s = 0;
        m++;
        seconds = "0" + s;
      }

      if (m > 59) {
        m = 0;
        h++;
        minutes = "00";
      }

      seconds = s > 9 ? s : "0" + s;
      minutes = m > 9 ? m : "0" + m;
      hours = h > 9 ? h : "0" + h;

      timeSpent = h
        ? hours + ":" + minutes + ":" + seconds
        : minutes + ":" + seconds;
      timer.textContent = timeSpent;
    }, 1000);
  }

  function displayResults() {
    let notification = document.getElementById("notification");
    notification.parentElement.removeChild(notification);
    quizTimer = null;
    isQuizDone = 1;

    let pageURL = window.location.href;
    let shareText = `I just finished this quiz and got ${score} out of ${
      questions.length
    } questions right.`;
    let fbShareURL = `https://www.facebook.com/sharer.php?u=${pageURL}&quote=${shareText}`;
    let twitterShareURL = `https://twitter.com/intent/tweet?text=${shareText} ${pageURL}`;

    quiz.innerHTML = `<section id="results" class="text-center">
    <h2 class="bold">Here are your results:</h2>
    <p id="percentage">${scorePercentage()}%</p>
    <p>You got <span class="bold">${score}</span> out of <span class="bold">${
      questions.length
    }</span> questions.</p>
    <p style="margin-top: 10px;">Time spent: <span class="bold">${timeSpent}</span></p>

  

    <button type="button" id="start-over-btn" class="btn blue-btn">Start over</button>
    </section>`;
  }

  function goToNextQuestion() {
    currentQuestion++;
    questionIndex++;
    questionIsAnswered = 0;

    let notification = document.getElementById("notification");
    notification.parentElement.removeChild(notification);

    let questionNumber = document.getElementById("questionNumber");
    questionNumber.textContent = `${currentQuestion}/${questions.length}`;

    displayQuestion();
  }

  function submitAnswer(e) {
    let selectedAnswer = Number(e.target.value);
    let rightAnswer = questions[questionIndex].correctAnswer;
    let answers = document.getElementsByName("answers");
    let progress = document.getElementById("progress");

    questionIsAnswered = 1;

    progress.style.width = progressPercentage() + "%";

    let notification = document.createElement("div");
    let message = document.createElement("p");
    let label = e.target.nextElementSibling;
    notification.id = "notification";

    if (selectedAnswer === rightAnswer) {
      score++;
      message.textContent = "Right answer!";
      label.classList.add("green-bg");
    } else {
      message.textContent = "Wrong answer!";
      label.classList.add("red-bg");

      answers.forEach(answer => {
        if (Number(answer.value) !== rightAnswer) return;

        answer.nextElementSibling.classList.add("green-bg");
      });
    }

    let button = document.createElement("button");
    button.classList.add("blue-btn");

    if (isLastQuestion()) {
      button.id = "show-results-btn";
      button.textContent = "Show results";
      clearInterval(quizTimer);
      quizTimer = null;
    } else {
      button.id = "next-btn";
      button.textContent = "Continue";
    }

    notification.appendChild(message);
    notification.appendChild(button);
    quiz.insertAdjacentElement("afterend", notification);

    button.focus();

    answers.forEach(answer => (answer.disabled = "disabled"));

    document.getElementById("score").textContent = score;
  }

  let scorePercentage = () => (score / questions.length * 100).toFixed(0);
  let progressPercentage = () =>
    (currentQuestion / questions.length * 100).toFixed(0);
  let isLastQuestion = () => currentQuestion === questions.length;

  function spaceBarHandler() {
    if (document.querySelector(".quiz-intro")) {
      initQuiz();
    }

    if (questionIsAnswered && quizTimer) {
      goToNextQuestion();
    }

    if (!quizTimer && !isQuizDone) {
      displayResults();
      console.log("last");
    }
  }

  function numericKeyHandler(e) {
    let answers = document.getElementsByName("answers");

    answers.forEach(answer => {
      if (answer.value === e.key) {
        if (questionIsAnswered) return;

        answer.checked = "checked";

        let event = new Event("change");
        answer.dispatchEvent(event);
        submitAnswer(event);

        questionIsAnswered = 1;
      }
    });
  }

  document.addEventListener("click", function(e) {
    if (
      e.target.matches("#start-quiz-btn") ||
      e.target.matches("#start-over-btn")
    )
      initQuiz();
    if (e.target.matches("#next-btn")) goToNextQuestion();
    if (e.target.matches("#show-results-btn")) displayResults();
  });

  document.addEventListener("change", function(e) {
    if (e.target.matches('input[type="radio"]')) submitAnswer(e);
  });

  document.addEventListener("keyup", function(e) {
    if (e.keyCode === 32) spaceBarHandler(); // init quiz / go to next question
    if (e.keyCode >= 48 && e.keyCode <= 57) numericKeyHandler(e); // choose an answer
  });

  document
    .getElementById("shortcuts-info-btn")
    .addEventListener("click", function() {
      let info = document.querySelector(".shortcuts-info");
      info.classList.toggle("display-block");
    });
})();
