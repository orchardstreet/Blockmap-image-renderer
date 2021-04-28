self.addEventListener('message',(ev) => {
let dataa = ev.data;
self.postMessage(['publicnotice','rendering: started webworker']);

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
function renderPixelGroupsToCanvasArray(pixelGroups,pixelGroupIndexesString,hexColorIndexString,transparent) {
    for (var x = 0; x < pixelGroups.length; x++) {
        for (var y = 0; y < pixelGroups[x].length; y = y + 2) {
            var thecolor = pixelGroups[x].slice(y, y + 2);
            if (thecolor == "00") {
                thecolor = 0;
            } else if (thecolor == undefined) {
                //console.log("ERROR LOG: can't find hex color index in index array, out-of-bound on index array" + hexTransparentPixelGroups[x][y]);
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
                var stripnumber = hexToDec(pixelGroupIndexesString.substr(x * 4, 4));
                var pixelinstrip = Math.floor(y / 2);
                var position = stripnumber * 32 + pixelinstrip;
                if (thecolor == 0 && transparent == true) {
                    subFinalArray[3] = 0;
                } else {
                    subFinalArray.push(255);
                }
                subFinalArray.push(position);
                finalArray.push(subFinalArray);
            } else {
                //console.log("ERROR LOG: can't find hex color value in color array, out-of-bounds or invalid selection on color array" + hexTransparentPixelGroups[x][y]);
                break;

            }

        }

    }

}
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
//END OF DECTOHEX

function getColors(rgb565Hex) {
    var rgb565Int = parseInt(rgb565Hex)
    var r = (((rgb565Int >> 11) & 0x1f) * 527 + 23) >> 6
    var g = (((rgb565Int >> 5) & 0x3f) * 259 + 33) >> 6
    var b = ((rgb565Int & 0x1f) * 527 + 23) >> 6

    return [r, g, b];
}

function leftpadwithzeros(num, str) {
	  var pad = Array(num + 1).join('0');
		      return (pad + str);
			        return (str + pad).substring(0, pad.length);
}

//declare arrays
var finalArray = [];

function renderBlockmap(decimalColorIndex,decimalPixelGroups,decimalTransparentPixelGroups,decimalTransparentPixelGroupIndexes,decimalPixelGroupIndexes,decimalPixelData) {
//	    document.getElementById("response").innerHTML = "";
	    self.postMessage(["privatenotice","drawing single NFT"]);
//declare variables
var hexColorIndex = [];
var hexColorIndexString = "";
var hexpixelGroups = [];
var hexTransparentPixelGroups = [];
var hexTransparentPixelGroupIndexes = [];
var hexPixelGroups = [];
var hexPixelGroupIndexes = [];
var hexPixelData = [];

for (var x = 0; x < decimalColorIndex.length; x++) {
    hexColorIndex.push(decToHex(decimalColorIndex[x]));
    //shave off first two characters off hexColorIndex, its uneeded
    hexColorIndex[x] = hexColorIndex[x].slice(2);
    //add three 0s to beginning of hexColorIndex if theres a 1 remainder when dividing by four
    var remainder = hexColorIndex[x].length % 4;
    if (remainder) {
        hexColorIndex[x] = leftpadwithzeros(4-remainder,hexColorIndex[x]);
    }
}
//put all of hexColorIndex into single string
hexColorIndexString = hexColorIndex.join('');
//console.log("hexColorIndexString" + hexColorIndexString);


//beginning of pixelData
if (decimalPixelData.length != 0) {

    //convert decimalPixelData to hex, and leftpad them
    for (var x = 0; x < decimalPixelData.length; x++) {
        hexPixelData.push(decToHex(decimalPixelData[x]));
        hexPixelData[x] = hexPixelData[x].slice(2);
	var remainder2 = hexPixelData[x].length % 8;
	if (remainder2) {
            hexPixelData[x] = leftpadwithzeros(8-remainder2,hexPixelData[x]);
	}
    }

    for (var x = 0; x < decimalPixelData.length; x++) {
        for (var y = 0; y < hexPixelData[x].length; y = y + 8) {
            var slicey = hexPixelData[x].slice(y, y + 8);
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
            var pixelindex = slicey.slice(6, 8);
            if (pixelindex == "00") {
                pixelindex = 0;
            } else {
                pixelindex = parseInt(hexToDec( pixelindex));
            }
            if (hexColorIndexString[colourindex * 4] != undefined) {
                var rgbColors = getColors("0x" + hexColorIndexString.substr(colourindex * 4, 4));
                var subFinalArray = [];

                subFinalArray.push(rgbColors[0]);
                subFinalArray.push(rgbColors[1]);
                subFinalArray.push(rgbColors[2]);
                //get hexPixelGroupIndexesString string from x and y
                //may need to substract 1 from stripnumber!
                var position = (group_position * 32) + pixelindex;
                subFinalArray.push(255);
                subFinalArray.push(position);
                finalArray.push(subFinalArray);
            } else {
	    //setTimeout(function() {document.getElementById("response").innerHTML = "problems parsing PixelData array, may not have rendered correctly or at all";  },1000);
                //console.log("ERROR LOG: cannot find colourindex in hexcolourIndexString");
                break;
            }
        }

    }
}


//beginning of pixel groups
if (decimalPixelGroups.length != 0) {
	    //console.log("there are some!");
    //convert decimalPixelgroups to hex, and leftpad them
    for (var x = 0; x < decimalPixelGroups.length; x++) {
        hexPixelGroups.push(decToHex(decimalPixelGroups[x]));
        hexPixelGroups[x] = hexPixelGroups[x].slice(2);
        var length2 = hexPixelGroups[x].length;	
	if (length2 < 64) {
		var difference = 64 - length2;
	        hexPixelGroups[x] = leftpadwithzeros(difference,hexPixelGroups[x]);
	    }
          //console.log("hexPixelGroups: " + hexPixelGroups[x]);
    }


    //convert decimalpixelgroupsindexes to hex, and leftpad them
    for (var x = 0; x < decimalPixelGroupIndexes.length; x++) {
        hexPixelGroupIndexes.push(decToHex(decimalPixelGroupIndexes[x]));
        hexPixelGroupIndexes[x] = hexPixelGroupIndexes[x].slice(2);
        if (x != decimalPixelGroupIndexes.length - 1 ) {
	    var length3 = hexPixelGroupIndexes[x].length;
	    if (length3 < 64) {
	        var difference = 64 - length3;
	        hexPixelGroupIndexes[x] = leftpadwithzeros(difference,hexPixelGroupIndexes[x]);
	    }
        } else {
	    var remainder3 = hexPixelGroupIndexes[x].length % 4;
	    if (remainder3) {
	    hexPixelGroupIndexes[x] = leftpadwithzeros(4-remainder3,hexPixelGroupIndexes[x]);
	    }
        }
    }
    var hexPixelGroupIndexesString = hexPixelGroupIndexes.join('');
   renderPixelGroupsToCanvasArray(hexPixelGroups,hexPixelGroupIndexesString,hexColorIndexString,false);

    //end of pixelgroups


//beginning of hexTransparentPixelGroups
}
if (decimalTransparentPixelGroups.length != 0 ) {
    //convert decimaltransparentpixelgroups to hex, and leftpad them
    for (var x = 0; x < decimalTransparentPixelGroups.length; x++) {
        hexTransparentPixelGroups.push(decToHex(decimalTransparentPixelGroups[x]));
        hexTransparentPixelGroups[x] = hexTransparentPixelGroups[x].slice(2);
	var length4 = hexTransparentPixelGroups[x].length;
        if (length4 < 64) {
	    var difference = 64 - length4;
	    hexTransparentPixelGroups[x] = leftpadwithzeros(difference,hexTransparentPixelGroups[x]);
	    }
    }

    //convert decimaltransparentpixelgroupsindexes to hex, and leftpad them
    for (var x = 0; x < decimalTransparentPixelGroupIndexes.length; x++) {
        hexTransparentPixelGroupIndexes.push(decToHex(decimalTransparentPixelGroupIndexes[x]));
        hexTransparentPixelGroupIndexes[x] = hexTransparentPixelGroupIndexes[x].slice(2);
        if (x != decimalTransparentPixelGroupIndexes.length - 1 ) {
	    var length5 = hexTransparentPixelGroupIndexes[x].length;
	    if (length5 < 64) {
	    var difference = 64 - length5;
	    hexTransparentPixelGroupIndexes[x] = leftpadwithzeros(difference,hexTransparentPixelGroupIndexes[x]);
	    }

        } else {
	    var remainder4 = hexTransparentPixelGroupIndexes[x].length % 4;
	    if (remainder4) {
                hexTransparentPixelGroupIndexes[x] = leftpadwithzeros(4-remainder4,hexTransparentPixelGroupIndexes[x]);
	    }
        }
    }
    var hexTransparentPixelGroupIndexesString = hexTransparentPixelGroupIndexes.join('');

    renderPixelGroupsToCanvasArray(hexTransparentPixelGroups,hexTransparentPixelGroupIndexesString,hexColorIndexString,true);
    //closing tag forr transparentpixelgroups
}
	//closing tag forr renderblockmap
        self.postMessage(["finished",finalArray]);
        self.postMessage(['infos',hexColorIndexString]);
	self.close();
	    }
renderBlockmap(dataa[0],dataa[1],dataa[2],dataa[3],dataa[4],dataa[5]); 
      //closing tag for webworker eventlistener
})
