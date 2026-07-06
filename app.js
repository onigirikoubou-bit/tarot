const allCards = [
    { number: 0,  name: "愚者", category: "大アルカナ", keywords: ["自由", "冒険", "始まり"], advice: "新しい旅の始まり。恐れずに一歩踏み出しましょう。" },
    { number: 1,  name: "魔術師", category: "大アルカナ", keywords: ["創造", "意志", "技術"], advice: "準備は整いました。意志を持って行動を開始する時です。" },
    { number: 2,  name: "女教皇", category: "大アルカナ", keywords: ["直感", "神秘", "内省"], advice: "直感を信じて。静かに内面と向き合いましょう。" },
    { number: 3,  name: "女帝", category: "大アルカナ", keywords: ["豊かさ", "母性", "創造"], advice: "豊かさの象徴。愛情を注ぎ、創造性を大切にしてください。" },
    { number: 4,  name: "皇帝", category: "大アルカナ", keywords: ["安定", "統率", "責任"], advice: "安定と統率。責任を持ち、着実に計画を進めましょう。" },
    { number: 5,  name: "法王", category: "大アルカナ", keywords: ["伝統", "教育", "導き"], advice: "伝統や精神的な導き。周囲の助言に耳を傾けてください。" },
    { number: 6,  name: "恋人たち", category: "大アルカナ", keywords: ["調和", "選択", "絆"], advice: "調和と選択。心の声に従い、直感を信じて選ぶ時です。" },
    { number: 7,  name: "戦車", category: "大アルカナ", keywords: ["勝利", "前進", "意志"], advice: "勝利と前進。強い意志を持って障害を乗り越えましょう。" },
    { number: 8,  name: "力", category: "大アルカナ", keywords: ["忍耐", "勇気", "信頼"], advice: "忍耐と勇気。力づくではなく、愛と信頼で解決できます。" },
    { number: 9,  name: "隠者", category: "大アルカナ", keywords: ["内省", "探求", "孤独"], advice: "内省の時間。一人の時間を持ち、深く真実を探求しましょう。" },
    { number: 10, name: "運命の輪", category: "大アルカナ", keywords: ["変化", "好機", "サイクル"], advice: "変化の訪れ。流れに身を任せ、チャンスを掴みましょう。" },
    { number: 11, name: "正義", category: "大アルカナ", keywords: ["公平", "判断", "バランス"], advice: "公平とバランス。冷静に判断し、誠実に行動しましょう。" },
    { number: 12, name: "吊るされた男", category: "大アルカナ", keywords: ["試練", "視点", "手放し"], advice: "今は動く時ではありません。じっくり待ち、視点を変えましょう。" },
    { number: 13, name: "死神", category: "大アルカナ", keywords: ["終焉", "再生", "変容"], advice: "終わりと再生。執着を手放し、新しいステージへ進みましょう。" },
    { number: 14, name: "節制", category: "大アルカナ", keywords: ["調和", "調整", "献身"], advice: "調整と調和。心と身体のバランスを整えましょう。" },
    { number: 15, name: "悪魔", category: "大アルカナ", keywords: ["誘惑", "依存", "束縛"], advice: "誘惑からの解放。依存や固定観念を断ち切る時です。" },
    { number: 16, name: "塔", category: "大アルカナ", keywords: ["崩壊", "解放", "劇的変化"], advice: "劇的な変化。崩壊は再出発のため。恐れず受け入れましょう。" },
    { number: 17, name: "星", category: "大アルカナ", keywords: ["希望", "憧れ", "インスピレーション"], advice: "希望とインスピレーション。未来を信じて夢を描きましょう。" },
    { number: 18, name: "月", category: "大アルカナ", keywords: ["不安", "幻影", "直感"], advice: "不安と迷い。直感を研ぎ澄まし、見えない真実を見極めて。" },
    { number: 19, name: "太陽", category: "大アルカナ", keywords: ["活力", "成功", "純粋"], advice: "成功と活力。明るいエネルギーが味方します。自信を持って。" },
    { number: 20, name: "審判", category: "大アルカナ", keywords: ["復活", "決断", "覚醒"], advice: "復活と決断。過去の結果を受け入れ、新たな道へ進みましょう。" },
    { number: 21, name: "世界", category: "大アルカナ", keywords: ["完成", "成就", "調和"], advice: "完成と成就。努力が実を結び、素晴らしい調和が訪れます。" },

        // --- ワンド (情熱・行動) ---14
{ number: "Ace", name: "ワンドのエース", category: "小アルカナ", keywords: ["情熱", "芽生え", "創造"], advice: "情熱の芽生え。新しいチャンスや意欲が湧いてきます。" },
{ number: 2, name: "ワンドの2", category: "小アルカナ", keywords: ["計画", "展望", "選択"], advice: "計画の段階。未来を見据えて戦略を練る時です。" },
{ number: 3, name: "ワンドの3", category: "小アルカナ", keywords: ["発展", "準備", "拡大"], advice: "発展と拡大。準備を終え、いよいよ動き出す時です。" },
{ number: 4, name: "ワンドの4", category: "小アルカナ", keywords: ["祝賀", "調和", "安らぎ"], advice: "祝賀と調和。安らぎを感じ、努力の結果を楽しみましょう。" },
{ number: 5, name: "ワンドの5", category: "小アルカナ", keywords: ["競い合い", "葛藤", "成長"], advice: "競い合い。意見の衝突があるかもしれませんが、成長の糧になります。" },
{ number: 6, name: "ワンドの6", category: "小アルカナ", keywords: ["勝利", "称賛", "自信"], advice: "勝利と称賛。自信を持って進みましょう。" },
{ number: 7, name: "ワンドの7", category: "小アルカナ", keywords: ["防御", "勇気", "信念"], advice: "防御と粘り強さ。困難に直面しても、自分の信念を貫いて。" },
{ number: 8, name: "ワンドの8", category: "小アルカナ", keywords: ["進展", "スピード", "急変"], advice: "急速な進展。物事がスピーディーに動く時です。" },
{ number: 9, name: "ワンドの9", category: "小アルカナ", keywords: ["忍耐", "防御", "持続"], advice: "忍耐と防御。ゴールは近いです。最後まで気を抜かずに。" },
{ number: 10, name: "ワンドの10", category: "小アルカナ", keywords: ["重圧", "責任", "負担"], advice: "重圧。抱え込みすぎです。荷を下ろして休むことも大切です。" },
{ number: "Page", name: "ワンドのペイジ", category: "小アルカナ", keywords: ["好奇心", "メッセージ", "熱意"], advice: "新しいメッセージや好奇心。純粋な情熱を大切に。" },
{ number: "Knight", name: "ワンドのナイト", category: "小アルカナ", keywords: ["冒険", "行動", "衝動"], advice: "冒険と行動。衝動的でも、まずはやってみることが吉。" },
{ number: "Queen", name: "ワンドのクイーン", category: "小アルカナ", keywords: ["自信", "自立", "魅力"], advice: "自信と自立。明るく情熱的で、周囲を巻き込む力があります。" },
{ number: "King", name: "ワンドのキング", category: "小アルカナ", keywords: ["リーダーシップ", "決断", "情熱"], advice: "リーダーシップと情熱。決断力を持って全体を導きましょう。" },

// --- カップ (愛情・人間関係) ---14
{ number: "Ace", name: "カップのエース", category: "小アルカナ", keywords: ["愛情", "豊かさ", "受容"], advice: "新しい愛や感情の始まり。心の満たされる喜びを感じて。" },
{ number: 2, name: "カップの2", category: "小アルカナ", keywords: ["絆", "調和", "協力"], advice: "パートナーシップと調和。互いに支え合い、理解し合える時。" },
{ number: 3, name: "カップの3", category: "小アルカナ", keywords: ["友情", "喜び", "共感"], advice: "友情と分かち合い。仲間と共に楽しい時間を過ごしましょう。" },
{ number: 4, name: "カップの4", category: "小アルカナ", keywords: ["倦怠", "無関心", "内省"], advice: "退屈や無関心。目の前のチャンスに気づいて。少し見方を変えてみて。" },
{ number: 5, name: "カップの5", category: "小アルカナ", keywords: ["喪失", "悲しみ", "後悔"], advice: "喪失感。過ぎたことを悔やむより、残されたものに目を向けましょう。" },
{ number: 6, name: "カップの6", category: "小アルカナ", keywords: ["回想", "純粋", "癒やし"], advice: "懐かしさや純粋さ。過去の経験や思い出がヒントをくれます。" },
{ number: 7, name: "カップの7", category: "小アルカナ", keywords: ["選択", "空想", "迷い"], advice: "選択肢が多い迷い。空想だけでなく、現実的な目標を絞りましょう。" },
{ number: 8, name: "カップの8", category: "小アルカナ", keywords: ["探求", "旅立ち", "解放"], advice: "探求と旅立ち。今の環境を離れ、より深い意味を求めて進む時。" },
{ number: 9, name: "カップの9", category: "小アルカナ", keywords: ["充足", "幸福", "達成"], advice: "幸福と充足。願いが叶う予兆。自分自身を誇りに思って。" },
{ number: 10, name: "カップの10", category: "小アルカナ", keywords: ["至福", "家族", "調和"], advice: "幸福な家庭や絆。周囲の人々との深い結びつきを感じましょう。" },
{ number: "Page", name: "カップのペイジ", category: "小アルカナ", keywords: ["直感", "想像", "感受性"], advice: "直感と想像力。心温まるメッセージや、夢見る力が芽生えます。" },
{ number: "Knight", name: "カップのナイト", category: "小アルカナ", keywords: ["ロマン", "招待", "優しさ"], advice: "ロマンと招待。感情に従い、優雅にアプローチする時。" },
{ number: "Queen", name: "カップのクイーン", category: "小アルカナ", keywords: ["共感", "癒やし", "慈愛"], advice: "共感と癒やし。優しい心で他者に寄り添い、内面を大切に。" },
{ number: "King", name: "カップのキング", category: "小アルカナ", keywords: ["寛容", "安定", "成熟"], advice: "大人の感情コントロール。感情を落ち着かせ、寛容さを持って接して。" },

// --- ソード (思考・決断) ---14
{ number: "Ace", name: "ソードのエース", category: "小アルカナ", keywords: ["決断", "論理", "突破"], advice: "鋭い知性と決断力。真実を見抜き、新たな視点で切り開く時。" },
{ number: 2, name: "ソードの2", category: "小アルカナ", keywords: ["葛藤", "均衡", "迷い"], advice: "板挟みや葛藤。あえて目を閉じて、心を落ち着かせ整理する時間。" },
{ number: 3, name: "ソードの3", category: "小アルカナ", keywords: ["痛み", "悲しみ", "受容"], advice: "心の痛み。悲しみを受け入れることで、回復への道が開かれます。" },
{ number: 4, name: "ソードの4", category: "小アルカナ", keywords: ["休息", "回復", "静寂"], advice: "休息と回復。今は戦いを止め、心身を静かに休める時です。" },
{ number: 5, name: "ソードの5", category: "小アルカナ", keywords: ["争い", "敗北", "後悔"], advice: "争いと後味の悪さ。勝ち負けに執着せず、距離を置く勇気も必要。" },
{ number: 6, name: "ソードの6", category: "小アルカナ", keywords: ["移行", "癒やし", "出発"], advice: "困難からの脱出。より穏やかな場所へ向かうための旅立ち。" },
{ number: 7, name: "ソードの7", category: "小アルカナ", keywords: ["戦略", "機転", "隠密"], advice: "機転と戦略。正面突破が難しい時は、知恵を使って切り抜けましょう。" },
{ number: 8, name: "ソードの8", category: "小アルカナ", keywords: ["束縛", "制限", "孤立"], advice: "自縄自縛。自分で制限を作っていませんか？視点を変えれば自由になれます。" },
{ number: 9, name: "ソードの9", category: "小アルカナ", keywords: ["不安", "苦悩", "ストレス"], advice: "悪夢や不安。考えすぎによるストレスです。まずは眠って心を軽くして。" },
{ number: 10, name: "ソードの10", category: "小アルカナ", keywords: ["終焉", "浄化", "再起"], advice: "どん底。すべてが終わり、新しい夜明けを迎える準備ができました。" },
{ number: "Page", name: "ソードのペイジ", category: "小アルカナ", keywords: ["観察", "警戒", "知性"], advice: "観察と警戒。好奇心を持って情報を集め、冷静に状況を見極めて。" },
{ number: "Knight", name: "ソードのナイト", category: "小アルカナ", keywords: ["推進", "思考", "直進"], advice: "スピードと知性。目的のために一直線。周囲の状況確認も忘れずに。" },
{ number: "Queen", name: "ソードのクイーン", category: "小アルカナ", keywords: ["公正", "自立", "鋭敏"], advice: "冷静な判断と自立。感情に流されず、公平で賢明な決断を。" },
{ number: "King", name: "ソードのキング", category: "小アルカナ", keywords: ["権威", "規律", "真実"], advice: "公正と権威。高い視点を持ち、論理的かつ的確に物事を判断して。" },

// --- ペンタクル (現実・仕事) ---14
{ number: "Ace", name: "ペンタクルのエース", category: "小アルカナ", keywords: ["豊かさ", "チャンス", "物質"], advice: "豊かさの始まり。新しい仕事や資産運用のチャンスです。" },
{ number: 2, name: "ペンタクルの2", category: "小アルカナ", keywords: ["柔軟性", "バランス", "変化"], advice: "バランスと柔軟性。複数のことを並行しながら上手くこなしましょう。" },
{ number: 3, name: "ペンタクルの3", category: "小アルカナ", keywords: ["協力", "技術", "評価"], advice: "チームワークと技術。協力して取り組むことで、確かな評価が得られます。" },
{ number: 4, name: "ペンタクルの4", category: "小アルカナ", keywords: ["安定", "所有", "執着"], advice: "安定と執着。堅実ですが、守りすぎて機会を逃さないよう注意して。" },
{ number: 5, name: "ペンタクルの5", category: "小アルカナ", keywords: ["欠乏", "孤立", "苦難"], advice: "不安や困窮。助けを求めることを恐れないで。外には温かい場所があります。" },
{ number: 6, name: "ペンタクルの6", category: "小アルカナ", keywords: ["分かち合い", "寛大", "循環"], advice: "分かち合い。助け合いが巡り巡って、豊かさをもたらします。" },
{ number: 7, name: "ペンタクルの7", category: "小アルカナ", keywords: ["収穫", "熟考", "見直し"], advice: "収穫の準備。努力の結果を待ち、今までの過程を振り返る時。" },
{ number: 8, name: "ペンタクルの8", category: "小アルカナ", keywords: ["習熟", "努力", "専門"], advice: "努力と習熟。コツコツと専門性を高めることが、将来の成功に繋がります。" },
{ number: 9, name: "ペンタクルの9", category: "小アルカナ", keywords: ["自立", "贅沢", "成果"], advice: "自立と贅沢。自分自身の努力で築いた豊かさを楽しみましょう。" },
{ number: 10, name: "ペンタクルの10", category: "小アルカナ", keywords: ["繁栄", "基盤", "永続"], advice: "永続的な繁栄。家系や伝統、長期的な安定が手に入るでしょう。" },
{ number: "Page", name: "ペンタクルのペイジ", category: "小アルカナ", keywords: ["学習", "計画", "実行"], advice: "学習と計画。新しいスキルや現実的な目標に向かって学ぼうとする心。" },
{ number: "Knight", name: "ペンタクルのナイト", category: "小アルカナ", keywords: ["勤勉", "誠実", "着実"], advice: "勤勉と誠実。着実で真面目な姿勢が、確実な成果を導きます。" },
{ number: "Queen", name: "ペンタクルのクイーン", category: "小アルカナ", keywords: ["安心", "包容力", "現実的"], advice: "安心と包容力。現実的な豊かさを慈しみ、周囲を支える力。" },
{ number: "King", name: "ペンタクルのキング", category: "小アルカナ", keywords: ["成功", "管理", "安定"], advice: "経済的な安定と成功。富を管理し、安定した基盤を作り上げる人。" }

];

