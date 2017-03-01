var orcArmy = [];

//Orc Factory
function Orc(id, x, y, game,li)
{
    this.speed = 10;
    this.game = game;
    this.id = id;
    this.li = li;
    this.orc = game.add.sprite(x, y, id);
    this.orc.game.physics.p2.enable(this.orc, true);
    this.orc.body.setRectangle(32, 35);
    this.orc.body.fixedRotation = true;
    this.orc.anchor.setTo(0.5, 0.75);
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