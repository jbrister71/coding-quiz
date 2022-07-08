var questions = [
    "What does HTML stand for?",
    "What's the main difference between local storage and session storage?",
    "What number do arrays start at in Javascript?",
    "What term is used for joining two strings?",
    "What term is used for a loop inside of another loop?"
];

var answers = [
    [
        "Highly Textual Middle Language", "Local storage is on your machine. Session storage is online.", "0", "adding", "doubled"
    ],
    [
        "Hypertext Markup Language", "Local storage and session storage are the same thing.", "1", "glueing", "scoped"
    ],
    [
        "Hidden Timely Mixup Language", "When the browser is closed, local storage persists and session storage is cleared.", "-1", "stapling", "nested"
    ],
    [
        "Higher Tab Made-up Language", "Local storage is used by javascript. Session storage is used by HTML.", "Whatever you want", "concatenating", "too many"
    ]
];

var correctAnswers = [
    "1", "2", "0", "3", "2"
];

var quizInfo1 = document.getElementById("quiz-info-1");
var quizInfo2 = document.getElementById("quiz-info-2");
startContainerEl = document.querySelector("#start-container");
startBtnEl = document.querySelector("#start-btn");
answerContainerEl = document.getElementById("answers");
var question = document.getElementById("questions");
var formContainerEl;
var formInputEl;
var formInfoEl;
var formButtonEl;
var highScoreLinkEl = document.getElementById("high-score-link");

var questionCounter;
var timer = 0;
numQuestions = 5;
var interval;
var clock = document.querySelector("#timer");
var highScoreList = [];

var startQuiz = function() {
    startTimer();
    questionCounter = 0;
    startBtnEl.remove();
    removeChildElements(answerContainerEl);
    console.log("Quiz started");
    createQuestion();
};

var createQuestion = function() {
    question.textContent = questions[questionCounter];
    
    var answerListEl = document.createElement("div");
    answerListEl.className = "answer-list";

    for(var i = 0; i < numQuestions-1; i++) {
        var answerBtnEl = document.createElement("button");
        answerBtnEl.className = "btn answer-btn";
        answerBtnEl.setAttribute("data-answer-id", i);
        answerBtnEl.textContent = answers[i][questionCounter];
        answerListEl.appendChild(answerBtnEl);
    }
    answerContainerEl.appendChild(answerListEl);
};

var checkAnswer = function(event) {
    if(event.target.className === "btn answer-btn") {
        var answerId = event.target.getAttribute("data-answer-id");
        if(answerId === correctAnswers[questionCounter]) {
            console.log("Correct");
            timer += 10;
            checkTimeUp();
            displayAccuracy(true);
            if(questionCounter < numQuestions-1 && timer > 0) {
                questionCounter++;
                document.querySelector(".answer-list").remove();
                createQuestion();
            }
            else {
                endQuiz();
            }
        }
        else {
            console.log("Incorrect");
            timer -= 20;
            checkTimeUp();
            displayAccuracy(false);
            if(questionCounter < numQuestions-1 && timer > 0) {
                questionCounter++;
                document.querySelector(".answer-list").remove();
                createQuestion();
            }
            else {
                endQuiz();
            }
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
        endQuiz();
    }
    else {
        clock.textContent = "Time: " + timer;
    }
};

var endQuiz = function() {
    clearInterval(interval);
    clock.textContent = "Time's up!";
    question.textContent = "Let's see how you did!";
    removeChildElements(answerContainerEl);
    removeChildElements(startContainerEl);
    
    var result = document.createElement("p");
    result.textContent = "Your score is " + timer + "!";
    answerContainerEl.appendChild(result);

    formContainerEl = document.createElement("div");
    formInfoEl = document.createElement("p");
    formInputEl = document.createElement("input")
    formButtonEl = document.createElement("button");
    formInputEl.className = "submit-input";
    formButtonEl.className = "btn submit-btn";
    formButtonEl.textContent = "Submit";

    formInfoEl.textContent = "Enter your initials: ";
    formContainerEl.appendChild(formInfoEl);
    formContainerEl.appendChild(formInputEl);
    formContainerEl.appendChild(formButtonEl);

    answerContainerEl.appendChild(formContainerEl);
};

var saveHighScore = function(event) {
    if(event.target.matches(".submit-btn")) {
        console.log("we got here");
        if(formInputEl.value) {
            var highScoreObj = {
                initials: document.querySelector(".submit-input").value,
                score: timer
            };
            if(highScoreList === null) {
                highScoreList = [highScoreObj];
            }
            else {
                highScoreList.push(highScoreObj);
            }
            localStorage.setItem("scores", JSON.stringify(highScoreList));
        }

        question.textContent = "Thanks for playing!";
        removeChildElements(answerContainerEl);
        startContainerEl.appendChild(startBtnEl);
    }
};

var loadHighScores = function() {
    var highScoreStr = localStorage.getItem("scores");
    highScoreList = JSON.parse(highScoreStr);
}

var displayHighScores = function() {
    if (timer != 0) {
        clearInterval(interval);
        timer = 0;
        clock.textContent = "Clock Stopped";
    }
    removeChildElements(answerContainerEl);
    removeChildElements(startContainerEl);
    question.textContent = "High Scores"

    var highScoreOl = document.createElement("ol");
    var highScoreLi;
    if(highScoreList === null) {
        displayNoScores();
    }
    else {
        for(var i = 0; i < highScoreList.length; i++) {
            console.log(highScoreList[i]);
            highScoreLi = document.createElement("li");
            highScoreLi.textContent = highScoreList[i].initials + ": " + highScoreList[i].score;
            highScoreOl.appendChild(highScoreLi);
        }
        answerContainerEl.appendChild(highScoreOl);
    }
    

    var returnBtnEl = document.createElement("button");
    returnBtnEl.className = "btn return-btn";
    returnBtnEl.textContent = "Return to Quiz";
    startContainerEl.appendChild(returnBtnEl);

    var clearBtnEl = document.createElement("button");
    clearBtnEl.className = "btn clear-btn";
    clearBtnEl.textContent = "Clear High Scores";
    startContainerEl.appendChild(clearBtnEl);
}

var removeChildElements = function(element) {
    while(element.firstChild) {
        element.removeChild(element.firstChild);
    }
};

var returnToQuiz = function(event) {
    if(event.target.matches(".return-btn")) {
        removeChildElements(answerContainerEl);
        removeChildElements(startContainerEl);
        question.textContent = "Coding Quiz!";

        answerContainerEl.appendChild(quizInfo1);
        answerContainerEl.appendChild(quizInfo2);

        startContainerEl.appendChild(startBtnEl);
    }
}

var clearHighScores = function(event) {
    if(event.target.matches(".clear-btn")) {
        highScoreList = [];
        localStorage.clear();
        removeChildElements(answerContainerEl);
        displayNoScores();
    }
}

var displayNoScores = function() {
    var noScoreInfoEl = document.createElement("p");
    noScoreInfoEl.textContent = "No scores to display."
    answerContainerEl.appendChild(noScoreInfoEl);
}

startBtnEl.addEventListener("click", startQuiz);
answerContainerEl.addEventListener("click", checkAnswer);
answerContainerEl.addEventListener("click", saveHighScore);
highScoreLinkEl.addEventListener("click", displayHighScores);
startContainerEl.addEventListener("click", returnToQuiz);
startContainerEl.addEventListener("click", clearHighScores);
loadHighScores();