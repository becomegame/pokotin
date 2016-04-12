// app.js
var milkcocoa = new MilkCocoa('noteimxic3yg.mlkcca.com');
var ds = milkcocoa.dataStore("score");
$('.game').blockrain({
    // theme: "candy",
    blockWidth: 10,
    onGameOver: function(score){
        alert(score);
        console.log(score);
        ds.push({score : score});
    }
});