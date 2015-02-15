Encrypt = Encrypt || {};

Encrypt.GameLost = function(){};

Encrypt.GameLost.prototype = {

  create: function () {

    this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'gameover');
    var backButton = this.game.add.button(this.game.width/2 -90, this.game.height - 200, 'restartButton', this.actionInstructions, this);
  },

  actionInstructions: function(){

    this.game.state.start('Game');
  }



};