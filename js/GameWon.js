/**
 * Created by andi on 07/02/15.
 * modified by Iva 07.02.2015
 */


//
Encrypt = Encrypt || {};

Encrypt.GameWon = function(){};

Encrypt.GameWon.prototype = {

  create: function () {

    this.game.stage.backgroundColor = '#2F4F4F';
    this.foreground = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'space2');
    this.foreground.autoScroll(0, 20);


    var text = "YOUSA WON DIZ GAME \n Mesa very happy \n\n\n Your score is:";
    var style = {font: "20px Arial", fill: "#fff", align: "center"};
    var textLabel = this.game.add.text(this.game.width / 2, this.game.height - 400 , text, style);
    textLabel.anchor.set(0.5);



    var backButton = this.game.add.button(this.game.width/2 -90, this.game.height - 200, 'restartButton', this.actionInstructions, this);
},

  actionInstructions: function(){

    this.game.state.start('Game');
  }



};