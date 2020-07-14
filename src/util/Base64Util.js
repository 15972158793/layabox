/**
 * Base64转换工具
 */
var Base64Util = (function(){
    /**
     * 构造函数
     */
    function Base64Util(){
        Base64Util.__super.call(this);
        //定义属性
        this.keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

    }
    Laya.class(Base64Util,"src.util.Base64Util",BaseClass);
    //定义原型链上的函数
    var _proto_ = Base64Util.prototype;
    /**
     * base64转buffer
     * @param {string} base64
     */
    _proto_.toArrayBuffer = function(base64){
        var bytes = (base64.length/4) * 3;
        var arrayBuffer = new ArrayBuffer(bytes);
        this.decode(base64,arrayBuffer);
        return arrayBuffer;
    }

    /**
     * ArrayBuffer转base64
     * @param {ArrayBuffer} buffer 二进制数据
     * 转图片的base64只需要在结果前面加上'data:image/png;base64,'字符串即可
     */
    _proto_.toBase64 = function (buffer) {
        var binary = '';
        var bytes = new Uint8Array(buffer);
        for (var len = bytes.byteLength, i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    }
    
    /**
     * 删除空格字符
     */
    _proto_.removePaddingChars = function(base64){
        var s = this.keyStr.indexOf(base64.charAt(base64.length-1));
        if(s == 64){
            return base64.substring(0,base64.length-1);
        }else{
            return base64;
        }
    }

    /**
     * LZW压缩算法
     */
    _proto_.lzwCompress = function(base64){
        
    }

    /**
     * 算数编码
     */

    /**
     * 哈夫曼编码
     */


    /**
     * 编码
     */
    _proto_.decode = function(base64,buffer){
        
        base64 = this.removePaddingChars(base64);
        var bytes = parseInt((base64.length/4)*3,10);
        var uarray;
        if (buffer){
            uarray = new Uint8Array(buffer);
        }else{
            uarray = new Uint8Array(bytes);
        }
        base64 = base64.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        var j = 0;
        for (i = 0; i < bytes; i += 3) {  
            enc1 = this.keyStr.indexOf(base64.charAt(j++));
            enc2 = this.keyStr.indexOf(base64.charAt(j++));
            enc3 = this.keyStr.indexOf(base64.charAt(j++));
            enc4 = this.keyStr.indexOf(base64.charAt(j++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            uarray[i] = chr1;      
            if (enc3 != 64) uarray[i+1] = chr2;
            if (enc4 != 64) uarray[i+2] = chr3;
        }
        return uarray;
    }
    
    /**
     * 压缩 目前提升了1倍
     * @param {string} strNormalString
     */
    _proto_.compress = function(strNormalString){
        Tool.log("压缩前长度：" + strNormalString.length);
        var strCompressedString = "";
        var ht = new Array();
        for(i = 0; i < 128; i++)ht[i] = i;
        var used = 128;

        var intLeftOver = 0;
        var intOutputCode = 0;
        var pcode = 0;
        var ccode = 0;
        var k = 0;
        for(var i=0; i<strNormalString.length; i++) {
            //读入1个字符
            ccode = strNormalString.charCodeAt(i);
            k = (pcode << 8) | ccode;
            if(ht[k] != null) {
                pcode = ht[k];
            } else {
                intLeftOver += 12;
                intOutputCode <<= 12;
                intOutputCode |= pcode;
                pcode = ccode;
                if(intLeftOver >= 16) {
                    strCompressedString += String.fromCharCode( intOutputCode >> ( intLeftOver - 16 ) );
                    intOutputCode &= (Math.pow(2, (intLeftOver - 16)) - 1);
                    intLeftOver -= 16;
                }
                if(used < 4096) {
                    used ++;
                    ht[k] = used - 1;
                }
            }
        }
        if(pcode != 0) {
            intLeftOver += 12;
            intOutputCode <<= 12;
            intOutputCode |= pcode;
        }

        if(intLeftOver >= 16) {
            strCompressedString += String.fromCharCode( intOutputCode >> ( intLeftOver - 16 ) );
            intOutputCode &= (Math.pow(2,(intLeftOver - 16)) - 1);
            intLeftOver -= 16;
        }
        if( intLeftOver > 0) {
            intOutputCode <<= (16 - intLeftOver);
            strCompressedString += String.fromCharCode( intOutputCode );
        }
        Tool.log("压缩后长度：" + strCompressedString.length);
        return strCompressedString;
    }

    /**
     * 解压缩
     */
    _proto_.deCompress = function(strCompressedString) {
        Tool.log("压缩前长度：" + strCompressedString.length);
        var strNormalString = "";
        var ht = new Array();
        for(i = 0; i < 128; i++) {
            ht[i] = String.fromCharCode(i);
        }
        var used = 128;
        var intLeftOver = 0;
        var intOutputCode = 0;
        var ccode = 0;
        var pcode = 0;
        var key = 0;
        for(var i=0; i<strCompressedString.length; i++) {
            intLeftOver += 16;
            intOutputCode <<= 16;
            intOutputCode |= strCompressedString.charCodeAt(i);
            while(1) {
                if(intLeftOver >= 12) {
                    ccode = intOutputCode >> (intLeftOver - 12);
                    if( typeof( key = ht[ccode] ) != "undefined" ) {
                        strNormalString += key;
                        if(used > 128) {
                            ht[ht.length] = ht[pcode] + key.substr(0, 1);
                        }
                        pcode = ccode;
                    } else {
                        key = ht[pcode] + ht[pcode].substr(0, 1);
                        strNormalString += key;
                        ht[ht.length] = ht[pcode] + key.substr(0, 1);
                        pcode = ht.length - 1;
                    }
                    used ++;
                    intLeftOver -= 12;
                    intOutputCode &= (Math.pow(2,intLeftOver) - 1);
                } else {
                    break;
                }
            }
        }
        Tool.log("压缩后长度：" + strNormalString.length);
        return strNormalString;
    }

    return Base64Util;
}())