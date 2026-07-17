// npm install express cors dotenv @google/generative-ai
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(cors({
    origin: 'https://github.com/onigirikoubou-bit/tarot', // ここを実際のURLに書き換え
    methods: ['POST']
}));
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/api/tarot-reading', async (req, res) => {
    const { cards } = req.body;

    // プロンプト作成
    const cardInfoText = cards.map((c, index) => {
        const pos = c.isReversed ? "逆位置" : "正位置";
        return `${index + 1}枚目: ${c.name} (${pos}) - 意味: ${c.isReversed ? c.reversed_meaning : c.upright_meaning}`;
    }).join('\n');

    const prompt = `
あなたはプロのタロット占い師です。以下のカードの並びから、ユーザーの悩みに対する鑑定結果を書いてください。
トーンは優しく、しかし心に深く届くような言葉でお願いします。
鑑定結果はHTMLタグ等は含めず、自然な文章で出力してください。

---
${cardInfoText}
---
`;

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-3.5-flash" });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        res.json({ message: response.text() });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "鑑定中にエラーが発生しました。" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));