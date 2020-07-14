/*
* 手机号登录;
*/
var MobileLogin = (function (_super) {
    function MobileLogin(_callback) {
        MobileLogin.super(this);
        
        this.callback = _callback;
        this.init();
    }
    Laya.class(MobileLogin, "src.dialog.MobileLogin",_super);

    var _proto = MobileLogin.prototype;

    _proto.init = function(){
        //去掉动画
        this.popupEffect = null;
        this.closeEffect = null;
        //适配
        this.height = App.StageUtil.height;
        this.bg.height = App.StageUtil.height;
        
        //获取验证验
        //this.codeBtn.on("mousedown",this,this.sendCode);
        //输入手机号
        this.mobileStr = "";
        this.mobileColor = "#ffffff";
        this.mobile.on("focus",this, this.mobileOnfocus);//输入焦点
        this.mobile.on("blur", this, this.mobileOnblur);//失去焦点
        //验证码调整
        this.codeStr = "";
        this.codeColor = "#ffffff";
        this.code.on("focus",this, this.codeOnfocus);//输入焦点
        this.code.on("blur", this, this.codeOnblur);//失去焦点
        //成功
		this.login.on("mousedown",this,this.goLogin);
        //关闭
        this.closeBtn.on("mousedown",this,this.closeDlg);
        this.time = 0;
    }

    //发送请求获取验证码
    _proto.sendCode = function(){
        if(this.mobile.text == ""){
            Toast.show("请输入手机号...");
            return;
        }
        if(this.time > 0){
            Toast.show("请尽快输入验证码");
            return;
        }
        Http.getRequestGame("vivianrest/userLogin/mobile","/"+this.mobile.text,this,this.onHttpComplete,"Mobile");
    }

    //确认登陆的回调
    _proto.onHttpComplete = function(data){
        
        if(0 == data.result){
            if("Mobile" == data.tag){
                //开启倒计时
                if(this.time == 0){
                    this.time = 120;
                    this.timeDes.text = this.time + "秒";
                    Laya.timer.loop(1000,this,this.daojishi);
                }
                Toast.show("短信已发送,请注意查收！");
            }else if("Check2" == data.tag){
                //注册成功,返回数据
                var info = data.data.data;
                Config.userID = info.userId;
                GameData.saveData("video_account",Config.userID);
                Config.gameGold = info.golds;
                Config.gameToken = info.token;
                Config.version = info.version || "1.1.0";
				Config.versionCode = info.versionCode || 1;
                GameData.setVersion(Config.versionCode);
                Config.isMobileLogin = true;
                Config.mobileNum = this.mobile.text;
                
                this.closeDlg();
                Toast.show("成功登录,祝您玩得愉快!");
            }
        }else{

        }
    }
    
    //
    _proto.daojishi = function(){
        if(this.time > 1){
            this.time -= 1;
            this.timeDes.text = this.time + "秒";
        }else{
            this.time = 0;
            Laya.timer.clear(this,this.daojishi);
            this.timeDes.text = "获取验证码";
        }
    }
    
    //去登陆
     _proto.goLogin = function(){
        if(this.mobile.text == ""){
            Toast.show("请输入手机号...");
            return;
        }
        //Tool.log("mobile: " + this.mobile.text);
        if(this.code.text == ""){
            Toast.show("请输入密码!");
            return;
        }
        //Tool.log("code: " + this.code.text);
        var s = "/"+this.mobile.text + "/" + "a" + "/" + MD5(this.code.text);
        Http.getRequestGame("vivianrest/userLogin/mobile/checkAndRegister",s,this,this.onHttpComplete,"Check2");
    }

    //手机号的处理
    _proto.mobileInput = function(){
        //记录上次的输入
        if(this.mobileStr == ""){
            this.mobileStr = this.mobile.text
            this.mobileColor = this.mobile.color;
        }
        if(this.mobile.text == this.mobileStr) {
            this.mobile.text = "";
            this.mobile.color = "#ffffff";
            this.mobile.italic = false;
        }
    }

    _proto.mobileOnfocus = function(){
        this.mobileInput();
    }

    _proto.mobileOutput = function(){
        if(this.mobile.text == "") {
            this.mobile.text = this.mobileStr;
        }
        if(this.mobile.text == this.mobileStr) {
            this.mobile.color = this.mobileColor;
            if(this.mobile.text == ""){
               this.mobile.italic = true;
            }
        }
    }

    _proto.mobileOnblur = function(){
        this.mobileOutput();
    }
    /*_proto.mobileOnInput = function(){
        this.mobileInput();
    }

    _proto.mobileOnEnter = function(){
        this.mobileOutput();
    }*/

    //处理验证码
    _proto.codeInput = function(){
        //记录上次的输入
         if(this.codeStr == "") {
            this.codeStr = this.code.text
            this.codeColor = this.code.color;
        }
        if(this.code.text == this.codeStr) {
            this.code.text = "";
            this.code.color = "#ffffff";
            this.code.italic = false;
        }
    }

    _proto.codeOnfocus = function(){
        this.codeInput();
    }

    _proto.codeOutput = function(){
        if(this.code.text == "") {
            this.code.text = this.codeStr;
        }
        if(this.code.text == this.codeStr) {
            this.code.color = this.codeColor;
            if(this.code.text == ""){
               this.code.italic = true;
            }
        }
    }

    _proto.codeOnblur = function(){
        this.codeOutput();
    }
    
    //弹入
    _proto.openDlg = function(){
        this.popup(false);
        App.DisUtil.openToTop(this);
    }
    
    //弹出
    _proto.closeDlg = function(){
        //回调
        if(this.callback)this.callback();
        App.DisUtil.closeToTop(this,this.close);
    }

    return MobileLogin;
}(LoginDlgUI));