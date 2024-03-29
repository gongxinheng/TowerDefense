var NUMTOWERTYPE = 7; // 塔的种类数
var PREFIXOFTOWERBTN = "btnTower"; // 塔按钮的前缀
var UIBuild = Class(object, {
    onCreate: function (objectTag) {
        //ui
        var root = GetRootGameObj();
        this.ui = GetSubComponent(objectTag, "UITowerChooser");
        this.go = root.getChildByTag(objectTag); // 选塔UI
        this.uiLabelDesc = this.ui.getNodeByName("textDesc");   // 说明文本标签
        this.btnOK = this.ui.getNodeByName("btnOK");            // 确认按钮
        this.btnOKCallback = null;                              // 确认按钮回调

        this.selectedframeAni = CreateGameObjectFromTemplate("selectedFrameAni"); // 选中框动画
        this.arrayBtnTower = [];    // 选塔按钮组

        this.numberSelectedTowerType = null; // 选中的塔图标类型
        this.isShow = false; // 是否打开显示了

        this.selectedframeAni.setVisible(false);
        root.addChild(this.selectedframeAni);
        var self = this;
        this.btnOK.onClick = function () {
            self.setVisible(false);
            if (self.btnOKCallback) {
                self.btnOKCallback();
            }
        }
        for (var i = 0; i < NUMTOWERTYPE; i++) {
            this.arrayBtnTower[i] = this.ui.getNodeByName(PREFIXOFTOWERBTN + i);
            print(this.arrayBtnTower[i]);
            this.arrayBtnTower[i].type = i; // 用来识别选中的按钮

            this.arrayBtnTower[i].onClick = function () {
                self.setSeletedTowerType(this.type);
                print("arg=" + arguments[0].getPosition().x);
            }
        }
        var sprites = CreateGameObjectFromTemplate("sprites");
        var root = GetRootGameObj();
        root.addChild(sprites);

        this.uiLabelDesc.setString("Hello world");
    },

    setVisible: function (isVisible) {
        this.go.setVisible(isVisible);
        this.isShow = isVisible;
    },


    setPosition: function (x, y) {
        this.go.setPosition(x, y);
    },

    setSeletedTowerType: function (type) {
        print(this.numberSelectedTowerType);
        this.numberSelectedTowerType = type;
        this.selectedframeAni.setVisible(true);
        //print("btn=" + this.arrayBtnTower[type]);
        var pos = new GLKVector4();
        pos.x = 100;
        pos.y = 100;
        print(this.arrayBtnTower[type]);
        //print("xxx=" + this.arrayBtnTower[type].getPositionX());
        this.selectedframeAni.setPosition(pos);
        this.uiLabelDesc.setString("tower" + type);
    }
});