var highScores = [];
var highScoresUsed = [];

var displayHighScores = function() {
    var scoreListContainerEl;
    var highScoreStr = localStorage.getItem("scores");
    highScores = JSON.parse(highScoreStr);
    if(highScores === null) {
        scoreListContainerEl = document.getElementById("score-list-container");
        scoreListContainerEl.textContent = "No high scores yet";
    }
    else {
        console.log("does it get here?")
        for(i = 0; i < highScores.length; i++) {
            var highScoreObj = getHighScore();
            var highScoreListItem = document.createElement("li");
            highScoreListItem.textContent = highScoreObj.initials + ": " + highScoreObj.score;
            scoreListContainerEl.appendChild(highScoreListItem);
        }
    }
}

var getHighScore = function() {
    var highScoreObj;
    for(i = 0; i < highScores.length; i++) {
        var alreadyUsed = false;
        if(highScoresUsed != null) {
            for(j = 0; j < highScoresUsed.length; j++) {
                if(highScoreList[i].initials === highScoresUsed[j].initials && highScoreList[i].score === highScoresUsed[j].score) {
                    alreadyUsed = true;
                }
            }
        }
        if(alreadyUsed === false) {
            if(highScoreObj === null) {
                highScoreObj = highScoreList[i];
            }
            else {
                if(highScoreObj.score < highScoreList) {
                    highScoreObj = highscoreList;
                }
            }
        }
    }

    return highScoreObj;
}

displayHighScores();