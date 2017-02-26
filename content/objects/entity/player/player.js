var player;

//Player Factory
function Player(id,xLoc,yLoc)
{
    this.id   = id;
    this.xLoc = xLoc;
    this.yLoc = yLoc;
    player = game.add.sprite(this.xLoc, this.yLoc, this.id);

}

/*
game.physics.p2.enable(player_entity, true);
player_entity.body.setRectangle(32,35);
player_entity.body.fixedRotation = true;
player_entity.anchor.setTo(0.5,0.75);*/
