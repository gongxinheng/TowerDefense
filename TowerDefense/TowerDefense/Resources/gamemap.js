var TILESIZE        = 64;  // ���Ӵ�С
var SCREENWIDTH     = 960; // ��Ļ��
var SCREENHEIGHT    = 640; // ��Ļ��

var PREFIXOFREALTOWER = "spritetower"; // ���������ǰ׺

var GameMap = Class(object, {
    onCreate: function (objectTag) {
        this.towerUI = [];  // ��ͼ�Ͽɼ�����
        this.gameworld = new GameWorld();
        var root = GetRootGameObj();
        this.sprites = CreateGameObjectFromTemplate("sprites");
        this.selectionframe = GetSubComponent(10002, "selection");

        this.uiBuild = new UIBuild(15000);

        this.selectionframe.setVisible(false); // ������
        this.selectionframe.setAnchorPoint(1, 1); // ����ê��

        var input = GetSubComponent(10001, "locationinput");

        root.addChild(this.sprites);
        root.addChild(root.getChildByTag(10002)); // ѡ���
        print(this.selectionframe);
        var self = this;
        input.MultiTouchPressed = function (touches) {
            self.multiTouchPressed(touches);
        }
        input.TouchPressed = function (x, y) {
            self.singleTouchPressed(x, y);
        }
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
            print("x=" + x + "y=" + y);
            print("tttt=" + this.uiBuild.numberSelectedTowerType);

            // ������
            if (this.uiBuild.numberSelectedTowerType != null) {
                // ����Ƿ�������
                if (this.gameworld.isBuildEnable) {
                    // ����Ƿ�¿�
                    if (this.gameworld.checkIsCanBuild()) {
                        var idNewTower = this.gameworld.buildTower(this.uiBuild.numberSelectedTowerType, tilepos.x, tilepos.y);
                        // ������ӵ���ͼ��
                        this.addTowerToMap(idNewTower, this.uiBuild.numberSelectedTowerType, tilepos.x, tilepos.y);
                    }

                    // ������ӵ���ͼ
                    this.addTowerToMap(tilepos.x, tilepos.y);
                    // ����ѡ�еĽ���������
                    this.uiBuild.numberSelectedTowerType = null;
                }
            }
            else {
                pos.x = tilepos["x"] * TILESIZE + TILESIZE / 2;
                pos.y = tilepos["y"] * TILESIZE + TILESIZE / 2;
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
    *���ݴ������귵�ظ������ڵ�������
    *x x������
    *y y������ 
    */
    calcTilePos: function (x, y) {
        var pos = new Array();
        pos["x"] = Math.floor(x / TILESIZE);
        pos["y"] = Math.floor(y / TILESIZE);

        return pos;
    },

    /**
    *������������������棩
    *id ��ӵ���ID
    *type ��ӵ�������
    *tileX ��ӵ���ͼ�ĸ���λ��x������
    *tileY ��ӵ���ͼ�ĸ���λ��Y������
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
        print("build tower id =" + id + "type =" + type);
    }
});