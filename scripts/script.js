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
// Don't allow selection of the input
quoteInput.addEventListener("select", function () {
    this.selectionStart = this.selectionEnd;
}, false);
// Respond to person typing
quoteInput.addEventListener("input", () => {
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
            charElement.classList.add("correct");
            charElement.classList.remove("incorrect");
        }
        else {
            charElement.classList.remove("correct");
            charElement.classList.add("incorrect");
            correct = false;
        }
    });
    (_a = quoteElement.children[typedValue.length]) === null || _a === void 0 ? void 0 : _a.classList.add("active");
    if (correct) {
        getRandomQuote();
    }
});
const apiCall = function () {
    return fetch(API_URL)
        .then((res) => res.json())
        .then((data) => data.content);
};
function getRandomQuote() {
    return __awaiter(this, void 0, void 0, function* () {
        // Clear input
        quoteInput.value = "";
        quoteElement.textContent = "";
        // Get Quote
        const quote = yield apiCall();
        // Turn every quote character into span element
        quote.split("").forEach((c) => {
            const spanElement = document.createElement("span");
            spanElement.innerText = c;
            quoteElement.appendChild(spanElement);
        });
    });
}
// Navbar open and closing
navBtn.addEventListener("click", function () {
    const navItems = document.querySelector(".nav-items");
    navItems.classList.toggle("open");
    navBtn.classList.toggle("open");
});
getRandomQuote();
