var game = new Phaser.Game(1200, 600, Phaser.AUTO, 'phaser-example', {
    preload: preload,
    create: create,
    update: update,
    render: render
});

var map1 = 'src/map/map1.json';
var map2 = 'src/map/map2.json';

function preload() {
    game.load.spritesheet('tiles', 'src/sprites/tiles.png');
    game.load.tilemap('mapData', map1, null, Phaser.Tilemap.TILED_JSON);
    game.load.json('version', map1);
}

var mapData;
var upKey;

// Designed to hold a collection of interchangable game objects (i.e player, enemies,etc).
var entityCollection =[['hello number 1.1','hello number 1.2'],['Hello number 2']];

//Desinged to collect screen text
var textCollection=[];

function create()
{
    game.physics.startSystem(Phaser.Physics.P2JS);
    upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    runMapData();

    //Entity Factory
    function Entity(id,xLoc,yLoc){
        this.id   = id;
        this.xLoc = xLoc;
        this.yLoc = yLoc;
    }
    //Construct Entity
    var entity1 = new Entity('Player_Entity',10,10);
    entityCollection.push(entity1)

    //Screen Text
    textCollection.push('GAME STATS\n');
    textCollection.push('(ง︡’-‘︠)ง  Entity: ' + entity1.id +' : X: ' + entityCollection[2].xLoc+' Y:'+entityCollection[2].yLoc+'');
    var text = game.add.text(10, 10, textCollection);
    text.font = 'Arial Black';
    text.fontSize = 14;
    //text.fontWeight = 'bold';

    //	Stroke color and thickness
    text.stroke = '#0000ff';
    text.strokeThickness = 1;
    text.fill = '#ffffff';

}

function update()
{
}

function render()   //REMINDER: YOU ARE IN THE ~~RENDER~~ SECTION//
{
    if (upKey.isDown == true)
    {
        game.add.text(100, 325, 'UP HAS BEEN PRESSED', { font: "15px Arial", fill: "#19de65" });


        //Here we can change the value to an object kept in a global array:
        entityCollection[2].xLoc=42;
        game.add.text(100, 350, 'Changes to object: '+ entityCollection[2].xLoc.toString(), { font: "15px Arial", fill: "#19de65" });

    }
}