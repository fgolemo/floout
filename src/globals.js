g_borders = {
    top: 55,
    bottom: 50,
    left: 5,
    right: 5
};

g_paddleSize = {
    x: 55,
    y: 55
};

if (typeof TagOfLayer == "undefined") {
    var TagOfLayer = {};
    TagOfLayer.background = 0;
    TagOfLayer.Animation = 1;
    TagOfLayer.LevelLayer = 2;
    TagOfLayer.GameLayer = 3;
    TagOfLayer.Status = 4;
}

if (typeof CollisionTag == "undefined") {
    var CollisionTag = {};
    CollisionTag.bottomWall = 0;
}
