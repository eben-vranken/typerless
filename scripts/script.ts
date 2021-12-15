const API_URL = "https://api.quotable.io/random";
const navBtn: HTMLButtonElement = document.querySelector(".nav-btn");
const quoteElement: HTMLElement = document.querySelector(".quote");
const quoteInput: HTMLInputElement = document.querySelector(".quote-input");
const spinningElement: HTMLElement = document.querySelector(".loader");

// Statistic Elements
const timeElement: HTMLElement = document.querySelector(".time");
const wpmElement: HTMLElement = document.querySelector(".wpm");
const mistakesElement: HTMLElement = document.querySelector(".mistakes");

// Statistic Variables
let statistics: Array<any> = [new Date(), 0];

const updateStatistics = function () {
  // Deconstruct statistics
  const [time, mistakes] = statistics;
  // Update time
  const endTime = (new Date().getTime() - time.getTime()) / 1000;
  timeElement.textContent = `${endTime.toFixed(1)}s`;
  // Update wpm
  const wordCount = quoteElement.textContent.split(" h").length;
  const wpm = wordCount / (endTime / 60);
  wpmElement.textContent = `${wpm.toFixed(2)}`;
  // update mistakes
  mistakesElement.textContent = String(Math.ceil(Math.sqrt(mistakes)));
};

// Respond to person typing
quoteInput.addEventListener("input", (e) => {
  const lettersArray: NodeListOf<HTMLSpanElement> =
    quoteElement.querySelectorAll("span");
  const typedValue: Array<string> = quoteInput.value.split("");
  // Add cursor
  let correct = true;
  lettersArray.forEach((charElement, i) => {
    // Remove active class
    quoteElement.children[i]?.classList.remove("active");
    const char = typedValue[i];
    // Prevent future characters & removing characters
    if (char == null) {
      charElement.classList.remove("correct");
      charElement.classList.remove("incorrect");
      correct = false;
    } else if (char === charElement.innerText) {
      // Correct
      charElement.classList.add("correct");
      charElement.classList.remove("incorrect");
    } else {
      // Made a mistake
      statistics[1]++;
      charElement.classList.remove("correct");
      charElement.classList.add("incorrect");
      correct = false;
    }
  });

  // Add cursor
  quoteElement.children[typedValue.length]?.classList.add("active");

  // Finished
  if (correct) {
    updateStatistics();
    getRandomQuote();
  }
});

// Get Random Quote
const apiCall = function () {
  return fetch(API_URL)
    .then((res: Response) => res.json())
    .then((data) => data);
};

async function getRandomQuote() {
  // Clear input
  quoteInput.value = "";
  quoteElement.textContent = "";
  // Enable spinner
  spinningElement.style.display = "block";

  // Get Quote
  const quoteData = await apiCall();

  // Reset statistics
  statistics = [new Date(), 0];

  // Disable loader
  spinningElement.style.display = "none";
  // Turn every quote character into span element
  quoteData.content.split("").forEach((c: string) => {
    const spanElement: HTMLElement = document.createElement("span");
    if (c === " ") {
      spanElement.classList.add("space");
    }
    spanElement.innerText = c;
    quoteElement.appendChild(spanElement);
  });
}

// Don't allow selection of the input
quoteInput.addEventListener(
  "select",
  function () {
    this.selectionStart = this.selectionEnd;
  },
  false
);

// Don't allow any arrows/enter key
quoteElement.addEventListener("keydown", function (e: KeyboardEvent) {
  const illegalCharacters = [
    "ArrowDown",
    "ArrowUp",
    "ArrowLeft",
    "ArrowRight",
    "Enter",
  ];
  console.log(e.key);
  if (illegalCharacters.includes(e.key)) e.preventDefault();
});

// Navbar open and closing
navBtn.addEventListener("click", function () {
  const navItems = document.querySelector(".nav-items");
  navItems.classList.toggle("open");
  navBtn.classList.toggle("open");
});

getRandomQuote();
