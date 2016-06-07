orcObject = function (game){

    this.game = game;

    var x = 333;
    var y = 200;
    var enemyOrc = game.add.sprite (x,y,'orc');

    game.physics.p2.enable(enemyOrc,true);
    enemyOrc.body.setCircle(16);
    enemyOrc.body.fixedRotation = true;
    enemyOrc.anchor.setTo(0.5,0.75);
}