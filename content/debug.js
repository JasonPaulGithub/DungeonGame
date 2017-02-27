function debug()
{
    var rect = new Phaser.Rectangle( 0, 0,450,450) ;
    game.debug.geom( rect, 'rgba(0,0,0,0.4)');
    game.debug.text('DEBUG - Game Stats: ',100,100);
    game.debug.text( 'Object ID: '+player.stats(),100,125);
}