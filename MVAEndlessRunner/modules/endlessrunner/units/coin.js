define([
    "Phaser"
], function (Phaser) {

    var gameScene;
    var coinSpeed;

    var Coin = function (game, x, y, theGame) {

        // Create a graphics object for the coin since we don't have a coin image
        Phaser.Graphics.call(this, game, x, y);

        // Draw a golden coin
        this.beginFill(0xFFD700); // Gold color
        this.drawCircle(0, 0, 30);
        this.endFill();

        // Add a shine effect
        this.beginFill(0xFFFF00, 0.5); // Lighter gold
        this.drawCircle(-5, -5, 15);
        this.endFill();

        game.physics.arcade.enable(this);
        this.body.setCircle(15);
        this.body.checkCollision = true;

        gameScene = theGame;
    }

    Coin.prototype = Object.create(Phaser.Graphics.prototype);
    Coin.prototype.constructor = Coin;

    Coin.prototype.update = function () {
        calculateCoinSpeed();

        // Check for collection (overlap with player)
        this.game.physics.arcade.overlap(this, gameScene.getPlayer(), this.collect, null, this);

        this.position.x -= coinSpeed;
        if (this.position.x < -50) {
            this.destroy();
        }
    }

    Coin.prototype.collect = function (coin, player) {
        gameScene.collectCoin();
        coin.destroy();
    }

    function calculateCoinSpeed() {
        coinSpeed = gameScene.getSpeed() * 2;
    }

    return Coin;

});
