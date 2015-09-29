var BackgroundLayer = cc.Layer.extend({

    space: null,
    ctor: function (space) {
        this._super();
        this.space = space;
        this.init();
    },

    init: function () {
        this._super();

        var winsize = cc.director.getWinSize();
        var centerpos = cc.p(winsize.width / 2, winsize.height / 2);

        var spritebg = new cc.Sprite(res.bg);
        spritebg.setPosition(centerpos);
        this.addChild(spritebg);
        this.setupWalls();
    },
    setupWalls: function(){
        // set up Walls
        var winsize = cc.director.getWinSize();
        var wallBottom = new cp.SegmentShape(this.space.staticBody,
            cp.v(g_borders.left, g_borders.bottom),// start point
            cp.v(winsize.width-g_borders.right, g_borders.bottom),// MAX INT:4294967295
            0);// thickness of wall
        //wallBottom.setElasticity(0.99);
        wallBottom.setCollisionType(CollisionTag.bottomWall);
        wallBottom.setSensor(true);
        this.space.addStaticShape(wallBottom);

        //var wallBottomLow = new cp.SegmentShape(this.space.staticBody,
        //    cp.v(0, 0),// start point
        //    cp.v(winsize.width, 0),// MAX INT:4294967295
        //    0);// thickness of wall
        //wallBottomLow.setElasticity(0.99);
        //this.space.addStaticShape(wallBottomLow);

        var wallTop = new cp.SegmentShape(this.space.staticBody,
            cp.v(g_borders.left, winsize.height-g_borders.top),// start point
            cp.v(winsize.width-g_borders.right, winsize.height-g_borders.top),// MAX INT:4294967295
            0);// thickness of wall
        wallTop.setElasticity(0.99);
        this.space.addStaticShape(wallTop);

        var wallLeft = new cp.SegmentShape(this.space.staticBody,
            cp.v(g_borders.left, g_paddleSize.y+1),// start point
            cp.v(g_borders.left, winsize.height-g_borders.top),// MAX INT:4294967295
            0);// thickness of wall
        wallLeft.setElasticity(0.99);
        this.space.addStaticShape(wallLeft);

        var wallRight = new cp.SegmentShape(this.space.staticBody,
            cp.v(winsize.width-g_borders.right, g_paddleSize.y+1),// start point
            cp.v(winsize.width-g_borders.right, winsize.height-g_borders.top),// MAX INT:4294967295
            0);// thickness of wall
        wallRight.setElasticity(0.99);
        this.space.addStaticShape(wallRight);

    }

});
