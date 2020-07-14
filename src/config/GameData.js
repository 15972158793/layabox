/**
 * 游戏逻辑数据
 */
var GameData = {
    
    //重置下注数据
    resetBet : function(){
        Config.betInfo.betAmount = 0;
        Config.betInfo.betNumber = 0;
        Config.betInfo.betValues = "";
        Config.betInfo.playWay  = 0;
        Config.betInfo.playType = 0;
    },
    
    //记录版本号
    getVersion : function(){
        var v = Laya.LocalStorage.getItem("video_version");
        v = v || 0;
        Config.versionCode = v;
    },
    
    //
    setVersion:function(_version){
        Laya.LocalStorage.setItem("video_version",_version);
    },

    //本地保存字符串数据
    saveData:function(_key,_value){
        Laya.LocalStorage.setItem(_key,_value);
    },

    getData:function(_key){
        var val = Laya.LocalStorage.getItem(_key);
        val = val || "";
        return val;
    },

    //本地保存{}数据
    saveJsonData:function(_key,_value){
        Laya.LocalStorage.setJSON(_key,_value);
    },

    getJsonData:function(_key){
        var val = Laya.LocalStorage.getJSON(_key);
        val = val || "";
        return val;
    },

    //清除缓存
    clearCache:function(){
        Laya.LocalStorage.clear();
    }

}