    var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update:update });

    function preload()
    {

        //TODO: Find out how to make th map 16x16, or just blow up the tileset.
        game.load.image('tiles','src/sprites/tiles.png');
        game.load.tilemap('mapData', 'src/map/testMap.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.json('version', 'src/map/testMap.json');
        game.load.image('ghost', 'src/sprites/ghost.png');
       //game.load.json('version', 'http://phaser.io/version.json');

        //Load the plugin
        game.add.plugin(Phaser.Plugin.Debug);
        game.add.plugin(Phaser.Plugin.Inspector);

    }

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

        var phaserJSON = game.cache.getJSON('version');
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
        wall_layer.debug = false;
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


        // TODO: Grab the x and Y values from the JSON file and pump out a grid for the pathfinder.


        var data = phaserJSON.layers[3].data; //grab the wall layer
        // ^ we could filter anything above a 0 in the data because that's all the pathfinder cares about
        var width = phaserJSON.layers[3].width;
        var height = phaserJSON.layers[3].height;

        var arr4 = [];
        var arr5;

        for (var i=0; i<data.length; i++) {
            arr4.push(data[i]);
        }
        arr5 = arr4.slice(0,30);
        console.log(arr5);

        // Splice, slice, pop the arrays. functions...
        // could reverse the list and 'pop' off 30 each time into an array.
        // Mess around see what's possible.



    }

    function update()
    {

    }


