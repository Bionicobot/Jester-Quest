var animate = window.requestAnimationFrame || 
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function(callBack) { window.setTimeout(callBack, 1000/60)};

var canvas = document.getElementById('canvas');
var width = 240;
var height = 240;
canvas.width = width;
canvas.height = height;
var context = canvas.getContext('2d');
var frameCount = 0;
var frame = 0;
var dir = 0;

var MyIm = new Image();
MyIm.src = "fool.png";

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
    if(++frameCount >= 10){
        frameCount = 0;
    if(++frame >= 4){
        frame = 0;
       if(++dir >= 4){
          dir = 0;
          }
       }
    }
};

var render = function(){
    context.fillStyle = '#17111A';
  context.fillRect(0,0,width,height);
    context.drawImage(MyIm, 0 + (16 * frame), 0 + (16 * dir), 16, 16, 0, 0, 16, 16);
    
};
var npcAct = [ npc000 ];

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