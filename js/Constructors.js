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
    this.passwords =[];

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
Player = function (currentX, currentY, game, score, metrics) {

    // player's location on the map
    this.currentX = currentX;
    this.currentY = currentY;
    this.isVisible = true;
    this.isCollidable = true;
    this.currentRoom = 0;
    this.game = game;
    this.score = score; // variable that holds a reference to the score system | used in disinfect
    this.metrics = metrics;

    this.firewallBag = [];  // stores: firewall objects collected from the map @iva
    this.antivirusBag = []; // stores: antivirus objects collected from the map @iva
    this.antikeyLoggerBag = []; // stores: antikeylogger objects from the map @iva
    this.hintsBag = pickedHints; // stores the hints and tips collected by the player @iva

    this.looseNoteChance = 0.25;
    this.note = new Note();
    this.passwordResetsAvailable = 5;

    // policies dictionary: keeps track of what policies the player has access to
    this.policies = {};
    this.policies["green"] = new Policy(-1, -1, this.game, 5, 0, 0, 0, 0, "green" );

    this.sprite = game.add.sprite(currentX, currentY, 'player');
    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    game.camera.follow(this.sprite);
    this.sprite.body.immovable = false;
    this.sprite.body.collideWorldBounds = true;
    this.sprite.body.bounce.setTo(1, 1);
};

Player.prototype = {

    /**use item from bag on a specified target - will call the object's "use()" method
     due to small number of objects, will use a switch case to handle usage */
    // modified by Iva 07.02.2015
    use: function (item) {

        switch (item) {
            case 'antivirus':
                if (this.antivirusBag != null) {
                    this.antivirusBag [this.antivirusBag.length - 1].use();  //antivirus will hold position 0
                }
                //do nothing if the player doesn't have the object; potentially play a sound to let him know what's going awn.
                break;

            case 'AntiKeyLog':
                if (this.antikeyLoggerBag [this.antikeyLoggerBag.length - 1] != null)
                    this.antikeyLoggerBag [this.antikeyLoggerBag.length - 1].use();
                break;

            case 'firewall':
                if (this.firewallBag [this.firewallBag.length - 1] != null) {
                    this.firewallBag [this.firewallBag.length - 1].use();
                }
                break;
        }

    },

    /**
     * Method used to disinfect a room
     * @param: room - the room to disinfect
     * @return: boolean - indication whether disinfection happened
     * */
    disinfect: function(){
        var successful = false;
        if( currentPlayerRoom.properties.infected && this.antivirusBag.length > 0 ){

            currentPlayerRoom.properties.infected = false;
            this.antivirusBag.splice(this.antivirusBag.length-1, 1 );
            // take note of this in the score system
            this.score.scoreNeutralise("room");
            this.metrics.usedTool("antivirus", true);
            successful = true;
        }
        else if(!currentPlayerRoom.properties.infected) {
            // mark it as a fail only when the room is not infected
            this.score.scoreNeutralise("failed");
            this.metrics.usedTool("antivirus", false);
        }
        return successful;

    },

    /**
     * Method for when the user wants to remove the keylogger on a door; should be called through a button on the input form
     * @param: door - the door to test & remove keylogger
     * */
    removeKeylogger: function(door){

      if(door.hasKeylogger !== undefined && this.antikeyLoggerBag.length > 0){

          if(door.hasKeylogger === true) {
              door.hasKeylogger = false;
              this.antikeyLoggerBag.splice(this.antikeyLoggerBag.length-1, 1);
              //take note in the score system
              this.score.scoreNeutralise("door");
              this.metrics.usedTool("antikeylogger", true);
          }
          else {
              this.score.scoreNeutralise("failed");
              this.metrics.usedTool("antikeylogger", false);
          }
      }
    },
    /*
     * method to add an item to the player's bag; assume item is a string saying what type of item we're adding
     * */
    /*
    *
    * no more than one item from the same type can be added. For example, if the player collects 1, or 15, or
    * 2 firewall items, the bag will contain only 1.
    * */
    // modified by Iva 07.02.2015
      addItem: function (numb) {
        //console.log ("just collected item wohohohooooo!");
         if (numb === 1) {
             this.firewallBag.push(this.firewallBag.length + 1);  // increment the firewall bag
         }
        else if (numb === 2) {
             this.antivirusBag.push(this.antivirusBag.length + 1);
         }
        else if (numb === 3) {
             this.antikeyLoggerBag.push(this.antikeyLoggerBag.length + 1);
         }
    },

    // TODO: refine to add password to a particular policy, or provide option to just write them down as they are
    writeToNote: function (password) {
        this.note.write(password);
    },

    /* method to be called everytime the user moves (or at every update) that simulates losing the note object*/
    //TODO: handle situation where player picks up another note if he already has one
    loseNote: function () {

        // if there's anything worth losing, i.e. if the note is not empty
        if (this.note.passwords.size() > 0) {

            var chance = Math.random();

            if (chance > this.looseNoteChance) {
                //console.log("oh no, you're losing yer paper");
                //drop the note in the current position;
                this.note.dropPaper(currentX, currentY);
            }
            // create a fresh note in the previous one's stead; need to handle case where user has a note and picks another up
            this.note = new Note();
            //lose the note, i.e. drop it
            // place it on the game map
            // set the player's Note object to null
        }
    },

    addPolicy: function(policy){

         // if the array stored in the player doesn't have the key corresponding to the colour of the given policy
        if(!this.policies.hasOwnProperty(policy.colour))
            this.policies[policy.colour] = policy;
            //else do nothing
        }
};

