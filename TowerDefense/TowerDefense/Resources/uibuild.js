var NUMTOWERTYPE = 2; // ����������
var PREFIXOFTOWERBTN = "btnTower"; // ����ť��ǰ׺
var uibuild = Class(object, {
    onCreate: function (objectTag) {

        //ui
        var root = GetRootGameObj();
        this.ui = GetSubComponent(objectTag, "UITowerChooser");
        this.go = root.getChildByTag(objectTag); // ѡ��UI
        this.uiLabelDesc = this.ui.getNodeByName("textDesc");   // ˵���ı���ǩ
        this.btnOK = this.ui.getNodeByName("btnOK");            // ȷ�ϰ�ť

        this.selectedframeAni = CreateGameObjectFromTemplate("selectedFrameAni"); // ѡ�п򶯻�
        this.arrayBtnTower = [];    // ѡ����ť��


        this.numberSelectedTowerType = -1; // ѡ�е���ͼ������

        this.selectedframeAni.setVisible(false);
        root.addChild(this.selectedframeAni);
        var self = this;
        this.btnOK.onClick = function () {
            self.setVisible(false);
        }
        for (var i = 0; i < NUMTOWERTYPE; i++) {
            this.arrayBtnTower[i] = this.ui.getNodeByName(PREFIXOFTOWERBTN + i);
            print(this.arrayBtnTower[i]);
            this.arrayBtnTower[i].type = i; // ����ʶ��ѡ�еİ�ť

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
<<<<<<< HEAD
        this.selectedframeAni.setPosition(pos); //this.arrayBtnTower[type].getX());
=======
        print(this.arrayBtnTower[type]);
        print("xxx=" + this.arrayBtnTower[type].getPositionX());
        //this.selectedframeAni.setPosition(  );
>>>>>>> Change architecture
        //print(this.selectedframeAni);
    }
});