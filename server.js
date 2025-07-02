const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/chat', async (req, res) => {
  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', req.body, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error("❌ Error in /chat:", error.response?.data || error.message);
    res.status(error.response?.status || 500).json(error.response?.data || { error: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ ChatGPT proxy server is running on port ${PORT}`);
});
