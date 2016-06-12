pathfinder = function (obj_x, obj_y, player_x, player_y){

    var easystar = new EasyStar.js();
    easystar.setGrid(level);
    easystar.setAcceptableTiles([0]);


    easystar.findPath(obj_x, obj_y, player_x, player_y, function (path) {
        
            for (var i = 0; i < path.length; i++)
            {
                console.log("X: " + path[i].x + " Y: " + path[i].y + " Rx: " + player_x + " Ry: " + player_y);

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
            }

    });

    easystar.calculate();
    delete this;
}