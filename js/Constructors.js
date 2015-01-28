/**
 * Created by andi on 27/01/15.
 */
var Encrypt = Encrypt || {};

/* game objects contructor area
 ===================================================================================================================
 */


/*
 * _________________________________________________________________________________________________________________
 * Note area
 * */

/**
 * This object is meant to be owned by the player. If the player drops it, it has to be added to the map, and become
 * pickable. The enemies should be able to pick it up as well. It should be transferable to the friend upon request; yet
 * only as a clone
 * */
Note = function () {

    // variable to keep track of visibility; set to true as a default
    this.isVisible = false;

    // variable to keep track of collidability; set to false as a default because it will be instantiated as belongig to player
    this.isCollidable = false;

    /* an array to keep track of the passwords written down; it should be an array of arrays so that it can track
     the password with its corresponding policy. */
    this.passwords = [[]];

    /* coordinates for the object; if it's not owned, it should appear on the map where it's dropped; if not, its
     default should be -1, -1, so that it's outside out canvas*/
    this.currentX = -1;
    this.currentY = -1;
};

Note.prototype = {

    write: function(password){

        if(typeof(password) === 'string')
            this.passwords.push(password);
        //otherwise do nothing
    },

    /* this method should modify the object's coordinates; the place where it's called should be where the object is
     * removed from the owning object's possession, i.e. set it's paperPassword attribute to null */
    dropPaper: function(droppedX, droppedY){

        this.currentX = droppedX;
        this.currentY = droppedY;
        //TODO: handle putting the paper on the map when it's dropped and removing it when it's picked up
        //  make the switch, if the appropriate fields are false
        if( !this.isCollidable && !this.isVisible) {
            this.isCollidable = true;
            this.isVisible = true;
        }
    }

};
/*
 * ________________________________________________________________________________________________________________
 * Player area
 * */
Player = function (currentX, currentY, game) {

    // player's location on the map
    this.currentX = currentX;
    this.currentY = currentY;
    this.isVisible = true;
    this.isCollidable = true;
    this.speed = 10.0;
    this.bag = [[]];  // array of arrays;
    this.looseNoteChance = 0.25;
    this.note = new Note();

    this.sprite = game.add.sprite(currentX, currentY, 'player');
    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    game.camera.follow(this.sprite);
    this.sprite.body.immovable = false;
    this.sprite.body.collideWorldBounds = true;
    this.sprite.body.bounce.setTo(1, 1);
};

Player.prototype = {

    /*use item from bag on a specified target - will call the object's "use()" method
     due to small number of objects, will use a switch case to handle usage */
    use: function (item) {

        switch (item) {
            case 'antivirus':
                if (this.bag [0] [this.bag [0].length - 1] != null) {
                    this.bag [0] [this.bag [0].length - 1].use();  //antivirus will hold position 0
                }
                //do nothing if the player doesn't have the object; potentially play a sound to let him know what's going awn.
                break;

            case 'anti-keylogger':
                if (this.bag [1] [this.bag [1].length - 1] != null)
                    this.bag [1] [this.bag [1].length - 1].use();
                break;

            case 'firewall':
                if (this.bag [2] [this.bag [2].length - 1] != null) {
                    this.bag [2] [this.bag [2].length - 1].use();
                }
                break;
        }

    },
    /*
     * method to add an item to the player's bag; assume item is a string saying what type of item we're adding
     * */
    addItem: function (item) {

        switch (item) {
            case 'antivirus':
                this.bag [0].push(item);  //antivirus will hold position 0
                //do nothing if the player doesn't have the object; potentially play a sound to let him know what's going awn.
                break;

            case 'anti-keylogger':
                this.bag [1].push(item); // "item" here will be replaced with an instantiation of the appropriate object
                break;

            case 'firewall':
                this.bag [2].push(item);
                break;
        }
    },

    // TODO: refine to add password to a particular policy, or provide option to just write them down as they are
    writeToNote: function (password) {
        this.note.write(password);
    },

    interactWithFriend: function () {

    },
    /* method to be called everytime the user moves (or at every update) that simulates losing the note object*/
    //TODO: handle situation where player picks up another note if he already has one
    loseNote: function () {

        // if there's anything worth losing, i.e. if the note is not empty
        if (this.note.passwords.size() > 0) {

            var chance = Math.random();

            if (chance > this.looseNoteChance) {
                console.log("oh no, you're losing yer paper");
                //drop the note in the current position;
                this.note.dropPaper(currentX, currentY);
            }
            // create a fresh note in the previous one's stead; need to handle case where user has a note and picks another up
            this.note = new Note();
            //lose the note, i.e. drop it
            // place it on the game map
            // set the player's Note object to null
        }
    }
};

