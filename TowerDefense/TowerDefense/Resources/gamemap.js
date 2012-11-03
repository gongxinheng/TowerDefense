var TILESIZE        = 64;  // ���Ӵ�С
var SCREENWIDTH     = 960; // ��Ļ��
var SCREENHEIGHT    = 640; // ��Ļ��

var PREFIXOFREALTOWER = "spritetower"; // ���������ǰ׺

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
                        var idNewTower = self.gameworld.buildTower(self.uiBuild.numberSelectedTowerType, self.selectedTilePos.x, self.selectedTilePos.y);
                        // ������ӵ���ͼ��
                        self.addTowerToMap(idNewTower, self.uiBuild.numberSelectedTowerType, self.selectedTilePos.x, self.selectedTilePos.y);
                    }

                    // ������ӵ���ͼ
                    self.addTowerToMap(self.selectedTilePos.x, self.selectedTilePos.y);
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
        t.removeFromParent();
        print("build tower id =" + id + "type =" + type);

        this.gameworld.startDefense();
    }
});