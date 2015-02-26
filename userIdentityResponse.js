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
           // var userstatus = $.get('getuserstatus.php', function ( data ) {
           //     alert(data)
           //     });
           // console.log(userstatus);
            //if (userstatus === "newuser"){
             //   window.location.href='questionnaireBefore.html';
            //} else {
                //window.location.href='index.html'
           // }
            return userIdentity;
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
        //xmlhttp.onreadystatechange = function() {
        //    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        //        document.getElementById("txtHint").innerHTML = xmlhttp.responseText;
        //    }
        
        xmlhttp.open("GET","validateuser.php?emailadd="+emailadd+"&username="+username,true);
        xmlhttp.send();
    }
};