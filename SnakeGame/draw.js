const canvas = document.querySelector(".canvas");
const scoreText = document.querySelector(".score");
const ctx = canvas.getContext("2d");
const scale = 32;
const speed = 100;
const rows = canvas.height / scale;
const columns = canvas.width / scale;

var score = 0;
var hiScore = 0;
var snake;
var fruit;

(function setup() {
  snake = new Snake();
  fruit = new Fruit();
  fruit.pickLocation();

  window.setInterval(() => {
    //Die!
    if(snake.die()){
      if(score > hiScore){
        hiScore = score;
      }
      score = 0;
    }

    //Get Eating
    if(snake.eat(fruit)) {
      fruit.pickLocation();
      score++;
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

window.addEventListener('keydown', ((evt) => {
  const direction = evt.key.replace('Arrow', '');
  snake.changeDirection(direction);
}));
