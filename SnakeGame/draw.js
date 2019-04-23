const canvas = document.querySelector(".canvas");
const scoreText = document.querySelector(".score");
const ctx = canvas.getContext("2d");
const scale = 32;
const speed = 100;
const rows = canvas.height / scale;
const columns = canvas.width / scale;
const fruitsnd = new Audio("sfx/fruitsfx.wav");
const hurtsnd = new Audio("sfx/hurtsfx.wav");

var score = 0;
var hiScore = 0;
var snake;
var fruit;

//Run this on startup
(function setup() {
  snake = new Snake();
  fruit = new Fruit();
  fruitPickLocation();

  window.setInterval(() => {
    //Die!
    if(snake.die()){
      if(score > hiScore){
        hiScore = score;
      }
      score = 0;
      hurtsnd.play();
    }

    //Get Eating
    if(snake.eat(fruit)) {
      fruitPickLocation();
      score++;
      fruitsnd.play();
    }

    //Draw all the important stuff
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    snake.update();
    snake.draw();
    fruit.draw();

    //Draw Score text
    ctx.font = "30px Calibri";
    ctx.fillStyle= "#FFF";
    ctx.fillText("Score " + score, 10, 40);
    ctx.fillText("HiScore " + hiScore, 10, 80);
  }, speed);
}());

//Get Input
window.addEventListener('keyup', ((evt) => {
  //Set Direction
  const direction = evt.key.replace('Arrow', '');
  snake.changeDirection(direction);
}));

//Get a random location for the fruit object
function fruitPickLocation(){
  //Pick Random Location
  fruit.pickLocation();

  //Check If Location Is In Tail
  for(let i=0; i<snake.tail.length-1;i++){
    if(snake.tail[i].x == fruit.x && snake.tail[i].y == fruit.y){
      //Run the function again and break the for loop
      fruitPickLocation();
      break;
    }
  }
}
