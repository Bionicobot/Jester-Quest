/* global window, document, Image, $, Blob */
/*jslint bitwise: true */
var animate = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callBack) { "use strict"; window.setTimeout(callBack, 1000 / 60); };

//$("body").hide();
$.getScript("/test.js");

var canvas = document.getElementById('canvas');

var paraG;
var nextLInput;
var nextUInput;
var nextRInput;
var nextDInput;
var tileInput;
var drawModeSelect;
var drawTileSelect;
var drawMode = 0;
var curDrawTile = 0;
var break1;
var break2;
var break3;
var dT1;
var dT2;
var dT3;
var dT4;

var tileSet = new Image();
tileSet.src = "levels/0.png";

var level = [];

var backTile = [];

var foreTile = [];

var curNextTo = [-1, -1, -1, -1];

//var gNPCs = [];

var curTileset = 0;

function initDebug() {
	"use strict";
	paraG = window.document.createElement('p');
    document.getElementsByTagName("P")[0].appendChild(paraG);
	
	dT1 = window.document.createElement('p');
	dT1.textContent = "Surrounding Levels";
    paraG.appendChild(dT1);
	
	nextLInput = window.document.createElement('input');
	nextLInput.setAttribute("type", "text");
    paraG.appendChild(nextLInput);
	
	nextUInput = window.document.createElement('input');
	nextUInput.setAttribute("type", "text");
    paraG.appendChild(nextUInput);
	
	nextRInput = window.document.createElement('input');
	nextRInput.setAttribute("type", "text");
    paraG.appendChild(nextRInput);
	
	nextDInput = window.document.createElement('input');
	nextDInput.setAttribute("type", "text");
    paraG.appendChild(nextDInput);
	
	break1 = window.document.createElement('br');
    paraG.appendChild(break1);
	
	dT3 = window.document.createElement('p');
	dT3.textContent = "Tileset";
    paraG.appendChild(dT3);
	
	tileInput = window.document.createElement('input');
	tileInput.setAttribute("type", "text");
    paraG.appendChild(tileInput);
	
	break3 = window.document.createElement('br');
    paraG.appendChild(break3);
	
	dT2 = window.document.createElement('p');
	dT2.textContent = "Draw Mode";
    paraG.appendChild(dT2);
	
	drawModeSelect = window.document.createElement('input');
	drawModeSelect.setAttribute("type", "text");
    paraG.appendChild(drawModeSelect);
	
	break2 = window.document.createElement('br');
    paraG.appendChild(break2);
	
	dT4 = window.document.createElement('p');
	dT4.textContent = "Draw Tile";
    paraG.appendChild(dT4);
	
	drawTileSelect = window.document.createElement('input');
	drawTileSelect.setAttribute("type", "text");
    paraG.appendChild(drawTileSelect);
	
	nextLInput.value = curNextTo[0];
	nextUInput.value = curNextTo[1];
	nextRInput.value = curNextTo[2];
	nextDInput.value = curNextTo[3];
	tileInput.value = curTileset;
	drawModeSelect.value = drawMode;
	drawTileSelect.value = curDrawTile;

	nextLInput.addEventListener('keydown', function onEvent(event) {
		if (event.key === "Enter") {
			curNextTo[0] = parseInt(nextLInput.value, 10);
			return false;
		}
	});
	
	nextUInput.addEventListener('keydown', function onEvent(event) {
		if (event.key === "Enter") {
			curNextTo[1] = parseInt(nextUInput.value, 10);
			return false;
		}
	});
	
	nextRInput.addEventListener('keydown', function onEvent(event) {
		if (event.key === "Enter") {
			curNextTo[2] = parseInt(nextRInput.value, 10);
			return false;
		}
	});
	
	nextDInput.addEventListener('keydown', function onEvent(event) {
		if (event.key === "Enter") {
			curNextTo[3] = parseInt(nextDInput.value, 10);
			return false;
		}
	});
	
	tileInput.addEventListener('keydown', function onEvent(event) {
		if (event.key === "Enter") {
			curTileset = parseInt(tileInput.value, 10);
			tileSet.src = "levels/" + curTileset + ".png";
			return false;
		}
	});

	drawModeSelect.addEventListener('keydown', function onEvent(event) {
		if (event.key === "Enter") {
			drawMode = parseInt(drawModeSelect.value, 10);
			return false;
		}
	});

	drawTileSelect.addEventListener('keydown', function onEvent(event) {
		if (event.key === "Enter") {
			curDrawTile = parseInt(drawTileSelect.value, 10);
			return false;
		}
	});
}

