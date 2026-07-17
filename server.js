const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const app = express(); // ★これが抜けていました

// CORS設定（フロントエンドからの通信を許可）
app.use(cors()); 

// JSON解析
app.use(express.json());

// 動作確認用ルート
app.get('/', (req, res) => {
    res.send('Server is running!');
});

// AIの初期化
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// 鑑定APIエンドポイント
app.post('/api/tarot-reading', async (req, res) => {
    const { cards } = req.body;

    if (!cards || !Array.isArray(cards)) {
        return res.status(400).json({ message: "カードデータが正しく送信されていません。" });
    }

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
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // ※モデル名は最新に合わせて確認してください
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