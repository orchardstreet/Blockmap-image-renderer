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
	    document.getElementById("response").innerHTML = "";
	    console.log("drawing single NFT");
//declare variables
var hexColorIndex = [];
var hexColorIndexString = "";
var hexpixelGroups = [];
var hexTransparentPixelGroups = [];
var hexTransparentPixelGroupIndexes = [];
var hexPixelGroups = [];
var hexPixelGroupIndexes = [];
var hexPixelData = [];
//convert declared arrays to hexidemimal while iterating through:
//decimalColorIndex
//decimalTransparentPixelGroups
//decimalTransparentPixelGroupIndexes
for (var x = 0; x < decimalColorIndex.length; x++) {
    hexColorIndex.push(decToHex(decimalColorIndex[x]));
    //shave off first two characters off hexColorIndex, its uneeded
    hexColorIndex[x] = hexColorIndex[x].slice(2);
    //add three 0s to beginning of hexColorIndex if theres a 1 remainder when dividing by four
    var remainder = hexColorIndex[x].length % 4;
    if (remainder) {
        hexColorIndex[x] = leftpadwithzeros(4-remainder,hexColorIndex[x]);
    }
   // console.log("hexColorIndexAFTER: " + hexColorIndex[x]);
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
        //console.log("hexPixelData: " + hexPixelData[x]);
    }

    for (var x = 0; x < decimalPixelData.length; x++) {
        for (var y = 0; y < hexPixelData[x].length; y = y + 8) {
            var slicey = hexPixelData[x].slice(y, y + 8);
            //console.log("slicey: " + slicey);
	    //console.log("hexPixelData: " + hexPixelData[x]);
            var colourindex = slicey.slice(0, 2);
            if (colourindex == "00") {
                colourindex = 0;
            } else {
                colourindex = hexToDec("0x" + colourindex);
            }
            var group_position = slicey.slice(2, 6);
	    //console.log("hexGroupPosition: " + group_position);
            if (group_position == "00") {
                group_position = 0;
            } else {
                group_position = parseInt(hexToDec("0x" + group_position));
            }
	    //console.log("group_position: " + group_position);
            var pixelindex = slicey.slice(6, 8);
	    //console.log("pixelindex: " + pixelindex);
            if (pixelindex == "00") {
                pixelindex = 0;
            } else {
                pixelindex = parseInt(hexToDec( pixelindex));
            }
	    //console.log("decpixelindex: " + pixelindex);
            if (hexColorIndexString[colourindex * 4] != undefined) {
                //console.log("in!");
                var rgbColors = getColors("0x" + hexColorIndexString.substr(colourindex * 4, 4));
                var subFinalArray = [];

                subFinalArray.push(rgbColors[0]);
                subFinalArray.push(rgbColors[1]);
                subFinalArray.push(rgbColors[2]);
                //get hexPixelGroupIndexesString string from x and y
                //may need to substract 1 from stripnumber!
                var position = (group_position * 32) + pixelindex;
              //  console.log("group_position :" + group_position);
              //  console.log("position: " + position);
                subFinalArray.push(255);
                subFinalArray.push(position);
                finalArray.push(subFinalArray);
            } else {
	    setTimeout(function() {document.getElementById("response").innerHTML = "problems parsing PixelData array, may not have rendered correctly or at all";  },1000);
                //console.log("ERROR LOG: cannot find colourindex in hexcolourIndexString");
                //console.log("ERROR, hexColorIndexString!: " + hexColorIndexString);
	       // console.log("ERROR, colourindex!: " + colourindex);
               // console.log("ERROR, hexColorIndexString length: " + hexColorIndexString.length);
	       // console.log("ERROR, slicey: " + slicey);
	       // console.log("ERROR, hexPixelData row: " + hexPixelData[x]);
               // console.log("ERROR, hexPixelData row number: " + x);
               // console.log("ERROR, position in hexPixelData row: " + y);
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
        //console.log("hexPixelGroupIndexes: " + hexPixelGroupIndexes[x]);
    }
    var hexPixelGroupIndexesString = hexPixelGroupIndexes.join('');
   // console.log("stringg: " + hexPixelGroupIndexesString);


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
                document.getElementById("warning").innerHTML = "problems parsin colorIndex array, may not render correctly or at all";
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
//    console.log("length" + finalArray.length);

    //end up pixelgroups
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
        //console.log("hexTransparentPixelGroups: " + hexTransparentPixelGroups[x]);
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
     //   console.log("hexTransparentPixelGroupIndexes: " + hexTransparentPixelGroupIndexes[x]);
    }
    var hexTransparentPixelGroupIndexesString = hexTransparentPixelGroupIndexes.join('');
  //  console.log("stringg: " + hexTransparentPixelGroupIndexesString);

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
                document.getElementById("warning").innerHTML = "problems parsing transparentPixelData array, may not display correctl, if at all";
                console.log("ERROR LOG: " + hexTransparentPixelGroups[x][y]);
                console.log(hexColorIndexString.length);
                console.log("x" + x);
                console.log("y" + y);
                break;

            }

        }

    }
    for (var x = 0; x < 10; x++) {
      //  console.log("transparent pixel groups" + finalArray[x]);
    }
 //   console.log("length" + finalArray.length);

    //closing tag forr transparentpixelgroups
}
	//closing tag forr renderblockmap
	    }
