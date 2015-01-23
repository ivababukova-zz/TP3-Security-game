/**
 * Created by andi on 21/01/15.
 */



    //the game variable initiliasation
    // new Game(width, height, renderer, parent, state, transparent, antialias, physicsConfig) - from documentation
    // link to game documentation: http://docs.phaser.io/Phaser.Game.html
    var game = new Phaser.Game(800, 600, Phaser.AUTO, 'Encrypt', {
        preload: preload,
        create: create,
        update: update
    });

    //preload function that loads up all the assets prior to the game starting
    function preload() {

        //load the tilemap first
        game.load.tilemap('level1', 'assets/tilemaps/finalMap.json', null, Phaser.Tilemap.TILED_JSON);
        //then load the tile set for the map
        game.load.image('TileSet1Encrypt', 'assets/EncryptTileSets/TileSet1Encrypt.png');

        game.load.image('clue', 'assets/images/GameIcons/Clue.png');
        game.load.image('antikeylogger', 'assets/images/GameIcons/AntiKeyLogger.png');
        game.load.image('antivirus', 'assets/images/GameIcons/AntiVirus.png');
        game.load.image('policy', 'assets/images/GameIcons/PasswordPolicySheet.png');
        game.load.image('passNote', 'assets/images/GameIcons/PasswordNote.png');
        game.load.image('firewall', 'assets/images/GameIcons/Firewall.png');
        game.load.image('player', 'assets/images/Player1.png');
    }

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

        this.player = game.add.sprite(currentX, currentY, 'player');
        game.physics.enable(this.player, Phaser.Physics.ARCADE);
        game.camera.follow(this.player);
        this.player.body.immovable = false;
        this.player.body.collideWorldBounds = true;
        this.player.body.bounce.setTo(1, 1);
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

/*
* Game State area
* */

var player;
var enemies;
var friend;
var doors;
var rooms;
var antikeyloggers;
var antiviruses;
var policies;
var firewalls;
var currentRoom = 0;

// graphics components
var map;
var backgroundLayer;
var blockedLayer;
var ceilingLayer;

var hook;

//what are these used for?
var TILESIZE = 64;
var currentDoor = null;
var fPause = false;


/*
*======================================================================================================================
* Create function area
* */

function create() {
    /*
    // create the map
    game.stage.backgroundColor = '#787878';
    // add the tilemap to the map variable
    map  = game.add.tilemap('level1');

    //the first parameter is the tileset name as specified in Tiled, the second is the key to the asset
    //TODO: make clear the distinction between these two parameters
    //map.addTilesetImage('TileSet1Encrypt', 'TileSet1Encrypt');

    //  Create the layers from the World1 layer in the map data.
    //  A Layer is effectively like a Phaser.Sprite, so is added to the display list.

    //backgroundLayer = this.map.createLayer('backgroundLayer');
    //blockedLayer = this.map.createLayer('blockedLayer');
    //ceilingLayer = this.map.createLayer('ceilingLayer');
   /
    //Sets collision on a range of tiles where the tile IDs increment sequentially; here 1 - 100000
    map.setCollisionBetween(1, 100000, true, 'blockedLayer');

    //resizes the game world to match the layer dimensions
    this.backgroundlayer.resizeWorld();
    */
    //_______________________________________________________________________________________________

    this.graphs = [];
    // when the player touches the door, this.flagEnter is true, otherwise false.
    this.flagEnter = false;
    this.flagSearch = false;
    hook = this;

    this.map = this.game.add.tilemap('level1');

    //the first parameter is the tileset name as specified in Tiled, the second is the key to the asset
    this.map.addTilesetImage('TileSet1Encrypt', 'TileSet1Encrypt');

    //create layer
    ///this.borderLayer = this.map.createLayer('borderLayer');
    this.backgroundlayer = this.map.createLayer('backgroundLayer');
    this.blockedLayer = this.map.createLayer('blockedLayer');
    this.ceilingLayer = this.map.createLayer('ceilingLayer');


    //collision on blockedLayer
    this.map.setCollisionBetween(1, 100000, true, 'blockedLayer');
    ///this.map.setCollisionBetween(1, 100000, true, 'borderLayer');
    // this.map.overlap(this.player, this.ceilingLayer);

    //resizes the game world to match the layer dimensions
    this.backgroundlayer.resizeWorld();

    //_______________________________________________________________________________________________
    // create the objects to be set on the map
    player = new Player( 500, 500, game );
    // enemies should be a group - will be more than one object in final game
    enemies = new Enemy(100, 100, game, player);
    // friend object
    friend = new Friend( 300, 300, game, player);
    // door group - collision with this group should be implemented separately

    // rooms group

    // antivirus group
    antiviruses = game.add.group();
    //adding the sprites to the group; should be the objects
    for( var i = 0; i < 5; i++){
        antiviruses.create(game.world.randomX, game.world.randomY, 'antivirus');
    }

    // antikeylooger group
    antikeyloggers = game.add.group();
    //adding the sprites to the group; should be the objects
    for( var i = 0; i < 5; i++){
        antikeyloggers.create(game.world.randomX, game.world.randomY, 'antikeylogger');
    }

    // firewall groups
    firewalls = game.add.group();
    //adding the sprites to the group; should be the objects
    for( var i = 0; i < 5; i++){
        firewalls.create(game.world.randomX, game.world.randomY, 'antikeylogger');
    }

    //policies group
    policies = game.add.group();
    //adding the sprites to the group; should be the objects
    for( var i = 0; i < 5; i++){
       policies.create(game.world.randomX, game.world.randomY, 'antikeylogger');
    }

    // CREATE ITEMS
    createItems();
    //CREATE CEILINGS
    createCeilings();
    //CREATE DOORS
    createDoors();
    //LOAD ROOMS
    loadRooms();
}


