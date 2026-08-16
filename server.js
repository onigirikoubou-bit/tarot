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
    const { cards } = req.body;

    if (!cards || !Array.isArray(cards)) {
        return res.status(400).json({ message: "カードデータが正しく送信されていません。" });
    }

    const cardInfoText = cards.map((c, index) => {
        const pos = c.isReversed ? "逆位置" : "正位置";
        return `${index + 1}枚目: ${c.name} (${pos}) - 意味: ${c.isReversed ? c.reversed_meaning : c.upright_meaning}`;
    }).join('\n');

    // サーバー側（例）での受け取りイメージ
const { cards, persona, category } = req.body;

// AIへ送るプロンプトの例
const prompt = `あなたは「${persona}」タイプのタロット占い師です。
今回は「${category}」に関する相談について、以下のカードを元に鑑定してください。
良いカードならば前向きになれるような導きを、そうでないならば注意すべき点を示した上で、どうすれば良い方向性に向かうのかを提示してください。
恋愛、夫婦間、人間関係、就職・転職がカテゴリーで選択されている際には、迷わず突き進むべきか、一旦立ち止まるべきなのかを根拠を示した上で判断してください。
...`;



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