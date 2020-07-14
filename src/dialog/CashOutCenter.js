/**
 * 提取现金中心
 * @class CashOutCenter
 */
var CashOutCenter = (function (_super) {
    function CashOutCenter() {
        CashOutCenter.super(this);
        this.init();
    }
    Laya.class(CashOutCenter, "src.dialog.CashOutCenter",_super);

    var _proto = CashOutCenter.prototype;

    _proto.init = function(){
        //去掉动画
        this.popupEffect = null;
        this.closeEffect = null;
        //适配
        this.width = App.StageUtil.width;
        this.height = App.StageUtil.height;
        this.bg.height = App.StageUtil.height;
        //关闭公告
        Config.room.isNotice = false;
        this.moneyLab.text = App.MathUtil.keepDecimalNum(Config.gameGold);
        //输入金额
        this.numStr = "";
        this.numColor = "#ffffff";
        this.moneyInput.on("focus",this, this.moneyOnfocus);//输入焦点
        this.moneyInput.on("blur", this, this.moneyOnblur);//失去焦点
        //事件
		this.backBtn.on("mousedown",this,this.closeDlg);
        this.closeBtn.on("mousedown",this,this.closeDlg);
        this.submit.on("mousedown",this,this.onSubmit);
        this.allBtn.on("mousedown",this,this.getAll);
        //收款
        this.userBox.getChildByName("item1").on("mousedown",this,this.upCode);
        this.userBox.getChildByName("item2").on("mousedown",this,this.addCard);
        this.ids = ["",""];
        this.selType = 0; //1二维码 2银行卡

        //获取提现次数
        this.getCheckOutInfo();
    }

    _proto.getCheckOutInfo = function(){
        Http.getRequestGame("rest/withdraw/apply/config","/"+Config.userID,this,this.onHttpComplete,"Info");
    }

    _proto.onHttpComplete = function(data){
        if(0 == data.result){
            if("DRAW" == data.tag){
                Toast.show("成功提交收款码提现申请,收益稍后到账。",2000);
                if(data.data.data){
                    Config.gameGold = parseFloat(data.data.data);
                    this.moneyLab.text = App.MathUtil.keepDecimalNum(Config.gameGold);
                    //通知金币变化了
                    App.MsgCenter.send("money");
                }
                this.getCheckOutInfo();
            }else if("Bank" == data.tag){
                Toast.show("成功提交银行卡提现申请,收益稍后到账。",2000);
                if(data.data.data){
                    Config.gameGold = parseFloat(data.data.data);
                    this.moneyLab.text = App.MathUtil.keepDecimalNum(Config.gameGold);
                    //通知金币变化了
                    App.MsgCenter.send("money");
                }
                this.getCheckOutInfo();
            }else if("Info" == data.tag){

                var info = data.data.data;
                var num1 = parseInt(info.minQrcodeWithDrawMoney);
                var num2 = info.nowQrcodeWithdrawCounts;
                var num3 = info.minCardWithdrawMoney;
                this.tips1.changeText("单笔提现低于"+num1+"元；今日剩余"+num2+"次");
                this.tips2.changeText("提现大于或等于"+num3+"元，不限次数。");
            }
        }else{
            Toast.show("数据异常,请稍后尝试...");
        }
    }

    /**
     * 添加银行卡
     */
    _proto.addCard = function(){

        var self = this;
        self.selType = 2;
        self.arrow.visible = true;
        self.arrow.y = 205;
        //手机号的绑定
        /*if(Config.mobileNum == "") {
            var _bind = new MobileBind(2,function(_cfg){
            
            });
            _bind.openDlg();
            return;
        }*/
        
        //选择银行卡
        var card = new CardSelect(function(_cfg){
            Tool.log(_cfg);
            self.ids[1] = _cfg.id;
            //展示
            self.infoBox.getChildByName("item0").visible = false;
            var item1 = self.infoBox.getChildByName("item1");
            item1.visible = true;
            item1.getChildByName("icon").skin = "bank/" + (_cfg.type+1) + ".jpg";
            item1.getChildByName("lab1").text = "银行卡卡号：" + _cfg.no;
            Toast.show("成功选择银行卡提现。");
        });
        card.openDlg();
    }
     
    /**
     * 提交二维码
     */
    _proto.upCode = function(){
        var self = this;
        self.selType = 1;
        self.arrow.visible = true;
        self.arrow.y = 115;
        var dlg = new CodeSelect(function(_cfg){
            Tool.log(_cfg);
            self.ids[0] = _cfg.id;
            self.infoBox.getChildByName("item1").visible = false;
            var item1 = self.infoBox.getChildByName("item0");
            item1.visible = true;
            var p = item1.getChildByName("icon");
            p.skin = _cfg.url;
            p.scaleX = 342 / p.width;
            p.scaleY = 342 / p.height;
            p.width = 342;
            p.height = 342;
            Toast.show("成功选择收款码提现。");
        });
        dlg.openDlg();
    }
    
    //提取所有
    _proto.getAll = function(){
        this.moneyInput.color = "#ffffff";
        this.moneyInput.text = App.MathUtil.keepDecimalNum(Config.gameGold);
    }

    //提交输入
    _proto.onSubmit = function(){

        if(this.selType == 0){
           Toast.show("请先选择收款方式");
           return;
        }

        if(this.selType == 1 && this.ids[0] == ""){
           Toast.show("请点击选择收款码");
           return;
        }

        if(this.selType == 2 && this.ids[1] == ""){
           Toast.show("请点击选择银行卡");
           return;
        }
        
        if(this.moneyInput.text == ""){
           Toast.show("请输入金额");
           return;
        }

        /*var num = parseFloat(this.moneyInput.text);
        if(num < 10){
            Toast.show("提现金额至少10元。");
            return;
        }*/

        if(this.selType == 1){
            //二维码提现
            Http.getRequestGame("rest/withdraw/applyQrcodeWithdraw",
            "/"+Config.userID+"/"+this.moneyInput.text+"/"+this.ids[0],this,this.onHttpComplete,"DRAW");
        }else{
            //银行卡提现
            Http.getRequestGame("rest/withdraw/applyBankWithdraw",
            "/"+Config.userID+"/"+this.moneyInput.text+"/"+this.ids[1],this,this.onHttpComplete,"Bank");
        }

    }
    
    //输入的处理
    _proto.moneyOnfocus = function(){
        
        //记录上次的输入
         if(this.numStr == "") {
            this.numStr = this.moneyInput.text
            this.numColor = this.moneyInput.color;
        }
        if(this.moneyInput.text == this.numStr) {
            this.moneyInput.text = "";
            this.moneyInput.color = "#ffffff";
        }
    }
    
    //输出的处理
    _proto.moneyOnblur = function(){
        if(this.moneyInput.text == "") {
            this.moneyInput.text = this.numStr;
        }
        if(this.moneyInput.text == this.numStr) {
            this.moneyInput.color = this.numColor;
        }
    }

    //弹入
    _proto.openDlg = function(){
        var self = this;
        self.popup(false);
        App.DisUtil.openToTop(self,function(){});
    }
    
    //弹出
    _proto.closeDlg = function(){
        //打开公告
        Config.room.isNotice = Config.room.visible;
        App.DisUtil.closeToTop(this,this.close);
    }

    return CashOutCenter;
}(CashOutUI));