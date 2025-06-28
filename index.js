const express = require('express');
require('dotenv').config();
const OpenAI = require('openai');
const app = express();
const port = 3000;
const path = require("path");
app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname , "views"));
app.use(express.static(path.join(__dirname , "public")));

const chatData = [];

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post("/chat", async (req, res) => {
  let userMsg = req.body.msg;
  console.log(userMsg);
  try {
    // const completion = await openai.chat.completions.create({
    //   model: "gpt-3.5-turbo",
    //   messages: [
    //     { role: "system" , content: "You are a professional yet friendly AI doctor. Communicate naturally like a real human doctor — helpful but without sugar-coating or unnecessary texts. Use Hinglish (a mix of Hindi and English) to talk casually yet respectfully. Ask the user relevant health-related questions to understand their symptoms clearly. Based on the condition, suggest home remedies or medicines than can be taken without doctor preciption. If symptoms are unclear, serious, or risky, advise the user to consult a real doctor without hesitation. Keep responses short, practical, and focused to save tokens. Avoid robotic or overly cheerful tone — sound like a real doctor who’s calm,kind,freindly,to-the-point, and actually helpful."},
    //     { role: "user", content: userMsg}
    //   ]
    // });

    // let data = completion.choices[0].message.content;
    // res.json({ reply: data });

    res.json({ reply: "Fake testing reply" });
  } catch (err) {
    console.error("AI error:", err);
    res.status(500).json({ reply: "Server error aayi hai, try again later." });
  }
});


app.get("/home" , (req,res) => {
  res.render("home.ejs")
})



app.listen(port, () => {
  console.log(`app listen at port ${port}`);
})


