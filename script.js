//variable and small details
let gameName = "Guess The Word";
document.title = gameName;
document.querySelector(
  "footer"
).innerHTML = `${gameName} Game created by Chebbi Ghaith <3`;
document.querySelector("h1").innerHTML = gameName;
let numberOfTries = 3;
let numberOfletters = 4;
let currentTry = 1;
const wordlist = [
  "code",
  "java",
  "html",
  "node",
  "bash",
  "ruby",
  "byte",
  "java",
  "unix",
  "json",
  "repo",
  "wifi",
  "byte",
  "java",
  "fpga",
  "raid",
  "bios",
  "dhcp",
];

const randomWord = wordlist[Math.floor(Math.random() * wordlist.length)];
console.log(randomWord);
//start of div creations
function generateInput() {
  const inputsContainer = document.querySelector(".try-area");

  for (let i = 1; i <= numberOfTries; i++) {
    const tryDiv = document.createElement("div");
    tryDiv.classList.add(`try-${i}`);
    tryDiv.innerHTML = `<span>Try ${i} </span>`;
    if (i !== 1) tryDiv.classList.add("disabled-inputs");
    inputsContainer.appendChild(tryDiv);
    for (let j = 0; j < numberOfletters; j++) {
      const input = document.createElement("input");
      input.type = "text";
      input.id = `guess-${i}-letter-${j}`;
      input.setAttribute("maxlength", "1");
      tryDiv.appendChild(input);
    }
    inputsContainer.appendChild(tryDiv);
  }
  //start of navigations edits
  inputsContainer.children[0].children[1].focus();
  const inputsInDisabledDiv = document.querySelectorAll(
    ".disabled-inputs input"
  );
  inputsInDisabledDiv.forEach((input) => (input.disabled = true));
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input, index) => {
    input.addEventListener("input", function () {
      this.value = this.value.toUpperCase();
      const nextInput = inputs[index + 1];
      if (nextInput) nextInput.focus();
    });

    input.addEventListener("keydown", function (event) {
      const currentIndex = Array.from(inputs).indexOf(event.target);
      if (event.key === "ArrowRight") {
        const nextInput = currentIndex + 1;
        if (nextInput < inputs.length) inputs[nextInput].focus();
      }
      if (event.key === "ArrowLeft") {
        const prevInput = currentIndex - 1;
        if (prevInput >= 0) inputs[prevInput].focus();
      }
    });
  });
}
//start of game logic
const guessButton = document.querySelector(".check");
if (currentTry <= numberOfTries) {
  guessButton.addEventListener("click", handleGuesses);
}

function handleGuesses() {
  let RightGuess = true;

  for (let i = 1; i <= numberOfletters; i++) {
    const inputField = document.querySelector(
      `#guess-${currentTry}-letter-${i - 1}`
    );

    const letter = inputField.value.toLowerCase();
    const currentLetter = randomWord[i - 1];
    if (currentLetter === letter) {
      inputField.classList.add("yes-yellow");
    } else if (randomWord.includes(letter) && letter !== "") {
      inputField.classList.add("yes-green");
      RightGuess = false;
    } else {
      inputField.classList.add("yes-black");
      RightGuess = false;
    }
  }

  //Check if user win or lose
  if (RightGuess) {
    Swal.fire({
      title: "You Win after " + currentTry + " tries",
      width: 600,
      padding: "3em",
      color: "#716add",
      background:
        "#fff url(https://media.tenor.com/ZoZqWaSnN5UAAAAi/diwali-sparkles-stars.gif)",
      backdrop: `
        rgba(0,0,123,0.4)
        url("https://media.tenor.com/FAIxgHJ6oX4AAAAi/white-chicken.gif")
        center top
        no-repeat
      `,
    });
    let allTries = document.querySelectorAll(".try-area div");
    allTries.forEach((tryDiv) => tryDiv.classList.add("disabled-inputs"));
    guessButton.disabled = true;
  } else {
    document
      .querySelector(`.try-${currentTry}`)
      .classList.add("disabled-inputs");
    const currentTryInputs = document.querySelectorAll(
      `.try-${currentTry} input`
    );
    currentTryInputs.forEach((input) => (input.disabled = true));
    currentTry++;
    if (currentTry <= numberOfTries) {
      document
        .querySelector(`.try-${currentTry}`)
        .classList.remove("disabled-inputs");
      nextTryInputs = document.querySelectorAll(`.try-${currentTry} input`);
      nextTryInputs.forEach((input) => (input.disabled = false));
      nextTryInputs[0].focus();
    }
    if (currentTry === numberOfTries + 1) {
      Swal.fire({
        title: "You Lose",
        width: 600,
        padding: "3em",
        color: "#FFF",
        background:
          "#fff url(https://media1.tenor.com/m/VuTjsUwod9cAAAAC/mood-aesthetic.gif)",
        backdrop: `
        rgba(0,0,123,0.4)
        url(https://media1.tenor.com/m/FhF7cOauHTcAAAAC/oyun-bitti-loser.gif)
        top
        no-repeat
      `,
      });
      guessButton.disabled = true;
    }
  }
}
window.onload = function () {
  generateInput();
};
