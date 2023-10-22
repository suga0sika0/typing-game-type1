const words = ["悪意の第三者", "意思能力", "遺留分", "囲繞地", "危険責任", "帰責事由", "混合", "不真正連帯債務", "履行拒絶権", "履行補助者", "無権代理", "無過失責任", "みなし弁済", "保存行為", "補助開始の審判", "期限前の弁済", "第三者の弁済", "債務引受け", "分別の利益", "不法行為"];

function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

let score = 0;
let currentWord = "";

const totalTimeLimit = 60; // 60秒
let totalTimeLeft = totalTimeLimit;

const wordTimeLimit = 10; // 10秒
let wordTimeLeft = wordTimeLimit;

function updateGauge() {
    const gaugeElement = document.getElementById("timer-gauge");
    const percentage = (wordTimeLeft / wordTimeLimit) * 100;
    gaugeElement.style.width = `${percentage}%`;
}

function checkMatchingWord() {
    const inputValue = document.getElementById("typed-input").value;

    if (inputValue === currentWord) {
        score++;
        document.getElementById("score").innerText = score;

        currentWord = getRandomWord();
        document.getElementById("word-to-type").innerText = currentWord;

        document.getElementById("typed-input").value = ""; // 入力欄をクリア
        wordTimeLeft = wordTimeLimit;
        updateGauge();
    }
}

function updateWordColor() {
    const wordElement = document.getElementById("word-to-type");
    const inputValue = document.getElementById("typed-input").value;
    let coloredWord = "";

    for (let i = 0; i < currentWord.length; i++) {
        if (inputValue[i] === currentWord[i]) {
            coloredWord += `<span style="color:red">${currentWord[i]}</span>`;
        } else {
            coloredWord += currentWord[i];
        }
    }

    wordElement.innerHTML = coloredWord;
}

let timer;

function startGame() {
    currentWord = getRandomWord();
    document.getElementById("word-to-type").innerText = currentWord;
    document.getElementById("typed-input").disabled = false;

    timer = setInterval(function() {
        totalTimeLeft--;
        wordTimeLeft--;
        document.getElementById("time-left").innerText = totalTimeLeft;
        updateGauge();

        if (wordTimeLeft <= 0) {
            currentWord = getRandomWord();
            document.getElementById("word-to-type").innerText = currentWord;
            wordTimeLeft = wordTimeLimit;
            updateGauge();

            document.getElementById("typed-input").value = ""; 
        }

        if (totalTimeLeft <= 0) {
            clearInterval(timer);
            alert("Time's up!");
            document.getElementById("typed-input").disabled = true;
        }
    }, 1000);
}

document.getElementById("start-button").addEventListener("click", startGame);

// 以前のinputイベントのリスナーを削除し、compositionendイベントのリスナーを追加
document.getElementById("typed-input").addEventListener("compositionend", function() {
    updateWordColor();
    checkMatchingWord();
});
