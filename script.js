
const quiz = document.querySelector("#quiz")
const question = document.querySelector('#question')
const answers = document.querySelector('#answers')
const timeLeft = document.querySelector("#time")
var submitBtn = document.createElement("button")
var input = document.createElement("input")

const questions = [
    {
        title: "What color is the sky?",
        choices: ["A. Green", "B. Brown", "C. Blue", "D. Red"],
        answer: "C. Blue"
    },
    {
        title: "Who was the first president?",
        choices: ["A. Bill CLinton", "B. George Washington", "C. Barack Obama", "D. George Bush"],
        answer: "B. George Washington"
    },
    {
        title: "How many months are in a year?",
        choices: ["A. 4", "B. 1", "C. 12", "D. 6"],
        answer: "C. 12"
    }
];

var index = 0;
var score = 0;
var pause = 0;
var startTime = 30;

function startQuiz() {
    if (pause === 0) {
        pause = setInterval(function () {
            startTime--;
            timeLeft.textContent = "Time: " + startTime;
            if (startTime <= 0) {
                clearInterval(pause);
                endQuiz();
                timeLeft.textContent = "Time's up!";
            }
        }, 1000);
    }
    answers.innerHTML = ""
    question.innerHTML = questions[index].title
    var mc = questions[index].choices
    mc.forEach(i => {
        let li = document.createElement("li")
        li.innerHTML = i
        answers.append(li)
        li.addEventListener("click", (grade))
    })
}

function grade(event) {
    let clickedOn = event.target.innerHTML;
    if (clickedOn === questions[index].answer) {
        console.log("Correct")
        score++
    } else {
        console.log("Wrong")
        startTime = startTime - 10
    }
    if (score < 0) {
        score = 0
    }
    index++
    if (index == questions.length) {
        endQuiz()
    } else {
        startQuiz(index)
    }
}

function endQuiz() {
    question.innerHTML = `Quiz Over! You got score of: ${score}/${questions.length}`
    answers.innerHTML = ""
    timeLeft.innerHTML = ""
    clearInterval(pause)
    input.placeholder = "Please Enter initials..."
    quiz.append(input)
    submitBtn.innerHTML = "Submit"
    quiz.append(submitBtn)
    submitBtn.addEventListener("click", function () {
        var scores = localStorage.getItem("scores")
        if (scores === null) {
            scores = []
        } else {
            scores = JSON.parse(scores)
        }
        var initials = input.value;
        var points = score;
        var pack = {
            intials: initials,
            score: points
        }
        var newScore = JSON.stringify(pack)
        localStorage.setItem("scores", newScore)
        window.location.replace("scores.html")
    })
}


startQuiz()


