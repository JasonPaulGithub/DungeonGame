//Entity Factory
function Entity(id,xLoc,yLoc){
    this.id   = id;
    this.xLoc = xLoc;
    this.yLoc = yLoc;
    //hp = hp
}
//Construct Entity
var entity1 = new Entity('Enemy_1',10,10); //TODO: add this to an array loop
entityCollection.push(entity1);

//TODO: Add behavours:
//create Enemy()
//delete Enemy()
//Move()
//attack()