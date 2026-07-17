// --- グローバル変数 ---
let tarotDeck = [];
let remainingDeck = []; 
let drawnCards = [];    
const MAX_CARDS = 7; // 最大枚数の定数

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
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = ''; 
    
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
function requestAIEvaluation() {
    if (drawnCards.length === 0) {
        alert("まだカードを引いていません。");
        return;
    }
    
    // ここでAIに drawnCards を渡して解釈してもらう
    console.log("AIに送信するカードリスト:", drawnCards);
    // ...AI呼び出し処理
}