/*
======================================================================================================================
AUXILIARY FUNCTIONS AEA
 * */

//function that creates the items
function createItems(){
    //create items
    this.items = this.game.add.group();
    this.items.enableBody = true;

    var item;
    var result = this.findObjectsByType('item', this.map, 'objectsLayer');

    result.forEach(function (element) {
        this.createFromTiledObject(element, this.items);
    }, this);
}
//function that creates the ceilings in the game - Author - PLEASE COMMENT YOUR CODE
function createCeilings(){

    this.ceilings = this.game.add.group();
    this.ceilings.enableBody = true;

    var ceiling;    // can ceiling be placed outside the function?
    var result = this.findObjectsByType('ceiling', this.map, 'Ceiling');

    result.forEach(function (element) {
        this.createFromTiledObject(element, this.ceilings);
    }, this);
}
//function that creates the doors - Author - PLEASE COMMENT THIS CODE
function createDoors(){
    //create doors
    doors = this.game.add.group();  // modified the variable to refer to the global variable 'rooms'
    doors.enableBody = true;
    doortexture = this.doors.texture;
    var result = this.findObjectsByType('door', this.map, 'objectsLayer');

    result.forEach(function (element) {
        this.createFromTiledObject(element, doors);
    }, this);
}
//function that loads up the rooms - Author - PLEASE COMMENT CODE
function loadRooms(){
    rooms = this.findObjectsByType('room', this.map, 'RoomLayer');
    this.getCurrentRoom();
}
// function that gets the current room - Author - PLEASE COMMENT AND EXPLAIN CODE
function getCurrentRoom(){
    currentRoom = 0;
    rooms.forEach(function(element){

        var x = parseInt(element.properties.vx) * TILESIZE;
        var y = parseInt(element.properties.vy) * TILESIZE;
        var w = (parseInt(element.properties.vw)) * TILESIZE;
        var h = (parseInt(element.properties.vh)) * TILESIZE;

        // if player is in the room, then memorise its id
        var rect1 = new PIXI.Rectangle(x,y,w,h);
        if (rect1.contains( this.player.position.x, this.player.position.y ) ||
            rect1.contains( this.player.position.x, this.player.position.y+16 ) ||
            rect1.contains( this.player.position.x+10, this.player.position.y+16 ) ||
            rect1.contains( this.player.position.x+10, this.player.position.y )
        ) {
            currentRoom = element.properties.idx;
            console.log("roomPos : " + currentRoom.toString());
        }

        // changing room's state to visited
        if (currentRoom == element.properties.idx) {
            if (element.properties.state == "1") {
                element.properties.state = "0";
            }
        }
        this.drawRoom(element);

    }, this);
}
// function that draws room - Author - PLEASE COMMENT AND EXPLAIN CODE
function drawRoom(room){

    var x1 = parseInt(room.properties.vx) * TILESIZE;
    var y1 = parseInt(room.properties.vy) * TILESIZE;
    var w1 = (parseInt(room.properties.vw)) * TILESIZE;
    var h1 = (parseInt(room.properties.vh)) * TILESIZE;

    var state1 = parseInt(room.properties.state);

    var graphics;
    var str = room.properties.idx.toString()+"+"+room.properties.vx.toString()+"+"+room.properties.vy.toString();

    if (this.graphs[str] != undefined && this.graphs[str] != null) {
        graphics = this.graphs[str];
        graphics.destroy();
    }
    graphics = this.game.add.graphics(0, 0);
    this.graphs[str] = graphics;

    var color = 0xCCCCCC;
    var alpha = 0.6;

    if (state1 == 0) { // visited

        // if player is not in the room
        if (currentRoom != room.properties.idx) {
            alpha = 0.6;
        } else {
            return;
        }

    } else if (state1 == 1) { // not visited
        color = 0x444444;
        alpha = 1;
    } else if (state1 == 2) { // infected
        color = 0xFFFFFF;
        alpha = 1;
    }

    graphics.beginFill(color, alpha);
    graphics.drawRect(x1, y1, w1, h1);
    graphics.endFill();
}
//find objects in a Tiled layer that contain a property called "type" equal to a certain value
function findObjectsByType(type, map, layer){

    var result = [];
    map.objects[layer].forEach(function (element) {
        if (element.properties.type === type) {
            //Phaser uses top left, Tiled bottom left so we have to adjust
            //also keep in mind that the cup images are a bit smaller than the tile which is 16x16
            //so they might not be placed in the exact position as in Tiled
            element.y -= this.map.tileHeight;
            result.push(element);
        }
    });
    return result;
}
//create a sprite from an object
function createFromTiledObject(element, group) {
    var sprite = group.create(element.x, element.y, element.properties.sprite);

    //copy all properties to the sprite
    Object.keys(element.properties).forEach(function (key) {
        sprite[key] = element.properties[key];
    });
}
// function that changes the door tile with the the player sprite, i.e. simulates opened door
function openDoor(object1, object2) {
    //object2.visible = false;
    object2.texture = this.player.texture;
    this.showNextFrame = this.showNextFrame || [];
    //object2.
    if (this.showNextFrame.indexOf(object2) === -1) {
        this.showNextFrame = this.showNextFrame.concat([object2]);
    }
}
// function to open a new window in the middle of the screen
// used for the doors interface
function popup(url, title, w, h) {
    var left = (screen.width / 2) - (w / 2);
    var top = (screen.height / 2) - (h / 2);
    return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
}

