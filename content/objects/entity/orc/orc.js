var orc = [];

//Orc Factory
function Orc(id, x, y, game)
{
    this.speed = 10;
    this.game = game;
    this.id = id;
    this.player = game.add.sprite(x, y, id);
    this.player.game.physics.p2.enable(this.player, true);
    this.player.body.setRectangle(32, 35);
    this.player.body.fixedRotation = true;
    this.player.anchor.setTo(0.5, 0.75);
}

Orc.prototype.stats = function ()
{
    var stats = this.id + ' x: ' + this.player.body.x + ' y: ' + this.player.body.y;
    return stats;
}