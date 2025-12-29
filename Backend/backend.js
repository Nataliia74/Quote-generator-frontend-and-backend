import express from "express";
import cors from "cors";
import { sendEmail } from "./ses_email.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
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
  const { quote, author } = req.body;
  if (author.length < 3 || quote.length < 10) {
    return res.status(400).send({ error: "Missing data!" });
  }

  quotes.push({ quote: quote, author: author });
  return res.status(200).send({ message: "Quote added!" });
});

app.post("/api/ses_email", async (req, res) => {
  try {
    const result = await sendEmail();
    return res.json({ ok: true, messageId: result.MessageId });
  } catch (err) {
    console.error("Email failed:", err);
    return res.status(500).json({ error: "Email failed" });
  }
});

app.listen(port, "0.0.0.0", () => {
  console.error(`Quote server listening on port ${port}`);
});
