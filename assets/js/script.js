var questions = [
    "What's the first answer?",
    "What's the second answer?",
    "What's the third answer?",
    "What's the fourth answer?",
    "What was the answer to the first question?"
];

var answers = [
    [
        "A", "A", "A", "A", "A"
    ],
    [
        "B", "B", "B", "B", "B"
    ],
    [
        "C", "C", "C", "C", "C"
    ],
    [
        "D", "D", "D", "D", "D"
    ]
];

var correctAnswers = [
    "0", "1", "2", "3", "0"
];

startContainerEl = document.querySelector("#start-container");
startBtnEl = document.querySelector("#start-btn");
answerContainerEl = document.getElementById("answers");
var question = document.getElementById("questions");

var questionCounter;
var timer = 0;
numQuestions = 5;
var interval;
var clock = document.querySelector("#timer");

var startQuiz = function() {
    startTimer();
    questionCounter = 0;
    startBtnEl.remove();
    document.getElementById("quiz-info").remove();
    document.getElementById("quiz-info").remove();
    console.log("Quiz started");
    createQuestion();
};

var createQuestion = function() {
    question.textContent = questions[questionCounter];
    
    var answerListEl = document.createElement("div");
    answerListEl.className = "answer-list";

    for(var i = 0; i < numQuestions-1; i++) {
        var answerBtnEl = document.createElement("button");
        answerBtnEl.className = "answer-btn";
        answerBtnEl.setAttribute("data-answer-id", i);
        answerBtnEl.textContent = answers[i][questionCounter];
        answerListEl.appendChild(answerBtnEl);
    }
    answerContainerEl.appendChild(answerListEl);
};

var checkAnswer = function(event) {
    var answerId = event.target.getAttribute("data-answer-id");
    if(answerId === correctAnswers[questionCounter]) {
        console.log("Correct");
        timer += 10;
        checkTimeUp();
        displayAccuracy(true);
        if(questionCounter < numQuestions-1) {
            questionCounter++;
            document.querySelector(".answer-list").remove();
            createQuestion();
        }
    }
    else {
        console.log("Incorrect");
        timer -= 20;
        checkTimeUp();
        displayAccuracy(false);
        if(questionCounter < numQuestions-1) {
            questionCounter++;
            document.querySelector(".answer-list").remove();
            createQuestion();
        }
    }
};

var displayAccuracy = function(correct) {
    accuracyInfoEl = document.createElement("p")
    
    if(correct) {
        accuracyInfoEl.textContent = "Correct! +10 seconds"
    }
    else {
        accuracyInfoEl.textContent = "Incorrect... -20 seconds"
    }

    startContainerEl.appendChild(accuracyInfoEl);
    var removeAccuracy = function() {
        accuracyInfoEl.remove();
        clearTimeout(this);
    }
    setTimeout(removeAccuracy, 1000);
}

var startTimer = function() {
    timer = 60;
    clock.textContent = "Time: " + timer;
    var timerCount = function() {
        timer--;
        checkTimeUp();
    }
    interval = setInterval(timerCount, 1000);
}

var checkTimeUp = function() {
    if(timer <= 0) {
        timer = 0;
        clock.textContent = "Time's up!";
        clearInterval(interval);
    }
    else {
        clock.textContent = "Time: " + timer;
    }
}

startBtnEl.addEventListener("click", startQuiz);
answerContainerEl.addEventListener("click", checkAnswer);