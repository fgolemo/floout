var MenuLayer = cc.Layer.extend({
    ctor: function () {
        //1. call super class's ctor function
        this._super();
    },
    init: function () {
        //call super class's super function
        this._super();

        //2. get the screen size of your game canvas
        var winsize = cc.director.getWinSize();

        //3. calculate the center point
        var centerpos = cc.p(winsize.width / 2, winsize.height / 2);
        var buttonpos = cc.p(winsize.width / 2, winsize.height / 4);

        //4. create a background image and set it's position at the center of the screen
        var spritebg = new cc.Sprite(res.bg);
        spritebg.setPosition(centerpos);
        this.addChild(spritebg);

        var logo = new cc.Sprite(res.logo);
        logo.setPosition(cc.p(winsize.width / 2, winsize.height *1/2));
        this.addChild(logo);

        //5.
        cc.MenuItemFont.setFontSize(60);

        //6.create a menu and assign onPlay event callback to it
        var menuItemPlay = new cc.MenuItemSprite(
            new cc.Sprite(res.button_start1), // normal state image
            new cc.Sprite(res.button_start2), //select state image
            this.onPlay, this);
        var menu = new cc.Menu(menuItemPlay);  //7. create the menu
        menu.setPosition(buttonpos);
        this.addChild(menu);

        this.addChild(new StatusLayer(), 0, TagOfLayer.Status);
    },

    onPlay: function () {
        cc.log("==onplay clicked");
        cc.director.runScene(new PlayScene());
    }
});

var MenuScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new MenuLayer();
        layer.init();
        this.addChild(layer);
    }
});
