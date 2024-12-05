import { films } from "./data.js";

let remainingFilms = [...films];
let currentFilm = null;
let guessesRemaining = 3;
let gameOver = false;

const guessInput = document.getElementById("guess-input");
const guessForm = document.getElementById("guess-form");
const messageContainer = document.querySelector(".message-container");
const emojiCluesContainer = document.querySelector(".emoji-clues-container");
const submitButton = document.querySelector('button[type="submit"]');

function selectRandomFilm() {
  if (remainingFilms.length === 0) {
    gameOver = true;
    displayMessage("That's all folks!");
    disableInput();
    return null;
  }
  const randomIndex = Math.floor(Math.random() * remainingFilms.length);
  const selectedFilm = remainingFilms[randomIndex];
  remainingFilms.splice(randomIndex, 1);
  return selectedFilm;
}

function displayEmojiClues(film) {
  emojiCluesContainer.textContent = film.emoji.join(" ");
  emojiCluesContainer.setAttribute("aria-label", film.ariaLabel);
}

function displayMessage(message) {
  messageContainer.textContent = message;
}

function disableInput() {
  guessInput.disabled = true;
  submitButton.disabled = true;
}

function enableInput() {
  guessInput.disabled = false;
  submitButton.disabled = false;
}

function handleGuess(event) {
  event.preventDefault();
  if (gameOver) return;

  const userGuess = guessInput.value.trim().toLowerCase();
  const correctAnswer = currentFilm.title.toLowerCase();

  if (userGuess === correctAnswer) {
    displayMessage("Correct!");
    disableInput();
    setTimeout(() => {
      startNewRound();
    }, 3000);
  } else {
    guessesRemaining--;
    if (guessesRemaining > 0) {
      displayMessage(
        `Incorrect! You have ${guessesRemaining} more ${
          guessesRemaining === 1 ? "guess" : "guesses"
        } remaining.`
      );
    } else {
      displayMessage(`The film was ${currentFilm.title}!`);
      disableInput();
      setTimeout(() => {
        startNewRound();
      }, 3000);
    }
  }

  guessInput.value = "";
}

function startNewRound() {
  currentFilm = selectRandomFilm();
  if (currentFilm) {
    guessesRemaining = 3;
    displayEmojiClues(currentFilm);
    displayMessage("You have 3 guesses remaining.");
    enableInput();
  }
}

guessForm.addEventListener("submit", handleGuess);

// Start the game
startNewRound();

console.log("Christmas Movie Emoji Game initialized!");
