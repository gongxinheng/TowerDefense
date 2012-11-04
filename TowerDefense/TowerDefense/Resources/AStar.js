var AStar = function (map) {
    //dh20156;
    this.map = map;
    //已探索列表
    this.chkList = [];
    //开放对象列表
    this.openList = [];
    print("find!!");
    //取G值
    this.getG = function (x0, y0, x1, y1) {
        if (Math.abs(x0 - x1) == 1 && Math.abs(y0 - y1) == 1) {
            return 14;
        } else {
            return 10;
        }
    }
    //取H值Diagonal Shortcut
    this.getH = function (x0, y0, x1, y1) {
        var xDistance = Math.abs(x0 - x1);
        var yDistance = Math.abs(y0 - y1);
        if (xDistance > yDistance) {
            return (14 * yDistance + 10 * (xDistance - yDistance));
        } else {
            return (14 * xDistance + 10 * (yDistance - xDistance));
        }
    }
    //节点对象
    this.point = function (_f, _g, _h, _x, _y, _p) {
        this.f = _f;
        this.g = _g;
        this.h = _h;
        this.x = _x;
        this.y = _y;
        this.p = _p;
    }
    //获取检测子节点对象
    this.setPoints = function (_node, x1, y1) {
        var map = this.map;
        var x = _node.x;
        var y = _node.y;
        var g = _node.g;
        var t = x - 1;
        var b = x + 1;
        var l = y - 1;
        var r = y + 1;
        var maxX = map.length;
        var maxY = map[0].length;
        if (t >= 0 && l >= 0 && map[t][l] == 0 && map[t][y] == 0 && map[x][l] == 0) this.chkPoint(_node, x, y, g, t, l, x1, y1); //1
        if (t >= 0 && map[t][y] == 0) this.chkPoint(_node, x, y, g, x - 1, y, x1, y1); //2
        if (t >= 0 && r < maxY && map[t][r] == 0 && map[t][y] == 0 && map[x][r] == 0) this.chkPoint(_node, x, y, g, t, r, x1, y1); //3
        if (l >= 0 && map[x][l] == 0) this.chkPoint(_node, x, y, g, x, y - 1, x1, y1); //4
        if (r < maxY && map[x][r] == 0) this.chkPoint(_node, x, y, g, x, y + 1, x1, y1); //6
        if (b < maxX && l >= 0 && map[b][l] == 0 && map[x][l] == 0 && map[b][y] == 0) this.chkPoint(_node, x, y, g, b, l, x1, y1); //7
        if (b < maxX && map[b][y] == 0) this.chkPoint(_node, x, y, g, x + 1, y, x1, y1); //8
        if (b < maxX && r < maxY && map[b][r] == 0 && map[b][y] == 0 && map[x][r] == 0) this.chkPoint(_node, x, y, g, b, r, x1, y1); //9
    }
    //检测子节点对象
    this.chkPoint = function (_fnode, _x0, _y0, _g, _x1, _y1, _x2, _y2) {
        var open = this.openList;
        var chk = this.chkList;
        var _id = new String(_x1 + '_' + _y1);
        var _point = null;
        if (undefined == (_point = chk[_id])) {
            _point = new this.point(0, 0, 0, _x1, _y1, _fnode);
            open[open.length] = _point;
            chk[_id] = _point;
            _point.g = _g + this.getG(_x0, _y0, _x1, _y1); //起点到当前点实际值
            _point.h = this.getH(_x1, _y1, _x2, _y2); 	//终点到当前点的估价
            _point.f = _point.g + _point.h;
        } else {
            var _CNG = _g + this.getG(_x0, _y0, _x1, _y1);
            if (_point.g > _CNG) {//保留小G，替换parentNode
                _point.g = _CNG;
                _point.f = _point.g + _point.h;
                _point.p = _fnode;
            }
        }
    }
    //探索路径
    this.getPath = function (x0, y0, x1, y1) {
        print("x0 = " + x0 + "y0 = " + y0);
        var st = new Date();
        var tp = [];
        var open = this.openList;
        var map = this.map;
        if (map[x0][y0] != 0 || map[x1][y1] != 0) {
            return tp;
        }
        var _sh = this.getH(x0, y0, x1, y1);
        open[0] = new this.point(_sh, 0, _sh, x0, y0, null);
        var oll = 0, nowNode = null;
        while (0 < (oll = open.length)) {
            var maxNode, minIndex, minf = 10000000000;
            for (var i = 0; i < oll; i++) {
                maxNode = open[i];
                if (minf > maxNode.f) {
                    minf = maxNode.f;
                    minIndex = i;
                }
            }
            nowNode = open[minIndex];
            open[minIndex] = open[oll - 1];
            open.length--;
            if (nowNode.x == x1 && nowNode.y == y1) {
                while (nowNode.p != null) {
                    tp.push([nowNode.x, nowNode.y]);
                    nowNode = nowNode.p;
                }
                tp.push([x0, y0]);
                break;
            }
            this.setPoints(nowNode, x1, y1);
        }
        open = this.openList = this.chkList = map = [];
        //document.title = new Date() - st + ' ms, ' + tp.length + 'steps.';
        return tp.slice(0).reverse();
    }
}



