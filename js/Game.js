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

Encrypt.Game.prototype = {
  create: function () {
    // array to hold rooms' graphics
    this.roomGraphs = [];
    // when the player touches the door, this.flagEnter is true, otherwise false.
    this.flagEnter = false;
    // flagSearch is used to update the currentRoom only when flagEnter goes from true to false.
    this.flagSearch = false;
    hook = this;

    this.map = this.game.add.tilemap('level1');

    //the first parameter is the tileset name as specified in Tiled, the second is the key to the asset
    this.map.addTilesetImage('32x32TileSet1Encrypt', '32x32TileSet1Encrypt');

    //create layer
    this.backgroundlayer = this.map.createLayer('backgroundLayer');
    this.createPlayer();
    this.blockedLayer = this.map.createLayer('blockedLayer');
    this.overPlayerLayer = this.map.createLayer('overPlayerLayer');

    //collision on blockedLayer
    this.map.setCollisionBetween(1, 100000, true, 'blockedLayer');

    //resizes the game world to match the layer dimensions
    this.backgroundlayer.resizeWorld();

    this.createItems();
    this.createDoors();
    this.createPolicies();
    this.loadRooms();
    this.createInput();

    //add the W key to the keyboard to serve as a 'write' option for the player
    this.writeKey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
  },

  createPlayer: function () {
    //create player

    this.player = new Player(300,500, this.game);

    this.player.sprite.animations.add('down', [0,1,2,3,4,5,6,7,8,9,10,11], 12, true, true);
    this.player.sprite.animations.add('left',  [12,13,14,15,16,17,18,19,20,21,22,23], 12, true, true);
    this.player.sprite.animations.add('right', [24,25,26,27,28,29,30,31,32,33,34,35], 12, true, true);
    this.player.sprite.animations.add('up',    [36,37,38,39,40,41,42,43,44,45,46,47], 12, true, true);
    //this.player.animations.add('static', [0], 1, true, true);

    //move player with cursor keys
    this.cursors = this.game.input.keyboard.createCursorKeys();
  },

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
        // when the user input password and enter 'Enter' key
        if(!this.approved){
          return;
        }
        if (currentDoor.password == 'null') {

          document.getElementById("inputPwd").style.display = "none";
          document.getElementById("policyField").style.display= "none";
          document.getElementById("feedbackField").style.display = "none";
          document.getElementById("mainLayer").style.display= "none";
          self.changeDoorState(currentDoor,'opening');
          currentDoor.password = this._value;
          this._hiddenInput.value = '';
          fPause = false;
        } else { // if password was already set, then compare.

          if (currentDoor.password == this._value) {
            document.getElementById("inputPwd").style.display = "none";
            document.getElementById("policyField").style.display= "none";
            document.getElementById("feedbackField").style.display = "none";
            document.getElementById("mainLayer").style.display= "none";
            fPause = false;
            /*BMDK: call to function to open door when password is successful*/
            self.changeDoorState(currentDoor,'opening'); 
          } else {
            document.getElementById("titlePwd").innerHTML = "Incorrect. Input again!";
          }
          this._hiddenInput.value = '';
        }
      },
      // Feedback generated within each key-press
      onkeyup: function() {
        // first check if password pop up is open
        if (document.getElementById("inputPwd").style.display === "block") {
          var policy = self.policies[currentDoor.policy];
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
            feedback = "Approved.";
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
  },


  // this function creates only front doors at the moment:
  createDoors: function () {
    //create doors
    this.doors = this.game.add.group();
    this.doors.enableBody = true;


    var result = this.findObjectsByType('frontDoor', this.map, 'objectsLayer');
    var doorID = 0; // used to assign unique id for each door created


    // create the front door objects:
    result.forEach(function (element) {
      this.createDoorFromTiledObject(element, this.doors, doorID, 'frontDoor');
      doorID++;
    }, this);
  },

  /** Creates an initial policy */
  createPolicies: function(){
    this.policies = [];
    //default policy
    this.policies["green"] = new Policy(0, 0,this.game, 5, 3, 1, 1, "green");
  },
  /** When found add the new policy
   * @param {object} policy
   */
  addPolicy: function(policy){
    this.policies[policy.colour] = policy;
    policy.destroy();
  },
  /** Take the color of a policy ang give back its rules
   * @param {string} the color of a policy
   * @return {string} rules policy contains
   */
  retrievePolicyRules: function(pol){
    var policy = this.policies[pol];
    var str = "MIN LENGTH: " + policy.minLength + "<br>MIN #NUMBERS: " + policy.minNums
        + "<br>MIN #PUNCTUATION SIGNS:" + policy.minPunct + "<br>MIN #SPECIAL CHARACTERS: " + policy.minSpeChar;
    return str;
  },

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
      if (rect.contains(this.player.sprite.x, this.player.sprite.y))
      {
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
      if (currentRoom == element.properties.idx) { // player in the room
        element.properties.state = "0";
        return;
      } else if(state == 0){  // visited
        opacity = 0.6;
      }else if (state == 1) { // not visited
        color = 0x444444;
        opacity = 1;
      } else if (state == 2) { // infected
        color = 0xFFFFFF;
        opacity = 1;
      }
      graphics.beginFill(color, opacity);
      graphics.drawRect(x, y, w, h);
      graphics.endFill();
    }, this);
  },

  //find objects in a Tiled layer that contain a property called "type" equal to a certain value
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

  //create a sprite from an object
  createFromTiledObject: function (element, group, ID) {
    var sprite = group.create(element.x, element.y, element.properties.sprite);

    element.id = ID;

    //copy all properties to the sprite
    Object.keys(element.properties).forEach(function (key) {
      sprite[key] = element.properties[key];
    });
  },

  //create front door and load the animations for it
  createDoorFromTiledObject: function (element, group, doorID, spritesheet) {

    //frontDoorSprite = this.game.add.sprite(element.x, element.y, 'frontDoor');
    var sprite2 = group.create(element.x, element.y, spritesheet);

    //var sprite = group.create(element.x, element.y, element.properties.sprite);

    sprite2.animations.add('opening', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16], 17, false, true);
    sprite2.animations.add('closing', [16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0], 17, false, true);
    sprite2.animations.add('closed', [0], 1, true, true);
    sprite2.animations.add('opened', [16], 1, true, true);
    //sprite2.animations.play('closed');
    this.changeDoorState(sprite2, 'closed');
    element.id = doorID; // the id of the door, not used yet

    //copy all properties to the sprite
    Object.keys(element.properties).forEach(function (key) {
      sprite2[key] = element.properties[key];
    });
  },
