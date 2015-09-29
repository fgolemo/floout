var AnimationLayer = cc.Layer.extend({
    space: null,
    paddleBody: null,
    paddleShape: null,
    paddleSprite: null,

    ctor: function (space) {
        this._super();
        this.space = space;
        this.init();

        this._debugNode = new cc.PhysicsDebugNode(this.space);
        this._debugNode.setVisible(true);
        this.addChild(this._debugNode, 10);
    },
    init: function () {
        this._super();

        //init  actions
        this.initAction();

        var winsize = cc.director.getWinSize();
        var centerpos = cc.p(winsize.width / 2, winsize.height / 2);

        this.paddleSprite = new cc.PhysicsSprite(res.paddle);
        var paddleSize = this.paddleSprite.getContentSize();
        this.paddleBody = new cp.Body(1, cp.momentForBox(1, paddleSize.width, paddleSize.height));
        //this.paddleBody.p = cc.p(0,0);
        this.paddleBody.p = centerpos;
        this.paddleBody.applyImpulse(cp.v(100, 100), cp.v(0, 10));//run speed
        this.space.addBody(this.paddleBody);
        //init shape
        this.paddleShape = new cp.BoxShape(this.paddleBody, paddleSize.width, paddleSize.height);
        this.paddleShape.setElasticity(0.9);
        this.space.addShape(this.paddleShape);

        this.paddleSprite.setBody(this.paddleBody);
        //this.paddleSprite.runAction(this.runningAction);

        this.addChild(this.paddleSprite);


        this.scheduleUpdate();
    },

    onExit: function () {
        this._super();
    },

    initAction: function () {
        //prepare animations here
    },

    update: function (dt) {

    }

});