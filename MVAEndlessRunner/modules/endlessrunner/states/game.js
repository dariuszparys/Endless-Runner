define([
    "Phaser",
    "units/player",
    "units/bomb",
    "units/shield"
], function (Phaser, Player, Bomb, Shield) {

    var tileSpriteMoveSpeed;
    var meterSpeed;
    var meters;
    var tileSprite;
    var hudMeters;

    var player;
    var cursors;
    var collisionDetected = false;
    var shields; 

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
            player.isShielded = false; 

            shields = this.game.add.group();
            shields.enableBody = true;

            hudMeters = this.game.add.text(10, 10, "Meter: 0 m", {
                font: "30px Arial",
                fill: "#ffaa44",
                align: "left"
            });

            
        },

        init: function () {            
            this.game.time.events.loop(Phaser.Timer.SECOND * 0.5, this.createBomb, this);
            this.game.time.events.loop(Phaser.Timer.SECOND * 10, this.createShield, this);
            this.game.time.events.loop(Phaser.Timer.SECOND * 10, this.speedUp);
        },

        update: function () {
            this.game.physics.arcade.overlap(player, shields, this.playerHitShield, null, this);

            tileSprite.tilePosition.x -= tileSpriteMoveSpeed;
            meters += meterSpeed;

            //if (cursors.up.isDown) {
            //    player.position.y -= 8;
            //} else if (cursors.down.isDown) {
            //    player.position.y += 8;
        	//}

            if (player.body) {
            	this.game.physics.arcade.moveToPointer(
					player,
					60,
					this.game.input.activePointer,
					500);
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
        },

        createShield: function () {
            var shield = shields.create(1000, this.game.world.randomY, "shield");
            if (shield) { // Check if shield was successfully created
                 // Apply a tint to differentiate from bombs. Green is a common shield color.
                shield.tint = 0x00ff00; // Green tint
                var shieldInstance = new Shield(this.game, shield.x, shield.y, this);
                shield.destroy(); // Remove the sprite created by group.create
                this.game.add.existing(shieldInstance); // Add the proper Shield instance
                shields.add(shieldInstance); // Add it to the group for collision detection
            }
        },

        playerHitShield: function (playerObj, shield) {
            shield.destroy(); 
            
            if (player) { 
                player.isShielded = true; 
                // Optional: Add visual feedback for shield activation, e.g., player.tint = 0x00ff00;
                this.game.time.events.add(Phaser.Timer.SECOND * 3, this.removeShieldProtection, this, player); 
            }
        },

        removeShieldProtection: function (playerObj) {
            // Access the main player object from the GameState, or use the passed argument
            var shieldedPlayer = playerObj || player; // Prefer passed playerObj if available
            if (shieldedPlayer) {
                shieldedPlayer.isShielded = false;
                // Optional: Remove visual feedback, e.g., player.tint = 0xffffff; // Reset tint
            }
        },
    };

    return GameState;

}); 