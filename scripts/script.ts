const API_URL = "https://api.quotable.io/random";
const navBtn: HTMLButtonElement = document.querySelector(".nav-btn");
const quoteElement: HTMLElement = document.querySelector(".quote");
const quoteInput: HTMLInputElement = document.querySelector(".quote-input");
const spinningElement: HTMLElement = document.querySelector(".loader");
// Don't allow selection of the input
quoteInput.addEventListener(
  "select",
  function () {
    this.selectionStart = this.selectionEnd;
  },
  false
);

// Respond to person typing
quoteInput.addEventListener("input", () => {
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
      charElement.classList.add("correct");
      charElement.classList.remove("incorrect");
    } else {
      charElement.classList.remove("correct");
      charElement.classList.add("incorrect");
      correct = false;
    }
  });

  quoteElement.children[typedValue.length]?.classList.add("active");
  if (correct) {
    getRandomQuote();
  }
});

const apiCall = function () {
  return fetch(API_URL)
    .then((res: Response) => res.json())
    .then((data) => data.content);
};

async function getRandomQuote() {
  // Clear input
  quoteInput.value = "";
  quoteElement.textContent = "";
  // Enable spinner
  spinningElement.style.display = "block";

  // Get Quote
  const quote: string = await apiCall();

  // Disable loader
  spinningElement.style.display = "none";
  // Turn every quote character into span element
  quote.split("").forEach((c: string) => {
    const spanElement: HTMLElement = document.createElement("span");
    spanElement.innerText = c;
    quoteElement.appendChild(spanElement);
  });
}

// Navbar open and closing
navBtn.addEventListener("click", function () {
  const navItems = document.querySelector(".nav-items");
  navItems.classList.toggle("open");
  navBtn.classList.toggle("open");
});

getRandomQuote();
