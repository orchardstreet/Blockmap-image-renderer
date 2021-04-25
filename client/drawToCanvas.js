//       DRAW THE IMAGE ON HTML5 CANVAS
function setup() {
    createCanvas(2048, 1024);
    pixelDensity(1);
    background(115);
}

function draw() {
    loadPixels()
    for (var i = 0; i < finalArray.length; i++) {
        if (finalArray[i][3] != 0) {
            var index = finalArray[i][4] * 4;
            pixels[index] = finalArray[i][0];
            pixels[index + 1] = finalArray[i][1];
            pixels[index + 2] = finalArray[i][2];
            pixels[index + 3] = finalArray[i][3];
        }
    }


    updatePixels();
}
