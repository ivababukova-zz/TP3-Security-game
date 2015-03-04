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

        // ad logo here
        this.logo = this.game.add.sprite(this.game.width- 525 ,this.game.height - 575, 'logo');

        //TODO format better; add disclaimer saying that if you play the game, you agree to us storing your passwords
        text =   "BY PLAYING THIS GAME YOU GRANT US PERMISSION TO \n STORE YOUR IN-GAME PASSWORDS FOR ANALYSIS PURPOSES\n\n" +
                "NOTE: FOR SECURITY REASONS\nDO NOT USE YOUR PASSWORDS FROM REAL LIFE!\n";

        style = {font: "20px Serif", fill: "#fff", align: "center"};
        welcomeLabel = this.game.add.text(this.game.width / 2, this.game.height - 350, text, style);
        welcomeLabel.anchor.set(0.5);

        this.startButton = this.game.add.button (this.game.width/2 - 73, this.game.height - 220, 'startButtons', this.startGame, this, 1, 0);

        //#000000 black; #fff white
       /* style = {font: "20px Serif", fill: "#000000", align: "center"};
        text = "BY PLAYING THIS GAME YOU GRANT US PERMISSION TO \n STORE YOUR IN-GAME PASSWORDS FOR ANALYSIS PURPOSES";
        var disclaimerLabel = this.game.add.text(this.game.width/2, this.game.height - 55, text, style);
        disclaimerLabel.anchor.set(0.5);*/

    },

    startGame: function () {
        mainMenuMusic.stop ();
        this.game.state.start ('InstructionsStory');
    }
};