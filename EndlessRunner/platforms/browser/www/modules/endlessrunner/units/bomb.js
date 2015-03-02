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

    function processCollision(obj1, obj2) {
        gameScene.gameOver();
        this.destroy();
    }

    function calculateBombSpeed() {
        bombSpeed = gameScene.getSpeed() * 3;
    }

    return Bomb;

});