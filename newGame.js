var game = new Phaser.Game(600, 600, Phaser.AUTO, 'phaser-example', {
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

var entityCollection =[['hello number 1.1','hello number 1.2'],['Hello number 2']];

function create()
{
    game.physics.startSystem(Phaser.Physics.P2JS);
    upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    runMapData();

    //Entity Factory
    function Entity(xLoc,yLoc){
        this.xLoc = xLoc;
        this.yLoc = yLoc;
    }

    //Construct Entity
    var entity1 = new Entity('Magic Entity Value 1',10);
    entityCollection.push(entity1)

    game.add.text(100, 75, 'Press up to test:', { font: "15px Arial", fill: "#19de65" });

    game.add.text(100, 150, 'Entity 1: '+ entityCollection[0][0], { font: "15px Arial", fill: "#19de65" });
    game.add.text(100, 175, 'Entity 2: '+ entityCollection[1], { font: "15px Arial", fill: "#19de65" });
    game.add.text(100, 200, 'Entity 3: '+ entityCollection[2].xLoc.toString(), { font: "15px Arial", fill: "#19de65" });

}

function update()
{
}

function render()
{
    if (upKey.isDown == true)
    {
        game.add.text(100, 125, 'UP HAS BEEN PRESSED', { font: "15px Arial", fill: "#19de65" });
    }
}