
<!DOCTYPE html >
    <html>
	    <head>
<style>
.headers {
margin-bottom:9px;
}
</style>
	    </head>
    <body>
	    <div style="position:relative;height:70px;margin-bottom:5px;">
		    <div style="position:relative;top:20px;left:25px;padding-left:24px;box-sizing:border-box;font-weight:bold;text-align:left;width:120px;height:70px;background-color:#fafafa;line-height:20px;border:1px solid #ccc;display:inline-block;float:left;border-radius:20px;padding-top:4px;">Blockmap<br>Image<br>Renderer </div><div style="box-sizing:border-box;text-align:center;background-color:#fafafa;padding-top:2px;position:relative;top:40px;margin-right:20px;border-radius:10px;float:right;color:green;border:1px solid #ccc;font-weight:bold;height:29px;width:170px;line-height:22px;display:inline-block;vertical-align:top;" id="notif"></div>
	    </div>
	   <div style="position:relative;">
    <div style="margin-left:calc(50vw - 70px);position:relative;top:-30px;">Enter an image ID: (1 - 209)</div>
    <input style="display:inline-block;margin-left:calc(50vw - 100px);position:relative;top:-20px;" id = "answer" type = "text"> </input> 
    <button style="display:inline-block;position:relative;top:-20px;" id = "answerbutton"> Submit </button><div style="width:200px;display:inline-block;margin-left:20px;vertical-align:top;position:relative;top:-20px;margin-right:0px;" id="warning"></div>
    <div class="headers" id = "response"> </div> 
	   </div>
    <script src = "https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.6.0/p5.js"> </script><script>

//websocket connection
//put name of your site below
const wss = new WebSocket('ws://sonorousprograms.com/socket');
wss.onopen = () => {
    console.log('Now connected');
    document.getElementById('notif').innerHTML = "We are connected";
};
//functions

function hexToBytes6(hexVal) {
    return '000000'.concat(hexVal).slice(-6)
}

function getColors(rgb565Hex) {
    var rgb565Int = parseInt(rgb565Hex)
    var r = (((rgb565Int >> 11) & 0x1f) * 527 + 23) >> 6
    var g = (((rgb565Int >> 5) & 0x3f) * 259 + 33) >> 6
    var b = ((rgb565Int & 0x1f) * 527 + 23) >> 6

    return [r, g, b];
}

//decToHex function
//From http://www.danvk.org/hex2dec.html
/**
 * A function for converting hex <-> dec w/o loss of precision.
 *
 * The problem is that parseInt("0x12345...") isn't precise enough to convert
 * 64-bit integers correctly.
 *
 * Internally, this uses arrays to encode decimal digits starting with the least
 * significant:
 * 8 = [8]
 * 16 = [6, 1]
 * 1024 = [4, 2, 0, 1]
 */
// Adds two arrays for the given base (10 or 16), returning the result.
// This turns out to be the only "primitive" operation we need.
function add(x, y, base) {
    var z = [];
    var n = Math.max(x.length, y.length);
    var carry = 0;
    var i = 0;
    while (i < n || carry) {
        var xi = i < x.length ? x[i] : 0;
        var yi = i < y.length ? y[i] : 0;
        var zi = carry + xi + yi;
        z.push(zi % base);
        carry = Math.floor(zi / base);
        i++;
    }
    return z;
}
// Returns a*x, where x is an array of decimal digits and a is an ordinary
// JavaScript number. base is the number base of the array x.
function multiplyByNumber(num, x, base) {
    if (num < 0) return null;
    if (num == 0) return [];

    var result = [];
    var power = x;
    while (true) {
        if (num & 1) {
            result = add(result, power, base);
        }
        num = num >> 1;
        if (num === 0) break;
        power = add(power, power, base);
    }

    return result;
}
// Returns a*x, where x is an array of decimal digits and a is an ordinary
// JavaScript number. base is the number base of the array x.
function multiplyByNumber(num, x, base) {
    if (num < 0) return null;
    if (num == 0) return [];

    var result = [];
    var power = x;
    while (true) {
        if (num & 1) {
            result = add(result, power, base);
        }
        num = num >> 1;
        if (num === 0) break;
        power = add(power, power, base);
    }

    return result;
}