//<style type="text/css">
//table {
//	border-left:#CCC 1px solid;
//	border-top:#CCC 1px solid;
//	border-collapse:collapse;
//}
//td {
//	border-right:#CCC 1px solid;
//	border-bottom:#CCC 1px solid;
//	height:10px;
//	width:10px;
//	font-size:0px;
//	color:highlight;
//}
//</style>
//<body>
//<div align="center">
//  <script type="text/javascript">
//var map = function(){
//	var owner = this;
//	//起点
//	this.startNode = [];
//	//map table
//	this.table = null;
//	//清除颜色
//	this.clearColor = function(){
//		var xl = this.length;
//		if(xl<1){
//			return;
//		}
//		var yl = this[0].length;
//		if(yl<1){
//			return;
//		}
//		var maptable = this.table;
//		maptable.style.display = 'none';
//		for(var i=0;i<xl;i++){
//			for(var n=0;n<yl;n++){
//				maptable.rows[i].cells[n].style.background='';
//				if(this[i][n]!=0){
//					maptable.rows[i].cells[n].style.background='background';
//				}
//			}
//		}
//		maptable.style.display = 'block';
//	}
//	//寻路
//	this.run = function(obj){
//		var x0=0,y0=0,x1=0,y1=0;
//		var _sn = this.startNode;
//		var _en = this.endNode;
//		if(_sn.length<1){
//			obj.style.background = 'red';
//			x0 = obj.parentNode.rowIndex;
//			y0 = obj.cellIndex;
//			this.startNode = [x0,y0];
//		}else{
//			this.clearColor();
//			obj.style.background = 'red';
//			x0 = _sn[0];
//			y0 = _sn[1];
//			x1 = obj.parentNode.rowIndex;
//			y1 = obj.cellIndex;
//			var path = this.getPath(x0,y0,x1,y1);
//			this.showPath(path);
//			this.startNode = [x1,y1];
//		}
//	}
//	//点击事件
//	this.click = function(event){
//		event = event||window.event;
//		var obj = event.srcElement||event.target;
//		if(obj.tagName!='TD'){
//			return;
//		}
//		owner.run(obj);
//	}
//	//创建视图
//	this.setView = function(){
//		var xl = this.length;
//		if(xl<1){
//			return;
//		}
//		var yl = this[0].length;
//		if(yl<1){
//			return;
//		}
//		var trstr = '<tr>'+new Array(yl+1).join('<td></td>')+'</tr>';
//		var tbstr = '<table id="amap">'+new Array(xl+1).join(trstr)+'</table>';
//		document.write(tbstr);
//		var maptable = this.table = document.getElementById("amap");
//		for(var i=0;i<xl;i++){
//			for(var n=0;n<yl;n++){
//				if(this[i][n]!=0){
//					maptable.rows[i].cells[n].style.background='background';
//				}
//			}
//		}
//		if(window.attachEvent){
//			this.table.attachEvent('onclick',this.click);
//		}else{
//			this.table.addEventListener('click',this.click,false);
//		}
//	}
//	//显示路径
//	this.showPath = function(path){
//		if(path!=undefined && path.length>0){
//			var maptable = this.table;
//			var pos = null;
//			var move = function(){
//				if(path.length>0){
//					pos = path.shift();
//					maptable.rows[pos[0]].cells[pos[1]].style.background='red';
//					window.setTimeout(arguments.callee,30);
//				}
//			}
//			move();
//		}else{
//			document.title = 'Did not find the path!';
//		}
//	}
//}

