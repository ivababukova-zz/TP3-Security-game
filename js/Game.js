var Encrypt = Encrypt || {};

//title screen
Encrypt.Game = function(){};

var hook;

var currentRoom = 0;
var currentDoor = null;
var text = null;
var fPause = false;
var lastKnownPlayerDirection = ['',0]; /*BMDK: for the purpose of tracking what animation frame to end on and lastKnownPlayerDirection*/
var doorPass = ''; /*BMDK: for the purpose of being able to eventually close a door via animation*/
var doorJustOpened = false;

Encrypt.Game.prototype = {
  create: function () {

    // array to hold rooms' graphics
    this.roomGraphs = [];
    // when the player touches the door, this.flagEnter is true, otherwise false.
    this.flagEnter = false;
    // flagSearch is used to update the currentRoom only when flagEnter goes from true to false.
    this.flagSearch = false;
    hook = this;

    //creating the auxiliary systems
    this.score = new ScoreSystem(this.game);
    this.metrics = new MetricsSystem(this.game, true);

    this.map = this.game.add.tilemap('level1');

    //the first parameter is the tileset name as specified in Tiled, the second is the key to the asset
    this.map.addTilesetImage('32x32TileSet1Encrypt', '32x32TileSet1Encrypt');

    //create layer
    this.backgroundlayer = this.map.createLayer('backgroundLayer');
    this.createDoors(); //BMDK, moved here as was rendering over the player ... might want to set invisible after door opens instead
    this.createPlayer();
    this.createEnemy(); // Andi: create the enemy

    this.blockedLayer = this.map.createLayer('blockedLayer');
    this.map.setCollisionBetween(1, 100000, true, 'blockedLayer'); //collision on blockedLayer
    

    this.overPlayerLayer = this.map.createLayer('overPlayerLayer');



    //resizes the game world to match the layer dimensions
    this.backgroundlayer.resizeWorld();

    this.createItems();
    this.loadRooms();
    this.createInput();

    // create the score label
    this.scoreLabel = this.game.add.text(0, 0, "Score:" + this.score.score, { font: "32px Arial", fill: "#ffffff", align: "center"});
    this.scoreLabel.fixedToCamera = true;
    this.scoreLabel.cameraOffset.setTo(25,25);

    //add the W key to the keyboard to serve as a 'write' option for the player
    this.writeKey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
    //ESC key is used for closing pop ups
    this.escapeKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);

  },

  update: function () {
    var self = this;
    //collision
    if (fPause === true) {
      self.enemy.sprite.body.velocity.y = 0;/* Andi: stopping the enemy first */
      self.enemy.sprite.body.velocity.x = 0;

      self.player.sprite.animations.stop(); /* BMDK: This will stop the animations running whilst game is paused*/
      this.player.sprite.body.velocity.y = 0;
      this.player.sprite.body.velocity.x = 0;
      return;
    }

    this.game.physics.arcade.collide(this.player.sprite, this.blockedLayer);   // set up collision with this layer
    this.game.physics.arcade.collide(this.enemy.sprite, this.blockedLayer);   // Andi: set up enemy's collision with blocked layer

    var hintsOverlapped = this.game.physics.arcade.overlap(this.player.sprite, this.items, this.pickupItem, null, this);

    this.flagEnter = this.game.physics.arcade.overlap(this.player.sprite, this.doors, this.enterDoor, null, this);
    // when come out the door, check the room.
    if (this.flagEnter) {
      this.flagSearch = true;
      door = currentDoor;
      console.log('in front of a door');
      /*BMDK:- update doorPass to track last door action*/
      doorPass = 'in front of a door';
    }
    else
    {
      if (this.flagSearch === true) {
        this.flagSearch = false;
        this.loadRooms();
      }
      if (this.flagEnter === false) {
        /*BMDK:- if player was in front of an open door but goes away from it: close the door*/
        if (doorPass === 'in front of a door' && doorJustOpened){
          this.changeDoorState(door, 'closing');
          doorJustOpened = !doorJustOpened; // BMDK: set false as door is no longer open
        }
        console.log('went away from the door');
        /*BMDK:- update doorPass to track last door action*/
        doorPass = 'went away from the door';
      }
    }
    //console.log("door left, right:", this.doors.getAt(1).body.position.x, this.doors.getAt(1).body.right, "door top, down:", this.doors.getAt(1).body.position.y, this.doors.getAt(1).body.down);

    this.game.physics.arcade.overlap(this.player.sprite, this.doors, this.enterDoor, null, this);
    var speed = 260;  // setting up the speed of the player

    this.moveCharacter(this.player.sprite, speed);
    /*BMDK: - Moved bringToTop here to allow the score to appear on top at all times*/
    this.game.world.bringToTop(this.scoreLabel);


  },
  //create player
  createPlayer: function () {
    this.player = new Player(300,500, this.game);

    this.player.sprite.animations.add('down', [0,1,2,3,4,5,6,7,8,9,10,11], 12, true, true);
    this.player.sprite.animations.add('left',  [12,13,14,15,16,17,18,19,20,21,22,23], 12, true, true);
    this.player.sprite.animations.add('right', [24,25,26,27,28,29,30,31,32,33,34,35], 12, true, true);
    this.player.sprite.animations.add('up',    [36,37,38,39,40,41,42,43,44,45,46,47], 12, true, true);
    //this.player.animations.add('static', [0], 1, true, true);

    // made player centered, which fixes room highlighting problems. A.M.
    this.player.sprite.anchor.setTo(0.5, 0.5);

    //move player with cursor keys
    this.cursors = this.game.input.keyboard.createCursorKeys();
  },

  //create an enemy
  createEnemy: function() {

    this.enemy = new Enemy(100, 300, this.game, this.player);
  },

  // create items
  createItems: function () {
    //create items
    this.items = this.game.add.group();
    this.items.enableBody = true;

    // CLUES
    var clue;
    var result = this.findObjectsByType('clue', this.map, 'objectsLayer');

    result.forEach(function (element) {
      this.createFromTiledObject(element, this.items);
    }, this);

    // POLICIES
    var policy;
    result = this.findObjectsByType('policy', this.map, 'objectsLayer');

    result.forEach(function (element) {
      this.createFromTiledObject(element, this.items);
    }, this);

    // ANTIKEYLOGGERS
    var antikeylogger;
    result = this.findObjectsByType('AntiKeyLog', this.map, 'objectsLayer');
    result.forEach(function (element) {
      this.createFromTiledObject(element, this.items);
    }, this);

    // INFO
    var info;
    result = this.findObjectsByType('info', this.map, 'objectsLayer');
    result.forEach(function (element) {
      this.createFromTiledObject(element, this.items);
    }, this);

    // FIREWALL
    var firewall;
    result = this.findObjectsByType('firewall', this.map, 'objectsLayer');
    result.forEach(function (element) {
      this.createFromTiledObject(element, this.items);
    }, this);

    // ANTIVIRUS
    var antivirus;
    result = this.findObjectsByType('antivirus', this.map, 'objectsLayer');
    result.forEach(function (element) {
      this.createFromTiledObject(element, this.items);
    }, this);
  },

  // this function creates only front doors:
  createDoors: function () {
    //create doors
    this.doors = this.game.add.group();
    this.doors.enableBody = true;


    var result = this.findObjectsByType('frontDoor', this.map, 'objectsLayer');
    var result2 = this.findObjectsByType('sideDoor', this.map, 'objectsLayer');
    var doorID = 0; // used to assign unique id for each door created


    // create the front door objects:
    result.forEach(function (element) {
      this.createDoorFromTiledObject(element, this.doors, doorID, 'frontDoor');
      doorID++;
    }, this);


    // create the side door objects:
    result2.forEach(function (element) {
      this.createDoorFromTiledObject(element, this.doors, doorID, 'sideDoor');
      doorID++;
    }, this);
  },

