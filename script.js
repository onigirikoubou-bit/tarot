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

    // 履歴表示に合わせた変数定義
    const isReversed = card.isReversed;
    const borderColor = isReversed ? '#ff69b4' : '#333';
    const bgColor = '#fff';
    const displayName = isReversed ? `${card.name} (逆)` : card.name;
    const meaning = isReversed ? card.reversed_meaning : card.upright_meaning;
    const nameClass = isReversed ? 'rotated' : ''; // 必要に応じてクラスを付与

    // 逆位置の回転用スタイル
    const rotationStyle = isReversed ? 'transform: rotate(180deg);' : '';

    // 履歴表示と完全に同一のスタイル
    cardElement.style.cssText = `
        width: 200px; min-height: 300px; margin: 10px; padding: 15px;
        border: 2px solid ${borderColor}; border-radius: 15px; background: ${bgColor};
        display: inline-block; vertical-align: top; color: #333;
        text-align: center; box-sizing: border-box; cursor: pointer;
    `;

    // 履歴表示と完全に同一の構造
    cardElement.innerHTML = `
        <p style="font-size:0.7rem; color:#888; margin:0;">${card.category}</p>
        <hr style="border:0; border-top:1px solid ${borderColor}; margin:8px 0;">
        <h4 style="margin:5px 0; color:#333; font-size:1.1rem; min-height:3em;">
            <span class="${nameClass}" style="display:inline-block; ${rotationStyle}">${displayName}</span>
        </h4>
        <p style="font-size:0.85rem; color:#333; margin:10px 0 0 0; line-height:1.4;">${meaning}</p>
    `;

    // クリックイベント（画像表示）
    cardElement.onclick = function() {
        const modal = document.getElementById('history-modal');
        const modalBody = document.getElementById('modal-body');
        const imagePath = window.getCardImagePath(card);
        modalBody.innerHTML = `<img src="${imagePath}" style="width:100%; border-radius:15px;">`;
        modal.style.display = 'block';
    };

    resultDiv.appendChild(cardElement);
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

        const isReversed = card.isReversed;
        const borderColor = isReversed ? '#ff69b4' : '#333';
        const bgColor = '#fff';
        const displayName = isReversed ? `${card.name} (逆)` : card.name;
        const meaning = isReversed ? card.reversed_meaning : card.upright_meaning;
        const nameClass = isReversed ? 'rotated' : '';
        const rotationStyle = isReversed ? 'transform: rotate(180deg);' : '';

        // 画像パスの取得（window.getCardImagePath があればそれを優先、なければ id から生成）
        const imagePath = typeof window.getCardImagePath === 'function' 
            ? window.getCardImagePath(card) 
            : `images/${card.id}.jpg`;

        // 共通スタイル（cursor: pointer を確実に効かせる）
        cardElement.style.cssText = `
            width: 200px !important;
            min-height: 300px !important;
            margin: 10px !important;
            padding: 15px !important;
            border: 2px solid ${borderColor} !important;
            border-radius: 15px !important;
            background: ${bgColor} !important;
            display: inline-block !important;
            vertical-align: top !important;
            color: #333 !important;
            text-align: center !important;
            box-sizing: border-box !important;
            cursor: pointer !important;
        `;

        // テキスト状態のHTML
        const textHTML = `
            <p style="font-size:0.7rem; color:#888; margin:0;">${card.category}</p>
            <hr style="border:0; border-top:1px solid ${borderColor}; margin:8px 0;">
            <h4 style="margin:5px 0; color:#333; font-size:1.1rem; min-height:3em;">
                <span class="${nameClass}" style="display:inline-block; ${rotationStyle}">${displayName}</span>
            </h4>
            <p style="font-size:0.85rem; color:#333; margin:10px 0 0 0; line-height:1.4;">${meaning}</p>
        `;

        // 画像状態のHTML
        const imageHTML = `
            <img src="${imagePath}" style="width:100%; height:270px; border-radius:10px; object-fit:cover; display:block;">
        `;

        // 初期状態はテキスト
        cardElement.innerHTML = textHTML;

        // クリックで「テキスト ⇔ 画像」を切り替えるトグル処理
        let isShowingImage = false;
        cardElement.onclick = function() {
            if (!isShowingImage) {
                cardElement.innerHTML = imageHTML;
                isShowingImage = true;
            } else {
                cardElement.innerHTML = textHTML;
                isShowingImage = false;
            }
        };
        
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

