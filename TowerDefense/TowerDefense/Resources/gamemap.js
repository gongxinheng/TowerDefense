var TILESIZE = 64; // 格子大小
var SCREENWIDTH     = 960; // 屏幕宽
var SCREENHEIGHT    = 640; // 屏幕高

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
        this.towers = CreateGameObjectFromTemplate("towers");      // 塔图片
        this.selectionframe = GetSubComponent(10002, "selection");

        this.uiBuild = new uibuild(15000);

        //var aniEnemydie = sprites.getComponentJS("enemydie");
        //aniEnemydie.setAction(0);

        root.addChild(this.sprites);
        root.addChild(root.getChildByTag(10002)); // 选择框

        this.selectionframe.setVisible(false); // 先隐藏
        this.selectionframe.setAnchorPoint(1, 1); // 设置锚点
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
        //        print("ccccccccccc");
        //        var towers = CreateGameObjectFromTemplate("towers");
        //        var tower = towers.getComponentJS("guntower");
        //        print(tower);
        //        tower.setAction(0);
        var tilepos = this.calcTilePos(x, y);
        var pos = new GLKVector4();
        pos.x = tilepos["x"] * TILESIZE + TILESIZE / 2;
        pos.y = tilepos["y"] * TILESIZE + TILESIZE / 2;
        print("x1=" + tilepos["x"] + "y1=" + tilepos["y"]);
        this.selectionframe.setVisible(true);
        this.selectionframe.setPosition(pos);

        pos.x = 300;
        pos.y = 300;
        print(this.uiTowerChooser);
        this.uiBuild.setPosition(pos);
        this.uiBuild.setVisible(true);
    },

    // 根据传入坐标返回格子所在的行列数
    calcTilePos: function (x, y) {
        var pos = new Array();
        pos["x"] = Math.floor(x / TILESIZE);
        pos["y"] = Math.floor(y / TILESIZE);

        return pos;
    }
});