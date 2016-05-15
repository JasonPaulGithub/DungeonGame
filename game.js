// Easy Star JS setup::
var easystar = new EasyStar.js();

var level = [[0,0,1,0,0],
    [1,0,1,0,1],
    [0,0,1,0,0],
    [0,0,1,1,0],
    [0,0,0,0,0]];

easystar.setGrid(level);
easystar.setAcceptableTiles([0]);
easystar.enableDiagonals();
easystar.enableCornerCutting();

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update:update });

function preload() {

    game.load.image('tiles','src/sprites/tiles.png');
    game.load.tilemap('mapData', 'src/map/testMap.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.json('map', 'src/map/testMap.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('ghost', 'src/sprites/ghost.png');

    //Load the plugin
    game.add.plugin(Phaser.Plugin.Debug);
    game.add.plugin(Phaser.Plugin.Inspector);

    var data = {
        "0": "1",
        "1": "2",
        "2": "3",
        "3": "4"
    };
    var arr = [];
    for (var prop in data) {
        arr.push(data[prop]);
    }
    console.log(arr);
}

var loadingLabel;
var response = 'Check console for pathfinding';

var mapData;
var background_layer;
var floor_layer;
var floor_decor;
var wall_layer;
var wall_decor;
var roof_layer;

function create() {

    game.add.image(95, 300, 'ghost');

    game.physics.startSystem(Phaser.Physics.P2JS);

    mapData = game.add.tilemap('mapData');
    mapData.addTilesetImage('tiles');

    background_layer = mapData.createLayer('background');
    background_layer.resizeWorld();
    background_layer.debug = false;
    floor_layer = mapData.createLayer('floor');
    floor_layer.resizeWorld();
    floor_layer.debug = false;
    floor_decor = mapData.createLayer('floor_decor');
    floor_decor.resizeWorld();
    floor_decor.debug = false;
    wall_layer = mapData.createLayer('wall');
    wall_layer.resizeWorld();
    wall_layer.debug = true;
    wall_decor = mapData.createLayer('wall_decor');
    wall_decor.resizeWorld();
    wall_decor.debug = false;
    roof_layer = mapData.createLayer('roof');
    roof_layer.resizeWorld();
    roof_layer.debug = false;

    easystar.findPath(0, 0, 4, 0, function( path ) {
        if (path === null) {
            console.log("The path to the destination point was not found.");
            response = "DORMANT";
        }

        else {

            for (var i = 0; i < path.length; i++)
            {
                console.log("P: " + i + ", X: " + path[i].x + ", Y: " + path[i].y);
            }

            response = 'RUNNING';
        }

    });

    easystar.calculate();

    loadingLabel = game.add.text(200, 150, 'PATHFINDING: ' + response, {font: '22px Courier', fill: '#fff'});
}

    function update(){

    }
