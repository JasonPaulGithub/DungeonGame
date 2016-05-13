var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });

var loadingLabel;

function preload() {

    //  Specify a unique key and a URL path
    //  The key must be unique between all images.
    game.load.image('imageKey', 'assets/img/ghost.png');

}

function create() {
    game.add.plugin(Phaser.Plugin.Debug);
    game.add.plugin(Phaser.Plugin.Inspector);

    game.add.image(95, 300, 'imageKey');
    loadingLabel = game.add.text(200, 150, 'The game is loading...', {font: '30px Courier', fill: '#fff'});
}






