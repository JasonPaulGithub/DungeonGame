var game = new Phaser.Game(1200, 600, Phaser.AUTO, 'phaser-example', {preload: preload,create: create, update: update,render: render});
var map1 = 'src/map/map1.json';
var mapData;

function preload()
{
    game.load.spritesheet('tiles', 'src/sprites/tiles.png');
    game.load.spritesheet('cleric', 'src/sprites/cleric.png', 64, 64);
    game.load.tilemap('mapData', map1, null, Phaser.Tilemap.TILED_JSON);
    game.load.json('version', map1);
}

// Designed to hold a collection of interchangable game objects (i.e player, enemies,etc).
var entityCollection = [[],[]];

//Desinged to collect screen text
var textCollection = [];

function create(){
    game.physics.startSystem(Phaser.Physics.P2JS);
    runMapData();

    //Create player object from /Player.js
    new Player('cleric',300,300);


    //Add Screen Text Here
        textCollection.push('GAME STATS');
    textCollection.push('(ง︡’-‘︠)ง   Entity From Collection: ' + entityCollection[2].id +' : X: ' + entityCollection[2].xLoc+' Y:'+entityCollection[2].yLoc+'\n');

    //Text Settings

}

function update()
{
    debug();
}

function render()   //REMINDER: YOU ARE IN THE ~~RENDER~~ SECTION//
{
    if (game.input.keyboard.addKey(Phaser.Keyboard.UP).isDown == true)
    {
        player.x+=5;
        player.y+=5;
    }
    if (game.input.keyboard.addKey(Phaser.Keyboard.DOWN).isDown == true)
    {
        player.x-=5;
        player.y-=5;
    }
}