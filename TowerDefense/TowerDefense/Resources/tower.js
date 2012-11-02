/**
 * 炮塔基类
 * @author 龚欣恒
 *
 */
var MAXAP = 100;	//最大攻击力
var MAXRANGE = 5;	//最大射程
var MAXSHOOTSPEED = 3;	//最大射速
var MAXLEVEL = 3; // 最高等级
var TOWERHASDIRECTIONCOUNT = 3; // 有方向的炮塔数量
var IDCOUNTER = 5; 	//当前ID号

var tower = Class(object, {
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
	
	/**
	 * 获取炮塔升级信息
	 * @param tower 要升级的塔
	 * @param upInfo 存放升级的信息
	 */
//	public static void getUpgradeInfo(RealTower tower, UpgradeInfo upInfo) {
//		
//		// 已达到最高级别，返回失败
//		if (tower.level + 1 > RealTower.MAXLEVEL) {
//			upInfo.level = 4;
//			return;
//		}
//		else 
//		{
//			upInfo.level = tower.level + 1;
//			if (2 == upInfo.level) {
//				upInfo.level = 2;
//				switch (tower.type) {
//				case GameInfo.TOWER_GUN: {
//					upInfo.strName = "2级格林枪塔";
//					upInfo.ap = 20; // 塔的攻击力
//					upInfo.range = 2; // 塔的射程
//					upInfo.shootSpeed = 2; // 塔的射速
//					upInfo.price = 10; // 升级的价格
//					upInfo.rangeRadius = 35; //射程半径
//				}
//					break;

//				case GameInfo.TOWER_NORMAL: {
//					upInfo.strName = "2级普通炮塔";
//					upInfo.ap = 25; // 塔的攻击力
//					upInfo.range = 2; // 塔的射程
//					upInfo.shootSpeed = 2; // 塔的射速
//					upInfo.price = 15; // 塔的价格
//					upInfo.rangeRadius = 35; //射程半径
//				}
//					break;

//				case GameInfo.TOWER_FLYBULLET: {
//					upInfo.strName = "2级飞弹塔";
//					upInfo.ap = 25; // 塔的攻击力
//					upInfo.range = 3; // 塔的射程
//					upInfo.shootSpeed = 2; // 塔的射速
//					upInfo.price = 15; // 塔的价格
//					upInfo.rangeRadius = 45; //射程半径
//				}
//					break;

//				case GameInfo.TOWER_FIREBULLET: {
//					upInfo.strName = "2级火焰弹塔";
//					upInfo.ap = 40; // 塔的攻击力
//					upInfo.range = 3; // 塔的射程
//					upInfo.shootSpeed = 1; // 塔的射速
//					upInfo.price = 40; // 塔的价格
//					upInfo.rangeRadius = 45; //射程半径
//				}
//					break;

//				case GameInfo.TOWER_ICETOWER: {
//					upInfo.strName = "2级冷冻光塔";
//					upInfo.ap = 20; // 塔的攻击力
//					upInfo.range = 2; // 塔的射程
//					upInfo.shootSpeed = 1; // 塔的射速
//					upInfo.price = 40; // 塔的价格
//					upInfo.rangeRadius = 35; //射程半径
//				}
//					break;

//				case GameInfo.TOWER_ELECTRIC: {
//					upInfo.strName = "2级防御电塔";
//					upInfo.ap = 40; // 塔的攻击力
//					upInfo.range = 2; // 塔的射程
//					upInfo.shootSpeed = 2; // 塔的射速
//					upInfo.price = 40; // 塔的价格
//					upInfo.rangeRadius = 35; //射程半径
//				}
//					break;

//				case GameInfo.TOWER_FINALTOWER: {
//					upInfo.strName = "2级终极炮塔";
//					upInfo.ap = 80; // 塔的攻击力
//					upInfo.range = 4; // 塔的射程
//					upInfo.shootSpeed = 1; // 塔的射速
//					upInfo.price = 80; // 塔的价格
//					upInfo.rangeRadius = 50; //射程半径
//				}
//					break;

//				default:
//					break;
//				}
//			}
//			else if (3 == upInfo.level) {
//				upInfo.level = 3;
//				switch (tower.type) {
//				case GameInfo.TOWER_GUN: {
//					upInfo.strName = "3级格林枪塔";
//					upInfo.ap = 30; // 塔的攻击力
//					upInfo.range = 3; // 塔的射程
//					upInfo.shootSpeed = 3; // 塔的射速
//					upInfo.price = 15; // 塔的价格
//					upInfo.rangeRadius = 50; //射程半径
//				}
//					break;

//				case GameInfo.TOWER_NORMAL: {
//					upInfo.strName = "3级普通炮塔";
//					upInfo.ap = 40; // 塔的攻击力
//					upInfo.range = 3; // 塔的射程
//					upInfo.shootSpeed = 2; // 塔的射速
//					upInfo.price = 25; // 塔的价格
//					upInfo.rangeRadius = 45; //射程半径
//				}
//					break;

//				case GameInfo.TOWER_FLYBULLET: {
//					upInfo.strName = "3级飞弹塔";
//					upInfo.ap = 33; // 塔的攻击力
//					upInfo.range = 4; // 塔的射程
//					upInfo.shootSpeed = 2; // 塔的射速
//					upInfo.price = 25; // 塔的价格
//					upInfo.rangeRadius = 50; //射程半径
//				}
//					break;

//				case GameInfo.TOWER_FIREBULLET: {
//					upInfo.strName = "3级火焰弹塔";
//					upInfo.ap = 60; // 塔的攻击力
//					upInfo.range = 4; // 塔的射程
//					upInfo.shootSpeed = 2; // 塔的射速
//					upInfo.price = 50; // 塔的价格
//					upInfo.rangeRadius = 50; //射程半径
//				}
//					break;

//				case GameInfo.TOWER_ICETOWER: {
//					upInfo.strName = "3级冷冻光塔";
//					upInfo.ap = 35; // 塔的攻击力
//					upInfo.range = 3; // 塔的射程
//					upInfo.shootSpeed = 2; // 塔的射速
//					upInfo.price = 60; // 塔的价格
//					upInfo.rangeRadius = 45; //射程半径
//				}
//					break;

//				case GameInfo.TOWER_ELECTRIC: {
//					upInfo.strName = "3级防御电塔";
//					upInfo.ap = 50; // 塔的攻击力
//					upInfo.range = 2; // 塔的射程
//					upInfo.shootSpeed = 2; // 塔的射速
//					upInfo.price = 50; // 塔的价格
//					upInfo.rangeRadius = 35; //射程半径
//				}
//					break;

//				case GameInfo.TOWER_FINALTOWER: {
//					upInfo.strName = "3级终极炮塔";
//					upInfo.ap = 100; // 塔的攻击力
//					upInfo.range = 5; // 塔的射程
//					upInfo.shootSpeed = 2; // 塔的射速
//					upInfo.price = 99; // 塔的价格
//					upInfo.rangeRadius = 60; //射程半径
//				}
//					break;

//				default:
//					break;
//				}
//			}
//			else {
//				
//			}
//		}
//	}
//	
//	/**
//	 * 直接升级
//	 */
//	public static void dirUpgrade(RealTower tower, UpgradeInfo upInfo) {
//		tower.level = upInfo.level; // 升级
//		tower.ap = upInfo.ap; // 塔的攻击力
//		tower.range = upInfo.range; // 塔的射程
//		tower.shootSpeed = upInfo.shootSpeed; // 塔的射速
//		tower.price += upInfo.price; // 塔的价格
//		tower.rangeRadius = upInfo.rangeRadius; //射程半径
//	}
//	
//	public static boolean upgrade(RealTower tower, UpgradeInfo upInfo) {
//		// 金币不够
//		if (GameInfo.gold - upInfo.price < 0 || upInfo.level > 3) {
//			return false;
//		}
//		// 升级成功
//		else {
//			tower.level = upInfo.level; // 升级
//			tower.ap = upInfo.ap; // 塔的攻击力
//			tower.range = upInfo.range; // 塔的射程
//			tower.shootSpeed = upInfo.shootSpeed; // 塔的射速
//			tower.price += upInfo.price; // 塔的价格
//			tower.rangeRadius = upInfo.rangeRadius; //射程半径
//			GameInfo.gold -= upInfo.price; // 减少金币
//			return true;
//		}
//	}
//}
