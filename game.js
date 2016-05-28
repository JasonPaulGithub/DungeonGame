    var game = new Phaser.Game(600, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

    function preload()
    {
        game.load.spritesheet('tiles','src/sprites/tiles.png');
        game.load.tilemap('mapData', 'src/map/testMap.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.json('version', 'src/map/testMap.json');

        game.load.spritesheet('cleric', 'src/sprites/cleric.png', 64, 64);
        game.load.spritesheet('ratnbat', 'src/sprites/ratnbat.png', 64, 64);

        game.add.plugin(Phaser.Plugin.Debug);
        game.add.plugin(Phaser.Plugin.Inspector);

        //TODO: This:
        // Graphics: Add a drop shadow.
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
    var pex;
    var pey;
    var ratnbat;
    var rnbx;
    var rnby;

    var text;
    var flipped = false;

    function create() {

        game.physics.startSystem(Phaser.Physics.P2JS);

/////// MapData

        /*
        TODO:
        Arrange the layering for the character sprites. Dynamically moving them in front or behind.
        http://phaser.io/examples/v2/groups/depth-sort
        TODO:
        Carpets: Include a dark fog sprite to mix with the carpet sprites to decorate the dungeon.
        TODO:
        The chest that you touch and the barrel that you bash and the bag that opens at any angle.
        TODO:
        Hook path finding up with the enemy objects.
        TODO:
        Take the top beam of the door into the roof layer, darken the screen upon collision, play openDoor.mp3
        load a new map, then brighten the screen.

        //Distant future: Combat system. Skill trees. Classes. Menus. Sound. Projectiles. Magic. A story.
        Lighting. Stats on items.
         */

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

        mapData.setCollisionBetween(1,2000,true,'wall');
        game.physics.p2.convertTilemap(mapData, wall_layer);

/////// Player, Controls, and Animation
        cursors = game.input.keyboard.createCursorKeys();
        upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

        player_entity = game.add.sprite(200, 250, 'cleric');
        game.physics.p2.enable(player_entity, true);
        player_entity.body.setRectangle(14,30); // Exact sprite collision sizes don't agree with the engine . Set them 2 pixels smaller.
        player_entity.body.fixedRotation = true;
        player_entity.anchor.setTo(0.5,0.5);

        // TODO: Figure out the animations.
        var spd = 20;
        player_entity.animations.add('idle',         [0,1,2,3,4,5,6,7,8,9],               5, false);
        player_entity.animations.add('walk_down',    [10,11,12,13,14,15,16,17,18,19],   spd, false);
        player_entity.animations.add('walk',         [20,21,22,23,24,25,26,27,28,29],   spd, false);
        player_entity.animations.add('walk_right',   [30,31,32,33,34,35,36,37,38,39],   spd, false);
        player_entity.animations.add('walk_left',    [40,41,42,43,44,45,46,47,48,49],   spd,  false);

/////// Enemies
        ratnbat = game.add.sprite(400,400,'ratnbat');
        game.physics.p2.enable(ratnbat,true);
        ratnbat.body.setCircle(10);
        ratnbat.body.fixedRotation = true;
        ratnbat.anchor.setTo(0.5,0.5);
        //Expand on available enemy physics:

/////// EasyStar
        var phaserJSON = game.cache.getJSON('version');
        var data = phaserJSON.layers[3].data; //grab the wall layer
        var preArray = [];
        var postArray = [];
        var level =[];

        for (var i=0; i<data.length; i++) {
            preArray.push(data[i]);
        }

        var mapx;
        var mayy;
        var dcv = Math.sqrt(data.length); //DataCrunchValue: the setup means all maps must remain square.
        var dataLength = data.length;

        for (var x = 0; x < dataLength; x += dcv) {
            postArray = preArray.slice(0,30);
            level.push(postArray);
            preArray.splice(0,30);
        }

        var easystar = new EasyStar.js();
        easystar.setGrid(level);
        easystar.setAcceptableTiles([0]);
        easystar.enableDiagonals();
        easystar.enableCornerCutting();

        setInterval(function(){

            pex = Math.floor(player_entity.position.x / 30);
            pey = Math.floor(player_entity.position.y / 30);
            rnbx = Math.floor(ratnbat.position.x / 30);
            rnby = Math.floor(ratnbat.position.y / 30);

            easystar.findPath(pex, pey, rnbx, rnby, function( path ) {

                if (path === null) {
                    console.log("Pathfinder: DORMANT");
                }

                else {
                    console.log('Pathfinder: ON');
                    for (var i = 0; i < path.length; i++)
                    {
                        console.log("P: " + i + ", X: " + path[i].x + ", Y: " + path[i].y);
                    }
                }

            });
            easystar.calculate();

        }, 400);

/////// Misc
        player_entity.bringToTop();
        roof_layer.bringToTop();

    }

    function direction(){

        player_entity.body.setZeroVelocity();
        var speed = 250;

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

    function update()
    {
        game.camera.follow(player_entity);
        direction();
    }

    function render(){
        game.debug.text('Debug text: ' + text, 32, 32);
    }