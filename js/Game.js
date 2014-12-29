var Encrypt = Encrypt || {};

//title screen
Encrypt.Game = function(){};
var hook;
/*The player constructor - incomplete*/


/* constructor for the policy object 
    Upon creation of objects on the map, individual policies will be created, then each door will be assigned one policy
    Each time the user tries to set a new password for a door, the door checks if the password subscribes to the given policy
 */


/*constructor for the Friend object
-  There can be more than one object of this type
-  We should be able to instantiate him at a given set of coordinates*/

Encrypt.Game.prototype = {
  create: function() {
    hook = this;

    this.map = this.game.add.tilemap('level1');

    //the first parameter is the tileset name as specified in Tiled, the second is the key to the asset
    this.map.addTilesetImage('tiles', 'gameTiles');

    //create layer
    this.backgroundlayer = this.map.createLayer('backgroundLayer');
    this.blockedLayer = this.map.createLayer('blockedLayer');

    //collision on blockedLayer
    this.map.setCollisionBetween(1, 2000, true, 'blockedLayer');

    //resizes the game world to match the layer dimensions
    this.backgroundlayer.resizeWorld();

    this.createItems();
    this.createDoors();    
    this.createPlayer();
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

  createItems: function() {
    //create items
    this.items = this.game.add.group();
    this.items.enableBody = true;

    var item;    
    var result = this.findObjectsByType('item', this.map, 'objectsLayer');

    result.forEach(function(element){
      this.createFromTiledObject(element, this.items);
    }, this);
  },

  createDoors: function() {
    //create doors
    this.doors = this.game.add.group();
    this.doors.enableBody = true;

    var result = this.findObjectsByType('door', this.map, 'objectsLayer');

    result.forEach(function(element){
      this.createFromTiledObject(element, this.doors);
    }, this);
  },

  //find objects in a Tiled layer that contain a property called "type" equal to a certain value
  findObjectsByType: function(type, map, layer) {
    var result = [];
    map.objects[layer].forEach(function(element) {
      if(element.properties.type === type) {
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
  createFromTiledObject: function(element, group) {
    var sprite = group.create(element.x, element.y, element.properties.sprite);

      //copy all properties to the sprite
      Object.keys(element.properties).forEach(function(key){
        sprite[key] = element.properties[key];
      });
  },

  openDoor: function(object1, object2) {
    //object2.visible = false;
    object2.texture = this.player.texture;
    this.showNextFrame = this.showNextFrame || [];
    //object2.
    if(this.showNextFrame.indexOf(object2) === -1){
      this.showNextFrame = this.showNextFrame.concat([object2]);
    }
  },

  update: function() {

    this.game.physics.arcade.collide(this.player, this.blockedLayer);
    this.game.physics.arcade.overlap(this.player, this.items, this.collect, null, this);

    var doorOverlap = this.game.physics.arcade.overlap(this.player, this.doors, this.openDoor, null, this);

    if(!doorOverlap && this.showNextFrame !== undefined){
      var self = this;
      this.showNextFrame.forEach(function(door){door.texture = self.doors.getAt(16).texture;});
      this.showNextFrame = [];
    }

    //console.log("door left, right:", this.doors.getAt(1).body.position.x, this.doors.getAt(1).body.right, "door top, down:", this.doors.getAt(1).body.position.y, this.doors.getAt(1).body.down);

    //this.game.physics.arcade.overlap(this.player, this.doors, this.enterDoor, null, this);
    var speed = 50;
    //player movement
    this.player.body.velocity.y = 0;
    this.player.body.velocity.x = 0;

    if(this.cursors.up.isDown) {
      this.player.body.velocity.y -= speed;
    }
    else if(this.cursors.down.isDown) {
      this.player.body.velocity.y += speed;
    }
    if(this.cursors.left.isDown) {
      this.player.body.velocity.x -= speed;
    }
    else if(this.cursors.right.isDown) {
      this.player.body.velocity.x += speed;
    }
  },

  collect: function(player, collectable) {
    console.log('yummy!');
    //remove sprite
    collectable.destroy();
  },

  enterDoor: function (player, door) {
    console.log("***" + door.password + "***");
    /*
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
    */
  },

  lockDoor: function (door) {
    console.log("in lockDoor function");
    return 0;
  }
};