/**************** function that changes the door tile with the the player sprite, i.e. simulates opened door
  openDoor: function (object1, object2) {
    //object2.visible = false;
    object2.texture = this.player.texture;
    this.showNextFrame = this.showNextFrame || [];
    //object2.
    if (this.showNextFrame.indexOf(object2) === -1) {
      this.showNextFrame = this.showNextFrame.concat([object2]);
    }
  }, ***********/
  changeDoorState: function(doorObject, string) {
    var currFrame = doorObject.animations.play(string);
    console.log('frame number: ' + currFrame.frame + ' ' + string);
  },



  /* Move character function for controlling animations of player
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

  update: function () {

    var self = this;
    //collision
    if (fPause == true) {
      self.player.sprite.animations.stop(); /* BMDK: This will stop the animations running whilst game is paused*/
      this.player.sprite.body.velocity.y = 0;
      this.player.sprite.body.velocity.x = 0;
      return;
    }

    this.game.physics.arcade.collide(this.player.sprite, this.blockedLayer);   // set up collision with this layer
    var hintsOverlapped = this.game.physics.arcade.overlap(this.player.sprite, this.items, this.pickupItem, null, this);


    // if the player has gone through a door, restore the original door sprite:
    /* do not delete this code:
     if (!doorOverlap && this.showNextFrame !== undefined){
     // var self = this;
     var texture = this.doors.getAt(16).texture;
     this.showNextFrame.forEach(function(door){door.texture = texture;});
     this.showNextFrame = [];
     }

    // make the player re-appear again after he has passed under the ceiling:
    if (!isUnderCeiling) {
      this.player.renderable = true;
    }
    */

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
      if (this.flagSearch == true) {
        this.flagSearch = false;
        this.loadRooms();
      }
      if (this.flagEnter === false) {
        /*BMDK:- if player was in front of an open door but goes away from it: close the door*/
        if (doorPass === 'in front of a door'){
          this.changeDoorState(door, 'closing');
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

    if(this.writeKey.justDown){
      this.player.note.write(prompt("Please type in your password"));
    }
  },


  // function to open a new window in the middle of the screen
  // used for the doors interface
  popup: function (url, title, w, h) {
    var left = (screen.width / 2) - (w / 2);
    var top = (screen.height / 2) - (h / 2);
    return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
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
  // function that outputs a random hint from an array of hints
  // called when the player collects a clue object
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
    var style = { font: "25px Arial", fill: "#000000", align: "center" };
    text = this.game.add.text(this.player.sprite.x,  this.player.sprite.y, hint, style);
    collectable.destroy();
  },

  setPlayerInvisible: function () {
    this.player.sprite.renderable = false;
  },

  setDoorInvisible: function (door) {
    door.renderable = false;  // this doesn't work, because this.doors is about all door objects, not only one of them.
                                    // so the engine doesn't know which one to make invisible
  },

  enterDoor: function (player, door) {
    if(this.policies[door.policy] === undefined){// Does not work properly
      this.game.physics.arcade.collide(player, door);
      return;
    }
    if(this.flagEnter == false){
      // update global variables
      currentDoor = door;
      this.flagEnter = true;
      fPause = true;
      // password not set yet
      if (door.password == 'null') {
        document.getElementById("titlePwd").innerHTML = "Setup password";
      } else {
        document.getElementById("titlePwd").innerHTML = "Input password";
      }
      // determine door's policy
      document.getElementById("policyTitle").style.color = door.policy;
      document.getElementById("policyRules").innerHTML = this.retrievePolicyRules(door.policy);
      // display password pop up
      document.getElementById("mainLayer").style.display = "block";
      document.getElementById("policyField").style.display = "block";
      document.getElementById("inputPwd").style.display = "block";
    }

  }
};
 