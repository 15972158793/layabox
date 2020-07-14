var Tool = {
    randomSort : function(a, b) { //随机排序
        return Math.random() > 0.5 ? -1 : 1;
    },
    numberToIndeies : function(n) {
        var ret = [];
        while(n >= 10){
            ret.push(n%10);
            n = Math.floor(n/10);
        }
        ret.push(n);
        ret.reverse();
        return ret;
    },
    getMondayTime : function(){//星期一早上8点
        var now = new Date(); 
        var nowTime = now.getTime() ; 
        var day = now.getDay();
        var oneDayLong = 24*60*60*1000; 
        var MondayTimeNow = nowTime - (day-1)*oneDayLong;
        var extraTime = MondayTimeNow%oneDayLong;
        var monday = new Date(MondayTimeNow - extraTime);
        var mondayTime = monday.getTime()/1000;
        return mondayTime;
    },
    getTodayTime : function(){ //今天0点时间戳
        var timeStamp = new Date(new Date().setHours(0, 0, 0, 0)) / 1000;
        var ToDayAgo = timeStamp;
        return ToDayAgo;
    },
    flipPositionY : function(pos) {
        return {
            x : pos.x,
            y : (Config.GameHeight-pos.y),
        };
    },

    log : function(logObj) {
        if(Config.isLog) console.log(logObj);
    },

    objectPrint : function(obj) {
        console.log(JSON.stringify(obj));
    },
    randomRange : function(Min,Max){
        var Range = Max - Min;
        var Rand = Math.random();
        return(Min + Math.round(Rand * Range));
    },

    isObjectEqual : function( x, y ) {
        // If both x and y are null or undefined and exactly the same
        if ( x === y ) {
            return true;
        }

        // If they are not strictly equal, they both need to be Objects
        if ( ! ( x instanceof Object ) || ! ( y instanceof Object ) ) {
            return false;
        }

        //They must have the exact same prototype chain,the closest we can do is
        //test the constructor.
        if ( x.constructor !== y.constructor ) {
            return false;
        }

        for ( var p in x ) {
            //Inherited properties were tested using x.constructor === y.constructor
            if ( x.hasOwnProperty( p ) ) {
                // Allows comparing x[ p ] and y[ p ] when set to undefined
                if ( ! y.hasOwnProperty( p ) ) {
                    return false;
                }

                // If they have the same strict value or identity then they are equal
                if ( x[ p ] === y[ p ] ) {
                    continue;
                }

                // Numbers, Strings, Functions, Booleans must be strictly equal
                if ( typeof( x[ p ] ) !== "object" ) {
                    return false;
                }

                // Objects and Arrays must be tested recursively
                if ( ! Object.equals( x[ p ], y[ p ] ) ) {
                    return false;
                }
            }
        }

        for ( p in y ) {
            // allows x[ p ] to be set to undefined
            if ( y.hasOwnProperty( p ) && ! x.hasOwnProperty( p ) ) {
                return false;
            }
        }
        return true;
    },
    returnCountDownStr : function(countDownTime){
        var countDownStr = "";
        if(countDownTime <= 0) return "00:00";
        var minuteTime = parseInt(countDownTime/60);
        var secondTime = parseInt(countDownTime % 60);
        if(minuteTime < 10) countDownStr += "0";
        countDownStr += minuteTime +":";
        if(secondTime < 10) countDownStr += "0";
        countDownStr += secondTime +"";
        return countDownStr;
    },
    NumAscSort: function(a,b){
        return a - b;
    },
    NumDescSort : function(a,b){
        return b - a;
    },
    
    //根据长度和进制数来生生成uuid
    getUUID : function (len, radix) {
        var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
        var chars = CHARS, uuid = [], i;
        radix = radix || chars.length;
        if (len) {
            for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
        } else {
            // rfc4122, version 4 form
            var r;
            // rfc4122 requires these characters
            uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
            uuid[14] = '4';
            // Fill in random data.  At i==19 set the high bits of clock sequence as
            // per rfc4122, sec. 4.1.5
            for (i = 0; i < 36; i++) {
                if (!uuid[i]) {
                    r = 0 | Math.random()*16;
                    uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                }
            }
        }
        return uuid.join('');
   },
    
    //判断微信
    isWx:function(){
        var info = Laya.Browser.window.navigator.userAgent.toLowerCase();
        return "micromessenger" == info.match(/MicroMessenger/i) ? true : false;
    },

    isAndroid:function(){
        var info = Laya.Browser.window.navigator.userAgent.toLowerCase();
        var r = info.indexOf('android') > -1;
        return r;
    },

    isIos:function(){
        var info = Laya.Browser.window.navigator.userAgent.toLowerCase();
        var r = info.indexOf('iphone') > -1 || info.indexOf('mac') > -1;
        return r;
    },

    isChrome:function(){
        if(!Tool.isIos()){
            var info = Laya.Browser.window.navigator.userAgent.toLowerCase();
            var r = info.indexOf('applewebkit') > -1;
            return r;
        }else{
            return false;
        }
    },
    
    /**是否移动端*/
    isApp:function(){
        if (/^.+(Mobile\/\w+)\s?$/.test(Laya.Browser.window.navigator.userAgent)) {
            return true;
        } else {
            return false;
        }
    },
     
    /**判断ios版本是否低于9*/
    isIOS9:function(){
        var getOsv = function () {
            var navigator = Laya.Browser.window.navigator;
            var reg = /OS ((\d+_?){2,3})\s/; 
            if (navigator.userAgent.match(/iPad/i) 
            || navigator.platform.match(/iPad/i) 
            || navigator.userAgent.match(/iP(hone|od)/i) 
            || navigator.platform.match(/iP(hone|od)/i)) {
                var osv = reg.exec(navigator.userAgent);
                if (osv.length > 0) {
                    return osv[0].replace('OS', '').replace('os', '').replace(/\s+/g, '').replace(/_/g, '.');
                }
            }
            return '';
        };
        var osv = getOsv();
        var osvArr = osv.split('.');
        //初始化显示ios9引导
        if (osvArr && osvArr.length > 0) {
            if (parseInt(osvArr[0]) >= 9) {
                return true
            }
        }
        return false;
    },

    getUrlParams:function(url,key) {
        var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
        var result = url.substr(1).match(reg);
        if (result != null) {
            return decodeURIComponent(result[2]);
        } else {
            return null;
        }
    }

};
