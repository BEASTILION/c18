
//var

var ground
var trex,trex_running;
var edges;
var ground_img;
var invisible_ground
var cloud;
var clouimg;
var mark = 165;
var input,heading;
var obstacle;
var ob1,ob2,ob3,ob4,ob5,ob6;
var score 
var cloudsGroup,obstaclesGroup;
var PLAY = 1;                                 
var END = 0;
var gameState = PLAY;
var trex_collided
var gameover,restart
var gameoverpic,restartpic
var jumpsoundm,checkpointsound,diesound



//Fpreload 

function preload(){
  
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  ground_img = loadImage("ground2.png")
  cloudimg = loadImage("cloud.png")
  ob1 = loadImage("obstacle1.png")
  ob2 = loadImage("obstacle2.png")
  ob3 = loadImage("obstacle3.png")
  ob4 = loadImage("obstacle4.png")
  ob5 = loadImage("obstacle5.png")
  ob6 = loadImage("obstacle6.png")
  trex_collided = loadAnimation("trex_collided.png")
  gameoverpic = loadImage("gameOver.png")
  resetpic = loadImage("restart.png")
  jumpsound = loadSound("jump.mp3")
  checkpointsound = loadSound("checkpoint.mp3")
  diesound = loadSound("die.mp3")
}

//Fsetup

function setup(){

    createCanvas(windowWidth,windowHeight) 
  

 




    //create a trex sprite
    
    trex = createSprite(50,height-70,20,50,3);
    trex.addAnimation("running", trex_running);
    trex.addAnimation("collide",trex_collided)
    trex.scale = 0.5;
    trex.setCollider("rectangle",0,0,trex.width,trex.height);
    trex.debug=true;
    
    edges = createEdgeSprites();

    //Creating ground
    ground = createSprite(width/2,height,width,20)
    ground.addImage("ground",ground_img)

    //creating invisible ground
    invisible_ground = createSprite(width/2,height+4,width,20)
    invisible_ground.visible = false
    
    //initial score should be zero
    score = 0;

    //Creating groups
    cloudsGroup = new Group();
    obstaclesGroup = new Group();

    gameover = createSprite(width/2,height/2 );
    gameover.addImage("gamekhatam",gameoverpic);
    gameover.scale=0.7;
    gameover.visible=false; 
    
    restart = createSprite(width/2,height/2+40)
    restart.addImage("gamekochalukaro",resetpic)
    restart.scale= 0.5
    restart.visible=false;
}

function draw(){
   background(180);

        console.log("This IS gamestate=",gameState)
    if (gameState === PLAY){

    //space button   
    if( touches.length>0  ||  keyDown("space") && trex.y>= height-50){
    trex.velocityY = -9;
      
    touches = []
    //jumpsound.play()
          
     }

    //score increament
    score= score+Math.round(frameCount/60);
          
    //trex gravity
    trex.velocityY= trex.velocityY + 0.5;

    //ground movement
    ground.velocityX= -(4+score/100)

    // infinite ground
   
    if (ground.x<0  ){
    ground.x=ground.width/2
    }
     
    //producing sound after checkpoint

    if(score % 100 === 0 && score>0){
    
      checkpointsound.play()



    }
    
    spawnClouds()
    spawnObstacles()

    //changing the state 
    if(obstaclesGroup.isTouching(trex)){
    gameState = END;
    diesound.play( )
   
    //trex.velocityY=-12
        


    }

     
    }else if (gameState === END){
    ground.velocityX=0;

    //velocity = 0 for obs and cld
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    //change trex animation to collied  
    trex.changeAnimation("collide",trex_collided);
    
    //// set life time of the game object so that they will never destroy
    obstaclesGroup.setLifetimeEach(-1)
    cloudsGroup.setLifetimeEach(-1)

    //trex velocoty y as 0 
    trex.velocityY = 0  

    gameover.visible=true; 
    restart.visible = true;

    if(mousePressedOver(restart) ){

      reset()
    
console.log("YES Working")
      
    }


    



    
    }

    
    
    //collide of trex
    trex.collide(invisible_ground);

    
    
   
    
   //displaying the score 
   
    text("SCORE ="+score,500,50);
  

    drawSprites()

    }

  function reset(){
  gameState=PLAY  

    obstaclesGroup.destroyEach();
    cloudsGroup.destroyEach();
    gameover.visible= false;
    restart.visible= false;
    trex.changeAnimation("running",trex_running)
    score = 0 ;

  }








    
function spawnClouds(){


  if(frameCount % 60 === 0  ){
    cloud = createSprite(600,100,40,10)
    cloud.velocityX= -3
    cloud.addImage("cloud",cloudimg)
    cloud.scale= 0.5
    cloud.y =Math.round(random(10, 120 ))
    cloud.depth = trex.depth
    trex.depth= trex.depth+1  ;

    cloud.lifetime = 200;
    
    cloudsGroup.add(cloud)
   
  }
    
  
}
function spawnObstacles(){


  if (frameCount % 60 === 0) {
  obstacle = createSprite(600,height-20,20,20)
  obstacle.velocityX = -(5+score/1000)

  obstacle.scale = 0.5  
  
  obstacle.lifetime= 150;

  //generating random obstacles
  
  var r = Math.round(random(1,6))
  switch(r){

  case 1: obstacle.addImage("obs1",ob1);
  break;
  case 2: obstacle.addImage("obs2",ob2);
  break;
  case 3: obstacle.addImage("obs3",ob3);
  break;
  case 4: obstacle.addImage("obs4",ob4);
  break;
  case 5: obstacle.addImage("obs5",ob5);
  break;
  case 6: obstacle.addImage("obs6",ob6);
  break;
  default:break;
  
}
  //adding obsctacle sprite in the group
  obstaclesGroup.add(obstacle);


}

}