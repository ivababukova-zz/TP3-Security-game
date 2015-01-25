var Encrypt = Encrypt || {};

Encrypt.game = new Phaser.Game(650, 650, Phaser.AUTO, '');

Encrypt.game.state.add('Boot', Encrypt.Boot);
Encrypt.game.state.add('Preload', Encrypt.Preload);
Encrypt.game.state.add('MainMenu', Encrypt.MainMenu);
Encrypt.game.state.add('Game', Encrypt.Game);

Encrypt.game.state.start('Boot');
