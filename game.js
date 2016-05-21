    var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update:update });

    function preload()
    {
        //TODO: Find out how to make th map 16x16, or just blow up the tileset.
        game.load.spritesheet('tiles','src/sprites/tilemap.png');
        game.load.tilemap('mapData', 'src/map/testMap.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.json('version', 'src/map/testMap.json');
        game.add.plugin(Phaser.Plugin.Debug);
        game.add.plugin(Phaser.Plugin.Inspector);
    }

    var mapData;
    var background_layer;
    var floor_layer;
    var floor_decor;
    var wall_layer;
    var wall_decor;
    var roof_layer;

    function create() {

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
        wall_layer.debug = false;
        wall_decor = mapData.createLayer('wall_decor');
        wall_decor.resizeWorld();
        wall_decor.debug = false;
        roof_layer = mapData.createLayer('roof');
        roof_layer.resizeWorld();
        roof_layer.debug = false;

        var phaserJSON = game.cache.getJSON('version');
        var data = phaserJSON.layers[3].data; //grab the wall layer
        var preArray = [];
        var postArray = [];
        var level =[];
        for (var i=0; i<data.length; i++) {
            preArray.push(data[i]);
        }
        var dcv = Math.sqrt(data.length); //DataCrunchValue: the setup means all maps must remain square.
        for (var x=0; x<data.length; x+=dcv) {
            postArray = preArray.slice(0,30);
            level.push(postArray);
            preArray.splice(0,30);
        }

        var easystar = new EasyStar.js();
        easystar.setGrid(level);
        easystar.setAcceptableTiles([0]);
        easystar.enableDiagonals();
        easystar.enableCornerCutting();
        easystar.findPath(0, 0, 29, 29, function( path ) { //easystar.findPath(startX, startY, endX, endY, callback);
            if (path === null) {
                console.log("Pathfinder: DORMANT");
            }
            else {
                console.log('Pathfinder: ON');
                for (var i = 0; i < path.length; i++)
                {
                    //console.log("P: " + i + ", X: " + path[i].x + ", Y: " + path[i].y);
                }
            }
        });
        easystar.calculate();
    }

    function update()
    {

    }

    //TODO: Insert the cowboy code:
    //      +   recreate the sprite pathfinding.
    //      +   Copy the STOP animation for movement.

    //TODO: Insert the keyboard controls from pls_work then Integrate with the cowboy controls.
