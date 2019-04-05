var animate = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callBack) { window.setTimeout(callBack, 1000 / 60); };

//var ctx = new (window.AudioContext || window.webkitAudioContext)();

//var pxtone = new Pxtone();
//pxtone.decoder = pxtnDecoder;

//var bufferObj;
//var src;

//var requestor = new XMLHttpRequest();

//function readerload() {
  //ctx.decodePxtoneData(requestor.response).then(({buffer, data}) => {
    //bufferObj = {
      //buffer,
      //loopStart: data.loopStart,
      //loopEnd: data.loopEnd
    //};
  //});
//}

//requestor.addEventListener('load', readerload);

//var arrayBuffer = new ArrayBuffer();

//requestor.open("GET", "music/test.ptcop", true);
//requestor.responseType = "arraybuffer";
//requestor.onload = function (oEvent) {
    //arrayBuffer = requestor.response;
    //console.log(arrayBuffer);
//};
//requestor.send();


//ctx.decodePxtoneData = pxtone.decodePxtoneData.bind(pxtone, ctx);

//src = ctx.createBufferSource();
//src.buffer = bufferObj.buffer;
//src.loop = true;
//src.loopStart = bufferObj.loopStart;
//src.loopEnd = bufferObj.loopEnd;
//src.start(ctx.currentTime);
//src.connect(ctx.destination);

function RECT(xi, yi, xii, yii){
    this.x1 = xi;
    this.y1 = yi;
    this.x2 = xii;
    this.y2 = yii;
    
    this.move = function(xM, yM){
        this.x1 += xM;
        this.x2 += xM;
        this.y1 += yM;
        this.y2 += yM;
    }
}

function putRect(image, x, y, rectSrc)
{
    context.drawImage(image, rectSrc.x1, rectSrc.y1, rectSrc.x2, rectSrc.y2, (x - (x % 512)) / 512, (y - (y % 512)) / 512, rectSrc.x2, rectSrc.y2);
}

function putRect2(image, x, y, rectSrc)
{
    context.drawImage(image, rectSrc.x1, rectSrc.y1, rectSrc.x2, rectSrc.y2, x, y, rectSrc.x2, rectSrc.y2);
}

RECT.prototype.col = function(RectB){
    
        if ((this.x2 < RectB.x1 || this.x1 > RectB.x2) || (this.y2 < RectB.y1 || this.y1 > RectB.y2)) {
            return false;
        }
        return true;
    }

RECT.prototype.col2 = function(xx, yy){
    
        if ((this.x2 < (xx * 16 * 512) || this.x1 > ((xx + 1) * 16 * 512)) || (this.y2 < (yy * 16 * 512) || this.y1 > ((yy + 1) * 16 * 512))) {
            return false;
        }
        return true;
    }

var canvas = document.getElementById('canvas');
canvas.style.border = '1px solid white';
var width = 240;
var height = 240;
canvas.width = width;
canvas.height = height;
var context = canvas.getContext('2d');
var pframeCount = 0;
var pframe = 0;
var pdir = 0;
var gameState = 0;
var myX = 0;
var myY = 0;
var myXm = 0;
var myYm = 0;
var pRect = new RECT(2 * 512, 10 * 512, 14 * 512, 15 * 512);
var walkSpeed = 512;

var level = [];
for(var y = 0; y < 15; y++) {
    level[y] = [];
    for(var x = 0; x < 15; x++) {
        level[y][x] = false;
    }
}


level[6][6] = true;

function colLevel(colRect){
    for(var y = 0; y < 15; y++){
        for(var x = 0; x < 15; x++){
            if(level[y][x] == true){
                if(pRect.col2(x,y)){
                    return true;
                }
            }
        }   
    }
    return false;
}

function putLevel(){
    for(var y = 0; y < 15; y++){
        for(var x = 0; x < 15; x++){
            if(level[y][x]){
                context.fillRect(x * 16, y * 16, 16, 16);
            }
        }   
    }
    return false;
}

var doDebug = false;

var attackFrames = 0;

var MyIm = new Image();
MyIm.src = "fool.png";

var TitIm = new Image();
TitIm.src = "title.png";

canvas.addEventListener("mousedown", getPosition, false);

function getPosition(event)
{
    var x = event.x;
    var y = event.y;   
    console.log(x);
    console.log(y);
    x -= canvas.offsetLeft;
    y -= canvas.offsetTop; 
    console.log(x);
    console.log(y);
    
    var xPo = ((x - (x % 32)) / 32);
    var yPo = ((y - (y % 32)) / 32);
    
    if(doDebug && yPo > -1 && xPo > -1 && yPo < 15 && xPo < 15){
        level[yPo][xPo] = !level[yPo][xPo];
       }
    
}

