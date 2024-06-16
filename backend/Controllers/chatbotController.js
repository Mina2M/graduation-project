// const {OpenAI} = require('openai');
import OpenAI from "openai/index.mjs";
const openai = new OpenAI({
  apiKey: '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', // This is the default and can be omitted
});

async function askChatGpt(question) {
  const params = {
    messages: [{ role: 'user', content: question }],
    model: 'gpt-3.5-turbo',
  };
  const chatCompletion = await openai.chat.completions.create(params);
  console.log("chatbot")
console.log(chatCompletion.choices[0].message)
return chatCompletion.choices[0].message;
}

export const askChatbot = async (req, res) => {
    try {
        const { question } = req.body;
        const answer = await askChatGpt(question); 
        console.log('hi chatbot',answer)
        return res.status(200).json({
          success: true,
          data: answer,
        });
      } catch (error) {
        return res.status(400).json({
          success: false,
          error: error.response
            ? error.response.data
            : "There was an issue on the server",
        });
      }
}

export const chatbotController = {
    askChatbot,
}
