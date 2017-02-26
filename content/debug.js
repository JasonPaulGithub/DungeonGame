function debug()
{
    var rect = new Phaser.Rectangle( 0, 0,250,250) ;
    game.debug.geom( rect, 'rgba(0,0,0,0.4)');
    game.debug.text('Player X:'+player.x+' Y:'+player.y,10,30,"#ffffff");
    game.debug.text('');
}