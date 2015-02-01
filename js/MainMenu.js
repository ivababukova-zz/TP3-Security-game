/**
 * Created by andi on 01/02/15.
 */
Encrypt = Encrypt || {};

Encrypt.MainMenu = function(){}

Encrypt.MainMenu.prototype = {

    create: function() {

        //show the space tile, repeated
        this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'space');

        //give it speed in x
        this.background.autoScroll(-20, 0);

        var text = "Tap tae begin";
        var style = {font: "20px Arial", fill: "#fff", align: "center"};
        var textLabel = this.game.add.text(this.game.width / 2, this.game.height / 2, text, style);
        textLabel.anchor.set(0.5);

        text = "WELCOME TO 3NCRYPT, PLAYA'";
        style = {font: "35px Arial", fill: "#fff", align: "center"};
        var welcomeLabel = this.game.add.text(this.game.width / 2, this.game.height / 2 - 60, text, style);
        welcomeLabel.anchor.set(0.5);

        text = "HAI BRYAN, HEN xoxo";
        style = {font: "35px Arial", fill: "#fff", align: "center"};
        var bryanLabel = this.game.add.text(this.game.width / 2, this.game.height / 2 - 120, text, style);
        bryanLabel.anchor.set(0.5);

        text = "Dun farget tae bring yer knife eh";
        style = {font: "10px Arial", fill: "#fff", align: "center"};
        var bestLabel = this.game.add.text(this.game.width / 2, this.game.height / 2 + 30, text, style);
        bestLabel.anchor.set(0.5);

        var pause_label = this.game.add.text(this.game.width / 2, this.game.height / 2 + 60, 'Instructions', { font: '24px Arial', fill: '#fff' });
        pause_label.inputEnabled = true;
        pause_label.events.onInputUp.add(this.actionInstructions);

    },

    update: function() {
        if(this.game.input.activePointer.justPressed()) {
            this.game.state.start('Game');
        }
    },

    actionInstructions: function(){

        this.game.state.start('Instructions');
    }
};