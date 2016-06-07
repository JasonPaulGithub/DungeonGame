easyStar = function (game){

    setInterval(function(){

        easystar.findPath(enemy_x, enemy_y, player_x, player_y, function( path ) {

            if (path) {
                nextPointX = path[1].x;
                nextPointY = path[1].y;
            }

            if (path === null || stopPathFinder == true) {
                console.log("Pathfinder: DORMANT");
                console.log('Pathfinder: ON');
            }

            else {
                for (var i = 0; i < path.length; i++) {
                    //console.log("X: " + path[i].x + " Y: " + path[i].y + " Rx: " + enemy_x + " Ry: " + enemy_y);

                    if (nextPointX < enemy_x && nextPointY < enemy_y)
                    {
                        enemyDirection = "NW";
                    }
                    else if (nextPointX == enemy_x && nextPointY < enemy_y)
                    {
                        enemyDirection = "N";
                    }
                    else if (nextPointX > enemy_x && nextPointY < enemy_y)
                    {
                        enemyDirection = "NE";
                    }
                    else if (nextPointX < enemy_x && nextPointY == enemy_y)
                    {
                        enemyDirection = "W";
                    }
                    else if (nextPointX > enemy_x && nextPointY == enemy_y)
                    {
                        enemyDirection = "E";
                    }
                    else if (nextPointX > enemy_x && nextPointY > enemy_y)
                    {
                        enemyDirection = "SE";
                    }
                    else if (nextPointX == enemy_x && nextPointY > enemy_y)
                    {
                        enemyDirection = "S";
                    }
                    else if (nextPointX < enemy_x && nextPointY > enemy_y)
                    {
                        enemyDirection = "SW";
                    }
                    else
                    {
                        enemyDirection = "STOP";
                    }
                    moveEnemy();
                }
            }
        });
        easystar.calculate();

    }, 80);
}