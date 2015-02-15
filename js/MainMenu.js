/**
 * Created by andi on 01/02/15.
 */
Encrypt = Encrypt || {};

Encrypt.MainMenu = function(){};

Encrypt.MainMenu.prototype = {

    create: function() {
	
		//play main menu music
	    this.music = this.game.add.audio('music');
        this.music.play();

        //show the space tile, repeated: - (BMDK - Updated to our backdrop)
        this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'space');
        //
        this.foreground = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'space2');


        //give it speed in x
        this.background.autoScroll(-20, 0);
        //BMDK:- Letters are given other direction of scrolling
        this.foreground.autoScroll(0, 20);

        text = "WELCOME TO 3NCRYPT, PLAYA' \n HAI BRYAN, HEN xoxo";
        style = {font: "35px Serif", fill: "#fff", align: "center"};
        var welcomeLabel = this.game.add.text(this.game.width / 2, this.game.height - 500, text, style);
        welcomeLabel.anchor.set(0.5);


        text = "Dun farget tae bring yer knife eh";
        style = {font: "20px Serif", fill: "#fff", align: "center"};
        var bestLabel = this.game.add.text(this.game.width / 2, this.game.height - 360, text, style);
        bestLabel.anchor.set(0.5);


        var instructionsButton = this.game.add.button(this.game.width/2 -70, this.game.height - 300, 'instructionsButton', this.actionInstructions, this);
        var startButton = this.game.add.button(this.game.width/2 - 73, this.game.height - 200, 'startButton', this.startInstructions, this);
    },

    actionInstructions: function(){
        this.game.state.start('Instructions');
    },

    startInstructions: function(){
		this.music.stop();
        this.game.state.start('Game');
    }
};