// 逆位置のニュアンス（バリエーション10選）
const reverseRules = [
    "ただし、今はその力が少し空回りしています。一度立ち止まって見直しましょう。",
    "今はエネルギーが内向的になっています。焦らずに準備を整える時期です。",
    "本来の良さが少し過剰に出ているようです。バランスを意識してください。",
    "少し停滞気味です。無理に動かず、今は現状維持が吉かもしれません。",
    "外部からの影響を受けやすく、少し混乱しやすい時です。自分の軸を大切に。",
    "今は少し時期尚早かもしれません。結果を急がず、プロセスの見直しを。",
    "本来の目的から少し外れている可能性があります。もう一度目標を確認してみてください。",
    "過信や慢心が影を落としているようです。謙虚な姿勢が解決の鍵になります。",
    "今はまだ表面化していない問題があるようです。慎重なリサーチを心がけて。",
    "少しエネルギーが停滞しています。環境を変えるか、気分転換を取り入れると良いでしょう。",
    "今は無理に結果を求めず、充電期間として自分を労ってください。",
    "過去のパターンに囚われているようです。新しい視点を取り入れてみましょう。",
    "周囲への配慮が少し不足しているかもしれません。協調性を意識すると好転します。",
    "今は決断を下すタイミングではありません。もう少し情報を集めるのが賢明です。",
    "見落としがあるかもしれません。細部まで丁寧にチェックし直してみてください。",
    "感情的になりやすい時です。一呼吸置いてから行動するとトラブルを避けられます。",
    "今は遠回りに見える道が、実は一番の近道かもしれません。",
    "自分自身を過小評価しているようです。もっと自信を持って取り組んで大丈夫です。",
    "予期せぬ変化が起きやすい時です。柔軟な心で対応できるように備えましょう。",
    "焦る気持ちが空回りを生んでいます。深呼吸してリラックスしましょう。"
];

