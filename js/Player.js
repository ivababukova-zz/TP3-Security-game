

function Player () {

    //var currentSprite = path to sprite / name of sprite
    // rolled back to x,y coordinates as using a Coordinate object might mean extra complexity
}
    var currentX;
    var currentY;
    var isVisible = true;
    var speed = 10.0;
    var bag = [[]];  // array of arrays;
    var looseNoteChance = 0.25;
    var note; // TODO: this object is of type Note

    /*
    var note = new Object();  //the actual note
    */


    // getter methods
    Player.getCurrentX = function () {
        return currentX;
    };

    Player.getCurrentY = function () {
        return currentY;
    };

    // move method is unnecessary and will/should be handled in the update() function
    // change the speed of the player
    Player.changeSpeed = function (newSpeed) {
        this.speed = newSpeed;
    };

    //run animation is handled by the game engine
    /*use item from bag on a specified target - will call the object's "use()" method
     due to small number of objects, will use a switch case to handle usage */
    // TODO: refine
    Player.use = function (item) {

        switch(item){
            case 'antivirus':
                if (this.bag [0] [this.bag [0].length -1] != null) {
                    this.bag [0] [this.bag [0].length - 1].use();  //antivirus will hold position 0
                }
                //do nothing if the player doesn't have the object; potentially play a sound to let him know what's going awn.
                break;

            case 'anti-keylogger':
                if (this.bag [1] [this.bag [1].length -1] != null)
                    this.bag [1] [this.bag [1].length -1].use ();
                break;

            case 'firewall':
                if (this.bag [2] [this.bag [2].length - 1] != null) {
                    this.bag [2] [this.bag [2].length - 1].use();
                }
                break;
        }
    };

    //method to add an item to the player's bag; assume item is a string saying what type of item we're adding
    // TODO: refine
    Player.addItem = function (item) {
        switch (item) {
            case 'antivirus':
                this.bag [0].push (item);  //antivirus will hold position 0
                //do nothing if the player doesn't have the object; potentially play a sound to let him know what's going awn.
                break;

            case 'anti-keylogger':
                this.bag [1].push (item); // "item" here will be replaced with an instantiation of the appropriate object
                break;

            case 'firewall':
                this.bag [2].push (item);
                break;
        }
    };

    Player.writeToNote = function (password, policy) {
        this.note.addPassword (password,  policy);  // TODO: create note object with method add password
    };

    // method to interact with the friend; should test for proximity of friend when calling this method
    // TODO
    Player.interactWithFriend = function (friend) {
        // interact with the friend
    };

    // method to be called everytime the user moves (or at every update) that simulates losing the note object
    Player.increaseChanceOfLooseNote = function () {

        if (note.size <= 0) {
        } else {              // if there's anything worth losing, i.e. if the note is not empty
            var chance = Math.random();

            if (chance > this.loseNoteChance) {
                console.log("lqlqlqlqlq");
            }
            //lose the note, i.e. drop it
        }
    };