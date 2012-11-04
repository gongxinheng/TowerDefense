/**
 * 敌人基类
 * @author 龚欣恒
 *
 */
 // 方向定义
var DIRUP = 0;
var DIRDOWN = 1;
var DIRLEFT = 2;
var DIRRIGHT = 3;
var Enemy = Class(object, {
    onCreate: function (id, type, pos) {
        this.id = id;                           // 敌人id
        this.numberDestIndex = 0;               // 目的地出口索引
        this.numberMaxHP = 0;                   // 最大生命
        this.numberHP = this.numberMaxHP;       // 生命
        this.numberMaxSpeed = 3;                // 最大速度
        this.numberSpeed = this.numberMaxSpeed;      // 敌人速度
        this.numberDestination = 0;             // 敌人目的地
        this.numberDirection = DIRUP;           // 敌人方向
        this.numberCost = 0;                    // 敌人价值
        this.coorInMap = pos;                   // 在地图中的行列坐标
        this.position = {};                     // 敌人位置
        this.position.x = pos.x * TILESIZE;
        this.position.y = pos.y * TILESIZE;
        this.oldPosition = this.position;       // 纪录上一次的位置
        this.isAlive = false;                   // 是否活着
        this.isShouldDisapear = false;          // 是否应该消失
        this.numberLowSpeedTime = 5000;         // 减速时间5秒
        this.numberStartLowSpeedTime = 0;       // 开始减速的时间
        this.isTimeRecord = false;              // 是否已经纪录时间

        /////////////////////////////////////AI变量/////////////////////////////////////////////
        this.initTime = 0; // 纪录初始化的时间
        this.currentTime = 0; // 当前时间
        this.startRandomTime = 0; // 开始随机的时间
        this.numberRandom = Math.random(); // 随机数对象
        this.isAIBegin = false; // AI开始
        this.isSearching = false; // 是否寻路中
        this.vecPath = []; // 路径
        this.currentDest = 0; // 路径迭代变量
        this.randomCount = 2; // 随机的次数
        this.moveFailedCount = 0; // 移动失败次数
    },

    /**
    * 敌人人工智能
    */
    AI: function () {
        this.coorInMap = CalcTilePos(this.position.x, this.position.y);
        // 移动失败十次自动传送并重新寻路
        if (this.moveFailedCount > 20) {
            var tempPt = { 'x': 0, 'y': 0 };
            var tPt = { 'x': 0, 'y': 0 };
            while (true) {
                tempPt.x = 0 + Math.random() * MAPWIDTH;
                tempPt.y = 64 + Math.random() * MAPHEIGHT;
                //print("x=" + tempPt.x + "  y=" + tempPt.y);
                tPt = calcTilePos(tempPt.x, tempPt.y);
                if (MAPDATA[tPt.x][tPt.y] == 0) {
                    this.position.x = tempPt.x;
                    this.position.y = tempPt.y;
                    break;
                }
            }
            this.isResearching = false;
            this.moveFailedCount = 0;
        }
        // 寻路
        if (!this.isResearching) {
            print("Researching");
            // 清空路径
            if (this.vecPath.length != 0) {
                this.vecPath.length = 0;
            }
            var rNumX = 0; // 随机数
            var rNumY = 0;
            //　随机完毕寻找出口
            if (this.randomCount <= 0) {
                var maxval = 0;
                for (var i = 0; i < DIRINITPOSMAPCOOR.length; ++i) {
                    var temp = Math.abs(this.coorInMap.x - GameInfo.DIRINITPOSMAPCOOR[i].x) +
					Math.abs(this.coorInMap.y - GameInfo.DIRINITPOSMAPCOOR[i].y);
                    //　找最远的出口
                    if (temp > maxval) {
                        maxval = temp;
                        this.numberDestIndex = i;
                    }
                }

                vecPath = new AStar(MAPDATA).getPath(this.coorInMap.x, this.coorInMap.y,
						DIRINITPOSMAPCOOR[this.numberDestIndex].x, DIRINITPOSMAPCOOR[this.numberDestIndex].y);
                //System.out.println("寻找到的出口X=" + GameInfo.DIRINITPOSMAPCOOR[destination].x + "  找到的出口Y=" + GameInfo.DIRINITPOSMAPCOOR[destination].y );
            } else {
                while (true) {
                    rNumX = Math.floor(Math.random() * MAPCOLUMN);
                    rNumY = Math.floor(Math.random() * MAPROW);
                    // 找到的位置是出口或不可走则继续找
                    if (MAPDATA[rNumX][rNumY] != 5
							&& MAPDATA[rNumX][rNumY] != 0) {
                        continue;
                    }
                    else {
                        break;
                    }
                }
                var count = 0;
                while ((vecPath = new AStar(MAPDATA).getPath(this.coorInMap.x, this.coorInMap.y, rNumX, rNumY)) == null) {
                    ++count;
                    // 寻找路径失败１００次则让敌人脱离
                    if (count > 100) {
                        print("Path searching fialed!!!!!!!!!!!");
                        //escape();
                        break;
                    }
                }
            }
            this.currentDest = 0;
            this.isResearching = true;
        }
        // 开始移动
        else {
            this.getDir(vecPath);
            if (vecPath.length > 0) {
                var tempPt = vecPath[vecPath.length - 1];
                if (this.coorInMap.x == tempPt.x && this.coorInMap.y == tempPt.y) {
                    this.isResearching = false;
                    --this.randomCount; // 可随机次数减少
                }
            }
            this.move();
        }
    },

    /**
    * 获取方向
    * vecPath 要走的路径
    */
    getDir: function (vecPath) {
        if (vecPath != null && vecPath.length > 0) {
            if (this.currentDest < vecPath.length) {
                var coor = CalcTilePos(coor, this.position.x, this.position.y);
                var tX = vecPath[this.currentDest][0];
                var tY = vecPath[this.currentDest][1];
                //System.out.println("tx=" + tX + "  ty=" + tY);
                if (coor.x < tX) {
                    this.numberDirection = DIRDOWN;
                } else if ((coor.x > tX)) {
                    this.numberDirection = DIRUP;
                } else {
                    if (coor.y < tY) {
                        this.numberDirection = DIRRIGHT;
                    } else if (coor.y > tY) {
                        this.numberDirection = DIRLEFT;
                    } else {
                        ++this.currentDest;
                    }
                }
            }
            //System.out.println("currentDest = " + currentDest);
        }
    },

    /**
    * 敌人移动
    * 
    */
    move: function () {
        //print("posX = " + this.position.x + " posY=" + this.position.y);
        // 根据方向判定移动
        switch (this.numberDirection) {
            case DIRUP:
                this.position.y += this.numberSpeed;
                break;
            case DIRDOWN:
                this.position.y -= this.numberSpeed;
                break;
            case DIRLEFT:
                this.position.x -= this.numberSpeed;
                break;
            case DIRRIGHT:
                this.position.x += this.numberSpeed;
                break;
        }
        map.updateEnemyPos(this.id, this.numberDirection, this.position.x, this.position.y);
    }
});