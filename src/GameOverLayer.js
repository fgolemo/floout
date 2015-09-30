var GameOverLayer = cc.LayerColor.extend({
    ctor: function () {
        this._super();
        this.init();
    },
    init: function () {
        this._super(cc.color(0, 0, 0, 180));
        var winSize = cc.director.getWinSize();

        var centerPos = cc.p(winSize.width / 2, winSize.height / 2);
        cc.MenuItemFont.setFontSize(30);
        var menuItemRestart = new cc.MenuItemSprite(
            new cc.Sprite(res.button_restart1),
            new cc.Sprite(res.button_restart2),
            this.onRestart, this);
        var menu = new cc.Menu(menuItemRestart);
        menu.setPosition(centerPos);
        this.addChild(menu);
    },
    onRestart: function (sender) {
        cc.director.resume();
        var playsceneNew = new PlayScene();
        cc.director.runScene(playsceneNew);


    }
});