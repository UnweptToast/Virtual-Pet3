class Milk {
    constructor() {
        this.image = loadImage("images/Milk.png")
    }

    display() {
        var x = 50;
        var y = 280;
        for(var i = 0; i < foodAmt; i++) {
            if(i%10 === 0) {
                x = 50
                y += 70;
            }
            image(this.image, x, y, 50, 70);
            x += 30;
        }
    }
}