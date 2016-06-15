//notice how the diagonal direction does not return. Fix needed.
function pathfinder(obj_x, obj_y, plyr_x, plyr_y){

    this.easystar = new EasyStar.js();
    this.easystar.setGrid(level);
    this.easystar.setAcceptableTiles([0]);
    this.easystar.findPath(obj_x, obj_y, plyr_x, plyr_y, function(path){

        console.log('I have no idea what Im doing.');

        // probably have to create the pathfinder instance at the game.js level ad mod direction from there.

    });
}

pathfinder.prototype.calculate = function()
{
    this.easystar.setIterationsPerCalculation(1000);
    this.easystar.calculate();
}