/*
* ________________________________________________________________________________________________________________
* Enemy area
* */

Enemy = function(currentX, currentY, game, player, backgroundLayer) {

    // x,y coordinates
    this.currentX = currentX;
    this.currentY = currentY;

    this.game = game;
    this.player = player;
    this.backgroundLayer = backgroundLayer;
    this.currentRoom = 10;               // TODO: decide default value to be initialised - currently instantiated in room 2
    this.previousRoom = this.currentRoom; // Andi: a variable used for infecting rooms; set to the default room upon creation
    this.lastKnownDirections = ["",""];
    this.lastKnownY = 0;
    this.lastKnownX = 0;
    this.lastKnownDirection = "";
    this.isstuck = false;
    this.isstuckcount = 0;

    // @iva: the enemy's dictionary with most used passwords:
    this.passwordsDictionary = {
        letmein:1,
        00000000:1,
        qwerty:1,
        12345678:1,
        12345:1,
        monkey:1,
        123123:1,
        password:1,
        abc123: 1};
    // visibility - set to true?
    this.isVisible = true;
    //collidable set to true
    this.isCollidable = true;
    // speed of the enemy - set to 10.0 by default
    this.speed = 260;
    // variable that'll keep track of whether the object is slowed down by firewall
    this.isSlowed = false;
    // logger chance - set to 0.1 by default - set to private as not used outside of object
    this.loggerChance = 0.1;
    // room infection chance set to 0.1 by default - set to private as not used outside of object
    this.virusChance = 0.1;
    // an array that stores the path to the player
    this.pathToPlayer = [];
    //variable to keep track of how often the path-finding algorithm is called
    this.countsToFindPath = 30;
    //variable to keep track of the position in the path array; set to 1 as the first element is the enemy's position
    this.pathPosition = 1;

    this.isMovable = true; /* @iva: is the enemy disabled to move.NOTE: this variable is used only for testing.
    As soon as the door breaking functionality is ready, I will delete it */

    // variable to keep track of whether a new path is needed; default is true as we don't have a path yet
    this.needNewPath = true;
    //variable to keep track of how long it's taking the enemy to get to the next tile; when it gets to 0, a new path is requested
    this.nextTileCounter = 15;



    //add its spriteSheet
    this.sprite = game.add.sprite(currentX, currentY, 'enemy');
    //BMDK: - Set sprite to first frame
    this.sprite.frame = 0;
    //BMDK: - Add animation loop for alien
    this.sprite.animations.add('any', [0, 1, 2, 3, 4], 15,true, true);

    game.physics.enable (this.sprite, Phaser.ARCADE);
    this.sprite.body.immovable = false;
    this.sprite.body.collideWorldBounds = true;
    this.sprite.enableBody = true;

};

