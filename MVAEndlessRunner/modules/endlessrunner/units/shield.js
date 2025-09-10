define([
    "Phaser"
], function (Phaser) {

    var gameScene;
    var shieldSpeed;

    var Shield = function (game, x, y, theGame) {

        Phaser.Sprite.call(this, game, x, y, "shield");
        game.physics.arcade.enable(this);

        this.body.checkCollision = true;
        this.anchor.setTo(0.5, 0.5);

        gameScene = theGame;
    }

    Shield.prototype = Object.create(Phaser.Sprite.prototype);
    Shield.prototype.constructor = Shield;

    Shield.prototype.update = function () {
        calculateShieldSpeed();

        this.position.x -= shieldSpeed;
        if (this.position.x < 0) {
            this.destroy();
        }
    }

    function calculateShieldSpeed() {
        shieldSpeed = gameScene.getSpeed() * 2;
    }

    return Shield;

});
