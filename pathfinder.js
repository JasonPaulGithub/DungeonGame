function pathfinder(){

    this.easystar = new EasyStar.js();
    this.easystar.setGrid(level);
    this.easystar.setAcceptableTiles([0]);
}

pathfinder.prototype.returnX = function (x){
    this.i = x;
    return this.i;
}

pathfinder.prototype.findPath = function (obj_x, obj_y, player_x, player_y){

    this.ox = obj_x;
    this.oy = obj_y;
    this.px = player_x;
    this.py = player_y;
    this.result1 = 'what?';

    this.easystar.findPath(this.ox, this.oy, this.px, this.py, function (path) {

        if (path[1].x < obj_x && path[1].y < obj_y)
        {
            this.result = "NW";
        }
        else if (path[1].x == obj_x && path[1].y < obj_y)
        {
            this.result = "N";
        }
        else if (path[1].x > obj_x && path[1].y < obj_y)
        {
            this.result = "NE";
        }
        else if (path[1].x < obj_x && path[1].y == obj_y)
        {
            this.result = "W";
        }
        else if (path[1].x > obj_x && path[1].y == obj_y)
        {
            this.result = "E";
        }
        else if (path[1].x > obj_x && path[1].y > obj_y)
        {
            this.result = "SE";
        }
        else if (path[1].x == obj_x && path[1].y > obj_y)
        {
            this.result = "S";
        }
        else if (path[1].x < obj_x && path[1].y > obj_y)
        {
            this.result = "SW";
        }
        else
        {
            this.result = "STOP";
        }
    });
    return this.result1;
}


pathfinder.prototype.go = function(x){
    this.easystar.calculate();
}