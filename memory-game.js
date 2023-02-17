const memoryCards = document.querySelectorAll(".memory-card");
const moves = document.querySelector("#moves");
moves.innerHTML = "Moves:";
let moveCount = 0;
let cardsFound = 0;

// create a flipped card variable to false
let hasFlippedCard = false;
// corner case variable in case of pressing more than 2 before
// setting timeout
let lockBoard = false;

// create a first and second card variable for later
let firstCard, secondCard;
// declare the flipCard function

// start the game function

function flipCard() {
  // if user presses more than 2, return;
  if (lockBoard) return;
  // corner case: user double clicks
  if (this === firstCard) return;
  // toggle the classlist for the card using this
  // and the classlist toggle
  this.classList.toggle("flip");
  if (!hasFlippedCard) {
    // for firstClick
    hasFlippedCard = true;
    firstCard = this;
  } else {
    // for second click
    secondCard = this;
    // check if the cards match.
    // Remove the event listener if they do match
    if (firstCard.dataset.image === secondCard.dataset.image) {
      firstCard.removeEventListener("click", flipCard);
      secondCard.removeEventListener("click", flipCard);
      resetBoard();
      moveCount += 1;
      cardsFound += 2;
      moves.innerHTML = `Moves: ${moveCount}`;
      console.log(cardsFound);
    } else {
      lockBoard = true;
      setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
        moveCount += 1;
        moves.innerHTML = `Moves: ${moveCount}`;
        resetBoard();
      }, 1000);
    }
  }
  // SET TO 12!!!!
  if (cardsFound === 12) {
    setTimeout(() => {
      window.location.href = "victory.html";
    }, 1000);
  }
  // if user finds all 12 cards, open victory screen
}

// make sure user can't choose same card twice
function resetBoard() {
  hasFlippedCard = false;
  lockBoard = false;
  firstCard = null;
  secondCard = null;
}

// shuffle cards
// immediately invoke the expression using the outside ();

(function shuffle() {
  memoryCards.forEach((card) => {
    let randomOrder = Math.floor(Math.random() * 12);
    card.style.order = randomOrder;
  });
})();

memoryCards.forEach((card) => card.addEventListener("click", flipCard));

document.querySelector("#restart").addEventListener("click", function () {
  window.location.reload();
  return false;
});