function parseToDigitsArray(str, base) {
    var digits = str.split('');
    var ary = [];
    for (var i = digits.length - 1; i >= 0; i--) {
        var n = parseInt(digits[i], base);
        if (isNaN(n)) return null;
        ary.push(n);
    }
    return ary;
}

function convertBase(str, fromBase, toBase) {
    var digits = parseToDigitsArray(str, fromBase);
    if (digits === null) return null;

    var outArray = [];
    var power = [1];
    for (var i = 0; i < digits.length; i++) {
        // invariant: at this point, fromBase^i = power
        if (digits[i]) {
            outArray = add(outArray, multiplyByNumber(digits[i], power, toBase), toBase);
        }
        power = multiplyByNumber(fromBase, power, toBase);
    }
    var out = '';
    for (var i = outArray.length - 1; i >= 0; i--) {
        out += outArray[i].toString(toBase);
    }
    return out;
}

function decToHex(decStr) {
    var hex = convertBase(decStr, 10, 16);
    return hex ? '0x' + hex : null;
}

function hexToDec(hexStr) {
    if (hexStr.substring(0, 2) === '0x') hexStr = hexStr.substring(2);
    hexStr = hexStr.toLowerCase();
    return convertBase(hexStr, 16, 10);
}

function convertStringToHex(str) {
    var arr = [];
    for (var i = 0; i < str.length; i++) {
        arr[i] = ("00" + str.charCodeAt(i).toString(16)).slice(-4);
    }
    return "\\u" + arr.join("\\u");
}

//declare variables
var decimalColorIndex = [];
var hexColorIndex = [];
var hexColorIndexString = "";
var decimalPixelGroups = [];
var hexpixelGroups = [];
var decimalTransparentPixelGroups = [];
var hexTransparentPixelGroups = [];
var decimalTransparentPixelGroupIndexes = [];
var hexTransparentPixelGroupIndexes = [];
var decimalPixelGroups = [];
var hexPixelGroups = [];
var decimalPixelGroupIndexes = [];
var hexPixelGroupIndexes = [];
var decimalPixelData = [];
var hexPixelData = [];
var finalArray = [];

//declare arrays
decimalColorIndex = ["50654763755424210328672425327695615307906252058919690782771433632062"];

decimalPixelData = [
    "650869216450885381842794140471645523731727370840522625210399475703437402376",
    "1104507469932510824869762672892436606713942292148051592307742111968340828423",
    "257266029179750072068322184028890766890969877420580281320249385225"
];
decimalTransparentPixelGroups = [
    "3547551543381039034383664699734519055362002671414524853577384928774979584",
    "41599411626257476698747227190631632426829657449030719785609788613722112",
    "13857624037477524919099817758309175555578154406742367724197097601236992",
    "3547497833697698006334470927222211626071888087999105701617075544483954688",
    "55214603480481032008509109682344702375130587380518920463713671124615168"
];
decimalTransparentPixelGroupIndexes = [
    "531883105784607723844129"
];


//convert declared arrays to hexidemimal while iterating through:
//decimalColorIndex
//decimalTransparentPixelGroups
//decimalTransparentPixelGroupIndexes
for (var x = 0; x < decimalColorIndex.length; x++) {
    hexColorIndex.push(decToHex(decimalColorIndex[x]));
    //shave off first two characters off hexColorIndex, its uneeded
    hexColorIndex[x] = hexColorIndex[x].slice(2);
    //add three 0s to beginning of hexColorIndex if theres a 1 remainder when dividing by four
    if (hexColorIndex[x].length % 4 == 1) {
        hexColorIndex[x] = "000" + hexColorIndex[x];
    }
    if (hexColorIndex[x].length % 4 == 2) {
        hexColorIndex[x] = "00" + hexColorIndex[x];
    }
    if (hexColorIndex[x].length % 4 == 3) {
        hexColorIndex[x] = "0" + hexColorIndex[x];
    }
    console.log("hexColorIndexAFTER: " + hexColorIndex[x]);
}
//put all of hexColorIndex into single string
hexColorIndexString = hexColorIndex.join('');
console.log("hexColorIndexString" + hexColorIndexString);


