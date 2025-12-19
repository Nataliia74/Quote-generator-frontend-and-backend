async function getData() {
  const resp = await fetch("/api/quotes");
  const data = await resp.json();
  document.getElementById(
    "quote"
  ).textContent = `"${data.quote}" - ${data.author}`;
}

async function postQuote(author, quote) {
  return await fetch("/api/quotes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ author, quote }),
  });
}

const genButton = document.getElementById("btn");
genButton.addEventListener("click", getData);

const addButton = document.getElementById("btnAdd");
addButton.addEventListener("click", () => {
  let author = document.getElementById("inputAuthor").value;
  let quote = document.getElementById("inputQuote").value;
  postQuote(author, quote);
  document.getElementById("inputAuthor").value = "";
  document.getElementById("inputQuote").value = "";
});

getData();