Enemy.prototype = {

    update: function () {
        this.sprite.frame = enemyFrame%5;
        this.hasChangedRoom();

        if (this.pathToPlayer.length !== 0) {
            // if the array is not empty or we've not reached the end of the array
            if (this.pathPosition < this.pathToPlayer.length) {
                // if we've reached the next tile in the path
                if (this._onNextTile()) {
                    //increment our position in the path
                    this.pathPosition++;
                    //re-initialise the counter when a new tile is moved to
                    this.nextTileCounter = 30;
                }
                else {
                     //otherwise, move in that direction
                    this._moveInNextDirection();
                    //decrement the tile counter at every move
                    this.nextTileCounter--;
                }

                if (this.nextTileCounter === 0) {
                    this.needNewPath = true;
                    this.nextTileCounter = 30;
                }
            }
            else {
                // need a new path
                this.needNewPath = true;
                this.nextTileCounter = 30;
                //reset the position in the array
                this.pathPosition = 0;
            }
        }
        else {
            this.needNewPath = true;
        }

    },

    /**
    * Private function that returns true if the enemy is on the next tile in the path or false if it is not
    * */
    _onNextTile: function(){

        // current tile
        var enemyTileX = this.backgroundLayer.getTileX(this.sprite.x);
        var enemyTileY = this.backgroundLayer.getTileY(this.sprite.y);

        var next = this.pathToPlayer[this.pathPosition];
        var nextTileX = next.x;
        var nextTileY = next.y;

        if( enemyTileX === nextTileX && enemyTileY === nextTileY ) {
            return true;
        }
        return false;
    },

    _moveInNextDirection: function(){

        //the positions
        var enemyTileX = this.backgroundLayer.getTileX(this.sprite.x);
        var enemyTileY = this.backgroundLayer.getTileY(this.sprite.y);

        var nextTileX = this.pathToPlayer[this.pathPosition].x;
        var nextTileY = this.pathToPlayer[this.pathPosition].y;

        this.sprite.body.velocity.x = 0;
        this.sprite.body.velocity.y = 0;

        // properly stuck, increment count for how many cycles stuck
        if (this.lastKnownX === enemyTileX && this.lastKnownY === enemyTileY){
            this.isstuckcount++;
        }
        // go right
        if( nextTileX > enemyTileX && nextTileY === enemyTileY) {
             //If he is stuck and was last headed up, shift upwards
            if (this.lastKnownX === enemyTileX && this.lastKnownDirections[0] === "up" && this.isstuckcount > 2) {
                this.lastKnownX = 0;
                this.lastKnownY = 0;
                this.sprite.body.velocity.y -= this.speed;
                this.isstuckcount = 0; //no longer stuck
            } //If he is stuck and was last headed down, shift downwards
            else if (this.lastKnownX === enemyTileX && this.lastKnownDirections[0] === "down" && this.isstuckcount > 2) {
                this.lastKnownX = 0;
                this.lastKnownY = 0;
                this.sprite.body.velocity.y += this.speed;
                this.isstuckcount = 0; //no longer stuck
            } else {
                this.lastKnownX = enemyTileX;
                this.lastKnownY = enemyTileY;
                this.sprite.body.velocity.x += this.speed;
                this.lastKnownDirections[1] = "right";
                this.lastKnownDirection = "right";
            }
        }

        // go left
        else if( nextTileX < enemyTileX && nextTileY === enemyTileY) {
            //If he is stuck and was last headed up, shift upwards
            if (this.lastKnownX === enemyTileX && this.lastKnownDirections[0] === "up" && this.isstuckcount > 2) {
                this.lastKnownX = 0;
                this.lastKnownY = 0;
                this.sprite.body.velocity.y -= this.speed;
                this.isstuckcount = 0; //no longer stuck
            } //If he is stuck and was last headed down, shift downwards
            else if (this.lastKnownX === enemyTileX && this.lastKnownDirections[0] === "down" && this.isstuckcount > 2) {
                this.lastKnownX = 0;
                this.lastKnownY = 0;
                this.sprite.body.velocity.y += this.speed;
                this.isstuckcount = 0; //no longer stuck
            } else {
                this.lastKnownX = enemyTileX;
                this.lastKnownY = enemyTileY;
                this.sprite.body.velocity.x -= this.speed;
                this.lastKnownDirections[1] = "left";
                this.lastKnownDirection = "left";
            }
        }

    // go up
        else if( nextTileX === enemyTileX && nextTileY < enemyTileY) {
            //If he is stuck and was last headed left, shift left to correct
            if (this.lastKnownY === enemyTileY && this.lastKnownDirections[1] === "left" && this.isstuckcount > 2) {
                this.lastKnownX = 0;
                this.lastKnownY = 0;
                this.sprite.body.velocity.x -= this.speed;
                this.isstuckcount = 0; //no longer stuck
            } //If he is stuck and was last headed right, shift right to correct
            else if (this.lastKnownY === enemyTileY && this.lastKnownDirections[1] === "right" && this.isstuckcount > 2) {
                this.lastKnownX = 0;
                this.lastKnownY = 0;
                this.sprite.body.velocity.x += this.speed;
                this.isstuckcount = 0; //no longer stuck
            } else {
                this.lastKnownX = enemyTileX;
                this.lastKnownY = enemyTileY;
                this.sprite.body.velocity.y -= this.speed;
                this.lastKnownDirections[0] = "up";
                this.lastKnownDirection = "up";
            }
        }

    // go down
        else if( nextTileX === enemyTileX && nextTileY > enemyTileY) {
            //If he is stuck and was last headed left, shift left to correct
            if (this.lastKnownY === enemyTileY && this.lastKnownDirections[1] === "left" && this.isstuckcount > 2) {
                this.lastKnownX = 0;
                this.lastKnownY = 0;
                this.sprite.body.velocity.x -= this.speed;
                this.isstuckcount = 0; //no longer stuck
            } //If he is stuck and was last headed right, shift right to correct
            else if (this.lastKnownY === enemyTileY && this.lastKnownDirections[1] === "right" && this.isstuckcount > 2) {
                this.lastKnownX = 0;
                this.lastKnownY = 0;
                this.sprite.body.velocity.x += this.speed;
                this.isstuckcount = 0; //no longer stuck
            } else {
                this.lastKnownX = enemyTileX;
                this.lastKnownY = enemyTileY;
                this.sprite.body.velocity.y += this.speed;
                this.lastKnownDirections[0] = "down";
                this.lastKnownDirection = "down";
            }
        }
        // go down and left
        else if( nextTileX < enemyTileX && nextTileY > enemyTileY ) {
            this.sprite.body.velocity.x -= this.speed;
            this.sprite.body.velocity.y += this.speed;
            this.lastKnownDirections[0] = "down";
            this.lastKnownDirections[1] = "left";
        }
        // down & right
        else if( nextTileX > enemyTileX && nextTileY > enemyTileY ) {
            this.sprite.body.velocity.x += this.speed;
            this.sprite.body.velocity.y += this.speed;
            this.lastKnownDirections[0] = "down";
            this.lastKnownDirections[1] = "right";
        }
        // go up and left
        else if( nextTileX < enemyTileX && nextTileY < enemyTileY ) {
            this.sprite.body.velocity.x -= this.speed;
            this.sprite.body.velocity.y -= this.speed;
            this.lastKnownDirections[0] = "up";
            this.lastKnownDirections[1] = "left";
        }

        // go up and right
        else if( nextTileX > enemyTileX && nextTileY < enemyTileY ) {
            this.sprite.body.velocity.x += this.speed;
            this.sprite.body.velocity.y -= this.speed;
            this.lastKnownDirections[0] = "up";
            this.lastKnownDirections[1] = "right";
        }
    },

    /**
     * Method used to put a keylogger on a door. Called when the enemy breaks a door
     * @param: door - the door to keylog
     * */
    putKeyLogger: function(door){
        //add property to the door object
        door.hasKeylogger = true;

        // add a function to the door to send the set passwords to the enemy array
        door.keylog = function( password, enemy ){

            enemy.addPasswordToDictionary(password);
        }
    },

    /**
     * Method that returns true if the enemy is going to keylog a door, and false if not
     * */
    willKeylog: function(){

        var infectionChance = Math.random();
        if( infectionChance < this.loggerChance)
            return true;
        return false;
    },

    /**
     * Method that returns true if the enemy is going to keylog a door, and false if not
     * */
    willInfect: function(){

        var infectionChance = Math.random();

        if( infectionChance < this.virusChance)
            return true;
        return false;
    },
    /**
     * Method used to keep track of whether the enemy has gone into a new room or not.
     * If it has, it calls infect and updates the field.
     * */
    hasChangedRoom: function(){

        if(this.currentRoom != this.previousRoom){
            this.previousRoom = this.currentRoom;

            if( this.willInfect() )
                this.infect(currentEnemyRoom);
        }

    },

    infect: function(room){
        room.properties.infected = true;
    },
    /**
     * Method used to add a password to the enemy's dictionary
     * @param: password - the password to store
     * */
    addPasswordToDictionary: function(password){


        if(typeof(password) === "string") {

            // check if it's in the password array or not
            if (this.passwordsDictionary.hasOwnProperty(password)) {
                //add one to its value
                this.passwordsDictionary[password] += 1;
            }
            else
            //otherwise, initialise it to 1
                this.passwordsDictionary[password] = 1;
        }

    },
    /**
     * Method that checks whether the enemy has a password in its dictionary or not
     * @param: password - the password to be checked
     * @returns: true if it contains the password, false otherwise
     * */
    hasPassword: function( password ){

        if( this.passwordsDictionary.hasOwnProperty(password))
            return true;

        return false;
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
Antivirus = function(currentX, currentY, game, score){

    this.currentX = currentX;
    this.currentY = currentY;
    this.game = game;
    this.score = score;

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
                this.score.scoreNeutralise("room");     //update the score in case of success
            }
        this.score.scoreNeutralise("failed");
    }
};

