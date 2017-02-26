var game = new Phaser.Game(1200, 600, Phaser.AUTO, 'phaser-example', {preload: preload,create: create, update: update,render: render});
var map1 = 'src/map/map1.json';
var mapData;
var entityCollection = [[],[]];
var textCollection = [];

function preload()
{
    game.load.spritesheet('tiles', 'src/sprites/tiles.png');
    game.load.spritesheet('cleric', 'src/sprites/cleric.png', 64, 64);
    game.load.tilemap('mapData', map1, null, Phaser.Tilemap.TILED_JSON);
    game.load.json('version', map1);
}

function create()
{
    game.physics.startSystem(Phaser.Physics.P2JS);

    runMapData();

    new Player('cleric',300,300);
    player.game.physics.p2.enable(player, true);
    player.body.setRectangle(32,35);
    player.body.fixedRotation = true;
    player.anchor.setTo(0.5,0.75);
    game.camera.follow(player);

    textCollection.push('GAME STATS');
    textCollection.push('(ง︡’-‘︠)ง   Entity From Collection: ' + entityCollection[2].id +' : X: '
    + entityCollection[2].xLoc+' Y:'+entityCollection[2].yLoc+'\n');
}

function update()
{
    debug();
}

function render()
{
    movePlayer()
}