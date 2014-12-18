var TopDownGame = TopDownGame || {};

TopDownGame.game = new Phaser.Game(200, 200, Phaser.AUTO, '');
TopDownGame.map = new Phaser.Game(360, 360, Phaser.AUTO, '');

TopDownGame.game.state.add('Boot', TopDownGame.Boot);
TopDownGame.game.state.add('Preload', TopDownGame.Preload);
TopDownGame.game.state.add('Game', TopDownGame.Game);

TopDownGame.game.state.start('Boot');
