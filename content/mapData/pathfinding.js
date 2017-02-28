/////// EasyStar ///////
var phaserJSON = game.cache.getJSON('version');
var data = phaserJSON.layers[3].data; //grab the wall layer
var preArray = [];
var postArray = [];
var level =[];
var dcv = Math.sqrt(data.length);
var dataLength = data.length;

//Code involves the collision detection between the layer and the easystar library.
for (var i=0; i < data.length; i++)
{
    preArray.push(data[i]);
}

for (var x = 0; x < dataLength; x += dcv)
{
    postArray = preArray.slice(0,dcv);
    level.push(postArray);
    preArray.splice(0,dcv);
}

var easystar = new EasyStar.js();
easystar.setGrid(level);
easystar.setAcceptableTiles([0]);

setInterval(function() //note: if this runs at an interval, perhaps get it to pay more attention to the object its inside of, or a timestamp to compare to
{
    easystar.findPath(enemy_x, enemy_y, player_x, player_y, function( path )
    {
        if (path)
        {
            console.log("Path discovered.");
            console.log(path[1].x);
            console.log(path[1].y);
            console.log("\n");
        }
        else {
            console.log("No path found.");
        }
    });

    easystar.calculate();
}, 80);