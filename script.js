// --- グローバル変数 ---
let tarotDeck = [];
let remainingDeck = []; 
let drawnCards = [];    
const MAX_CARDS = 7; // 最大枚数の定数

// script.js の一番下にこれだけ追記してください
window.generateReading = generateReading;

// --- 1. カードデータの読み込み ---
async function loadCards() {
    try {
        const response = await fetch('cards.json');
        tarotDeck = await response.json();
        console.log("カード読み込み成功");
    } catch (e) {
        console.error("カード読み込み失敗:", e);
        alert("cards.json が読み込めませんでした。ローカルサーバー経由で開いているか確認してください。");
    }
}
loadCards();


// --- 3. ボタンから呼ばれる入り口 ---
function handleDraw() {
    // 初回またはリセット後のカード準備
    if (remainingDeck.length === 0 && drawnCards.length === 0) {
        remainingDeck = [...tarotDeck].sort(() => 0.5 - Math.random());
        document.getElementById('result').innerHTML = '';
    }

    // 制限チェック
    if (drawnCards.length >= MAX_CARDS) {
        alert(`カードは最大${MAX_CARDS}枚までです。これ以上は引けません。`);
        return;
    }

    // 1枚引く
    if (remainingDeck.length > 0) {
        const card = remainingDeck.pop();
        const drawnCard = { ...card, isReversed: Math.random() < 0.5 };
        
        drawnCards.push(drawnCard); // 記録に追加
        appendSingleCard(drawnCard); // 画面に表示
    }
}

function appendSingleCard(card) {
    const resultDiv = document.getElementById('result');
    const cardElement = document.createElement('div');
    
    // --- 1. 正位置でネガティブとされるカードのリスト ---
    const negativeInUpright = [
        "吊るされた男", "死神", "悪魔", "塔", "月", 
        "ソードの3", "ソードの5", "ソードの7", "ソードの9", "ソードの10", 
        "カップの5", "カップの8", "ワンドの5", "ワンドの10", "ペンタクルの5"
    ];
    
    // --- 2. 背景色の判定ロジック ---
    let isNegativeDisplay = false;
    
    if (!card.isReversed) {
        // 【正位置】リストにあればピンク
        isNegativeDisplay = negativeInUpright.includes(card.name);
    } else {
        // 【逆位置】「正位置ネガティブリスト」にないものならピンク、あれば白
        isNegativeDisplay = !negativeInUpright.includes(card.name);
    }
    
    // --- 3. クラス名の決定 ---
    let classes = ["card-item"];
    if (isNegativeDisplay) classes.push("negative");
    if (card.isReversed) classes.push("is-reversed");
    
    cardElement.className = classes.join(" ");
    
    // --- 4. HTML生成 ---
    const displayName = card.isReversed ? `${card.name} (逆)` : card.name;
    
    cardElement.innerHTML = `
        <div class="card-meta">${card.category}</div>
        <div class="name-container"><h3>${displayName}</h3></div>
        <div class="card-advice">
            <p><strong>キーワード:</strong> ${card.keywords.join(', ')}</p>
            <p>${card.isReversed ? card.reversed_meaning : card.upright_meaning}</p>
        </div>
    `;
    
    resultDiv.appendChild(cardElement);
    setTimeout(() => cardElement.classList.add('appear'), 10);
}

// リセット用関数（必要に応じてHTMLに追加してください）
function resetDeck() {
    remainingDeck = [];
    drawnCards = [];
    document.getElementById('result').innerHTML = '';
    document.getElementById('ai-evaluation').innerHTML = '';
}

