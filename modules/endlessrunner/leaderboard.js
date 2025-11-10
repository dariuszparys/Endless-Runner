define([], function () {

    var LEADERBOARD_KEY = "endlessRunnerLeaderboard";
    var MAX_ENTRIES = 10;

    var Leaderboard = {

        // Add a new score to the leaderboard
        addScore: function (meters, coins) {
            var score = this.calculateScore(meters, coins);
            var entry = {
                score: score,
                meters: Math.floor(meters),
                coins: coins,
                date: new Date().toISOString()
            };

            var leaderboard = this.getLeaderboard();
            leaderboard.push(entry);

            // Sort by score (descending)
            leaderboard.sort(function (a, b) {
                return b.score - a.score;
            });

            // Keep only top MAX_ENTRIES
            leaderboard = leaderboard.slice(0, MAX_ENTRIES);

            // Save to localStorage
            this.saveLeaderboard(leaderboard);

            // Return the rank (1-based index)
            var rank = -1;
            for (var i = 0; i < leaderboard.length; i++) {
                if (leaderboard[i].date === entry.date) {
                    rank = i + 1;
                    break;
                }
            }
            return rank;
        },

        // Get the leaderboard from localStorage
        getLeaderboard: function () {
            try {
                var data = localStorage.getItem(LEADERBOARD_KEY);
                if (data) {
                    return JSON.parse(data);
                }
            } catch (e) {
                console.error("Error loading leaderboard:", e);
            }
            return [];
        },

        // Save leaderboard to localStorage
        saveLeaderboard: function (leaderboard) {
            try {
                localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(leaderboard));
            } catch (e) {
                console.error("Error saving leaderboard:", e);
            }
        },

        // Clear the leaderboard
        clearLeaderboard: function () {
            try {
                localStorage.removeItem(LEADERBOARD_KEY);
            } catch (e) {
                console.error("Error clearing leaderboard:", e);
            }
        },

        // Calculate score from meters and coins
        calculateScore: function (meters, coins) {
            return Math.floor(meters * 10) + (coins * 100);
        },

        // Check if a score makes it to the leaderboard
        isHighScore: function (meters, coins) {
            var score = this.calculateScore(meters, coins);
            var leaderboard = this.getLeaderboard();

            if (leaderboard.length < MAX_ENTRIES) {
                return true;
            }

            return score > leaderboard[leaderboard.length - 1].score;
        }
    };

    return Leaderboard;

});
