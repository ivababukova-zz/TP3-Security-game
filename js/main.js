var Encrypt = Encrypt || {};

Encrypt.game = new Phaser.Game(600, 600, Phaser.AUTO, '');
//Encrypt.map = new Phaser.Game(360, 360, Phaser.AUTO, '');

Encrypt.game.state.add('Boot', Encrypt.Boot);
Encrypt.game.state.add('Preload', Encrypt.Preload);
Encrypt.game.state.add('MainMenu', Encrypt.MainMenu);
Encrypt.game.state.add('Instructions', Encrypt.Instructions);
Encrypt.game.state.add('Game', Encrypt.Game);
Encrypt.game.state.add('GameOver', Encrypt.Game);

Encrypt.game.state.start('Boot');
