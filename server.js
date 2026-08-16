const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const app = express();

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
    // 1. フロントエンドから送信されたデータを受け取る
    const { cards, persona, category } = req.body;

    if (!cards || !Array.isArray(cards)) {
        return res.status(400).json({ message: "カードデータが正しく送信されていません。" });
    }

    // 2. カード情報をテキスト化
    const cardInfoText = cards.map((c, index) => {
        const pos = c.isReversed ? "逆位置" : "正位置";
        return `${index + 1}枚目: ${c.name} (${pos}) - 意味: ${c.isReversed ? c.reversed_meaning : c.upright_meaning}`;
    }).join('\n');

    // 【修正】サーバー側では document.getElementById は使わず、受け取った変数 category をそのまま使う
    let categorySpecificInstruction = "";
    if (["恋愛", "人間関係", "就職・転職"].includes(category)) {
        categorySpecificInstruction = `今回は「${category}」に関する相談ですので、今の気持ちに素直に従うべきか、一旦ご破算にするべきなのかを、カードの根拠を示した上で必ず判断してください。`;
    }

    // 3. プロンプトを組み立てる
    const prompt = `あなたは「${persona}」タイプのタロット占い師です。
今回は「${category}」に関する相談について、以下のカードを元に鑑定してください。
良いカードならば前向きになれるような導きを、良くないカードが出たら注意すべき点を示した上で、どうすれば良い方向性に向かうのかを提示してください。
${categorySpecificInstruction}

---
${cardInfoText}
---
`;

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-3.5-flash" }); // ※モデル名は最新に合わせて確認してください
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