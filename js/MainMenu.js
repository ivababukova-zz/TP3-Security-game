/**
 * Created by andi on 25/01/15.
 */
var Encrypt = Encrypt || {};

Encrypt.MainMenu = function(){};

/**
 * The main menu of the game. This will follow the Preload in the sequence of states and will lead to Game
 * */
Encrypt.MainMenu.prototype = {

    create: function(){

        var style = { font: "30px Arial", fill: "#ddd", align: "center" };
        var text = "Hello, This is the Main Menu. Click to start";

        //add that bit of text to the main menu
        var displayText = this.game.add.text(this.game.width/2, this.game.height/2, text, style);
        displayText.anchor.setTo(0.5);

        this.game.add.sprite(this.game.width / 2, this.game.height / 2 + 50, 'player' );
    },

    update: function(){
        //if the active pointer(i.e. mouse) was just pressed, the game starts
        if(this.game.input.activePointer.justPressed())
            this.game.state.start('Game');
    }

};