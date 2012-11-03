/**
 * 敌人基类
 * @author 龚欣恒
 *
 */

var Enemy = Class(object, {
    onCreate: function (id, type) {
        this.numberMaxHP = 0;                   // 最大生命
        this.numberHP = numberMaxHP;            // 生命
        this.numberMaxSpeed = 0;                // 最大速度
        this.numberSpeed = numberMaxSpeed;      // 敌人速度
        this.numberDestination = 0;             // 敌人目的地
        this.numberDirection = destination;     // 敌人方向
        this.numberCost = 0;                    // 敌人价值
        this.numberPosition;                    // 敌人位置
        this.numberOldPos;                      // 纪录上一次的位置
        this.coorInMap = {'x':0, 'y':0};        // 在地图中的行列坐标
        this.isAlive = false;                   // 是否活着
        this.isShouldDisapear = false;          // 是否应该消失
        this.numberLowSpeedTime = 5000;         // 减速时间5秒
        this.numberStartLowSpeedTime = 0;       // 开始减速的时间
        this.isTimeRecord = false;              // 是否已经纪录时间
    }
});