//this.shadow = game.add.sprite(x, y, 'enemy', 'shadow'); //Note the last parm allows you to input into the group.
var player;

//Player Factory
function Player(id, xLoc, yLoc, game) {

    var x = xLoc;
    var y = yLoc;

    this.game = game;
    this.id = id;
    this.player = game.add.sprite(x, y, id);
    this.player.game.physics.p2.enable(this.player, true);
    this.player.body.setRectangle(32, 35);
    this.player.body.fixedRotation = true;
    this.player.anchor.setTo(0.5, 0.75);
    game.camera.follow(this.player);
}

Player.prototype.stats = function ()
{
    return this.id;
}

Player.prototype.upKey = function()
{
    this.player.body.x += 10;
    return 'hi ' + this.player.body.x;
}

/*
Player.prototype.render = function()
{
    this.body.setZeroVelocity();

    if (game.input.keyboard.addKey(Phaser.Keyboard.UP).isDown == true)
    {
        this.body.moveUp(spd);
    }
    if (game.input.keyboard.addKey(Phaser.Keyboard.DOWN).isDown == true)
    {
        this.body.moveDown(spd);
    }
    if (game.input.keyboard.addKey(Phaser.Keyboard.LEFT).isDown == true)
    {
        this.body.moveLeft(spd);
    }
    if (game.input.keyboard.addKey(Phaser.Keyboard.RIGHT).isDown == true)
    {
        this.body.moveRight(spd);
    }
}*/
