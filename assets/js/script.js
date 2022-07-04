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

startBtnEl = document.querySelector("#start-btn");
answerContainerEl = document.getElementById("answers");
var question = document.getElementById("questions");

var questionCounter;

var startQuiz = function() {
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

    for(var i = 0; i < 4; i++) {
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
        if(questionCounter < 4) {
            questionCounter++;
            document.querySelector(".answer-list").remove();
            createQuestion();
        }
    }
    else {
        console.log("Incorrect");
        if(questionCounter < 4) {
            questionCounter++;
            document.querySelector(".answer-list").remove();
            createQuestion();
        }
    }
}

startBtnEl.addEventListener("click", startQuiz);
answerContainerEl.addEventListener("click", checkAnswer);