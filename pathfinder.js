pathfinder = function (obj_x, obj_y, player_x, player_y){

    var easystar = new EasyStar.js();
    easystar.setGrid(level);
    easystar.setAcceptableTiles([0]);

    easystar.findPath(obj_x, obj_y, player_x, player_y, function (path) {

        if (path.length > 8 || path === null) {
            delete this;
        }
            for (var i = 0; i < path.length; i++)
            {
                console.log("X: " + path[i].x + " Y: " + path[i].y + " Rx: " + player_x + " Ry: " + player_y);

                if (path[1].x < obj_x && path[1].y < obj_y) {
                    directionObj = "NW";
                }
                else if (path[1].x == obj_x && path[1].y < obj_y) {
                    directionObj ="N";
                }
                else if (path[1].x > obj_x && path[1].y < obj_y) {
                    directionObj ="NE";
                }
                else if (path[1].x < obj_x && path[1].y == obj_y) {
                    directionObj ="W";
                }
                else if (path[1].x > obj_x && path[1].y == obj_y) {
                    directionObj ="E";
                }
                else if (path[1].x > obj_x && path[1].y > obj_y) {
                    directionObj ="SE";
                }
                else if (path[1].x == obj_x && path[1].y > obj_y) {
                    directionObj ="S";
                }
                else if (path[1].x < obj_x && path[1].y > obj_y) {
                    directionObj ="SW";
                }
                else {
                    directionObj ="STOP";
                }
            }
    });

    easystar.calculate();
}