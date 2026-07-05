const allCards = [
    // 大アルカナ
    { name: "愚者", advice: "新しい冒険の始まりです。常識にとらわれず、直感を信じて一歩踏み出しましょう。" },
    { name: "魔術師", advice: "準備は整いました。あなたの創造力を発揮し、具体的な行動に移す時です。" },
    { name: "女教皇", advice: "今は静かに内省し、直感を研ぎ澄ます時です。冷静な判断が求められています。" },
    { name: "女帝", advice: "豊かさと愛情に満ちています。周囲の人への優しさが良い結果を生むでしょう。" },
    { name: "皇帝", advice: "リーダーシップを発揮しましょう。目標に向かって規律正しく進むことが大切です。" },
    { name: "教皇", advice: "伝統や精神的な学びを大切にしてください。信頼できる誰かのアドバイスが鍵となります。" },
    { name: "恋人たち", advice: "大切な決断の時です。自分の心に正直になり、調和を大切に選択してください。" },
    { name: "戦車", advice: "勢いよく進むべき時です。強い意志を持って障害を乗り越えていきましょう。" },
    { name: "力", advice: "力ずくではなく、忍耐と信頼で問題を解決できる時です。自分を信じてください。" },
    { name: "隠者", advice: "一度立ち止まって、自分自身と深く向き合いましょう。答えは内にあります。" },
{ name: "正義", advice: "公平な判断が求められています。感情に流されず、客観的な視点でバランスを取ることが大切です。" },
{ name: "吊るされた男", advice: "今は動かないことが最善の策です。視点を変えることで新しい気づきが得られるでしょう。" },
{ name: "死神", advice: "一つの物事が終わり、新しいステージへ向かう時です。変化を恐れずに受け入れましょう。" },
{ name: "節制", advice: "調和と調整を心がけてください。無理をせず、中庸を守ることで物事がスムーズに進みます。" },
{ name: "悪魔", advice: "執着や誘惑にとらわれていませんか？自分を縛り付けているものから解放される勇気を持ちましょう。" },
{ name: "塔", advice: "予期せぬ変化が起こるかもしれません。しかし、それは不要なものを崩し、再構築するためのチャンスです。" },
{ name: "星", advice: "希望の光が見えています。理想を高く持ち、夢に向かって前向きに進んでいきましょう。" },
{ name: "月", advice: "不安や迷いがあるかもしれませんが、それは内面の深さの表れです。直感を頼りに一歩ずつ進みましょう。" },
{ name: "太陽", advice: "成功と喜びの時です。エネルギーに満ち溢れていますので、自信を持って目標に向かってください。" },
{ name: "審判", advice: "これまでの努力が報われ、再生や復活のチャンスが訪れます。過去の経験を糧にしましょう。" },
{ name: "世界", advice: "完成と達成のカードです。努力が報われ、すべてが調和する完璧な状態を迎えるでしょう。" },

// 小アルカナ
    { suit: "ワンド (火)", theme: "情熱、エネルギー、創造性" },
    { suit: "カップ (水)", theme: "感情、人間関係、愛情" },
    { suit: "ソード (風)", theme: "思考、理性、決断" },
    { suit: "ペンタクル (地)", theme: "現実、物質、仕事、経済" },
    // --- ワンド (情熱・行動) ---
{ name: "ワンドのエース", type: "minor", suit: "wand", advice: "新しい情熱やプロジェクトの始まりです。直感を信じて一歩踏み出しましょう。" },
{ name: "ワンドの2", type: "minor", suit: "wand", advice: "計画の段階です。視野を広げ、将来の展望をしっかりと見据えてください。" },
{ name: "ワンドの3", type: "minor", suit: "wand", advice: "努力の成果が見え始めています。成功に向けて次のステップへ進む準備を。" },
{ name: "ワンドの4", type: "minor", suit: "wand", advice: "調和と祝福のカード。安定した基盤や友人との交流が幸運を呼びます。" },
{ name: "ワンドの5", type: "minor", suit: "wand", advice: "競争や意見の食い違いが起こるかもしれません。建設的な議論を心がけて。" },
{ name: "ワンドの6", type: "minor", suit: "wand", advice: "勝利と称賛の時。自信を持って堂々と振る舞うことが大切です。" },
{ name: "ワンドの7", type: "minor", suit: "wand", advice: "自分を信じて戦う時です。困難な状況でも毅然とした態度を保ちましょう。" },
{ name: "ワンドの8", type: "minor", suit: "wand", advice: "スピーディーな展開が期待できます。流れに乗って迅速に行動しましょう。" },
{ name: "ワンドの9", type: "minor", suit: "wand", advice: "あと一歩の頑張りが必要です。これまでの経験を活かし、慎重に進めてください。" },
{ name: "ワンドの10", type: "minor", suit: "wand", advice: "責任を背負いすぎていませんか？荷を下ろし、休養を取る勇気が必要です。" },
{ name: "ワンドのページ", type: "minor", suit: "wand", advice: "好奇心を持って新しい学びを始めましょう。" },
{ name: "ワンドのナイト", type: "minor", suit: "wand", advice: "情熱的に突き進むエネルギー。スピード重視で。" },
{ name: "ワンドのクイーン", type: "minor", suit: "wand", advice: "自信と魅力に溢れています。周囲を明るく照らして。" },
{ name: "ワンドのキング", type: "minor", suit: "wand", advice: "強いリーダーシップと責任感。目的を達成する力。" },

// --- カップ (愛情・人間関係) ---
{ name: "カップのエース", type: "minor", suit: "cup", advice: "愛情の始まりや、心の充足感が得られるチャンスです。" },
{ name: "カップの2", type: "minor", suit: "cup", advice: "相互理解とパートナーシップ。信頼できる人との絆が深まります。" },
{ name: "カップの3", type: "minor", suit: "cup", advice: "友情やグループでの楽しい交流。喜びを分かち合いましょう。" },
{ name: "カップの4", type: "minor", suit: "cup", advice: "退屈や停滞を感じているなら、新しい視点やチャンスを見逃さないで。" },
{ name: "カップの5", type: "minor", suit: "cup", advice: "喪失感に囚われがちですが、残されたものに目を向ける時です。" },
{ name: "カップの6", type: "minor", suit: "cup", advice: "過去の思い出や純粋な心が鍵。懐かしい人と縁があるかも。" },
{ name: "カップの7", type: "minor", suit: "cup", advice: "多くの選択肢に迷いそう。現実的で大切な目標を一つに絞りましょう。" },
{ name: "カップの8", type: "minor", suit: "cup", advice: "物足りなさを感じ、より高い精神性を求めて旅立つ時です。" },
{ name: "カップの9", type: "minor", suit: "cup", advice: "願いが叶い、満足感を得られます。自分へのご褒美も大切に。" },
{ name: "カップの10", type: "minor", suit: "cup", advice: "幸福と調和。家族や大切な人との幸せな関係を示します。" },
{ name: "カップのページ", type: "minor", suit: "cup", advice: "感受性が豊か。新しい夢や直感を大切にしましょう。" },
{ name: "カップのナイト", type: "minor", suit: "cup", advice: "ロマンチックなアプローチや創造的な愛。" },
{ name: "カップのクイーン", type: "minor", suit: "cup", advice: "共感力と深い愛情。他者の気持ちを優しく受け入れて。" },
{ name: "カップのキング", type: "minor", suit: "cup", advice: "寛容さと落ち着き。感情をコントロールする大人の知恵。" },

// --- ソード (思考・決断) ---
{ name: "ソードのエース", type: "minor", suit: "sword", advice: "冷静な判断で新しい考えが生まれます。真実を見極めて。" },
{ name: "ソードの2", type: "minor", suit: "sword", advice: "決断を先延ばしにしているかも。心の中の均衡を保つよう努めて。" },
{ name: "ソードの3", type: "minor", suit: "sword", advice: "深い悲しみや誤解を乗り越える時。心の整理をしましょう。" },
{ name: "ソードの4", type: "minor", suit: "sword", advice: "今は休息が必要。心身を休め、エネルギーを蓄えましょう。" },
{ name: "ソードの5", type: "minor", suit: "sword", advice: "勝ち負けにこだわらないで。損をしても得るものがあるはずです。" },
{ name: "ソードの6", type: "minor", suit: "sword", advice: "困難な状況から静かな場所へ移動する時。前向きな未来へ。" },
{ name: "ソードの7", type: "minor", suit: "sword", advice: "知恵を使って工夫する時ですが、誠実さも忘れずに。" },
{ name: "ソードの8", type: "minor", suit: "sword", advice: "自分自身で限界を作っていませんか？視界が開ける日は近いです。" },
{ name: "ソードの9", type: "minor", suit: "sword", advice: "過度な悩みは休息で解消を。自分を追い詰めないでください。" },
{ name: "ソードの10", type: "minor", suit: "sword", advice: "苦痛の終わり。すべてを手放して再出発する時です。" },
{ name: "ソードのページ", type: "minor", suit: "sword", advice: "鋭い観察眼を持って、情報を正しく集めましょう。" },
{ name: "ソードのナイト", type: "minor", suit: "sword", advice: "論理的な思考力で素早く現状を突破する力。" },
{ name: "ソードのクイーン", type: "minor", suit: "sword", advice: "知性と公正さ。感情に流されず判断しましょう。" },
{ name: "ソードのキング", type: "minor", suit: "sword", advice: "冷徹なまでの冷静さと、高い論理的思考。" },

// --- ペンタクル (現実・仕事) ---
{ name: "ペンタクルのエース", type: "minor", suit: "pentacle", advice: "物質的な利益や新しいチャンスの種。コツコツと育てて。" },
{ name: "ペンタクルの2", type: "minor", suit: "pentacle", advice: "物事のバランスを保ちましょう。柔軟な対応が鍵です。" },
{ name: "ペンタクルの3", type: "minor", suit: "pentacle", advice: "チームワークと協力。専門性を活かして目標を達成する時。" },
{ name: "ペンタクルの4", type: "minor", suit: "pentacle", advice: "守りに入りすぎていませんか？執着を捨てると豊かさが循環します。" },
{ name: "ペンタクルの5", type: "minor", suit: "pentacle", advice: "困窮感があるなら周囲を頼って。助けを求めるのは恥ではありません。" },
{ name: "ペンタクルの6", type: "minor", suit: "pentacle", advice: "寛大さと分かち合い。徳を積むことで幸運が巡ります。" },
{ name: "ペンタクルの7", type: "minor", suit: "pentacle", advice: "これまでの取り組みを振り返り、今後を慎重に見極める時。" },
{ name: "ペンタクルの8", type: "minor", suit: "pentacle", advice: "着実な努力が実を結びます。集中して技術を磨き続けましょう。" },
{ name: "ペンタクルの9", type: "minor", suit: "pentacle", advice: "独立心と豊かさ。努力が報われ、心豊かな時間を過ごせます。" },
{ name: "ペンタクルの10", type: "minor", suit: "pentacle", advice: "経済的な安定と幸福。家族や組織との盤石な繋がりを享受して。" },
{ name: "ペンタクルのページ", type: "minor", suit: "pentacle", advice: "着実な学びや、新しい実務の習得に向いています。" },
{ name: "ペンタクルのナイト", type: "minor", suit: "pentacle", advice: "慎重で着実な歩み。時間はかかっても確実に結果を出す。" },
{ name: "ペンタクルのクイーン", type: "minor", suit: "pentacle", advice: "母性的な包容力と実務能力。豊かさを育てる力。" },
{ name: "ペンタクルのキング", type: "minor", suit: "pentacle", advice: "成功と安定した基盤。現実を動かす力を持っています。" }
];

// 2. 占う関数（HTMLの onclick で呼ばれる関数）
function draw(num) {
    const shuffled = [...allCards].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, num);
    const resultDiv = document.getElementById('result');
    
    if (!resultDiv) {
        console.error("ID: result がHTMLで見つかりません");
        return;
    }

    resultDiv.innerHTML = ''; 

    selected.forEach((card) => {
        const cardElement = document.createElement('div');
        cardElement.className = 'card-item';
        
        // ここに <h3>（名前）と <p>（解説）が両方あるか確認してください
        cardElement.innerHTML = `
            <h3>${card.name}</h3>
            <p class="card-advice">${card.advice}</p>
        `;
        resultDiv.appendChild(cardElement);
    });
}