canvas.style.border = '1px solid white';
var width = 240;
var height = 240;
canvas.width = width;
canvas.height = height;
var context = canvas.getContext('2d');

function RECT(xi, yi, xii, yii) {
    "use strict";
    this.x1 = xi;
    this.y1 = yi;
    this.x2 = xii;
    this.y2 = yii;
    
    this.move = function (xM, yM) {
        this.x1 += xM;
        this.x2 += xM;
        this.y1 += yM;
        this.y2 += yM;
    };
}

//function STAGE() {
    //"use strict";
    //this.nextTo = [0, 0, 0, 0];
    
    //this.tileset = 0;
    
    //this.level = [];
    
    //var y, x;
    
    //for (y = 0; y < 15; y += 1) {
        //this.level[y] = [];
        //for (x = 0; x < 15; x += 1) {
            //this.level[y][x] = false;
        //}
    //}
    
    //this.numNPC = 0;
    
    //this.NPCs = [];
//}

var saveLevel = function (filename, data) {
	"use strict";
    var blob = new Blob([data], {type: 'text/csv'}), elem;
    if (window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveBlob(blob, filename);
    } else {
        elem = window.document.createElement('a');
		elem.textContent = "Download";
		//elem.onclick = function () {
			//document.body.removeChild(elem);
			//window.URL.revokeObjectURL(elem);
		//};
        elem.href = window.URL.createObjectURL(blob);
        elem.download = filename;
        document.body.appendChild(elem);
        //elem.click();
    }
};

function loadLevel(numStage) {
	"use strict";
	var levelText = "", i, splote = [], x, y;
	$.get('levels/' + numStage + '.txt', function (data) {
		
		levelText = data;
		
		splote = levelText.split(",");
		
		for (i = 0; i < 4; i += 1) {
			curNextTo[i] = parseInt(splote[i], 10);
		}
		
		curTileset = parseInt(splote[4], 10);
		
		for (y = 0; y < 15; y += 1) {
			for (x = 0; x < 15; x += 1) {
				level[y][x] = parseInt(splote[(((y * 15) + x) + 5)], 10);
			}
		}
		
		for (y = 0; y < 15; y += 1) {
			for (x = 0; x < 15; x += 1) {
				backTile[y][x] = parseInt(splote[(((y * 15) + x) + 5 + 226)], 10);
			}
		}
		
		for (y = 0; y < 15; y += 1) {
			for (x = 0; x < 15; x += 1) {
				foreTile[y][x] = parseInt(splote[(((y * 15) + x) + 5 + 226 + 226)], 10);
			}
		}
	});
}

function saveStage(numStage) {
    "use strict";
    var temp = "", fileName = "", y, x;
    temp += curNextTo[0] + "," + curNextTo[1] + "," + curNextTo[2] + "," + curNextTo[3] + ",";
    temp += curTileset + ",";
	for (y = 0; y < 15; y += 1) {
        for (x = 0; x < 15; x += 1) {
            temp += level[y][x] + ",";
        }
	}
    temp += ",";
	for (y = 0; y < 15; y += 1) {
        for (x = 0; x < 15; x += 1) {
            temp += backTile[y][x] + ",";
        }
	}
    temp += ",";
	for (y = 0; y < 15; y += 1) {
        for (x = 0; x < 15; x += 1) {
            temp += foreTile[y][x] + ",";
        }
	}
    //temp.numNPC = gNPCs.length;
    //temp.NPCs = gNPCs;
	fileName += numStage;
	fileName += ".txt";
	saveLevel(fileName, temp);
}

