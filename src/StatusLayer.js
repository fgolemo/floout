var StatusLayer = cc.Layer.extend({

    winsize: null,
    labels:{
        score: null,
        lifes: null,
        level: null,
        upgrades: null
    },
    ctor: function () {
        this._super();
        this.init();
    },

    init: function () {
        this._super();

        this.winsize = cc.director.getWinSize();
        this.drawLabels();
    },

    drawLabels: function() {
        this.drawLabel("level", "LEVEL", 1);
        this.drawLabel("lifes", "LIFES", 2);
        this.drawLabel("upgrades", "UPGRD", 3);
        this.drawLabel("score", "SCORE", 4);
    },

    drawLabel: function(name, title, posX) {
        this.labels[name] = cc.LabelTTF.create(title, "04b03b", 16);
        this.labels[name].setPosition(cc.p(this.winsize.width*(posX-1)/4+(this.winsize.width*1/8), this.winsize.height-10));
        //this.labels.score.retain();
        this.labels[name].setColor(cc.color(255,255,255));
        this.addChild(this.labels[name]);
    }

});
