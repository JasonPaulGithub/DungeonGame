function enemyObject(index, game)
{

    this.game = game;
    var x = 222//game.world.randomX;
    var y = 222//game.world.randomY;
    //Note lack of 'this' on the x,y.


    this.enemy = game.add.sprite(x, y, 'orcThief');
    this.enemy.name = index.toString();
    game.physics.p2.enable(this.enemy, debugging);

    this.objDirection = '';
    this.enemyAttackObj = 'attack off';
    this.flipEnemyObj = false;

    this.nextX;
    this.nextY;
    this.objX;
    this.objY;
    this.pathfinderON = false;

    this.orcRadius;
    this.orcRadius = game.add.sprite(x, y,'orcThief');
    this.orcRadius.height=128;
    this.orcRadius.width=128;
    this.orcRadius.anchor.setTo(0.5,0.5);
    this.orcRadius.alpha=0.2;

}


/*
enemyObject.prototype.runFunction = function()
{
    this.value++;
}

function objectchanger(passObjectHere)
{
    passObjectHere.runFunction();
   //runs the method of the object being passed in
}

    var enemy1 = new enemyObject(1, game);
    enemy1(game);
*/
