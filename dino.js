class Dino {
    constructor() {
        this.r = 100;
        this.x = this.r
        this.y = 0;
        this.vy = 0;
        this.gravity = 2;
        this.jumpCount = 0;
        this.maxJumps = 2;
        this.animationFrame = 0;
    }

    jump() {
        if (this.jumpCount < this.maxJumps) {
            this.vy = -25;
            this.jumpCount++;
        }
    }

    hits(cactus) {
        let x1 = this.x + this.r * 0.5;
        let y1 = this.y + this.r * 0.5;
        let x2 = cactus.x + cactus.r * 0.5;
        let y2 = cactus.y + cactus.r * 0.5;
        return collideCircleCircle(x1, y1, this.r, x2, y2, cactus.r);
    }

    move() {
        this.y += this.vy;
        this.vy += this.gravity;

        if (this.y >= height - this.r) {
            this.y = height - this.r; 
            this.vy = 0; 
            this.jumpCount = 0;
        }

        this.y = constrain(this.y, 0, height - this.r)
        this.animationFrame++;
    }

    show() {
        if (this.animationFrame % 20 < 20/ 2) {
            image(dImg1, this.x, this.y, this.r, this.r); 
        } else {
            image(dImg2, this.x, this.y, this.r, this.r);
        }
    }
}