// ★ ここにスクロール処理を追加する
evaluationDiv.scrollIntoView({ 
    behavior: 'smooth', // スムーズにスクロールさせる
    block: 'start'      // 要素の先頭が画面の上部にくるようにする
});

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
window.showHistoryDetail = function(index) {
    const history = JSON.parse(localStorage.getItem('tarotHistory') || '[]');
    const item = history[index];
    if (!item) return;
    
    const modal = document.getElementById('history-modal');
    const modalBody = document.getElementById('modal-body');
    
    // 中身をクリア ＋ 全体の文字色をはっきりした黒（#222）に指定
    modalBody.innerHTML = '';
    modalBody.style.color = '#222222';
    
    // タイトル（日付など）の文字色を黒に明示
    const title = document.createElement('h3');
    title.innerText = `鑑定日時: ${item.date}`;
    title.style.color = '#222222';
    modalBody.appendChild(title);
    
    // 一括で画像表示を切り替えるためのボタン
    const toggleButton = document.createElement('button');
    toggleButton.innerText = '🖼️ 画像を表示';
    toggleButton.style.cssText = `
        display: block; margin: 15px auto; padding: 10px 20px;
        font-size: 1rem; cursor: pointer; border-radius: 8px;
        background-color: #3498db; color: #fff; border: none;
    `;
    modalBody.appendChild(toggleButton);

    // カードエリアを作成
    const cardArea = document.createElement('div');
    cardArea.style.textAlign = 'center';
    
    const cardElements = [];

    item.cards.forEach(card => {
        const cardElement = document.createElement('div');

        const isReversed = card.isReversed;
        const borderColor = isReversed ? '#ff69b4' : '#333';
        const bgColor = '#fff';
        const displayName = isReversed ? `${card.name} (逆)` : card.name;
        const meaning = isReversed ? card.reversed_meaning : card.upright_meaning;
        const nameClass = isReversed ? 'rotated' : '';
        const rotationStyle = isReversed ? 'transform: rotate(180deg);' : '';

        const imagePath = typeof window.getCardImagePath === 'function' 
            ? window.getCardImagePath(card) 
            : `images/${card.id}.jpg`;

        // カード自体のスタイル（枠サイズは維持しつつ、画像表示時はパディングを0にしてギリギリまで広げる）
        cardElement.style.cssText = `
            width: 200px !important;
            min-height: 300px !important;
            margin: 10px !important;
            padding: 15px !important;
            border: 2px solid ${borderColor} !important;
            border-radius: 15px !important;
            background: ${bgColor} !important;
            display: inline-block !important;
            vertical-align: top !important;
            color: #222222 !important;
            text-align: center !important;
            box-sizing: border-box !important;
            position: relative;
            overflow: hidden;
        `;

        // テキスト状態のHTML（文字色は濃い黒に統一）
        const textHTML = `
            <p style="font-size:0.7rem; color:#555555; margin:0;">${card.category}</p>
            <hr style="border:0; border-top:1px solid ${borderColor}; margin:8px 0;">
            <h4 style="margin:5px 0; color:#222222; font-size:1.1rem; min-height:3em;">
                <span class="${nameClass}" style="display:inline-block; ${rotationStyle}">${displayName}</span>
            </h4>
            <p style="font-size:0.85rem; color:#333333; margin:10px 0 0 0; line-height:1.4;">${meaning}</p>
        `;

        // ★画像状態のHTML（カード枠の余白 padding を相殺して、枠の端ギリギリまで大きく表示）
        const imageHTML = `
            <img src="${imagePath}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; border-radius: 13px; display: block;">
        `;

        cardElement.innerHTML = textHTML;
        
        cardElement.dataset.isImage = "false";
        cardElement.dataset.textHTML = textHTML;
        cardElement.dataset.imageHTML = imageHTML;

        cardElements.push(cardElement);
        cardArea.appendChild(cardElement);
    });
    
    modalBody.appendChild(cardArea);

    // ボタンを押したときの切り替え処理
    let isAllImages = false;
    toggleButton.onclick = function() {
        isAllImages = !isAllImages;
        cardElements.forEach(el => {
            if (isAllImages) {
                // 画像にする時はカード側の余白 padding をなくして画像を端までフィットさせる
                el.style.padding = '0';
                el.innerHTML = el.dataset.imageHTML;
                toggleButton.innerText = '📝 テキスト表示';
                toggleButton.style.backgroundColor = '#e67e22';
            } else {
                // テキストに戻す時は元のパディング（15px）を復元
                el.style.padding = '15px';
                el.innerHTML = el.dataset.textHTML;
                toggleButton.innerText = '🖼️ すべてのカードを画像に切り替える';
                toggleButton.style.backgroundColor = '#3498db';
            }
        });
    };
    
    // AIメッセージエリア（文字色をしっかりした黒・濃いグレーに指定）
    const msgDiv = document.createElement('div');
    msgDiv.style.cssText = "margin-top: 20px; color: #222222 !important; line-height: 1.6;";
    msgDiv.innerHTML = item.message ? item.message.replace(/\n/g, '<br>') : '';
    modalBody.appendChild(msgDiv);
    
    modal.style.display = 'block';
};

// --- カードリセット機能（カードを表示しているエリアのIDを'card-area'と想定） ---
window.resetCards = function() {
    console.log("リセット処理開始");

    // 1. 画面表示のクリア
    const resultArea = document.getElementById('result');
    if (resultArea) {
        resultArea.innerHTML = '';
    }
    
    // 2. データの完全リセット（重要：ここが抜けていた！）
    window.drawnCards = [];
    window.remainingDeck = [];
    
    // 3. 鑑定結果エリアのクリア
    const aiArea = document.getElementById('ai-message-area');
    if (aiArea) aiArea.innerHTML = '';

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