/********************* POLICY METHODS ************************

  /** When found add the new policy
   * @param {object} policy
   */
  addPolicy: function(policy){
    this.player.addPolicy(policy);
    policy.destroy();
  },
  /** Take the color of a policy ang give back its rules
   * @param {string} the color of a policy
   * @return {string} rules policy contains
   */
  retrievePolicyRules: function(colour){
    var policy = this.player.policies[colour];
    var str = "MIN LENGTH: " + policy.minLength + "<br>MIN #NUMBERS: " + policy.minNums
        + "<br>MIN #PUNCTUATION SIGNS:" + policy.minPunct + "<br>MIN #SPECIAL CHARACTERS: " + policy.minSpeChar;
    return str;
  },/**
**********************************************************************/
/*****************METHODS TO MANAGE ROOM OBJECTS**********************
  /** Preload all room objects */
  loadRooms: function() {
    // Get all room objects
    this.rooms = this.findObjectsByType('room', this.map, 'RoomLayer');
    // find in which room(if any) the player is located
    this.getCurrentRoom();
    // draw rooms
    this.drawRooms();
  },
  /** Update the global variable currentRoom to store the current room's ID */
  getCurrentRoom: function () {
    // Initialisation
    currentRoom = 0;
    // Checking each room
    this.rooms.forEach(function(element){
      // Getting room's dimensions and coordinates
      var x = parseInt(element.x);
      var y = parseInt(element.y+this.map.tileHeight);
      var w = parseInt(element.width);
      var h = parseInt(element.height);
      var rect = new PIXI.Rectangle(x,y,w,h);

      // check if a player is in a room. If yes,
      // then memorise its ID and finish searching
      if (rect.contains(this.player.sprite.x, this.player.sprite.y)){
        currentRoom = parseInt(element.properties.idx);
        return;
      }
    }, this);
  },
  /** Draws the rooms */
  drawRooms: function() {
    var graphics; // used to store room's graph
    // one room at a time
    this.rooms.forEach(function(element){
      // get dimensions and coordinates
      var x = parseInt(element.x);
      var y = parseInt(element.y+this.map.tileHeight);
      var w = parseInt(element.width);
      var h = parseInt(element.height);
      // get the state of the room
      var state = parseInt(element.properties.state);
      // generating unique room's ID. Beneficial in cases when room is not a rectangle and therefore built from multiple blocks.
      var str = element.properties.idx.toString()+"+"+x.toString()+"+"+y.toString();
      // if already drawn, then destroy the graph(start from scratch)
      if (this.roomGraphs[str] != undefined && this.roomGraphs[str] != null) {
        graphics = this.roomGraphs[str];
        graphics.destroy();
      }

      // new room's graph
      graphics = this.game.add.graphics(0, 0);
      this.roomGraphs[str] = graphics;
      // in order to fix a bug as the room's height kept on shrinking by 32px
      element.y += 32;

      var color = 0xCCCCCC;
      var opacity;
      if (currentRoom === parseInt(element.properties.idx)) { // player in the room
        element.properties.state = "0"; // Change to visited
        if(element.properties.infected){ // Infected
          color = 0x16E91D;
          opacity = 0.5;
        }else{
          return;
        }
      } else if(state === 0){  // visited
        if(element.properties.infected){ // Infected
          color = 0x16E91D;
          opacity = 0.5;
        }else{
          opacity = 0.6;
        }
      }else if (state ===  1) { // not visited
        color = 0x444444;
        opacity = 1;
      }

      graphics.beginFill(color, opacity);
      graphics.drawRect(x, y, w, h);
      graphics.endFill();
    }, this);
  },/**
   ************************************************************
  ********************ALL ABOUT THE INPUT**********************/
  createInput: function () {
    var self = this;
    var input = new CanvasInput({
      canvas: document.getElementById('pwdCanvas'),
      fontSize: 18,
      fontFamily: 'Arial',
      fontColor: '#212121',
      width: 340,
      padding: 8,
      borderWidth: 1,
      borderColor: '#000',
      borderRadius: 3,
      boxShadow: '1px 1px 0px #fff',
      innerShadow: '0px 0px 5px rgba(0,0,0,0.5)',
      placeHolder: 'password',
      onsubmit: function () {
        // Password note is open
        if(document.getElementById("titlePwd").innerHTML === "Go on, I dare you!"){
          // write it to the note
          self.player.note.write(this._value);
          document.getElementById("inputPwd").style.display = "none";
          this._hiddenInput.value = '';
          return;
        }
        // when the user input password and enter 'Enter' key
        if(!this.approved){
          return;
        }
        if (currentDoor.password === 'null') {
          document.getElementById("inputPwd").style.display = "none";
          document.getElementById("policyField").style.display= "none";
          document.getElementById("feedbackField").style.display = "none";
          document.getElementById("mainLayer").style.display= "none";
          self.changeDoorState(currentDoor,'opening');
          doorJustOpened = true; //BMDK: track that door opened
          currentDoor.password = this._value;
          this._hiddenInput.value = '';
          fPause = false;
        } else { // if password was already set, then compare.

          if (currentDoor.password === this._value) {
            document.getElementById("inputPwd").style.display = "none";
            document.getElementById("policyField").style.display= "none";
            document.getElementById("feedbackField").style.display = "none";
            document.getElementById("mainLayer").style.display= "none";
            fPause = false;
            /*BMDK: call to function to open door when password is successful*/
            self.changeDoorState(currentDoor,'opening'); 
            doorJustOpened = true; //BMDK: track that door opened
          } else {
            document.getElementById("titlePwd").innerHTML = "Incorrect. Input again!";
          }
          this._hiddenInput.value = '';
        }
      },
      // Feedback generated within each key-press
      onkeyup: function() {
        // if ESC button is pressed, then hide all elements
        if(self.escapeKey.justDown){
          document.getElementById("inputPwd").style.display = "none";
          document.getElementById("noPolicyField").style.display= "none";
          document.getElementById("policyField").style.display= "none";
          document.getElementById("feedbackField").style.display = "none";
          document.getElementById("mainLayer").style.display = "none";
          this._hiddenInput.value = '';
          fPause = false;
        }// if W key is pressed, then open note pop up
        if(self.writeKey.justDown){
          self.game.input.keyboard.enabled = false;
          document.getElementById("inputPwd").style.display = "block";
          document.getElementById("titlePwd").innerHTML = "Go on, I dare you!";
          console.log("test");
        }
        // first check if main layer is open and then check if it's not a noPolicy pop up
        if (document.getElementById("mainLayer").style.display === "block" && document.getElementById("inputPwd").style.display === "block") {
          console.log(self.getEntropy(this._hiddenInput.value)[0]);//BMDK testing
          var policy = self.player.policies[currentDoor.policy];
          var feedback = "";
          this.approved = false;
          // CHECK LENGTH
          if (this._hiddenInput.value.length > 0 && this._hiddenInput.value.length < policy.minLength) {
            feedback = "Too short";
            // CHECK NUMERICALS
          } else if (this._hiddenInput.value.length > 0 && this._hiddenInput.value.replace(/\D/g, '').length < policy.minNums) {
            feedback = "Need more numbers.";
            // CHECK PUNCTUATION
          } else if (this._hiddenInput.value.length > 0 && this._hiddenInput.value.replace(/[^\.,-\/!?\^&\*;:{}\-_`'"~()]/g,'').length < policy.minPunct) {
            feedback = "Need more punctuation signs.";
            // CHECK SPECIAL CHARACTERS
          } else if (this._hiddenInput.value.length > 0 && this._hiddenInput.value.replace(/[^\%$#&@=]/g,'').length < policy.minSpeChar) {
            feedback = "Need more special characters.";
          } else if(this._hiddenInput.value.length > 0){ // If policy requirements are met, approve
            this.approved = true;
            feedback = "Policy requirements met.";
          }

          if (this.approved) {
            document.getElementById("feedback").style.color = "green";
          } else {
            document.getElementById("feedback").style.color = "red";
          }
          document.getElementById("feedback").innerHTML = feedback;
          document.getElementById("feedbackField").style.display = "block";
        }
      }
    });
    input.focus();
    return input;
  },
  /* BMDK: - Function for calculation of password entropy*/
getEntropy: function (pwdFeed) {
  /* ints to represent how many characters are in each set
  *  Note: not consistent with password policies that split into special & punctuation characters
  */
  var pwd = String(pwdFeed);
  var numbersNumOf = 10;
  var lowersNumOf = 26;
  var uppersNumOf = 26;
  var nonAlphaNumericsNumOf = 34; 

  /* the range of characters used */
  var range = 0;
  /* the length of the password */
  var pwdLength = pwd.length;
  /* possible feedback for the user */
  var possibleEntropyResults = ['weak', 'moderate','strong', 'very strong'];


  /* increase range if numbers are present*/
  if (pwd.replace(/[0-9]+/g, "").length < pwdLength) {
    range += numbersNumOf;
  }
  /* increase range if lower case chars are present*/
  if (pwd.replace(/[a-z]+/g, "").length < pwdLength) {
    range += lowersNumOf;
  }
  /* increase range if upper case chars are present*/
  if (pwd.replace(/[A-Z]+/g, "").length < pwdLength) {
    range += uppersNumOf;
  }
  /* increase range if non-alphanumeric chars are present*/
  if (pwd.replace(/\W+/g, "").length < pwdLength) {
    range += nonAlphaNumericsNumOf;
  }

  /*bit strength calculated by log2(rangeOfChars)*lengthOfPassword*/
  var tempLogVal = Math.log(range) / Math.log(2);
  /*Array to hold entropy @ index 0 and user feedback at index 1 */
  var entropy = [(pwdLength*tempLogVal), ''] ;
  /* Stop from returning NaN value*/
  if (entropy[0] > 0) {
    return entropy;
  }
  return [0,possibleEntropyResults[0]];
},
  /****************HELPER METHODS TO CREATE*******************
   * find objects in a Tiled layer that contain a property called "type" equal to a certain value
   * @param type
   * @param map
   * @param layer
   * @returns {Array}
   */
  findObjectsByType: function (type, map, layer) {
    var result = [];
    map.objects[layer].forEach(function (element) {
      if (element.properties.type === type) {
        //Phaser uses top left, Tiled bottom left so we have to adjust
        //also keep in mind that the cup images are a bit smaller than the tile which is 16x16
        //so they might not be placed in the exact position as in Tiled
        element.y -= map.tileHeight;
        result.push(element);
      }
    });
    return result;
  },
  /** Create a sprite from an object
   * @param element
   * @param group
   * @param ID
   */
  createFromTiledObject: function (element, group, ID) {
    var sprite = group.create(element.x, element.y, element.properties.sprite);
    element.id = ID;
    //copy all properties to the sprite
    Object.keys(element.properties).forEach(function (key) {
      sprite[key] = element.properties[key];
    });
  },
  /** Create front or side door and load the animations for it
   * @param element
   * @param group
   * @param doorID
   * @param spritesheet
   */
  createDoorFromTiledObject: function (element, group, doorID, spritesheet) {
    //frontDoorSprite = this.game.add.sprite(element.x, element.y, 'frontDoor');
    var sprite = group.create(element.x, element.y, spritesheet);

    // these animation options are valid for both types of doors
    sprite.animations.add('opening', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16], 17, false, true);
    sprite.animations.add('closing', [16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0], 17, false, true);
    sprite.animations.add('closed', [0], 1, true, true);
    sprite.animations.add('opened', [], 0, true, true); // no sprite, because an opened door sprite is already drawn on the map.

    this.changeDoorState(sprite, 'closed'); // the door is initially closed
    element.id = doorID; // the id of the door, not used yet

    //copy all properties to the sprite:
    Object.keys(element.properties).forEach(function (key) {
      sprite[key] = element.properties[key];
    });
  },
  /*************************METHODS CALLED BY UPDATE() **************************
   * @param doorObject
   * @param string : animation to be played
   * This function changes the current state of the doorObject to new one, specified by the string parameter
   */
   changeDoorState: function(doorObject, string) {
    var currFrame = doorObject.animations.play(string);
    // console.log('frame number: ' + currFrame.frame + ' ' + string);
  },
  /** Used to differentiate item types and deal with them appropriately
   * @param player
   * @param collectable
   */
  pickupItem: function(player, collectable){
    if(collectable.type === "clue"){
      this.showHint(player, collectable);
    }
    else if(collectable.type === "policy"){
      this.addPolicy(collectable);
    }
  },
  /** function that outputs a random hint from an array of hints
   *  called when the player collects a clue object
   * @param player
   * @param collectable
   */
    // TODO: update the array with real hints
    // change the current display of the hints as the current one is quite ugly
  showHint: function(player, collectable) {
    var array = [];
    array.push("how to make your \npassword stronger:\n hint 1");
    array.push("how to make your \npassword stronger:\n hint 2");
    array.push("how to make your \npassword stronger:\n hint 3");
    array.push("how to make your \npassword stronger:\n hint 4");
    var randomIndex = Math.floor(Math.random() * (array.length) + 0); // gives random number between 0 and the length of the array
    var hint = array[randomIndex];

    // var input = confirm(hint);
    // display hint:
    var style = { font: "20px Arial", fill: "#000000", align: "center" };
    text = this.game.add.text(this.player.sprite.x,  this.player.sprite.y, hint, style);
    collectable.destroy();
  },
  /** Function deals with entering through the doors
   * @param player
   * @param door
   */
  enterDoor: function (player, door) {

    if(this.flagEnter === false){

      // update global variables
      currentDoor = door;
      this.flagEnter = true;
      fPause = true;

      // password not set yet
      if (door.password === 'null') {
        document.getElementById("titlePwd").innerHTML = "Setup password";
      } else {
        document.getElementById("titlePwd").innerHTML = "Input password";
      }
      // Check if player has the right policy for the door
      if(this.player.policies[door.policy] === undefined){
        document.getElementById("mainLayer").style.display = "block";
        document.getElementById("noPolicyField").style.display = "block";
        document.getElementById("noPolicyLabel").innerHTML = "YOU NEED TO HAVE " + door.policy + " POLICY.";
      }else {
        document.getElementById("policyTitle").style.color = door.policy;
        document.getElementById("policyRules").innerHTML = this.retrievePolicyRules(door.policy);
        // display password pop up
        document.getElementById("mainLayer").style.display = "block";
        document.getElementById("policyField").style.display = "block";
        document.getElementById("inputPwd").style.display = "block";
      }
    }
  },
  /** Move character function for controlling animations of player
   *  This could probably be generalised to move Enemy too. - BMDK
   */
  moveCharacter: function (character, speed) {
    //player movement
    character.body.velocity.y = 0;
    character.body.velocity.x = 0;

    /* Player moving up only */
    if (this.cursors.up.isDown && !this.cursors.right.isDown && !this.cursors.left.isDown) {
      character.body.velocity.y -= speed;
      character.animations.play('up');
      lastKnownPlayerDirection[0] = 'up';
    }
    /* Player moving down only */
    else if (this.cursors.down.isDown && !this.cursors.right.isDown && !this.cursors.left.isDown) {
      character.body.velocity.y += speed;
      character.animations.play('down');
      lastKnownPlayerDirection[0] = 'down';

    }
    /* Player moving diagonally down & right */
    else if (this.cursors.down.isDown && this.cursors.right.isDown && !this.cursors.left.isDown) {
      character.body.velocity.y += speed;
      character.body.velocity.x += speed;
      character.animations.play('right');
      lastKnownPlayerDirection[0] = 'right';

    }
    /* Player moving diagonally down & left */
    else if (this.cursors.down.isDown && this.cursors.left.isDown && !this.cursors.right.isDown) {
      character.body.velocity.y += speed;
      character.body.velocity.x -= speed;
      character.animations.play('left');
      lastKnownPlayerDirection[0] = 'left';

    }
    /* Player moving diagonally up & right */
    else if (this.cursors.up.isDown && this.cursors.right.isDown && !this.cursors.left.isDown) {
      character.body.velocity.y -= speed;
      character.body.velocity.x += speed;
      character.animations.play('right');
      lastKnownPlayerDirection[0] = 'right';

    }
    /* Player moving diagonally up & left */
    else if (this.cursors.up.isDown && this.cursors.left.isDown && !this.cursors.right.isDown) {
      character.body.velocity.y -= speed;
      character.body.velocity.x -= speed;
      character.animations.play('left');
      lastKnownPlayerDirection[0] = 'left';

    }
    /* Player moving left only */
    else if (this.cursors.left.isDown) {
      character.body.velocity.x -= speed;
      character.animations.play('left');
      lastKnownPlayerDirection[0] = 'left';
    }
    /* Player moving right only */
    else if (this.cursors.right.isDown) {
      character.body.velocity.x += speed;
      character.animations.play('right');
      lastKnownPlayerDirection[0] = 'right';
    }
    /*If player becomes static/stops, use last known direction to keep them facing that way*/
    else {
      character.animations.stop();
      if (lastKnownPlayerDirection[0] === 'up') {
        character.frame = 36; /* leave player facing up*/
      }
      else if (lastKnownPlayerDirection[0] === 'down') {
        character.frame = 1; /* leave player facing down*/
      }
      else if (lastKnownPlayerDirection[0] === 'left') {
        character.frame = 23; /* leave player facing left*/
      }
      else if (lastKnownPlayerDirection[0] === 'right') {
        character.frame = 35; /* leave player facing right*/
      }
    }
  },
 /***************************** UNUSED METHODS ***********************************
**************** function that changes the door tile with the the player sprite, i.e. simulates opened door
  openDoor: function (object1, object2) {
    //object2.visible = false;
    object2.texture = this.player.texture;
    this.showNextFrame = this.showNextFrame || [];
    //object2.
    if (this.showNextFrame.indexOf(object2) === -1) {
      this.showNextFrame = this.showNextFrame.concat([object2]);
    }
  }, ***********/

  // function to open a new window in the middle of the screen
  // used for the doors interface
  popup: function (url, title, w, h) {
    var left = (screen.width / 2) - (w / 2);
    var top = (screen.height / 2) - (h / 2);
    return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
  },

  setPlayerInvisible: function () {
    this.player.sprite.renderable = false;
  },

  setDoorInvisible: function (door) {
    door.renderable = false;  // this doesn't work, because this.doors is about all door objects, not only one of them.
                                    // so the engine doesn't know which one to make invisible
  }
 };