//function putRect(image, x, y, rectSrc) {
    //"use strict";
    //context.drawImage(image, rectSrc.x1, rectSrc.y1, rectSrc.x2, rectSrc.y2, (x - (x % 512)) / 512, (y - (y % 512)) / 512, rectSrc.x2, rectSrc.y2);
//}

//function putRect2(image, x, y, rectSrc) {
    //"use strict";
    //context.drawImage(image, rectSrc.x1, rectSrc.y1, rectSrc.x2, rectSrc.y2, x, y, rectSrc.x2, rectSrc.y2);
//}

RECT.prototype.col = function (RectB) {
    "use strict";
    if ((this.x2 < RectB.x1 || this.x1 > RectB.x2) || (this.y2 < RectB.y1 || this.y1 > RectB.y2)) {
        return false;
    }
    return true;
};

RECT.prototype.col2 = function (xx, yy) {
    "use strict";
    if ((this.x2 < (xx * 16 * 512) || this.x1 > ((xx + 1) * 16 * 512)) || (this.y2 < (yy * 16 * 512) || this.y1 > ((yy + 1) * 16 * 512))) {
        return false;
    }
    return true;
};

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

function initLevel() {
    "use strict";
    var y, x;
    for (y = 0; y < 15; y += 1) {
        level[y] = [];
        backTile[y] = [];
        foreTile[y] = [];
        for (x = 0; x < 15; x += 1) {
            level[y][x] = 0;
			backTile[y][x] = 0;
			foreTile[y][x] = 0;
        }
    }
}

initLevel();

level[6][6] = 1;

function colLevel(colRect) {
    "use strict";
    var y, x;
    for (y = 0; y < 15; y += 1) {
        for (x = 0; x < 15; x += 1) {
            if (level[y][x] === 1) {
                if (colRect.col2(x, y)) {
                    return true;
                }
            }
        }
    }
    return false;
}

function putLevel(fore) {
    "use strict";
    var y, x;
    for (y = 0; y < 15; y += 1) {
        for (x = 0; x < 15; x += 1) {
            if (fore) {
				context.drawImage(tileSet, (16 * (foreTile[y][x] % 16)), (foreTile[y][x] - (foreTile[y][x] % 16)), 16, 16, x * 16, y * 16, 16, 16);
            } else {
				context.drawImage(tileSet, (16 * (backTile[y][x] % 16)), (backTile[y][x] - (foreTile[y][x] % 16)), 16, 16, x * 16, y * 16, 16, 16);
			}
			
        }
    }
    return false;
}

var doDebug = false;

var MyIm = new Image();
MyIm.src = "fool.png";

var TitIm = new Image();
TitIm.src = "title.png";

function getPosition(event) {
    "use strict";
    var x = event.x, y = event.y, xPo, yPo;
    
    x -= canvas.offsetLeft;
    y -= canvas.offsetTop;
    
    xPo = ((x - (x % 32)) / 32);
    yPo = ((y - (y % 32)) / 32);
    
    if (doDebug && yPo > -1 && xPo > -1 && yPo < 15 && xPo < 15) {
		switch (drawMode) {
		case 0:
			if (level[yPo][xPo] === 0) {
				level[yPo][xPo] = 1;
			} else {
				level[yPo][xPo] = 0;
			}
			break;
		
		case 1:
			backTile[yPo][xPo] = curDrawTile;
			break;
		
		case 2:
			foreTile[yPo][xPo] = curDrawTile;
			break;
		}
    }
    
}

canvas.addEventListener("mousedown", getPosition, false);

Object.defineProperty(Number.prototype, 'b', {set: function () {"use strict"; return false; }, get: function () {"use strict"; return parseInt(this, 2); }});

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
        38  :   (10).b,
        40  :   (100).b,
        37  :   (1000).b,
        39  :   (10000).b,
        90  :   (100000).b,
        88  :   (1000000).b,
        67  :   (10000000).b,
        27  :   (100000000).b,
        16  :   (1000000000).b,
        187 :   (10000000000).b
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

var isPressed = function (bit) {
	"use strict";
    return ((keys >> bit) % 2 !== 0);
};

var isJustPressed = function (bit) {
	"use strict";
    return ((justPressed >> bit) % 2 !== 0);
};


