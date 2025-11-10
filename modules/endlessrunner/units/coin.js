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

        // Physics will be enabled in update() after the object is added to the game
        this.physicsInitialized = false;

        gameScene = theGame;
    }

    Coin.prototype = Object.create(Phaser.Graphics.prototype);
    Coin.prototype.constructor = Coin;

    Coin.prototype.update = function () {
        // Initialize physics after the object has been added to the game
        if (!this.physicsInitialized) {
            this.game.physics.arcade.enable(this);
            if (this.body) {
                this.body.setCircle(15);
                this.body.checkCollision = true;
                this.physicsInitialized = true;
            }
        }

        calculateCoinSpeed();

        this.position.x -= coinSpeed;
        if (this.position.x < -50) {
            this.destroy();
        }
    }

    function calculateCoinSpeed() {
        coinSpeed = gameScene.getSpeed() * 2;
    }

    return Coin;

});
