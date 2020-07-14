/**
 * 充值二维码
 */
var ChargeCode = function(_super) {
    function ChargeCode() {
        ChargeCode.super(this);

        this.init();
    }
    Laya.class(ChargeCode, "src.dialog.ChargeCode", _super);
    var _proto = ChargeCode.prototype;
    
    _proto.init = function() {
        
        this.height = App.StageUtil.height;
        this.width = App.StageUtil.width;
        this.popupEffect = null;
        this.closeEffect = null;

        this.backBtn.on("mousedown",this,this.goBack);
        this.closeBtn.on("mousedown",this,this.goBack);

        this.time = 0;
        //支付监听
        this.payTime = 0;
        this.payStatus = 0;
        this.type = 0;
        //大厅公告关闭
        Config.room.isNotice = false;
        //网络请求动画关闭
        App.NetLoading.useAni = false;
        this.isSuccess = false;
    }

    _proto.showInfo = function(_info,_type){
        
        var self = this;
        self.info = _info;
        self.type = _type;
        if(self.type == 0){
            self.title.changeText("微信二维码");
            self.desLab.changeText("长按或截屏识别二维码，使用微信扫码。");
        }else if(self.type == 1){
            self.title.changeText("支付宝二维码");
            self.desLab.changeText("长按或截屏识别二维码，使用支付宝扫码。");
        }else{
            
        }
        //倒计时
        self.time = self.info.timeOut;
        self.timeLab.changeText(App.DateUtil.formatTime(self.time));
        Laya.timer.loop(1000,self,self.daojishi);
         
        var url = self.info.base64Info;
        if("" == url){
            Toast.show("调起支付失败",3000);
        }else{
            if("h5" == Config.platform){
                self.showViewCode(url);
            }else{
                Laya.loader.load(url,Laya.Handler.create(self,function(url){
                    var pic = App.DisUtil.createSprite(145,382,url,self.bg);
                    pic.scaleX = 430 / pic.width;
                    pic.scaleY = 450 / pic.height;
                    pic.width = 430;
                    pic.height = 450;
                },[url]));
            }
        }
        self.openDlg();
    }

    _proto.daojishi = function(){
        //熄屏时间更新
        if(Config.isUpdateData){
            if(Config.room.isNewTime){
                this.time = App.DateUtil.calDiffTime(this.info.createTime,Config.systemTime);
                if(this.time < 1){
                   this.onClose();
                }
                Config.room.isNewTime = false;
            }
            Config.isUpdateData = false;
            return;
        }
        
        //时间
        if(this.time > 0){
            this.time -= 1;
            this.timeLab.changeText(App.DateUtil.formatTime(this.time));
        }else{
            this.time = 0;
            this.onClose();
        }

        //支付监听
        if(this.payTime < 5){
            this.payTime += 1;
        }else{
            this.payTime = 0;
            this.listenPayInfo();
        }
    }
      
    /**
     * 支付监听
     */
    _proto.listenPayInfo = function(){
        Http.getRequestGame("rest/rechargeApi/pay/payStatus/",this.info.orderNo,this,this.onHttpComplete,"Pay1");
    }
    
    _proto.onHttpComplete = function(data){
        if(0 == data.result){
            if("Pay1" == data.tag){
                var r = data.data.data;
                if(r){
                    if(r == 1){
                        this.isSuccess = true;
                        Http.getUserInfo(this,this.onHttpComplete);
                    }else if(r == 2){
                        Toast.show("充值异常");
                    }else if(r == -1){
                        Toast.show("充值失败");
                    }else if(r == -2){
                        Toast.show("充值超时");
                        this.onClose();
                    }
                }
            }else if("USER" == data.tag){
                if(this.isSuccess){
                    Toast.show("支付成功,请前往用户信息查看账单!");
                    App.MsgCenter.send("paysuccess",{result:0});
                }else{
                    App.MsgCenter.send("paysuccess",{result:-1});
                }
                var info = data.data.data;
                Config.gameGold = info.userLastTotalMoney;
                //监听大厅金币的变化
                App.MsgCenter.send("money");
                this.onClose();
            }
        }
    }

    _proto.showViewCode = function(url){
        
        var img = Laya.Browser.createElement("img");
        img.setAttribute('id', 'charge');
        //如果链接后缀没有jpeg和png不可使用跨域属性
        //img.setAttribute('crossOrigin', 'Anonymous');
        //禁止拖动，但是微信无法调起二维码识别
        //css中: pointer-events:none;
        //物理距离转换到像素距离
        var s = 430;
        var w = s / App.StageUtil.width * Laya.Browser.clientWidth;
        var h = (s+20) / App.StageUtil.height * Laya.Browser.clientHeight;
        //动态计算宽
        var top1 = 383 / App.StageUtil.height * Laya.Browser.clientHeight;
        var left1 = (Laya.Browser.clientWidth - s / App.StageUtil.width * Laya.Browser.clientWidth) / 2;
        var cssStr = "-webkit-user-select:none;z-index:100000000;position:absolute;width:" + w + "px;height:" + h + "px;left:"
            + left1 + "px;top:" + top1 + "px;";//display:none;
        img.setAttribute("style",cssStr);
        img.setAttribute("src",url);
        Laya.Browser.window.document.body.appendChild(img);
        //不可滑动
        img.addEventListener("touchmove",App.DisUtil.disAllowMove);
    }

    _proto.openDlg = function(){
        this.popup(false);
    }

    _proto.goBack = function(){
        if(!this.isSuccess){
            Http.getUserInfo(this,this.onHttpComplete);
        }else{
            this.onClose();
        }
    }
    
    _proto.onClose = function(){
        var kefu = Laya.Browser.getElementById("charge");
        if(kefu){
            kefu.removeEventListener("touchmove",App.DisUtil.disAllowMove);
            Laya.Browser.removeElement(kefu);
        }
        Laya.timer.clear(this,this.daojishi);
        //大厅公告
        Config.room.isNotice = Config.room.visible;
        //网络请求动画开启
        App.NetLoading.useAni = true;
        this.close();
    }

    return ChargeCode;
}(ChargeCodeUI)