var TopDownGame = TopDownGame || {};

//title screen
TopDownGame.Game = function(){};

/*The player constructor - incomplete*/
Player = function(){

  //var currentSprite = path to sprite / name of sprite
  // rolled back to x,y coordinates as using a Coordinate object might mean extra complexity
  var currentX = 50;
  var currentY = 50;
  /* player's item bag - initialised to null; should be set to null when an object is used
                       - modelled as a multi-dimensional array to support having more than one type of an object*/
  this.bag = [ [null],
               [null],
               [null]];
  // is visible attribute -  not too sure about use
  this.isVisible = true;
  // is collidable attribute - not sure about use
  this.isCollidable = true;
  // speed attribute - set to 10.0 as a default - might need adjusting according to world
  this.speed = 10.0;
  // the probability of loosing the sheet with passwords
  this.loseNoteChance = 0.25;
  //the actual note 
  var note = new Object();

  // getter methods
  this.getX = function() {
    return currentX;
  }

  this.getY = function() {
    return curretY;
  }

  // move method is unnecessary and will/should be handled in the update() function
  // change the speed of the player
  this.changeSpeed = function(toSpeed) {
    this.speed = toSpeed;
  }

  //run animation is handled by the game engine
  /*use item from bag on a specified target - will call the object's "use()" method
    due to small number of objects, will use a swtich case to handle usage*/
  this.useItem = function ( item ){
    
    swtich(item){
      case 'antivirus':
        if(this.bag[0][this.bag[0].length -1] != null)
          this.bag[0][this.bag[0].length -1].use();  //antivirus will hold position 0
        //do nothing if the player doesn't have the object; potentially play a sound to let him know what's going awn.
        break;

      case 'anti-keylogger':
        if(this.bag[1][this.bag[1].length -1] != null)
          this.bag[1][this.bag[1].length -1].use();
        break;

      case 'firewall':
        if(this.bag[2][this.bag[2].length -1] != null)
          this.bag[2][this.bag[2].length -1.use();
        break;
    }
  }

  //method to add an item to the player's bag; assume item is a string saying what type of item we're adding
  this.addItem = function(item){
    swtich(item){
      case 'antivirus':
        this.bag[0].push(item);  //antivirus will hold position 0
        //do nothing if the player doesn't have the object; potentially play a sound to let him know what's going awn.
        break;

      case 'anti-keylogger':
        this.bag[1].push(item); // "item" here will be replaced with an instantiation of the appropriate object
        break;

      case 'firewall':
        this.bag[2].push(item);
        break;
    }
  }
  // method to be called everytime the user moves (or at every update) that simulates losing the note object
  this.loseNote = function(){

    if(note.size > 0 ) {              // if there's anything worth losing, i.e. if the note is not empty
      var chance = Math.random();
      if(chance > this.loseNoteChance)
        //lose the note, i.e. drop it
    }
  }

  //method to interact with the friend; should test for proximity of friend when calling this method
  this.interactWithFriend = function(friend){
    // interact with the friend
  }
}

/* constructor for the policy object 
    Upon creation of objects on the map, individual policies will be created, then each door will be assigned one policy
    Each time the user tries to set a new password for a door, the door checks if the password subscribes to the given policy
    */
Policy = function( minLength, minNums, minPunct, minSpeChar, colour){
  // the attributes of the policy object should be the specifications for how passwords should look like
  //minimum length of a password
  this.minLength = minLength;
  // maximum length of a password set to a default of 15; should be changed
  this.maxLength = 15;
  // minimum number of numbers
  this.minNums = minNums;
  // minimum number of punctuation signs
  this.minPunct = minPunct;
  // minimum number of special characters, i.e. @, #, %, ^, &, *, ~
  this.minSpeChar = minSpeChar
  // colour corresponding to the policy
  this.colour = colour;

  // there was no need for methods, as the attributes are set to public
}

TopDownGame.Game.prototype = {
  create: function() {
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

    //create player
    var result = this.findObjectsByType('playerStart', this.map, 'objectsLayer')
    this.player = this.game.add.sprite(result[0].x, result[0].y, 'player');
    this.game.physics.arcade.enable(this.player);

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
    result = this.findObjectsByType('item', this.map, 'objectsLayer');
    result.forEach(function(element){
      this.createFromTiledObject(element, this.items);
    }, this);
  },
  createDoors: function() {
    //create doors
    this.doors = this.game.add.group();
    this.doors.enableBody = true;
    result = this.findObjectsByType('door', this.map, 'objectsLayer');

    result.forEach(function(element){
      this.createFromTiledObject(element, this.doors);
    }, this);
  },

  //find objects in a Tiled layer that containt a property called "type" equal to a certain value
  findObjectsByType: function(type, map, layer) {
    var result = new Array();
    map.objects[layer].forEach(function(element){
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
  update: function() {
    //collision
    this.game.physics.arcade.collide(this.player, this.blockedLayer);
    this.game.physics.arcade.overlap(this.player, this.items, this.collect, null, this);
    this.game.physics.arcade.overlap(this.player, this.doors, this.enterDoor, null, this);

    //player movement
    this.player.body.velocity.y = 0;
    this.player.body.velocity.x = 0;

    if(this.cursors.up.isDown) {
      this.player.body.velocity.y -= 50;
    }
    else if(this.cursors.down.isDown) {
      this.player.body.velocity.y += 50;
    }
    if(this.cursors.left.isDown) {
      this.player.body.velocity.x -= 50;
    }
    else if(this.cursors.right.isDown) {
      this.player.body.velocity.x += 50;
    }
  },
  collect: function(player, collectable) {
    console.log('yummy!');

    //remove sprite
    collectable.destroy();
  },
  enterDoor: function(player, door) {
    console.log('entering door that will take you to '+door.targetTilemap+' on x:'+door.targetX+' and y:'+door.targetY);
  },
};