// 3. アドバイスを取得する関数
function getAdvice(card) {
    if (!card.isReversed) {
        return card.advice;
    }
    
    // 逆位置の場合、ランダムに補足文を選んで追加する
    const randomRule = reverseRules[Math.floor(Math.random() * reverseRules.length)];
    
    // 「逆カード」の部分を <span style="color: red;"> で囲みます
    const label = '<span style="color: red;">逆カード</span>';
    return `${card.advice}（${label}：${randomRule}）`;
}

// 2. 占う関数（HTMLの onclick で呼ばれる関数）
function draw(num) {
    const shuffled = [...allCards].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, num).map(card => {
        // 逆位置を50%の確率で判定
        const isReversed = Math.random() < 0.5;
        return { ...card, isReversed };
    });

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = ''; 
    
    selected.forEach((card) => {
    const cardElement = document.createElement('div');
    cardElement.className = 'card-item';
    
    // ① ここで nameRotation 変数を生成する
    const nameRotation = card.isReversed ? 'style="transform: rotate(180deg);"' : '';

    // ② アニメーション用のクラス付与など
    setTimeout(() => {
        cardElement.classList.add('appear');
    }, 10); 

    if (card.isReversed) {
        cardElement.classList.add('is-reversed');
    }

    // ③ ここで nameRotation を使う
    cardElement.innerHTML = `
        <div class="card-meta">${card.category} / No.${card.number}</div>
        <div class="name-container" ${nameRotation}>
            <h3>${card.name}${card.isReversed ? " (逆カード)" : ""}</h3>
        </div>
        <p class="card-advice" style="text-align: left;">${getAdvice(card)}</p>
    `;
    
    resultDiv.appendChild(cardElement);
});

