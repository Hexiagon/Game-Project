var canvas=document.createElement("canvas");
var ctx= canvas.getContext("2d");
canvas.width=1000;
canvas.height=1000;
document.body.appendChild(canvas);
var rows=8;
var cols=3;
var trackRight=2;
var trackLeft=5;
var trackUp=0;
var trackDown=7;
var spriteWidth=192;
var spriteHeight=512;
var width= spriteWidth;
var height= spriteHeight;
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
var soundGameOver="sounds/gameOver.wav";
var soundCollected="sounds/collected.wav";
var bgReady=false;
var bgImage=new Image();
bgImage.onload = function () {
    bgReady=true;
};
bgImage.src="images/background.jpg";
var edgeReady=false;
var edgeImage=new Image();
edgeImage.onload =function(){
    edgeReady=true;
};
edgeImage.src="images/edges.jpg";
var edgeReady2=false;
var edgeImage2=new Image();
edgeImage2.onload =function(){
    edgeReady2=true;
};
edgeImage2.src="images/edges2.jpg";
var PlayerModelReady=false;
var PlayerModelImage = new Image();
PlayerModelImage.onload = function(){
    PlayerModelReady=true;
};
PlayerModelImage.src="images/playerModel.png";
var ItemReady=false;
var ItemImage = new Image();
ItemImage.onload = function(){
    ItemReady=true;
};
ItemImage.src="images/item.png";
var playermodel = {
    speed: 256,
    x: 0,
    y: 0
}
var item = {
    x: 0,
    y: 0
}
let itemsCollected=0;
var keysDown = {};
addEventListener("keydown",function(e){
    keysDown[e.code]=true;
}, false);
addEventListener("keyup",function(e){
    delete keysDown[e.code];
}, false);
let countdown = 360;
var update = function(modifier){
    left = false;
    right = false;
    up=false;
    down=false;
    if(countdown>0){
        countdown-=(1/30);
    }
    else if(countdown<=0){
        soundEfx.src=soundGameOver;
        soundEfx.play();
        alert("You lose.");
        reset();
    }
    if(38 in keysDown && playermodel.y>(32+0)){
        playermodel.y -= playermodel.speed*modifier;
        up=true;
    }
    if(40 in keysDown && playermodel.y < canvas.height-(96+0)){
        playermodel.y += playermodel.speed*modifier;
        down=true;
    }
    if(37 in keysDown && playermodel.x>(32+0)){
        playermodel.x -= playermodel.speed*modifier;
        left=true;
    }
    if(39 in keysDown && playermodel.x<canvas.width-(96+0)){
        playermodel.x += playermodel.speed*modifier;
        right=true;
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
    if(
        playermodel.x<=(item.x+32)
        && item.x<=(playermodel.x+32)
        && playermodel.y<=(item.y+32)
        && item.y<=(playermodel.y+32)
    )
    {
        soundEfx.src=soundCollected;
        soundEfx.play();
        ++itemsCollected;
        if(itemsCollected===4){
            soundEfx.src= soundGameOver;
            soundEfx.play();
            alert("You won");
            reset();
        }
    }
}
var render=function(){
    if(bgReady){
        ctx.drawImage(bgImage,0,0);
    }
    if(edgeReady){
        ctx.drawImage(edgeImage,0,0);
        ctx.drawImage(edgeImage,0,968);
    }
    if(edgeReady2){
        ctx.drawImage(edgeImage2,0,0);
        ctx.drawImage(edgeImage2,968,0);
    }
    if(PlayerModelReady){
        ctx.drawImage(PlayerModelImage,srcX,srcY,width,height,playermodel.x,playermodel.y,width,height);
    }
    if(ItemReady){
        ctx.drawImage(ItemImage,item.x,item.y);
    }
    ctx.fillStyle="rgb(250,250,250)";
    ctx.font="24px Helvetica";
    ctx.textAlign="left";
    ctx.textBaseline="top";
    ctx.fillText("Items collected: " + itemsCollected,32,32);
}
var main=function(){
    var now=Date.now();
    var delta=now-then;
    update(delta/1000);
    render();
    then=now;
    requestAnimationFrame(main);
}
var reset=function(){
    playermodel.x=(canvas.width/2)-16;
    playermodel.y=(canvas.height/2)-16;
    item.x=32+(Math.random()*(canvas.width-96));
    item.y=32+(Math.random()*(canvas.height-96));
}
var then=Date.now();
reset();
main();