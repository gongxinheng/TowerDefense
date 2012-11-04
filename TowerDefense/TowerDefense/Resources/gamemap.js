var TILESIZE        = 32;  // ���Ӵ�С
var SCREENWIDTH     = 640; // ��Ļ��
var SCREENHEIGHT    = 960; // ��Ļ��
var MAPWIDTH        = 640; // ��ͼ��
var MAPHEIGHT       = 832; // ��ͼ��
var MAPROW          = 26;  // ��ͼ����
var MAPCOLUMN = 20;  // ��ͼ����
var MAPSTARTTILEX   = 0;   // ��ͼ��ʼ��X
var MAPSTARTTILEY   = 2;   // ��ͼ��ʼ��Y

var PREFIXOFREALTOWER = "spritetower"; // ���������ǰ׺

// (26 + 4) * 20���������µ�UIռ��
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

// ��ͼ��ת
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

// ���������ĸ���ڵ�ĳ�ʼλ�õ�ͼ��������
var DIRINITPOSMAPCOOR = [
	{'x':0, 'y':10}, {'x':25, 'y':10}, {'x':12, 'y':0}, {'x':12, 'y':19}
];

/**
*���ݴ������귵�ظ������ڵ�������
*x x������
*y y������ 
*/
function CalcTilePos(x, y) {
    var pos = new Array();
    pos["x"] = Math.floor(x / TILESIZE);
    pos["y"] = Math.floor(y / TILESIZE);

    return pos;
}

/**
*���h * v�ĸ��ӷ�Χ�Ƿ������ΪtileX, tileY�ĸ�������Ч
*tileX x����ӵ�λ��
*tileY y����ӵ�λ�� 
*h ���������
*v ���������
*isAnc �Ƿ���Ҫ����ê��
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
*�����ΪtileX, tileY�ĸ���������h * v�ĸ��ӷ�Χ�ı��
*tileX x����ӵ�λ��
*tileY y����ӵ�λ�� 
*h ���������
*v ���������
*flag ���õı��ֵ
*isAnc �Ƿ���Ҫ����ê��
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
        this.towerUI = [];  // ��ͼ�Ͽɼ�����
        this.enemyUI = [];  // ��ͼ�Ͽɼ��ĵ���
        this.uiBuild = new UIBuild(15000);
        this.gameworld = new GameWorld();
        this.sprites = CreateGameObjectFromTemplate("sprites");
        this.selectionframe = GetSubComponent(10002, "selection");
        this.selectedTilePos = { 'x': 0, 'y': 0 }; // ѡ�еĸ���λ��

        var root = GetRootGameObj();
        var mapObj = root.getChildByTag(10001);
        this.m_mapCom = mapObj.getComponentJS("GameMap");
        //var tilepos = this.m_mapCom.getTileIndexInLayer("BG", 1, 1);
        this.selectionframe.setVisible(false); // ������
        this.selectionframe.setAnchorPoint(1, 1); // ����ê��

        var input = GetSubComponent(10001, "locationinput");

        root.addChild(this.sprites);
        root.addChild(root.getChildByTag(10002)); // ѡ���
        print(this.selectionframe);
        var self = this;
        input.MultiTouchPressed = function (touches) {
            self.multiTouchPressed(touches);
        };
        input.TouchPressed = function (x, y) {
            self.singleTouchPressed(x, y);
        };

        // ���ý������ȷ�ϵĻص�
        this.uiBuild.btnOKCallback = function () {
            // ������
            if (self.uiBuild.numberSelectedTowerType != null) {
                // ����Ƿ�������
                if (self.gameworld.isBuildEnable) {
                    // ����Ƿ�¿�
                    if (self.gameworld.checkIsCanBuild()) {
                        print("Build!!!!!!");
                        var idNewTower = self.gameworld.buildTower(self.uiBuild.numberSelectedTowerType, self.selectedTilePos.x, self.selectedTilePos.y);
                        // ������ӵ���ͼ��
                        self.addTowerToMap(idNewTower, self.uiBuild.numberSelectedTowerType, self.selectedTilePos.x, self.selectedTilePos.y);
                    }
                    // ����ѡ�еĽ���������
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
    *������������������棩
    *id ��ӵ���ID
    *type ��ӵ�������
    *tileX ��ӵ���ͼ�ĸ���λ��x������
    *tileY ��ӵ���ͼ�ĸ���λ��Y������
    *return �Ƿ���ӳɹ�
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
    *��ӵ��˵����������棩
    *id ��ӵĵ���ID
    *type ��ӵĵ�������
    *tileX ��ӵ���ͼ�ĸ���λ��x������
    *tileY ��ӵ���ͼ�ĸ���λ��Y������
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
    *���µ���λ��
    *id ����ID
    *dir ���˵ķ���
    *x ���µĵ���X����
    *y ���µĵ���Y����
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