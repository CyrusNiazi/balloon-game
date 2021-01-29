var ball;
var database;
var position;
var ballimg;
var bg;

function preload(){
    ballimg=loadImage("2.png");
    bg=loadImage("1.png")
}

function setup(){
    createCanvas(1500,700);
    database=firebase.database();

    ball = createSprite(250,250,10,10);
    ball.addImage(ballimg);
    ball.scale =0.5;
//.ref is to refer to a node in db
//.on is to listen to the node
//.update is to update 
    var ballPositionRef=database.ref('ball/position');
    ballPositionRef.on("value",readPosition);

}

function draw(){
    background(bg);
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}

function writePosition(x,y){

    database.ref('ball/position').update({

        x:position.x+x,
        y:position.y+y,

    })
   
}

function readPosition(data){

    position = data.val(); // extract the value of data an store it in position
    ball.x=position.x;
    ball.y=position.y;

}
