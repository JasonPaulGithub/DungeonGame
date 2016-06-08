    orcObject = function (game) {

        this.game = game;
        var x = 333;
        var y = 295;

        ///
        var directionObj;
        var enemyAttackObj = 'attack off';
        var flipEnemyObj = false;

        var nextPointXObj;
        var nextPointYObj;
        var orcObjStopPathFinder = false;

        var orcObj = sortDepthGroup.create(x, y, 'orcThief');

        game.physics.p2.enable(orcObj, true);
        orcObj.body.setCircle(16);
        orcObj.body.fixedRotation = true;
        orcObj.anchor.setTo(0.5, 0.75);

        /////// EasyStar
        var phaserJSON = game.cache.getJSON('version');
        var data = phaserJSON.layers[3].data; //grab the wall layer
        var preArray = [];
        var postArray = [];
        var level = [];

        for (var i = 0; i < data.length; i++) {
            preArray.push(data[i]);
        }

        var dcv = Math.sqrt(data.length);
        var dataLength = data.length;

        for (var x = 0; x < dataLength; x += dcv) {
            postArray = preArray.slice(0, dcv);
            level.push(postArray);
            preArray.splice(0, dcv);
        }

        var pathfinder = new EasyStar.js();
        pathfinder.setGrid(level);
        pathfinder.setAcceptableTiles([0]);
        //pathfinder.enableDiagonals();

        setInterval(function () {

            var enemy_xObj = game.math.snapToFloor(Math.floor(orcObj.position.x), 32) / 32;
            var enemy_yObj = game.math.snapToFloor(Math.floor(orcObj.position.y), 32) / 32;

            console.log(enemy_xObj);
            console.log(enemy_yObj);

            pathfinder.findPath(enemy_xObj, enemy_y, player_x, player_y, function (path) {

                if (path) {
                    nextPointXObj = path[1].x;
                    nextPointYObj = path[1].y;
                }

                if (path === null || orcObjStopPathFinder == true) {
                    console.log("Pathfinder: DORMANT");
                }

                else {
                    for (var i = 0; i < path.length; i++) {
                        //console.log("X: " + path[i].x + " Y: " + path[i].y + " Rx: " + enemy_x + " Ry: " + enemy_y);
                        console.log("Obj console ON");
                        if (nextPointXObj < enemy_xObj && nextPointYObj < enemy_yObj) {
                            directionObj = "NW";
                        }
                        else if (nextPointXObj == enemy_xObj && nextPointYObj < enemy_yObj) {
                            directionObj = "N";
                        }
                        else if (nextPointXObj > enemy_xObj && nextPointYObj < enemy_yObj) {
                            directionObj = "NE";
                        }
                        else if (nextPointXObj < enemy_xObj && nextPointYObj == enemy_yObj) {
                            directionObj = "W";
                        }
                        else if (nextPointXObj > enemy_xObj && nextPointYObj == enemy_yObj) {
                            directionObj = "E";
                        }
                        else if (nextPointXObj > enemy_xObj && nextPointYObj > enemy_yObj) {
                            directionObj = "SE";
                        }
                        else if (nextPointXObj == enemy_xObj && nextPointYObj > enemy_yObj) {
                            directionObj = "S";
                        }
                        else if (nextPointXObj < enemy_xObj && nextPointYObj > enemy_yObj) {
                            directionObj = "SW";
                        }
                        else {
                            directionObj = "STOP";
                        }
                        moveEnemy();
                    }
                }
            });
            pathfinder.calculate();

        }, 80);

        orcObj.body.onBeginContact.add(orcObjattackOn, this);
        orcObj.body.onEndContact.add(orcObjattackOff, this);


        function orcObjattackOn(body) {
            if (body == null) {
            }
            else if (body.sprite == null) {
            }
            else if (body.sprite.key = 'cleric') {
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
            else if (body.sprite.key = 'cleric') {
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

        function moveEnemy() {

            // Enemy physics:
            // http://phaser.io/examples/v2/p2-physics/contact-material

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
    }