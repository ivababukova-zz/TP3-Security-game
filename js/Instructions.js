/**
 * Created by andi on 01/02/15.
 */
Encrypt = Encrypt || {};

Encrypt.Instructions = function(){};

Encrypt.Instructions.prototype  = {

    create: function(){

        this.game.stage.backgroundColor = '#337799';
        var backButton = this.game.add.button(this.game.width/2, this.game.height - 100, 'backButton', this.onActionClick, this);
    },

    update: function(){

    },

    onActionClick: function(){
        this.game.state.start('MainMenu');
    }
};