/**
 * This object is meant to be owned and used by the Player. When placing objects of this type on the map, make sure
 * they belong to the same group as the other pickable objects that only the player can pick up.*/

AntiKeyLogger = function(currentX, currentY, game, score){

    this.currentX = currentX;
    this.currentY = currentY;
    this.game = game;
    this.score = score;

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
                this.score.scoreNeutralise("door");
            }
        this.score.scoreNeutralise("failed");
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
Policy = function( currentX, currentY, game, minLength, minUpper, minLower, minNums, minPunctOrSpecChar, colour) {
    // the attributes of the policy object should be the specifications for how passwords should look like
    this.game = game;
    //minimum length of a password
    this.minLength = minLength;
    // maximum length of a password set to a default of 15; should be changed
    this.maxLength = 15;
    // minimum number of upper case letters
    this.minUpper = minUpper;
    // minimum number of lower case letters
    this.minLower = minLower;
    // minimum number of numbers
    this.minNums = minNums;
    // minimum number of punctuation signs
    // minimum number of special characters, i.e. @, #, %, ^, &, *, ~
    this.minPunctOrSpecChar = minPunctOrSpecChar;
    // colour corresponding to the policy
    this.colour = colour;

    if (currentX >= 0 && currentY >= 0) {

        this.policy = game.add.sprite(currentX, currentY, 'policy');
        game.physics.enable(this.policy, Phaser.Physics.ARCADE);
        //made immovable as we don't want it thrown around the map
        this.policy.body.immovable = true;
    }
    // there was no need for methods, as the attributes are set to public)
};

