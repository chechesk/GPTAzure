require('dotenv').config();
const axios = require('axios');

const ChatGpt = async (req, res) => {
  const { message } = req.body;

  try {
    // Craft a comprehensive prompt based on the user's question (message)
    const prompt = `Provide a detailed response to the following MERN specialist prompt, incorporating insights from best practices and addressing potential challenges:

${message}

**Additional considerations (optional):**

* Focus on specific areas of the MERN stack (e.g., MongoDB query optimization, Express.js middleware design, React component performance, Node.js asynchronous programming).
* Provide code examples or diagrams to illustrate concepts.
* Tailor the response to the user's level of expertise (beginner, intermediate, advanced).

**Example format:**

**Introduction:** Briefly introduce the prompt and its significance for MERN specialists.

**Explanation:** Deliver a thorough explanation, addressing key points and best practices.

**Code Examples (if applicable):** Include relevant code snippets or diagrams to enhance clarity.

**Conclusion:** Summarize the main takeaways and offer additional resources (optional).
`;

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

module.exports = ChatGpt;