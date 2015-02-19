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
    this.load.image ('bluePolicy', 'assets/images/GameIcons/PasswordPolicySheetBlue.png');
    this.load.image ('redPolicy', 'assets/images/GameIcons/PasswordPolicySheetRed.png');
    this.load.image ('greenPolicy', 'assets/images/GameIcons/PasswordPolicySheetGreen.png');
    this.load.image ('magentaPolicy', 'assets/images/GameIcons/PasswordPolicySheetMagenta.png');
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
    this.load.spritesheet ('sideDoor', 'assets/images/Animations/DoorAnimations/SideDoorAnimationFrames.png', 128, 128, 17, 0, 0);
    this.load.spritesheet ('enemy', 'assets/images/Animations/EnemySpriteSheet.png', 64, 64, 5); // BMDK: - Added enemy spritesheet

    //main menu images
    this.load.image ('space', 'assets/images/BackDrop.png');
    this.load.image ('space2', 'assets/images/MLetters.png');

    // buttons:
    // this.load.spritesheet ('instructionsButt', 'assets/images/ButtonImages/instrButtonSprite.png', 64, 130);
    this.load.image ('backButton','assets/images/ButtonImages/gobackButtonIva.png');
    this.load.image ('instructionsButton','assets/images/ButtonImages/instrButton.png');
    this.load.image ('pressedInstrButton','assets/images/ButtonImages/pressedInstrButton.png');
    this.load.image ('restartButton','assets/images/ButtonImages/restart_button.png');
    this.load.image ('startButton','assets/images/ButtonImages/startButton.png');
    this.load.image ('pressedStartButton','assets/images/ButtonImages/pressedStartButton.png');
    this.load.image ('hintsButton','assets/images/ButtonImages/hintsButton.png');
    this.load.image ('pressedHintsButton','assets/images/ButtonImages/pressedHintsButton.png');
    this.load.image ('noteButton', 'assets/images/ButtonImages/noteButton.png');
    this.load.image ('pressedNoteButton', 'assets/images/ButtonImages/pressedNoteButton.png');

    //music
    this.load.audio ('music', 'assets/sounds/main_music.ogg');
    //this.load.audio('passwordSound', 'assets/sounds/door_sound.wav');
    this.load.audio ('pickUpSound', 'assets/sounds/pickup_sound.ogg');
	  this.load.audio ('doorSound', 'assets/sounds/door_open.ogg');

  },
  create: function() {
    // this.state.start('MainMenu');
    this.state.start ('MainMenu');
  }
};
