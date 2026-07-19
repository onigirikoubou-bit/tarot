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
    
    // --- 1. 背景色の判定ロジック ---
    const negativeInUpright = [
        "吊るされた男", "死神", "悪魔", "塔", "月", 
        "ソードの3", "ソードの5", "ソードの7", "ソードの9", "ソードの10", 
        "カップの5", "カップの8", "ワンドの5", "ワンドの10", "ペンタクルの5"
    ];
    let isNegativeDisplay = !card.isReversed ? negativeInUpright.includes(card.name) : !negativeInUpright.includes(card.name);
    
    // --- 2. クラス名の決定 ---
    let classes = ["card-item"];
    if (isNegativeDisplay) classes.push("negative");
    if (card.isReversed) classes.push("is-reversed");
    cardElement.className = classes.join(" ");
    
    // --- 3. スタイルを固定（二重枠とバラバラなサイズを解消） ---
    cardElement.style.cssText = `
        width: 150px; min-height: 260px; margin: 10px; padding: 15px;
        display: inline-block; vertical-align: top; 
        border: 2px solid ${card.isReversed ? '#ff69b4' : '#333'};
        border-radius: 15px; background: ${card.isReversed ? '#fff0f5' : '#fff'};
        box-sizing: border-box; text-align: center; cursor: pointer;
    `;
    
    // --- 4. 中身の作成（onclickをHTMLに書かない！） ---
    const displayName = card.isReversed ? `${card.name} (逆)` : card.name;
    cardElement.innerHTML = `
        <div class="card-meta" style="font-size:0.7rem; color:#888;">${card.category}</div>
        <hr style="border:0; border-top:1px solid ${card.isReversed ? '#ff69b4' : '#333'}; margin:8px 0;">
        <div class="name-container">
            <h4 style="margin:5px 0; font-size:1.1rem;">${displayName}</h4>
        </div>
        <div class="card-advice" style="font-size:0.85rem; margin-top:10px;">
            <p><strong>キーワード:</strong> ${card.keywords.join(', ')}</p>
            <p>${card.isReversed ? card.reversed_meaning : card.upright_meaning}</p>
        </div>
    `;
    
    // --- 5. ここでクリックイベントを安全に登録 ---
    const imagePath = window.getCardImagePath(card);
    cardElement.addEventListener('click', function() {
        this.style.padding = "0"; // 画像表示時に枠内の余白を消す
        this.innerHTML = `<img src="${imagePath}" style="width:100%; height:100%; border-radius:13px; object-fit:cover;">`;
    });
    
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
window.showHistoryDetail = function(index) {
    const history = JSON.parse(localStorage.getItem('tarotHistory') || '[]');
    const item = history[index];
    if (!item) return;
    
    const modal = document.getElementById('history-modal');
    const modalBody = document.getElementById('modal-body');
    
    // 中身をクリア
    modalBody.innerHTML = '';
    
    // タイトルなどの追加
    const title = document.createElement('h3');
    title.innerText = `鑑定日時: ${item.date}`;
    modalBody.appendChild(title);
    
    // カードエリアを作成
    const cardArea = document.createElement('div');
    cardArea.style.textAlign = 'center';
    
    item.cards.forEach(card => {
        const cardElement = document.createElement('div');
        const imagePath = window.getCardImagePath(card);
        
        // 共通スタイル設定
        cardElement.style.cssText = `
            width: 150px; min-height: 260px; margin: 10px; padding: 10px;
            display: inline-block; vertical-align: top; border: 2px solid #333;
            border-radius: 15px; background: #fff; box-sizing: border-box; cursor: pointer;
        `;
        
        // クリックで画像へ切り替え
        cardElement.addEventListener('click', function() {
            this.innerHTML = `<img src='${imagePath}' style='width:100%; height:100%; border-radius:10px; object-fit:cover;'>`;
        });
        
        const displayName = card.isReversed ? `${card.name} (逆)` : card.name;
        cardElement.innerHTML = `
            <div style="font-size:0.7rem; color:#888;">${card.category}</div>
            <h4 style="margin:5px 0;">${displayName}</h4>
            <div style="font-size:0.8rem;">${card.isReversed ? card.reversed_meaning : card.upright_meaning}</div>
        `;
        
        cardArea.appendChild(cardElement);
    });
    
    modalBody.appendChild(cardArea);
    
    // メッセージの表示
    const msgDiv = document.createElement('div');
    msgDiv.style.marginTop = "20px";
    msgDiv.innerHTML = item.message ? item.message.replace(/\n/g, '<br>') : '';
    modalBody.appendChild(msgDiv);
    
    modal.style.display = 'block';
};


    // 引数なしで定義します
