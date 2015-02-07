/**
 * Created by andi on 01/02/15.
 * modified by Iva 07/02/2015
 */
Encrypt = Encrypt || {};

Encrypt.Instructions = function(){};

Encrypt.Instructions.prototype  = {

    create: function(){
        var text = "Some instructionzzzz here: \n";
        var style = {font: "30px Arial", fill: "#fff", align: "center"};
        var textLabel = this.game.add.text(this.game.width/2, this.game.height - 500, text, style);
        textLabel.anchor.set(0.5);

        text = "Press lqlqlqlq to lqlqlqql \n then press lqlqlqlq to lqlqlqlqq";
        style = {font: "20px Arial", fill: "#fff", align: "center"};
        textLabel = this.game.add.text(this.game.width / 2 , this.game.height / 2, text, style);
        textLabel.anchor.set(0.5);

        this.game.stage.backgroundColor = '#337799';
        var backButton = this.game.add.button(this.game.width/2 -70, this.game.height - 200, 'backButton', this.onActionClick, this);
    },

    onActionClick: function(){
        this.game.state.start('MainMenu');
    }
};