var AnimationLayer = cc.Layer.extend({
    space: null,
    paddleBody: null,
    paddleShape: null,
    paddleSprite: null,
    winsize: null,
    centerpos: null,

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

        this.winsize = cc.director.getWinSize();
        this.centerpos = cc.p(this.winsize.width / 2, this.winsize.height / 2);

        this.initPaddle();

        this.scheduleUpdate();
    },

    onExit: function () {
        this._super();
    },

    initAction: function () {
        //prepare animations here
    },

    update: function (dt) {

    },

    initPaddle: function () {
        this.paddleSprite = new cc.PhysicsSprite(res.paddle);
        var paddleSize = this.paddleSprite.getContentSize();
        this.paddleBody = new cp.Body(1, cp.momentForBox(1, paddleSize.width, paddleSize.height));
        this.paddleBody.p = cc.p(this.centerpos.x, paddleSize.height / 2);
        //this.paddleBody.p = centerpos;
        //this.paddleBody.applyImpulse(cp.v(100, 100), cp.v(0, 10));//run speed
        this.space.addBody(this.paddleBody);
        this.paddleShape = new cp.BoxShape(this.paddleBody, paddleSize.width, paddleSize.height);
        this.paddleShape.setElasticity(0.99);
        this.space.addShape(this.paddleShape);

        this.paddleSprite.setBody(this.paddleBody);
        //this.paddleSprite.runAction(this.runningAction);

        this.addChild(this.paddleSprite);
    }
});