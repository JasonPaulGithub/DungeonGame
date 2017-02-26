var player;
var spd = 700;

//Player Factory
function Player(id,xLoc,yLoc)
{
    this.id   = id;
    this.xLoc = xLoc;
    this.yLoc = yLoc;
    player = game.add.sprite(this.xLoc, this.yLoc, this.id);
}

function movePlayer()
{
    player.body.setZeroVelocity();

    if (game.input.keyboard.addKey(Phaser.Keyboard.UP).isDown == true)
    {
        player.body.moveUp(spd);
    }
    if (game.input.keyboard.addKey(Phaser.Keyboard.DOWN).isDown == true)
    {
        player.body.moveDown(spd);
    }
    if (game.input.keyboard.addKey(Phaser.Keyboard.LEFT).isDown == true)
    {
        player.body.moveLeft(spd);
    }
    if (game.input.keyboard.addKey(Phaser.Keyboard.RIGHT).isDown == true)
    {
        player.body.moveRight(spd);
    }
}