var Encrypt = Encrypt || {};

//title screen
Encrypt.Game = function(){};

var hook;

var TILESIZE = 64;
var currentRoom = 0;
var currentDoor = null;
var fPause = false;

/*The player constructor - incomplete*/


/* constructor for the policy object
 Upon creation of objects on the map, individual policies will be created, then each door will be assigned one policy
 Each time the user tries to set a new password for a door, the door checks if the password subscribes to the given policy
 */


/*constructor for the Friend object
 -  There can be more than one object of this type
 -  We should be able to instantiate him at a given set of coordinates*/

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
    this.map.addTilesetImage('TileSet1Encrypt', 'TileSet1Encrypt');

    //create layer
    ///this.borderLayer = this.map.createLayer('borderLayer');
    this.backgroundlayer = this.map.createLayer('backgroundLayer');
    this.blockedLayer = this.map.createLayer('blockedLayer');


    //collision on blockedLayer
    this.map.setCollisionBetween(1, 100000, true, 'blockedLayer');

    //resizes the game world to match the layer dimensions
    this.backgroundlayer.resizeWorld();

    this.createItems();
    this.createCeilings();
    this.createDoors();
    this.createPlayer();
    this.loadRooms();

    this.password = this.createInput();
    fPause = false;
  },

  createPlayer: function () {
    //create player
    var result = this.findObjectsByType('playerStart', this.map, 'objectsLayer');
    this.player = this.game.add.sprite(result[0].x, result[0].y, 'player');
    this.game.physics.arcade.enable(this.player);
    //this.player.body.velocity.y = -100;
    //this.game.gravity = 0;

    //the camera will follow the player in the world
    this.game.camera.follow(this.player);

    //move player with cursor keys
    this.cursors = this.game.input.keyboard.createCursorKeys();
  },

  createInput: function () {
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

  // this is the set of ceiling tiles that need to overlap the player
  // It is done in this approach, because I didn't find a way to set overlap between layer and object, but only between two objects
  // if you know about something better, please fix it, it is not very correct according to physics
  createCeilings: function () {
    //create items
    this.ceilings = this.game.add.group();
    this.ceilings.enableBody = true;

    var ceiling;
    var result = this.findObjectsByType('ceiling', this.map, 'Ceiling');

    result.forEach(function (element) {
      this.createFromTiledObject(element, this.ceilings);
    }, this);
  },

  createDoors: function () {
    //create doors
    this.doors = this.game.add.group();
    this.doors.enableBody = true;
    doortexture = this.doors.texture;
    var result = this.findObjectsByType('door', this.map, 'objectsLayer');

    result.forEach(function (element) {
      this.createFromTiledObject(element, this.doors);
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
  createFromTiledObject: function (element, group) {
    var sprite = group.create(element.x, element.y, element.properties.sprite);

    //copy all properties to the sprite
    Object.keys(element.properties).forEach(function (key) {
      sprite[key] = element.properties[key];
    });
  },

  // function that changes the door tile with the the player sprite, i.e. simulates opened door
  openDoor: function (object1, object2) {
    //object2.visible = false;
    object2.texture = this.player.texture;
    this.showNextFrame = this.showNextFrame || [];
    //object2.
    if (this.showNextFrame.indexOf(object2) === -1) {
      this.showNextFrame = this.showNextFrame.concat([object2]);
    }
  },

  update: function () {

    //collision
    if (fPause == true) {
      this.player.body.velocity.y = 0;
      this.player.body.velocity.x = 0;
      return;
    }

    this.game.physics.arcade.collide(this.player, this.blockedLayer);   // set up collision with the walls
    this.game.physics.arcade.overlap(this.player, this.items, this.showHint, null, this);
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
  },


  // function to open a new window in the middle of the screen
  // used for the doors interface
  popup: function (url, title, w, h) {
    var left = (screen.width / 2) - (w / 2);
    var top = (screen.height / 2) - (h / 2);
    return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
  },

  showHint: function(player, collectable) {
    var array = [];
    array.push("how to make your password stronger: hint 1");
    array.push("how to make your password stronger: hint 2");
    array.push("how to make your password stronger: hint 3");
    array.push("how to make your password stronger: hint 4");
    var randomIndex = Math.floor(Math.random() * (array.length) + 0); // gives random number between 0 nad the array length
    var hint = array[randomIndex];

    var input = confirm(hint);

    collectable.destroy();
  },

  setPlayerInvisible: function () {
    this.player.renderable = false;
  },

  setDoorInvisible: function () {
    this.doors.renderable = false;
  },

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
      self.setDoorInvisible();
    }

  }

};
 