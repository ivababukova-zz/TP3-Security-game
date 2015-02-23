/**
 * Created by andi on 01/02/15.
 */
Encrypt = Encrypt || {};

Encrypt.MainMenu = function(){};

Encrypt.MainMenu.prototype = {

    create: function() {
	
		    //play main menu music
	      this.music = this.game.add.audio ('music');
        this.music.play ();

        //show the space tile, repeated: - (BMDK - Updated to our backdrop)
        this.background = this.game.add.tileSprite (0, 0, this.game.width, this.game.height, 'space');
        this.foreground = this.game.add.tileSprite (0, 0, this.game.width, this.game.height, 'space2');

        //give it speed in x
        this.background.autoScroll (-20, 0);
        //BMDK:- Letters are given other direction of scrolling
        this.foreground.autoScroll (0, 20);

        text = "WELCOME TO 3NCRYPT";
        style = {font: "35px Serif", fill: "#fff", align: "center"};
        var welcomeLabel = this.game.add.text(this.game.width / 2, this.game.height - 500, text, style);
        welcomeLabel.anchor.set(0.5);


        text =  "You are on a spaceship whose mission is to colonize Mars\n" +
                "When you approach the planet the native aliens attack the spaceship.\n" +
                "Being the only survivor, you have to get back to Earth and warn everyone.\n" +
                "Your only hope to ESCAPE is to get to the launch pad and fly back to Earth.\n" +
                "See how on the instructions page.\n\n" +
                "click twice one of the buttons below:\n";
        style = {font: "20px Serif", fill: "#fff", align: "center"};
        welcomeLabel = this.game.add.text(this.game.width / 2, this.game.height - 350, text, style);
        welcomeLabel.anchor.set(0.5);

        this.pressedInstrButton = this.game.add.button (this.game.width/2 -70, this.game.height - 240, 'pressedInstrButton', this.unpress, this);
        // this.pressedInstrButton.inputEnabled = false;
        this.instrButton = this.game.add.button (this.game.width/2 -70, this.game.height - 240, 'instructionsButton', this.showInstructions, this);

        this.pressedStartButton = this.game.add.button (this.game.width/2 - 73, this.game.height - 150, 'pressedStartButton', this.startGame, this);
        this.startButton = this.game.add.button (this.game.width/2 - 73, this.game.height - 150, 'startButton', this.hidethisButton, this);
    },

    showInstructions: function () {
        this.instrButton.renderable = false;
        this.instrButton.inputEnabled = false;
        //this.time.events.loop(1000, this.instrButton.renderable = true, this);
        //this.game.state.start ('Instructions');
        //this.instrButton.renderable = true;
    },

    unpress: function () {
        this.game.state.start ('Instructions');
    },

    hidethisButton: function () {
        this.startButton.renderable = false;
        this.startButton.inputEnabled = false;
    },

    startGame: function () {
		    this.music.stop ();
        this.game.state.start ('Game');
    }
};