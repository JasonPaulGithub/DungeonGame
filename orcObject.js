orcObject = function (game){

    this.game = game;

    var x = 333;
    var y = 295;

    var enemyOrc = sortDepthGroup.create(x,y,'orc');

    game.physics.p2.enable(enemyOrc,true);
    enemyOrc.body.setCircle(16);
    enemyOrc.body.fixedRotation = true;
    enemyOrc.anchor.setTo(0.5,0.75);
}