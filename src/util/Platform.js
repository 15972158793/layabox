/**
 * 平台调用(h5下不可用)
 */
var Platform = (function(){

    function Platform(){
        Platform.__super.call(this);
        if("mobile" == Config.platform){
            this.os = conchConfig.getOS();
            this.bridge = null;
            if (this.os == "Conch-ios"){
                this.bridge = PlatformClass.createClass("JSBridge");//创建脚步代理
            }
            else if (this.os == "Conch-android") {
                //需要完整的类路径，注意与iOS的不同
                this.bridge = PlatformClass.createClass("demo.JSBridge");//创建脚步代理
            }
        }
        this.callback = null;
        this.target = null;
    }
    Laya.class(Platform,"src.util.Platform",BaseClass);
    var _proto_ = Platform.prototype;
    /**
     * 调起原生方法
     */
    _proto_.playVideo = function(_target,_callback){

        this.target = _target;
        if (this.os == "Conch-ios"){
            //iOS注意函数签名，注意与Android的不同
            /*alert(bridge.call("testString:","hello"));
            alert(bridge.call("testNumber:",256.0));
            alert(bridge.call("testBool:",false));
            obj.value = "Hello OC!";
            bridge.callWithBack(function(value) {
            var obj = JSON.parse(value)
            alert(obj.value);
            },"testAsyncCallback:", JSON.stringify(obj));*/
        }
        else if (this.os == "Conch-android") {
            var s = {};
            s.type = "android";
            s.url = _target.cfg.video;
            this.bridge.callWithBack(function(value) {
                if(_callback)_callback(value);
            },"playAndroidVideo",JSON.stringify(s));
        }else{

        }
    }

    _proto_.copyString = function(str){
        if (this.os == "Conch-ios"){
            //iOS注意函数签名，注意与Android的不同
            /*alert(bridge.call("testString:","hello"));
            alert(bridge.call("testNumber:",256.0));
            alert(bridge.call("testBool:",false));
            obj.value = "Hello OC!";
            bridge.callWithBack(function(value) {
            var obj = JSON.parse(value)
            alert(obj.value);
            },"testAsyncCallback:", JSON.stringify(obj));*/
        }
        else if (this.os == "Conch-android") {
            this.bridge.call("copyContent",str);
        }else{
            
        }
    }

    _proto_.playClose = function(){
        this.target.playClose();
    }

    //开始下载视频
    _proto_.startDownload = function(_target,_callback){
        this.target = _target;
        this.callback = _callback;
        if (this.os == "Conch-ios"){
            //iOS注意函数签名，注意与Android的不同
            /*alert(bridge.call("testString:","hello"));
            alert(bridge.call("testNumber:",256.0));
            alert(bridge.call("testBool:",false));
            obj.value = "Hello OC!";
            bridge.callWithBack(function(value) {
            var obj = JSON.parse(value)
            alert(obj.value);
            },"testAsyncCallback:", JSON.stringify(obj));*/
        }
        else if (this.os == "Conch-android") {
            var s = {};
            s.type = "android";
            s.url = _target.cfg.video;
            this.bridge.callWithBack(function(value) {
                if(_callback)_callback(value);
            },"downVideo",JSON.stringify(s));
        }else{
            
        }
    }
    
    //视频下载完成
    _proto_.endDownload = function(){
        Toast.show("视频下载完成",3000);
        this.target.isDownEnd = true;
    }

    

    return Platform;
}())