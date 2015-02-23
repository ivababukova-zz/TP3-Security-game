/**
 * Created by andi on 01/02/15.
 * modified by Iva 07/02/2015
 */
Encrypt = Encrypt || {};

Encrypt.Instructions = function(){};

Encrypt.Instructions.prototype  = {

    create: function(){
        var text = "YOUR GOAL:";
        var style = {font: "25px Serif", fill: "#fff", align: "center"};
        var textLabel = this.game.add.text(this.game.width/2, this.game.height - 540, text, style);
        textLabel.anchor.set(0.5);

        text = "ESCAPE from the ALIENS";
        style = {font: "19px Serif", fill: "#fff", align: "center"};
        textLabel = this.game.add.text(this.game.width / 2 , this.game.height - 500, text, style);
        textLabel.anchor.set(0.5);

        text = "HOW:";
        style = {font: "25px Serif", fill: "#fff", align: "center"};
        textLabel = this.game.add.text(this.game.width/2, this.game.height - 460, text, style);
        textLabel.anchor.set(0.5);

        text = "FIND the KEY that would lead you to the space ship.\n" +
                "The space ship will take you back home.\n" +
                "The key is HIDDEN in one of the ROOMS.\n" +
                "While navigating through doors, you will SET UP PASSWORDS\n" +
                "The aliens will try to BREAK YOUR PASSWORDS and catch you.\n" +
                "You need to create as STRONG passwords as possible\n" +
                "so it is hard for them to brake them and catch you.\n" +
                "Collect the HINTS ICONS during the game.\n" +
                "They will tell you how to make stronger passwords.\n" +
                "Use the keyboard ARROWS to navigate.";
        style = {font: "19px Serif", fill: "#fff", align: "center"};
        textLabel = this.game.add.text(this.game.width / 2 , this.game.height - 300, text, style);
        textLabel.anchor.set(0.5);

        text = "Good luck :)";
        style = {font: "25px Serif", fill: "#fff", align: "center"};
        textLabel = this.game.add.text(this.game.width / 2 , this.game.height - 140, text, style);
        textLabel.anchor.set(0.5);

        this.game.stage.backgroundColor = '#000033';
        var backButton = this.game.add.button(this.game.width/2 -70, this.game.height - 110, 'mainPageButtons', this.onActionClick, this, 1, 0);
    },

    onActionClick: function(){
        this.game.state.start('MainMenu');
    }
};