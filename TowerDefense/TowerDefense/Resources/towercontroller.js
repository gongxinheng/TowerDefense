/**
 * 游戏世界类炮塔基类
 * @author 龚欣恒
 *
 */

var gameworld = Class(object, {
    onCreate: function (type) {	    
	    this.ID = ++IDCOUNTER; //实际ID号
	    this.type = type; // 炮塔类型

	    this.strName = "炮塔";	//炮塔名
	    this.strIntroduce = "一座炮塔"; //介绍
	    this.ap = 0; //攻击力
	    this.range = 0; //射程
	    this.rangeRadius = 0; //攻击范围半径
	    this.price = 0; //价格
	    this.shootSpeed = 0; //射速
	    this.level = 1; //级别
	    this.hasDirection = false; // 是否有方向
	    this.isSpecial = false; // 是否特殊
    },
	
	/**
	 * 获取ID号
	 */
	getID: function() {
		return this.ID;
	}
}