var PlayScene = cc.Scene.extend({
    space: null,
    shapesToRemove: [],
    gameLayer: null,

    // init space of chipmunk
    initPhysics: function () {
        this.space = new cp.Space();
        // set up Walls
        var winsize = cc.director.getWinSize();
        var wallBottom = new cp.SegmentShape(this.space.staticBody,
            cp.v(0, g_borders.bottom),// start point
            cp.v(4294967295, g_borders.bottom),// MAX INT:4294967295
            0);// thickness of wall
        this.space.addStaticShape(wallBottom);

        var wallTop = new cp.SegmentShape(this.space.staticBody,
            cp.v(0, winsize.height-g_borders.top),// start point
            cp.v(4294967295, winsize.height-g_borders.top),// MAX INT:4294967295
            0);// thickness of wall
        this.space.addStaticShape(wallTop);

        var wallLeft = new cp.SegmentShape(this.space.staticBody,
            cp.v(g_borders.left, 0),// start point
            cp.v(g_borders.left, 4294967295),// MAX INT:4294967295
            0);// thickness of wall
        this.space.addStaticShape(wallLeft);

        var wallRight = new cp.SegmentShape(this.space.staticBody,
            cp.v(winsize.width-g_borders.right, 0),// start point
            cp.v(winsize.width-g_borders.right, 4294967295),// MAX INT:4294967295
            0);// thickness of wall
        this.space.addStaticShape(wallRight);

    },

    onEnter: function () {
        this._super();
        this.initPhysics();

        this.addChild(new BackgroundLayer(this.space), 0, TagOfLayer.background);
        this.gameLayer = new cc.Layer();
        this.gameLayer.addChild(new AnimationLayer(this.space), 0, TagOfLayer.Animation);
        this.addChild(this.gameLayer);
        //this.addChild(new StatusLayer(), 0, TagOfLayer.Status);

        this.scheduleUpdate();

    },
    update: function (dt) {
        // chipmunk step
        this.space.step(dt);

    }
});