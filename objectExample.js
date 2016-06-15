function myobject()
{
    this.value = 5;
}
myobject.prototype.add = function()
{
    this.value++;
}
function objectchanger(obj)
{
    obj.add(); // runs the method of the object being passed in
}

var o = new myobject();
alert(o.value); // o.value = 5
objectchanger(o);
alert(o.value); // the value is now 6