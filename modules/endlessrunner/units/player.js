define([
    "Phaser"
], function (Phaser) {

    var Player = function (game, x, y) {

        Phaser.Sprite.call(this, game, x, y, "player");
        game.physics.arcade.enable(this);

        this.body.collideWorldBounds = true;
        this.body.checkCollision = true;
        this.body.allowRotation = false;
        this.anchor.setTo(0.5, 0.5);
    }

    Player.prototype = Object.create(Phaser.Sprite.prototype);
    Player.prototype.constructor = Player;

    return Player;

});