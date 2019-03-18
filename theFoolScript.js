var animate = window.requestAnimationFrame || 
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function(callBack) { window.setTimeout(callBack, 1000/60)};

var canvas = document.getElementById('canvas');
canvas.style.border = '1px solid white';
var width = 480;
var height = 480;
canvas.width = width;
canvas.height = height;
var context = canvas.getContext('2d');

window.onload = function() {
  document.body.appendChild(canvas);
  animate(step);
};

var step = function(){
    update();
    render();
    animate(step);
};

var update = function() {
};

var render = function(){

    context.fillStyle = '#17111A';
    context.fillRect(0,0,width,height);
    
};


function NPC( npcType, x,  y,  xm,  ym,  dir,  state,  parent){
    this.type = npcType;
    this.x = x; 
    this.y = y;
    this.xm = xm;
    this.ym = ym;
    this.dir = dir;
    this.state = state;
    this.parent = parent||false;
}