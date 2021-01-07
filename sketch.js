var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monsterImage;
var fruit1,fruit2,fruit3,fruit4;
var fruits,fruit;
var Enemy,monster;
var fruitGroup,enemyGroup;
var gameoverImage;
var sword,swordImage;
var score;
var gameoverSound,knifeSwooshSound;


function preload(){
  swordImage = loadImage("sword.png");
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  monsterImage= loadAnimation("alien1.png" ,"alien2.png");
  gameoverImage= loadImage("gameover.png");
  gameoverSound= loadSound("gameover.mp3");
  knifeSwooshSound = loadSound("knifeSwooshSound.mp3");
  
 
}
function setup() {
  createCanvas(400,400);
  sword= createSprite(40,200,20,20);
  sword.addImage(swordImage);
  sword.scale=0.7;
  
  fruitGroup = createGroup();
  enemyGroup = createGroup();
  score=0;
  
}

function draw(){
   background("white")
  if(gameState===PLAY){
    sword.y=World.mouseY;
    sword.x=World.mouseX;
    fruits();
    Enemy();
    if(fruitGroup.isTouching(sword)){
      fruitGroup.destroyEach();
      knifeSwooshSound.play();
      score=score+2;
      
    }
  }
  
  if(gameState===END){
    fruitGroup.destroyEach();
    enemyGroup.destroyEach();
    
    fruitGroup.velocityX=0;
    enemyGroup.velocityX=0;
    
    sword.addImage(gameoverImage);
    sword.x=200;
    sword.y=200;
  }
  if(sword.isTouching(enemyGroup)){
    gameState=END;
    gameoverSound.play();
  }
  
 drawSprites();
  textSize(20);
  text("SCORE: " + score,270,30);
}
function fruits() {
  if(World.frameCount%80 ===0){
    fruit = createSprite(400,200,20,20);
    fruit.scale=0.2;
    r=Math.round(random(1,4));
    if(r==1){
      fruit.addImage(fruit1);
    } else if (r==2){
      fruit.addImage(fruit2);
    } else if (r==3){
      fruit.addImage(fruit3);
    } else if (r==4){
      fruit.addImage(fruit4);
    }
    fruit.y = Math.round(random(50,340));
    
    fruit.setLifetime=100;
    fruitGroup.add(fruit);
    
    position = Math.round(random(1,2));
    
    if(position==1)
      {
        fruit.x= 400;
        fruit.velocityX= -(7+(score/4));
      }
    else
      {
        if(position==2){
          fruit.x=0;
          fruit.velocityX=(7+(score/4));
        }
      }
  }
}
function Enemy (){
  if(World.frameCount%200===0){
    monster= createSprite(400,200,20,20);
    monster.addAnimation("moving",monsterImage);
    monster.y=Math.round(random(100,300));
    monster.velocityX=-(8+(score/10));
    monster.setLifetime=50;
    
    enemyGroup.add(monster);
  }
}