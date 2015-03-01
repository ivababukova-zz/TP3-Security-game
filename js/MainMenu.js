/**
 * Created by andi on 01/02/15.
 */
Encrypt = Encrypt || {};

var mainMenuMusic = null;

Encrypt.MainMenu = function(){};

Encrypt.MainMenu.prototype = {

    create: function() {
	
		//play main menu music
        if( mainMenuMusic === null ) {
            mainMenuMusic = this.game.add.audio('music');
            mainMenuMusic.play();
        }


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
                "Note: For security reasons\nDO NOT USE YOUR PASSWORDS FROM REAL LIFE!\n";
        style = {font: "20px Serif", fill: "#fff", align: "center"};
        welcomeLabel = this.game.add.text(this.game.width / 2, this.game.height - 350, text, style);
        welcomeLabel.anchor.set(0.5);

        this.instrButton = this.game.add.button (this.game.width/2 -70, this.game.height - 240, 'instrButtons', this.showInstructions, this, 1, 0);

        this.startButton = this.game.add.button (this.game.width/2 - 73, this.game.height - 150, 'startButtons', this.startGame, this, 1, 0);
    },

    showInstructions: function () {
        this.game.state.start ('Instructions');
    },

    startGame: function () {
        mainMenuMusic.stop ();
        this.game.state.start ('Game');
    }
};