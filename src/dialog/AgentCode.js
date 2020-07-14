/**
 * 二维码代理
 * @class AgentCode
 */
var AgentCode = (function (_super) {
    function AgentCode() {
        AgentCode.super(this);
        this.init();
    }
    Laya.class(AgentCode, "src.dialog.AgentCode",_super);
    var _proto = AgentCode.prototype;

    _proto.init = function(){
        //去掉动画
        this.popupEffect = null;
        this.closeEffect = null;
        //背景适配
        this.height = App.StageUtil.height;
        this.bg.height = App.StageUtil.height;
        this.clickIndex = 0;
        if("mobile" == Config.platform){
            this.bg.on("mousedown",this,this.openBg);
        }
        this.base64 = "";
        this.url = "";
        this.checkCount = 0;
        this.isLoaded = false;
        //代理公告关闭
        Config.room.isNotice = false;
        //屏幕截取 需要加入延迟时间  太长的日志会导致IDE崩溃
    }

    _proto.openBg = function(){
        if(this.clickIndex == 0){
            this.topBtn.visible = false;
        }else{
            this.topBtn.visible = true;
        }
        this.clickIndex += 1;
        this.clickIndex %= 2;
    }
    
    //外部调用,传入信息
    _proto.showInfo = function(cfg){
        
        //this.codeText.text = Config.agentID;
        //this.titleLab.text = cfg.title || "分享";
        if(cfg.url.indexOf(".png") != -1 || cfg.url.indexOf(".jpg") != -1 || cfg.url.indexOf(".jpeg") != -1){
            //提前隐藏
            this.di.visible = true;
            this.showCode(cfg.url);
        }else{
            var code = App.DisUtil.createQRCode(cfg.url,250,250);
            App.DisUtil.qrcode2Sprire(code,237,782,this.bg);
        }
        this.openDlg();
    }

    _proto.showCode = function(url){
        var self = this;
        //url加上时间戳保证每次都是新的图片
        url = url + "?time=" + (Math.floor(Math.random() * 10000) + 10);
        self.url = url;
        //加载资源
        Laya.loader.load(url,Laya.Handler.create(self,function(){
            //二维码图片
            var pic = new Laya.Image();
            pic.skin = self.url;
            self.di.addChild(pic);
            pic.scaleX = 216 / pic.width;
            pic.scaleY = 210 / pic.height;
            pic.left = 252;
            pic.top = 750;

            if("h5" == Config.platform){
                Toast.show("代理正在生成...");
                Laya.timer.once(1000,self,function(){

                    //监听退出
                    App.MsgCenter.addListener("agent-panel-exit",self.agentExit,self);
                    
                    //截屏
                    self.base64 = App.DisUtil.sprite2Base64(self.di,720,1280,0,0);
                    self.di.visible = false;

                    if(self.base64){
                        self.showHtmlCode(self.base64,self);
                    }else{
                        //self.checkBase64();
                        //self.showViewCode(self.url,self);
                        Toast.show("代理生成失败...");
                    }
                    self.addClose();
                });
            }else{
                //
                Toast.show("点击背景手机截图生成代理...",3000);
                this.isLoaded = true;
            }
        }));

        //资源加载失败
        Laya.loader.on("error",self,function(e){
            Toast.show("资源加载错误,请稍候尝试!");
            self.isLoaded = true;
        });
    }

    _proto.checkBase64 = function(){
        var self = this;
        Laya.timer.loop(2000,self,function(){
             if(self.base64){
                 Laya.timer.clearAll(self);
                 self.showHtmlCode(self.base64,self);
             }else{
                 Toast.show("检测中....");
                 var sp = App.DisUtil.capture(self.di,720, 1280,0,0);
                 self.base64 = App.DisUtil.sprite2Base64(sp,720,1280,0,82);
                 self.checkCount += 1;
                 if(self.checkCount == 7 && !self.base64){
                     Laya.timer.clearAll(self);
                 }
             }
        });
    }

    _proto.showViewCode = function(url,self){
        
        var img = Laya.Browser.createElement("img");
        img.setAttribute('id', 'agent');
        //动态计算布局
        var w = 216 / App.StageUtil.width * Laya.Browser.clientWidth;
        var h = 210 / App.StageUtil.height * Laya.Browser.clientHeight;
        var top1 = 750 / App.StageUtil.height * Laya.Browser.clientHeight;
        var left1 = (Laya.Browser.clientWidth - w) / 2;
        var cssStr = "z-index:100000;position:absolute;left:"
                + left1 + "px;top:" + top1 + "px;width:" + w + "px;height:" + h + "px;";//display:none;
        img.setAttribute('style', cssStr);
        img.onload = function(){
            self.isLoaded = true;
        }
        img.src = url;
        Laya.Browser.window.document.body.appendChild(img);
    }

    _proto.showHtmlCode = function(url,self){

        var img = Laya.Browser.createElement("img");
        img.setAttribute('id', 'agent');
        //动态计算布局
        var w = Laya.Browser.clientWidth;
        var h = 1280 / App.StageUtil.height * Laya.Browser.clientHeight;
        var top1 = 0 / App.StageUtil.height * Laya.Browser.clientHeight; //85
        var left1 = 0;
        var cssStr = "position:absolute;z-index:100;left:"
                + left1 + "px;top:" + top1 + "px;width:" + w + "px;height:" + h + "px;";//display:none;
        img.setAttribute('style', cssStr);
        img.onload = function(){
            self.isLoaded = true;
            self.onProductSuccess();
        }
        img.src = url;
        Laya.Browser.window.document.body.appendChild(img);
        //可滑动
        img.addEventListener("touchmove",App.DisUtil.allowMove);
    }
    
    //添加关闭按钮
    _proto.addClose = function(){
    
        var left = (Laya.Browser.clientWidth - 40);
        var top = 10;
        var e = Laya.Browser.createElement("div");
        e.setAttribute("id","close-panel-agent");
        var closeStyle = "position:absolute;z-index:10000;background:url(webres/exit.png);background-repeat:no-repeat;background-size:contain;"+
        "width:30px;height:30px;left:"+ left + "px;top:"+ top + "px;"; //background-repeat:no-repeat;background-size:contain;
        e.setAttribute("style",closeStyle);
        Laya.Browser.window.document.body.appendChild(e);

        e.addEventListener("click",function(){
            App.MsgCenter.send("agent-panel-exit",{});
        });
    }
    
    _proto.onProductSuccess = function(){
        
    }
    
    //h5代理退出
    _proto.agentExit = function(){
        if(!this.isLoaded) return;
        var _id3 = Laya.Browser.getElementById("close-panel-agent");
        if(_id3) {
            Laya.Browser.removeElement(_id3);
        }
        App.MsgCenter.removeListener("agent-panel-exit",this,this.agentExit);
        this.closeDlg();
    }
    
    //弹入
    _proto.openDlg = function(){
        this.popup(false);
    }
    
    //弹出
    _proto.closeDlg = function(){
        if(!this.isLoaded) return;
        var img = Laya.Browser.getElementById("agent");
        if(img) {
            img.removeEventListener("touchmove",App.DisUtil.allowMove);
            Laya.Browser.removeElement(img);
        }
        Laya.timer.clearAll(this);
        
        //资源释放
        Laya.loader.clearRes(this.url);
        
        this.close();
    }

    return AgentCode;
}(AgentCodeUI));