async function requestAIEvaluation() {
        const cardsToEvaluate = typeof drawnCards !== 'undefined' ? drawnCards : window.drawnCards;

    // 1. カードデータを確認
    if (!cardsToEvaluate || cardsToEvaluate.length === 0) {
        alert("カードを引いてから押してください。");
        return;
    }

    // 2. 結果表示エリアを取得
    const evaluationDiv = document.getElementById('ai-message-area');
    if (!evaluationDiv) {
        console.error("ai-message-area エリアが見つかりません");
        return;
    }

         // ★ポイント：ここで一度文字色を黒系にして、ハッキリと表示させる
    evaluationDiv.style.color = "#333";
    evaluationDiv.innerText = "鑑定中...AIがカードからのメッセージを読み取っています...";

    try {
        const response = await fetch('https://tarot-8qlz.onrender.com/api/tarot-reading', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cards: cardsToEvaluate })
        });

        if (!response.ok) throw new Error('サーバーエラー');

        const data = await response.json();
        
        if (data && data.message) {
            // ★結果を表示する際は innerHTML で装飾可能に
            evaluationDiv.innerHTML = `<h3>鑑定結果</h3><p>${data.message.replace(/\n/g, '<br>')}</p>`;

            // 結果を保存する関数
function saveReadingToHistory(cards, message) {
    const history = JSON.parse(localStorage.getItem('tarotHistory') || '[]');
    const newEntry = {
        date: new Date().toLocaleString(),
        cards: cards,
        message: message
    };
    
    // 新しい順に保存（最大10件までにする）
    history.unshift(newEntry);
    if (history.length > 10) history.pop();
    
    localStorage.setItem('tarotHistory', JSON.stringify(history));
}

// requestAIEvaluation 内の、結果を表示する部分をこう書き換えます
if (data && data.message) {
    evaluationDiv.innerHTML = `<h3>鑑定結果</h3><p>${data.message.replace(/\n/g, '<br>')}</p>`;
    
    // ★追加：ここで保存を実行！
    saveReadingToHistory(cardsToEvaluate, data.message);
}

        }
    } catch (error) {
        evaluationDiv.innerText = "申し訳ありません、鑑定中にエラーが発生しました。";
    }
}

// --- 履歴の詳細を表示する関数（モーダルを開く） ---
function showHistoryDetail(index) {
    const history = JSON.parse(localStorage.getItem('tarotHistory') || '[]');
    const item = history[index];
    
    if (!item) return;
    
    const modal = document.getElementById('history-modal');
    const modalBody = document.getElementById('modal-body');
    
    // モーダルの中身を作成
    // カード情報を再現（鑑定結果画面のカード表示ロジックを流用）
    const cardsHtml = item.cards.map(card => {
    const isReversed = card.isReversed;
    const displayName = isReversed ? `${card.name} (逆)` : card.name;
    const nameClass = isReversed ? 'rotate-180' : '';
    const meaning = isReversed ? card.reversed_meaning : card.upright_meaning;

    // ★修正ポイント：逆位置なら背景を薄いピンク(#fff0f5)にし、枠線を赤系にする
    const bgColor = isReversed ? '#fff0f5' : '#fff';
    const borderColor = isReversed ? '#ff69b4' : '#333';

    return `
        <div class="card-item" style="width:160px; margin:10px; padding:15px; border:2px solid ${borderColor}; border-radius:15px; background:${bgColor}; display:inline-block; vertical-align:top; color:#333; text-align:center;">
            <!-- ① 大小アルカナ -->
            <p style="font-size:0.7rem; color:#888; margin:0;">${card.category}</p>
            
            <!-- ② 線の仕切り -->
            <hr style="border:0; border-top:1px solid ${borderColor}; margin:8px 0;">
            
            <!-- ③ カード名 (回転あり) -->
            <h4 style="margin:5px 0; color:#333; font-size:1.1rem;">
                <span class="${nameClass}" style="display:inline-block;">${displayName}</span>
            </h4>
            
            <!-- ④ カードの性格（意味） -->
            <p style="font-size:0.85rem; color:#333; margin:10px 0 0 0; line-height:1.4;">${meaning}</p>
        </div>
    `;
}).join('');
}

