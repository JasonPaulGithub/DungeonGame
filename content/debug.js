function debug()
{
    var rect = new Phaser.Rectangle( 0, 0,450,450) ;
    game.debug.geom( rect, 'rgba(0,0,0,0.4)');
    game.debug.text('DEBUG - Game Stats: ',100,100);

    game.debug.text('Player (x:' + player.xLoc()+" y:"+player.yLoc()+") ", 100, 125);

/*
    //TODO: create a for loop to count and display orcs. [[],[]]
    game.debug.text('Orc array length: ' + orcArmy.length, 100, 150);
    game.debug.text('Individual orc id: ' + orcArmy[0].id, 100, 175);
    game.debug.text('Individual orc listing: ' + orcArmy[0].li, 100, 200); //TODO: get rid of listing
    game.debug.text('x: ' + orcArmy[0].xLoc(), 100, 225);
    game.debug.text('y: ' + orcArmy[0].yLoc(), 100, 250);
*/

}