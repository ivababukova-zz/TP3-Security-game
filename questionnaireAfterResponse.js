function generateAfterResponse() {

    var responseAfter = [];

    var Q1ARadioButtons = document.getElementsByName('Q1a');
    var Q1BRadioButtons = document.getElementsByName('Q1b');
    var Q1CRadioButtons = document.getElementsByName('Q1c');
    var Q1DRadioButtons = document.getElementsByName('Q1d');
    var Q1ERadioButtons = document.getElementsByName('Q1e');
    var Q1FRadioButtons = document.getElementsByName('Q1f');
    var Q1GRadioButtons = document.getElementsByName('Q1g');

    for(var i = 0; i < Q1ARadioButtons.length; i++){
        if(Q1ARadioButtons[i].checked) {
            var Q1a = Q1ARadioButtons[i].value;
        }
    }

    for(var i = 0; i < Q1BRadioButtons.length; i++){
        if(Q1BRadioButtons[i].checked) {
            var Q1b = Q1BRadioButtons[i].value;
        }
    }

    for(var i = 0; i < Q1CRadioButtons.length; i++){
        if(Q1CRadioButtons[i].checked) {
            var Q1c = Q1CRadioButtons[i].value;
        }
    }

    for(var i = 0; i < Q1DRadioButtons.length; i++){
        if(Q1DRadioButtons[i].checked) {
            var Q1d = Q1DRadioButtons[i].value;
        }
    }

    for(var i = 0; i < Q1ERadioButtons.length; i++){
        if(Q1ERadioButtons[i].checked) {
            var Q1e = Q1ERadioButtons[i].value;
        }
    }

    for(var i = 0; i < Q1FRadioButtons.length; i++){
        if(Q1FRadioButtons[i].checked) {
            var Q1f = Q1FRadioButtons[i].value;
        }
    }

    for(var i = 0; i < Q1GRadioButtons.length; i++){
        if(Q1GRadioButtons[i].checked) {
            var Q1g = Q1GRadioButtons[i].value;
        }
    }


    var Q2 = document.getElementById('Q2').value;

    responseAfter = [Q1a, Q1b, Q1c, Q1d, Q1e, Q1f, Q1g, Q2];

    for(var i = 0; i < responseAfter.length; i++){
        console.log(responseAfter[i])
//		if(response[i] === null || response[i] === undefined){
//			alert("ANSWER MISSING\ngo back to the questionnaire");
//		}
    }
    //return responseAfter;
}