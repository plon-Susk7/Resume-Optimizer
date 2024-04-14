const {GoogleGenerativeAI} = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI('AIzaSyAIRNUh9_3wKKASbh11dnYEnPvxHoU9Swg');



const getResumeSummary = async (req, res) => {
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});

    const prompt = "Write a story about a magic backpack."

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    res.status(200).send(text);
}


module.exports = {getResumeSummary};