MetricsSystem = function( game, approval ){

    // assume approval given; (approval to store passwords used in game); field to be checked whenever sensitive data might be stored
    this.approval = true;
    this.game = game;
    // check if we've been passed a boolean and assign it to the field just in case it's changed
    if(typeof(approval) == "boolean")
        this.approval = approval;

    /*an associative array to store the in-game passwords
     http://stackoverflow.com/questions/1208222/how-do-i-implement-a-dictionary-or-hashtable-in-javascript
     each entry will be a password once entered; if the password is already in, increment it's associated value
     */
    this.passwords = {};

    /*another associative array to keep track of the passwords that were reset*/
    this.resetPasswords = {};

    /* another associative array to keep track of what passwords were re-used on doors, and on which of them; used to determined best remembered password*/
    this.passwordsUsed = {};

    /* the array of passwords used on more than one door, as set by function getPasswordsMultipleDoors*/
    this.passwordsOnMultipleDoors = [];

    /*an associative array to keep track of the passwords input on doors, but rejected by the checker*/
    this.rejectedPasswords = {};

    /*another associative array to keep track of what objects were used, how many times, and how*/
    this.toolsUsed = {};
    this.toolsUsed["firewall"] = [];            // initialised three fields, where each array holds booleans
    this.toolsUsed["antivirus"] = [];           // one entry in the array will serve as a time when that tools was used
    this.toolsUsed["antikeylogger"] = [];       // it will be true if the operation was successful; false if not

    /*an array to keep track of what notes the player took*/
    this.notesTaken = [];

    //a variable to keep track of the average length of passwords employed
    this.avgPassLen = 0;
    // a variable to keep track of the number unique passwords input used to calculate the average
    this.passNumber = 0;
    this.totalPassLength = 0;

};

