"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const API_URL = "https://api.quotable.io/random";
const navBtn = document.querySelector(".nav-btn");
const quoteElement = document.querySelector(".quote");
const quoteInput = document.querySelector(".quote-input");
const spinningElement = document.querySelector(".loader");
// Statistic Elements
const timeElement = document.querySelector(".time");
const wpmElement = document.querySelector(".wpm");
const mistakesElement = document.querySelector(".mistakes");
// Statistic Variables
let statistics = [new Date(), 0];
const updateStatistics = function () {
    // Deconstruct statistics
    const [time, mistakes] = statistics;
    // Update time
    const endTime = (new Date().getTime() - time.getTime()) / 1000;
    timeElement.textContent = `${endTime.toFixed(1)}s`;
    // Update wpm
    const wordCount = quoteElement.textContent.split(" ").length;
    const wpm = wordCount / (endTime / 60);
    wpmElement.textContent = `${wpm.toFixed(2)}`;
    // update mistakes
    mistakesElement.textContent = String(Math.ceil(Math.sqrt(mistakes)));
};
// Respond to person typing
quoteInput.addEventListener("input", (e) => {
    var _a;
    const lettersArray = quoteElement.querySelectorAll("span");
    const typedValue = quoteInput.value.split("");
    // Add cursor
    let correct = true;
    lettersArray.forEach((charElement, i) => {
        var _a;
        // Remove active class
        (_a = quoteElement.children[i]) === null || _a === void 0 ? void 0 : _a.classList.remove("active");
        const char = typedValue[i];
        // Prevent future characters & removing characters
        if (char == null) {
            charElement.classList.remove("correct");
            charElement.classList.remove("incorrect");
            correct = false;
        }
        else if (char === charElement.innerText) {
            // Correct
            charElement.classList.add("correct");
            charElement.classList.remove("incorrect");
        }
        else {
            // Made a mistake
            statistics[1]++;
            charElement.classList.remove("correct");
            charElement.classList.add("incorrect");
            correct = false;
        }
    });
    // Add cursor
    (_a = quoteElement.children[typedValue.length]) === null || _a === void 0 ? void 0 : _a.classList.add("active");
    // Finished
    if (correct) {
        updateStatistics();
        getRandomQuote();
    }
});
// Get Random Quote
const apiCall = function () {
    return fetch(API_URL)
        .then((res) => res.json())
        .then((data) => data);
};
function getRandomQuote() {
    return __awaiter(this, void 0, void 0, function* () {
        // Clear input
        quoteInput.value = "";
        quoteElement.textContent = "";
        // Enable spinner
        spinningElement.style.display = "block";
        // Get Quote
        const quoteData = yield apiCall();
        // Reset statistics
        statistics = [new Date(), 0];
        // Disable loader
        spinningElement.style.display = "none";
        // Turn every quote character into span element
        quoteData.content.split("").forEach((c) => {
            const spanElement = document.createElement("span");
            if (c === " ") {
                spanElement.classList.add("space");
            }
            spanElement.innerText = c;
            quoteElement.appendChild(spanElement);
        });
    });
}
// Don't allow selection of the input
quoteInput.addEventListener("select", function () {
    this.selectionStart = this.selectionEnd;
}, false);
// Don't allow any arrows/enter key
quoteElement.addEventListener("keydown", function (e) {
    const illegalCharacters = [
        "ArrowDown",
        "ArrowUp",
        "ArrowLeft",
        "ArrowRight",
        "Enter",
    ];
    console.log(e.key);
    if (illegalCharacters.includes(e.key))
        e.preventDefault();
});
// Navbar open and closing
navBtn.addEventListener("click", function () {
    const navItems = document.querySelector(".nav-items");
    navItems.classList.toggle("open");
    navBtn.classList.toggle("open");
});
getRandomQuote();
