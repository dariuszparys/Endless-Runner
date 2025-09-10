define([
    "Phaser"
], function (Phaser) {

    var gameScene;
    var bombSpeed;

    var Bomb = function (game, x, y, theGame) {

        Phaser.Sprite.call(this, game, x, y, "bomb");
        game.physics.arcade.enable(this);

        this.body.checkCollision = true;
        this.anchor.setTo(0.5, 0.5);

        gameScene = theGame;
    }

    Bomb.prototype = Object.create(Phaser.Sprite.prototype);
    Bomb.prototype.constructor = Bomb;

    Bomb.prototype.update = function () {
        calculateBombSpeed();

        this.game.physics.arcade.collide(this, gameScene.getPlayer(), collision, processCollision, this);

        this.position.x -= bombSpeed;
        if (this.position.x < 0) {
            this.destroy();
        }
    }

    function collision(obj1, obj2) {

    }

    // processCollision is called when the bomb and player bodies are touching AND overlap returns true.
    // obj1 will be the bomb, obj2 will be the player.
    function processCollision(bombSprite, playerSprite) { // Renamed parameters for clarity
        if (gameScene.getPlayer() && gameScene.getPlayer().isShielded) {
            // Player is shielded, bomb is destroyed, game does not end
            bombSprite.destroy(); // or this.destroy() if context is correctly bound
        } else {
            // Player is not shielded, game over
            gameScene.gameOver();
            bombSprite.destroy(); // or this.destroy()
        }
    }

    function calculateBombSpeed() {
        bombSpeed = gameScene.getSpeed() * 3;
    }

    return Bomb;

});