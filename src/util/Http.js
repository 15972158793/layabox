/**
 * Http请求
 * @class Http
 * @constructor
 */
var isHttpLoaded = false;
var Http = function(){
 
    function Http(){
        this.callback = null;
        this.caller = null;
        this.http = null;
        this.httpCount = 0;
        this.tag = "";
        this.time = 0;
    }
    Laya.class(Http, "src.util.Http");
    var _proto = Http.prototype;
    
    //get
    Http.getRequestGame = function(model,param,caller,callback,_tag){
        var _http = new Http();
        _http.getRequestGame(model,param,caller,callback,_tag);
    }
    
    Http.getRequestLogin = function(model,param,caller,callback,_tag){
        var _http = new Http();
        _http.getRequestLogin(model,param,caller,callback,_tag);
    }
    
    //post
    Http.postRequestGame = function(model,data,caller,callback,contentType,_tag){
        var _http = new Http();
        _http.postRequestGame(model,data,caller,callback,contentType,_tag);
    }

    Http.postRequestLogin = function(model,data,caller,callback,contentType,_tag){
        var _http = new Http();
        _http.postRequestLogin(model,data,caller,callback,contentType,_tag);
    }
    
    Http.postRequestUser = function(model,data,caller,callback,contentType,_tag){
        var _http = new Http();
        _http.postRequestUser(model,data,caller,callback,contentType,_tag);
    }

    Http.postRequestPanel = function(model,data,caller,callback,contentType,_tag){
        var _http = new Http();
        _http.postRequestPanel(model,data,caller,callback,contentType,_tag);
    }

    Http.getUserInfo = function(caller,callback){
         if(Config.userID == "") return;
         var _http = new Http();
        _http.getUserInfo(caller,callback);
    }

    /********************************************************************/
    /**
     * 创建Http实例
     */
    _proto.instance = function(){
        this.httpCount += 1;
        this.time = 0;
        this.http = new Laya.HttpRequest();
    }

    _proto.getUserInfo = function(caller,callback){
        if(this.http == null){
           this.instance();
        }
        var url = Config.gameServerUrl +  "rest/user/userInfo/" + Config.userID;
        Tool.log("requestUrl: " + url);
        this.caller = caller;
        this.callback = callback;
        this.tag = "USER";
        //this.http.once(Laya.Event.PROGRESS, this, this.onHttpRequestProgress);
		this.http.once(Laya.Event.COMPLETE, this, this.onHttpRequestComplete);
		this.http.once(Laya.Event.ERROR, this, this.onHttpRequestError);
        this.http.send(url, null, 'get');
        //
        Laya.timer.clearAll(this);
        Laya.timer.loop(1000,this,this.daojishi);
    }

    /**
     * get请求游戏服务器 无用户数据
     * @param {string} model 模块
     * @param {string} param 参数
     * @param {Object} caller 回调者
     * @param {function} callback 回调函数
     * @param {string} _tag 请求的类别
     */
    _proto.getRequestGame = function(model,param,caller,callback,_tag){
        //多次点击拦截
        if(isHttpLoaded) return;
        isHttpLoaded = true;

        if(this.http == null){
           this.instance();
        }
        //  server  http://192.168.8.223:8001/public/   
        //  model   play/history
        //  param   1/1/4
        var url = Config.gameServerUrl + model + param;
        Tool.log("requestUrl: " + url + "   tag: " + _tag);
        this.caller = caller;
        this.callback = callback;
        this.tag = (_tag == undefined || _tag == null) ? "TAG" : _tag;
        //this.http.once(Laya.Event.PROGRESS, this, this.onHttpRequestProgress);
		this.http.once(Laya.Event.COMPLETE, this, this.onHttpRequestComplete);
		this.http.once(Laya.Event.ERROR, this, this.onHttpRequestError);
        this.http.send(url, null, 'get');
        //
        Laya.timer.clearAll(this);
        Laya.timer.loop(1000,this,this.daojishi);
    }
     
    /**
     * get请求登录服务器
     * @param {string} model 模块
     * @param {string} param 参数
     * @param {Object} caller 回调者
     * @param {function} callback 回调函数
     * @param {string} _tag 请求类别
     */
    _proto.getRequestLogin = function(model,param,caller,callback,_tag){
        //多次点击拦截
        if(isHttpLoaded) return;
        isHttpLoaded = true;

        if(this.http == null){
           this.instance();
        }
        //  server  http://192.168.8.223:8001/public/   
        //  model   play/history
        //  param   1/1/4
        var url = Config.loginServerUrl + model + param;
        Tool.log("requestUrl: " + url + "   tag: " + _tag);
        this.caller = caller;
        this.callback = callback;
        this.tag = (_tag == undefined || _tag == null) ? "TAG" : _tag;
        //this.http.once(Laya.Event.PROGRESS, this, this.onHttpRequestProgress);
		this.http.once(Laya.Event.COMPLETE, this, this.onHttpRequestComplete);
		this.http.once(Laya.Event.ERROR, this, this.onHttpRequestError);
        this.http.send(url, null, 'get');
        //
        Laya.timer.clearAll(this);
        Laya.timer.loop(1000,this,this.daojishi);
    }
    
    /**
     * post请求游戏服务器  用户数据+加密
     * @param {string} model 模块
     * @param {Object} data JSON对象
     * @param {Object} caller 回调者
     * @param {function} callback 回调函数
     * @param {string} contentType 数据协议
     * @param {string} _tag 请求类别
     */
    _proto.postRequestUser = function(model,jsdata,caller,callback,contentType,_tag){

        //多次点击拦截
        if(isHttpLoaded) return;
        isHttpLoaded = true;
        if(this.http == null){
           this.instance();
        }
        jsdata.userId = Config.userID;
        //jsdata进行排序
        jsdata = App.ComUtil.objKeySort(jsdata);
        //jsdata的value全部转字符串
        var newkey = App.ComUtil.getObjKeys(jsdata);
        for (var i = 0; i < newkey.length; i++){
            jsdata[newkey[i]] = "" + jsdata[newkey[i]];
        }
        var data = JSON.stringify(jsdata);
        //http请求带上加密字段
        Tool.log("signData: " + data + Config.gameToken);
        var sign = MD5(data + Config.gameToken);
        //url
        var url = Config.gameServerUrl + model + "/" + sign;
        Tool.log("requestUrl: " + url + "   tag: " + _tag);
        this.caller = caller;
        this.callback = callback;
        this.tag = (_tag == undefined || _tag == null) ? "TAG" : _tag;
        //this.http.once(Laya.Event.PROGRESS, this, this.onHttpRequestProgress);
		this.http.once(Laya.Event.COMPLETE, this, this.onHttpRequestComplete);
		this.http.once(Laya.Event.ERROR, this, this.onHttpRequestError);
        if(contentType==null || contentType == undefined){
            //默认传入json
            this.http.send(url, data, 'post',"application/json",["Content-Type","application/json"]);
        }else{
            this.http.send(url, data, 'post', contentType,["Content-Type",contentType]);
        }

        Laya.timer.clearAll(this);
        Laya.timer.loop(1000,this,this.daojishi);
    }

    /**
     * 不转字符串的数据格式post请求
     * @param {string} model 模块
     * @param {Object} data JSON对象
     * @param {Object} caller 回调者
     * @param {function} callback 回调函数
     * @param {string} contentType 数据协议
     * @param {string} _tag 请求类别
     */
    _proto.postRequestPanel = function(model,jsdata,caller,callback,contentType,_tag){
        //多次点击拦截
        if(isHttpLoaded) return;
        isHttpLoaded = true;
        if(this.http == null){
           this.instance();
        }
        jsdata.userId = Config.userID;
        //jsdata进行排序
        jsdata = App.ComUtil.objKeySort(jsdata);
        //jsdata的value全部转字符串
        var newkey = App.ComUtil.getObjKeys(jsdata);
        for (var i = 0; i < newkey.length; i++){
            jsdata[newkey[i]] = jsdata[newkey[i]];
        }
        var data = JSON.stringify(jsdata);
        //http请求带上加密字段
        Tool.log("signData: " + data + Config.gameToken);
        var sign = MD5(data + Config.gameToken);
        //url
        var url = Config.gameServerUrl + model; // + "/" + sign
        Tool.log("requestUrl: " + url + "   tag: " + _tag);
        this.caller = caller;
        this.callback = callback;
        this.tag = (_tag == undefined || _tag == null) ? "TAG" : _tag;
        //this.http.once(Laya.Event.PROGRESS, this, this.onHttpRequestProgress);
		this.http.once(Laya.Event.COMPLETE, this, this.onHttpRequestComplete);
		this.http.once(Laya.Event.ERROR, this, this.onHttpRequestError);
        if(contentType==null || contentType == undefined){
            //默认传入json
            this.http.send(url, data, 'post',"application/json",["Content-Type","application/json"]);
        }else{
            this.http.send(url, data, 'post', contentType,["Content-Type",contentType]);
        }
        Laya.timer.clearAll(this);
        Laya.timer.loop(1000,this,this.daojishi);
    }
    
    /**
     * post请求游戏数据
     * @param {string} model 模块
     * @param {string} data 数据
     * @param {Object} caller 回调者
     * @param {function} callback 回调函数
     * @param {string} contentType 数据协议
     * @param {string} _tag 请求类别
     */
    _proto.postRequestGame = function(model,data,caller,callback,contentType,_tag){

        //多次点击拦截
        if(isHttpLoaded) return;
        isHttpLoaded = true;
        
        if(this.http == null){
           this.instance();
        }
        var url = Config.gameServerUrl + model;
        Tool.log("requestUrl: " + url + "   tag: " + _tag);
        this.caller = caller;
        this.callback = callback;
        this.tag = (_tag == undefined || _tag == null) ? "TAG" : _tag;
        //this.http.once(Laya.Event.PROGRESS, this, this.onHttpRequestProgress);
		this.http.once(Laya.Event.COMPLETE, this, this.onHttpRequestComplete);
		this.http.once(Laya.Event.ERROR, this, this.onHttpRequestError);
        if(contentType==null || contentType == undefined){
            //默认传入json
            this.http.send(url, data, 'post',"application/json",["Content-Type","application/json"]);
        }else{
            this.http.send(url, data, 'post', contentType,["Content-Type",contentType]);
        }
        Laya.timer.clearAll(this);
        Laya.timer.loop(1000,this,this.daojishi);
    }

    /**
     * post请求数据  实现微信链接跳转
     * @param {string} model 模块
     * @param {string} data 数据
     * @param {Object} caller 回调者
     * @param {function} callback 回调函数
     * @param {string} _tag 请求类别
     */
    _proto.postRequestWxJump = function(model,data,caller,callback,_tag){
        //多次点击拦截
        if(isHttpLoaded) return;
        isHttpLoaded = true;
        if(this.http == null) this.instance();
        var url = Config.gameServerUrl + model;
        Tool.log("requestUrl: " + url + "   tag: " + _tag);
        this.caller = caller;
        this.callback = callback;
        this.tag = (_tag == undefined || _tag == null) ? "TAG" : _tag;
        //this.http.once(Laya.Event.PROGRESS, this, this.onHttpRequestProgress);
		this.http.once(Laya.Event.COMPLETE, this, this.onHttpRequestComplete);
		this.http.once(Laya.Event.ERROR, this, this.onHttpRequestError);
        var headers = ["Content-Type","application/pdf","Content-Disposition","attachment;filename='downloaded.pdf'"];
        this.http.send(url, data, "post","text",headers);
        Laya.timer.clearAll(this);
        Laya.timer.loop(1000,this,this.daojishi);
    }

    /**
     * post请求登录数据
     * @param {string} model 模块
     * @param {string} data 数据
     * @param {Object} caller 回调者
     * @param {function} callback 回调函数
     * @param {string} contentType 数据协议
     * @param {string} _tag 请求类别
     */
    _proto.postRequestLogin = function(model,data,caller,callback,contentType,_tag){

        //多次点击拦截
        if(isHttpLoaded) return;
        isHttpLoaded = true;

        if(this.http == null){
           this.instance();
        }
        var url = Config.loginServerUrl + model;
        Tool.log("requestUrl: " + url + "   tag: " + _tag);

        this.caller = caller;
        this.callback = callback;
        this.tag = (_tag == undefined || _tag == null) ? "TAG" : _tag;
        //this.http.once(Laya.Event.PROGRESS, this, this.onHttpRequestProgress);
		this.http.once(Laya.Event.COMPLETE, this, this.onHttpRequestComplete);
		this.http.once(Laya.Event.ERROR, this, this.onHttpRequestError);
        if(contentType==null || contentType == undefined){
            //默认传入json
            this.http.send(url, data, 'post',"application/json",["Content-Type","application/json"]);
        }else{
            this.http.send(url, data, 'post', contentType,["Content-Type",contentType]);
        }

        Laya.timer.clearAll(this);
        Laya.timer.loop(1000,this,this.daojishi);
    }
    
    /**
     * 请求倒计时
     */
    _proto.daojishi = function(){
        this.time += 1;
        if(this.time == 4){
            if(Config.isGaming){
               isHttpLoaded = false;
               App.NetLoading.show();
            }
        }else if(this.time == 10){
            this.time = 0;
            Laya.timer.clear(this,this.daojishi);
            if(Config.isGaming){
               App.NetLoading.close();
            }
        }
    },
    
    /**
     * 请求失败回调
     * @param {Object} e 异常参数
     */
    _proto.onHttpRequestError = function(e){
        
        isHttpLoaded = false;
        Laya.timer.clear(this,this.daojishi);
        if(Config.isGaming){
            App.NetLoading.close();
        }
        Tool.log(e);
        //登录异常处理
        if("USERLOGIN" == this.tag){
            var url = Laya.Browser.window.location.href;
            var i = url.indexOf("?");
			if(i != -1) url = url.substring(0,i);
            Laya.Browser.window.location.href = url;
            return;
        }
        if(this.caller){
            this.callback.apply(this.caller,[{result:-1,state:500,msg:e}]);
        }
        this.http = null;
        if(Config.isGaming){
           Toast.show("网络异常,请稍后重试！");
        }
    }
    
    /**
     * 请求成功回调
     * @param {Object} e 请求成功的数据
     */
    _proto.onHttpRequestComplete = function(e){
        
        isHttpLoaded = false;
        Laya.timer.clear(this,this.daojishi);
        if(Config.isGaming){
            App.NetLoading.close();
        }
        //
        if(this.http.data){
            var allData = JSON.parse(this.http.data);
            if(this.http.data.length < 7000){
                Tool.log(allData);
            }else{
                Tool.log("data too long ......");
            }

            //数据
            if(allData.retCode == 200 || allData.retCode == 400003){
                this.callback.apply(this.caller,[{result:0,state:200,tag:this.tag,data:allData}]);
            }else{
                if(Config.isGaming){
                    if(allData.message){
                        //不提示未中奖
                        if(allData.retCode == 9999){
                            Toast.show("目前充值人数过多，3分钟后再试!");
                        }else{
                            Toast.show(allData.message);
                        }
                    }else{
                        Toast.show("网络异常,请稍后重试!");
                    }
                }
            }
        }else{
            if(Config.isGaming){
                if(this.http.message){
                    Toast.show(this.http.message);
                }else{
                    Toast.show("网络异常,请稍后重试！");
                } 
            }
        }
        this.http = null;
    }

    return Http;
}();