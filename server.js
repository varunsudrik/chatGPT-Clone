const PORT = 4000;
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const API_KEY = process.env.API_KEY;

//middleware
app.use(express.json());
app.use(cors());

app.post("/completions", async (req, res) => {
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: req.body.message,
        },
      ],
      max_tokens: 100,
    }),
  };
  try {
    const response = await fetch(
      "\n" + "https://api.openai.com/v1/chat/completions",
      options
    );
    const data = await response.json();
    res.send(data);
  } catch (err) {
    console.log(err);
  }
});

// listener
app.listen(PORT, () => {
  console.log(`Port listening on ${PORT}`);
});