/*
 *  ________________________________________________________________________________________________________________
 *  Enemy area
 * */

Enemy = function(currentX, currentY, game, player) {

    // x,y coordinates
    this.currentX = currentX;
    this.currentY = currentY;

    this.game = game;
    this.player =player;

    // visibility - set to true?
    this.isVisible = true;
    //collidable set to true
    this.isCollidable = true;
    // speed of the enemy - set to 10.0 by default
    this.speed = 10.0;
    // variable that'll keep track of whether the object is slowed down by firewall
    this.isSlowed = false;
    // logger chance - set to 0.1 by default - set to private as not used outside of object
    this.loggerChance = 0.1;
    // room infection chance set to 0.1 by default -  set to private as not used outside of object
    this.virusChance = 0.1;
};

Enemy.prototype = {

    putKeyLogger: function(door){
        //TODO: add implementation
    },

    infect: function(room){
        //TODO: add implementation
    },

    breakDoor: function(door){

        // test for door proximity when calling this function; door should be tied to the room, i.e. the room you're passing to

        //test password power on this door
        var passwordStrength = 10;
        //make enemy wait for a set amount of time, according to the strength of the password
        //would be neat if we could implement a waiting bar for when this happens

        // calculated according to passwordStrength
        var timeRemaining = 100;

        while(timeRemaining > 0){
            // wait - look up wait function in Phaser
            timeRemaining--;
        }

        // now let's see if either the door or the room get infected; arguable if we need two separate chances for each
        var infectionChance = Math.random();

        if( infectionChance <= this.loggerChance) {
            this.putKeyLogger(door);
        }
        //TODO: detect which the enemy is in
        if( infectionChance <= this.virusChance) {
            this.infect(room);
        }
    }
};

/*
 *  ________________________________________________________________________________________________________________
 *  Firewall, Antivirus, AntiKeylogger area
 * */
/**
 * This object is meant to be used by the user. Its function is to slow down/kill enemies.
 * As opposed to other objects, it has two different states on the map: static, pickable object, and static actual
 * wall of fire.
 * */

Firewall = function(currentX, currentY, game){

    this.currentX = currentX;
    this.currentY = currentY;
    this.game = game;

    //add its sprite
    this.firewall = game.add.sprite(currentX, currentY, 'firewall');
    //enable physics - not sure if need for collision detection
    game.physics.enable(this.firewall, Phaser.Physics.ARCADE);
    //made immovable as we don't want it thrown around the map
    this.firewall.body.immovable = true;

    //assume objects of type firewall get placed on the map
    this.isVisible = true;
    this.isCollidable = true;

    // a number of seconds the firewall is active; set to a default of 30
    var activeTime = 30;
};

Firewall.prototype = {

    use: function (useX, useY) {

        // first off, we update its coordinates on the map
        this.currentX = useX;
        this.currentY = useY;

        // set it to visible and collidable; this function can't be called again on the object, so it's safe to assume
        //that both attributes are set to false
        this.switchCollidable();
        this.switchVisible();


        // then... we need to load up the new sprite

        // it needs to spread out on the length of the room; how to determine which direction to expand in
        // upon use, a new group needs to be created to simulate collision
    }

};

/**
 * This object is meant to be owned and used by the Player. When placing objects of this type on the map, make sure
 * they belong to the same group as the other pickable objects that only the player can pick up.*/
