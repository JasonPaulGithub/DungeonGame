//this.shadow = game.add.sprite(x, y, 'enemy', 'shadow'); //Note the last parm allows you to input into the group.
var player;

//Player Factory
function Player(id, x, y, game)
{
    this.speed = 120;
    this.game = game;
    this.id = id;
    this.player = game.add.sprite(x, y, id);

    game.physics.arcade.enable(this.player);

    this.player.body.bounce.y = 0.2;
    this.player.body.collideWorldBounds = true;
    this.player.body.setSize(32,32);

    game.camera.follow(this.player);
    group.add(this.player);
}

Player.prototype.xLoc = function ()
{
    var val = game.math.snapToFloor(Math.floor(this.player.body.x), 32) / 32;
    return val;
}

Player.prototype.yLoc = function ()
{
    var val = game.math.snapToFloor(Math.floor(this.player.body.y), 32) / 32;
    return val;
}

Player.prototype.runMe = function()
{
    // https://phaser.io/examples/v2/arcade-physics/platformer-basics
    if (game.input.keyboard.addKey(Phaser.Keyboard.UP).isDown)
    {
        game.debug.text('Up key pressed', 10, 20);
        this.player.body.velocity.y -= this.speed;
    }
    else if (game.input.keyboard.addKey(Phaser.Keyboard.DOWN).isDown)
    {
        game.debug.text('Down key pressed', 10, 20);
        this.player.body.velocity.y += this.speed;
    }
    else if (game.input.keyboard.addKey(Phaser.Keyboard.LEFT).isDown == true)
    {
        game.debug.text('Left key pressed', 10, 40);
        this.player.body.velocity.x -= this.speed;
    }
    else if (game.input.keyboard.addKey(Phaser.Keyboard.RIGHT).isDown == true)
    {
        game.debug.text('Right key pressed', 10, 40);
        this.player.body.velocity.x += this.speed;
    } else {
        this.player.body.velocity.x = 0;
        this.player.body.velocity.y = 0;
    }
}