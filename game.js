    var game = new Phaser.Game(480, 480, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

    function preload()
    {
        game.load.spritesheet('tiles','src/sprites/tiles.png');
        game.load.tilemap('mapData', 'src/map/testMap.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.json('version', 'src/map/testMap.json');

        game.load.spritesheet('cleric', 'src/sprites/cleric.png', 32, 32);

        game.add.plugin(Phaser.Plugin.Debug);
        game.add.plugin(Phaser.Plugin.Inspector);

        //this.game.world.scale.setTo(1.8,1.8); //<< this is causing problems

        /*
        game.scale.maxWidth = 800;
        game.scale.maxHeight = 600;

        //  Then we tell Phaser that we want it to scale up to whatever the browser can handle, but to do it proportionally
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        */


    }

    var mapData;
    var background_layer;
    var floor_layer;
    var floor_decor;
    var wall_layer;
    var wall_decor;
    var roof_layer;

    var cursors;
    var upKey;
    var downKey;
    var leftKey;
    var rightKey;
    var player_entity;

    var text;
    var flipped = false;



    function create() {

        game.physics.startSystem(Phaser.Physics.P2JS);

/////// MapData
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

        mapData.setCollisionBetween(1,2000,true,'wall');
        game.physics.p2.convertTilemap(mapData, wall_layer);

/////// EasyStar
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
        easystar.findPath(5, 5, 10, 10, function( path ) {
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

/////// Player, Controls, and Animation
        cursors = game.input.keyboard.createCursorKeys();

        upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

        player_entity = game.add.sprite(100, 100, 'cleric');
        game.physics.p2.enable(player_entity, true);
        player_entity.body.setRectangle(16,32);
        player_entity.body.fixedRotation = true;
        player_entity.anchor.setTo(0.5,0.5);

        // TODO: Figure out the animations.
        var spd = 20;
        player_entity.animations.add('idle',  [1,2,3,4,5,6,7,8,9,10],   5, false);
        player_entity.animations.add('walk',    [21,22,23,24,25,26,27,28,29,30],   spd, false);
        player_entity.animations.add('walk_down',  [1,2,3,4,5,6,7,8,9,10],   spd, false);
        player_entity.animations.add('walk_right', [11,12,13,14,15,16,17,18,19,20],   spd,  false);
        player_entity.animations.add('walk_left',  [31,32,33,35,36,37,38,39,40],   spd,  false);

        player_entity.bringToTop();
        roof_layer.bringToTop();
    }

    function update()
    {
        game.camera.follow(player_entity);
        direction();
    }

    function direction(){

        player_entity.body.setZeroVelocity();
        var speed = 200;

        if (upKey.isDown == true)
        {
            player_entity.body.moveUp(speed);
        }
            else if (downKey.isDown == true)
            {
                player_entity.body.moveDown(speed);
            }
        if (leftKey.isDown == true)
        {
            player_entity.body.moveLeft(speed);
        }
            else if (rightKey.isDown == true)
            {
                player_entity.body.moveRight(speed);
            }

        if (upKey.isDown == true)
        {
            player_entity.animations.play('walk');
        }
        else if (downKey.isDown == true)
        {
            player_entity.animations.play('walk');
        }
        else if (leftKey.isDown == true)
        {
            player_entity.animations.play('walk');
        }
        else if (rightKey.isDown == true)
        {
            player_entity.animations.play('walk');
            if (flipped == true){
                player_entity.scale.x *=-1;
                flipped = false;
            }
        }
        else
        {
            player_entity.animations.play('idle');
        }

        if (leftKey.isDown){
            if (flipped == false){
                player_entity.scale.x *=-1;
                flipped = true;
            }
        }
    }

    function render(){
        game.debug.text('Debug text: ' + text, 32, 32);
    }