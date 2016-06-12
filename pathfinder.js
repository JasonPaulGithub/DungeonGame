pathfinder = function (obj_x, obj_y, player_x, player_y){

    var easystar = new EasyStar.js();
    easystar.setGrid(level);
    easystar.setAcceptableTiles([0]);



    easystar.findPath(obj_x, obj_y, player_x, player_y, function (path) {

        for (var i = 0; i < path.length; i++)
        {
            console.log("X: " + path[i].x + " Y: " + path[i].y);
        }

    });

    easystar.calculate();
    delete this;
}