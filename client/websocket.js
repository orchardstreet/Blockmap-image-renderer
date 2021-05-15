//websocket connection
//put name of your site below
//

const wss = new WebSocket('ws://sonorousprograms.com/socket');
wss.onopen = () => {
    console.log('Now connected');
    document.getElementById('notif').innerHTML = "Connected";
    document.getElementById('notif').style.color = "green";
    document.getElementById('notif').style.lineHeight = "18px";
};

wss.addEventListener("message", e => {
//    document.getElementById("response").innerHTML = JSON.parse(e.data);
	var responsee = JSON.parse(e.data);
//	console.log(e.data);
//	console.log(typeof responsee);
//	console.log(responsee);
//	console.log(responsee["response"]);
	if (responsee["response"] == "error") {
	document.getElementById("warning").innerHTML = responsee["value"];
	setTimeout(function() {document.getElementById("warning").innerHTML = ""},3000);
	} else if (responsee["response"] == "singleRawImageData") {
//	document.getElementById("response").innerHTML = JSON.stringify(responsee);      
	document.getElementById("innerinfos").innerHTML = "";
		
		//PLUG IN VALUES HEEEERRREEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE!!
        worker = new Worker('render-worker.js');
	var tosend = [responsee["colorIndex"],responsee["pixelGroups"],responsee["transparentPixelGroups"],responsee["transparentPixelGroupIndexes"],responsee["pixelGroupIndexes"],responsee["pixelData"]];
	document.getElementById("response").innerHTML = "rendering";
	worker.postMessage(tosend);
	worker.addEventListener('message',workerMessaged);
	worker.addEventListener('message',workerError);

	} else {
        document.getElementById("warning").innerHTML = "undocumented error";	
        setTimeout(function() {document.getElementById("warning").innerHTML = "<br>";  },3000);
	}
});

function displayColors(hexColorIndexString) {
	        for (var x = 0; x < hexColorIndexString.length; x = x+4) {
		document.getElementById("innerinfos").innerHTML += hexColorIndexString.slice(x,x+4) + "  ";
		} 
}


function workerMessaged(ev) {
	let fromwebworker = ev.data;
	if (fromwebworker[0] == "publicnotice") {
	document.getElementById("response").innerHTML = fromwebworker[1];

	} else if (fromwebworker[0] == "privatenotice") { 
	console.log(fromwebworker[1]);
	} else if (fromwebworker[0] == "finished") {
	console.log("webworker finished and returned data");
	document.getElementById("response").innerHTML = "rendering: finished";
         thefinalArray = fromwebworker[1];
	redraw();
	} else if (fromwebworker[0] == "infos") {
		setTimeout(function() {displayColors(fromwebworker[1]);},30);

	}


}

function workerError(err) {
	console.log(err.message,err.filename);

}
