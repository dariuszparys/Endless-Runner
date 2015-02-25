/// <reference path="c:\temp\MVAEndlessRunner\MVAEndlessRunner\vendor/require.js" />

requirejs.config({
    paths: {
        Phaser: "vendor/phaser",
        jquery: "//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min"
    }
});


require([
    "phasergame",
    "states/boot",
    "states/preload",
    "states/game",
    "states/gameover"
], function (PhaserGame, BootState, PreloadState, GameState, GameOverState) {

    var game = new PhaserGame(960, 640);

    game.state.add("Boot", BootState);
    game.state.add("Preload", PreloadState);
    game.state.add("Game", GameState);
    game.state.add("GameOver", GameOverState);

    game.state.start("Boot");

});