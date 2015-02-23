function generateBeforeResponse() {

	var Q1RadioButtons = document.getElementsByName('Q1');

	for(var i = 0; i < Q1RadioButtons.length; i++){
		if(Q1RadioButtons[i].checked) {
			var Q1 = Q1RadioButtons[i].value;
			break;
		}
	}

	var Q2RadioButtons = document.getElementsByName('Q2');

	for(var i = 0; i < Q2RadioButtons.length; i++){
		if(Q2RadioButtons[i].checked) {
			var Q2 = Q2RadioButtons[i].value;
			break;
		}
	}

	var Q3Output = [];

	var Q3CheckButtons = document.getElementsByName('Q3');

	for(var i = 0; i < Q3CheckButtons.length; i++){
		if(Q3CheckButtons[i].checked) {
			Q3Output[i] = Q3CheckButtons[i].value;
		}else{
			Q3Output[i] = "N";
		}
	}

	var Q3a = Q3Output[0];
	var Q3b = Q3Output[1];
	var Q3c = Q3Output[2];
	var Q3d = Q3Output[3];
	var Q3e = Q3Output[4];

    var Q4RadioButtons = document.getElementsByName('Q4');

    for(var i = 0; i < Q4RadioButtons.length; i++){
        if(Q4RadioButtons[i].checked) {
            var Q4 = Q4RadioButtons[i].value;
            break;
        }
    }
    
    var Q5RadioButtons = document.getElementsByName('Q5');

    for(var i = 0; i < Q5RadioButtons.length; i++){
        if(Q5RadioButtons[i].checked) {
            var Q5 = Q5RadioButtons[i].value;
            break;
        }
    }

    var Q6RadioButtons = document.getElementsByName('Q6');

    for(var i = 0; i < Q6RadioButtons.length; i++){
        if(Q6RadioButtons[i].checked) {
            var Q6 = Q6RadioButtons[i].value;
            break;
        }
    }

    var Q7Output = [];

    var Q7CheckButtons = document.getElementsByName('Q7');

    for(var i = 0; i < Q7CheckButtons.length; i++){
        if(Q7CheckButtons[i].checked) {
            Q7Output[i] = Q7CheckButtons[i].value;
        }else{
            Q7Output[i] = "N";
        }
    }

    var Q7a = Q7Output[0];
    var Q7b = Q7Output[1];
    var Q7c = Q7Output[2];
    var Q7d = Q7Output[3];
    var Q7e = Q7Output[4];
    var Q7f = Q7Output[5];
    var Q7g = Q7Output[6];
    var Q7h = Q7Output[7];
    var Q7i = Q7Output[8];

    var Q8Output = [];

    var Q8CheckButtons = document.getElementsByName('Q8');

    for(var i = 0; i < Q8CheckButtons.length; i++){
        if(Q8CheckButtons[i].checked) {
            Q8Output[i] = Q8CheckButtons[i].value;
        }else{
            Q8Output[i] = "N";
        }
    }

    var Q8a = Q8Output[0];
    var Q8b = Q8Output[1];
    var Q8c = Q8Output[2];
    var Q8d = Q8Output[3];
    var Q8e = Q8Output[4];
    var Q8f = Q8Output[5];

    var Q9ARadioButtons = document.getElementsByName('Q9a');
    var Q9BRadioButtons = document.getElementsByName('Q9b');
    var Q9CRadioButtons = document.getElementsByName('Q9c');
    var Q9DRadioButtons = document.getElementsByName('Q9d');
    var Q9ERadioButtons = document.getElementsByName('Q9e');
    var Q9FRadioButtons = document.getElementsByName('Q9f');
    var Q9GRadioButtons = document.getElementsByName('Q9g');

    for(var i = 0; i < Q9ARadioButtons.length; i++){
        if(Q9ARadioButtons[i].checked) {
            var Q9a = Q9ARadioButtons[i].value;
        }
    }

    for(var i = 0; i < Q9BRadioButtons.length; i++){
        if(Q9BRadioButtons[i].checked) {
            var Q9b = Q9BRadioButtons[i].value;
        }
    }

    for(var i = 0; i < Q9CRadioButtons.length; i++){
        if(Q9CRadioButtons[i].checked) {
            var Q9c = Q9CRadioButtons[i].value;
        }
    }

    for(var i = 0; i < Q9DRadioButtons.length; i++){
        if(Q9DRadioButtons[i].checked) {
            var Q9d = Q9DRadioButtons[i].value;
        }
    }

    for(var i = 0; i < Q9ERadioButtons.length; i++){
        if(Q9ERadioButtons[i].checked) {
            var Q9e = Q9ERadioButtons[i].value;
        }
    }

    for(var i = 0; i < Q9FRadioButtons.length; i++){
        if(Q9FRadioButtons[i].checked) {
            var Q9f = Q9FRadioButtons[i].value;
        }
    }

    for(var i = 0; i < Q9GRadioButtons.length; i++){
        if(Q9GRadioButtons[i].checked) {
            var Q9g = Q9GRadioButtons[i].value;
        }
    }

	var responseBefore = [Q1, Q2, Q3a, Q3b, Q3c, Q3d, Q3e, Q4, Q5, Q6,
				Q7a, Q7b, Q7c, Q7d, Q7e, Q7f, Q7g, Q7h, Q7i,
                Q8a, Q8b, Q8c, Q8d, Q8e, Q8f,
                Q9a, Q9b, Q9c, Q9d, Q9e, Q9f, Q9g];

	for(var i = 0; i < responseBefore.length; i++){
		//console.log(responseBefore[i])
		if(responseBefore[i] === null || responseBefore[i] === undefined){
			alert("ANSWER MISSING\ngo back to the questionnaire");
            return [];
		}
	}
    window.location.href = 'index.html';
	return responseBefore;
}