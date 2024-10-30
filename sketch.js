//array to hold all of the cells we're creating
let pizzas = []
var pizza_vy = 1
var pizza_vx = 0


//preload images
let img;
let background_img;
let pretty_kitty;
var prince;

var score = 0
var prince_width = 200
var prince_height = 200
var prince_vx = 5
var prince_vy = 2.5
var misses = 0

var canvas_width = 900
var canvas_height = 1200

var state = "start"
var last_noted = 0
function preload() {
  img = loadImage("./assets/pizza_nobg.png")
  right_cat = loadImage("./assets/prince_right.png")
  left_cat = loadImage("./assets/prince_left.png")
  background_img = loadImage("./assets/bakery_b.jpg")
  pizzas.push(new Pizza(getRandomX(), 0, pizza_vx, pizza_vy, img))
  prince = new Prince(0, canvas_height - prince_height, prince_vx, prince_vy, prince_width, prince_height, right_cat)
}



function setup() {
  createCanvas(canvas_width, canvas_height);
}



function draw() {
  if (state == "play") {
    background(background_img, 155);

    //check where location of mouse is to see how to move the kitty 
    if (mouseIsPressed) {
      if (mouseX > canvas_width/2) {
        prince.src = right_cat
        prince.xpos = prince.xpos + prince.vx
        if (prince.xpos + prince_width > canvas_width) {
          prince.xpos = canvas_width - prince_width
        }
      }
      else if (mouseX <= canvas_width/2) {
        prince.src = left_cat
        prince.xpos = prince.xpos - prince.vx
        console.log(mouseX + " : " + prince.xpos)
        if (prince.xpos < 0) {
          prince.xpos = 0
        }
      }
    }

    for (var i = 0; i < pizzas.length; i++) {
      //pass prince tp check collision with pizzas
      //returns true if there was a collision
      if (pizzas[i].display(prince)) {
        score = score + 1
        //every five points make the pizzas faster
        if(score % 5 ==0){
          pizza_vy = pizza_vy + 1
        }
        pizzas[i].needs_culled = true
      }
    }

    //after we've checked all the pizzas for collision, remove the ones we've hit
    pizzas = pizzas.filter(pizza => pizza.needs_culled == false);

    //draw prince to the screen
    prince.display()

    //write players current score
    textAlign(LEFT)
    stroke(255);
    textSize(36);
    stroke(255)
    fill(255)
    text("Score: " + score.toString(), 0, 36)

    //check for pizzas with y coords below 0 to update misses
    for (var i = 0; i < pizzas.length; i++) {
      if (pizzas[i].ypos > canvas_height) {
        pizzas[i].needs_culled = true
        misses = misses + 1
        if(misses == 3){
          state = "end"
        }
      }
    }
    pizzas = pizzas.filter(pizza => pizza.needs_culled == false);
    
    //display text showing missed pizza count
    text(buildX(misses), 300, 36)
    
    //if we're running out of pizzas, randomly decidde if we should add another one
    if(pizzas.length < 10 && random(0,1000) > 1000 - score- 10){
      pizzas.push(new Pizza(getRandomX(), 0, pizza_vx, pizza_vy, img))
    }
    
    
  }

  if(state == "end"){
    stroke(0)
    fill(0)
    background(200)
    textAlign(CENTER)
    textSize(72)
    text("Final Score",canvas_width/2,canvas_height/3)
    text(score,canvas_width/2,canvas_height/3+72)
    rect(50, canvas_height/3+150, 300,100)
    stroke(255)
    fill(255)
    text("Restart", 200, canvas_height/3 + 150+72)
  }

  if(state == "start"){
    stroke(0)
    fill(0)
    background(200)
    textAlign(CENTER)
    textSize(48)
    text("Prince's Pizza",canvas_width/2,48)
    text("Palace",canvas_width/2,96)
    
    textSize(24)
    text("Prince's Intern dropped all the pizzas!", canvas_width/2, 124)
    text("(Straight to Brazil)", canvas_width/2, 160)
    text("Help Prince catch them",  canvas_width/2, 200)
    text("Miss 3 and its game over!",  canvas_width/2, 224)

    text("Move Prince by holding down on the right or left sides of the screen",  canvas_width/2, 400)
    text("Tap To Start!",  canvas_width/2, 500)
  }

}

function restart_game(){
  pizzas = []
  score = 0 
  misses = 0
  state = "play"
  pizza_vy = 1
}

function buildX(x) {
  var ret = ""
  for (var i = 0; i < x; i++) {
    ret = ret + "X"
  }
  return ret
}

function getRandomX() {
  return Math.floor(random(35,canvas_width-50));
}

function mousePressed(){
  if(state == "end" || state =="start"){
        restart_game()
  }
}