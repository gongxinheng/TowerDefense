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
    }
});