function pathfinder(){
    this.easystar = new EasyStar.js();
    this.easystar.setGrid(level);
    this.easystar.setAcceptableTiles([0]);
}

pathfinder.prototype.collect = function(obj_x, obj_y, plyr_x, plyr_y){

    this.easystar.findPath(obj_x, obj_y, plyr_x, plyr_y, function (path) {
        //notice how the diagonal direction does not return. Fix needed.
        if (path[1].x < obj_x && path[1].y < obj_y) {
            return "NW";
        }
        else if (path[1].x == obj_x && path[1].y < obj_y) {
            debug1 = "N";
        }
        else if (path[1].x > obj_x && path[1].y < obj_y) {
            debug1 = "NE";
        }
        else if (path[1].x < obj_x && path[1].y == obj_y) {
            debug1 = "W";
        }
        else if (path[1].x > obj_x && path[1].y == obj_y) {
            debug1 = "E";
        }
        else if (path[1].x > obj_x && path[1].y > obj_y) {
            debug1 = "SE";
        }
        else if (path[1].x == obj_x && path[1].y > obj_y) {
            //console.log ("S");
            debug1 = "S";
        }
        else if (path[1].x < obj_x && path[1].y > obj_y) {
            debug1 = "SW";
        }
        else {
            debug1 = "STOP";
        }
    });
}

pathfinder.prototype.calculate = function()
{
    this.easystar.setIterationsPerCalculation(1000);
    this.easystar.calculate();
}