var PlayScene = cc.Scene.extend({
    space: null,
    shapesToRemove: [],
    gameLayer: null,

    // init space of chipmunk
    initPhysics: function () {
        this.space = new cp.Space();
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