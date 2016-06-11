//Literally the next thing to work on goes here:
//TODO: Create a new enemy object alongside the existing one.
//TODO: Set a sight radius, and an attack radius, then put it into an object.

//TODO:
//THE OBSERVER PATTERN CAN BE USED TO ADVERTISE THE PLAYER LOCATION TO
//ENEMY ORC INSTANCES!

var game = new Phaser.Game(600, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

var map1    = 'src/map/map1.json';
var map2    = 'src/map/map2.json';

function preload()
{
    game.load.spritesheet('tiles','src/sprites/tiles.png');

    game.load.tilemap('mapData', map1, null, Phaser.Tilemap.TILED_JSON);
    game.load.json('version', map1);

    game.load.spritesheet('cleric', 'src/sprites/cleric.png', 64, 64);
    game.load.spritesheet('orc', 'src/sprites/orc.png', 64, 64);
    game.load.spritesheet('orcThief', 'src/sprites/orcThief.png', 64, 64);

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

var cursors;
var upKey;
var downKey;
var leftKey;
var rightKey;
var spaceKey;

var player_entity;
var player_x;
var player_y;
var flip = false;

var phaserJSON;
var data;
var preArray = [];
var postArray = [];
var level =[];

var nextPointX;
var nextPointY;
var stopPathFinder = false;

var debug2 = '';
var sortDepthGroup;

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
    wall_layer.debug = false;
    wall_decor = mapData.createLayer('wall_decor');
    wall_decor.resizeWorld();
    wall_decor.debug = false;
    roof_layer = mapData.createLayer('roof');
    roof_layer.resizeWorld();
    roof_layer.debug = false;
    mapData.setCollisionBetween(1,2000,true,'wall');
    game.physics.p2.convertTilemap(mapData, wall_layer);

/////// Depth Sort
    sortDepthGroup = game.add.group();

/////// Controls
    cursors = game.input.keyboard.createCursorKeys();
    upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

////// Player
    player_entity = sortDepthGroup.create(333,333, 'cleric');
    game.physics.p2.enable(player_entity, true);
    player_entity.body.setRectangle(31,34);
    player_entity.body.fixedRotation = true;
    player_entity.anchor.setTo(0.5,0.75);
    var spd = 20;
    player_entity.animations.add('idle',   [0,1,2,3,4,5,6,7,8,9],               5, false);
    player_entity.animations.add('cast',   [10,11,12,13,14,15,16,17,18,19],   spd, false);
    player_entity.animations.add('walk',   [20,21,22,23,24,25,26,27,28,29],   spd, false);
    player_entity.animations.add('attack', [30,31,32,33,34,35,36,37,38,39],   spd, false);
    player_entity.animations.add('die',    [40,41,42,43,44,45,46,47,48,49],   spd, false);

/////// EasyStar
    phaserJSON = game.cache.getJSON('version');
    data = phaserJSON.layers[3].data;

    for (var i=0; i<data.length; i++) {
        preArray.push(data[i]);
    }

    var dcv = Math.sqrt(data.length);
    var dataLength = data.length;

    for (var x = 0; x < dataLength; x += dcv) {
        postArray = preArray.slice(0,dcv);
        level.push(postArray);
        preArray.splice(0,dcv);
    }

/////// Misc
    roof_layer.bringToTop();
    player_entity.body.onBeginContact.add(blockHit, this);

    new orcObject(333, 363, game);
    new orcObject(700, 700, game);
    new orcObject(800, 800, game);

}

function blockHit (body) {

    if (body == null)
    {
        debug2 = 'You bumped into the world bounds';
    }
    else if (body.sprite == null)
    {
        debug2 = 'You bumped into a wall';
    }
    else if (body)
    {
        debug2 = 'You last hit: ' + body.sprite.key;
    }
    else
    {
        debug2 = 'You hit a un-identified object';
    }
}

function direction(){

    player_entity.body.setZeroVelocity();
    var speed = 150;

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
        if (flip == true){
            player_entity.scale.x *=-1;
            flip = false;
        }
    }
    else if (spaceKey.isDown == true)
    {
        player_entity.animations.play('attack');
    }
    else
    {
        player_entity.animations.play('idle');
    }

    if (leftKey.isDown){
        if (flip == false){
            player_entity.scale.x *=-1;
            flip = true;
        }
    }
}

function update()
{
    sortDepthGroup.sort('y', Phaser.Group.SORT_ASCENDING);
    game.camera.follow(player_entity);
    direction();

    //Snap from the pixel co-ordinate to the grid co-ordinate.
    player_x = this.math.snapToFloor(Math.floor(player_entity.position.x), 32) / 32;
    player_y = this.math.snapToFloor(Math.floor(player_entity.position.y), 32) / 32;
    /*
    enemy_x = this.math.snapToFloor(Math.floor(orc.position.x), 32) / 32;
    enemy_y = this.math.snapToFloor(Math.floor(orc.position.y), 32) / 32;
    */
}

function render(){
    //  game.debug.text('Object Direction: ' + x, 32, 32);
    // game.debug.text('Enemy Collision: ' + enemyAttack  , 32, 62);
    game.debug.text('Player Collision: ' + debug2  , 32, 92);
}