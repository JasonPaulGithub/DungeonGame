var player;

//Player Factory
function Player(id,xLoc,yLoc)
{
    this.id   = id;
    this.xLoc = xLoc;
    this.yLoc = yLoc;
    player = game.add.sprite(this.xLoc, this.yLoc, this.id);

    this.game.physics.p2.enable(player_entity, true);
    this.body.setRectangle(32,35);
    this.body.fixedRotation = true;
    this.anchor.setTo(0.5,0.75);
}