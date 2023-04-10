var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play";

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  ghost = createSprite(200,200,50,50);
  ghost.addImage("ghost",ghostImg);
  ghost.scale = 0.6;

  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
}

function draw() {
  background(200);

  if(gameState === "play"){
    if( keyDown("right_arrow")) {
      ghost.x += 3;
    }
    if( keyDown("left_arrow")) {
      ghost.x -= 3;
    }

    // prevent ghost from jumping or falling
    ghost.velocityY = 0;

    if(tower.y > 400){
      tower.y = 300;
    }

    spawnDoors();

    // Detect if the ghost touches the doors or climbers
    if (doorsGroup.isTouching(ghost) || climbersGroup.isTouching(ghost)) {
      gameState = "end";
    }

    drawSprites();
  } else if (gameState === "end") {
    // Display "Game Over" message
    textSize(50);
    fill("red");
    stroke("black");
    text("Game Over", 200, 300);
  }
}

function spawnDoors() {
  if (frameCount % 60 === 0) {
    door = createSprite(Math.round(random(100, 500)),-50);
    climber = createSprite(door.x, door.y + 50);
    invisibleBlock = createSprite(door.x, door.y + 60, climber.width, 5);

    door.addImage(doorImg);
    climber.addImage(climberImg);

    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;

    door.lifetime = 800;
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;

    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);

    ghost.depth = door.depth;
    ghost.depth += 1;
  }
}
