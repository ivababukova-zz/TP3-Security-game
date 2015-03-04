var Encrypt = Encrypt || {};

Encrypt.game = new Phaser.Game(600, 600, Phaser.AUTO, '');
//Encrypt.map = new Phaser.Game(360, 360, Phaser.AUTO, '');

Encrypt.game.state.add('Boot', Encrypt.Boot);
Encrypt.game.state.add('Preload', Encrypt.Preload);
Encrypt.game.state.add('GameWon', Encrypt.GameWon);
Encrypt.game.state.add('GameLost', Encrypt.GameLost);
Encrypt.game.state.add('MainMenu', Encrypt.MainMenu);
Encrypt.game.state.add('InstructionsStory', Encrypt.InstructionsStory);
Encrypt.game.state.add('Instructions1', Encrypt.Instructions1);
Encrypt.game.state.add('Instructions2', Encrypt.Instructions2);
Encrypt.game.state.add('Instructions3', Encrypt.Instructions3);
Encrypt.game.state.add('Instructions4', Encrypt.Instructions4);
Encrypt.game.state.add('Instructions5', Encrypt.Instructions5);
Encrypt.game.state.add('Instructions6', Encrypt.Instructions6);
Encrypt.game.state.add('Instructions7', Encrypt.Instructions7);
Encrypt.game.state.add('Instructions8', Encrypt.Instructions8);
Encrypt.game.state.add('Game', Encrypt.Game);


Encrypt.game.state.start('Boot');
