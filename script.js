// ファイルの冒頭
window.tarotDeck = [];
window.remainingDeck = []; 
window.drawnCards = [];  
window.MAX_CARDS = 7;

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
    // デッキがない、または空なら再生成
    if (window.remainingDeck.length === 0) {
        window.remainingDeck = [...window.tarotDeck].sort(() => 0.5 - Math.random());
    }

    // 制限チェック
    if (window.drawnCards.length >= window.MAX_CARDS) {
        alert(`カードは最大${window.MAX_CARDS}枚までです。`);
        return;
    }

    // 1枚引く
    if (window.remainingDeck.length > 0) {
        const card = window.remainingDeck.pop();
        const drawnCard = { ...card, isReversed: Math.random() < 0.5 };
        
        window.drawnCards.push(drawnCard);
        appendSingleCard(drawnCard);
    }
}

function appendSingleCard(card) {
    const resultDiv = document.getElementById('result');
    const cardElement = document.createElement('div');

    // 逆位置なら回転させるスタイル
    const rotationStyle = card.isReversed ? 'transform: rotate(180deg); display: inline-block;' : '';

    cardElement.style.cssText = `
        width: 150px !important; min-width: 150px !important;
        height: 260px !important; min-height: 260px !important;
        display: inline-block !important; margin: 10px !important;
        padding: 10px !important; border: 2px solid ${card.isReversed ? '#ff69b4' : '#333'} !important;
        border-radius: 15px !important; background-color: #fff !important;
        color: #333 !important; box-sizing: border-box !important;
        text-align: center !important; cursor: pointer !important;
        vertical-align: top !important; position: relative !important;
        flex: 0 0 150px !important;
    `;

    cardElement.innerHTML = `
        <div style="font-size:0.7rem; color:#888;">${card.category}</div>
        <h4 style="margin:5px 0; font-size:1.1rem; color:#333; ${rotationStyle}">
            ${card.isReversed ? card.name + ' (逆)' : card.name}
        </h4>
        <div style="font-size:0.8rem; color:#444;">${card.isReversed ? card.reversed_meaning : card.upright_meaning}</div>
    `;

    // クリックイベントを再登録
    cardElement.onclick = function() {
        const modal = document.getElementById('history-modal');
        const modalBody = document.getElementById('modal-body');
        const imagePath = window.getCardImagePath(card);
        
        console.log("画像パス:", imagePath);
        modalBody.innerHTML = `<img src="${imagePath}" style="width:100%; border-radius:15px;">`;
        modal.style.display = 'block';
    };

    resultDiv.appendChild(cardElement);
}

// リセット用関数（必要に応じてHTMLに追加してください）
function resetCards() {
    console.log("！！リセット関数が呼び出されました！！"); // これを追加
    // 画面クリア
    document.getElementById('result').innerHTML = '';
    
    // 全ての参照を強制的に初期化
    window.drawnCards = [];
    window.remainingDeck = [];
    
    // 鑑定結果エリアがあれば消去
    const aiArea = document.getElementById('ai-message-area');
    if (aiArea) aiArea.innerHTML = '';
    
    console.log("リセット後の枚数:", window.drawnCards.length);
    alert("鑑定結果（カードと文章）をリセットしました");
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
    // 直接 window.drawnCards を参照する
    const cardsToEvaluate = window.drawnCards;
    
    if (cardsToEvaluate.length === 0) {
        alert("鑑定するカードがありません。");
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
    // 大アルカナ
    if (card.category === "大アルカナ") {
        return `tcards/b${String(card.number).padStart(2, '0')}.png`;
    }

    // 小アルカナ：idからスートとランクを抽出
    const suitMap = { "cup": "c", "sword": "s", "wand": "w", "pentacle": "p" };
    const parts = card.id.split('_');
    const suitChar = suitMap[parts[0]];
    let rank = parts[1];

    // ランクのルール変換
    // 01-10はそのまま2桁、それ以外は頭文字を大文字にする
    if (["page", "knight", "queen", "king"].includes(rank)) {
        rank = rank.charAt(0).toUpperCase() + rank.slice(1);
    } else if (rank === "ace") {
        rank = "Ace";
    } else {
        // 数字の01～10
        rank = String(rank).padStart(2, '0');
    }

    return `tcards/${suitChar}${rank}.png`;
};