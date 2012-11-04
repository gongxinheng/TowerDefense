/**
 * ���˻���
 * @author ������
 *
 */
 // ������
var DIRUP = 0;
var DIRDOWN = 1;
var DIRLEFT = 2;
var DIRRIGHT = 3;
var Enemy = Class(object, {
    onCreate: function (id, type, pos) {
        this.id = id;                           // ����id
        this.numberDestIndex = 0;               // Ŀ�ĵس�������
        this.numberMaxHP = 0;                   // �������
        this.numberHP = this.numberMaxHP;       // ����
        this.numberMaxSpeed = 3;                // ����ٶ�
        this.numberSpeed = this.numberMaxSpeed;      // �����ٶ�
        this.numberDestination = 0;             // ����Ŀ�ĵ�
        this.numberDirection = DIRUP;           // ���˷���
        this.numberCost = 0;                    // ���˼�ֵ
        this.coorInMap = pos;                   // �ڵ�ͼ�е���������
        this.position = {};                     // ����λ��
        this.position.x = pos.x * TILESIZE;
        this.position.y = pos.y * TILESIZE;
        this.oldPosition = this.position;       // ��¼��һ�ε�λ��
        this.isAlive = false;                   // �Ƿ����
        this.isShouldDisapear = false;          // �Ƿ�Ӧ����ʧ
        this.numberLowSpeedTime = 5000;         // ����ʱ��5��
        this.numberStartLowSpeedTime = 0;       // ��ʼ���ٵ�ʱ��
        this.isTimeRecord = false;              // �Ƿ��Ѿ���¼ʱ��

        /////////////////////////////////////AI����/////////////////////////////////////////////
        this.initTime = 0; // ��¼��ʼ����ʱ��
        this.currentTime = 0; // ��ǰʱ��
        this.startRandomTime = 0; // ��ʼ�����ʱ��
        this.numberRandom = Math.random(); // ���������
        this.isAIBegin = false; // AI��ʼ
        this.isSearching = false; // �Ƿ�Ѱ·��
        this.vecPath = []; // ·��
        this.currentDest = 0; // ·����������
        this.randomCount = 2; // ����Ĵ���
        this.moveFailedCount = 0; // �ƶ�ʧ�ܴ���
    },

    /**
    * �����˹�����
    */
    AI: function () {
        this.coorInMap = CalcTilePos(this.position.x, this.position.y);
        // �ƶ�ʧ��ʮ���Զ����Ͳ�����Ѱ·
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
        // Ѱ·
        if (!this.isResearching) {
            print("Researching");
            // ���·��
            if (this.vecPath.length != 0) {
                this.vecPath.length = 0;
            }
            var rNumX = 0; // �����
            var rNumY = 0;
            //��������Ѱ�ҳ���
            if (this.randomCount <= 0) {
                var maxval = 0;
                for (var i = 0; i < DIRINITPOSMAPCOOR.length; ++i) {
                    var temp = Math.abs(this.coorInMap.x - GameInfo.DIRINITPOSMAPCOOR[i].x) +
					Math.abs(this.coorInMap.y - GameInfo.DIRINITPOSMAPCOOR[i].y);
                    //������Զ�ĳ���
                    if (temp > maxval) {
                        maxval = temp;
                        this.numberDestIndex = i;
                    }
                }

                vecPath = new AStar(MAPDATA).getPath(this.coorInMap.x, this.coorInMap.y,
						DIRINITPOSMAPCOOR[this.numberDestIndex].x, DIRINITPOSMAPCOOR[this.numberDestIndex].y);
                //System.out.println("Ѱ�ҵ��ĳ���X=" + GameInfo.DIRINITPOSMAPCOOR[destination].x + "  �ҵ��ĳ���Y=" + GameInfo.DIRINITPOSMAPCOOR[destination].y );
            } else {
                while (true) {
                    rNumX = Math.floor(Math.random() * MAPCOLUMN);
                    rNumY = Math.floor(Math.random() * MAPROW);
                    // �ҵ���λ���ǳ��ڻ򲻿����������
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
                    // Ѱ��·��ʧ�ܣ����������õ�������
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
        // ��ʼ�ƶ�
        else {
            this.getDir(vecPath);
            if (vecPath.length > 0) {
                var tempPt = vecPath[vecPath.length - 1];
                if (this.coorInMap.x == tempPt.x && this.coorInMap.y == tempPt.y) {
                    this.isResearching = false;
                    --this.randomCount; // �������������
                }
            }
            this.move();
        }
    },

    /**
    * ��ȡ����
    * vecPath Ҫ�ߵ�·��
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
    * �����ƶ�
    * 
    */
    move: function () {
        //print("posX = " + this.position.x + " posY=" + this.position.y);
        // ���ݷ����ж��ƶ�
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