/**
 * 佣金
 */
var Yongjin = function(_super) {
    function Yongjin() {
        Yongjin.super(this);
        
        this.init();
    }
    Laya.class(Yongjin, "src.dialog.Yongjin", _super);
    var _proto = Yongjin.prototype;
    
    _proto.init = function() {
        
        this.height = App.StageUtil.height;
        this.width = App.StageUtil.width;
        this.popupEffect = null;
        this.closeEffect = null;
        //隐藏进度条
        this.contentPanel.vScrollBar.visible = false;
        //get
        this.linqu.on("mousedown",this,this.goGet);
    }
    
    /**
     * 外部获取佣金的数据
     */
    _proto.setData = function(){
        Toast.show("外部获取佣金的数据...");
         
        this.numLab.text = "您目前的佣金: 1000金币";
        
        //历史记录数据
        var m = 0;
        this.contentBox.destroyChildren();
        for(var k = 0;k < 20;k++){
            var lab = App.DisUtil.createText(0,m,24,400,this.contentBox,"#c06741");
            lab.text = "佣金领取记录: " + (k+1);
            lab.centerX = 0;
            lab.bold = true;
            m += 30;
        }
        
    }

    _proto.goGet = function(){
        Toast.show("佣金额度领取");
    }

    return Yongjin;
}(YongjinUI)