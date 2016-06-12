pathfinder = function (){

    var easystar = new EasyStar.js();
    easystar.setGrid(level);
    easystar.setAcceptableTiles([0]);

    easystar.findPath(1, 1, 2, 2, function (path) {

        for (var i = 0; i < path.length; i++)
        {
            console.log("X: " + path[i].x + " Y: " + path[i].y);

        }

    });
    easystar.calculate();
    delete this;
}