var Encrypt = Encrypt || {};

//loading the game assets
Encrypt.Preload = function(){};

Encrypt.Preload.prototype = {
  preload: function() {
    //show loading screen
    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadbar');
    this.preloadBar.anchor.setTo(0.5);

    this.load.setPreloadSprite(this.preloadBar);

    //load game assets
    this.load.tilemap ('level1', 'assets/tilemaps/map32x32.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image ('32x32TileSet1Encrypt', 'assets/EncryptTileSets/32x32TileSet1Encrypt.png');

    // policies:
    this.load.image ('redPolicy', 'assets/images/GameIcons/PasswordPolicySheetRed.png');
    this.load.image ('blackPolicy', 'assets/images/GameIcons/PasswordPolicySheetBlack.png');
    this.load.image ('yellowPolicy', 'assets/images/GameIcons/PasswordPolicySheetYellow.png');
    // others:
    this.load.image ('clue', 'assets/images/GameIcons/Clue.png');
    this.load.image ('firewall', 'assets/images/GameIcons/Firewall.png');
    this.load.image ('AntiKeyLog', 'assets/images/GameIcons/AntiKeyLogger.png');
    this.load.image ('info', 'assets/images/GameIcons/Info.png');
    this.load.image ('antivirus', 'assets/images/GameIcons/AntiVirus.png');
    this.load.image ('winkey', 'assets/images/winkey.png');
    this.load.image ('frontBlock', 'assets/images/GameIcons/frontDoorBlock.png');
    this.load.image ('sideBlock', 'assets/images/GameIcons/sidewaysDoorBlock.png');

    // player, enemy and door animations
    this.load.spritesheet ('player', 'assets/images/Animations/PlayerSpriteSheet.png', 40, 64, 36);
    this.load.spritesheet ('frontDoor','assets/images/Animations/DoorAnimations/FrontDoorAnimationFrames.png', 64, 64, 17, 0, 0 );

    this.load.spritesheet ('instrButtons','assets/images/ButtonImages/instrButtonSpriteSheet.png', 141, 65, 2 );

    this.load.spritesheet ('startButtons','assets/images/ButtonImages/startButtonSpriteSheet.png', 141, 65, 2 );

    this.load.spritesheet ('skipButtons','assets/images/ButtonImages/skipButtonSpriteSheet.png', 141, 65, 2 );

    this.load.spritesheet ('nextArrow','assets/images/ButtonImages/arrowsNextSpritesheet.png', 141, 65, 2 );

    this.load.spritesheet ('previousArrow','assets/images/ButtonImages/arrowsPreviousSpriteSheet.png', 141, 65, 2 );

    this.load.spritesheet ('noteButtons','assets/images/ButtonImages/noteButtonSpriteSheet.png', 56, 58, 2 );

    this.load.spritesheet ('hintButtons','assets/images/ButtonImages/hintsButtonSpriteSheet.png', 56, 58, 2 );

    this.load.spritesheet('restartButtons', 'assets/images/ButtonImages/restartButtonSpritesheet.png', 80, 43, 2);

    this.load.spritesheet ('endButtons', 'assets/images/ButtonImages/endButtonSpriteSheet.png', 80, 43, 2);

    this.load.spritesheet ('icons', 'assets/images/GameIcons/IconsSpriteSheet.png', 56, 56, 21);

    this.load.spritesheet ('sideDoor', 'assets/images/Animations/DoorAnimations/SideDoorAnimationFrames.png', 128, 128, 17, 0, 0);
    this.load.spritesheet ('enemy', 'assets/images/Animations/EnemySpriteSheet.png', 55, 61, 5); // BMDK: - Added enemy spritesheet

    //main menu images
    this.load.image ('logo', 'assets/images/EncryptLogo.png');
    this.load.image ('space', 'assets/images/BackDrop.png');
    this.load.image ('space2', 'assets/images/MLetters.png');

    // instruction pages
    this.load.image ('firstInstructionPage', 'assets/images/firstPageOfInstructions.png');
    this.load.image ('secondInstructionPage', 'assets/images/secondPageOfInstructions.png');
    this.load.image ('thirdInstructionPage', 'assets/images/thirdPageOfInstructions.png');
    this.load.image ('fourthInstructionPage', 'assets/images/fourthPageOfInstructions.png');
    this.load.image ('fifthInstructionPage', 'assets/images/fifthPageOfInstructions.png');
    this.load.image ('sixthInstructionPage', 'assets/images/sixthPageOfInstructions.png');
    this.load.image ('seventhInstructionPage', 'assets/images/seventhPageOfInstructions.png');

    // buttons:
    // this.load.spritesheet ('instructionsButt', 'assets/images/ButtonImages/instrButtonSprite.png', 64, 130);
    this.load.image ('backButton','assets/images/ButtonImages/gobackButtonIva.png');



      //music
      this.load.audio ('music', 'assets/sounds/main_music.ogg');
	  this.load.audio('runningSound', 'assets/sounds/running.ogg');    
	  this.load.audio ('pickUpSound', 'assets/sounds/pickup_sound.ogg');
	  this.load.audio ('doorSound', 'assets/sounds/door_open.ogg');

  },
  create: function() {
    // this.state.start('MainMenu');
    this.state.start ('MainMenu');
  }
};
