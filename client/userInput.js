function answerbuttonfunc() {
    var answerr = document.getElementById("answer").value;
	    if (answerr.length > 30) {
		document.getElementById("warning").innerHTML = "too big of an input";
	    setTimeout(function() {document.getElementById("warning").innerHTML = "";  },3000);
	    } else {
		var sending = {selection:"getsingleID",value:document.getElementById("answer").value}
    		wss.send(JSON.stringify(sending));
	    }

}

var answerbuttonvar = document.getElementById("answerbutton");
answerbuttonvar.addEventListener('click', answerbuttonfunc, false);
