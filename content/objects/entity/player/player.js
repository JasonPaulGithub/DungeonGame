//this.shadow = game.add.sprite(x, y, 'enemy', 'shadow'); //Note the last parm allows you to input into the group.
var player;

//Player Factory
function Player(id, x, y, game)
{
    this.speed = 10;
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
    var stats = this.id + ' x: ' + this.player.body.x + ' y: ' + this.player.body.y;
    return stats;
}

Player.prototype.moveUp = function()
{
    this.player.body.y -= this.speed;
}

Player.prototype.moveDown = function()
{
    this.player.body.y += this.speed;
}

Player.prototype.moveLeft = function()
{
    this.player.body.x -= this.speed;
}

Player.prototype.moveRight = function()
{
    this.player.body.x += this.speed;
}

function movePlayer()
{
    if (game.input.keyboard.addKey(Phaser.Keyboard.UP).isDown == true) {
        game.debug.text('Up key pressed', 100, 175);
        player.moveUp();
    }
    if (game.input.keyboard.addKey(Phaser.Keyboard.DOWN).isDown == true) {
        game.debug.text('Down key pressed', 100, 175);
        player.moveDown();
    }
    if (game.input.keyboard.addKey(Phaser.Keyboard.LEFT).isDown == true) {
        game.debug.text('Left key pressed', 100, 200);
        player.moveLeft();
    }
    if (game.input.keyboard.addKey(Phaser.Keyboard.RIGHT).isDown == true) {
        game.debug.text('Right key pressed', 100, 200);
        player.moveRight();
    }
}