const express = require('express');
require('dotenv').config();
const OpenAI = require('openai');
const app = express();
const port = 3000;
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});
app.get("/", async (req, res) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "user", content: "write a haiku about AI"}
      ]
    });

    res.send(completion.choices[0].message.content);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error generating response");
  }
});

app.listen(port, () => {
  console.log(`app listen at port ${port}`);
})


