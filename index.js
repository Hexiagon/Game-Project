//Create Canvas
var canvas=document.createElement("canvas");
var ctx= canvas.getContext("2d");
canvas.width=1005;
canvas.height=1005;
document.body.appendChild(canvas);

//add variables
//
var rows=3;
var cols=3;

var trackRight=0;
var trackLeft=1;
var trackUp=2;
var trackDown=0;

var spriteWidth=624;
var spriteHeight=624;
var width= spriteWidth /cols;
var height= spriteHeight /rows;
var curXFrame=0;
var frameCount=3;
var srcX=0;
var srcY=0;

var left=false;
var right=false;
var up=false;
var down=false;

var counter=0;
var soundEfx=document.getElementById("soundEfx");
var soundGameOver="sounds/mixkit-arcade-video-game-bonus-2044.wav";
var soundSelectedSquare="sounds/mixkit-bonus-earned-in-video-game-2058.wav";

//images
var bgReady=false;
var bgImage=new Image();
bgImage.onload = function () {
    bgReady=true;
};
bgImage.src="images/background.jpg";

// X image
var xReady = false;
var xImage = new Image();
xImage.onload = function(){
    xReady = true;
};
xImage.src = "images/Letter-X.png";


// Y image
var yReady = false;
var yImage = new Image();
yImage.onload = function(){
    yReady = true;
};
yImage.src = "images/letter-o.png";

//player x
var XPlayer = {
    Shape: xImage
}
var OPlayer = {
    Shape: yImage
}
var TopLeft={
    Shape: "",
    x: 0,
    y: 0
}
var TopMiddle={
    Shape: "",
    x: 335,
    y: 0
}
var TopRight={
    Shape: "",
    x: 670,
    y: 0
}
var CenterLeft={
    Shape: "",
    x: 0,
    y: 335
}
var CenterMiddle={
    Shape: "",
    x: 335,
    y: 335
}
var CenterRight={
    Shape: "",
    x: 670,
    y: 335
}
var BottomLeft={
    Shape: "",
    x: 0,
    y: 670
}
var BottomMiddle={
    Shape: "",
    x: 335,
    y: 670
}
var BottomRight={
    Shape: "",
    x: 670,
    y: 670
}
var AllSides=[];
var keysDown = {};
var mousePositionX;
var mousePositionY;
addEventListener("mousemove",function(e){
    mousePositionX=e.clientX;
    mousePositionY=e.clientY;
});
addEventListener("keydown",function(e){
    keysDown[e.keyCode]=true;
}, false);
addEventListener("keyup",function(e){
    delete keysDown[e.keyCode];
}, false);
let countdown;
let turnNumber;
let Message="";
var gameover=function(){
    alert(Message);
    soundEfx.src=soundGameOver;
    soundEfx.play();
    reset();
}
var selectedBlock=0;
// update game object function
var update = function(modifier){
    countdown-=1/60;
    if(countdown<0){
        Message="All players lose.";
        gameover();
    }
    if(88 in keysDown&&turnNumber==0){
        for(let i=0;i<AllSides.length;i++){
            if(AllSides[i].Shape==""&&
            mousePositionX<=(AllSides[i].x+335)
            && mousePositionX>=(AllSides[i].x)
            && mousePositionY<=(AllSides[i].y+335)
            && mousePositionY>=(AllSides[i].y)){
                AllSides[i].Shape=XPlayer.Shape;
                turnNumber=1;
                soundEfx.src=soundSelectedSquare;
                soundEfx.play();
                break;
            }
        }
    }
    if(79 in keysDown&&turnNumber==1){
        for(let i=0;i<AllSides.length;i++){
            if(AllSides[i].Shape==""&&
            mousePositionX<=(AllSides[i].x+335)
            && mousePositionX>=(AllSides[i].x)
            && mousePositionY<=(AllSides[i].y+335)
            && mousePositionY>=(AllSides[i].y)){
                AllSides[i].Shape=OPlayer.Shape;
                turnNumber=0;
                soundEfx.src=soundSelectedSquare;
                soundEfx.play();
                break;
            }
        }
    }
    
    if(counter==5){
        curXFrame=++curXFrame%frameCount;
        counter=0;
    }
    else{
        counter++;
    }
    srcX=curXFrame*width;
    if(left){
        srcY=trackLeft*height;
    }
    if(right){
        srcY=trackRight*height;
    }
    if(up){
        srcY=trackUp*height;
    }
    if(down){
        srcY=trackDown*height;
    }
    if(left==false&&right==false&&up==false&&down==false){
        srcX=1*width;
        srcY=0*height;
    }
    
}
var render=function(){
    if(bgReady){
        ctx.drawImage(bgImage,0,0);
    }
    if(xReady){
        for(var i=0;i<AllSides.length;i++){
            if(AllSides[i].Shape==XPlayer.Shape){
                if(selectedBlock==1){
                    left=true;
                }
                else if(selectedBlock==2){
                    right=true;
                }
                else if(selectedBlock==3){
                    up=true;
                }
                else if(selectedBlock==4){
                    down=true;
                }
                ctx.drawImage(xImage,srcX,srcY,width,height,AllSides[i].x,AllSides[i].y,width,height);
                selectedBlock++;
                if(selectedBlock>=6){
                    left=false;
                    right=false;
                    up=false;
                    left=false;
                    selectedBlock=0;
                }
            }
        }
    }
    if(xReady){
        for(var i=0;i<AllSides.length;i++){
            if(AllSides[i].Shape==OPlayer.Shape){
                if(selectedBlock==1){
                    left=true;
                }
                else if(selectedBlock==2){
                    right=true;
                }
                else if(selectedBlock==3){
                    up=true;
                }
                else if(selectedBlock==4){
                    down=true;
                }
                ctx.drawImage(yImage,srcX,srcY,width,height,AllSides[i].x,AllSides[i].y,width,height);
                selectedBlock++;
                if(selectedBlock>=6){
                    left=false;
                    right=false;
                    up=false;
                    left=false;
                    selectedBlock=0;
                }
            }
        }
    }
    ctx.fillStyle="rgb(0,0,0)";
    ctx.font="24px Helvetica";
    ctx.textAlign="left";
    ctx.textBaseline="top";
    if(turnNumber===0){
        ctx.fillText("X Player's turn (To place an X, press X). Timer: "+countdown,0,0);
    }
    else if(turnNumber===1){
        ctx.fillText("O Player's turn (To place an O, press O). Timer: "+countdown,0,0);
    }
}

//The main game loop
var main=function(){
    var now=Date.now();
    var delta=now-then;
    update(delta/1000);
    render();
    then=now;
    requestAnimationFrame(main);
}
var reset=function(){
    /*
    playermodel.x=(canvas.width/2)-16;
    playermodel.y=(canvas.height/2)-16;
    item.x=32+(Math.random()*(canvas.width-96));
    item.y=32+(Math.random()*(canvas.height-96));
    */
    delete ctx;
    countdown=360;
    turnNumber=0;
    for(let i=0;i<AllSides.length;i++){
        AllSides[i].Shape="";
    }
    AllSides=[TopLeft,TopMiddle,TopRight,CenterLeft,CenterMiddle,
    CenterRight,BottomLeft,BottomMiddle,BottomRight];
}
var then=Date.now();
reset();
main();