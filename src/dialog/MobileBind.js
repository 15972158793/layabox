/*
* 手机号验证或者绑定
*/
var MobileBind = (function (_super) {
    function MobileBind(_type,_callback) {
        MobileBind.super(this);
        
        /**
         * 1 验证
         * 2 绑定
         */
        this.type = _type;
        this.callback = _callback;
        this.init();
    }
    Laya.class(MobileBind, "src.dialog.MobileBind",_super);

    var _proto = MobileBind.prototype;

    _proto.init = function(){
        //去掉动画
        this.popupEffect = null;
        this.closeEffect = null;
        //适配
        this.height = App.StageUtil.height;
        this.bg.height = App.StageUtil.height;

        if(this.type == 1){
            this.title.text = "账号绑定";
            this.nextLab.text = "下一步";
        }else{
            this.title.text = "账号绑定";
            this.nextLab.text = "绑定";
        }
        
        //获取验证验
        //this.codeBtn.on("mousedown",this,this.sendCode);
        //输入手机号
        this.mobileStr = "";
        this.mobileColor = "#ffffff";
        this.input1.on("focus",this, this.mobileOnfocus);//输入焦点
        this.input1.on("blur", this, this.mobileOnblur);//失去焦点
        //this.input1.on("input", this, this.mobileOnInput);//输入回调
        //this.input1.on("enter", this, this.mobileOnEnter);//回车回调
        //验证码调整
        this.codeStr = "";
        this.codeColor = "#ffffff";
        this.input2.on("focus",this, this.codeOnfocus);//输入焦点
        this.input2.on("blur", this, this.codeOnblur);//失去焦点
        //关闭
        this.closeBtn.on("mousedown",this,this.closeDlg);
        this.backBtn.on("mousedown",this,this.closeDlg);
        //下一步
        this.nextBtn.on("mousedown",this,this.goNext);
        this.time = 0;
        this.cfg = {};
        this.cfg.url = "";
    }
    
    //生成二维码
    _proto.goNext = function(){
        //1.验证手机号和验证码
        //2.生成二维码url
        if(this.input1.text == ""){
            Toast.show("请输入手机号...");
            return;
        }
        if(this.input2.text == ""){
            Toast.show("请尽快输入密码");
            return;
        }
        var s = "/" + this.input1.text + "/"+ "a" + "/" + Config.userID + "/" + MD5(this.input2.text);
        Http.getRequestGame("rest/user/bind/phone",s,this,this.onHttpComplete,"Next");
    }

    //发送请求获取验证码
    _proto.sendCode = function(){
        if(this.input1.text == ""){
            Toast.show("请输入手机号...");
            return;
        }
        if(this.time > 0){
            Toast.show("请尽快输入验证码");
            return;
        }
        Http.getRequestGame("rest/user/bind/authCode","/"+this.input1.text+"/"+Config.userID,this,this.onHttpComplete,"Mobile1");
    }

    //确认登陆的回调
    _proto.onHttpComplete = function(data){
        Tool.log(data);
        if(0 == data.result){
            if("Mobile1" == data.tag){
                //开启倒计时
                if(this.time == 0){
                    this.time = 120;
                    this.timeDes.text = this.time + "秒";
                    Laya.timer.loop(1000,this,this.daojishi);
                }
                Toast.show("短信已发送,请注意查收！");
            }else if("Next" == data.tag){
                Config.isMobileLogin = true;
                Config.mobileNum = this.input1.text;
                if(this.type == 1){
                    Toast.show("验证成功");
                    Laya.timer.frameOnce(5,this,function(){
                        Http.getRequestGame("rest/agent/promote/",Config.userID,this,this.onHttpComplete,"Agent_2");
                    });
                }else{
                    Toast.show("成功绑定");
                    Laya.timer.frameOnce(5,this,function(){
                        if(this.callback)this.callback();
                        this.closeDlg();
                    });
                }
            }else if("Agent_2" == data.tag){
                Toast.show("成功生成代理!");
                Config.agentUrl = data.data.data;
                this.cfg.url = Config.agentUrl;
                Laya.timer.frameOnce(5,this,function(){
                    if(this.callback)this.callback(this.cfg);
                    this.closeDlg();
                });
            }else{

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

//////////////////////////////////////////////////////////////////////////////////////
    //手机号的处理
    _proto.mobileInput = function(){
        //记录上次的输入
        if(this.mobileStr == ""){
            this.mobileStr = this.input1.text
            this.mobileColor = this.input1.color;
        }
        if(this.input1.text == this.mobileStr) {
            this.input1.text = "";
            this.input1.color = "#ffffff";
            //this.input1.italic = false;
        }
    }

    _proto.mobileOnfocus = function(){
        this.mobileInput();
    }

    _proto.mobileOutput = function(){
        if(this.input1.text == "") {
            this.input1.text = this.mobileStr;
        }
        if(this.input1.text == this.mobileStr) {
            this.input1.color = this.mobileColor;
            if(this.input1.text == ""){
               //this.input1.italic = true;
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
            this.codeStr = this.input2.text
            this.codeColor = this.input2.color;
        }
        if(this.input2.text == this.codeStr) {
            this.input2.text = "";
            this.input2.color = "#ffffff";
            //this.input2.italic = false;
        }
    }

    _proto.codeOnfocus = function(){
        this.codeInput();
    }

    _proto.codeOutput = function(){
        if(this.input2.text == "") {
            this.input2.text = this.codeStr;
        }
        if(this.input2.text == this.codeStr) {
            this.input2.color = this.codeColor;
            if(this.input2.text == ""){
               //this.input2.italic = true;
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
        App.DisUtil.closeToTop(this,this.close);
    }

    return MobileBind;
}(MobileBindUI));