MetricsSystem.prototype = {

    /**this only returns the UNIQUE passwords in the array, not the total number of them
    * the array can have only one member, say "123abc," but be used 10 times (i.e. on 10 different doors)
     * TO BE USED ONLY WHEN SETTING A PASSWORD ON A DOOR
    * */
    getPasswordArrayLength: function(){

        // the weird, slightly convoluted way of getting the length of an object's/associative array's length
        return Object.keys(this.passwords).length;
    },

    addPolicyCollected: function(colour){
        storeUserPoliciesCollectedToDB(colour);
    },

    addPassword: function(password, entropy, doorID){
        storePasswordToDB(password, entropy, password.length);
        var score12 = entropy*10;
        console.log(score12 + " Score Bitches " + typeof(score12));
        storeUserPasswordsEnteredToDB(doorID, score12);
        //first check if the parameter is actually a string
        if(typeof(password) === "string") {

            // check if it's in the password array or not
            if (this.passwords.hasOwnProperty(password)) {
            //add one to its value
            this.passwords[password] += 1;
            }
            else
                //otherwise, initialise it to 1
                this.passwords[password] = 1;

            //in any case, a password was used again
            this.passNumber += 1;
            //add its length to the total password length var
            this.totalPassLength += password.length;
        }
    },

    /**
     * Assumption: passNumber & totalPassLength are only incremented when a password is added to a door by calling addPassword
     * */
    updateAverage: function(passwordLength){

        this.avgPassLen = this.totalPassLength / this.passNumber;
    },

    /**
     * Function to be called only when a password is reset on a door; will add the password to be replaced to an array
     * */
    addResetPassword: function(password, doorID, penalty){
        storePasswordResetsToDB(doorID, penalty);
        if( typeof(password) === "string"){
            //we'll use the same rationale as in the normal password array; if a password was reset more than once, take note

            // check if it's in the password array or not
            if (this.resetPasswords.hasOwnProperty(password)) {
                //add one to its value
                this.resetPasswords[password] += 1;
            }
            else
            //otherwise, initialise it to 1
                this.resetPasswords[password] = 1;
        }
    },

    /**
     * Function to be called whenever the player goes through a door using a password he set; doorID is the id of the door he went through
     * This can be used to determine which passwords were used on more than one door
     * */
    addUsedPassword: function(password, doorID){
        storeUsersSuccessfulPasswordUse(doorID);
        if( typeof(password) === "string"){

            // check if it's in the password array or not
            if (this.passwordsUsed.hasOwnProperty(password)) {
                //add the ID of the door it was used on
                this.passwordsUsed[password].push(doorID);
            }
            else
            //otherwise, initialise it's array of doors with the one it was used on
            //NOTE: this does not include the time when the user set the password the first time around
                this.passwordsUsed[password] = [doorID];
        }
    },

    //Log whenever the user goes up to a door - added by BMDK
    addUserDoorVisit: function (doorID){
        storeDoorVisitsToDB(doorID);
    },
    //Log whenever the user collects a tool - added by BMDK
    addToolCollected: function (tid){
        storeUserToolsCollectedToDB(tid);
    },
    //Log whenever the user collects a hint - added by BMDK
    addHintCollected: function (cid){
        storeUserEducationalInfoCollectToDB(cid);
    },
    //log when hints & tips are opened
    addStartInfoRead: function(){
        storeUserStartedReadingTipToDB();
    },
    //log when finished reading
    addEndInfoRead: function(){
        storeUserStoppedReadingTipToDB();
    },
    /**
     * Method to be called when a password input by the user on a door is rejected.
     * @param password: the actual string that was attempted
     * @param doorID: the door on which it was tried
     * @param: reason: the reason why it was rejected, i.e. not matching a password already set, or not matching policy
     * */
    addRejectedPassword: function(password, doorID, reason, entropy){
        storePasswordToDB(password, entropy, password.length);
        if (reason === "rejected"){
            storeBadPasswordToDB(doorID);
        } else if (reason === "inappropriate"){
            storeNonConformingPasswordToDB(doorID);
        }
        if( typeof(password) === "string"){

            if( this.rejectedPasswords.hasOwnProperty(password))
            // add an array representing the id of the door and the reason
                this.rejectedPasswords[password].push([doorID, reason ]);
        }
        else
        // initialise it to hold the first attempt
            this.rejectedPasswords[password] = [doorID, reason];
    },

    /**
     * Method to update the field of notes taken by the player for sending to the database
     * @param: notesArray is the array stored in the notes object owned by the player
     * */
    updateNotesTaken: function( notesArray ){
        this.notesTaken =  notesArray;
    },
    /**
     * Method that returns the most used password in the array of passwords used. Returns the password, if there is one,
     * or null, if not.
     * */
    mostUsedPassword: function(){

        var max = 0;
        var mostUsed;

        for( var password in this.passwordsUsed) {
            if (this.passwordsUsed[password].length > max) {    // here, length represents the number of doorIDs in for password
                                                                // so, the length of the array denotes how many times that password was used
                max = this.passwordsUsed[password].length;
                mostUsed = password;
            }
        }

        // if there was a password in the array (each password key is initialised to 1 when added)
        if( max > 0 )
            return mostUsed;
        else
            return null;
    },

    /**
     * Function used to create an array of the passwords use on more than one door, using the passwordsUsed array
     * the passwordsOnMultipleDoors field of the system will be filled in with all the appropriate passwords
     * TO BE CALLED AT THE END OF THE GAME as a wrap-up function
     * */
    getPasswordsMultipleDoors: function(){

        for( var password in this.passwordsUsed ){

            // associative array used to track the number of unique doors the password was used on
            var doors = {};

            for( var i = 0; i < this.passwordsUsed[password].length; i++ ) {

                var doorID = this.passwordsUsed[password][i].toString();

                //if this doorID is not in the doors array
                if (!doors.hasOwnProperty(doorID)) {
                    // we simply initialise it to 1; no need to keep track how many times it was used on a door; could want it eventually
                    doors[doorID] = 1;
                    }
                }

            //if the length of this array is more than 1, then we know it was used on more than one door
            if( Object.keys(doors).length > 1 )
                //then push the current password onto the array
                this.passwordsOnMultipleDoors.push(password);

        }
    },

    /**
     * Function used whenever the player uses a tool. It adds the outcome (i.e. whether he was successful or not) to the array.
     * Can be used to calculate total number of times a tool was used, percentage of success, either in total, or per tool.
     * Can be used to find out which tool was used, and which not.
     * */
    usedTool: function(tool, successful){

        if( tool instanceof Firewall){
            this.toolsUsed["firewall"].push(successful);
            storeUserToolsUsedToDB(1);
        }
        else if( tool instanceof Antivirus){
            this.toolsUsed["antivirus"].push(successful);
            storeUserToolsUsedToDB(2);
        }
        else if( tool instanceof AntiKeyLogger){
            this.toolsUsed["antikeylogger"].push(successful);
            storeUserToolsUsedToDB(3);
        }
    }
};

ScoreSystem = function(game){

    this.game = game;

    // the variable that is going to keep track of the actual score
    this.score = 0;

    //number of consecutive successful disinfections
    this.disinfections = 0;
};

