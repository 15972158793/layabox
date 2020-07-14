/**
 * 充值
 * @class Charge
 * @constructor 
 */
var Charge = (function (_super) {

    function Charge() {
        Charge.super(this);

        this.init();
    }
    Laya.class(Charge,"src.view.charge",_super);
    var _proto = Charge.prototype;

    _proto.init = function(){
        
        //金额处理
        this.selectIndex = -1;
        this.selectHeight = this.height - this.select2.top - this.select2.bottom;
        this.initMoney();
        //支付类型
        this.selType = 0;
        this.initPayType();
        //请求支付
        this.submit.on("mousedown",this,this.onPay);
    
    }

    _proto.setData = function(){
        
    }

    _proto.onPay = function(){

        if(this.selectIndex == -1){
            Toast.show("请选择金额!");
            return;
        }
        var num = Config.numMoney[this.selectIndex].toFixed(2);
        var param = "/" + num+"/"+ Config.userID +"/"+(this.selType+1);
        Http.getRequestGame("rest/rechargeApi/pay/qrcode",param,this,this.onHttpComplete);
        /*var dlg = new ChargeCode();
        dlg.showInfo(null,this.selType);*/
    }

    _proto.onHttpComplete = function(data){
        if(0 == data.result){
            var info = data.data.data;
            if(info == null || info == undefined){
                Toast.show("充值暂未开通");
                return;
            }

            //
            if(info){
                var dlg = new ChargeCode();
                dlg.showInfo(info,this.selType);
                //Toast.show("二维码加载中...");
            }else{
                Toast.show("支付暂未开通");
            }
        }else{
            Toast.show("网络不稳定,请稍后重试!");
        }
    }

    _proto.initPayType = function(){
        for(var i = 0;i < 2;i++){
            var item = this.select1.getChildByName("item" + i);
            item.on("mousedown", this, this.onSelectType, [i]);
        }
    }
    _proto.onSelectType = function(i){
        this.selType = i;
        this.moveBox.left = 22 + 160 * i;
    }

    _proto.initMoney = function(){
        for (var e = 0; e < this.select2._childs.length; e++){
            this.select2._childs[e].getChildByName("txt").text = "￥" + Config.numMoney[e].toFixed(2);
            this.select2._childs[e].getChildByName("txt").color = "#DBD7B9";
            this.select2._childs[e].skin = "charge/m1.png";
            this.select2._childs[e].on("mousedown", this, this.onSelectCard, [e, Config.numMoney[e]]);
        }
    }
    
    /**
     * 选择支付金额
     * @param {number} i
     * @param {number} num
     */
    _proto.onSelectCard = function(i,num){
        if(this.selectIndex != i){
            if(this.selectIndex > -1){
                this.select2._childs[this.selectIndex].skin = "charge/m1.png";
                this.select2._childs[this.selectIndex].getChildByName("txt").color = "#DBD7B9";
            }
            this.select2._childs[i].skin = "charge/m2.png";
            this.select2._childs[i].getChildByName("txt").color = "#DEAA5D";
            this.selectIndex = i;
        }
    }

    _proto.resize = function(scale){
        
        this.select2.width = App.StageUtil.width;
        this.select2.top = 130;
        this.select2.bottom = 80;
        var h1 = this.height - this.select2.top - this.select2.bottom;
        var scale = h1 / this.selectHeight;
        this.select2.height = h1;
        /*for (var e = 0; e < this.select2._childs.length; e++){
            var item = this.select2._childs[e];
            item.scaleX = 1 / scale;
        }*/
    }

    return Charge;
}(ChargeUI));