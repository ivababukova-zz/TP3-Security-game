/**
 * Created by andi on 07/02/15.
 * modified by Iva 07.02.2015
 */
var convert = [""]; //Added by Bryan to track userstatus for conditional redirect

Encrypt = Encrypt || {};

Encrypt.GameWon = function(){};

Encrypt.GameWon.prototype = {

  create: function () {

    this.game.stage.backgroundColor = '#2F4F4F';
    this.foreground = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'space2');
    this.foreground.autoScroll(0, 20);


    var text = "YOU WON! :)";
    var style = {font: "30px Serif", fill: "#fff", align: "center"};
    var textLabel = this.game.add.text(this.game.width / 2, this.game.height - 520 , text, style);
    textLabel.anchor.set(0.5);

    text =  "You managed to set up strong passwords\n" +
            "so the aliens couldn't manage to break in time\n" +
            "and catch you.\n" +
            "You have the key, so you will be taken safe home now.\n" +
            "Try to use the knowledge you gained in real life\n" +
            "to set up secure passwords so the hackers won't\n" +
            "break into your accounts.\n\n" +
            "Click the green button below to play again.\n";
    style = {font: "18px Serif", fill: "#fff", align: "center"};
    textLabel = this.game.add.text(this.game.width / 2, this.game.height - 340 , text, style);
    textLabel.anchor.set(0.5);

    text = "Your score is " + finalscore;
    style = {font: "30px Serif", fill: "#fff", align: "center"};
    textLabel = this.game.add.text(this.game.width / 2, this.game.height - 220 , text, style);
    textLabel.anchor.set(0.5);


    this.backButton = this.game.add.button (this.game.width/2 -45, this.game.height - 120, 'restartButtons', this.actionInstructions, this, 0, 1, 0, 0)
    this.backButton.clicked = false;

    this.endButton = this.game.add.button (this.game.width/2 -45, this.game.height - 180, 'endButtons', this.goToQuestionaire, this, 0, 1, 0, 0);
    this.endButton.clicked = false;

  },

  actionInstructions: function(){
    //in here do an update to the end of the current game attempt 
    // then redirect on ready to the game
    this.backButton.clicked = !this.backButton.clicked;
    if (this.backButton.clicked) {
        this.backButton.setFrames(0, 0, 0, 0);
        updateEndOfAttempt(this);
        //this.state.start ('Boot');
    } else {
      this.backButton.setFrames(0, 1, 0, 0);
    }
  },

  goToQuestionaire: function(){
    //check the user status then do a redirect based on 
    // whether or not we already have their answers
    this.endButton.clicked = !this.endButton.clicked;
    if (this.endButton.clicked) {
      this.endButton.setFrames(0, 0, 0, 0);
      checkUserStatus();
      //window.location.href = 'questionnaireAfter.html';
    } else {
      this.endButton.setFrames(0, 1, 0, 0);
    }
  }



};

//Function call to use php for finding if new user or existing
 function checkUserStatus() {
        var won = "yes";
        if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    var userstatusphp = String(xmlhttp.responseText);
                    convert[0] = userstatusphp;
                    //may need to be === 0 (without quotes)
                    if (convert[0].trim() === "0"){
                        window.location.href='questionnaireAfter.html';
                    }
                    else {
                        window.location.href='feedback.html';
                    }
                }
            }
        xmlhttp.open("GET","getuserstatus.php?won="+won+"&finalscore="+finalscore,true);
        xmlhttp.send();
    
};

//Function call to use php for finding if new user or existing
 function updateEndOfAttempt(context) {
        var won = "yes";
        if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    context.state.start ('Boot');
                }
            }
        xmlhttp.open("GET","endCurrentGameAttempt.php?won="+won+"&finalscore="+finalscore,true);
        xmlhttp.send();
    
};