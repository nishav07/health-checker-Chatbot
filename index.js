const express = require('express');
require('dotenv').config();
const axios = require('axios');
const app = express();
const port = 3000;
const path = require("path");
app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname , "views"));
app.use(express.static(path.join(__dirname , "public")));

const chatData = [];


app.post("/chat", async (req, res) => {
  let userMsg = req.body.msg;
  console.log(userMsg);

  chatData.push({ role: "user", content: userMsg });

  const messages = [
    {
      role: "system",
      content: "You are a helpful doctor who speaks in Hinglish (Hindi written in English letters). Talk like a real human doctor – friendly but serious when needed. Never give fixed or scripted replies. Respond according to the user's situation, and ask logical follow-up questions like a real doctor would. For example, if someone says 'pair mein dard hai', ask if they fell recently or hit their leg somewhere but in hindi. Ask relevant medical history like age, BP, diabetes in family, etc. Do not use full English unless the user requests it. Avoid sugar-coating or unnecessary jokes. Your tone should feel real and trustworthy.Give home remedies or medicine suggestions only when its needed and you can also suggest blood test accoroding to symptoms, If symptoms are serious or confusing, clearly suggest consulting a real doctor. Keep replies short, practical, and focused."
    },
    ...chatData
  ];
  
  try {
    const APIres = await axios.post("https://api.groq.com/openai/v1/chat/completions", {
      model: "llama3-70b-8192",
      messages: messages
      }, {
      headers: {
        "Authorization": `Bearer ${process.env.groq_api_key}`,
        "Content-Type": "application/json"
      }
    });

    const reply = APIres.data.choices[0].message.content;
    chatData.push({ role: "assistant", content: reply });
    res.json({ reply });
  } catch (err) {
    console.error("AI error:", err);
    res.status(500).json({ reply: "Server se error aayi hai, try again later." });
  }
});


app.get("/home" , (req,res) => {
  res.render("home.ejs")
})



app.listen(port, () => {
  console.log(`app listen at port ${port}`);
})


