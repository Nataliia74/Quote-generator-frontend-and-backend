from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from ses_email import send_email
import random

app = FastAPI()
port = 3000

app.add_middleware(
    CORSMiddleware,
    allow_origins = ["*"],
    allow_methods = ["*"],
    allow_headers = ["*"],
)

quotes = [
  {
    "quote":
      "Either write something worth reading or do something worth writing.",
    "author": "Benjamin Franklin",
  },
  {
    "quote": "I should have been more kind.",
    "author": "Clive James",
  },
]

@app.get("/api/quotes")
def get_quote():
    return random.choice(quotes)

class Quote(BaseModel):
    quote: str
    author: str

@app.post("/api/quotes")
def add_quote(quote: Quote):
    if len(quote.quote) <3 or len(quote.author) < 10:
        raise HTTPException(status_code=400, detail="Missing data!")
    quotes.append({"quote": quote.quote, "author": quote.author})
    return {"message": "Success. Quote added!"}

@app.post("/api/ses_email")
async def ses_email():
    try:
        result = await send_email()
        return {"ok": True, "messageId": result["messageId"] }
    except Exception as err:
        print("Email failed", err)
        raise HTTPException(status_code=500, detail="Email failed")


        
    

