//notice how the diagonal direction does not return. Fix needed.
function pathfinder(obj_x, obj_y, plyr_x, plyr_y){
    this.easystar = new EasyStar.js();
    this.easystar.setGrid(level);
    this.easystar.setAcceptableTiles([0]);
    this.value = 5;
    this.easystar.findPath(obj_x, obj_y, plyr_x, plyr_y, function p1(obj_x, obj_y, path){});
}

pathfinder.prototype.p1 = function(thisObject){

        objectChanger(thisObject,'hello');
}

pathfinder.prototype.add = function(str)
{
    this.value = (str);
}

function objectChanger(obj, str){

    obj.add(str);
}

pathfinder.prototype.calculate = function()
{
    this.easystar.setIterationsPerCalculation(1000);
    this.easystar.calculate();
}