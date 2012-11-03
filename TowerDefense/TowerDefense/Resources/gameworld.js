/**
 * 游戏世界类
 * @author 龚欣恒
 *
 */
var IDCOUNTER = 1; 	//当前全局ID号

var GameWorld = Class(object, {
    onCreate: function () {
        this.arrayTowers = [];          // 游戏中的防御塔
        this.isBuildEnable = true;      // 是否允许建造
        this.numGameMoney = 0;          // 游戏币
    },

    /**
     * 检测当前是否能建造炮塔
     * return true能 false不能
     */
    checkIsCanBuild: function() {
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
        this.arrayTowers[IDCOUNTER] = new Tower(IDCOUNTER, type);
        this.arrayTowers[IDCOUNTER].posTileX = tileX;
        this.arrayTowers[IDCOUNTER].posTileY = tileY;
        return ++IDCOUNTER;
    },

    /**
    *退出游戏
    */
    exitGame: function() {
        game.js_Game.exit();
    }
});