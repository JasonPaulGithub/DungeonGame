function enemyObject(index, game)
{

    //Note: Doesn't use the THIS keyword.
    var x = 222//game.world.randomX;
    var y = 222//game.world.randomY;

    this.game = game;

    this.enemy = game.add.sprite(x, y, 'orcThief');
    this.enemy.name = index.toString();

    game.physics.p2.enable(this.enemy, debugging);

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
