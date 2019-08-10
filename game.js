
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  var sheight = 10;
  var swidth = 10;
  var snake;
  var food;
  var score = 0;
  var level = 150;
  var end;
  var ele = document.getElementById("score");

  function draw()
  {
    if(snake.moveSnake())
    {
      return;
    }
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.beginPath();
    ctx.rect(snake.parts[0].x,snake.parts[0].y,swidth,sheight);
    ctx.fillStyle = 'black';
    ctx.strokeStyle = 'white';
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
    for(var i=1;i<snake.parts.length;i++)
    {
      ctx.beginPath();
      ctx.rect(snake.parts[i].x,snake.parts[i].y,swidth,sheight);
      ctx.fillStyle = 'green';
      ctx.strokeStyle = 'red';
      ctx.stroke();
      ctx.fill();
      ctx.closePath();
    }
    ctx.beginPath();
    ctx.rect(food.x,food.y,swidth,sheight);
    ctx.fillStyle = "yellow";
    ctx.strokeStyle = "red";
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
  }

  function getdirection(e)
  {
    if(e.key == "ArrowUp" && snake.direction!="down")
    {
      snake.direction = "up";
    }
    else if(e.key == "ArrowDown" && snake.direction!="up")
    {
      snake.direction = "down";
    }
    else if(e.key == "ArrowLeft" && snake.direction!="right")
    {
      snake.direction = "left";
    }
    else if(e.key == "ArrowRight" && snake.direction!="left")
    {
      snake.direction = "right";
    }
    else if(e.code == "Space")
    {
      if(snake.direction == "wait")
      {
        snake.direction = snake.prevdirection;
      }
      else
      {
        snake.prevdirection = snake.direction;
        snake.direction = "wait";
      }
    }
  }

  function Snake()
  {
    this.direction = "right";
    this.prevdirection = "";
    this.parts = [];
    this.drawParts = function()
     {
       for(i=0;i<5;i++)
       {
         var obj = {
           x : canvas.width/2-10*i,
           y : canvas.height-30
         }
         this.parts.push(obj);
       }
     }
     this.moveSnake = function()
     {
       if(this.direction != "wait")
       {
         var prevx = this.parts[0].x;
         var prevy = this.parts[0].y;
         if(this.direction == "up")
         {
             this.parts[0].y-=10;
         }
         else if(this.direction == "down")
         {
             this.parts[0].y+=10;
         }
         else if(this.direction == "right")
         {
             this.parts[0].x+=10;
         }
         else
         {
             this.parts[0].x-=10;
         }
         if(this.parts[0].x == food.x && this.parts[0].y == food.y )
         {
           obj = {
             x : this.parts[this.parts.length-1].x,
             y : this.parts[this.parts.length-1].y
           }
           this.parts.push(obj);
           food.update();
         }
         if(this.parts[0].x > 500)
         {
           this.parts[0].x = 0;
         }
         else if(this.parts[0].x < 0)
         {
           this.parts[0].x = 500;
         }
         else if(this.parts[0].y > 500)
         {
           this.parts[0].y = 0;
         }
         else if(this.parts[0].y < 0)
         {
           this.parts[0].y = 500;
         }
         for(i=this.parts.length-1;i>1;i--)
         {
           this.parts[i].x = this.parts[i-1].x;
           this.parts[i].y = this.parts[i-1].y;
           if(this.parts[i].x == this.parts[0].x && this.parts[i].y == this.parts[0].y )
           {
             gamend();
             return 1;
           }
         }
         this.parts[i].x = prevx;
         this.parts[i].y = prevy;
       }
     }
     // this.draw = function()
     // {
     //
     // }
  }

  function Food() {
      this.x = 250;
      this.y = 250;
      this.foodCount = 0;
      this.update = function()
      {
        score+=5;
        this.foodCount+=1;
        let x = Math.floor(Math.random()*490);
        let y = Math.floor(Math.random()*490);
        this.x = x - x%10;
        this.y = y - y%10;
        ele.innerHTML = "Score: " + score;
        if(this.foodCount%3==0)
        {
          increaselevel();
        }
      }
  };

  function start()
  {
    food = new Food();
    snake = new Snake();
    snake.drawParts();
    draw();
    end = setInterval(draw,level);
  }

  function increaselevel()
  {
    level-=10;
    clearInterval(end);
    end = setInterval(draw,level);
  }

  start();

  function gamend()
  {
    clearInterval(end);
    alert("Game over");
  }

  document.addEventListener("keydown",getdirection);
