var Login = (function(){
	function Login(){
		this.init();
	}
	Laya.class(Login, "src.Login");
	var _proto = Login.prototype;

	_proto.init = function(){
		//游戏初始化
		App.StageUtil.init();

		//登录
		if("develop" == Config.ipType){
			var userid = GameData.getData("video_account");
			if(userid != "") Config.userID = userid;
			if("" == Config.userID){
                this.start();
			}else{
                Http.getUserInfo(this,this.onHttpComplete);
			}
		}else{
            //判断来自微信
			if(Tool.isWx()){
				var url = Laya.Browser.window.location.href;
				//处理微信网页登录
				if(url.indexOf("code") != -1){
					this.goGame(url);
				}else{
					this.goWxDirect(url);
				}
			}else{
				if("h5" == Config.platform){
					this.start();
				}else{
                    var userid = GameData.getData("video_account");
					if(userid != "") Config.userID = userid;
					if("" == Config.userID){
						this.start();
					}else{
						Http.getUserInfo(this,this.onHttpComplete);
					}
				}
			}
		}
	}
    
	/**
	 * 进入游戏
	 */
	_proto.goGame = function(url){
		//url = "http://video.8jsou.cn/webgateway/video/h5/index.html?appid=wx97843885aa591a11&code=0710Gr741lgKlS1XXs641s0N7410Gr7V&state=STATE";
		var i = url.indexOf("?");
		if(i != -1) url = url.slice(i,url.length);
		var _code = Tool.getUrlParams(url,"code");
        this.getWxOpenID(_code);
    }

	_proto.getWxOpenID = function(code){
        Http.getRequestGame("rest/userLogin/fetchOpenId/",code,this,this.onHttpComplete,"OpenID");
	}
    
	/**
	 * 前往微信授权
	 */
	_proto.goWxDirect = function(url){
        var redictUrl = encodeURI(url);
		Http.getRequestLogin("rest/userLogin/authUrl?redirectUrl="+redictUrl,"",this,this.onHttpComplete,"CODE");
	}

	_proto.onHttpComplete = function(data){
        if(0 == data.result){
			if("CODE" == data.tag){
				var url = data.data.data;
				//跳转到微信的链接  自动跳转到游戏入口带code的新链接重新进入游戏
				//微信登录加入时间戳
				var time = Math.floor(Math.random() * 100000);
				var stamp = "&time=" + time;
				url += stamp;
				Laya.Browser.window.location.href = url;
			}else if("USERLOGIN" == data.tag){
				var info = data.data.data;
				//获取用户的数据
				Tool.log(info);
				Config.userID = info.userId;
				Config.gameToken = info.token;
				Config.version = info.version || "1.1.0";
				Config.versionCode = info.versionCode || 1;
				GameData.setVersion(Config.versionCode);
				Config.gameGold = info.golds || 0;
				Config.mobileNum = info.mobile || "";
				this.start();
			}else if("USER" == data.tag){
                //用户的数据
                var info = data.data.data;
                Config.gameGold = info.userLastTotalMoney;
				Config.mobileNum = info.phone || "";
                this.start();
            }else if("OpenID" == data.tag){
				//解析appid
                var url = Laya.Browser.window.location.href;
				var i = url.indexOf("?");
				if(i != -1) {
					url = url.slice(i,url.length);
				}else{
					
				}
				var _appid = Tool.getUrlParams(url,"appid");
				var agent = "&agentId=-1";
				if(url.indexOf("agentId") != -1) {
					agent = ("&agentId=" + Tool.getUrlParams(url,"agentId"));
				}
				var info = data.data.data;
				var _code = info + "-2";
				Http.getRequestLogin("rest/userLogin/userInfo/",_code + 
				"?appid=" + _appid + agent,this,this.onHttpComplete,"USERLOGIN");

			}else{
                
			}
		}
	}
    
	//开始游戏
    _proto.start = function(){
        var main = new Main();
        main.start();
    }
	return Login;
}());

//startgame
new Login();