//AUTHOR please comment and explain code - are these functions used? Where? Why? Not an essay, but enough to understand
function collect(player, collectable) {
    console.log('yummy!');
    //remove sprite
    collectable.destroy();
}

function setPlayerInvisible() {
    this.player.renderable = false;
}

function setDoorInvisible() {
    this.doors.renderable = false;
}

function enterDoor(player, door) {
    var self = this;
    if(this.flagEnter == false){
        fPause = true;
        if (door.password == 'null') {
            document.getElementById("titlePwd").innerHTML = "Setup password";
        } else {
            document.getElementById("titlePwd").innerHTML = "Input password";
        }
        currentDoor = door;
        document.getElementById("inputpwd").style.display = "block";

        this.flagEnter = true;
        self.setDoorInvisible();
    }
}


/*
 *======================================================================================================================
 * Update function area
 * */

function update() {


    //collision
    if (fPause == true) {
        this.player.body.velocity.y = 0;
        this.player.body.velocity.x = 0;
        return;
    }

    this.game.physics.arcade.collide(this.player, this.blockedLayer);   // set up collision with the walls
    this.game.physics.arcade.collide(this.player, this.borderLayer);
    this.game.physics.arcade.overlap(this.player, this.items, this.collect, null, this);
    var isUnderCeiling = this.game.physics.arcade.overlap(this.player, this.ceilings, this.setPlayerInvisible, null, this); // this is true or false


    // if the player has gone through a door, restore the original door sprite:
    /* do not delete this code:
     if (!doorOverlap && this.showNextFrame !== undefined){
     // var self = this;
     var texture = this.doors.getAt(16).texture;
     this.showNextFrame.forEach(function(door){door.texture = texture;});
     this.showNextFrame = [];
     }
     */

    // make the player re-apear again after he has passed under the ceiling:
    if (!isUnderCeiling) {
        this.player.renderable = true;
    }

    //this.game.physics.arcade.overlap(this.player, this.doors, this.setDoorInvisible(), null, this);
    this.flagEnter = this.game.physics.arcade.overlap(this.player, this.doors, this.enterDoor, null, this);

    // when come out the door, check the room.
    if (this.flagEnter)
        this.flagSearch = true;
    else
    {
        if (this.flagSearch == true) {
            this.flagSearch = false;
            this.getCurrentRoom();
        }
    }

    //console.log("door left, right:", this.doors.getAt(1).body.position.x, this.doors.getAt(1).body.right, "door top, down:", this.doors.getAt(1).body.position.y, this.doors.getAt(1).body.down);

    //this.game.physics.arcade.overlap(this.player, this.doors, this.enterDoor, null, this);
    var speed = 260;  // set up the speed of the player
    //player movement
    this.player.body.velocity.y = 0;
    this.player.body.velocity.x = 0;

    if (this.cursors.up.isDown) {
        this.player.body.velocity.y -= speed;
    }
    else if (this.cursors.down.isDown) {
        this.player.body.velocity.y += speed;
    }
    if (this.cursors.left.isDown) {
        this.player.body.velocity.x -= speed;
    }
    else if (this.cursors.right.isDown) {
        this.player.body.velocity.x += speed;
    }
    console.log('in update function, Game.js');
}




// IS THIS CODE USED ANYMORE?

/*
 enterDoor: function (player, door) {
 console.log("***" + door.password + "***");

 if (door.password === null) {  // if the user hasn't set up a password yet:
 input = prompt("Set a password for this policy:");

 if (input === null) {  // if the user has pressed cancel:
 console.log("no password entered.");
 }

 else {
 door.password = input;
 console.log(door.password);
 // TODO change with unlock method instead of destroy
 }
 }

 else if (door.password !== null) {  // if the user has set up a password already:
 console.log("password is not null:" + door.password);
 var checkPassword = prompt("Enter your password, please:");
 if (checkPassword === door.password) {
 console.log("Access granted.");
 }
 else {
 console.log("Wrong password, try again:");
 this.lockDoor(door);
 return 0;
 }
 }
 }
 */
