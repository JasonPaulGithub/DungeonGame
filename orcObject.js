orcObject = function (game){

    this.game = game;

    var x = 333;
    var y = 295;

    var value = 10; // <<< get this value here

    var enemyOrc = sortDepthGroup.create(x,y,'orc');

    game.physics.p2.enable(enemyOrc,true);
    enemyOrc.body.setCircle(16);
    enemyOrc.body.fixedRotation = true;
    enemyOrc.anchor.setTo(0.5,0.75);
}

orcObject.getValue= function(){
    //we need to find a way to get a response out of this object so we can experiment with the easyStar.js file.
    return 'Implement me!';
}