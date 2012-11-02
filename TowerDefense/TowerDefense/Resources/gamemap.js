var TILESIZE = 64; // ���Ӵ�С
var SCREENWIDTH     = 960; // ��Ļ��
var SCREENHEIGHT    = 640; // ��Ļ��

var gamemap = Class(object, {
    onCreate: function (objectTag) {

        //ui
        //var ui = GetSubComponent(objectTag, "ui");
        //print("ddfdf   " + ui);
        //var backButton = ui.getNodeByName("exit");
        //        backButton.onClick = function () {
        //            game.js_Game.exit();
        //        }
        print("!!!!!!!!!!!!");
        var root = GetRootGameObj();
        this.sprites = CreateGameObjectFromTemplate("sprites");
        this.selectionframe = GetSubComponent(10002, "selection");

        this.uiBuild = new uibuild(15000);

        //var aniEnemydie = sprites.getComponentJS("enemydie");
        //aniEnemydie.setAction(0);

        root.addChild(this.sprites);
        root.addChild(root.getChildByTag(10002)); // ѡ���

        this.selectionframe.setVisible(false); // ������
        this.selectionframe.setAnchorPoint(1, 1); // ����ê��
        //this.goUITowerChooser.setVisible(false);

        var input = GetSubComponent(10001, "locationinput");
        //var bg = getComponentJS("backgroud");
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
        print("x=" + x + "y=" + y);
        var root = GetRootGameObj();
        var tilepos = this.calcTilePos(x, y);
        var pos = new GLKVector4();
        pos.x = tilepos["x"] * TILESIZE + TILESIZE / 2;
        pos.y = tilepos["y"] * TILESIZE + TILESIZE / 2;
        this.selectionframe.setVisible(true);
        this.selectionframe.setPosition(pos);

        pos.x = 300;
        pos.y = 300;
        this.uiBuild.setPosition(pos);
        this.uiBuild.setVisible(true);
    },

    // ���ݴ������귵�ظ������ڵ�������
    calcTilePos: function (x, y) {
        var pos = new Array();
        pos["x"] = Math.floor(x / TILESIZE);
        pos["y"] = Math.floor(y / TILESIZE);

        return pos;
    }
});