Antivirus = function(currentX, currentY, game){

    this.currentX = currentX;
    this.currentY = currentY;
    this.game = game;

    //assume put on the map
    this.isVisible = true;
    this.isCollidable = true;

    this.antivirus = game.add.sprite(currentX, currentY, 'antivirus');
    //enable physics - not sure if need for collision detection
    game.physics.enable(this.antivirus, Phaser.Physics.ARCADE);
    //made immovable as we don't want it thrown around the map
    this.antivirus.body.immovable = true;
};

Antivirus.prototype = {

    //antivirus' use function to be used on doors only
    use: function(room){
        if(typeof (room) === 'object')
            if(room.hasOwnProperty('isInfected')){
                room.switchInfected();         //huzzah! door is healed
                return 1;                       // let the caller know too
            }
        return 0; // otherwise return 0
    }
};

/**
 * This object is meant to be owned and used by the Player. When placing objects of this type on the map, make sure
 * they belong to the same group as the other pickable objects that only the player can pick up.*/

AntiKeyLogger = function(currentX, currentY, game){

    this.currentX = currentX;
    this.currentY = currentY;
    this.game = game;

    //assumed to be on the map
    this.isVisible = true;
    this.isCollidable = true;

    this.antikeylloger = game.add.sprite(currentX, currentY, 'antikeylogger');
    //enable physics - not sure if need for collision detection
    game.physics.enable(this.antikeylloger, Phaser.Physics.ARCADE);
    //made immovable as we don't want it thrown around the map
    this.antikeylloger.body.immovable = true;
};

AntiKeyLogger.prototype = {

    // the function responsible for usage of the object on a given door
    use: function(door){

        if(typeof (door) === 'object')
            if(door.hasOwnProperty('isInfected')){
                door.switchInfected();         //huzzah! door is healed
                return 1;                       // let the caller know too
            }
        return 0; // otherwise return 0
    }

};
/*
 *  ________________________________________________________________________________________________________________
 *  Policy area
 * */
/**
 * Policy object constructor. Used for enabling the user to go through doors of belonging to a particular policy;
 * defines the policy of a door; can be found on map; is pickable
 * */
Policy = function( currentX, currentY, game, minLength, minNums, minPunct, minSpeChar, colour) {
    // the attributes of the policy object should be the specifications for how passwords should look like
    this.game = game;
    //minimum length of a password
    this.minLength = minLength;
    // maximum length of a password set to a default of 15; should be changed
    this.maxLength = 15;
    // minimum number of numbers
    this.minNums = minNums;
    // minimum number of punctuation signs
    this.minPunct = minPunct;
    // minimum number of special characters, i.e. @, #, %, ^, &, *, ~
    this.minSpeChar = minSpeChar;
    // colour corresponding to the policy
    this.colour = colour;

    this.policy = game.add.sprite(currentX, currentY, 'policy');
    game.physics.enable(this.policy, Phaser.Physics.ARCADE);
    //made immovable as we don't want it thrown around the map
    this.policy.body.immovable = true;

    // there was no need for methods, as the attributes are set to public)
};
/*
 *  ________________________________________________________________________________________________________________
 *  Friend area
 * */

Friend = function(currentX, currentY, player, game){

    //location
    this.currentX = currentX;
    this.currentY = currentY;

    this.player = player;
    this.game = game;

    this.isVisible = false;
    this.isCollidable = true;
    //speed attribute set to a default of 10.0
    this.speed = 10.0;
    // password paper set to null by default; will be assigned a clone of the actual object upon player's approval
    this.passwordNote = new Note();
    // permission to follow player; can be set to true after player interacts with the friend
    this.permission = false;

    //TODO: uncomment out when the friend image is added to the project
    //this.friend = game.add.sprite(currentX, currentY, 'friend');
};

Friend.prototype = {

    // function to be called when player agrees to cooperate
    getApproval: function(note){

        // friend gets the object (needs changed to clone the object, not a direct reference to it)
        this.passwordNote = note;
        // permission is set to true, so that he can now follow the player around
        this.permission = true;
    },

    //method that alters friend's speed when the player's speed is altered; speed is the speed of the player
    changeSPeed: function(speed){
        this.speed = speed;
    },

    // function to be called when the player moves; or handle friend movement in player movement area
    follow: function(player){

    }
};
