//       DRAW THE IMAGE ON HTML5 CANVAS
function setup() {
    createCanvas(2048, 1024);
    pixelDensity(1);
    background(115);
}

function draw() {
    loadPixels()
    for (var i = 0; i < thefinalArray.length; i++) {
        if (thefinalArray[i][3] != 0) {
            var index = thefinalArray[i][4] * 4;
            pixels[index] = thefinalArray[i][0];
            pixels[index + 1] = thefinalArray[i][1];
            pixels[index + 2] = thefinalArray[i][2];
            pixels[index + 3] = thefinalArray[i][3];
        }
    }


    updatePixels();
}