// 鑑定結果を表示するエリアを取得します（HTMLに id="reading-result" が必要です）
    const readingDiv = document.getElementById('reading-result');
    if (readingDiv) {
        const resultMessage = generateComprehensiveReading(selected);
        readingDiv.innerText = resultMessage;
        console.log("表示された結果:", resultMessage); // F12で確認用
    } else {
        alert("エラー：#reading-result が見つかりません！");
    }
}

function analyzeSpread(selectedCards) {
    let counts = {
        "大アルカナ": 0,
        "ワンド": 0,
        "カップ": 0,
        "ソード": 0,
        "ペンタクル": 0
    };

    // カウント処理
    selectedCards.forEach(card => {
        if (card.category === "大アルカナ") {
            counts["大アルカナ"]++;
        } else {
            // 名前にスートが含まれているか判定
            if (card.name.includes("ワンド")) counts["ワンド"]++;
            if (card.name.includes("カップ")) counts["カップ"]++;
            if (card.name.includes("ソード")) counts["ソード"]++;
            if (card.name.includes("ペンタクル")) counts["ペンタクル"]++;
        }
    });

    return counts;
}

const interpretationRules = [
    {
        // ルール: 大アルカナが多い時
        check: (counts) => counts["大アルカナ"] >= 2,
        message: "運命の大きな流れを感じる時です。目の前のことだけでなく、長期的な視野で人生の転換点にいることを意識してください。"
    },
    {
        // ルール: ワンド（情熱）が過半数の時
        check: (counts) => counts["ワンド"] >= 2,
        message: "今は行動力が鍵です。情熱が空回りしやすい時でもありますが、まずは動くことで道が開けます。"
    },
    {
        // ルール: ソード（思考）が過半数の時
        check: (counts) => counts["ソード"] >= 2,
        message: "論理的な思考が冴え渡っています。しかし、考えすぎて頭でっかちにならないよう注意が必要です。"
    },
    // ...このようにスートの組み合わせルールを増やしていく
];


