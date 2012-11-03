/**
 * ���˻���
 * @author ������
 *
 */

var Enemy = Class(object, {
    onCreate: function (id, type) {
        this.numberMaxHP = 0;                   // �������
        this.numberHP = numberMaxHP;            // ����
        this.numberMaxSpeed = 0;                // ����ٶ�
        this.numberSpeed = numberMaxSpeed;      // �����ٶ�
        this.numberDestination = 0;             // ����Ŀ�ĵ�
        this.numberDirection = destination;     // ���˷���
        this.numberCost = 0;                    // ���˼�ֵ
        this.numberPosition;                    // ����λ��
        this.numberOldPos;                      // ��¼��һ�ε�λ��
        this.coorInMap = {'x':0, 'y':0};        // �ڵ�ͼ�е���������
        this.isAlive = false;                   // �Ƿ����
        this.isShouldDisapear = false;          // �Ƿ�Ӧ����ʧ
        this.numberLowSpeedTime = 5000;         // ����ʱ��5��
        this.numberStartLowSpeedTime = 0;       // ��ʼ���ٵ�ʱ��
        this.isTimeRecord = false;              // �Ƿ��Ѿ���¼ʱ��

        /////////////////////////////////////AI����/////////////////////////////////////////////
	    this.initTime = 0; // ��¼��ʼ����ʱ��
	    this.currentTime = System.currentTimeMillis(); // ��ǰʱ��
	    this.startRandomTime = 0; // ��ʼ�����ʱ��
	    this.numberRandom = Math.random(); // ���������
	    this.isAIBegin = false; // AI��ʼ
	    this.isSearching = false; // �Ƿ�Ѱ·��
	    this.vecPath = []; // ·��
	    this.currentDest = 0; // ·����������
	    this.randomCount = 2; // ����Ĵ���
        this.moveFailedCount = 0; // �ƶ�ʧ�ܴ���
	},
    
//    /**
//	 * �����˹�����
//	 */
//	AI: function {
//		// �ƶ�ʧ��ʮ���Զ����Ͳ�����Ѱ·
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
//		// Ѱ·
//		if (!isResearching) {
//			// ���·��
//			if (!vecPath.isEmpty()) {
//				vecPath.removeAllElements();
//			}
//			int rNumX = 0; // �����
//			int rNumY = 0; 
//			//��������Ѱ�ҳ���
//			if (0 >= randomCount) {
//				int maxval = 0;
//				for (int i = 0; i < 6; ++i) {
//					int temp = Math.abs(coorInMap.x - GameInfo.DIRINITPOSMAPCOOR[i].x) + 
//					Math.abs(coorInMap.y - GameInfo.DIRINITPOSMAPCOOR[i].y);
//					//������Զ�ĳ���
//					if (temp > maxval) {
//						maxval = temp;
//						destination = i;
//					}
//				}
//				vecPath = new AStar().search(coorInMap.x, coorInMap.y, 
//						GameInfo.DIRINITPOSMAPCOOR[destination].x, GameInfo.DIRINITPOSMAPCOOR[destination].y);
//				//System.out.println("Ѱ�ҵ��ĳ���X=" + GameInfo.DIRINITPOSMAPCOOR[destination].x + "  �ҵ��ĳ���Y=" + GameInfo.DIRINITPOSMAPCOOR[destination].y );
//			} else {
//				while (true) {
//					rNumX = Math.abs(random.nextInt() % GameInfo.MAPROW);
//					rNumY = Math.abs(random.nextInt() % GameInfo.MAPCOLUMN);
//					// �ҵ���λ���ǳ��ڻ򲻿����������
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
//					// Ѱ��·��ʧ�ܣ����������õ�������
//					if (count > 100) {
//						escape();
//						break;
//					}
//				}
//				//System.out.println("Ѱ�ҵ���X=" + rNumX + "  �ҵ���Y=" + rNumY );
//			}
//			currentDest = 0;
//			isResearching = true;
//		}
//		// ��ʼ�ƶ�
//		else{
//			getDir(vecPath);
//			if (!vecPath.isEmpty()) {
//				Point tempPt = (Point) vecPath.elementAt(vecPath.size() - 1);
////				for (int i = 0; i < vecPath.size(); ++i) {
////					//System.out.println(((Point)(vecPath.elementAt(i))).x + "  " + ((Point)(vecPath.elementAt(i))).y);
////				}
//				if (coorInMap.x == tempPt.x && coorInMap.y == tempPt.y) {
//					isResearching = false;
//					--randomCount; // �������������
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
//	 * ��ȡ����
//	 * @param vecPath Ҫ�ߵ�·��
//	 */
//	private void getDir(Vector vecPath) {
//		//System.out.println("��x=" + coorInMap.x + "��y=" + coorInMap.y);
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