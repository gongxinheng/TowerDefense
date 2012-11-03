var TILESIZE        = 64;  // 格子大小
var SCREENWIDTH     = 960; // 屏幕宽
var SCREENHEIGHT    = 640; // 屏幕高

var PREFIXOFREALTOWER = "spritetower"; // 塔精灵的名前缀

var GameMap = Class(object, {
    onCreate: function (objectTag) {
        this.towerUI = [];  // 地图上可见的塔
        this.enemyUI = [];  // 地图上可见的敌人
        this.uiBuild = new UIBuild(15000);
        this.gameworld = new GameWorld();
        this.sprites = CreateGameObjectFromTemplate("sprites");
        this.selectionframe = GetSubComponent(10002, "selection");
        this.selectedTilePos = { 'x': 0, 'y': 0 }; // 选中的格子位置

        var root = GetRootGameObj();
        this.selectionframe.setVisible(false); // 先隐藏
        this.selectionframe.setAnchorPoint(1, 1); // 设置锚点

        var input = GetSubComponent(10001, "locationinput");

        root.addChild(this.sprites);
        root.addChild(root.getChildByTag(10002)); // 选择框
        print(this.selectionframe);
        var self = this;
        input.MultiTouchPressed = function (touches) {
            self.multiTouchPressed(touches);
        };
        input.TouchPressed = function (x, y) {
            self.singleTouchPressed(x, y);
        };

        // 设置建造界面确认的回调
        this.uiBuild.btnOKCallback = function () {
            // 建造塔
            if (self.uiBuild.numberSelectedTowerType != null) {
                // 检查是否允许建造
                if (self.gameworld.isBuildEnable) {
                    // 检测是否堵口
                    if (self.gameworld.checkIsCanBuild()) {
                        var idNewTower = self.gameworld.buildTower(self.uiBuild.numberSelectedTowerType, self.selectedTilePos.x, self.selectedTilePos.y);
                        // 将塔添加到地图中
                        self.addTowerToMap(idNewTower, self.uiBuild.numberSelectedTowerType, self.selectedTilePos.x, self.selectedTilePos.y);
                    }

                    // 把塔添加到地图
                    self.addTowerToMap(self.selectedTilePos.x, self.selectedTilePos.y);
                    // 重置选中的建造塔类型
                    self.uiBuild.numberSelectedTowerType = null;
                }
            }
        };
    },

    multiTouchPressed: function (touches) {
        print("multiTouchPressed");
    },

    singleTouchPressed: function (x, y) {
        print("I am " + this.uiBuild.isShow);
        var pos = new GLKVector4();
        var root = GetRootGameObj();
        var tilepos = this.calcTilePos(x, y);
        if (!this.uiBuild.isShow) {
            this.selectedTilePos = tilepos;
            print("x=" + x + "y=" + y);

            pos.x = tilepos["x"] * TILESIZE + TILESIZE / 2;
            pos.y = tilepos["y"] * TILESIZE + TILESIZE / 2;
            this.selectionframe.setVisible(true);
            this.selectionframe.setPosition(pos);

            pos.x = 300;
            pos.y = 300;
            this.uiBuild.setPosition(pos);
            this.uiBuild.setVisible(true);
        }
    },

    /**
    *根据传入坐标返回格子所在的行列数
    *x x轴坐标
    *y y轴坐标 
    */
    calcTilePos: function (x, y) {
        var pos = new Array();
        pos["x"] = Math.floor(x / TILESIZE);
        pos["y"] = Math.floor(y / TILESIZE);

        return pos;
    },

    /**
    *添加炮塔到场景（界面）
    *id 添加的塔ID
    *type 添加的塔类型
    *tileX 添加到地图的格子位置x轴索引
    *tileY 添加到地图的格子位置Y轴索引
    */
    addTowerToMap: function (id, type, tileX, tileY) {
        t = CreateGameObjectFromTemplate("spritetower" + this.uiBuild.numberSelectedTowerType);
        var pos = new GLKVector4();
        pos.x = tileX * TILESIZE + TILESIZE / 2;
        pos.y = tileY * TILESIZE + TILESIZE / 2;
        t.setPosition(pos);
        var root = GetRootGameObj();
        root.addChild(t);
        this.towerUI[id] = t;
        t.removeFromParent();
        print("build tower id =" + id + "type =" + type);

        this.gameworld.startDefense();
    }
});