//beginning of pixelData
if (decimalPixelData.length != 0) {

    //convert decimalPixelData to hex, and leftpad them
    for (var x = 0; x < decimalPixelData.length; x++) {
        hexPixelData.push(decToHex(decimalPixelData[x]));
        hexPixelData[x] = hexPixelData[x].slice(2);
        if (x != decimalPixelData.length - 1) {
            var difference = 64 - hexPixelData[x].length;
            while (difference != 0) {
                hexPixelData[x] = "0" + hexPixelData[x];
                difference--;
            }
        } else {
            if (hexPixelData[x].length % 7 == 1) {
                hexPixelData[x] = "000000" + hexPixelData[x];
            }
            if (hexPixelData[x].length % 7 == 2) {
                hexPixelData[x] = "00000" + hexPixelData[x];
            }
            if (hexPixelData[x].length % 7 == 3) {
                hexPixelData[x] = "0000" + hexPixelData[x];
            }
            if (hexPixelData[x].length % 7 == 4) {
                hexPixelData[x] = "000" + hexPixelData[x];
            }
            if (hexPixelData[x].length % 7 == 5) {
                hexPixelData[x] = "00" + hexPixelData[x];
            }
            if (hexPixelData[x].length % 7 == 6) {
                hexPixelData[x] = "0" + hexPixelData[x];
            }
        }
        console.log("hexPixelData: " + hexPixelData[x]);
    }

    for (var x = 0; x < hexPixelData.length; x++) {
        for (var y = 0; y < hexPixelData[x].length; y = y + 8) {
            var slicey = hexPixelData[x].slice(y, y + 8);
            console.log("slicey: " + slicey);
            var colourindex = slicey.slice(0, 2);
            if (colourindex == "00") {
                colourindex = 0;
            } else {
                colourindex = hexToDec("0x" + colourindex);
            }
            var group_position = slicey.slice(2, 6);
            if (group_position == "00") {
                group_position = 0;
            } else {
                group_position = parseInt(hexToDec("0x" + group_position));
            }
            var pixelindex = slicey.slice(7, 8);
            if (pixelindex == "00") {
                pixelindex = 0;
            } else {
                pixelindex = parseInt(hexToDec("0x" + pixelindex));
            }
            if (hexColorIndexString[colourindex * 4] != undefined) {
                console.log("in!");
                var rgbColors = getColors("0x" + hexColorIndexString.substr(colourindex * 4, 4));
                var subFinalArray = [];

                subFinalArray.push(rgbColors[0]);
                subFinalArray.push(rgbColors[1]);
                subFinalArray.push(rgbColors[2]);
                //get hexPixelGroupIndexesString string from x and y
                //may need to substract 1 from stripnumber!
                var position = (group_position * 32) + pixelindex;
                console.log("group_position :" + group_position);
                console.log("position: " + position);
                subFinalArray.push(255);
                subFinalArray.push(position);
                finalArray.push(subFinalArray);
            } else {
                document.getElementById("warning").innerHTML = "corrupt or misunderstood image data from Ethereum blockchain, cannot process";
                console.log("ERROR LOG: " + hexPixelData[x][y]);
                console.log(hexColorIndexString.length);
                console.log("x" + x);
                console.log("y" + y);
                break;

            }



        }

    }




}


