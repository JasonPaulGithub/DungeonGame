function debug()
{
    var rect = new Phaser.Rectangle( 0, 0,450,450) ;
    game.debug.geom( rect, 'rgba(0,0,0,0.4)');
    game.debug.text('DEBUG - Game Stats: ',100,100);

    game.debug.text('Object: ' + player.stats(), 100, 125);
    game.debug.text('Orc array length: ' + orc.length + ' \nindividual orc id: ' + orc[0].stats(), 100, 150);
    game.debug.text('Orc array length: ' + orc.length + ' \nindividual orc id: ' + orc[1].stats(), 100, 170);
    game.debug.text('Orc array length: ' + orc.length + ' \nindividual orc id: ' + orc[2].stats(), 100, 200);
}