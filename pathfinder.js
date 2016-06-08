pathfinder = function (){

    var phaserJSON = game.cache.getJSON('version');
    var data = phaserJSON.layers[3].data;
    var preArray = [];
    var postArray = [];
    var level =[];

    for (var i=0; i<data.length; i++) {
        preArray.push(data[i]);
    }

    var dcv = Math.sqrt(data.length);
    var dataLength = data.length;

    for (var x = 0; x < dataLength; x += dcv) {
        postArray = preArray.slice(0,dcv);
        level.push(postArray);
        preArray.splice(0,dcv);
    }


}

pathfinder.getPath = function(){

    var pathfinder = new EasyStar.js();
    pathfinder.setGrid(level);
    pathfinder.setAcceptableTiles([0]);

    setInterval(function(){

        pathfinder.findPath(1, 1, 2, 2, function( path ) {

            if (path === null) {
                console.log("Pathfinder: DORMANT");
            }

            else {
                for (var i = 0; i < path.length; i++) {
                    console.log("X: " + path[i].x + " Y: " + path[i].y + " Rx: " + enemy_x + " Ry: " + enemy_y);
                }
            }
        });
        pathfinder.calculate();

    }, 80);
}