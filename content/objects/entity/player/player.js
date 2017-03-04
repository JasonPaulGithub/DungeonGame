//this.shadow = game.add.sprite(x, y, 'enemy', 'shadow'); //Note the last parm allows you to input into the group.
var player;

//Player Factory
function Player(id, x, y, game)
{
    this.speed = 10;
    this.game = game;
    this.id = id;
    this.player = game.add.sprite(x, y, id);

    game.physics.arcade.enable(this.player);
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


Player.prototype.moveUp = function()
{
    this.player.body.velocity.y -= this.speed;
}

Player.prototype.moveDown = function()
{
    this.player.body.velocity.y += this.speed;
}

Player.prototype.moveLeft = function()
{
    this.player.body.velocity.x -= this.speed;
}

Player.prototype.moveRight = function()
{
    this.player.body.velocity.x += this.speed;
}

function movePlayer()
{
    if (game.input.keyboard.addKey(Phaser.Keyboard.UP).isDown == true) {
        game.debug.text('Up key pressed', 10, 20);
        player.moveUp();
    }
    if (game.input.keyboard.addKey(Phaser.Keyboard.DOWN).isDown == true) {
        game.debug.text('Down key pressed', 10, 20);
        player.moveDown();
    }
    if (game.input.keyboard.addKey(Phaser.Keyboard.LEFT).isDown == true) {
        game.debug.text('Left key pressed', 10, 40);
        player.moveLeft();
    }
    if (game.input.keyboard.addKey(Phaser.Keyboard.RIGHT).isDown == true) {
        game.debug.text('Right key pressed', 10, 40);
        player.moveRight();
    }
}