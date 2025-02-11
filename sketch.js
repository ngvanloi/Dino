
let dino;
let dImg1, dImg2, cImg, bImg;

let cactuses = [];
let gameOver = false;
let score = 0;

let bgX = 0;
let bgSpeed = 2;

function preload() {
    dImg1 = loadImage('images/dino1.png');
    dImg2 = loadImage('images/dino2.png');
    cImg = loadImage('images/cactus.png');
    bImg = loadImage('images/background.png');
}

function setup() {
    let canvas = createCanvas(1500, 450);
    const x = (windowWidth - width) / 2;
    canvas.position(x, 0);
    dino = new Dino();

    d3.select('body')
        .append('div')
        .attr('id', 'score')
        .style('position', 'absolute')
        .style('top', '20px')
        .style('right', '270px')
        .style('font-size', '32px')
        .style('color', 'black')
        .text('Score: 0');
}

function keyPressed() {
    if (key == ' ') {
        dino.jump();
    }

    if (key == 'Enter' && gameOver) {
        cactuses = [];
        dino = new Dino();
        gameOver = false;
        score = 0;
        loop();
    }
}

function draw() {
    if (!gameOver) {
        score += 0.1;
    }

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

    d3.select('#score').text('Score: ' + Math.floor(score));

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