// --- 4. 画面表示処理 ---
function displayCards(selectedCards) {
    const displayArea = document.getElementById('card-display-area'); // 変更
    displayArea.innerHTML = ''; 
    
    selectedCards.forEach((card) => {
        const cardElement = document.createElement('div');
        
        // negativeクラスとis-reversedクラスを付与
        cardElement.className = `card-item ${card.isReversed ? 'negative is-reversed' : ''}`;
        
        // カード名に (逆) を付けるロジックを追加
        const displayName = card.isReversed ? `${card.name} (逆)` : card.name;
        
        cardElement.innerHTML = `
            <div class="card-meta">${card.category}</div>
            <div class="name-container">
                <h3>${displayName}</h3>
            </div>
            <div class="card-advice">
                <p><strong>キーワード:</strong> ${card.keywords.join(', ')}</p>
                <p>${card.isReversed ? card.reversed_meaning : card.upright_meaning}</p>
            </div>
        `;
        
        resultDiv.appendChild(cardElement);
    });
}

// AIへ依頼する関数
async function generateReading() {
    console.log("ボタンが押されました！鑑定を開始します。"); // ★これを追加
    if (drawnCards.length === 0) {
        alert("先にカードを引いてください！");
        return;
    }

    const evaluationDiv = document.getElementById('ai-evaluation');
    evaluationDiv.innerHTML = "鑑定中...AIがカードの並びからメッセージを読み取っています...";

    // AIに渡すカード情報の文字列を作成
    const cardInfoText = drawnCards.map((c, index) => {
        const pos = c.isReversed ? "逆位置" : "正位置";
        return `${index + 1}枚目: ${c.name} (${pos}) - キーワード: ${c.keywords.join(', ')}`;
    }).join('\n');

    // Gemini APIに投げるプロンプト
    const prompt = `
あなたはプロのタロット占い師です。以下のカードの並びから、ユーザーの悩みに対する鑑定結果を書いてください。
トーンは優しく、しかし心に深く届くような言葉でお願いします。

---
${cardInfoText}
---

上記の結果から、全体的なストーリーを読み解き、鑑定文を作成してください。
`;

    try {
        // ★ここを書き換えます
        const response = await fetch('https://tarot-8qlz.onrender.com/api/tarot-reading', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            // バックエンドが受け取れるように drawnCards をそのまま渡します
            body: JSON.stringify({ cards: drawnCards }), 
        });

        if (!response.ok) {
            throw new Error('サーバーからの応答がありません');
        }

        const data = await response.json();
        
        // ★鑑定結果を画面に表示
        evaluationDiv.innerHTML = `<h3>鑑定結果</h3><p>${data.message.replace(/\n/g, '<br>')}</p>`;

    } catch (error) {
        console.error('通信エラー:', error);
        evaluationDiv.innerHTML = "申し訳ありません、鑑定中にエラーが発生しました。もう一度試してください。";
    }
}

async function requestAIEvaluation(drawnCards) {

    // 1. 結果表示エリアを取得
    const messageArea = document.getElementById('ai-message-area'); // 変更
    messageArea.innerHTML = data.message.replace(/\n/g, '<br>');
    if (!resultDiv) {
        console.error("ai-evaluation エリアが見つかりません");
        return;
    }

    // 2. カードデータを確認
    if (typeof drawnCards === 'undefined' || drawnCards.length === 0) {
        alert("カードを引いてから押してください。");
        return;
    }

    resultDiv.innerText = "鑑定中...";

    try {
        // 3. サーバへのリクエスト（ここはご自身の既存コードに合わせて修正してください）
        // おそらく既存の generateReading() で使っている fetch 先と同じはずです
        const response = await fetch('https://tarot-8qlz.onrender.com/api/tarot-reading', { // ここを既存の正しいエンドポイントに合わせる必要があります
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cards: drawnCards })
        });

        const data = await response.json();
        
        // 4. 結果を画面に反映
        if (data && data.message) {
    // 改行コード（\n）をHTMLの改行タグ（<br>）に変換して表示する
    resultDiv.innerHTML = data.message.replace(/\n/g, '<br>');
} else {
    resultDiv.innerText = "エラー: 正しい形式のデータが受け取れませんでした";
}

    } catch (error) {
        console.error("通信エラー:", error);
        resultDiv.innerText = "通信に失敗しました。";
    }
}