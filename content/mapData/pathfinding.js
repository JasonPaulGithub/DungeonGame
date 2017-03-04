/*
var phaserJSON = game.cache.getJSON('version');
var data = phaserJSON.layers[3].data; //grab the wall layer
var preArray = [];
var postArray = [];
var level = [];
var easystar;
var dcv = Math.sqrt(data.length);
var dataLength = data.length;

for (var i = 0; i < data.length; i++)
{
    preArray.push(data[i]);
}

for (var x = 0; x < dataLength; x += dcv)
{
    postArray = preArray.slice(0, dcv);
    level.push(postArray);
    preArray.splice(0, dcv);
}

easystar = new EasyStar.js();
easystar.setGrid(level);
easystar.setAcceptableTiles([0]);

setInterval(function ()
{
    easystar.findPath(orcArmy[0].xLoc(), orcArmy[0].yLoc(), player.xLoc(), player.yLoc(), function (path)
    {
        if (path)
        {
            console.log(path[1].x);
            console.log(path[1].y);
        }

        if (path === null)
        {
            console.log('Pathfinder: OFF');
        } else
        {
            console.log('Pathfinder: CHECK');
        }
    });
    easystar.calculate();
}, 1000);*/
