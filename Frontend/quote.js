async function getData() {
  const resp = await fetch(
    "https://quote-gen-backend.hosting.codeyourfuture.io/api/quotes"
  );
  const data = await resp.json();
  document.getElementById(
    "quote"
  ).textContent = `${data.quote} - ${data.author}`;
}

async function postQuote(quote, author) {
  return fetch(
    "https://quote-gen-backend.hosting.codeyourfuture.io/api/quotes",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quote, author }),
    }
  );
}

const genButton = document.getElementById("btn");
genButton.addEventListener("click", getData);

const form = document.getElementById("form");
const errorMsg = document.getElementById("error");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  let author = document.getElementById("inputAuthor").value.trim();
  let quote = document.getElementById("inputQuote").value.trim();

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
    const response = await postQuote(quote, author);

    if (!response.ok) {
      throw new Error("Server error!");
    }
    form.reset();
    errorMsg.innerText = "";
    alert("Thank you for submitting a new quote!");
  } catch (err) {
    errorMsg.innerText = "Something went wrong.Try again!";
  }
});

getData();
