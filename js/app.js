// app.js
var milkcocoa = new MilkCocoa('noteimxic3yg.mlkcca.com');
var ds = milkcocoa.dataStore("score");
//スコアデータの保持用
var scoreList = { id: null, data:[] };

//
$('.game').blockrain({
    // theme: "candy",
    blockWidth: 15,
    onGameOver: function(score){
        ds.push({score : score});
    }
});
setup();

// 初期設定用の関数
function setup() {
    ds.stream().next(function(err, message) {
        // ➀データベースに「スコア」が存在するかを確認
        if(message[0] === undefined) {


            // ➁スコアデータの初期設定
            scoreList.data.push([
                    {name: "----", score: 500},
                    {name: "----", score: 400},
                    {name: "----", score: 300},
                    {name: "----", score: 200},
                    {name: "----", score: 100}
            ]);
            ds.push(scoreList);
            rankUpdate();
        }
        else {
            // ➂データベースからスコアを取得
            scoreList.data = message;
            rankUpdate();
        }
    });
}

// ランキングデータ表示用の関数
function rankUpdate() {
    // ランキング数の取得
    var maxRank = scoreList.data.length;
    scoreList.data.sort(function(a, b) { return b.value.score - a.value.score });
    // ランキング順にページへ表示させる
    for(var i=0; i<maxRank; i++) {
        $('.score' + (i+1)).text(scoreList.data[i].value.score);
    }
}
