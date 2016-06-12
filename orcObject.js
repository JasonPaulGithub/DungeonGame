    orcObject = function (x,y,game) {

        this.game = game;
        var x = 222//game.world.randomX;
        var y = 222//game.world.randomY;

        var directionObj;
        var enemyAttackObj = 'attack off';
        var flipEnemyObj = false;

        var nextPointXObj;
        var nextPointYObj;
        var pathfinderON = false;

        var orcRadius;
        orcRadius = game.add.sprite(x, y,'');
        orcRadius.height=128;
        orcRadius.width=128;
        orcRadius.anchor.setTo(0.5,0.5);

        var orcObj = sortDepthGroup.create(x, y, 'orc');
        orcObj.animations.add('idle', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 5, false);
        orcObj.animations.add('cast', [10, 11, 12, 13, 14, 15, 16, 17, 18, 19], 20, false);
        orcObj.animations.add('walk', [20, 21, 22, 23, 24, 25, 26, 27, 28, 29], 20, false);
        orcObj.animations.add('attack', [30, 31, 32, 33, 34, 35, 36, 37, 38, 39], 20, false);
        orcObj.animations.add('die', [40, 41, 42, 43, 44, 45, 46, 47, 48, 49], 20, false);

        game.physics.p2.enable(orcObj, debugging);
        orcObj.body.setCircle(12);
        orcObj.body.fixedRotation = true;
        orcObj.anchor.setTo(0.5, 0.75);

        /////// EasyStar
        var pathfinder = new EasyStar.js();
        pathfinder.setGrid(level);
        pathfinder.setAcceptableTiles([0]);

        setInterval(function () {

            var obj_x = game.math.snapToFloor(Math.floor(orcObj.position.x), 32) / 32;
            var obj_y = game.math.snapToFloor(Math.floor(orcObj.position.y), 32) / 32;

            pathfinder.findPath(obj_x, obj_y, player_x, player_y, function (path) {

                if (path) {
                    nextPointXObj = path[1].x;
                    nextPointYObj = path[1].y;
                }

                if (path.length > 8 || path === null || pathfinderON == false) {
                    //console.log("Pathfinder: DORMANT");
                    orcObj.body.setZeroVelocity();
                    orcObj.animations.play('idle');
                }

                else
                {
                    for (var i = 0; i < path.length; i++)
                    {
                        console.log("X: " + path[i].x + " Y: " + path[i].y + " Rx: " + player_x + " Ry: " + player_y);
                        //console.log("Obj console ON");

                        if (nextPointXObj < obj_x && nextPointYObj < obj_y) {
                            directionObj = "NW";
                        }
                        else if (nextPointXObj == obj_x && nextPointYObj < obj_y) {
                            directionObj = "N";
                        }
                        else if (nextPointXObj > obj_x && nextPointYObj < obj_y) {
                            directionObj = "NE";
                        }
                        else if (nextPointXObj < obj_x && nextPointYObj == obj_y) {
                            directionObj = "W";
                        }
                        else if (nextPointXObj > obj_x && nextPointYObj == obj_y) {
                            directionObj = "E";
                        }
                        else if (nextPointXObj > obj_x && nextPointYObj > obj_y) {
                            directionObj = "SE";
                        }
                        else if (nextPointXObj == obj_x && nextPointYObj > obj_y) {
                            directionObj = "S";
                        }
                        else if (nextPointXObj < obj_x && nextPointYObj > obj_y) {
                            directionObj = "SW";
                        }
                        else {
                            directionObj = "STOP";
                        }
                        moveEnemyObj();
                    }
                }
            });
            pathfinder.calculate();
        }, 100);

        orcObj.body.onBeginContact.add(orcObjattackOn, this);
        orcObj.body.onEndContact.add(orcObjattackOff, this);

        function orcObjattackOn(body) {
            if (body == null) {
            }
            else if (body.sprite == null) {
            }
            else if (body.sprite.key == 'cleric') {
                enemyAttackObj = 'attack on';
            }
            else {
            }
        }

        function orcObjattackOff(body) {
            if (body == null) {
            }
            else if (body.sprite == null) {
            }
            else if (body.sprite.key == 'cleric') {
                enemyAttackObj = 'attack off';
            }
            else {
            }
        }

        function animateOrcObj(x) {

            if (enemyAttackObj == 'attack on') {
                orcObj.animations.play('attack', 20, true);
            }

            if (enemyAttackObj == 'attack off') {
                if (x == 'walk') {
                    orcObj.animations.play('walk');
                }
                if (x == 'die') {
                    orcObj.animations.play('walk');
                }
                if (x == 'cast') {
                    orcObj.animations.play('walk');
                }
                if (x == 'idle') {
                    orcObj.animations.play('walk');
                }
            }
        }

        function moveEnemyObj() {

            animateOrcObj('walk');
            orcObj.body.setZeroVelocity();
            var enemySpeed = 151;

            if (enemyAttackObj == 'attack on') {
                orcObj.body.setZeroVelocity();
            }
            else {
                if (directionObj == "N") {
                    orcObj.body.moveUp(enemySpeed);
                }
                else if (directionObj == "S") {
                    orcObj.body.moveDown(enemySpeed);
                }
                else if (directionObj == "E") {
                    orcObj.body.moveRight(enemySpeed);
                    if (flipEnemyObj == true) {
                        orcObj.scale.x *= -1;
                        flipEnemyObj = false;
                    }
                }
                else if (directionObj == "W") {
                    orcObj.body.moveLeft(enemySpeed);
                    if (flipEnemyObj == false) {
                        orcObj.scale.x *= -1;
                        flipEnemyObj = true;
                    }
                }
                else if (directionObj == "SE") {
                    orcObj.body.moveDown(enemySpeed);
                    orcObj.body.moveRight(enemySpeed);
                }
                else if (directionObj == "NW") {
                    orcObj.body.moveUp(enemySpeed);
                    orcObj.body.moveLeft(enemySpeed);
                }
                else if (directionObj == "SW") {
                    orcObj.body.moveDown(enemySpeed);
                    orcObj.body.moveLeft(enemySpeed);
                }
                else if (directionObj == "NE") {
                    orcObj.body.moveUp(enemySpeed);
                    orcObj.body.moveRight(enemySpeed);
                }
                else if (directionObj == "STOP") {
                    orcObj.body.setZeroVelocity()
                    orcObj.animations.play('idle');
                }
                else {
                    orcObj.body.setZeroVelocity()
                    orcObj.animations.play('idle');
                }
            }
        }

        function doStuff(){

            orcRadius.position.x = orcObj.body.x;
            orcRadius.position.y = orcObj.body.y;

            if (checkOverlap(playerRadius, orcRadius)) {
                debug1 = 'Overlapping: true';
                pathfinderON = true;
            }
            else {
                debug1 = 'Overlapping: false';
            }
            function checkOverlap(spriteA, spriteB) {
                var boundsA = spriteA.getBounds();
                var boundsB = spriteB.getBounds();
                return Phaser.Rectangle.intersects(boundsA, boundsB);
            }
        }
        doStuff();

        orcObject.prototype.update = function ()
        {
            //doStuff();
        }
    }




