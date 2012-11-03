/**
 * ��������
 * @author ������
 *
 */
var MAXAP = 100;	//��󹥻���
var MAXRANGE = 5;	//������
var MAXSHOOTSPEED = 3;	//�������
var MAXLEVEL = 3; // ��ߵȼ�
var TOWERHASDIRECTIONCOUNT = 3; // �з������������

var Tower = Class(object, {
    onCreate: function (id, type) {
        this.ID = id; //ʵ��ID��
        this.type = type; // ��������

        this.strName = ""; //������
        this.strIntroduce = ""; //����
        this.ap = 0; //������
        this.range = 0; //���
        this.rangeRadius = 0; //������Χ�뾶
        this.price = 0; //�۸�
        this.shootSpeed = 0; //����
        this.level = 1; //����
        this.hasDirection = false; // �Ƿ��з���
        this.isSpecial = false; // �Ƿ�����
    },

    /**
    * ��ȡID��
    */
    getID: function () {
        return this.ID;
    }
});
	
	/**
	 * ��ȡ����������Ϣ
	 * @param tower Ҫ��������
	 * @param upInfo �����������Ϣ
	 */
//	public static void getUpgradeInfo(RealTower tower, UpgradeInfo upInfo) {
//		
//		// �Ѵﵽ��߼��𣬷���ʧ��
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
//					upInfo.strName = "2������ǹ��";
//					upInfo.ap = 20; // ���Ĺ�����
//					upInfo.range = 2; // �������
//					upInfo.shootSpeed = 2; // ��������
//					upInfo.price = 10; // �����ļ۸�
//					upInfo.rangeRadius = 35; //��̰뾶
//				}
//					break;

//				case GameInfo.TOWER_NORMAL: {
//					upInfo.strName = "2����ͨ����";
//					upInfo.ap = 25; // ���Ĺ�����
//					upInfo.range = 2; // �������
//					upInfo.shootSpeed = 2; // ��������
//					upInfo.price = 15; // ���ļ۸�
//					upInfo.rangeRadius = 35; //��̰뾶
//				}
//					break;

//				case GameInfo.TOWER_FLYBULLET: {
//					upInfo.strName = "2���ɵ���";
//					upInfo.ap = 25; // ���Ĺ�����
//					upInfo.range = 3; // �������
//					upInfo.shootSpeed = 2; // ��������
//					upInfo.price = 15; // ���ļ۸�
//					upInfo.rangeRadius = 45; //��̰뾶
//				}
//					break;

//				case GameInfo.TOWER_FIREBULLET: {
//					upInfo.strName = "2�����浯��";
//					upInfo.ap = 40; // ���Ĺ�����
//					upInfo.range = 3; // �������
//					upInfo.shootSpeed = 1; // ��������
//					upInfo.price = 40; // ���ļ۸�
//					upInfo.rangeRadius = 45; //��̰뾶
//				}
//					break;

//				case GameInfo.TOWER_ICETOWER: {
//					upInfo.strName = "2���䶳����";
//					upInfo.ap = 20; // ���Ĺ�����
//					upInfo.range = 2; // �������
//					upInfo.shootSpeed = 1; // ��������
//					upInfo.price = 40; // ���ļ۸�
//					upInfo.rangeRadius = 35; //��̰뾶
//				}
//					break;

//				case GameInfo.TOWER_ELECTRIC: {
//					upInfo.strName = "2����������";
//					upInfo.ap = 40; // ���Ĺ�����
//					upInfo.range = 2; // �������
//					upInfo.shootSpeed = 2; // ��������
//					upInfo.price = 40; // ���ļ۸�
//					upInfo.rangeRadius = 35; //��̰뾶
//				}
//					break;

