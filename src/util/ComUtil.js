/**
 * 工具常用算法类 操作Object和{}
 * @class ComUtil
 * @constructor
 * @param {}
 */

var ComUtil = (function () {

    function ComUtil() {
        ComUtil.__super.call(this);
    }
    Laya.class(ComUtil, "src.util.ComUtil", BaseClass);
    /**
     * 属性说明
     * @property {Object} _proto_
     */
    var _proto_ = ComUtil.prototype;
    /**
     * 多层次深拷贝 Function Array Object
     * @param {any}
     * @return {any}
     */
    _proto_.copy = function(obj) {
        var newObj;
        if(obj instanceof Function){
            return obj;
        }
        else if (obj instanceof Array) {
            newObj = [];
        }else if (obj instanceof Object) {
            newObj = {};
        }else {
            return obj;
        }
        var keys = this.getObjKeys(obj);
        for (var i = 0, len = keys.length; i < len; i++) {
            var key = keys[i];
            newObj[key] = this.copy(obj[key]);
        }
        return newObj;
    }

    /**
     * int64转number
     * @param {any} obj
     * @return {number}
     */
    _proto_.int64ToNumber = function(obj) {
        return parseInt(obj.toString());
    }

    /**
     * 判断Key是否在object中
     * @param {any} obj
     * @param {string} key
     * @return {boolean} 返回一个bool
     */
    _proto_.isKey = function(obj,key){
       return obj.hasOwnProperty(key);
    }
     
    /**
     * 判断2个对象是否值相等
     * @param {any} obj1
     * @param {any} obj2
     * @return {boolean} 判断是否值相等
     */
    _proto_.isEqualObj = function(obj1,obj2) {
        
        //1.先对{}排序
        var _obj1 = this.objKeySort(obj1);
        var _obj2 = this.objKeySort(obj2);
        var s1 = JSON.stringify(_obj1);
        var s2 = JSON.stringify(_obj2);
        return s1 == s2; 
    };

    /*
    * Object的操作
    //返回对象的key
    var s1 = Object.keys(jsVal);
    //包含所有的key和val
    var s2 = Object.entries(jsVal);
    //返回对象的key
    var s3 = Object.getOwnPropertyNames(jsVal);
    //返回对象的value
    var s5 = Object.values(jsVal);
    */
    
    /**
     * 对象属性名升序排序  最多再包含一层对象
     * @param {any} obj
     * @return {any} 返回升序的对象
     */
    _proto_.objKeySort = function(obj) {
        //1.获取所有的key值
        var newkey = this.getObjKeys(obj);
        //2.key值字符串排序
        newkey.sort(function(a,b){
            return App.StrUtil.compare(a,b);
        });
    　　//3.新建obj存储排序好的key value
        var newObj = {};
        for (var i = 0; i < newkey.length; i++){
            var valObj = obj[newkey[i]];
            if(valObj instanceof Array){
                
            }
            else if(valObj instanceof Object){
                //{} 子对象再排一次序
                valObj = this.objKeySort(valObj);
            }else{

            }
            newObj[newkey[i]] = valObj;
        }
        return newObj;
    }

    /**
     * 合并2个对象
     * @param {any} target
     * @param {any} source
     * @return {any} 返回合并后的target
     */
    _proto_.mergeObj = function(target,source){
        return Object.assign(target,source);
    }

    /**
     * 获取对象的所有key
     * @param {any} obj
     * @return {Array} 返回obj的keys数组
     */
    _proto_.getObjKeys = function(obj){
        return Object.keys(obj);
    }

    

    return ComUtil;
}());