function enemyObject(index, sprite, game)
{
    this.game = game;


    // Note lack of 'this' on the x,y>>
    var x = 222//game.world.randomX;
    var y = 222//game.world.randomY;
    var animateSpeed = 20;

    this.enemy = game.add.sprite(x, y, sprite);
    this.enemy.name = index.toString();
    this.enemy.animations.add('idle',   [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], animateSpeed/4, false);
    this.enemy.animations.add('cast',   [10, 11, 12, 13, 14, 15, 16, 17, 18, 19], animateSpeed, false);
    this.enemy.animations.add('walk',   [20, 21, 22, 23, 24, 25, 26, 27, 28, 29], animateSpeed, false);
    this.enemy.animations.add('attack', [30, 31, 32, 33, 34, 35, 36, 37, 38, 39], animateSpeed, false);
    this.enemy.animations.add('die',    [40, 41, 42, 43, 44, 45, 46, 47, 48, 49], animateSpeed, false);
    game.physics.p2.enable(this.enemy, debugging);

    this.orcRadius;
    this.orcRadius = game.add. sprite(x, y,sprite);
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
