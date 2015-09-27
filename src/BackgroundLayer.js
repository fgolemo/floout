var BackgroundLayer = cc.Layer.extend({

    ctor: function (space) {
        this._super();

        this.init();
    },

    init: function () {
        this._super();

        var winsize = cc.director.getWinSize();
        var centerpos = cc.p(winsize.width / 2, winsize.height / 2);

        var spritebg = new cc.Sprite(res.bg);
        spritebg.setPosition(centerpos);
        this.addChild(spritebg);
    }

});