//var Astar = function(map){
//	//dh20156;
//	this.map = map;
//	//已探索列表
//	this.chkList = [];
//	//开放对象列表
//	this.openList = [];
//	//取G值
//	this.getG = function(x0,y0,x1,y1){
//		if(Math.abs(x0-x1)==1 && Math.abs(y0-y1)==1){
//			return 14;
//		}else{
//			return 10;
//		}
//	}
//	//取H值Diagonal Shortcut
//	this.getH = function(x0,y0,x1,y1){
//		var xDistance = Math.abs(x0-x1);
//		var yDistance = Math.abs(y0-y1);
//		if(xDistance > yDistance){
//			return (14*yDistance + 10*(xDistance-yDistance));
//		}else{
//			return (14*xDistance + 10*(yDistance-xDistance));
//		}
//	}
//	//节点对象
//	this.point = function(_f,_g,_h,_x,_y,_p){
//		this.f = _f;
//		this.g = _g;
//		this.h = _h;
//		this.x = _x;
//		this.y = _y;
//		this.p = _p;
//	}
//	//获取检测子节点对象
//	this.setPoints = function(_node,x1,y1){
//		var map = this.map;
//		var x = _node.x;
//		var y = _node.y;
//		var g = _node.g;
//		var t = x-1;
//		var b = x+1;
//		var l = y-1;
//		var r = y+1;
//		var maxX = map.length;
//		var maxY = map[0].length;
//		if(t>=0 && l>=0 && map[t][l]==0 && map[t][y]==0 && map[x][l]==0) this.chkPoint(_node,x,y,g,t,l,x1,y1);//1
//		if(t>=0 && map[t][y]==0) this.chkPoint(_node,x,y,g,x-1,y,x1,y1);//2
//		if(t>=0 && r<maxY && map[t][r]==0 && map[t][y]==0 && map[x][r]==0) this.chkPoint(_node,x,y,g,t,r,x1,y1);//3
//		if(l>=0 && map[x][l]==0) this.chkPoint(_node,x,y,g,x,y-1,x1,y1);//4
//		if(r<maxY && map[x][r]==0) this.chkPoint(_node,x,y,g,x,y+1,x1,y1);//6
//		if(b<maxX && l>=0 && map[b][l]==0 && map[x][l]==0 && map[b][y]==0) this.chkPoint(_node,x,y,g,b,l,x1,y1);//7
//		if(b<maxX && map[b][y]==0) this.chkPoint(_node,x,y,g,x+1,y,x1,y1);//8
//		if(b<maxX && r<maxY && map[b][r]==0 && map[b][y]==0 && map[x][r]==0) this.chkPoint(_node,x,y,g,b,r,x1,y1);//9
//	}
//	//检测子节点对象
//	this.chkPoint = function(_fnode,_x0,_y0,_g,_x1,_y1,_x2,_y2){
//		var open = this.openList;
//		var chk = this.chkList;
//		var _id = new String(_x1+'_'+_y1);
//		var _point = null;
//		if(undefined == (_point = chk[_id])){
//			_point = new this.point(0,0,0,_x1,_y1,_fnode);
//			open[open.length] = _point;
//			chk[_id] = _point;
//			_point.g = _g + this.getG(_x0,_y0,_x1,_y1);	//起点到当前点实际值
//			_point.h = this.getH(_x1,_y1,_x2,_y2);		//终点到当前点的估价
//			_point.f = _point.g + _point.h;
//		}else{
//			var _CNG = _g + this.getG(_x0,_y0,_x1,_y1);
//			if(_point.g>_CNG){//保留小G，替换parentNode
//				_point.g = _CNG;
//				_point.f = _point.g + _point.h;
//				_point.p = _fnode;
//			}
//		}
//	}
//	//探索路径
//	this.getPath = function(x0,y0,x1,y1){
//		var st = new Date();
//		var tp = [];
//		var open = this.openList;
//		var map = this.map;
//		if(map[x0][y0]!=0 || map[x1][y1]!=0){
//			return tp;
//		}
//		var _sh = this.getH(x0,y0,x1,y1);
//		open[0] = new this.point(_sh,0,_sh,x0,y0,null);
//		var oll=0,nowNode=null;
//		while(0<(oll=open.length)){
//			var maxNode,minIndex,minf=10000000000;
//			for(var i=0;i<oll;i++){
//				maxNode = open[i];
//				if(minf>maxNode.f){
//					minf = maxNode.f;
//					minIndex = i;
//				}
//			}
//			nowNode = open[minIndex];
//			open[minIndex] = open[oll-1];
//			open.length--;
//			if(nowNode.x==x1 && nowNode.y==y1){
//				while(nowNode.p!=null){
//					tp.push([nowNode.x,nowNode.y]);
//					nowNode = nowNode.p;
//				}
//				tp.push([x0,y0]);
//				break;
//			}
//			this.setPoints(nowNode,x1,y1);
//		}
//		open = this.openList = this.chkList = map = [];
//		document.title = new Date()-st+' ms, '+tp.length+'steps.';
//		return tp.slice(0).reverse();
//	}
//}

//var maps = [ // handest
//	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//	[0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//	[0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//	[0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//	[0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//	[0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//	[0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//	[0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//	[0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//	[0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//	[0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//	[0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//	[0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//	[0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,1,1,1,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//	[0,0,0,0,1,0,1,0,0,0,0,0,1,0,1,1,1,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//	[0,0,1,1,1,0,1,0,0,0,0,0,1,0,0,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//	[0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//	[0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,1,0,0,1,1,1,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//	[0,0,1,1,1,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//	[0,0,0,0,1,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//	[0,0,0,0,1,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0,1,1,1,1,1,1,1,1,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
//	[0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,1,0,1,0,0,1,0,1,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
//	[0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,1,0,1,0,0,1,0,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,1,0,0,0,0,0,0,0],
//	[0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,1,0,1,0,0,1,0,1,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
//	[0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,1,0,0,1,0,1,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
//	[0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,0,0,0,0,0,0,0],
//	[0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0],
//	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0],
//	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,1,0,0,0,1,1,0,0,1,1,1,1,1,1,1,0,0,1,0,0,0,0,0,0,0,0,0,0],
//	[0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,1,0,0,1,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0],
//	[0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0],
//	[0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
//	[0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
//	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
//	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0],
//	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
//	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
//	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
//	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
//	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0],
//	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0],
//	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0],
//	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
//];

//map.call(maps);
//maps.setView();
//Astar.call(maps,maps);

//  </script>
//在白色表格中点击，第一次设置起点，第二次设置终点，将自动找到路径。
//</div>
//</body>