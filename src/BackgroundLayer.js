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
    setupWalls: function () {
        // set up Walls
        var winsize = cc.director.getWinSize();
        var wallBottom = new cp.SegmentShape(this.space.staticBody,
            cp.v(g_borders.left, g_borders.bottom - g_borders.bottom_discrepancy-2),// start point
            cp.v(winsize.width - g_borders.right, g_borders.bottom - g_borders.bottom_discrepancy-2),// MAX INT:4294967295
            4); // wall thickness
        wallBottom.setCollisionType(CollisionTag.wallBottom);
        wallBottom.setSensor(true);
        this.space.addStaticShape(wallBottom);

        var wallTop = new cp.SegmentShape(this.space.staticBody,
            cp.v(g_borders.left, winsize.height - g_borders.top+2),
            cp.v(winsize.width - g_borders.right, winsize.height - g_borders.top+2),
            4);
        wallTop.setElasticity(0.99);
        wallTop.setCollisionType(CollisionTag.wallNormal);
        this.space.addStaticShape(wallTop);

        var wallLeft = new cp.SegmentShape(this.space.staticBody,
            cp.v(g_borders.left-2, g_paddleSize.y + 1),
            cp.v(g_borders.left-2, winsize.height - g_borders.top),
            4);
        wallLeft.setElasticity(0.99);
        wallLeft.setCollisionType(CollisionTag.wallNormal);
        this.space.addStaticShape(wallLeft);

        var wallRight = new cp.SegmentShape(this.space.staticBody,
            cp.v(winsize.width - g_borders.right+2, g_paddleSize.y + 1),// start point
            cp.v(winsize.width - g_borders.right+2, winsize.height - g_borders.top),// MAX INT:4294967295
            4);// thickness of wall
        wallRight.setElasticity(0.99);
        wallRight.setCollisionType(CollisionTag.wallNormal);
        this.space.addStaticShape(wallRight);

    }

});
