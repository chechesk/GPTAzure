require('dotenv').config();
const axios = require('axios');

const ChatGptGeneral = async (req, res) => {
  const { userId, message, response } = req.body;

  try {
    // Craft a comprehensive prompt based on the user's question (message)
    const prompt = message;

    
    const response = await axios.post(
      process.env.AZURE_OPENAI_ENDPOINT,
      {
        messages: [
          { role: 'user', content: prompt },
        ],
        // Consider adding parameters like temperature, max_tokens, etc.
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'api-key': process.env.AZURE_OPENAI_API_KEY,
        },
      }
    );

    res.json(response.data.choices[0].message.content);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error processing the request' });
  }
};

module.exports = ChatGptGeneral;