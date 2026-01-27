let userScore = 0;
let compScore = 0;
let mode = "";
let phase = 1;
let gameOver = false;

function choose(choice) {
    mode = choice;
    document.getElementById("choice").style.display = "none";
    document.getElementById("playArea").style.display = "block";
    updateStatus();
}

function play(userRun) {
    if (gameOver) return;

    let compRun = Math.floor(Math.random() * 6) + 1;

    if (userRun === compRun) {
        document.getElementById("message").innerText =
            "OUT! You: " + userRun + " | Opponent: " + compRun;

        if (phase === 1) {
            phase = 2;
            mode = mode === "bat" ? "bowl" : "bat";
            updateStatus();
        } else {
            endGame();
        }
    } else {
        if (mode === "bat") {
            userScore += userRun;
            document.getElementById("userScore").innerText = userScore;
        } else {
            compScore += compRun;
            document.getElementById("compScore").innerText = compScore;
        }

        document.getElementById("message").innerText =
            "You: " + userRun + " | Opponent: " + compRun;
    }
}

function updateStatus() {
    document.getElementById("status").innerText =
        mode === "bat" ? "You are Batting 🏏" : "You are Bowling 🎯";
}

function endGame() {
    gameOver = true;
    let resultText = "";
    let cls = "";

    if (userScore > compScore) {
        resultText = "YOU WIN 🏆";
        cls = "win";
        startConfetti();
    } else if (userScore < compScore) {
        resultText = "YOU LOSE 😢";
        cls = "lose";
    } else {
        resultText = "MATCH DRAW 🤝";
        cls = "draw";
    }

    let final = document.getElementById("finalResult");
    final.innerText = resultText;
    final.className = cls;

    document.getElementById("modal").style.display = "block";
}

function restart() {
    userScore = 0;
    compScore = 0;
    phase = 1;
    gameOver = false;
    mode = "";

    document.getElementById("userScore").innerText = 0;
    document.getElementById("compScore").innerText = 0;
    document.getElementById("message").innerText = "";
    document.getElementById("modal").style.display = "none";
    document.getElementById("playArea").style.display = "none";
    document.getElementById("choice").style.display = "block";
    document.getElementById("confetti").innerHTML = "";
}

function startConfetti() {
    let confetti = document.getElementById("confetti");
    for (let i = 0; i < 60; i++) {
        let piece = document.createElement("span");
        piece.style.left = Math.random() * 100 + "vw";
        piece.style.animationDuration = (Math.random() * 2 + 2) + "s";
        confetti.appendChild(piece);
    }
}
