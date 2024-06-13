// Falling Stars Game

// Canvas Settings
let cnv = document.getElementById("myCanvas");
let ctx = cnv.getContext("2d");
cnv.width = 400;
cnv.height = 400;

// Control Variables
aPressed = false;
dPressed = false;
wPressed = false;

// Game variables
let colors = ["black", "blue", "green", "orange", "red", "yellow"];
let score = 0;

let stars = [];
for (let i = 0; i < 10; i++) {
  stars.push(createStar());
}

console.log(stars);

// Player object
let player = {
  x: cnv.width / 2 - 15, // start @ middle of width
  y: cnv.height - 30, // start @ bottom canvas
  xSpeed: 5,
  ySpeed: 0,
  w: 30,
  h: 30,
  onGround: true,
  gravity: 20,
};

console.log(player);

// Event Handlers
document.addEventListener("keydown", keydownHandler);
document.addEventListener("keyup", keyupHandler);

function keydownHandler(event) {
  if (event.code == "KeyA") {
    aPressed = true;
  }

  if (event.code == "KeyD") {
    dPressed = true;
  }

  if (event.code == "KeyW") {
    wPressed = true;
  }
}

function keyupHandler(event) {
  if (event.code == "KeyA") {
    aPressed = false;
  }

  if (event.code == "KeyD") {
    dPressed = false;
  }
}

// Animate
requestAnimationFrame(draw);
function draw() {
  // draw background
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, cnv.width, cnv.height);

  // draw the score
  ctx.fillStyle = "white";
  ctx.font = "24px Arial";
  ctx.fillText(`Score: ${score}`, 10, 20);

  // player script
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.w, player.h);

  // draw all stars
  for (let i = 0; i < 10; i++) {
    ctx.drawImage(
      document.getElementById(stars[i].color),
      stars[i].x,
      stars[i].y,
      stars[i].w,
      stars[i].h
    );

    stars[i].y = stars[i].y + stars[i].ySpeed;

    // Check if star reaches bottom, then move it to top
    if (stars[i].y >= 400) {
      stars[i].y = -40; // above canvas
      stars[i].x = randomInt(0, 360); // random x
      stars[i].color = colors[randomInt(0, 6)]; // new color
    }

    // Check for collision with player
    if (rectCollide(player, stars[i])) {
      stars[i].y = -40; // above canvas
      stars[i].x = randomInt(0, 360); // random x
      stars[i].color = colors[randomInt(0, 6)]; // new color
      score++;
    }
  }

  // player control
  if (aPressed) {
    player.x = player.x - player.xSpeed;
  }

  if (dPressed) {
    player.x = player.x + player.xSpeed;
  }

  // player blocked at edges
  if (player.x <= 0) {
    player.x = 0;
  }

  if (player.x + player.w >= cnv.width) {
    player.x = cnv.width - player.w;
  }

  // player jump
  if (wPressed) {
    jump();
  }

  // stars script

  requestAnimationFrame(draw);
}

function glow() {
  "use strict";
  Array.prototype.slice
    .call(document.getElementsByClassName("tex_inp01 tex_inp02"))
    .forEach(function (a) {
      if (a.value !== "") {
        a.style.boxShadow = "0px 0px 22px #8fd7d2";
      } else {
        a.style.boxShadow = "";
      }
    });
}