// 3. モーダル表示関数
// --- 履歴詳細：縦長カード＆ピンク色反映 ---
window.showHistoryDetail = function(index) {
    const history = JSON.parse(localStorage.getItem('tarotHistory') || '[]');
    const item = history[index];
    if (!item) return;
    
    const modal = document.getElementById('history-modal');
    const modalBody = document.getElementById('modal-body');
    
    const cardsHtml = item.cards.map(card => {
        const isReversed = card.isReversed;
        const displayName = isReversed ? `${card.name} (逆)` : card.name;
        const nameClass = isReversed ? 'rotate-180' : '';
        const meaning = isReversed ? card.reversed_meaning : card.upright_meaning;

        const bgColor = isReversed ? '#fff0f5' : '#fff';
        const borderColor = isReversed ? '#ff69b4' : '#333';

        return `
            <div style="width:150px; min-height:260px; margin:10px; padding:15px; border:2px solid ${borderColor}; border-radius:15px; background:${bgColor}; display:inline-block; vertical-align:top; color:#333; text-align:center; box-sizing:border-box;">
                <p style="font-size:0.7rem; color:#888; margin:0;">${card.category}</p>
                <hr style="border:0; border-top:1px solid ${borderColor}; margin:8px 0;">
                <h4 style="margin:5px 0; color:#333; font-size:1.1rem; min-height:3em;">
                    <span class="${nameClass}" style="display:inline-block;">${displayName}</span>
                </h4>
                <p style="font-size:0.85rem; color:#333; margin:10px 0 0 0; line-height:1.4;">${meaning}</p>
            </div>
        `;
    }).join('');

    // ★ここで回答文章を表示するように修正
    modalBody.innerHTML = `
        <h3 style="color:#333; text-align:center;">鑑定日時: ${item.date}</h3>
        <div style="display:flex; flex-wrap:wrap; justify-content:center; margin:20px 0;">${cardsHtml}</div>
        <hr>
        <div style="color:#333; line-height:1.8; margin-top:10px; font-size:15px; text-align:left;">
            ${item.message ? item.message.replace(/\n/g, '<br>') : 'メッセージなし'}
        </div>
    `;
    modal.style.display = 'block';
};

// --- カードリセット機能（カードを表示しているエリアのIDを'card-area'と想定） ---
window.resetCards = function() {
    // resultの中身を空にすることで、カードも文章もすべて消去されます
    const resultArea = document.getElementById('result');
    if (resultArea) {
        resultArea.innerHTML = ''; 
        console.log("鑑定結果（カードと文章）をリセットしました");
    } else {
        alert("リセット対象のエリアが見つかりません。");
    }
};

// 4. モーダルを閉じる関数（重複を解消して一つにまとめました）
function closeModal() {
    const modal = document.getElementById('history-modal');
    if (modal) modal.style.display = 'none';
}

// 5. 画面外クリックで閉じる処理
window.onclick = function(event) {
    const modal = document.getElementById('history-modal');
    if (event.target == modal) {
        closeModal(); // 上の closeModal 関数を再利用
    }
}

// 関数を window オブジェクトに直接登録する
window.toggleHistory = function() {
    const area = document.getElementById('history-area');
    if (!area) {
        console.error("history-area が見つかりません");
        return;
    }

    if (area.style.display === 'none' || area.style.display === '') {
        area.style.display = 'block';
        if (typeof loadAndDisplayHistory === 'function') {
            loadAndDisplayHistory();
        } else {
            console.error("loadAndDisplayHistory 関数が定義されていません");
        }
    } else {
        area.style.display = 'none';
    }
};


// --- 履歴機能を安全に登録 ---

// 1. 履歴描画関数をwindowに登録
window.loadAndDisplayHistory = function() {
    const list = document.getElementById('history-list');
    if (!list) return;
    
    const history = JSON.parse(localStorage.getItem('tarotHistory') || '[]');
    
    if (history.length === 0) {
        list.innerHTML = "<p style='color:#333; text-align:center;'>まだ履歴がありません。</p>";
        return;
    }
    
    list.innerHTML = history.map((item, index) => `
        <div class="history-item" onclick="showHistoryDetail(${index})" 
             style="cursor:pointer; background:#fff; padding:15px; margin-bottom:10px; border:1px solid #ccc; color:#333;">
            <p><strong>鑑定日時: ${item.date}</strong></p>
            <p style="color:#333;">${item.message.substring(0, 40)}...</p>
        </div>
    `).join('');
};

// 2. toggleHistory 関数をwindowに登録
window.toggleHistory = function() {
    const area = document.getElementById('history-area');
    if (!area) return;

    if (area.style.display === 'none' || area.style.display === '') {
        area.style.display = 'block';
        // ここで確実にwindowにある関数を呼ぶ
        window.loadAndDisplayHistory();
    } else {
        area.style.display = 'none';
    }
};

// カードデータからファイル名を生成する関数
window.getCardImagePath = function(card) {
    let filename = "";
    if (card.category === "大アルカナ") {
        filename = `b${String(card.id).padStart(2, '0')}.png`;
    } else {
        const suits = { "ワンド": "w", "ソード": "s", "カップ": "c", "ペンタクル": "p" };
        const suitChar = suits[card.category] || "";
        let rank = card.rank === "Ace" ? "Ace" : (parseInt(card.rank) >= 2 && parseInt(card.rank) <= 10 ? String(card.rank).padStart(2, '0') : card.rank);
        filename = `${suitChar}${rank}.png`;
    }
    return `tcards/${filename}`;
};