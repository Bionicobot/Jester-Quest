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
var myX = 0;
var myY = 0;
var myXm = 0;
var myYm = 0;
const walkSpeed = 512;

var MyIm = new Image();
MyIm.src = "fool.png";

window.onload = function() {
  document.body.appendChild(canvas);
  animate(step);
};

var KVAL = {
    
    UP      : 1,
    DOWN    : 2,
    LEFT    : 3,
    RIGHT   : 4,
    Z       : 5,
    X       : 6,
    C       : 7,
    ESC     : 8,
    SHIFT   : 9,
    
    key     : {
        38  :   0b10,
        40  :   0b100,
        37  :   0b1000,
        39  :   0b10000,
        90  :   0b100000,
        88  :   0b1000000,
        67  :   0b10000000,
        27  :   0b100000000,
        16  :   0b1000000000
    }
};

var keys = 0;

var kDown = function(event){
    keys |= KVAL.key[event.keyCode];
};

var kUp = function(event){
    keys &= ~KVAL.key[event.keyCode];
};

window.addEventListener("keydown", kDown);

window.addEventListener("keyup", kUp);

var isPress = function(bit){
    return ((keys>>bit) % 2 != 0);
};

var runTitle = function(){
    var string = "Keys Down: " + keys;
    context.fillStyle = "#ffffff";
    context.fillText(string, 0, 10, 10000);
    if(isPress(KVAL.Z)){
       gameState = 1;
       }
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
    if(isPress(KVAL.UP)){
       myYm = 0 - walkSpeed;
       }
    else if(isPress(KVAL.DOWN)){
       myYm = walkSpeed;
       }
    else{
        myYm = 0;
    }
    if(isPress(KVAL.LEFT)){
       myXm = 0 - walkSpeed;
       }
    else if(isPress(KVAL.RIGHT)){
       myXm = walkSpeed;
       }
    else{
        myXm = 0;
    }
    myX += myXm;
    myY += myYm;
};

var render = function(){
    context.drawImage(MyIm, 0 + (16 * frame), 0 + (16 * dir), 16, 16, (myX - (myX % 512)) / 512, (myY - (myY % 512)) / 512, 16, 16);
    
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