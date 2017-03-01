var game = new Phaser.Game(1200, 600, Phaser.AUTO, 'phaser-example', {preload: preload,create: create, update: update,render: render});
var map1 = 'src/map/map1.json';
var mapData;

function preload()
{
    game.load.spritesheet('tiles', 'src/sprites/tiles.png');
    game.load.spritesheet('cleric', 'src/sprites/cleric.png', 64, 64);
    game.load.spritesheet('orc', 'src/sprites/orc.png', 64, 64);
    game.load.tilemap('mapData', map1, null, Phaser.Tilemap.TILED_JSON);
    game.load.json('version', map1); //Note that whatever this is, it is also located in the pathfinding.js class.
}

function create()
{
    game.physics.startSystem(Phaser.Physics.P2JS);
    runMapData();
    player = new Player('cleric', 300, 300, game);

    //Create the orc army!
    for (var i = 4; i <= 12; i++)
    {
        orcArmy.push(new Orc('orc',400,i*50,game,i));
    }

    setInterval(function ()
    {
        console.log('Player Loc:');
        console.log(player.xLoc() + player.yLoc());
        console.log('Orc Loc:');
        console.log(player.xLoc() + player.yLoc());

    }, 5000);

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
    }, 1000);

}

function update()
{

}

function render()
{
    debug();
    movePlayer();
}