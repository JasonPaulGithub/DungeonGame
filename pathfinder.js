//notice how the diagonal direction does not return. Fix needed.
function pathfinder(obj_x, obj_y, plyr_x, plyr_y){

    this.easystar = new EasyStar.js();
    this.easystar.setGrid(level);
    this.easystar.setAcceptableTiles([0]);

    //this.value = 5;

    this.easystar.findPath(obj_x, obj_y, plyr_x, plyr_y, function(path){

        var o = new myobject();

        if (path[1].x == obj_x && path[1].y > obj_y) {
            objectchanger(o, 'GO SOUTH!');
            console.log('new value: ' + o.value); // the value is now 6
        }
    });
}

function myobject()
{
    this.value = 5;
}
myobject.prototype.add = function(str)
{
    this.value = str;
}
function objectchanger(obj,str)
{
    obj.add(str);
}



pathfinder.prototype.calculate = function()
{
    this.easystar.setIterationsPerCalculation(1000);
    this.easystar.calculate();
}