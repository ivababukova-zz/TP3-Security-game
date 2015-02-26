var responseAfter = [];

function generateAfterResponse() {

    var Q1 = document.getElementById('Q1').value;
    var Q2 = document.getElementById('Q2').value;

    var Q3ARadioButtons = document.getElementsByName('Q3a');
    var Q3BRadioButtons = document.getElementsByName('Q3b');
    var Q3CRadioButtons = document.getElementsByName('Q3c');
    var Q3DRadioButtons = document.getElementsByName('Q3d');

    for(var i = 0; i < Q3ARadioButtons.length; i++){
        if(Q3ARadioButtons[i].checked) {
            var Q3a = Q3ARadioButtons[i].value;
        }
    }

    for(var i = 0; i < Q3BRadioButtons.length; i++){
        if(Q3BRadioButtons[i].checked) {
            var Q3b = Q3BRadioButtons[i].value;
        }
    }

    for(var i = 0; i < Q3CRadioButtons.length; i++){
        if(Q3CRadioButtons[i].checked) {
            var Q3c = Q3CRadioButtons[i].value;
        }
    }

    for(var i = 0; i < Q3DRadioButtons.length; i++){
        if(Q3DRadioButtons[i].checked) {
            var Q3d = Q3DRadioButtons[i].value;
        }
    }

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

    var Q7RadioButtons = document.getElementsByName('Q7');

    for(var i = 0; i < Q7RadioButtons.length; i++){
        if(Q7RadioButtons[i].checked) {
            var Q7 = Q7RadioButtons[i].value;
            break;
        }
    }

    var Q8ARadioButtons = document.getElementsByName('Q8a');
    var Q8BRadioButtons = document.getElementsByName('Q8b');
    var Q8CRadioButtons = document.getElementsByName('Q8c');
    var Q8DRadioButtons = document.getElementsByName('Q8d');
    var Q8ERadioButtons = document.getElementsByName('Q8e');
    var Q8FRadioButtons = document.getElementsByName('Q8f');

    for(var i = 0; i < Q8ARadioButtons.length; i++){
        if(Q8ARadioButtons[i].checked) {
            var Q8a = Q8ARadioButtons[i].value;
        }
    }

    for(var i = 0; i < Q8BRadioButtons.length; i++){
        if(Q8BRadioButtons[i].checked) {
            var Q8b = Q8BRadioButtons[i].value;
        }
    }

    for(var i = 0; i < Q8CRadioButtons.length; i++){
        if(Q8CRadioButtons[i].checked) {
            var Q8c = Q8CRadioButtons[i].value;
        }
    }

    for(var i = 0; i < Q8DRadioButtons.length; i++){
        if(Q8DRadioButtons[i].checked) {
            var Q8d = Q8DRadioButtons[i].value;
        }
    }

    for(var i = 0; i < Q8ERadioButtons.length; i++){
        if(Q8ERadioButtons[i].checked) {
            var Q8e = Q8ERadioButtons[i].value;
        }
    }

    for(var i = 0; i < Q8FRadioButtons.length; i++){
        if(Q8FRadioButtons[i].checked) {
            var Q8f = Q8FRadioButtons[i].value;
        }
    }

    var Q9 = document.getElementById('Q9').value;

    responseAfter = [Q1, Q2, Q3a, Q3b, Q3c, Q3d, Q4, Q5, Q6, Q7,
                        Q8a, Q8b, Q8c, Q8d, Q8e, Q8f, Q9];

    for(var i = 0; i < responseAfter.length; i++){
		if(responseAfter[i] === null || responseAfter[i] === undefined){
			alert("ANSWERS MISSING\ngo back to the questionnaire");
            return [];
		}
    }

    //write responses to the database
    storeanswers2();

}

//Function call to use php for finding if new user or existing
 function storeanswers2() {
        if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                window.location.href='feedback.html';
            }
        }
        //Please do not replace with straight references to HTML objects as these will NOT
        //store properly in the database
        xmlhttp.open("GET","storeanswers2.php?a1="+responseAfter[0]+"&a2="+responseAfter[1]
            +"&a3="+responseAfter[2]+"&a4="+responseAfter[3]+"&a5="+responseAfter[4]
            +"&a6="+responseAfter[5]+"&a7="+responseAfter[6]+"&a8="+responseAfter[7]
            +"&a9="+responseAfter[8]+"&a10="+responseAfter[9]+"&a11="+responseAfter[10]
            +"&a12="+responseAfter[11]+"&a13="+responseAfter[12]+"&a14="+responseAfter[13]
            +"&a15="+responseAfter[14]+"&a16="+responseAfter[15]+"&a17="+responseAfter[16],true);
        xmlhttp.send();
};