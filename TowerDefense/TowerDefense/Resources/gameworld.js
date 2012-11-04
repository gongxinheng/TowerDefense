/**
 * 游戏世界类
 * @author 龚欣恒
 *
 */
var IDCOUNTER = 1; 	        //当前全局ID号

// 获取一个ID
function GetNewID() {
    // 为了防止数字的ID虚长
    return 'a' + ((++IDCOUNTER).toString());
}

var GameWorld = Class(object, {
    onCreate: function () {
        this.arrayTowers = [];          // 游戏中的防御塔
        this.arrayEnemies = [];         // 游戏中的敌人
        this.isBuildEnable = true;      // 是否允许建造
        this.numberGameMoney = 0;       // 游戏币
        this.numberLevel = 0;           // 游戏级别（关卡）
    },

    /**
    * 检测当前是否能建造炮塔
    * return true能 false不能
    */
    checkIsCanBuild: function () {
        return true;
    },

    /**
    *建造炮塔
    *type 建造的炮塔类型
    *tileX 添加到地图的格子位置x轴索引
    *tileY 添加到地图的格子位置Y轴索引
    *return 建造的塔ID
    */
    buildTower: function (type, tileX, tileY) {
        var ID = GetNewID();
        print(typeof (ID));
        this.arrayTowers[ID] = new Tower(ID, type);
        this.arrayTowers[ID].postion = tileX;
        this.arrayTowers[ID].postion = tileY;
        return ++IDCOUNTER;
    },

    /**
    *建造炮塔添加敌人
    *type 建造的炮塔敌人类型
    *tileX 添加到地图的格子位置x轴索引
    *tileY 添加到地图的格子位置Y轴索引
    *return 建造的塔ID
    */
    addEnemy: function (type, tileX, tileY) {
        var ID = GetNewID();
        this.arrayEnemies[ID] = new Enemy(ID, type, { "x": tileX, "y": tileY });
        this.arrayEnemies[ID].posTileX = tileX;
        this.arrayEnemies[ID].posTileY = tileY;
        return ID;
    },

    /**
    * 开始防守
    */
    startDefense: function () {
        print("start!");
        var ID = this.addEnemy(0, 15, 15);
        map.addEnemyToMap(ID, 0, 15, 15);
        ID = this.addEnemy(0, 17, 4);
        map.addEnemyToMap(ID, 0, 17, 4);
    },
    /**
    *退出游戏
    */
    exitGame: function () {
        game.js_Game.exit();
    },

    /**
    *退出游戏每帧调用的逻辑
    */
    frame: function () {
        //print(this.arrayEnemies.length);
        for (var enemy in this.arrayEnemies) {
            //print(this.arrayEnemies[enemy]);
            this.arrayEnemies[enemy].AI();
        }
    }
});