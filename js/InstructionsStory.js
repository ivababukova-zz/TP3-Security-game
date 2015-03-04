/**
 * Created by andi on 01/02/15.
 * modified by Iva 07/02/2015
 */
Encrypt = Encrypt || {};

Encrypt.InstructionsStory = function(){};

Encrypt.InstructionsStory.prototype  = {

    create: function(){
        this.background = this.game.add.tileSprite (0, 0, this.game.width, this.game.height, 'initialInstructionPage');
        var seeHowButton = this.game.add.button(this.game.width/2 -70, this.game.height - 90, 'seeHowButtons', this.onActionClick, this, 1, 0);
    },

    onActionClick: function(){
        this.game.state.start('Instructions1');
    }
};