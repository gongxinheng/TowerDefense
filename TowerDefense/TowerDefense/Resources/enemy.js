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

        /////////////////////////////////////AI变量/////////////////////////////////////////////
	    this.initTime = 0; // 纪录初始化的时间
	    this.currentTime = System.currentTimeMillis(); // 当前时间
	    this.startRandomTime = 0; // 开始随机的时间
	    this.numberRandom = Math.random(); // 随机数对象
	    this.isAIBegin = false; // AI开始
	    this.isSearching = false; // 是否寻路中
	    this.vecPath = []; // 路径
	    this.currentDest = 0; // 路径迭代变量
	    this.randomCount = 2; // 随机的次数
        this.moveFailedCount = 0; // 移动失败次数
	},
    
//    /**
//	 * 敌人人工智能
//	 */
//	AI: function {
//		// 移动失败十次自动传送并重新寻路
//		if (moveFailedCount > 20) {
//			var tempPt = {'x':0, 'y':0};
//			var tPt = {'x':0, 'y':0};
//			while(true) {
//				tempPt.x = GameInfo.MAPBGINITPOS.x + (Math.abs(random.nextInt()) % 
//						(GameInfo.MAPENDINGPOS.x - GameInfo.MAPBGINITPOS.x));
//				tempPt.y = GameInfo.MAPBGINITPOS.y + (Math.abs(random.nextInt()) % 
//						(GameInfo.MAPENDINGPOS.y - GameInfo.MAPBGINITPOS.y));
//				//print("x=" + tempPt.x + "  y=" + tempPt.y);
//				GameInfo.absPosToOppPos(tPt, new Point(tempPt.x + GameInfo.ICONSIZE / 2, 
//						tempPt.y + GameInfo.ICONSIZE / 2));
//				if (GameInfo.mapData[tPt.x][tPt.y] == 0) {
//					position.x = tempPt.x;
//					position.y = tempPt.y;
//					break;
//				}
//			}
//			isResearching = false;
//			moveFailedCount = 0;
//		}
//		// 寻路
//		if (!isResearching) {
//			// 清空路径
//			if (!vecPath.isEmpty()) {
//				vecPath.removeAllElements();
//			}
//			int rNumX = 0; // 随机数
//			int rNumY = 0; 
//			//　随机完毕寻找出口
//			if (0 >= randomCount) {
//				int maxval = 0;
//				for (int i = 0; i < 6; ++i) {
//					int temp = Math.abs(coorInMap.x - GameInfo.DIRINITPOSMAPCOOR[i].x) + 
//					Math.abs(coorInMap.y - GameInfo.DIRINITPOSMAPCOOR[i].y);
//					//　找最远的出口
//					if (temp > maxval) {
//						maxval = temp;
//						destination = i;
//					}
//				}
//				vecPath = new AStar().search(coorInMap.x, coorInMap.y, 
//						GameInfo.DIRINITPOSMAPCOOR[destination].x, GameInfo.DIRINITPOSMAPCOOR[destination].y);
//				//System.out.println("寻找到的出口X=" + GameInfo.DIRINITPOSMAPCOOR[destination].x + "  找到的出口Y=" + GameInfo.DIRINITPOSMAPCOOR[destination].y );
//			} else {
//				while (true) {
//					rNumX = Math.abs(random.nextInt() % GameInfo.MAPROW);
//					rNumY = Math.abs(random.nextInt() % GameInfo.MAPCOLUMN);
//					// 找到的位置是出口或不可走则继续找
//					if (GameInfo.mapData[rNumX][rNumY] != 5
//							&& GameInfo.mapData[rNumX][rNumY] != 0) {
//						continue;
//					}
//					else {
//						break;
//					}
//				}
//				int count = 0;
//				while ((vecPath = new AStar().search(coorInMap.x, coorInMap.y, rNumX, rNumY)) == null) {
//					++count;
//					// 寻找路径失败１００次则让敌人脱离
//					if (count > 100) {
//						escape();
//						break;
//					}
//				}
//				//System.out.println("寻找到的X=" + rNumX + "  找到的Y=" + rNumY );
//			}
//			currentDest = 0;
//			isResearching = true;
//		}
//		// 开始移动
//		else{
//			getDir(vecPath);
//			if (!vecPath.isEmpty()) {
//				Point tempPt = (Point) vecPath.elementAt(vecPath.size() - 1);
////				for (int i = 0; i < vecPath.size(); ++i) {
////					//System.out.println(((Point)(vecPath.elementAt(i))).x + "  " + ((Point)(vecPath.elementAt(i))).y);
////				}
//				if (coorInMap.x == tempPt.x && coorInMap.y == tempPt.y) {
//					isResearching = false;
//					--randomCount; // 可随机次数减少
//				}
//			}
//			if (!move()) {
//				++moveFailedCount;
//				int dir = 0;
//				switch (destination) {
//				case GameInfo.UP: {
//					while((dir = Math.abs(random.nextInt()) % 4) != GameInfo.DOWN) {
//						direction = dir;
//					}
//				}
//				break;
//				case GameInfo.DOWN: {
//					while((dir = Math.abs(random.nextInt()) % 4) != GameInfo.UP) {
//						direction = dir;
//					}
//				}
//				break;
//				case GameInfo.LEFT: {
//					while((dir = Math.abs(random.nextInt()) % 4) != GameInfo.RIGHT) {
//						direction = dir;
//					}
//				}
//				break;
//				case GameInfo.RIGHT: {
//					while((dir = Math.abs(random.nextInt()) % 4) != GameInfo.LEFT) {
//						direction = dir;
//					}
//				}
//				break;
//				default:
//					break;
//				}
//				move();
//				return;
//			}
//			moveFailedCount = 0;
//		}
//	},
//	
//	/**
//	 * 获取方向
//	 * @param vecPath 要走的路径
//	 */
//	private void getDir(Vector vecPath) {
//		//System.out.println("怪x=" + coorInMap.x + "怪y=" + coorInMap.y);
//		if (vecPath != null && !vecPath.isEmpty()) {
//			if (currentDest < vecPath.size()) {
//				Point coor = new Point();
//				GameInfo.absPosToOppPos(coor, new Point(position.x + imgWidth / 2, position.y + imgHeight / 2));
//				int tX = ((Point)vecPath.elementAt(currentDest)).x;
//				int tY = ((Point)vecPath.elementAt(currentDest)).y;
//				//System.out.println("tx=" + tX + "  ty=" + tY);
//				if(coor.x < tX) {
//					direction = GameInfo.DOWN;
//				} else if ((coor.x > tX)){
//					direction = GameInfo.UP;
//				} else {
//					if (coor.y < tY) {
//						direction = GameInfo.RIGHT;
//					} else if (coor.y > tY){
//						direction = GameInfo.LEFT;
//					} else {
//						++currentDest;
//					}
//				}
//			} 
//			//System.out.println("currentDest = " + currentDest);
//		} 
//	}
});