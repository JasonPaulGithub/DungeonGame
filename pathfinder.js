pathfinder = function (obj_x, obj_y, player_x, player_y){

    var easystar = new EasyStar.js();
    easystar.setGrid(level);
    easystar.setAcceptableTiles([0]);

    easystar.findPath(obj_x, obj_y, player_x, player_y, function (path)
    {

        var direction;
        direction = "nope";
        console.log(direction);

        if (path) {

            if (path[1].x < obj_x && path[1].y < obj_y) {
                direction = "NW";
            }
            else if (path[1].x == obj_x && path[1].y < obj_y) {
                direction = "N";
            }
            else if (path[1].x > obj_x && path[1].y < obj_y) {
                direction = "NE";
            }
            else if (path[1].x < obj_x && path[1].y == obj_y) {
                direction = "W";
            }
            else if (path[1].x > obj_x && path[1].y == obj_y) {
                direction = "E";
            }
            else if (path[1].x > obj_x && path[1].y > obj_y) {
                direction = "SE";
            }
            else if (path[1].x == obj_x && path[1].y > obj_y) {
                direction = "S";
            }
            else if (path[1].x < obj_x && path[1].y > obj_y) {
                direction = "SW";
            }
            else {
                direction = "STOP";
            }
        }
    });
    easystar.calculate();
    //delete this;
}