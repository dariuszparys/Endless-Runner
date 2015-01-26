define([
    "Phaser"
], function (Phaser) {

    var finalScore;

    var GameOverState = function (game) {

    };

    GameOverState.prototype = {

        constructor: GameOverState,

        init: function (score) {

            finalScore = score;

        },

        create: function () {
            var text = this.game.add.text(this.game.world.centerX, this.game.world.centerY,
                "Score: " + Math.floor(finalScore).toString() + " m", {
                    font: "50px Arial",
                    fill: "#ffaa44",
                    align: "center"
                });
            text.anchor.setTo(0.5, 0.5);

            var playButton = this.game.add.button(this.game.world.centerX,
                this.game.world.centerY + 70, "play",
                this.play, this);
            playButton.anchor.setTo(0.5, 0.5);
        },

        play: function () {
            this.game.state.start("Game");
        }
    };

    return GameOverState;

});
