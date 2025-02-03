// Globale Variables
let randomNumber = Math.floor(Math.random()*100+1)
let numberOfGuesses = 0
let leaderboardArray = []
let lastIndex = 0
let numberOfGames = 0
let userAddedName = 0

if (JSON.parse(localStorage.getItem("numberOfGames")) == null) {
    numberOfGames = 0;
} else {
    numberOfGames = JSON.parse(localStorage.getItem("numberOfGames"))
}

// Elements
const startScreenDivEl = document.getElementById("startScreenDiv")
const gameDivEl = document.getElementById("gameDiv")
let answerBoxEl  = document.getElementById("answerBox")
let outputGameEl = document.getElementById("outputGame")
let guessEl = document.getElementById("guess")
let correctAnswerEl = document.getElementById("correctAnswer")
let leaderBoardDivEl = document.getElementById("leaderBoardDiv")
let userNameEl = document.getElementById("userName")

// Changing between divs
function startGame() {
    startScreenDivEl.style = "display: none"
    gameDivEl.style = "display: block"
    randomNumber = Math.floor(Math.random()*100+1)
    numberOfGuesses = 0
    userAddedName = 0
}

function submitGuess() {
    answerBoxEl.style = "display: block"
    guessEl = document.getElementById("guess")
    let guess = Number(guessEl.value)
    console.log(guess)
    if (guess > randomNumber) {
        outputGameEl.innerHTML = "higher"
    } else if (guess < randomNumber) {
        outputGameEl.innerHTML = "lower"
    } else {
        gameDivEl.style = "display: none"
        finishGameDiv.style = "display: block"
        correctAnswerEl.innerHTML = JSON.stringify(guess)

        // Displaying Leaderboard
        leaderBoardDivEl.innerHTML = ""
        leaderboardArray = JSON.parse(localStorage.getItem("leaderboard"))
        for (let i = 0; i < leaderboardArray.length; i++) {
            leaderBoardDivEl.innerHTML +=  `${leaderboardArray[i]} <br>`
            console.log(leaderboardArray[i])
        }

        // Storing number of Games in LocalStorage
        numberOfGames++
        localStorage.setItem("numberOfGames",JSON.stringify(numberOfGames))
        console.log(localStorage)
    }
    numberOfGuesses++
}

function restartGame() {
    finishGameDiv.style = "display: none"
    startScreenDivEl.style = "display: block"
}

function addToLeaderboard() {
    userNameEl = document.getElementById("userName")
    let username = userNameEl.value
    if (!username) {
        alert("Add an actual username")
    } else if (userAddedName == 1) {
        alert("You cannot add your name more than once")
    } else {
        // Adding a method to check if the user has already added their name
        userAddedName++

        // Collecting leaderboard data from LocalStorage
        if (JSON.parse(localStorage.getItem("leaderboard")) == null) {
            leaderboardArray = []
        } else {
            leaderboardArray = JSON.parse(localStorage.getItem("leaderboard"))
            lastIndex = leaderboardArray.length-1
        }
        
        // Saving to array & LocalStorage
        leaderboardArray.push([username, numberOfGuesses])
        let leaderboardArrayStorage = JSON.stringify(leaderboardArray)
        localStorage.setItem("leaderboard", leaderboardArrayStorage)
        console.log(localStorage)
        
        leaderBoardDivEl.innerHTML = ""
        leaderboardArray = JSON.parse(localStorage.getItem("leaderboard"))
        for (let i = 0; i < leaderboardArray.length; i++) {
            leaderBoardDivEl.innerHTML +=  `${leaderboardArray[i]} <br>`
            console.log(leaderboardArray[i])
        }
    }
}