// 2. カウントと解釈を行うメイン関数
function generateReading(selectedCards) {
    // カウント初期化
    let counts = { "大アルカナ": 0, "ワンド": 0, "カップ": 0, "ソード": 0, "ペンタクル": 0 };

    // カウント処理
    selectedCards.forEach(card => {
        if (card.category === "大アルカナ") {
            counts["大アルカナ"]++;
        } else {
            if (card.name.includes("ワンド")) counts["ワンド"]++;
            if (card.name.includes("カップ")) counts["カップ"]++;
            if (card.name.includes("ソード")) counts["ソード"]++;
            if (card.name.includes("ペンタクル")) counts["ペンタクル"]++;
        }
    });

    // ルールに基づいてメッセージを生成
    let adviceMessages = rules
        .filter(rule => rule.check(counts))
        .map(rule => rule.message);

    // 結果が空なら標準メッセージを返す
    return adviceMessages.length > 0 
        ? adviceMessages.join(" ") 
        : "今は運気が安定しており、心身ともにバランスが取れています。自然体で過ごすのが一番です。";
}

/**
 * 3枚のカードから総合的なメッセージを生成する関数
 * @param {Array} selectedCards - 引いたカードの配列
 */
function generateComprehensiveReading(selectedCards) {
    let counts = { "大アルカナ": 0, "ワンド": 0, "カップ": 0, "ソード": 0, "ペンタクル": 0 };

    selectedCards.forEach(card => {
        if (card.category === "大アルカナ") {
            counts["大アルカナ"]++;
        } else {
            if (card.name.includes("ワンド")) counts["ワンド"]++;
            if (card.name.includes("カップ")) counts["カップ"]++;
            if (card.name.includes("ソード")) counts["ソード"]++;
            if (card.name.includes("ペンタクル")) counts["ペンタクル"]++;
        }
    });

    // ★ここが重要：ルールを上から順にチェックして、当てはまるメッセージを配列に入れる
    let messages = [];
    rules.forEach(rule => {
        // rule.check() に引数(counts, selectedCards)を渡して判定
        if (rule.check(counts, selectedCards)) {
            messages.push(rule.message);
        }
    });

    // ★もしメッセージがあれば結合して返す。なければデフォルトを返す
    return messages.length > 0 ? messages.join(" ") : "今は運気が安定しており、心身ともにバランスが取れています。自然体で過ごすのが一番です。";
}

    // 3. ルールセット（すべてのパターンを統合）
