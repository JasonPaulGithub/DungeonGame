var orcArmy = [];

//Orc Factory
function Orc(id, x, y, game,li)
{
    this.speed = 10;
    this.game = game;
    this.id = id;
    this.li = li;
    this.orc = game.add.sprite(x, y, id);

    game.physics.arcade.enable(this.orc);

    this.orc.body.bounce.y = 0.2;
    this.orc.body.collideWorldBounds = true;
    this.orc.body.setSize(32,32);

    group.add(this.orc);

}

Orc.prototype.id = function()
{
    return this.id;
}

Orc.prototype.li = function()
{
    return this.li;
}

Orc.prototype.xLoc = function()
{
    var val = game.math.snapToFloor(Math.floor(this.orc.body.x), 32) / 32;
    return val;
}

Orc.prototype.yLoc = function()
{
    var val = game.math.snapToFloor(Math.floor(this.orc.body.y), 32) / 32;
    return val;
}