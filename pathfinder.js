function pathfinder(obj_x, obj_y, player_x, player_y){

    this.easystar = new EasyStar.js();
    this.easystar.setGrid(level);
    this.easystar.setAcceptableTiles([0]);

    this.easystar.findPath(obj_x, obj_y, player_x, player_y, function (path) {

        if (path[1].x < obj_x && path[1].y < obj_y) {
            debug1 = "NW";
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

pathfinder.prototype.go = function(){
    //easystar.setIterationsPerCalculation(1000);
    this.easystar.calculate();
}