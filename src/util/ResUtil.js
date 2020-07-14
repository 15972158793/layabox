/**
 * 资源管理器
 * @class ResUtil
 * @constructor
 */
var ResUtil = (function () {

    function ResUtil() {
        ResUtil.__super.call(this);
    }

    Laya.class(ResUtil, "src.util.ResUtil", BaseClass);
    var _proto_ = ResUtil.prototype;

    /**
     * 加载资源
     * @param {Array} resource: [{type: , url: }] 
     * @param {function} onResourceLoadComplete      
     * @param  {function}onResourceLoadProgress      
     * @param {any} onResourceLoadTarget        
     */
    _proto_.loadResource = function(resource, onResourceLoadTarget,onResourceLoadComplete,onResourceLoadProgress){
        Laya.loader.load(resource, Laya.Handler.create(onResourceLoadTarget, onResourceLoadComplete), Laya.Handler.create(onResourceLoadTarget, onResourceLoadProgress, null, false));
    }

    /**
     * 获取资源加载地址
     * @param {string} 一类型资源放置位置 
     * @param {string} 资源名字 
     * @param {string} 资源类型，默认png(png|jpg|)
     */
    _proto_.getUrl = function(host, name, resType){
        (resType === void 0) && (resType = ResourceType.PNG);
        return host + "/" + name + "." + resType;
    }

    /**
     * 静态加载脚本
     * @param {string} src
     */
    _proto_.loadScriptBySrc = function(src,call,callback){
        var script = Laya.Browser.createElement("script");
        script.src = src;
        script.onload = function(){
            if(call)callback.apply(call,[1]);
        }
        script.onerror = function(){
            if(call)callback.apply(call,[0]);
        }
        Laya.Browser.document.body.appendChild(script);
    }

    /**
     * 通过网络请求下载js文件后加载
     * @param {string} e 网络请求成功后返回的数据
     */
    _proto_.loadScriptByNet = function(e){
        var script = Laya.Browser.document.createElement("script");
        Laya.Browser.document.body.appendChild(script);
        script.innerHTML = e;
    }
    
    /**
     * 清理内存
     * @param {Array} assets 资源数组
     */
    _proto_.clearRes = function(assets){
        for (var i = 0, len = assets.length; i < len; ++i) {
            var asset = assets[i].url;
            Laya.loader.clearRes(asset);
        }
    }

    return ResUtil;
}());
