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
var gameState = 0;

var MyIm = new Image();
MyIm.src = "fool.png";

window.onload = function() {
  document.body.appendChild(canvas);
  animate(step);
};

var KVAL = {
    UP      : 0b1,
    DOWN    : 0b10,
    LEFT    : 0b100,
    RIGHT   : 0b1000,
    Z       : 0b10000,
    X       : 0b100000,
    C       : 0b1000000,
    ESC     : 0b10000000,
    SHIFT   : 0b100000000,
    
    key     : {
        38  :   0b1,
        40  :   0b10,
        37  :   0b100,
        39  :   0b1000,
        90  :   0b10000,
        88  :   0b100000,
        67  :   0b1000000,
        27  :   0b10000000,
        16  :   0b100000000
    }
};

var keysDown = 0;

window.addEventListener("keydown", function(event) {
    if(!keysDown & KVAL.key[event.keyCode] == KVAL.key[event.keyCode]){
       keysDown |= KVAL.key[event.keyCode];
       }
  //keysDown[event.keyCode] = true;
});

window.addEventListener("keyup", function(event) {
    if(keysDown & KVAL.key[event.keyCode] == KVAL.key[event.keyCode]){
       keysDown &= ~KVAL.key[event.keyCode];
       }
});


var runTitle = function(){
    var string = "Keys Down: " + keysDown;
    context.fillStyle = "#ffffff";
    context.fillText(string, 0, 10, 10000);
};

var step = function(){
    context.fillStyle = '#17111A';
    context.fillRect(0,0,width,height);
    
    switch(gameState){
        case 0:
            runTitle();
            break;
        case 1:
            update();
            render();
            break;
    }
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