ScoreSystem.prototype = {

    /**
     * Function used to award points to the player according to the entropy score he received upon setting a password.
     * Assumption: Entropy scores ar ein range 1 - 10
     * The parameter expected is an int
     * TO BE CALLED UPON SUCCESSFULLY SETTING UP A PASSWORD
     * */
    scorePassword: function( entropy ){

        //taking the floor of the entropy as it comes as a float
        if(typeof(entropy) === "number")
            this.score += 10 * entropy;

    },

    /**
     * Function used to award points to the player when he/she successfully disinfects a door/room
     * objectName is a string denoting what the player did; it's either "room," "door," or "failed"
     * "failed" is to be passed to the function when the player uses his tool on an uninfected object
     * TO BE CALLED WHEN THE DISINFECTANT TOOLS ARE USED
     * */
    scoreNeutralise: function (objectName){

        if( objectName === "door"){
            this.score += 20;   // as specified in the score system doc, 20 points are added
            this.disinfections++;
        }
        else if(objectName === "room"){
            this.score += 10;   //as above
            this.disinfections++;
        }
        else if(objectName === "failed"){
            this.disinfections = 0; // set this variable back to 0, to reset the streak
        }
        else{
           //do nothing
        }
        // give a bonus for a streak of successful disinfections
        if( this.disinfections > 1 && objectName !== "failed")
            this.score += this.disinfections * 5; // award a basic bonus according to the number of success
    },

    /**
     * Function used when the player goes through a door he's already set a password on (i.e. when he remembers a password he set before)
     * Based on the entropy of the password: 25% of the initial score awarded for setting the password
     * TO BE USED ONLY WHEN THE PLAYER INPUTS A PASSWORD HE SET PREVIOUSLY
     * */

    //working title
    scorePassingThroughDoorWithoutResetting: function(password, entropy, player){

        var found = false;

        //look through the player's note to see if he has it already stored
        if( player.note.length > 0) {

            for( var i = 0; i < player.note.length && !found; i++ ){
                if( password === player.note.length[i] )
                    found  = true;
            }
        }

        if( !found )
            this.score += 0.25 * ( entropy *10 );
    },

    /**
     * Function that subtracts points from the user for each reset he uses. Initial idea: subtract 50% of initial password score given
     * TO BE CALLED ONLY WHEN A RESET IS ISSUES AND COMPLETED
     * */

    scoreReset: function(entropy){
        this.score -= 0.5 * (entropy *10);
        //returning for the purpose of storing in the database
        return 0.5 * (entropy * 10);
    },

    /**
     * Function that subtracts points from the player when they write down one of the passwords. Decided to only take 10% points/password written
     * Only occurs when the thing written on the note is a string found as a password on the doors
     * @param: entropy is the entropy of the password written down on the note; used to subtract points from the player
     * */
    scorePasswordWriteDown: function(entropy){

        this.score -= 0.1 * (entropy * 10);
    },

    /**
     * Function to award points to the player when he picks up a password policy; only intended as an incentive to make him explore the full breadth of the game
     * TO BE CALLED WHEN PICKING UP A POLICY
     * */
    scorePolicyPickUp: function(){

        this.score += 5;
    },

    /**
     * Function used to award points to the player upon finishing the game.
     * BONUSES:
     *  - time taken to complete game(TODO: find a standard time needed to finish a game)
     * EXTRA NICETIES:
     *  - generate string saying what bonuses are given and for what
     * */
     /**
      * Method used to give the player a bonus for winning the game & the enemy not being in the same room
      * */
     scoreEnemyNotInRoomBonus: function(){

         this.score += 50;
    },
    /**
     * Method used to award player a bonus upon finishing the game according to how far the enemy is from him
     * @param: pathLength - is the length of the path array stored in the enemy object
     * */
    scoreDistanceToPlayerBonus: function( pathLength ){

        //award 10 points per tile distance
        this.score += pathLength * 10;
    },

     scoreGameWon: function(){

        //award 100 points for winning the game
        this.score  += 100;
    }


};

/**
 * Function used to match a string written down on the note against all the passwords the user has set.
 * If the string written down is very similar to a password, the points awarded to the player for that password are deducted
 * Code courtesy of: Andrew Hedges
 * Link: http://andrew.hedges.name/experiments/levenshtein/levenshtein.js
 * http://andrew.hedges.name/experiments/levenshtein/
 * Algorithm: http://en.wikipedia.org/wiki/Levenshtein_distance
 *
 * @param: stringToMatch - the string that needs to be teste
 * @param: targetedMatches - an array of potential matches
 * */

StringMatcher = function(){

};

