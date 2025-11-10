define([
    "Phaser",
    "leaderboard"
], function (Phaser, Leaderboard) {

    var finalScore;
    var finalMeters;
    var finalCoins;

    var GameOverState = function (game) {

    };

    GameOverState.prototype = {

        constructor: GameOverState,

        init: function (meters, coins) {

            finalMeters = meters || 0;
            finalCoins = coins || 0;
            finalScore = Leaderboard.calculateScore(finalMeters, finalCoins);

            // Add to leaderboard
            Leaderboard.addScore(finalMeters, finalCoins);

        },

        create: function () {
            // Game Over title
            var titleText = this.game.add.text(this.game.world.centerX, 50,
                "GAME OVER", {
                    font: "bold 60px Arial",
                    fill: "#ff4444",
                    align: "center"
                });
            titleText.anchor.setTo(0.5, 0.5);

            // Your Score
            var scoreText = this.game.add.text(this.game.world.centerX, 130,
                "Your Score: " + finalScore, {
                    font: "40px Arial",
                    fill: "#ffaa44",
                    align: "center"
                });
            scoreText.anchor.setTo(0.5, 0.5);

            // Breakdown
            var breakdownText = this.game.add.text(this.game.world.centerX, 170,
                "(" + Math.floor(finalMeters) + "m × 10 + " + finalCoins + " coins × 100)", {
                    font: "20px Arial",
                    fill: "#aaaaaa",
                    align: "center"
                });
            breakdownText.anchor.setTo(0.5, 0.5);

            // Leaderboard title
            var leaderboardTitle = this.game.add.text(this.game.world.centerX, 220,
                "LEADERBOARD", {
                    font: "bold 30px Arial",
                    fill: "#ffffff",
                    align: "center"
                });
            leaderboardTitle.anchor.setTo(0.5, 0.5);

            // Display leaderboard
            this.displayLeaderboard();

            // Play Again button
            var playButton = this.game.add.button(this.game.world.centerX - 80,
                this.game.height - 80, "play",
                this.play, this);
            playButton.anchor.setTo(0.5, 0.5);

            // Clear Leaderboard button (text button)
            var clearButton = this.game.add.text(this.game.world.centerX + 80,
                this.game.height - 80, "Clear Board", {
                    font: "20px Arial",
                    fill: "#ff6666",
                    align: "center"
                });
            clearButton.anchor.setTo(0.5, 0.5);
            clearButton.inputEnabled = true;
            clearButton.input.useHandCursor = true;
            clearButton.events.onInputDown.add(this.clearLeaderboard, this);
        },

        displayLeaderboard: function () {
            var leaderboard = Leaderboard.getLeaderboard();
            var startY = 260;
            var lineHeight = 35;

            if (leaderboard.length === 0) {
                var emptyText = this.game.add.text(this.game.world.centerX, startY + 50,
                    "No scores yet. Be the first!", {
                        font: "20px Arial",
                        fill: "#888888",
                        align: "center"
                    });
                emptyText.anchor.setTo(0.5, 0.5);
                return;
            }

            // Header
            var headerText = this.game.add.text(this.game.world.centerX, startY,
                "Rank    Score       Meters    Coins", {
                    font: "bold 18px Courier",
                    fill: "#aaaaaa",
                    align: "center"
                });
            headerText.anchor.setTo(0.5, 0.5);

            // Entries
            for (var i = 0; i < Math.min(leaderboard.length, 10); i++) {
                var entry = leaderboard[i];
                var rank = (i + 1).toString();
                var score = entry.score.toString();
                var meters = entry.meters.toString() + "m";
                var coins = entry.coins.toString();

                // Pad the text for alignment
                var entryText = this.padString(rank, 4) + "    " +
                               this.padString(score, 8) + "    " +
                               this.padString(meters, 8) + "    " +
                               coins;

                var color = "#ffffff";
                if (i === 0) color = "#FFD700"; // Gold for first
                else if (i === 1) color = "#C0C0C0"; // Silver for second
                else if (i === 2) color = "#CD7F32"; // Bronze for third

                var text = this.game.add.text(this.game.world.centerX, startY + lineHeight * (i + 1),
                    entryText, {
                        font: "18px Courier",
                        fill: color,
                        align: "center"
                    });
                text.anchor.setTo(0.5, 0.5);
            }
        },

        padString: function (str, length) {
            str = str.toString();
            while (str.length < length) {
                str = " " + str;
            }
            return str;
        },

        clearLeaderboard: function () {
            Leaderboard.clearLeaderboard();
            this.game.state.restart();
        },

        play: function () {
            this.game.state.start("Game");
        }
    };

    return GameOverState;

});
