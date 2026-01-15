// async function getData() {
//   const resp = await fetch(
//     "https://quote-gen-backend.hosting.codeyourfuture.io/api/quotes"
//   );
//   const data = await resp.json();
//   document.getElementById(
//     "quote"
//   ).textContent = `${data.quote} - ${data.author}`;
// }
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function getData() {
    return __awaiter(this, void 0, void 0, function* () {
        const resp = yield fetch("https://quote-gen-backend.hosting.codeyourfuture.io/api/quotes");
        const data = yield resp.json();
        const quoteE1 = document.getElementById("quote");
        if (quoteE1) {
            quoteE1.textContent = `${data.quote} - ${data.author}`;
        }
    });
}
function postQuote(quote, author) {
    return __awaiter(this, void 0, void 0, function* () {
        return fetch("https://quote-gen-backend.hosting.codeyourfuture.io/api/quotes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ quote, author }),
        });
    });
}
const genButton = document.getElementById("btn");
if (genButton) {
    genButton.addEventListener("click", getData);
}
const form = document.getElementById("form");
const errorMsg = document.getElementById("error");
if (form && errorMsg) {
    form.addEventListener("submit", function (e) {
        return __awaiter(this, void 0, void 0, function* () {
            e.preventDefault();
            const authorInput = document.getElementById("inputAuthor");
            const quoteInput = document.getElementById("inputQuote");
            if (!authorInput || !quoteInput)
                return;
            const author = authorInput.value.trim();
            const quote = quoteInput.value.trim();
            if (author.length < 3) {
                errorMsg.innerText =
                    "The Author field should contain at least 3 characters";
                return;
            }
            if (quote.length < 10) {
                errorMsg.innerText =
                    "The Quote field should contain at least 10 characters";
                return;
            }
            try {
                const response = yield postQuote(quote, author);
                if (!response.ok) {
                    throw new Error("Server error!");
                }
                form.reset();
                errorMsg.innerText = "";
                alert("Thank you for submitting a new quote!");
            }
            catch (err) {
                errorMsg.innerText = "Something went wrong.Try again!";
            }
        });
    });
}
getData();
export {};
//# sourceMappingURL=quote.js.map