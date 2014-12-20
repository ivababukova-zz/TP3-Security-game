var Encrypt = Encrypt || {};

Encrypt.game = new Phaser.Game(200, 200, Phaser.AUTO, '');
Encrypt.map = new Phaser.Game(360, 360, Phaser.AUTO, '');

Encrypt.game.state.add('Boot', Encrypt.Boot);
Encrypt.game.state.add('Preload', Encrypt.Preload);
Encrypt.game.state.add('Game', Encrypt.Game);

Encrypt.game.state.start('Boot');
