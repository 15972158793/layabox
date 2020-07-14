/**
 * 工具字符串处理类
 * @class StrUtil
 * @constructor
 */

var StrUtil = (function () {

    function StrUtil() {
        StrUtil.__super.call(this);
    }

    Laya.class(StrUtil, "src.util.StrUtil", BaseClass);
    var _proto_ = StrUtil.prototype;
    /**
     * 去掉前后空格
     * @param {string} str
     * @returns {string}
     */
    _proto_.trimSpace = function(str) {
        return str.replace(/^\s*(.*?)[\s\n]*$/g, '$1');
    }

    /**
     * 字符串排序
     * @param {string} str1
     * @param {string} str2
     * @return {bool} str1.localeCompare(str2)表示升序 str2.local2Compare(str1)表示降序
     */
    _proto_.compare = function(str1,str2){
       return (str1+"").localeCompare(str2+"");
    }
    
    /**
     * 获取字符串长度，中文为2
     * @param {string} str
     * @return {number} 返回字符串的长度
     */
    _proto_.getLength = function(str) {
        var strArr = str.split("");
        var length = 0;
        for (var i = 0; i < strArr.length; i++) {
            var s = strArr[i];
            if (this.isChinese(s)) {
                length += 2;
            } else {
                length += 1;
            }
        }
        return length;
    }

    /**
     * 判断一个字符串是否包含中文
     * @param {string} str
     * @returns {boolean}
     */
    _proto_.isChinese = function(str) {
        var reg = /^.*[\u4E00-\u9FA5]+.*$/;
        return reg.test(str);
    }

    /**
     * 字符串用0对齐
     * @param {string} str 原始字符串
     * @param {number} digit 对齐位数
     * @return {string} 返回对齐奇后的字符串
     */
    _proto_.fillNum = function(str,digit){
        var len = str.length;
        var t = "";
        for(var k = 0; k < digit - len;k++){
            t += "0";
        }
        str = t + str;
        return str;
    }

    return StrUtil;
}());