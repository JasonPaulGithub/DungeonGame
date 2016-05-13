// Easy Star JS setup::
var easystar = new EasyStar.js();
var timeStep = 400; // pathway computation time interval in milliseconds

var level = [[0,0,1,0,0],
    [1,0,1,0,1],
    [0,0,1,0,0],
    [0,0,1,1,0],
    [0,0,0,0,0]];

easystar.setGrid(level);
easystar.setAcceptableTiles([0]);
easystar.enableDiagonals();
easystar.enableCornerCutting();
//




var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update:update });

var loadingLabel;
var response = 'Check console for pathfinding';

function preload() {

    game.load.image('imageKey', 'assets/img/ghost.png');
    game.add.plugin(Phaser.Plugin.Debug);
    game.add.plugin(Phaser.Plugin.Inspector);

}


function create() {
    game.add.image(95, 300, 'imageKey');

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

    loadingLabel = game.add.text(200, 150, 'PATHFINDING: ' + response, {font: '22px Courier', fill: '#fff'});
}

    function update(){
        // We need to place the response code here so it can be updated. Though it's working in the console is fine for now.
    }
