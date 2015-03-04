var xmlhttp;
var userstatusphp;
var convert = [""];

function generateUserIdentity() {

    var userIdentity = [];

    var userName = document.getElementById("userName").value;

    var userEmail = document.getElementById("userEmail").value;

    userIdentity[0] = userName;
    userIdentity[1] = userEmail;
    /**
     * CHECK IF USER EXISTS IN THE DATABASE
     * IF IT DOES -> GO TO index.html
     * IF IT DOESN'T -> GO TO questionnaireBefore.html
     */
    for(var i = 0; i < userIdentity.length; i++){
        if(userIdentity[i] === null || userIdentity[i] === undefined || userIdentity[i] === ""){
            alert("ANSWER MISSING\ngo back to the questionnaire");
            return [];
        }else{
            checkUserDetails(userIdentity[0],userIdentity[1]);
            // once response from server received, conditionally redirect users based on
            //whether or not they are a new user or existing.
            xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    var userstatusphp = String(xmlhttp.responseText);
                    convert[0] = userstatusphp;
                    if (convert[0].trim() === "0"){
                        window.location.href='questionnaireBefore.html';
                    }
                    else {
                        window.location.href='index.html';
                    }
                }
            }
        }
    }

}

//Function call to use php for finding if new user or existing
 function checkUserDetails(username, emailadd) {
    if (emailadd === "") {
        return;
    } else {
        if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.open("GET","validateuser.php?emailadd="+emailadd+"&username="+username,true);
        xmlhttp.send();
    }
};