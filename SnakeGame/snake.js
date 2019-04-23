function Snake(){
  this.x = (Math.floor(Math.random() * rows - 1) + 1) * scale;
  this.y = (Math.floor(Math.random() * columns - 1) + 1) * scale;
  this.xSpeed = 0;
  this.ySpeed = 0;
  this.total = 0;
  this.tail = [];

  this.draw = function(){
    ctx.fillStyle = "#2ecc71";

    //Tail
    for(let i=0; i<this.tail.length; i++){
      ctx.fillRect(this.tail[i].x, this.tail[i].y, scale, scale);
    }

    //Head
    ctx.fillStyle = "#27ae60";
    ctx.fillRect(this.x, this.y, scale, scale);
  }

  this.update = function() {
    //Tail Logic
    for(let i=0; i<this.tail.length-1; i++){
      this.tail[i] = this.tail[i+1];
    }

    this.tail[this.total-1] = {x: this.x, y:this.y};

    //Side Response
    if(this.x > canvas.width){
      this.x = 0 - scale;
    } else if(this.x < 0){
      this.x = canvas.width + scale;
    } else if(this.y > canvas.height){
      this.y = 0 - scale;
    } else if(this.y < 0){
      this.y = canvas.height + scale;
    }

    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }

  //DIE!
  this.die = function(){
    //Tail Hitting Logic
    for(let i=0; i<this.tail.length-1;i++){
      if(this.tail[i].x == this.x && this.tail[i].y == this.y){
        this.x = (Math.floor(Math.random() * rows - 1) + 1) * scale;
        this.y = (Math.floor(Math.random() * columns - 1) + 1) * scale;
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.total = 0;
        this.tail = [];
        return true;
        break;
      }
    }
  }

  //Eating
  this.eat = function(fruit) {
    if(this.x == fruit.x && this.y == fruit.y){
      this.total++;
      return true;
    }
    return false;
  }

  //Change Direction
  this.changeDirection = function(direction) {
    if(this.x < canvas.width && this.x > -scale && this.y < canvas.height && this.y > -scale){
      switch(direction){
        case 'Up':
          if(this.ySpeed != scale * 1){
            this.xSpeed = 0;
            this.ySpeed = scale * -1;
          }
        break;
        case 'Down':
          if(this.ySpeed != scale * -1){
            this.xSpeed = 0;
            this.ySpeed = scale * 1;
          }
        break;
        case 'Left':
          if(this.xSpeed != scale * 1){
            this.xSpeed = scale * -1;
            this.ySpeed = 0;
          }
        break;
        case 'Right':
          if(this.xSpeed != scale * -1){
            this.xSpeed = scale * 1;
            this.ySpeed = 0;
          }
        break;
      }
    }
  }
}
