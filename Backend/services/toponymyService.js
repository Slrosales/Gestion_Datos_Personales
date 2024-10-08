const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require('@google/generative-ai');

dotenv.config(); // Carga las variables de entorno

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function getToponymy(name) {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt =
        `Proporciona el origen del nombre "${name}" según la toponimia.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
    return text;
}

module.exports = getToponymy;
