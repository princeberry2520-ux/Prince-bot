const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const TOKEN = "EAAVNV...PASTE YOUR FULL TOKEN HERE...";
const VERIFY_TOKEN = "prince123";

app.get('/', (req, res) => {
  res.send('Prince Bot is Running!');
});

app.get('/webhook', (req, res) => {
  if (req.query['hub.verify_token'] === VERIFY_TOKEN) {
    res.send(req.query['hub.challenge']);
  } else {
    res.sendStatus(403);
  }
});

app.post('/webhook', async (req, res) => {
  const msg = req.body.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
  if (msg) {
    const from = msg.from;
    const text = msg.text?.body || "Hello";
    await axios.post(`https://graph.facebook.com/v20.0/743872256122032/messages`, {
      messaging_product: "whatsapp",
      to: from,
      text: { body: "You said: " + text + " - Prince Bot 🤖" }
    }, {
      headers: { Authorization: `Bearer ${TOKEN}` }
    });
  }
  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Live on ' + PORT));
