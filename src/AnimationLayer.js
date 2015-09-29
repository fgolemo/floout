var AnimationLayer = cc.Layer.extend({
    space: null,
    paddleBody: null,
    paddleShape: null,
    paddleSprite: null,
    paddleSize: null,
    winsize: null,
    centerpos: null,
    ballBody: null,
    ballShape: null,
    ballSprite: null,
    ballSize: null,
    ballLaunched: false,

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
        this.initBall();
        this.schedule(this.fireBall, 1);

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

    initBall: function () {
        this.ballSprite = new cc.PhysicsSprite(res.ball);
        this.ballSize = this.ballSprite.getContentSize();
        this.ballBody = new cp.Body(1, cp.momentForBox(g_maxint, this.ballSize.width, this.ballSize.height));
        this.ballBody.p = cc.p(
            this.centerpos.x + this.paddleSize.width / 2 - this.ballSize.width / 2,
            this.paddleSize.height + this.ballSize.height / 2
        );
        this.space.addBody(this.ballBody);
        this.ballShape = new cp.BoxShape(this.ballBody, this.ballSize.width, this.ballSize.height);
        this.ballShape.setElasticity(0.999);
        this.ballShape.setCollisionType(CollisionTag.ball);
        this.space.addShape(this.ballShape);

        this.ballSprite.setBody(this.ballBody);
        //this.ballSprite.runAction(this.runningAction);

        this.addChild(this.ballSprite);
        this.space.addCollisionHandler(CollisionTag.wallBottom, CollisionTag.ball,
            this.collisionGroundBegin.bind(this), null, null, null);
    },

    initPaddle: function () {
        this.paddleSprite = new cc.PhysicsSprite(res.paddle);
        this.paddleSize = this.paddleSprite.getContentSize();
        this.paddleBody = new cp.Body(g_maxint, cp.momentForCircle(g_maxint, this.paddleSize.width / 2, 0, cp.v(0, 0)));
        this.paddleBody.p = cc.p(this.centerpos.x, this.paddleSize.height / 2);

        //this.space.addBody(this.paddleBody);
        //this.paddleShape = new cp.CircleShape(this.paddleBody, this.paddleSize.width*3/4, cp.v(0,0));
        this.paddleShape = new cp.CircleShape(this.paddleBody, this.paddleSize.width * 2, cp.v(0, -this.paddleSize.height * 12 / 8));
        this.paddleShape.setElasticity(0.99);
        this.paddleShape.setCollisionType(CollisionTag.paddle);
        this.space.addShape(this.paddleShape);

        this.paddleSprite.setBody(this.paddleBody);
        //this.paddleSprite.runAction(this.runningAction);

        this.addChild(this.paddleSprite);

        var scope = this;
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ALL_AT_ONCE,
            onTouchesMoved: function (touches, event) {
                var touch = touches[0];
                var delta = touch.getDelta();
                delta.y = 0;
                //var node = event.getCurrentTarget().getChildByTag(TAG_TILE_MAP);
                var node = scope.paddleSprite;
                var diff = cc.pAdd(delta, node.getPosition());
                if (diff.x < scope.paddleSize.width / 2) {
                    diff.x = scope.paddleSize.width / 2;
                }
                if (diff.x > scope.winsize.width - scope.paddleSize.width / 2) {
                    diff.x = scope.winsize.width - scope.paddleSize.width / 2;
                }
                node.setPosition(diff);
            }
        }, this);
    },

    fireBall: function () {
        if (!this.ballLaunched) {
            console.log("firing ball");
            this.ballBody.applyImpulse(cp.v(200, 400), cp.v(0, 0));
            this.ballLaunched = true;
        }
    },

    collisionGroundBegin: function (arbiter, space) {
        console.log("ball is out");
        this.ballBody.setVel(cp.v(0, 0));
    }
});