const rules = [
    // --- 1枚引き専用ルール ---
    { 
        // ★修正：() を (counts, selectedCards) に変えるだけ！
        check: (counts, selectedCards) => selectedCards.length === 1 && counts["大アルカナ"] === 1, 
        message: "今は大きな運命の波が、あなた一人にフォーカスしています。このカードの持つ意味を、人生の大きなヒントとして受け取ってください。" 
    },

    // --- 2枚引き専用ルール ---
    { 
        check: (counts, selectedCards) => selectedCards.length === 2 && (counts["ワンド"] === 2 || counts["カップ"] === 2 || counts["ソード"] === 2 || counts["ペンタクル"] === 2), 
        message: "同じエネルギーのカードが2枚揃いました。その分野が今のあなたの運勢を強力に後押ししています。迷わず突き進んでください。" 
    },

    // --- 組み合わせルール（すべて同様に書き換えます） ---
    { check: (counts, selectedCards) => counts["ワンド"] >= 1 && counts["ペンタクル"] >= 1, message: "情熱と現実的な努力が合致しています。ビジネスやキャリアにおいて、目に見える大きな成果が得られるでしょう。" },
    { check: (counts, selectedCards) => counts["ワンド"] >= 1 && counts["カップ"] >= 1, message: "クリエイティブな活動が充実します。自分の情熱を注ぐことが、身近な人との絆を深めることにも繋がります。" },
    { check: (counts, selectedCards) => counts["ワンド"] >= 1 && counts["ソード"] >= 1, message: "戦略的実行の時。綿密な計画を立て、それを即座に実行に移すことで困難を突破できる時です。" },
    { check: (counts, selectedCards) => counts["カップ"] >= 1 && counts["ソード"] >= 1, message: "冷静さを保ちつつ相手に寄り添う、賢い対人関係が築ける時です。" },
    { check: (counts, selectedCards) => counts["カップ"] >= 1 && counts["ペンタクル"] >= 1, message: "心穏やかな時間が、将来への安心感を生む安定した時期です。" },
    { check: (counts, selectedCards) => counts["ソード"] >= 1 && counts["ペンタクル"] >= 1, message: "論理的な計画が経済的な安定を生みます。無駄を省き、賢く管理できる時です。" },
    
    // --- 通常の重視ルール（すべて同様に書き換えます） ---
    { check: (counts, selectedCards) => counts["大アルカナ"] >= 2, message: "運命の大きな転換点です。目先の細かなことより、長期的な視野で人生の方向性を意識してください。" },
    { check: (counts, selectedCards) => counts["ワンド"] >= 2, message: "情熱が高まっています。今は深く考えるより、まずは一歩動くことが結果に結びつきます。" },
    { check: (counts, selectedCards) => counts["カップ"] >= 2, message: "感情が豊かになっています。人間関係の調和や、自分の心の内面と向き合うことが鍵となります。" },
    { check: (counts, selectedCards) => counts["ソード"] >= 2, message: "論理的な思考が冴え渡っています。情報を整理し、戦略を練るのに最適な時期です。" },
    { check: (counts, selectedCards) => counts["ペンタクル"] >= 2, message: "着実な成果が期待できます。仕事の基盤作りなど、形になることに取り組んでみてください。" }
];

// 鑑定ボタンを押した時の処理（例）
function onDrawCards() {
    // 1. カードを引く処理（あなたの既存のコード）
    let selectedCards = drawThreeCards(); 
    
    // 2. 鑑定文を生成
    let message = generateComprehensiveReading(selectedCards);
    
    // 3. HTMLの表示エリアに書き込む
    document.getElementById("reading-result").innerHTML = message;
}