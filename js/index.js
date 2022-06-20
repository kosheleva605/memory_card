const cards = document.querySelectorAll(".memory-card");
const fireworkCanvas = document.getElementById("fireworks-canvas");
console.log(fireworkCanvas);

const Firework = () => {
  JS_FIREWORKS.Fireworks({
    id: "fireworks-canvas",
    hue: 120,
    particleCount: 50,
    delay: 0,
    minDelay: 20,
    maxDelay: 40,
    boundaries: {
      // of respawn and target
      top: 50,
      bottom: 240,
      left: 50,
      right: 590,
    },
    fireworkSpeed: 2,
    fireworkAcceleration: 1.05,
    particleFriction: 0.95,
    particleGravity: 1.5,
  }).start();
};

let hasFlipedCard = false;
let firstCard;
let secondCard;
let boardLocked = false;

const flipCard = (e) => {
  if (boardLocked) return;
  const target = e.target.parentElement;

  if (target === firstCard) return;

  target.classList.add("flip");

  if (!hasFlipedCard) {
    hasFlipedCard = true;
    firstCard = target;
  } else {
    hasFlipedCard = false;
    secondCard = target;
    checkForMatch();
  }
};

const checkForMatch = () => {
  const isEqual = firstCard.dataset.framework === secondCard.dataset.framework;
  isEqual ? disableCards() : unflipCards();
};

const disableCards = () => {
  console.log(firstCard, secondCard);
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  setTimeout(() => {
    firstCard.classList.add("hidden");
    secondCard.classList.add("hidden");
    checkWin();
  }, 500);
};

const unflipCards = () => {
  boardLocked = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, 1000);
};

const resetBoard = () => {
  hasFlipedCard = boardLocked = false;
  firstCard = secondCard = null;
};

const checkWin = () => {
  let a = Array.from(cards).every((card) => card.classList.contains("hidden"));
  console.log(a);
  if (a === true) {
    Firework();
    fireworkCanvas.style.display = "block";
  } else {
    console.log("У элементов НЕТ класса hidden!");
  }
};
const modal = () => {};

cards.forEach((card) => {
  card.addEventListener("click", flipCard);

  const randomIndex = Math.floor(Math.random() * cards.length);
  card.style.order = randomIndex;
});
