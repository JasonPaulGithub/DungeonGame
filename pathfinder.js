pathfinder = function (obj_x, obj_y, player_x, player_y){

    var easystar = new EasyStar.js();
    easystar.setGrid(level);
    easystar.setAcceptableTiles([0]);

    easystar.findPath(obj_x, obj_y, player_x, player_y, function (path) {

        if (path.length > 8 || path === null)
        {

        } else {

            for (var i = 0; i < path.length; i++)
            {
                if (path[1].x < obj_x && path[1].y < obj_y) {
                    console.log("NW");
                }
                else if (path[1].x == obj_x && path[1].y < obj_y) {
                    console.log("N");
                }
                else if (path[1].x > obj_x && path[1].y < obj_y) {
                    console.log("NE");
                }
                else if (path[1].x < obj_x && path[1].y == obj_y) {
                    console.log("W");
                }
                else if (path[1].x > obj_x && path[1].y == obj_y) {
                    console.log("E");
                }
                else if (path[1].x > obj_x && path[1].y > obj_y) {
                    console.log("SE");
                }
                else if (path[1].x == obj_x && path[1].y > obj_y) {
                    console.log("S");
                }
                else if (path[1].x < obj_x && path[1].y > obj_y) {
                    console.log("SW");
                }
                else {
                    console.log("STOP");
                }
            }
        }
    });

    easystar.calculate();
    delete this;
}