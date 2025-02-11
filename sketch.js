
let dino;
let uImg;
let cImg;
let bImg;

let cactuses = [];
let gameOver = false;


let bgX = 0;
let bgSpeed = 2;

function preload() {
    dImg1 = loadImage('images/dino1.png');
    dImg2 = loadImage('images/dino2.png'); 
    cImg = loadImage('images/cactus.png');
    bImg = loadImage('images/background.jpg');
}
function setup() {
    let canvas = createCanvas(1500, 450);
    const x = (windowWidth - width) / 2;
    canvas.position(x, 0);
    dino = new Dino();
}

function keyPressed() {
    if (key == ' ') {
        dino.jump();
    }

    if (key == 'Enter' && gameOver) {
        cactuses = [];
        dino = new Dino();
        gameOver = false;
        loop();
    }
}

function draw() {

    if (random(1) < 0.005) {
        cactuses.push(new Cactus());
    }

    backgroundScroll();

    for (let t of cactuses) {
        t.move();
        t.show();
        if (dino.hits(t)) {
            console.log('game over');
            gameOver = true;
            noLoop();
        }
    }
    dino.show();
    dino.move();

    if (gameOver) {
        displayRestartMessage();
    }

}

function backgroundScroll() {
    image(bImg, bgX, 0, width, height); 
    image(bImg, bgX + width, 0, width, height);

    bgX -= bgSpeed;

    if (bgX <= -width) {
        bgX = 0;
    }
}

function displayRestartMessage() {
    fill(255);
    textSize(48);
    textAlign(CENTER, CENTER);
    text("Game Over! Press Enter to Restart", width / 2, height / 2);
}