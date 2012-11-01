
var uibuild = Class(object, {
    onCreate: function (objectTag) {

        //ui
        var root = GetRootGameObj();
        this.ui = GetSubComponent(objectTag, "UITowerChooser");
        this.go = root.getChildByTag(objectTag); // 选塔UI
        this.uiTowerChooser = GetSubComponent(15000, "UITowerChooser");
        this.uiLabelDesc = this.ui.getNodeByName("textDesc");   // 说明文本标签
        this.uiLabelDesc.setString("Hello world");

//        var backButton = ui.getNodeByName("exit");
//        backButton.onClick = function () {
//            game.js_Game.exit();
//        }

        print("!!!!!!!!!!!!");
        var sprites = CreateGameObjectFromTemplate("sprites");
        //var aniEnemydie = sprites.getComponentJS("enemydie");
        //aniEnemydie.setAction(0);
        var root = GetRootGameObj();
        root.addChild(sprites);
    },

    setVisible: function (isVisible) {
        this.go.setVisible(isVisible);
    },


    setPosition: function (x, y) {
        this.go.setPosition(x, y);
    }
});