//beginning of pixel groups
if (decimalPixelGroups.length != 0) {
    //convert decimalPixelgroups to hex, and leftpad them
    for (var x = 0; x < decimalPixelGroups.length; x++) {
        hexPixelGroups.push(decToHex(decimalPixelGroups[x]));
        hexPixelGroups[x] = hexPixelGroups[x].slice(2);
        var difference = 64 - hexPixelGroups[x].length;
        while (difference != 0) {
            hexPixelGroups[x] = "0" + hexPixelGroups[x];
            difference--;
        }
        //  console.log("hexPixelGroups: " + hexPixelGroups[x]);
    }


    //convert decimalpixelgroupsindexes to hex, and leftpad them
    for (var x = 0; x < decimalPixelGroupIndexes.length; x++) {
        hexPixelGroupIndexes.push(decToHex(decimalPixelGroupIndexes[x]));
        hexPixelGroupIndexes[x] = hexPixelGroupIndexes[x].slice(2);
        if (x != decimalPixelGroupIndexes.length - 1) {
            var difference = 64 - hexPixelGroupIndexes[x].length;
            while (difference != 0) {
                hexPixelGroupIndexes[x] = "0" + hexPixelGroupIndexes[x];
                difference--;
            }
        } else {
            if (hexPixelGroupIndexes[x].length % 4 == 1) {
                hexPixelGroupIndexes[x] = "000" + hexPixelGroupIndexes[x];
            }
            if (hexPixelGroupIndexes[x].length % 4 == 2) {
                hexPixelGroupIndexes[x] = "00" + hexPixelGroupIndexes[x];
            }
            if (hexPixelGroupIndexes[x].length % 4 == 3) {
                hexPixelGroupIndexes[x] = "0" + hexPixelGroupIndexes[x];
            }
        }
        console.log("hexPixelGroupIndexes: " + hexPixelGroupIndexes[x]);
    }
    var hexPixelGroupIndexesString = hexPixelGroupIndexes.join('');
    console.log("stringg: " + hexPixelGroupIndexesString);


    for (var x = 0; x < hexPixelGroups.length; x++) {
        for (var y = 0; y < hexPixelGroups[x].length; y = y + 2) {
            var thecolor = hexPixelGroups[x].slice(y, y + 2);
            if (thecolor == "00") {
                thecolor = 0;
            } else if (thecolor == undefined) {
                document.getElementById("warning").innerHTML = "can't find number for color index";
                console.log("ERROR LOG: " + hexPixelGroups[x][y]);
                console.log(hexColorIndexString.length);
                console.log("x" + x);
                console.log("y" + y);
                break;
            } else {
                thecolor = hexToDec(thecolor);
            }
            if (hexColorIndexString[thecolor * 4] != undefined) {
                var rgbColors = getColors("0x" + hexColorIndexString.substr(thecolor * 4, 4));
                var subFinalArray = [];

                subFinalArray.push(rgbColors[0]);
                subFinalArray.push(rgbColors[1]);
                subFinalArray.push(rgbColors[2]);
                //get hexPixelGroupIndexesString string from x and y
                var stripnumber = hexToDec(hexPixelGroupIndexesString.substr(x * 4, 4));
                var pixelinstrip = Math.floor(y / 2);
                //may need to substract 1 from stripnumber!
                var position = (stripnumber) * 32 + pixelinstrip;
                subFinalArray.push(255);
                subFinalArray.push(position);
                finalArray.push(subFinalArray);
            } else {
                document.getElementById("warning").innerHTML = "corrupt or misunderstood image data from Ethereum blockchain, cannot process";
                console.log("ERROR LOG: " + hexPixelGroups[x][y]);
                console.log(hexColorIndexString.length);
                console.log("x" + x);
                console.log("y" + y);
                break;

            }

        }

    }
    for (var x = 0; x < 20; x++) {
        // console.log("pixel groups" + finalArray[x]);
    }
    console.log("length" + finalArray.length);

    //end up pixelgroups
}
if (decimalTransparentPixelGroups.length != 0) {
    //convert decimaltransparentpixelgroups to hex, and leftpad them
    for (var x = 0; x < decimalTransparentPixelGroups.length; x++) {
        hexTransparentPixelGroups.push(decToHex(decimalTransparentPixelGroups[x]));
        hexTransparentPixelGroups[x] = hexTransparentPixelGroups[x].slice(2);
        var difference = 64 - hexTransparentPixelGroups[x].length;
        while (difference != 0) {
            hexTransparentPixelGroups[x] = "0" + hexTransparentPixelGroups[x];
            difference--;
        }
        console.log("hexTransparentPixelGroups: " + hexTransparentPixelGroups[x]);
    }

    //convert decimaltransparentpixelgroupsindexes to hex, and leftpad them
    for (var x = 0; x < decimalTransparentPixelGroupIndexes.length; x++) {
        hexTransparentPixelGroupIndexes.push(decToHex(decimalTransparentPixelGroupIndexes[x]));
        hexTransparentPixelGroupIndexes[x] = hexTransparentPixelGroupIndexes[x].slice(2);
        if (x != decimalTransparentPixelGroupIndexes.length - 1) {
            var difference = 64 - hexTransparentPixelGroupIndexes[x].length;
            while (difference != 0) {
                hexTransparentPixelGroupIndexes[x] = "0" + hexTransparentPixelGroupIndexes[x];
                difference--;
            }

        } else {
            if (hexTransparentPixelGroupIndexes[x].length % 4 == 1) {
                hexTransparentPixelGroupIndexes[x] = "000" + hexTransparentPixelGroupIndexes[x];
            }
            if (hexTransparentPixelGroupIndexes[x].length % 4 == 2) {
                hexTransparentPixelGroupIndexes[x] = "00" + hexTransparentPixelGroupIndexes[x];
            }
            if (hexTransparentPixelGroupIndexes[x].length % 4 == 3) {
                hexTransparentPixelGroupIndexes[x] = "0" + hexTransparentPixelGroupIndexes[x];
            }
        }
        console.log("hexTransparentPixelGroupIndexes: " + hexTransparentPixelGroupIndexes[x]);
    }
    var hexTransparentPixelGroupIndexesString = hexTransparentPixelGroupIndexes.join('');
    console.log("stringg: " + hexTransparentPixelGroupIndexesString);

    //finalArray to output transparentpixelgroups and transparentpixelgroupsindexes
    //iterate through characters in hexTransparentPixelGroups
    //after find colorr index, find hex colorr in hexColorIndexString, and then find RGB in getColors function,
    for (var x = 0; x < hexTransparentPixelGroups.length; x++) {
        for (var y = 0; y < hexTransparentPixelGroups[x].length; y = y + 2) {
            var thecolor = hexTransparentPixelGroups[x].slice(y, y + 2);
            if (thecolor == "00") {
                thecolor = 0;
            } else if (thecolor == undefined) {
                document.getElementById("warning").innerHTML = "can't find number for color index";
                console.log("ERROR LOG: " + hexTransparentPixelGroups[x][y]);
                console.log(hexColorIndexString.length);
                console.log("x" + x);
                console.log("y" + y);
                break;
            } else {
                thecolor = hexToDec(thecolor);
            }
            if (hexColorIndexString[thecolor * 4] != undefined) {
                var rgbColors = getColors("0x" + hexColorIndexString.substr(thecolor * 4, 4));
                var subFinalArray = [];
                subFinalArray.push(rgbColors[0]);
                subFinalArray.push(rgbColors[1]);
                subFinalArray.push(rgbColors[2]);
                //get hexTransparentPixelGroupIndexesString string from x and y
                var stripnumber = hexToDec(hexTransparentPixelGroupIndexesString.substr(x * 4, 4));
                var pixelinstrip = Math.floor(y / 2);
                //may need to substract 1 from stripnumber!
                var position = stripnumber * 32 + pixelinstrip;
                if (thecolor == 0) {
                    subFinalArray[3] = 0;
                } else {
                    subFinalArray.push(255);
                }
                subFinalArray.push(position);
                finalArray.push(subFinalArray);
            } else {
                document.getElementById("warning").innerHTML = "corrupt or misunderstood image data from Ethereum blockchain, cannot process";
                console.log("ERROR LOG: " + hexTransparentPixelGroups[x][y]);
                console.log(hexColorIndexString.length);
                console.log("x" + x);
                console.log("y" + y);
                break;

            }

        }

    }
    for (var x = 0; x < 20; x++) {
        console.log("transparent pixel groups" + finalArray[x]);
    }
    console.log("length" + finalArray.length);

    //closing tag forr transparentpixelgroups
}

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

function answerbuttonfunc() {
    var answerr = document.getElementById("answer").value;
	    if (answerr.length > 30) {
		document.getElementById("warning").innerHTML = "too big of an input";
	    setTimeout(function() {document.getElementById("warning").innerHTML = "";  },3000);
	    } else {
    		wss.send(document.getElementById("answer").value);
	    }

}

var answerbuttonvar = document.getElementById("answerbutton");
answerbuttonvar.addEventListener('click', answerbuttonfunc, false);

wss.addEventListener("message", e => {
    document.getElementById("response").innerHTML = e.data;
});

</script>


</body> 
</html>
