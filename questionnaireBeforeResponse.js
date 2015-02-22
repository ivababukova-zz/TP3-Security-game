function generateBeforeResponse() {

	var response = []

	var Q1 = document.getElementById("Q1").value;

	var Q2 = document.getElementById("Q2").value;

	var Q3RadioButtons = document.getElementsByName('Q3');

	for(var i = 0; i < Q3RadioButtons.length; i++){
		if(Q3RadioButtons[i].checked) {
			var Q3 = Q3RadioButtons[i].value;
			break;
		}
	}

	var Q4RadioButtons = document.getElementsByName('Q4');

	for(var i = 0; i < Q4RadioButtons.length; i++){
		if(Q4RadioButtons[i].checked) {
			var Q4 = Q4RadioButtons[i].value;
			break;
		}
	}

	var Q5Output = [];

	var Q5CheckButtons = document.getElementsByName('Q5');

	for(var i = 0; i < Q5CheckButtons.length; i++){
		if(Q5CheckButtons[i].checked) {
			Q5Output[i] = Q5CheckButtons[i].value;
		}else{
			Q5Output[i] = "N";
		}
	}

	var Q5a = Q5Output[0];
	var Q5b = Q5Output[1];
	var Q5c = Q5Output[2];
	var Q5d = Q5Output[3];
	var Q5e = Q5Output[4];

	var Q6Output = [];

	var Q6CheckButtons = document.getElementsByName('Q6');

	for(var i = 0; i < Q6CheckButtons.length; i++){
		if(Q6CheckButtons[i].checked) {
			Q6Output[i] = Q6CheckButtons[i].value;
		}else{
			Q6Output[i] = "N";
		}
	}

	var Q6a = Q6Output[0];
	var Q6b = Q6Output[1];
	var Q6c = Q6Output[2];
	var Q6d = Q6Output[3];
	var Q6e = Q6Output[4];
	var Q6f = Q6Output[5];
	var Q6g = Q6Output[6];

	var Q7ARadioButtons = document.getElementsByName('Q7a');
	var Q7BRadioButtons = document.getElementsByName('Q7b');
	var Q7CRadioButtons = document.getElementsByName('Q7c');
	var Q7DRadioButtons = document.getElementsByName('Q7d');
	var Q7ERadioButtons = document.getElementsByName('Q7e');

	for(var i = 0; i < Q7ARadioButtons.length; i++){
		if(Q7ARadioButtons[i].checked) {
			var Q7a = Q7ARadioButtons[i].value;
		}
	}

	for(var i = 0; i < Q7BRadioButtons.length; i++){
		if(Q7BRadioButtons[i].checked) {
			var Q7b = Q7BRadioButtons[i].value;
		}
	}

	for(var i = 0; i < Q7CRadioButtons.length; i++){
		if(Q7CRadioButtons[i].checked) {
			var Q7c = Q7CRadioButtons[i].value;
		}
	}

	for(var i = 0; i < Q7DRadioButtons.length; i++){
		if(Q7DRadioButtons[i].checked) {
			var Q7d = Q7DRadioButtons[i].value;
		}
	}

	for(var i = 0; i < Q7ERadioButtons.length; i++){
		if(Q7ERadioButtons[i].checked) {
			var Q7e = Q7ERadioButtons[i].value;
		}
	}

	response = [Q1, Q2, Q3, Q4, Q5a, Q5b, Q5c, Q5d, Q5e, 
				Q6a, Q6b, Q6c, Q6d, Q6e, Q6f, Q6g,
				Q7a, Q7b, Q7c, Q7d, Q7e];


	for(var i = 0; i < response.length; i++){
		console.log(response[i])
//		if(response[i] === null || response[i] === undefined){
//			alert("ANSWER MISSING\ngo back to the questionnaire");
//		}
	}
	//return response;
	//if (window.XMLHttpRequest) {
    //        // code for IE7+, Firefox, Chrome, Opera, Safari
    //        xmlhttp = new XMLHttpRequest();
    //    } else {
    //        // code for IE6, IE5
    //        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    //    }
    //    xmlhttp.open("GET","beforegame.php?uid="+uid+"&sid="+sid+"&tid="+tid,true);
    //    xmlhttp.send();
}