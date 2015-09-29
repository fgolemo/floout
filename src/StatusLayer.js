var StatusLayer = cc.Layer.extend({

    winsize: null,
    labels:{
        score: null,
        lifes: null,
        level: null,
        upgrades: null
    },
    scores:{
        score: null,
        lifes: null,
        level: null,
        upgrades: null
    },
    scoreValues:{
        score: "0",
        lifes: 3,
        level: 1,
        upgrades: []
    },

    realsies: true,
    ctor: function (realsies) {
        this._super();
        self.realsies = realsies;
        this.init();

    },

    init: function () {
        this._super();

        this.winsize = cc.director.getWinSize();
        this.drawLabels();
        if (this.realsies) {
            this.drawScores();
        }
    },

    drawLabels: function() {
        this.drawLabel("level", "LEVEL", 1);
        this.drawLabel("lifes", "LIFES", 2);
        this.drawLabel("upgrades", "UPGRD", 3);
        this.drawLabel("score", "SCORE", 4);
    },

    drawLabel: function(name, title, posX) {
        this.labels[name] = cc.LabelTTF.create(title, "04b03b", 20);
        this.labels[name].setPosition(cc.p(this.winsize.width*(posX-1)/4+(this.winsize.width*1/8), this.winsize.height-12));
        //this.labels.score.retain();
        this.labels[name].setColor(cc.color(200,200,200));
        this.addChild(this.labels[name]);
    },

    drawScores: function() {
        this.drawScore("level", 1);
        this.drawScore("lifes", 2);
        this.drawScore("upgrades", 3);
        this.drawScore("score", 4);
    },

    drawScore: function(name, posX) {
        text = this.scoreValues[name];
        console.log(text);
        if (typeof text == "object") {
            text = text.join("+");
        }
        this.scores[name] = cc.LabelTTF.create(text, "04b03b", 28);
        this.scores[name].setPosition(cc.p(this.winsize.width*(posX-1)/4+(this.winsize.width*1/8), this.winsize.height-38));
        //this.labels.score.retain();
        this.scores[name].setColor(cc.color(255,255,255));
        this.addChild(this.scores[name]);
    },

    removeLife:function () {
        this.scoreValues["lifes"] -= 1;
        this.updateLife();
    },

    addLife:function () {
        this.scoreValues["lifes"] += 1;
        this.updateLife();
    },

    updateLife: function() {
        this.scores.lifes.setString(this.scoreValues["lifes"]);
    }

});