StringMatcher.prototype = {

    /**
     * A simple matching method that checks whether the note taken is the same as a password set on a door
     * @param: stringToMatch - the note taken
     * @param: targetedMatches - array of passwords on the doors
     * @returns: the true if found, false if not
     * */
    simpleMatch: function(stringToMatch, targetedMatches){

        var i = 0;

        while ( i < targetedMatches.length ){
            if( stringToMatch === targetedMatches[i])
                return true;
        }
        return false;
    },

    match: function(stringToMatch, targetedMatches){

        // preliminary check if the given parameter is an array or not
        if( targetedMatches.constructor === Array && targetedMatches.length !== 0){

            //var resultArray = [];
            var foundMatch = false;
            var i = 0;

            // while we've not found a complete match
            while( !foundMatch ){

                // get the computed matrix for the given strings
                var distArray = this.levenshteinenator(stringToMatch, targetedMatches[i]);
                //get the distance for the current element
                var dist = distArray[ distArray.length - 1 ][ distArray[ distArray.length - 1 ].length - 1 ];

                // if the distance is 0, 1, or 2, then this is a very close match so we return true
                if( dist === 0 || dist === 1 || dist === 2 ){
                    foundMatch = true;
                    return true;
                }

                //resultArray.push(dist);

            }

            // reached this point, return false as we've not found a close enough match
            return false;

        }

    },

    levenshteinenator: function( a, b ){
        var cost;
        var m = a.length;
        var n = b.length;

        // make sure a.length >= b.length to use O(min(n,m)) space, whatever that is
        if (m < n) {
            var c = a;
            a = b;
            b = c;
            var o = m;
            m = n;
            n = o;
        }

        var r = [];
        r[0] = [];
        for (var c = 0; c < n + 1; ++c) {
            r[0][c] = c;
        }

        for (var i = 1; i < m + 1; ++i) {
            r[i] = [];
            r[i][0] = i;
            for (var j = 1; j < n + 1; ++j) {
                cost = a.charAt(i - 1) === b.charAt(j - 1) ? 0 : 1;
                r[i][j] = this.minimator(r[i - 1][j] + 1, r[i][j - 1] + 1, r[i - 1][j - 1] + cost);
            }
        }

        return r;
    },

/**
 * Return the smallest of the three numbers passed in
 * @param Number x
 * @param Number y
 * @param Number z
 * @return Number
 */
    minimator: function(x, y, z) {
        if (x < y && x < z) return x;
        if (y < x && y < z) return y;
        return z;
        }
};

 //Blank Section below by BMDK for DB function setup
//Storage of successful passwords to Passwords table BMDK - DONE
 function storePasswordToDB(pwd, entropy, length) {
    if (pwd === "") {
        return;
    } else {
        if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.open("GET","storepassword.php?p="+pwd+"&ent="+entropy+"&len="+length,true);
        xmlhttp.send();
    }
};

//Storage of bad passwords to UsersBadPwdEntries -forgotten passwords(potentially) - DONE
 function storeBadPasswordToDB(did) {
        if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.open("GET","storebadpassword.php?did="+did,true);
        xmlhttp.send();
};


//Storage of non-conforming password entry to UserFailedPasswordAttempts - DONE
 function storeNonConformingPasswordToDB(did) {
    
        if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.open("GET","storefailedpassword.php?did="+did,true);
        xmlhttp.send();
    
};

//Storage of User Passwords entered -- DONE
 function storeUserPasswordsEnteredToDB(did, score) {
    if (did === ""){
        return;
    } else {
        if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.open("GET","storepasswordsentered.php?did="+did+"&score="+score,true);
        xmlhttp.send();
    }
};

//Storage of User Password Resets -- DONE
 function storePasswordResetsToDB(did, penalty) {
    if (did === "") {
        return;
    } else {
        if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.open("GET","storepasswordresets.php?did="+did+"&penalty="+penalty,true);
        xmlhttp.send();
    }
};

//Store successful password use
function storeUsersSuccessfulPasswordUse(did){
    if (did === "") {
        return;
    } else {
        if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.open("GET","storesuccpwduse.php?did="+did,true);
        xmlhttp.send();
    }
};
//Storage of User door visits -- DONE
 function storeDoorVisitsToDB(did) {
    if (did === "") {
        return;
    } else {
        if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.open("GET","storedoorvisits.php?did="+did,true);
        xmlhttp.send();
    }
};

//Storage of User hints collected -- DONE
 function storeUserEducationalInfoCollectToDB(cid) {
    if (cid === "") {
        return;
    } else {
        if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.open("GET","storeuseredinfo.php?cid="+cid,true);
        xmlhttp.send();
    }
};

//Storage of User Policies collected -- DONE
 function storeUserPoliciesCollectedToDB(colour) {
    if (colour === "") {
        return;
    } else {
        if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.open("GET","storeuserpoliciescollected.php?colour="+colour,true);
        xmlhttp.send();
    }
};

//Storage of User Tools collected --DONE
 function storeUserToolsCollectedToDB(tid) {
    if (tid === "") {
        return;
    } else {
        if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.open("GET","storeusertoolscollected.php?tid="+tid,true);
        xmlhttp.send();
    }
};

//Storage of User Tools Used -- Will implement once there are actually tools that you can use -TODO
 function storeUserToolsUsedToDB(tid) {
    if (tid === "") {
        return;
    } else {
        if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.open("GET","storeusertoolsused.php?tid="+tid,true);
        xmlhttp.send();
    }
};

//Storage of when hints and tips are re-read
function storeUserStartedReadingTipToDB(){
    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.open("GET","storeuseredreads.php?",true);
    xmlhttp.send();
};

//Storage of when hints & tips are closed
function storeUserStoppedReadingTipToDB(){
    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.open("GET","storeuseredreadsupdate.php?",true);
    xmlhttp.send();
};