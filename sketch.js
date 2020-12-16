var dog, dogFood;
var dogImg, happyDogImg;
var foodAmt = 20;
var controls;
var dogName = "hello";
var gameState = 0;
var time;
var food;
var sleep, play, shower;
var bg = "green";
var currentTime;

function preload() {
  dogImg = loadImage("images/dog.png");
  happyDogImg = loadImage("images/happyDog.png")
  sleep = loadImage("images2/Bed Room.png");
  play = loadImage("images2/Garden.png");
  shower = loadImage("images2/Wash Room.png");

}

function setup() {
  database = firebase.database();
  createCanvas(500, 500)
  var rf = database.ref('dog/food');
  rf.on("value", readFood)

  var rn = database.ref('dog/name');
  rn.on("value", readName)

  dog = createSprite(350, 250);
  dog.addImage(dogImg)
  dog.scale = 0.2;

  database.ref('dog').set({
    food: foodAmt,
    name: dogName
  });


  controls = new Form();
  food = new Milk();
  var lastFedRef = database.ref('lastFed');
  lastFedRef.on("value", function(data) {
    time = data.val();
  });


}
function  draw() {
  background(bg);


  if(gameState === 1) {

    controls.hideName();

    if(gameState === "hungry")
      food.display();

    fill("white")
    textSize(20);text("Food left: " + foodAmt, 300, 150)
    textSize(15)
    text("Pet's Name: " + dogName, 180, 70)

    controls.display();
    drawSprites();

    if(time) {
      text("Last Fed: " + time, 20, 40)
      updateLastFed();

      currentTime = hour();
      console.log()
      if(currentTime === time + 1) {
        garden();
      }
      else if(currentTime === time + 2) {
        bedRoom();
      }
      else if(currentTime === time + 3 || currentTime === time + 4) {
        bathe();
      }
      else if(currentTime > (time + 4)) {
        sad();
      }

    }
  } else {
    controls.updateName();
    controls.hideControl();
  }
    //console.log(time+ "  <--")
    updateFood();
    
}

function readFood(data) {
  var frd = data.val();
  foodAmt = frd;
}

function readName(data) {
  var frn = data.val();
  dogName = frn
}

function updateFood() {
  database.ref('dog').update({
    'food': foodAmt,
    'name': dogName
  })

}

function updateLastFed() {
  database.ref('/').update({
    lastFed: time
  })
}

function garden() {
  image(play, 0, 0, width, height)
  gameState = "playing"
  //bg = play;
  dog.visible = false;
  updateState();

}

function bedRoom() {
  image(sleep, 0, 0, width, height)
  //bg = sleep;
  dog.visible = false;
  gameState = "sleeping"
  updateState();


}

function bathe() {
  image(shower, 0, 0, width, height)
  //bg = shower;
  dog.visible = false;
  gameState = "bathing"
  updateState();

}

function sad() {
  fill("lightgreen")
  rect(0, 0, width, height)
  //bg = "green"
  dog.visible = true;
  dog.addImage(dogImg)
  gameState = "hungry"
  updateState();

}

function updateState() {
  database.ref('/').update({
    gameState: gameState
  })
  console.log("updated")
}