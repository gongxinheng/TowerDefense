
/*
 JS 封装成一个 C++层的面向对象形式
 */


var object =    //定义小写的object基本类，用于实现最基础的方法等
{
isA: function(aType)                            //一个判断类与类之间以及对象与类之间关系的基础方法
    {
        var self = this;
        while(self)
        {
            if (self == aType)
                return true;
            self = self.Type;
        };
        return false;
    }
};

function Class(aBaseClass, aClassDefine)        //创建类的函数，用于声明类及继承关系
{
    function class_()                           //创建类的临时函数壳
    {
        this.Type = aBaseClass;                 //我们给每一个类约定一个Type属性，引用其继承的类
        for(var member in aClassDefine)
            this[member] = aClassDefine[member];//复制类的全部定义到当前创建的类
    };
    class_.prototype = aBaseClass;
    
    var instans = new class_()                  //new 出一个实例
    
    instans.constructor = function(){           //对构造函数进行赋值
        var arr_arg = new Array();              //声明array结构
        for(var i in arguments){                //将参数组织成数组
            arr_arg.push(arguments[i]);
        }
        function new_(){
            this.Type = aClassDefine;
            if(aClassDefine.onCreate){
                
                aClassDefine.onCreate.apply( aClassDefine, arr_arg); //调用create函数
            }
        }
        new_.prototype = aClassDefine;          //对prototype赋值
        return new new_();                      //返回创建的实例
    }
    return instans.constructor;                 //返回构造函数
};
