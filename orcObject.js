    orcObject = function (game) {

        this.game = game;
        var x = 333;
        var y = 295;

        ///
        var directionObj;
        var enemyAttackObj = 'attack off';
        var flipEnemyObj = false;

        var orcObjNextPointX;
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

        var easystar = new EasyStar.js();
        easystar.setGrid(level);
        easystar.setAcceptableTiles([0]);
        //easystar.enableDiagonals();

        setInterval(function () {

            easystar.findPath(enemy_x, enemy_y, player_x, player_y, function (path) {

                if (path) {
                    orcObjNextPointX = path[1].x;
                    nextPointYObj = path[1].y;
                }

                if (path === null || orcObjStopPathFinder == true) {
                    console.log("Pathfinder: DORMANT");
                    console.log('Pathfinder: ON');
                }

                else {
                    for (var i = 0; i < path.length; i++) {
                        console.log("X: " + path[i].x + " Y: " + path[i].y + " Rx: " + enemy_x + " Ry: " + enemy_y);

                        if (orcObjNextPointX < enemy_x && nextPointYObj < enemy_y) {
                            directionObj = "NW";
                        }
                        else if (orcObjNextPointX == enemy_x && nextPointYObj < enemy_y) {
                            directionObj = "N";
                        }
                        else if (orcObjNextPointX > enemy_x && nextPointYObj < enemy_y) {
                            directionObj = "NE";
                        }
                        else if (orcObjNextPointX < enemy_x && nextPointYObj == enemy_y) {
                            directionObj = "W";
                        }
                        else if (orcObjNextPointX > enemy_x && nextPointYObj == enemy_y) {
                            directionObj = "E";
                        }
                        else if (orcObjNextPointX > enemy_x && nextPointYObj > enemy_y) {
                            directionObj = "SE";
                        }
                        else if (orcObjNextPointX == enemy_x && nextPointYObj > enemy_y) {
                            directionObj = "S";
                        }
                        else if (orcObjNextPointX < enemy_x && nextPointYObj > enemy_y) {
                            directionObj = "SW";
                        }
                        else {
                            directionObj = "STOP";
                        }
                        moveEnemy();
                    }
                }
            });
            easystar.calculate();

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