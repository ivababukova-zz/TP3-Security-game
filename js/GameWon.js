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


    var backButton = this.game.add.button(this.game.width/2 -80, this.game.height - 130, 'restartButton', this.actionInstructions, this);
    this.endButton = this.game.add.button (this.game.width/2 -45, this.game.height - 180, 'endButton', this.goToQuestionaire, this);
    this.endButton.clicked = false;

  },

  actionInstructions: function(){
    this.state.start("Boot");
  },


  goToQuestionaire: function(){
    checkUserStatus();
    //window.location.href='questionnaireAfter.html';
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
                    if (convert[0].trim() === "newuser"){
                        window.location.href='questionnaireAfter.html';
                    }
                    else {
                        window.location.href='userIdentity.html';
                    }
                }
            }
        xmlhttp.open("GET","getuserstatus.php?won="+won+"&finalscore="+finalscore,true);
        xmlhttp.send();
    
};