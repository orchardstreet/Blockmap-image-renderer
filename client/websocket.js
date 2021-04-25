//websocket connection
//put name of your site below
const wss = new WebSocket('ws://sonorousprograms.com/socket');
wss.onopen = () => {
    console.log('Now connected');
    document.getElementById('notif').innerHTML = "Connected";
    document.getElementById('notif').style.color = "green";
    document.getElementById('notif').style.top = "50px";
    document.getElementById('notif').style.lineHeight = "18px";
};

wss.addEventListener("message", e => {
	var responsee = JSON.parse(e.data);
	if (responsee["response"] == "error") {
	document.getElementById("response").innerHTML = responsee["value"];
        setTimeout(function() {document.getElementById("response").innerHTML = "";  },3000);
	} else if (responsee["response"] == "singleRawImageData") {
		
		//PLUG IN VALUES HEEEERRREEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE!!
	renderBlockmap(responsee["colorIndex"],responsee["pixelGroups"],responsee["transparentPixelGroups"],responsee["transparentPixelGroupIndexes"],responsee["pixelGroupIndexes"],responsee["pixelData"]);

	} else {
        document.getElementById("response").innerHTML = "undocumented error";	
        setTimeout(function() {document.getElementById("response").innerHTML = "";  },3000);
	}
});
