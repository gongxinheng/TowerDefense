var TILESIZE        = 32;  // 格子大小
var SCREENWIDTH     = 640; // 屏幕宽
var SCREENHEIGHT    = 960; // 屏幕高
var MAPWIDTH        = 640; // 地图宽
var MAPHEIGHT       = 832; // 地图高
var MAPROW          = 26;  // 地图行数
var MAPCOLUMN = 20;  // 地图列数
var MAPSTARTTILEX   = 0;   // 地图起始格X
var MAPSTARTTILEY   = 2;   // 地图起始格Y

var PREFIXOFREALTOWER = "spritetower"; // 塔精灵的名前缀

// (26 + 4) * 20，包括上下的UI占用
//var MAPDATA = [
//    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//    [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//    [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
//    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
//    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
//    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
//    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
//    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
//    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
//    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
//    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
//    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
//    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
//    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
//    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
//    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
//    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
//    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
//    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
//    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
//    [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//    [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
//];
var MAPDATA = [
[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, ],
[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, ],
[1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, ],
[1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, ],
[1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, ],
[1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, ],
[1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, ],
[1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, ],
[1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, ],
[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, ],
[1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, ],
[1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, ],
[1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, ],
[1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, ],
[1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, ],
[1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, ],
[1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, ],
[1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, ],
[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, ],
[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, ],
];

// 地图逆转
//        print("var MAPDATA = [");
//        for (var i = 0; i < MAPDATA[0].length; ++i) {
//            var line = "[";
//            for (var j = 0; j < MAPDATA.length; ++j) {
//                line += MAPDATA[j][i];
//                line += ",";
//            }
//            line += "],";
//            print(line);
//        }
//        print("];");

// 上下左右四个入口点的初始位置地图行列坐标
var DIRINITPOSMAPCOOR = [
	{'x':0, 'y':10}, {'x':25, 'y':10}, {'x':12, 'y':0}, {'x':12, 'y':19}
];

/**
*根据传入坐标返回格子所在的行列数
*x x轴坐标
*y y轴坐标 
*/
function CalcTilePos(x, y) {
    var pos = new Array();
    pos["x"] = Math.floor(x / TILESIZE);
    pos["y"] = Math.floor(y / TILESIZE);

    return pos;
}

/**
*检测h * v的格子范围是否在起点为tileX, tileY的格子中有效
*tileX x轴格子的位置
*tileY y轴格子的位置 
*h 横向格子数
*v 纵向格子数
*isAnc 是否需要修正锚点
*/
function CheckAreaValid(tileX, tileY, h, v, isAnc) {
    if (isAnc) {
        if (tileX > 0) {
            tileX -= 1
        }
        if (tileY > 0) {
            tileY -= 1
        }
    }
    for (var i = 0; i < h; ++i) {
        for (var j = 0; j < v; ++j) {
            if (MAPDATA[tileX + i][tileY + j] != 0) {
                return false;
            }
        }
    }

    return true;
}

/**
*在起点为tileX, tileY的格子中设置h * v的格子范围的标记
*tileX x轴格子的位置
*tileY y轴格子的位置 
*h 横向格子数
*v 纵向格子数
*flag 设置的标记值
*isAnc 是否需要修正锚点
*/
function SetAreaFlag(tileX, tileY, w, v, flag, isAnc) {
    for (var i = 0; i < v; ++i) {
        for (var j = 0; j < v; ++j) {
            MAPDATA[tileX + i][tileY + j] = flag;
        }
    }
}

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
        var mapObj = root.getChildByTag(10001);
        this.m_mapCom = mapObj.getComponentJS("GameMap");
        //var tilepos = this.m_mapCom.getTileIndexInLayer("BG", 1, 1);
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
                        print("Build!!!!!!");
                        var idNewTower = self.gameworld.buildTower(self.uiBuild.numberSelectedTowerType, self.selectedTilePos.x, self.selectedTilePos.y);
                        // 将塔添加到地图中
                        self.addTowerToMap(idNewTower, self.uiBuild.numberSelectedTowerType, self.selectedTilePos.x, self.selectedTilePos.y);
                    }
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

        var tilepos = CalcTilePos(x, y); // this.m_mapCom.getTileIndexInLayer("BG", x, y);

        if (!this.uiBuild.isShow) {
            if (CheckAreaValid(tilepos.x, tilepos.y, 2, 2, true)) {
                this.selectedTilePos = tilepos;
                print("x=" + tilepos.x + "y=" + tilepos.y);

                pos.x = tilepos["x"] * TILESIZE;
                pos.y = tilepos["y"] * TILESIZE;
                print("posY= " + pos.y);
                this.selectionframe.setAnchorPoint(0, 0);
                this.selectionframe.setVisible(true);
                this.selectionframe.setPosition(pos);

                pos.x = 300;
                pos.y = 300;
                this.uiBuild.setPosition(pos);
                this.uiBuild.setVisible(true);
            }
        }
    },

    /**
    *添加炮塔到场景（界面）
    *id 添加的塔ID
    *type 添加的塔类型
    *tileX 添加到地图的格子位置x轴索引
    *tileY 添加到地图的格子位置Y轴索引
    *return 是否添加成功
    */
    addTowerToMap: function (id, type, tileX, tileY) {
        if (!CheckAreaValid(tileX, tileY, 2, 2, true)) {
            print("Failed!!" + tileX + " " + tileY + "!=" + MAPDATA[tileY][tileX]);
            return false;
        }
        t = CreateGameObjectFromTemplate("spritetower" + type);
        var pos = new GLKVector4();
        pos.x = tileX * TILESIZE;
        pos.y = tileY * TILESIZE;
        t.setPosition(pos);
        var root = GetRootGameObj();
        root.addChild(t);
        this.towerUI[id] = t;
        //t.removeFromParent();
        print("build tower id =" + id + "type =" + type);

        SetAreaFlag(tileX, tileY, 2, 2, type + 1, true);
        this.gameworld.startDefense();
        return true;
    },

    /**
    *添加敌人到场景（界面）
    *id 添加的敌人ID
    *type 添加的敌人类型
    *tileX 添加到地图的格子位置x轴索引
    *tileY 添加到地图的格子位置Y轴索引
    */
    addEnemyToMap: function (id, type, tileX, tileY) {
        if (MAPDATA[tileX][tileY] != 0) {
            return false;
        }

        t = CreateGameObjectFromTemplate("spritesenemy" + type);
        var pos = new GLKVector4();
        pos.x = tileX * TILESIZE;
        pos.y = tileY * TILESIZE;
        t.setPosition(pos);
        var root = GetRootGameObj();
        root.addChild(t);
        this.enemyUI[id] = t;
        //t.removeFromParent();
        print("add enemy id =" + id + "type =" + type);

        return true;
    },

    /**
    *更新敌人位置
    *id 敌人ID
    *dir 敌人的方向
    *x 更新的敌人X坐标
    *y 更新的敌人Y坐标
    */
    updateEnemyPos: function (id, dir, x, y) {
        var enemy = this.enemyUI[id];
        var pos = new GLKVector4();
        pos.x = x;
        pos.y = y;
        enemy.setPosition(pos);
        enemySprite = enemy.getComponentJS("4feetMonster");
        enemySprite.setAction(dir);
    }
});