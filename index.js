const express = require('express');
require('dotenv').config();
const OpenAI = require('openai');
const app = express();
const port = 3000;
const path = require("path");

app.use(express.urlencoded({ extended:true }));
app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname , "views"));
app.use(express.static(path.join(__dirname , "public")));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});
app.get("/index", async (req, res) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system" , content: "you're a doctor who is polite and talk in english and you can suggest medicines"},
        { role: "user", content: "pet mai dard hai"}
      ]
    });

    res.send(completion.choices[0].message.content);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error generating response");
  }
});

app.get("/home" , (req,res) => {
  res.render("home.ejs")
})

app.listen(port, () => {
  console.log(`app listen at port ${port}`);
})


