/**
 * Created by andi on 01/02/15.
 * modified by Iva 07/02/2015
 */
Encrypt = Encrypt || {};

Encrypt.Instructions1 = function(){};

Encrypt.Instructions1.prototype  = {

    create: function(){
        this.background = this.game.add.tileSprite (0, 0, this.game.width, this.game.height, 'firstInstructionPage');
        var skipButton = this.game.add.button(this.game.width/2 -70, this.game.height - 90, 'skipButtons', this.onActionClick, this, 1, 0);
        var nextButton = this.game.add.button(this.game.width/2 + 120, this.game.height - 90, 'nextArrow', this.nextPage, this, 1, 0);
        var previousButton = this.game.add.button(this.game.width/2 -250, this.game.height - 90, 'previousArrow', this.previousPage, this, 0, 1);
    },

    onActionClick: function(){
        this.game.state.start('Game');
    },

    nextPage: function(){
        this.game.state.start('Instructions2');
    },
    previousPage: function(){
        this.game.state.start('InstructionsStory');
    }
};