var step = function () {
    context.fillStyle = '#17111A';
    context.fillRect(0, 0, width, height);
    
    switch (gameState) {
            
    case 0:
        runTitle();
        break;
            
    case 1:
        update();
        render();
        if(isJustPressed(KVAL.EQU)){
            doDebug = !doDebug;
        }
        break;
            
    case 2:
        editor();
        render();
        if(isJustPressed(KVAL.EQU)){
            gameState = 1;
        }
        break;
            
    }
    
    resetJustPressed();
    
    animate(step);
};


window.onload = function () {
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
    EQU     : 10,
    
    key     : {
        38  :   0b10,
        40  :   0b100,
        37  :   0b1000,
        39  :   0b10000,
        90  :   0b100000,
        88  :   0b1000000,
        67  :   0b10000000,
        27  :   0b100000000,
        16  :   0b1000000000,
        187 :   0b10000000000
    },
    
    map     : {
        0   :   38,
        1   :   40,
        2   :   37,
        3   :   39,
        4   :   90,
        5   :   88,
        6   :   67,
        7   :   27,
        8   :   16,
        9   :   187
    },
    
    map2    : {
        38  :   1,   
        40  :   2,   
        37  :   3,   
        39  :   4,   
        90  :   5,   
        88  :   6,   
        67  :   7,   
        27  :   8,   
        16  :   9,   
        187 :   10
    }
    
};

var keys = 0;
var justPressed = 0;

var kDown = function(event){
    if(!isPressed(KVAL.map2[event.KeyCode])){
        justPressed |= KVAL.key[event.keyCode];   
    }
    keys |= KVAL.key[event.keyCode];
};

var kUp = function(event){
    keys &= ~KVAL.key[event.keyCode];
};

var resetJustPressed = function(){
    for(i = 0; i < 10; i++){
        justPressed &= ~KVAL.key[KVAL.map[i]];
    }
};

window.addEventListener("keydown", kDown);

window.addEventListener("keyup", kUp);

var isPressed = function(bit){
    return ((keys>>bit) % 2 != 0);
};

var isJustPressed = function(bit){
    return ((justPressed>>bit) % 2 != 0);
};

var runTitle = function(){
    var string = "Keys Down: " + keys;
    context.fillStyle = "#ffffff";
    context.fillText(string, 0, 10, 10000);
    context.drawImage(TitIm, 120 - 32, 60 - 24);
    
    if(isPressed(KVAL.Z)){
       gameState = 1;
    }
    
};

var update = function() {
    
    if(isPressed(KVAL.LEFT)){
       myXm = 0 - walkSpeed;
        pdir = 1;
       }
    else if(isPressed(KVAL.RIGHT)){
       myXm = walkSpeed;
        pdir = 3
       }
    else{
        myXm = 0;
    }
    
    if(isPressed(KVAL.UP)){
       myYm = 0 - walkSpeed;
        pdir = 2
       }
    else if(isPressed(KVAL.DOWN)){
       myYm = walkSpeed;
        pdir = 0;
       }
    else{
        myYm = 0;
    }
    
    if(isPressed(KVAL.UP) || isPressed(KVAL.DOWN) || isPressed(KVAL.LEFT) || isPressed(KVAL.RIGHT)){
        if(++pframeCount >= 10){
            pframeCount = 0;
            if(++pframe >= 4){
                pframe = 0;
            }
        }
    }
    else{
        pframe = 0;
    }
    
    myX += myXm;
    pRect.move(myXm, 0);
    if(colLevel(pRect)){
        myX -= myXm;
        pRect.move(0 - myXm, 0);
    }
    
    myY += myYm;
    pRect.move(0, myYm);
    if(colLevel(pRect)){
        myY -= myYm;
        pRect.move(0, 0 - myYm);
    }
    
};

var render = function(){

    context.fillStyle = '#17111A';
    context.fillRect(0,0,width,height);
    
    context.fillStyle = "#ffffff";
    
    putLevel();

    context.drawImage(MyIm, 0 + (16 * pframe), 0 + (16 * pdir), 16, 16, (myX - (myX % 512)) / 512, (myY - (myY % 512)) / 512, 16, 16);
    var string = "" + pRect.x1 / 512 + " " + pRect.y1 / 512 + " " + pRect.x2 / 512 + " " + pRect.y2 / 512;
    context.fillStyle = "#ffffff";
    context.fillText(string, 0, 10, 10000);
};
//var npcAct = [ npc000 ];

function NPC( npcType, x,  y,  xm,  ym,  dir,  state,  parent){
    this.type = npcType;
    this.x = x; 
    this.y = y;
    this.xm = xm;
    this.ym = ym;
    this.dir = dir;
    this.state = state;
    this.parent = parent||false
};