//				case GameInfo.TOWER_FINALTOWER: {
//					upInfo.strName = "2���ռ�����";
//					upInfo.ap = 80; // ���Ĺ�����
//					upInfo.range = 4; // �������
//					upInfo.shootSpeed = 1; // ��������
//					upInfo.price = 80; // ���ļ۸�
//					upInfo.rangeRadius = 50; //��̰뾶
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
//					upInfo.strName = "3������ǹ��";
//					upInfo.ap = 30; // ���Ĺ�����
//					upInfo.range = 3; // �������
//					upInfo.shootSpeed = 3; // ��������
//					upInfo.price = 15; // ���ļ۸�
//					upInfo.rangeRadius = 50; //��̰뾶
//				}
//					break;

//				case GameInfo.TOWER_NORMAL: {
//					upInfo.strName = "3����ͨ����";
//					upInfo.ap = 40; // ���Ĺ�����
//					upInfo.range = 3; // �������
//					upInfo.shootSpeed = 2; // ��������
//					upInfo.price = 25; // ���ļ۸�
//					upInfo.rangeRadius = 45; //��̰뾶
//				}
//					break;

//				case GameInfo.TOWER_FLYBULLET: {
//					upInfo.strName = "3���ɵ���";
//					upInfo.ap = 33; // ���Ĺ�����
//					upInfo.range = 4; // �������
//					upInfo.shootSpeed = 2; // ��������
//					upInfo.price = 25; // ���ļ۸�
//					upInfo.rangeRadius = 50; //��̰뾶
//				}
//					break;

//				case GameInfo.TOWER_FIREBULLET: {
//					upInfo.strName = "3�����浯��";
//					upInfo.ap = 60; // ���Ĺ�����
//					upInfo.range = 4; // �������
//					upInfo.shootSpeed = 2; // ��������
//					upInfo.price = 50; // ���ļ۸�
//					upInfo.rangeRadius = 50; //��̰뾶
//				}
//					break;

//				case GameInfo.TOWER_ICETOWER: {
//					upInfo.strName = "3���䶳����";
//					upInfo.ap = 35; // ���Ĺ�����
//					upInfo.range = 3; // �������
//					upInfo.shootSpeed = 2; // ��������
//					upInfo.price = 60; // ���ļ۸�
//					upInfo.rangeRadius = 45; //��̰뾶
//				}
//					break;

//				case GameInfo.TOWER_ELECTRIC: {
//					upInfo.strName = "3����������";
//					upInfo.ap = 50; // ���Ĺ�����
//					upInfo.range = 2; // �������
//					upInfo.shootSpeed = 2; // ��������
//					upInfo.price = 50; // ���ļ۸�
//					upInfo.rangeRadius = 35; //��̰뾶
//				}
//					break;

//				case GameInfo.TOWER_FINALTOWER: {
//					upInfo.strName = "3���ռ�����";
//					upInfo.ap = 100; // ���Ĺ�����
//					upInfo.range = 5; // �������
//					upInfo.shootSpeed = 2; // ��������
//					upInfo.price = 99; // ���ļ۸�
//					upInfo.rangeRadius = 60; //��̰뾶
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
//	 * ֱ������
//	 */
//	public static void dirUpgrade(RealTower tower, UpgradeInfo upInfo) {
//		tower.level = upInfo.level; // ����
//		tower.ap = upInfo.ap; // ���Ĺ�����
//		tower.range = upInfo.range; // �������
//		tower.shootSpeed = upInfo.shootSpeed; // ��������
//		tower.price += upInfo.price; // ���ļ۸�
//		tower.rangeRadius = upInfo.rangeRadius; //��̰뾶
//	}
//	
//	public static boolean upgrade(RealTower tower, UpgradeInfo upInfo) {
//		// ��Ҳ���
//		if (GameInfo.gold - upInfo.price < 0 || upInfo.level > 3) {
//			return false;
//		}
//		// �����ɹ�
//		else {
//			tower.level = upInfo.level; // ����
//			tower.ap = upInfo.ap; // ���Ĺ�����
//			tower.range = upInfo.range; // �������
//			tower.shootSpeed = upInfo.shootSpeed; // ��������
//			tower.price += upInfo.price; // ���ļ۸�
//			tower.rangeRadius = upInfo.rangeRadius; //��̰뾶
//			GameInfo.gold -= upInfo.price; // ���ٽ��
//			return true;
//		}
//	}
//}