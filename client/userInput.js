function answerbuttonfunc(isbrowse,isright) {
    var answerr = document.getElementById("answer").value;
	    if (answerr.length > 30) {
		document.getElementById("warning").innerHTML = "too big of an input";
	    setTimeout(function() {document.getElementById("warning").innerHTML = "";  },3000);
	    } else if (isNaN(answerr)) {
		document.getElementById("warning").innerHTML = "needs to be a number";
	    setTimeout(function() {document.getElementById("warning").innerHTML = "";  },3000);
	    } else {
		if (isbrowse) {
		if (isright) {
		answerr++;
                document.getElementById("answer").value = answerr;
		} else {
		answerr--;
                document.getElementById("answer").value = answerr;
		}
		}
		document.getElementById("warning").innerHTML = "";
		var sending = {selection:"getsingleID",value:answerr};
    		wss.send(JSON.stringify(sending));
	    }

}


var answerbuttonvar = document.getElementById("answerbutton");
var leftbuttonvar = document.getElementById("leftnext");
var rightbuttonvar = document.getElementById("rightnext");
answerbuttonvar.addEventListener('click', function() {answerbuttonfunc(false,false)}, false);
leftbuttonvar.addEventListener('click', function() {answerbuttonfunc(true,false)}, false);
//rightbuttonvar.addEventListener('click', function() {answerbuttonfunc(true,true)}, false);
rightbuttonvar.addEventListener('click', wasmShit, false);
