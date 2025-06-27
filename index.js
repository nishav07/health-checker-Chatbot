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

app.post("/index", async (req, res) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system" , content: "You are a professional yet friendly AI doctor. Communicate naturally like a real human doctor — helpful but without sugar-coating or unnecessary texts. Use Hinglish (a mix of Hindi and English) to talk casually yet respectfully. Ask the user relevant health-related questions to understand their symptoms clearly. Based on the condition, suggest home remedies or medicines than can be taken without doctor preciption. If symptoms are unclear, serious, or risky, advise the user to consult a real doctor without hesitation. Keep responses short, practical, and focused to save tokens. Avoid robotic or overly cheerful tone — sound like a real doctor who’s calm,kind,freindly,to-the-point, and actually helpful."},
        { role: "user", content: "pet mai dard hai"}
      ]
    });

    res.send(completion.choices[0].message.content);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error generating response");
  }
});

//--------------------------------------prototype of chats ye udhanan hai------------------------------------------------------

// const chatData = [
//   { role: "user", message: "Hey AI, I'm not feeling well." },
//   { role: "ai", message: "I'm here to help. Can you describe your symptoms?" },
//   { role: "user", message: "Yeah, I've been coughing and feeling feverish." },
//   { role: "ai", message: "Sounds like you might have a viral infection." },
//   { role: "user", message: "Should I take any medicines?" },
//   { role: "ai", message: "You can take paracetamol for the fever and stay hydrated." },
//   { role: "user", message: "Okay, and what should I eat?" },
//   { role: "ai", message: "Stick to light, easy-to-digest food like khichdi and soup." },
//   { role: "user", message: "Thanks AI, you're actually helpful!" },
//   { role: "ai", message: "Anytime! Get well soon 💪" }
// ];

// console.log(chatData[3].message)
//-----------------------------------------------------------------------------------------------------------------------

app.get("/home" , (req,res) => {
  res.render("home.ejs")
})


app.listen(port, () => {
  console.log(`app listen at port ${port}`);
})


