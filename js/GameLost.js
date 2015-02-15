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
            "Hackers try brake through your accounts in real world just like the\n" +
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

    var backButton = this.game.add.button(this.game.width/2 - 70, this.game.height - 200, 'restartButton', this.actionInstructions, this);
  },

  actionInstructions: function(){

    this.game.state.start('MainMenu');
  }



};