/**
 * 时间
 * @class DateUtil
 * @constructor
 */
var DateUtil = (function () {

    function DateUtil() {
        DateUtil.__super.call(this);
    }

    Laya.class(DateUtil, "src.util.DateUtil", BaseClass);
    var _proto_ = DateUtil.prototype;

    /**
     * 1 格式化时间获取 00:00:00
     * @param {number} time 时间戳差 
     * @param {bool} isHour 是否显示小时
     * @return {setring} 返回格式化的时间
     */
    _proto_.formatTime = function (time,isHour) {
        if(isHour == null || isHour == undefined) isHour = true;
        var str = "";
        var h = Math.floor(time / 3600);
        //h = parseInt(h + "");
        var m = Math.floor((time - h * 3600) / 60);
        //m = parseInt(m + "");
        var s = time - h * 3600 - m * 60;
        //s = parseInt(s + "");

        if (isHour && h > 0) {
            str += h + ":";
        }

        if (m > 9) {
            str += m + ":";
        }
        else {
            str += "0" + m + ":";
        }
        if (s > 9) {
            str += s + "";
        }
        else {
            str += "0" + s;
        }
        return str;
    };
     
    /**
     * 秒数转天数
     * @param {number} seconds
     */
    _proto_.getDay = function(seconds){
        var day = 0;
        if(seconds == null || seconds < 0) seconds = 0;
        var num1 = seconds / (3600 * 24);
        day = Math.ceil(num1);
        return day;
    }
    
    /**
     * 使用时间戳返回yyyy-MM-dd hh:mm:ss
     * @param {number} 时间戳
     * @return {string} 返回指点格式字符串
     * */
    _proto_.millisecondsToString = function (time) {
        var now = new Date(time);
        var year=now.getFullYear();    
        var month=now.getMonth()+1;    
        var date=now.getDate();   
        var hour=now.getHours();
        var minute=now.getMinutes();    
        var second=now.getSeconds();    
        return  year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second; 
    };
    
    /**
     * 计算2个时间字符串的时间差
     * @param {string} time1
     * @param {string} time2
     * @return {number} 返回前一个字符串减去后一个字符串的时间s yyyy-mm-dd hh:mm:ss
     */
    _proto_.calDiffTime = function(time1,time2){
        /**注意
         * ios上只支持 yyyy/mm/dd hh:mm:ss
         * android和pc上支持 yyyy/mm/dd hh:mm:ss 或者 yyyy-mm-dd hh:mm:ss
         */
        if(time1 == null || time2 == null){
           return 0;
        }
        if(Tool.isIos()){
            time1 = time1.replace(/-/g, "/");
            time2 = time2.replace(/-/g, "/");
        }
        var num1 = Date.parse(new Date(time1));
        var num2 = Date.parse(new Date(time2));
        var num = Math.floor((num1 - num2) / 1000);
        return num;
    }

    /**
     * 当前Date格式化
     * @param {string} fmt 日期格式化参数
     */
    _proto_.format = function(fmt){
        var date = new Date();
        var o = {   
            "M+" : date.getMonth()+1,                 //月份   
            "d+" : date.getDate(),                    //日   
            "h+" : date.getHours(),                   //小时   
            "m+" : date.getMinutes(),                 //分   
            "s+" : date.getSeconds(),                 //秒   
            "q+" : Math.floor((date.getMonth()+3)/3), //季度   
            "S"  : date.getMilliseconds()             //毫秒   
        };
        if(/(y+)/.test(fmt))
            fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
        for(var k in o){
            if(new RegExp("("+ k +")").test(fmt)){
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
            }
        }
        return fmt;
    }


    return DateUtil;
}());