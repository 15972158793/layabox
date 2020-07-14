/**
 * 游戏入口，缓存处理
 */
var Main = (function(){
	function Main(){
		this.init();
	}
	Laya.class(Main, "src.Main");
	var _proto = Main.prototype;

	_proto.init = function(){
        
        this.loadNum = 0;
	}
    
    //这里开始游戏
    _proto.start = function(){
        //开发阶段打开日志调试,发布时关闭
        if(!Config.isLog){
            /**
             * 先加载js文件
             */
            App.ResUtil.loadScriptBySrc("libs/worker.js",this,this.loadLibFinish);
            //App.ResUtil.loadScriptBySrc("libs/clipboard.js",this,this.loadLibFinish);
        }else{
            //直接加载资源
            this.loadVersion();
        }
    }

    _proto.loadLibFinish = function(){
        this.loadNum += 1;
        this.loadVersion();
    }

    _proto.loadVersion = function(){
        //加载版本信息文件
        if(Config.gameServerUrl == "/"){
            Laya.ResourceVersion.type = Laya.ResourceVersion.FILENAME_VERSION;
            Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.beginLoad));
        }else{
            this.beginLoad();
        }
    }
    
    //版本控制资源加载
    _proto.beginLoad = function(){
        //优先加载启动页的资源
        App.ResUtil.loadResource(loadFiles,this,this.goLoad, null);
    }
    
    //
    _proto.goLoad = function(){
        Laya.stage.addChild(new Loading());
    }
	return Main;
}());