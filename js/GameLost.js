Encrypt = Encrypt || {};

Encrypt.GameLost = function(){};

Encrypt.GameLost.prototype = {

  create: function () {

    this.game.stage.backgroundColor = '#2F4F4F';
    this.foreground = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'space2');
    this.foreground.autoScroll(0, 20);

    var text = "The aliens caught you.";
    var style = {font: "30px Serif", fill: "#fff", align: "center"};
    var textLabel = this.game.add.text(this.game.width / 2, this.game.height - 500 , text, style);
    textLabel.anchor.set(0.5);

    text = "Your passwords for the doors weren't strong enough\n" +
            "and the aliens managed to brake them.\n" +
            "Hackers can brake through your accounts in real world just like the\n" +
            "aliens here, using similar techniques.\n" +
            "This is why it is important to set up passwords that are hard to break.\n" +
            "If you want to try again, press the button below.";
    style = {font: "18px Serif", fill: "#fff", align: "center"};
    textLabel = this.game.add.text(this.game.width / 2, this.game.height - 380 , text, style);
    textLabel.anchor.set(0.5);

    text = "Your score is: " + finalscore;
    style = {font: "30px Serif", fill: "#fff", align: "center"};
    textLabel = this.game.add.text(this.game.width / 2, this.game.height - 250 , text, style);
    textLabel.anchor.set(0.5);

    this.backButton = this.game.add.button (this.game.width/2 -45, this.game.height - 160, 'restartButtons', this.actionInstructions, this, 0, 1, 0, 0)
    this.backButton.clicked = false;

    this.endButton = this.game.add.button (this.game.width/2 -45, this.game.height - 220, 'endButtons', this.goToQuestionaire, this, 0, 1, 0, 0);
    this.endButton.clicked = false;

  },

  actionInstructions: function(){
    this.backButton.clicked = !this.backButton.clicked;
    if (this.backButton.clicked) {
      this.backButton.setFrames(0, 0, 0, 0);
      checkUserStatus();
      //this.state.start ('Boot');
    } else {
      this.backButton.setFrames(0, 1, 0, 0);
    }
  },

  //goToQuestionaire: function(){
  //  this.endButton.clicked = !this.endButton.clicked;
  //  if (this.endButton.clicked) {
  //    this.endButton.setFrames(0, 0, 0, 0);
  //    window.location.href = 'questionnaireAfter.html';
  //  } else {
  //    this.endButton.setFrames(0, 1, 0, 0);
  //  }
  //}
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
        var won = "no";
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
 function updateEndOfAttempt() {
        var won = "no";
        if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    this.state.start ('Boot');
                }
            }
        xmlhttp.open("GET","endCurrentGameAttempt.php?won="+won+"&finalscore="+finalscore,true);
        xmlhttp.send();
    
};