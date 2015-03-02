define([
    "Phaser"
], function (Phaser) {

    var BootState = function (game) {

    };

    BootState.prototype = {

        constructor: BootState,

        preload: function () {
            this.game.load.image("loading", "assets/loading.png");
        },

        create: function () {

            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.pageAlignHorizontally = true;
            this.scale.setScreenSize();

            this.game.state.start("Preload");
        }
    };

    return BootState;

});