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

                moveEnemyObj();
                //Here the same problem occurs twice:

                /*

                good news is the direcitons are being passed on
                to debug1, but sadly this is a variable, we need some thing
                that can focus on the object. The same thing foes for the
                move enemy object variable.

                To solve this I must investigate using:
                Messing with functions, prototype or the RETURN keyword.
                GETters and SETters. Anything.

                 */
            }
        }

    });

    easystar.calculate();
    delete this;
}