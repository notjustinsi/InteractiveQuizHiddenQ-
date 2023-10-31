const questions = [
    {
        question: "Question 1: What does API stand for?",
        answers: ["Apple Pie Ice-cream", "Application Programming Interface", "Aerodynamic Plane Interventions", "Ant-Pharaoh Insect"],
        correctIndex: 1,
    },
    {
        question: "Question 2: What is jQuery?",
        answers: ["A mine in Russia", "A mine in Africa", "A robot miner", "A library for simplifying HTML document traversal and manipulation."],
        correctIndex: 3,
    },
    {
        question: "Question 3: Why is learning programming a good idea?",
        answers: ["It can provide opportunities for technical work in different industries", "For money", "For fame", "Helps find a great fertilizer for grape vineyards in the winter"],
        correctIndex: 0,
    },
];

let currentQuestionIndex = 0;
let timeLeft = 60;
let score = 0;
let gameEnded = false;

function startQuiz() {
    currentQuestionIndex = 0;
    timeLeft = 60;
    score = 0;
    startTimer();
    displayQuestion();
}

function displayQuestion() {
    if (currentQuestionIndex < questions.length) {
        const questionData = questions[currentQuestionIndex];
        const questionElement = document.getElementById("question");
        questionElement.textContent = questionData.question;

        const answerButtons = document.querySelectorAll(".choice");
        questionData.answers.forEach((answer, i) => {
            answerButtons[i].textContent = answer;
            answerButtons[i].addEventListener("click", () => checkAnswer(i));
        });
    }
}

function checkAnswer(index) {
    const questionData = questions[currentQuestionIndex];

    if (index === questionData.correctIndex) {
        score++;
    } else {
        timeLeft -= 10;
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        displayEndGame();
    }
}

function displayEndGame() {
    const quizContainer = document.getElementById("quiz-container");
    quizContainer.style.display = "none";
    const endGameScreen = document.getElementById("end-game-screen");
    endGameScreen.style.display = "block";
    document.getElementById("final-score").textContent = score;
    gameEnded = true;
}

function saveScore() {
    if (!gameEnded) return;
    const initialsInput = document.getElementById("initials");
    const initials = initialsInput.value;

    if (initials) {
        highScores.push({ initials, score });
        highScores.sort((a, b) => b.score - a.score);
        displayHighScores();
    }
}

function displayHighScores() {
    const highScoresList = document.getElementById("high-scores-list");
    highScoresList.innerHTML = "";

    highScores.forEach((entry, index) => {
        const li = document.createElement("li");
        li.textContent = `${entry.initials}: ${entry.score}`;
        highScoresList.appendChild(li);
    });

    const highScoresScreen = document.getElementById("high-scores-screen");
    highScoresScreen.style.display = "block";
}

document.getElementById("start-button").addEventListener("click", startQuiz);

document.getElementById("save-score").addEventListener("click", saveScore);

let timer;

function startTimer() {
    const timeLeftElement = document.getElementById("time-left");
    timeLeftElement.textContent = timeLeft;

    timer = setInterval(function () {
        timeLeft--;
        timeLeftElement.textContent = timeLeft;

        if (timeLeft <= 0 || currentQuestionIndex >= questions.length) {
            clearInterval(timer);
            displayEndGame();
        }
    }, 1000);
}
