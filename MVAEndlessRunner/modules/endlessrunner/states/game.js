define([
    "Phaser",
    "jquery",
    "units/player",
    "units/bomb"
], function (Phaser, $, Player, Bomb) {

    var tileSpriteMoveSpeed;
    var meterSpeed;
    var meters;
    var tileSprite;
    var hudMeters;

    var player;
    var cursors;

    var GameState = function (game) {

    };

    GameState.prototype = {

        constructor: GameState,

        create: function () {

            tileSpriteMoveSpeed = 2;
            meterSpeed = tileSpriteMoveSpeed / 20;
            meters = 0;
            this.game.physics.startSystem(Phaser.Physics.Arcade);

            cursors = this.game.input.keyboard.createCursorKeys();

            tileSprite = this.game.add.tileSprite(0, 0, 1000, 750, "background");
            
            player = new Player(this.game, 300, 300);
            this.game.add.existing(player);

            hudMeters = this.game.add.text(10, 10, "Meter: 0 m", {
                font: "30px Arial",
                fill: "#ffaa44",
                align: "left"
            });

            
        },

        init: function () {            
            this.game.time.events.loop(Phaser.Timer.SECOND * 0.5, this.createBomb, this);
            this.game.time.events.loop(Phaser.Timer.SECOND * 10, this.speedUp);
        },

        update: function () {

            tileSprite.tilePosition.x -= tileSpriteMoveSpeed;
            meters += meterSpeed;

            if (cursors.up.isDown) {
                player.position.y -= 8;
            } else if (cursors.down.isDown) {
                player.position.y += 8;
            }

            hudMeters.setText("Meter: " + Math.floor(meters).toString() + " m");

        },

        getPlayer: function() {
            return player;
        },

        getSpeed: function() {
            return tileSpriteMoveSpeed;
        },

        gameOver: function () {
            tileSpriteMoveSpeed = 0;
            meterSpeed = 0;
            player.destroy();
            var currentDate = new Date();
            $.post("http://leaderboardweb.azurewebsites.net/api/leaderboard", { score: Math.floor(meters).toString() + " m", when: currentDate.toJSON() });
            this.game.time.events.add(Phaser.Timer.SECOND * 3, this.exitScene, this);
        },

        exitScene: function() {
            this.game.state.start("GameOver", true, false, meters);
        },

        createBomb: function () {
            var bomb = new Bomb(this.game, 1000, this.game.world.randomY, this);
            this.game.add.existing(bomb);
        },

        speedUp: function () {
            tileSpriteMoveSpeed++;
        }


    };

    return GameState;

}); 