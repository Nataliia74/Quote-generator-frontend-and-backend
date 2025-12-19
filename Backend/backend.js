import express from "express";
import path from "path";
import cors from "cors";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(path.resolve("frontend")));
app.use(cors());

const quotes = [
  {
    quote:
      "Either write something worth reading or do something worth writing.",
    author: "Benjamin Franklin",
  },
  {
    quote: "I should have been more kind.",
    author: "Clive James",
  },
];

function pickRandomQuote() {
  const index = Math.floor(Math.random() * quotes.length);
  return quotes[index];
}

app.get("/api/quotes", (req, res) => {
  console.error("Received a request for a quote");
  const quote = pickRandomQuote();
  return res.json(quote);
});

app.post("/api/quotes", (req, res) => {
  console.log("POST /api/quotes BODY:", req.body);

  const { author, quote } = req.body;
  if (!author || !quote) {
    return res.status(400).send("Error");
  }
  quotes.push({ author: author, quote: quote });
  return res.send("ok");
});

app.listen(port, () => {
  console.error(`Quote server listening on port ${port}`);
});
