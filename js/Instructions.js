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
        var textLabel = this.game.add.text(this.game.width/2, this.game.height - 520, text, style);
        textLabel.anchor.set(0.5);

        text = "ESCAPE from the ALIENS";
        style = {font: "19px Serif", fill: "#fff", align: "center"};
        textLabel = this.game.add.text(this.game.width / 2 , this.game.height - 480, text, style);
        textLabel.anchor.set(0.5);

        text = "HOW:";
        style = {font: "25px Serif", fill: "#fff", align: "center"};
        textLabel = this.game.add.text(this.game.width/2, this.game.height - 440, text, style);
        textLabel.anchor.set(0.5);

        text = "FIND the key that would lead you to the space ship.\n" +
                "The space ship will take you back home.\n" +
                "The key is HIDDEN in one of the rooms.\n" +
                "While navigating through doors, you will SET UP PASSWORDS\n" +
                "The aliens will try to BREAK YOUR PASSWORDS and catch you\n" +
                "You need to create as STRONG passwords as possible\n" +
                "so it is hard for them to brake them and catch you.\n" +
                "Collect the HINTS ICONS during the game.\n" +
                "They will tell you how to make stronger passwords.\n" +
                "Use the keyboard ARROWS to navigate.";
        style = {font: "19px Serif", fill: "#fff", align: "center"};
        textLabel = this.game.add.text(this.game.width / 2 , this.game.height - 280, text, style);
        textLabel.anchor.set(0.5);

        text = "Good luck :)";
        style = {font: "25px Serif", fill: "#fff", align: "center"};
        textLabel = this.game.add.text(this.game.width / 2 , this.game.height - 120, text, style);
        textLabel.anchor.set(0.5);

        this.game.stage.backgroundColor = '#000033';
        var backButton = this.game.add.button(this.game.width/2 -70, this.game.height - 90, 'backButton', this.onActionClick, this);
    },

    onActionClick: function(){
        this.game.state.start('MainMenu');
    }
};