var kDown = function (event) {
	"use strict";
    if (!isPressed(KVAL.map2[event.KeyCode])) {
        justPressed |= KVAL.key[event.keyCode];
    }
    keys |= KVAL.key[event.keyCode];
};

var kUp = function (event) {
	"use strict";
    keys &= ~KVAL.key[event.keyCode];
};

var resetJustPressed = function () {
	"use strict";
	var i;
    for (i = 0; i < 10; i += 1) {
        justPressed &= ~KVAL.key[KVAL.map[i]];
    }
};

window.addEventListener("keydown", kDown);

window.addEventListener("keyup", kUp);

var runTitle = function () {
	"use strict";
    var string = "Keys Down: " + keys;
    context.fillStyle = "#ffffff";
    context.fillText(string, 0, 10, 10000);
    context.drawImage(TitIm, 120 - 32, 60 - 24);
    
    if (isPressed(KVAL.Z)) {
		gameState = 1;
    }
    
};

var update = function () {
    "use strict";
    if (isPressed(KVAL.LEFT)) {
        myXm = -walkSpeed;
        pdir = 1;
    } else if (isPressed(KVAL.RIGHT)) {
        myXm = walkSpeed;
        pdir = 3;
    } else {
        myXm = 0;
    }
    
    if (isPressed(KVAL.UP)) {
        myYm = -walkSpeed;
        pdir = 2;
    } else if (isPressed(KVAL.DOWN)) {
        myYm = walkSpeed;
        pdir = 0;
    } else {
        myYm = 0;
    }
    
    if (isPressed(KVAL.UP) || isPressed(KVAL.DOWN) || isPressed(KVAL.LEFT) || isPressed(KVAL.RIGHT)) {
		pframeCount += 1;
        if (pframeCount >= 10) {
            pframeCount = 0;
			pframe += 1;
            if (pframe >= 4) {
                pframe = 0;
            }
        }
    } else {
        pframe = 0;
    }
    
    myX += myXm;
    pRect.move(myXm, 0);
    if (colLevel(pRect)) {
        myX -= myXm;
        pRect.move(-myXm, 0);
    }
    
    myY += myYm;
    pRect.move(0, myYm);
    if (colLevel(pRect)) {
        myY -= myYm;
        pRect.move(0, -myYm);
    }
    
};

var render = function () {
	"use strict";
    context.fillStyle = '#17111A';
    context.fillRect(0, 0, width, height);
    
    context.fillStyle = "#ffffff";
    
    putLevel(false);

    context.drawImage(MyIm, (16 * pframe), (16 * pdir), 16, 16, (myX - (myX % 512)) / 512, (myY - (myY % 512)) / 512, 16, 16);
    
    putLevel(true);
};
//var npcAct = [ npc000 ];

//function NPC(npcType, x,  y,  xm,  ym,  dir,  state,  parent) {
	//"use strict";
    //this.type = npcType;
    //this.x = x;
    //this.y = y;
    //this.xm = xm;
    //this.ym = ym;
    //this.dir = dir;
    //this.state = state;
    //this.parent = parent || false;
//}



var step = function () {
    "use strict";
    context.fillStyle = '#17111A';
    context.fillRect(0, 0, width, height);
    
    switch (gameState) {
            
    case 0:
        runTitle();
        break;
            
    case 1:
        update();
        render();
        if (isJustPressed(KVAL.EQU)) {
			if (!doDebug) {
				initDebug();
			} else {
				document.getElementsByTagName("P")[0].removeChild(paraG);
				window.URL.revokeObjectURL(paraG);
			}
            doDebug = !doDebug;
        }
        if (isJustPressed(KVAL.ESC)) {
            loadLevel(0);
        }
        if (isJustPressed(KVAL.SHIFT)) {
            saveStage(0);
        }
        break;
            
    case 2:
        render();
        if (isJustPressed(KVAL.EQU)) {
            gameState = 1;
        }
        break;
            
    }
    
    resetJustPressed();
    
    animate(step);
};

window.onload = function () {
    "use strict";
    document.body.appendChild(canvas);
    animate(step);
};