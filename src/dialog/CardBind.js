/**
 * 绑定银行卡;
 */
var CardBind = (function (_super) {
    function CardBind(_callback) {
        CardBind.super(this);
        
        this.callback = _callback;
        this.init();
    }
    Laya.class(CardBind, "src.dialog.CardBind",_super);

    var _proto = CardBind.prototype;

    _proto.init = function(){
        //去掉动画
        this.popupEffect = null;
        this.closeEffect = null;
        //适配
        this.height = App.StageUtil.height;
        this.bg.height = App.StageUtil.height;
        //输入初始化
        this.inputStr = ["","",""];
        this.inputColor = ["#ffffff","#ffffff","#ffffff"];
        this.inputObj = [];
        this.inputObj.push(this.input2);
        this.inputObj.push(this.input3);
        this.inputObj.push(this.input4);
        //输入焦点
        this.input2.on("focus",this, this.onfocus,[0]);
        this.input3.on("focus",this, this.onfocus,[1]);
        this.input4.on("focus",this, this.onfocus,[2]);
        //失去焦点
        this.input2.on("blur", this, this.onblur,[0]);
        this.input3.on("blur", this, this.onblur,[1]);
        this.input4.on("blur", this, this.onblur,[2]);
        //选择银行卡
        this.selectBtn.on("mousedown",this,this.onCard);
        this.cfg = {
            name:"",
            code:""
        };
        //关闭
        this.closeBtn.on("mousedown",this,this.closeDlg);
        this.backBtn.on("mousedown",this,this.closeDlg);
        //提交
        this.submitBtn.on("mousedown",this,this.onSubmit);
    }
     
    /**
     * 提交结果
     */
    _proto.onSubmit = function(){
        /*Tool.log("1111  " + this.inputObj[0].text);
        Tool.log("2222  " + this.inputObj[1].text);
        Tool.log("3333  " + this.inputObj[2].text);*/
        if(this.cfg.code == ""){
            Toast.show("请选择开户的银行");
            return;
        }
        if(this.inputObj[0].text == ""){
            Toast.show("请填写银行卡开户的网点")
            return;
        }
        if(this.inputObj[1].text == ""){
            Toast.show("请填写银行卡的卡号")
            return;
        }
        if(this.inputObj[2].text == ""){
            Toast.show("请填写办理银行卡时的开户名称")
            return;
        }
        //提交
        var data = {};
        data.bankAddr = this.inputObj[0].text;
        data.bankNo = this.inputObj[1].text;
        data.bankType = this.cfg.code;
        data.cardHolder = this.inputObj[2].text;
        //data.userId = Config.userID;
        Http.postRequestPanel("rest/withdraw/add",data,this,this.onHttpComplete);
    }

    _proto.onCard = function(){
        var self = this;
        var dlg = new CardList(function(i){
            if(i > -1){
               self.cfg.name = bankInfo[i].name;
               self.cfg.code = bankInfo[i].code;
               self.input1.changeText(self.cfg.name);
            }
        });
        dlg.openDlg();
    }

    //确认登陆的回调
    _proto.onHttpComplete = function(data){
        if(0 == data.result){
            Toast.show("成功绑定一张银行卡。");
            this.callback();
            this.closeDlg();
        }else{

        }
    }

    //输入焦点
    _proto.onfocus = function(i){

        if(this.inputStr[i] == ""){
            this.inputStr[i] = this.inputObj[i].text
            this.inputColor[i] = this.inputObj[i].color;
        }
        if(this.inputObj[i].text == this.inputStr[i]) {
            this.inputObj[i].text = "";
            this.inputObj[i].color = "#ffffff";
        }
    }
     
    //失去焦点
    _proto.onblur = function(i){
        if(this.inputObj[i].text == "") {
            this.inputObj[i].text = this.inputStr[i];
        }
        if(this.inputObj[i].text == this.inputStr[i]) {
            this.inputObj[i].color = this.inputColor[i];
        }
    }

    //弹入
    _proto.openDlg = function(){
        this.popup(false);
    }
    
    //弹出
    _proto.closeDlg = function(){
        this.close();
    }

    return CardBind;
}(CardBindUI));