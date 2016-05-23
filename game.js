    var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update:update });

    function preload()
    {
        game.load.spritesheet('tiles','src/sprites/tiles.png');
        game.load.tilemap('mapData', 'src/map/testMap.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.json('version', 'src/map/testMap.json');

        game.load.spritesheet('cleric', 'src/sprites/cleric.png', 32, 32);

        game.add.plugin(Phaser.Plugin.Debug);
        game.add.plugin(Phaser.Plugin.Inspector);

        this.game.world.scale.setTo(1.8,1.8);
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
    var player_animation;

    var text = 'Debug text.';



    function create() {

        game.physics.startSystem(Phaser.Physics.P2JS);
/////// MapData
        mapData = game.add.tilemap('mapData',32,32);
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

        player_entity = game.add.sprite(100,200, null);
        game.physics.p2.enable(player_entity, false);
        player_animation = game.add.sprite(null, null, 'cleric');
        player_animation.anchor.setTo(0.5,0.5);

        // TODO: Figure out the animations, tidy them up a bit, and label them.
        var spd = 20;

        player_animation.animations.add('idle',  [1,2,3,4,5,6,7,8,9,10],   5, false);
        player_animation.animations.add('walk',    [21,22,23,24,25,26,27,28,29,30],   spd, false);

        player_animation.animations.add('walk_down',  [1,2,3,4,5,6,7,8,9,10],   spd, false);
        player_animation.animations.add('walk_right', [11,12,13,14,15,16,,17,18,19,20],   spd,  false);
        player_animation.animations.add('walk_left',  [31,32,33,35,36,37,38,39,40],   spd,  false);
        player_animation.bringToTop();
        roof_layer.bringToTop();

    }

    function update()
    {
        player_animation.x = player_entity.x;
        player_animation.y = player_entity.y;

        game.camera.follow(player_entity);

        //TODO: Implement the smooth direction system.
        direction();
    }

    function direction(){

        var speed = 60;

        // pass direction value into a "movement control" function
        // if (rightKey.isDown == true) && (upKey.isDown === true){
        //  direction(NORTHEAST);
        // }
        // repeat for all 8 directions.
        if (rightKey.isDown == true)
        {
            //direction(right)
            player_animation.animations.play('walk');
            player_entity.body.velocity.x = speed;
        }
        else if (leftKey.isDown == true)
        {
            player_animation.animations.play('walk');
            player_entity.body.velocity.x = -speed;
        }
        else if (downKey.isDown == true)
        {
            player_animation.animations.play('walk');
            player_entity.body.velocity.y = speed;
        }
        else if (upKey.isDown == true)
        {
            player_animation.animations.play('walk');
            player_entity.body.velocity.y = -speed;
        }
        else {
            player_entity.body.setZeroVelocity();
            player_animation.animations.play('idle');
        }

    }