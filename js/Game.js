var Encrypt = Encrypt || {};

//title screen
Encrypt.Game = function(){};

var hook;

var TILESIZE = 32;
var currentRoom = 0;
var currentDoor = null;
var fPause = false;
var lastKnownPlayerDirection = ['',0]; /*for the purpose of tracking what animation frame to end on and lastKnownPlayerDirection*/


Encrypt.Game.prototype = {
  fPause: false,

  create: function () {
    this.graphs = [];
    // when the player touches the door, this.flagEnter is true, otherwise false.
    this.flagEnter = false;
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

    ///this.createItems();
    this.createDoors();

    this.loadRooms();

    this.password = this.createInput();
    fPause = false;

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
        // when the user input password and enter 'Enter' key,
        if (currentDoor.password == 'null') {

          document.getElementById("inputpwd").style.display = "none";
          self.changeDoorState(currentDoor,'opening');
          currentDoor.password = this._value;
          this._hiddenInput.value = '';
          fPause = false;
        } else { // if password was already set, then compare.

          if (currentDoor.password == this._value) {
            document.getElementById("inputpwd").style.display = 'none';
            fPause = false;
          } else {
            document.getElementById("titlePwd").innerHTML = "Incorrect. Input again!";
          }
          this._hiddenInput.value = '';
        }
      }
    });
    return input;
  },

  createItems: function () {
    //create items
    this.items = this.game.add.group();
    this.items.enableBody = true;

    var item;
    var result = this.findObjectsByType('item', this.map, 'objectsLayer');

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

  loadRooms: function() {
    this.rooms = this.findObjectsByType('room', this.map, 'RoomLayer');
    this.getCurrentRoom();
  },

  getCurrentRoom: function () {
    currentRoom = 0;
    this.rooms.forEach(function(element){

      var x = parseInt(element.properties.vx) * TILESIZE;
      var y = parseInt(element.properties.vy) * TILESIZE;
      var w = (parseInt(element.properties.vw)) * TILESIZE;
      var h = (parseInt(element.properties.vh)) * TILESIZE;

      // if player is in the room, then memorise its id
      var rect1 = new PIXI.Rectangle(x,y,w,h);
      if (rect1.contains( this.player.sprite.position.x, this.player.sprite.position.y ) ||
          rect1.contains( this.player.sprite.position.x, this.player.sprite.position.y+16 ) ||
          rect1.contains( this.player.sprite.position.x+10, this.player.sprite.position.y+16 ) ||
          rect1.contains( this.player.sprite.position.x+10, this.player.sprite.position.y )
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
  },

  // draw the room.
  drawRoom: function(room) {

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

    sprite2.animations.add('opening', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16], 17, true, true);
    sprite2.animations.add('closing', [16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0], 17, true, true);
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
  *  This could probably be generalised to move Enemy too.
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

    //collision
    if (fPause == true) {
      this.player.sprite.body.velocity.y = 0;
      this.player.sprite.body.velocity.x = 0;
      return;
    }

    this.game.physics.arcade.collide(this.player.sprite, this.blockedLayer);   // set up collision with this layer
    ///this.game.physics.arcade.overlap(this.player, this.items, this.showHint, null, this);



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

  // function that outputs a random hint from an array of hints
  // called when the player collects a clue object
  showHint: function(player, collectable) {
    var array = [];
    array.push("how to make your password stronger: hint 1");
    array.push("how to make your password stronger: hint 2");
    array.push("how to make your password stronger: hint 3");
    array.push("how to make your password stronger: hint 4");
    var randomIndex = Math.floor(Math.random() * (array.length) + 0); // gives random number between 0 and the length of the array
    var hint = array[randomIndex];

    var input = confirm(hint);

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
    }

  }
};
 