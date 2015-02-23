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
            window.location.href='questionnaireBefore.html';
            return userIdentity;
        }
    }

}